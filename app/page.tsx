"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { HkMapClient } from "@/components/hk-map/hk-map-client";
import { useLocale } from "@/components/locale-provider";
import { StoryCard } from "@/components/story-card";
import { stories } from "@/data/stories";

export default function HomePage() {
  const { locale } = useLocale();
  const t = locale === "zh";
  const [focus, setFocus] = useState<{ cat?: string; story?: string }>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFocus({ cat: params.get("cat") || undefined, story: params.get("story") || undefined });
  }, []);
  return <main>
    <section className="discovery-home page-shell" id="map">
      <div className="discovery-intro">
        <div><p className="eyebrow">HAPI 1KM / HONG KONG</p>
          <h1>{t ? "你的一公里，藏著怎樣的故事？" : "What stories hide in your kilometre?"}</h1>
          <p>{t ? "沿著真實的街道，走近人、老店與日常。先從中環和上環，慢慢開始。" : "Real streets. Local stories. People, old shops and everyday life — starting slowly in Central and Sheung Wan."}</p>
        </div>
        <Image src="/brand/ha-kun-right.png" alt={t ? "歡仔，HAPI 的社區嚮導" : "Ha-Kun, HAPI’s neighbourhood guide"} width={180} height={180} priority />
      </div>
      <HkMapClient locale={locale} catSlug={focus.cat} storySlug={focus.story} />
    </section>
    <section className="home-section launch-stories" id="stories">
      <div className="section-heading"><div><p className="eyebrow">{t ? "從這三個故事開始" : "Three stories to begin"}</p><h2>{t ? "地圖是入口，故事才是目的地。" : "The map is the doorway. The story is the destination."}</h2></div><p>{t ? "《原點》延續我們的第一次相遇；另外兩篇先呈現研究方向，正式故事待採訪及審閱後刊出。" : "The Starting Point opens our first encounter. Two research previews introduce what comes next, ahead of interviews and editorial review."}</p></div>
      <div className="launch-story-grid">{stories.map(story => <StoryCard key={story.slug} story={story} compact />)}</div>
    </section>
    <section className="care-invitation home-section">
      <div className="care-mascots"><Image src="/brand/ha-kun-left.png" alt="Ha-Kun" width={240} height={240} /><Image src="/brand/pi-chan-right.png" alt="Pi-Chan" width={210} height={210} /></div>
      <div><p className="eyebrow">{t ? "在這一公里，好好相處" : "A little care goes a long way"}</p><h2>{t ? "先建立關係，再拿出相機。" : "Build the relationship before taking out the camera."}</h2><p>{t ? "不追蹤動物的位置，不催促店主的日常。每一次靠近，都先問一句：這樣會不會打擾？" : "No tracking animals. No interrupting a shopkeeper’s day. Before getting closer, we ask: are we intruding?"}</p><Link className="primary-link" href="/about"><ShieldCheck size={18} />{t ? "關於我們與探索守則" : "About us & care guidelines"}<ArrowRight size={17} /></Link></div>
    </section>
    <section className="home-section phase-section">
      <div className="section-heading"><div><p className="eyebrow">{t ? "一步一步，走得更近" : "Growing, one step at a time"}</p><h2>{t ? "先把這一公里，好好走完。" : "One thoughtful kilometre at a time."}</h2></div></div>
      <div className="phase-grid">
        <div className="phase-card phase-current"><span>01 · {t ? "目前" : "Now"}</span><MapPin size={23} /><h3>{t ? "地圖與故事" : "Map & stories"}</h3><p>{t ? "中環、上環的故事地圖，以及關於與守則。" : "A story-led map of Central and Sheung Wan, with our principles and care notes."}</p><a href="#map">{t ? "開始探索" : "Start exploring"}<ArrowRight size={16} /></a></div>
        <div className="phase-card"><span>02 · {t ? "下一步" : "Next"}</span><h3>{t ? "一條策展散步路線" : "One curated walk"}</h3><p>{t ? "由一條約 20 分鐘的小休散步開始，待重複走訪及地形核實後推出。" : "A 20-minute Small Pause walk, released after repeat walks and terrain checks."}</p><Link href="/routes">{t ? "路線預告" : "What’s planned"}<ArrowRight size={16} /></Link></div>
        <div className="phase-card"><span>03 · {t ? "稍後" : "Later"}</span><h3>{t ? "尊重動物的社區貓目錄" : "A respectful cat directory"}</h3><p>{t ? "完成同意及相片背景審核後，按大區分批介紹，不公開精確位置。" : "Profiles released in small batches after consent and photo checks. Broad areas only."}</p><Link href="/cats">{t ? "了解目錄守則" : "Directory care notes"}<ArrowRight size={16} /></Link></div>
      </div>
    </section>
  </main>;
}
