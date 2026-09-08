"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { useLocale } from "./locale-provider";

const nav = [
  { href: "/", zh: "地圖", en: "Map" },
  { href: "/#stories", zh: "故事", en: "Stories" },
  { href: "/about", zh: "關於與守則", en: "About & care" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="site-brand" aria-label="HAPI 1KM home">
          <Image src="/brand/hapi-logo.png" alt="HAPI Pet" width={48} height={48} priority />
          <span>
            <strong>HAPI 1KM</strong>
            <small>{locale === "zh" ? "中環・上環" : "Central & Sheung Wan"}</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label={locale === "zh" ? "主要導覽" : "Primary navigation"}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : undefined}>
              {item[locale]}
            </Link>
          ))}
        </nav>

        <button className="locale-button" onClick={toggleLocale} aria-label={locale === "zh" ? "Switch to English" : "切換至中文"}>
          <Languages size={17} aria-hidden="true" />
          {locale === "zh" ? "EN" : "中文"}
        </button>
      </div>
    </header>
  );
}
