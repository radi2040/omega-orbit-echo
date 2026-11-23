import { research } from "@/content/research";

/** A real, identifiable work cited by the OMEGA research section. Never add invented entries. */
export type Reference = {
  id: string;
  authors: string;
  year: number;
  title: string;
  venue: string;
  kind: "book" | "article" | "conference" | "report" | "standard" | "treaty" | "preprint" | "project";
  doi?: string;
  url?: string;
};

/**
 * References added for the research section. Each was checked against Crossref,
 * the publisher, or the issuing body's own page before inclusion.
 */
export const rdReferences: Reference[] = [
  // Swarm & collective intelligence
  { id: "bonabeau-1996", authors: "Eric Bonabeau, Guy Theraulaz, Jean-Louis Deneubourg", year: 1996, title: "Quantitative study of the fixed threshold model for the regulation of division of labour in insect societies", venue: "Proceedings of the Royal Society B 263", kind: "article", doi: "10.1098/rspb.1996.0229" },
  { id: "bonabeau-dorigo-theraulaz-1999", authors: "Eric Bonabeau, Marco Dorigo, Guy Theraulaz", year: 1999, title: "Swarm Intelligence: From Natural to Artificial Systems", venue: "Oxford University Press", kind: "book" },
  { id: "dorigo-1996", authors: "Marco Dorigo, Vittorio Maniezzo, Alberto Colorni", year: 1996, title: "Ant system: optimization by a colony of cooperating agents", venue: "IEEE Transactions on Systems, Man, and Cybernetics, Part B 26(1)", kind: "article" },
  { id: "kennedy-eberhart-1995", authors: "James Kennedy, Russell Eberhart", year: 1995, title: "Particle swarm optimization", venue: "Proceedings of ICNN'95 — International Conference on Neural Networks", kind: "conference", doi: "10.1109/ICNN.1995.488968" },
  { id: "reynolds-1987", authors: "Craig W. Reynolds", year: 1987, title: "Flocks, herds and schools: A distributed behavioral model", venue: "SIGGRAPH '87, Computer Graphics 21(4)", kind: "conference" },
  { id: "seeley-2010", authors: "Thomas D. Seeley", year: 2010, title: "Honeybee Democracy", venue: "Princeton University Press", kind: "book" },
  { id: "surowiecki-2004", authors: "James Surowiecki", year: 2004, title: "The Wisdom of Crowds", venue: "Doubleday", kind: "book" },
  { id: "malone-2018", authors: "Thomas W. Malone", year: 2018, title: "Superminds: The Surprising Power of People and Computers Thinking Together", venue: "Little, Brown and Company", kind: "book" },
  { id: "rubenstein-2014", authors: "Michael Rubenstein, Alejandro Cornejo, Radhika Nagpal", year: 2014, title: "Programmable self-assembly in a thousand-robot swarm", venue: "Science 345(6198)", kind: "article", doi: "10.1126/science.1254295" },
  // Distributed computing
  { id: "stoica-2001", authors: "Ion Stoica, Robert Morris, David Karger, M. Frans Kaashoek, Hari Balakrishnan", year: 2001, title: "Chord: A scalable peer-to-peer lookup service for internet applications", venue: "ACM SIGCOMM 2001", kind: "conference", doi: "10.1145/383059.383071" },
  { id: "maymounkov-2002", authors: "Petar Maymounkov, David Mazières", year: 2002, title: "Kademlia: A Peer-to-Peer Information System Based on the XOR Metric", venue: "IPTPS 2002, Lecture Notes in Computer Science 2429", kind: "conference", doi: "10.1007/3-540-45748-8_5" },
  { id: "dean-ghemawat-2004", authors: "Jeffrey Dean, Sanjay Ghemawat", year: 2004, title: "MapReduce: Simplified Data Processing on Large Clusters", venue: "OSDI 2004 (reprinted in Communications of the ACM 51(1), 2008)", kind: "conference", doi: "10.1145/1327452.1327492" },
  { id: "anderson-2004", authors: "David P. Anderson", year: 2004, title: "BOINC: A System for Public-Resource Computing and Storage", venue: "Fifth IEEE/ACM International Workshop on Grid Computing", kind: "conference", doi: "10.1109/GRID.2004.14" },
  { id: "shi-2016", authors: "Weisong Shi, Jie Cao, Quan Zhang, Youhuizi Li, Lanyu Xu", year: 2016, title: "Edge Computing: Vision and Challenges", venue: "IEEE Internet of Things Journal 3(5)", kind: "article" },
  { id: "mcmahan-2017", authors: "H. Brendan McMahan, Eider Moore, Daniel Ramage, Seth Hampson, Blaise Agüera y Arcas", year: 2017, title: "Communication-Efficient Learning of Deep Networks from Decentralized Data", venue: "AISTATS 2017", kind: "conference", url: "https://arxiv.org/abs/1602.05629" },
  // Trust, reputation, cryptography, security
  { id: "resnick-2000", authors: "Paul Resnick, Ko Kuwabara, Richard Zeckhauser, Eric Friedman", year: 2000, title: "Reputation systems", venue: "Communications of the ACM 43(12)", kind: "article", doi: "10.1145/355112.355122" },
  { id: "kamvar-2003", authors: "Sepandar D. Kamvar, Mario T. Schlosser, Hector Garcia-Molina", year: 2003, title: "The EigenTrust algorithm for reputation management in P2P networks", venue: "WWW 2003", kind: "conference", doi: "10.1145/775152.775242" },
  { id: "diffie-hellman-1976", authors: "Whitfield Diffie, Martin E. Hellman", year: 1976, title: "New Directions in Cryptography", venue: "IEEE Transactions on Information Theory 22(6)", kind: "article" },
  { id: "chaum-1985", authors: "David Chaum", year: 1985, title: "Security without identification: transaction systems to make big brother obsolete", venue: "Communications of the ACM 28(10)", kind: "article", doi: "10.1145/4372.4373" },
  { id: "saltzer-schroeder-1975", authors: "Jerome H. Saltzer, Michael D. Schroeder", year: 1975, title: "The Protection of Information in Computer Systems", venue: "Proceedings of the IEEE 63(9)", kind: "article" },
  { id: "w3c-vc-2025", authors: "W3C", year: 2025, title: "Verifiable Credentials Data Model v2.0", venue: "W3C Recommendation, 15 May 2025", kind: "standard", url: "https://www.w3.org/TR/vc-data-model-2.0/" },
  { id: "nist-csf-2024", authors: "National Institute of Standards and Technology (NIST)", year: 2024, title: "The NIST Cybersecurity Framework (CSF) 2.0", venue: "NIST CSWP 29", kind: "standard", url: "https://www.nist.gov/cyberframework" },
  // Collaboration & commons
  { id: "benkler-2006", authors: "Yochai Benkler", year: 2006, title: "The Wealth of Networks: How Social Production Transforms Markets and Freedom", venue: "Yale University Press", kind: "book" },
  { id: "raymond-1999", authors: "Eric S. Raymond", year: 1999, title: "The Cathedral and the Bazaar", venue: "O'Reilly Media", kind: "book" },
  { id: "kittur-kraut-2008", authors: "Aniket Kittur, Robert E. Kraut", year: 2008, title: "Harnessing the wisdom of crowds in Wikipedia: quality through coordination", venue: "CSCW 2008", kind: "conference", doi: "10.1145/1460563.1460572" },
  { id: "haklay-weber-2008", authors: "Mordechai Haklay, Patrick Weber", year: 2008, title: "OpenStreetMap: User-Generated Street Maps", venue: "IEEE Pervasive Computing 7(4)", kind: "article", doi: "10.1109/MPRV.2008.80" },
  { id: "hardin-1968", authors: "Garrett Hardin", year: 1968, title: "The Tragedy of the Commons", venue: "Science 162(3859)", kind: "article" },
  { id: "hayek-1945", authors: "Friedrich A. Hayek", year: 1945, title: "The Use of Knowledge in Society", venue: "American Economic Review 35(4)", kind: "article" },
  // AI, agents, human-machine
  { id: "park-2023", authors: "Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein", year: 2023, title: "Generative Agents: Interactive Simulacra of Human Behavior", venue: "UIST 2023", kind: "conference", url: "https://arxiv.org/abs/2304.03442" },
  { id: "licklider-1960", authors: "J. C. R. Licklider", year: 1960, title: "Man-Computer Symbiosis", venue: "IRE Transactions on Human Factors in Electronics HFE-1", kind: "article" },
  { id: "engelbart-1962", authors: "Douglas C. Engelbart", year: 1962, title: "Augmenting Human Intellect: A Conceptual Framework", venue: "SRI Summary Report AFOSR-3223", kind: "report" },
  { id: "brooks-1986", authors: "Rodney A. Brooks", year: 1986, title: "A robust layered control system for a mobile robot", venue: "IEEE Journal on Robotics and Automation 2(1)", kind: "article" },
  // Network states, citizenship, law, space
  { id: "srinivasan-2022", authors: "Balaji Srinivasan", year: 2022, title: "The Network State: How To Start a New Country", venue: "Self-published", kind: "book", url: "https://thenetworkstate.com/" },
  { id: "hope-ludlow-2025", authors: "Jarrad Hope, Peter Ludlow", year: 2025, title: "Farewell to Westphalia: Crypto Sovereignty and Post-Nation-State Governance", venue: "Logos Press Engine", kind: "book", url: "https://logos.co/farewell-to-westphalia" },
  { id: "bell-2017", authors: "Tom W. Bell", year: 2017, title: "Your Next Government? From the Nation State to Stateless Nations", venue: "Cambridge University Press", kind: "book" },
  { id: "baubock-2018", authors: "Rainer Bauböck (ed.)", year: 2018, title: "Debating Transformations of National Citizenship", venue: "IMISCOE Research Series, Springer", kind: "book", doi: "10.1007/978-3-319-92719-0" },
  { id: "lessig-1999", authors: "Lawrence Lessig", year: 1999, title: "Code and Other Laws of Cyberspace", venue: "Basic Books", kind: "book" },
  { id: "e-residency", authors: "Republic of Estonia", year: 2014, title: "e-Residency programme", venue: "Government of Estonia", kind: "project", url: "https://www.e-resident.gov.ee/" },
  { id: "outer-space-treaty-1967", authors: "United Nations", year: 1967, title: "Treaty on Principles Governing the Activities of States in the Exploration and Use of Outer Space, including the Moon and Other Celestial Bodies", venue: "United Nations Office for Outer Space Affairs", kind: "treaty", url: "https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/outerspacetreaty.html" },
  { id: "artemis-accords-2020", authors: "NASA and signatory nations", year: 2020, title: "The Artemis Accords", venue: "NASA", kind: "treaty", url: "https://www.nasa.gov/artemis-accords/" },
  // Energy
  { id: "iea-energy-ai-2025", authors: "International Energy Agency (IEA)", year: 2025, title: "Energy and AI", venue: "IEA special report", kind: "report", url: "https://www.iea.org/reports/energy-and-ai" },
  { id: "folding-at-home", authors: "Folding@home consortium", year: 2000, title: "Folding@home distributed computing project", venue: "foldingathome.org", kind: "project", url: "https://foldingathome.org/" },
];

const existing: Reference[] = research.map((r) => ({
  id: r.id,
  authors: r.authors,
  year: r.year,
  title: r.title,
  venue: r.source,
  kind: "article",
  ...(r.url ? { url: r.url } : {}),
}));

export const allReferences: Reference[] = [...existing, ...rdReferences];
const byId = new Map(allReferences.map((r) => [r.id, r]));

export function getReference(id: string): Reference | undefined {
  return byId.get(id);
}
