import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { DomainIcon } from "@/components/site/DomainIcon";
import { BulletList, EvidenceBadge } from "@/components/site/primitives";
import { domainBySlug, domains, relations, type DomainSlug, type Relation } from "@/content/domains";
import { l, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const POS: Record<DomainSlug, [number, number]> = {
  civilization: [50, 11],
  governance: [16, 42],
  intelligence: [84, 42],
  infrastructure: [30, 85],
  energy: [70, 85],
};


type Tab = "overview" | "relations" | "technologies" | "proposals" | "questions" | "limitations";

const c = {
  tabs: {
    overview: l("Overview", "Überblick"),
    relations: l("Relationships", "Beziehungen"),
    technologies: l("Existing tech", "Bestehende Technik"),
    proposals: l("OMEGA proposals", "OMEGA-Vorschläge"),
    questions: l("Open questions", "Offene Fragen"),
    limitations: l("Limitations", "Grenzen"),
  } as Record<Tab, ReturnType<typeof l>>,
  purpose: l("Purpose", "Zweck"),
  components: l("Components", "Komponenten"),
  inputs: l("Inputs", "Eingänge"),
  outputs: l("Outputs", "Ausgänge"),
  provides: l("Provides to", "Liefert an"),
  receives: l("Receives from", "Erhält von"),
  dependsOn: l("Depends on", "Hängt ab von"),
  layer: l("Layer", "Schicht"),
  hint: l("Select a layer to explore it. Highlighted lines show what flows in and out.", "Wählen Sie eine Schicht. Hervorgehobene Linien zeigen, was hinein- und hinausfließt."),
  deep: l("Read the full domain", "Ganzen Bereich lesen"),
  diagram: l("Diagram of the five OMEGA layers and their relationships", "Diagramm der fünf OMEGA-Schichten und ihrer Beziehungen"),
};

function edgePath(r: Relation) {
  const [x1, y1] = POS[r.from];
  const [x2, y2] = POS[r.to];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // Curve to the right of travel direction so A→B and B→A are drawn as two distinct arcs.
  const off = 6;
  const cx = mx + (-dy / len) * off;
  const cy = my + (dx / len) * off;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function ArchitectureExplorer() {
  const t = useT();
  const [selected, setSelected] = useState<DomainSlug>("governance");
  const [tab, setTab] = useState<Tab>("overview");
  const [hoverEdge, setHoverEdge] = useState<number | null>(null);
  const d = domainBySlug(selected)!;

  const outgoing = useMemo(() => relations.map((r, i) => ({ r, i })).filter(({ r }) => r.from === selected), [selected]);
  const incoming = useMemo(() => relations.map((r, i) => ({ r, i })).filter(({ r }) => r.to === selected), [selected]);

  const edgeState = (r: Relation, i: number) => {
    if (hoverEdge !== null) return hoverEdge === i ? "hot" : "dim";
    if (r.from === selected) return "out";
    if (r.to === selected) return "in";
    return "dim";
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr]">
      <div className="panel relative overflow-hidden p-3 sm:p-6">
        <div className="mono-label flex justify-between px-1">
          <span className="whitespace-nowrap">OMEGA / ARCH</span>
          <span className="hidden max-w-[70%] text-right sm:inline">{t(c.hint)}</span>
        </div>
        <div className="relative mx-auto mt-4 aspect-square w-full max-w-[560px]" role="group" aria-label={t(c.diagram)}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              {(["out", "in", "hot", "dim"] as const).map((k) => (
                <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill={k === "out" || k === "hot" ? "var(--cyan)" : k === "in" ? "var(--violet)" : "var(--dim)"} />
                </marker>
              ))}
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="var(--cyan)" stopOpacity=".25" />
                <stop offset="1" stopColor="var(--cyan)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="52" r="30" fill="url(#core)" />
            <circle cx="50" cy="52" r="36" fill="none" stroke="var(--border)" strokeWidth=".25" strokeDasharray=".8 1.2" />
            {relations.map((r, i) => {
              const s = edgeState(r, i);
              return (
                <path
                  key={`${r.from}-${r.to}`}
                  d={edgePath(r)}
                  fill="none"
                  className={cn("arch-edge", s !== "dim" && "arch-edge-flow")}
                  stroke={s === "out" || s === "hot" ? "var(--cyan)" : s === "in" ? "var(--violet)" : "var(--dim)"}
                  strokeWidth={s === "hot" ? 0.7 : s === "dim" ? 0.25 : 0.45}
                  opacity={s === "dim" ? 0.35 : 1}
                  markerEnd={`url(#arrow-${s})`}
                />
              );
            })}
            {domains.map((dd) => {
              const [x, y] = POS[dd.slug];
              return <line key={dd.slug} x1={50} y1={52} x2={x} y2={y} stroke="var(--border)" strokeWidth=".18" />;
            })}
            <text x="50" y="56" textAnchor="middle" fill="var(--foreground)" fontFamily="var(--font-serif)" fontSize="11" opacity=".9">Ω</text>
          </svg>

          {domains.map((dd) => {
            const [x, y] = POS[dd.slug];
            const active = dd.slug === selected;
            return (
              <button
                key={dd.slug}
                type="button"
                data-accent={dd.accent}
                onClick={() => setSelected(dd.slug)}
                aria-pressed={active}
                className={cn(
                  "arch-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border px-2.5 py-2 sm:px-3.5 sm:py-3",
                  active ? "accent-border accent-glow bg-surface-raised" : "border-border bg-surface/90 hover:border-[var(--line-strong)]",
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <DomainIcon slug={dd.slug} size={20} className="accent-text" />
                <span className={cn("whitespace-nowrap text-[10.5px] font-semibold sm:text-[12px]", active ? "text-foreground" : "text-muted-foreground")}>
                  {t(dd.title)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-4 font-mono text-[10px] text-dim">
          <span className="flex items-center gap-1.5"><i className="h-px w-5 bg-cyan" /> {t(c.provides)}</span>
          <span className="flex items-center gap-1.5"><i className="h-px w-5 bg-violet" /> {t(c.receives)}</span>
        </div>
      </div>

      <div className="panel flex flex-col p-5 sm:p-7" data-accent={d.accent} aria-live="polite">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mono-label accent-text">{t(c.layer)} {d.index}</div>
            <h3 className="display-3 mt-2 text-foreground">{t(d.title)}</h3>
          </div>
          <Link to="/vision/$domain" params={{ domain: d.slug }} className="accent-text inline-flex items-center gap-1 whitespace-nowrap pt-1 text-[12px]">
            {t(c.deep)} <ArrowUpRight size={14} />
          </Link>
        </div>

        <div role="tablist" aria-label={t(d.title)} className="mt-5 flex flex-wrap gap-1.5">
          {(Object.keys(c.tabs) as Tab[]).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[11.5px] transition-colors",
                tab === k ? "accent-border accent-soft text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t(c.tabs[k])}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-6 min-h-[320px] flex-1">
          {tab === "overview" && (
            <div className="space-y-6">
              <div>
                <div className="mono-label mb-2">{t(c.purpose)}</div>
                <p className="text-[14.5px] leading-relaxed text-foreground/85">{t(d.purpose)}</p>
              </div>
              <div>
                <div className="mono-label mb-2.5">{t(c.components)}</div>
                <div className="flex flex-wrap gap-1.5">
                  {d.topics.map((x) => (
                    <span key={x.en} className="chip">{t(x)}</span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <div className="mono-label mb-3 text-violet">→ {t(c.inputs)}</div>
                  <BulletList items={d.inputs} accent="violet" />
                </div>
                <div className="rounded-xl border border-border p-4">
                  <div className="mono-label mb-3 text-primary">{t(c.outputs)} →</div>
                  <BulletList items={d.outputs} accent="cyan" />
                </div>
              </div>
            </div>
          )}

          {tab === "relations" && (
            <div className="space-y-6">
              {[
                { title: c.provides, items: outgoing, other: (r: Relation) => r.to, color: "text-primary" },
                { title: c.receives, items: incoming, other: (r: Relation) => r.from, color: "text-violet" },
              ].map((group) => (
                <div key={group.title.en}>
                  <div className={cn("mono-label mb-2.5", group.color)}>{t(group.title)}</div>
                  <ul className="space-y-1.5">
                    {group.items.map(({ r, i }) => {
                      const o = domainBySlug(group.other(r))!;
                      return (
                        <li key={i}>
                          <button
                            type="button"
                            onMouseEnter={() => setHoverEdge(i)}
                            onMouseLeave={() => setHoverEdge(null)}
                            onFocus={() => setHoverEdge(i)}
                            onBlur={() => setHoverEdge(null)}
                            onClick={() => setSelected(o.slug)}
                            className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors hover:border-border hover:bg-foreground/[0.03]"
                          >
                            <span data-accent={o.accent} className="accent-text"><DomainIcon slug={o.slug} size={16} /></span>
                            <span className="flex-1 text-[13.5px] text-muted-foreground">
                              <span className="font-semibold text-foreground">{t(o.title)}</span> — {t(r.label)}
                            </span>
                            <ArrowRight size={14} className="text-dim" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div>
                <div className="mono-label mb-2.5">{t(c.dependsOn)}</div>
                <ul className="space-y-2">
                  {d.dependencies.map((dep) => (
                    <li key={dep.on} className="text-[13.5px] leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">{t(domainBySlug(dep.on)!.title)}:</span> {t(dep.why)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "technologies" && (
            <ul className="space-y-3">
              {d.technologies.map((tech) => (
                <li key={tech.name.en} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-foreground">{t(tech.name)}</span>
                    <EvidenceBadge kind={tech.evidence} />
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{t(tech.note)}</p>
                </li>
              ))}
            </ul>
          )}

          {tab === "proposals" && (
            <div>
              <EvidenceBadge kind="proposal" className="mb-4" />
              <BulletList items={d.proposals} accent="violet" />
            </div>
          )}
          {tab === "questions" && <BulletList items={d.openQuestions} accent="amber" />}
          {tab === "limitations" && <BulletList items={d.limitations} accent="rose" />}
        </div>
      </div>
    </div>
  );
}

