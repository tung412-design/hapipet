"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Check, ChevronRight, ExternalLink, List, Map as MapIcon, Minus, Plus, RotateCcw, Share2, ShieldCheck, X } from "lucide-react";
import type { Map as LibreMap, Marker, StyleSpecification } from "maplibre-gl";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { areaSamples, mapPins, pinKindLabels, type MapPinData } from "@/data/map-pins";
import { stories, distanceKm, type Story } from "@/data/stories";
import type { Locale, StoryCategory } from "@/data/types";
import type { Walk } from "@/data/walks";
import { hapiMapStyle, rasterFallback, HK_BOUNDS, LOCAL_BOUNDS, MAP_STATE_KEY, type MapCamera } from "@/lib/map-style";
import { PinSymbol, pinSvg } from "./pin-symbol";

type Level = "hong-kong" | "district";
type Filter = "all" | StoryCategory;
type District = { code: string; zh: string; en: string };
type Snapshot = { camera: MapCamera; level: Level; filter: Filter };
const categories: { id: Filter; zh: string; en: string }[] = [
  { id: "all", zh: "所有主題", en: "All themes" },
  { id: "animals-people", zh: "街角動物", en: "Animals & people" },
  { id: "shops-people", zh: "店與人", en: "Shops & people" },
  { id: "history", zh: "歷史建築", en: "History & architecture" },
  { id: "culture", zh: "創意文化", en: "Creativity & culture" },
  { id: "flavours", zh: "味道記憶", en: "Flavours & memories" },
  { id: "everyday", zh: "日常風景", en: "Everyday scenes" },
];
function cameraOf(map: LibreMap): MapCamera {
  return { center: map.getCenter().toArray(), zoom: map.getZoom(), bearing: map.getBearing(), pitch: map.getPitch() };
}
function savedSnapshot(): Snapshot | null {
  try {
    const s = JSON.parse(sessionStorage.getItem(MAP_STATE_KEY) || "null");
    if (!s || !["hong-kong", "district"].includes(s.level) || !categories.some(c => c.id === s.filter)) return null;
    const c = s.camera;
    if (!c || !Array.isArray(c.center) || c.center.length !== 2 || ![...c.center, c.zoom, c.pitch, c.bearing].every(Number.isFinite)) return null;
    if (c.center[0] < 113.7 || c.center[0] > 114.6 || c.center[1] < 22.05 || c.center[1] > 22.65 || c.zoom < 8 || c.zoom > 19) return null;
    return s;
  } catch { return null; }
}
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HkMap({ locale, storySlug, catSlug }: { locale: Locale; walk?: Walk; catSlug?: string; storySlug?: string }) {
  const t = locale === "zh";
  const canvasRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const moduleRef = useRef<typeof import("maplibre-gl") | null>(null);
  const baseStyleRef = useRef<StyleSpecification | null>(null);
  const pendingRef = useRef<(() => void) | null>(null);
  const beforePinRef = useRef<MapCamera | null>(null);
  const sequenceRef = useRef(0);
  const cardRef = useRef<HTMLElement>(null);
  const selectedPinButton = useRef<HTMLButtonElement | null>(null);
  const actions = useRef({ enter: () => {}, open: (_pin: MapPinData) => {} });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [tilesIssue, setTilesIssue] = useState(false);
  const [raster, setRaster] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [level, setLevel] = useState<Level>("hong-kong");
  const [view, setView] = useState("map");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<MapPinData | null>(null);
  const [reader, setReader] = useState<Story | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtHover, setDistrictHover] = useState<District | null>(null);
  const [notice, setNotice] = useState("");
  const [inArea, setInArea] = useState(areaSamples[1]);
  const [outsidePilot, setOutsidePilot] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const stateRef = useRef({ locale, level, filter });
  stateRef.current = { locale, level, filter };
  const visiblePins = useMemo(() => mapPins.filter(pin => filter === "all" || pin.category === filter), [filter]);

  const stopFocus = useCallback(() => {
    sequenceRef.current += 1;
    const map = mapRef.current;
    if (map && pendingRef.current) map.off("moveend", pendingRef.current);
    pendingRef.current = null;
    map?.stop();
  }, []);
  const closePin = useCallback(() => {
    stopFocus(); setSelected(null);
    const before = beforePinRef.current; beforePinRef.current = null;
    if (before) mapRef.current?.easeTo({ ...before, duration: reducedMotion() ? 0 : 450 });
    selectedPinButton.current?.focus({ preventScroll: true });
  }, [stopFocus]);
  const enterDistrict = useCallback(() => {
    stopFocus(); beforePinRef.current = null;
    setSelected(null); setNotice(""); setDistrictHover(null); setLevel("district"); setView("map");
    stateRef.current.level = "district";
    const map = mapRef.current;
    if (map) { map.fitBounds(LOCAL_BOUNDS, { padding: 55, maxZoom: 15.4, pitch: 0, bearing: 0, duration: reducedMotion() ? 0 : 1250 }); }
  }, [stopFocus]);
  const openPin = useCallback((pin: MapPinData) => {
    stopFocus(); setNotice(""); setSelected(null); setLevel("district");
    stateRef.current.level = "district";
    const map = mapRef.current;
    if (!map || !ready || view === "list") { setSelected(pin); return; }
    beforePinRef.current ??= map.getZoom() < 13.5 ? { center: [114.151, 22.2845], zoom: 15, pitch: 0, bearing: 0 } : cameraOf(map);
    const smallScreen = window.matchMedia("(max-width: 780px)").matches;
    if (smallScreen) canvasRef.current?.closest(".discovery-map")?.scrollIntoView({ block: "start", behavior: "instant" });
    const offset: [number, number] = smallScreen ? [0, -95] : [90, 0];
    const sequence = sequenceRef.current;
    const finalZoom = pin.broad ? 15.6 : 17.6;
    const finish = () => { if (sequence === sequenceRef.current) setSelected(pin); };
    const move = (zoom: number, duration: number, next: () => void) => {
      const callback = () => { pendingRef.current = null; if (sequence === sequenceRef.current) next(); };
      pendingRef.current = callback; map.once("moveend", callback);
      map.easeTo({ center: pin.coordinate, zoom, duration, offset });
    };
    if (reducedMotion()) { map.easeTo({ center: pin.coordinate, zoom: finalZoom, duration: 0, offset }); finish(); }
    else move(Math.min(finalZoom - 0.5, Math.max(15.2, map.getZoom())), 520, () => move(finalZoom, 620, finish));
  }, [ready, stopFocus, view]);
  actions.current = { enter: enterDistrict, open: openPin };
  const overview = () => {
    stopFocus(); beforePinRef.current = null;
    setSelected(null); setFilter("all"); setLevel("hong-kong"); setDistrictHover(null); setIs3D(false); setNotice(""); setView("map");
    stateRef.current.level = "hong-kong";
    mapRef.current?.setMinZoom(8);
    mapRef.current?.fitBounds(HK_BOUNDS, { padding: 35, bearing: 0, pitch: 0, duration: reducedMotion() ? 0 : 1100 });
  };
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem("hapi-saved-stories") || "[]"); if (Array.isArray(saved)) setBookmarks(saved.filter(s => typeof s === "string")); } catch { /* Optional storage. */ }
  }, []);
  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();
    const snapshot = savedSnapshot();
    setReady(false); setFailed(false); setTilesIssue(false);
    const initialLevel = snapshot?.level || "hong-kong";
    setLevel(initialLevel); stateRef.current.level = initialLevel;
    if (snapshot) setFilter(snapshot.filter);
    void Promise.all([
      import("maplibre-gl"),
      fetch("/maps/hk-districts.geojson", { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("Boundaries unavailable"); return r.json(); }),
      raster ? Promise.resolve(rasterFallback) : fetch("/maps/openfreemap-liberty.json", { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("Style unavailable"); return r.json(); }),
    ]).then(([libre, boundaries, base]) => {
      if (cancelled || !canvasRef.current) return;
      moduleRef.current = libre; baseStyleRef.current = base;
      const normalized = { ...boundaries, features: boundaries.features.map((f: { properties: Record<string, string> }, i: number) => ({ ...f, id: i, properties: { code: f.properties["地區號碼"], zh: f.properties["地區"], en: f.properties.District } })) };
      setDistricts(normalized.features.map((f: { properties: District }) => f.properties));
      const map = new libre.Map({
        container: canvasRef.current, style: raster ? rasterFallback : hapiMapStyle(base, stateRef.current.locale),
        center: snapshot?.camera.center || [114.13, 22.35], zoom: snapshot?.camera.zoom || 9,
        pitch: snapshot?.camera.pitch || 0, bearing: snapshot?.camera.bearing || 0,
        minZoom: 8, maxZoom: 19, maxPitch: 55,
        maxBounds: [[113.75, 22.08], [114.55, 22.65]], attributionControl: { compact: false },
        cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
      });
      mapRef.current = map;
      map.touchZoomRotate.disableRotation(); map.touchPitch.disable(); map.dragRotate.disable();
      map.addControl(new libre.ScaleControl({ maxWidth: 90, unit: "metric" }), "bottom-left");
      map.on("style.load", () => {
        if (cancelled) return;
        map.addSource("hapi-districts", { type: "geojson", data: normalized, attribution: '<a href="https://data.gov.hk/en-data/dataset/hk-had-json1-hong-kong-administrative-boundaries" target="_blank">District boundaries © HKSAR Government</a>' });
        const before = map.getStyle().layers.find(l => l.type === "symbol")?.id;
        map.addLayer({ id: "hapi-district-fill", type: "fill", source: "hapi-districts", layout: { visibility: stateRef.current.level === "hong-kong" ? "visible" : "none" }, paint: {
          "fill-color": ["case", ["==", ["get", "code"], "A"], "#64BFB6", "#B4CCBC"],
          "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.62, ["==", ["get", "code"], "A"], 0.6, 0.3],
        } }, before);
        map.addLayer({ id: "hapi-district-line", type: "line", source: "hapi-districts", layout: { visibility: stateRef.current.level === "hong-kong" ? "visible" : "none" }, paint: { "line-color": "#51938C", "line-width": ["case", ["==", ["get", "code"], "A"], 2.5, 1], "line-opacity": 0.75 } }, before);
        setReady(true);
        if (snapshot) map.jumpTo(snapshot.camera); else map.fitBounds(HK_BOUNDS, { padding: 35, duration: 0 });
      });
      let hovered: number | string | undefined;
      map.on("mousemove", "hapi-district-fill", e => {
        const feature = e.features?.[0]; if (!feature) return;
        if (hovered !== undefined) map.setFeatureState({ source: "hapi-districts", id: hovered }, { hover: false });
        hovered = feature.id;
        if (hovered !== undefined) map.setFeatureState({ source: "hapi-districts", id: hovered }, { hover: true });
        setDistrictHover(feature.properties as District); map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "hapi-district-fill", () => {
        if (hovered !== undefined) map.setFeatureState({ source: "hapi-districts", id: hovered }, { hover: false });
        hovered = undefined; setDistrictHover(null); map.getCanvas().style.cursor = "";
      });
      map.on("click", "hapi-district-fill", e => {
        const d = e.features?.[0]?.properties as District | undefined;
        if (!d) return;
        if (d.code === "A") actions.current.enter();
        else setNotice(`${d[stateRef.current.locale]} · ${stateRef.current.locale === "zh" ? "敬請期待" : "Coming soon"}`);
      });
      map.on("dragstart", stopFocus);
      map.on("zoomstart", e => { if (e.originalEvent) stopFocus(); });
      map.on("moveend", () => {
        const camera = cameraOf(map); setIs3D(camera.pitch > 10);
        setOutsidePilot(camera.center[0] < LOCAL_BOUNDS[0][0] || camera.center[0] > LOCAL_BOUNDS[1][0] || camera.center[1] < LOCAL_BOUNDS[0][1] || camera.center[1] > LOCAL_BOUNDS[1][1]);
        setInArea([...areaSamples].sort((a, b) => distanceKm(camera.center, a.center) - distanceKm(camera.center, b.center))[0]);
        try { sessionStorage.setItem(MAP_STATE_KEY, JSON.stringify({ camera, level: stateRef.current.level, filter: stateRef.current.filter })); } catch { /* Optional continuity. */ }
      });
      let tileErrors = 0;
      map.on("error", e => { if (/tile|fetch|network|ajax/i.test(e.error?.message || "")) { tileErrors += 1; if (tileErrors >= 2) setTilesIssue(true); } });
      map.on("sourcedata", e => { if ((e.sourceId === "openmaptiles" || e.sourceId === "osm") && e.sourceDataType === "content" && e.tile) { setTilesIssue(false); if (timer) clearTimeout(timer); } });
      timer = setTimeout(() => { if (!cancelled) setTilesIssue(true); }, 22000);
      observer = new ResizeObserver(() => map.resize()); observer.observe(canvasRef.current);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true; controller.abort(); if (timer) clearTimeout(timer); observer?.disconnect();
      stopFocus(); markersRef.current.forEach(m => m.remove()); markersRef.current = [];
      mapRef.current?.remove(); mapRef.current = null;
    };
  }, [attempt, raster, stopFocus]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    if (!raster && baseStyleRef.current) hapiMapStyle(baseStyleRef.current, locale).layers.forEach(l => {
      if (l.type === "symbol" && l.layout?.["text-field"] && map.getLayer(l.id)) map.setLayoutProperty(l.id, "text-field", l.layout["text-field"]);
    });
    map.getCanvas().setAttribute("aria-label", t ? "香港互動地圖：方向鍵移動，加號或減號縮放" : "Hong Kong map: arrow keys pan; plus or minus zoom");
  }, [locale, ready, raster, t]);
  useEffect(() => {
    const map = mapRef.current, libre = moduleRef.current;
    if (!ready || !map || !libre) return;
    markersRef.current.forEach(m => m.remove()); markersRef.current = [];
    const visibility = level === "hong-kong" ? "visible" : "none";
    ["hapi-district-fill", "hapi-district-line"].forEach(id => { if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility); });
    if (level === "hong-kong") {
      const button = document.createElement("button"); button.type = "button"; button.className = "district-entry-marker";
      button.textContent = t ? "中西區 ↗" : "Central & Western ↗";
      button.addEventListener("click", e => { e.stopPropagation(); actions.current.enter(); });
      markersRef.current.push(new libre.Marker({ element: button }).setLngLat([114.133, 22.272]).addTo(map));
    } else visiblePins.forEach(pin => {
      const button = document.createElement("button"); button.type = "button"; button.className = `editorial-pin pin-${pin.kind}`;
      button.dataset.pinId = pin.id; button.setAttribute("aria-label", `${pin.name[locale]} · ${pinKindLabels[pin.kind][locale]}`); button.setAttribute("aria-pressed", "false");
      const bubble = document.createElement("span"); bubble.className = "pin-bubble"; bubble.innerHTML = pinSvg(pin.icon);
      const label = document.createElement("span"); label.className = "pin-hover-label"; label.textContent = pin.name[locale]; button.append(bubble, label);
      // Keep gesture events intact; only a completed click/tap opens the pin.
      button.addEventListener("click", e => { e.stopPropagation(); selectedPinButton.current = button; actions.current.open(pin); });
      markersRef.current.push(new libre.Marker({ element: button, anchor: "bottom" }).setLngLat(pin.coordinate).addTo(map));
    });
  }, [ready, level, locale, visiblePins, t]);
  useEffect(() => {
    markersRef.current.forEach(m => m.getElement().setAttribute("aria-pressed", String(m.getElement().dataset.pinId === selected?.id)));
    if (selected) cardRef.current?.focus({ preventScroll: true });
  }, [selected]);
  useEffect(() => {
    if (!ready) return;
    const pin = catSlug ? mapPins.find(p => p.kind === "directory") : mapPins.find(p => p.storySlug === storySlug);
    if (pin) { setView("map"); actions.current.open(pin); }
  }, [ready, storySlug, catSlug]);
  useEffect(() => {
    const map = mapRef.current;
    if (ready && view === "map" && map) {
      map.resize();
      if (stateRef.current.level === "district" && map.getZoom() < 13.5) map.fitBounds(LOCAL_BOUNDS, { padding: 55, duration: 0 });
    }
  }, [ready, view]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !reader && selected) closePin(); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [reader, selected, closePin]);
  const chooseFilter = (next: Filter) => { closePin(); setFilter(next); stateRef.current.filter = next; };
  const saveStory = (story: Story) => {
    const next = bookmarks.includes(story.slug) ? bookmarks.filter(id => id !== story.slug) : [...bookmarks, story.slug];
    try { localStorage.setItem("hapi-saved-stories", JSON.stringify(next)); setBookmarks(next); setNotice(t ? "已更新此裝置的收藏" : "Saved stories updated on this device"); }
    catch { setNotice(t ? "此瀏覽器未允許儲存收藏" : "This browser does not allow saving bookmarks"); }
  };
  const shareStory = async (story: Story) => {
    const url = `${window.location.origin}/stories/${story.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: story.title[locale], url });
      else { await navigator.clipboard.writeText(url); setNotice(t ? "已複製故事連結" : "Story link copied"); }
    } catch (error) { if (!(error instanceof Error && error.name === "AbortError")) setNotice(t ? "未能分享；可從完整故事頁複製網址。" : "Could not share. Copy the URL from the full story page."); }
  };
  const selectedStory = stories.find(s => s.slug === selected?.storySlug);

  return <section className="discovery-map" aria-label={t ? "故事地圖" : "Story map"}>
    <Tabs value={view} onValueChange={setView} className="map-tabs">
      <div className="discovery-toolbar">
        <div className="map-breadcrumb"><button onClick={overview}><MapIcon size={16} />{t ? "香港" : "Hong Kong"}</button>{level === "district" && <><ChevronRight size={15} /><strong>{t ? "中環・上環" : "Central · Sheung Wan"}</strong></>}</div>
        <TabsList className="map-view-switch" aria-label={t ? "探索方式" : "Explore view"}><TabsTrigger value="map"><MapIcon size={16} />{t ? "地圖" : "Map"}</TabsTrigger><TabsTrigger value="list"><List size={16} />{t ? "清單" : "List"}</TabsTrigger></TabsList>
      </div>
      <TabsContent value="map" forceMount className="discovery-map-panel">
        <div className={`real-map-frame ${level === "hong-kong" ? "overview-frame" : "district-frame"}`}>
          <div className="real-map-canvas" ref={canvasRef} />
          {!ready && !failed && <div className="map-skeleton"><span /><p>{t ? "正在載入真實香港地圖…" : "Loading the real Hong Kong map…"}</p></div>}
          {failed && <div className="map-error"><MapIcon size={28} /><strong>{t ? "地圖暫時未能載入" : "The map could not load"}</strong><p>{t ? "可能是網絡或裝置未支援。仍可使用清單閱讀所有內容。" : "This may be a connection or device issue. All content remains available in List view."}</p><button className="primary-link" onClick={() => setAttempt(n => n + 1)}>{t ? "重新載入" : "Retry map"}</button><button className="text-link" onClick={() => setView("list")}>{t ? "打開清單" : "Open list"}</button></div>}
          {ready && <>
            <div className="real-map-controls" aria-label={t ? "地圖控制" : "Map controls"}>
              <button onClick={() => { stopFocus(); mapRef.current?.zoomIn({ duration: reducedMotion() ? 0 : 260 }); }} aria-label={t ? "放大" : "Zoom in"}><Plus size={20} /></button>
              <button onClick={() => { stopFocus(); mapRef.current?.zoomOut({ duration: reducedMotion() ? 0 : 260 }); }} aria-label={t ? "縮小" : "Zoom out"}><Minus size={20} /></button>
              <button onClick={level === "district" ? enterDistrict : overview} aria-label={t ? "重設視野" : "Reset view"}><RotateCcw size={18} /></button>
              {level === "district" && !raster && <button aria-pressed={is3D} aria-label={t ? "切換立體建築視野" : "Toggle 3D building view"} onClick={() => { stopFocus(); mapRef.current?.easeTo({ pitch: is3D ? 0 : 45, bearing: 0, duration: reducedMotion() ? 0 : 650 }); }}>3D</button>}
            </div>
            {level === "hong-kong" ? <>
              {districtHover && <div className="district-hover" aria-live="polite">{districtHover[locale]} · {districtHover.code === "A" ? (t ? "開始探索" : "Explore now") : (t ? "敬請期待" : "Coming soon")}</div>}
              <div className="overview-invitation"><span className="edition-tag">01 / HONG KONG</span><h2>{t ? "這次，從中西區開始。" : "First, Central & Western."}</h2><p>{t ? "三篇故事，十個研究線索。從城市走近一條街，再走進一個故事。" : "Three stories, ten research leads. From a city to a street, then into a story."}</p><button className="primary-link" onClick={enterDistrict}>{t ? "探索中環與上環" : "Explore Central & Sheung Wan"}<ArrowRight size={17} /></button></div>
            </> : <button className="back-to-hk" onClick={overview}><ArrowLeft size={16} />{t ? "全港總覽" : "Hong Kong overview"}</button>}
            {tilesIssue && <div className="tile-warning" role="status"><span>{t ? "地圖圖磚未能完整載入。" : "Some map tiles could not load."}</span>{!raster ? <button onClick={() => setRaster(true)}>{t ? "切換標準街道圖" : "Use standard street map"}</button> : <button onClick={() => setAttempt(n => n + 1)}>{t ? "重新載入" : "Retry"}</button>}</div>}
            {level === "district" && visiblePins.length === 0 && <div className="map-empty-theme" role="status"><strong>{t ? "這個主題還在採集中" : "This theme is still taking shape"}</strong><button className="primary-link" onClick={() => chooseFilter("all")}>{t ? "顯示所有故事與線索" : "Show all stories & leads"}</button></div>}
          </>}
        </div>
      </TabsContent>
      <TabsContent value="list" className="pin-list-panel">
        <p className="list-intro">{t ? "中環與上環・第一階段名單。研究線索並非商戶推薦或營業保證。" : "Central & Sheung Wan · Phase 1 roster. Research leads are not recommendations or guarantees of opening."}</p>
        <div className="pin-list">{visiblePins.map(pin => <button key={pin.id} className={`pin-list-item pin-${pin.kind}`} onClick={() => openPin(pin)} aria-pressed={selected?.id === pin.id}><PinSymbol icon={pin.icon} /><span><small>{pinKindLabels[pin.kind][locale]}</small><strong>{pin.name[locale]}</strong><span>{pin.address[locale]}</span></span><ChevronRight size={18} /></button>)}</div>
        {!visiblePins.length && <Empty><EmptyHeader><EmptyTitle>{t ? "這個主題還在採集中" : "This theme is still taking shape"}</EmptyTitle><EmptyDescription>{t ? "試試其他主題，或查看所有故事與線索。" : "Try another theme, or show all stories and leads."}</EmptyDescription></EmptyHeader><button className="primary-link" onClick={() => chooseFilter("all")}>{t ? "顯示全部" : "Show all"}</button></Empty>}
      </TabsContent>
      <div className="discovery-bottom-bar">
        <label className="theme-filter"><span>{t ? "主題" : "Theme"}</span><NativeSelect value={filter} onChange={e => chooseFilter(e.target.value as Filter)}>{categories.map(c => <NativeSelectOption value={c.id} key={c.id}>{c[locale]}</NativeSelectOption>)}</NativeSelect></label>
        <span className="pin-count">{visiblePins.length} {t ? "個故事與線索" : "stories & leads"}</span>
        <div className="pin-legend"><span><i className="legend-story" />{t ? "故事" : "Story"}</span><span><i className="legend-research" />{t ? "研究" : "Research"}</span><span><i className="legend-directory" />{t ? "目錄" : "Directory"}</span></div>
      </div>
    </Tabs>
    {notice && <div className="map-notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label={t ? "關閉提示" : "Dismiss notice"}><X size={16} /></button></div>}
    {selected && <aside className="selected-place" ref={cardRef} tabIndex={-1} aria-label={selected.name[locale]}>
      <div className={`selected-place-symbol pin-${selected.kind}`}><PinSymbol icon={selected.icon} /></div>
      <div className="selected-place-copy"><span className="pin-status">{selectedStory?.draft ? (t ? "故事研究預覽・待審閱" : "Story research preview · awaiting review") : pinKindLabels[selected.kind][locale]}</span><h2>{selected.name[locale]}</h2><p className="place-address">{selected.address[locale]}</p><p>{selected.teaser[locale]}</p>{selected.note && <p className="place-care"><ShieldCheck size={17} />{selected.note[locale]}</p>}
        <div className="place-actions">
          {selectedStory && <button className="primary-link" onClick={() => setReader(selectedStory)}>{selectedStory.draft ? (t ? "閱讀研究預覽" : "Read research preview") : (t ? "閱讀故事" : "Read the story")}<ArrowRight size={16} /></button>}
          {selected.kind === "directory" && <Link className="primary-link" href="/cats?area=sheung-wan">{t ? "查看目錄與守則" : "Directory & care notes"}<ArrowRight size={16} /></Link>}
          {!selected.broad && <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selected.name.en}, ${selected.address.en}, Hong Kong`)}`} target="_blank" rel="noopener noreferrer">{t ? "外部地圖" : "External map"}<ExternalLink size={15} /></a>}
        </div>
      </div><button className="close-place" onClick={closePin} aria-label={t ? "關閉並返回原視野" : "Close and restore previous view"}><X size={20} /></button>
    </aside>}
    {level === "district" && <div className="area-and-help">
      <aside className="area-widget" aria-label={t ? "此區記錄・示意資料" : "In this area · sample data"}>
        <div><strong>{t ? "此區記錄" : "In this area"} · {outsidePilot ? (t ? "試點範圍以外" : "Outside the pilot") : inArea.name[locale]}</strong><span className="sample-badge">{t ? "示意樣本" : "Sample only"}</span></div>
        <p><span><b>{outsidePilot ? "—" : inArea.cats}</b> {t ? "街貓記錄" : "recorded cats"}</span><span><b>{outsidePilot ? "—" : inArea.restaurants}</b> {t ? "核准狗隻進入餐廳" : "approved dog-friendly restaurants"}</span></p>
        <small>{t ? "示意數字，非即時或已核實統計。參考框架：貓咪目錄及 " : "Illustrative numbers, not live or verified counts. Reference framework: Cat Directory and "}<a href="https://pawsdine.com" target="_blank" rel="noopener noreferrer">pawsdine.com / FEHD</a>{t ? "；正式數據持續核實中。" : "; actual data pending verification."}</small>
      </aside><p className="map-gesture-help">{t ? "電腦：拖曳移動，滾輪縮放，滑過圖示預覽。手機：雙指移動或縮放，輕點圖示閱讀。單指可捲動網頁。" : "Desktop: drag, scroll to zoom and hover over a pin. Mobile: use two fingers to move or zoom; tap a pin to read. One finger scrolls the page."}</p>
    </div>}
    {level === "hong-kong" && <div className="district-picker"><label htmlFor="district-select">{t ? "全港 18 區・目前只開放中西區" : "18 districts · only Central & Western is active"}</label><NativeSelect id="district-select" value="" onChange={e => { const d = districts.find(d => d.code === e.target.value); if (d?.code === "A") enterDistrict(); else if (d) setNotice(`${d[locale]} · ${t ? "敬請期待" : "Coming soon"}`); }}><NativeSelectOption value="">{t ? "選擇地區" : "Choose a district"}</NativeSelectOption>{districts.map(d => <NativeSelectOption value={d.code} key={d.code}>{d[locale]}{d.code === "A" ? " ↗" : (t ? "・敬請期待" : " · coming soon")}</NativeSelectOption>)}</NativeSelect></div>}
    <Dialog open={!!reader} onOpenChange={open => { if (!open) setReader(null); }}>
      <DialogContent className="story-reader" showCloseButton={false} aria-describedby="reader-description" onCloseAutoFocus={event => { event.preventDefault(); cardRef.current?.focus({ preventScroll: true }); }}>
        {reader && <>
          <div className="reader-top"><span>HAPI 1KM / {reader.number}</span><DialogClose className="reader-back"><ArrowLeft size={16} />{t ? "返回地圖" : "Back to map"}</DialogClose></div>
          <div className="reader-scroll"><p className="eyebrow">{reader.kicker[locale]}</p><DialogTitle className="reader-title">{reader.title[locale]}</DialogTitle><DialogDescription id="reader-description" className="reader-description">{reader.excerpt[locale]}</DialogDescription>
            <p className="reader-meta">{reader.date[locale]} · {reader.place[locale]}</p>
            {reader.draft && <p className="draft-notice">{t ? "研究預覽，並非已完成的採訪。正式故事待採訪、同意及編輯審閱後刊出。" : "A research preview, not a completed interview. The finished story awaits reporting, consent and editorial review."}</p>}
            <div className="reader-prose">{reader.paragraphs[locale].map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="reader-actions"><button onClick={() => saveStory(reader)} aria-pressed={bookmarks.includes(reader.slug)}>{bookmarks.includes(reader.slug) ? <Check size={17} /> : <Bookmark size={17} />}{bookmarks.includes(reader.slug) ? (t ? "已收藏" : "Saved") : (t ? "收藏於此裝置" : "Save on this device")}</button><button onClick={() => void shareStory(reader)}><Share2 size={17} />{t ? "分享" : "Share"}</button><Link href={`/stories/${reader.slug}`}>{t ? "完整頁面" : "Full page"}<ExternalLink size={16} /></Link></div>
            {notice && <p role="status" className="reader-notice">{notice}</p>}
          </div>
        </>}
      </DialogContent>
    </Dialog>
  </section>;
}
