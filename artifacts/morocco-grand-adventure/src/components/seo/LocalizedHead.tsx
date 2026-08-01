// ─────────────────────────────────────────────────────────────────────────────
// Runtime multilingual SEO head manager.
// Keeps <title>, meta description, canonical, Open Graph/Twitter tags, and the
// full set of hreflang alternates in sync with the active language + route.
// The static English tags in index.html act as the no-JS baseline; this updates
// them in place (and adds hreflang links) once the SPA mounts.
//
// Per-page metadata (unique title + description for every route) is sourced
// from route-metadata.ts so that Google sees distinct, page-relevant tags
// instead of the homepage title on every page.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { usePathname } from 'wouter/use-browser-location';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { parseLangPath, RAW_BASE } from '@/lib/i18n-routing';
import { getRouteMeta } from './route-metadata';

const BRAND = 'Morocco Grand Adventure';

// Open Graph locale codes (Facebook-style) per language.
const OG_LOCALE: Record<string, string> = {
  en: 'en_US', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', de: 'de_DE',
  nl: 'nl_NL', pt: 'pt_PT', zh: 'zh_CN', ja: 'ja_JP', ko: 'ko_KR', ar: 'ar_AR',
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function LocalizedHead() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const { rest } = parseLangPath(pathname);

  useEffect(() => {
    const origin = window.location.origin;
    const clean = rest === '/' ? '' : rest;
    const urlFor = (code: string) => `${origin}${RAW_BASE}/${code}${clean}`;
    const currentUrl = urlFor(lang);

    // ── Per-page metadata ────────────────────────────────────────────────
    // Resolve unique title + description for this route.  For the homepage
    // we keep the localized tagline/subtext; for all other routes we use the
    // English route-metadata copy (translated content overlays can be added
    // later).  This ensures every page has a unique <title> and meta
    // description for Google indexing.
    const routeMeta = getRouteMeta(rest);
    const isHome = rest === '/' || rest === '';
    const tagline = isHome
      ? t('hero_tagline').replace(/\s+/g, ' ').trim()
      : routeMeta.title;
    const description = isHome ? t('hero_subtext') : routeMeta.description;
    const fullTitle = `${tagline} — ${BRAND}`;
    document.title = fullTitle;
    upsertMeta('name', 'description', description);

    // Canonical → current localized URL (updates the static tag in place).
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // ── Open Graph / Twitter social cards ────────────────────────────────
    upsertMeta('property', 'og:locale', OG_LOCALE[lang] ?? 'en_US');
    upsertMeta('property', 'og:url', currentUrl);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', isHome ? 'website' : 'article');
    upsertMeta('property', 'og:site_name', BRAND);
    if (routeMeta.ogImage) {
      const ogImage = `${origin}${routeMeta.ogImage}`;
      upsertMeta('property', 'og:image', ogImage);
      upsertMeta('property', 'og:image:width', '1200');
      upsertMeta('property', 'og:image:height', '630');
    }
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    if (routeMeta.ogImage) {
      upsertMeta('name', 'twitter:image', `${origin}${routeMeta.ogImage}`);
    }

    // hreflang alternates: rebuild the managed set for the current route.
    document.head.querySelectorAll('link[data-i18n-alt]').forEach((n) => n.remove());
    const frag = document.createDocumentFragment();
    const addAlt = (hreflang: string, href: string) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      link.setAttribute('data-i18n-alt', '');
      frag.appendChild(link);
    };
    for (const l of languages) addAlt(l.code, urlFor(l.code));
    addAlt('x-default', urlFor('en'));
    document.head.appendChild(frag);
    // `t` is a pure function of `lang`, so [lang, rest] fully captures the deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, rest]);

  return null;
}
