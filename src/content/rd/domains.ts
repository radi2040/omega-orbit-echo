import { l } from "@/lib/i18n";
import type { DomainDetail, DomainMeta } from "./types";

export const domainsMeta: DomainMeta[] = [
  { id: "decentralized-governance", number: "01", slug: { en: "decentralized-governance", de: "dezentrale-governance" }, accent: "cyan", widget: "governance-sim",
    title: l("Decentralized Governance & Institutional Design", "Dezentrale Governance & Institutionendesign"),
    short: l("How groups without a single centre make, contest and revise collective decisions.", "Wie Gruppen ohne einzelnes Zentrum kollektive Entscheidungen treffen, anfechten und überarbeiten.") },
  { id: "decentralized-computing", number: "02", slug: { en: "decentralized-computing", de: "dezentrales-rechnen" }, accent: "ice", featured: true, widget: "replication-sim",
    title: l("Decentralized Computing & Distributed Intelligence", "Dezentrales Rechnen und verteilte Intelligenz"),
    short: l("Computation, storage and learning spread across many independently operated machines.", "Rechnen, Speichern und Lernen, verteilt auf viele unabhängig betriebene Maschinen.") },
  { id: "swarm-intelligence", number: "03", slug: { en: "swarm-intelligence", de: "schwarmintelligenz" }, accent: "violet", featured: true, widget: "swarm-sim",
    title: l("Swarm Intelligence & Collective Systems", "Schwarmintelligenz und kollektive Systeme"),
    short: l("How simple local rules among many agents can produce coordinated group behaviour.", "Wie einfache lokale Regeln zwischen vielen Agenten koordiniertes Gruppenverhalten hervorbringen können.") },
  { id: "digital-citizenship", number: "04", slug: { en: "digital-citizenship", de: "digitale-buergerschaft" }, accent: "cyan", featured: true,
    title: l("Decentralized Citizenship & Global Digital Membership", "Dezentrale Bürgerschaft und globale digitale Mitgliedschaft"),
    short: l("Rights, duties and participation in cross-border digital communities — alongside, not instead of, national citizenship.", "Rechte, Pflichten und Teilhabe in grenzüberschreitenden digitalen Gemeinschaften – neben, nicht anstelle der Staatsbürgerschaft.") },
  { id: "collaborative-infrastructure", number: "05", slug: { en: "collaborative-infrastructure", de: "kollaborative-infrastruktur" }, accent: "mint", featured: true,
    title: l("Global Collaborative Infrastructure Development", "Globale kollaborative Infrastrukturentwicklung"),
    short: l("How distributed contributors could design, finance and maintain shared infrastructure.", "Wie verteilte Beitragende gemeinsame Infrastruktur entwerfen, finanzieren und instand halten könnten.") },
  { id: "ai-governance-agents", number: "06", slug: { en: "ai-governance-agents", de: "ki-governance-agenten" }, accent: "violet",
    title: l("AI Governance & Autonomous Agents", "KI-Governance & autonome Agenten"),
    short: l("Oversight, accountability and limits for AI systems that act on people's behalf.", "Aufsicht, Rechenschaft und Grenzen für KI-Systeme, die im Auftrag von Menschen handeln.") },
  { id: "network-states", number: "07", slug: { en: "network-states", de: "netzwerkstaaten" }, accent: "cyan",
    title: l("Network States & Future Societies", "Netzwerkstaaten & zukünftige Gesellschaften"),
    short: l("Online-first communities that seek physical presence and institutional recognition — examined critically.", "Online-zuerst-Gemeinschaften, die physische Präsenz und institutionelle Anerkennung anstreben – kritisch betrachtet.") },
  { id: "cryptography-identity", number: "08", slug: { en: "cryptography-identity", de: "kryptographie-identitaet" }, accent: "ice",
    title: l("Cryptography, Privacy & Digital Identity", "Kryptographie, Privatsphäre & digitale Identität"),
    short: l("Proving who you are, or what you are allowed to do, without surrendering more data than necessary.", "Nachweisen, wer man ist oder was man darf, ohne mehr Daten als nötig preiszugeben.") },
  { id: "digital-economics", number: "09", slug: { en: "digital-economics", de: "digitale-oekonomie" }, accent: "mint", widget: "contract-explorer",
    title: l("Digital Economics & Resource Coordination", "Digitale Ökonomie & Ressourcenkoordination"),
    short: l("Funding public goods and allocating shared resources in open networks.", "Finanzierung öffentlicher Güter und Zuteilung gemeinsamer Ressourcen in offenen Netzwerken.") },
  { id: "energy-depin", number: "10", slug: { en: "energy-depin", de: "energie-depin" }, accent: "mint", widget: "energy-sim",
    title: l("Decentralized Energy Systems & DePIN", "Dezentrale Energiesysteme & DePIN"),
    short: l("Microgrids, distributed generation and community-operated physical networks.", "Microgrids, dezentrale Erzeugung und gemeinschaftlich betriebene physische Netze.") },
  { id: "robotics-automation", number: "11", slug: { en: "robotics-automation", de: "robotik-automatisierung" }, accent: "violet",
    title: l("Robotics, Automation & Autonomous Infrastructure", "Robotik, Automatisierung & autonome Infrastruktur"),
    short: l("Machines that build, inspect and maintain infrastructure — and who governs them.", "Maschinen, die Infrastruktur bauen, prüfen und warten – und wer sie steuert.") },
  { id: "human-ai-symbiosis", number: "12", slug: { en: "human-ai-symbiosis", de: "mensch-ki-symbiose" }, accent: "violet",
    title: l("Human-AI Symbiosis & Biological Intelligence", "Mensch-KI-Symbiose & biologische Intelligenz"),
    short: l("Augmenting human judgement with machines while keeping people in charge.", "Menschliches Urteilsvermögen mit Maschinen erweitern – und dabei Menschen in der Verantwortung halten.") },
  { id: "space-infrastructure", number: "13", slug: { en: "space-infrastructure", de: "weltraum-infrastruktur" }, accent: "ice",
    title: l("Space Infrastructure & Beyond-Earth Institutions", "Weltrauminfrastruktur & Institutionen jenseits der Erde"),
    short: l("How existing space law frames any future shared infrastructure beyond Earth.", "Wie bestehendes Weltraumrecht jede künftige gemeinsame Infrastruktur jenseits der Erde rahmt.") },
  { id: "cybersecurity-resilience", number: "14", slug: { en: "cybersecurity-resilience", de: "cybersicherheit-resilienz" }, accent: "ice",
    title: l("Cybersecurity, Resilience & Network Security", "Cybersicherheit, Resilienz & Netzwerksicherheit"),
    short: l("Keeping open, distributed systems safe against faults, attacks and capture.", "Offene, verteilte Systeme gegen Ausfälle, Angriffe und Vereinnahmung sichern.") },
  { id: "law-digital-sovereignty", number: "15", slug: { en: "law-digital-sovereignty", de: "recht-digitale-souveraenitaet" }, accent: "cyan",
    title: l("Law, Digital Sovereignty & Polycentric Governance", "Recht, digitale Souveränität & polyzentrische Governance"),
    short: l("How code, contracts and states share — and contest — authority.", "Wie Code, Verträge und Staaten Autorität teilen – und um sie ringen.") },
];

const detailModules = import.meta.glob<{ default: DomainDetail }>("./data/domains/*.json");

export function getDomainBySlug(lang: "en" | "de", slug: string): DomainMeta | undefined {
  return domainsMeta.find((d) => d.slug[lang] === slug);
}

export function getDomain(id: string): DomainMeta | undefined {
  return domainsMeta.find((d) => d.id === id);
}

export async function loadDomainDetail(id: string): Promise<DomainDetail | undefined> {
  const loader = detailModules[`./data/domains/${id}.json`];
  return loader ? (await loader()).default : undefined;
}
