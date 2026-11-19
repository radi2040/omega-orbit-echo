import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, HelpCircle, Lightbulb, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { DomainIcon } from "@/components/site/DomainIcon";
import { BulletList, EvidenceBadge } from "@/components/site/primitives";
import { domainBySlug, domains, type Domain } from "@/content/domains";
import { l, useT, type L } from "@/lib/i18n";

export const Route = createFileRoute("/vision/$domain")({
  loader: ({ params }) => {
    const domain = domainBySlug(params.domain);
    if (!domain) throw notFound();
    return { slug: domain.slug };
  },
  head: ({ loaderData }) => {
    const d = loaderData ? domainBySlug(loaderData.slug) : undefined;
    if (!d) return { meta: [{ title: "Domain not found — OMEGA" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${d.title.en} — OMEGA Research Domain` },
        { name: "description", content: d.purpose.en },
        { property: "og:title", content: `${d.title.en} — OMEGA` },
        { property: "og:description", content: d.short.en },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DomainPage,
  notFoundComponent: DomainNotFound,
});

const c = {
  back: l("All domains", "Alle Bereiche"),
  domain: l("Research domain", "Forschungsbereich"),
  purpose: l("Purpose", "Zweck"),
  principles: l("Principles", "Prinzipien"),
  technologies: l("Technologies", "Technologien"),
  applications: l("Applications", "Anwendungen"),
  dependencies: l("Dependencies", "Abhängigkeiten"),
  limitations: l("Limitations", "Grenzen"),
  proposals: l("OMEGA proposals", "OMEGA-Vorschläge"),
  questions: l("Open research questions", "Offene Forschungsfragen"),
  relationship: l("Relationship with OMEGA", "Beziehung zu OMEGA"),
  dependsOn: l("depends on", "hängt ab von"),
  next: l("Next domain", "Nächster Bereich"),
  prev: l("Previous domain", "Vorheriger Bereich"),
  notFound: l("This domain does not exist.", "Diesen Bereich gibt es nicht."),
};

function Block({ title, children, icon }: { title: L; children: ReactNode; icon?: ReactNode }) {
  const t = useT();
  return (
    <section className="panel p-6 md:p-7">
      <h2 className="mono-label mb-5 flex items-center gap-2">
        {icon}
        {t(title)}
      </h2>
      {children}
    </section>
  );
}

function DomainNotFound() {
  const t = useT();
  return (
    <div className="container-omega py-32 text-center">
      <p className="text-muted-foreground">{t(c.notFound)}</p>
      <Link to="/vision" className="mt-6 inline-flex text-primary">{t(c.back)}</Link>
    </div>
  );
}

function DomainPage() {
  const { slug } = Route.useLoaderData();
  const d = domainBySlug(slug) as Domain;
  const t = useT();
  const i = domains.findIndex((x) => x.slug === d.slug);
  const prev = domains[(i - 1 + domains.length) % domains.length]!;
  const next = domains[(i + 1) % domains.length]!;

  return (
    <div data-accent={d.accent}>
      <section className="container-omega pb-12 pt-16 md:pt-24">
        <Link to="/vision" className="mono-label inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <ArrowLeft size={14} /> {t(c.back)}
        </Link>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono-label accent-text">{t(c.domain)} {d.index}</div>
            <h1 className="display-1 mt-4 text-foreground">{t(d.title)}</h1>
            <p className="lede mt-6 max-w-2xl">{t(d.purpose)}</p>
          </div>
          <div className="accent-text accent-border accent-soft accent-glow grid h-28 w-28 shrink-0 place-items-center rounded-3xl border">
            <DomainIcon slug={d.slug} size={52} strokeWidth={1.1} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-1.5">
          {d.topics.map((topic) => (
            <span key={topic.en} className="chip accent-border">{t(topic)}</span>
          ))}
        </div>
      </section>

      <div className="container-omega grid gap-3 lg:grid-cols-2">
        <Block title={c.principles}>
          <BulletList items={d.principles} accent={d.accent} />
        </Block>
        <Block title={c.applications}>
          <BulletList items={d.applications} accent={d.accent} />
        </Block>

        <div className="lg:col-span-2">
          <Block title={c.technologies}>
            <div className="grid gap-3 md:grid-cols-2">
              {d.technologies.map((tech) => (
                <div key={tech.name.en} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-foreground">{t(tech.name)}</h3>
                    <EvidenceBadge kind={tech.evidence} />
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t(tech.note)}</p>
                </div>
              ))}
            </div>
          </Block>
        </div>

        <Block title={c.dependencies}>
          <ul className="space-y-3">
            {d.dependencies.map((dep) => {
              const target = domainBySlug(dep.on)!;
              return (
                <li key={dep.on} data-accent={target.accent}>
                  <Link to="/vision/$domain" params={{ domain: dep.on }} className="group flex gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-foreground/[0.03]">
                    <DomainIcon slug={dep.on} size={18} className="accent-text mt-0.5 shrink-0" />
                    <span className="text-[14px] leading-relaxed text-muted-foreground">
                      <span className="text-dim">{t(c.dependsOn)} </span>
                      <span className="accent-text font-semibold">{t(target.title)}</span> — {t(dep.why)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Block>
        <Block title={c.limitations} icon={<TriangleAlert size={13} className="text-rose" />}>
          <BulletList items={d.limitations} accent="rose" />
        </Block>
        <Block title={c.proposals} icon={<Lightbulb size={13} className="text-violet" />}>
          <div className="mb-4"><EvidenceBadge kind="proposal" /></div>
          <BulletList items={d.proposals} accent="violet" />
        </Block>
        <Block title={c.questions} icon={<HelpCircle size={13} className="text-amber" />}>
          <BulletList items={d.openQuestions} accent="amber" />
        </Block>
      </div>

      <section className="container-omega mt-3">
        <div className="panel accent-border p-8 md:p-12">
          <div className="mono-label accent-text">{t(c.relationship)}</div>
          <p className="serif-accent mt-4 max-w-3xl text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-foreground">{t(d.relationship)}</p>
        </div>
      </section>

      <nav className="container-omega mt-10 grid gap-3 sm:grid-cols-2" aria-label="Domains">
        <Link to="/vision/$domain" params={{ domain: prev.slug }} className="panel panel-interactive flex items-center gap-4 p-5">
          <ArrowLeft size={18} className="text-dim" />
          <div>
            <div className="mono-label">{t(c.prev)}</div>
            <div className="mt-1 font-semibold text-foreground">{t(prev.title)}</div>
          </div>
        </Link>
        <Link to="/vision/$domain" params={{ domain: next.slug }} className="panel panel-interactive flex items-center justify-end gap-4 p-5 text-right">
          <div>
            <div className="mono-label">{t(c.next)}</div>
            <div className="mt-1 font-semibold text-foreground">{t(next.title)}</div>
          </div>
          <ArrowRight size={18} className="text-dim" />
        </Link>
      </nav>
    </div>
  );
}
