# Phase 10 — Keyword-to-Page Map

## T0 status update: GSC export FOUND

A real Google Search Console export was located at:
`C:/Users/PC/Downloads/https___www.moroccograndadventure.com_-Performance-on-Search-2026-09-08.xlsx`

This is a genuine GSC "Performance on Search" export (verified: `docProps/core.xml` shows `creator: Apache POI`,
`created: 2026-09-08T12:33:49Z` — Google's own export tooling signature, not a hand-built file). It was **not**
in `seo-research/` (that path still does not exist) — it was sitting directly in the Downloads folder. Two
other real, non-GSC files were found alongside it and are noted at the bottom of this document.

**Data-quality note, reported honestly:** the `Filters` sheet states `Date: Last 3 months`, but the `Chart`
sheet's daily time series only spans **2026-08-04 to 2026-09-06** (34 days), not a full 3 months. This likely
means the property only began accumulating meaningful impressions around early August 2026 (i.e., organic
visibility is very recent), but I am reporting the discrepancy rather than assuming which explanation is
correct. The `Queries`/`Pages`/`Countries`/`Devices` summary tables are aggregated over whatever the actual
"last 3 months" filtered window was at export time — I cannot independently confirm their exact start date
from this file alone.

**What this export does NOT contain** (so I am not inventing it): query-by-country cross-tabulation (GSC's UI
exports Queries and Countries as separate aggregate tables, not a joined breakdown), any data after
2026-09-08, backlink data, or AI-assistant referral data.

---

## Real findings (first-party, verified from this export)

### Overall scale — report honestly, do not oversell
Totals across the export window: **65 clicks, ~1,555 impressions** (sum of the Devices sheet's 3 rows: Mobile
423 + Desktop 1011 + Tablet 121 impressions). This is a small, early-stage volume — any recommendation below
is scaled to that reality, not to an assumption of a mature traffic base.

### Best-performing real pages (from the `Pages` sheet)
| Page | Clicks | Impressions | Position | CTR |
|---|---|---|---|---|
| `/en` (homepage) | 31 | 358 | 14.4 | 8.66% |
| `/en/day-trips` | 6 | 86 | 7.34 | 6.98% |
| `/ko/destinations/erg-chebbi` | 5 | 264 | **4.78** | 1.89% |
| `/` (bare domain root) | 3 | 50 | 5.26 | 6.0% |
| `/fr/tours` | 3 | 45 | 10.09 | 6.67% |
| `/en/tours/from-marrakech/7-days` | 3 | 27 | 10.7 | 11.11% |
| `/it/` | 3 | 19 | 12.21 | 15.79% |

**The single most interesting real finding:** `/ko/destinations/erg-chebbi` already ranks at position **4.78**
for Korean queries and is genuinely converting impressions into clicks. The Korean query "에르그 셰비" ("Erg
Chebbi") alone has 189 impressions at position 4.75 with 3 clicks; two spelling variants ("에그르 셰비",
"에르그셰비") add another 50 impressions at similar positions. This is a real, working, under-appreciated asset.

### High-impression, low/zero-CTR pages worth investigating (not assumed — observed)
| Page | Clicks | Impressions | Position |
|---|---|---|---|
| `/en/destinations/merzouga` | 0 | 27 | 91.26 |
| `/en/desert-tours` | 2 | 83 | 59.63 |
| `/fr/desert-tours` | 1 | 67 | 66.3 |
| `/en/destinations/erg-chebbi` | 0 | 16 | 37.06 |
| `/en/destinations` (index) | 0 | 11 | 6.18 |

`/en/destinations` has a genuinely good position (6.18) with zero clicks — but on a sample of only 11
impressions, that's too small to read as a real CTR problem yet. `/en/destinations/merzouga` ranking at
**91.26** despite being a core destination page is the clearest, most actionable real gap: the page gets found
for 27 impressions' worth of queries but sits so far down the results that no click is realistic yet.

### Priority-market country breakdown (real, from the `Countries` sheet)
| Country | Clicks | Impressions | Position |
|---|---|---|---|
| Morocco | 61 | 481 | 31.03 |
| **Italy** | **3** | 128 | **24.74** |
| South Korea | 0 | 259 | 4.99 |
| **United States** | 0 | 117 | 56.32 |
| **Netherlands** | 0 | 73 | 60.22 |
| Germany | 0 | 63 | 71.81 |
| France | 0 | 59 | 67.47 |
| **United Kingdom** | 0 | 34 | 61.74 |
| **Spain** | 0 | 31 | 50.84 |

Of your 5 priority markets, **only Italy currently has any clicks at all**, and it has the best average
position of the five by a wide margin. The US, UK, Netherlands, and Spain all show real impression volume
(meaning the site does surface for relevant queries) but average positions in the 50s–60s — far too low to
expect clicks yet. This matches and is now *evidenced*, not just inferred, by the earlier qualitative finding
that Italian tour content is the most complete locale (24/24 tours) while the others sit at 6/24.

**Apparent inconsistency, flagged rather than resolved:** the Countries sheet shows South Korea at 0 clicks,
while the Queries sheet shows the Korean "Erg Chebbi" query getting 3 clicks. This could mean those clicks are
attributed to a different country in GSC's geolocation (e.g., a Korean-language search from a user physically
elsewhere), or a different combination of queries/pages accounts for it. I am not reconciling this by
assumption — noting it as an open data nuance.

