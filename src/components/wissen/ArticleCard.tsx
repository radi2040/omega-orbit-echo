import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type ResearchProject, themeLabels } from "@/content/articles";
import { useLang, useT, l } from "@/lib/i18n";

export function ArticleCard({ article }: { article: ResearchProject }) {
  const { lang } = useLang();
  const t = useT();

  return (
    <article className="panel flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-primary/40">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          {t(
            article.status === "draft"
              ? l("Research draft", "Forschungsentwurf")
              : l("In review", "In Prüfung"),
          )}
        </Badge>
        {article.themes.slice(0, 2).map((theme) => (
          <Badge key={theme} variant="secondary">
            {t(themeLabels[theme])}
          </Badge>
        ))}
      </div>
      <h2 className="display-3 text-foreground">{article.title[lang]}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.subtitle[lang]}</p>
      <p className="mt-5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
        {article.abstract[lang]}
      </p>
      <p className="mt-5 border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="mono-label text-primary">
          {t(l("Research question", "Forschungsfrage"))}
        </span>
        <span className="mt-2 block">{article.researchQuestion[lang]}</span>
      </p>
      <Link
        to="/wissen/$articleId"
        params={{ articleId: article.id }}
        search={{ lang }}
        className="mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border/70 px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`${t(l("Open project brief:", "Projektprofil öffnen:"))} ${article.title[lang]}`}
      >
        <span>{t(l("Project brief", "Projektprofil"))}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
