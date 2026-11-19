import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import type { Domain } from "@/content/domains";
import { useT, l } from "@/lib/i18n";
import { DomainIcon } from "./DomainIcon";

const cta = l("Explore the domain", "Bereich erkunden");

export function DomainCard({ domain }: { domain: Domain }) {
  const t = useT();
  return (
    <Link
      to="/vision/$domain"
      params={{ domain: domain.slug }}
      data-accent={domain.accent}
      className="domain-card panel panel-interactive group flex min-h-[290px] flex-col p-5"
    >
      <div className="flex justify-between font-mono text-[10.5px] text-dim">
        <span>{domain.index}</span>
        <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <div className="accent-text accent-border accent-soft mt-7 grid h-[52px] w-[52px] place-items-center rounded-xl border">
        <DomainIcon slug={domain.slug} size={26} />
      </div>
      <h3 className="mt-6 text-[16px] font-semibold tracking-tight text-foreground">{t(domain.title)}</h3>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">{t(domain.short)}</p>
      <span className="accent-text mt-auto flex items-center gap-1.5 pt-6 font-mono text-[10px] uppercase tracking-wider opacity-80 transition-all group-hover:gap-2.5 group-hover:opacity-100">
        {t(cta)} <ChevronRight size={14} />
      </span>
    </Link>
  );
}
