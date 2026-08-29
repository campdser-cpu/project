# Morocco Grand Adventure — Repository Implementation Audit

Date: 2026-08-29  
Repository: `campdser-cpu/project`  
Scope: production site, supporting API, SEO/prerendering, conversion and measurement foundations.

## Executive assessment

The project already has a strong technical base: Vite + React 19, Wouter routing, multilingual URL prefixes, route-specific metadata, build-time prerendering, multilingual sitemap generation, structured data, a central destination/tour data model, responsive image/video assets, and a public inquiry flow.

The highest-impact gaps are now measurement integrity, conversion-event coverage, consistency between static and runtime structured data, abuse protection on the public inquiry endpoint, and deeper contextual linking between the existing destination/tour authority pages. The site should be improved in place; there is no reason to replace the framework or rebuild the working SEO system.

## 20-point audit

| # | Area | Status | Findings / priority |
|---|---|---|---|
| 1 | Technical foundation | Good | React/Vite/Wouter architecture is coherent; route-level code splitting is already used. Keep it. P1: continue validating generated routes in CI. |
| 2 | Image SEO | Good / incomplete | Real destination, personal, hero, food, riad and tour imagery exists with meaningful filenames. Many important images have useful alt text. P1: systematically add dimensions/fetch priority to LCP images and review remaining generic/stock assets without renaming referenced files blindly. |
| 3 | Content architecture | Good | Central destination/tour data plus dedicated destination, tour, guide and conversion pages provide a useful information architecture. P1: strengthen relationships between existing entities before creating more URLs. |
| 4 | Morocco topical authority | Good foundation | The site already covers Morocco, destinations, tours, guides and itinerary pages. P1: make Morocco the hub connecting major regional/topic clusters. |
| 5 | Merzouga authority | Strong foundation | Dedicated Merzouga destination, guide, desert tours, camel trekking, luxury camp and route content exist. P1: connect these pages contextually and consistently. |
| 6 | Marrakech authority | Good | Dedicated Marrakech tours plus destination data and southern-route tours exist. P1: strengthen Marrakech → Atlas → Aït Ben Haddou → Dades → Merzouga paths. |
| 7 | Fes authority | Good | Dedicated Fes tours plus destination data and imperial-city tours exist. P1: strengthen Fes → Merzouga and Fes → Marrakech paths. |
| 8 | Internal linking | Good / incomplete | Tour detail pages already expose route-stop links; route audit checks generated internal links. P1: add deliberate contextual links on high-value destination/listing pages rather than random cross-linking. |
| 9 | Local SEO | Good foundation | Business identity, Merzouga location, phone, email, maps and social profiles are represented. P1: keep one canonical business identity across all schema and visible contact information. |
| 10 | Google Business Profile consistency | Needs review | The repository contains verified-location/contact claims and social links, but static and runtime Organization schemas are not fully aligned. P1: consolidate schema properties without inventing new business facts. |
| 11 | AI-search readiness | Good foundation | Prerendered pages expose crawlable headings, descriptions, FAQs, tour details and contact links. P1: improve concise answer blocks and entity relationships on important pages using existing facts. |
| 12 | E-E-A-T / first-hand experience | Good foundation | About content, local-guide identity, real contact information and first-party-looking imagery are present. P1: surface verifiable first-hand details already present in the project; do not manufacture claims. |
| 13 | Conversion UX | Good | Global WhatsApp, sticky booking CTA, trip builder and contact form are already present. P1: measure these paths reliably and preserve the low-friction public contact experience. |
| 14 | Booking UX | Good / incomplete | Tour detail pages include pricing, travelers, dates, route, itinerary and contact actions. P1: track booking starts and inquiry submissions; true booking confirmation is not currently available from the repository. |
| 15 | Analytics / GA4 | Needs improvement | GA4 is installed with deferred loading. Before this implementation, key conversion interactions were not comprehensively instrumented. P0/P1: track tour views/selections, booking starts, inquiries, WhatsApp, phone and email clicks while preserving attribution. |
| 16 | Search Console readiness | Good | The site has production-domain canonical URLs, sitemap and crawlable prerendered routes. No Search Console query data is available through the repository. P2: establish a recurring query/page/CTR/position improvement loop once Search Console data is connected. |
| 17 | Multilingual SEO | Strong foundation | Eleven language prefixes, localized metadata, canonical URLs, hreflang and x-default are implemented and mirrored by prerendering/sitemap generation. P1: validate translation completeness and avoid assuming translated strings alone equal localization quality. |
| 18 | Structured data | Needs alignment | Organization/TravelAgency, WebSite, Breadcrumb, TouristTrip, TouristAttraction, FAQ and review schemas exist. P1: remove inconsistencies between static and runtime business schema and validate generated JSON-LD. |
| 19 | Sitemap / indexation / performance | Good foundation | Sitemap is generated from actual prerendered files; robots allows crawling and blocks query-filter URLs; route audit validates sitemap/internal links. Homepage hero image is prioritized and maps are lazy-loaded. P1: keep generated-output validation in CI. |
| 20 | Backend/API security | Needs improvement | Public inquiry endpoint validates input but previously lacked request-size bounds and abuse throttling. Bearer-token support exists only in the API client; no user-authentication system is implemented. P0/P1: protect public inquiry abuse surface without inventing unnecessary login/authentication. |

