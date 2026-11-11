# Phase 10 — Change Log

Each entry: task ID (see `phase-10-task-ledger.md`), files touched, exact diff summary, test result, rollback note.

---

## T1 — Add TripAdvisor to `sameAs`

**Files touched:**
- `index.html` — added `"https://www.tripadvisor.com/Attraction_Review-g304017-d34678153-Reviews-Morocco_Grand_Adventure-Merzouga_Draa_Tafilalet.html"` as a 6th entry in the static `TravelAgency` JSON-LD `sameAs` array (previously 5 entries: Instagram, YouTube, TikTok, Facebook, WhatsApp).
- `src/components/seo/StructuredData.tsx` — added `contactInfo.tripadvisor` as a 6th entry in `ORGANIZATION_SAME_AS`, reusing the existing `contactInfo` field (no new string literal, no new data — same URL already used by `TripadvisorWidget.tsx`).

**Why:** the TripAdvisor profile is already live and referenced elsewhere in the same codebase (confirmed via browser trace in a prior audit this session: the widget actually loads `tripadvisor.com` resources on the real homepage). Google's own Organization-schema documentation recommends `sameAs` include profiles that "unambiguously identify the same entity" — this is exactly that, with zero fabricated data.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, any canonical tag, any hreflang block, any translation, or any booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T1 row.

**Rollback:** remove the one added line from each file; no other state depends on this change.

---

## T3 — Real image-sitemap entries in `scripts/generate-sitemap.mjs`

**Files touched:**
- `scripts/generate-sitemap.mjs` — added `imagesIn(html)` (extracts real `/images/...` `<img src>` values already present in each prerendered HTML file, via the same file the URL itself came from — no guessing from the data layer), `imageBlock(urls)` (renders `<image:image><image:loc>...</image:loc></image:image>` per entry), added the `xmlns:image` namespace to `<urlset>`, and changed the URL-collection step to keep a `pathname -> source file` map so each `<url>` block's images can be read from that exact file.
- `public/sitemap.xml` (and `dist/sitemap.xml`, regenerated identically) — now contains 3,916 real `<image:image>` entries across the 1,859 URLs, in addition to the existing hreflang alternates.

**Why:** Google's own Image SEO documentation recommends image-sitemap entries as a discovery mechanism; 0 existed before this change (confirmed in two prior audits this session). Images are read directly from each page's own real, already-rendered HTML — this guarantees every entry is something Google would already see on that exact page, with zero possibility of listing an image that isn't genuinely there.

