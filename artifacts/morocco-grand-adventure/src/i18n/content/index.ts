// ─────────────────────────────────────────────────────────────────────────────
// Localized content resolver.
// Merges the canonical English content (src/data/content.ts) with per-language
// overlays, falling back to English for any missing string. `category` on
// destinations stays canonical-English (it is a logic key for filters/colors);
// use `categoryLabel()` for its localized display text.
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
import { contentOverlays } from './overlays';

function pickText(base: string, over: string | undefined): string {
  return over != null && over !== '' ? over : base;
}

function pickArr(base: string[], over: (string | undefined)[] | undefined): string[] {
  if (!over) return base;
  return base.map((b, i) => pickText(b, over[i]));
}

export function localizeDestination(d: Destination, lang: Lang): Destination {
  const o = contentOverlays[lang]?.destinations?.[d.id];
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
  const o = contentOverlays[lang]?.tours?.[tour.id];
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
  const o = contentOverlays[lang]?.faq;
  return faqEN.map((f, i) => ({
    question: pickText(f.question, o?.[i]?.question),
    answer: pickText(f.answer, o?.[i]?.answer),
  }));
}

export function getLocalizedExperiences(lang: Lang): string[] {
  return pickArr(experiencesEN, contentOverlays[lang]?.experiences);
}

/** Localized display label for a canonical-English category key. */
export function categoryLabel(cat: string, lang: Lang): string {
  return contentOverlays[lang]?.categories?.[cat] ?? cat;
}
