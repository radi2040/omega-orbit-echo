import type { L } from "@/lib/i18n";
import type { Evidence } from "../evidence";

export type CollectionId =
  | "network-states"
  | "post-westphalian"
  | "parallel-societies"
  | "decentralized-governance"
  | "institutional-economics"
  | "political-philosophy"
  | "distributed-infrastructure"
  | "artificial-intelligence"
  | "energy-systems"
  | "civilization-futures";

export type Collection = {
  id: CollectionId;
  index: string;
  title: L;
  short: L;
  description: L;
  accent: "cyan" | "violet" | "amber" | "mint" | "ice" | "rose";
  /** Seed for the collection's generative mark. */
  glyph: number;
  questions: L[];
};

/** Kinds of works the library can hold. Books are never presented as papers, nor external work as OMEGA's. */
export type WorkType =
  | "book"
  | "academic-paper"
  | "institutional-report"
  | "essay"
  | "technical"
  | "x-post"
  | "dataset";

export type ProfileLink = { kind: "website" | "x" | "github" | "publisher" | "other"; label: string; url: string };

export type Author = {
  id: string;
  name: string;
  /** Only verifiable facts. Each bio states where it comes from. */
  bio: L;
  bioSource: { label: string; url?: string };
  affiliation?: L;
  lifespan?: string;
  xHandle?: string;
  links: ProfileLink[];
  /** Marks the OMEGA founder so readers can see when OMEGA-adjacent work is shown. */
  isOmegaFounder?: boolean;
};

export type Quote = { text: string; locator: string; lang: string };

export type OmegaPerspective = {
  valuable: L;
  assumptions: L;
  limitations: L;
  unresolved: L;
  relation: L;
};

export type LibraryEntry = {
  id: string;
  type: WorkType;
  title: string;
  subtitle?: string;
  authorIds: string[];
  /** Display form of all authors / editors as credited by the source. */
  authors: string;
  publisher: string;
  year: number;
  /** ISO date of original publication, only when verified. */
  date?: string;
  /** Date OMEGA added the entry to the observatory. */
  addedOn: string;
  pages?: string;
  isbn?: string;
  doi?: string;
  url?: string;
  links?: { label: L; url: string }[];
  license?: { name: string; url: string; note: L };
  /** Language of the original work (ISO 639-1). */
  language: string;
  collections: CollectionId[];
  evidence: Evidence;
  keywords: string[];
  /** Editorial summary written by OMEGA — never the author's words. */
  summary: L;
  relevance: L;
  /** Layer A — what the original work argues (paraphrased). */
  original?: L[];
  quotes?: Quote[];
  themes?: L[];
  /** Layer B — research context, competing arguments. */
  context?: L[];
  /** Layer C — OMEGA's independent analysis. */
  perspective?: OmegaPerspective;
  questions?: L[];
  cover?: { src: string; alt: L; credit: L };
  x?: { handle: string; url: string; date: string };
  related?: string[];
  featured?: boolean;
  /** When the source makes factual claims OMEGA has not independently verified. */
  claimsNote?: L;
};

export type Theme = {
  slug: string;
  title: L;
  question: L;
  collections: CollectionId[];
};