## What should not be changed

- React/Vite/Wouter architecture.
- Existing multilingual URL model.
- Existing prerendering strategy.
- Existing tour and destination data.
- Existing image/video references.
- Public, low-friction inquiry model unless a real product requirement changes it.
- Existing verified business information unless new verified information is supplied.

## P0 — Critical

1. **Protect the public inquiry API from uncontrolled request volume and oversized bodies.** Implemented on the working branch with request-body limits and a lightweight per-IP rate limit.
2. **Prevent measurement blind spots on the main booking path.** Implemented a central GA4 event helper with UTM/landing-page attribution and delegated tracking for tour views/selections, booking starts, inquiry submits, WhatsApp, phone and email clicks.
3. **Do not claim booking confirmation tracking.** The current system can measure inquiry and contact actions, but the repository does not expose a confirmed-booking callback/system.

## P1 — High impact

1. Strengthen contextual internal links among Morocco, Marrakech, Fes, Merzouga, Sahara, route-stop and tour pages.
2. Align static and runtime organization/business structured data.
3. Improve LCP image metadata (`width`/`height`, priority) where source assets are known and safe to change.
4. Continue multilingual route/schema/sitemap validation through automated build checks.
5. Improve conversion attribution by carrying UTM/landing-page context into GA4 events.
6. Keep public inquiry fallback behavior resilient.

## P2 — Growth

1. Expand existing topic clusters only where there is a distinct search intent and useful first-hand value.
2. Build the Search Console data loop once data access is available.
3. Improve localization quality for high-value landing pages beyond literal translation.
4. Add deeper entity relationships and concise FAQ/answer blocks to high-value pages.
5. Improve image discoverability and remaining image metadata systematically.

## P3 — Nice to have

1. Further accessibility polish after automated/manual testing.
2. Additional social/OG refinements where they provide measurable value.
3. Lower-impact visual/performance refinements that do not affect indexability or conversion.

## Implemented on `seo-growth-foundation`

- Added `src/lib/analytics.ts` for safe GA4 event dispatch and UTM/landing-page attribution.
- Instrumented global tour/contact/WhatsApp/phone/email conversion interactions in `Layout` without duplicating page-specific business logic.
- Fixed the contextual WhatsApp route helper's missing return behavior on trip-builder/about routes.
- Added 20 KB JSON/form body limits to the API.
- Added lightweight public inquiry rate limiting and field-length bounds.
- Added a GitHub Actions quality workflow for workspace typecheck, site typecheck, build/prerender, route audit and i18n audit.

## Verification limitation

The repository connector can edit and inspect GitHub files and can inspect GitHub Actions runs, but it does not provide a local shell inside the repository. Therefore local `pnpm` commands cannot be executed from this connector session. The new CI workflow is the authoritative executable validation path for the committed branch; its run status must be checked in GitHub Actions after the push.
