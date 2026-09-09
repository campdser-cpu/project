# SEO Growth Roadmap — Morocco Grand Adventure

Objective: «Build a technically excellent, multilingual, image-rich, internally connected Morocco travel website that earns more organic visibility and qualified travel enquiries.»

**GSC status: NOT CONNECTED in this environment.** No GSC API/exports were available. Every query-level claim below is marked [GSC-VALIDATE] and must be confirmed against real GSC data before acting. No ranking predictions are made.

## 1. Current state (measured, from repo audits)

- Indexable URLs: ~1,397 in sitemap.xml; ~738 prerendered pages checked by seo-meta audit; 21 route contracts verified by gsc-route-contract.
- Languages: 11 locales (en, fr, es, it, de, nl, pt, zh, ja, ko, ar) + x-default hreflang; canonical/hreflang guards passing (hreflang-bad=0, canonical-bad=0).
- Destination pages:29 image sets in `dest/`; destination content fully translated (0 missing fields).
- Tour pages: 24 tours across from-marrakech / from-fes / from-agadir / from-casablanca hubs + day-trips.
- Blog: 6 articles.
- Images: 399 files on disk (webp-first, responsive variants); **0 of the 46 official Photo Library binaries imported yet** — manifest + guard shipped in this phase.
- Structured data: per-page meta/og present; schema validated by build audits (no fabricated ratings/reviews).
- Internal-link architecture: seoHub `relatedGuides`/`tours`/`destinations` cross-links exist for Merzouga hub cluster.

## 2. Keyword opportunity clusters (seeds — expand with GSC only)

Grouped by intent; primary-intent ownership is 1 page per cluster (no cannibalization):

- **Commercial (route)**: "Marrakech to Merzouga desert tour" → from-marrakech tour hub; "Fes to Merzouga" → from-fes hub. [GSC-VALIDATE]
- **Commercial (core)**: "Morocco private tours", "Morocco Sahara desert tour" → homepage + Sahara tours hub.
- **Experience**: "camel trekking Merzouga" → `camel-trekking` hub; "Merzouga quad biking", "Sahara 4x4 tour", "luxury desert camp Morocco" → planned experience pages (gap report HIGH).
- **Destination**: "Merzouga", "Erg Chebbi", "Chefchaouen", "Ait Ben Haddou", "Dades", "Todra" → destination pages; "things to do in Merzouga" → Merzouga guide.
- **Informational**: "best time to visit Sahara", "Morocco packing list", route guides, sunrise/sunset guide.
- **Luxury / family / romantic / adventure**: positioning clusters for custom-journey content (differentiation vs VEM) — create only where first-hand content is genuinely strong.
- **Multilingual**: English IA first; per-language keyword research later. Do NOT literal-translate keywords (e.g. ES "excursión al desierto de Marrakech" ≠ literal translation).

## 3. Content gaps
See `SEO-CONTENT-GAP-REPORT.md` (full table with priorities).

## 4. Internal-link opportunities
- Every tour page → its origin-city hub, destination pages on route, relevant experience hubs, booking/contact.
- Merzouga page → Erg Chebbi, camel/quad/4x4/camp hubs, Rissani/Khamlia section, Marrakech→ and Fes→ route guides.
- Blog posts → commercial tour pages + destinations (route blog especially).
- Use descriptive varied anchors ("4-day Marrakech to Merzouga desert tour", "camel trekking in Erg Chebbi") — never "click here"; avoid repeating identical anchors sitewide.

## 5. Image SEO opportunities
- Import the 46 official binaries (blocked: MGA-023, MGA-046) → then swap into matching contexts (gallery, hubs, destinations) via `photoLibrary.ts`.
- Manifest already carries natural ALT/title/description per official description — no keyword stuffing.
- Keep dimensions/width/height on `<img>` to prevent CLS; keep lazy-loading except LCP heroes (eager).
- Generate responsive webp derivatives as **additional** assets; never rename originals.
- Guard: `npm run photo-library:verify` fails if a restricted asset leaks into dist HTML/sitemap.

## 6. Backlink opportunities
See `SEO-BACKLINK-STRATEGY.md`. Categories: travel media, independent Morocco bloggers, photographers/creators, genuine local partners. Linkable assets list included. No spam techniques.

## 7. Technical SEO opportunities
- Ship official images into git (public/images is currently untracked → deploy-404 risk).
- Maintain: canonical/hreflang guards, sitemap dead=0, img-refs existence audit (all already automated in `audit:regression`).
- Add `photo-library:verify` to the periodic audit loop (done this phase as standalone script).
- Audit FAQPage schema eligibility per-page (only where FAQ genuinely on-page).

## 8. GSC feedback loop (monthly, once connected)
1. Export queries → group by intent → rising/declining queries.
2. Pages losing clicks → CTR/title review; pages gaining impressions → protect/strengthen.
3. Position 4–10 and 11–20 buckets → content/internal-link improvements.
4. Cannibalization check (watchlist in gap report).
5. Re-check after indexing; never act on one day of data.

## 9. Priority
- **P0**: import 46 official binaries + publish approved images through the manifest; keep MGA-023/MGA-046 blocked.
- **P1**: connect GSC; execute HIGH gap rows (quad, 4x4, luxury-camp depth, Marrakech→ and Fes→ route guides); internal-link pass over all tour pages.
- **P2**: MEDIUM gap rows; image swaps in destinations/blog; FAQ schema eligibility audit.
- **P3**: multilingual keyword-intent research per locale; LOW gap rows; glossary content folded into destination pages.
