import { l, type L } from "@/lib/i18n";
import type { EntryBody, EntryMeta, EntryType } from "./types";

/** Sections every research paper must contain, in order. References are rendered from `references`. */
export const paperSectionKeys = ["abstract", "question", "background", "literature", "methodology", "analysis", "limitations", "findings", "future"] as const;
export const experimentSectionKeys = ["abstract", "question", "model", "parameters", "observations", "limitations", "future"] as const;

export const entryTypeLabel: Record<EntryType, L> = {
  paper: l("Research paper", "Forschungspapier"),
  essay: l("Analytical essay", "Analytischer Essay"),
  experiment: l("Technical experiment", "Technisches Experiment"),
};

const D = "2026-11-23";
const base = { status: "draft", drafted: D, author: "Amine Radi", aiAssisted: true } as const;

export const entriesMeta: EntryMeta[] = [
  { ...base, id: "beyond-centralization", number: "01", type: "paper",
    slug: { en: "beyond-centralization", de: "jenseits-der-zentralisierung" },
    title: l("Beyond Centralization: Designing the Architecture of Decentralized Human Institutions", "Jenseits der Zentralisierung: Zur Architektur dezentraler menschlicher Institutionen"),
    summary: l("A research proposal on which institutional functions can be distributed, which cannot, and how to tell the difference.", "Ein Forschungsvorschlag dazu, welche institutionellen Funktionen sich verteilen lassen, welche nicht – und wie man den Unterschied erkennt."),
    domains: ["decentralized-governance", "law-digital-sovereignty"],
    references: ["ostrom-1990", "ostrom-2010", "north-1990", "hassan-defilippi-2021", "defilippi-wright-2018", "lessig-1999", "hope-ludlow-2025"],
    related: ["decentralized-governance-global-scale", "trust-reputation-borderless"] },
  { ...base, id: "swarm-human-organization", number: "02", type: "essay",
    slug: { en: "swarm-intelligence-human-organization", de: "schwarmintelligenz-menschliche-organisation" },
    title: l("Swarm Intelligence as a Model for Human Organization", "Schwarmintelligenz als Modell menschlicher Organisation"),
    summary: l("What biological swarms can and cannot teach us about coordinating people — and where the analogy breaks.", "Was biologische Schwärme über die Koordination von Menschen lehren können und was nicht – und wo die Analogie bricht."),
    domains: ["swarm-intelligence", "decentralized-governance"],
    references: ["bonabeau-dorigo-theraulaz-1999", "seeley-2010", "reynolds-1987", "hong-page-2004", "woolley-2010", "surowiecki-2004", "malone-2018"],
    related: ["human-ai-swarms", "decentralized-governance-global-scale"] },
  { ...base, id: "global-digital-citizenship", number: "03", type: "paper",
    slug: { en: "global-digital-citizenship", de: "globale-digitale-buergerschaft" },
    title: l("Global Digital Citizenship Beyond National Borders", "Globale digitale Bürgerschaft jenseits nationaler Grenzen"),
    summary: l("A proposal to study cross-border digital membership as a complement to national citizenship, never a substitute for it.", "Ein Vorschlag, grenzüberschreitende digitale Mitgliedschaft als Ergänzung zur Staatsbürgerschaft zu untersuchen – nie als deren Ersatz."),
    domains: ["digital-citizenship", "cryptography-identity", "network-states"],
    references: ["baubock-2018", "e-residency", "x-road", "w3c-did-2022", "w3c-vc-2025", "weyl-2022", "srinivasan-2022", "blum-zuber-2016"],
    related: ["trust-reputation-borderless", "decentralized-governance-global-scale"] },
  { ...base, id: "building-infrastructure-global-collaboration", number: "04", type: "paper",
    slug: { en: "building-infrastructure-global-collaboration", de: "infrastruktur-durch-globale-zusammenarbeit" },
    title: l("Building Infrastructure Through Global Collaboration", "Infrastruktur durch globale Zusammenarbeit aufbauen"),
    summary: l("What open-source software and open mapping suggest — and do not prove — about collaboratively built physical infrastructure.", "Was Open-Source-Software und offene Kartierung über gemeinschaftlich gebaute physische Infrastruktur nahelegen – und was nicht."),
    domains: ["collaborative-infrastructure", "digital-economics"],
    references: ["benkler-2006", "raymond-1999", "haklay-weber-2008", "kittur-kraut-2008", "ostrom-1990", "buterin-hitzig-weyl-2019", "anderson-2004"],
    related: ["digital-communities-physical-infrastructure", "distributed-energy-coordination"] },
  { ...base, id: "future-distributed-computing", number: "05", type: "experiment", widget: "replication-sim",
    slug: { en: "future-of-distributed-computing", de: "zukunft-des-verteilten-rechnens" },
    title: l("The Future of Distributed Computing", "Die Zukunft des verteilten Rechnens"),
    summary: l("An interactive model of replication and fault tolerance, framed by the established literature on consensus and peer-to-peer systems.", "Ein interaktives Modell von Replikation und Fehlertoleranz, eingebettet in die etablierte Literatur zu Konsens und Peer-to-Peer-Systemen."),
    domains: ["decentralized-computing", "cybersecurity-resilience"],
    references: ["lamport-1982", "castro-liskov-1999", "ongaro-2014", "stoica-2001", "maymounkov-2002", "benet-2014", "dean-ghemawat-2004", "shi-2016", "mcmahan-2017", "anderson-2004"],
    related: ["trust-reputation-borderless", "building-infrastructure-global-collaboration"] },
  { ...base, id: "human-ai-swarms", number: "06", type: "experiment", widget: "swarm-sim",
    slug: { en: "human-ai-swarms", de: "mensch-ki-schwaerme" },
    title: l("Human-AI Swarms and Collective Decision-Making", "Mensch-KI-Schwärme und kollektive Entscheidungsfindung"),
    summary: l("A response-threshold task-allocation model with an adjustable share of manipulative agents.", "Ein Schwellenwert-Modell der Aufgabenverteilung mit einstellbarem Anteil manipulativer Agenten."),
    domains: ["swarm-intelligence", "human-ai-symbiosis", "ai-governance-agents"],
    references: ["bonabeau-1996", "bonabeau-dorigo-theraulaz-1999", "park-2023", "wooldridge-2009", "licklider-1960", "malone-2018", "amodei-2016", "douceur-2002"],
    related: ["swarm-human-organization", "trust-reputation-borderless"] },
  { ...base, id: "decentralized-governance-global-scale", number: "07", type: "paper",
    slug: { en: "decentralized-governance-global-scale", de: "dezentrale-governance-im-globalen-massstab" },
    title: l("Decentralized Governance at Global Scale", "Dezentrale Governance im globalen Maßstab"),
    summary: l("Can one-member-one-vote, delegation and polycentric design hold up across millions of participants? A research design.", "Halten ein Mitglied – eine Stimme, Delegation und polyzentrisches Design über Millionen Beteiligte? Ein Forschungsdesign."),
    domains: ["decentralized-governance", "digital-citizenship", "law-digital-sovereignty"],
    references: ["ostrom-2010", "landemore-2020", "lalley-weyl-2018", "blum-zuber-2016", "kahng-2021", "acemoglu-robinson-2012", "bell-2017", "hassan-defilippi-2021"],
    related: ["beyond-centralization", "global-digital-citizenship"] },
  { ...base, id: "trust-reputation-borderless", number: "08", type: "paper",
    slug: { en: "trust-reputation-borderless-networks", de: "vertrauen-und-reputation-in-grenzenlosen-netzwerken" },
    title: l("Trust and Reputation in Borderless Networks", "Vertrauen und Reputation in grenzenlosen Netzwerken"),
    summary: l("How strangers across jurisdictions could build accountable trust without a central registry — and how such systems fail.", "Wie Fremde über Rechtsräume hinweg ohne zentrales Register belastbares Vertrauen aufbauen könnten – und wie solche Systeme scheitern."),
    domains: ["cryptography-identity", "digital-citizenship", "cybersecurity-resilience"],
    references: ["resnick-2000", "kamvar-2003", "douceur-2002", "chaum-1985", "weyl-2022", "w3c-vc-2025", "saltzer-schroeder-1975"],
    related: ["global-digital-citizenship", "human-ai-swarms"] },
  { ...base, id: "distributed-energy-coordination", number: "09", type: "experiment", widget: "energy-sim",
    slug: { en: "distributed-energy-resource-coordination", de: "dezentrale-energie-und-ressourcenkoordination" },
    title: l("Distributed Energy and Resource Coordination", "Dezentrale Energie und Ressourcenkoordination"),
    summary: l("A simplified microgrid model for exploring how shared storage and local generation change resilience.", "Ein vereinfachtes Microgrid-Modell, um zu erkunden, wie gemeinsame Speicher und lokale Erzeugung die Resilienz verändern."),
    domains: ["energy-depin", "digital-economics"],
    references: ["lasseter-2002", "pudjianto-2007", "palensky-2011", "irena-2022-costs", "iea-energy-ai-2025", "iea-aeo-2022", "ostrom-1990"],
    related: ["building-infrastructure-global-collaboration", "digital-communities-physical-infrastructure"] },
  { ...base, id: "digital-communities-physical-infrastructure", number: "10", type: "essay",
    slug: { en: "digital-communities-to-physical-infrastructure", de: "von-digitalen-gemeinschaften-zu-physischer-infrastruktur" },
    title: l("From Digital Communities to Physical Infrastructure", "Von digitalen Gemeinschaften zu physischer Infrastruktur"),
    summary: l("Why the step from online coordination to roads, power and buildings is the hardest one, and what it would require.", "Warum der Schritt von Online-Koordination zu Straßen, Strom und Gebäuden der schwierigste ist – und was er erfordern würde."),
    domains: ["collaborative-infrastructure", "network-states", "robotics-automation"],
    references: ["srinivasan-2022", "hope-ludlow-2025", "benkler-2006", "haklay-weber-2008", "townsend-2013", "lasseter-2002", "rubenstein-2014"],
    related: ["building-infrastructure-global-collaboration", "distributed-energy-coordination"] },
];

