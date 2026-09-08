"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/data/types";
import type { Walk } from "@/data/walks";

const HkMap = dynamic(() => import("./real-map").then((module) => module.HkMap), {
  ssr: false,
  loading: () => <div className="map-client-placeholder"><div className="map-client-loading" role="status"><span /><p>HAPI 1KM · Loading map / 地圖載入中</p></div></div>,
});

export function HkMapClient({ locale, walk, catSlug, storySlug }: { locale: Locale; walk?: Walk; catSlug?: string; storySlug?: string }) {
  return <HkMap locale={locale} walk={walk} catSlug={catSlug} storySlug={storySlug} />;
}
