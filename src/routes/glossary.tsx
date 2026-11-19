import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { domainBySlug, domains, type DomainSlug } from "@/content/domains";
import { faq, glossary } from "@/content/glossary";
import { l, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary & FAQ — OMEGA" },
      { name: "description", content: "A searchable glossary of DAO, blockchain, consensus, liquid democracy, quadratic voting, microgrids, AGI and more — plus answers on what OMEGA is and is not." },
      { property: "og:title", content: "OMEGA Glossary & FAQ" },
      { property: "og:description", content: "Key terms in decentralized governance, infrastructure, energy and AI, and frequently asked questions about OMEGA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlossaryPage,
});

const c = {
  eyebrow: l("Glossary & FAQ", "Glossar & FAQ"),
  title: l("A shared", "Ein gemeinsames"),
  accent: l("vocabulary.", "Vokabular."),
  intro: l(
    "Precise words make honest arguments possible. Search the terms used across OMEGA, then read the answers to the questions people ask most often.",
    "Präzise Begriffe machen ehrliche Argumente möglich. Durchsuchen Sie die bei OMEGA verwendeten Begriffe und lesen Sie die Antworten auf häufige Fragen.",
  ),
  search: l("Search terms and definitions…", "Begriffe und Definitionen suchen…"),
  all: l("All domains", "Alle Bereiche"),
  terms: l("terms", "Begriffe"),
  none: l("No terms match.", "Keine passenden Begriffe."),
  faqEyebrow: l("Frequently asked", "Häufig gefragt"),
  faqTitle: l("What OMEGA is — and is not.", "Was OMEGA ist – und was nicht."),
  jump: l("Jump to FAQ", "Zum FAQ springen"),
};

function GlossaryPage() {
  const t = useT();
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState<DomainSlug | "all">("all");

  const terms = useMemo(() => {
    const query = q.trim().toLowerCase();
    return glossary
      .filter((g) => domain === "all" || g.domain === domain)
      .filter((g) => !query || t(g.term).toLowerCase().includes(query) || t(g.definition).toLowerCase().includes(query))
      .sort((a, b) => t(a.term).localeCompare(t(b.term), lang));
  }, [q, domain, t, lang]);

  return (
    <>
      <PageHero index="008" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro}>
        <a href="#faq" className="mt-6 inline-flex text-[13px] text-primary hover:underline">{t(c.jump)} ↓</a>
      </PageHero>

      <section className="container-omega">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface/60 px-3.5 py-2.5 focus-within:border-primary/50">
            <Search size={16} className="text-dim" />
            <span className="sr-only">{t(c.search)}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(c.search)} className="w-full bg-transparent text-[14px] text-foreground placeholder:text-dim focus:outline-none" />
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Domain">
            {[{ slug: "all" as const, accent: "cyan", title: c.all }, ...domains].map((d) => (
              <button
                key={d.slug}
                type="button"
                aria-pressed={domain === d.slug}
                data-accent={d.accent}
                onClick={() => setDomain(d.slug)}
                className={cn("rounded-full border px-3 py-1 text-[11.5px] transition-colors", domain === d.slug ? "accent-border accent-soft text-foreground" : "border-border text-muted-foreground hover:text-foreground")}
              >
                {t(d.title)}
              </button>
            ))}
          </div>
        </div>
        <p className="mb-4 font-mono text-[11px] text-dim">{terms.length} {t(c.terms)}</p>

        <dl className="grid gap-x-10 gap-y-0 md:grid-cols-2">
          {terms.map((g) => {
            const d = domainBySlug(g.domain)!;
            return (
              <div key={g.term.en} className="border-t border-border py-5" data-accent={d.accent}>
                <dt className="flex items-center justify-between gap-3">
                  <span className="text-[15.5px] font-semibold text-foreground">{t(g.term)}</span>
                  <span className="accent-text font-mono text-[9.5px] uppercase tracking-wider">{t(d.title)}</span>
                </dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t(g.definition)}</dd>
              </div>
            );
          })}
        </dl>
        {terms.length === 0 && <p className="py-16 text-center text-muted-foreground">{t(c.none)}</p>}
      </section>

      <section id="faq" className="container-omega scroll-mt-28 py-24">
        <SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} />
        <Accordion type="single" collapsible defaultValue="faq-0" className="panel px-5 sm:px-8">
          {faq.map((f, i) => (
            <AccordionItem key={f.q.en} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left text-[16px] font-semibold text-foreground hover:no-underline">{t(f.q)}</AccordionTrigger>
              <AccordionContent className="pb-5 text-[14px] leading-relaxed text-muted-foreground">{t(f.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
