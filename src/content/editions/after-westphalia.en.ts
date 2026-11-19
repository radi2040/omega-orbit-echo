import type { ArticleEdition } from "@/content/articles";

export const afterWestphaliaEnglish: ArticleEdition = {
  language: "en",
  title: "After Westphalia: The Future of Political Organization",
  subtitle: "Territorial sovereignty and the institutional possibilities of a networked age",
  abstract:
    "This essay asks: if the nation-state is no longer the only plausible model of political organization, what institutional models could emerge, and under what conditions could they become legitimate, accountable, and durable? It reconstructs the Westphalian settlement as a historical arrangement rather than a natural order, separates sovereignty, jurisdiction and legitimacy, and tests three families of alternatives against the same criteria: polycentric governance, network-based communities and on-chain coordination. The argument is that the central problem is not whether alternatives can be designed, but whether they can carry the costs that the state currently absorbs: enforcement, minority protection, exit without coercion, and accountability to people who did not choose them.",
  sections: [
    {
      id: "question",
      heading: "1. The question",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "evidence",
          text: "The territorial state is so familiar that its arrangement can look like a feature of nature: a bounded territory, a population that is assigned to it, a government that claims a monopoly on legitimate force within that boundary, and a set of external relations with other states of equal formal standing. Historians and political theorists have long shown that this configuration is contingent. It was assembled over centuries from dynastic, religious, commercial and military pressures, and it has never been the only arrangement in use.",
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "The question this essay addresses is therefore not whether the state will disappear, but a narrower and more useful one: if the territorial state is no longer the only plausible way to organize political life, what institutional models could emerge, and under what conditions could they be legitimate, accountable, sustainable and resilient? Each term carries weight. Legitimacy concerns why people should accept a rule. Accountability concerns who can correct it. Sustainability concerns whether it can pay for itself. Resilience concerns whether it survives shocks and capture.",
        },
        {
          type: "paragraph",
          claimType: "opinion",
          text: "My view is that the debate about post-Westphalian models is most productive when it is treated as a question about institutional costs rather than about ideology. Every political order must solve a small set of problems: deciding who is inside, resolving disputes, enforcing rules, protecting people who are outvoted, and letting members leave. The territorial state solves these problems badly in some respects and well in others. Proposals for alternatives should be judged by whether they solve the same problems at comparable or lower cost, and by who bears the cost when they fail.",
        },
      ],
    },
    {
      id: "westphalia",
      heading: "2. The Westphalian settlement as history",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "evidence",
          text: "The Peace of Westphalia, concluded in 1648, is usually presented as the origin of modern sovereignty. Stephen Krasner's influential analysis argues that the idea of Westphalian sovereignty is better understood as a recurring pattern of \"organized hypocrisy\": states have consistently claimed the principles of territorial autonomy and non-intervention while openly violating them when it suited powerful actors, and the principles nonetheless shaped how claims were made and recognized.",
          citations: ["krasner1999"],
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "This reading matters for the present debate because it shows that sovereignty was never a single, stable property. It was a bundle of claims: to territory, to the authority to make rules, to recognition by other states, and to the loyalty of a population. These claims were rarely held together in the same hands for long. Feudal overlaps, religious jurisdictions, free cities and chartered companies coexisted with territorial states for centuries. The modern system is the outcome of a long process of consolidation, not the restoration of a previous natural condition.",
        },
        {
          type: "list",
          items: [
            "Sovereignty is a set of claims, not a single attribute of a state.",
            "Territorial exclusivity was a relatively late and uneven development.",
            "Recognition by other states has always been part of what makes a claim effective.",
            "Overlapping jurisdictions were the norm for much of European history, not an anomaly.",
          ],
          citations: ["krasner1999"],
        },
      ],
    },
    {
      id: "concepts",
      heading: "3. Sovereignty, jurisdiction and legitimacy",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "Three concepts are routinely conflated in public debate and need to be kept apart. Sovereignty is the claim to be the final authority over a set of decisions. Jurisdiction is the scope within which a particular rule applies, which may be territorial, personal, functional or contractual. Legitimacy is the reason people give for accepting a rule, whether because they consented to it, because it serves their interests, or because it follows procedures they regard as fair. A political order can have one of these without the others. A city can have jurisdiction without sovereignty; a club can have legitimacy without jurisdiction over anyone outside it.",
        },
        {
          type: "paragraph",
          claimType: "evidence",
          text: "Elinor Ostrom's work on common-pool resources is the most rigorous empirical treatment of the problem of governing overlapping authority. Her central finding was that many communities managed shared resources for long periods through nested, locally adapted rules, monitoring and graduated sanctions, rather than through either central state control or unregulated private property. She described these arrangements as polycentric: many centers of decision making that operate at different scales and are constrained by one another.",
          citations: ["ostrom1990"],
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "Ostrom's work does not show that polycentric systems are always superior. Its contribution is more specific. It shows that governing shared resources depends on credible commitment, monitoring, conflict resolution and a process for changing the rules, and that these features can exist without a single sovereign at the top. This is the most useful lens for evaluating post-territorial proposals: the question is whether the features that made the community work can be reproduced at the scale and with the membership the proposal assumes.",
          citations: ["ostrom1990"],
        },
      ],
    },
    {
      id: "alternatives",
      heading: "4. Three families of alternatives",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "evidence",
          text: "Contemporary proposals for post-territorial political organization fall into at least three families. Polycentric governance keeps the existing state but distributes decision making across overlapping jurisdictions, as in special districts, federal arrangements and co-management of commons. Network-based communities organize people who share an affiliation rather than a territory, and may offer services or voluntary membership in addition to, or instead of, territorial citizenship. On-chain coordination uses cryptographic protocols and smart contracts to record commitments, allocate resources and make collective decisions, often through decentralized autonomous organizations (DAOs).",
        },
        {
          type: "table",
          caption: "Comparison of institutional families against the same criteria",
          headers: ["Criterion", "Territorial state", "Polycentric governance", "Network-based community", "On-chain coordination"],
          rows: [
            { cells: ["Membership basis", "Birth, residence, naturalization", "Residence and functional stake", "Voluntary affiliation", "Token or account holding"] },
            { cells: ["Enforcement", "Monopoly of force", "Shared, nested sanctions", "Contractual and reputational", "Code and off-chain courts"] },
            { cells: ["Minority protection", "Constitutional and judicial", "Depends on nesting rules", "Depends on exit rights", "Depends on voting design"] },
            { cells: ["Exit cost", "High", "Moderate", "Low", "Low to moderate"] },
            { cells: ["Accountability to non-members", "Through elections and courts", "Through overlapping authorities", "Weak", "Weak"] },
          ],
          notes: "Entries are analytical categories drawn from the literature cited in this essay, not measured quantities.",
          limitations: "The table simplifies each family. Real institutions combine them, and the cells describe design tendencies, not guarantees.",
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "The table is intended to show where the costs fall. Low exit costs are attractive to members who want to leave, but they weaken the incentives that make long-term commitments credible. Voluntary membership reduces the burden of consent, but it leaves people who never joined, including those affected by a network's actions, without a voice. On-chain systems make rules transparent and hard to change silently, but the transparency applies to the code, not to the social consequences of the code.",
        },
      ],
    },
    {
      id: "network-state",
      heading: "5. The network state thesis, critically read",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "evidence",
          text: "The phrase \"network state\" has been popularized by advocates who argue that internet-native communities, financed and coordinated through cryptographic tools, could eventually acquire territory, recognition and the functions of a state. Jarrad Hope and Peter Ludlow's book Farewell to Westphalia is one of the more prominent statements of this view. I have not yet verified the bibliographic details of that book for this edition, so I cite it only by name here and will add a full entry once the publication record has been checked against the publisher.",
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "A fair reading of the network state thesis has to take its strongest form seriously. Its proponents identify real limitations of territorial governance: slow reform, capture by entrenched interests, and high costs of moving between jurisdictions. They also point to the historical fact that the territorial state was once a contested innovation. The thesis is weakest where it moves from describing a possibility to asserting a sequence of inevitable steps, and where it treats the absence of a territorial monopoly on force as a solved problem rather than as one of the central unsolved problems.",
        },
        {
          type: "paragraph",
          claimType: "opinion",
          text: "My assessment is that the network state thesis is most useful as a stress test. It forces the question of what a community must provide, and who will pay for it, if it is no longer financed by taxation within a bounded territory. It is less convincing as a forecast, because it does not yet explain how a voluntary community would enforce obligations against people who never agreed to them, or how it would protect members who lose the internal argument.",
        },
      ],
    },
    {
      id: "constraints",
      heading: "6. Constraints that any alternative must meet",
      level: 2,
      blocks: [
        {
          type: "list",
          items: [
            "Enforcement: rules need a credible way to be applied to people who do not comply, without reproducing coercion that is unaccountable.",
            "Minority protection: decisions taken by majorities or large token holders must not remove basic rights from those who are outvoted.",
            "Exit: leaving must be possible without losing essential services, property or identity, or else membership is not voluntary in any meaningful sense.",
            "Externalities: actions by members often affect non-members, who need a way to contest them.",
            "Capture: concentrated wealth, expertise or technical control can quietly become concentrated political power.",
            "Security and identity: any system that assigns membership must decide how identity is verified, and what happens when verification fails.",
          ],
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "These constraints are not reasons to reject alternatives. They are the specification an alternative has to meet. The territorial state meets several of them imperfectly, through courts, elections, constitutional limits and the threat of force. A proposal that does not explain how it meets the same constraints is describing a different system, not a better version of the state.",
        },
      ],
    },
    {
      id: "counterarguments",
      heading: "7. Counterarguments",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "The strongest objection to post-territorial models is that they reintroduce the problems they claim to solve. Voluntary communities tend to sort members by wealth and shared outlook, which can reduce pluralism. Exit rights can be hollowed out when leaving means losing a home, a job or a legal identity. Polycentric systems can produce regulatory races to the bottom when jurisdictions compete for mobile capital. These objections do not show that alternatives cannot work. They show that the burden of proof lies with those who propose them.",
        },
        {
          type: "paragraph",
          claimType: "interpretation",
          text: "A second objection is that the territorial state is not as fixed as its critics assume. Federal systems, supranational bodies, city networks and public-private regulatory regimes already share functions that were once exclusive to the state. On this view, the present is already post-Westphalian in part, and the useful question is how to govern hybrid arrangements that are already in place.",
        },
      ],
    },
    {
      id: "limitations",
      heading: "8. Limitations and open questions",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "evidence",
          text: "This essay is a conceptual analysis. It does not report new empirical data, and the comparison in section 4 is an analytical summary rather than a measured one. Several claims about specific projects, including those on blockchain governance, depend on sources that are changing quickly and that I have not yet reviewed in full. The German edition, and a revised bibliography, should be published only after those checks are complete.",
        },
        {
          type: "paragraph",
          claimType: "opinion",
          text: "The open question I consider most important is about enforcement without territory. Most proposals assume that a community can rely on exit, reputation or code to make its rules binding. Those mechanisms work for some obligations and fail for others, especially those involving harm to non-members. Until that gap is addressed, post-Westphalian alternatives remain incomplete as political theories, however attractive they may be as tools.",
        },
      ],
    },
    {
      id: "conclusion",
      heading: "9. Conclusion",
      level: 2,
      blocks: [
        {
          type: "paragraph",
          claimType: "opinion",
          text: "The Westphalian settlement is a historical achievement with real strengths and real failures. Its successor, if there is one, will not be chosen by its appeal alone. It will be chosen, or will emerge, according to whether it can carry the costs that the territorial state now carries: enforcing rules fairly, protecting those who are outvoted, allowing real exit, and remaining answerable to people it affects but did not admit. The most useful contribution of current debates is to make those costs visible.",
        },
      ],
    },
  ],
};

export const afterWestphaliaReferences = [
  {
    id: "krasner1999",
    kind: "book" as const,
    authors: ["Stephen D. Krasner"],
    title: "Sovereignty: Organized Hypocrisy",
    publisher: "Princeton University Press",
    year: 1999,
  },
  {
    id: "ostrom1990",
    kind: "book" as const,
    authors: ["Elinor Ostrom"],
    title: "Governing the Commons: The Evolution of Institutions for Collective Action",
    publisher: "Cambridge University Press",
    year: 1990,
    doi: "10.1017/CBO9780511807763",
  },
];
