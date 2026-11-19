import { l } from "@/lib/i18n";
import type { Collection, CollectionId } from "./types";

export const collections: Collection[] = [
  {
    id: "network-states",
    index: "C01",
    title: l("Network States & Digital Sovereignty", "Netzwerkstaaten & digitale Souveränität"),
    short: l("Online communities that seek political form — and what sovereignty means online.", "Online-Gemeinschaften, die politische Form suchen – und was Souveränität online bedeutet."),
    description: l(
      "Proposals for communities that begin online and aspire to territory, recognition or institutional power, read alongside critiques of what 'sovereignty' can mean for digital infrastructure.",
      "Vorschläge für Gemeinschaften, die online beginnen und Territorium, Anerkennung oder institutionelle Macht anstreben – gelesen neben Kritiken daran, was 'Souveränität' für digitale Infrastruktur bedeuten kann.",
    ),
    accent: "cyan",
    glyph: 3,
    questions: [
      l("Can a community without territory hold durable authority?", "Kann eine Gemeinschaft ohne Territorium dauerhafte Autorität besitzen?"),
      l("Who is sovereign over the infrastructure a digital community depends on?", "Wer ist souverän über die Infrastruktur, von der eine digitale Gemeinschaft abhängt?"),
    ],
  },
  {
    id: "post-westphalian",
    index: "C02",
    title: l("Post-Westphalian Governance", "Post-westfälische Governance"),
    short: l("What may follow, or sit beside, the territorial nation-state.", "Was dem territorialen Nationalstaat folgen oder neben ihm stehen könnte."),
    description: l(
      "Work on the history and myth of the Westphalian order, the plural meanings of sovereignty, and arguments about governance forms that do not map onto territory.",
      "Arbeiten zur Geschichte und zum Mythos der westfälischen Ordnung, zu den vielen Bedeutungen von Souveränität und zu Governance-Formen, die sich nicht auf Territorium abbilden lassen.",
    ),
    accent: "violet",
    glyph: 7,
    questions: [
      l("Is the nation-state a technology that can be superseded, or an institution that adapts?", "Ist der Nationalstaat eine ablösbare Technologie oder eine Institution, die sich anpasst?"),
      l("Which state functions can be unbundled — and which cannot?", "Welche Staatsfunktionen lassen sich entbündeln – und welche nicht?"),
    ],
  },
  {
    id: "parallel-societies",
    index: "C03",
    title: l("Parallel Societies", "Parallelgesellschaften"),
    short: l("Alternative institutions built alongside existing ones.", "Alternative Institutionen, die neben bestehenden aufgebaut werden."),
    description: l(
      "Here 'parallel' means parallel institutions — special jurisdictions, digital public services, popup communities — built inside existing legal orders, not the sociological sense of segregated communities.",
      "'Parallel' meint hier parallele Institutionen – Sonderzonen, digitale öffentliche Dienste, temporäre Gemeinschaften –, die innerhalb bestehender Rechtsordnungen entstehen, nicht den soziologischen Sinn abgeschotteter Milieus.",
    ),
    accent: "amber",
    glyph: 11,
    questions: [
      l("When does an alternative complement the state, and when does it erode shared obligations?", "Wann ergänzt eine Alternative den Staat, und wann untergräbt sie gemeinsame Pflichten?"),
    ],
  },
  {
    id: "decentralized-governance",
    index: "C04",
    title: l("Decentralized Governance", "Dezentrale Governance"),
    short: l("Voting, delegation, DAOs and polycentric decision-making.", "Abstimmung, Delegation, DAOs und polyzentrische Entscheidungsfindung."),
    description: l(
      "Mechanisms for collective decisions without a single centre — and the evidence about where they fail: capture, apathy, Sybil attacks and unaccountable code.",
      "Mechanismen für kollektive Entscheidungen ohne einziges Zentrum – und die Belege, wo sie scheitern: Vereinnahmung, Apathie, Sybil-Angriffe und unverantwortlicher Code.",
    ),
    accent: "mint",
    glyph: 5,
    questions: [
      l("How is legitimacy produced when no one holds final authority?", "Wie entsteht Legitimität, wenn niemand die letzte Autorität hat?"),
    ],
  },
  {
    id: "institutional-economics",
    index: "C05",
    title: l("Institutional Economics", "Institutionenökonomik"),
    short: l("Rules of the game, transaction costs and the commons.", "Spielregeln, Transaktionskosten und Gemeingüter."),
    description: l(
      "Why institutions exist, how they shape prosperity, and how communities govern shared resources without either the state or the market alone.",
      "Warum Institutionen existieren, wie sie Wohlstand prägen und wie Gemeinschaften gemeinsame Ressourcen ohne Staat oder Markt allein verwalten.",
    ),
    accent: "ice",
    glyph: 2,
    questions: [
      l("Do digital tools change transaction costs enough to change institutional form?", "Verändern digitale Werkzeuge Transaktionskosten genug, um institutionelle Formen zu verändern?"),
    ],
  },
  {
    id: "political-philosophy",
    index: "C06",
    title: l("Political Philosophy", "Politische Philosophie"),
    short: l("Legitimacy, consent, exit and voice.", "Legitimität, Zustimmung, Abwanderung und Widerspruch."),
    description: l(
      "The normative questions underneath every technical proposal: what makes authority legitimate, what members owe each other, and what exit can and cannot justify.",
      "Die normativen Fragen unter jedem technischen Vorschlag: Was macht Autorität legitim, was schulden Mitglieder einander, und was kann Abwanderung rechtfertigen – und was nicht?",
    ),
    accent: "rose",
    glyph: 13,
    questions: [
      l("Is voluntary membership sufficient for legitimacy?", "Reicht freiwillige Mitgliedschaft für Legitimität aus?"),
    ],
  },
  {
    id: "distributed-infrastructure",
    index: "C07",
    title: l("Distributed Computing & Infrastructure", "Verteiltes Rechnen & Infrastruktur"),
    short: l("Consensus, ledgers, identity and data exchange.", "Konsens, Ledger, Identität und Datenaustausch."),
    description: l(
      "The technical foundations — Byzantine fault tolerance, blockchains, content addressing, identity standards and working digital public infrastructure.",
      "Die technischen Grundlagen – byzantinische Fehlertoleranz, Blockchains, Inhaltsadressierung, Identitätsstandards und funktionierende digitale öffentliche Infrastruktur.",
    ),
    accent: "cyan",
    glyph: 17,
    questions: [
      l("Which coordination problems actually need a blockchain?", "Welche Koordinationsprobleme brauchen tatsächlich eine Blockchain?"),
    ],
  },
  {
    id: "artificial-intelligence",
    index: "C08",
    title: l("Artificial Intelligence", "Künstliche Intelligenz"),
    short: l("AI for deliberation — and the problem of control.", "KI für Beratung – und das Kontrollproblem."),
    description: l(
      "Research on the capabilities, safety and alignment of AI systems, and on collective intelligence in human groups.",
      "Forschung zu Fähigkeiten, Sicherheit und Ausrichtung von KI-Systemen sowie zu kollektiver Intelligenz in menschlichen Gruppen.",
    ),
    accent: "violet",
    glyph: 19,
    questions: [
      l("How can AI advice remain contestable by the people it affects?", "Wie bleibt KI-Beratung für die Betroffenen anfechtbar?"),
    ],
  },
  {
    id: "energy-systems",
    index: "C09",
    title: l("Energy Systems & Renewable Infrastructure", "Energiesysteme & erneuerbare Infrastruktur"),
    short: l("Microgrids, demand flexibility and the electricity cost of computing.", "Microgrids, Nachfrageflexibilität und der Strombedarf des Rechnens."),
    description: l(
      "Physical infrastructure that any digital community ultimately depends on: renewable generation, microgrids, virtual power plants and data-centre demand.",
      "Physische Infrastruktur, von der jede digitale Gemeinschaft letztlich abhängt: erneuerbare Erzeugung, Microgrids, virtuelle Kraftwerke und Rechenzentrumsbedarf.",
    ),
    accent: "amber",
    glyph: 23,
    questions: [
      l("Can energy communities be governed as commons?", "Lassen sich Energiegemeinschaften als Gemeingüter verwalten?"),
    ],
  },
  {
    id: "civilization-futures",
    index: "C10",
    title: l("Civilization Futures", "Zukünfte der Zivilisation"),
    short: l("Cities, development and long-range institutional change.", "Städte, Entwicklung und langfristiger institutioneller Wandel."),
    description: l(
      "Smart cities, development strategies and long-range scenarios — read with caution about technology-first visions of the future.",
      "Smart Cities, Entwicklungsstrategien und langfristige Szenarien – gelesen mit Vorsicht gegenüber technikgetriebenen Zukunftsbildern.",
    ),
    accent: "mint",
    glyph: 29,
    questions: [
      l("What would count as evidence that a new institutional layer works?", "Was würde als Beleg gelten, dass eine neue institutionelle Schicht funktioniert?"),
    ],
  },
];

export const collectionById = (id: string) => collections.find((c) => c.id === id);
export const isCollectionId = (id: string): id is CollectionId => collections.some((c) => c.id === id);
