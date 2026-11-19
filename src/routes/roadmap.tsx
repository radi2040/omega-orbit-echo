import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/site/primitives";
import { phases, statusMeta, type MilestoneStatus } from "@/content/roadmap";
import { l, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — OMEGA" },
      { name: "description", content: "OMEGA's six-phase research roadmap, from foundation to long-term vision, with completed, ongoing, planned and speculative work clearly separated." },
      { property: "og:title", content: "OMEGA Roadmap" },
      { property: "og:description", content: "Foundation, Research, Modelling, Systems Integration, Experimentation and Long-Term Vision — honestly labelled." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Roadmap,
});

const c = {
  eyebrow: l("Roadmap", "Roadmap"),
  title: l("Six phases,", "Sechs Phasen,"),
  accent: l("honestly labelled.", "ehrlich gekennzeichnet."),
  intro: l(
    "The roadmap describes the state of a research project, not of a deployed system. Nothing beyond the completed items has been achieved yet, and speculative ambitions may never be.",
    "Die Roadmap beschreibt den Stand eines Forschungsprojekts, nicht eines betriebenen Systems. Über die abgeschlossenen Punkte hinaus wurde noch nichts erreicht, und spekulative Ambitionen werden es vielleicht nie.",
  ),
  filter: l("Highlight", "Hervorheben"),
  all: l("All", "Alle"),
  phase: l("Phase", "Phase"),
};

function Roadmap() {
  const t = useT();
  const [open, setOpen] = useState<string>("02");
  const [filter, setFilter] = useState<MilestoneStatus | "all">("all");

  const counts = phases.flatMap((p) => p.items).reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.status]: (acc[i.status] ?? 0) + 1 }), {});

  return (
    <>
      <PageHero index="006" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} />

      <section className="container-omega">
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={t(c.filter)}>
          <span className="mono-label mr-2">{t(c.filter)}</span>
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={cn("chip transition-colors", filter === "all" && "border-primary/50 text-foreground")}>
            {t(c.all)}
          </button>
          {(Object.keys(statusMeta) as MilestoneStatus[]).map((s) => (
            <button key={s} type="button" aria-pressed={filter === s} data-accent={statusMeta[s].accent} onClick={() => setFilter(s)} className={cn("chip accent-text transition-opacity", filter === s ? "accent-border opacity-100" : "opacity-60 hover:opacity-100")}>
              <span className="chip-dot" /> {t(statusMeta[s].label)} · {counts[s] ?? 0}
            </button>
          ))}
        </div>

        {/* Overview rail */}
        <div className="mb-10 hidden grid-cols-6 gap-2 md:grid" aria-hidden="true">
          {phases.map((p) => (
            <button key={p.index} type="button" tabIndex={-1} onClick={() => setOpen(p.index)} data-accent={statusMeta[p.status].accent} className="group text-left">
              <div className={cn("h-1 rounded-full transition-opacity", p.status === "speculative" ? "bg-[repeating-linear-gradient(90deg,var(--amber)_0_6px,transparent_6px_10px)]" : "accent-fill", open === p.index ? "opacity-100" : "opacity-50 group-hover:opacity-80")} />
              <div className="mt-3 font-mono text-[10px] text-dim">{p.index}</div>
              <div className={cn("text-[13px] font-semibold", open === p.index ? "text-foreground" : "text-muted-foreground")}>{t(p.title)}</div>
            </button>
          ))}
        </div>

        <ol className="relative space-y-3 border-l border-border pl-6 md:pl-10">
          {phases.map((p) => {
            const isOpen = open === p.index;
            const meta = statusMeta[p.status];
            return (
              <li key={p.index} className="relative" data-accent={meta.accent}>
                <span className={cn("accent-fill absolute -left-[31px] top-7 h-3 w-3 rounded-full md:-left-[47px]", p.status === "completed" || p.status === "ongoing" ? "accent-glow" : "opacity-50")} />
                <div className={cn("panel transition-colors", isOpen && "accent-border")}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`phase-${p.index}`}
                    onClick={() => setOpen(isOpen ? "" : p.index)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-mono text-[12px] text-dim">{t(c.phase)} {p.index}</span>
                    <span className="flex-1">
                      <span className="block text-[19px] font-semibold tracking-tight text-foreground">{t(p.title)}</span>
                      <span className="mt-1 block text-[13px] text-muted-foreground">{t(p.summary)}</span>
                    </span>
                    <span className="chip accent-text accent-border hidden sm:inline-flex"><span className="chip-dot" />{t(meta.label)}</span>
                    <ChevronDown size={18} className={cn("shrink-0 text-dim transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <ul id={`phase-${p.index}`} className="space-y-2 border-t border-border px-5 pb-5 pt-4 sm:px-6">
                      {p.items.map((item) => {
                        const im = statusMeta[item.status];
                        const dim = filter !== "all" && filter !== item.status;
                        return (
                          <li key={item.text.en} data-accent={im.accent} className={cn("flex items-start justify-between gap-4 rounded-lg px-3 py-2.5 transition-opacity", dim ? "opacity-30" : "bg-foreground/[0.02]")}>
                            <span className="text-[14px] leading-relaxed text-foreground/85">{t(item.text)}</span>
                            <span className="chip accent-text accent-border shrink-0"><span className="chip-dot" />{t(im.label)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
