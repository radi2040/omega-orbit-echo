import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";

import { DomainIcon } from "@/components/site/DomainIcon";
import { EvidenceLegend, PageHero, SectionHeading } from "@/components/site/primitives";
import { domains } from "@/content/domains";
import { l, useT } from "@/lib/i18n";

export const Route = createFileRoute("/vision/")({
  head: () => ({
    meta: [
      { title: "Vision — OMEGA" },
      { name: "description", content: "OMEGA's central thesis and its five connected research domains: governance, digital infrastructure, energy, intelligence and civilization." },
      { property: "og:title", content: "The OMEGA Vision" },
      { property: "og:description", content: "How governance, infrastructure, energy, AI and institutions could interact to enable more resilient human coordination." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vision,
});

const c = {
  eyebrow: l("The central thesis", "Die zentrale These"),
  title: l("Coordination is the", "Koordination ist die"),
  accent: l("infrastructure of civilization.", "Infrastruktur der Zivilisation."),
  intro: l(
    "OMEGA investigates how decentralized governance, blockchain, distributed computing, renewable energy, artificial intelligence and digital institutions could interact to enable more resilient and participatory systems of human coordination.",
    "OMEGA untersucht, wie dezentrale Governance, Blockchain, verteiltes Rechnen, erneuerbare Energie, künstliche Intelligenz und digitale Institutionen zusammenwirken könnten, um resilientere und partizipativere Systeme menschlicher Koordination zu ermöglichen.",
  ),
  whyEyebrow: l("Why the question matters", "Warum die Frage wichtig ist"),
  whyTitle: l("Our tools for coordination are older than our problems.", "Unsere Koordinationswerkzeuge sind älter als unsere Probleme."),
  why: [
    l(
      "Many of today's institutions were designed for a world of slow communication, centralized energy and paper records. Their problems are real: low trust, slow decisions, exclusion and concentration of power.",
      "Viele heutige Institutionen wurden für eine Welt langsamer Kommunikation, zentraler Energie und Papierakten entworfen. Ihre Probleme sind real: geringes Vertrauen, langsame Entscheidungen, Ausgrenzung und Machtkonzentration.",
    ),
    l(
      "At the same time, new tools exist: cryptographic ledgers, digital identity, cheap solar power, batteries and AI. Each is often presented as a solution in itself. OMEGA starts from the opposite view: tools only matter in combination, and only inside legitimate institutions.",
      "Gleichzeitig gibt es neue Werkzeuge: kryptografische Ledger, digitale Identität, günstigen Solarstrom, Batterien und KI. Jedes wird oft als Lösung an sich präsentiert. OMEGA geht vom Gegenteil aus: Werkzeuge zählen nur im Zusammenspiel – und nur innerhalb legitimer Institutionen.",
    ),
    l(
      "The research therefore asks not 'can this be decentralized?' but 'under which conditions would decentralization make coordination fairer, more resilient and more accountable — and when would it make things worse?'",
      "Die Forschung fragt daher nicht 'Lässt sich das dezentralisieren?', sondern 'Unter welchen Bedingungen würde Dezentralisierung Koordination fairer, resilienter und rechenschaftspflichtiger machen – und wann würde sie schaden?'",
    ),
  ],
  claimsTitle: l("What OMEGA claims — and what it does not", "Was OMEGA behauptet – und was nicht"),
  claims: [
    l("Coordination problems underlie many of humanity's hardest challenges.", "Koordinationsprobleme liegen vielen der größten Herausforderungen der Menschheit zugrunde."),
    l("The five domains are interdependent and should be studied together.", "Die fünf Bereiche sind voneinander abhängig und sollten gemeinsam untersucht werden."),
    l("Institutions and legitimacy come before technology.", "Institutionen und Legitimität kommen vor Technologie."),
  ],
  notClaims: [
    l("That decentralization automatically solves institutional problems.", "Dass Dezentralisierung institutionelle Probleme automatisch löst."),
    l("That blockchain is needed for every coordination problem.", "Dass für jedes Koordinationsproblem eine Blockchain nötig ist."),
    l("That AI should make collective decisions.", "Dass KI kollektive Entscheidungen treffen sollte."),
    l("That any part of OMEGA is deployed or operating today.", "Dass irgendein Teil von OMEGA heute im Einsatz ist."),
  ],
  claimYes: l("OMEGA argues", "OMEGA argumentiert"),
  claimNo: l("OMEGA does not claim", "OMEGA behauptet nicht"),
  evidenceEyebrow: l("Evidence classes", "Evidenzklassen"),
  evidenceTitle: l("Four kinds of statement, always distinguished.", "Vier Arten von Aussagen, stets unterschieden."),
  domainsEyebrow: l("The five domains", "Die fünf Bereiche"),
  domainsTitle: l("Read each domain in depth.", "Jeden Bereich vertieft lesen."),
  domainsIntro: l("Principles, technologies, applications, dependencies, limitations and OMEGA's proposals.", "Prinzipien, Technologien, Anwendungen, Abhängigkeiten, Grenzen und OMEGAs Vorschläge."),
  archCta: l("See how they connect in the Architecture Explorer", "Im Architektur-Explorer sehen, wie sie zusammenhängen"),
};

function Vision() {
  const t = useT();
  return (
    <>
      <PageHero index="002" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} />

      <section className="container-omega grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow={c.whyEyebrow} title={c.whyTitle} className="mb-0 md:block" />
        <div className="prose-omega">
          {c.why.map((p) => (
            <p key={p.en}>{t(p)}</p>
          ))}
        </div>
      </section>

      <section className="container-omega py-12">
        <h2 className="display-3 mb-8 text-foreground">{t(c.claimsTitle)}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="panel p-6" data-accent="mint">
            <div className="mono-label accent-text mb-5">{t(c.claimYes)}</div>
            <ul className="space-y-3.5">
              {c.claims.map((x) => (
                <li key={x.en} className="flex gap-3 text-[14px] leading-relaxed text-foreground/85">
                  <Check size={17} className="accent-text mt-0.5 shrink-0" /> {t(x)}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-6" data-accent="rose">
            <div className="mono-label accent-text mb-5">{t(c.claimNo)}</div>
            <ul className="space-y-3.5">
              {c.notClaims.map((x) => (
                <li key={x.en} className="flex gap-3 text-[14px] leading-relaxed text-foreground/85">
                  <X size={17} className="accent-text mt-0.5 shrink-0" /> {t(x)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-omega py-12">
        <SectionHeading eyebrow={c.evidenceEyebrow} title={c.evidenceTitle} />
        <EvidenceLegend />
      </section>

      <section className="container-omega py-12">
        <SectionHeading eyebrow={c.domainsEyebrow} title={c.domainsTitle} intro={c.domainsIntro} />
        <div className="divide-y divide-border border-y border-border">
          {domains.map((d) => (
            <Link
              key={d.slug}
              to="/vision/$domain"
              params={{ domain: d.slug }}
              data-accent={d.accent}
              className="group grid gap-5 py-8 transition-colors hover:bg-foreground/[0.02] md:grid-cols-[80px_1fr_1.4fr_40px] md:items-start md:px-4"
            >
              <span className="font-mono text-[11px] text-dim">{d.index}</span>
              <div className="flex items-center gap-4">
                <span className="accent-text accent-border accent-soft grid h-11 w-11 place-items-center rounded-xl border">
                  <DomainIcon slug={d.slug} size={22} />
                </span>
                <h3 className="text-[22px] font-semibold tracking-tight text-foreground">{t(d.title)}</h3>
              </div>
              <div>
                <p className="text-[14px] leading-relaxed text-muted-foreground">{t(d.purpose)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.topics.map((topic) => (
                    <span key={topic.en} className="chip">{t(topic)}</span>
                  ))}
                </div>
              </div>
              <ArrowRight size={18} className="accent-text hidden transition-transform group-hover:translate-x-1 md:block" />
            </Link>
          ))}
        </div>
        <Link to="/architecture" className="mt-8 inline-flex items-center gap-2 text-[13px] text-primary transition-all hover:gap-3">
          {t(c.archCta)} <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}
