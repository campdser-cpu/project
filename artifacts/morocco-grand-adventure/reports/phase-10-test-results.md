# Phase 10 — Test Results Record

## T1 — Add TripAdvisor to `sameAs`

| Test | Result | Detail |
|---|---|---|
| `npm run typecheck` | PASS | Clean, no errors |
| `npm run build` | PASS (exit 0) | 1859 route HTML files generated; GSC route contract PASS; Prerender content contract PASS (132 checks); SEO content audit PASS — **111 warnings, identical to the pre-change baseline (no regression)** |
| `npm run route:audit` | PASS | **15 warnings, identical to the pre-change baseline** (all pre-existing `/book` orphans + legacy Korean/Chinese redirect pages — none new) |
| Manual inspection of real prerendered HTML | PASS | Confirmed the new TripAdvisor URL appears as the 6th `sameAs` entry in both `dist/en/index.html` and `dist/fr/index.html` (spot-checked 2 of 11 locales — the block is static/shared across all locales by design, so this confirms the fix propagates everywhere) |
| Scope check | PASS | `git diff --name-only` (not yet run as a final gate below) will be checked before any staging; no edits made to `TopicalLinks.tsx`, `tourDepth.ts`, routes, canonical tags, hreflang, translations, or booking-form code |

**Verdict: T1 is safe, verified, and ready to stage — pending explicit authorization to commit/push, which was not given this turn.**

---

## T3 — Real image-sitemap entries in `generate-sitemap.mjs`

| Test | Result | Detail |
|---|---|---|
| Standalone script run against existing `dist/` | PASS | `1859 real prerendered URLs (3916 image entries)` — URL count unchanged from pre-change baseline |
| Spot-check: homepage | PASS (architecturally expected) | Only 1 real `<img>` tag exists in the static prerendered homepage HTML (the LCP hero poster) — destination/tour grids render client-side only, so they're invisible to any sitemap/crawler reading static HTML. This is a genuine pre-existing architecture fact, not a bug introduced here. |
| Spot-check: `/destinations/merzouga` | PASS | 13 real, distinct image URLs extracted, all genuine `/images/catalog`, `/images/curated`, `/images/personal`, `/images/riad`, `/images/stock` paths already on the page |
| Spot-check: `/tours/4-day-marrakech-merzouga-sahara` | PASS | 6 real image URLs extracted |
| `npm run build` (full pipeline, fresh) | PASS (exit 0) | 1859 URLs, 3916 image entries; GSC route contract PASS; prerender content contract PASS (132 checks); SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline**; 358,711 internal links checked (same as pre-change) |
| XML tag-balance check (`<url>`, `<image:image>`, `<image:loc>`) | PASS | 1859/1859, 3916/3916, 3916/3916 — no malformed or unclosed tags |
| `dist/sitemap.xml` vs `public/sitemap.xml` | IDENTICAL | Both write targets match exactly |
| `sameAs` (T1) still intact after this build | PASS | Confirmed present in `dist/en`, `dist/es`, `dist/ar` (RTL locale checked explicitly) |
| Scope check (`git diff --name-only`) | PASS | Only `index.html`, `scripts/generate-sitemap.mjs`, `src/components/seo/StructuredData.tsx`, and the generated `public/sitemap.xml` changed. `TopicalLinks.tsx`/`tourDepth.ts` untouched. Nothing staged or committed. |

**Verdict: T3 is safe, verified, and ready to stage — pending explicit authorization to commit/push.**

---

## T5a — Trim `/desert-tours` meta description (167 → 153 chars)

| Test | Result | Detail |
|---|---|---|
| String-source check | PASS | Confirmed the old 167-char string existed only in `route-metadata.ts`, with no duplicate elsewhere and no reuse as visible on-page copy — safe to edit as a pure metadata change |
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | 1859 URLs, 3916 image entries (T3 unaffected); GSC route contract PASS; prerender content contract PASS; SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline**; 358,711 internal links checked |
| Real rendered output check | PASS | `dist/en/desert-tours/index.html`'s `<meta name="description">` now reads exactly: "Private Sahara desert tours from Marrakech, Fes, Casablanca or Agadir — 2 to 14 days, camel trekking at Erg Chebbi and a night at a Merzouga desert camp." (153 chars, all original facts preserved, no new claims) |
| Scope check | PASS | `git status` shows exactly 5 files changed across T1+T3+T5a combined: `index.html`, `public/sitemap.xml`, `scripts/generate-sitemap.mjs`, `src/components/seo/StructuredData.tsx`, `src/components/seo/route-metadata.ts`. `TopicalLinks.tsx`/`tourDepth.ts` untouched throughout. Nothing staged or committed. |

