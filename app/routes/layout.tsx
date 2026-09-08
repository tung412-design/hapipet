import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Walking Routes | HAPI 1KM",
  description: "Curated bilingual one-kilometre walks through Central, Hong Kong, with animated map stops and neighbourhood stories.",
};

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
