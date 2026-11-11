# Phase 9A — Cannibalization Audit

Repository: `morocco-grand-adventure` (HEAD `7a45513`)
Scope: static review of overlapping intent across tours, departure hubs, destination pages and guides. No URL removal recommended; findings only.

## Cluster-by-cluster analysis
### Marrakech → Merzouga
Served by: `4-day-marrakech-merzouga-sahara`, `marrakech-4-day`, `3-day-sahara-marrakech`, guide `marrakech-to-merzouga`, departure hub `/tours/from-marrakech`, destination `merzouga`.
Intended primary: **`4-day-marrakech-merzouga-sahara`** (canonical Merzouga route).
Risk: MEDIUM — multiple tours + guide + hub share the route intent.
Action: differentiate by duration (3 vs 4 day) in H1/title; keep guide informational; hub categorical. No duplicate page needed.

### Fes → Merzouga
Served by: `3-day-fes-merzouga-sahara`, `4-day-fes-marrakech-via-merzouga`, `3-day-sahara-fes`, guide `fes-to-merzouga`, hub `/tours/from-fes`.
Intended primary: **`3-day-fes-merzouga-sahara`**.
Risk: MEDIUM; `4-day-fes-marrakech-via-merzouga` is a distinct (multi-destination) route — keep separate, ensure distinct H1.

### Morocco Sahara tours (generic)
Served by most Sahara tours + `sahara-desert-guide` + `/desert-tours` tag page.
Risk: HIGH for the generic head term. Recommended hierarchy: tag hub `/desert-tours` as the umbrella; each tour differentiates on departure city + duration; `sahara-desert-guide` stays informational.

### Merzouga tours
Served by tours routing through Merzouga + `things-to-do` guide + `merzouga` destination page.
Risk: MEDIUM. Keep destination page authoritative for "Merzouga" knowledge; tours for commercial.

### Erg Chebbi
Served by `erg-chebbi` guide + `merzouga-vs-zagora`? (no) + `erg-chebbi-sunrise-sunset` guide + `erg-chebbi` destination + tours.
Risk: MEDIUM — multiple Erg Chebbi targets. Recommended: destination `erg-chebbi` + one guide (`erg-chebbi`) as canonical; split `sunrise-sunset` and `vs-erg-chigaga` as supporting.

### Luxury desert camp
Served by `luxury-camp` tag page + `luxury-desert-camps` guide + `luxury-camp-vs-standard-camp` comparison + luxury tours.
Risk: MEDIUM. `luxury-camp` tag = commercial; guide = informational; comparison = decision. Keep distinction; cross-link rather than duplicate.

### Sahara desert camp
Served by `desert-camps` guide + `luxury-camp-vs-standard-camp` + desert tours.
Risk: LOW-MEDIUM.

### Private Morocco tours
Served by all `category: Private · Quote Only` tours + `/trip-builder` + `private-vs-shared-tour` comparison + homepage CTA.
Risk: MEDIUM — head term "private Morocco tour" spread. Recommended: `/trip-builder` (private build flow) as the conversion target; tours support.

### Morocco itineraries
Served by every multi-day tour + `sahara-desert-guide`.
Risk: LOW-MEDIUM; long-tail "Morocco itinerary N days" naturally maps to per-duration tours.

### 2-day vs 3-day Sahara
Served by `2-day-vs-3-day-sahara-tour` comparison + `2-day-zagora-desert-marrakech` + 3-day tours.
Risk: LOW; comparison is the decision page, tours are commercial.

### private vs shared
Served by `private-vs-shared-tour` comparison + quote-only tours.
Risk: LOW.

### City + duration Tours
Served by city hubs (`/tours/from-*`) + per-duration hubs (`/tours/from-city/N-days`) + individual tour pages.
Risk: MEDIUM — hub pages honestly state "no fixed itinerary" where no canned tour exists (per `tour-hierarchy.ts`), so hubs reduce cannibalization risk vs invented tours. Individual tours are the commercial targets.

## Highest-risk summary
1. Generic "Sahara desert tour" — many overlapping pages.
2. "Marrakech → Merzouga" — tour + guide + hub.
3. "Erg Chebbi" — destination + guide + activity guide.
4. "private Morocco tour" — tours + trip-builder + comparison.
5. Luxury — tag + guide + comparison + tours.

## Recommended hierarchy principle
One **commercial target** per head/commercial keyword; **one informational page** per authority topic; **hubs categorical**; supporting pages cross-link but never reuse the same H1/title. No page removal is proposed in this phase.