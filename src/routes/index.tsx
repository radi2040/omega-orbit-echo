import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, ChevronRight, CircleDot, FlaskConical, Library, Map, Network, Sparkles } from "lucide-react";

import { DomainCard } from "@/components/site/DomainCard";
import { NetworkGlyph } from "@/components/site/NetworkGlyph";
import { Eyebrow, EvidenceLegend, SectionHeading } from "@/components/site/primitives";
import { domains } from "@/content/domains";
import { research } from "@/content/research";
import { l, useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMEGA — Infrastructure for a Decentralized Civilization" },
      {
        name: "description",
        content:
          "An interactive research platform on how governance, blockchain, distributed computing, renewable energy and AI could enable more resilient human coordination.",
      },
      { property: "og:title", content: "OMEGA — Infrastructure for a Decentralized Civilization" },
      {
        property: "og:description",
        content: "A research vision exploring governance, digital infrastructure, energy systems and artificial intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const copy = {
  eyebrow: l("A research vision for what comes next", "Eine Forschungsvision für das, was kommt"),
  h1a: l("Infrastructure for a", "Infrastruktur für eine"),
  h1em: l("decentralized", "dezentrale"),
  h1b: l("civilization.", "Zivilisation."),
  intro: l(
    "OMEGA explores the systems that could let people coordinate, compute and create together — and asks honestly where decentralization helps, and where it does not.",
    "OMEGA erforscht Systeme, mit denen Menschen gemeinsam koordinieren, rechnen und gestalten könnten – und fragt ehrlich, wo Dezentralisierung hilft und wo nicht.",
  ),
  ctaVision: l("Explore the vision", "Vision entdecken"),
  ctaArch: l("Discover the architecture", "Architektur entdecken"),
  note: l("Conceptual research initiative · not a deployed network", "Konzeptionelle Forschungsinitiative · kein betriebenes Netzwerk"),
  questionLabel: l("The central question", "Die zentrale Frage"),
  question: l(
    "How could humanity design better systems for coordinating institutions, infrastructure, resources and collective intelligence?",
    "Wie könnte die Menschheit bessere Systeme entwerfen, um Institutionen, Infrastruktur, Ressourcen und kollektive Intelligenz zu koordinieren?",
  ),
  questionBody: l(
    "Most of humanity's hardest problems — energy transitions, fair allocation of resources, trustworthy institutions, the governance of AI — are coordination problems. OMEGA studies whether new tools can help people coordinate at scale without surrendering control to a few.",
    "Viele der schwierigsten Probleme der Menschheit – Energiewende, faire Ressourcenverteilung, vertrauenswürdige Institutionen, die Steuerung von KI – sind Koordinationsprobleme. OMEGA untersucht, ob neue Werkzeuge Menschen helfen können, im großen Maßstab zu koordinieren, ohne die Kontrolle an wenige abzugeben.",
  ),
  domainsEyebrow: l("Five connected domains", "Fünf verbundene Bereiche"),
  domainsTitle: l("A foundation for collective possibility.", "Ein Fundament für kollektive Möglichkeiten."),
  domainsIntro: l(
    "Each domain is distinct, but none is complete on its own. Their dependencies are the real subject of OMEGA.",
    "Jeder Bereich ist eigenständig, aber keiner ist für sich vollständig. Ihre Abhängigkeiten sind OMEGAs eigentliches Thema.",
  ),
  evidenceEyebrow: l("Intellectual honesty", "Intellektuelle Redlichkeit"),
  evidenceTitle: l("Every claim is labelled.", "Jede Aussage ist gekennzeichnet."),
  evidenceIntro: l(
    "Throughout the site, content is classified so you always know whether you are reading about something that exists, something published, an OMEGA proposal or a speculation.",
    "Auf der ganzen Website sind Inhalte klassifiziert – so wissen Sie immer, ob es um etwas Bestehendes, etwas Veröffentlichtes, einen OMEGA-Vorschlag oder eine Spekulation geht.",
  ),
  exploreEyebrow: l("Inside OMEGA", "Im Inneren von OMEGA"),
  exploreTitle: l("Explore, test, read, follow.", "Erkunden, testen, lesen, verfolgen."),
  founderEyebrow: l("The person behind the inquiry", "Die Person hinter der Frage"),
  founderTitleA: l("Built from curiosity.", "Aus Neugier gebaut."),
  founderTitleB: l("Grounded in learning.", "Im Lernen verankert."),
  founderBody: l(
    "OMEGA is founded by Amine Radi, who is moving from culinary vocational training into IT in Germany, and studying the systems behind this vision along the way.",
    "OMEGA wurde von Amine Radi gegründet, der von einer Ausbildung in der Gastronomie in die IT in Deutschland wechselt – und dabei die Systeme hinter dieser Vision studiert.",
  ),
  founderCta: l("Meet the founder", "Den Gründer kennenlernen"),
};

function Home() {
  const t = useT();
  const explore = [
    {
      to: "/architecture" as const,
      icon: Network,
      accent: "cyan",
      title: l("Architecture Explorer", "Architektur-Explorer"),
      body: l("An interactive map of how the five layers depend on each other.", "Eine interaktive Karte der Abhängigkeiten zwischen den fünf Schichten."),
      meta: l("5 layers · 13 relationships", "5 Schichten · 13 Beziehungen"),
    },
    {
      to: "/lab" as const,
      icon: FlaskConical,
      accent: "violet",
      title: l("Interactive Lab", "Interaktives Labor"),
      body: l("Experiment with voting rules, a smart contract lifecycle and a microgrid.", "Experimentieren Sie mit Abstimmungsregeln, einem Smart-Contract-Lebenszyklus und einem Microgrid."),
      meta: l("3 deterministic simulations", "3 deterministische Simulationen"),
    },
    {
      to: "/research" as const,
      icon: Library,
      accent: "mint",
      title: l("Research Library", "Forschungsbibliothek"),
      body: l("Real sources from governance, distributed systems, energy, AI and development.", "Echte Quellen aus Governance, verteilten Systemen, Energie, KI und Entwicklung."),
      meta: l(`${research.length} annotated sources`, `${research.length} kommentierte Quellen`),
    },
    {
      to: "/roadmap" as const,
      icon: Map,
      accent: "amber",
      title: l("Roadmap", "Roadmap"),
      body: l("Six phases — clearly separating what is done from what is only imagined.", "Sechs Phasen – mit klarer Trennung zwischen Erledigtem und nur Gedachtem."),
      meta: l("6 phases", "6 Phasen"),
    },
  ];

  return (
    <>
      <section className="container-omega grid min-h-[640px] items-center gap-8 pb-14 pt-16 md:pt-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-[2] text-center lg:text-left">
          <Eyebrow className="justify-center lg:justify-start">{t(copy.eyebrow)}</Eyebrow>
          <h1 className="display-1 mt-6 text-foreground animate-fade-up">
            {t(copy.h1a)} <em className="text-signal">{t(copy.h1em)}</em> {t(copy.h1b)}
          </h1>
          <p className="lede mx-auto mt-7 max-w-[480px] lg:mx-0">{t(copy.intro)}</p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link to="/vision" className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
              {t(copy.ctaVision)} <ArrowDown size={16} />
            </Link>
            <Link to="/architecture" className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg border border-input bg-foreground/[0.03] px-5 text-[13px] font-semibold text-foreground/85 transition-all hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
              {t(copy.ctaArch)} <ChevronRight size={17} />
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 font-mono text-[10px] tracking-wide text-dim lg:justify-start">
            <CircleDot size={13} className="text-primary" /> {t(copy.note)}
          </div>
        </div>

        <div className="relative grid min-h-[340px] place-items-center md:min-h-[500px]">
          <div className="mono-label absolute inset-x-[3%] top-[9%] flex justify-between">
            <span>OMEGA / 001</span>
            <span>NETWORK STUDY</span>
          </div>
          <NetworkGlyph />
          <div className="mono-label absolute inset-x-[3%] bottom-[10%] flex justify-between">
            <span>governance</span>
            <span>energy</span>
            <span>intelligence</span>
          </div>
          <div className="absolute bottom-[22%] right-[2%] flex items-center gap-2 font-mono text-[10px] text-primary/80">
            <Sparkles size={13} />
            <span>mapping the commons</span>
            <i className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--mint)]" />
          </div>
        </div>
      </section>

      <section className="container-omega py-20">
        <div className="panel relative overflow-hidden px-6 py-14 md:px-16 md:py-20">
          <div className="mono-label text-primary">{t(copy.questionLabel)}</div>
          <blockquote className="serif-accent mt-6 max-w-4xl text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.12] text-foreground">
            “{t(copy.question)}”
          </blockquote>
          <div className="hairline my-10 max-w-xl" />
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{t(copy.questionBody)}</p>
        </div>
      </section>

      <section className="container-omega py-16">
        <SectionHeading eyebrow={copy.domainsEyebrow} title={copy.domainsTitle} intro={copy.domainsIntro} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((d) => (
            <DomainCard key={d.slug} domain={d} />
          ))}
        </div>
      </section>

      <section className="container-omega py-16">
        <SectionHeading eyebrow={copy.evidenceEyebrow} title={copy.evidenceTitle} intro={copy.evidenceIntro} />
        <EvidenceLegend />
      </section>

      <section className="container-omega py-16">
        <SectionHeading eyebrow={copy.exploreEyebrow} title={copy.exploreTitle} />
        <div className="grid gap-3 md:grid-cols-2">
          {explore.map((item) => (
            <Link key={item.to} to={item.to} data-accent={item.accent} className="panel panel-interactive group flex gap-5 p-6">
              <div className="accent-text accent-border accent-soft grid h-12 w-12 shrink-0 place-items-center rounded-xl border">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[17px] font-semibold tracking-tight text-foreground">{t(item.title)}</h3>
                  <ArrowUpRight size={17} className="text-dim transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t(item.body)}</p>
                <div className="accent-text mt-4 font-mono text-[10px] uppercase tracking-wider">{t(item.meta)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-omega py-16">
        <div className="flex flex-col gap-8 border-y border-border bg-gradient-to-r from-surface/60 to-transparent px-6 py-10 md:flex-row md:items-center md:px-10">
          <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full border border-primary/45 font-mono text-[16px] tracking-wider text-foreground shadow-[var(--shadow-glow)]">
            AR
            <span className="absolute -inset-2 rotate-[35deg] rounded-full border border-primary/20" />
            <span className="absolute -inset-3.5 -rotate-[55deg] scale-x-[0.55] rounded-full border border-violet/20" />
          </div>
          <div className="flex-1">
            <Eyebrow>{t(copy.founderEyebrow)}</Eyebrow>
            <h2 className="display-3 mt-4 text-foreground">
              {t(copy.founderTitleA)} <span className="text-primary">{t(copy.founderTitleB)}</span>
            </h2>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground">{t(copy.founderBody)}</p>
          </div>
          <Link to="/founder" className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] text-primary transition-all hover:gap-3">
            {t(copy.founderCta)} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
