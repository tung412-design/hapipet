"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("hapi-1km-locale");
      if (saved === "en" || saved === "zh") setLocaleState(saved);
    } catch { /* Language switching also works without storage. */ }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try { window.localStorage.setItem("hapi-1km-locale", next); } catch { /* Optional persistence. */ }
  };

  useEffect(() => { document.documentElement.lang = locale === "zh" ? "zh-HK" : "en"; }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale: () => setLocale(locale === "zh" ? "en" : "zh") }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
