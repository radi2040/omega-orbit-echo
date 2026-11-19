import { l, type L } from "@/lib/i18n";

/**
 * Evidence classes used across the site so readers can tell what exists today
 * from what OMEGA proposes or merely speculates about.
 */
export type Evidence = "established" | "published" | "proposal" | "speculative";

export const evidenceMeta: Record<Evidence, { label: L; accent: string; description: L }> = {
  established: {
    label: l("Established Technology", "Etablierte Technologie"),
    accent: "mint",
    description: l(
      "Deployed and in real-world use today, with known properties and failure modes.",
      "Heute im realen Einsatz, mit bekannten Eigenschaften und Fehlerbildern.",
    ),
  },
  published: {
    label: l("Published Research", "Veröffentlichte Forschung"),
    accent: "cyan",
    description: l(
      "Described in peer-reviewed or widely cited work; may not be deployed at scale.",
      "In begutachteter oder vielzitierter Literatur beschrieben; nicht unbedingt großflächig im Einsatz.",
    ),
  },
  proposal: {
    label: l("OMEGA Proposal", "OMEGA-Vorschlag"),
    accent: "violet",
    description: l(
      "A design idea put forward by OMEGA. Untested, open to critique and revision.",
      "Eine Entwurfsidee von OMEGA. Ungetestet, offen für Kritik und Überarbeitung.",
    ),
  },
  speculative: {
    label: l("Speculative Hypothesis", "Spekulative Hypothese"),
    accent: "amber",
    description: l(
      "A long-range possibility that depends on unknowns. Stated to be examined, not believed.",
      "Eine langfristige Möglichkeit, die von Unbekannten abhängt. Formuliert, um geprüft zu werden – nicht, um geglaubt zu werden.",
    ),
  },
};
