import { l, type L } from "@/lib/i18n";

export type MilestoneStatus = "completed" | "ongoing" | "planned" | "speculative";

export const statusMeta: Record<MilestoneStatus, { label: L; accent: string }> = {
  completed: { label: l("Completed", "Abgeschlossen"), accent: "mint" },
  ongoing: { label: l("Ongoing", "Laufend"), accent: "cyan" },
  planned: { label: l("Planned", "Geplant"), accent: "violet" },
  speculative: { label: l("Speculative", "Spekulativ"), accent: "amber" },
};

export type Phase = {
  index: string;
  title: L;
  summary: L;
  status: MilestoneStatus;
  items: { text: L; status: MilestoneStatus }[];
};

/** Statuses describe the state of this research project, never of a deployed system. */
export const phases: Phase[] = [
  {
    index: "01",
    title: l("Foundation", "Fundament"),
    summary: l("Define the question, the scope and the honest boundaries of OMEGA.", "Die Frage, den Umfang und die ehrlichen Grenzen von OMEGA definieren."),
    status: "completed",
    items: [
      { text: l("Formulate OMEGA's central research question.", "OMEGAs zentrale Forschungsfrage formulieren."), status: "completed" },
      { text: l("Publish a first concept website.", "Eine erste Konzept-Website veröffentlichen."), status: "completed" },
      { text: l("Structure the vision into five connected domains.", "Die Vision in fünf verbundene Bereiche gliedern."), status: "completed" },
      { text: l("Introduce evidence classes to separate fact from proposal.", "Evidenzklassen einführen, um Fakten von Vorschlägen zu trennen."), status: "completed" },
    ],
  },
  {
    index: "02",
    title: l("Research", "Forschung"),
    summary: l("Study the existing literature and technology in each domain.", "Die bestehende Literatur und Technologie in jedem Bereich studieren."),
    status: "ongoing",
    items: [
      { text: l("Build an annotated research library.", "Eine kommentierte Forschungsbibliothek aufbauen."), status: "ongoing" },
      { text: l("Write a glossary of core concepts.", "Ein Glossar der Kernbegriffe schreiben."), status: "completed" },
      { text: l("Publish domain-by-domain research notes.", "Forschungsnotizen für jeden Bereich veröffentlichen."), status: "planned" },
      { text: l("Seek feedback from people working in these fields.", "Rückmeldungen von Fachleuten in diesen Feldern einholen."), status: "planned" },
    ],
  },
  {
    index: "03",
    title: l("Modelling", "Modellierung"),
    summary: l("Turn ideas into transparent, testable models.", "Ideen in transparente, prüfbare Modelle übersetzen."),
    status: "ongoing",
    items: [
      { text: l("Educational governance, contract and energy simulators.", "Lern-Simulatoren für Governance, Verträge und Energie."), status: "completed" },
      { text: l("Formal description of Delegated Swarm Voting.", "Formale Beschreibung von Delegated Swarm Voting."), status: "ongoing" },
      { text: l("Compare delegation caps across simulated populations.", "Delegationsgrenzen in simulierten Populationen vergleichen."), status: "planned" },
    ],
  },
  {
    index: "04",
    title: l("Systems Integration", "Systemintegration"),
    summary: l("Specify how the layers would connect in a reference architecture.", "Spezifizieren, wie die Schichten in einer Referenzarchitektur zusammenwirken würden."),
    status: "planned",
    items: [
      { text: l("Reference architecture document with interfaces between layers.", "Referenzarchitektur mit Schnittstellen zwischen den Schichten."), status: "planned" },
      { text: l("Threat model covering identity, governance and AI risks.", "Bedrohungsmodell für Identitäts-, Governance- und KI-Risiken."), status: "planned" },
      { text: l("Open-source prototype on a local test network.", "Open-Source-Prototyp in einem lokalen Testnetz."), status: "planned" },
    ],
  },
  {
    index: "05",
    title: l("Experimentation", "Experimente"),
    summary: l("Small, reversible experiments — only with willing participants.", "Kleine, umkehrbare Experimente – nur mit freiwilligen Teilnehmenden."),
    status: "planned",
    items: [
      { text: l("Simulated governance exercises with volunteer groups.", "Simulierte Governance-Übungen mit Freiwilligengruppen."), status: "planned" },
      { text: l("Evaluate results openly, including failures.", "Ergebnisse offen auswerten, einschließlich Misserfolgen."), status: "planned" },
      { text: l("Explore collaboration with a community energy project.", "Zusammenarbeit mit einem Bürgerenergieprojekt ausloten."), status: "speculative" },
    ],
  },
  {
    index: "06",
    title: l("Long-Term Vision", "Langfristige Vision"),
    summary: l("Ambitions that depend on many unknowns. Stated to be examined, not promised.", "Ambitionen, die von vielen Unbekannten abhängen. Formuliert, um geprüft zu werden – nicht versprochen."),
    status: "speculative",
    items: [
      { text: l("Interoperable, community-governed digital public infrastructure.", "Interoperable, gemeinschaftlich verwaltete digitale öffentliche Infrastruktur."), status: "speculative" },
      { text: l("Regional coordination of energy and resources across municipalities.", "Regionale Koordination von Energie und Ressourcen über Gemeindegrenzen hinweg."), status: "speculative" },
      { text: l("Safe integration of advanced AI into collective decision support.", "Sichere Integration fortgeschrittener KI in kollektive Entscheidungsunterstützung."), status: "speculative" },
    ],
  },
];
