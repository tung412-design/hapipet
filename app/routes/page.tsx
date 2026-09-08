"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

export default function RoutesPage() {
  const { locale } = useLocale();
  const t = locale === "zh";
  return <main className="page-shell future-page">
    <Link className="back-link" href="/#map"><ArrowLeft size={17} />{t ? "返回故事地圖" : "Back to the story map"}</Link>
    <div className="discovery-intro"><div><p className="eyebrow">{t ? "第二階段・籌備中" : "Phase 2 · in preparation"}</p><h1>{t ? "先走過，再帶你走。" : "Walk it first. Then share it."}</h1></div><Image src="/brand/ha-kun-left.png" alt="Ha-Kun" width={180} height={180} /></div>
    <div className="future-content"><p>{t ? "我們會由一條約 20 分鐘的「小休散步」開始。路線由 HAPI 團隊親身走訪及策展，不是演算法串連的地點清單。" : "We will start with one approximately 20-minute Small Pause walk. It will be walked and curated by HAPI, not assembled automatically from a list of places."}</p>
      <div className="future-empty"><h2>{t ? "第一條路線尚未開放" : "Our first route is not ready yet"}</h2><p>{t ? "起點、距離、需時、斜路及樓梯、休息點與寵物出入限制，會在重複走訪和核實後一併公開。目前不提供未驗證的導航路線。" : "The start, distance, duration, slopes and steps, resting points and pet-access restrictions will be published after repeat walks and verification. No unverified navigation route is provided."}</p></div>
      <p>{t ? "即使有一間店暫停營業、天氣改變，或沿途沒有遇見動物，這段散步本身仍應值得一走。" : "The walk should still be worthwhile if a shop closes, the weather changes, or no animals happen to be around."}</p>
      <Link className="primary-link" href="/#stories">{t ? "先從故事開始" : "Begin with a story"}</Link>
    </div>
  </main>;
}
