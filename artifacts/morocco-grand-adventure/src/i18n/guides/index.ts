// ─────────────────────────────────────────────────────────────────────────────
// Localized guide resolver.
// Merges the canonical English guide pages (src/data/seoHub.ts) with the
// per-language native overlays in ./generated/*.json, falling back to English
// for any missing string. Hub-page structure (tours, destinations, images,
// sources, related-guide slugs) always stays canonical — only display strings
// are localized.
//
// Locale code-splitting mirrors src/i18n/content: the per-language overlay
// JSON for the active locale is loaded on demand via `loadGuides(lang)`
// (browser bootstrap / language switch) or registered all-at-once by build
// tooling via `registerGuideOverlay()` (see ./overlays.ts for prerender/audit).
// English is the canonical source and has no overlay. Any locale not yet
// loaded simply falls back to English — resolving instantly with no blank state.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/i18n/index';
import { MERZOUGA_GUIDES, type HubPage } from '@/data/seoHub';
import type { GuideOverlay } from './types';

export type { GuideOverlay };

// ── Locale overlay registry ─────────────────────────────────────────────────
const guideRegistry: Partial<Record<Lang, Record<string, GuideOverlay>>> = {};

export function registerGuideOverlay(lang: Lang, data: Record<string, GuideOverlay>): void {
  guideRegistry[lang] = data;
}

function getGuideOverlay(lang: Lang, slug: string): GuideOverlay | undefined {
  return guideRegistry[lang]?.[slug];
}

/**
 * Lazy loaders, one split chunk per locale. English has no overlay (it is the
 * canonical source), so only the other 10 languages are loaded on demand.
 */
const GUIDE_LOADERS: Partial<Record<Lang, () => Promise<{ default: Record<string, GuideOverlay> }>>> = {
  fr: () => import('./generated/fr.json'),
  es: () => import('./generated/es.json'),
  it: () => import('./generated/it.json'),
  de: () => import('./generated/de.json'),
  nl: () => import('./generated/nl.json'),
  pt: () => import('./generated/pt.json'),
  zh: () => import('./generated/zh.json'),
  ja: () => import('./generated/ja.json'),
  ko: () => import('./generated/ko.json'),
  ar: () => import('./generated/ar.json'),
};

/**
 * Load (and register) the guide overlay for a single locale. English resolves
 * immediately. Idempotent — safe to call repeatedly.
 */
export async function loadGuides(lang: Lang): Promise<void> {
  if (lang === 'en' || guideRegistry[lang]) return;
  const loader = GUIDE_LOADERS[lang];
  if (!loader) return;
  const mod = await loader();
  registerGuideOverlay(lang, mod.default as Record<string, GuideOverlay>);
}

function pickText(base: string, over: string | undefined): string {
  return over != null && over !== '' ? over : base;
}

function pickParagraphs(base: string[], over: (string | undefined)[] | undefined): string[] {
  if (!over) return base;
  return base.map((b, i) => pickText(b, over[i]));
}

/**
 * Whether a native guide overlay was authored for a locale + guide slug.
 * Used by route-metadata to decide whether a guide page can show a genuinely
 * localized SEO title/description or must keep the canonical English metadata.
 */
export function guideOverlayExists(lang: Lang, slug: string): boolean {
  return !!getGuideOverlay(lang, slug);
}

/**
 * Localized alt text for an inline catalog image on a guide page.
 * Falls back to the catalog English alt when no native alt was authored.
 */
export function guideImageAlt(lang: Lang, slug: string, imageId: string, fallback: string): string {
  return getGuideOverlay(lang, slug)?.chrome?.imageAlts?.[imageId] ?? fallback;
}

/**
 * Localized label for the Merzouga guide crumb + destination cluster heading.
 * Falls back to the English label when no native label was authored.
 */
export function guideCrumb(lang: Lang, slug: string, fallback: string): string {
  const over = getGuideOverlay(lang, slug)?.chrome?.crumb;
  return over != null && over !== '' ? over : fallback;
}

/**
 * Get the localized guide page: canonical English structure merged with the
 * native overlay strings for `lang`. Falls back to the canonical page when no
 * overlay exists. Structural fields (kind, slug, ogImage, heroImage, tours,
 * destinations, relatedGuides, comparisonRows, sources, inlineImages) are
 * never localized — only display strings.
 */
export function getLocalizedGuide(slug: string, lang: Lang): HubPage | undefined {
  const base = MERZOUGA_GUIDES.find((p) => p.slug === slug);
  if (!base) return undefined;
  const o = getGuideOverlay(lang, slug);
  if (!o) return base;
  return {
    ...base,
    title: pickText(base.title, o.title),
    pageTitle: pickText(base.pageTitle, o.pageTitle),
    description: pickText(base.description, o.description),
    heroAlt: pickText(base.heroAlt, o.heroAlt),
    intro: pickText(base.intro, o.intro),
    sections: base.sections.map((sec, i) => ({
      ...sec,
      heading: pickText(sec.heading, o.sections?.[i]?.heading),
      paragraphs: pickParagraphs(sec.paragraphs, o.sections?.[i]?.paragraphs),
      bullets: sec.bullets
        ? sec.bullets.map((b, j) => pickText(b, o.sections?.[i]?.bullets?.[j]))
        : sec.bullets,
    })),
    faqs: base.faqs.map((f, i) => ({
      question: pickText(f.question, o.faqs?.[i]?.question),
      answer: pickText(f.answer, o.faqs?.[i]?.answer),
    })),
  };
}