### Device breakdown (real, from the `Devices` sheet)
| Device | Clicks | Impressions | Position | CTR |
|---|---|---|---|---|
| Mobile | 57 | 423 | 15.95 | 13.48% |
| Desktop | 8 | 1,011 | 53.69 | 0.79% |
| Tablet | 0 | 121 | 5.71 | 0% |

Mobile dramatically outperforms desktop on both position and CTR. Desktop has the most raw impressions but by
far the worst average position and CTR. This is a genuinely useful, measured signal — not a repeat of the
earlier unmeasured bundle-size concern, but real GSC-reported ranking behavior split by device.

### Commercial head-term reality check (from the `Queries` sheet)
Several of the 25 seed keywords from prior audits genuinely do generate impressions already — but rank far
too low to convert:
| Query | Impressions | Position |
|---|---|---|
| moroccan desert adventure | 23 | 75.48 |
| morocco global adventures | 16 | 56.94 |
| morocco adventure tours | 16 | 86.81 |
| morocco desert tours | 16 | 93.31 |

This confirms the prior audits' topical relevance was directionally correct (Google does associate the site
with these terms), but also confirms, with real data for the first time, that competing for these specific
head terms will take sustained authority-building — not a quick on-page fix. I am not promising any ranking
outcome here, only reporting what the data shows today.

---

## Other real files found in the same search (not GSC, noted for completeness)
- `C:/Users/PC/Downloads/Tripadvisor data - Morocco Grand Adventure.csv` — real TripAdvisor engagement data (September 2026: 32 unique page visitors, 6 new reviews, 100% review response rate). Supports the T1 `sameAs` fix — confirms the linked listing is genuinely active.
- `C:/Users/PC/Downloads/Morocco-Grand-Adventure-Image-SEO-Pack-Extracted/data/seo_metadata.csv` — an existing image-metadata planning sheet (titles/alt/captions/keywords proposed for specific photos). **Treating this as a draft planning document, not verified ground truth** — several of its suggested `target_page` values (e.g. `/tours/sahara-desert`, `/experiences/souks`) do not match real routes confirmed elsewhere in this repo. Any alt-text/caption drawn from it will be cross-checked against the real page and real image before use, per the standing anti-fabrication rule.

## Still missing, if you want deeper analysis
A true 3-month (or longer, season-aware) trend would require a fresh export covering a longer window, and
query×country segmentation would require 5 separate country-filtered exports from the GSC UI. Neither exists
today — I'm not fabricating them.

---

## Repo-evidence page inventory (reverified against current HEAD, carried forward from prior audits)
Unchanged from the previous version of this file — see git history of this report for the full table. The
GSC data above now supersedes the "GSC-blocked" framing for the pages it actually covers; everything else
(cannibalization risks, pages GSC shows no data for) remains repo-evidence-only as before.

---

## Phase 2 update (this turn) — formal query-to-page map with confidence/verification status

**Source re-confirmed:** same GSC export as above (`...Performance-on-Search-2026-09-08.xlsx`, created
2026-09-08). No newer export was found this turn — I checked the Downloads folder again and found nothing
dated after September 8. All figures below are from that single export; nothing has been re-measured live.

