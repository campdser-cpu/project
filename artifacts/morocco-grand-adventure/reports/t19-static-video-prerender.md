# T19 — Static prerendered video markup (follow-up to T18)

Date: 2026-10-20 (continuation). Scope: expose real video markup in the
hand-maintained static prerenderer (`scripts/prerender.ts`), which T18 found
emits 0 `<video>` tags on every video-bearing page.

## Why this was safe to do

- `main.tsx` uses `createRoot().render()`, not `hydrateRoot()` — confirmed via
  `prerender.ts`'s own header comment. React fully replaces `#root` on mount,
  so there is no hydration-mismatch risk from adding markup to the static HTML.
- All video data needed was already available at build time: `tour.videoUrl`
  / `tour.videoPoster` on the shared `Tour` type (zero duplication — same
  object `getLocalizedTour` already returns); `destId` for the 3 destination
  videos; a new `GALLERY_VIDEOS` single source of truth for the 7 gallery
  videos (previously defined only inside `gallery.tsx`, now in
  `src/data/galleryVideos.ts` and imported by both).

## Files changed

- `scripts/prerender.ts` — added `videoBlock()` helper, `DESTINATION_VIDEOS`
  lookup (mirrors the 3 hardcoded React blocks), and wired a video block into
  `buildHomeContent`, `buildToursContent`, `buildTourDetailContent`,
  `buildDestinationDetailContent`, and `buildExperienceContent` (desert-tours
  + gallery branches). 60 insertions.
- `src/pages/gallery.tsx` — replaced the locally-defined `VIDEOS`/`VideoItem`
  with an import from the new shared data file. Zero behavior change (same
  array, same shape).
- `src/data/galleryVideos.ts` (new) — the extracted `GALLERY_VIDEOS` array,
  single source of truth for both the live page and the prerenderer.

`src/components/ui/CinematicVideo.tsx` (T18) untouched — confirmed via
`git diff --stat`, identical to the T18 diff.

## Validation

- `npm run typecheck`: PASS.
- `npm run build`: PASS — GSC route contract PASS, prerender content contract
  PASS (132 checks), SEO content audit PASS, **111 warnings (baseline
  unchanged)**, sitemap **3916 image entries (unchanged)** confirming the
  video markup didn't leak into the image-sitemap extraction (`imagesIn()`
  only matches `<img src>`, not `<video poster>`, by design).
- `npm run route:audit`: PASS, **15 warnings (baseline unchanged)**.
- Real `<video>` tags confirmed present in the generated static HTML for all
  8 required routes (EN): home (1), desert-tours (1), destinations/merzouga
  (1), destinations/ait-ben-haddou (1), destinations/chefchaouen (1), gallery
  (7), tours (1), tour-detail with a real videoUrl (1). Re-verified in French
  — correct translated alt text, correct HTML-entity escaping, correct
  templated tour name.
- Post-hydration (live Playwright, React mounted): same video counts per
  page, zero console/page errors across all 8 pages, `preload="none"` /
  `readyState: 0` confirmed (no eager byte fetch — T18's bandwidth posture
  preserved for real visitors). Visual screenshot of `/en/desert-tours`
  confirms no layout regression.
