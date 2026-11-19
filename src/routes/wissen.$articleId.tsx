import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArticleContent } from "@/components/wissen/ArticleContent";
import { PageHero } from "@/components/site/primitives";
import { Badge } from "@/components/ui/badge";
import {
  getPublishedArticle,
  getResearchProject,
  type ArticleEdition,
  type PublishedArticle,
  type ResearchProject,
} from "@/content/articles";
import { l, useLang, useT, type Lang } from "@/lib/i18n";

function parseLang(search: Record<string, unknown>): { lang: Lang } {
  return { lang: search["lang"] === "de" ? "de" : "en" };
}

export const Route = createFileRoute("/wissen/$articleId")({
  validateSearch: parseLang,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ params, deps }) => ({
    project: getResearchProject(params.articleId),
    article: getPublishedArticle(params.articleId),
    lang: deps.lang,
  }),
  head: ({ params, loaderData }) => {
    const lang = loaderData?.lang ?? "en";
    const project = loaderData?.project ?? getResearchProject(params.articleId);
    const article = loaderData?.article ?? getPublishedArticle(params.articleId);
    const title = project?.title[lang] ?? article?.editions[lang].title ?? "WISSEN & IDEEN";
    const description =
      project?.abstract[lang] ?? article?.editions[lang].abstract ?? "Research publication";
    return {
      meta: [
        { title: `${title} — WISSEN & IDEEN` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: article ? "article" : "website" },
        { property: "og:locale", content: lang === "de" ? "de_DE" : "en_US" },
        ...(!article ? [{ name: "robots", content: "noindex, follow" }] : []),
      ],
    };
  },
  component: ArticleRoute,
});

const WORDS_PER_MINUTE = 230;

function countEditionWords(edition: ArticleEdition): number {
  const text = edition.sections
    .flatMap((section) => section.blocks)
    .map((block) => ("text" in block ? block.text : ""))
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

function editionAsArticle(project: ResearchProject, edition: ArticleEdition): PublishedArticle {
  const words = countEditionWords(edition);
  const latestRevisionDate = project.revisions.at(-1)?.date ?? new Date().toISOString();
  return {
    id: project.id,
    status: "published",
    author: project.author,
    publishedAt: latestRevisionDate,
    updatedAt: latestRevisionDate,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    editionWordCounts: { en: words, de: 0 },
    editions: { [edition.language]: edition } as PublishedArticle["editions"],
    references: project.references,
    revisions: project.revisions,
  };
}

function ArticleRoute() {
  const { project, article } = Route.useLoaderData();
  const { lang, setLang } = useLang();
  const { lang: routeLang } = Route.useSearch();
  const t = useT();

  useEffect(() => {
    if (lang !== routeLang) setLang(routeLang);
  }, [lang, routeLang, setLang]);

  if (article) return <ArticleContent article={article} />;

  const edition = project?.editions?.[routeLang];
  if (project && edition) return <ArticleContent article={editionAsArticle(project, edition)} />;

  if (!project) {
    return (
      <section className="container-omega py-24">
        <h1 className="display-2 text-foreground">
          {t(l("Project not found", "Projekt nicht gefunden"))}
        </h1>
        <Link
          to="/wissen"
          className="mt-6 inline-flex text-sm text-primary underline underline-offset-4"
        >
          {t(l("Return to WISSEN & IDEEN", "Zurück zu WISSEN & IDEEN"))}
        </Link>
      </section>
    );
  }

  const localizedStatus = t(
    project.status === "draft"
      ? l("Research draft", "Forschungsentwurf")
      : l("In editorial review", "In redaktioneller Prüfung"),
  );

  return (
    <>
      <PageHero
        index="008 / BRIEF"
        eyebrow={l("Research programme", "Forschungsprogramm")}
        title={project.title}
        accent={l(`— ${project.subtitle.en}`, `— ${project.subtitle.de}`)}
        intro={project.abstract}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant="outline">{localizedStatus}</Badge>
          <span className="text-sm text-muted-foreground">
            {t(l("By", "Von"))} {project.author}
          </span>
        </div>
        <div
          className="mt-4 inline-flex gap-2"
          role="group"
          aria-label={t(l("Article language", "Artikelsprache"))}
        >
          {(["en", "de"] as const).map((code) => (
            <Link
              key={code}
              to="/wissen/$articleId"
              params={{ articleId: project.id }}
              search={{ lang: code }}
              onClick={() => setLang(code)}
              aria-current={routeLang === code ? "page" : undefined}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${routeLang === code ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {code}
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="container-omega grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <aside className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <p className="mono-label text-primary">
              {t(l("Not a published article", "Kein veröffentlichter Artikel"))}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t(
                l(
                  "This page is an editorial research brief, not a completed essay or peer-reviewed paper. The full draft remains unpublished until its argument, translations and sources have been reviewed.",
                  "Diese Seite ist ein redaktionelles Forschungsprofil, kein fertiger Essay und kein begutachteter Fachaufsatz. Der vollständige Entwurf bleibt unveröffentlicht, bis Argumentation, Übersetzungen und Quellen geprüft wurden.",
                ),
              )}
            </p>
          </aside>

          <section className="mb-10">
            <h2 className="display-3 mb-5 text-foreground">
              {t(l("Research question", "Forschungsfrage"))}
            </h2>
            <p className="max-w-[72ch] text-lg leading-relaxed text-foreground/90">
              {project.researchQuestion[lang]}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="display-3 mb-5 text-foreground">
              {t(l("Scope and method", "Umfang und Methode"))}
            </h2>
            <p className="max-w-[72ch] text-base leading-relaxed text-muted-foreground">
              {project.method[lang]}
            </p>
          </section>

          <section>
            <h2 className="display-3 mb-5 text-foreground">
              {t(l("Proposed structure", "Vorgeschlagene Gliederung"))}
            </h2>
            <ol className="flex list-decimal flex-col gap-5 pl-6">
              {project.outline.map((section, index) => (
                <li key={`${section.title.en}-${index}`} className="pl-2">
                  <h3 className="text-base font-semibold text-foreground">{section.title[lang]}</h3>
                  <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
                    {section.prompts.map((prompt) => (
                      <li key={prompt.en} className="text-sm leading-relaxed text-muted-foreground">
                        {prompt[lang]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border/50 bg-background/30 p-5">
          <h2 className="mono-label mb-4">{t(l("Editorial notes", "Redaktionelle Hinweise"))}</h2>
          <dl className="flex flex-col gap-4 text-sm">
            <div>
              <dt className="font-medium text-foreground">{t(l("Target length", "Zielumfang"))}</dt>
              <dd className="mt-1 text-muted-foreground">{project.targetLength[lang]}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">
                {t(l("Limitations to address", "Zu behandelnde Grenzen"))}
              </dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">
                {project.limitations[lang]}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">{t(l("References", "Quellen"))}</dt>
              <dd className="mt-1 text-muted-foreground">
                {project.references.length
                  ? project.references.length
                  : t(
                      l(
                        "Source review not yet complete",
                        "Quellenprüfung noch nicht abgeschlossen",
                      ),
                    )}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
