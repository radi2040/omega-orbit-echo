import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { navigation, ui } from "@/content/ui";
import { useT } from "@/lib/i18n";
import { Brand } from "./SiteHeader";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="container-omega mt-24 border-t border-border pb-10 pt-10">
      <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <Brand small />
          <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">{t(ui.footerNote)}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
          {navigation.map((item) => (
            <Link key={item.to} to={item.to} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
              {t(item.label)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-dim">
        <span>© 2026 OMEGA — Infrastructure for a Decentralized Civilization</span>
        <a href="#main" className="inline-flex items-center gap-1.5 hover:text-foreground">
          {t(ui.backToTop)} <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
