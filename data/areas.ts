import type { Localized } from "./types";

export type AreaId = "central" | "sheung-wan" | "soho" | "mid-levels" | "waterfront";

export type Area = {
  id: AreaId;
  name: Localized;
  shortName: Localized;
  center: [number, number];
};

export const areas: Area[] = [
  {
    id: "central",
    name: { zh: "中環核心", en: "Central Core" },
    shortName: { zh: "中環", en: "Central" },
    center: [114.1552, 22.2837],
  },
  {
    id: "sheung-wan",
    name: { zh: "上環", en: "Sheung Wan" },
    shortName: { zh: "上環", en: "Sheung Wan" },
    center: [114.1482, 22.2862],
  },
  {
    id: "soho",
    name: { zh: "蘇豪與太平山", en: "SoHo & Tai Ping Shan" },
    shortName: { zh: "蘇豪／太平山", en: "SoHo / PoHo" },
    center: [114.1495, 22.2824],
  },
  {
    id: "mid-levels",
    name: { zh: "半山", en: "Mid-Levels" },
    shortName: { zh: "半山", en: "Mid-Levels" },
    center: [114.1544, 22.2787],
  },
  {
    id: "waterfront",
    name: { zh: "中環海濱", en: "Central Waterfront" },
    shortName: { zh: "海濱", en: "Waterfront" },
    center: [114.1571, 22.2891],
  },
];

export const areaGeoJson = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: { id: "central", name: "Central" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.1515,22.2812],[114.1588,22.2809],[114.1602,22.2866],[114.1530,22.2871],[114.1515,22.2812]]],
      },
    },
    {
      type: "Feature" as const,
      properties: { id: "sheung-wan", name: "Sheung Wan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.1432,22.2830],[114.1516,22.2817],[114.1530,22.2872],[114.1454,22.2892],[114.1432,22.2830]]],
      },
    },
    {
      type: "Feature" as const,
      properties: { id: "soho", name: "SoHo & Tai Ping Shan" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.1450,22.2785],[114.1530,22.2779],[114.1516,22.2832],[114.1434,22.2841],[114.1450,22.2785]]],
      },
    },
    {
      type: "Feature" as const,
      properties: { id: "mid-levels", name: "Mid-Levels" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.1490,22.2745],[114.1594,22.2750],[114.1588,22.2810],[114.1514,22.2812],[114.1490,22.2745]]],
      },
    },
    {
      type: "Feature" as const,
      properties: { id: "waterfront", name: "Central Waterfront" },
      geometry: {
        type: "Polygon" as const,
        coordinates: [[[114.1501,22.2867],[114.1633,22.2861],[114.1647,22.2917],[114.1517,22.2928],[114.1501,22.2867]]],
      },
    },
  ],
};
