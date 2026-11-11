# Phase 11 — GSC Evidence Review & CTR Quick Wins

**Status:** Evidence reviewed, highest-confidence quick wins implemented, validated. Not committed, pushed, or deployed.

---

## 1. Export details, limitations, and the strongest opportunities

### Export found and its real limitations

No `reports/gsc/` directory exists in this repository. The actual Search Console export is a ZIP at the artifacts root — `artifacts/moroccograndadventure.com-Performance-on-Search-2026-10-28 (1).zip` — a standard GSC "Performance on Search" UI export. It was copied to a scratchpad and extracted there; **the original ZIP was never modified** (verified: same byte size, same timestamp, before and after this work).

- **Date range:** July 27 – October 27, 2026 (per `Filters.csv`), Web search only.
- **Dimensions present:** `Queries.csv` (query only), `Pages.csv` (page only), `Countries.csv` (country only), `Devices.csv`, `Search appearance.csv`, `Chart.csv` (daily totals). **There is no joined query×page export in this ZIP.**
- **Row caps, confirmed by direct count:** `Queries.csv` = 999 data rows; `Pages.csv` = 1000 data rows — both hitting the GSC UI's ~1000-row export cap. Summed impressions: Queries.csv totals only 26,187 impressions vs. Pages.csv's 66,760 — meaning **the query list captures only ~39% of total impression volume**; most long-tail query diversity is invisible in this export. Any "queries ranking 4–20" analysis below is a look at the visible fraction only, not the complete query set.
- **No query→page join exists.** Every page-level attribution below is stated as a **correlation** (matching magnitude, topic, and position range between an independent query row and an independent page row), never asserted as a confirmed mapping, per the explicit instruction not to infer this from unrelated totals.

### The single strongest opportunity found

**The query "high atlas"**: 4,490 impressions, **0 clicks**, average position 9.4 — 17% of all impressions in the entire (capped) query export, going nowhere.

**The page `/es/travel-info/atlas-mountains-guide`**: 4,098 impressions, 2 clicks, position 9.9 — by far the largest page in the entire Pages.csv export after the homepage and one other guide page. The magnitude match (4,098 ≈ 4,490) and matching topic/position strongly suggest this Spanish page is serving most of that query's impressions — directly confirming the task's named candidate, "the Spanish Atlas Mountains Guide," with concrete evidence, not assumption.

Across all 11 locale copies of this one page: **6,125 impressions, 4 clicks — a 0.065% CTR** at an average position around 9–13 (page 1, bottom, to page 2, top). For comparison, the English homepage earns an 8.66% CTR at a *worse* average position (16.8) — proof that a compelling snippet converts impressions into clicks on this site even from page 2, and that this guide's problem is the snippet, not an unreachable position.

---

## 2. Prioritized findings and opportunities (with evidence)

