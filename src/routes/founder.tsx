import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Code2, Network, Server, ShieldCheck, Terminal, Wallet } from "lucide-react";

import { Eyebrow } from "@/components/site/primitives";
import { l, useT } from "@/lib/i18n";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — Amine Radi · OMEGA" },
      { name: "description", content: "Amine Radi, founder of OMEGA: moving from culinary vocational training into IT in Germany, self-studying Linux, Windows, networking, Python, blockchain and Web3." },
      { property: "og:title", content: "Amine Radi — Founder of OMEGA" },
      { property: "og:description", content: "The person behind the OMEGA research vision and what he is learning." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Founder,
});

const c = {
  eyebrow: l("Founder", "Gründer"),
  role: l("Founder of OMEGA · independent learner · Germany", "Gründer von OMEGA · unabhängig Lernender · Deutschland"),
  intro: l(
    "Amine Radi is making the transition from culinary vocational training toward a career in information technology in Germany. OMEGA is the research vision he is developing alongside that path.",
    "Amine Radi wechselt von einer Berufsausbildung im Küchenbereich in Richtung einer Laufbahn in der Informationstechnik in Deutschland. OMEGA ist die Forschungsvision, die er parallel zu diesem Weg entwickelt.",
  ),
  pathTitle: l("The path so far", "Der bisherige Weg"),
  path: [
    { k: l("Origin", "Ausgangspunkt"), t: l("Culinary vocational training", "Berufsausbildung im Küchenbereich"), b: l("A background in professional kitchens — work built on preparation, timing and coordination.", "Ein Hintergrund in professionellen Küchen – Arbeit, die auf Vorbereitung, Timing und Koordination beruht.") },
    { k: l("Transition", "Wechsel"), t: l("Moving toward IT in Germany", "Wechsel in die IT in Deutschland"), b: l("A deliberate change of direction toward information technology.", "Ein bewusster Richtungswechsel hin zur Informationstechnik.") },
    { k: l("Aim", "Ziel"), t: l("Fachinformatiker für Systemintegration", "Fachinformatiker für Systemintegration"), b: l("Interested in the German IT specialist qualification focused on systems integration: networks, servers and infrastructure.", "Interesse an der deutschen IT-Ausbildung mit Schwerpunkt Systemintegration: Netzwerke, Server und Infrastruktur.") },
    { k: l("Now", "Jetzt"), t: l("Self-study and OMEGA", "Selbststudium und OMEGA"), b: l("Learning independently while structuring the questions behind OMEGA.", "Eigenständiges Lernen, während er die Fragen hinter OMEGA strukturiert.") },
  ],
  learningTitle: l("Self-study interests", "Themen im Selbststudium"),
  learningNote: l("Areas of independent study — not formal qualifications.", "Bereiche des eigenständigen Lernens – keine formalen Qualifikationen."),
  learning: [
    { icon: Terminal, t: l("Linux", "Linux"), b: l("Command line, system administration fundamentals.", "Kommandozeile, Grundlagen der Systemadministration.") },
    { icon: Server, t: l("Windows", "Windows"), b: l("Windows systems and administration fundamentals.", "Windows-Systeme und Grundlagen der Administration.") },
    { icon: Network, t: l("Networking", "Netzwerke"), b: l("How networks, protocols and addressing work.", "Wie Netzwerke, Protokolle und Adressierung funktionieren.") },
    { icon: Code2, t: l("Python", "Python"), b: l("Programming and automation.", "Programmierung und Automatisierung.") },
    { icon: ShieldCheck, t: l("Blockchain", "Blockchain"), b: l("Distributed ledgers, consensus and smart contracts.", "Verteilte Ledger, Konsens und Smart Contracts.") },
    { icon: Wallet, t: l("Web3", "Web3"), b: l("Decentralized applications and their limits.", "Dezentrale Anwendungen und ihre Grenzen.") },
  ],
  whyTitle: l("Why OMEGA", "Warum OMEGA"),
  why: [
    l(
      "Studying systems integration means learning how many independent parts — machines, networks, services — are made to work together reliably. OMEGA asks the same question one level up: how could people, institutions, energy and information be coordinated as reliably, and more fairly?",
      "Systemintegration zu lernen heißt zu verstehen, wie viele unabhängige Teile – Rechner, Netzwerke, Dienste – zuverlässig zusammenarbeiten. OMEGA stellt dieselbe Frage eine Ebene höher: Wie könnten Menschen, Institutionen, Energie und Information ebenso zuverlässig – und gerechter – koordiniert werden?",
    ),
    l(
      "OMEGA is a way of learning in public: connecting technical self-study with the larger question of what these technologies are for, and being honest about what they cannot do.",
      "OMEGA ist eine Form des öffentlichen Lernens: technisches Selbststudium mit der größeren Frage verbinden, wozu diese Technologien dienen – und ehrlich sein, was sie nicht leisten können.",
    ),
  ],
  honestTitle: l("What this profile does not claim", "Was dieses Profil nicht behauptet"),
  honest: l(
    "This page lists no professional IT experience, degrees, certifications or achievements, because none are claimed. OMEGA is an independent research vision, not the product of an institution or employer.",
    "Diese Seite nennt keine Berufserfahrung in der IT, keine Abschlüsse, Zertifikate oder Erfolge, weil keine behauptet werden. OMEGA ist eine unabhängige Forschungsvision, nicht das Produkt einer Institution oder eines Arbeitgebers.",
  ),
  back: l("Return to the vision", "Zurück zur Vision"),
};

