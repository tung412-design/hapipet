"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin, PawPrint } from "lucide-react";
import { CatPortrait } from "@/components/cat-portrait";
import { useLocale } from "@/components/locale-provider";
import type { StreetCat } from "@/data/cats";
import { stories } from "@/data/stories";

const labels = {
  friendly: { zh: "較親人", en: "Friendly" },
  shy: { zh: "怕羞", en: "Shy" },
  "do-not-disturb": { zh: "請勿打擾", en: "Do not disturb" },
};

export function CatDetail({ cat }: { cat: StreetCat }) {
  const { locale } = useLocale();
  const t = locale === "zh";
  const story = stories.find((item) => item.slug === cat.storySlug);
  return (
    <main className="cat-detail page-shell">
      <Link className="back-link" href="/cats"><ArrowLeft size={17} />{t ? "街坊貓名錄" : "Cat directory"}</Link>
      <div className="cat-detail-grid">
        <CatPortrait cat={cat} className="cat-detail-portrait" />
        <article>
          <span className={`temperament temperament-${cat.temperament}`}>{labels[cat.temperament][locale]}</span>
          <h1>{cat.name[locale]}</h1>
          <p className="cat-nickname">{cat.nicknames[locale]}</p>
          <dl>
            <div><dt>{t ? "街角" : "Corner"}</dt><dd>{cat.corner[locale]}</dd></div>
            <div><dt>{t ? "大概年齡" : "Rough age"}</dt><dd>{cat.age[locale]}</dd></div>
            <div><dt>{t ? "最愛位置" : "Favourite spot"}</dt><dd>{cat.favouriteSpot[locale]}</dd></div>
            <div><dt>{t ? "街坊照顧筆記" : "Neighbour note"}</dt><dd>{cat.neighbourNote[locale]}</dd></div>
          </dl>
          <div className="hello-tip"><PawPrint size={24} /><div><strong>{t ? "禮貌地說你好" : "Say hello politely"}</strong><p>{cat.helloTip[locale]}</p></div></div>
          <div className="cat-detail-links">
            <Link href={`/?cat=${cat.slug}#map`}><MapPin size={16} />{t ? "在一公里地圖上查看" : "View on the 1KM map"}</Link>
            {story && <Link href={story.published ? `/stories/${story.slug}` : `/?story=${story.slug}#map`}>{story.title[locale]}<ArrowUpRight size={16} /></Link>}
          </div>
        </article>
      </div>
    </main>
  );
}
