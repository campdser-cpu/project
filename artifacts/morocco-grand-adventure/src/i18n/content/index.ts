// ─────────────────────────────────────────────────────────────────────────────
// Localized content resolver.
// Merges the canonical English content (src/data/content.ts) with per-language
// overlays, falling back to English for any missing string. `category` on
// destinations stays canonical-English (it is a logic key for filters/colors);
// use `categoryLabel()` for its localized display text.
//
// Locale code-splitting: the per-language overlay JSON for the active locale is
// loaded on demand via `loadContent(lang)` (browser bootstrap / language switch)
// or registered all-at-once by build tooling via `registerOverlay()` (see
// ./overlays.ts → registerAllContentOverlays for prerender/audit). English is
// the canonical source and therefore has no overlay. Any locale not yet loaded
// simply falls back to English — resolving instantly with no blank state.
// ─────────────────────────────────────────────────────────────────────────────
import {
  tours as toursEN,
  destinations as destinationsEN,
  faqData as faqEN,
  experiences as experiencesEN,
  type Tour,
  type Destination,
} from '@/data/content';
import type { Lang } from '@/i18n/index';
import type { ContentOverlay } from './types';

// ── Locale overlay registry ─────────────────────────────────────────────────
const overlayRegistry: Partial<Record<Lang, ContentOverlay>> = {};

export function registerOverlay(lang: Lang, data: ContentOverlay): void {
  overlayRegistry[lang] = data;
}

function getOverlay(lang: Lang): ContentOverlay | undefined {
  return overlayRegistry[lang];
}

/**
 * Lazy loaders, one split chunk per locale. English has no overlay (it is the
 * canonical source), so only the other 10 languages are loaded on demand.
 */
const OVERLAY_LOADERS: Partial<Record<Lang, () => Promise<{ default: ContentOverlay }>>> = {
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
 * Load (and register) the content overlay for a single locale. English is the
 * base, so it resolves immediately. Idempotent — safe to call repeatedly.
 */
export async function loadContent(lang: Lang): Promise<void> {
  if (lang === 'en' || overlayRegistry[lang]) return;
  const loader = OVERLAY_LOADERS[lang];
  if (!loader) return;
  const mod = await loader();
  registerOverlay(lang, mod.default as ContentOverlay);
}

function pickText(base: string, over: string | undefined): string {
  return over != null && over !== '' ? over : base;
}

function pickArr(base: string[], over: (string | undefined)[] | undefined): string[] {
  if (!over) return base;
  return base.map((b, i) => pickText(b, over[i]));
}

export function localizeDestination(d: Destination, lang: Lang): Destination {
  const o = getOverlay(lang)?.destinations?.[d.id];
  if (!o) return d;
  return {
    ...d,
    name: pickText(d.name, o.name),
    shortDesc: pickText(d.shortDesc, o.shortDesc),
    description: pickText(d.description, o.description),
    bestTime: pickText(d.bestTime, o.bestTime),
    region: pickText(d.region, o.region),
    highlights: pickArr(d.highlights, o.highlights),
    // category intentionally left canonical (English) — it is a logic key
  };
}

export function localizeTour(tour: Tour, lang: Lang): Tour {
  const o = getOverlay(lang)?.tours?.[tour.id];
  if (!o) return tour;
  return {
    ...tour,
    name: pickText(tour.name, o.name),
    duration: pickText(tour.duration, o.duration),
    category: tour.category ? pickText(tour.category, o.category) : tour.category,
    description: tour.description ? pickText(tour.description, o.description) : tour.description,
    routeCaption: tour.routeCaption ? pickText(tour.routeCaption, o.routeCaption) : tour.routeCaption,
    highlights: pickArr(tour.highlights, o.highlights),
    included: tour.included ? pickArr(tour.included, o.included) : tour.included,
    excluded: tour.excluded ? pickArr(tour.excluded, o.excluded) : tour.excluded,
    itineraryDays: tour.itineraryDays?.map((day, i) => ({
      ...day,
      title: pickText(day.title, o.itineraryDays?.[i]?.title),
      desc: pickText(day.desc, o.itineraryDays?.[i]?.desc),
      stops: pickArr(day.stops, o.itineraryDays?.[i]?.stops),
    })),
    gallery: tour.gallery?.map((g, i) => ({
      ...g,
      caption: pickText(g.caption, o.gallery?.[i]?.caption),
    })),
    faq: tour.faq?.map((f, i) => ({
      question: pickText(f.question, o.faq?.[i]?.question),
      answer: pickText(f.answer, o.faq?.[i]?.answer),
    })),
  };
}

export function getLocalizedTours(lang: Lang): Tour[] {
  return toursEN.map((t) => localizeTour(t, lang));
}

export function getLocalizedTour(id: string, lang: Lang): Tour | undefined {
  const lookUp = id.trim().toLowerCase();
  const base = toursEN.find((t) => t.id === lookUp || t.aliases?.some((a) => a.toLowerCase() === lookUp));
  return base ? localizeTour(base, lang) : undefined;
}

export function getLocalizedDestinations(lang: Lang): Destination[] {
  return destinationsEN.map((d) => localizeDestination(d, lang));
}

export function getLocalizedDestination(id: string, lang: Lang): Destination | undefined {
  const base = destinationsEN.find((d) => d.id === id);
  return base ? localizeDestination(base, lang) : undefined;
}

export function getLocalizedFaq(lang: Lang): { question: string; answer: string }[] {
  const o = getOverlay(lang)?.faq;
  return faqEN.map((f, i) => ({
    question: pickText(f.question, o?.[i]?.question),
    answer: pickText(f.answer, o?.[i]?.answer),
  }));
}

export function getLocalizedExperiences(lang: Lang): string[] {
  return pickArr(experiencesEN, getOverlay(lang)?.experiences);
}

/** Localized display label for a canonical-English category key. */
export function categoryLabel(cat: string, lang: Lang): string {
  return getOverlay(lang)?.categories?.[cat] ?? cat;
}