import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ArticleBlock, ArticleReference, PublishedArticle } from "@/content/articles";
import { useLang, useT, l } from "@/lib/i18n";

export function ArticleContent({
  article,
  lang,
}: {
  article: PublishedArticle;
  lang: "en" | "de";
}) {
  const { setLang } = useLang();
  const t = useT();
  const edition = article.editions[lang];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0,
      );
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [article.id, lang]);

  const toc = edition.sections.map(({ id, heading, level }) => ({ id, heading, level }));

  return (
    <article className="container-omega pb-24">
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-border/30" aria-hidden="true">
        <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
      </div>
      <div
        className="sr-only"
        role="progressbar"
        aria-label={t(l("Reading progress", "Lesefortschritt"))}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      />
      <header className="mx-auto max-w-4xl border-b border-border/50 pb-10 pt-10">
        <div className="flex items-center justify-between gap-4">
          <div className="mono-label text-primary">WISSEN & IDEEN /</div>
          <div
            className="inline-flex gap-2"
            role="group"
            aria-label={t(l("Article language", "Artikelsprache"))}
          >
            {(["en", "de"] as const).map((code) => (
              <Link
                key={code}
                to="/wissen/$articleId"
                params={{ articleId: article.id }}
                search={{ lang: code }}
                onClick={() => setLang(code)}
                aria-current={lang === code ? "page" : undefined}
                className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${lang === code ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {code}
              </Link>
            ))}
          </div>
        </div>
        <h1 className="display-1 mt-5 text-foreground">{edition.title}</h1>
        <p className="lede mt-5 max-w-3xl">{edition.subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>{article.author}</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString(lang === "en" ? "en-US" : "de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {article.readingMinutes} {t(l("min read", "Min. Lesezeit"))}
          </span>
          <span>
            {article.editionWordCounts[lang].toLocaleString(lang === "en" ? "en-US" : "de-DE")}{" "}
            {t(l("words", "Wörter"))}
          </span>
        </div>
        <p className="mt-8 border-l-2 border-primary/60 pl-5 text-base leading-relaxed text-muted-foreground">
          {edition.abstract}
        </p>
      </header>

      <div className="mx-auto mt-10 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0">
          <div className="mb-8 rounded-2xl border border-border/50 bg-background/30 p-5 lg:hidden">
            <h2 className="mono-label mb-3">{t(l("In this article", "In diesem Artikel"))}</h2>
            <TableOfContents items={toc} />
          </div>
          {edition.sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-24 py-7">
              {section.level === 2 ? (
                <h2 className="display-3 mb-6 text-foreground">{section.heading}</h2>
              ) : (
                <h3 className="mt-4 mb-5 text-xl font-semibold text-foreground">
                  {section.heading}
                </h3>
              )}
              <div className="flex flex-col gap-5">
                {section.blocks.map((block, index) => (
                  <Block
                    key={`${section.id}-${index}`}
                    block={block}
                    references={article.references}
                  />
                ))}
              </div>
            </section>
          ))}
          <Bibliography references={article.references} />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border/50 bg-background/35 p-5">
            <h2 className="mono-label mb-4">{t(l("In this article", "In diesem Artikel"))}</h2>
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function TableOfContents({ items }: { items: { id: string; heading: string; level: 2 | 3 }[] }) {
  const t = useT();
  return (
    <nav
      aria-label={t(l("Table of contents", "Inhaltsverzeichnis"))}
      className="flex flex-col gap-2"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`text-sm leading-relaxed text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${item.level === 3 ? "pl-3" : ""}`}
        >
          {item.heading}
        </a>
      ))}
    </nav>
  );
}

