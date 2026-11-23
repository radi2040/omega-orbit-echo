import { langFromPath, type Lang } from "@/lib/i18n";
import { getDomainBySlug } from "./domains";
import { getEntryBySlug } from "./entries";

/** Public origin used for canonical and hreflang links. */
export const SITE_URL = "https://amineradi.de";

export const rdBase: Record<Lang, string> = { en: "/en/research", de: "/de/forschung" };

/** Localised path segments of the research section. */
export const rdSegments = {
  domains: { en: "domains", de: "bereiche" },
  library: { en: "library", de: "bibliothek" },
  initiative: { en: "swarm-infrastructure", de: "schwarm-infrastruktur" },
  architecture: { en: "architecture", de: "architektur" },
} as const;

type SegmentKey = keyof typeof rdSegments;

/**
 * The same page in the other language, or undefined when the path is not part of the
 * bilingual research section (or names an unknown item).
 */
export function alternatePath(pathname: string, target: Lang): string | undefined {
  const from = langFromPath(pathname);
  if (!from) return undefined;
  const rest = pathname.slice(rdBase[from].length).replace(/^\/+|\/+$/g, "");
  if (!pathname.startsWith(rdBase[from])) return undefined;
  if (!rest) return rdBase[target];
  const [seg, slug, ...extra] = rest.split("/");
  if (extra.length) return undefined;
  const key = (Object.keys(rdSegments) as SegmentKey[]).find((k) => rdSegments[k][from] === seg);
  if (!key) return undefined;
  const head = `${rdBase[target]}/${rdSegments[key][target]}`;
  if (!slug) return key === "domains" ? undefined : head;
  if (key === "domains") {
    const d = getDomainBySlug(from, slug);
    return d ? `${head}/${d.slug[target]}` : undefined;
  }
  if (key === "library") {
    const e = getEntryBySlug(from, slug);
    return e ? `${head}/${e.slug[target]}` : undefined;
  }
  return undefined;
}

/** head() links: canonical plus hreflang alternates for a research page. */
export function rdHeadLinks(enPath: string, dePath: string, current: Lang) {
  return [
    { rel: "canonical", href: `${SITE_URL}${current === "en" ? enPath : dePath}` },
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${enPath}` },
    { rel: "alternate", hrefLang: "de", href: `${SITE_URL}${dePath}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${enPath}` },
  ];
}
