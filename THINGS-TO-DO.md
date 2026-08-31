# THINGS TO DO — Morocco Grand Adventure

This is the living production-quality backlog. Items are evidence-led and should be verified before being marked complete.

## P0 — Critical

- [x] **Separate Day Trip conversion flow from the multi-day builder** — `/build-your-day-trip` is independent; `/trip-builder` remains the multi-day planner. Implemented on the current feature branch; verify in preview.
- [x] **Make Day Trip semantics explicit** — one-day experience / same-day return, no multi-day itinerary state. Implemented; verify in preview.
- [ ] **Verify the complete inquiry path in a real browser** — test WhatsApp opening, mobile behavior, locale routing and form validation without sending a real customer message.
- [ ] **Verify production custom-domain indexability** — preview deployments may intentionally expose `X-Robots-Tag: noindex`; confirm the custom domain is indexable after deployment.

## P1 — High impact

- [x] **Measure Day Trip conversion intent** — GA4 events for quote request and WhatsApp click now include structured business context. Implemented; verify in GA4 DebugView/Realtime.
- [ ] **Audit structured data by page entity** — destination pages should not inherit generic TouristTrip/Offer semantics; tours may use TouristTrip/Offer only when supported by visible facts.
- [ ] **Improve Day Trips hub** — make it a clear hub, explain day trip vs multi-day tour, and only list verified commercial products.
- [ ] **Strengthen factual tour summaries** — duration, departure, return, destinations, transport, accommodation, inclusions, exclusions and booking method only when supported by source data.
- [ ] **Upgrade thin authority pages** — Merzouga, Erg Chebbi, Camel Trekking, Luxury Camp and the Marrakech → Merzouga guide.
- [ ] **Fix Arabic homepage internal-link isolation** — ensure the Arabic homepage connects to tours, day trips, destinations and contact/customization.
- [ ] **Review mobile vs desktop GSC anomaly** — query × page × device × country before making responsive changes.
- [ ] **Verify sitemap/indexing consistency** — compare sitemap URLs, canonical URLs, prerender output and GSC indexing data.

## P2 — Growth

- [ ] Build evidence-led internal links between tours, destinations, experiences and authoritative guides.
- [ ] Upgrade existing Marrakech → Merzouga, Sahara packing and Sahara best-time content instead of creating duplicate URLs.
- [ ] Prioritize international localization using actual GSC country/query performance; do not mass-produce low-quality translations.
- [ ] Research non-branded commercial SERPs and competitor intent before creating new landing pages.
- [ ] Add only verified Day Trip products after business verification.
- [ ] Add/verify business conversion events for phone, email, contact submission and builder completion where the current analytics architecture supports them.

## P3 — Polish

- [ ] Continue image metadata/compression audit without replacing authentic business imagery.
- [ ] Audit video posters, lazy loading, mobile bandwidth and LCP impact.
- [ ] Continue accessibility and micro-UX refinements after P0/P1 validation.

## Rules

- Never invent reviews, prices, availability, hotels, awards, certifications, inclusions or customer experiences.
- Do not modify the six locked authentic reviews.
- Prefer improving existing authoritative URLs over creating duplicate SEO pages.
- A build passing is necessary but not sufficient: browser and conversion verification are required before production promotion.
