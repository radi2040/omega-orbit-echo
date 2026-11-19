import { l, type L } from "@/lib/i18n";

export type NavItem = {
  to:
    | "/"
    | "/vision"
    | "/architecture"
    | "/lab"
    | "/research"
    | "/wissen"
    | "/wissen/bibliothek"
    | "/roadmap"
    | "/founder"
    | "/glossary";
  label: L;
};

export const navigation: NavItem[] = [
  { to: "/", label: l("Home", "Start") },
  { to: "/vision", label: l("Vision", "Vision") },
  { to: "/architecture", label: l("Architecture", "Architektur") },
  { to: "/lab", label: l("Interactive Lab", "Labor") },
  { to: "/research", label: l("Research", "Forschung") },
  { to: "/wissen", label: l("WISSEN & IDEEN", "WISSEN & IDEEN") },
  { to: "/roadmap", label: l("Roadmap", "Roadmap") },
  { to: "/founder", label: l("Founder", "Gründer") },
  { to: "/glossary", label: l("Glossary / FAQ", "Glossar / FAQ") },
];

export const ui = {
  brandSub: l("research / vision", "forschung / vision"),
  openMenu: l("Open menu", "Menü öffnen"),
  closeMenu: l("Close menu", "Menü schließen"),
  mainNav: l("Main navigation", "Hauptnavigation"),
  language: l("Language", "Sprache"),
  skip: l("Skip to content", "Zum Inhalt springen"),
  footerNote: l(
    "OMEGA is a conceptual research initiative. It is not a company, a token, a DAO or a deployed network.",
    "OMEGA ist eine konzeptionelle Forschungsinitiative. Es ist kein Unternehmen, kein Token, keine DAO und kein betriebenes Netzwerk.",
  ),
  backToTop: l("Back to top", "Nach oben"),
  explore: l("Explore", "Erkunden"),
  readMore: l("Read more", "Weiterlesen"),
};
