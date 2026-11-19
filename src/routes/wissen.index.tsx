import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/wissen/ArticleCard";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { Badge } from "@/components/ui/badge";
import {
  researchProjects,
  themeDescriptions,
  themeLabels,
  type ArticleTheme,
} from "@/content/articles";
import { l, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wissen/")({
  head: () => ({
    meta: [
      { title: "WISSEN & IDEEN — Ideas, Research & Perspectives" },
      {
        name: "description",
        content:
          "Bilingual research projects on political institutions, digital governance, technology, energy and civilization.",
      },
      { property: "og:title", content: "WISSEN & IDEEN — Ideas, Research & Perspectives" },
      {
        property: "og:description",
        content:
          "Long-form research projects, sources and institutional analysis in English and German.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WissenIndex,
});

const copy = {
  eyebrow: l("Independent intellectual journal", "Unabhängiges intellektuelles Journal"),
  title: l("WISSEN & IDEEN", "WISSEN & IDEEN"),
  accent: l("— Ideas, Research & Perspectives", "— Ideen, Forschung & Perspektiven"),
  intro: l(
    "An independent research publication on institutions, political organization and the technologies that shape collective life. Each project starts with a question, makes its limits explicit and will be published only after its sources and argument are reviewed.",
    "Eine unabhängige Forschungspublikation zu Institutionen, politischer Organisation und den Technologien, die das kollektive Leben prägen. Jedes Projekt beginnt mit einer Frage, benennt seine Grenzen und wird erst nach Prüfung von Quellen und Argumentation veröffentlicht.",
  ),
  program: l("Research programme", "Forschungsprogramm"),
  programmeIntro: l(
    "These are editorial research briefs—not completed essays or peer-reviewed papers. No full draft is published here.",
    "Dies sind redaktionelle Forschungsprofile – keine fertigen Essays oder begutachteten Fachaufsätze. Vollständige Entwürfe werden hier nicht veröffentlicht.",
  ),
  collections: l("Collections", "Themenfelder"),
  library: l("Explore the library", "Zur Bibliothek"),
  all: l("All themes", "Alle Themen"),
  count: l("projects", "Projekte"),
};

function WissenIndex() {
  const t = useT();
  const [selectedTheme, setSelectedTheme] = useState<ArticleTheme | "all">("all");
  const themes = Object.keys(themeLabels) as ArticleTheme[];
  const projects = useMemo(
    () =>
      selectedTheme === "all"
        ? researchProjects
        : researchProjects.filter((project) => project.themes.includes(selectedTheme)),
    [selectedTheme],
  );

  return (
    <>
      <PageHero
        index="008"
        eyebrow={copy.eyebrow}
        title={copy.title}
        accent={copy.accent}
        intro={copy.intro}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Badge variant="outline">
            {researchProjects.length} {t(copy.count)}
          </Badge>
          <Link
            to="/wissen/bibliothek"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t(copy.library)} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <section className="container-omega pb-8" aria-labelledby="collections-title">
        <SectionHeading
          eyebrow={copy.collections}
          title={l("Six connected fields of inquiry.", "Sechs verbundene Forschungsfelder.")}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme}
              type="button"
              aria-pressed={selectedTheme === theme}
              onClick={() => setSelectedTheme(selectedTheme === theme ? "all" : theme)}
              className={cn(
                "panel rounded-xl p-4 text-left transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                selectedTheme === theme && "border-primary/70",
              )}
            >
              <span className="mono-label text-primary">{t(themeLabels[theme])}</span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                {t(themeDescriptions[theme])}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-omega pb-24 pt-14" aria-labelledby="programme-title">
        <div className="mb-8 border-b border-border/50 pb-6">
          <SectionHeading
            eyebrow={copy.program}
            title={l("Eight initial research projects.", "Acht erste Forschungsprojekte.")}
            intro={copy.programmeIntro}
            className="mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedTheme("all")}
              aria-pressed={selectedTheme === "all"}
              className={cn(
                "min-h-10 shrink-0 rounded-lg border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                selectedTheme === "all"
                  ? "border-primary/60 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t(copy.all)}
            </button>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ArticleCard key={project.id} article={project} />
          ))}
        </div>
      </section>
    </>
  );
}
