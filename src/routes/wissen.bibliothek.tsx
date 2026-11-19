import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { featuredBooks, externalContributions, themeLabels } from "@/content/articles";
import { useLang, useT, l } from "@/lib/i18n";

export const Route = createFileRoute("/wissen/bibliothek")({
  head: () => ({
    meta: [
      { title: "Library & Contributors — WISSEN & IDEEN" },
      {
        name: "description",
        content:
          "A traceable collection of books, research papers and external intellectual work on institutions, governance and technology.",
      },
      { property: "og:title", content: "Library & Contributors — WISSEN & IDEEN" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LibraryPage,
});

const copy = {
  eyebrow: l("Sources and voices", "Quellen und Stimmen"),
  title: l("A library for further inquiry.", "Eine Bibliothek für weitere Forschung."),
  intro: l(
    "A curated starting point for primary works and independent research. Bibliographic details link to the original publisher, author or source wherever verified. Inclusion is not endorsement, and none of these entries implies a personal review.",
    "Ein kuratierter Ausgangspunkt für Primärwerke und unabhängige Forschung. Verifizierte bibliografische Angaben verlinken auf Originalverlag, Autor oder Quelle. Die Aufnahme bedeutet keine Empfehlung und behauptet keine persönliche Rezension.",
  ),
  books: l("Featured works", "Ausgewählte Werke"),
  worksNote: l(
    "Bibliographic pointers, not reviews",
    "Bibliografische Hinweise, keine Rezensionen",
  ),
  external: l("External research & contributions", "Externe Forschung & Beiträge"),
  externalIntro: l(
    "Original work remains with its author and publisher. Summaries below are attributed; commentary is clearly separated.",
    "Das Original verbleibt bei Autor und Verlag. Die folgenden Zusammenfassungen sind zugeschrieben; eigene Kommentare werden klar getrennt.",
  ),
  summary: l("Attributed summary", "Zugeschriebene Zusammenfassung"),
  arguments: l("Main arguments", "Kernargumente"),
  commentary: l("Amine's commentary", "Kommentar von Amine"),
  noCommentary: l(
    "No independent commentary has been added.",
    "Es wurde noch kein eigener Kommentar hinzugefügt.",
  ),
  source: l("Open original source", "Originalquelle öffnen"),
  back: l("Back to WISSEN & IDEEN", "Zurück zu WISSEN & IDEEN"),
};

function LibraryPage() {
  const t = useT();
  const { lang } = useLang();
  const hasXThreads = externalContributions.some((work) => work.format === "x-thread");

  useEffect(() => {
    if (!hasXThreads) return;
    const source = "https://platform.twitter.com/widgets.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${source}"]`);
    const loadWidgets = () => {
      const twitterWindow = window as Window & { twttr?: { widgets?: { load: () => void } } };
      twitterWindow.twttr?.widgets?.load();
    };
    if ((window as Window & { twttr?: { widgets?: { load: () => void } } }).twttr?.widgets) {
      loadWidgets();
      return;
    }
    if (existing) {
      existing.addEventListener("load", loadWidgets, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = source;
    script.async = true;
    script.onload = loadWidgets;
    document.body.appendChild(script);
  }, [hasXThreads]);

  return (
    <>
      <PageHero index="008 / LIBRARY" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
        <Link
          to="/wissen"
          className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {t(copy.back)}
        </Link>
      </PageHero>
      <section className="container-omega pb-20" aria-labelledby="featured-books-title">
        <SectionHeading eyebrow={copy.worksNote} title={copy.books} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredBooks.map((book) => (
            <article key={book.id} className="panel flex h-full flex-col rounded-2xl p-6">
              <div className="mono-label text-primary">
                {book.publisher ??
                  t(l("Bibliographic details pending", "Bibliografische Angaben ausstehend"))}
                {book.year ? ` · ${book.year}` : ""}
              </div>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">
                {book.title}
              </h3>
              {book.subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{book.subtitle}</p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                {book.authors.join(", ")}
                {book.isbn ? ` · ISBN ${book.isbn}` : ""}
              </p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/85">
                {book.description[lang]}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <span key={theme} className="chip">
                    {t(themeLabels[theme])}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {book.editorialNote[lang]}
              </p>
              <a
                href={book.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t(copy.source)} <ExternalLink size={14} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section
        className="container-omega border-t border-border/50 pb-24 pt-16"
        aria-labelledby="external-works-title"
      >
        <SectionHeading eyebrow={copy.externalIntro} title={copy.external} />
        <div className="flex flex-col gap-5">
          {externalContributions.map((work) => (
            <article key={work.id} className="panel rounded-2xl p-6 sm:p-8">
              <div className="mono-label text-primary">
                {work.originalSource}
                {work.publishedAt ? ` · ${work.publishedAt}` : ""} · {work.format}
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
                {work.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {work.author}
                {work.authorProfile ? (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href={work.authorProfile}
                      className="text-primary underline underline-offset-4"
                    >
                      {t(l("author profile", "Autor:innenprofil"))}
                    </a>
                  </>
                ) : null}
              </p>
              {work.format === "x-thread" && (
                <blockquote className="twitter-tweet mt-5">
                  <a href={work.url}>{t(copy.source)}</a>
                </blockquote>
              )}
              <h4 className="mono-label mt-6">{t(copy.summary)}</h4>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/85">
                {work.attributedSummary[lang]}
              </p>
              <h4 className="mono-label mt-6">{t(copy.arguments)}</h4>
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
                {work.mainArguments.map((argument) => (
                  <li key={argument.en} className="text-sm leading-relaxed text-muted-foreground">
                    {argument[lang]}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-l border-border pl-4">
                <h4 className="mono-label">{t(copy.commentary)}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {work.commentary?.[lang] ?? t(copy.noCommentary)}
                </p>
              </div>
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t(copy.source)} <ExternalLink size={14} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {t(
            l(
              "External works are linked to their original sources. Full copyrighted texts are not reproduced. X/Twitter contributions can be listed with a verified direct link; an official embed is used only when available, with the source link retained as a fallback.",
              "Externe Werke verlinken auf ihre Originalquellen. Vollständige urheberrechtlich geschützte Texte werden nicht reproduziert. X-/Twitter-Beiträge können mit verifiziertem Direktlink aufgenommen werden; ein offizielles Embed wird nur verwendet, wenn verfügbar, und die Quellenverlinkung bleibt als Fallback erhalten.",
            ),
          )}
        </p>
      </section>
    </>
  );
}