**Known, expected asymmetry (not a bug):** pages whose image galleries render only client-side (e.g., the homepage's destination/tour grids) contribute far fewer image-sitemap entries than pages whose galleries are part of the static prerendered HTML (e.g., destination/tour detail pages, which already mirror their galleries into static HTML per the existing `prerender.ts` architecture). This reflects a genuine, pre-existing difference in what's crawlable per page, not an error introduced by this change.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T3 row.

**Rollback:** revert `generate-sitemap.mjs` to its pre-change version and re-run `node scripts/generate-sitemap.mjs` (or the full build) to regenerate the sitemap without image entries.

---

## T5a — Trim `/desert-tours` meta description

**Files touched:**
- `src/components/seo/route-metadata.ts` — shortened the `/desert-tours` entry's `description` from 167 to 153 characters. Every fact preserved exactly (same 4 departure cities, same 2–14 day range, same camel-trekking/Erg Chebbi/Merzouga-camp detail); only wording tightened for length.

**Why:** 167 characters risks truncation in Google's typical SERP description display. Confirmed this string is not reused anywhere as visible on-page copy (unlike the homepage title — see T5b below), so trimming it changes only what search engines see, not what visitors read on the page itself.

**T5b — explicitly NOT implemented this pass:** the homepage `<title>` (62 chars) turned out to be sourced from the `hero_tagline` i18n key, which is also the live, visible homepage headline text — not an independent SEO-only string. Editing it to satisfy a soft title-length guideline would mean rewriting shipped, visible brand copy. Deferred to the task ledger for an explicit owner decision rather than changed unilaterally.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T5a row.

**Rollback:** restore the original 167-character description string in `route-metadata.ts`.

---

## T4 — correction, not an implementation

No code change. Inspected `src/data/tourDepth.ts` (read-only) and confirmed Tour→Guide reciprocal links
already exist comprehensively (every tour has an authored `guideLinks` entry, including four day-trip tours
with a deliberate, explained empty array), rendered live on `tour-detail.tsx` and verified in real prerendered
HTML. Tour→Destination links also already exist via the same page's map/route-stops component. **This
corrects an error in two prior audits this session**, which reported Tour→Guide linking as missing without
having found `tourDepth.ts`. No file was touched; `tourDepth.ts` remains exactly as it was.

---

## T9 — Correct Erg Chebbi's dune width (28×9km → 28×5–7km)

**Research:** fetched `https://en.wikipedia.org/wiki/Erg_Chebbi` directly (not just a search snippet) —
states "approximately 28 kilometers from north to south and 5–7 kilometers from east to west." Cross-checked
against `https://www.visitmorocco.com/en/travel/errachidia-midelt-merzouga` (official Moroccan tourism
source), which gives no numeric dimensions at all, so it neither confirms nor contradicts — Wikipedia is the
only sourced figure found. Height (150m) and length (28km) were already correct and left unchanged.

**Files touched (10 total, English + 8 locales — all same two sentences, number only):**
- `src/data/content.ts` — `erg-chebbi` destination `description`: "up to 9km wide" → "up to 7km wide"
- `src/data/seoHub.ts` — erg-chebbi guide body paragraph: "9 km wide" → "5–7 km wide"; FAQ answer: "up to 9 km wide" → "up to 7 km wide"
- `src/i18n/guides/generated/{de,es,fr,it,ja,ko,nl,pt}.json` — the same two sentences' translated width figure corrected in-place in each language's existing fluent translation (German/Spanish/Dutch/Portuguese: "5–7 km"; French: "5 à 7 km"; Italian: "5-7 km"; Japanese: "5〜7km"; Korean: "5~7km" — each matching that language's own natural range notation). No other wording in any translation was changed.

**Why:** the site stated "up to 9km wide" confidently; the only reputable source found states 5–7km. This is
a factual-accuracy correction, not a stylistic one — I did not invent the corrected figure, I verified it
against Wikipedia's article text directly and cross-checked against the official tourism source.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block,
or booking form. Did not stage, commit, or push. Did not rewrite any other part of any translation.

**Test result:** see `phase-10-test-results.md` — T9 row.

**Rollback:** revert the 10 files to restore "9km"/"9 km"/the per-language equivalent.

---

## T10 — Remove contradicting `alternateName` values from homepage JSON-LD

**Files touched:**
- `index.html` — removed `"alternateName": "Morocco Grand Adventure Tours"` from the static `TravelAgency` block and `"alternateName": "Morocco Grand Adventure Tours & Travel"` from the static `WebSite` block. Nothing else in either block changed.

**Why:** validated the real homepage JSON-LD (per this turn's instruction to check structured data) and found the site's own two schema blocks declared two *different* alternate names for the same brand entity, on the same page. Checked for any evidence either string is real: not in visible copy anywhere, not in any of the 5 real social-profile URLs in `sameAs` (Instagram/YouTube/TikTok/Facebook/WhatsApp — none use "Tours" or "Tours & Travel"), not in the TripAdvisor listing URL. With no evidence for either and the two actively contradicting each other, removing both is the only change that doesn't require guessing at an unverified business-identity fact. `name: "Morocco Grand Adventure"` — the one value with real evidence — is unchanged in both blocks.

**Separately observed, not fixed:** the `WebSite` block's own HTML comment says "WebSite with SearchAction," but no `potentialAction`/`SearchAction` property exists in the actual JSON, and the site has no general query-based search endpoint to point one at (only `/trip-finder` and `/build-your-day-trip`, which are filter tools, not free-text search). Fixing this would mean either building a real search feature (out of scope) or just correcting a stale comment (cosmetic). Left as-is; noting it here rather than silently leaving it undocumented.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T10 row.

**Rollback:** re-add the two original `alternateName` lines to restore prior state.

---

## T11 — Collapse a redirect chain in `vercel.json`

**Files touched:**
- `vercel.json` (repo root, `C:/Users/PC/Downloads/project/vercel.json` — outside `artifacts/morocco-grand-adventure/`, but the real, git-tracked deploy config for this exact site, already referenced in an earlier audit for the `/book` → `/trip-builder` redirects): changed the `/:lang/tours/fes-3-day` rule's `destination` from `/:lang/tours/3-day-sahara-fes` (itself a redirect) directly to `/:lang/tours/3-day-fes-merzouga-sahara` (the real terminal tour page).

**Why:** a full chain-resolution scan of all 450 redirect rules found exactly one 2-hop chain. A request to the legacy slug `fes-3-day` previously cost two 301 round-trips before reaching the real tour; it now resolves in one. Re-ran the same scan after the fix: 0 chains remain across all 450 rules.

**Verified before changing:** confirmed no other rule redirects *to* `/:lang/tours/fes-3-day` or `/:lang/tours/3-day-sahara-fes` (so nothing else needed updating), and confirmed `/:lang/tours/3-day-fes-merzouga-sahara` is not itself a redirect source (a real, terminal, canonical tour page).

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route inside the app itself, canonical tag, hreflang block, translation, or booking form — this is a deploy-config redirect rule, evaluated by Vercel's edge network, not the local build. `npm run route:audit` was re-run for completeness and is unaffected (expected, since it audits the app's own prerendered output, not `vercel.json`). Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T11 row.

**Rollback:** restore `destination` to `/:lang/tours/3-day-sahara-fes` for that one rule.

---

## T12 — Stop emitting a price in structured data that the page never shows

**Files touched:**
- `src/components/seo/StructuredData.tsx` — imported `hasPublishedPrice` from `@/lib/promo`; changed the `Offer`-block condition in `buildTourSchema` from `isNumericPrice(tour.price)` to `isNumericPrice(tour.price) && hasPublishedPrice(tour.price)`.

**Why (severe finding):** `content.ts` still carries real-looking numeric `price` fields on tour entries (e.g. `4-day-marrakech-merzouga-sahara`: `price: "530"`) left over from before the site moved to a quote-only pricing policy. The visible `PriceTag` component already respects that policy correctly — `hasPublishedPrice()` is hardcoded `false` site-wide, so no page ever shows a number. But `buildTourSchema` was never updated to the same gate, so **every tour with a numeric price field was telling Google, in machine-readable structured data, a specific EUR price the business does not publish or commit to anywhere a human visitor can see.** This is a direct violation of Google's own documented structured-data policy (verified by fetching `developers.google.com/search/docs/appearance/structured-data/intro-structured-data` directly): "don't add structured data about information that is not visible to the user, even if the information is accurate" — and here it's worse, since the number actively contradicts the page's own quote-only messaging.

**Scope:** `buildTourSchema` is a single function shared by both `prerender.ts` and the React runtime (confirmed via grep — no second copy exists), so this one fix covers both without a parity risk.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation structure, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T12 row.

**Rollback:** revert the condition to `isNumericPrice(tour.price)` and remove the `hasPublishedPrice` import.

---

## T12b — Correct the same false claim in visible tour copy (EN, ES, FR, IT)

**Files touched:**
- `src/data/content.ts` — 3 corrections: (1) 17 occurrences of the FAQ-answer variant ("A starting price per person is published for this route. ... the per-person price comes down as the group grows...") → replaced with an accurate quote-only answer; (2) 12 occurrences of the description-field variant ("A starting price per person is published for this route; the exact total depends on your party size...") → replaced similarly; (3) 1 unique comparison question on the 14-day tour ("Why is this tour quote-only when the shorter tours have a published price?") → reworded to not assert other tours have published prices either.
- `src/i18n/content/generated/es.json` — the same comparison question's Spanish translation corrected (1 occurrence).
- `src/i18n/content/generated/fr.json` — both variants corrected in French (13 + 18 occurrences) + the comparison question (1).
- `src/i18n/content/generated/it.json` — both variants corrected in Italian (13 + 18 occurrences) + the comparison question (1).

**Why:** this is the root cause behind T12's schema symptom appearing in the FAQ specifically — the FAQPage schema's "How is the price confirmed?" answer was accurately mirroring what the visible FAQ accordion said, but what it said was itself false (claims a published price exists). Each language's replacement preserves that language's own existing sentence structure and tone; only the false claim was removed, nothing new was invented (every replacement states the same genuinely-true facts already used elsewhere on the site: a personalised quote is provided, confirmed before payment, adjustable on request).

**Verified before replacing:** confirmed every occurrence of each variant was byte-identical within its file before doing a scripted find-and-replace (so no accidental partial-match corruption), and confirmed zero occurrences remain anywhere in `src/` after the edits, in any language.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, or booking form. Did not rewrite any other part of any translation. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T12b row.

**Rollback:** each replaced string's original text is recorded above and in this session's history; would need to be restored per-file.

---

## T13 — Stop misusing `touristType` on the destination schema

**Files touched:**
- `src/components/seo/StructuredData.tsx` — in `buildDestinationSchema`, removed `touristType: dest.highlights` and added a second `additionalProperty` entry (`name: "Highlights"`, `value: dest.highlights.join(', ')`) alongside the existing `"Best time to visit"` entry.

**Why:** fetched `schema.org/touristType` directly — its exact definition is "Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc." (an audience property). The code was populating it with activity highlights ("Erg Chebbi dunes," "Camel trekking at sunset," "Rissani weekly market") — real, accurate content, just filed under a property whose own definition it doesn't match. This mirrors a problem the same function had already solved once before for `bestTimeToVisit` (not a valid schema.org property at all), using the exact same `additionalProperty` pattern as the fix.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T13 row.

**Rollback:** restore `touristType: dest.highlights` and remove the second `additionalProperty` entry.

---

## T14 — Harden `<image:loc>` against unescaped XML-special characters

**Files touched:**
- `scripts/generate-sitemap.mjs` — added `escapeXml()` (escapes `& < > " '`, same pattern as `prerender.ts`'s existing `escapeHtml`) and applied it when rendering each `<image:loc>` value in `imageBlock()`.

**Why:** found while auditing sitemap image entries against Google's current image-sitemap documentation. No currently-real image URL contains an XML-special character (verified: 0 of 145 unique image URLs), so this isn't a demonstrated present-day defect — but the function had zero escaping, so any future image filename containing one of those characters would silently produce malformed XML with no warning. This is a pure forward-looking hardening: confirmed byte-identical sitemap output for every current URL.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation, or booking form. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T14 row.

**Rollback:** remove the `escapeXml()` call in `imageBlock()` (revert to raw `u`).

---

## Step 1 recheck (this turn) — no code change, verification only

Inspected the full `git diff` for every file touched by T1/T3/T5a/T9/T10/T11/T12/T12b/T13. Confirmed: the
price-schema gate (`isNumericPrice(tour.price) && hasPublishedPrice(tour.price)`) is intact and
`src/lib/promo.ts` is untouched (`hasPublishedPrice` still hardcoded `false`), so the gate is still airtight.
Confirmed the `touristType` → `additionalProperty` move for destinations is intact. Spot-checked FR/IT/JA/KO
diffs for the FAQ/description and Erg-Chebbi-width corrections — all read grammatically correctly in their
respective languages, with only the intended substrings changed. Confirmed `git status` still shows exactly
the same 9 pre-existing untracked files, untouched. No previous fix was repeated or undone.

## Step 2/3 audits (this turn) — no code change beyond T14, verification only

Ran 3 new, purpose-built verification scripts (kept in the scratchpad, not the repo):
1. A full image-to-page correspondence check across all 1,859 sitemap entries against their real source HTML files — 0 fabricated/mismatched/duplicate entries.
2. A full hreflang-reciprocity check across all 1,859 pages' alternate-language links — 0 missing targets, 0 self-reference mismatches, 0 non-reciprocal pairs.
3. A full canonical-self-reference check across all 1,874 real prerendered HTML files — 0 missing canonicals, 0 wrong-locale canonicals; the only 4 non-self-referencing canonicals are the already-known, intentional legacy-Unicode redirect pages.

Also re-confirmed 0 redirect chains remain in `vercel.json` (unchanged since the prior fix) and checked Google's current image-sitemap documentation directly (protocol limits, deprecated elements) rather than relying on memory.

---

## T15 — Add context to the nav bar and footer WhatsApp CTAs

**Files touched:**
- `src/components/layout/Navbar.tsx` — imported `contextualWhatsAppMessage` from `../ui/WhatsAppButton`; built `navWhatsappHref` once from the already-available `location`; applied it to both the desktop nav-bar "Book via WhatsApp" link and the mobile-menu version of the same link (previously both used the bare `contactInfo.whatsapp` with no message).
- `src/components/layout/Footer.tsx` — added `useLocation` and `contextualWhatsAppMessage` imports; built `footerWhatsappHref` the same way; applied it to the footer's "Message on WhatsApp" contact-list link (left the social-icon-row WhatsApp icon untouched — that one is grouped with Instagram/YouTube/TikTok/Facebook/TripAdvisor as a "follow us" icon, not a "message us" CTA, so adding a conversation starter there would be a different, less clearly justified change).

**Why:** found during the conversion-journey audit. Live browser testing across every page confirmed these two links — the most prominent, always-present WhatsApp CTAs on the entire site — opened a completely blank WhatsApp chat, while every *other* WhatsApp link on the site (`StickyBookingCTA`, the floating `WhatsAppButton`, `TailorJourney`'s inquiry CTA, homepage CTAs) already pre-fills a page-relevant message via the existing `contextualWhatsAppMessage()` helper. This is not a new feature — it's extending an already-proven, already-used pattern to the two places that were missed.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block, translation strings, or booking form fields. Did not create a new CTA, change destination numbers, or alter visible button text/styling — only the pre-filled message content of the existing links. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T15 row.

**Rollback:** revert both files to use `contactInfo.whatsapp` directly (no `?text=`).

---

## Major finding (not a fix) — TailorJourney/ladder.ts price display contradicts hasPublishedPrice()=false

No code change. Documented in full in `phase-10-task-ledger.md`. Summary: `TailorJourney.tsx` (the tour-detail
booking panel) shows a real, specific computed price for 26 of ~31 tours via an independent pricing system
(`src/data/pricing/ladder.ts`) that is not gated by the same `hasPublishedPrice()` check `PriceTag.tsx` and
the T12 schema fix rely on. Verified live via screenshot (`€530 per person / €1,060 Total`, with a "confirmed
before payment" disclaimer directly beneath it). This directly bears on T12's correctness: if the owner
confirms these prices genuinely are meant to be published, T12's schema-suppression should likely be revisited
for the affected tours. Left unchanged pending an explicit owner decision — this is a business-model question,
not a code defect.

## Day-trips "stale claim" — investigated, confirmed false positive, no change
An automated check flagged `/day-trips` for a "published price" claim. Traced to source: the 4 day-trip tours
in `content.ts` have `price: ""` and no entry in `ladder.ts` — zero price-related text. The detector was
matching my own T12b correction wording elsewhere on the page (a true, accurate negation containing the word
"published"). No code change.

---

## T16 — Unify the quote-only pricing policy

**Owner decision (verbatim, recorded for the record):** numeric tour prices must not be publicly displayed;
the business stays quote-based; existing computed prices remain commercially valid for internal quotation use
only.

**Files touched:**
- `src/components/tours/TailorJourney.tsx` — the only file changed to implement this policy. Specifically:
  1. Removed the `if (price) { lines.push('Price per person: €...'); lines.push('Total: €...'); }` block from the `summary` `useMemo` (this `summary` feeds both the WhatsApp `?text=` and the `mailto:` email body).
  2. Replaced the 3-branch visible-price ternary (numeric price / over-ladder note / generic quote note) with a single, unconditional render of the existing `px_price_pending` + `px_price_pending_note` messaging — already fully translated into all 11 locales, no new copy written.
  3. Removed now-dead code: the `overLadder` computation, the `ladder` local (its only consumer was `overLadder`), the `LADDER_MAX`/`getLadder` imports (no longer referenced), and the `formatMoney` import (no longer called). `ladderPrice` import kept — `price` is still computed.
  4. Updated two adjacent code comments that had become inaccurate or needed clarifying given the change (one at the top of the price computation, one directly above the render block).

**Why this is the correct, smallest change:** `price` itself (the `ladderPrice()` call) is preserved exactly as before — same inputs, same computation, same `ladder.ts` data untouched. Only its two *consumption* sites (the visible render, and the outgoing message) were changed to stop reading it. This cleanly separates "calculate internally" from "never show publicly," exactly as the task required.

**What was audited and found already correct, so left unchanged:**
- `src/components/promo/PriceTag.tsx`, `src/components/tours/TourCard.tsx`, `src/pages/home.tsx` — all already gate every price-related render behind `hasPublishedPrice()`.
- `src/components/seo/StructuredData.tsx`'s `buildTourSchema` — already gates its `Offer` block behind `isNumericPrice(tour.price) && hasPublishedPrice(tour.price)` (T12, prior session). Re-verified: no `Offer`/`AggregateOffer`/`Product` schema with a numeric price exists anywhere in the real `dist/` build (programmatic scan, 1877 files, 0 hits).
- `src/components/promo/PromoBadge.tsx` — gated by `usePromoActive()`, which resolves to `false` (`PROMO_ENABLED = false` in `promo.ts`, untouched). Never renders.
- `discountedPrice()` in `promo.ts` — defined, never called anywhere in `src/`. Inert.
- `src/data/pricing/ladder.ts`, `src/data/pricing/rates.ts`, `src/lib/pricing.ts` — pure data/calculation modules; confirmed via a repo-wide import search that `lib/pricing.ts`'s value exports (`estimate`, `fromPricePerPerson`, `validateRateBehaviour`) are not imported by any rendering component at all. Zero changes.

**Explicitly out of scope, flagged not fixed:** `src/components/student-tours/JoinStudentTour.tsx` /
`src/data/student-group-departures.ts` have their own separate, pre-existing per-person deposit/price display
(their own code calls it a "published price" for student departures) — not named in this task, materially
different product, not touched. See the ledger for the full reasoning.

**Scope check:** did not touch `TopicalLinks.tsx`, `tourDepth.ts`, any route, canonical tag, hreflang block,
booking-field validation, accessibility attributes, or responsive layout classes. Did not hardcode any new
English copy into any locale — reused 100% pre-existing, pre-translated keys. Did not stage, commit, or push.

**Test result:** see `phase-10-test-results.md` — T16 row.

**Rollback:** restore the original 3-branch ternary and the `if (price)` summary block; re-add the removed imports (`LADDER_MAX`, `getLadder`, `formatMoney`) and the `ladder`/`overLadder` locals.

---

## T17 — SEO/keyword-ranking continuation pass

**No source files changed this turn.** This was an investigation-and-verification pass per the task's own
instruction to prioritize evidence over edit volume: "Do not make speculative SEO changes merely to increase
the number of edits. Every change must have a specific, defensible purpose."

**What was done:** re-verified T16 and the student-tour scope boundary; updated
`reports/phase-10-keyword-to-page-map.md` with a formal, confidence-rated query-to-page table (documentation
change only, in the `reports/` folder which is itself untracked); investigated the `/destinations/merzouga`
and `/desert-tours` low-position question via three new angles (content-overlap measurement, inbound-link
count, schema structure) — all three ruled out hypotheses rather than confirming a fix, so no code was
changed. Also checked: noindex directives site-wide, alt-text quality (sampled), external profile link
resolution, and FAQ-schema-vs-content consistency on 6 additional pages. All came back clean.

**Why no code change:** every concrete, checkable hypothesis this turn (bad internal linking, duplicate
content, missing/wrong schema, bad alt text, broken external links) was tested against real evidence and
disproven for these pages. Forcing a title or content rewrite without a disproven-false, confirmed-true reason
would be exactly the "speculative change" the task explicitly prohibits. The honest conclusion — recorded in
the ledger and keyword map — is that this needs real GSC query-level data for these two pages, not another
code edit.

**Test result:** see `phase-10-test-results.md` — T17 row (regression re-run, no new changes to verify beyond
re-confirming the already-tested T16 state).

---

(Further entries appended as subsequent tasks complete.)
