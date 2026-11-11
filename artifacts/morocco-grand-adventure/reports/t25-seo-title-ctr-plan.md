# T25 — Data-Driven SEO Title & Meta-Description Plan

Source: Google Search Console Performance export, `artifacts/moroccograndadventure.com-Performance-on-Search-2026-10-28 (1).zip`
(not staged/committed). Filters: Search type = Web (text-based), Date = **Jul 27, 2026 – Oct 27, 2026** (3 months).
`Pages.csv` is capped at 1,000 rows (a UI export limit) — absence of a page below this cutoff is not proof of zero
performance, only that it didn't appear in this export.

**Query-attribution rule applied throughout:** `Queries.csv` is NOT filtered by page. Any query figures below are
labeled **property-wide** and are never presented as proof that a specific query landed on a specific URL — only
as corroborating context for real search demand on a topic.

---

## Tier A — Implementing (evidence-based, low-risk, title/description only)

### 1. `/travel-info/atlas-mountains-guide` — ES, FR, PT

| | ES | FR | PT |
|---|---|---|---|
| Clicks / Impr / CTR / Pos | 2 / 4,098 / **0.05%** / 9.9 | 0 / 42 / 0% / 10.5 | 2 / 239 / 0.84% / 10.3 |
| Confidence | **High** (extreme anomaly, huge sample) | Medium (same defect, small sample) | Medium-high |

**Root cause (verified by direct inspection, not guessed):** the ES, FR, and PT titles say only "Atlas [Country]"
(`Atlas Marruecos`, `Atlas Maroc`, `Atlas Marrocos`) — the word **"Mountains"** is missing from the title in these
three locales, even though it's present in the body/description ("Las montañas del Atlas...") and in DE
(`Atlasgebirge`), NL (`Atlasgebergte`), IT (`Atlante`, ambiguous but acceptable), ZH, JA, KO, AR (all correctly
include a "mountain range" word). A bare "Atlas Marruecos" title doesn't clearly read as an answer to "montañas del
atlas" / "atlas marruecos" searches next to competing snippets that do say "montañas." This plausibly explains why
a page ranking at position ~10 — normally good enough for *some* clicks — got 2 clicks on 4,098 impressions.
**Also note:** the page's H1 and body are still English-only (a known, separate, already-documented limitation from
the prior localization pass) — this plan does not touch that; it only fixes the title/description text itself.

**Proposed:**
- ES: `Montañas del Atlas, Marruecos — Alto Atlas, Imlil, Toubkal y Ourika` (was: `Atlas Marruecos — Guía del Alto Atlas, Imlil, Toubkal y Ourika`)
- FR: `Montagnes de l'Atlas au Maroc — Haut Atlas, Imlil, Toubkal et Ourika` (was: `Atlas Maroc — Guide du Haut Atlas, Imlil, Toubkal et Ourika`)
- PT: `Montanhas do Atlas, Marrocos — Alto Atlas, Imlil, Toubkal e Ourika` (was: `Atlas Marrocos — Guia do Alto Atlas, Imlil, Toubkal e Ourika`)
- Descriptions: unchanged — they already correctly say "montañas/montagnes/montanhas."

**Risk:** very low. Same named places, same meaning, just restores the topic word. No price, review, or availability claim involved.

---

