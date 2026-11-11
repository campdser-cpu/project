# Phase 8 — MGA URL Architecture Inventory

**Scope:** Research-only inventory of all current indexable URL patterns of `moroccograndadventure.com`, derived from the repository (`scripts/prerender.ts`, `src/data/*`, `src/i18n/*`) and the generated production output (`dist/sitemap.xml`, 1503 HTML files, 1496 sitemap URLs).

**Data provenance:** repository source (verified) | production build output (verified) | GSC: NOT AVAILABLE | Ahrefs: NOT AVAILABLE

---

## 1. Global architecture summary

- Total indexable URLs (sitemap): **1,496**
- Total static HTML files (dist): **1,503**
- Locales (11): `en, fr, es, it, de, nl, pt, zh, ja, ko, ar`
- URL pattern: `https://www.moroccograndadventure.com/{lang}/{rest}`
- Per-locale parity: every locale emits the same route tree (≈136 route templates × 11 ≈ 1,496; exact breakdown below).

## 2. Route-type breakdown (from `dist/sitemap.xml`, verified)

| Route type | Pattern | URLs | Per locale | Localized tour content? |
|---|---|---|---|---|
| Home | `/{lang}/` | 11 | 1 | locale string table |
| Tours index | `/{lang}/tours/` | 11 | 1 | n/a |
| **Tour detail** | `/{lang}/tours/{id}.html` | 264 | 24 | **only `it` full (24); others 6** |
| City hub (departure) | `/{lang}/tours/from-{city}/` | 44 | 4 | hub label strings |
| Duration hub | `/{lang}/tours/from-{city}/{n}-days/` | 297 | 27 | hub label strings |
| Destinations index | `/{lang}/destinations/` | 11 | 1 | n/a |
| Destination detail | `/{lang}/destinations/{id}.html` | 330 | 30 | yes (30/30 all locales) |
| Merzouga guide index | `/{lang}/merzouga-guide/` | 11 | 1 | n/a |
| **Merzouga guide detail** | `/{lang}/merzouga-guide/{slug}` | 176 | 16 | **only 4 of 16 guides localized** |
| Comparison | `/{lang}/comparisons/{slug}` | 66 | 6 | **canonical EN (not localized)** |
| Travel-info index | `/{lang}/travel-info/` | 11 | 1 | n/a |
| Travel-info detail | `/{lang}/travel-info/{slug}` | 33 | 3 | canonical EN |
| Blog index | `/{lang}/blog/` | 11 | 1 | n/a |
| Blog article | `/{lang}/blog/{slug}.html` | 66 | 6 | canonical EN |
| Experience pages | `/{lang}/{xp}/` | 99 | 9 | canonical EN |
| Filler (about/contact/faq/gallery/trip-builder) | `/{lang}/{page}/` | 55 | 5 | locale string table |

**Tally check:** 11+11+264+44+297+11+330+176+11+66+33+11+66+11+99+55 = **1,496** ✓

> Note: `EXPERIENCE_PAGE_ROUTES` (9 slugs) = `4x4-tours, camel-trekking, desert-tours, luxury-camp, agadir-tours, casablanca-tours, fes-tours, marrakech-tours, day-trips`.

## 3. Canonical Tour inventory (24, verified from `src/data/content.ts`)

| ID | Departs | Duration | Sahara/Merzouga core? |
|---|---|---|---|
| `3-day-sahara-marrakech` | Marrakech | 3 | yes |
| `3-day-sahara-fes` | Fes | 3 | yes |
| `3-day-sahara-agadir` | Agadir | 3 | yes |
| `5-day-imperial-cities` | multi | 5 | no |
| `7-day-imperial-cities-sahara-escape` | multi | 7 | yes |
| `honeymoon-morocco` | Marrakech | ~8 | yes |
| `8-day-marrakech-essaouira-agadir-sahara` | Marrakech | 8 | yes |
| `family-morocco-adventure` | multi | ~9 | yes |
| `marrakech-4-day` | Marrakech | 4 | yes |
| `casablanca-3-day` | Casablanca | 3 | yes |
| `casablanca-4-day` | Casablanca | 4 | yes |
| `casablanca-5-day` | Casablanca | 5 | yes |
| `casablanca-8-day` | Casablanca | 8 | yes |
| `fes-4-day` | Fes | 4 | yes |
| `fes-5-day` | Fes | 5 | yes |
| `fes-8-day` | Fes | 8 | yes |
| `agadir-4-day` | Agadir | 4 | yes |
| `agadir-5-day` | Agadir | 5 | yes |
| `agadir-8-day` | Agadir | 8 | yes |
| `2-day-zagora-desert-marrakech` | Marrakech | 2 | yes |
| `4-day-marrakech-merzouga-sahara` | Marrakech | 4 | yes |
| `5-day-great-south-morocco` | Marrakech | 5 | yes |
| `3-day-fes-merzouga-sahara` | Fes | 3 | yes |
| `4-day-fes-marrakech-via-merzouga` | Fes | 4 | yes |
## 4. Departure-city hubs (from `src/data/tour-hierarchy.ts`, verified)

