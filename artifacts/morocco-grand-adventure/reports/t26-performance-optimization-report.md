# T26 — Deep Performance Optimization Report

**Scope:** site-wide performance pass on Morocco Grand Adventure (Vite 7 + React + Tailwind v4), per the baseline PageSpeed Insights audit (mobile Perf 71, LCP 4.8s lab / 3.1s field, CrUX CWV FAILED). No commit, push, or deploy was performed — all changes are local, working-tree only, for review.

---

## 1. Initial findings / confirmed root causes

Audited before changing any code:

| Area | Finding | Verdict |
|---|---|---|
| Hero / LCP element | `src/pages/home.tsx` hero is a `<picture>` with desktop WebP `source` (1280w/1920w), mobile poster `<img fetchPriority="high">`, matching `<link rel="preload" fetchpriority="high">` in `index.html`, video deferred via idle-gate | **Already optimal — confirmed, not touched** |
| Logo | `public/logo-official.png`, 1230×957, 406 KiB, rendered at max 64px tall (~82px wide) by `Logo.tsx` — ~95% of the downloaded bytes were never displayed | **Real, safe win — fixed** |
| Homepage tour/destination/city images | `width`/`height` + `loading="lazy"` already present, but no `srcset`/`sizes` — mobile downloaded the same image as desktop despite existing 480w/768w variants already on disk | **Real, safe win — fixed** |
| Global CSS | `dist/assets/index-vlPp5JFD.css` = 210 KB raw (~31 KB gzip), one render-blocking stylesheet, no route splitting. Confirmed standard Tailwind v4 auto-scan behavior (no `tailwind.config.*`, no `@source`/`@config` override) — **not a misconfiguration** | Understood; real fix (critical-CSS extraction / route splitting) is a larger separate initiative, out of scope for a "safe changes only" pass — **not attempted** |
| Fonts | All 12 `@font-face` rules (Lato ×6, Playfair Display ×4 + 2 more) already use `font-display: swap`. Only Latin/Latin-ext weights are self-hosted; non-Latin scripts (Korean confirmed via `:lang(ko)` rule, and by extension Arabic/CJK locales) render via system font fallback — no custom non-Latin webfont is shipped at all | **Already optimal — no subsetting risk exists, nothing to change** |
| JS — `StickyBookingCTA` | Rendered only after `idle` inside `Layout.tsx`, which was its sole import site anywhere in `src/` | **Real, safe win — lazy-loaded** |
| JS — `WhatsAppButton` | Attempted lazy-load; found `Footer.tsx` and `Navbar.tsx` (both eager/critical-path) import `contextualWhatsAppMessage` from the same module, so Rollup keeps the whole module eager regardless — lazy-loading only adds Suspense indirection with zero byte benefit | **Correctly reverted — no change kept** |
| Caching / compression headers | No `vercel.json`, `netlify.toml`, or `_headers` file anywhere in the repo. Deployment is static hosting via `.replit-artifact/artifact.toml` (`serve = "static"`) — there is no header-configuration surface inside this repository to change | **Out of this project's control — correctly left untouched** |
| Sourcemap warning | `vite.config.ts` has no `sourcemap` setting (defaults `false`); 0 `.map` files in `dist/`. Confirmed informational-only, zero Core Web Vitals impact | **No action needed** |
| Console errors / "six long tasks" / live Lighthouse | Playwright is not an installed dependency and no cached Chromium binary was found locally; a network install was not attempted given this session's prior, repeated npm-registry flakiness with this exact tooling | **Not measured this pass — honestly reported as not attempted, not estimated** |

---

## 2. Exact files changed, and why

| File | Change | Why |
|---|---|---|
| `scripts/optimize-logo.mjs` (new) | Generates a 260w WebP derivative of the logo | Right-sizes the header logo without touching the canonical source PNG |
| `public/logo-official-260w.webp` (new, generated) | 260×202, 23,928 bytes, alpha preserved | Output of the above script |
| `src/components/layout/Logo.tsx` | `<img src="/logo-official.png" width=1230 height=957>` → `<img src="/logo-official-260w.webp" width=260 height=202>` | Logo never renders taller than 64px (h-16); 260w covers ~3× DPR at the largest breakpoint |
| `src/components/layout/Layout.tsx` | `StickyBookingCTA` moved to `lazy()` + `Suspense`; `WhatsAppButton` kept eager (reverted) with an explanatory comment | `StickyBookingCTA` had no other import site and only renders post-idle; `WhatsAppButton` does, so lazy-loading it is a no-op dressed up as a win |
| `src/pages/home.tsx` | Added `srcSet`/`sizes` to 3 `<img>` tags: Featured Tours grid, Destinations grid, departure-city carousel thumbnails | These images already had 480w/768w WebP siblings on disk (from the existing `scripts/optimize-images.mjs` pipeline) that were never referenced via `srcset` |

No other files were modified. `public/logo-official.png` is unchanged on disk (415,727 bytes, same mtime) — it remains the canonical asset referenced by the Organization/TravelAgency JSON-LD in `StructuredData.tsx` and `index.html`, correctly left at full resolution (metadata, never downloaded as part of page render).

---

