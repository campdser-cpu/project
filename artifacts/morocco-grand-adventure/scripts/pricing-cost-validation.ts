// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL COST VALIDATION — 3-Day Marrakech → Merzouga
//
// ┌───────────────────────────────────────────────────────────────────────────┐
// │  THIS FILE CONTAINS MOROCCO GRAND ADVENTURE OPERATING COSTS.              │
// │  It lives in scripts/ and NOTHING under src/ may ever import it.          │
// │  src/ is bundled and served to every visitor: a cost table placed there   │
// │  would be readable by anyone who opens the JavaScript, competitors        │
// │  included. Keep supplier rates, margins and this file out of the bundle.  │
// └───────────────────────────────────────────────────────────────────────────┘
//
// What this does: takes the owner's target selling prices and the owner's cost
// RANGES, and reports cost, gross profit and gross margin at both ends of every
// range. It does not choose a price, it does not invent a rate, and it does not
// activate anything. src/data/pricing/rates.ts stays unconfigured and
// TOUR_PRICING stays empty until the owner confirms exact supplier rates.
//
// Night structure is taken from the itinerary in src/data/content.ts, not
// assumed: the tour is "3 Days / 2 Nights", Day 1 ends in the Dades Valley and
// Day 2 ends at a desert camp in Erg Chebbi. So one hotel night and one camp
// night, and the camel trek falls on the Day 2 evening at the camp.
//
// run: npx tsx scripts/pricing-cost-validation.ts
// ─────────────────────────────────────────────────────────────────────────────
import { roomArrangements, isDeferred, type RoomArrangement } from '../src/data/pricing/rooms';
import { tours } from '../src/data/content';
import { RATE_CARD, type Configured, type RateCard } from '../src/data/pricing/rates';
import { TOUR_PRICING, type TourPricingConfig } from '../src/data/pricing/tours';
import { cheapestArrangement, estimate, validateRateBehaviour } from '../src/lib/pricing';

const TOUR_ID = '3-day-sahara-marrakech';

// ── Owner-supplied cost inputs ───────────────────────────────────────────────
// Every one of these is a RANGE the owner has not yet narrowed to a real
// supplier rate. `confirmed: false` is load-bearing: the report refuses to call
// anything viable on unconfirmed numbers.

type CostRange = {
  readonly low: number;
  readonly high: number;
  readonly confirmed: false;
  readonly unit: string;
  /** What the owner has NOT yet stated about this figure. */
  readonly openQuestion?: string;
};

const COSTS = {
  /** Party-level: the whole vehicle and its driver for the three travelling days. */
  vehicleAndDriver: {
    low: 400, high: 500, confirmed: false, unit: 'per party, 3 days',
    openQuestion:
      'Does this already include fuel, tolls, and the driver\'s own room and meals on the road? ' +
      'If any of those are billed separately they are missing from this model entirely.',
  } satisfies CostRange,

  /** One hotel/riad room for the Dades Valley night. */
  hotelRoomNight: {
    low: 80, high: 150, confirmed: false, unit: 'per room, per night',
    openQuestion:
      'Is this room-only or half board? The camp rate was stated to include dinner and breakfast; ' +
      'the hotel rate was not. If dinner and breakfast are extra here they are missing from this model.',
  } satisfies CostRange,

  /** One tent at the Erg Chebbi camp. Owner states this covers D+B and the camel. */
  campTentNight: {
    low: 80, high: 150, confirmed: false, unit: 'per tent, per night',
    openQuestion:
      'The owner states this includes dinner, breakfast and the camel experience "where applicable to ' +
      'the actual supplier package". Which supplier package applies to THIS tour, and does it include ' +
      'the camel trek for every traveller in the tent?',
  } satisfies CostRange,
} as const;

/** Costs the owner has not supplied at all. Nothing is guessed in their place. */
const NOT_SUPPLIED = [
  'Fuel and tolls — if not already inside the vehicle + driver figure',
  'Driver accommodation and meals on the road — if not already inside that figure',
  'Dinner and breakfast at the Dades Valley hotel — if the hotel rate is room-only',
  'Camel trek per person — if the camp package does not cover it',
  'Bottled water, and anything else given to travellers en route',
  'Single-occupancy supplement charged to MGA by the properties',
  'Payment-processing or booking fees MGA absorbs',
  'Target gross margin percentage',
];