const bodyModules = import.meta.glob<{ default: EntryBody }>("./data/entries/*.json");

export function getEntry(id: string): EntryMeta | undefined {
  return entriesMeta.find((e) => e.id === id);
}

export function getEntryBySlug(lang: "en" | "de", slug: string): EntryMeta | undefined {
  return entriesMeta.find((e) => e.slug[lang] === slug);
}

export async function loadEntryBody(id: string): Promise<EntryBody | undefined> {
  const loader = bodyModules[`./data/entries/${id}.json`];
  return loader ? (await loader()).default : undefined;
}

/** Words per minute used for reading-time estimates. */
export const WORDS_PER_MINUTE = 220;

export function countWords(text: string): number {
  const stripped = text.replace(/\[ref:[^\]]+\]/g, " ").replace(/[#*_>`|-]/g, " ");
  return stripped.split(/\s+/).filter(Boolean).length;
}

/** Reading time in whole minutes (minimum 1) for one language of an entry body. */
export function readingMinutes(body: EntryBody, lang: "en" | "de"): number {
  const words = body.sections.reduce((n, s) => n + countWords(s.heading[lang]) + countWords(s.body[lang]), 0);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Citation ids used inline as [ref:id] markers. */
export function citedIds(text: string): string[] {
  return [...text.matchAll(/\[ref:([^\]]+)\]/g)].map((m) => m[1] ?? "");
}
