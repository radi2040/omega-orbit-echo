import { useRouterState } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "de";
/** A bilingual string. English is the primary language; German is the alternate. */
export type L = { en: string; de: string };

const STORAGE_KEY = "omega-lang";

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {} });

/** Language fixed by a /en/… or /de/… URL (the bilingual research section). */
export function langFromPath(pathname: string): Lang | undefined {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [stored, setLangState] = useState<Lang>("en");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Language-prefixed routes decide the language themselves, so SSR renders the right one.
  const fromUrl = langFromPath(pathname);
  const lang = fromUrl ?? stored;

  // Remember a language chosen through the URL for the rest of the site.
  useEffect(() => {
    if (fromUrl) {
      setLangState(fromUrl);
      window.localStorage.setItem(STORAGE_KEY, fromUrl);
    }
  }, [fromUrl]);

  // Read the stored preference after hydration so server and client markup match.
  useEffect(() => {
    if (langFromPath(window.location.pathname)) return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "de" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Returns a translator for bilingual strings in the active language. */
export function useT() {
  const { lang } = useLang();
  return useCallback((value: L) => value[lang], [lang]);
}

export const l = (en: string, de: string): L => ({ en, de });
