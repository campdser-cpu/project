// ─────────────────────────────────────────────────────────────────────────────
// Per-locale translation aggregator (BUILD-TIME TOOLING ONLY).
// -----------------------------------------------------------------------------
// Imported exclusively by Node tooling that needs every locale at once
// (scripts/prerender.ts, scripts/i18n-audit.ts, scripts/i18n-dump-missing.ts).
// The browser NEVER imports this module — the runtime registers only the active
// locale via `loadLocale()` in src/i18n/index.ts, so Vite stays free of this
// static import graph and every locale remains a separate, on-demand chunk.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang, TranslationSet } from '../index';
import { registerTranslations } from '../index';
import { i18nGaps } from '../gaps';
import en from './en';
import fr from './fr';
import es from './es';
import it from './it';
import de from './de';
import nl from './nl';
import pt from './pt';
import zh from './zh';
import ja from './ja';
import ko from './ko';
import ar from './ar';

const locales = { en, fr, es, it, de, nl, pt, zh, ja, ko, ar } as Record<
  Lang,
  Record<string, string>
>;

/**
 * Complete merged dictionaries for every supported locale.
 * Gap-completion keys (see ../gaps) are merged in so the audit and dump
 * tooling reflect exactly what `t()` resolves at runtime.
 */
export const allTranslations = (Object.keys(locales) as Lang[]).reduce(
  (acc, code) => {
    const gaps = i18nGaps[code];
    acc[code] = gaps ? { ...gaps, ...locales[code] } : { ...locales[code] };
    return acc;
  },
  {} as Record<Lang, Record<string, string>>,
);

/**
 * Register every locale into the shared runtime registry (prerender/audits).
 * The browser instead registers only the active locale at runtime via
 * `loadLocale()`, keeping the initial bundle free of unrelated language data.
 */
export function registerAllTranslations(): void {
  (Object.keys(allTranslations) as Lang[]).forEach((code) =>
    registerTranslations(code, allTranslations[code] as Partial<TranslationSet>),
  );
}