## 3. Image optimization inventory

| Asset | Before | After | Savings |
|---|---|---|---|
| Header logo (`Logo.tsx` render) | 415,727 bytes (1230×957 PNG) | 23,928 bytes (260×202 WebP) | **94.2%**, 391,799 bytes per page load |

Homepage responsive images (no new files generated — wired up existing 480w/768w variants):

| Image group | Count verified | Fix |
|---|---|---|
| Featured Tours grid | 33 unique tour images, all confirmed to have `-480w.webp`/`-768w.webp` siblings on disk before editing | Added `srcSet` (480w/768w/1200w) + `sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 20vw"` |
| Destinations grid | 30 destination images, all confirmed complete | Added `srcSet` + `sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"` |
| Departure-city carousel thumbnails | 7 `CITY_HUBS.heroImage` values, all confirmed complete | Added `srcSet` + `sizes="(max-width: 639px) 42vw, (max-width: 767px) 30vw, 20vw"` |

Every referenced variant was verified to exist on disk via dedicated Node scripts *before* editing any component — modeled on the project's own `scripts/test-catalog-srcset.ts` regression guard, which exists specifically because this codebase has previously shipped a `srcset` pointing at a non-existent file.

**Images explicitly skipped (already correct, intentionally not touched):** the hero poster (`<picture>` + `<source>`, already fully responsive), the student-tours image (hand-tuned `<picture>` + `<source>` with a `calc()` sizes expression — the bare `<img>` is a no-JS fallback only), and 3 other `home.tsx` images already fixed in earlier sessions.

**AVIF:** considered and declined. The project has an established, tested WebP-only convention (`optimize-images.mjs`, `process-catalog-images.mjs`, `test-catalog-srcset.ts`). Adding AVIF now would mean a second format/test surface for marginal gains over already-compressed WebP, with no concrete evidence it was needed — this is the "don't convert blindly, prioritize material impact" case from the brief.

No alt text, image-to-tour associations, or localized photo assignments were changed on any page.

---

## 4. Bundle / JS verification (measured, with an important correction)

Build output, same commands, before vs. after:

| Chunk | Size | Note |
|---|---|---|
| `index-CDfn5XXv.js` (main entry) | 1,403,620 bytes | **Unchanged** — see explanation below |
| `Layout-BE43Zs5v.js` | 42,624 bytes | Contains `Layout.tsx` (not the main entry chunk) |
| `StickyBookingCTA-kTqztAeb.js` | 2,290 bytes | **New** — confirms the lazy-load mechanically worked |
| `ConciergeChat-zHjcMEMa.js` | 6,889 bytes | Pre-existing split from an earlier session, re-verified intact |
| `home-D_JBMbG8.js` | 66,597 bytes | Contains the 3 new `srcSet`/`sizes` literals — verified by grep |

**Correction to an initial assumption:** I expected the `StickyBookingCTA` extraction to shrink the main `index-*.js` chunk and was initially puzzled that its byte count didn't move. The reason: `Layout.tsx` (which renders `StickyBookingCTA`) is *already* its own route-level chunk, separate from the main entry bundle — proven by `Layout-BE43Zs5v.js` existing at all. So the extraction correctly shrinks the **Layout** chunk's content (moving ~2.3 KB of UI/icon/logic into an on-idle-only chunk), not the main entry chunk. I was checking the wrong chunk, not reporting a false win — the real, verified effect is: `StickyBookingCTA`'s code is no longer downloaded until the browser is idle, for every page that uses `Layout`. This is a modest, honest win, not a dramatic one.

`srcSet` verification: grepped the compiled `home-D_JBMbG8.js` for the literal `sizes` strings added in `home.tsx` — all three are present verbatim, plus the `-480w.webp` replace pattern, confirming correct, unmangled compilation.

---

## 5. The "logo missing from dist/en/index.html" investigation (resolved — not a bug)

`grep` for the logo in the built static HTML (`dist/en/index.html`) found neither the old PNG nor the new WebP inside `<div id="root">`. Investigation:

