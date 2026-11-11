# Phase 9A — Internal Linking Audit

Repository: `morocco-grand-adventure` (HEAD `7a45513`, branch `main`)
Method: Static graph analysis of canonical link sources (`src/data/seoHub.ts`, `src/data/tour-hierarchy.ts`, `src/data/content.ts`, `prerender.ts` link fixers). No runtime crawl performed.

## 1. Link graph model (canonical sources)
- **Guides → Tours:** each Merzouga/comparison guide defines `tours: [...]` (e.g. `camel-trekking` links `3-day-sahara-marrakech`, `4-day-marrakech-merzouga-sahara`, `3-day-sahara-fes`; `merzouga` mega-guide links 3 tours).
- **Tours → Guides:** tours reference `routeIds` (destinations) but **not** reciprocal guide ids — tours do not link back to their relevant Merzouga guides.
- **Destination → Tour / Tour → Destination:** tours carry `routeIds` linking destinations; destination pages list related tours.
- **Comparisons → Tours:** `seoHub` comparisons link tours via `tours`.
- **Tours → Comparison:** no tour links to a comparison page.

## 2. Findings
### Orphan / weakly-linked classes
- **Guide → Tour is present but Tour → Guide is absent** (one-directional). Highest-value fix: re-link `camel-trekking`, `how-many-days`, `marrakech-to-merzouga`, `fes-to-merzouga` from the tours they support.
- **Luxury cluster weakly interconnected:** `luxury-camp` tag page, `luxury-desert-camps` guide, and luxury tours (e.g. `7-day-imperial-cities-sahara-escape`) are not cross-linked in both directions.

### Missing commercial links
- Route guides `marrakech-to-merzouga` and `fes-to-merzouga` should each link the corresponding city tours (`marrakech-4-day`, `4-day-marrakech-merzouga-sahara`, `fes-4-day`, `3-day-fes-merzouga-sahara`) — currently tour pages do not link back.
- `best-time-to-visit` / `what-to-pack` guides are planning-intent; they should link to 2-day vs 3-day comparison and to short Sahara tours.

### Anchor repetition
- Multiple Merzouga guides reuse the same few tour ids (`3-day-sahara-marrakech`) as anchors → repetitive anchor risk on shared commercial tours; diversify anchors by context (duration, departure city).

## 3. Prioritized linking opportunities
| Priority | From | To | Purpose |
|---|---|---|---|
| P0 | `marrakech-to-merzouga` guide | Marrakech Sahara tours | Match route intent → commercial |
| P0 | Marrakech Sahara tours | `marrakech-to-merzouga` guide | Reciprocal authority |
| P0 | `fes-to-merzouga` guide | Fes Sahara tours | Match route intent |
| P0 | `camel-trekking` guide | `4-day-marrakech-merzouga-sahara` + camel/desert tours | Experience → booking |
| P1 | `luxury-desert-camps` guide | luxury tours + `/luxury-camp` | Luxury cluster |
| P1 | `2-day-vs-3-day-sahara-tour` comparison | both 2-day and 3-day tours | Decision → booking |
| P1 | tours → their departure-city hub (`/tours/from-*`) | /tours/from-city | City hub authority |
| P2 | `best-time-to-visit`, `what-to-pack` → short tours | duration tours | Planning → commercial |

## 4. Constraints
- Internal links are implemented in code (`src/pages`, `prerender.ts`), not authored content; any linking change touches code and must be validated against the `fix-prerender-links` / hreflang contract before deploy. No change made in this phase.