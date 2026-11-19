import type { ReactNode } from "react";

import { evidenceMeta, type Evidence } from "@/content/evidence";
import { useT, type L } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow", className)}>
      <span className="eyebrow-dot" /> {children}
    </div>
  );
}

export function PageHero({
  index,
  eyebrow,
  title,
  accent,
  intro,
  children,
}: {
  index: string;
  eyebrow: L;
  title: L;
  accent?: L;
  intro: L;
  children?: ReactNode;
}) {
  const t = useT();
  return (
    <section className="container-omega pb-14 pt-20 md:pt-28">
      <div className="mono-label mb-6 flex items-center gap-3">
        <span className="text-primary">OMEGA / {index}</span>
        <span className="h-px w-12 bg-border" />
      </div>
      <Eyebrow>{t(eyebrow)}</Eyebrow>
      <h1 className="display-2 mt-5 max-w-4xl text-foreground animate-fade-up">
        {t(title)} {accent && <span className="serif-accent text-signal">{t(accent)}</span>}
      </h1>
      <p className="lede mt-6 max-w-2xl">{t(intro)}</p>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, className }: { eyebrow: L; title: L; intro?: L; className?: string }) {
  const t = useT();
  return (
    <div className={cn("mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end", className)}>
      <div>
        <Eyebrow>{t(eyebrow)}</Eyebrow>
        <h2 className="display-3 mt-4 max-w-2xl text-foreground">{t(title)}</h2>
      </div>
      {intro && <p className="max-w-sm text-[13.5px] leading-relaxed text-muted-foreground">{t(intro)}</p>}
    </div>
  );
}

export function EvidenceBadge({ kind, className }: { kind: Evidence; className?: string }) {
  const t = useT();
  const meta = evidenceMeta[kind];
  return (
    <span data-accent={meta.accent} className={cn("chip accent-text accent-border", className)} title={t(meta.description)}>
      <span className="chip-dot" />
      {t(meta.label)}
    </span>
  );
}

export function EvidenceLegend() {
  const t = useT();
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(evidenceMeta) as Evidence[]).map((k) => (
        <div key={k} className="panel p-4">
          <EvidenceBadge kind={k} />
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{t(evidenceMeta[k].description)}</p>
        </div>
      ))}
    </div>
  );
}

export function BulletList({ items, accent }: { items: L[]; accent?: string }) {
  const t = useT();
  return (
    <ul className="space-y-2.5" data-accent={accent}>
      {items.map((item) => (
        <li key={item.en} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
          <span className="accent-fill mt-[9px] h-1 w-1 shrink-0 rounded-full" />
          <span>{t(item)}</span>
        </li>
      ))}
    </ul>
  );
}
