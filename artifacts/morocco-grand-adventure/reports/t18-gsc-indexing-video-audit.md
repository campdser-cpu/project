# T18 — Safe Google Indexing & Video SEO Recovery

Date: 2026-10-20. Scope: GSC Coverage audit (no URL-level export available — see
evidence gap note below) + video indexing investigation. See the full report
delivered in-conversation for the complete A–J structure requested by the
owner. This file is the durable record; the conversation turn is authoritative
for narrative detail.

## Evidence available

- No "Coverage" (indexing) CSV/export was found anywhere in the environment
  (Downloads, Desktop, Documents, project root, `reports/`). Only Performance
  (clicks/impressions/position) exports exist, most recently
  `https___www.moroccograndadventure.com_-Performance-on-Search-2026-10-11.zip`,
  not yet parsed this turn (same family of file parsed in the T17 session for
  2026-09-08).
- The six category counts and the 1,637/503 indexed chart figures supplied in
  the task prompt have **no accompanying URL list** anywhere in this
  environment. They are used only as stated priorities, never mapped to
  specific URLs by guesswork.
- Found (informational only, not used as a source of fixes): many unmerged
  remote branches exist, including `origin/codex/gsc-indexability-final`,
  `origin/seo/google-indexing-hardening`, `origin/seo/audit-index-route-fix`,
  `origin/seo-growth-foundation`. Not checked out, merged, or read for content
  this turn — flagged for the owner's awareness only.

## Fix implemented

`src/components/ui/CinematicVideo.tsx` — the shared video component used on
home, `/desert-tours`, 3 destination pages (Merzouga, Aït Ben Haddou,
Chefchaouen), and the `/tours` listing (6 page instances, 5 distinct video
files) only mounted the real `<video>` element after a scroll-triggered
`IntersectionObserver` fired. Google's own JS SEO documentation states
"Google Search does not interact with your page" (no scrolling) — fetched
live from `developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading`
this turn. Below-the-fold video sections were therefore verified absent from
Googlebot's rendered DOM.

Fix: the `<video src poster preload="none" controls>` element is now always
present in the DOM from first render; only *playback* (autoplay) is deferred
to the same scroll trigger, via an explicit `.play()` call instead of the
native `autoplay` attribute (avoids racing `preload="none"`). No bandwidth
regression — `preload="none"` is lighter than the previous `metadata` level.

Verified via live-rendered Playwright checks (Chromium, no scroll performed)
across all 8 real page instances: home, desert-tours, destinations/merzouga,
destinations/ait-ben-haddou, destinations/chefchaouen, gallery (7/7 videos),
tours listing, tour-detail (7-day-imperial-cities-sahara-escape). All show
the real `<video src poster>` tag with zero scroll. Scroll-gated autoplay
behavior itself re-verified unchanged (home.tsx's `autoPlay={false}` still
holds).

Not done this turn, and why: VideoObject JSON-LD and a video sitemap
extension were both considered and explicitly deferred — neither can be
populated without a verified `uploadDate` (and ideally duration), and no
ffprobe/ffmpeg is available in this environment to read real durations
without adding a dependency. Fabricating either value is explicitly
prohibited. Documented as a recommendation pending real metadata from the
owner.

## Regression results

- `npm run typecheck`: PASS.
- `npm run build` (full pipeline, all steps): PASS — GSC route contract PASS,
  prerender content contract PASS (132 checks), SEO content audit PASS,
  **111 warnings (baseline unchanged)**.
- `npm run route:audit`: PASS, **15 warnings (baseline unchanged)** — same 11
  `/book` + 4 legacy-CJK orphans as every prior session, now independently
  re-confirmed as intentional (see vercel.json / legacy-unicode-redirects.mjs
  investigation) rather than re-asserted from memory.
- Live production HTTP checks (read-only, `curl`): homepage 200; `/en/book`
  real 308 → `/en/trip-builder`; `fes-3-day` single-hop 308 → `3-day-fes-merzouga-sahara`
  → 200; `/zh/撒哈拉之旅` genuinely 200 (client-side meta-refresh + canonical,
  not a server redirect — confirmed, not assumed); merzouga/desert-tours/gallery
  all 200 with no X-Robots-Tag; merzouga and desert-tours both confirmed
  `index, follow` + correct self-canonical live in production.
- Git scope: exactly one tracked file changed
  (`src/components/ui/CinematicVideo.tsx`, 30 insertions/28 deletions). The 9
  pre-existing untracked files untouched. Nothing staged, committed, or pushed.