function Founder() {
  const t = useT();
  return (
    <>
      <section className="container-omega grid items-end gap-10 pb-16 pt-20 md:grid-cols-[auto_1fr] md:pt-28">
        <div className="relative grid h-40 w-40 place-items-center rounded-full border border-primary/45 font-mono text-[34px] tracking-wider text-foreground shadow-[var(--shadow-glow)] md:h-52 md:w-52">
          AR
          <span className="absolute -inset-3 rotate-[35deg] rounded-full border border-primary/20" />
          <span className="absolute -inset-6 -rotate-[55deg] scale-x-[0.55] rounded-full border border-violet/20" />
        </div>
        <div>
          <div className="mono-label mb-4 text-primary">OMEGA / 007</div>
          <Eyebrow>{t(c.eyebrow)}</Eyebrow>
          <h1 className="display-1 mt-4 text-foreground">Amine Radi</h1>
          <p className="mt-3 font-mono text-[12px] text-dim">{t(c.role)}</p>
          <p className="lede mt-6 max-w-2xl">{t(c.intro)}</p>
        </div>
      </section>

      <section className="container-omega py-10">
        <h2 className="display-3 mb-8 text-foreground">{t(c.pathTitle)}</h2>
        <ol className="grid gap-3 md:grid-cols-4">
          {c.path.map((p, i) => (
            <li key={p.t.en} className="panel relative p-5">
              <div className="flex items-center justify-between">
                <span className="mono-label text-primary">{t(p.k)}</span>
                <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-foreground">{t(p.t)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t(p.b)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-omega py-10">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <h2 className="display-3 text-foreground">{t(c.learningTitle)}</h2>
          <p className="flex items-center gap-2 text-[12.5px] text-dim"><BookOpen size={14} /> {t(c.learningNote)}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.learning.map((x, i) => (
            <div key={x.t.en} className="panel flex gap-4 p-5" data-accent={["cyan", "ice", "violet", "mint", "amber", "violet"][i]}>
              <div className="accent-text accent-border accent-soft grid h-11 w-11 shrink-0 place-items-center rounded-xl border">
                <x.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">{t(x.t)}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">{t(x.b)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-omega grid gap-3 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel p-7 md:p-10">
          <div className="mono-label text-primary">{t(c.whyTitle)}</div>
          <div className="prose-omega mt-5">
            {c.why.map((p) => (
              <p key={p.en}>{t(p)}</p>
            ))}
          </div>
          <Link to="/vision" className="mt-8 inline-flex items-center gap-2 text-[13px] text-primary transition-all hover:gap-3">
            {t(c.back)} <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="panel p-7" data-accent="amber">
          <div className="mono-label accent-text">{t(c.honestTitle)}</div>
          <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">{t(c.honest)}</p>
        </div>
      </section>
    </>
  );
}
