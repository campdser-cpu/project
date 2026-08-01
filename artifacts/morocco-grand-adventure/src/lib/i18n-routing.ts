// ─────────────────────────────────────────────────────────────────────────────
// Localized URL routing helpers
// The active language is the FIRST path segment (e.g. /fr/tours) and is the
// single source of truth for both routing and the translation context.
// ─────────────────────────────────────────────────────────────────────────────
import { languages, type Lang } from '@/i18n/index';

/** Router base path from Vite (no trailing slash). "" for a root artifact. */
export const RAW_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const CODES = languages.map((l) => l.code) as string[];
const STORAGE_KEY = 'mga_lang';

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && CODES.includes(value);
}

/**
 * Split a raw browser pathname into its language prefix and the remaining
 * app path (leading slash, base + lang stripped). `lang` is null when the
 * path has no valid language prefix.
 */
export function parseLangPath(pathname: string): { lang: Lang | null; rest: string } {
  let p = pathname || '/';
  if (RAW_BASE && p.startsWith(RAW_BASE)) p = p.slice(RAW_BASE.length);
  if (!p.startsWith('/')) p = '/' + p;
  const seg = p.split('/')[1] ?? '';
  if (isLang(seg)) {
    const rest = p.slice(seg.length + 1); // drop "/xx"
    return { lang: seg, rest: rest.startsWith('/') ? rest : '/' + rest };
  }
  return { lang: null, rest: p };
}

/** Preferred language: saved choice → browser preference → English. */
export function preferredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch { /* no storage */ }
  try {
    const prefs = navigator.languages ?? [navigator.language];
    for (const pref of prefs) {
      const code = pref.split('-')[0];
      if (isLang(code)) return code;
    }
  } catch { /* non-browser */ }
  return 'en';
}

/** Build an absolute in-app URL for a language + app path (keeps ?query#hash). */
export function langHref(lang: Lang, rest: string, search = '', hash = ''): string {
  const clean = rest === '/' ? '' : rest;
  return `${RAW_BASE}/${lang}${clean}${search}${hash}`;
}
