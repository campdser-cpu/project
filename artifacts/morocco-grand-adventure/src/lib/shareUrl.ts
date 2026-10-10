// ─────────────────────────────────────────────────────────────────────────────
// Builds the exact absolute, canonical URL for a given route — reusing
// langHref() (src/lib/i18n-routing.ts), the same path formula the router and
// language-switcher already use, so a shared link always resolves to a real
// prerendered page rather than an approximation of one.
// ─────────────────────────────────────────────────────────────────────────────
import { langHref } from './i18n-routing';
import type { Lang } from '@/i18n/index';

const SITE_ORIGIN = 'https://www.moroccograndadventure.com';

/** Absolute, shareable URL for `rest` (e.g. "/tours/3-day-sahara-marrakech") in `lang`. */
export function absoluteUrl(lang: Lang, rest: string): string {
  return `${SITE_ORIGIN}${langHref(lang, rest)}`;
}
