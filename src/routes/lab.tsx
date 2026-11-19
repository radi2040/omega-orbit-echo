import { createFileRoute } from "@tanstack/react-router";
import { FileCode2, Vote, Zap } from "lucide-react";
import type { ReactNode } from "react";

import { ContractExplorer } from "@/components/lab/ContractExplorer";
import { EnergySimulator } from "@/components/lab/EnergySimulator";
import { GovernanceSimulator } from "@/components/lab/GovernanceSimulator";
import { Eyebrow, PageHero } from "@/components/site/primitives";
import { l, useT, type L } from "@/lib/i18n";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Interactive Lab — OMEGA" },
      { name: "description", content: "Three deterministic educational simulations: a governance and voting simulator, a smart contract lifecycle explorer and a microgrid energy simulator." },
      { property: "og:title", content: "OMEGA Interactive Lab" },
      { property: "og:description", content: "Experiment with quorum, delegation and Sybil attacks; step through a smart contract; balance a solar-and-battery microgrid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Lab,
});

const c = {
  eyebrow: l("Interactive laboratory", "Interaktives Labor"),
  title: l("Models you can", "Modelle, die Sie"),
  accent: l("break on purpose.", "absichtlich brechen können."),
  intro: l(
    "Three transparent, deterministic educational models. They run entirely in your browser, disclose every assumption, and are not real operational systems. Their purpose is to make trade-offs visible.",
    "Drei transparente, deterministische Lernmodelle. Sie laufen vollständig in Ihrem Browser, legen jede Annahme offen und sind keine echten Betriebssysteme. Ihr Zweck ist, Zielkonflikte sichtbar zu machen.",
  ),
  disclaimer: l("Educational models · not real systems · no data leaves your browser", "Lernmodelle · keine echten Systeme · keine Daten verlassen Ihren Browser"),
  gov: {
    k: l("Simulation A", "Simulation A"),
    t: l("Governance simulator", "Governance-Simulator"),
    b: l(
      "Adjust participants, turnout, delegation, quorum and thresholds. Load a scenario to see how low participation, delegation concentration, Sybil attacks and missing minority protection can each produce an outcome the community did not want.",
      "Passen Sie Teilnehmende, Beteiligung, Delegation, Quorum und Schwellen an. Laden Sie ein Szenario, um zu sehen, wie geringe Beteiligung, Delegationskonzentration, Sybil-Angriffe und fehlender Minderheitenschutz jeweils zu Ergebnissen führen können, die die Gemeinschaft nicht wollte.",
    ),
  },
  sc: {
    k: l("Simulation B", "Simulation B"),
    t: l("Smart contract explorer", "Smart-Contract-Explorer"),
    b: l(
      "Follow a community fund disbursement through Proposal → Validation → Authorization → Execution → Verification → Audit. Change the inputs to see where and why the process halts.",
      "Verfolgen Sie eine Auszahlung aus einem Gemeinschaftsfonds durch Vorschlag → Validierung → Autorisierung → Ausführung → Verifikation → Prüfung. Ändern Sie die Eingaben, um zu sehen, wo und warum der Prozess stoppt.",
    ),
  },
  en: {
    k: l("Simulation C", "Simulation C"),
    t: l("Energy system simulator", "Energiesystem-Simulator"),
    b: l(
      "A community microgrid over one idealised day. Adjust solar, wind, demand and battery size to see surplus, deficit, charging and discharging hour by hour.",
      "Ein Gemeinschafts-Microgrid über einen idealisierten Tag. Passen Sie Solar, Wind, Bedarf und Batteriegröße an, um Überschuss, Defizit, Laden und Entladen Stunde für Stunde zu sehen.",
    ),
  },
};

function LabSection({ id, icon, accent, k, title, body, children }: { id: string; icon: ReactNode; accent: string; k: L; title: L; body: L; children: ReactNode }) {
  const t = useT();
  return (
    <section id={id} className="container-omega scroll-mt-28 py-10">
      <div className="panel p-5 sm:p-8" data-accent={accent}>
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="accent-text accent-border accent-soft grid h-12 w-12 shrink-0 place-items-center rounded-xl border">{icon}</div>
            <div>
              <div className="mono-label accent-text">{t(k)}</div>
              <h2 className="display-3 mt-1.5 text-foreground">{t(title)}</h2>
            </div>
          </div>
          <p className="max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">{t(body)}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Lab() {
  const t = useT();
  const jump = [
    { href: "#governance", label: c.gov.t },
    { href: "#contracts", label: c.sc.t },
    { href: "#energy", label: c.en.t },
  ];
  return (
    <>
      <PageHero index="004" eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {jump.map((j) => (
            <a key={j.href} href={j.href} className="chip !text-[11px] !normal-case !tracking-normal transition-colors hover:border-primary/50 hover:text-foreground">
              {t(j.label)}
            </a>
          ))}
        </div>
        <Eyebrow className="mt-8 !text-amber">{t(c.disclaimer)}</Eyebrow>
      </PageHero>
      <LabSection id="governance" icon={<Vote size={22} strokeWidth={1.5} />} accent="cyan" k={c.gov.k} title={c.gov.t} body={c.gov.b}>
        <GovernanceSimulator />
      </LabSection>
      <LabSection id="contracts" icon={<FileCode2 size={22} strokeWidth={1.5} />} accent="violet" k={c.sc.k} title={c.sc.t} body={c.sc.b}>
        <ContractExplorer />
      </LabSection>
      <LabSection id="energy" icon={<Zap size={22} strokeWidth={1.5} />} accent="amber" k={c.en.k} title={c.en.t} body={c.en.b}>
        <EnergySimulator />
      </LabSection>
    </>
  );
}
