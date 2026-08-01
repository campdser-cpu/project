// Build-time helper: extract every translatable English string from the canonical
// content (src/data/content.ts) into a flat JSON structure that the translation
// step consumes. Run: npx tsx scripts/i18n-extract.ts
import { writeFileSync, mkdirSync } from 'node:fs';
import { destinations, tours, experiences, faqData } from '../src/data/content';

const categoryKeys = [...new Set(destinations.map((d) => d.category))];

const payload = {
  categories: categoryKeys,
  experiences,
  destinations: destinations.map((d) => ({
    id: d.id,
    name: d.name,
    shortDesc: d.shortDesc,
    description: d.description,
    bestTime: d.bestTime,
    region: d.region,
    highlights: d.highlights,
  })),
  tours: tours.map((t) => ({
    id: t.id,
    name: t.name,
    duration: t.duration,
    category: t.category ?? null,
    description: t.description ?? null,
    highlights: t.highlights,
    included: t.included ?? null,
    excluded: t.excluded ?? null,
    itineraryDays: (t.itineraryDays ?? []).map((day) => ({
      title: day.title,
      desc: day.desc,
      stops: day.stops,
    })),
    gallery: (t.gallery ?? []).map((g) => ({ caption: g.caption })),
    faq: (t.faq ?? []).map((f) => ({ question: f.question, answer: f.answer })),
  })),
  faq: faqData.map((f) => ({ question: f.question, answer: f.answer })),
};

mkdirSync('/tmp/mga-i18n', { recursive: true });
const json = JSON.stringify(payload, null, 2);
writeFileSync('/tmp/mga-i18n/english-content.json', json);

const size = (o: unknown) => JSON.stringify(o).length;
console.log('categories:', categoryKeys.length, categoryKeys.join(' | '));
console.log('experiences:', experiences.length, 'items,', size(experiences), 'chars');
console.log('destinations:', payload.destinations.length, 'items,', size(payload.destinations), 'chars');
console.log('tours:', payload.tours.length, 'items,', size(payload.tours), 'chars');
console.log('faq:', payload.faq.length, 'items,', size(payload.faq), 'chars');
console.log('TOTAL json bytes:', json.length);
