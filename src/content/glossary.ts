import { l, type L } from "@/lib/i18n";

export type GlossaryTerm = { term: L; definition: L; domain: "governance" | "infrastructure" | "energy" | "intelligence" | "civilization" };

export const glossary: GlossaryTerm[] = [
  { term: l("AGI (Artificial General Intelligence)", "AGI (Allgemeine künstliche Intelligenz)"), domain: "intelligence", definition: l("A hypothetical AI system able to perform most intellectual tasks at least as well as humans. Whether and when it could exist is uncertain.", "Ein hypothetisches KI-System, das die meisten intellektuellen Aufgaben mindestens so gut wie Menschen erledigt. Ob und wann es existieren könnte, ist ungewiss.") },
  { term: l("AI agent", "KI-Agent"), domain: "intelligence", definition: l("Software that perceives its environment and takes actions toward goals, often by calling tools or other services.", "Software, die ihre Umgebung wahrnimmt und zielgerichtet handelt, oft durch Aufruf von Werkzeugen oder Diensten.") },
  { term: l("Alignment", "Alignment"), domain: "intelligence", definition: l("The problem of ensuring an AI system reliably pursues the goals its designers and users intend.", "Das Problem sicherzustellen, dass ein KI-System zuverlässig die beabsichtigten Ziele verfolgt.") },
  { term: l("Blockchain", "Blockchain"), domain: "infrastructure", definition: l("A distributed ledger in which records are grouped into blocks, each linked to the previous one by a cryptographic hash, making past records tamper-evident.", "Ein verteiltes Ledger, in dem Einträge in Blöcken gebündelt und per kryptografischem Hash mit dem vorherigen Block verknüpft sind, sodass Manipulationen sichtbar werden.") },
  { term: l("Byzantine fault tolerance", "Byzantinische Fehlertoleranz"), domain: "infrastructure", definition: l("The ability of a distributed system to reach correct agreement even if some participants are faulty or malicious.", "Die Fähigkeit eines verteilten Systems, korrekte Einigung zu erzielen, auch wenn einige Teilnehmer fehlerhaft oder böswillig sind.") },
  { term: l("Collective intelligence", "Kollektive Intelligenz"), domain: "governance", definition: l("The capacity of a group to solve problems or make decisions better than its individual members could alone.", "Die Fähigkeit einer Gruppe, Probleme besser zu lösen oder zu entscheiden als ihre einzelnen Mitglieder allein.") },
  { term: l("Consensus mechanism", "Konsensmechanismus"), domain: "infrastructure", definition: l("The procedure by which nodes in a distributed system agree on a single shared state, e.g. proof-of-work, proof-of-stake or BFT protocols.", "Das Verfahren, mit dem sich Knoten eines verteilten Systems auf einen gemeinsamen Zustand einigen, z. B. Proof-of-Work, Proof-of-Stake oder BFT-Protokolle.") },
  { term: l("DAO (Decentralized Autonomous Organization)", "DAO (Dezentrale autonome Organisation)"), domain: "governance", definition: l("An organisation whose rules and treasury are managed by smart contracts and member votes. OMEGA is not a DAO.", "Eine Organisation, deren Regeln und Kasse über Smart Contracts und Mitgliederabstimmungen verwaltet werden. OMEGA ist keine DAO.") },
  { term: l("Decentralized identity (DID)", "Dezentrale Identität (DID)"), domain: "infrastructure", definition: l("An identifier created and controlled by its owner rather than issued by a central registry; standardised by the W3C.", "Ein Identifikator, der von seinem Inhaber erzeugt und kontrolliert wird statt von einem zentralen Register; vom W3C standardisiert.") },
  { term: l("Delegated Swarm Voting", "Delegated Swarm Voting"), domain: "governance", definition: l("An OMEGA proposal: per-topic, fractional, revocable delegation to several delegates, with a cap on any delegate's weight.", "Ein OMEGA-Vorschlag: themenbezogene, anteilige, widerrufbare Delegation an mehrere Delegierte mit einer Obergrenze für das Gewicht jedes Delegierten.") },
  { term: l("Demand response", "Demand Response"), domain: "energy", definition: l("Shifting or reducing electricity use in response to price or grid signals.", "Verschieben oder Reduzieren des Stromverbrauchs als Reaktion auf Preis- oder Netzsignale.") },
  { term: l("Digital public infrastructure", "Digitale öffentliche Infrastruktur"), domain: "civilization", definition: l("Shared digital systems — such as identity, payments and data exchange — that serve the public like roads or utilities.", "Gemeinsame digitale Systeme – etwa Identität, Zahlungen und Datenaustausch –, die der Öffentlichkeit wie Straßen oder Versorgungsnetze dienen.") },
  { term: l("Distributed computing", "Verteiltes Rechnen"), domain: "infrastructure", definition: l("Computation spread across many networked machines that coordinate to act as one system.", "Berechnungen, die auf viele vernetzte Rechner verteilt sind, die sich koordinieren, um wie ein System zu wirken.") },
  { term: l("Distributed ledger", "Verteiltes Ledger"), domain: "infrastructure", definition: l("A database replicated across multiple participants who agree on its contents without a single administrator.", "Eine Datenbank, die bei mehreren Teilnehmern repliziert ist, die sich ohne zentralen Administrator auf ihren Inhalt einigen.") },
  { term: l("Liquid democracy", "Liquid Democracy"), domain: "governance", definition: l("A hybrid of direct and representative democracy in which each person can vote directly or delegate their vote, revocably, to someone else.", "Eine Mischung aus direkter und repräsentativer Demokratie, in der jede Person direkt abstimmen oder ihre Stimme widerrufbar an jemand anderen delegieren kann.") },
  { term: l("Microgrid", "Microgrid"), domain: "energy", definition: l("A local electricity network with its own generation and often storage, able to operate connected to or isolated from the main grid.", "Ein lokales Stromnetz mit eigener Erzeugung und oft Speicher, das verbunden oder getrennt vom Hauptnetz betrieben werden kann.") },
  { term: l("Multi-agent system", "Multi-Agenten-System"), domain: "intelligence", definition: l("A system of multiple interacting autonomous agents, which may cooperate, compete or negotiate.", "Ein System mehrerer interagierender autonomer Agenten, die kooperieren, konkurrieren oder verhandeln können.") },
  { term: l("Nakamoto coefficient", "Nakamoto-Koeffizient"), domain: "governance", definition: l("The smallest number of actors who together control more than half of a system's decision power. Higher is more decentralized.", "Die kleinste Zahl von Akteuren, die zusammen mehr als die Hälfte der Entscheidungsmacht kontrollieren. Höher bedeutet dezentraler.") },
  { term: l("Oracle", "Orakel"), domain: "infrastructure", definition: l("A service that brings external, real-world data onto a blockchain. Oracles reintroduce trust in whoever provides the data.", "Ein Dienst, der externe, reale Daten auf eine Blockchain bringt. Orakel führen Vertrauen in den Datenlieferanten wieder ein.") },
  { term: l("Polycentric governance", "Polyzentrische Governance"), domain: "governance", definition: l("A system with many overlapping, semi-autonomous centres of decision-making, as studied by Elinor and Vincent Ostrom.", "Ein System mit vielen sich überlappenden, teilautonomen Entscheidungszentren, wie von Elinor und Vincent Ostrom untersucht.") },
  { term: l("Proof-of-stake", "Proof-of-Stake"), domain: "infrastructure", definition: l("A consensus method where validators lock up tokens as collateral and can lose them for misbehaviour.", "Eine Konsensmethode, bei der Validatoren Tokens als Sicherheit hinterlegen und sie bei Fehlverhalten verlieren können.") },
  { term: l("Proof-of-work", "Proof-of-Work"), domain: "infrastructure", definition: l("A consensus method where participants compete to solve computational puzzles; secure but energy-intensive.", "Eine Konsensmethode, bei der Teilnehmer um die Lösung von Rechenaufgaben konkurrieren; sicher, aber energieintensiv.") },
  { term: l("Quadratic voting", "Quadratisches Abstimmen"), domain: "governance", definition: l("Voters receive credits; casting n votes on one issue costs n² credits, so people can express intensity of preference.", "Wähler erhalten Guthaben; n Stimmen für ein Thema kosten n² Guthaben, sodass die Stärke einer Präferenz ausgedrückt werden kann.") },
  { term: l("Quorum", "Quorum"), domain: "governance", definition: l("The minimum participation required for a decision to be valid.", "Die Mindestbeteiligung, damit eine Entscheidung gültig ist.") },
  { term: l("Smart contract", "Smart Contract"), domain: "infrastructure", definition: l("A program stored on a blockchain that executes automatically when its conditions are met. It cannot judge intent or context.", "Ein auf einer Blockchain gespeichertes Programm, das automatisch ausgeführt wird, wenn seine Bedingungen erfüllt sind. Es kann Absicht oder Kontext nicht beurteilen.") },
  { term: l("Smart grid", "Smart Grid"), domain: "energy", definition: l("An electricity network that uses sensors, communication and control to balance supply and demand more efficiently.", "Ein Stromnetz, das Sensorik, Kommunikation und Steuerung nutzt, um Angebot und Nachfrage effizienter auszugleichen.") },
  { term: l("Smart city", "Smart City"), domain: "civilization", definition: l("A city that uses digital technology and data to manage services. Raises questions of privacy, control and inclusion.", "Eine Stadt, die digitale Technologie und Daten zur Steuerung von Diensten nutzt. Wirft Fragen zu Privatsphäre, Kontrolle und Inklusion auf.") },
  { term: l("Subsidiarity", "Subsidiarität"), domain: "civilization", definition: l("The principle that decisions should be taken at the most local level competent to take them.", "Das Prinzip, Entscheidungen auf der lokalsten Ebene zu treffen, die dafür kompetent ist.") },
  { term: l("Swarm intelligence", "Schwarmintelligenz"), domain: "intelligence", definition: l("Collective behaviour that emerges from many simple agents following local rules, as in ant colonies or bird flocks.", "Kollektives Verhalten, das aus vielen einfachen Agenten mit lokalen Regeln entsteht, wie bei Ameisenkolonien oder Vogelschwärmen.") },
  { term: l("Sybil attack", "Sybil-Angriff"), domain: "governance", definition: l("An attack in which one actor creates many fake identities to gain disproportionate influence.", "Ein Angriff, bei dem ein Akteur viele falsche Identitäten erzeugt, um unverhältnismäßigen Einfluss zu gewinnen.") },
  { term: l("Virtual power plant", "Virtuelles Kraftwerk"), domain: "energy", definition: l("Many distributed generators, batteries and flexible loads aggregated and controlled as if they were one power plant.", "Viele dezentrale Erzeuger, Batterien und flexible Lasten, die gebündelt und wie ein Kraftwerk gesteuert werden.") },
  { term: l("Zero-knowledge proof", "Zero-Knowledge-Beweis"), domain: "infrastructure", definition: l("A cryptographic method to prove a statement is true without revealing why — for example, proving you are over 18 without revealing your birth date.", "Eine kryptografische Methode, um eine Aussage zu beweisen, ohne den Grund offenzulegen – etwa nachzuweisen, dass man über 18 ist, ohne das Geburtsdatum zu nennen.") },
];

