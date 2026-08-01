import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { navigate } from 'wouter/use-browser-location';
import { type Lang, languages, t as translate } from '../i18n/index';
import { parseLangPath, langHref } from '../lib/i18n-routing';

export type { Lang };
export { languages };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Parameters<typeof translate>[1]) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key as string,
  isRTL: false,
});

const STORAGE_KEY = "mga_lang";

/**
 * Language is derived from the URL (`/fr/...`) — the single source of truth —
 * and passed in by the router. Switching language navigates to the same page
 * under the new prefix (instant, no reload) and is remembered in localStorage.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const isRTL = languages.find((l) => l.code === lang)?.dir === "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ok */ }
  }, [lang, isRTL]);

  const setLang = (newLang: Lang) => {
    if (newLang === lang) return;
    const { rest } = parseLangPath(window.location.pathname);
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch { /* ok */ }
    navigate(langHref(newLang, rest, window.location.search, window.location.hash));
  };

  const tFn = (key: Parameters<typeof translate>[1]) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tFn, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
