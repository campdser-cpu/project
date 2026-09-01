import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { navigate } from 'wouter/use-browser-location';
import { type Lang, languages, t as translate, loadLocale } from '../i18n/index';
import { loadContent } from '../i18n/content';
import { parseLangPath, langHref, localizeInternalHref } from '../lib/i18n-routing';

export type { Lang };
export { languages };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Parameters<typeof translate>[1]) => string;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en', setLang: () => {}, t: (key) => key as string, isRTL: false,
});

const STORAGE_KEY = 'mga_lang';

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const isRTL = languages.find((l) => l.code === lang)?.dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, [lang, isRTL]);

  useEffect(() => {
    loadLocale(lang);
    loadContent(lang);
  }, [lang]);

  // Keep every internal anchor in the active language, including links from
  // legacy components that still use canonical paths such as /about or /tours.
  useEffect(() => {
    const rewrite = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (!href) return;
        const localized = localizeInternalHref(href, lang);
        if (localized !== href) a.setAttribute('href', localized);
      });
    };
    rewrite();
    const observer = new MutationObserver(rewrite);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = async (newLang: Lang) => {
    if (newLang === lang) return;
    const { rest } = parseLangPath(window.location.pathname);
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch {}
    await Promise.all([loadLocale(newLang), loadContent(newLang)]);
    navigate(langHref(newLang, rest, window.location.search, window.location.hash));
  };

  const tFn = (key: Parameters<typeof translate>[1]) => translate(lang, key);
  return <LanguageContext.Provider value={{ lang, setLang, t: tFn, isRTL }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
