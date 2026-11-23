import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { alternatePath } from "@/content/rd/paths";
import { navigation, ui, type NavItem } from "@/content/ui";
import { useLang, useT, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function LanguageToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const articleId = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId === "/wissen/$articleId")
        ? state.location.pathname.split("/").at(-1)
        : undefined,
  });
  return (
    <div
      role="group"
      aria-label={t(ui.language)}
      className="flex items-center rounded-lg border border-border p-0.5 font-mono text-[10.5px]"
    >
      {(["en", "de"] as Lang[]).map((code) => {
        const className = cn(
          "rounded-md px-2 py-1 uppercase tracking-wider transition-colors",
          lang === code
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        );
        const alt = alternatePath(pathname, code);
        if (alt) {
          return (
            <a
              key={code}
              href={alt}
              hrefLang={code}
              onClick={(e) => {
                e.preventDefault();
                if (lang !== code) void navigate({ href: alt });
              }}
              aria-current={lang === code ? "page" : undefined}
              className={className}
            >
              {code}
            </a>
          );
        }
        return articleId ? (
          <Link
            key={code}
            to="/wissen/$articleId"
            params={{ articleId }}
            search={{ lang: code }}
            onClick={() => setLang(code)}
            aria-current={lang === code ? "page" : undefined}
            className={className}
          >
            {code}
          </Link>
        ) : (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={className}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function Brand({ small = false }: { small?: boolean }) {
  const t = useT();
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={cn("brand-mark", small && "!h-[26px] !w-[26px] !text-[20px]")}>Ω</span>
      <span className="flex flex-col gap-0.5">
        <strong className={cn("leading-none tracking-[0.18em]", small ? "text-[11px]" : "text-[14px]")}>OMEGA</strong>
        <small className="font-mono text-[8.5px] tracking-wide text-dim">{t(ui.brandSub)}</small>
      </span>
    </span>
  );
}

/** Nav link that sends German readers to the German research section. */
function NavLink({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  const t = useT();
  const { lang } = useLang();
  if (item.to === "/en/research" && lang === "de") {
    return (
      <Link to="/de/forschung" onClick={onClick} className={className}>
        {t(item.label)}
      </Link>
    );
  }
  return (
    <Link to={item.to} onClick={onClick} activeOptions={{ exact: item.to === "/" }} className={className}>
      {t(item.label)}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const close = () => setOpen(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="container-omega sticky top-3 z-50 mt-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:-top-1 focus:left-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        {t(ui.skip)}
      </a>
      <div className="glass flex items-center justify-between gap-6 rounded-2xl px-4 py-2.5 pl-5">
        <Link to="/" onClick={close} aria-label="OMEGA" className="shrink-0">
          <Brand />
        </Link>

        <nav aria-label={t(ui.mainNav)} className="hidden items-center gap-[clamp(12px,1.6vw,26px)] lg:flex">
          {navigation.slice(1).map((item) => (
            <NavLink key={item.to} item={item} className="nav-link" />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-md p-1.5 text-foreground lg:hidden"
            aria-label={open ? t(ui.closeMenu) : t(ui.openMenu)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t(ui.mainNav)} className="glass mt-2 flex flex-col rounded-2xl p-2 lg:hidden">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              item={item}
              onClick={close}
              className="rounded-lg px-3.5 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:text-primary"
            />
          ))}
        </nav>
      )}
    </header>
  );
}