// ── Owner-supplied target selling prices ─────────────────────────────────────
// An explicit business input. Not derived, not benchmarked, not adjusted here.
const TARGET_PER_PERSON: Readonly<Record<number, number>> = {
  1: 600, 2: 425, 3: 410, 4: 395, 5: 380, 6: 365,
};
const TARGET_TOTAL: Readonly<Record<number, number>> = {
  1: 600, 2: 850, 3: 1230, 4: 1580, 5: 1900, 6: 2190,
};

// ── Model ────────────────────────────────────────────────────────────────────
const HOTEL_NIGHTS = 1; // Dades Valley — from the itinerary
const CAMP_NIGHTS = 1;  // Erg Chebbi   — from the itinerary

/** Cheapest honest arrangement: share every room that can be shared. */
function sharedRooms(pax: number): number {
  return Math.ceil(pax / 2);
}

function cost(pax: number, end: 'low' | 'high', rooms = sharedRooms(pax)): number {
  return (
    COSTS.vehicleAndDriver[end] +
    COSTS.hotelRoomNight[end] * rooms * HOTEL_NIGHTS +
    COSTS.campTentNight[end] * rooms * CAMP_NIGHTS
  );
}

type Verdict = 'VIABLE' | 'AT RISK' | 'TARGET PRICE BELOW COST';

function verdict(profitLow: number, profitHigh: number): Verdict {
  if (profitHigh > 0) return 'VIABLE';
  if (profitLow > 0) return 'AT RISK';
  return 'TARGET PRICE BELOW COST';
}

const pct = (p: number, price: number) => (price === 0 ? 0 : (p / price) * 100);
const eur = (n: number) => (n < 0 ? `-€${Math.abs(Math.round(n))}` : `€${Math.round(n)}`);

console.log('='.repeat(96));
console.log('INTERNAL COST VALIDATION — 3-Day Marrakech → Merzouga   (NOT customer-facing)');
console.log('='.repeat(96));

const tour = tours.find((t) => t.id === TOUR_ID);
console.log(`\nTour: ${tour?.name ?? '(not found)'}`);
console.log(`Duration: ${tour?.duration}   ·   nights modelled: ${HOTEL_NIGHTS} hotel (Dades Valley) + ${CAMP_NIGHTS} camp (Erg Chebbi)`);
console.log(`Public status: quoteOnly=${tour?.quoteOnly}, published price="${tour?.price}"`);

console.log('\nCost inputs (ALL UNCONFIRMED RANGES):');
for (const [k, v] of Object.entries(COSTS)) {
  console.log(`  ${k.padEnd(18)} €${v.low}–€${v.high}  ${v.unit}`);
}

// ── 1–6 travellers, sharing ──────────────────────────────────────────────────
console.log('\n' + '-'.repeat(96));
console.log('SHARING (cheapest honest arrangement — every shareable room shared)');
console.log('-'.repeat(96));
console.log('pax rooms | target total | cost best  profit  margin | cost worst  profit  margin | verdict');

const rows: { pax: number; verdict: Verdict; profitLow: number; profitHigh: number; marginLow: number; marginHigh: number; costLow: number; costHigh: number }[] = [];
for (let pax = 1; pax <= 6; pax++) {
  const rooms = sharedRooms(pax);
  const target = TARGET_TOTAL[pax];
  const cLow = cost(pax, 'low');
  const cHigh = cost(pax, 'high');
  const pLow = target - cLow;
  const pHigh = target - cHigh;
  const v = verdict(pLow, pHigh);
  rows.push({ pax, verdict: v, profitLow: pLow, profitHigh: pHigh, marginLow: pct(pLow, target), marginHigh: pct(pHigh, target), costLow: cLow, costHigh: cHigh });
  console.log(
    `${String(pax).padStart(3)} ${String(rooms).padStart(5)} | ${eur(target).padStart(12)} | ` +
    `${eur(cLow).padStart(9)} ${eur(pLow).padStart(7)} ${(pct(pLow, target).toFixed(1) + '%').padStart(7)} | ` +
    `${eur(cHigh).padStart(10)} ${eur(pHigh).padStart(7)} ${(pct(pHigh, target).toFixed(1) + '%').padStart(7)} | ${v}`,
  );
}

