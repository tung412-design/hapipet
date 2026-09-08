import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stories } from "@/data/stories";
import { StoryDetail } from "./story-detail";

export function generateStaticParams() {
  return stories.filter((story) => story.published).map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug && item.published);
  return story ? { title: `${story.title.en} | HAPI 1KM`, description: story.excerpt.en } : {};
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug && item.published);
  if (!story) notFound();
  return <StoryDetail story={story} />;
}
