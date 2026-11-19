import { Blocks, BrainCircuit, Landmark, ShieldCheck, Zap, type LucideProps } from "lucide-react";

import type { DomainSlug } from "@/content/domains";

const icons = { governance: ShieldCheck, infrastructure: Blocks, energy: Zap, intelligence: BrainCircuit, civilization: Landmark };

export function DomainIcon({ slug, ...props }: { slug: DomainSlug } & LucideProps) {
  const Icon = icons[slug];
  return <Icon strokeWidth={1.4} {...props} />;
}
