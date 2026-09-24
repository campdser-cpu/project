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

// D–F: breakfast-only city nights, repeated city nights, and no explicit dinner.
assert.deepEqual(mealState('3 Days / 2 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['not_included', 'not_included']);
assert.deepEqual(mealState('4 Days / 3 Nights', ['Overnight: Fes (Breakfast)', 'Overnight: Fes (Breakfast)', 'Overnight: Marrakech (Breakfast)'], 'dinner'), ['not_included', 'not_included', 'not_included']);
assert.deepEqual(mealState('2 Days / 1 Nights', ['Overnight: Fes (Breakfast)'], 'dinner'), ['not_included']);

// G–H: optional activities and explicitly excluded entry costs remain separate.
const optional = tour('optional', '2 Days / 1 Nights', ['Overnight: Marrakech'], ['Sunset camel trek'], ['Optional quad biking', 'Monument entrance fees']);
const optionalResult = deriveTourInclusions(optional, optional);
assert.ok(optionalResult.included.some((item) => item.label === 'Sunset camel trek'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Optional quad biking'));
assert.ok(optionalResult.notIncluded.some((item) => item.label === 'Monument entrance fees'));
assert.equal(optionalResult.notIncluded.some((item) => item.label === 'International flights'), false);

// Canonical 7-day accuracy case: exact nights, no vague dinner line, and specific city exclusions.
const imperial = tours.find((item) => item.id === '7-day-imperial-cities-sahara-escape');
assert.ok(imperial);
const imperialResult = deriveTourInclusions(imperial, imperial);
assert.deepEqual(imperialResult.meals.map((row) => [row.place, row.breakfast, row.dinner]), [
  ['Dades Valley', 'included', 'included'],
  ['Luxury Desert Camp', 'included', 'included'],
  ['Merzouga Hotel', 'included', 'included'],
  ['Fes', 'included', 'not_included'],
  ['Fes', 'included', 'not_included'],
  ['Marrakech', 'included', 'not_included'],
]);
assert.equal(imperialResult.dinnerSummary.count, 3);
assert.deepEqual(imperialResult.dinnerSummary.nights.map((row) => row.place), ['Dades Valley', 'Luxury Desert Camp', 'Merzouga Hotel']);
assert.deepEqual(imperialResult.cityDinnersExcluded.map((row) => row.place), ['Fes', 'Marrakech']);
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
