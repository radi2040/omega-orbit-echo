import { createFileRoute } from "@tanstack/react-router";

import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { l, useT } from "@/lib/i18n";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture Explorer — OMEGA" },
      { name: "description", content: "An interactive systems map of OMEGA's five layers — governance, digital infrastructure, energy, intelligence and civilization — and what flows between them." },
      { property: "og:title", content: "OMEGA Architecture Explorer" },
      { property: "og:description", content: "Explore purposes, components, inputs, outputs, dependencies and open questions for each OMEGA layer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Architecture,
});

const c = {
  eyebrow: l("Interactive architecture", "Interaktive Architektur"),
  title: l("Five layers.", "Fünf Schichten."),
  accent: l("One system of dependencies.", "Ein System von Abhängigkeiten."),
  intro: l(
    "Each line below is a real dependency: something one layer provides that another needs. Select a layer to see its purpose, components, inputs and outputs, the technologies that exist today, what OMEGA proposes, and what remains unresolved.",
    "Jede Linie ist eine echte Abhängigkeit: etwas, das eine Schicht liefert und eine andere braucht. Wählen Sie eine Schicht, um Zweck, Komponenten, Ein- und Ausgänge, heute existierende Technologien, OMEGAs Vorschläge und offene Fragen zu sehen.",
  ),
  readEyebrow: l("Reading the map", "Die Karte lesen"),
  readTitle: l("What the architecture does — and does not — show.", "Was die Architektur zeigt – und was nicht."),
  read: [
    {
      t: l("Physical before digital", "Physisch vor digital"),
      b: l("Energy sits at the base: without power there is no network, no ledger and no AI.", "Energie bildet die Basis: Ohne Strom gibt es kein Netz, kein Ledger und keine KI."),
    },
    {
      t: l("Legitimacy flows both ways", "Legitimität fließt in beide Richtungen"),
      b: l("Governance produces decisions for communities; communities grant governance its legitimacy.", "Governance erzeugt Entscheidungen für Gemeinschaften; Gemeinschaften verleihen Governance ihre Legitimität."),
    },
    {
      t: l("Intelligence advises, never rules", "Intelligenz berät, herrscht nie"),
      b: l("AI feeds forecasts and summaries into governance and energy, but receives its mandate from governance.", "KI liefert Prognosen und Zusammenfassungen an Governance und Energie, erhält ihr Mandat aber von der Governance."),
    },
    {
      t: l("A conceptual model", "Ein konzeptionelles Modell"),
      b: l("This is a research map, not the design of a running system. Real implementations would need far more detail.", "Dies ist eine Forschungskarte, nicht der Entwurf eines laufenden Systems. Echte Umsetzungen bräuchten weit mehr Details."),
    },
  ],
};

function Architecture() {
  const t = useT();
  return (
    <>
      <PageHero index="003" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} />
      <section className="container-omega">
        <ArchitectureExplorer />
      </section>
      <section className="container-omega py-20">
        <SectionHeading eyebrow={c.readEyebrow} title={c.readTitle} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.read.map((x, i) => (
            <div key={x.t.en} className="panel p-5">
              <div className="font-mono text-[10.5px] text-primary">0{i + 1}</div>
              <h3 className="mt-3 text-[15px] font-semibold text-foreground">{t(x.t)}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t(x.b)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