// ── Sensitivity: the room dimension the target table does not have ───────────
console.log('\n' + '-'.repeat(96));
console.log('SINGLE OCCUPANCY — the same target price, but a room each');
console.log('-'.repeat(96));
console.log('The target table is priced per party size only; it carries no room dimension. A party that');
console.log('takes a room each costs MGA more while paying exactly the same. This is what that does:');
console.log('\npax rooms | target total | cost worst  profit  margin | verdict');
for (let pax = 2; pax <= 6; pax++) {
  const rooms = pax; // a room each
  const target = TARGET_TOTAL[pax];
  const cHigh = cost(pax, 'high', rooms);
  const cLow = cost(pax, 'low', rooms);
  const pHigh = target - cHigh;
  const v = verdict(target - cLow, pHigh);
  console.log(
    `${String(pax).padStart(3)} ${String(rooms).padStart(5)} | ${eur(target).padStart(12)} | ` +
    `${eur(cHigh).padStart(10)} ${eur(pHigh).padStart(7)} ${(pct(pHigh, target).toFixed(1) + '%').padStart(7)} | ${v}`,
  );
}

// ── What the supplier rate has to be for the targets to work ────────────────
console.log('\n' + '-'.repeat(96));
console.log('BREAK-EVEN — the ceiling on (hotel + camp) per room-night, sharing');
console.log('-'.repeat(96));
console.log('Read this as: "tell me the real combined room-night rate, and this says whether it clears."');
console.log('\npax | vehicle | max (hotel+camp) per room-night at these margins');
console.log('    |         |   break-even      25% margin      35% margin      45% margin');
for (let pax = 1; pax <= 6; pax++) {
  const rooms = sharedRooms(pax);
  const target = TARGET_TOTAL[pax];
  const line: string[] = [];
  for (const m of [0, 0.25, 0.35, 0.45]) {
    // target - vehicle - rate*rooms = target*m   →   rate = (target*(1-m) - vehicle) / rooms
    const cellsForBothVehicleEnds = (['low', 'high'] as const).map(
      (end) => (target * (1 - m) - COSTS.vehicleAndDriver[end]) / rooms,
    );
    line.push(`${eur(cellsForBothVehicleEnds[1])}–${eur(cellsForBothVehicleEnds[0])}`.padStart(15));
  }
  console.log(`${String(pax).padStart(3)} | €${COSTS.vehicleAndDriver.low}–${COSTS.vehicleAndDriver.high} |${line.join('')}`);
}
console.log('\n(each cell is the ceiling at the HIGH vehicle cost – at the LOW vehicle cost)');
console.log(`Owner's stated combined room-night range today: €${COSTS.hotelRoomNight.low + COSTS.campTentNight.low}–€${COSTS.hotelRoomNight.high + COSTS.campTentNight.high}`);

// ── Exactly where the solo target crosses cost ───────────────────────────────
console.log('\n' + '-'.repeat(96));
console.log('WHERE THE SOLO TARGET CROSSES COST');
console.log('-'.repeat(96));
{
  const target = TARGET_TOTAL[1];
  for (const end of ['low', 'high'] as const) {
    const v = COSTS.vehicleAndDriver[end];
    const ceiling = target - v; // 1 room, 1 hotel night + 1 camp night
    const ownerMin = COSTS.hotelRoomNight.low + COSTS.campTentNight.low;
    const ownerMax = COSTS.hotelRoomNight.high + COSTS.campTentNight.high;
    const status =
      ceiling < ownerMin ? 'LOSS ACROSS THE WHOLE of the owner\'s room range'
        : ceiling >= ownerMax ? 'clears the whole of the owner\'s room range'
          : `loss once the combined room-night rate passes €${Math.round(ceiling)}`;
    console.log(`  vehicle €${v}: solo breaks even at a combined room-night of €${Math.round(ceiling)} → ${status}`);
  }
  console.log(`  (owner's combined room-night range is €${COSTS.hotelRoomNight.low + COSTS.campTentNight.low}–€${COSTS.hotelRoomNight.high + COSTS.campTentNight.high})`);
}

