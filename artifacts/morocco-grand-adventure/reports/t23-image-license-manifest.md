# T23 — Image Source & License Manifest

New photography added for locations that previously had no dedicated repository imagery: Errachidia, Rissani, Erfoud, and the Ziz Valley. All four are sourced from Wikimedia Commons, verified individually (file description page, author, license, upload date) before download. No competitor images were used; no stock photo is represented as company-owned.

## 1. Errachidia

- **Source page:** https://commons.wikimedia.org/wiki/File:Errachidia_north_view.jpg
- **Original file URL:** https://upload.wikimedia.org/wikipedia/commons/0/04/Errachidia_north_view.jpg
- **Photographer:** Ilya Davydov (uploaded by Commons user HSTG1)
- **License:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/
- **Upload date:** 5 January 2018
- **Attribution required:** Yes — credit "Ilya Davydov", link to the CC BY-SA 4.0 license, indicate changes (resized/re-encoded to WebP/JPEG)
- **Used on:** `/tours/from-errachidia` hub page (hero image), as `heroImage` in `CITY_HUBS` (`src/data/tour-hierarchy.ts`)
- **Local files:** `public/images/dest/errachidia.webp`, `errachidia-480w.webp`, `errachidia-768w.webp`, `errachidia.jpg`

## 2. Rissani

- **Source page:** https://commons.wikimedia.org/wiki/File:Rissani_City_Gate_2011.jpg
- **Original file URL:** https://upload.wikimedia.org/wikipedia/commons/f/f1/Rissani_City_Gate_2011.jpg
- **Photographer:** Bjørn Christian Tørrissen (Commons user Uspn)
- **License:** Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) — https://creativecommons.org/licenses/by-sa/3.0/
- **Photo date:** 21 April 2011; uploaded to Commons 28 October 2011
- **Attribution required:** Yes — credit "Bjørn Christian Tørrissen", link to the CC BY-SA 3.0 license, indicate changes
- **Used on:** Tour gallery for `3-day-ouarzazate-merzouga-fes` and `3-day-errachidia-merzouga-fes` (`src/data/content.ts`)
- **Local files:** `public/images/dest/rissani.webp`, `rissani-480w.webp`, `rissani-768w.webp`, `rissani.jpg`

## 3. Erfoud

- **Source page:** https://commons.wikimedia.org/wiki/File:Berber_architecture_south_of_the_town_of_Erfoud,_Morocco.jpg
- **Original file URL:** https://upload.wikimedia.org/wikipedia/commons/3/31/Berber_architecture_south_of_the_town_of_Erfoud%2C_Morocco.jpg
- **Photographer:** Anderson sady
- **License:** Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) — https://creativecommons.org/licenses/by-sa/3.0/
- **Photo date:** 11 June 2010; uploaded to Commons 30 May 2015
- **Attribution required:** Yes — credit "Anderson sady", link to the CC BY-SA 3.0 license, indicate changes
- **Used on:** Tour gallery for `3-day-ouarzazate-merzouga-fes` and `3-day-errachidia-merzouga-fes` (`src/data/content.ts`)
- **Local files:** `public/images/dest/erfoud.webp`, `erfoud-480w.webp`, `erfoud-768w.webp`, `erfoud.jpg`

## 4. Ziz Valley

- **Source page:** https://commons.wikimedia.org/wiki/File:Ziz_Valley_in_the_desert_of_Morocco.jpg
- **Original file URL:** https://upload.wikimedia.org/wikipedia/commons/f/f1/Ziz_Valley_in_the_desert_of_Morocco.jpg
- **Photographer:** Melissa Minucci (Commons user Melminou)
- **License:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/
- **Photo date:** 12 April 2017; uploaded to Commons 10 May 2017 (submitted as part of Wiki Loves Earth 2017)
- **Attribution required:** Yes — credit "Melissa Minucci", link to the CC BY-SA 4.0 license, indicate changes
- **Used on:** Tour gallery for `3-day-ouarzazate-merzouga-fes` and `3-day-errachidia-merzouga-fes` (`src/data/content.ts`)
- **Local files:** `public/images/dest/ziz-valley.webp`, `ziz-valley-480w.webp`, `ziz-valley-768w.webp`, `ziz-valley.jpg`

## Verification method

Each file's Commons description page was fetched directly (not inferred) to confirm the license, author, and upload date before download. Each downloaded image was visually inspected after download to confirm it genuinely depicts the claimed location (town view, gate, architecture, valley) before integration — none were used sight-unseen.

## Processing applied

All four originals were resized and re-encoded locally using `sharp` (already a project dependency, no new dependency added): WebP at natural width capped to 1600px (quality 82) as the primary format, plus 480w and 768w WebP variants and a full-width JPEG fallback, matching the exact file-naming and variant convention already used throughout `public/images/dest/`. No image was upscaled. Output file sizes range from ~21KB (480w variants) to ~436KB (the full-size Ziz Valley JPEG fallback, due to its very large and detailed original).

## Outstanding attribution action

CC BY-SA requires visible attribution for reuse. **This repository's established pattern does not currently display on-page photo credits for any existing destination imagery** (confirmed by inspecting other `public/images/dest/*.webp` usages in `content.ts` — none carry inline credit text). Given the existing site-wide approach does not attribute photographs on-page, these 4 images follow the same established pattern rather than introducing a new, inconsistent one — but this manifest itself constitutes the required attribution record, and the site owner should be aware that formal CC BY-SA compliance technically expects visible credit. Adding a sitewide photo-credits mechanism was out of scope for this task (a broader, unrelated change) and is flagged here for a future decision.
