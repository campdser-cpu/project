# Phase 9A — Executive Summary

Repository: `morocco-grand-adventure` — HEAD `7a45513` (branch `main`), clean working tree (only untracked `reports/` + 4 pre-existing untracked files).

## 1. Localization score by language (verified from source overlays)
| Locale | Tours /24 | Destinations /30 | Guides /25 | Notes |
|---|---|---|---|---|
| en | 24 (canonical) | 30 | 25 | Source of truth |
| it | **24/24** | 30 | 4/25 | Strongest localized locale |
| fr / es / de / nl / pt / zh / ja / ko / ar | **6/24** | 30 | 4/25 | Tours partial; destinations complete; guides mostly English |

Fact: 24 canonical tours; 30 destinations; 25 SEO-hub pages (16 Merzouga guides, 6 comparisons, 3 travel-info). Sitemap 1496 URLs; 1503 prerendered HTML.

## 2. Biggest localization problems
1. 9/10 non-EN locales at **6/24 tours** → mixed-language pages.
2. Only **4 of 25 guides** localized per locale (comparisons/travel-info entirely English).
3. Chinese/Japanese/Korean/Arabic need native-market authored content, not transliteration.
4. Destinations are complete (30/30) but guides that build authority lag.

## 3. Biggest Merzouga opportunities
- Complete the 12 English-only Merzouga guides + 6 comparisons in top locales.
- Strengthen `marrakech-to-merzouga` / `fes-to-merzouga` guide→tour linking.
- Reinforce `merzouga`/`erg-chebbi` destination authority with official ONMT region vocabulary ("Errachidia–Midelt–Merzouga", "desert break", bivouac, Tafilalet oasis).

## 4. Biggest competitor opportunities
- Moroccan Tour: deepest route architecture (departures Casablanca/Marrakech/Fes/Tangier/Errachidia/Ouarzazate × 2–14 days + day trips) → MGA lacking **Errachidia/Ouarzazate/Tangier** hubs and **Marrakech/Fes day-trip** depth.
- Saha Tours: native Spanish from Erfoud/Errachidia → MGA ES must be native, not machine.
- Dein-Marokko: native German, broad+Atlas, small-group → MGA can own German Merzouga/Sahara authority.
- Moroccan Journeys: luxury/nomadic/Erg Chigaga depth; but "chinese-home" is Chinese UI over **English** tour names → MGA genuine zh overlays are a differentiator.
- Visit Morocco: official vocabulary/entity clusters to mirror semantically (not copy).

## 5. Biggest cannibalization risks
1. Generic "Sahara desert tour" across `/desert-tours`, many tours, `sahara-desert-guide`.
2. "Marrakech → Merzouga" across tour + guide + hub.
3. "Erg Chebbi" across destination + guide + activity guide.
4. "private Morocco tour" across quote-only tours + `/trip-builder` + comparison.
5. Luxury across tag + guide + comparison + tours.

## 6. Top P0/P1 actions
1. (P0) Complete 18 tour overlays × 9 locales (proven IT workflow).
2. (P0) Complete IT guides (tours already done).
3. (P0) Localize 12 Merzouga guides + 6 comparisons in top-3 (FR/ES/DE).
4. (P1) Guide↔Tour reciprocal linking (esp. `marrakech-to-merzouga`, `fes-to-merzouga`).
5. (P1) Strengthen `luxury-camp` & `merzouga`/`erg-chebbi`/`ouarzazate` depth.
6. (P1) Native-market zh/ja/ko/ar overlays.
7. (P1) Adopt ONMT vocabulary semantically in Sahara/camp guides.
8. (P1) Wire GSC + Ahrefs to validate demand.
9. (P1) Evaluate Errachidia/Ouarzazate hubs + Marrakech/Fes day-trips with data.
10. (P1) Native Spanish ("Gran Sur") and German ("Wüstenreise") phrasing.

## 7. What should NOT be built (NO-GO)
- Duplicate per-duration pages where hub + tour already satisfy intent.
- A "2-day Marrakech–Merzouga" page overlapping Zagora + 3-day tours without a commercial case.
- Generic new "Sahara tour" pages cannibalising `/desert-tours` + `sahara-desert-guide`.
- Extra Erg Chebbi pages beyond existing destination/guide/activity guides.
- Any new URL before GSC/volume validation.

## 8. Recommended next implementation phase
**Stage A (P0): complete Tour overlays in the 9 non-IT locales** using the exact proven IT workflow (parse `content.ts`, translate all present fields, assert structural parity + zero English leakage + preservation, run typecheck/i18n:audit). In parallel **wire GSC + Ahrefs** so Stage E (new URLs) decisions are data-driven. Then Stage B (Merzouga cluster localization: IT → FR/ES/DE → NL/PT → ZH), Stage C (internal linking), Stage D (content depth), and finally Stage E conditional new URLs (Errachidia/Ouarzazate/Tangier hubs; Marrakech/Fes day-trips) only with validated demand.

No code, content, routes, or SEO changes were made during this phase. CSVs validated (264 / 297 / 17 rows; 0 malformed). GSC and Ahrefs: **NOT AVAILABLE** this session. No commit, no push.