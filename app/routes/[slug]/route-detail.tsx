"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Footprints, MapPin, PawPrint } from "lucide-react";
import { HkMapClient } from "@/components/hk-map/hk-map-client";
import { useLocale } from "@/components/locale-provider";
import { stories } from "@/data/stories";
import type { Walk } from "@/data/walks";

export function RouteDetail({ walk }: { walk: Walk }) {
  const { locale } = useLocale();
  const t = locale === "zh";
  const mascot = walk.guide === "pi-chan" ? "/brand/pi-chan-right.png" : "/brand/ha-kun-left.png";
  return (
    <main className="route-detail-page">
      <div className="route-detail-head page-shell">
        <Link className="back-link" href="/routes"><ArrowLeft size={17} />{t ? "所有路線" : "All routes"}</Link>
        <div className="route-title-row">
          <div><p className="eyebrow">HAPI 1KM WALK</p><h1>{walk.title[locale]}</h1><p>{walk.summary[locale]}</p></div>
          <Image src={mascot} alt={walk.guide === "pi-chan" ? "Pi-Chan" : "Ha-Kun"} width={220} height={220} />
        </div>
        <div className="route-stats">
          <span><Footprints size={18} />{walk.distance}</span>
          <span><Clock3 size={18} />{walk.minutes} min</span>
          <span><MapPin size={18} />{walk.stops.length} {t ? "站" : "stops"}</span>
          <span><PawPrint size={18} />{walk.petFriendly ? (t ? "寵物可同行" : "Pets can join") : (t ? "建議不帶寵物" : "Best without pets")}</span>
        </div>
      </div>
      <div className="route-map-wrap"><HkMapClient locale={locale} walk={walk} /></div>
      <section className="route-stops page-shell">
        <div className="section-heading"><div><p className="eyebrow">{t ? "逐站慢慢看" : "Stop by stop"}</p><h2>{t ? "沿途留意甚麼" : "What to notice along the way"}</h2></div></div>
        <ol>
          {walk.stops.map((stop) => {
            const story = stories.find((item) => item.slug === stop.storySlug);
            return (
              <li key={stop.number}>
                <span className="stop-number">{stop.number}</span>
                <div><h3>{stop.place[locale]}</h3><p>{stop.lookFor[locale]}</p></div>
                {story && <Link href={story.published ? `/stories/${story.slug}` : `/?story=${story.slug}#map`}>{story.title[locale]}<ArrowUpRight size={15} /></Link>}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
