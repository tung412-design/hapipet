import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { mapPins, areaSamples } from "../data/map-pins.ts";
import { stories } from "../data/stories.ts";
import { hapiMapStyle, rasterFallback, LOCAL_BOUNDS } from "../lib/map-style.ts";
import { validateStyleMin } from "@maplibre/maplibre-gl-style-spec";

test("v2.1 roster contains three stories, ten research leads and one broad directory gateway", () => {
  assert.equal(mapPins.length, 14);
  assert.equal(new Set(mapPins.map(p => p.id)).size, 14);
  for (const [kind, count] of [["story", 3], ["research", 10], ["directory", 1]]) assert.equal(mapPins.filter(p => p.kind === kind).length, count);
  assert.ok(mapPins.find(p => p.kind === "directory").broad);
  assert.ok(mapPins.find(p => p.id === "origin").broad);
  assert.equal(stories.length, 3);
  assert.equal(stories.filter(s => s.draft).length, 2);
  for (const p of mapPins.filter(p => p.kind === "story")) assert.ok(stories.some(s => s.slug === p.storySlug));
});
test("every pin is bilingual and within the real pilot extent", () => {
  for (const p of mapPins) {
    for (const field of ["name", "address", "teaser"]) for (const lang of ["zh", "en"]) assert.ok(p[field][lang]);
    assert.ok(p.coordinate[0] >= LOCAL_BOUNDS[0][0] && p.coordinate[0] <= LOCAL_BOUNDS[1][0], p.id);
    assert.ok(p.coordinate[1] >= LOCAL_BOUNDS[0][1] && p.coordinate[1] <= LOCAL_BOUNDS[1][1], p.id);
  }
  assert.doesNotMatch(stories[0].place.en, /Kimley|142|146/i);
  assert.equal(areaSamples.length, 3);
});
test("official dataset has all eighteen distinct districts, with Central & Western code A", () => {
  const data = JSON.parse(fs.readFileSync(new URL("../public/maps/hk-districts.geojson", import.meta.url), "utf8"));
  assert.equal(data.features.length, 18);
  assert.equal(new Set(data.features.map(f => f.properties["地區號碼"])).size, 18);
  assert.equal(data.features.find(f => f.properties["地區號碼"] === "A").properties.District, "Central & Western");
  for (const f of data.features) assert.ok(["Polygon", "MultiPolygon"].includes(f.geometry.type));
});
test("both language styles and the fallback are valid MapLibre styles", () => {
  const base = JSON.parse(fs.readFileSync(new URL("../public/maps/openfreemap-liberty.json", import.meta.url), "utf8"));
  for (const language of ["zh", "en"]) {
    const styled = hapiMapStyle(base, language);
    assert.deepEqual(validateStyleMin(styled).map(e => e.message), []);
    assert.ok(styled.sources.openmaptiles);
    assert.ok(styled.layers.some(l => l.type === "fill-extrusion" && l["source-layer"] === "building"));
    assert.ok(styled.layers.some(l => l["source-layer"] === "transportation_name"));
  }
  assert.deepEqual(validateStyleMin(rasterFallback).map(e => e.message), []);
});
test("legacy cat and route URLs cannot publish unchecked prototype content", () => {
  for (const part of ["cats", "routes"]) {
    const source = fs.readFileSync(new URL(`../app/${part}/[slug]/page.tsx`, import.meta.url), "utf8");
    assert.ok(source.includes(`redirect("/${part}")`));
    assert.doesNotMatch(source, /data\/(cats|walks)/);
  }
});
test("official mascot assets remain available and camera motion is optional", () => {
  for (const file of ["hapi-logo.png", "ha-kun-right.png", "ha-kun-left.png", "pi-chan-front.png", "pi-chan-right.png"]) {
    const data = fs.readFileSync(new URL(`../public/brand/${file}`, import.meta.url));
    assert.equal(data.subarray(1, 4).toString(), "PNG");
  }
  const map = fs.readFileSync(new URL("../components/hk-map/real-map.tsx", import.meta.url), "utf8");
  assert.ok(map.includes("prefers-reduced-motion"));
  assert.doesNotMatch(map, /essential:\s*true|cat\.coordinate|areaGeoJson/);
  assert.ok(map.includes("ResizeObserver"));
  assert.ok(map.includes("cooperativeGestures"));
});
