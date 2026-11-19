import { l, type L } from "@/lib/i18n";
import type { Evidence } from "./evidence";

export type DomainSlug = "governance" | "infrastructure" | "energy" | "intelligence" | "civilization";

export type Technology = { name: L; note: L; evidence: Evidence };

export type Domain = {
  slug: DomainSlug;
  index: string;
  accent: "cyan" | "violet" | "amber" | "mint" | "ice";
  title: L;
  short: L;
  purpose: L;
  topics: L[];
  principles: L[];
  technologies: Technology[];
  applications: L[];
  dependencies: { on: DomainSlug; why: L }[];
  limitations: L[];
  proposals: L[];
  openQuestions: L[];
  inputs: L[];
  outputs: L[];
  relationship: L;
};

export const domains: Domain[] = [
  {
    slug: "governance",
    index: "01",
    accent: "cyan",
    title: l("Governance", "Governance"),
    short: l(
      "How groups make, contest and enforce collective decisions — and change the rules themselves.",
      "Wie Gruppen kollektive Entscheidungen treffen, anfechten und durchsetzen – und die Regeln selbst ändern.",
    ),
    purpose: l(
      "Define how participants propose, deliberate, decide and hold decision-makers accountable, including how the rules of decision-making can be revised.",
      "Festlegen, wie Beteiligte Vorschläge einbringen, beraten, entscheiden und Verantwortliche zur Rechenschaft ziehen – einschließlich der Frage, wie die Entscheidungsregeln selbst überarbeitet werden.",
    ),
    topics: [
      l("Delegated Swarm Voting", "Delegated Swarm Voting"),
      l("Liquid democracy", "Liquid Democracy"),
      l("Quadratic voting", "Quadratisches Abstimmen"),
      l("Collective intelligence", "Kollektive Intelligenz"),
      l("Sybil resistance", "Sybil-Resistenz"),
      l("Institutional accountability", "Institutionelle Rechenschaft"),
      l("Ethical safeguards", "Ethische Schutzmechanismen"),
      l("Polycentric governance", "Polyzentrische Governance"),
      l("Dispute resolution", "Streitbeilegung"),
      l("Minority protection", "Minderheitenschutz"),
    ],
    principles: [
      l(
        "Legitimacy comes from process, not from technology. A vote recorded on a ledger is only as legitimate as the rules and participation behind it.",
        "Legitimität entsteht durch Verfahren, nicht durch Technologie. Eine auf einem Ledger gespeicherte Stimme ist nur so legitim wie die Regeln und die Beteiligung dahinter.",
      ),
      l(
        "Delegated power should be revocable. Anyone who hands authority to a representative should be able to take it back at any time.",
        "Delegierte Macht muss widerrufbar sein. Wer Autorität an eine Vertretung überträgt, sollte sie jederzeit zurücknehmen können.",
      ),
      l(
        "Many centres of decision can be more resilient than one. Elinor Ostrom's research shows communities can govern shared resources through nested, polycentric institutions.",
        "Viele Entscheidungszentren können robuster sein als eines. Elinor Ostroms Forschung zeigt, dass Gemeinschaften gemeinsame Ressourcen über verschachtelte, polyzentrische Institutionen verwalten können.",
      ),
      l(
        "Every voting mechanism has an attack surface: fake identities, bribery, apathy and concentration of power.",
        "Jedes Abstimmungsverfahren hat eine Angriffsfläche: gefälschte Identitäten, Bestechung, Desinteresse und Machtkonzentration.",
      ),
      l(
        "Minorities need structural protection, not goodwill. Majority rule alone can systematically overrule the same group.",
        "Minderheiten brauchen strukturellen Schutz, nicht nur Wohlwollen. Reine Mehrheitsregel kann dieselbe Gruppe systematisch überstimmen.",
      ),
    ],
    technologies: [
      {
        name: l("On-chain voting and DAO frameworks", "On-Chain-Abstimmungen und DAO-Frameworks"),
        note: l(
          "Widely used for token-weighted decisions in blockchain communities. Token weighting tends to concentrate power in large holders.",
          "Weit verbreitet für tokengewichtete Entscheidungen in Blockchain-Communities. Tokengewichtung konzentriert Macht tendenziell bei großen Haltern.",
        ),
        evidence: "established",
      },
      {
        name: l("Liquid democracy software", "Software für Liquid Democracy"),
        note: l(
          "Tools such as LiquidFeedback have been used by political parties and associations for transitive, revocable delegation.",
          "Werkzeuge wie LiquidFeedback wurden von Parteien und Vereinen für transitive, widerrufbare Delegation eingesetzt.",
        ),
        evidence: "established",
      },
      {
        name: l("Quadratic voting and funding", "Quadratisches Abstimmen und Finanzieren"),
        note: l(
          "Lets participants express intensity of preference at quadratic cost. Formalised by Lalley & Weyl; quadratic funding by Buterin, Hitzig & Weyl.",
          "Erlaubt, die Intensität einer Präferenz zu quadratischen Kosten auszudrücken. Formalisiert von Lalley & Weyl; quadratische Finanzierung von Buterin, Hitzig & Weyl.",
        ),
        evidence: "published",
      },
      {
        name: l("Proof-of-personhood", "Proof-of-Personhood"),
        note: l(
          "Approaches to verifying that each account is one unique human. Active research with serious privacy trade-offs.",
          "Ansätze, um nachzuweisen, dass jedes Konto genau einem Menschen gehört. Aktive Forschung mit erheblichen Datenschutz-Abwägungen.",
        ),
        evidence: "published",
      },
      {
        name: l("Delegated Swarm Voting", "Delegated Swarm Voting"),
        note: l(
          "OMEGA's proposed mechanism: per-topic, fractional and revocable delegation with caps on how much weight any delegate can accumulate.",
          "Von OMEGA vorgeschlagener Mechanismus: themenbezogene, anteilige und widerrufbare Delegation mit Obergrenzen für das Gewicht einzelner Delegierter.",
        ),
        evidence: "proposal",
      },
    ],
    applications: [
      l("Participatory budgeting, as practised in Porto Alegre since 1989.", "Bürgerhaushalte, wie sie in Porto Alegre seit 1989 praktiziert werden."),
      l("Community energy cooperatives deciding on shared investments.", "Energiegenossenschaften, die über gemeinsame Investitionen entscheiden."),
      l("Open-source projects governing roadmaps and funds.", "Open-Source-Projekte, die Roadmaps und Mittel verwalten."),
      l("Municipal consultations with transparent, auditable results.", "Kommunale Beteiligungsverfahren mit transparenten, prüfbaren Ergebnissen."),
    ],
    dependencies: [
      { on: "infrastructure", why: l("Identity, tamper-evident records and rule execution.", "Identität, manipulationssichere Aufzeichnungen und Regelausführung.") },
      { on: "intelligence", why: l("Summarising deliberation and modelling consequences — under human oversight.", "Zusammenfassen von Debatten und Modellieren von Folgen – unter menschlicher Aufsicht.") },
      { on: "civilization", why: l("Legal recognition, cultural legitimacy and real communities.", "Rechtliche Anerkennung, kulturelle Legitimität und echte Gemeinschaften.") },
    ],
    limitations: [
      l("Low participation lets small, motivated groups decide for everyone.", "Geringe Beteiligung lässt kleine, motivierte Gruppen für alle entscheiden."),
      l("Delegation can concentrate power in a few popular delegates.", "Delegation kann Macht bei wenigen populären Delegierten bündeln."),
      l("Sybil attacks: without reliable identity, one actor can cast many votes.", "Sybil-Angriffe: Ohne verlässliche Identität kann ein Akteur viele Stimmen abgeben."),
      l("Verifiable votes can make vote-buying easier, not harder.", "Überprüfbare Stimmen können Stimmenkauf erleichtern statt erschweren."),
      l("Code cannot settle every dispute; human judgement and courts remain necessary.", "Code kann nicht jeden Streit lösen; menschliches Urteil und Gerichte bleiben nötig."),
      l("The legal status of decentralized organisations is unclear in most jurisdictions.", "Der Rechtsstatus dezentraler Organisationen ist in den meisten Rechtsordnungen unklar."),
    ],
    proposals: [
      l(
        "Delegated Swarm Voting: delegate per topic to several people with fractional weights, revocable at any time, with a hard cap on any delegate's share of total weight.",
        "Delegated Swarm Voting: Delegation pro Thema an mehrere Personen mit anteiligen Gewichten, jederzeit widerrufbar, mit fester Obergrenze für den Anteil einzelner Delegierter.",
      ),
      l(
        "Double-majority safeguard: proposals that affect a defined group must also pass within that group.",
        "Doppelte-Mehrheit-Schutz: Vorschläge, die eine definierte Gruppe betreffen, müssen auch innerhalb dieser Gruppe eine Mehrheit finden.",
      ),
      l("Sunset clauses: automated rules expire unless explicitly renewed.", "Verfallsklauseln: Automatisierte Regeln laufen aus, sofern sie nicht ausdrücklich erneuert werden."),
    ],
    openQuestions: [
      l("How can unique personhood be verified without building a surveillance system?", "Wie lässt sich die Einzigartigkeit einer Person prüfen, ohne ein Überwachungssystem zu bauen?"),
      l("What delegation cap preserves expertise without recreating oligarchy?", "Welche Delegationsgrenze bewahrt Expertise, ohne eine Oligarchie neu zu erschaffen?"),
      l("How should decentralized decisions interact with national law and courts?", "Wie sollten dezentrale Entscheidungen mit nationalem Recht und Gerichten zusammenwirken?"),
    ],
    inputs: [
      l("Proposals", "Vorschläge"),
      l("Verified identities", "Verifizierte Identitäten"),
      l("Delegations", "Delegationen"),
      l("Deliberation and evidence", "Beratung und Evidenz"),
    ],
    outputs: [
      l("Decisions and mandates", "Entscheidungen und Mandate"),
      l("Budgets and allocations", "Budgets und Zuweisungen"),
      l("Rule changes", "Regeländerungen"),
      l("Public audit trails", "Öffentliche Prüfpfade"),
    ],
    relationship: l(
      "Governance is OMEGA's core question. The other four domains are means; governance decides what they are for and who is accountable for them.",
      "Governance ist OMEGAs Kernfrage. Die anderen vier Bereiche sind Mittel; Governance entscheidet, wozu sie dienen und wer für sie verantwortlich ist.",
    ),
  },
  {
    slug: "infrastructure",
    index: "02",
    accent: "violet",
    title: l("Digital Infrastructure", "Digitale Infrastruktur"),
    short: l(
      "Shared, verifiable records, identity and computation that no single party controls.",
      "Gemeinsame, überprüfbare Aufzeichnungen, Identitäten und Berechnungen, die keine einzelne Partei kontrolliert.",
    ),
    purpose: l(
      "Provide tamper-evident records, digital identity, rule execution, storage and networking that participants can verify instead of having to trust.",
      "Manipulationssichere Aufzeichnungen, digitale Identität, Regelausführung, Speicherung und Vernetzung bereitstellen, die Beteiligte prüfen können, statt vertrauen zu müssen.",
    ),
    topics: [
      l("Blockchain", "Blockchain"),
      l("Smart contracts", "Smart Contracts"),
      l("Distributed ledgers", "Verteilte Ledger"),
      l("Cryptography", "Kryptografie"),
      l("Decentralized identity", "Dezentrale Identität"),
      l("Distributed computing", "Verteiltes Rechnen"),
      l("Distributed storage", "Verteilte Speicherung"),
      l("Peer-to-peer networking", "Peer-to-Peer-Netzwerke"),
      l("Consensus mechanisms", "Konsensmechanismen"),
      l("Oracles and interoperability", "Orakel und Interoperabilität"),
    ],
    principles: [
      l("Verify, don't trust: cryptographic proofs replace reliance on a single operator.", "Prüfen statt vertrauen: Kryptografische Beweise ersetzen das Vertrauen in einen einzelnen Betreiber."),
      l(
        "Consensus must tolerate faulty or malicious participants — the Byzantine Generals Problem (Lamport, Shostak & Pease, 1982).",
        "Konsens muss fehlerhafte oder böswillige Teilnehmer aushalten – das Problem der byzantinischen Generäle (Lamport, Shostak & Pease, 1982).",
      ),
      l("Put as little on-chain as possible: commitments and audit trails, not personal data.", "So wenig wie möglich on-chain: Verpflichtungen und Prüfpfade, keine personenbezogenen Daten."),
      l("Prefer open standards over proprietary platforms or project-specific tokens.", "Offene Standards statt proprietärer Plattformen oder projekteigener Tokens."),
    ],
    technologies: [
      { name: l("Bitcoin", "Bitcoin"), note: l("Peer-to-peer electronic cash with proof-of-work consensus, running since 2009.", "Peer-to-Peer-Bargeld mit Proof-of-Work-Konsens, in Betrieb seit 2009."), evidence: "established" },
      {
        name: l("Ethereum smart contracts", "Ethereum-Smart-Contracts"),
        note: l("General-purpose programmable contracts since 2015; moved to proof-of-stake in 2022.", "Allgemein programmierbare Verträge seit 2015; Umstellung auf Proof-of-Stake 2022."),
        evidence: "established",
      },
      {
        name: l("Byzantine fault-tolerant consensus", "Byzantinisch fehlertoleranter Konsens"),
        note: l("PBFT (Castro & Liskov, 1999) and successors underpin many permissioned ledgers.", "PBFT (Castro & Liskov, 1999) und Nachfolger bilden die Basis vieler zugangsbeschränkter Ledger."),
        evidence: "established",
      },
      {
        name: l("W3C Decentralized Identifiers", "W3C Decentralized Identifiers"),
        note: l("A W3C Recommendation (2022) for identifiers controlled by their subject.", "Eine W3C-Empfehlung (2022) für Identifikatoren, die ihr Subjekt selbst kontrolliert."),
        evidence: "established",
      },
      {
        name: l("Content-addressed storage (IPFS)", "Inhaltsadressierte Speicherung (IPFS)"),
        note: l("Files are referenced by their hash, so any copy can be verified.", "Dateien werden über ihren Hash referenziert, sodass jede Kopie überprüfbar ist."),
        evidence: "established",
      },
      {
        name: l("Zero-knowledge proofs", "Zero-Knowledge-Beweise"),
        note: l("Prove a statement is true without revealing the data behind it. Deployed in some systems; still costly and complex.", "Beweisen, dass eine Aussage stimmt, ohne die Daten offenzulegen. In einigen Systemen im Einsatz; noch teuer und komplex."),
        evidence: "published",
      },
    ],
    applications: [
      l("Tamper-evident public registries and audit logs.", "Manipulationssichere öffentliche Register und Prüfprotokolle."),
      l("Transparent treasury management for cooperatives.", "Transparente Kassenführung für Genossenschaften."),
      l("Verifiable credentials for diplomas and qualifications.", "Überprüfbare Nachweise für Zeugnisse und Qualifikationen."),
      l("Durable, verifiable public archives.", "Dauerhafte, überprüfbare öffentliche Archive."),
    ],
    dependencies: [
      { on: "energy", why: l("Every node, validator and data centre needs reliable power.", "Jeder Knoten, Validator und jedes Rechenzentrum braucht verlässlichen Strom.") },
      { on: "governance", why: l("Protocol upgrades and parameter changes are governance decisions.", "Protokoll-Upgrades und Parameteränderungen sind Governance-Entscheidungen.") },
      { on: "civilization", why: l("Connectivity, legal recognition and digital literacy.", "Konnektivität, rechtliche Anerkennung und digitale Kompetenz.") },
    ],
    limitations: [
      l("Scalability, security and decentralization trade off against each other.", "Skalierbarkeit, Sicherheit und Dezentralität stehen im Zielkonflikt."),
      l("Smart contract bugs can be irreversible — the 2016 exploit of 'The DAO' is a well-known example.", "Fehler in Smart Contracts können unumkehrbar sein – der Angriff auf 'The DAO' 2016 ist ein bekanntes Beispiel."),
      l("The oracle problem: a blockchain cannot verify real-world facts on its own.", "Das Orakel-Problem: Eine Blockchain kann reale Fakten nicht selbst überprüfen."),
      l("Key management is hard; lost keys can mean lost identity or assets.", "Schlüsselverwaltung ist schwierig; verlorene Schlüssel können Identität oder Vermögen kosten."),
      l("Proof-of-work consumes large amounts of energy.", "Proof-of-Work verbraucht große Mengen Energie."),
      l("Public transparency conflicts with privacy and data-protection law.", "Öffentliche Transparenz steht im Konflikt mit Privatsphäre und Datenschutzrecht."),
    ],
    proposals: [
      l("Layered design: data stays local; only hashes, commitments and audit trails are anchored to a shared ledger.", "Schichtenmodell: Daten bleiben lokal; nur Hashes, Verpflichtungen und Prüfpfade werden in einem gemeinsamen Ledger verankert."),
      l("Build on open standards (DIDs, Verifiable Credentials) instead of an OMEGA-specific platform.", "Auf offene Standards (DIDs, Verifiable Credentials) setzen statt auf eine OMEGA-eigene Plattform."),
      l("No OMEGA token. Coordination should not depend on a speculative asset.", "Kein OMEGA-Token. Koordination sollte nicht von einem spekulativen Vermögenswert abhängen."),
    ],
    openQuestions: [
      l("How can people recover identity after losing keys, without a central authority?", "Wie können Menschen ihre Identität nach Schlüsselverlust wiederherstellen – ohne zentrale Instanz?"),
      l("Which data must never be written to a public ledger?", "Welche Daten dürfen niemals in ein öffentliches Ledger geschrieben werden?"),
      l("When does a shared ledger add value over a well-governed conventional database?", "Wann bietet ein gemeinsames Ledger einen Mehrwert gegenüber einer gut verwalteten herkömmlichen Datenbank?"),
    ],
    inputs: [l("Signed transactions", "Signierte Transaktionen"), l("Energy and bandwidth", "Energie und Bandbreite"), l("Protocol rules", "Protokollregeln"), l("Oracle data", "Orakeldaten")],
    outputs: [l("Ordered, tamper-evident records", "Geordnete, manipulationssichere Aufzeichnungen"), l("Verified identities", "Verifizierte Identitäten"), l("Executed contracts", "Ausgeführte Verträge"), l("Cryptographic proofs", "Kryptografische Beweise")],
    relationship: l(
      "Infrastructure is OMEGA's substrate: it makes governance auditable and coordination possible across distance — but it is a tool, never the goal.",
      "Infrastruktur ist OMEGAs Fundament: Sie macht Governance prüfbar und Koordination über Distanz möglich – bleibt aber Werkzeug, nie Ziel.",
    ),
  },
  {
    slug: "energy",
    index: "03",
    accent: "amber",
    title: l("Energy", "Energie"),
    short: l(
      "Distributed generation, storage and demand coordinated for resilience.",
      "Verteilte Erzeugung, Speicherung und Nachfrage – koordiniert für Resilienz.",
    ),
    purpose: l(
      "Supply the physical power every other layer depends on, and treat energy itself as a coordination problem between many small producers, stores and consumers.",
      "Die physische Energie liefern, von der jede andere Schicht abhängt – und Energie selbst als Koordinationsproblem zwischen vielen kleinen Erzeugern, Speichern und Verbrauchern verstehen.",
    ),
    topics: [
      l("Renewable generation", "Erneuerbare Erzeugung"),
      l("Solar and wind", "Solar und Wind"),
      l("Battery storage", "Batteriespeicher"),
      l("Microgrids", "Microgrids"),
      l("Smart grids", "Smart Grids"),
      l("Demand response", "Lastmanagement (Demand Response)"),
      l("Virtual power plants", "Virtuelle Kraftwerke"),
      l("Energy resilience", "Energieresilienz"),
      l("Distributed energy resources", "Dezentrale Energieressourcen"),
    ],
    principles: [
      l("Supply and demand must balance every moment; variable renewables need storage, flexibility or interconnection.", "Angebot und Nachfrage müssen in jedem Moment ausgeglichen sein; variable Erneuerbare brauchen Speicher, Flexibilität oder Netzverbund."),
      l("Local generation can keep critical services running when the wider grid fails.", "Lokale Erzeugung kann kritische Dienste am Laufen halten, wenn das übergeordnete Netz ausfällt."),
      l("Price and control signals can coordinate millions of small devices.", "Preis- und Steuersignale können Millionen kleiner Geräte koordinieren."),
      l("Physics sets hard limits that no software can negotiate away.", "Die Physik setzt harte Grenzen, die keine Software wegverhandeln kann."),
    ],
    technologies: [
      { name: l("Solar PV and wind turbines", "Photovoltaik und Windkraft"), note: l("Mature, mass-produced and among the lowest-cost new generation in many regions (IRENA).", "Ausgereift, in Massenproduktion und in vielen Regionen unter den günstigsten neuen Erzeugungsarten (IRENA)."), evidence: "established" },
      { name: l("Lithium-ion battery storage", "Lithium-Ionen-Speicher"), note: l("Widely deployed for short-duration storage, typically a few hours.", "Weit verbreitet für Kurzzeitspeicherung, typischerweise einige Stunden."), evidence: "established" },
      { name: l("Microgrids", "Microgrids"), note: l("Local grids that can run connected or islanded; concept formalised by Lasseter (2002).", "Lokale Netze, die verbunden oder im Inselbetrieb laufen können; Konzept formalisiert von Lasseter (2002)."), evidence: "established" },
      { name: l("Demand response and virtual power plants", "Demand Response und virtuelle Kraftwerke"), note: l("Aggregating flexible loads and small generators to act like one plant. Operating in several markets.", "Bündelung flexibler Lasten und kleiner Erzeuger, die wie ein Kraftwerk agieren. In mehreren Märkten im Betrieb."), evidence: "established" },
      { name: l("Peer-to-peer energy trading", "Peer-to-Peer-Energiehandel"), note: l("Neighbours trading surplus directly. Mostly pilots so far; benefits versus simple tariffs are debated.", "Nachbarn handeln Überschüsse direkt. Bisher meist Pilotprojekte; der Nutzen gegenüber einfachen Tarifen ist umstritten."), evidence: "published" },
    ],
    applications: [
      l("Solar-plus-storage microgrids for villages, schools and clinics.", "Solar-plus-Speicher-Microgrids für Dörfer, Schulen und Kliniken."),
      l("Community energy cooperatives with shared ownership.", "Energiegenossenschaften mit gemeinsamem Eigentum."),
      l("Large solar complexes such as Noor Ouarzazate in Morocco.", "Große Solarkomplexe wie Noor Ouarzazate in Marokko."),
      l("Backup power for critical digital infrastructure.", "Notstrom für kritische digitale Infrastruktur."),
    ],
    dependencies: [
      { on: "infrastructure", why: l("Metering, data exchange and settlement.", "Messung, Datenaustausch und Abrechnung.") },
      { on: "intelligence", why: l("Forecasting generation and load; optimising storage.", "Prognose von Erzeugung und Last; Optimierung von Speichern.") },
      { on: "governance", why: l("Tariffs, investment priorities and fair sharing of surplus.", "Tarife, Investitionsprioritäten und faire Verteilung von Überschüssen.") },
    ],
    limitations: [
      l("Batteries cover hours, not seasons; long-duration storage remains costly.", "Batterien decken Stunden, nicht Jahreszeiten ab; Langzeitspeicher bleiben teuer."),
      l("Grid codes and regulation often limit local trading and islanding.", "Netzregeln und Regulierung begrenzen oft lokalen Handel und Inselbetrieb."),
      l("Upfront capital costs fall hardest on the communities with least access to finance.", "Hohe Anfangsinvestitionen treffen gerade Gemeinschaften mit schlechtem Zugang zu Finanzierung."),
      l("Mineral supply chains raise environmental and ethical concerns.", "Rohstofflieferketten werfen ökologische und ethische Fragen auf."),
    ],
    proposals: [
      l("Energy-aware computing: schedule heavy computation when local renewable surplus exists.", "Energiebewusstes Rechnen: Rechenintensive Aufgaben dann ausführen, wenn lokaler Ökostrom-Überschuss vorhanden ist."),
      l("Community-governed microgrid funds whose allocation is decided through the governance layer.", "Gemeinschaftlich verwaltete Microgrid-Fonds, deren Verwendung über die Governance-Schicht entschieden wird."),
    ],
    openQuestions: [
      l("Does a blockchain add value over a conventional database for local energy settlement?", "Bringt eine Blockchain bei lokaler Energieabrechnung einen Mehrwert gegenüber einer herkömmlichen Datenbank?"),
      l("How should a community share surplus fairly between members with and without panels?", "Wie sollte eine Gemeinschaft Überschüsse fair zwischen Mitgliedern mit und ohne eigene Anlagen teilen?"),
    ],
    inputs: [l("Sunlight and wind", "Sonne und Wind"), l("Capital and land", "Kapital und Fläche"), l("Demand", "Nachfrage"), l("Forecasts", "Prognosen")],
    outputs: [l("Electricity", "Elektrizität"), l("Stored energy", "Gespeicherte Energie"), l("Flexibility", "Flexibilität"), l("Measurement data", "Messdaten")],
    relationship: l(
      "Energy is OMEGA's physical foundation. Without resilient power there is no computation, no ledger and no digital participation.",
      "Energie ist OMEGAs physische Grundlage. Ohne resiliente Stromversorgung gibt es keine Berechnung, kein Ledger und keine digitale Beteiligung.",
    ),
  },
  {
    slug: "intelligence",
    index: "04",
    accent: "mint",
    title: l("Intelligence", "Intelligenz"),
    short: l(
      "AI that helps humans understand and coordinate — without replacing their judgement.",
      "KI, die Menschen beim Verstehen und Koordinieren hilft – ohne ihr Urteil zu ersetzen.",
    ),
    purpose: l(
      "Help people understand complex systems, forecast, translate and coordinate, while keeping decisions and accountability with humans.",
      "Menschen helfen, komplexe Systeme zu verstehen, Prognosen zu erstellen, zu übersetzen und zu koordinieren – während Entscheidungen und Verantwortung beim Menschen bleiben.",
    ),
    topics: [
      l("Artificial intelligence", "Künstliche Intelligenz"),
      l("AI agents", "KI-Agenten"),
      l("Multi-agent systems", "Multi-Agenten-Systeme"),
      l("Distributed intelligence", "Verteilte Intelligenz"),
      l("Human-in-the-loop systems", "Human-in-the-Loop-Systeme"),
      l("AI safety and alignment", "KI-Sicherheit und Alignment"),
      l("Potential future AGI", "Mögliche zukünftige AGI"),
    ],
    principles: [
      l("Humans decide; AI advises. No AI system should hold a vote or a veto.", "Menschen entscheiden; KI berät. Kein KI-System sollte Stimm- oder Vetorecht haben."),
      l("Every AI contribution should be labelled, logged and contestable.", "Jeder KI-Beitrag sollte gekennzeichnet, protokolliert und anfechtbar sein."),
      l("Alignment — making AI reliably pursue intended goals — is an unsolved problem.", "Alignment – KI zuverlässig auf beabsichtigte Ziele auszurichten – ist ungelöst."),
      l("Avoid single points of control over models, data or compute.", "Keine zentralen Kontrollpunkte über Modelle, Daten oder Rechenleistung."),
    ],
    technologies: [
      { name: l("Large language models", "Große Sprachmodelle"), note: l("Built on the Transformer architecture (Vaswani et al., 2017). Powerful but prone to errors and fabrication.", "Basieren auf der Transformer-Architektur (Vaswani et al., 2017). Leistungsfähig, aber fehleranfällig und zum Erfinden neigend."), evidence: "established" },
      { name: l("Machine-learning forecasting", "Prognosen mit maschinellem Lernen"), note: l("Routinely used for load, solar and wind forecasting.", "Routinemäßig für Last-, Solar- und Windprognosen eingesetzt."), evidence: "established" },
      { name: l("Multi-agent systems", "Multi-Agenten-Systeme"), note: l("Many autonomous agents interacting; long studied in computer science (Wooldridge).", "Viele autonome Agenten, die interagieren; in der Informatik lange erforscht (Wooldridge)."), evidence: "published" },
      { name: l("Learning from human feedback", "Lernen aus menschlichem Feedback"), note: l("Training models from human preference comparisons (Christiano et al., 2017).", "Training von Modellen anhand menschlicher Präferenzvergleiche (Christiano et al., 2017)."), evidence: "published" },
      { name: l("Artificial general intelligence", "Allgemeine künstliche Intelligenz (AGI)"), note: l("Whether, when and how AGI might emerge is deeply uncertain.", "Ob, wann und wie AGI entstehen könnte, ist höchst ungewiss."), evidence: "speculative" },
    ],
    applications: [
      l("Summarising large public deliberations into readable positions.", "Große öffentliche Debatten in lesbare Positionen zusammenfassen."),
      l("Translation for multilingual participation — for example Arabic, Amazigh, French and English in Morocco.", "Übersetzung für mehrsprachige Beteiligung – etwa Arabisch, Amazigh, Französisch und Englisch in Marokko."),
      l("Forecasting energy generation and demand.", "Prognose von Energieerzeugung und -bedarf."),
      l("Flagging anomalies in smart contracts and treasuries for human review.", "Auffälligkeiten in Smart Contracts und Kassen für menschliche Prüfung markieren."),
    ],
    dependencies: [
      { on: "infrastructure", why: l("Compute, storage and data provenance.", "Rechenleistung, Speicher und Datenherkunft.") },
      { on: "energy", why: l("Training and running models requires substantial power.", "Training und Betrieb von Modellen brauchen erhebliche Energie.") },
      { on: "governance", why: l("Who controls models, what they may do, and who audits them.", "Wer Modelle kontrolliert, was sie dürfen und wer sie prüft.") },
    ],
    limitations: [
      l("Models can produce confident, false output.", "Modelle können selbstsicher falsche Ergebnisse liefern."),
      l("Training data carries social and cultural bias.", "Trainingsdaten tragen soziale und kulturelle Verzerrungen."),
      l("AI could be used to manipulate deliberation at scale.", "KI könnte genutzt werden, um Debatten massenhaft zu manipulieren."),
      l("Frontier compute is concentrated in very few organisations.", "Spitzen-Rechenleistung ist auf sehr wenige Organisationen konzentriert."),
    ],
    proposals: [
      l("AI as an accountable participant: labelled, logged, contestable, and never holding voting power.", "KI als rechenschaftspflichtiger Teilnehmer: gekennzeichnet, protokolliert, anfechtbar und ohne Stimmrecht."),
      l("Plural models: important analyses are cross-checked by independent models and human reviewers.", "Plurale Modelle: Wichtige Analysen werden durch unabhängige Modelle und menschliche Prüfer gegengeprüft."),
    ],
    openQuestions: [
      l("How can a community audit the influence of AI on its collective decisions?", "Wie kann eine Gemeinschaft den Einfluss von KI auf ihre kollektiven Entscheidungen prüfen?"),
      l("Could AI agents ever legitimately represent those who cannot participate, such as future generations?", "Könnten KI-Agenten jemals legitim diejenigen vertreten, die nicht teilnehmen können, etwa künftige Generationen?"),
    ],
    inputs: [l("Data", "Daten"), l("Compute and energy", "Rechenleistung und Energie"), l("Human feedback", "Menschliches Feedback"), l("Mandates and limits", "Mandate und Grenzen")],
    outputs: [l("Forecasts", "Prognosen"), l("Summaries and translations", "Zusammenfassungen und Übersetzungen"), l("Recommendations", "Empfehlungen"), l("Anomaly alerts", "Warnungen bei Auffälligkeiten")],
    relationship: l(
      "Intelligence is OMEGA's sense-making layer: it can widen who understands a decision, but it must never narrow who makes it.",
      "Intelligenz ist OMEGAs Erkenntnisschicht: Sie kann erweitern, wer eine Entscheidung versteht – darf aber nie einschränken, wer sie trifft.",
    ),
  },
  {
    slug: "civilization",
    index: "05",
    accent: "ice",
    title: l("Civilization", "Zivilisation"),
    short: l(
      "Cities, institutions and communities — where the other layers meet real lives.",
      "Städte, Institutionen und Gemeinschaften – wo die anderen Schichten auf das echte Leben treffen.",
    ),
    purpose: l(
      "Ask how the other layers could serve real communities, cities and regions — and under which conditions they should not be used at all.",
      "Fragen, wie die anderen Schichten echten Gemeinschaften, Städten und Regionen dienen könnten – und unter welchen Bedingungen sie gar nicht eingesetzt werden sollten.",
    ),
    topics: [
      l("Smart cities", "Smart Cities"),
      l("Digital public infrastructure", "Digitale öffentliche Infrastruktur"),
      l("Institutional design", "Institutionendesign"),
      l("Digital communities", "Digitale Gemeinschaften"),
      l("Local autonomy", "Lokale Autonomie"),
      l("Regional coordination", "Regionale Koordination"),
      l("Morocco and Africa", "Marokko und Afrika"),
    ],
    principles: [
      l("Institutions shape outcomes more than tools do (North, 1990). Technology must fit institutions, not replace them.", "Institutionen prägen Ergebnisse stärker als Werkzeuge (North, 1990). Technologie muss zu Institutionen passen, nicht sie ersetzen."),
      l("Subsidiarity: decide at the most local level that is competent to decide.", "Subsidiarität: auf der lokalsten Ebene entscheiden, die dafür kompetent ist."),
      l("Inclusion first: a system that excludes the unconnected is not decentralized, only relocated.", "Inklusion zuerst: Ein System, das Menschen ohne Zugang ausschließt, ist nicht dezentral, nur verlagert."),
      l("Context matters: models imported from elsewhere rarely fit unchanged.", "Kontext zählt: Anderswo entwickelte Modelle passen selten unverändert."),
    ],
    technologies: [
      { name: l("Estonia's X-Road", "Estlands X-Road"), note: l("Data-exchange layer behind Estonian e-government since 2001.", "Datenaustauschschicht hinter Estlands E-Government seit 2001."), evidence: "established" },
      { name: l("India's UPI", "Indiens UPI"), note: l("Interoperable real-time payments operated by NPCI since 2016.", "Interoperable Echtzeitzahlungen, betrieben von NPCI seit 2016."), evidence: "established" },
      { name: l("M-Pesa", "M-Pesa"), note: l("Mobile money launched in Kenya in 2007; studied by Suri & Jack (2016).", "Mobiles Geld, 2007 in Kenia gestartet; untersucht von Suri & Jack (2016)."), evidence: "established" },
      { name: l("Participatory budgeting", "Bürgerhaushalt"), note: l("Citizens allocate part of a municipal budget; pioneered in Porto Alegre, Brazil.", "Bürger verteilen einen Teil des kommunalen Haushalts; Vorreiter war Porto Alegre, Brasilien."), evidence: "established" },
      { name: l("Decentralized municipal coordination", "Dezentrale kommunale Koordination"), note: l("Linking local governance, energy and identity layers for cities. Not yet demonstrated as an integrated system.", "Verknüpfung lokaler Governance-, Energie- und Identitätsschichten für Städte. Als integriertes System noch nicht erprobt."), evidence: "speculative" },
    ],
    applications: [
      l("Morocco: multilingual digital participation and solar microgrids for rural communities.", "Marokko: mehrsprachige digitale Beteiligung und Solar-Microgrids für ländliche Gemeinden."),
      l("Africa: mobile-first identity, payments and public services.", "Afrika: Mobile-first-Identität, Zahlungen und öffentliche Dienste."),
      l("Cities: transparent budgets and open infrastructure data.", "Städte: transparente Haushalte und offene Infrastrukturdaten."),
      l("Regions: coordinating shared energy and water resources across municipalities.", "Regionen: Koordination gemeinsamer Energie- und Wasserressourcen über Gemeindegrenzen hinweg."),
    ],
    dependencies: [
      { on: "governance", why: l("Legitimate decision-making processes.", "Legitime Entscheidungsprozesse.") },
      { on: "infrastructure", why: l("Identity, payments and public data exchange.", "Identität, Zahlungen und öffentlicher Datenaustausch.") },
      { on: "energy", why: l("Reliable, affordable power for homes and services.", "Verlässliche, bezahlbare Energie für Haushalte und Dienste.") },
      { on: "intelligence", why: l("Planning, translation and access to information.", "Planung, Übersetzung und Zugang zu Informationen.") },
    ],
    limitations: [
      l("The digital divide excludes people without connectivity, devices or literacy.", "Die digitale Kluft schließt Menschen ohne Netz, Geräte oder Kenntnisse aus."),
      l("Smart-city sensors can become surveillance infrastructure.", "Smart-City-Sensoren können zur Überwachungsinfrastruktur werden."),
      l("Institutional trust cannot be engineered; it is earned over time.", "Institutionelles Vertrauen lässt sich nicht konstruieren; es wird über Zeit verdient."),
      l("OMEGA has no partnerships with any government, city or institution.", "OMEGA hat keine Partnerschaften mit Regierungen, Städten oder Institutionen."),
    ],
    proposals: [
      l("Pilot thinking: any application starts as a small, reversible, locally governed experiment designed with the community.", "Pilotdenken: Jede Anwendung beginnt als kleines, umkehrbares, lokal gesteuertes Experiment – gemeinsam mit der Gemeinschaft entworfen."),
      l("Morocco and Africa are contexts of study and dialogue, not test beds.", "Marokko und Afrika sind Kontexte für Forschung und Dialog, keine Testfelder."),
    ],
    openQuestions: [
      l("Which institutions would need to change for decentralized tools to be legitimate?", "Welche Institutionen müssten sich ändern, damit dezentrale Werkzeuge legitim sind?"),
      l("How can people without connectivity keep full rights in a digital system?", "Wie behalten Menschen ohne Internetzugang volle Rechte in einem digitalen System?"),
    ],
    inputs: [l("People and communities", "Menschen und Gemeinschaften"), l("Laws and institutions", "Gesetze und Institutionen"), l("Culture and languages", "Kultur und Sprachen"), l("Physical infrastructure", "Physische Infrastruktur")],
    outputs: [l("Public services", "Öffentliche Dienste"), l("Legitimacy", "Legitimität"), l("Local autonomy", "Lokale Autonomie"), l("Regional coordination", "Regionale Koordination")],
    relationship: l(
      "Civilization is where OMEGA is tested against reality. If the other layers do not improve real people's lives, the vision has failed.",
      "Zivilisation ist der Ort, an dem OMEGA an der Wirklichkeit gemessen wird. Wenn die anderen Schichten das Leben echter Menschen nicht verbessern, ist die Vision gescheitert.",
    ),
  },
];

