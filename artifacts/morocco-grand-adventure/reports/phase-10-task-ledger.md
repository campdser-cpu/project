# Phase 10 — Prioritized Task Ledger

Statuses: `BLOCKED` / `DONE` / `PENDING` / `NOT-STARTED (needs owner decision)`.
Updated incrementally as tasks complete — see `phase-10-change-log.md` for the exact diffs per task.

| ID | Priority | Task | Status | Evidence | Reason if blocked |
|---|---|---|---|---|---|
| T0 | P0 | Locate/obtain the GSC export | **DONE — found, not in `seo-research/`** | Found a genuine GSC "Performance on Search" export at `C:/Users/PC/Downloads/https___www.moroccograndadventure.com_-Performance-on-Search-2026-09-08.xlsx` (verified authentic via `docProps/core.xml`: Apache POI, created 2026-09-08). `seo-research/` itself still does not exist anywhere; live Ahrefs/GSC connector still `"Insufficient plan"`. Full findings in `phase-10-keyword-to-page-map.md`. | — |
| T1 | P1 | Add the real TripAdvisor profile to `sameAs` in both `index.html` (static) and `StructuredData.tsx` (React) | **DONE** | TripAdvisor listing already live elsewhere on-site (`TripadvisorWidget.tsx`, footer, homepage) but absent from `sameAs`; Google's own Organization-schema guidance recommends including profiles that unambiguously identify the same entity | — |
| T2 | P1 | Fill or remove the About page's live `[X]+ years` / `[Year]` placeholders | NOT-STARTED (needs owner decision) | `src/data/about-page-content.json` — confirmed still literal placeholder brackets | Requires the owner to supply real founding year / traveler count; I will not invent these |
| T3 | P1 | Add `<image:image>` entries to the sitemap generator | **DONE** | 0 image-sitemap entries confirmed in `public/sitemap.xml` before this change; Google's own Image SEO documentation recommends this | — |
| T4 | P2 | Add reciprocal Tour→Guide internal links | **ALREADY COMPLETE — correcting an earlier mis-diagnosis** | `src/data/tourDepth.ts` already implements this comprehensively: every one of the 24 real tours (plus the 4 day-trip tours, which deliberately get an explicit empty `guideLinks: []` with a code comment explaining why no Merzouga/Sahara guide is relevant to them) has authored `guideLinks` rendered live on `tour-detail.tsx` with varied, natural anchor text. **Verified in real prerendered HTML**: `dist/en/tours/3-day-sahara-marrakech.html` shows 7 contextual guide/comparison links; `dist/en/tours/marrakech-ourika-valley-day-trip.html` correctly shows none (matching its intentional empty entry). Tour→Destination links also already exist (`tour-detail.tsx` line ~362, verified live: `dist/en/tours/4-day-marrakech-merzouga-sahara.html` links to `/destinations/merzouga` with 3 different natural anchors: "Explore Merzouga," "Merzouga Hotel," "Merzouga area"). **Two prior audits this session incorrectly reported this as a gap** — they missed `tourDepth.ts` entirely in a static grep-based review. `tourDepth.ts` was read-only inspected, never edited, per the standing protection. | — |
| T5a | P2 | Trim `/desert-tours` meta description (167 → 153 chars) | **DONE** | Borderline over Google's typical safe display length, confirmed via direct measurement of `dist/` HTML | Independent string in `route-metadata.ts`, not shared with any visible on-page copy — safe to trim without touching content |
| T5b | P3 | Homepage title (62 chars) | **DEFERRED — not a safe incremental task** | Confirmed the real prerendered `<title>` does **not** come from `HOME_META.title` in `route-metadata.ts` (that string is only 37 chars and appears unused for the actual rendered title) — it is in fact the `hero_tagline` i18n key ("Morocco Tours  •  Sahara Desert Trips  •  Private Local Guides"), which is **also the visible hero headline text on the live homepage**, shared across every locale's translation of that key | Shortening it to satisfy a soft SEO title-length guideline would mean rewriting *visible, shipped brand copy*, not just a meta tag — this is a content decision, not a narrow technical fix, and 62 characters is only a mild/soft truncation risk, not a hard failure. Deferring rather than editing visible hero copy unilaterally. Flagging for the owner: either accept the current length, or explicitly approve a hero-tagline wording change knowing it affects the on-page headline too. |
| T6 | P3 | Country-specific opportunity work for USA/UK/Italy/Spain/Netherlands | **PARTIALLY UNBLOCKED** | Real country-level clicks/impressions/position now in `phase-10-keyword-to-page-map.md` (T0's export). Only Italy has real clicks among the 5 priority markets; US/UK/NL/Spain show real impressions but poor position (50–62). No query×country cross-tab exists in this export, so per-market *query* targeting still can't be done precisely. | Full precision needs 5 separate country-filtered GSC exports, which don't exist here |
| T7 | P3 | Blog topic recommendations tied to distinct search intent | **PARTIALLY UNBLOCKED** | Real query data now shows actual head terms generating impressions (e.g. "moroccan desert adventure," "morocco adventure tours") at very weak positions (75–93) — useful for prioritizing which existing pages to strengthen, but these are head/commercial terms, not naturally blog-shaped informational queries. No new blog topic is proposed yet pending a closer read of the full Queries list. | — |
| T8 | P2 | Add reciprocal internal links from tour pages to the real Erg Chebbi/Merzouga guide and destination content, prioritizing `/en/destinations/merzouga` (pos 91.26, 27 real impressions) and reinforcing the already-working `/ko/destinations/erg-chebbi` (pos 4.78) without disturbing it | **IN PROGRESS** | Real GSC evidence above | — |

| T9 | P1 | Correct Erg Chebbi's stated dune width (28km × **9km** → 28km × **5–7km**) across English + all 8 translated locale overlays | **DONE** | Verified against Wikipedia's Erg Chebbi article directly (fetched, not just a search snippet): "span an area of approximately 28 kilometers from north to south and 5–7 kilometers from east to west." Cross-checked against the official visitmorocco.com Errachidia–Midelt–Merzouga page, which states no numeric dimensions at all (so Wikipedia is the only verifiable source found for this specific figure). The incorrect "9km" figure appeared in `content.ts` (erg-chebbi destination description), `seoHub.ts` (erg-chebbi guide body + FAQ), and all 8 translated JSON overlays (de/es/fr/it/ja/ko/nl/pt) — all 10 locations corrected consistently, preserving each language's existing phrasing and only changing the number. | — |

| T10 | P1 | Remove two self-contradicting, unverified `alternateName` values from the homepage's static JSON-LD (`TravelAgency`: "Morocco Grand Adventure Tours" vs `WebSite`: "Morocco Grand Adventure Tours & Travel") | **DONE** | Found while validating structured data per this turn's instruction. Both values live only in `index.html` (no React-side duplicate to keep in parity). Neither string appears anywhere in visible on-page copy, in any of the 5 real social-profile `sameAs` handles, or in the TripAdvisor listing URL — zero evidence either is a real alternate name, and they contradict each other on the same page. Removed both rather than guessing which (if either) to keep, consistent with not inventing unverified business-identity claims. `name: "Morocco Grand Adventure"` (confirmed, consistent) is untouched in both blocks. | — |

| T11 | P1 | Collapse a real 2-hop redirect chain in `vercel.json` (repo root, outside `artifacts/morocco-grand-adventure/` but confirmed the real deploy config for this site — same file already referenced for the `/book` redirect in an earlier audit) | **DONE** | `/:lang/tours/fes-3-day` redirected to `/:lang/tours/3-day-sahara-fes`, which itself redirected to `/:lang/tours/3-day-fes-merzouga-sahara` — two 301 hops instead of one. Found via a full chain-resolution scan of all 450 redirect rules (confirmed exactly 1 chain existed; re-ran after the fix and confirmed 0 remain). | — |

## Investigated, not fixed (recorded honestly rather than forced)
**Mobile tap-target sizes.** A real browser check (mobile viewport, 3 pages: homepage, a tour detail page,
`/desert-tours`) found: viewport meta tag correct, zero horizontal overflow, zero broken images, and every
*primary* conversion CTA (the booking/WhatsApp/email buttons) well-sized for touch (50–64px tall, well above
the ~44px guideline). The only sub-44px targets found were two footer text links ("Book now, pay later" at
137×19px, "Message on WhatsApp" at 160×24px) — but on inspecting `Footer.tsx`, this unpadded-text-link style
is used uniformly across the *entire* footer (every quick link, destination link, tour link, and contact
link), not specific to these two. This is a common, low-stakes pattern for footer navigation, and the actual
high-intent conversion paths are unaffected. Not fixed this pass — recorded as a minor, low-priority
observation rather than forcing a footer-wide CSS change for a secondary navigation area with no demonstrated
conversion impact.

| T12 | **P0** | Gate the `TouristTrip` schema's `Offer`/price block on `hasPublishedPrice()`, the same gate the visible `PriceTag` component already uses | **DONE** | **Severe finding.** Every tour with a numeric `price` field (26 of the data's price entries) emitted a real-looking `Offer` with a specific EUR price (e.g. `price: 530`) in its structured data — while the *visible* page, via `hasPublishedPrice()` (hardcoded `false` site-wide per `src/lib/promo.ts`), never shows a price anywhere, by deliberate current policy. This directly violates Google's own documented rule: "don't add structured data about information that is not visible to the user, even if the information is accurate" — and here the information isn't just invisible, it actively contradicts the page's own "personalised quote" messaging. Fixed by changing `isNumericPrice(tour.price)` to `isNumericPrice(tour.price) && hasPublishedPrice(tour.price)` in the single shared `buildTourSchema` (used by both prerender.ts and the runtime — no dual-maintenance risk here). | — |
| T12b | **P0** | Correct a false claim repeated in tour `description`/FAQ text: "A starting price per person is published for this route" | **DONE** | The exact same policy contradiction existed in **visible page copy**, not just schema — found while auditing why the FAQ schema's "How is the price confirmed?" answer claimed a price is published. Three distinct variants found and corrected across EN (`content.ts`, 29 FAQ-answer/description occurrences + 1 unique comparison-question), and the already-translated counterparts in ES/FR/IT (`src/i18n/content/generated/*.json`: FR 13+18+1, IT 13+18+1, ES 1). All edits preserve each language's own existing phrasing, changing only the false claim. DE/NL/PT/ZH/JA/KO/AR were checked and do not contain this text (those tours aren't localized in those locales — they fall back to the now-corrected English). | — |
| T13 | P1 | Stop misusing `touristType` on the destination `TouristAttraction` schema | **DONE** | Schema.org defines `touristType` as "attraction suitable for type(s) of tourist... e.g. children, visitors from a particular country" (verified by fetching schema.org directly) — an **audience** property. The destination schema was instead populating it with `dest.highlights` (activities like "Camel trekking at sunset," "Rissani weekly market") — a real semantic misuse, though not a hard parser error since `touristType` accepts bare `Text`. Fixed by moving the highlights into a second `additionalProperty` entry (`name: "Highlights"`), following the exact precedent already established in the same function for `bestTime` (which hit an identical "wrong property" problem previously). | — |

## Structured-data audit: checked and found correct, left unchanged
- JSON-LD syntax/parseability: all blocks on all 4 representative pages (EN/FR tour, EN/DE destination) parse cleanly.
- FAQ schema accuracy (post-fix): question count, order, and text match the visible FAQ accordion exactly (verified on the EN tour page: 6/6 match).
- Canonical URL / schema `@id` / schema `url` / breadcrumb last-item URL: all four agree on the same real URL (verified on the EN tour page).
- No duplicate or conflicting `@id`s across the 3-5 blocks per page (TravelAgency/WebSite/TouristTrip-or-TouristAttraction/BreadcrumbList/FAQPage all have distinct, correctly-scoped `@id`s).
- `itinerary` (ItemList) and `touristType` on `TouristTrip` (the tour schema, not the destination one) are correctly populated — audience categories, not activities, confirmed to be semantically correct there.
- **Verified against current official guidance, not memory**: fetched Google Search Central's FAQPage docs directly — FAQ rich results are now restricted to "well-known, authoritative government and health websites" (a 2023 policy change). This site's FAQ schema is correct and accurate, but **will not produce a FAQ rich result regardless of markup quality** — recorded so no false expectation is set.

## Recheck of T1/T3/T5a/T9/T10/T11/T12/T12b/T13 (this turn, before any new work)
Full `git diff` inspected file-by-file. Confirmed: every prior fix is present exactly as logged, nothing was
overwritten or duplicated, all 9 pre-existing unrelated untracked files remain untouched, `promo.ts`
(`hasPublishedPrice` still hardcoded `false`) is untouched so T12's gate is still airtight, and spot-checked
FR/IT/JA/KO translation diffs read grammatically correctly in each language. No regressions found; nothing
re-fixed or undone.

| T14 | P2 | Harden `<image:loc>` against unescaped XML-special characters | **DONE** | Comprehensive scan of all 145 unique image URLs in the real sitemap found **zero** currently contain `& < > " '` — so this is not a demonstrated defect today — but `imageBlock()` had no escaping at all, meaning a future filename containing any of those characters would silently produce malformed XML. Added a minimal `escapeXml()` (same 5-entity pattern as `prerender.ts`'s existing `escapeHtml`) and applied it to every `<image:loc>` value. Verified byte-identical output for all current URLs (zero of them trigger any escaping), so this is a pure forward-looking hardening, not a behavior change today. | — |

## Step 2 — Sitemap image audit: checked and confirmed correct
- **Protocol limits** (verified against Google's current image-sitemap documentation, fetched directly): max 1,000 `<image:image>` per `<url>` — the real site's highest is 42 (on `/ar/gallery`), file size 3.5MB (limit 50MB), 1,859 URLs (limit 50,000). All well within limits.
- **Image-to-page correspondence**: wrote a script that re-derives, for every one of the 1,859 real sitemap entries, the exact dist/ file it came from, re-extracts that file's real `<img>` tags, and diffs them against the sitemap's declared images. **Result: 0 fabricated/mismatched entries, 0 duplicates, across all 1,859 pages** — not a sample, the full set.
- **Client-rendered vs. server-rendered**: confirmed structurally impossible for this to misrepresent — the generator only ever reads the final, real, already-prerendered HTML file, so an image that only exists in a client-rendered React component can never appear in the sitemap (this is *why* the homepage shows only 1 image — its destination/tour grids are client-only; already documented, reconfirmed unchanged).
- **Deprecated elements**: verified Google has removed support for `<image:caption>`, `<image:geo_location>`, `<image:title>`, `<image:license>` — this implementation never used any of them (only `<image:loc>`), so no cleanup was needed there.

## Step 3 — Canonical/hreflang audit: checked and confirmed correct
- **hreflang reciprocity** (programmatic, all 1,859 pages × up to 11 locales each, from the real sitemap data): 0 missing hreflang targets, 0 self-reference mismatches, 0 non-reciprocal pairs.
- **Canonical self-reference** (programmatic, all 1,874 real prerendered HTML files): 0 missing canonical tags, 0 canonicals pointing to a different locale. Exactly 4 "mismatches" found, all of them the already-known, intentional legacy-Unicode redirect pages (`/ko/메르주가가이드`, `/ko/투어/fes-5-day`, `/zh/撒哈拉之旅`, `/zh/梅尔祖卡指南`) which correctly canonicalize to their real English-slug replacement page rather than self-referencing — this is deliberate, correct behavior (already excluded from the sitemap by design), not a defect.
- **Redirect chains** (`vercel.json`, all 450 rules): re-confirmed 0 chains remain (unchanged since the prior session's fix).
- **`/book` pages' canonical**: self-references rather than pointing at `/trip-builder`, but this is moot in production — the 301 redirect fires before the page is ever served, so the tag is never actually read by a crawler. Not a demonstrated real-world defect; not changed, consistent with "do not add redirects/change URL architecture speculatively."

## MAJOR FINDING — requires owner decision, not fixed

**A real, visible, on-page price-display inconsistency exists between two independent pricing systems, and
this was discovered only now, during the conversion-journey audit — it directly affects, and may partially
undermine, the premise behind T12 (the schema price-suppression fix).**

- `src/components/promo/PriceTag.tsx` (used on tour cards, grids, and list views) always shows "Tailored to
  your trip and budget" — never a number — because `hasPublishedPrice()` is hardcoded `false` site-wide.
- `src/components/tours/TailorJourney.tsx` (the interactive booking panel on every tour-detail page) computes
  and **prominently displays a real, specific price** — e.g. "€530 per person / €1,060 Total" for the 4-day
  Marrakech–Merzouga tour — via a completely separate, independent pricing system (`src/data/pricing/ladder.ts`,
  a carefully-designed "published selling price" ladder), **not gated by `hasPublishedPrice()` at all**.
  Verified live via screenshot: this price is real, rendered, and visible today, with an adjacent disclaimer
  ("Private journey for your party only. Your final price is confirmed with your dates before anything is
  paid."). The same number is then carried into the pre-filled WhatsApp/email inquiry message.
- `ladder.ts` has real, configured entries for **26 of the tour catalog's ~31 tours**, so this is not an edge
  case — it affects the majority of tour-detail pages.
- `TailorJourney.tsx`'s own header comment states "Today every tour is quote-only: the rate card is
  unconfigured and no tour is costed, so this is always null" — **this comment is factually wrong today**,
  describing an earlier state of the data that `ladder.ts` has since moved past.

**Why this isn't being fixed now:** resolving it requires knowing a real business fact I cannot verify —
does Morocco Grand Adventure currently intend to publish starting prices for these 26 tours (in which case
`PriceTag`/`hasPublishedPrice()` is the stale piece, and T12's schema-suppression may need to be revisited to
*show* the ladder price instead), or has that policy been superseded by the quote-only approach (in which
case `TailorJourney`/`ladder.ts` is now showing a real visitor a number the business no longer intends to
commit to, and should be gated the same way `PriceTag` already is)? Either answer is a legitimate business
decision, not a code defect I can resolve by inspection alone. **No change was made to `TailorJourney.tsx` or
`ladder.ts`** — flagging for an explicit owner decision, per this task's own instruction not to make a major
pricing-model decision unilaterally.

| T15 | P1 | Add page-relevant context to the nav bar's "Book via WhatsApp" and the footer's "Message on WhatsApp" links | **DONE** | These are the two most prominent, always-present WhatsApp CTAs on the site (every page, both desktop and mobile) — verified via live browser test that both previously opened a **completely blank chat** (`href={contactInfo.whatsapp}`, no `?text=` at all), unlike every other WhatsApp link on the site (`StickyBookingCTA`, the floating `WhatsAppButton`, `TailorJourney`'s "Continue with WhatsApp," and the homepage's dedicated CTAs), which all already use the established `contextualWhatsAppMessage()` helper. Fixed by reusing that exact same, already-proven helper in `Navbar.tsx` and `Footer.tsx` — no new message-building logic invented. | — |

## Conversion-journey audit — investigated, confirmed not a defect
**"Stale published-price claim" on `/day-trips`**, flagged by an early automated check this turn, turned out
to be a false positive: the day-trip tours' own data (`price: ""`, no `ladder.ts` entry) contains no price
claim at all. The regex-based detector was matching **my own T12b correction text** elsewhere on the page
("...rather than a fixed **published price**"), which legitimately contains the word "published" as part of
an accurate negation. Verified directly in `content.ts`: the 4 day-trip tour entries have zero price-related
text of any kind. No change made.

## T16 — Unify the quote-only pricing policy (owner decision now confirmed)

**Owner's explicit decision, recorded verbatim:** "Do not publicly display numeric tour prices on the website.
Keep the business model quote-based... The current computed prices are commercially valid and may be used
internally to calculate personalized quotations. However, they must not be published as numeric prices on
public tour pages under the current policy."

| T16 | **P0** | Remove the public numeric price display from `TailorJourney.tsx` (the only real public price leak found — resolves the major finding flagged last turn) | **DONE** | Full trace completed: `PriceTag.tsx`/`TourCard.tsx`/`home.tsx` were already correctly gated by `hasPublishedPrice()` (always `false`) and needed no change; `StructuredData.tsx`'s `buildTourSchema` Offer was already correctly gated via T12 and needed no change; `PromoBadge.tsx`/`discountedPrice()` were already inert (never called/rendered). **Only `TailorJourney.tsx` bypassed the gate** — it computed a price via the independent `ladder.ts` system and rendered it directly (confirmed live, "€530 per person / €1,060 Total"), and included the same figures in the pre-filled WhatsApp/email message. Fixed. | — |

### How public price rendering was disabled
- `src/components/tours/TailorJourney.tsx`: the `price` value (from `ladderPrice()`) is **still computed** (preserved, per the owner's instruction that it remains "commercially valid... may be used internally") but is now referenced nowhere in the rendered output or in the `summary` that builds the WhatsApp/email message. The 3-way visible-price ternary (`price ? <big numbers> : overLadder ? <ladder-specific note> : <generic quote note>`) was collapsed to always render the single, already-existing, already-fully-localized `px_price_pending` / `px_price_pending_note` message. The `if (price) { lines.push('Price per person...'); lines.push('Total...'); }` block was removed from the `summary` builder (which feeds both the WhatsApp `?text=` and the `mailto:` body).

### What was explicitly preserved, unmodified
- `src/data/pricing/ladder.ts` — **zero changes**. Every `TOUR_LADDER` entry, every number, the step-pricing rule, `isValidLadder()`, `ladderPrice()`, `fromPrice()`, `fromParty()` — all untouched. The data and the maths remain exactly as they were; only the public rendering path that read them was changed.
- `src/data/pricing/rates.ts`, `src/lib/pricing.ts` (the cost-estimation engine: `estimate()`, `validateRateBehaviour()`, `fromPricePerPerson()`) — **zero changes**. Confirmed via a repository-wide import search that neither file's value exports are consumed by any rendering component at all (only a type-only import of `AccommodationTier`/`CampTier` from `rates.ts` existed in `TailorJourney.tsx`, left untouched).
- `src/lib/promo.ts`'s `hasPublishedPrice()` — **zero changes** (still hardcoded `false`). This is now the explicitly owner-confirmed-correct state, not a provisional one.
- `src/components/seo/StructuredData.tsx`'s T12 gate (`isNumericPrice(tour.price) && hasPublishedPrice(tour.price)`) — **zero changes needed**; already correct, now confirmed by the owner's decision rather than an inference.

### Scope decision: student-tours pricing — explicitly NOT touched, flagged for owner awareness
`src/components/student-tours/JoinStudentTour.tsx` and `src/data/student-group-departures.ts` have their **own**,
separate, pre-existing deposit/price-display system (`depositBreakdown()`, `effectiveDepositPercent()`), whose
own code comment explicitly calls `d.pricePerPerson` a "published price" for student group departures — a
different mechanism from `ladder.ts`, not gated by `hasPublishedPrice()`, and **not named anywhere in this
task's explicit scope** (which lists `PriceTag.tsx`, `TailorJourney.tsx`, `ladder.ts`, `promo.ts` by name).
**This was a deliberate judgment call, not an oversight**: student group tours are a materially different
product (deposits collected per-student, price-per-person budgeting is normal in that market) with its own
already-designed "price on request" fallback state, and extending today's fix there would be a real scope
expansion into payment/deposit logic the task did not request. **Flagging this clearly: if the owner's
quote-only policy is intended to also cover student-tour departures, that is a separate, explicit decision
and a separate task** — not assumed here either way.

### Honest limitation: no private quotation-delivery mechanism exists
The `price` value computed in `TailorJourney.tsx` is preserved but **genuinely inert** — nothing in the
current application transmits it anywhere, publicly or privately. There is no backend, no admin notification,
and no internal-only display that consumes this figure today. If a future "send the computed estimate
privately to the operator" feature is wanted, it does not exist yet and was not built as part of this task,
per the explicit instruction not to invent one.

## T17 — SEO/keyword-ranking continuation pass (this turn)

**Phase 1 (inspect):** reconfirmed 22 tracked files / 9 untracked files unchanged; confirmed T16's price-gate
intact in source (`px_price_pending` renders, no "Price per person"/"Total" lines) and in generated output (0
Euro amounts in `dist/en/tours/4-day-marrakech-merzouga-sahara.html`); confirmed `git status` on
`src/components/student-tours/` and `src/data/student-group-departures.ts` is empty (zero changes, as
required).

**Phase 2 (keyword-to-page map):** updated `phase-10-keyword-to-page-map.md` with a formal query/page/intent/
confidence/verification-status table. No new GSC export was found (checked the Downloads folder again — still
only the 2026-09-08 export). All figures re-sourced from that same export, dated and attributed, not
re-measured live.

**Phase 3/4 (technical/on-page audit and fixes) — investigated, no new code change this turn:**
| Check | Result |
|---|---|
| Accidental `noindex` directives site-wide | 1 file found (`dist/404.html`) — **correct, intentional** (error pages should be noindexed per standard practice). No other page affected. |
| `robots.txt` / `X-Robots-Tag` headers | Reconfirmed correct, unchanged, no over-blocking |
| `/en/day-trips` (pos 7.34, real clicks) | Title/meta/H1 all sound; 139 real inbound internal links (strong). Already well-optimized — no action needed |
| `/en/destinations/merzouga` (pos 91) and `/en/desert-tours` (pos 59–66) cannibalization | Investigated via 3 new angles this turn (content-overlap measurement, inbound-link-count comparison, schema-structure comparison) — **all three came back clean/inconclusive, ruling out the hypotheses tested rather than confirming a fix**. See `phase-10-keyword-to-page-map.md` for full detail. No speculative change made, per the owner's explicit instruction not to edit without a specific, defensible, evidence-backed reason. |
| Image alt-text quality (sampled, Merzouga destination page) | Excellent — descriptive, varied, correctly length-bounded, zero keyword stuffing. No action needed |
| External profile links (TripAdvisor, Instagram, YouTube, TikTok, Facebook — the ones added to `sameAs` in T1) | 4/5 return real `200`; TripAdvisor returns `403` to automated `curl` but the response carries `x-datadome: protected` — confirmed bot-protection (same pattern as Pexels' Cloudflare challenge encountered earlier this engagement), not a broken link |
| FAQ schema vs. visible content, expanded to more page types | `/day-trips`, `/camel-trekking`, `/luxury-camp`, `/4x4-tours` all correctly have **no** FAQPage schema because they have **no** visible FAQ content — consistent, not a gap. `/desert-tours` and `/tours` correctly **do** have FAQPage schema matching their real FAQ sections. |

**Phase 5 (regression, re-run this turn with no new code changes to verify current held state):**
`npm run typecheck` — PASS. `npm run route:audit` — PASS, 15 warnings (unchanged). Full-build price-leak
re-scan — 0 Euro amounts across all 1877 pages (T16 still effective). Student-tour scope check — 0 files
touched.

## Next action after this turn
T2 remains blocked on the owner. T6/T7 remain only partially actionable without more GSC data. The
Merzouga/desert-tours position question is now the clearest remaining open item, and is explicitly **GSC
REQUIRED** — not safely actionable from code/content inspection alone this pass. The student-tours pricing
scope question from T16 also remains open for the owner.