- `scripts/prerender.ts` does **not** call `renderToString`/`ReactDOMServer` — it hand-builds a separate, crawler-oriented static fallback (`class="prerendered-static"`), confirmed by direct inspection of `dist/en/index.html` lines 271–684: a site-tree `<nav>`, the hero `<picture>` (matching the real LCP image), heading/FAQ/review text, and link lists for tours/destinations/footer.
- This fallback **never included the header/Navbar/Logo markup, or any tour-card/destination-card `<img>` tags, even before this change** — it's a lightweight, no-JS/crawler-safe link tree, not a reproduction of the real page chrome.
- Real users and any JS-executing tool (Lighthouse, PageSpeed, actual browsers) see the real React-rendered `Logo` component after hydration, which correctly points at `/logo-official-260w.webp` — confirmed in source and confirmed compiling correctly (same build pipeline verified above for `home.tsx`'s changes).

No `prerender.ts` change was necessary. This is a pre-existing architectural characteristic of the static-fallback generator, not a regression introduced by this task.

---

## 6. Phase 6 — SEO / conversion protection (re-verified against the new build)

| Check | Result |
|---|---|
| `npm run route:audit` | 2006 prerendered pages, 1991 unique sitemap URLs, 10 consistent blog slugs — exit 0 |
| `npm run hreflang:audit` | 2002 pages checked, 24,024 hreflang links, 20,020 reciprocity pairs — **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | 11 languages, **0 empty translations** (matches established baseline) — pre-existing missing-key/hardcoded-string counts are unrelated coverage debt, untouched by this task |
| Build's own SEO content audit (part of `npm run build`) | 2006 pages / 382,828 internal links checked, **54 warnings** (matches the established post-T25 baseline exactly, no regression), PASS |
| `typecheck` + `test:deterministic` | Both run as the first two steps of `npm run build`; build completed end-to-end, confirming both passed |

No canonical URLs, hreflang tags, sitemap/robots behavior, titles/descriptions, structured data, pricing, booking/inquiry logic, WhatsApp links, or alt text were changed.

---

## 7. Before/after metrics — measured vs. estimated

**Measured (from this session's build artifacts, not lab/field tools):**
- Logo payload for the header render: 415,727 → 23,928 bytes (**−94.2%**, real file-size measurement).
- `StickyBookingCTA`'s ~2,290 bytes moved from the `Layout` chunk's eager path to an idle-gated chunk (real, from build output).
- Main entry chunk (`index-*.js`): 1,403,620 bytes, unchanged by this round's JS work (explained in §4).
- Audit pass/fail counts above: all directly measured from this session's actual tool runs.

**Not measured — explicitly not estimated or invented:**
- No new Lighthouse/PageSpeed run was performed in this session (Playwright/Chromium not available locally; a network install was skipped given this session's prior tooling flakiness). I am **not** claiming any new Performance score, LCP/FCP/TBT/CLS number, or Core Web Vitals pass/fail — the baseline figures in the original brief (Perf 71, LCP 4.8s lab / 3.1s field, etc.) remain the last known measurements.
- Field CrUX data cannot reflect these changes until enough real-user traffic accumulates after deployment — consistent with the task's own instruction not to conflate lab and field data.

---

## 8. Remaining issues / next steps (not done in this pass, for a future round)

- **Global CSS (210 KB, render-blocking):** real fix needs critical-CSS extraction or route-based splitting — a larger, dedicated initiative, deliberately out of scope here.
- **Live performance re-measurement:** run Lighthouse/PageSpeed under comparable mobile settings once tooling is available, to get real Performance/LCP/FCP/TBT numbers reflecting these changes.
- **Console errors / "six long tasks":** needs a live browser trace (Playwright or real Chrome DevTools session) — not attempted this round.
- **TTFB (1.2s field):** outside this codebase's control (static hosting via Replit's `.replit-artifact` layer); no header/caching config exists in-repo to change.
- The 6,522 "missing locale keys (English fallback)" and 6 hard-coded UI strings surfaced by `i18n:audit` are pre-existing, unrelated localization coverage debt — flagged for awareness, not addressed here (out of this task's scope).

---

## 9. Repository state (as of the first round)

`git status` confirms only the 4 intended files are modified (`Layout.tsx`, `Logo.tsx`, `home.tsx`, plus the pre-existing unrelated `artifacts/image-inventory.json` modification that predates this task) and only 2 new files were added by this work (`scripts/optimize-logo.mjs`, `public/logo-official-260w.webp`) plus this report. All other untracked files present in the working tree before this task (media files, PDFs, temp JSON files, etc.) are unrelated and were not touched.

**No commit, push, merge, or deploy was performed.** All changes remain in the working tree for review.

---

## 10. Round 2 — Independent review findings, then Phase 1 (tour-detail hero) and Phase 2 (SEO hub tour cards)

An evidence-based review of the round-1 work (before any further edits) found the round-1 changes safe, but surfaced gaps the round-1 report didn't cover: the same "no `srcSet`" pattern exists in several other shared templates, most importantly **`tour-detail.tsx`** (~770 pages: every tour × every locale, almost certainly each page's LCP element) and **`SeoHubPage.tsx`** (~363 Merzouga-guide/comparison/travel-info pages) — both far higher-leverage than the homepage's 3 locations, since home.tsx is a single page. The review also found a DPR nuance in the already-shipped `sizes="100vw"` pattern: on 2×/3× DPR phones, a 390px-wide viewport needs ≥780/≥1170 effective pixels, which the existing 480w/768w tiers can't satisfy — so high-DPR phones fall through to the master image regardless. This round fixes the two highest-leverage templates using only existing, verified image variants, and documents that DPR limitation precisely rather than overclaiming the fix.

### 10.1 Exact files changed

| File | Change |
|---|---|
| `src/pages/tour-detail.tsx` (lines 164–172) | Added `srcSet` (480w/768w/master), `sizes="100vw"`, `width={1600} height={900}`, `fetchPriority="high"` to the full-bleed cinematic hero `<motion.img>` |
| `src/components/seo/SeoHubPage.tsx` (lines 242–250) | Added `srcSet` (480w/768w/master) and `sizes="(max-width: 767px) 100vw, 33vw"` to the related-tours card grid `<img>`; `width`/`height` left at their existing `900`/`600` values |

No other files were touched. No new images were generated — both fixes reuse the same `-480w.webp`/`-768w.webp` siblings already produced by the project's existing image pipeline for every tour image, the same files already relied on by `TourCard.tsx`, `home.tsx`, `tours.tsx`, and `destination-detail.tsx`.

**Verification before editing:** every one of the 37 tour entries / 33 unique `tour.image` values in `src/data/content.ts`'s canonical `tours` array (not just the 33 shown on the homepage — this check covers every tour in the site, since `tour-detail.tsx` and `SeoHubPage.tsx` can render any of them) was confirmed via a Node script to have both `-480w.webp` and `-768w.webp` siblings present on disk. `getLocalizedTour`/`getLocalizedTours` (used by both edited files) never override the `image` field per locale (confirmed by reading `localizeTour`), so this verification covers all 11 locales.

**`fetchPriority="high"` justification (tour-detail.tsx only):** checked the actual built `<head>` of a tour-detail page (`dist/en/tours/3-day-sahara-marrakech.html`) — it has no image preloads and no other `fetchPriority`/`fetchpriority` attribute anywhere on the page (only two font preloads). The hero is a full-viewport-height (`h-[80vh] w-full`), above-the-fold, non-lazy image — the only reasonable LCP candidate on this page type — so marking it high priority doesn't create a competing high-priority request. **Not applied to `SeoHubPage.tsx`'s tour-card images**: those are below-the-fold, already `loading="lazy"`, and the same file already has its own real hero image at line 140 with `fetchPriority="high"` — adding a second high-priority image on that page would be exactly the "competing request" problem this task warned against.

**`width`/`height` on `tour-detail.tsx`:** the hero `<img>` sits inside `absolute inset-0` within a `w-full h-[80vh]` section with `object-cover` — the display box is fully determined by the viewport, not by the image's own `width`/`height` attributes, so these attributes have **no layout/CLS effect either way** in this specific component. The 33 unique tour images' real master dimensions vary enormously (measured directly, see §10.2) — anywhere from 600×900 to 1600×1067 — so no single "intrinsic" pair is literally accurate for all of them. `1600×900` (16:9) was chosen as a representative value consistent with this template's cinematic framing, purely to satisfy the "unsized image" accessibility/Lighthouse diagnostic; it is not a per-file measurement. `SeoHubPage.tsx`'s `width={900} height={600}` was left exactly as it already was (per the instruction not to change existing dimensions).

### 10.2 Original and selected image dimensions/byte sizes — representative examples

Three tour images were measured directly (not estimated), chosen to show the range of real source sizes used across the 33 unique tour images:

| Image | `-480w.webp` | `-768w.webp` | master (labeled `1200w` in the srcset) |
|---|---|---|---|
| `dest/merzouga.webp` (well-behaved: master genuinely wide) | 480×320, 7.2 KiB | 768×512, 14.1 KiB | **1600×1067**, 49.0 KiB |
| `dest/agadir.webp` (narrow source) | 480×320, 21.4 KiB | **612×408** (capped by `withoutEnlargement`, not actually 768px), 38.9 KiB | **612×408**, 41.5 KiB |
| `dest/chefchaouen.webp` (portrait-oriented source) | 480×640, 65.0 KiB | 768×1024, 133.7 KiB | 1050×1400, 253.8 KiB |

**A real, pre-existing imprecision, confirmed and disclosed (not introduced by this round):** across all 33 unique tour images, real master widths range from **600px to 1600px** — only 9 of the 33 are actually ~1200px wide. The srcset's `1200w` label for the master tier (the same convention already used sitewide in `TourCard.tsx`, `home.tsx`, `tours.tsx`, `destination-detail.tsx`) is therefore an approximation for most images, not a literal pixel count. This is practically harmless: the three candidates stay in a strictly increasing byte/quality order regardless of the exact label, and `optimize-images.mjs`'s `withoutEnlargement: true` guard means no image is ever upscaled — a narrow source like `agadir.webp` simply has no genuinely-larger tier to offer, labeled correctly or not, and the browser still gets the best available file either way. This round reused the established convention for consistency rather than inventing a different, inconsistent scheme for just these two files; the imprecision is flagged here explicitly rather than silently copied.

### 10.3 Responsive candidate selection at 390px viewport width, DPR 1/2/3

For `sizes="100vw"` (tour-detail.tsx hero, and the mobile tier of SeoHubPage's `sizes="(max-width: 767px) 100vw, 33vw"`), the browser's effective-pixel target at a 390px CSS viewport is `390 × DPR`:

| DPR | Effective px needed | `merzouga.webp` candidate picked | `agadir.webp` candidate picked | `chefchaouen.webp` candidate picked |
|---|---|---|---|---|
| 1× | 390 | `-480w` → 480×320, **7.2 KiB** | `-480w` → 480×320, **21.4 KiB** | `-480w` → 480×640, **65.0 KiB** |
| 2× | 780 | master (768-labeled tier is 768<780, fails) → 1600×1067, **49.0 KiB** | master → 612×408, **41.5 KiB** | master → 1050×1400, **253.8 KiB** |
| 3× | 1170 | master → 1600×1067, **49.0 KiB** | master → 612×408, **41.5 KiB** | master → 1050×1400, **253.8 KiB** |

Before this fix, every DPR tier downloaded the master unconditionally (same bytes as the "2×/3×" row above, for every visit). **Honest conclusion: this fix only reduces bytes for 1×-DPR phones.** For 2×/3× DPR — the majority of current iOS/Android flagship devices — a full-bleed `100vw` hero genuinely needs more than 768 real pixels of width to stay sharp, so the browser correctly falls through to the master tier regardless of the label attached to it. This isn't a flaw in the implementation; it's an inherent limit of the existing two-tier (480w/768w) ladder for a full-width slot. Closing it for 2×/3× DPR would require generating a new intermediate tier (e.g. ~1024w) across all 33 images — explicitly out of scope here per "do not generate new images unless existing variants are insufficient," and flagged below as a future option instead of being done silently.

For `SeoHubPage.tsx`'s desktop tier (`33vw`, ≥768px viewport), effective widths stay much lower (e.g. ~338px at 1× DPR on a 1024px desktop, ~676px at 2×) and do land on the `-480w`/`-768w` tiers rather than the master — a real, uncompromised win on desktop/tablet widths. The `33vw` figure is itself an approximation of the grid's actual column share (the real share is ≈27–31% of the viewport once the `max-w-6xl` container cap and `gap-8`/`px-4` are accounted for, narrowing further on very wide monitors); the same rounding convention is already used elsewhere in this codebase for grid `sizes` values, and it only ever errs toward requesting a slightly larger image than the strict minimum, never a smaller/blurrier one.

### 10.4 Remaining images without responsive candidates in these two templates

- **`tour-detail.tsx`**: the hero was the only `<img>`/`<motion.img>` directly referencing `tour.image` in this file. (The page has other images — e.g. gallery thumbnails, related-tour cards reusing `TourCard.tsx` — but those were out of this round's scope and were not touched.)
- **`SeoHubPage.tsx`**: the sibling "Related destinations" grid, two sections below the tours grid just fixed (around line 283, `src={d.image}`), has the exact same gap — `width`/`height`/`loading="lazy"` present, no `srcSet`. It was intentionally **not** touched this round (the brief scoped this round to lines 242–250 specifically) but is flagged here as the next, directly analogous fix in this same file. The page's own hero image (line 133–145) already had a full `srcSet`/`sizes` before this round and did not need changes.

### 10.5 Build and audit results (this round)

| Check | Result |
|---|---|
| `npm run build` (runs `typecheck` + `test:deterministic` as its first two gated steps, then `vite build` + full prerender pipeline) | Exit 0. Sitemap: 1991 URLs. GSC route contract: PASS. Prerender content contract: PASS (132 checks). SEO content audit: 2006 pages / 382,828 internal links, **54 warnings** — identical to the round-1 and post-T25 baseline, no regression |
| `npm run route:audit` | 2006 pages, 1991 sitemap URLs, 408,858 internal links. **15 warnings** (all pre-existing orphan-page cases — `/book` in 8 locales plus 3 non-Latin-slug pages — identical set to the established baseline), **0 errors — PASS** |
| `npm run hreflang:audit` | 2002 pages, 24,024 hreflang links, 20,020 reciprocity pairs. **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | 11 languages, **0 empty translations** (matches baseline); 6,522 missing-key / 6 hard-coded-string counts are the same pre-existing, unrelated coverage debt noted in round 1, unchanged by this round |

**Compiled-output verification:** grepped the built chunks for the new literal strings. `dist/assets/tour-detail-MtCwmmlB.js` contains `fetchPriority`, the `-480w.webp` replace pattern, and `sizes:"100vw"`. The `SeoHubPage.tsx` fix compiled into `dist/assets/comparison-topic-Cj5rTHA8.js` — Rollup merges `merzouga-guide-topic.tsx`, `travel-info-topic.tsx`, and `comparison-topic.tsx` (three near-identical one-line re-export wrappers around the same `SeoHubPage` component) into this single shared chunk, so the fix applies to all three hub-page route types (`/merzouga-guide/:slug`, `/comparisons/:slug`, `/travel-info/:slug`), not just comparisons.

### 10.6 Limitations — what was not measured

No Lighthouse, PageSpeed, or real-device trace was run for this round, for the same reason as round 1: Playwright is not an installed dependency and no cached Chromium binary is available in this environment. **No claim is made about measured LCP, Performance score, or any real-device/real-network improvement.** Everything in §10.2–§10.3 is either a direct file-size/dimension measurement (`sharp` metadata + `ls`/`stat`) or a deterministic computation of the HTML `srcset`/`sizes` selection algorithm (effective-width arithmetic) — not a browser-measured result. The actual LCP impact on real tour-detail pages, and whether `fetchPriority="high"` measurably moves LCP timing, would need a live trace to confirm.

### 10.7 Diff and git status review

Both diffs are purely additive — `tour-detail.tsx` adds 5 new attributes to the existing hero `<img>` without touching `src`, `alt`, the framer-motion animation props, `className`, or the `onError` fallback; `SeoHubPage.tsx` adds exactly 2 new attributes (`srcSet`, `sizes`) without touching `src`, `alt`, `width`, `height`, `loading`, `decoding`, or `className`. `npm run build` (which gates on `typecheck` and `test:deterministic` passing first) completed clean against this exact diff, and all three audits re-ran clean with zero regressions.

`git status` after this round:
```
 M artifacts/image-inventory.json                              <- pre-existing, unrelated, not touched this task
 M artifacts/morocco-grand-adventure/src/components/layout/Layout.tsx       <- round 1
 M artifacts/morocco-grand-adventure/src/components/layout/Logo.tsx        <- round 1
 M artifacts/morocco-grand-adventure/src/components/seo/SeoHubPage.tsx     <- round 2 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/home.tsx                    <- round 1
 M artifacts/morocco-grand-adventure/src/pages/tour-detail.tsx             <- round 2 (this phase)
 ?? ...(unrelated untracked files, unchanged from before this task)...
```
No new files were created this round (no new images were generated, per instructions). `artifacts/image-inventory.json` remains exactly as it was before this task — not staged, not edited. **No files were staged, committed, pushed, or deployed.**

### Exact changed-file list (rounds 1–2)

- `scripts/optimize-logo.mjs` (new, round 1)
- `public/logo-official-260w.webp` (new, generated asset, round 1)
- `src/components/layout/Logo.tsx` (modified, round 1)
- `src/components/layout/Layout.tsx` (modified, round 1)
- `src/pages/home.tsx` (modified, round 1)
- `src/pages/tour-detail.tsx` (modified, round 2)
- `src/components/seo/SeoHubPage.tsx` (modified, round 2)
- `reports/t26-performance-optimization-report.md` (this report, updated both rounds)

---

## 11. Round 3 — Video posters, destinations/desert-tours responsive images, merzouga-guide conditional fix, blog/trip-builder

No new images were generated this round either — every change below reuses `-480w`/`-768w` files already produced by the existing image pipeline, verified present on disk before use.

### 11.1 Priority 1 — Video poster audit (`<video poster>` can't use `srcset`, so each fix is a single-file swap to an existing smaller variant)

Every `poster=` attribute in `home.tsx`, `tours.tsx`, `desert-tours.tsx`, `destination-detail.tsx`, and `tour-detail.tsx` was located and checked against real file sizes/dimensions (via `sharp` metadata + `stat`, not estimated). All affected videos render through either the shared `CinematicVideo` component or an equivalent plain `<video>` with an identical `max-w-5xl`/`aspect-video`/`object-cover` container (confirmed by reading each usage site) — so swapping to a smaller same-aspect-ratio variant changes zero pixels of crop or composition, only resolution.

| File(s) | Poster before | Poster after | Before (bytes) | After (bytes) | Saved |
|---|---|---|---|---|---|
| `home.tsx` (Sahara-experience video) + `tours.tsx` (tours-page video) + `content.ts` ×2 `videoPoster` fields (2 tours' cinematic-video sections on `tour-detail.tsx`) | `luxury-camp-dusk.webp` | `luxury-camp-dusk-768w.webp` | 155,946 | 77,302 | **78,644 (50.4%)**, ×4 render sites |
| `destination-detail.tsx` (Merzouga campfire video) | `merzouga.webp` | `merzouga-768w.webp` | 50,146 | 14,432 | **35,714 (71.2%)** |
| `destination-detail.tsx` (Aït Ben Haddou video) | `ait-ben-haddou.webp` | `ait-ben-haddou-768w.webp` | 219,694 | 122,356 | **97,338 (44.3%)** |
| `destination-detail.tsx` (Chefchaouen video) | `chefchaouen.webp` | `chefchaouen-768w.webp` | 259,854 | 136,930 | **122,924 (47.3%)** |

**`desert-tours.tsx`'s poster (`dunes-camels-poster.webp`) was audited and deliberately left unchanged**: it has no `-480w`/`-768w` siblings at all, and at 675×1200/19,462 bytes it's already smaller than even the `-480w` tier of every other poster in this table — there is no existing smaller variant to swap to, and generating one for a file already this small would not be a material win. This is the same "verify, don't blindly swap" discipline applied throughout this engagement — the file was checked, not skipped by assumption.

**`tour-detail.tsx` itself required no code change**: its `poster={tour.videoPoster}` is a pure data pass-through with no hardcoded path in the component. The actual fix lives in `src/data/content.ts`, where the 2 tours using `luxury-camp-dusk.webp` as their `videoPoster` were updated (a 3rd tour's `videoPoster` is `dunes-camels-poster.webp`, left unchanged for the same reason as above). `src/data/galleryVideos.ts` also references `luxury-camp-dusk.webp` as a gallery-video poster — **not touched**, since `gallery.tsx`/`galleryVideos.ts` were not named in this round's scope.

### 11.2 Priority 2 — Responsive images in `destinations.tsx` and `desert-tours.tsx`

Both files had the same gap already fixed elsewhere this engagement: explicit `width`/`height`/`loading` present, no `srcSet`. Fixed using the already-verified `dest.image`/`tour.image` pools (30/33 unique images, confirmed in round 1 to have complete `-480w`/`-768w` siblings for every entry in `content.ts`):

| File | Grid | Breakpoints (verified from the actual Tailwind classes, not assumed) | `sizes` applied |
|---|---|---|---|
| `destinations.tsx` — destination cards | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 1 col <768px, 2 col 768–1023px, 3 col ≥1024px | `(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw` |
| `destinations.tsx` — priority-tours row | `grid-cols-1 md:grid-cols-3` | 1 col <768px, straight to 3 col ≥768px | `(max-width: 767px) 100vw, 33vw` |
| `desert-tours.tsx` — featured desert tours | `grid-cols-1 md:grid-cols-2` (no 3rd tier) | 1 col <768px, 2 col ≥768px | `(max-width: 767px) 100vw, 50vw` |

The destinations-page hero (`atlas-pano.webp`, 81,932 bytes, 1600×900, already matching its declared `width`/`height` exactly) was checked and left alone: it has no `-480w`/`-768w` siblings, and unlike the oversized logo/video-poster cases, it isn't actually oversized relative to its own declared dimensions — there's nothing to safely swap to without generating a new file, which this round avoided by default.

### 11.3 Priority 3 — `merzouga-guide.tsx` conditional `srcSet` fix

Before: `srcSet={tour.image.includes('/curated/') ? ... : undefined}` — silently dropped responsive candidates for any related tour whose image wasn't under `/curated/`. Since **all 33 unique `tour.image` values in `content.ts` were already verified (round 1) to have complete `-480w`/`-768w` siblings**, the `/curated/` condition was simply wrong/stale, not a safety guard protecting against missing files. Fixed by removing the condition — `srcSet` is now always built for every related tour on these hub pages. `relatedTours` here resolves through the same canonical `tours` array (`tours.find(...)`), so the existing verification covers it completely; no new check was needed.

Left as-is (out of this round's named scope, not re-touched): `width={MG_TOUR_IMAGE_SIZE[tour.image]?.[0]}` / `height={...?.[1]}` — a separate lookup table that only has explicit dimensions for 2 of the 33 tour images, so most related-tour cards on these pages still render with no `width`/`height` attributes at all. This is a genuine, pre-existing gap, distinct from the srcSet issue just fixed, and is flagged here rather than silently expanded into.

### 11.4 Priority 4 — `trip-builder.tsx` and `blog/[slug].tsx`

**`trip-builder.tsx`** (destination-picker grid, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` inside a `max-w-5xl` container): same gap, same fix — `srcSet` + `sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"` added, using the already-verified `dest.image` pool.

**`blog/[slug].tsx`** — inspected in full (5 `<img>` tags total) rather than just the two grids already known about:
- **Related-tours grid** and **related-destinations grid** (the two grids identified in the previous review): fixed with `srcSet`/`sizes` matching their actual breakpoints — `grid-cols-1 sm:grid-cols-2` → `(max-width: 639px) 100vw, 50vw`; `grid-cols-2 md:grid-cols-3` (note: **2 columns even on the smallest phones**, no 1-column tier at all) → `(max-width: 767px) 50vw, 33vw`. Both grids also had **no `width`/`height` at all** (not just no `srcSet`) — added `900×600`/`800×600` respectively, matching the same representative convention used for these exact fields elsewhere in the codebase.
- **The post's own featured image** (`post.image`) and **in-article section images** (`section.image.src`, from `blog-article-sections.ts`): also had no `width`/`height` and no `srcSet`. Verifying first (per this engagement's standing rule) found **mixed variant coverage**: of 10 blog posts' featured images, 3 lack complete `-480w`+`-768w` pairs (`dunes-camels-poster.webp` — none; `marrakech-souk-minaret.webp` — none, 209,480 bytes; `guests-sunset-trimmed.webp` — only `-480w`, 52,646 bytes); of 7 unique in-article section images, 1 lacks any variant (`marrakech-souk-textiles.webp`, 1200×805, 171,554 bytes) and 2 more (`/images/library/*.jpg`) belong to a separate "PhotoAsset library" system (`src/data/photoLibrary.ts`'s `PhotoAsset`/`photoSrcSet`) that generates its own webp variants through a different mechanism entirely — `blog-article-sections.ts` currently stores a flattened `{src, alt}` pointing at the raw `.jpg`, bypassing that system, which is a separate, deeper data-wiring question outside a same-day "add srcSet" fix.
  Fixed by adding `srcSet`/`sizes` **conditionally**, gated on an explicit, checked exclusion list (`NO_RESPONSIVE_VARIANTS`, a `Set` of the exact paths confirmed incomplete above) plus a `.endsWith('.webp')` guard so the two `.jpg` library images are automatically excluded too. `width={1200} height={800}` was added to the post hero (representative value, consistent with the convention used elsewhere for this kind of card image); the section-image `width`/`height` logic was left exactly as it already was (`{...(section.image.width && section.image.height ? {...} : {})}}`), since that's a pre-existing, data-driven pattern unrelated to this fix.

### 11.5 Build and audit results (round 3)

| Check | Result |
|---|---|
| `npm run build` (typecheck + `test:deterministic` first) | Exit 0. Sitemap 1991 URLs. GSC route contract: PASS. Prerender content contract: PASS. SEO content audit: 2006 pages / 382,828 links, **54 warnings** — identical to every prior round, no regression |
| `npm run route:audit` | 2006 pages, 1991 sitemap URLs, 408,858 internal links, **15 warnings** (same pre-existing orphan-page set), **0 errors — PASS** |
| `npm run hreflang:audit` | 2002 pages, 24,024 hreflang links, 20,020 reciprocity pairs, **0 warnings / 0 errors — PASS** |
| `npm run i18n:audit` | 11 languages, **0 empty translations** (matches baseline); missing-key/hardcoded-string counts unchanged (pre-existing, unrelated) |

**Compiled-output spot checks:** the new `-768w.webp` poster paths were confirmed present in the correct built chunks (`home-*.js`, `tours-*.js`, `destination-detail-*.js`, and `index-*.js` — the latter because `content.ts`'s `videoPoster` data is part of the eagerly-loaded main bundle). The `blog/[slug].tsx` exclusion set (`dunes-camels-poster`, `marrakech-souk-minaret`, `guests-sunset-trimmed`, `marrakech-souk-textiles`) was confirmed present in its route chunk (`_slug_-*.js`).

### 11.6 Measured vs. estimated

**Measured** (direct `fs.statSync`/`sharp` metadata on the actual files in `public/images/`, both before and after): every byte-savings figure in §11.1's table, and every "left unchanged" file size quoted in §11.1–§11.4 (`dunes-camels-poster.webp` 19,462 bytes; `atlas-pano.webp` 81,932 bytes; `marrakech-souk-minaret.webp` 209,480 bytes; `guests-sunset-trimmed.webp` 52,646 bytes; `marrakech-souk-textiles.webp` 171,554 bytes). The grid-breakpoint `sizes` values are deterministic computations from the actual Tailwind classes read in each file, not assumptions.

**Not measured, not estimated — no claim made:** actual page-weight reduction in a live browser session, any Lighthouse/PageSpeed score, or real-device LCP/CLS impact. As in every prior round, no Playwright/Chromium trace was run (same unavailable-tooling reason). The byte-savings numbers above are real file-size deltas for the specific assets swapped; they are not a measurement of total page weight, which depends on which of these videos/images a given visit actually loads (video posters only download when the `<video>` element is in the DOM; most of these sections are below the fold).

### 11.7 Diff and git status review

All nine diffs this round are additive (new `srcSet`/`sizes`/`width`/`height` attributes, or a single-file poster-path swap, or a conditional simplification) — no `src`→different-photo changes, no crop/aspect-ratio/className changes, no alt-text changes, no data removed. `npm run build` (gated on `typecheck` + `test:deterministic`) and all three audits passed clean against this exact diff.

`git status` after this round:
```
 M artifacts/image-inventory.json                                          <- pre-existing, unrelated, not touched
 M artifacts/morocco-grand-adventure/src/components/layout/Layout.tsx               <- round 1
 M artifacts/morocco-grand-adventure/src/components/layout/Logo.tsx                <- round 1
 M artifacts/morocco-grand-adventure/src/components/seo/SeoHubPage.tsx             <- round 2
 M artifacts/morocco-grand-adventure/src/data/content.ts                           <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/blog/[slug].tsx                     <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/desert-tours.tsx                    <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/destination-detail.tsx              <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/destinations.tsx                    <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/home.tsx                            <- round 1 + round 3 (poster swap added)
 M artifacts/morocco-grand-adventure/src/pages/merzouga-guide.tsx                  <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/tour-detail.tsx                     <- round 2
 M artifacts/morocco-grand-adventure/src/pages/tours.tsx                          <- round 3 (this phase)
 M artifacts/morocco-grand-adventure/src/pages/trip-builder.tsx                    <- round 3 (this phase)
 ?? ...(unrelated untracked files, unchanged from before this task)...
```
No new files were created this round. `artifacts/image-inventory.json` remains exactly as it was before this task. **No files were staged, committed, pushed, or deployed.**

### Exact changed-file list (all three rounds combined)

- `scripts/optimize-logo.mjs` (new, round 1)
- `public/logo-official-260w.webp` (new, generated asset, round 1)
- `src/components/layout/Logo.tsx` (modified, round 1)
- `src/components/layout/Layout.tsx` (modified, round 1)
- `src/pages/home.tsx` (modified, rounds 1 & 3)
- `src/pages/tour-detail.tsx` (modified, round 2)
- `src/components/seo/SeoHubPage.tsx` (modified, round 2)
- `src/data/content.ts` (modified, round 3)
- `src/pages/tours.tsx` (modified, round 3)
- `src/pages/desert-tours.tsx` (modified, round 3)
- `src/pages/destination-detail.tsx` (modified, round 3)
- `src/pages/destinations.tsx` (modified, round 3)
- `src/pages/merzouga-guide.tsx` (modified, round 3)
- `src/pages/trip-builder.tsx` (modified, round 3)
- `src/pages/blog/[slug].tsx` (modified, round 3)
- `reports/t26-performance-optimization-report.md` (this report, updated all three rounds)
