import { l, type L } from "@/lib/i18n";

import { beyondNationStateEnglish } from "@/content/editions/beyond-nation-state.en";
import { beyondNationStateGerman } from "@/content/editions/beyond-nation-state.de";

export type ArticleStatus = "draft" | "review" | "published";

export type ArticleTheme =
  | "post-national-governance"
  | "parallel-societies"
  | "decentralized-governance"
  | "technology-civilization"
  | "energy-infrastructure"
  | "political-philosophy";

export type ReferenceKind =
  "book" | "journal-article" | "report" | "dataset" | "primary-source" | "web-source";

export interface ArticleReference {
  id: string;
  kind: ReferenceKind;
  authors: string[];
  title: string;
  publication?: string;
  publisher?: string;
  year?: number;
  pages?: string;
  doi?: string;
  url?: string;
  accessedAt?: string;
  notes?: L;
}

export interface ArticleRevision {
  revision: number;
  date: string;
  note: L;
  editor?: string;
}

export interface OutlineSection {
  title: L;
  prompts: L[];
}

export interface ResearchProject {
  id: string;
  status: Exclude<ArticleStatus, "published">;
  title: L;
  subtitle: L;
  author: string;
  themes: ArticleTheme[];
  abstract: L;
  researchQuestion: L;
  method: L;
  limitations: L;
  targetLength: L;
  outline: OutlineSection[];
  references: ArticleReference[];
  revisions: ArticleRevision[];
  editions?: Partial<Record<"en" | "de", ArticleEdition>>;
}

export type ArticleBlock =
  | {
      type: "paragraph";
      text: string;
      citations?: string[];
      claimType?: "evidence" | "interpretation" | "hypothesis" | "opinion";
    }
  | { type: "list"; items: string[]; citations?: string[] }
  | { type: "quote"; text: string; attribution: string; referenceId: string }
  | {
      type: "table";
      caption: string;
      headers: string[];
      rows: { cells: string[]; references?: string[] }[];
      notes: string;
      limitations: string;
    }
  | {
      type: "chart";
      title: string;
      chartType: "bar" | "line";
      data: { label: string; value: number }[];
      source: string;
      sourceUrl: string;
      date: string;
      unit: string;
      methodology: string;
      caveat: string;
      conceptual: boolean;
    }
  | { type: "footnote"; id: string; text: string };

export interface ArticleSection {
  id: string;
  heading: string;
  level: 2 | 3;
  blocks: ArticleBlock[];
}

export interface ArticleEdition {
  language: "en" | "de";
  title: string;
  subtitle: string;
  abstract: string;
  sections: ArticleSection[];
}

export interface PublishedArticle {
  id: string;
  status: "published";
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  editionWordCounts: Record<"en" | "de", number>;
  editions: Record<"en" | "de", ArticleEdition>;
  references: ArticleReference[];
  revisions: ArticleRevision[];
}

export type ExternalWorkFormat = "article" | "book" | "paper" | "essay" | "x-thread" | "report";

export interface ExternalContribution {
  id: string;
  format: ExternalWorkFormat;
  author: string;
  authorProfile?: string;
  title: string;
  publishedAt?: string;
  originalSource: string;
  url: string;
  attributedSummary: L;
  mainArguments: L[];
  references: ArticleReference[];
  commentary?: L;
}

export interface FeaturedBook {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  year?: number;
  isbn?: string;
  sourceUrl: string;
  description: L;
  themes: ArticleTheme[];
  relatedProjects: string[];
  editorialNote: L;
}

export const themeLabels: Record<ArticleTheme, L> = {
  "post-national-governance": l("Post-national governance", "Postnationale Governance"),
  "parallel-societies": l("Parallel societies", "Parallele Gesellschaften"),
  "decentralized-governance": l("Decentralized governance", "Dezentralisierte Governance"),
  "technology-civilization": l("Technology & civilization", "Technologie & Zivilisation"),
  "energy-infrastructure": l("Energy & infrastructure", "Energie & Infrastruktur"),
  "political-philosophy": l(
    "Political philosophy & economics",
    "Politische Philosophie & Ökonomie",
  ),
};

