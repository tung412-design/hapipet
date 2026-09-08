"use client";

import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, copy, aside }: { eyebrow: string; title: string; copy: string; aside?: ReactNode }) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro-copy">{copy}</p>
      </div>
      {aside}
    </section>
  );
}
