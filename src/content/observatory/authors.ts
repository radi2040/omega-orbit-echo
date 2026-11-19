import { l } from "@/lib/i18n";
import type { Author } from "./types";

/**
 * Researcher profiles. Biographies contain only publicly verifiable facts and name their source.
 * No profile implies that the person endorses, collaborates with or contributes to OMEGA.
 * Photographs are not shown unless their licence is verified; monograms are used instead.
 */
export const authors: Author[] = [
  {
    id: "jarrad-hope",
    name: "Jarrad Hope",
    bio: l(
      "Co-founder of Logos. According to the publisher's author page, he came to Bitcoin in 2011, was an early contributor to Ethereum and worked on the peer-to-peer private messaging app Status before co-founding Logos. Co-author of Farewell to Westphalia (2025).",
      "Mitgründer von Logos. Laut der Autorenseite des Verlags kam er 2011 zu Bitcoin, war ein früher Mitwirkender an Ethereum und arbeitete an der Peer-to-Peer-Messaging-App Status, bevor er Logos mitgründete. Mitautor von Farewell to Westphalia (2025).",
    ),
    bioSource: { label: "logos.co — Farewell to Westphalia", url: "https://logos.co/farewell-to-westphalia" },
    affiliation: l("Logos (co-founder)", "Logos (Mitgründer)"),
    links: [{ kind: "publisher", label: "Author page — Logos", url: "https://logos.co/farewell-to-westphalia" }],
  },
  {
    id: "peter-ludlow",
    name: "Peter Ludlow",
    bio: l(
      "Philosopher working on language, mind and digital technologies. According to the publisher's author page, his books include Living Words; he edited the anthology Crypto Anarchy, Cyberstates, and Pirate Utopias (MIT Press, 2001) and co-authored Farewell to Westphalia (2025).",
      "Philosoph mit Schwerpunkt Sprache, Geist und digitale Technologien. Laut der Autorenseite des Verlags gehört Living Words zu seinen Büchern; er gab die Anthologie Crypto Anarchy, Cyberstates, and Pirate Utopias (MIT Press, 2001) heraus und ist Mitautor von Farewell to Westphalia (2025).",
    ),
    bioSource: { label: "logos.co — Farewell to Westphalia", url: "https://logos.co/farewell-to-westphalia" },
    links: [{ kind: "publisher", label: "Author page — Logos", url: "https://logos.co/farewell-to-westphalia" }],
  },
  {
    id: "balaji-srinivasan",
    name: "Balaji Srinivasan",
    bio: l(
      "Technologist and investor; author of The Network State (2022). He was previously Chief Technology Officer of Coinbase and a general partner at Andreessen Horowitz, and co-founded the genetics company Counsyl.",
      "Technologe und Investor; Autor von The Network State (2022). Zuvor war er Chief Technology Officer von Coinbase und General Partner bei Andreessen Horowitz und Mitgründer des Genetikunternehmens Counsyl.",
    ),
    bioSource: { label: "Publicly reported career; thenetworkstate.com", url: "https://thenetworkstate.com/" },
    xHandle: "balajis",
    links: [
      { kind: "website", label: "thenetworkstate.com", url: "https://thenetworkstate.com/" },
      { kind: "x", label: "@balajis", url: "https://x.com/balajis" },
    ],
  },
  {
    id: "vitalik-buterin",
    name: "Vitalik Buterin",
    bio: l(
      "Co-founder of Ethereum and author of its 2014 white paper. Writes long-form essays on mechanism design, governance and network states on his personal blog.",
      "Mitgründer von Ethereum und Autor des Whitepapers von 2014. Schreibt auf seinem Blog ausführliche Essays über Mechanismendesign, Governance und Netzwerkstaaten.",
    ),
    bioSource: { label: "vitalik.eth.limo", url: "https://vitalik.eth.limo/" },
    xHandle: "VitalikButerin",
    links: [
      { kind: "website", label: "vitalik.eth.limo", url: "https://vitalik.eth.limo/" },
      { kind: "x", label: "@VitalikButerin", url: "https://x.com/VitalikButerin" },
      { kind: "github", label: "github.com/vbuterin", url: "https://github.com/vbuterin" },
    ],
  },
  {
    id: "glen-weyl",
    name: "E. Glen Weyl",
    bio: l(
      "Economist. Co-author, with Eric Posner, of Radical Markets (Princeton University Press, 2018), founder of the RadicalxChange Foundation, and co-author with Audrey Tang of Plurality (2024).",
      "Ökonom. Mitautor (mit Eric Posner) von Radical Markets (Princeton University Press, 2018), Gründer der RadicalxChange Foundation und Mitautor (mit Audrey Tang) von Plurality (2024).",
    ),
    bioSource: { label: "radicalxchange.org; plurality.net", url: "https://www.plurality.net/" },
    xHandle: "glenweyl",
    links: [
      { kind: "website", label: "RadicalxChange", url: "https://www.radicalxchange.org/" },
      { kind: "x", label: "@glenweyl", url: "https://x.com/glenweyl" },
    ],
  },
  {
    id: "audrey-tang",
    name: "Audrey Tang",
    bio: l(
      "Taiwan's first Minister of Digital Affairs (2022–2024). Co-author of Plurality: The Future of Collaborative Technology and Democracy (2024).",
      "Erste Digitalministerin Taiwans (2022–2024). Mitautorin von Plurality: The Future of Collaborative Technology and Democracy (2024).",
    ),
    bioSource: { label: "plurality.net", url: "https://www.plurality.net/" },
    links: [{ kind: "website", label: "plurality.net", url: "https://www.plurality.net/" }],
  },
  {
    id: "elinor-ostrom",
    name: "Elinor Ostrom",
    lifespan: "1933–2012",
    bio: l(
      "Political economist at Indiana University, where she and Vincent Ostrom founded the Workshop in Political Theory and Policy Analysis. She shared the 2009 Nobel Memorial Prize in Economic Sciences with Oliver Williamson for her analysis of economic governance, especially the commons.",
      "Politökonomin an der Indiana University, wo sie mit Vincent Ostrom den Workshop in Political Theory and Policy Analysis gründete. 2009 erhielt sie gemeinsam mit Oliver Williamson den Wirtschaftsnobelpreis für ihre Analyse ökonomischer Governance, insbesondere der Gemeingüter.",
    ),
    bioSource: { label: "Ostrom Workshop, Indiana University", url: "https://ostromworkshop.indiana.edu/" },
    affiliation: l("Indiana University (Ostrom Workshop)", "Indiana University (Ostrom Workshop)"),
    links: [{ kind: "website", label: "Ostrom Workshop", url: "https://ostromworkshop.indiana.edu/" }],
  },
  {
    id: "tom-w-bell",
    name: "Tom W. Bell",
    bio: l(
      "Legal scholar at Chapman University's Fowler School of Law. Author of Your Next Government? From the Nation State to Stateless Nations (Cambridge University Press, 2017).",
      "Rechtswissenschaftler an der Fowler School of Law der Chapman University. Autor von Your Next Government? From the Nation State to Stateless Nations (Cambridge University Press, 2017).",
    ),
    bioSource: { label: "Cambridge University Press", url: "https://doi.org/10.1017/9781316676387" },
    affiliation: l("Chapman University, Fowler School of Law", "Chapman University, Fowler School of Law"),
    links: [{ kind: "publisher", label: "Book — Cambridge University Press", url: "https://doi.org/10.1017/9781316676387" }],
  },
  {
    id: "amine-radi",
    name: "Amine Radi",
    isOmegaFounder: true,
    bio: l(
      "Founder of OMEGA. Coming from culinary vocational training and transitioning into IT in Germany, self-studying Linux, networking, Python, blockchain and Web3. His essays are shown here as the founder's own contributions, not as external validation.",
      "Gründer von OMEGA. Kommt aus einer Ausbildung in der Gastronomie, wechselt in Deutschland in die IT und bildet sich selbst in Linux, Netzwerken, Python, Blockchain und Web3 weiter. Seine Essays erscheinen hier als eigene Beiträge des Gründers, nicht als externe Bestätigung.",
    ),
    bioSource: { label: "OMEGA founder page" },
    xHandle: "amineradi0",
    links: [{ kind: "x", label: "@amineradi0", url: "https://x.com/amineradi0" }],
  },
];

export const authorById = (id: string) => authors.find((a) => a.id === id);