export const themeDescriptions: Record<ArticleTheme, L> = {
  "post-national-governance": l(
    "Sovereignty, statehood, legitimacy and political organization beyond territorial borders.",
    "Souveränität, Staatlichkeit, Legitimität und politische Organisation jenseits territorialer Grenzen.",
  ),
  "parallel-societies": l(
    "Parallel institutions, digital communities and institutional alternatives within existing systems.",
    "Parallele Institutionen, digitale Gemeinschaften und institutionelle Alternativen innerhalb bestehender Systeme.",
  ),
  "decentralized-governance": l(
    "Polycentric institutions, blockchain governance, public goods and coordination mechanisms.",
    "Polyzentrische Institutionen, Blockchain-Governance, öffentliche Güter und Koordinationsmechanismen.",
  ),
  "technology-civilization": l(
    "AI, computing, cryptography and the social systems built around technology.",
    "KI, Computing, Kryptografie und die sozialen Systeme, die Technologie hervorbringt.",
  ),
  "energy-infrastructure": l(
    "Energy systems, cities, infrastructure and the institutions that coordinate them.",
    "Energiesysteme, Städte, Infrastruktur und die Institutionen, die sie koordinieren.",
  ),
  "political-philosophy": l(
    "Legitimacy, collective action, rights, institutional design and political economy.",
    "Legitimität, kollektives Handeln, Rechte, institutionelle Gestaltung und politische Ökonomie.",
  ),
};

