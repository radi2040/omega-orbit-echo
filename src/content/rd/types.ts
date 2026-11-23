import type { L } from "@/lib/i18n";
import type { Evidence } from "@/content/evidence";

export type RdAccent = "cyan" | "ice" | "violet" | "mint";

/** Interactive experiments that exist in the codebase and can be embedded on research pages. */
export type ExperimentWidget = "swarm-sim" | "replication-sim" | "governance-sim" | "energy-sim" | "contract-explorer";

export type DomainMeta = {
  /** Stable id, also the data file name. */
  id: string;
  number: string;
  slug: { en: string; de: string };
  accent: RdAccent;
  title: L;
  short: L;
  /** Domains with a dedicated, extended research programme. */
  featured?: boolean;
  widget?: ExperimentWidget;
};

export type Concept = { term: L; note: L; evidence: Evidence };

export type Experiment = {
  title: L;
  description: L;
  status: "concept" | "prototype" | "planned";
  widget?: ExperimentWidget;
};

/** Long-form domain content, stored as JSON per domain. Strings may contain light Markdown. */
export type DomainDetail = {
  id: string;
  overview: L;
  topics: L[];
  questions: L[];
  concepts: Concept[];
  literature: string[];
  experiments: Experiment[];
  openQuestions: L[];
};

export type EntryType = "paper" | "essay" | "experiment";
export type EntryStatus = "draft" | "in-progress" | "published";

export type EntryMeta = {
  id: string;
  number: string;
  slug: { en: string; de: string };
  type: EntryType;
  status: EntryStatus;
  title: L;
  summary: L;
  /** Domain ids. The first is the primary domain. */
  domains: string[];
  references: string[];
  related: string[];
  /** ISO date the draft was created. Not a publication date. */
  drafted: string;
  author: string;
  aiAssisted: boolean;
  widget?: ExperimentWidget;
};

export type EntrySection = { key: string; heading: L; body: L };

export type EntryBody = { id: string; sections: EntrySection[] };