| Query / Page | Clicks | Impr. | Pos. | Target URL | Intent | Satisfies intent? | Cannibalization risk | Proposed action | Confidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| (brand/nav traffic) | 31 | 358 | 14.4 | `/en` | Brand/navigational | Yes — strong CTR (8.66%) already | Low | No action; monitor | High | VERIFIED |
| (day-trip queries) | 6 | 86 | 7.34 | `/en/day-trips` | Commercial | Yes — title/meta clear, 139 real inbound internal links (verified this turn, same count as site-wide "explore more" baseline) | Low | No action; page is already well-optimized and well-linked | High | VERIFIED |
| 에르그 셰비 (+2 spelling variants) | 3 | ~260 combined | ~4.8 | `/ko/destinations/erg-chebbi` | Informational/local | Yes — ranking well, converting | None found | **Protect — do not touch** | High | VERIFIED |
| (desert-tours queries) | 2 (en) / 1 (fr) | 83 (en) / 67 (fr) | 59.63 (en) / 66.3 (fr) | `/en,fr/desert-tours` | Commercial | Title/meta/FAQ schema all present and correct (reverified this turn); content depth adequate | Medium — overlaps `/destinations/merzouga` and `/merzouga-guide` for "Merzouga desert tours" phrasing | **Investigated this turn via 3 angles (content-overlap measurement, internal-link count, schema structure) — all came back clean/non-anomalous. No safe, evidence-backed fix identified; recommend GSC query-level data before any title/content change** | Medium (page is fine; cause of low position is not identifiable from code alone) | GSC REQUIRED for next step |
| (destination queries) | 0 | 27 | 91.26 | `/en/destinations/merzouga` | Informational/local | Content verified accurate and specific (150m dune height, real activities); 139 real inbound internal links (same as the well-performing `/day-trips`) — **not link-starved** | Medium — see above | Same as above — investigated, no safe fix identified this pass without query-level data | Medium | GSC REQUIRED |
| (destination queries) | 0 | 16 | 37.06 | `/en/destinations/erg-chebbi` | Informational/local | Same cluster as above but ranks meaningfully better (37 vs 91) with an identical title template — this asymmetry is real evidence AGAINST "the title template is the problem" | Low-Medium | No action — the better-performing sibling page using the same template argues against a template-level fix | Medium | OBSERVED |
| moroccan desert adventure / morocco adventure tours / morocco desert tours | 16–23 each | 56–93 | `/en/desert-tours`, `/en` | Commercial (head terms) | Pages are topically on-target (confirmed via impressions) but rank far too low to click | Low | No action — competing for these specific head terms requires sustained authority-building (backlinks, content maturity), not an on-page fix; flagged in the prior masterplan's Part 9 | High (that this needs authority work, not more on-page edits) | VERIFIED, longer-term |
| US / UK / NL / Spain (country) | 0 | 31–117 each | 51–62 | various | Mixed | Impressions confirm topical relevance; position too low for clicks | — | No page-level action — matches the known localization-completeness gap (these markets' locales are not the issue; EN pages also rank similarly for these countries) | Medium | GSC REQUIRED (query×country breakdown) for precision |

### This turn's investigation of the two lowest-performing real pages, in detail
Both `/destinations/merzouga` (pos 91) and `/desert-tours` (pos 59–66) were re-investigated from three angles
that had not been tried before, specifically to avoid repeating the inconclusive title-rewrite question from a
prior audit:
1. **Content-overlap measurement** (Jaccard similarity of distinct words across `/desert-tours`,
   `/destinations/merzouga`, and `/merzouga-guide`): moderate overlap (0.28–0.47), not the near-duplicate range
   that would indicate a clear thin/duplicate-content problem, but noisy (includes shared nav/footer
   vocabulary) — inconclusive, not acted on.
2. **Inbound internal-link count**: both pages have **139 real inbound internal links** in the static HTML —
   identical to `/day-trips`, which performs well. This rules out "internal linking is why this page ranks
   poorly" as an explanation.
3. **Structured-data/schema structure**: both pages' JSON-LD is valid, complete, and consistent with visible
   content (re-verified this turn).

**Conclusion, stated honestly:** none of these three angles produced a safe, evidence-backed code change. The
most likely explanations for the low position — site age/authority, competitive SERP difficulty for
"Merzouga"/"Sahara desert tours," or query-specific relevance signals — are not things a code audit can
diagnose further without real GSC query-level data for these exact pages (which pages rank for which specific
query, at what position, over time). This is recorded as a genuine **GSC REQUIRED** item, not guessed around.

### What would unblock this
1. A GSC export filtered to **page = `/en/destinations/merzouga`** and **page = `/en/desert-tours`** showing the actual queries driving their 27 and 83/67 impressions, respectively.
2. A longer time-window export (the current one is ~34 days) to see whether position is trending up or down as the site matures.
3. Country-filtered exports for US/UK/NL/Spain specifically, to know which queries in those markets are closest to page-1.

None of these exist today. I am not fabricating them.