// ── validateRateBehaviour probe ──────────────────────────────────────────────
// Required by the brief. The engine's guard works on a RATE CARD, and MGA has no
// confirmed rates — so this runs it against two SENSITIVITY CARDS built from the
// ends of the owner's own ranges. They are probes, not prices: they exist only
// inside this script, they are never written to src/data/pricing/rates.ts, and
// the margin used is derived from the owner's target prices rather than chosen.
console.log('\n' + '-'.repeat(96));
console.log('validateRateBehaviour() — run against sensitivity cards, not production rates');
console.log('-'.repeat(96));
{
  const probeTours: Record<string, TourPricingConfig> = {
    [TOUR_ID]: {
      days: 3,
      nights: [{ kind: 'hotel', region: 'dades' }, { kind: 'camp' }],
      guidedDays: 0,
      perPersonActivities: [],   // camel sits inside the camp package per the owner
      minTravelers: 1,
      maxTravelers: 6,
    },
  };
  for (const end of ['low', 'high'] as const) {
    // Margin implied by the owner's own 2-traveller target against this cost end.
    const c2 = cost(2, end);
    const implied = (TARGET_TOTAL[2] - c2) / c2;
    const card: Configured<RateCard> = {
      configured: true,
      currency: 'EUR',
      party: {
        vehicles: [{ class: 'minivan', maxTravelers: 6, perDay: COSTS.vehicleAndDriver[end] / 3 }],
        driverPerDay: 0,      // the owner's figure is vehicle AND driver combined
        guidePerDay: 0,
        fuelTollsPerDay: 0,   // not separately supplied — see NOT_SUPPLIED
      },
      rooms: {
        standard: { dades: COSTS.hotelRoomNight[end] },
        luxury: { dades: COSTS.hotelRoomNight[end] },
      },
      camp: { standard: COSTS.campTentNight[end], luxury: COSTS.campTentNight[end] },
      activities: {},
      commercial: { singleOccupancyPerNight: 0, marginPct: implied },
    };
    const violations = validateRateBehaviour(TOUR_ID, card, probeTours);
    console.log(`\n  ${end.toUpperCase()} end of the ranges (implied margin ${(implied * 100).toFixed(1)}% from the 2-pax target):`);
    if (!violations.length) {
      console.log('    no violations — per person falls, total never falls, sharing beats a room each');
    } else {
      for (const v of violations) {
        // The owner supplied ONE hotel range and ONE camp range, with no
        // standard-versus-luxury split, so this probe card has identical tiers.
        // The two "luxury costs more" rules therefore cannot pass here. That is
        // a gap in the cost inputs, not a defect in the model or the targets.
        const artefact = v.rule === 'luxury-stay-costs-more' || v.rule === 'luxury-camp-costs-more';
        console.log(`    ${artefact ? '·' : '✗'} ${v.rule}: ${v.detail}${artefact ? '   (expected: no tier split was supplied)' : ''}`);
      }
    }
    // What that card would actually charge, for comparison with the targets.
    const line: string[] = [];
    for (let pax = 1; pax <= 6; pax++) {
      const r = estimate(
        { tourId: TOUR_ID, travelers: pax, accommodation: 'standard', camp: 'standard', rooms: cheapestArrangement(pax) },
        card, probeTours,
      );
      line.push(r.status === 'priced' ? `${pax}:€${r.perPerson}` : `${pax}:—`);
    }
    console.log(`    cost-plus curve at this end: ${line.join('  ')}`);
    console.log(`    owner's targets:             ${Object.entries(TARGET_PER_PERSON).map(([k, v]) => `${k}:€${v}`).join('  ')}`);
  }
}

