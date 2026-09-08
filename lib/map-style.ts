import type { StyleSpecification } from "maplibre-gl";
import type { Locale } from "@/data/types";

// Real OpenStreetMap vector geometry from OpenFreeMap. Only styling changes;
// roads, coastlines and building footprints are never drawn or approximated here.
export function hapiMapStyle(base: StyleSpecification, locale: Locale): StyleSpecification {
  const style = structuredClone(base);
  style.name = "HAPI · Real Hong Kong";
  for (const layer of style.layers) {
    if (layer.type === "background") layer.paint = { "background-color": "#FFFCF5" };
    if (layer.type === "fill") {
      const source = layer["source-layer"];
      if (source === "water") layer.paint = { ...layer.paint, "fill-color": "#B2DFDC" };
      else if (source === "park" || source === "landcover") layer.paint = { ...layer.paint, "fill-color": "#D6F4EC" };
      else if (source === "landuse") layer.paint = { ...layer.paint, "fill-color": "#FFF7E1" };
      else if (source === "building") layer.paint = { "fill-color": "#F1E2CC", "fill-outline-color": "#B4CCBC" };
    }
    if (layer.type === "fill-extrusion") {
      layer.paint = { ...layer.paint, "fill-extrusion-color": "#F1E2CC", "fill-extrusion-opacity": 0.8 };
    }
    if (layer.type === "line" && layer["source-layer"] === "transportation") {
      const casing = layer.id.includes("casing");
      layer.paint = { ...layer.paint, "line-color": casing ? "#B4CCBC" : "#FFFCF5" };
    }
    if (layer.type === "symbol" && layer.layout?.["text-field"] && !layer.id.includes("shield")) {
      layer.layout["text-field"] = locale === "zh"
        ? ["coalesce", ["get", "name:zh-Hant"], ["get", "name:zh"], ["get", "name:nonlatin"], ["get", "name"], ["get", "name:latin"]]
        : ["coalesce", ["get", "name:en"], ["get", "name:latin"], ["get", "name_en"], ["get", "name"]];
      layer.paint = { ...layer.paint, "text-color": "#27353F", "text-halo-color": "#FFFCF5", "text-halo-width": 1.5 };
      if (layer["source-layer"] === "transportation_name") layer.layout["text-size"] = 14;
      // Editorial pins are the discovery layer; avoid an unrelated POI directory.
      if (layer["source-layer"] === "poi") layer.layout.visibility = "none";
    }
  }
  return style;
}

export const rasterFallback: StyleSpecification = {
  version: 8,
  sources: { osm: {
    type: "raster", tileSize: 256, maxzoom: 19,
    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>',
  } },
  layers: [{ id: "osm-streets", source: "osm", type: "raster" }],
};

export type MapCamera = { center: [number, number]; zoom: number; bearing: number; pitch: number };
export const HK_BOUNDS: [[number, number], [number, number]] = [[113.82, 22.15], [114.46, 22.57]];
export const LOCAL_BOUNDS: [[number, number], [number, number]] = [[114.1405, 22.278], [114.1605, 22.2905]];
export const MAP_STATE_KEY = "hapi-1km-map-v21";
