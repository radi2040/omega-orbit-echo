import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EvidenceBadge, PageHero } from "@/components/site/primitives";
import { evidenceMeta, type Evidence } from "@/content/evidence";
import { research, researchCategories, type ResearchCategory } from "@/content/research";
import { l, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Library — OMEGA" },
      { name: "description", content: "An annotated library of real sources on governance, distributed systems, blockchain, energy, AI, institutional economics, smart cities and African development." },
      { property: "og:title", content: "OMEGA Research Library" },
      { property: "og:description", content: "Identifiable sources with authors, dates, summaries and relevance to OMEGA, classified by evidence type." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Research,
});

const c = {
  eyebrow: l("Research library", "Forschungsbibliothek"),
  title: l("Standing on", "Auf den Schultern"),
  accent: l("identifiable shoulders.", "nachweisbarer Vorarbeit."),
  intro: l(
    "Every entry is a real, identifiable work: author or institution, date and venue. Summaries are OMEGA's own short readings — always consult the original. Nothing here implies endorsement of OMEGA by any author or institution.",
    "Jeder Eintrag ist ein reales, identifizierbares Werk: Autor oder Institution, Datum und Quelle. Die Zusammenfassungen sind OMEGAs eigene kurze Lesarten – konsultieren Sie stets das Original. Nichts hier impliziert eine Unterstützung OMEGAs durch Autoren oder Institutionen.",
  ),
  search: l("Search titles, authors, topics…", "Titel, Autoren, Themen suchen…"),
  all: l("All", "Alle"),
  allEvidence: l("All evidence", "Alle Evidenz"),
  results: l("sources", "Quellen"),
  relevance: l("Relevance to OMEGA", "Relevanz für OMEGA"),
  none: l("No sources match these filters.", "Keine Quellen passen zu diesen Filtern."),
  open: l("Open source", "Quelle öffnen"),
};

function Research() {
  const t = useT();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ResearchCategory | "all">("all");
  const [ev, setEv] = useState<Evidence | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return research
      .filter((r) => (cat === "all" || r.category === cat) && (ev === "all" || r.evidence === ev))
      .filter((r) =>
        !query ||
        [r.title, r.authors, r.source, String(r.year), t(r.summary), t(r.relevance)].some((s) => s.toLowerCase().includes(query)),
      );
  }, [q, cat, ev, t]);

  return (
    <>
      <PageHero index="005" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} />
      <section className="container-omega">
        <div className="glass z-10 md:sticky md:top-[88px] space-y-3 rounded-2xl p-3 sm:p-4">
          <label className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-3.5 py-2.5 focus-within:border-primary/50">
            <Search size={16} className="text-dim" />
            <span className="sr-only">{t(c.search)}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(c.search)} className="w-full bg-transparent text-[14px] text-foreground placeholder:text-dim focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category">
            {[{ id: "all" as const, label: c.all }, ...researchCategories].map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={cat === x.id}
                onClick={() => setCat(x.id)}
                className={cn("rounded-full border px-3 py-1 text-[11.5px] transition-colors", cat === x.id ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground")}
              >
                {t(x.label)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Evidence">
            <button type="button" aria-pressed={ev === "all"} onClick={() => setEv("all")} className={cn("rounded-full border px-3 py-1 text-[11px] transition-colors", ev === "all" ? "border-primary/50 text-foreground" : "border-border text-dim")}>
              {t(c.allEvidence)}
            </button>
            {(Object.keys(evidenceMeta) as Evidence[]).filter((k) => research.some((r) => r.evidence === k)).map((k) => (
              <button key={k} type="button" aria-pressed={ev === k} onClick={() => setEv(k)} className={cn("rounded-full transition-opacity", ev === k ? "opacity-100" : "opacity-55 hover:opacity-100")}>
                <EvidenceBadge kind={k} />
              </button>
            ))}
            <span className="ml-auto font-mono text-[11px] text-dim">
              {filtered.length} {t(c.results)}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {filtered.map((r) => (
            <article key={r.id} className="panel flex flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="mono-label">{t(researchCategories.find((x) => x.id === r.category)!.label)} · {r.year}</span>
                <EvidenceBadge kind={r.evidence} />
              </div>
              <h2 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-foreground">{r.title}</h2>
              <p className="mt-1.5 text-[12.5px] text-primary/85">{r.authors}</p>
              <p className="font-mono text-[11px] text-dim">{r.source}</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">{t(r.summary)}</p>
              <div className="mt-4 border-t border-border pt-3.5">
                <div className="mono-label mb-1 !text-violet">{t(c.relevance)}</div>
                <p className="text-[13px] leading-relaxed text-foreground/80">{t(r.relevance)}</p>
              </div>
              {r.url && (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 self-start text-[12px] text-primary hover:underline">
                  {t(c.open)} <ExternalLink size={12} />
                </a>
              )}
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-20 text-center text-muted-foreground">{t(c.none)}</p>}
      </section>
    </>
  );
}