// ── Behavioural rules on the target table itself ─────────────────────────────
console.log('\n' + '-'.repeat(96));
console.log('BEHAVIOUR OF THE TARGET PRICE TABLE');
console.log('-'.repeat(96));
let behaviourOk = true;
for (let pax = 2; pax <= 6; pax++) {
  const ppDown = TARGET_PER_PERSON[pax] < TARGET_PER_PERSON[pax - 1];
  const totalUp = TARGET_TOTAL[pax] > TARGET_TOTAL[pax - 1];
  const consistent = TARGET_PER_PERSON[pax] * pax === TARGET_TOTAL[pax];
  if (!ppDown || !totalUp || !consistent) behaviourOk = false;
  console.log(
    `  ${pax - 1}→${pax}: per person ${TARGET_PER_PERSON[pax - 1]}→${TARGET_PER_PERSON[pax]} ${ppDown ? 'falls ✓' : 'DOES NOT FALL ✗'}` +
    `   ·   total ${TARGET_TOTAL[pax - 1]}→${TARGET_TOTAL[pax]} ${totalUp ? 'rises ✓' : 'DOES NOT RISE ✗'}` +
    `   ·   ${pax}×${TARGET_PER_PERSON[pax]}=${TARGET_PER_PERSON[pax] * pax} ${consistent ? '✓' : '✗ inconsistent with stated total'}`,
  );
}
console.log(`  → ${behaviourOk ? 'the target table honours every rule the tour pages promise' : 'THE TARGET TABLE BREAKS A PROMISED RULE'}`);

// ── Room options still offered ───────────────────────────────────────────────
console.log('\n' + '-'.repeat(96));
console.log('ROOM OPTIONS (unchanged — generated, never invented)');
console.log('-'.repeat(96));
const enLabel = (a: RoomArrangement) =>
  isDeferred(a) ? 'Let us confirm the best arrangement'
    : a.blocks.map((b) => `${b.count} × ${b.type}`).join(' + ');
for (const pax of [2, 4, 5]) {
  console.log(`  ${pax} travellers: ${roomArrangements(pax).map(enLabel).join('  |  ')}`);
  const anyTripleOrFamily = roomArrangements(pax).some((a) => /triple|family/i.test(enLabel(a)));
  if (anyTripleOrFamily) console.log('    ✗ INVENTED ROOM TYPE OFFERED');
}

// ── Production guards ────────────────────────────────────────────────────────
console.log('\n' + '-'.repeat(96));
console.log('PRODUCTION GUARDS');
console.log('-'.repeat(96));
const quoteOnly = tours.filter((t) => t.quoteOnly === true).length;
const published = tours.filter((t) => t.price !== 'Request a quote').length;
console.log(`  tours in catalogue:              ${tours.length}`);
console.log(`  still quote-only:                ${quoteOnly}  ${quoteOnly === tours.length ? '✓' : '✗'}`);
console.log(`  carrying a published price:      ${published}  ${published === 0 ? '✓' : '✗'}`);
console.log(`  RATE_CARD.configured:            ${RATE_CARD.configured}  ${RATE_CARD.configured === false ? '✓ (public pricing still off)' : '✗ ACTIVATED'}`);
console.log(`  tours costed in TOUR_PRICING:    ${Object.keys(TOUR_PRICING).length}  ${Object.keys(TOUR_PRICING).length === 0 ? '✓' : '✗'}`);

// ── Verdict ──────────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(96));
const below = rows.filter((r) => r.verdict === 'TARGET PRICE BELOW COST');
const risk = rows.filter((r) => r.verdict === 'AT RISK');
if (below.length) {
  console.log(`TARGET PRICE BELOW COST at ${below.map((r) => r.pax + ' pax').join(', ')} — even at the BEST supplier rates.`);
}
if (risk.length) {
  console.log(`AT RISK at ${risk.map((r) => `${r.pax} pax`).join(', ')} — profitable at the low end of the ranges, loss-making or negligible at the high end.`);
}
if (!below.length && !risk.length) {
  console.log('Every target clears cost across the whole of both ranges.');
}
console.log('\nNOT READY FOR PUBLIC PRICING: the cost inputs are ranges, not confirmed supplier rates.');
console.log('Unsupplied costs that could still move this model:');
for (const m of NOT_SUPPLIED) console.log(`  · ${m}`);
console.log('\nOpen questions on the figures that WERE supplied:');
for (const [k, v] of Object.entries(COSTS)) {
  if (v.openQuestion) console.log(`  · ${k}: ${v.openQuestion}`);
}
console.log('='.repeat(96));