export const domainBySlug = (slug: string) => domains.find((d) => d.slug === slug);

/** Directed relationships shown in the architecture explorer. */
export type Relation = { from: DomainSlug; to: DomainSlug; label: L };

export const relations: Relation[] = [
  { from: "energy", to: "infrastructure", label: l("Powers nodes, networks and data centres", "Versorgt Knoten, Netze und Rechenzentren") },
  { from: "energy", to: "intelligence", label: l("Supplies the power for compute", "Liefert die Energie für Rechenleistung") },
  { from: "infrastructure", to: "governance", label: l("Provides identity, records and rule execution", "Stellt Identität, Aufzeichnungen und Regelausführung bereit") },
  { from: "infrastructure", to: "intelligence", label: l("Provides compute and data provenance", "Stellt Rechenleistung und Datenherkunft bereit") },
  { from: "infrastructure", to: "energy", label: l("Metering and settlement data", "Mess- und Abrechnungsdaten") },
  { from: "intelligence", to: "energy", label: l("Forecasts load and optimises storage", "Prognostiziert Last und optimiert Speicher") },
  { from: "intelligence", to: "governance", label: l("Summarises deliberation, models consequences", "Fasst Debatten zusammen, modelliert Folgen") },
  { from: "governance", to: "energy", label: l("Decides tariffs and investment", "Entscheidet über Tarife und Investitionen") },
  { from: "governance", to: "intelligence", label: l("Sets mandates and oversight for AI", "Legt Mandate und Aufsicht für KI fest") },
  { from: "governance", to: "civilization", label: l("Produces legitimate collective decisions", "Erzeugt legitime kollektive Entscheidungen") },
  { from: "civilization", to: "governance", label: l("Grants legitimacy and legal recognition", "Verleiht Legitimität und rechtliche Anerkennung") },
  { from: "infrastructure", to: "civilization", label: l("Digital public infrastructure", "Digitale öffentliche Infrastruktur") },
  { from: "energy", to: "civilization", label: l("Access to resilient power", "Zugang zu resilienter Energie") },
];
