// ─────────────────────────────────────────────────────────────────────────────
// English gap layer — the ONLY gap module bundled eagerly.
// -----------------------------------------------------------------------------
// `gaps/index.ts` aggregates all eleven locales (about2.ts alone is ~117 KB, and
// the whole gap graph is ~377 KB of source). Statically importing that from
// src/i18n/index.ts pulled every language's gap data into the initial chunk,
// which is exactly what `loadLocale()` already avoids for locales/*.
//
// English cannot be deferred: the homepage and navbar render gap-only keys
// (st_home_h2, st_home_body, st_nav_sub, …) that are absent from locales/en.ts,
// so deferring them would paint raw key names. This module therefore carries
// just the English gap completions; every other locale's gap data is fetched on
// demand alongside its locale chunk (see `loadLocale`).
// ─────────────────────────────────────────────────────────────────────────────
import { guideGaps } from './guides';
import { studentToursEnGaps } from './student-tours';
import { pricingGaps } from './pricing';
import { discoveryGaps } from './discovery';
import { trustGaps } from './trust';

/** English gap completions: keys authored in the gap layer, absent from locales/en.ts. */
export const enGaps: Record<string, string> = {
  ...guideGaps.en,
  ...studentToursEnGaps,
  ...pricingGaps.en,
  ...discoveryGaps.en,
  ...trustGaps.en,
};
