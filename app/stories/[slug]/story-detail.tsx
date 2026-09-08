"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { StoryCard } from "@/components/story-card";
import { nearbyStories, type Story } from "@/data/stories";

export function StoryDetail({ story }: { story: Story }) {
  const { locale } = useLocale();
  const t = locale === "zh";
  const nearby = nearbyStories(story);
  const isOrigin = story.slug === "ground-zero";
  return (
    <main className="story-page">
      <header className="story-hero page-shell">
        <Link className="back-link" href="/#map"><ArrowLeft size={17} />{t ? "返回一公里地圖" : "Back to the 1KM map"}</Link>
        <div className="story-hero-grid">
          <div className="story-title-block">
            <p className="eyebrow">{story.kicker[locale]} · {story.number}</p>
            <h1>{story.title[locale]}</h1>
            <p className="story-deck">{story.excerpt[locale]}</p>
            <div className="story-byline"><span>{story.date[locale]}</span><span><MapPin size={15} />{story.place[locale]}</span></div>
          </div>
          <div className="story-hero-art">
            <span className="hero-art-orbit" />
            <Image src="/brand/ha-kun-left.png" alt="Ha-Kun reacting to the story" width={540} height={540} priority />
            <blockquote>{isOrigin ? (t ? "友善，也要先問對方的語言。" : "Even friendliness must first ask what language the other side speaks.") : (t ? "從一個問題開始，慢慢聆聽一個地方。" : "Begin with a question. Take time to listen to a place.")}</blockquote>
          </div>
        </div>
      </header>

      <article className="story-body page-shell">
        <aside className="story-margin-note"><span>{story.number}</span><p>{isOrigin ? (t ? "這個系列的原點，不在街上，而在辦公室裡。" : "The series begins not on the street, but inside the office.") : (t ? "研究預覽・正式故事待採訪及審閱。" : "Research preview. The finished story awaits reporting and review.")}</p></aside>
        <div className="story-prose">
          {story.draft && <div className="draft-notice">{t ? "這是根據主計劃整理的研究方向，並非已完成的採訪。最新資料與店方報導同意有待核實。" : "This research direction is based on the master plan, not a completed interview. Current details and permission to feature the shop remain to be verified."}</div>}
          {story.paragraphs[locale].map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "story-lede" : undefined}>{paragraph}</p>
          ))}
          {isOrigin && <figure className="story-pullquote">
            <Image src="/brand/pi-chan-left.png" alt="Pi-Chan peeking in" width={180} height={180} />
            <blockquote>{t ? "人類有人類的規則，動物有動物的禮儀。" : "Humans have rules; animals have etiquette."}</blockquote>
          </figure>}
        </div>
      </article>

      <section className="nearby-section page-shell">
        <div className="section-heading"><div><p className="eyebrow">{t ? "附近的故事" : "Nearby stories"}</p><h2>{t ? "再走遠一點點。" : "Walk a little farther."}</h2></div><Link className="text-link" href="/#map">{t ? "回到地圖" : "Back to map"}<ArrowRight size={17} /></Link></div>
        <div className="nearby-grid">{nearby.map(({ story: item }) => <StoryCard key={item.slug} story={item} compact />)}</div>
      </section>
    </main>
  );
}