**Verdict: T5a is safe, verified, and ready to stage — pending explicit authorization to commit/push.**

---

## T9 — Correct Erg Chebbi width (9km → 5–7km) across EN + 8 locales

| Test | Result | Detail |
|---|---|---|
| Source verification | PASS | Fetched `en.wikipedia.org/wiki/Erg_Chebbi` directly: "5–7 kilometers from east to west." Cross-checked `visitmorocco.com`'s Errachidia–Midelt–Merzouga page — no numeric figure given there either way. |
| Residual-string check | PASS | `grep -rl` for every language's "9 km"/"9km" phrasing across `src/` returns zero matches after the edit |
| JSON validity (8 locale files) | PASS | Each of `de/es/fr/it/ja/ko/nl/pt.json` parses cleanly via `JSON.parse` after editing |
| `node scripts/verify-merzouga-guide-i18n.cjs` | PASS | 0 problems, all 11 locales' guide i18n structure intact |
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | 1859 URLs, 3916 image entries, GSC route contract PASS, prerender content contract PASS, SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline**; 358,711 internal links checked |
| Real rendered output check | PASS | Confirmed "up to 7 km wide" in `dist/en`, "5–7 km Breite" in `dist/de`, "5〜7km" in `dist/ja`, "5~7km" in `dist/ko`; zero stray "9km"/"9 km" remaining anywhere in `dist/` |
| Scope check | PASS | `git status` shows exactly 14 files changed across all of T1+T3+T5a+T9 combined (listed in this turn's summary). `TopicalLinks.tsx`/`tourDepth.ts` untouched. Nothing staged or committed. |

**Verdict: T9 is safe, verified, and ready to stage — pending explicit authorization to commit/push.**

---

## T10 — Remove contradicting `alternateName` values

| Test | Result | Detail |
|---|---|---|
| JSON-LD parse check (source `index.html`) | PASS | All 3 blocks (`TravelAgency`, `WebSite`, `BreadcrumbList`) parse cleanly after the edit; neither has `alternateName` any more |
| Evidence check for either removed string | NEITHER FOUND | Not in visible copy, not in any real `sameAs` social URL, not in the TripAdvisor listing URL |
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | 1859 URLs, GSC route contract PASS, prerender content contract PASS, SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline**; 358,711 internal links checked |
| Real rendered output check | PASS | `grep -c "alternateName"` returns 0 in `dist/en/index.html`, `dist/fr/index.html`, `dist/ar/index.html` |
| Scope check | PASS | `git status` shows the same 15 files as before (this edit landed in `index.html`, already modified by T1) |

**Verdict: T10 is safe, verified, and ready to stage — pending explicit authorization to commit/push.**

---

## T11 — Collapse redirect chain in `vercel.json`

| Test | Result | Detail |
|---|---|---|
| JSON validity | PASS | `vercel.json` parses cleanly after the edit |
| Full chain-resolution scan (all 450 redirects) | PASS | 0 chains remain (was 1 before the fix) |
| Reverse-reference check | PASS | No other rule points at either `fes-3-day` or `3-day-sahara-fes`; confirmed `3-day-fes-merzouga-sahara` is not itself a redirect source |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline** (expected — this audits the app's own output, not Vercel's redirect config) |
| Scope check | PASS | `git status` on the outer repo shows exactly one additional file (`vercel.json`) beyond the 15 already in `artifacts/morocco-grand-adventure/`. `TopicalLinks.tsx`/`tourDepth.ts` untouched. Nothing staged or committed. |

**Verdict: T11 is safe, verified, and ready to stage — pending explicit authorization to commit/push.**

## Mobile tap-target investigation (not a fix — recorded for completeness)

| Check | Result |
|---|---|
| Viewport meta tag (3 pages) | Correct: `width=device-width, initial-scale=1.0, maximum-scale=5` |
| Horizontal overflow (3 pages) | None |
| Broken images (3 pages) | None |
| Primary CTA tap-target sizes | All ≥44px tall (50–64px observed) |
| Footer link tap-target sizes | 19–24px tall, but uniform across the entire footer's link lists, not a defect specific to any one link |

No code change made for this item — recorded as a minor, low-priority observation per the instruction to leave code unchanged when an issue's impact can't be meaningfully demonstrated.

---

## T12 — Remove unpublished price from tour structured data

| Test | Result | Detail |
|---|---|---|
| Source audit | PASS | Confirmed `buildTourSchema` is single-sourced (used by both `prerender.ts` and runtime) — one fix, no parity risk |
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | 1859 URLs, GSC route contract PASS, prerender content contract PASS, SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline** |
| Real rendered output check | PASS | `dist/en/tours/4-day-marrakech-merzouga-sahara.html`: `offers` key absent from the `TouristTrip` schema (was `price: 530` before the fix). Confirmed also absent in `dist/fr/...` (same tour). `grep -rl '"@type":"Offer"' dist/en/tours/*.html` returns 0 files site-wide. |

## T12b — Correct false "published price" claims (EN/ES/FR/IT)

| Test | Result | Detail |
|---|---|---|
| Byte-identical verification before replace | PASS | Each of the 3 English variants and their FR/IT counterparts confirmed byte-identical across all occurrences before a scripted replace was applied |
| Post-edit residual-string sweep | PASS | 0 remaining occurrences of any variant anywhere in `src/` (checked every locale file, not just the 4 edited) |
| JSON validity (es/fr/it.json) | PASS | All 3 parse cleanly after editing |
| `npm run build` (full pipeline) | PASS (exit 0) | Same unchanged 111-warning baseline |
| `npm run route:audit` | PASS | Same unchanged 15-warning baseline |
| Real rendered output check | PASS | EN tour page's visible FAQ `<h3>` text and the FAQPage schema's `acceptedAnswer` text both now read the corrected sentence, identically. FR tour page: 0 occurrences of the old French claim; schema's `offers` also absent (T12). |
| Global `dist/` sweep | PASS | `grep -rl` for every language's old phrasing across the entire `dist/` build returns 0 files |

## T13 — Fix `touristType` misuse on destination schema

| Test | Result | Detail |
|---|---|---|
| Schema.org verification | PASS | Fetched `schema.org/touristType` directly: confirmed it's an audience property, not an activity list |
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | Same unchanged 111-warning baseline |
| `npm run route:audit` | PASS | Same unchanged 15-warning baseline |
| Real rendered output check | PASS | `dist/en/destinations/merzouga.html`: `touristType` absent; `additionalProperty` now has 2 entries (`Best time to visit`, `Highlights`) with the real highlight text. Same confirmed correct and genuinely localized (not English fallback) in `dist/de/destinations/merzouga.html`. |

## Structured-data audit — checked and confirmed correct (no change needed)

| Check | Pages checked | Result |
|---|---|---|
| JSON-LD parses on every block | EN+FR tour, EN+DE destination | All blocks parse; 0 syntax errors |
| FAQ schema matches visible FAQ (count, order, text) | EN tour page | 6/6 questions match exactly, same order |
| Canonical tag = schema `@id`/`url` = breadcrumb last item | EN tour page | All four agree on the same URL |
| No duplicate/conflicting `@id`s | All 4 pages | Each block has a distinct, correctly-scoped `@id` |
| `touristType` on `TouristTrip` (tour schema — distinct from the destination schema fixed in T13) | EN tour page | Correctly populated with audience categories ("Luxury Travelers," "Families," etc.) — no fix needed there |
| FAQ rich-result eligibility policy | N/A (documentation check) | Verified via Google Search Central directly: FAQ rich results are now restricted to "well-known, authoritative government and health websites." This site's FAQ markup is correct but will not produce a rich result — recorded so no false expectation is set, per the user's explicit instruction to verify current policy rather than rely on memory. |

**Verdict: T12, T12b, and T13 are all safe, verified, and ready to stage — pending explicit authorization to commit/push.**

---

## Step 1 — Recheck of all prior fixes (T1/T3/T5a/T9/T10/T11/T12/T12b/T13)

| Check | Result | Detail |
|---|---|---|
| Full `git diff` inspection, file-by-file | PASS | Every prior fix present exactly as logged; nothing overwritten or duplicated |
| `hasPublishedPrice()` / `promo.ts` unchanged | PASS | Still hardcoded `false` — T12's schema gate is still airtight |
| FR/IT/ES translation grammar spot-check | PASS | Read naturally, only intended substrings changed |
| JA/KO translation grammar + encoding spot-check | PASS | Range notation (〜 / ~) correct, no corruption |
| 9 pre-existing untracked files | PASS | All 9 still present, untouched, unmodified |

## T14 — Harden sitemap `<image:loc>` against XML-special characters

| Test | Result | Detail |
|---|---|---|
| Current-URL impact check | PASS | 0 of 145 unique image URLs contain `& < > " '` — escaping changes nothing today |
| `node --check scripts/generate-sitemap.mjs` | PASS | Syntax valid |
| `npm run build` (full pipeline) | PASS (exit 0) | 1859 URLs, 3916 image entries, GSC route contract PASS, prerender content contract PASS, SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline** |

## Step 2 — Sitemap image audit

| Check | Scope | Result |
|---|---|---|
| Protocol limits (Google's current docs, fetched live) | File-wide | 42 max images/URL (limit 1,000); 3.5MB file (limit 50MB); 1,859 URLs (limit 50,000) — all well within limits |
| Image-to-page correspondence | **All 1,859 pages** (programmatic, not sampled) | 0 fabricated/mismatched image entries |
| Duplicate entries within a page | **All 1,859 pages** | 0 duplicates |
| Client-rendered content falsely represented as server-rendered | Structural check | Impossible by construction — generator only reads real, final prerendered HTML |
| Deprecated image-sitemap elements (`caption`/`geo_location`/`title`/`license`) | File-wide | None used — nothing to clean up |

## Step 3 — Canonical/hreflang audit

| Check | Scope | Result |
|---|---|---|
| hreflang target exists in sitemap | **All 1,859 pages, up to 11 locales each** (programmatic) | 0 missing targets |
| hreflang self-reference correct | Same scope | 0 mismatches |
| hreflang reciprocity (A→B implies B→A) | Same scope | 0 non-reciprocal pairs |
| Canonical tag = own real URL | **All 1,874 real HTML files** (programmatic) | 0 missing canonicals, 0 wrong-locale canonicals; exactly 4 non-self-referencing canonicals, all the known/intentional legacy-Unicode redirect pages |
| Redirect chains (`vercel.json`, 450 rules) | File-wide | 0 chains (re-confirmed, unchanged) |
| `/book` canonical vs. its 301 redirect | 2 locales spot-checked | Self-references, but moot — the redirect fires before the page is ever served; not a real-world defect, not changed |

**Verdict: T14 is safe, verified, and ready to stage. Steps 1–3 found the existing implementation (after this session's prior fixes) to be comprehensively correct — no further changes were necessary or made.**

---

## Conversion-journey audit (real browser, desktop + mobile, 5 pages: homepage, /tours, a tour-detail page, /day-trips, a destination page)

| Check | Result |
|---|---|
| Viewport/layout/console errors | Clean on all 10 page×device combinations (5 pages × 2 viewports) |
| WhatsApp link destination number | Correct (`212699846818`) on every single WhatsApp link found, every page |
| WhatsApp link context text | **Found the nav "Book via WhatsApp" and footer "Message on WhatsApp" links had none** — fixed as T15; every other WhatsApp CTA already had rich context |
| Major finding | **`TailorJourney.tsx` shows a real computed price for 26/~31 tours, contradicting the sitewide `hasPublishedPrice()=false` policy** — documented in the ledger, not fixed (requires owner decision) |
| "Stale published price" claim on `/day-trips` | Investigated — confirmed false positive (my own detector matching my own correct T12b text); no real issue |

## T15 — Nav/footer WhatsApp context fix

| Test | Result | Detail |
|---|---|---|
| `npm run typecheck` | PASS | Clean |
| `npm run build` (full pipeline) | PASS (exit 0) | Same unchanged 111-warning baseline |
| `npm run route:audit` | PASS | Same unchanged 15-warning baseline |
| Raw static HTML grep check | N/A — informative, not a failure | Confirmed the Navbar/Footer are **not** part of the server-rendered static HTML at all (0 occurrences of "Book via WhatsApp" text in the raw file) — they are purely client-rendered chrome, unlike the SEO-critical content fixed in earlier tasks. Noted as a genuine architectural fact, not a defect. |
| Real browser verification (3 pages: EN homepage, EN tour detail, FR `/desert-tours`) | PASS | Both the nav and footer WhatsApp links now carry real, page-relevant `?text=` content in every case, correctly varying by page and by locale's own translated button label (confirmed "Book via WhatsApp" in EN and "Réserver via WhatsApp" in FR both work) |

**Verdict: T15 is safe, verified, and ready to stage — pending explicit authorization to commit/push. The TailorJourney/ladder.ts pricing inconsistency is the session's most significant open finding and requires your decision before any further pricing-related code change.**

---

## T16 — Unify the quote-only pricing policy

| Test | Scope | Result |
|---|---|---|
| Repo-wide price-rendering-path trace | `src/` (all `.ts`/`.tsx`) | Traced every file referencing `formatMoney`/`ladderPrice`/`fromPrice`/`Offer`/`AggregateOffer`/`hasPublishedPrice`/literal `€` — 5 files with `€`; all traced to source. Only `TailorJourney.tsx` was an unguarded public leak. |
| `npm run typecheck` | Full project | PASS — clean |
| `npm run build` (full pipeline) | Full project | PASS (exit 0) — 1859 URLs, GSC route contract PASS, prerender content contract PASS, SEO content audit PASS — **111 warnings, unchanged baseline** |
| `npm run route:audit` | Full project | PASS — **15 warnings, unchanged baseline** |
| Programmatic public-price scan (literal `€<number>` + JSON-LD `Offer`/`AggregateOffer`/`Product` with numeric `price`) | **All 1,877 real prerendered HTML files** | **PASS — 0 occurrences of either, anywhere** |
| Live browser: Euro amount visible | 5 locales (EN/FR/ES/IT/DE) × the tour previously showing "€530/€1,060" | **PASS — none visible in any locale** |
| Live browser: quote-pending message is genuinely localized | Same 5 locales | **PASS — exact native-language text confirmed present in all 5** (not English fallback): EN "Price confirmed for your dates and group," FR "Prix confirmé...," ES "Precio confirmado...," IT "Prezzo confermato...," DE "Preis wird... bestätigt" |
| Live browser: WhatsApp/email message no longer contains price lines | Same 5 locales | **PASS — confirmed no "Price per person"/"Total: €" in any outgoing message** |
| Live browser: non-price booking fields still functional | EN route | **PASS — date input, travelers input, 16 room-arrangement radios, email `mailto:` link all present and unchanged** |
| Live browser: console/page errors | 5 locales | None |
| Visual screenshot confirmation | EN route | Clean panel, no numbers, "A written quote before you commit" / "Payment terms agreed in writing" trust badges intact below |

**Verdict: T16 is complete, thoroughly verified across code, structured data, prerendered output, and live multi-locale rendering. Ready to stage — pending explicit authorization to commit/push.**

**Remaining limitation, stated honestly:** the computed `price` in `TailorJourney.tsx` is preserved but not currently transmitted anywhere — there is no private/internal quotation-delivery mechanism in this application today. This was not built, per the explicit instruction not to invent one.

**Remaining scope question for the owner:** student-tour group departures (`JoinStudentTour.tsx`) have their own, separate, pre-existing numeric price display, not covered by this task's named scope. Not touched; flagged for an explicit decision if the quote-only policy should also apply there.

---

## T17 — SEO/keyword-ranking continuation pass (regression re-run, no new code changes)

| Test | Result | Detail |
|---|---|---|
| `npm run typecheck` | PASS | Clean |
| `npm run route:audit` | PASS | **15 warnings, unchanged baseline** |
| Full-build price-leak re-scan (all 1,877 files) | PASS | **0** files contain a Euro amount — T16 reconfirmed still fully effective |
| Student-tour scope check | PASS | `git status` on `src/components/student-tours/` and `src/data/student-group-departures.ts` returns empty — zero changes |
| Accidental noindex scan (all of `dist/`) | PASS | 1 hit, `dist/404.html` — correct and intentional |
| External link resolution (5 `sameAs` profiles) | PASS | 4/5 `200`; TripAdvisor `403` confirmed as DataDome bot-protection (`x-datadome: protected` header), not a broken link |
| Alt-text sample quality check | PASS | 13 images sampled on `/destinations/merzouga` — all descriptive, correctly bounded, zero stuffing |
| FAQ-schema-vs-content consistency (6 pages: `/day-trips`, `/camel-trekking`, `/luxury-camp`, `/4x4-tours`, `/desert-tours`, `/tours`) | PASS | Schema presence correctly matches visible-FAQ presence on every page checked |
| Content-overlap / inbound-link / schema investigation of `/destinations/merzouga` and `/desert-tours` | **Inconclusive — documented, not acted on** | See `phase-10-keyword-to-page-map.md`; no safe, evidence-backed fix identified without real GSC query-level data for these two pages |

**Verdict: no files changed this turn. All regression checks pass against the same, unchanged baselines used throughout this session. The low position of `/destinations/merzouga` and `/desert-tours` is a genuine, documented GSC-REQUIRED item, not a code defect found and left unfixed.**

---

(Further test rows appended as subsequent tasks complete.)
