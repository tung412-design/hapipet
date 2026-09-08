"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Story } from "@/data/stories";
import { useLocale } from "./locale-provider";

export function StoryCard({ story, compact = false }: { story: Story; compact?: boolean }) {
  const { locale } = useLocale();
  return (
    <article className={`story-card ${compact ? "is-compact" : ""}`}>
      <div className="story-card-topline">
        <span>{story.number}</span>
        <span>{story.kicker[locale]}</span>
      </div>
      <h3>{story.title[locale]}</h3>
      <p>{story.excerpt[locale]}</p>
      <div className="story-card-meta">
        <span><MapPin size={14} aria-hidden="true" />{story.place[locale]}</span>
        {story.published ? (
          <Link href={`/stories/${story.slug}`}>
            {story.draft ? (locale === "zh" ? "閱讀研究預覽" : "Read research preview") : (locale === "zh" ? "閱讀故事" : "Read story")}<ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ) : (
          <span className="field-note">{locale === "zh" ? "採集中" : "Field note"}</span>
        )}
      </div>
    </article>
  );
}