| # | Finding | Evidence | Priority |
|---|---|---|---|
| 1 | **Atlas Mountains Guide** — `/travel-info/atlas-mountains-guide`, all locales, especially ES | 6,125 impr / 4 clicks (0.065% CTR) across locales; query "high atlas" alone = 4,490 impr / 0 clicks at pos 9.4; corroborating queries "atlas mountains" (328/0/12.2), "imlil" (148/0/19.4), "ourika valley" (87/1/17.7) match the page's own title keywords exactly | **Highest** |
| 2 | **Amazigh/Berber Culture Guide** — `/travel-info/amazigh-berber-culture`, especially NL and EN | 2,330 impr / 15 clicks (0.64% CTR) across locales; query "amazigh" = 973 impr / 3 clicks at pos 9.8; `/nl/...` page alone = 1,280 impr / 3 clicks | **High** |
| 3 | **Morocco Airports Guide** — `/en/travel-info/morocco-airports-guide` | 450 impr / 3 clicks at the excellent position 5.8; matching queries "best airport in morocco" (pos 3.5), "best airport to fly into morocco" (pos 6.3) both at 0 clicks — small absolute volume but the cleanest "great position, no clicks" signal on the site | **Medium** (small volume) |
| 4 | **Morocco Travel Safety Guide** — `/en/travel-info/morocco-travel-safety` | 324 impr / 1 click at position **43.2** — this is a *ranking* problem, not primarily a CTR problem (unlike #1–3). The page already has 6 internal inbound links from other guides' `relatedGuides` plus a blog reference — a comparable internal-link profile to the other three guides, so under-linking does not appear to explain the weak position. **No high-confidence, safe fix was identified and none was made** — see §4. | Investigated, not actioned |
| 5 | Further pages showing the same "good position, near-zero clicks" pattern, not actioned this round: `/en/merzouga-guide/erg-chebbi` (1,440/5/9.4), `/ar/destinations/draa-valley` (695/0/9.6), `/ja/destinations/ait-ben-haddou` (672/1/8.2) | Found while scanning the top 20 pages by impressions | Flagged for a future round |
| 6 | Dutch-market route queries at strong positions, zero clicks: "marrakech naar merzouga" (pos 5.9/0 clicks), "merzouga naar marrakech" (pos 6.6/0 clicks) | No confirmed page-level match found in Pages.csv for these specific phrasings — **not actioned**, flagged only, per the instruction not to guess a query→page mapping without evidence | Flagged, not actioned |
| 7 | Priority-market country stats (Jul 27–Oct 27, 2026): Italy 72 clicks/5,087 impr/14.4 pos; Netherlands 42/4,085/16.46; Spain 30/3,168/15.59; United States 26/3,703/21.85; United Kingdom 17/1,709/17.2 | `Countries.csv`, exact rows | Context for all of the above — all five sit at page-2 average position with sub-1.5% CTR, consistent with a site that ranks but needs both CTR and position work across the board |
| 8 | ~93 genuinely commercial tour-itinerary queries found ("tour from marrakech," "tour marocco X giorni," "luxury desert camp," etc.) | Mostly at weak positions (20–80), near-zero clicks | Not a quick-win candidate — this needs sustained content/authority work, not a metadata tweak; correctly out of scope for this round |

---

## 3. Source-file inspection (Phase 1.5)

Read directly, not assumed:
- `src/data/seoHub.ts` — all three edited guides' actual content (`sections`, `faqs`, `tours`, `destinations`, `relatedGuides`) was inspected in full. **The content itself is specific, locally-informed, and not thin** — the problem is the SERP snippet, not the page body, so no content rewrite was attempted.
- `src/components/seo/route-metadata.ts` — confirmed as the single source of truth for `<title>`/meta description for `/travel-info/*` routes, consumed identically by the live React page (`LocalizedHead`) and the prerendered static HTML (`scripts/prerender.ts`'s `metaFor()`/`getLocalizedRouteMeta()`).
- `src/components/seo/SeoHubPage.tsx` — confirmed `page.title` (from `seoHub.ts`) renders the visible **H1**, which is separate from the `<title>` tag. **The H1 was left untouched** for all three pages — it was already a good match for intent, and the task scoped allowed changes to titles/meta descriptions, not content restructuring.
- Confirmed `seoHub.ts`'s own `pageTitle`/`description` fields are **not** consumed for `travel-info`-kind pages (only for `merzouga-guide` and `comparisons` routes, via two specific regex-matched branches in `getLocalizedRouteMeta`) — so editing only `route-metadata.ts` was correct and sufficient; `seoHub.ts` did not need a parallel edit.
- Internal links: all three target pages already have `tours`, `destinations`, and `relatedGuides` cross-links to relevant tour/destination pages (e.g., Atlas Mountains → `marrakech-imlil-day-trip`, `marrakech-ourika-valley-day-trip`, destinations `imlil`/`ourika-valley`/`ifrane`). **No internal-linking gap was found** that needed fixing for these three pages.
- Canonical/hreflang: unchanged — confirmed by the hreflang audit passing 0/0 after the edit, with no canonical/hreflang rule touched.

---

## 4. Changes implemented

**File changed: `src/components/seo/route-metadata.ts` only.** 6 lines changed (6 insertions, 6 deletions) — title and description text only, no structural, canonical, hreflang, or content change.

| Route | Locale | Change |
|---|---|---|
| `/travel-info/atlas-mountains-guide` | EN | Title: "Atlas Mountains Morocco — High Atlas, Imlil, Toubkal & Ourika Guide" → "High Atlas Mountains Guide — Imlil, Toubkal & Ourika Valley Day Trips". Description rewritten to lead with the practical "planning a day trip" hook (also fixed a pre-existing 175-char description that exceeded the 170-char audit threshold — now 168 chars). |
| `/travel-info/atlas-mountains-guide` | ES | Title: "Montañas del Atlas, Marruecos — Alto Atlas, Imlil, Toubkal y Ourika" → "Alto Atlas Marruecos — Guía de Imlil, Toubkal y el Valle de Ourika". Description rewritten the same way, in natural Spanish (not a mechanical translation of the English rewrite). |
| `/travel-info/atlas-mountains-guide` | NL | Same treatment, in natural Dutch. |
| `/travel-info/amazigh-berber-culture` | EN | Title: "Amazigh (Berber) Culture in Morocco — A Traveler's Introduction" → "Who Are the Amazigh (Berber) People? Morocco Culture Guide" — reframed as a direct answer to the dominant bare-word query "amazigh"/"berber". |
| `/travel-info/amazigh-berber-culture` | NL | Same reframing, in natural Dutch (not a translation of the English rewrite). |
| `/travel-info/morocco-airports-guide` | EN | Title: "Marrakech, Casablanca or Fes — Which Morocco Airport to Fly Into" → "Best Airport to Fly Into Morocco — Marrakech, Casablanca or Fes?" — leads with the exact phrasing of the matching queries. Description left unchanged; it already matched intent well. |

**Not changed, deliberately:**
- `morocco-travel-safety` — no title/description/content change made. Its dominant-locale (EN) problem is position (43.2), not CTR, and no safe, evidence-backed fix for that was identified this round (see §2, finding 4).
- The other 8 locales of the Atlas guide and 9 locales of the Amazigh guide — left as-is; smaller individual volume, and a rushed mechanical translation of the new English copy would have violated the explicit "without translating content mechanically" instruction. Flagged as future work.
- No new pages were created. No canonical, hreflang, or redirect rule was touched. No content section, FAQ, tour link, or destination link was changed. The locked review system was not touched.

---

## 5. Validation results

| Check | Result |
|---|---|
| `npm run typecheck` | Clean, 0 errors |
| `npm run build` (gates on `typecheck` + `test:deterministic`) | Exit 0. Sitemap: unchanged at 2002 URLs (no route added/removed, so byte-identical regeneration — confirmed `sitemap.xml` does **not** appear in `git status` after this change). SEO content audit: 2017 pages checked, **55 warnings — down from 56** (the English Atlas description's pre-existing 175-char length violation was fixed as a side effect of the rewrite) |
| `npm run route:audit` | 2017 pages, 2002 sitemap URLs, 15 warnings (same pre-existing orphan set) / 0 errors — **PASS** |
| `npm run hreflang:audit` | 2013 pages, **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | Unchanged: 1357 English keys, 0 empty translations — no regression (no new translation keys were added; existing keys were edited in place) |
| Compiled-output check | Grepped all six built pages' `<title>` tags directly in `dist/` — all six show the new text correctly |
| Git status | Only `src/components/seo/route-metadata.ts` modified, plus the pre-existing, untouched `artifacts/image-inventory.json`. No other file changed. The GSC export ZIP is confirmed byte-identical (same size, same timestamp) to before this work. |

**Remaining limitations:**
- The query→page attributions above are corroborated, not proven (no joined export exists).
- The Queries.csv export covers only ~39% of total impression volume (row-capped); long-tail opportunities beyond the visible ~1,000 queries are invisible to this analysis.
- No ranking or click change can be claimed yet — Google has not recrawled these pages since the edit, and no post-change Search Console data exists.
- The Safety guide's position-43 problem remains unresolved and undiagnosed beyond what's stated in §2.

---

## 6. Measurement plan

1. **Recrawl timing:** these are existing, already-indexed URLs with only `<title>`/meta changes — Google typically re-crawls and refreshes SERP snippets for pages like this within a few days to ~2 weeks, faster if the pages get organic traffic in the meantime (they do). No `Last-Modified`/sitemap signal changed (sitemap is byte-identical), so there is nothing extra to resubmit; Search Console's URL Inspection → Request Indexing tool could be used manually on the 6 changed URLs if the business wants to prompt a faster recrawl — not done here, as that's a Search Console action outside this repository.
2. **What to re-pull, and when:** a fresh `Performance on Search` export (same filter: Web, Queries + Pages) for a window **starting at least 1–2 weeks after today** (2026-10-28), ideally a 28-day window once available, so the "before" (this report's Jul 27–Oct 27 window) and "after" windows don't overlap.
3. **What to check specifically:**
   - CTR and clicks for the exact 6 edited URLs (compare against this report's §2/§4 baseline numbers directly).
   - The "high atlas" / "amazigh" / "berber" / airport-related queries' impressions, clicks, and position — confirm whether CTR moved, and whether position held or improved.
   - Confirm total impressions for these topics didn't drop (a title change can occasionally shift which queries a page matches — worth checking it didn't lose relevance for its existing keyword set).
4. **Success signal:** CTR materially above the current 0.04–0.67% range on the edited pages, with position stable or improved — not a specific numeric target, since no baseline conversion rate for a rewritten title can be predicted in advance.
5. **No ranking or click improvement should be claimed until that fresh export is in hand** — consistent with this round's instruction.

---

## 8. Phase 12 — commercial landing-page review (no change implemented)

**Goal of this stage:** find the single highest-confidence improvement to an existing *commercial* landing page (not an informational guide) across three priorities — Marrakech/Fes↔Merzouga tours, private/luxury tours, and Spanish honeymoon tours. Re-opened the same GSC export (re-verified byte-identical to the original ZIP) and inspected the actual commercial `/tours/*` and tool pages this time, not the `/travel-info/*` and `/merzouga-guide/*` informational pages the earlier phases focused on.

### What was checked, by priority

**Priority 1 — Marrakech↔Merzouga / Fes↔Merzouga tour pages (confirmed page-level data, all low volume and weak positions):**

| Tour page (all locales summed) | Impr | Clicks | CTR |
|---|---|---|---|
| `4-day-marrakech-merzouga-sahara` | 161 | 5 | 3.1% |
| `3-day-fes-merzouga-sahara` | 55 | 2 | 3.6% |
| `4-day-fes-marrakech-via-merzouga` | 43 | 1 | 2.3% |
| `3-day-sahara-marrakech` | 116 | 5 | 4.3% |

None show the "strong position, near-zero CTR" pattern that justified the Phase 11/§7 fixes. The English versions in particular sit at weak positions (e.g. `4-day-marrakech-merzouga-sahara` EN at position **71.1**; `3-day-fes-merzouga-sahara` EN at **42.5**) — a ranking problem, not a snippet problem, and not something a title/description edit can be expected to fix. **No safe, high-confidence change identified here.**

**Priority 2 — Private/luxury tours:** checked `/trip-builder` (the private-itinerary tool) and `/desert-tours`.
- `/en/trip-builder`: 217 impr, 4 clicks, position **8.9** — a genuinely good position, but 1.84% CTR is within a normal range for that position, not the catastrophic 0.04–0.67% seen on the Phase 11 pages. Its current title, "Build Your Morocco Itinerary — Private & Custom Trip Planner," already leads with "Private" and "Custom" — there is no clear title/intent mismatch to fix, unlike Atlas (dry geography title) or erg-chebbi (fact-led title). **No confident rewrite candidate found.**
- `/desert-tours` (EN 109 impr/pos 57.1, FR 212 impr/pos 50.7): deep positions — a ranking problem, same as the tour pages above, not actionable via a small edit.

**Priority 3 — Spanish honeymoon tour, re-investigated more thoroughly than Phase 11/§7:**
`/es/tours/honeymoon-morocco` — 120 impr, 0 clicks, position **54.8**, against 6.3–29.1 for every other locale of the identical tour. The query "tour luna de miel marruecos" (118 impr, 0 clicks, position **54.8**) matches the page's own position to one decimal place — the strongest correlation found across both phases, though still not a confirmed join. This round added two checks beyond Phase 11's technical audit:
- **Content depth:** read the actual Spanish tour content (`src/i18n/content/generated/es.json`) directly — a complete, detailed, day-by-day itinerary translation, not thin or missing. Rules out "incomplete Spanish content" as the cause.
- **Structured data parity:** the built ES and EN pages both emit exactly 5 JSON-LD blocks each (`grep -c` on the built HTML) — no missing schema block on the Spanish version.
- (Carried over from Phase 11: title already contains "Luna de Miel," "Marruecos," "Tour"; canonical is correct and self-referential; `robots` allows indexing; 12 hreflang tags present.)

With title, canonical, robots, hreflang, content completeness, and structured-data block count all confirmed equivalent to the well-ranking locales, **no on-page or technical cause remains to fix.** The most likely explanation — Spanish-market SERP competition or a Spanish-specific authority/backlink gap — is outside what a safe, reversible repository change can address.

### Decision: no change implemented this phase

All three priorities were investigated with the same rigor as the successful Phase 11 fixes. None met the bar for "small, safe change, high confidence" — either the position gap is too large for a metadata tweak to plausibly close (Priority 1, `/desert-tours`), the existing page is already reasonably optimized with no clear mismatch to fix (`/trip-builder`), or a real, well-evidenced problem exists with every on-page cause already ruled out (Priority 3). Per this phase's own instruction — "choose at most ONE implementation, and only if the evidence supports a small, safe change; otherwise provide a recommendation without editing" — the correct action is to report this honestly rather than make a speculative edit.

**No file was changed, staged, committed, or reverted this phase.** `git status` is identical to the end of §7: only `route-metadata.ts` (the 7 edits from §4/§7) and the pre-existing, untouched `artifacts/image-inventory.json`. No validation run was needed since nothing changed.

### Recommendation for a future phase (not a quick win — needs a business decision first)

If the business wants to pursue the Spanish honeymoon-tour gap specifically, the next step isn't a repository edit — it's deciding whether to invest in Spanish-market content depth (a genuinely different, longer article or a dedicated Spanish-language landing treatment, not a translation) or Spanish-specific backlinks/promotion, and only then revisiting the page. Flagging it here rather than guessing at a fix that isn't evidenced. — non-branded commercial queries

Re-opened the same GSC export (re-extracted from the untouched ZIP; original confirmed byte-identical throughout) to look specifically at non-branded commercial queries: private tours, Sahara/Merzouga, Marrakech/Fes↔Merzouga routes, luxury, and Spanish-language searches. **No query↔page join exists in this export**, so every attribution below is stated as a correlation (matching magnitude, topic and position between independent query and page rows) unless marked "confirmed."

### Findings

**Finding 1 — IMPLEMENTED. `/merzouga-guide/erg-chebbi` (EN): dry title, near-zero CTR at a strong position.**
Page-level (confirmed): 1,440 impressions, 5 clicks, position 9.4 — a 0.35% CTR. Query-level correlation (moderate confidence, not a confirmed join): "erg chebbi" (866 impr / 0 clicks / pos 13.0) + "erg chebbi dunes" (121 impr / 0 clicks / pos 15.1) sum to 987 impressions — same order of magnitude and position band as the page. The old title led with a geographic fact ("Morocco's Tallest at 150m"); the content itself is about the camel-trek/camp/sunset experience, which the title didn't signal. Same fix pattern as the Atlas/Amazigh guides in §2–4, which is the only reason confidence is high enough to act despite the weaker query-match than the Atlas case.

**Finding 2 — RECOMMENDED, NOT IMPLEMENTED. `/merzouga-guide/desert-camps` vs `/merzouga-guide/luxury-desert-camps`: likely cannibalization.**
Confirmed page-level stats: `desert-camps` (EN) 755 impr / 14 clicks / position **12.7**; `luxury-desert-camps` (EN) 209 impr / 1 click / position **34.7** — a stark gap between two pages about the same specific sub-topic. Query-level correlation: "merzouga luxury desert camp(s)" and close variants (≈19 queries found, summing to roughly 110–190 impressions, all at positions 25–65, 0 clicks) match `luxury-desert-camps`'s poor position band. Read both pages in full: their content genuinely overlaps (both describe en-suite bathrooms, heating, honeymoon suitability, the same camel-trek-dinner-fire evening programme), and both already cross-link to each other via `relatedGuides` and to the same three tours (`honeymoon-morocco`, `3-day-sahara-marrakech`, `7-day-imperial-cities-sahara-escape`) — so the obvious "add a missing internal link" fix doesn't apply, it's already there. Their titles are also already reasonably distinct ("Standard vs Luxury Guide" vs "What You Get"). **Why nothing was changed:** `SeoHubPage.tsx` renders section paragraphs as plain text with no inline-link support (confirmed by reading the component — unlike the blog's separate `[label](/path)` mechanism), so a genuine contextual in-paragraph link between the two pages' overlapping sections would require a rendering-system change affecting every guide page site-wide — too broad for a "smallest safe change." A further title tweak was considered and rejected: the titles aren't the likely cause given they're already distinct. This needs a deliberate content-differentiation decision (what is each page's unique angle) rather than a one-line fix, so it is reported, not actioned.

**Finding 3 — RECOMMENDED, NOT IMPLEMENTED. `/es/tours/honeymoon-morocco`: severe, Spanish-specific underperformance.**
Page-level (confirmed): 120 impressions, **0 clicks**, position **54.8** — against every other locale of the identical tour page: AR 6.8, PT 6.3, FR 6.5, IT 9.4, KO 10.6, DE 20.4, JA 29.1. Query-level: "tour luna de miel marruecos" — 118 impressions, 0 clicks, position **54.8**, an exact match to one decimal place with the page's own measured position — the strongest page↔query correlation found in this review, short of an actual join. Investigated for a safe fix: the ES title already reads "Luna de Miel Romántica en Marruecos — Tour Privado de Lujo de 10 Días" (already contains "luna de miel," "marruecos," "tour" — the exact matching terms), and the built page's canonical (`https://www.moroccograndadventure.com/es/tours/honeymoon-morocco`, self-referential, correct), `<meta name="robots" content="index, follow, ...">`, H1, and hreflang (12 tags present) were all checked directly in `dist/` and are clean. **No technical or metadata defect was found that would explain a 48-position gap against every sibling locale of the same page.** The likely cause (Spanish-market competition depth, or a Spanish-specific backlink/authority gap) is outside what a safe repository-level change can address this round — reported for a future, dedicated investigation rather than guessed at.

### Changes implemented this stage

**File changed: `src/components/seo/route-metadata.ts` only** — 1 more line (1 insertion, 1 deletion), on top of the 6 from §4. Total diff for this file across both stages: 7 insertions, 7 deletions.

| Route | Locale | Change |
|---|---|---|
| `/merzouga-guide/erg-chebbi` | EN | Title: "Erg Chebbi Dunes, Merzouga — Morocco's Tallest at 150m" → "Erg Chebbi Dunes Merzouga — Camel Trek, Camp & Sunset Guide". Description rewritten to lead with the camel-trek/light/camp-night experience rather than the dune-height fact (157 chars, under the 170-char threshold). |

No content, FAQ, tour/destination link, canonical, hreflang, or structured-data change was made anywhere this stage. No URL was created, renamed, or removed.

### Validation (this stage)

| Check | Result |
|---|---|
| `npm run typecheck` | Clean, 0 errors |
| `npm run build` | Exit 0. SEO content audit: 2017 pages, **55 warnings** — unchanged from the §5 baseline (this edit didn't change title/description length or cross-locale duplication) |
| `npm run route:audit` | 2017 pages, 2002 sitemap URLs, 15 warnings (same pre-existing orphan set) / 0 errors — **PASS** |
| `npm run hreflang:audit` | 2013 pages, **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | Unchanged: 1357 English keys, 0 empty translations |
| Compiled-output check | `dist/en/merzouga-guide/erg-chebbi.html`'s `<title>` confirmed showing the new text |
| Git status | Only `route-metadata.ts` modified (now 7/7 lines total across both stages), plus the pre-existing, untouched `artifacts/image-inventory.json`. No other file changed. GSC export ZIP re-verified byte-identical. |

**Note:** one background validation run was interrupted by an unrelated session restart mid-task; it was re-run in full afterward with identical results (same PASS/warning counts shown above) before this report was finalized — nothing was left unverified.

### Measurement plan addendum

Same plan as §6 applies to the new `erg-chebbi` change — add it to the same future re-pull and compare against today's baseline (1,440 impr / 5 clicks / pos 9.4 / 0.35% CTR). For the two reported-but-not-implemented findings, the useful next step isn't a Search Console re-check but a **decision**: for Finding 2, whether to deliberately redefine `luxury-desert-camps`'s unique angle (and only then revisit its title/content); for Finding 3, whether the business wants to invest in Spanish-market content depth or backlinks for the honeymoon tour, which is a bigger initiative than this review's scope.

---

## 9. Phase 13 — Authority Sprint (internal-link graph, EEAT audit, contextual-link fixes)

**Goal of this stage:** strengthen topical authority and commercial-page authority through evidence-first internal linking and EEAT surfacing — not new content. Scope: the 9 strongest commercial/informational pages — `3-day-sahara-marrakech`, `4-day-marrakech-merzouga-sahara`, `3-day-fes-merzouga-sahara`, `5-day-imperial-cities`, `7-day-imperial-cities-sahara-escape`, `/flights`, `morocco-airports-guide`, `erg-chebbi` (Merzouga guide), `atlas-mountains-guide`.

### Step 1 — Authority audit: how these 9 pages actually link today

**Mechanism confirmed by reading the code (not assumed):** tour pages get contextual guide links from one source only — `src/data/tourDepth.ts`'s `TOUR_DEPTH[id].guideLinks: string[]`, consumed identically by the runtime SPA (`tour-detail.tsx`) and the prerenderer (`scripts/prerender.ts`) via the same `allHubs = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO]` lookup — so one data edit updates both. A second, independent mechanism (`src/components/seo/TopicalLinks.tsx`, rendered globally by `Layout.tsx` for every `/tours/:id` route) adds route-stop destination links, 1–2 route-overlap related tours, and a fixed `private-vs-shared-tour` comparison link — but **never a guide link**. Guide pages get incoming tour links from their own `tours: string[]` array in `src/data/seoHub.ts`, rendered as a "Related tours" grid.

**Incoming-link counts found (seoHub.ts `tours:` array mentions, before this stage's edits):**

| Tour | seoHub `tours:` mentions | Homepage link | Blog-article CTA links |
|---|---|---|---|
| `3-day-sahara-marrakech` | 29 | Yes (`FEATURED_TOUR_IDS`) | 6 |
| `4-day-marrakech-merzouga-sahara` | 14 | Yes (`SAHARA_CROSSING_TOUR_IDS`) | 2 |
| `3-day-fes-merzouga-sahara` | 10 | Yes (`SAHARA_CROSSING_TOUR_IDS`) | 1 |
| `7-day-imperial-cities-sahara-escape` | 13 | Yes (`FEATURED_TOUR_IDS`) | **0** |
| `5-day-imperial-cities` | **1** | Yes (`FEATURED_TOUR_IDS`) | 1 |

**Missing-link findings (the core Step 1 result):**
1. **No tour → guide link to `erg-chebbi`, `atlas-mountains-guide` or `morocco-airports-guide` existed for any of the 5 target tours**, despite every one of them explicitly describing the Erg Chebbi dune/camel-trek/camp experience in its own `whyChoose`/FAQ/description text, and 4 of the 5 (all but the Fes route, which crosses the Middle Atlas instead) explicitly naming the High Atlas / Tizi n'Tichka crossing. `tourDepth.ts`'s own header comment states this exact mechanism exists precisely for "contextual 'plan with our guides' links" — it was simply unused for these three target guides.
2. **`5-day-imperial-cities` is a genuine outlier** — 1 incoming `tours:` mention vs. 10–29 for its siblings, despite its own description explicitly including a camel trek and "a luxury desert camp" night, i.e. the same activities its siblings are already linked from.
3. **`7-day-imperial-cities-sahara-escape` had zero incoming blog-article links** — well-linked from merzouga-guide hub pages (13 mentions) and the homepage, but absent from every blog CTA, including the Fes/Chefchaouen article whose CTA already links its 5-day sibling.
4. **No orphan pages found** among the 9 — all have at least one homepage and multiple hub-page inbound links; the gaps are specific and contextual, not structural isolation.

### Step 2 — EEAT audit

Read the blog's existing long-form content (`src/data/blog-article-sections.ts`) rather than inventing anything new. The article `marrakech-to-merzouga-3-day-sahara-tour` already contains genuine, specific, non-generic local-expertise content tied to the 3-day/4-day tours: honest pacing advice ("Day two is the fullest day... which is where the trip actually feels busy"), an explicit trade-off recommendation ("If something has to give within this pace, protect the desert night rather than any one roadside stop"), and a private-driver-guide logistics note (stops timed around light and crowds rather than a fixed schedule). Every one of the 5 target tours already carries its own tour-specific, honest FAQ block in `content.ts` (not a generic fallback) — e.g. `3-day-sahara-marrakech`'s FAQ already states plainly that international flights are excluded and that there is no single cheapest-airfare month. This is real EEAT material already in the repository; the gap is **retrieval/linking**, not missing expertise — which is why Step 3 targets internal links rather than rewriting FAQ or itinerary text that already matches search intent.

### Step 3 — Implemented changes (3, all Priority 2: contextual internal links)

Chosen over FAQ rewrites because the FAQs already independently match search intent per-tour (see Step 2); chosen over comparison sections and CTA placement because no evidence of a gap was found there (the `private-vs-shared-tour` comparison already renders on every tour page via `TopicalLinks`).

| # | Change | File | Grounding |
|---|---|---|---|
| 1 | Added `erg-chebbi` guide link to all 5 target tours' `guideLinks`; added `atlas-mountains-guide` to the 4 whose own content names the High Atlas / Tizi n'Tichka crossing (excluded `3-day-fes-merzouga-sahara`, which crosses the Middle Atlas instead) | `src/data/tourDepth.ts` | Every added link resolves to a slug each tour's own existing `whyChoose`/description text already names |
| 2 | Added `5-day-imperial-cities` to the `tours:` array of the `camel-trekking` and `luxury-desert-camps` merzouga-guide pages (alongside its 3-day/7-day siblings already there), and added `luxury-desert-camps` to its own `guideLinks` for symmetry | `src/data/seoHub.ts`, `src/data/tourDepth.ts` | Tour's own description: "a camel caravan... carries you out across the sand... to a luxury desert camp" |
| 3 | Added `7-day-imperial-cities-sahara-escape` to the Fes/Chefchaouen blog article's existing CTA block alongside its 5-day sibling; updated the CTA text to name both honestly | `src/data/blog-article-sections.ts` | 7-day tour's own `routeIds` include `fes`; its own `whyChoose` text: "Merzouga gets a full desert day, not an overnight dash" — accurately distinguishes it from the 5-day version already linked there |

No FAQ, itinerary, title, meta-description, canonical, hreflang, or structured-data content was changed. No new page or route was created. No shared constant used by other, non-target tours (`MARRAKECH_CORE`, `FES_CORE`) was modified in place — each target tour's `guideLinks` was given its own explicit array (spreading the shared constant plus its additions) so `marrakech-4-day`, `fes-4-day`, `fes-5-day`, `fes-8-day` and `4-day-fes-marrakech-via-merzouga` are untouched.

### Files changed

`src/data/tourDepth.ts` (5 entries edited: `3-day-sahara-marrakech`, `4-day-marrakech-merzouga-sahara`, `3-day-fes-merzouga-sahara`, `7-day-imperial-cities-sahara-escape`, `5-day-imperial-cities`), `src/data/seoHub.ts` (2 `tours:` arrays edited: `camel-trekking`, `luxury-desert-camps`), `src/data/blog-article-sections.ts` (1 CTA block edited: `fes-chefchaouen-blue-city-guide`). Diff stat: 3 files changed, 27 insertions, 22 deletions (data-only; no new files).

### Validation

| Check | Result |
|---|---|
| `npm run typecheck` | Clean, 0 errors (run twice — before and after the final `seoHub.ts` edit) |
| `npm run build` | Exit 0 both runs. Deterministic test suite: all PASS (pricing, inquiry, photo library, catalog srcset, flight links, WhatsApp regression) |
| `npm run route:audit` | 2017 pages, 2002 sitemap URLs, 411,157 internal links checked, **0 errors** — 15 warnings, all pre-existing (`/book` locale orphans, 2 non-Latin-slug encoding quirks), unrelated to this stage's edits — **PASS** |
| `npm run hreflang:audit` | 2013 pages, 24,156 hreflang links, 20,130 reciprocity pairs — **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | 1357 English keys; missing-key/fallback counts and hard-coded-UI candidates unchanged from baseline — no new key was introduced (all additions reuse existing slugs/strings) |
| Git status | Only `tourDepth.ts`, `seoHub.ts`, `blog-article-sections.ts` newly modified, plus the pre-existing, untouched `route-metadata.ts` (§4/§7) and `artifacts/image-inventory.json`. No other file changed. Confirmed via `git status --short` restricted to tracked files — the build/prerender run touched no additional tracked file. |

### Step 4 — Authority-gap roadmap (not written; ranked for a future decision)

1. **Flights ↔ Airports Guide ↔ commercial tours cross-linking** (High impact, low effort). The Flights feature (T27) and `morocco-airports-guide` are both live but not cross-linked to each other or to the 5 target tours' `guideLinks`, despite several tour FAQs already discussing arrival logistics (e.g. `3-day-sahara-marrakech`'s "Are flights included?" answer). Highest expected impact because it connects two already-built, currently-disconnected assets — no new content needed, same low-risk pattern as this stage.
2. **Atlas Mountains Guide ↔ Middle Atlas framing gap** (Medium impact, low effort). The guide's own description already covers "High Atlas, Middle Atlas and Anti-Atlas," but its current title (post-Phase-11) leads with "High Atlas" only — worth a future check on whether `3-day-fes-merzouga-sahara` (Middle Atlas / Ifrane route, deliberately excluded from this stage's High-Atlas link) should link to a Middle-Atlas-specific section once the page's framing is confirmed, rather than adding a topically imprecise link now.
3. **`desert-camps` (standard, non-luxury) ↔ 5-day-imperial-cities** (Medium impact, low effort). This stage linked `5-day-imperial-cities` to `camel-trekking` and `luxury-desert-camps` specifically because its own description says "luxury desert camp"; if the business ever repositions that tour's camp tier, the plain `desert-camps` guide is the next natural link to revisit.
4. **Spanish-market honeymoon-tour gap** (carried over from §8 — High potential impact, high effort/outside repo scope). Still the largest known authority gap found across Phases 11–13; requires a business decision on Spanish content/backlink investment, not a repository edit.
5. **`TopicalLinks.tsx` guide-link gap** (Low priority, non-trivial effort). The second, independent related-link mechanism used site-wide on every tour page (route stops + overlap tours + one comparison) never surfaces a guide link at all. Extending it would affect every tour page, not just these 5 — a larger, riskier change than this stage's scope; flagged for a future, dedicated review rather than bundled here.

**No Git action taken.** Nothing was staged, committed, pushed, or deployed this stage, per this phase's explicit instruction to stop before Git.

---

## 10. Phase 14 — Flights, Airports & Commercial Tour Internal-Link Integration

**Goal of this stage:** act on §9/Step 4 roadmap item 1 — connect the Flights page, the Airports Guide and relevant tours into one navigable chain, using only existing mechanisms, smallest safe diff.

### Link graph before this stage (read-only audit)

Read `src/pages/flights.tsx`, `morocco-airports-guide` in `src/data/seoHub.ts`, `src/components/seo/SeoHubPage.tsx`, `scripts/prerender.ts`'s `buildFlightsContent`, and `src/App.tsx`'s route table first.

- **`/flights`** (bespoke React page, not seoHub-driven): outgoing links were an external Google Flights search per airport, `/tours/from-{city}` per airport **with a `cityHubId`**, and three bottom CTAs (`/trip-builder`, `/desert-tours`, WhatsApp). **No link to `morocco-airports-guide` anywhere**, despite the directory section literally being "which airport should I fly into" — the guide's exact topic.
- **`morocco-airports-guide`** (`TRAVEL_INFO` hub, rendered by the shared `SeoHubPage.tsx`): already had `tours: ['3-day-sahara-marrakech', '3-day-fes-merzouga-sahara', '5-day-imperial-cities', 'casablanca-5-day', 'tangier-3-day', '3-day-sahara-agadir']` and `relatedGuides: ['how-to-get-there', 'getting-around-morocco', 'morocco-basics', 'marrakech-vs-fes']` — solidly linked to tours and other guides already. **No link to `/flights`** — the one page on the site that would most help a reader who has just picked an airport. 3 of the 5 Phase-13 target tours were already present in its `tours:` array; **`4-day-marrakech-merzouga-sahara` and `7-day-imperial-cities-sahara-escape` were missing**, despite both departing from the exact cities (Marrakech/Fes) this guide discusses.
- **Route/locale check:** `/flights` and `/travel-info/:slug` are both registered, locale-prefixed routes (`src/App.tsx`); `route-metadata.ts` confirms `/travel-info/morocco-airports-guide` has full per-locale title/description in all 11 locales, while `/flights` has only an English entry — consistent with the Flights feature's documented "English-first phase." Internal `<Link>` targets in this codebase are written unprefixed (`/travel-info/...`) because wouter's router is mounted with the locale as `base`, confirmed by the exact same pattern already used for `/tours/from-{city}` in `flights.tsx` itself.
- **Mechanism check (why the fix is asymmetric):** `HubPage` (`src/data/seoHub.ts`) has no field for linking to a non-hub route — `relatedGuides` resolves strictly against `ALL_HUB_PAGES` (`MERZOUGA_GUIDES`/`COMPARISONS`/`TRAVEL_INFO`) via `SeoHubPage.tsx`'s `bySlug`, confirmed by reading the resolver directly. `/flights` is not a hub page, so `morocco-airports-guide` cannot link to it through any existing data field without either adding a new generic field (a site-wide rendering change, prohibited by rule 4 for a single-page need) or special-casing the shared `SeoHubPage.tsx` component for one slug (also a shared-component edit). Per rule 4, neither was done — this mirrors the same discipline already applied in §9/§7 (declining the `desert-camps`↔`luxury-desert-camps` in-paragraph link for the identical reason). `/flights`, by contrast, is a bespoke, single-purpose React component, so adding one link there touches only that page.

### Links added, and why each helps a visitor

| # | Link | Direction | File(s) | Why it helps |
|---|---|---|---|---|
| 1 | `/flights` → `/travel-info/morocco-airports-guide`, placed directly under the "Moroccan Airport Directory" heading/intro | Flights → Airport info | `src/pages/flights.tsx` (live page), `scripts/prerender.ts` (`buildFlightsContent`, static mirror), `src/i18n/locales/en.ts` (new label key `fl_directory_airport_guide_link`) | A visitor comparing 14 airports in a flat directory has no page that explains *which one fits their trip* — the guide does exactly that (by itinerary shape, not just by city), right at the point the directory raises the question. |
| 2 | `morocco-airports-guide`'s `tours:` array: added `4-day-marrakech-merzouga-sahara`, `7-day-imperial-cities-sahara-escape` | Airport info → relevant tours | `src/data/seoHub.ts` | Completes the existing "Related tours" grid (already showing 3 of 5 Marrakech/Fes-departure Sahara tours) with the 2 it was missing, so a reader who has just decided to fly into Marrakech or Fes sees the full set of matching private tours, not 3 of 5. |

This completes the exact chain the task describes — flight planning → airport choice → relevant tours — without adding a new page, a new rendering mechanism, or a reverse (tour → airport-guide) link that wasn't asked for and wasn't needed to complete that chain (kept to rule 3's "smallest high-confidence set"; the already-validated `tourDepth.ts`/`guideLinks` mechanism from §9 was deliberately left untouched this stage).

### Files changed

`src/pages/flights.tsx` (1 link added), `scripts/prerender.ts` (1 matching line in `buildFlightsContent` so the static/crawler HTML matches the live page), `src/i18n/locales/en.ts` (1 new key, English-only — same fallback convention already used by every other `fl_*` key), `src/data/seoHub.ts` (1 `tours:` array extended by 2 entries). No new file. No content, FAQ, title, meta-description, canonical, hreflang, or structured-data change.

### Validation

| Check | Result |
|---|---|
| `npm run typecheck` | Clean, 0 errors |
| `npm run build` | Exit 0. Deterministic test suite: all PASS |
| `npm run route:audit` | 2017 pages, 2002 sitemap URLs, 411,190 internal links checked (+33 vs. §9's 411,157, from the new links × locales) — **0 errors**, same 15 pre-existing, unrelated warnings — **PASS** |
| `npm run hreflang:audit` | 2013 pages, **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | English keys 1357→**1358** (+1, the new key); missing-key count 7292→**7302** (+10 — exactly one fallback entry per non-English locale, the expected, by-design count for one new English-only key); hard-coded-UI candidates unchanged |
| Git status | Only `flights.tsx`, `scripts/prerender.ts`, `src/i18n/locales/en.ts`, and `seoHub.ts` newly modified this stage, plus the pre-existing, untouched files from §4/§7/§9 and `artifacts/image-inventory.json`. Confirmed via `git status --short` restricted to tracked files. |

### Measurement plan for Search Console

No ranking or CTR benefit is claimed — these are navigability/internal-linking changes with no Search Console evidence yet, consistent with rule 5.

1. **What to pull:** a fresh `Performance on Search` export (Pages + Queries, Web search) covering a window starting at least 2 weeks after today, so it doesn't overlap the §1 baseline window (Jul 27–Oct 27, 2026).
2. **What to check specifically:**
   - `/flights` and `/travel-info/morocco-airports-guide` impressions/clicks/position, compared against their own prior values — a genuinely new internal link is a crawl/indexing signal, not a ranking one; the honest thing to look for first is whether Google's cached internal-link graph for these two URLs changes (Search Console's "Links" report → internal links count for both pages), not a position move.
   - `4-day-marrakech-merzouga-sahara` and `7-day-imperial-cities-sahara-escape` impressions, to see whether the new inbound link from a reasonably-trafficked travel-info page corresponds to any crawl-frequency or impression change.
3. **Success signal:** Search Console's internal-links count for `/travel-info/morocco-airports-guide` and `/flights` increasing to reflect the new links (the most direct, earliest confirmable signal); any CTR/position change is a secondary, longer-horizon observation, not something to report as caused by this change without a controlled comparison.
4. **No ranking or click improvement should be claimed until that fresh export is in hand.**

**No Git action taken.** Nothing was staged, committed, pushed, or deployed this stage, per this phase's explicit instruction.
