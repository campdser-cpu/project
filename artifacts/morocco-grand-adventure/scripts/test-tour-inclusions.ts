import assert from 'node:assert/strict';
import { tours } from '../src/data/content';
import { deriveTourInclusions } from '../src/data/tour-inclusions';
import { getLocalizedTour, registerOverlay } from '../src/i18n/content';
import fr from '../src/i18n/content/generated/fr.json';

function tour(id: string, duration: string, stops: string[], included: string[] = [], excluded: string[] = []): any {
  return {
    id,
    name: id,
    duration,
    highlights: [],
    price: '0',
    pricingTiers: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    image: '',
    itineraryDays: stops.map((stop, index) => ({
      day: index + 1,
      title: `Day ${index + 1}`,
      desc: '',
      stops: [stop],
    })),
    included,
    excluded,
  };
}

function mealState(duration: string, stops: string[], meal: 'breakfast' | 'dinner', included: string[] = [], excluded: string[] = []) {
  const id = `test-${meal}-${duration}`;
  const canonical = tour(id, duration, stops, included, excluded);
  return deriveTourInclusions(canonical, canonical).meals.map((row) => row[meal]);
}

registerOverlay('fr', fr as any);

// A–C: explicit dinner + breakfast markers at each accommodation type.
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Luxury Desert Camp (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Luxury Desert Camp (Dinner & Breakfast)'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Dades Valley (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Dades Valley (Dinner & Breakfast)'], 'breakfast'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga Hotel (Dinner & Breakfast)'], 'dinner'), ['included']);
assert.deepEqual(mealState('1 Days / 1 Nights', ['Overnight: Merzouga Hotel (Dinner & Breakfast)'], 'breakfast'), ['included']);

// D–G: missing evidence is unspecified, not an invented negative claim.
assert.deepEqual(mealState('3 Days / 2 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['unspecified', 'unspecified']);
assert.deepEqual(mealState('4 Days / 3 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['unspecified', 'unspecified', 'unspecified']);
assert.deepEqual(mealState('2 Days / 1 Nights', ['Overnight: Fes (Breakfast)'], 'dinner'), ['unspecified']);

// G–H: optional activities and explicitly excluded entry costs remain separate.
const optional = tour('optional', '2 Days / 1 Nights', ['Overnight: Marrakech'], ['Sunset camel trek'], ['Optional quad biking', 'Monument entrance fees']);
const optionalResult = deriveTourInclusions(optional, optional);
assert.ok(optionalResult.included.some((item) => item.label === 'Sunset camel trek'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Optional quad biking'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Monument entrance fees'));
assert.equal(optionalResult.notIncluded.some((item) => item.label === 'International flights'), false);

// Canonical 3-day case: two nights only; unsupported Dades meals stay unspecified,
// while the itinerary-supported desert-camp dinner remains included.
const sahara3 = tours.find((item) => item.id === '3-day-sahara-marrakech');
assert.ok(sahara3);
const sahara3Result = deriveTourInclusions(sahara3, sahara3);
assert.equal(sahara3Result.nights, 2);
assert.equal(sahara3Result.meals.length, 2);
assert.equal(sahara3Result.meals.some((row) => row.breakfast === 'not_included' || row.dinner === 'not_included'), false);
assert.equal(sahara3Result.meals.some((row) => row.place === 'Dades Valley' && row.dinner === 'unspecified'), true);
assert.equal(sahara3Result.meals.some((row) => row.camp && row.dinner === 'included'), true);

// Canonical 7-day accuracy case: exact nights, no vague dinner line, and no invented city exclusions.
const imperial = tours.find((item) => item.id === '7-day-imperial-cities-sahara-escape');
assert.ok(imperial);
const imperialResult = deriveTourInclusions(imperial, imperial);
assert.deepEqual(imperialResult.meals.map((row) => [row.place, row.breakfast, row.dinner]), [
  ['Dades Valley', 'included', 'included'],
  ['Luxury Desert Camp', 'included', 'included'],
  ['Merzouga Hotel', 'included', 'included'],
  ['Fes', 'included', 'unspecified'],
  ['Fes', 'included', 'unspecified'],
  ['Marrakech', 'included', 'unspecified'],
]);
assert.equal(imperialResult.dinnerSummary.count, 3);
assert.deepEqual(imperialResult.dinnerSummary.nights.map((row) => row.place), ['Dades Valley', 'Luxury Desert Camp', 'Merzouga Hotel']);
assert.deepEqual(imperialResult.cityDinnersExcluded, []);
assert.equal(imperialResult.included.some((item) => /Dinners as per itinerary/i.test(item.label ?? '')), false);

// Overlay pass: French stop wording must not change the factual states or specific locations.
const imperialFr = getLocalizedTour(imperial.id, 'fr');
assert.ok(imperialFr);
const imperialFrResult = deriveTourInclusions(imperial, imperialFr);
assert.deepEqual(imperialFrResult.meals.map((row) => [row.breakfast, row.dinner]), imperialResult.meals.map((row) => [row.breakfast, row.dinner]));
assert.equal(imperialFrResult.dinnerSummary.count, 3);
assert.ok(imperialFrResult.meals.some((row) => row.place.toLowerCase().includes('merzouga')));
assert.ok(imperialFrResult.meals.some((row) => row.place.toLowerCase().includes('fès') || row.place.toLowerCase().includes('fes')));

console.log('Tour inclusion regression: PASS (A–H + canonical 7-day + French overlay)');