**Review update (post-implementation):** re-verified the 150m claim directly against the canonical source data
(`src/data/seoHub.ts`), not just the one rendered page — it is independently stated in at least four separate
places (the guide body: "about 150 m at the highest crest"; the page's own FAQ: "about 150 m at their highest
crests"; a comparison page: "up to roughly 150 metres"; another guide: "up to about 150 m"). The claim is
well-established and internally consistent across the site's own content, not a one-off assertion. No change made.

### 2. `/merzouga-guide/erg-chebbi` — EN

| Clicks | Impr | CTR | Position |
|---|---|---|---|
| 5 | **1,440** | 0.35% | 9.4 |

Second-highest-impression page on the entire property. Property-wide, the bare query "erg chebbi" gets 866
impressions at 0% CTR, and "erg chebbi dunes" gets 121 impressions at 0% CTR — real, large demand, essentially no
clicks anywhere on the site for this exact topic.

**Current title:** `Erg Chebbi Dunes — How Tall They Are & What to Do` — accurate but vague ("How Tall They Are"
poses a question instead of giving the answer). **Verified in the page body:** "Its dunes climb to about 150 m at
the highest crest — the tallest free-standing dunes in Morocco." This is an existing, stated fact, not a new claim.

**Proposed:** `Erg Chebbi Dunes, Merzouga — Morocco's Tallest at 150m` (was: `Erg Chebbi Dunes — How Tall They Are & What to Do`)

**Why:** leads with the concrete, already-verified answer instead of restating the question; adds "Merzouga," a
high-volume companion term, for better query match. Description is left unchanged — it already covers "what to do."

**Confidence:** Medium-high (strong data, content-verified fact, but no direct proof the *title* specifically is the
bottleneck rather than SERP competition from larger travel sites).

---

### 3. `/destinations/ait-ben-haddou` — JA

| Clicks | Impr | CTR | Position |
|---|---|---|---|
| 1 | 672 | 0.15% | 8.2 |

**Defect found by direct inspection (not GSC-provable, but a genuine quality issue):** the title spells the place
name **アイト・ベン・ハドゥ**, while the page's own H1 spells it **アイット・ベン・ハドゥ** (double っ) — two different
transliterations of the same name on the same page. A careful Japanese searcher comparing the SERP snippet to the
landing page sees a mismatch.

**Proposed:** align the title's spelling to match the existing H1 exactly: `アイット・ベン・ハドゥ — 土造りの世界遺産を歩く` (was: `アイト・ベン・ハドゥ — 土造りの世界遺産を歩く — Morocco Grand Adventure`) — also drops the trailing `— Morocco Grand Adventure` brand suffix, which is redundant with the title tag's own site association and makes room for the corrected spelling without lengthening the title.

**Confidence:** High that this is a real defect; medium that fixing it alone moves CTR (position/competition may also be a factor).

---

### 4. `/destinations/todra-gorge` — AR

| Clicks | Impr | CTR | Position |
|---|---|---|---|
| 1 | 386 | 0.26% | 8.3 |

Same pattern as #3: title says **تودرا** (Todra), H1 says **تودغا** (Todgha) — two different transliterations on
one page.

**Proposed:** align the title to the H1's spelling: `مضيق تودغا — الوادي العظيم في المغرب، دليل السفر` (was: `مضيق تودرا — الوادي العظيم في المغرب، دليل السفر`)

**Confidence:** High for the defect; medium for CTR impact.

---

### 5. `/travel-info/morocco-airports-guide` — EN

| Clicks | Impr | CTR | Position |
|---|---|---|---|
| 3 | 450 | 0.67% | **5.8** |

Position 5.8 is a strong, top-of-page-1 ranking; 0.67% CTR is low for that position. Property-wide, "best airport
to fly into morocco" (9 impr) and "which airport in morocco is best to fly into" (6 impr) confirm the exact
question this page answers is being searched.

**Current:** `Which Morocco Airport Should You Fly Into? — Travel Guide` (question format, generic "Travel Guide" suffix)

**Proposed:** `Marrakech, Casablanca or Fes — Which Morocco Airport to Fly Into` — leads with concrete named
options (already in the existing description, not new information) ahead of the question, which general CTR
practice suggests can read as more immediately useful in a results list than a bare question mirroring the user's
own query.

**Confidence:** Medium. The position is genuinely good and the CTR genuinely low, but I have no direct, page-specific A/B evidence that this exact wording change is the fix — flagged as a reasoned hypothesis, not a proven one.

**Implementation note (original pass):** this page had no per-locale title override at all — all 11 locale URLs
shared one English `routeMetadata` entry as a fallback (a pre-existing pattern, same as `marrakech-safety-guide`).
A first draft of this title ran 71 characters, crossing the SEO-content-audit's 70-char soft-warning threshold on
all 11 shared URLs at once (56→67 warnings). Tightened to 64 characters ("Marrakech, Casablanca or Fes — Which
Morocco Airport to Fly Into") to stay under the threshold.

**Review update — now genuinely localized in all 11 locales.** The reviewer correctly flagged that an English
title on non-English search results is itself a defect, and asked for real per-locale titles using the existing
`AR_ROUTE_META` / `FR_ROUTE_META` / etc. architecture — the same mechanism every sibling travel-info page
(atlas-mountains-guide, amazigh-berber-culture, morocco-travel-safety) already uses. Implemented:

| Locale | Title | Length |
|---|---|---|
| FR | `Marrakech, Casablanca ou Fès — Quel aéroport choisir au Maroc` | 61 |
| ES | `Marrakech, Casablanca o Fez — Qué aeropuerto elegir en Marruecos` | 64 |
| IT | `Marrakech, Casablanca o Fes — Quale aeroporto scegliere in Marocco` | 66 |
| DE | `Marrakesch, Casablanca oder Fès — Welchen Flughafen in Marokko wählen` | 69 |
| NL | `Marrakech, Casablanca of Fez — Welke luchthaven in Marokko kiezen` | 65 |
| PT | `Marraquexe, Casablanca ou Fez — Que aeroporto escolher em Marrocos` | 66 |
| ZH | `马拉喀什、卡萨布兰卡还是非斯——摩洛哥该飞哪个机场` | 25 |
| JA | `マラケシュ、カサブランカ、フェズ — モロッコどの空港を選ぶべきか` | 33 |
| KO | `마라케시, 카사블랑카 또는 페스 — 모로코 어느 공항으로 가야 할까` | 37 |
| AR | `مراكش، الدار البيضاء أم فاس — أي مطار تختار في المغرب` | 53 |

Each description was translated to match (same named airports: Marrakech/Casablanca/Fes/Tangier/Agadir; same
Sahara/Atlas/imperial-cities/northern-Morocco framing as the English original — no new claims introduced).

First draft of the ES/DE/NL/PT descriptions ran over the 170-character threshold (174/177/177/172), pushing total
SEO-content-audit warnings to 58. Tightened all four (trimmed redundant phrasing, e.g. dropping "de Marruecos"/
"marokkanischen" where the surrounding sentence already made the country clear) to 161/147/147/160 characters.
**Net result: this page no longer appears in the duplicate-title audit at all** (it was previously one shared
11-page duplicate-title group) — total site-wide SEO-content-audit warnings dropped from the 56 baseline to **54**.

---

## Tier B — Documented, NOT changed (insufficient confidence or wrong problem for a title fix)

| Page / locale | Data | Why not changed now |
|---|---|---|
| `morocco-travel-safety` — EN/NL/DE/IT (pos 21–54) | 0–1 clicks, positions 21.9–54.4 | **Ranking problem, not a CTR problem** — per the explicit instruction, a page at position 40+ needs different work than a title tweak. Not touched. |
| `morocco-travel-safety` — FR/KO/ZH/AR/ES (pos 8.5–13.9, 0 clicks) | Small absolute impressions (13–64) | Same topic, better position, but sample sizes are too small (13–64 impressions) to distinguish a real defect from noise. Documented for future monitoring, not changed. |
| `/travel-info/amazigh-berber-culture` — NL | 3 / 1,280 / 0.23% / 8.7 | Title and description are already complete, accurate, natural Dutch (`Amazigh- (Berber-) Cultuur in Marokko — Introductie voor Reizigers`). No defect found on inspection. Real anomaly, but changing an already-correct title without a specific hypothesis risks making it worse. Recommend monitoring only. |
| `/merzouga-guide/erg-chebbi-sunrise-sunset` — DE | 8 / 940 / 0.85% / 7.9 | Title/H1/description are specific, accurate, well-formed (photography-niche intent, already names "best time" and "photo tips"). No defect found. |
| `/merzouga-guide/4x4-desert-tour` — EN | 10 / 631 / 1.58% / 9.7 | Title/description solid; CTR is low but not as extreme as the Tier A cases relative to position. Lower priority. |
| `/destinations/erg-chebbi` — KO/NL/IT, `/destinations/ait-ben-haddou` other locales | Various | These destination pages share one site-wide template appending "— Morocco Grand Adventure" to every title. This is a **template-level pattern affecting many pages**, not a one-page defect. Changing it for 2–3 pages only would make those inconsistent with every other destination page. Flagged as a separate, broader observation for a future, dedicated pass — not acted on here. |
| `/destinations/draa-valley` — AR | 0 / 695 / 0% / 9.6 | Decent position, real impressions, but AR destination titles already look reasonable on inspection and the absolute click count (0 of 695) could still be low-traffic-category noise for a single market. Documented, not changed without a clearer hypothesis. |

---

## Evidence quality notes

- All figures above are read directly from the Oct 28, 2026 export's `Pages.csv`, one row per exact URL, never aggregated across locales.
- Query terms cited (e.g. "erg chebbi" 866 impressions property-wide) come from `Queries.csv` and are explicitly **not** claimed to belong to any specific URL in this report — they are cited only as corroborating evidence that real search demand exists for the topic.
- No clicks, prices, review counts, or availability were invented anywhere in this plan.
