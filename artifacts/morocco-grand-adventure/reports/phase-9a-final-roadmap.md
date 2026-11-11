# Phase 9A — Final Implementation Roadmap

Repository: `morocco-grand-adventure` (HEAD `7a45513`). Research/audit only — no changes in this phase.
Priority: **P0** = must fix before expanding; **P1** = high value; **P2** = later; **NO-GO** = do not build.

## Stage A — Complete Tour localization (P0)
Complete the 18 missing tour overlays × 9 locales (FR, ES, DE, NL, PT, ZH, JA, KO, AR), mirroring the completed IT batch (verify structural parity per locale, no English leakage, preserve arrays — same workflow already proven for IT).
Evidence: repo overlay counts (only IT=24/24).
Why: eliminates mixed-language pages; core international-SEO prerequisite.

## Stage B — Complete Merzouga cluster localization (P0/P1)
- Localize the **12 English-only Merzouga guides** (only 4 of 16 localized; e.g. `erg-chebbi`, `things-to-do`, `marrakech-to-merzouga`, `fes-to-merzouga`, `luxury-desert-camps`, `desert-camps`, `how-to-get-there`).
- Localize the **6 comparisons** (Western `merzouga-vs-zagora`, `private-vs-shared-tour`, `2-day-vs-3-day`, `luxury-camp-vs-standard`, `erg-chebbi-vs-erg-chigaga`, `marrakech-vs-fes`).
- Localize the **3 travel-info** pages.
Priority order mirrors multilingual strategy (IT → FR/ES/DE → NL/PT → ZH → JA/KO/AR).
Why: destinations already 30/30; guides are the remaining authority gap.

## Stage C — Internal linking improvements (P1)
Implement reciprocal Guide↔Tour and guide→tour tax links identified in `phase-9a-internal-linking-audit.md` (e.g. `marrakech-to-merzouga` ↔ Marrakech tours; `fes-to-merzouga` ↔ Fes tours; luxury cluster). Validate against the prerender link/hreflang contracts.
Why: cheap authority + commercial flow; low risk.

## Stage D — Competitor-derived content improvements (P1/P2)
Improve existing pages (not new URLs) using intent/terminology gaps:
- Strengthen `luxury-camp` / `luxury-desert-camps` depth (competitor Moroccan Journeys luxury/nomadic depth).
- Strengthen `merzouga`/`erg-chebbi` destination authority using official ONMT region vocabulary ("Errachidia–Midelt–Merzouga", "desert break", bivouac) — semantic, not copied.
- Strengthen `ouarzazate`/`zagora`/`tinghir` entity coverage (ONMT "Ouarzazate–Zagora–Tinghir" cluster).
- Adopt native phrasing per locale (Spanish "Gran Sur", German "Wüstenreise", etc.).

## Stage E — New URLs ONLY after validation (P1, conditional)
Evaluate these **only after A–C complete and GSC/Ahrefs validate demand** (SEARCH VOLUME NOT AVAILABLE now):
- `/tours/from-errachidia` — Errachidia departure hub (competitor Moroccan Tour + Saha base; strong Sahara route intent).
- `/tours/from-ouarzazate` — Ouarzazate departure hub (Route of 1000 Kasbahs / ONMT cluster).
- Marrakech day-trip pages (Essaouira / Ouzoud / Ourika / Aït Ben Haddou) — Moroccan Tour & Saha cover these; `/build-your-day-trip` may not satisfy intent alone.
- Fes day-trip pages (Ifrane/Volubilis/Chefchaouen).
- `/tours/from-tangier` — only if validated.

Do NOT auto-create all; each requires intent + commercial + cannibalization review.

## NO-GO (do not build)
- Duplicate per-duration pages where a city hub + tour already satisfy intent.
- A "2-day Marrakech–Merzouga" page that overlaps `2-day-zagora` and 3-day tours without a distinct commercial case.
- Generic "Sahara tour" pages cannibalising `/desert-tours` hub + `sahara-desert-guide`.
- New Erg Chebbi pages beyond existing destination + guide + activity guides.
- Any new URL before GSC/volume validation.

## 30-day sequencing
- **Week 1:** Stage A — finish FR/ES/DE tour overlays (+ IT guide overlays). Validate parity + no-leak (proven IT workflow).
- **Week 2:** Stage A continue (NL/PT/ZH) + Stage B start — localize 12 Merzouga guides in the top-3 languages.
- **Week 3:** Stage B comparisons + travel-info; Stage C internal linking; wire GSC/Ahrefs.
- **Week 4:** Stage D content improvements + revisit Stage E new URLs only with data.
No ranking/traffic promises.

## Constraints
Any code change (links, routes, metadata) must pass `typecheck`, `i18n:audit`, and the prerender/hreflang contracts before deploy. No code, content, or SEO changes were made in this phase.