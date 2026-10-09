import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const contentPath = path.join(root, 'src/data/content.ts');
const marker = 'MGA_THREE_DAY_ENRICHED_V1';

// The three-day tour's data lives in src/data/content.ts and is the approved,
// published pricing. This script used to REBUILD that block from a hard-coded
// copy whenever the marker was missing — a copy that still carried the old
// 450/690/370/310/280 ladder. That made a stray edit one build away from
// silently reverting live prices, so the copy is gone.
//
// If the marker is missing now, something has genuinely changed in the tour
// data and a human needs to look. Failing loudly is the only safe answer: this
// script must never be the thing that decides what a journey costs.
const content = fs.readFileSync(contentPath, 'utf8');
if (!content.includes(marker)) {
  throw new Error(
    '[3-day-enrichment] src/data/content.ts is missing the ' + marker + ' marker. ' +
    'Refusing to rewrite the tour block: this script no longer carries tour data or prices, ' +
    'and the published three-day pricing must come from content.ts alone. ' +
    'Check what removed the marker before rebuilding.',
  );
}

// The detail-page injection that used to run here (adding an
// isThreeDaySahara-only "Book Now · Pay Later" heading and a "confirm before
// you pay" callout to tour-detail.tsx's booking box) targeted a `t('book_now')`
// heading that no longer exists: the booking box was manually replaced by the
// shared TailorJourney component (src/components/tours/TailorJourney.tsx),
// which shows the same "confirm before you pay" trust signals — and a real
// live price from the published ladder — for every tour, not just this one.
// Re-adding a tour-specific callout here would be a step backwards from that
// universal treatment, so this injection must never run again. The marker
// constant above still gates the content.ts price-ladder check, which stays.

// fix-three-day-city-enrichment.mjs and enrich-three-day-cities.mjs are
// deliberately NOT imported. Both belonged to a one-time bootstrap that
// originally created quote-only "3-day-sahara-fes" / "3-day-sahara-agadir"
// stubs before either route had real pricing. That migration is permanently
// done: 3-day-sahara-fes was later retired and consolidated into
// 3-day-fes-merzouga-sahara, and 3-day-sahara-agadir has long carried real,
// published pricing in content.ts. enrich-three-day-cities.mjs's
// marker-missing branch is no longer safe to run — it would reintroduce the
// retired Fes tour and inject a second, stale, all-zero-priced Agadir
// object — so it must never execute again. Re-adding either import would be
// a regression.
// enrich-three-day-price-tag.mjs is deliberately NOT imported. It patched
// PriceTag.tsx at build time so a non-numeric price rendered "Request a
// quote"; PriceTag now does that itself, via hasPublishedPrice(), and returns
// the localized price_tailored string in all eleven languages instead of the
// hard-coded English the patcher injected. Re-adding it would be a
// regression, and it now throws because the promo hook it anchored on is gone.
await import('./enrich-three-day-hierarchy.mjs');
await import('./enrich-three-day-prerender.mjs');
await import('./enrich-three-day-schema.mjs');
console.log('[3-day-enrichment] Marrakech, Fes, Agadir, quote-only pricing, hierarchy, prerender and schema enrichment prepared for build.');