export type FaqItem = { q: L; a: L };

export const faq: FaqItem[] = [
  {
    q: l("What is OMEGA?", "Was ist OMEGA?"),
    a: l(
      "OMEGA is an independent research vision. It investigates how decentralized governance, digital infrastructure, renewable energy, AI and institutions could interact to make human coordination more resilient and participatory.",
      "OMEGA ist eine unabhängige Forschungsvision. Sie untersucht, wie dezentrale Governance, digitale Infrastruktur, erneuerbare Energie, KI und Institutionen zusammenwirken könnten, um menschliche Koordination resilienter und partizipativer zu machen.",
    ),
  },
  {
    q: l("What is OMEGA not?", "Was ist OMEGA nicht?"),
    a: l(
      "OMEGA is not a company, a cryptocurrency, a token sale, an investment opportunity, a functioning DAO or a deployed network. There is nothing to buy and nothing to join financially.",
      "OMEGA ist kein Unternehmen, keine Kryptowährung, kein Token-Verkauf, keine Investitionsmöglichkeit, keine funktionierende DAO und kein betriebenes Netzwerk. Es gibt nichts zu kaufen und keine finanzielle Beteiligung.",
    ),
  },
  {
    q: l("What is its current status?", "Wie ist der aktuelle Stand?"),
    a: l(
      "OMEGA is at an early research stage: the question and framework are defined, a research library and educational simulations exist, and formal models are in progress. See the roadmap for what is completed, ongoing, planned or speculative.",
      "OMEGA befindet sich in einer frühen Forschungsphase: Frage und Rahmen sind definiert, eine Forschungsbibliothek und Lernsimulationen existieren, formale Modelle sind in Arbeit. Die Roadmap zeigt, was abgeschlossen, laufend, geplant oder spekulativ ist.",
    ),
  },
  {
    q: l("Does OMEGA claim decentralization solves institutional problems?", "Behauptet OMEGA, dass Dezentralisierung institutionelle Probleme löst?"),
    a: l(
      "No. Decentralization moves trust and power around; it can introduce new problems such as low participation, concentration of influence, fake identities and unclear accountability. OMEGA studies when it helps and when it does not.",
      "Nein. Dezentralisierung verschiebt Vertrauen und Macht; sie kann neue Probleme schaffen, etwa geringe Beteiligung, Machtkonzentration, falsche Identitäten und unklare Verantwortung. OMEGA untersucht, wann sie hilft und wann nicht.",
    ),
  },
  {
    q: l("Are the simulations real systems?", "Sind die Simulationen echte Systeme?"),
    a: l(
      "No. They are deterministic educational models with simplified, disclosed assumptions. They illustrate dynamics; they do not predict real outcomes.",
      "Nein. Es sind deterministische Lernmodelle mit vereinfachten, offengelegten Annahmen. Sie veranschaulichen Dynamiken; sie sagen keine realen Ergebnisse voraus.",
    ),
  },
  {
    q: l("How does OMEGA relate to existing institutions?", "Wie steht OMEGA zu bestehenden Institutionen?"),
    a: l(
      "OMEGA treats existing institutions — governments, courts, cooperatives, municipalities — as essential. It explores tools that could complement and strengthen them, not replace them. OMEGA has no partnerships with any institution.",
      "OMEGA betrachtet bestehende Institutionen – Regierungen, Gerichte, Genossenschaften, Kommunen – als unverzichtbar. Es erforscht Werkzeuge, die sie ergänzen und stärken könnten, nicht ersetzen. OMEGA hat keine Partnerschaften mit Institutionen.",
    ),
  },
  {
    q: l("Why Morocco and Africa?", "Warum Marokko und Afrika?"),
    a: l(
      "They are contexts of personal connection and of real questions about energy access, digital public infrastructure and local autonomy. They are places to learn from, not test beds.",
      "Es sind Kontexte persönlicher Verbundenheit und realer Fragen zu Energiezugang, digitaler öffentlicher Infrastruktur und lokaler Autonomie. Orte, von denen man lernen kann – keine Testfelder.",
    ),
  },
  {
    q: l("What are OMEGA's main limitations?", "Was sind OMEGAs wichtigste Grenzen?"),
    a: l(
      "It is the work of one independent learner, not an institution. Its proposals are untested, its models are simplified, and many of its long-term ideas depend on technical, legal and social unknowns.",
      "Es ist die Arbeit eines unabhängig Lernenden, keiner Institution. Die Vorschläge sind ungetestet, die Modelle vereinfacht, und viele langfristige Ideen hängen von technischen, rechtlichen und sozialen Unbekannten ab.",
    ),
  },
];
