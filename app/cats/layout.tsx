import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Street Cat Directory | HAPI 1KM",
  description: "Meet Central and Sheung Wan’s neighbourhood cats and learn how to say hello politely.",
};

export default function CatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
