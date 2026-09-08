"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { useEffect, useState } from "react";

export default function CatsPage() {
  const { locale } = useLocale();
  const t = locale === "zh";
  const [sheungWan, setSheungWan] = useState(false);
  useEffect(() => { setSheungWan(new URLSearchParams(window.location.search).get("area") === "sheung-wan"); }, []);
  return <main className="page-shell future-page">
    <Link className="back-link" href="/#map"><ArrowLeft size={17} />{t ? "返回故事地圖" : "Back to the story map"}</Link>
    <div className="discovery-intro"><div><p className="eyebrow">{t ? "第三階段・敬請期待" : "Phase 3 · coming later"}</p><h1>{t ? "認識牠們，不是尋找牠們。" : "Get to know them. Not track them."}</h1></div><Image src="/brand/pi-chan-front.png" alt="Pi-Chan" width={180} height={180} /></div>
    <div className="future-content">
      <p>{t ? "這些檔案是希望大家學會留意和關心，不是用來追蹤貓咪。請保持尊重距離，不要未經同意餵食，亦讓貓咪自己決定是否走近。" : "These profiles are here to help us notice and care, not find cats. Please keep a respectful distance, never feed without permission, and let cats choose whether to approach."}</p>
      <div className="future-empty"><ShieldCheck size={25} /><h2>{sheungWan ? (t ? "上環・待審核的目錄" : "Sheung Wan · directory pending review") : (t ? "目錄正在準備中" : "The directory is being prepared")}</h2><p>{t ? "目前沒有已審核的公開貓咪檔案。首批內容須完成照顧者同意、資料核實及相片背景審核後，才會分批推出。" : "There are no approved public cat profiles yet. The first batch will follow caretaker consent, verification and photo-background review."}</p></div>
      <h2>{t ? "兩級私隱保護" : "Two levels of privacy"}</h2>
      <ul><li>{t ? "已獲同意的舖頭貓：在照顧者明確同意後，可介紹店名及大概範圍，仍不顯示即時狀態、餵飼時間或醫療資料。" : "Consented shop cats: a shop name and broad location may be shared with explicit caretaker permission. Never live status, feeding times or medical details."}</li><li>{t ? "無主街貓：只介紹大區，不公開精確位置、街道、店名、活動路線或休息地方；相片亦須移除可反推位置的背景細節。" : "Unowned street cats: broad areas only, without precise positions, streets, shop names, routes or resting spots. Photo backgrounds must not reveal a location."}</li></ul>
      <p>{t ? "地圖上的貓掌只通往這個目錄，不標示任何一隻貓的位置。投稿功能會在審核流程準備妥當後另行開放。" : "The map’s paw icon opens this directory; it does not locate an individual cat. Submissions will open only after moderation is ready."}</p>
      <Link className="primary-link" href="/about">{t ? "閱讀完整守則" : "Read our care principles"}</Link>
    </div>
  </main>;
}
