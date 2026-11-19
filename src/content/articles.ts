import { l, type L } from "@/lib/i18n";

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
    id: "after-westphalia",
    status: "draft",
    title: l(
      "After Westphalia: The Future of Political Organization",
      "Nach Westfalen: Die Zukunft politischer Organisation",
    ),
    subtitle: l(
      "Territorial sovereignty and the institutional possibilities of a networked age",
      "Territoriale Souveränität und institutionelle Möglichkeiten im vernetzten Zeitalter",
    ),
    author: "Amine Radi",
    themes: ["post-national-governance", "political-philosophy"],
    abstract: l(
      "A research project examining how the Westphalian settlement is interpreted, where territorial sovereignty remains consequential, and how transnational and digital institutions complement or contest it. It will distinguish historical evidence from contemporary political proposals.",
      "Ein Forschungsprojekt darüber, wie die Westfälische Ordnung interpretiert wird, wo territoriale Souveränität weiterhin maßgeblich ist und wie transnationale und digitale Institutionen sie ergänzen oder infrage stellen. Historische Befunde werden von gegenwärtigen politischen Entwürfen getrennt.",
    ),
    researchQuestion: l(
      "Which functions of political organization depend on territorial jurisdiction, and which can be organized across or beyond it?",
      "Welche Funktionen politischer Organisation sind auf territoriale Zuständigkeit angewiesen, und welche lassen sich darüber hinweg oder jenseits davon organisieren?",
    ),
    method: l(
      "Historical-conceptual analysis; comparative institutional cases; explicit separation of descriptive claims and normative proposals.",
      "Historisch-begriffliche Analyse; vergleichende institutionelle Fallstudien; klare Trennung beschreibender Aussagen und normativer Vorschläge.",
    ),
    limitations: l(
      "The term “Westphalian system” is contested and often used as shorthand. The study will not treat 1648 as a single, universal origin of modern sovereignty.",
      "Der Begriff „Westfälisches System“ ist umstritten und wird häufig verkürzend verwendet. Die Studie behandelt 1648 nicht als singulären, universellen Ursprung moderner Souveränität.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("Question and thesis", "Fragestellung und These"),
        prompts: [
          l(
            "Define the problem without presuming that territorial states are obsolete.",
            "Das Problem definieren, ohne die Überholtheit territorialer Staaten vorauszusetzen.",
          ),
        ],
      },
      {
        title: l("Historical context", "Historischer Kontext"),
        prompts: [
          l(
            "Trace the 1648 treaties and later development of sovereignty through primary and historical scholarship.",
            "Die Verträge von 1648 und die spätere Entwicklung der Souveränität anhand von Primärquellen und Forschung nachzeichnen.",
          ),
        ],
      },
      {
        title: l("Conceptual distinctions", "Begriffliche Unterscheidungen"),
        prompts: [
          l(
            "Separate sovereignty, jurisdiction, legitimacy, recognition and state capacity.",
            "Souveränität, Zuständigkeit, Legitimität, Anerkennung und staatliche Handlungsfähigkeit unterscheiden.",
          ),
        ],
      },
      {
        title: l("Comparative institutional analysis", "Vergleichende institutionelle Analyse"),
        prompts: [
          l(
            "Compare territorial, transnational, polycentric and protocol-governed arrangements.",
            "Territoriale, transnationale, polyzentrische und protokollbasierte Ordnungen vergleichen.",
          ),
        ],
      },
      {
        title: l("Counterarguments and conclusion", "Gegenargumente und Schluss"),
        prompts: [
          l(
            "Test claims of post-national change against law, coercive capacity, public goods and accountability.",
            "Behauptungen postnationalen Wandels an Recht, Durchsetzungsfähigkeit, öffentlichen Gütern und Rechenschaftspflicht prüfen.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "network-state",
    status: "draft",
    title: l(
      "The Network State: From Digital Communities to Political Institutions",
      "Der Network State: Von digitalen Gemeinschaften zu politischen Institutionen",
    ),
    subtitle: l(
      "A critical analysis of a proposal, its institutional assumptions and its limits",
      "Eine kritische Analyse eines Entwurfs, seiner institutionellen Annahmen und seiner Grenzen",
    ),
    author: "Amine Radi",
    themes: ["post-national-governance", "parallel-societies", "technology-civilization"],
    abstract: l(
      "A source-led examination of the network-state proposal as a political program: its stages, claims about digital community and physical territory, and the legal, economic and legitimacy questions that remain open.",
      "Eine quellenbasierte Untersuchung des Network-State-Konzepts als politisches Programm: seiner Entwicklungsstufen, seiner Aussagen zu digitalen Gemeinschaften und physischem Territorium sowie offener Rechts-, Wirtschafts- und Legitimitätsfragen.",
    ),
    researchQuestion: l(
      "What institutional transition does the network-state proposal describe, and which of its claims are descriptive, predictive or normative?",
      "Welchen institutionellen Übergang beschreibt der Network-State-Entwurf, und welche seiner Aussagen sind beschreibend, prognostisch oder normativ?",
    ),
    method: l(
      "Close reading of primary texts, comparison with political theory and legal analysis, and case studies selected for documented evidence.",
      "Genaue Lektüre der Primärtexte, Vergleich mit politischer Theorie und Rechtsanalyse sowie Fallstudien auf Grundlage dokumentierter Belege.",
    ),
    limitations: l(
      "A proposal is not evidence of a functioning state. Case studies will not be generalized beyond what their sources support.",
      "Ein Entwurf ist kein Beleg für einen funktionierenden Staat. Fallstudien werden nicht über das hinaus verallgemeinert, was ihre Quellen tragen.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("The proposal in its own terms", "Der Entwurf in seinen eigenen Begriffen"),
        prompts: [
          l(
            "Summarize stated stages and definitions with precise attribution.",
            "Die beschriebenen Stufen und Definitionen präzise und zugeschrieben zusammenfassen.",
          ),
        ],
      },
      {
        title: l("Digital community and coordination", "Digitale Gemeinschaft und Koordination"),
        prompts: [
          l(
            "Examine membership, capital formation, governance and collective action claims.",
            "Aussagen zu Mitgliedschaft, Kapitalbildung, Governance und kollektivem Handeln untersuchen.",
          ),
        ],
      },
      {
        title: l("Territory, law and recognition", "Territorium, Recht und Anerkennung"),
        prompts: [
          l(
            "Map dependencies on existing jurisdiction, property regimes and international recognition.",
            "Abhängigkeiten von bestehenden Rechtsordnungen, Eigentumsregimen und internationaler Anerkennung erfassen.",
          ),
        ],
      },
      {
        title: l("Comparative cases", "Vergleichende Fälle"),
        prompts: [
          l(
            "Select documented communities and institutions; state selection criteria and non-comparabilities.",
            "Dokumentierte Gemeinschaften und Institutionen auswählen; Kriterien und Grenzen der Vergleichbarkeit offenlegen.",
          ),
        ],
      },
      {
        title: l("Critiques and open tests", "Kritik und offene Prüfungen"),
        prompts: [
          l(
            "Assess exit, voice, accountability, distribution and failure conditions.",
            "Austritt, Mitbestimmung, Rechenschaft, Verteilung und Scheiternsbedingungen bewerten.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "parallel-societies",
    status: "draft",
    title: l(
      "Parallel Societies: Building Alternatives Within Existing Systems",
      "Parallele Gesellschaften: Alternativen innerhalb bestehender Systeme aufbauen",
    ),
    subtitle: l(
      "Institutional plurality, exit, voice and the boundary between autonomy and dependence",
      "Institutionelle Vielfalt, Austritt, Mitsprache und die Grenze zwischen Autonomie und Abhängigkeit",
    ),
    author: "Amine Radi",
    themes: ["parallel-societies", "political-philosophy"],
    abstract: l(
      "A comparative inquiry into parallel institutions—from mutual aid and cooperatives to digital communities—and how they interact with the legal, material and political systems in which they operate.",
      "Eine vergleichende Untersuchung paralleler Institutionen – von gegenseitiger Hilfe und Genossenschaften bis zu digitalen Gemeinschaften – und ihrer Wechselwirkung mit den Rechts-, Sach- und Politiksystemen, in denen sie bestehen.",
    ),
    researchQuestion: l(
      "Under what conditions do parallel institutions expand meaningful choice, and when do they reproduce exclusion or dependence?",
      "Unter welchen Bedingungen erweitern parallele Institutionen reale Wahlmöglichkeiten, und wann reproduzieren sie Ausschluss oder Abhängigkeit?",
    ),
    method: l(
      "Comparative case studies and institutional analysis; cases will be chosen across legal form, scale and resource base.",
      "Vergleichende Fallstudien und institutionelle Analyse; die Fälle werden nach Rechtsform, Maßstab und Ressourcenbasis ausgewählt.",
    ),
    limitations: l(
      "“Parallel society” has conflicting political uses. The analysis will define its scope and avoid treating unlike movements as one category.",
      "„Parallele Gesellschaft“ wird politisch unterschiedlich verwendet. Die Analyse definiert den Begriff und fasst ungleiche Bewegungen nicht zu einer Kategorie zusammen.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l(
          "Definitions and competing meanings",
          "Definitionen und konkurrierende Bedeutungen",
        ),
        prompts: [
          l(
            "Distinguish parallel institutions from segregation, counterpublics and market alternatives.",
            "Parallele Institutionen von Segregation, Gegenöffentlichkeiten und Marktalternativen unterscheiden.",
          ),
        ],
      },
      {
        title: l("Institutional forms", "Institutionelle Formen"),
        prompts: [
          l(
            "Compare cooperatives, mutual-aid groups, associations, platforms and digital communities.",
            "Genossenschaften, Selbsthilfegruppen, Vereine, Plattformen und digitale Gemeinschaften vergleichen.",
          ),
        ],
      },
      {
        title: l("Resources and dependencies", "Ressourcen und Abhängigkeiten"),
        prompts: [
          l(
            "Trace legal status, infrastructure, funding, labor and public-service dependencies.",
            "Rechtsstatus, Infrastruktur, Finanzierung, Arbeit und Abhängigkeiten von öffentlichen Leistungen nachverfolgen.",
          ),
        ],
      },
      {
        title: l("Voice, exit and accountability", "Mitsprache, Austritt und Rechenschaft"),
        prompts: [
          l(
            "Ask who can join, govern, contest decisions and leave—and at what cost.",
            "Untersuchen, wer beitreten, mitbestimmen, Entscheidungen anfechten und austreten kann – und zu welchen Kosten.",
          ),
        ],
      },
      {
        title: l("Outcomes and failure modes", "Ergebnisse und Scheiternsformen"),
        prompts: [
          l(
            "Specify measurable outcomes and avoid equating institutional novelty with public benefit.",
            "Messbare Ergebnisse bestimmen und institutionelle Neuheit nicht mit öffentlichem Nutzen gleichsetzen.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "polycentric-governance",
    status: "draft",
    title: l(
      "Polycentric Governance: Lessons from Elinor Ostrom",
      "Polyzentrische Governance: Erkenntnisse aus Elinor Ostroms Forschung",
    ),
    subtitle: l(
      "What the commons literature says—and what it does not say—about institutional design",
      "Was die Forschung zu Gemeingütern über institutionelle Gestaltung aussagt – und was nicht",
    ),
    author: "Amine Radi",
    themes: ["decentralized-governance", "political-philosophy"],
    abstract: l(
      "A careful reading of Ostrom's institutional scholarship, focused on polycentricity, common-pool resources and the conditions under which self-governance succeeds or fails. The project will distinguish her empirical findings from later uses of her concepts.",
      "Eine sorgfältige Lektüre von Ostroms institutioneller Forschung mit Fokus auf Polyzentrik, Allmenderessourcen und die Bedingungen, unter denen Selbstverwaltung gelingt oder scheitert. Empirische Befunde werden von späteren Anwendungen ihrer Begriffe unterschieden.",
    ),
    researchQuestion: l(
      "Which design principles and analytical tools from Ostrom's work transfer to contemporary digital and urban governance—and under what conditions?",
      "Welche Gestaltungsprinzipien und Analysewerkzeuge aus Ostroms Forschung lassen sich unter welchen Bedingungen auf heutige digitale und urbane Governance übertragen?",
    ),
    method: l(
      "Primary-text review and case comparison, with attention to research design, context and the scope of each finding.",
      "Primärtextanalyse und Fallvergleich unter Beachtung von Forschungsdesign, Kontext und Geltungsbereich der jeweiligen Befunde.",
    ),
    limitations: l(
      "Design principles are not a universal checklist. The study will avoid attributing claims to Ostrom that belong to later commentators.",
      "Gestaltungsprinzipien sind keine universelle Checkliste. Aussagen späterer Kommentatoren werden Ostrom nicht zugeschrieben.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("Analytical foundations", "Analytische Grundlagen"),
        prompts: [
          l(
            "Define common-pool resources, institutions, polycentricity and collective action.",
            "Gemeinschaftsgüter, Institutionen, Polyzentrik und kollektives Handeln definieren.",
          ),
        ],
      },
      {
        title: l("Evidence and case selection", "Evidenz und Fallauswahl"),
        prompts: [
          l(
            "Review the empirical settings Ostrom studied and what makes them comparable.",
            "Die von Ostrom untersuchten empirischen Kontexte und ihre Vergleichbarkeit prüfen.",
          ),
        ],
      },
      {
        title: l("Design principles in context", "Gestaltungsprinzipien im Kontext"),
        prompts: [
          l(
            "Present principles as conditional patterns, with counterexamples and limits.",
            "Prinzipien als bedingte Muster mit Gegenbeispielen und Grenzen darstellen.",
          ),
        ],
      },
      {
        title: l("Applications beyond the commons", "Anwendungen jenseits der Allmende"),
        prompts: [
          l(
            "Evaluate proposed applications to digital platforms, cities and climate institutions.",
            "Vorgeschlagene Anwendungen auf digitale Plattformen, Städte und Klimainstitutionen bewerten.",
          ),
        ],
      },
      {
        title: l(
          "Implications for institutional design",
          "Folgerungen für institutionelle Gestaltung",
        ),
        prompts: [
          l(
            "Identify testable hypotheses rather than a universal governance recipe.",
            "Prüfbare Hypothesen statt eines universellen Governance-Rezepts ableiten.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "ethereum-public-goods",
    status: "draft",
    title: l(
      "Ethereum, Digital Public Goods and the Future of Coordination",
      "Ethereum, digitale öffentliche Güter und die Zukunft der Koordination",
    ),
    subtitle: l(
      "Protocol governance, funding mechanisms and the limits of “public good” claims",
      "Protokoll-Governance, Finanzierungsmechanismen und die Grenzen des Begriffs „öffentliches Gut“",
    ),
    author: "Amine Radi",
    themes: ["decentralized-governance", "technology-civilization", "political-philosophy"],
    abstract: l(
      "A research project examining Ethereum-related coordination and public-goods funding as institutional systems, including their decision processes, funding mechanisms, distributional outcomes and contested definitions of public benefit.",
      "Ein Forschungsprojekt zu Ethereum-bezogener Koordination und Finanzierung öffentlicher Güter als institutionellen Systemen – einschließlich Entscheidungsverfahren, Finanzierungsmechanismen, Verteilungsfolgen und umstrittener Definitionen des öffentlichen Nutzens.",
    ),
    researchQuestion: l(
      "How do Ethereum governance and funding mechanisms allocate resources to digital public goods, and how are their legitimacy and outcomes assessed?",
      "Wie verteilen Ethereum-Governance und Finanzierungsmechanismen Ressourcen auf digitale öffentliche Güter, und wie werden Legitimität und Ergebnisse bewertet?",
    ),
    method: l(
      "Protocol and governance-document analysis; case studies of funding rounds with published records; explicit treatment of selection bias.",
      "Analyse von Protokollen und Governance-Dokumenten; Fallstudien veröffentlichter Förderrunden; explizite Berücksichtigung von Auswahlverzerrungen.",
    ),
    limitations: l(
      "The Ethereum ecosystem is heterogeneous and changes quickly. Claims will be bounded by dated sources and named mechanisms.",
      "Das Ethereum-Ökosystem ist heterogen und verändert sich schnell. Aussagen werden auf datierte Quellen und konkret benannte Mechanismen begrenzt.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("Concepts and definitions", "Begriffe und Definitionen"),
        prompts: [
          l(
            "Distinguish public goods, open-source infrastructure and public-goods funding.",
            "Öffentliche Güter, Open-Source-Infrastruktur und die Finanzierung öffentlicher Güter unterscheiden.",
          ),
        ],
      },
      {
        title: l("Ethereum governance", "Ethereum-Governance"),
        prompts: [
          l(
            "Map formal and informal decision processes without implying a single sovereign body.",
            "Formelle und informelle Entscheidungsverfahren erfassen, ohne eine einheitliche Entscheidungsinstanz zu unterstellen.",
          ),
        ],
      },
      {
        title: l("Funding mechanisms", "Finanzierungsmechanismen"),
        prompts: [
          l(
            "Compare mechanisms only where program documentation and award data are available.",
            "Mechanismen nur dort vergleichen, wo Programmdokumentation und Förderdaten verfügbar sind.",
          ),
        ],
      },
      {
        title: l("Distribution and accountability", "Verteilung und Rechenschaft"),
        prompts: [
          l(
            "Examine who proposes, selects, receives and audits funding.",
            "Untersuchen, wer Förderung beantragt, auswählt, erhält und prüft.",
          ),
        ],
      },
      {
        title: l("Evidence and open questions", "Evidenz und offene Fragen"),
        prompts: [
          l(
            "Assess additionality, capture, sustainability and what outcomes cannot yet be measured.",
            "Zusätzlichkeit, Vereinnahmung, Nachhaltigkeit und derzeit nicht messbare Ergebnisse bewerten.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "digital-sovereignty-legitimacy",
    status: "draft",
    title: l(
      "Beyond the Nation-State: Digital Sovereignty and Political Legitimacy",
      "Jenseits des Nationalstaats: Digitale Souveränität und politische Legitimität",
    ),
    subtitle: l(
      "Control of infrastructure is not the same as legitimate authority",
      "Kontrolle über Infrastruktur ist nicht dasselbe wie legitime Autorität",
    ),
    author: "Amine Radi",
    themes: ["post-national-governance", "technology-civilization", "political-philosophy"],
    abstract: l(
      "An inquiry into digital sovereignty across states, firms, platforms and protocols. It separates control over data and infrastructure from jurisdiction, rights, accountability and the legitimacy to make binding rules.",
      "Eine Untersuchung digitaler Souveränität bei Staaten, Unternehmen, Plattformen und Protokollen. Sie trennt die Kontrolle über Daten und Infrastruktur von Zuständigkeit, Rechten, Rechenschaft und der Legitimität verbindlicher Regeln.",
    ),
    researchQuestion: l(
      "When digital actors exercise rule-making or infrastructural control, what—if anything—makes that authority politically legitimate?",
      "Was – wenn überhaupt – verleiht digital handelnden Akteuren politische Legitimität, wenn sie Regeln setzen oder Infrastruktur kontrollieren?",
    ),
    method: l(
      "Conceptual analysis paired with case studies of infrastructure governance, data jurisdiction and protocol rule-making.",
      "Begriffliche Analyse in Verbindung mit Fallstudien zu Infrastruktur-Governance, Datenzuständigkeit und Protokoll-Regelsetzung.",
    ),
    limitations: l(
      "“Digital sovereignty” has multiple meanings across policy and political theory. Each use will be defined rather than treated as interchangeable.",
      "„Digitale Souveränität“ hat in Politik und politischer Theorie mehrere Bedeutungen. Jede Verwendung wird definiert und nicht als austauschbar behandelt.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("A vocabulary of digital sovereignty", "Ein Vokabular digitaler Souveränität"),
        prompts: [
          l(
            "Separate state sovereignty, data sovereignty, platform control and protocol governance.",
            "Staatliche Souveränität, Datensouveränität, Plattformkontrolle und Protokoll-Governance unterscheiden.",
          ),
        ],
      },
      {
        title: l("Infrastructure and jurisdiction", "Infrastruktur und Zuständigkeit"),
        prompts: [
          l(
            "Trace hosting, identity, cloud, network and legal dependencies.",
            "Abhängigkeiten bei Hosting, Identität, Cloud, Netzen und Recht nachverfolgen.",
          ),
        ],
      },
      {
        title: l("Legitimacy and rights", "Legitimität und Rechte"),
        prompts: [
          l(
            "Compare consent, representation, due process, contestability and public accountability.",
            "Einwilligung, Repräsentation, rechtsstaatliches Verfahren, Anfechtbarkeit und öffentliche Rechenschaft vergleichen.",
          ),
        ],
      },
      {
        title: l("Comparative cases", "Vergleichende Fälle"),
        prompts: [
          l(
            "Use dated, documented examples and identify where comparison breaks down.",
            "Datierte, dokumentierte Beispiele verwenden und Grenzen des Vergleichs benennen.",
          ),
        ],
      },
      {
        title: l("Limits of post-national authority", "Grenzen postnationaler Autorität"),
        prompts: [
          l(
            "Assess coercion, recognition, public goods and the continuing role of territorial law.",
            "Durchsetzung, Anerkennung, öffentliche Güter und die fortbestehende Rolle territorialen Rechts bewerten.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "decentralized-governance-architecture",
    status: "draft",
    title: l(
      "The Architecture of Decentralized Governance",
      "Die Architektur dezentralisierter Governance",
    ),
    subtitle: l(
      "Decision rights, execution, accountability and failure in distributed institutions",
      "Entscheidungsrechte, Umsetzung, Rechenschaft und Scheitern in verteilten Institutionen",
    ),
    author: "Amine Radi",
    themes: ["decentralized-governance", "technology-civilization", "political-philosophy"],
    abstract: l(
      "A systems-level framework for comparing decentralized governance designs, including decision rights, participation, delegation, enforcement, dispute resolution and links to off-chain institutions.",
      "Ein systemisches Rahmenwerk zum Vergleich dezentralisierter Governance-Entwürfe, einschließlich Entscheidungsrechten, Beteiligung, Delegation, Durchsetzung, Streitbeilegung und Verbindungen zu Institutionen außerhalb der Blockchain.",
    ),
    researchQuestion: l(
      "Which architectural choices distribute authority meaningfully, and which merely relocate or obscure it?",
      "Welche Architekturentscheidungen verteilen Autorität tatsächlich, und welche verlagern oder verschleiern sie lediglich?",
    ),
    method: l(
      "Comparative design analysis using a common set of institutional dimensions; cases must include traceable governance records.",
      "Vergleichende Designanalyse anhand einheitlicher institutioneller Dimensionen; Fallstudien benötigen nachvollziehbare Governance-Dokumentation.",
    ),
    limitations: l(
      "“Decentralization” is multidimensional. No single score will be presented as a universal measure.",
      "„Dezentralisierung“ ist mehrdimensional. Ein einzelner Wert wird nicht als universelles Maß dargestellt.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("Define dimensions", "Dimensionen definieren"),
        prompts: [
          l(
            "Separate ownership, infrastructure, decision-making, execution and accountability.",
            "Eigentum, Infrastruktur, Entscheidungsfindung, Umsetzung und Rechenschaft trennen.",
          ),
        ],
      },
      {
        title: l("Institutional components", "Institutionelle Komponenten"),
        prompts: [
          l(
            "Map rules, actors, incentives, monitoring and dispute resolution.",
            "Regeln, Akteure, Anreize, Überwachung und Streitbeilegung abbilden.",
          ),
        ],
      },
      {
        title: l("Comparative matrix", "Vergleichsmatrix"),
        prompts: [
          l(
            "Compare selected models using cited, bounded dimensions and explicit caveats.",
            "Ausgewählte Modelle mit belegten, eingegrenzten Dimensionen und klaren Vorbehalten vergleichen.",
          ),
        ],
      },
      {
        title: l("Failure and capture", "Scheitern und Vereinnahmung"),
        prompts: [
          l(
            "Examine concentration, collusion, coercion, participation barriers and protocol failure.",
            "Konzentration, Kollusion, Zwang, Beteiligungshürden und Protokollversagen untersuchen.",
          ),
        ],
      },
      {
        title: l("Design implications", "Folgerungen für die Gestaltung"),
        prompts: [
          l(
            "Translate findings into questions for designers, not a universal checklist.",
            "Befunde in Fragen für Gestaltende übersetzen, nicht in eine universelle Checkliste.",
          ),
        ],
      },
    ],
    references: [],
    revisions: [],
  },
  {
    id: "energy-computing-civilization",
    status: "draft",
    title: l(
      "Energy, Computing and the Infrastructure of Future Civilization",
      "Energie, Computing und die Infrastruktur künftiger Zivilisation",
    ),
    subtitle: l(
      "The material constraints beneath digital and institutional futures",
      "Die materiellen Grenzen digitaler und institutioneller Zukunftsentwürfe",
    ),
    author: "Amine Radi",
    themes: ["energy-infrastructure", "technology-civilization"],
    abstract: l(
      "A cross-disciplinary research project on the energy, computing and network infrastructure that digital institutions depend on. It will trace resource and governance dependencies without treating illustrative scenarios as forecasts.",
      "Ein interdisziplinäres Forschungsprojekt zu Energie-, Rechen- und Netzinfrastruktur, von der digitale Institutionen abhängen. Es untersucht Ressourcen- und Governance-Abhängigkeiten, ohne illustrative Szenarien als Prognosen auszugeben.",
    ),
    researchQuestion: l(
      "How do energy availability, computing capacity and infrastructure ownership shape the feasible scale and governance of digital systems?",
      "Wie prägen Energieverfügbarkeit, Rechenkapazität und Infrastruktureigentum den möglichen Maßstab und die Governance digitaler Systeme?",
    ),
    method: l(
      "Systems mapping and comparative analysis using dated, traceable energy and infrastructure datasets where available.",
      "Systemkartierung und Vergleich anhand datierter, nachvollziehbarer Energie- und Infrastrukturdaten, sofern verfügbar.",
    ),
    limitations: l(
      "Energy and computing statistics vary by boundary, unit and year. Any visualization must disclose source, date, units, method and uncertainty.",
      "Energie- und Computing-Statistiken unterscheiden sich nach Abgrenzung, Einheit und Jahr. Jede Visualisierung muss Quelle, Datum, Einheit, Methode und Unsicherheit ausweisen.",
    ),
    targetLength: l(
      "2,500–5,000 words if justified by the evidence",
      "2.500–5.000 Wörter, sofern die Quellenlage dies rechtfertigt",
    ),
    outline: [
      {
        title: l("System boundaries", "Systemgrenzen"),
        prompts: [
          l(
            "Define the infrastructures and lifecycle stages included in the analysis.",
            "Einbezogene Infrastrukturen und Lebenszyklusphasen definieren.",
          ),
        ],
      },
      {
        title: l("Energy and computation", "Energie und Rechenleistung"),
        prompts: [
          l(
            "Compare demand, supply, efficiency and location using documented datasets.",
            "Bedarf, Angebot, Effizienz und Standort anhand dokumentierter Datensätze vergleichen.",
          ),
        ],
      },
      {
        title: l("Ownership and resilience", "Eigentum und Resilienz"),
        prompts: [
          l(
            "Examine dependencies, concentration, redundancy and exposure to disruption.",
            "Abhängigkeiten, Konzentration, Redundanz und Störungsanfälligkeit untersuchen.",
          ),
        ],
      },
      {
        title: l("Governance and distribution", "Governance und Verteilung"),
        prompts: [
          l(
            "Ask who bears costs, controls access and has authority over infrastructure.",
            "Untersuchen, wer Kosten trägt, Zugang kontrolliert und über Infrastruktur entscheidet.",
          ),
        ],
      },
      {
        title: l("Scenarios and caveats", "Szenarien und Vorbehalte"),
        prompts: [
          l(
            "Separate measured trends from conceptual models and speculative futures.",
            "Gemessene Trends von konzeptionellen Modellen und spekulativen Zukunftsbildern trennen.",
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
    sourceUrl: "https://logos.co/farewell-to-westphalia",
    description: l(
      "Included at your request. The publisher page is linked, but its bibliographic record could not be verified; edition and publication details remain pending.",
      "Auf Ihren Wunsch aufgenommen. Die Verlagsseite ist verlinkt, ihr bibliografischer Datensatz ließ sich jedoch nicht verifizieren; Angaben zu Ausgabe und Erscheinungsdatum stehen noch aus.",
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
