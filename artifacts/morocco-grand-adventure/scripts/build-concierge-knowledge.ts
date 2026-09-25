// ─────────────────────────────────────────────────────────────────────────────
// Concierge Knowledge Builder — generates api/concierge-knowledge.json.
//
// WHY THIS EXISTS
// The AI concierge (api/concierge.ts) is a Vercel serverless function that
// lives outside this workspace and is bundled without the `@/` path alias
// (that alias is defined only in vite.config.ts and this workspace's own
// tsconfig.json — api/tsconfig.json extends the repo-root base config, which
// has no `paths` entry at all). Importing src/data/tour-inclusions.ts or
// tourDepth.ts directly from api/ would therefore fail to resolve at build
// time. Instead, this script runs INSIDE the workspace (where the alias does
// resolve, via tsx picking up this workspace's tsconfig.json), reads the same
// canonical modules every tour page already uses, and writes a single flat,
// alias-free JSON file that api/concierge.ts imports as plain JSON — no
// module resolution risk, and no second hand-maintained database: every field
// below is DERIVED, never authored here.
//
// Run after any change to content.ts, tourDepth.ts, tour-inclusions.ts, or
// pricing/ladder.ts, before deploying:
//   npx tsx scripts/build-concierge-knowledge.ts
// ─────────────────────────────────────────────────────────────────────────────
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { tours, destinations, faqData, contactInfo, type Tour } from '../src/data/content';
import { deriveTourInclusions, type InclusionItem } from '../src/data/tour-inclusions';
import { tourDepthFor } from '../src/data/tourDepth';
import { getLadder, ladderPrice, supportedPartySizes } from '../src/data/pricing/ladder';
import { TOUR_DEPARTURE_CITY } from '../src/data/tour-hierarchy';
import { journeyGaps } from '../src/i18n/gaps/journey';

const EN = journeyGaps.en ?? {};

function itemText(item: InclusionItem): string {
  if (item.label) return item.label;
  const raw = item.key ? EN[item.key] ?? '' : '';
  return item.nights ? raw.split('{n}').join(String(item.nights)) : raw;
}

function groupBy(items: InclusionItem[], kind: InclusionItem['kind']): string[] {
  return items.filter((i) => i.kind === kind).map((i) => {
    const text = itemText(i);
    return i.status === 'confirmed' ? `${text} (confirmed in the written quote, not guaranteed)` : text;
  });
}

type ConciergeTourFact = {
  id: string;
  name: string;
  category?: string;
  duration: string;
  nights: number;
  startCity?: string;
  route?: string;
  private: true;
  highlights: string[];
  bestFor?: string;
  whyChoose?: string[];
  itinerary: { day: number; title: string; summary: string }[];
  transport: string[];
  accommodation: string[];
  desertExperiences: string[];
  visitsAndLandscapes: string[];
  guideAndServices: string[];
  meals: { night: number; place: string; breakfast: string; dinner: string }[];
  notIncluded: string[];
  hasQuoteDependentItems: boolean;
  pricing:
    | { published: false; note: string }
    | { published: true; currency: 'EUR'; solo?: number; perPersonByPartySize: Record<number, number>; note: string };
  faq: { question: string; answer: string }[];
};

function buildTourFact(tour: Tour): ConciergeTourFact {
  const inc = deriveTourInclusions(tour, tour);
  const depth = tourDepthFor(tour.id);
  const ladder = getLadder(tour.id);
  const perPersonByPartySize: Record<number, number> = {};
  for (const n of supportedPartySizes(tour.id)) {
    const p = ladderPrice(tour.id, n);
    if (p) perPersonByPartySize[n] = p.perPerson;
  }
  return {
    id: tour.id,
    name: tour.name,
    category: tour.category,
    duration: tour.duration,
    nights: inc.nights,
    startCity: TOUR_DEPARTURE_CITY[tour.id],
    route: tour.routeCaption,
    private: true,
    highlights: tour.highlights,
    bestFor: depth.bestFor || undefined,
    whyChoose: depth.whyChoose.length ? depth.whyChoose : undefined,
    itinerary: (tour.itineraryDays ?? []).map((d) => ({ day: d.day, title: d.title, summary: d.desc })),
    transport: groupBy(inc.included, 'transport'),
    accommodation: groupBy(inc.included, 'stay'),
    desertExperiences: groupBy(inc.included, 'experience'),
    visitsAndLandscapes: groupBy(inc.included, 'landscape'),
    guideAndServices: groupBy(inc.included, 'service'),
    meals: inc.meals.map((m) => ({ night: m.night, place: m.place, breakfast: m.breakfast, dinner: m.dinner })),
    notIncluded: inc.notIncluded.map((i) => itemText(i)),
    hasQuoteDependentItems: inc.hasConfirmed,
    pricing: ladder
      ? {
          published: true,
          currency: 'EUR',
          solo: ladder.solo,
          perPersonByPartySize,
          note: 'Per-person price in EUR by party size. Larger groups outside the listed range, or party sizes not listed, are quote-only.',
        }
      : { published: false, note: 'No published starting price for this route; the total is confirmed with the traveler’s dates and party size before booking.' },
    faq: tour.faq ?? [],
  };
}

const knowledge = {
  generatedAt: new Date().toISOString(),
  contact: contactInfo,
  tours: tours.map(buildTourFact),
  destinations: destinations.map((d) => ({ id: d.id, name: d.name, category: d.category, shortDesc: d.shortDesc, region: d.region, bestTime: d.bestTime })),
  generalFaq: faqData,
};

const outPath = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../api/concierge-knowledge.json');
writeFileSync(outPath, JSON.stringify(knowledge, null, 2) + '\n', 'utf8');
console.log(`[concierge-knowledge] wrote ${knowledge.tours.length} tours, ${knowledge.destinations.length} destinations to ${outPath}`);
