"use client";

import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { useLocale } from "@/components/locale-provider";

export default function AboutPage() {
  const { locale } = useLocale();
  const t = locale === "zh";
  return (
    <main className="page-shell">
      <PageIntro
        eyebrow={t ? "關於 HAPI 一公里" : "About HAPI 1KM"}
        title={t ? "不是景點清單，是社區故事的入口。" : "Not a directory. A doorway into community stories."}
        copy={t ? "以中環 HAPI 辦公室為中心，我們重新走進每天經過的一公里。" : "From the HAPI office in Central, we step back into the kilometre we pass through every day."}
        aside={<Image className="intro-mascot" src="/brand/pi-chan-left.png" alt="Pi-Chan" width={220} height={220} />}
      />
      <article className="about-layout">
        <section>
          <p className="about-index">01</p>
          <h2>{t ? "計劃內容" : "Project Intent"}</h2>
          {t ? (
            <>
              <p>「一公里」是一項以 HAPI Pet 辦公室為圓心、向外延伸約一公里的社區探索與敘事計劃。我們相信，每個人的日常半徑裡，都藏着值得被發現的故事。</p>
              <p>它可能是街角曬太陽的貓、每天同一時間開檔的報販、藏在後巷的手沖咖啡店，或一棵看着幾代人經過的老榕樹。這些看似普通的片段，構成了一個社區最真實的溫度。</p>
              <p>寵物不會被硬放到每篇故事的中心。牠們會自然出現：茶餐廳門口打盹的貓、遛狗時遇上的鄰居，或陪一間小店長大的店狗。</p>
            </>
          ) : (
            <>
              <p>“1KM” is a community exploration and storytelling project centred on the HAPI Pet office and extending roughly one kilometre around it. We believe every person’s daily radius holds stories worth discovering.</p>
              <p>It might be a cat sunbathing on a corner, a newspaper vendor who opens at the same hour each morning, a pour-over coffee shop hidden in a back lane, or an old banyan that has watched generations pass. These ordinary fragments form a community’s truest warmth.</p>
              <p>Pets are never forced into the centre of every story. They appear as they do in real life: a cat dozing by a cha chaan teng, a neighbour met while walking a dog, or a shop dog growing up alongside a small business.</p>
            </>
          )}
        </section>
        <section>
          <p className="about-index">02</p>
          <h2>{t ? "前言" : "Foreword"}</h2>
          {t ? (
            <>
              <p>中環很快。電梯往上，行人往前，午飯時間精確地切成一小時。當一條路走得太熟，我們便很容易只記得目的地，不再記得途中。</p>
              <p>所以我們決定從辦公室門口重新開始。不急着找「必去」的地方，也不替店舖評分。我們慢一點走，先消費、觀察、問候，再在得到同意後拿出相機。</p>
              <p>這一公里不只屬於人。當我們學會看見動物的界線、店主的節奏和街坊的記憶，熟悉的城市會重新變得陌生；而陌生，正是故事開始的地方。</p>
            </>
          ) : (
            <>
              <p>Central moves quickly. Escalators climb, pedestrians press forward and lunch is cut into a precise hour. Once a route becomes too familiar, we remember the destination and stop noticing the way there.</p>
              <p>So we begin again at the office door. We are not rushing towards “must-see” places or rating local shops. We walk more slowly: buying something, observing and saying hello before a camera ever appears.</p>
              <p>This kilometre does not belong to people alone. When we learn to see an animal’s boundary, a shopkeeper’s rhythm and a neighbour’s memory, the familiar city becomes strange again. Strangeness is where a story begins.</p>
            </>
          )}
        </section>
        <aside className="about-values">
          <Image src="/brand/ha-kun-front.png" alt="Ha-Kun" width={260} height={260} />
          <blockquote>{t ? "先建立關係，再拿出相機。" : "Build the relationship before taking out the camera."}</blockquote>
          <ul>
            <li>{t ? "不為內容叫醒、餵食、搬動或圍堵動物" : "Never wake, feed, move or surround an animal for content"}</li>
            <li>{t ? "不公開無主動物的精確位置、街道、活動路線或休息地方" : "Never publish an unowned animal’s exact location, street, movements or resting place"}</li>
            <li>{t ? "每張相片須檢查背景，避免招牌或門牌洩漏位置" : "Screen every photo background for signs or door numbers that reveal locations"}</li>
            <li>{t ? "清楚區分已核實資料與街坊口述" : "Distinguish verified facts from neighbourhood recollection"}</li>
          </ul>
        </aside>
      </article>
      <section className="data-sources">
        <h2>{t ? "資料、核實與修正" : "Sources, verification & corrections"}</h2>
        <p>{t ? "本版按 v2.1 計劃先開放地圖、故事及守則。路線與貓咪目錄分階段推出，投稿功能尚未開放。地圖上的研究線索，不代表已完成採訪、店方同意、現正營業或寵物友善認證。" : "This v2.1 edition begins with the map, stories and care principles. Routes and cat profiles follow in later phases; submissions are not open. Research pins do not imply a completed interview, consent, current opening or pet-friendly certification."}</p>
        <p>{t ? "真實街道及建築資料：" : "Real streets and buildings: "}<a href="https://openfreemap.org/quick_start/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>{t ? "。全港分區：" : ". District boundaries: "}<a href="https://data.gov.hk/en-data/dataset/hk-had-json1-hong-kong-administrative-boundaries" target="_blank" rel="noopener noreferrer">{t ? "香港民政事務總署" : "Hong Kong Home Affairs Department"}</a>{t ? "。門牌坐標參考：" : ". Address coordinates: "}<a href="https://data.gov.hk/en-data/dataset/hk-dpo-als_01-als" target="_blank" rel="noopener noreferrer">{t ? "政府地址查詢服務" : "Government Address Lookup Service"}</a>{t ? "（2026 年 9 月 8 日核對）。圖釘不提供逐步導航；大範圍圖示不代表動物或辦公室位置。" : " (checked 8 September 2026). Pins do not provide turn-by-turn navigation; broad-area icons do not locate an animal or the office."}</p>
        <p>{t ? "「此區記錄」的數字均為示意樣本，並非來自即時資料或已核實統計。正式數據仍待核實；目前不應用來判斷某區的真實貓咪或核准餐廳數量。" : "All ‘In this area’ figures are illustrative samples, not a live feed or verified statistics. Actual data still needs verification; do not use these numbers to infer real cat or approved-restaurant counts."}</p>
        <p>{t ? "如需修正、移除內容或提出安全疑慮，請透過 " : "For corrections, removal requests or safety concerns, contact the team through "}<a href="https://hapi-pet.com" target="_blank" rel="noopener noreferrer">HAPI Pet</a>{t ? " 官方網站聯絡團隊。合作或贊助不保證獲得圖釘或正面報導；如有合作，會清楚標示。" : ". Partnerships or sponsorship never guarantee a pin or favourable coverage; collaborations will be labelled."}</p>
      </section>
    </main>
  );
}