export const researchProjects: ResearchProject[] = [
  {
    id: "beyond-nation-state",
    status: "draft",
    editions: { en: beyondNationStateEnglish, de: beyondNationStateGerman },
    title: l("Beyond the Nation-State, Beside It", "Jenseits des Nationalstaats, neben ihm"),
    subtitle: l(
      "Network institutions as a new layer of human coordination, and the case of Omega",
      "Netzwerk-Institutionen als neue Koordinationsebene, und der Fall Omega",
    ),
    author: "Amine Radi",
    themes: ["post-national-governance", "decentralized-governance", "political-philosophy"],
    abstract: l(
      "Network states, popup cities, DAOs and charter jurisdictions are either treated as an inevitable successor to the nation-state or dismissed as fantasy. This research project tests a narrower claim: that a voluntary, digitally coordinated, legally embedded institutional layer could expand societal capacity beside the state, and asks what Omega DAO would have to demonstrate to count as evidence for it.",
      "Netzwerkstaaten, Pop-up-Städte, DAOs und Charter-Jurisdiktionen werden entweder als zwangsläufiger Nachfolger des Nationalstaats behandelt oder als Fantasie abgetan. Dieses Forschungsprojekt prüft eine engere Behauptung: dass eine freiwillige, digital koordinierte und rechtlich eingebettete Institutionenebene die gesellschaftliche Handlungsfähigkeit neben dem Staat erweitern könnte, und fragt, was Omega DAO belegen müsste, um dafür als Evidenz zu gelten.",
    ),
    researchQuestion: l(
      "Can a voluntary network institution expand societal coordination capacity without claiming sovereignty, and what evidence would show that it does?",
      "Kann eine freiwillige Netzwerk-Institution die gesellschaftliche Koordinationsfähigkeit erweitern, ohne Souveränität zu beanspruchen, und welche Belege würden das zeigen?",
    ),
    method: l(
      "Staged falsifiability framework (eight stages); review of comparable cases (Zuzalu, Edge City, Vitalia, Próspera); scenario analysis rather than forecasts; explicit separation of observed data from design proposals.",
      "Gestuftes Falsifizierbarkeitsmodell (acht Stufen); Überblick über vergleichbare Fälle (Zuzalu, Edge City, Vitalia, Próspera); Szenarioanalyse statt Prognosen; klare Trennung von beobachteten Daten und Gestaltungsvorschlägen.",
    ),
    limitations: l(
      "No network institution has reached the framework's later stages. Omega is evaluated as a Stage 1 proposal, and quantitative claims about housing, energy and debt are drawn from dated public sources that may be revised. Nothing in this project is legal advice.",
      "Keine Netzwerk-Institution hat die späteren Stufen des Modells erreicht. Omega wird als Vorschlag der Stufe 1 bewertet; quantitative Angaben zu Wohnen, Energie und Staatsschulden stammen aus datierten öffentlichen Quellen, die sich ändern können. Nichts in diesem Projekt ist Rechtsberatung.",
    ),
    targetLength: l(
      "About 9,000 words for the full essay; source-checked before publication",
      "Etwa 9.000 Wörter für den vollständigen Essay; vor der Veröffentlichung quellengeprüft",
    ),
    outline: [
      {
        title: l(
          "The problem: measurable pressures on states",
          "Das Problem: messbare Belastungen des Staates",
        ),
        prompts: [
          l(
            "Ageing, housing, public debt, administrative overload, integration and declining trust, each with dated data and a note on what it does and does not justify.",
            "Alterung, Wohnen, Staatsverschuldung, Verwaltungsüberlastung, Integration und sinkendes Vertrauen, jeweils mit datierten Daten und einem Hinweis, was sie begründen und was nicht.",
          ),
        ],
      },
      {
        title: l("The state and the missing layer", "Der Staat und die fehlende Ebene"),
        prompts: [
          l(
            "Why the state's coercive coordination is its strength and its uniformity its weakness; a comparison of corporations, NGOs, cooperatives, DAOs and network institutions.",
            "Warum koerzive Koordination die Stärke des Staates und Uniformität seine Schwäche ist; ein Vergleich von Unternehmen, NGOs, Genossenschaften, DAOs und Netzwerk-Institutionen.",
          ),
        ],
      },
      {
        title: l("The empirical record", "Die empirische Bilanz"),
        prompts: [
          l(
            "Zuzalu, Edge City, Vitalia and Próspera: what worked, what was promised, and the Próspera arbitration as the central legal risk.",
            "Zuzalu, Edge City, Vitalia und Próspera: was funktionierte, was versprochen wurde, und das Próspera-Schiedsverfahren als zentrales Rechtsrisiko.",
          ),
        ],
      },
      {
        title: l("Stages and falsifiable hypotheses", "Stufen und falsifizierbare Hypothesen"),
        prompts: [
          l(
            "The eight-stage framework from conference to recognised settlement, and six hypotheses with the evidence that would confirm or refute each.",
            "Das achtstufige Modell von der Konferenz bis zur anerkannten Siedlung und sechs Hypothesen mit den Belegen, die sie bestätigen oder widerlegen würden.",
          ),
        ],
      },
      {
        title: l(
          "Omega: architecture, economics and governance",
          "Omega: Architektur, Ökonomie und Governance",
        ),
        prompts: [
          l(
            "Omega as a design proposal rather than operating reality: on-chain scope, node economics as scenarios, and governance failure modes.",
            "Omega als Gestaltungsvorschlag statt als Betriebsrealität: Umfang der On-Chain-Komponenten, Knotenökonomie als Szenarien und Governance-Fehlerquellen.",
          ),
        ],
      },
      {
        title: l("Strongest case against and conclusion", "Stärkste Gegenposition und Schluss"),
        prompts: [
          l(
            "Steelman the objections, name the open risks, and state what evidence would change the assessment.",
            "Die Einwände in ihrer stärksten Form darstellen, offene Risiken benennen und sagen, welche Belege die Einschätzung ändern würden.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
];

export const publishedArticles: PublishedArticle[] = [];

export const externalContributions: ExternalContribution[] = [
  {
    id: "ostrom-polycentric-2010",
    format: "paper",
    author: "Elinor Ostrom",
    title: "Beyond Markets and States: Polycentric Governance of Complex Economic Systems",
    publishedAt: "2010",
    originalSource: "American Economic Review, 100(3), 641–672",
    url: "https://doi.org/10.1257/aer.100.3.641",
    attributedSummary: l(
      "Ostrom argues that complex collective-action problems require analysis beyond a simple market-versus-state dichotomy, drawing on research into polycentric systems and collective action.",
      "Ostrom argumentiert, dass komplexe Probleme kollektiven Handelns über die einfache Gegenüberstellung von Markt und Staat hinaus analysiert werden müssen; sie stützt sich dabei auf Forschung zu polyzentrischen Systemen und kollektivem Handeln.",
    ),
    mainArguments: [
      l(
        "Polycentric arrangements involve multiple, formally independent centers of decision-making.",
        "Polyzentrische Ordnungen umfassen mehrere formal unabhängige Entscheidungszentren.",
      ),
      l(
        "Institutional performance depends on context and the interactions among centers, not on a single universal form.",
        "Die institutionelle Leistungsfähigkeit hängt vom Kontext und vom Zusammenspiel der Zentren ab, nicht von einer universellen Form.",
      ),
    ],
    references: [
      {
        id: "ostrom-2010",
        kind: "journal-article",
        authors: ["Elinor Ostrom"],
        title: "Beyond Markets and States: Polycentric Governance of Complex Economic Systems",
        publication: "American Economic Review, 100(3), 641–672",
        year: 2010,
        doi: "10.1257/aer.100.3.641",
        url: "https://doi.org/10.1257/aer.100.3.641",
      },
    ],
  },
  {
    id: "ethereum-eip-1",
    format: "report",
    author: "Martin Becze, Hudson Jameson, et al.",
    title: "EIP-1: EIP Purpose and Guidelines",
    publishedAt: "2015-10-27",
    originalSource: "Ethereum Improvement Proposals",
    url: "https://eips.ethereum.org/EIPS/eip-1",
    attributedSummary: l(
      "The EIP-1 specification describes the purpose, structure and process for Ethereum Improvement Proposals.",
      "Die EIP-1-Spezifikation beschreibt Zweck, Aufbau und Verfahren der Ethereum Improvement Proposals.",
    ),
    mainArguments: [
      l(
        "The proposal process gives a documented path for suggesting and discussing protocol standards.",
        "Das Vorschlagsverfahren schafft einen dokumentierten Weg, Protokollstandards vorzuschlagen und zu diskutieren.",
      ),
    ],
    references: [
      {
        id: "eip-1",
        kind: "primary-source",
        authors: ["Martin Becze", "Hudson Jameson", "et al."],
        title: "EIP-1: EIP Purpose and Guidelines",
        publication: "Ethereum Improvement Proposals",
        year: 2015,
        url: "https://eips.ethereum.org/EIPS/eip-1",
      },
    ],
  },
];

export const featuredBooks: FeaturedBook[] = [
  {
    id: "farewell-to-westphalia",
    title: "Farewell to Westphalia",
    authors: ["Jarrad Hope", "Peter Ludlow"],
    publisher: "Logos Press Engine",
    year: 2025,
    sourceUrl: "https://logos.co/farewell-to-westphalia",
    description: l(
      "Included at your request. Bibliographic details (paperback, ISBN 9783952627518, 16 September 2025, 384 pages) come from secondary search summaries; the publisher page itself did not render. Not yet checked against the book.",
      "Auf Ihren Wunsch aufgenommen. Die bibliografischen Angaben (Paperback, ISBN 9783952627518, 16. September 2025, 384 Seiten) stammen aus sekundären Suchzusammenfassungen; die Verlagsseite wurde nicht angezeigt. Noch nicht am Buch selbst geprüft.",
    ),
    themes: ["post-national-governance", "decentralized-governance"],
    relatedProjects: ["after-westphalia", "network-state", "digital-sovereignty-legitimacy"],
    editorialNote: l(
      "Author names were supplied in the brief. Publisher, edition and publication date need verification; no personal review is implied.",
      "Die Autorennamen stammen aus dem Auftrag. Verlag, Ausgabe und Erscheinungsdatum müssen verifiziert werden; eine persönliche Rezension wird nicht behauptet.",
    ),
  },
  {
    id: "the-network-state-book",
    title: "The Network State",
    subtitle: "How to Start a New Country",
    authors: ["Balaji S. Srinivasan"],
    publisher: "1729",
    year: 2022,
    sourceUrl: "https://thenetworkstate.com/",
    description: l(
      "The author's online book presents a proposal for network states and their development from digital communities. The source is the original publication.",
      "Das Online-Buch des Autors entwirft Network States und ihre Entwicklung aus digitalen Gemeinschaften. Der Link führt zur Originalpublikation.",
    ),
    themes: ["post-national-governance", "parallel-societies", "technology-civilization"],
    relatedProjects: ["network-state", "after-westphalia"],
    editorialNote: l(
      "A primary source for the proposal; inclusion is not endorsement.",
      "Eine Primärquelle zum Entwurf; die Aufnahme ist keine Empfehlung.",
    ),
  },
  {
    id: "governing-the-commons",
    title: "Governing the Commons",
    subtitle: "The Evolution of Institutions for Collective Action",
    authors: ["Elinor Ostrom"],
    publisher: "Cambridge University Press",
    year: 1990,
    sourceUrl: "https://doi.org/10.1017/CBO9780511807763",
    description: l(
      "Ostrom's study examines how communities govern common-pool resources and evaluates institutional explanations with empirical cases.",
      "Ostroms Studie untersucht, wie Gemeinschaften Allmenderessourcen verwalten, und prüft institutionelle Erklärungen anhand empirischer Fälle.",
    ),
    themes: ["decentralized-governance", "political-philosophy"],
    relatedProjects: ["polycentric-governance"],
    editorialNote: l(
      "Bibliographic entry based on the publisher record; no personal review is implied.",
      "Bibliografischer Eintrag nach Verlagsangabe; eine persönliche Rezension wird nicht behauptet.",
    ),
  },
  {
    id: "your-next-government",
    title: "Your Next Government?",
    subtitle: "From the Nation State to Stateless Nations",
    authors: ["Tom W. Bell"],
    publisher: "Cambridge University Press",
    year: 2017,
    sourceUrl:
      "https://www.cambridge.org/core/books/your-next-government/F6D293F69755E864F82D8468604235C7",
    description: l(
      "Bell examines alternatives to nation-state governance, including special jurisdictions and competing governance providers. This listing does not imply a personal review.",
      "Bell untersucht Alternativen zur Governance durch Nationalstaaten, darunter Sonderverwaltungszonen und konkurrierende Governance-Anbieter. Dieser Eintrag stellt keine persönliche Rezension dar.",
    ),
    themes: ["post-national-governance", "political-philosophy"],
    relatedProjects: ["after-westphalia", "network-state"],
    editorialNote: l(
      "The publisher's official record is linked; no personal review is implied.",
      "Der offizielle Verlagsdatensatz ist verlinkt; eine persönliche Rezension wird nicht behauptet.",
    ),
  },
  {
    id: "crypto-anarchy-cyberstates",
    title: "Crypto Anarchy, Cyberstates, and Pirate Utopias",
    authors: ["Peter Ludlow (editor)"],
    publisher: "The MIT Press",
    year: 2001,
    isbn: "9780262122382",
    sourceUrl:
      "https://mitpress.mit.edu/9780262122382/crypto-anarchy-cyberstates-and-pirate-utopias/",
    description: l(
      "An edited collection on political structures, governance and sovereignty in cyberspace, according to the publisher's book description.",
      "Ein Sammelband zu politischen Strukturen, Governance und Souveränität im Cyberspace, gemäß der Buchbeschreibung des Verlags.",
    ),
    themes: ["parallel-societies", "post-national-governance", "technology-civilization"],
    relatedProjects: ["parallel-societies", "digital-sovereignty-legitimacy"],
    editorialNote: l(
      "Description attributed to the publisher; no personal review is implied.",
      "Beschreibung dem Verlag zugeschrieben; eine persönliche Rezension wird nicht behauptet.",
    ),
  },
];

export const publicationStandards = {
  citationStyle: "Chicago author-date",
  wordRange: { minimum: 2500, maximum: 5000 },
  publicationStates: ["draft", "review", "published"] as const,
  languages: ["en", "de"] as const,
  requiresReferences: true,
  requiresSourceMetadataForFactualVisuals: true,
};

export function getResearchProject(id: string): ResearchProject | undefined {
  return researchProjects.find((project) => project.id === id);
}

export function getPublishedArticle(id: string): PublishedArticle | undefined {
  return publishedArticles.find((article) => article.id === id && article.status === "published");
}