4 city hubs; duration sets:

- **Marrakech** `from-marrakech/` → `2,3,4,5,6,7,8,9,10-days` (9 duration pages)
- **Casablanca** `from-casablanca/` → `3,4,5,6,7,8-days` (6) — **no 2-day**
- **Fes** `from-fes/` → `3,4,5,6,7,8-days` (6) — **no 2-day**
- **Agadir** `from-agadir/` → `3,4,5,6,7,8-days` (6) — **no 2-day**

Duration-page total across 11 locales = (9+6+6+6) × 11 = 297 ✓

> Note: `Errachidia`, `Ouarzazate` and `Tangier` departure origins **do not exist** as city hubs (competitor contrast; see strategy).

## 5. Destinations (30, verified from dist)

`agadir, ait-ben-haddou, akchour, casablanca, chefchaouen, dades-valley, draa-valley, el-jadida, erg-chebbi, essaouira, fes, ifrane, imlil, legzira, marrakech, meknes, merzouga, mirleft, nkob, ouarzazate, ourika-valley, ouzoud, rabat, roses-valley, skoura, taghazout, tangier, tetouan, todra-gorge, zagora`

Sahara/Merzouga-core destinations: `merzouga, erg-chebbi, zagora, ouarzazate, ait-ben-haddou, dades-valley, todra-gorge, draa-valley, roses-valley, skoura, nkob`.

## 6. Merzouga authority guides (16, from `src/data/seoHub.ts`)

`4x4-desert-tour, best-time-to-visit, camel-trekking, desert-camps, erg-chebbi, erg-chebbi-sunrise-sunset, faq, fes-to-merzouga, how-many-days, how-to-get-there, luxury-desert-camps, marrakech-to-merzouga, quad-biking, sahara-desert-guide, things-to-do, what-to-pack`

**Localized guides (identical 4-set in all 10 non-EN locales):** `how-many-days, camel-trekking, best-time-to-visit, what-to-pack`.
**Not localized (render canonical EN on non-EN locales):** `desert-camps, luxury-desert-camps, how-to-get-there, erg-chebbi, faq, quad-biking, 4x4-desert-tour, things-to-do, marrakech-to-merzouga, fes-to-merzouga, sahara-desert-guide, erg-chebbi-sunrise-sunset`.

## 7. Comparisons (6, from `src/data/seoHub.ts`) — all canonical EN (not localized)

`marrakech-vs-fes, merzouga-vs-zagora, erg-chebbi-vs-erg-chigaga, 2-day-vs-3-day-sahara-tour, private-vs-shared-tour, luxury-camp-vs-standard-camp`

## 8. Travel-info (3, canonical EN) and Blog (6, canonical EN)

Travel-info: `best-time-to-visit-morocco, what-to-pack-morocco, getting-around-morocco`.
Blog: `marrakech-to-merzouga-roadtrip, merzouga-luxury-desert-camp-guide, camel-trekking-etiquette-morocco, fes-chefchaouen-blue-city-guide, morocco-packing-list-desert, best-time-to-visit-morocco-sahara`.

## 9. Tour-content localization per locale (verified from `src/i18n/content/generated/*.json`)

| Locale | Tours localized | Destinations localized |
|---|---|---|
| `it` | **24 / 24** | 30 / 30 |
| `en` (canonical source) | n/a | n/a |
| `fr, es, de, nl, pt, zh, ja, ko, ar` | **6 / 24** | 30 / 30 |

The 6 localized in the 9 locales = the original 6 core tours (`3-day-sahara-marrakech`, `5-day-imperial-cities`, `7-day-imperial-cities-sahara-escape`, `honeymoon-morocco`, `8-day-marrakech-essaouira-agadir-sahara`, `family-morocco-adventure`). All 18 departure/quote/enriched tours remain **English fallback** in those 9 locales.

## 10. Indexability / canonical targets

- Each locale tree has its own canonical URL; hreflang alternates across 11 locales + `x-default` (verified in prerender output). No duplicate routes across locales.
- Tour canonical target per locale = `/{lang}/tours/{id}`.
- Departure-city pages (`/{lang}/tours/from-{city}` and `/{lang}/tours/from-{city}/{n}-days`) are indexable city×duration landing pages.

## 11. Key observations for intelligence (repository evidence)

1. Tour-language coverage is the single largest localization gap: 9 locales at 6/24.
2. Only 4/16 Merzouga guides are localized; comparisons, travel-info and blog are canonical English only.
3. No `Errachidia` / `Ouarzazate` / `Tangier` departure hubs (competitor gap; see strategy).
4. Destination coverage (30) is full and localized across all 11 locales.
5. The Marrakech hub is the deepest (9 durations); Casablanca/Fes/Agadir lack 2-day.

*No files modified in this phase (research/report only).*