function Block({ block, references }: { block: ArticleBlock; references: ArticleReference[] }) {
  const t = useT();
  if (block.type === "paragraph") {
    const claimLabels = {
      evidence: l("Evidence", "Evidenz"),
      interpretation: l("Interpretation", "Interpretation"),
      hypothesis: l("Hypothesis", "Hypothese"),
      opinion: l("Author's view", "Standpunkt des Autors"),
    };
    return (
      <div className="max-w-[72ch]">
        {block.claimType && (
          <Badge variant="outline" className="mb-2">
            {t(claimLabels[block.claimType])}
          </Badge>
        )}
        <p className="text-[16px] leading-[1.9] text-foreground/90">
          {block.text}
          {block.citations?.map((id) => (
            <Citation key={id} id={id} references={references} />
          ))}
        </p>
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="flex list-disc flex-col gap-3 pl-6 text-[16px] leading-[1.8] text-foreground/90">
        {block.items.map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
        {block.citations?.map((id) => (
          <Citation key={id} id={id} references={references} />
        ))}
      </ul>
    );
  }
  if (block.type === "quote") {
    const reference = references.find((item) => item.id === block.referenceId);
    return (
      <figure className="my-3 border-l-2 border-primary/60 pl-6">
        <blockquote className="font-serif text-2xl italic leading-relaxed text-foreground">
          “{block.text}”
        </blockquote>
        <figcaption className="mt-3 text-sm text-muted-foreground">
          {block.attribution}
          {reference && (
            <>
              {" "}
              · <Citation id={reference.id} references={references} />
            </>
          )}
        </figcaption>
      </figure>
    );
  }
  if (block.type === "table") {
    return (
      <figure className="my-4">
        <figcaption className="mb-3 text-sm font-semibold text-foreground">
          {block.caption}
        </figcaption>
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                {block.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="border-b border-border/60 px-4 py-3 font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index} className="border-b border-border/40 last:border-0">
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 align-top text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {block.notes} {block.limitations}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[...new Set(block.rows.flatMap((row) => row.references ?? []))].map((id) => (
            <Citation key={id} id={id} references={references} />
          ))}
        </div>
      </figure>
    );
  }
  if (block.type === "chart") return <ResearchChart block={block} />;
  return (
    <aside
      id={`note-${block.id}`}
      className="scroll-mt-24 border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground"
    >
      <sup>{block.id}</sup> {block.text}
    </aside>
  );
}

function Citation({ id, references }: { id: string; references: ArticleReference[] }) {
  const reference = references.find((item) => item.id === id);
  if (!reference) return null;
  const author = reference.authors[0]?.split(" ").at(-1) ?? reference.authors[0] ?? id;
  const label = reference.year ? `(${author}, ${reference.year})` : `(${author})`;
  return (
    <sup className="ml-1 align-super text-xs">
      <a
        href={`#ref-${id}`}
        aria-label={`${label}, ${reference.title}`}
        className="text-primary underline underline-offset-2"
      >
        {label}
      </a>
    </sup>
  );
}

function ResearchChart({ block }: { block: Extract<ArticleBlock, { type: "chart" }> }) {
  const t = useT();
  const config = { value: { label: block.unit, color: "var(--chart-1)" } };
  return (
    <figure className="my-6 rounded-2xl border border-border/60 bg-background/35 p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{block.title}</h3>
        {block.conceptual && (
          <Badge variant="outline">{t(l("Conceptual model", "Konzeptionelles Modell"))}</Badge>
        )}
      </figcaption>
      <div role="img" aria-label={block.title}>
        <ChartContainer config={config} className="min-h-56 w-full">
          {block.chartType === "bar" ? (
            <BarChart
              accessibilityLayer
              data={block.data}
              margin={{ top: 8, right: 12, bottom: 8, left: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={44} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          ) : (
            <LineChart
              accessibilityLayer
              data={block.data}
              margin={{ top: 8, right: 12, bottom: 8, left: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={44} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
                type="monotone"
              />
            </LineChart>
          )}
        </ChartContainer>
      </div>
      <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-border/50 pt-4 text-xs leading-relaxed sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-foreground">{t(l("Source", "Quelle"))}</dt>
          <dd>
            <a
              href={block.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2"
            >
              {block.source}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">
            {t(l("Date and unit", "Datum und Einheit"))}
          </dt>
          <dd className="text-muted-foreground">
            {block.date} · {block.unit}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">{t(l("Method", "Methode"))}</dt>
          <dd className="text-muted-foreground">{block.methodology}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground">{t(l("Caveat", "Einschränkung"))}</dt>
          <dd className="text-muted-foreground">{block.caveat}</dd>
        </div>
      </dl>
    </figure>
  );
}

function Bibliography({ references }: { references: ArticleReference[] }) {
  const t = useT();
  if (!references.length) return null;
  return (
    <section id="references" className="mt-12 scroll-mt-24 border-t border-border/50 pt-8">
      <h2 className="display-3 mb-6 text-foreground">
        {t(l("References", "Literaturverzeichnis"))}
      </h2>
      <ol className="flex list-decimal flex-col gap-4 pl-6">
        {references.map((reference) => (
          <li
            id={`ref-${reference.id}`}
            key={reference.id}
            className="scroll-mt-24 text-sm leading-relaxed text-muted-foreground"
          >
            {reference.authors.join(", ")} ({reference.year ?? "n.d."}).{" "}
            <cite>{reference.title}</cite>. {reference.publication ?? reference.publisher}
            {reference.pages ? `, ${reference.pages}` : ""}.
            {reference.doi && (
              <>
                {" "}
                DOI:{" "}
                <a
                  href={`https://doi.org/${reference.doi}`}
                  className="text-primary underline underline-offset-2"
                >
                  {reference.doi}
                </a>
                .
              </>
            )}
            {reference.url && !reference.doi && (
              <>
                {" "}
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  {t(l("Source", "Quelle"))}
                </a>
                .
              </>
            )}
            {reference.accessedAt && (
              <>
                {" "}
                {t(l("Accessed", "Abgerufen am"))}: {reference.accessedAt}.
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
