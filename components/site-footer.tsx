"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "./locale-provider";

export function SiteFooter() {
  const { locale } = useLocale();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image src="/brand/hapi-logo.png" alt="HAPI Pet" width={58} height={58} />
          <div>
            <strong>HAPI 1KM</strong>
            <p>{locale === "zh" ? "你的一公里，藏著怎樣的故事？" : "What stories hide in your kilometre?"}</p>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/routes">{locale === "zh" ? "路線・稍後推出" : "Routes · coming later"}</Link>
          <Link href="/cats">{locale === "zh" ? "貓咪目錄・稍後推出" : "Cats · coming later"}</Link>
          <Link href="/about">{locale === "zh" ? "關於與守則" : "About & care"}</Link>
          <a href="https://hapi-pet.com" target="_blank" rel="noreferrer">HAPI Pet ↗</a>
        </div>
      </div>
    </footer>
  );
}
