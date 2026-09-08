import type { StreetCat } from "@/data/cats";

export function CatPortrait({ cat, className = "" }: { cat: StreetCat; className?: string }) {
  return (
    <div
      className={`cat-portrait cat-portrait-${cat.portraitPosition} ${className}`}
      role="img"
      aria-label={`${cat.name.en} illustrated placeholder portrait`}
    />
  );
}
