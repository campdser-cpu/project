// ─────────────────────────────────────────────────────────────────────────────
// Regression test for the Royal Air Maroc deep-link bug found in review: the
// search form's own airport datalist suggests values like "Marrakech (RAK)",
// but the slug builder didn't strip the "(RAK)" suffix before building the
// URL, producing a 404 on Royal Air Maroc's real site (confirmed live during
// review, then fixed). This locks that fix in place.
//
// Nothing here calls the network — these are pure string-builder assertions,
// the same kind of deterministic check as the rest of this project's
// test:deterministic suite.
// ─────────────────────────────────────────────────────────────────────────────
import assert from 'node:assert/strict';
import { royalAirMarocRouteUrl } from '../src/lib/flights/links';
import { resolveAirport, airportByIata } from '../src/data/airports';

// A plain city name and the datalist's own "(CODE)" formatted suggestion for
// the same airport must resolve to the exact same Royal Air Maroc route URL.
assert.equal(
  royalAirMarocRouteUrl('Marrakech', 'Casablanca'),
  royalAirMarocRouteUrl('Marrakech (RAK)', 'Casablanca (CMN)'),
  'a plain city name and its "(CODE)" datalist suggestion must build the same RAM URL',
);
assert.equal(
  royalAirMarocRouteUrl('Marrakech (RAK)', 'Casablanca (CMN)'),
  'https://www.royalairmaroc.com/en/flights-from-marrakech-to-casablanca',
  'Marrakech (RAK) -> Casablanca (CMN) must build the real, live-verified RAM route URL',
);

// Representative routes named in the brief, built from plain city names.
assert.equal(
  royalAirMarocRouteUrl('Marrakech', 'Casablanca'),
  'https://www.royalairmaroc.com/en/flights-from-marrakech-to-casablanca',
  'Marrakech -> Casablanca',
);
assert.equal(
  royalAirMarocRouteUrl('Casablanca', 'Ouarzazate'),
  'https://www.royalairmaroc.com/en/flights-from-casablanca-to-ouarzazate',
  'Casablanca -> Ouarzazate',
);

// The "(CODE)" suffix must never leak into the slug for either side alone.
// (Checking for "-rak-"/"-cmn-" rather than a bare substring: "marrakech"
// itself genuinely contains the letters "rak", so a naive .includes('rak')
// would be a false positive, not evidence of the bug.)
assert.ok(
  !royalAirMarocRouteUrl('Marrakech (RAK)', 'Casablanca')!.includes('marrakech-rak-'),
  'the origin slug must not contain the stripped IATA code as its own segment',
);
assert.ok(
  !royalAirMarocRouteUrl('Marrakech', 'Casablanca (CMN)')!.includes('-casablanca-cmn'),
  'the destination slug must not contain the stripped IATA code as its own segment',
);

// Accents and multi-word city names must still slugify correctly — the fix
// must not have broken what already worked.
assert.equal(
  royalAirMarocRouteUrl('Tétouan', 'Casablanca'),
  'https://www.royalairmaroc.com/en/flights-from-tetouan-to-casablanca',
  'accented city names must still normalize correctly',
);
assert.equal(
  royalAirMarocRouteUrl('Laâyoune (EUN)', 'Rabat'),
  'https://www.royalairmaroc.com/en/flights-from-laayoune-to-rabat',
  'an accented city combined with a "(CODE)" suffix must still strip correctly',
);

// A real-world phrase that merely *contains* parentheses elsewhere must not
// be mistaken for an airport-code suffix — only a trailing "(XXX)" strips.
assert.ok(
  royalAirMarocRouteUrl('New York (Newark)', 'Casablanca')!.includes('newark'),
  'a non-IATA parenthetical must not be stripped',
);

// resolveAirport must treat "City (CODE)" the same as the bare city name —
// this is the shared resolver flights.tsx uses to pick the canonical city
// name before it ever reaches the RAM link builder.
const byPlainName = resolveAirport('Marrakech');
const byCodeSuffix = resolveAirport('Marrakech (RAK)');
assert.ok(byPlainName && byCodeSuffix, 'both forms must resolve to a known airport');
assert.equal(byPlainName!.iata, 'RAK');
assert.equal(byCodeSuffix!.iata, 'RAK');
assert.equal(byPlainName!.city, byCodeSuffix!.city);
assert.equal(resolveAirport('OZZ')!.iata, airportByIata('OZZ')!.iata, 'a bare IATA code must resolve too');

console.log('Flight link builder tests: PASS');
