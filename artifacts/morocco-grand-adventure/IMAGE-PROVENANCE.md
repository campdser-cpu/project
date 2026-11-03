# Image provenance inventory — internal

**Status: internal working document.** It is not published: only `public/` is
copied into `dist/`, and nothing links to this file. Keep it that way — it
records what we do *not* know about our own assets.

**Compiled:** 18 September 2026, from git history, file metadata and the source
documents still present in the repository. Nothing here is inferred from the
picture alone: where the source is unknown, it says unknown.

---

## 1. What each folder's source actually is

| Folder | Files | Documented source | Ownership / licence status |
|---|---|---|---|
| `library/` | 42 published (of 46 asset IDs) | Official Photo Library PDF supplied by the owner; every asset ID, original filename, description and destination is recorded in `src/data/photoLibrary.ts` | Supplied by Morocco Grand Adventure as its own library. 4 assets restricted: MGA-008, MGA-021 (another business's name legible), MGA-023 (location unverified), MGA-046 (unverified sticker) |
| `catalog/` | 27 | "Complete Image Catalog" PDF, kept at `src/components/seo/Morocco-Grand-Adventure-Complete-Image-Catalog.pdf`; entries in `src/data/imageCatalog.ts` | Supplied by the owner as an approved catalog. Original photographer/licence **not documented** |
| `curated/` | 24 | Two owner-supplied packs — see §2 | **Not documented** — see §2 |
| `personal/` | 9 | Named as the team's own photographs (guests, guides, fleet, camp) | Presented as the company's own. Not separately evidenced in the repo |
| `student-tours/` | 40+ | Student tour photo library (commit `c929540`), plus the hub hero — see §4 | Team-supplied. The hub hero's origin is **unknown** — see §4 |
| `stock/` | 2 (`stargazing-merzouga`, `draa-valley-oasis-kasbah-village`) | `stargazing-merzouga`: folder name says stock, licence **unknown** — flagged. `draa-valley-oasis-kasbah-village`: Pexels, fully documented — see §5 | Mixed — see per-file notes |
| `pdf/` | 5 (`img_0…4-optimized`) | "Photo journal" images extracted from an owner-supplied PDF | Presented as the company's own journey photos. Licence not documented |
| `dest/`, `hero/`, `food/`, `riad/`, `about/`, `logo/`, `og/`, `tours/` | various | Built or rebuilt from the sources above (see `scripts/image-integrity-2026-09.mjs`, `scripts/build-tour-card-images.mjs`) | Inherits the source asset's status |

---

## 2. `curated/` — file-by-file

**What is known.** These files entered the repository in two commits, from two
owner-supplied packs:

- `2feb44b` (30 Aug 2026) — "Image-SEO pack", 900×1200 JPEGs.
- `374f87a` (4 Sep 2026) — "approved PDF image catalog", 1400 px-tall images.
  The pack is still on disk at `.cache/Morocco-Grand-Adventure-Image-SEO-Catalog (2).pdf`.

**What is not known.** The PDF has no text layer, so it carries no photographer
credit, licence or source URL. Every file has been stripped of EXIF, ICC and XMP
(during the 30 Aug WebP conversion), so no camera, author or copyright field
survives in the repository. **No file in this folder has a documented
photographer, licence or attribution requirement.**

Subjects below were confirmed by looking at every file on 17 Sep 2026 (commit
`f4b4fe0`), which is also when the mislabelled ones were renamed to match their
content. "Location" is what the picture shows well enough to name; where the
place cannot be identified from the picture, it says not verifiable.

| File | Subject | Location shown | Source pack | In use |
|---|---|---|---|---|
| `ait-ben-haddou-bridge-town-unesco-morocco` | Ksar towers and rooftops from above | Aït Ben Haddou | Sep pack | yes (7-day tour card, dest hero source) |
| `ait-ben-haddou-footbridge-ounila-river` | Footbridge over the river to the village | Aït Ben Haddou | Sep pack (renamed 17 Sep) | yes |
| `ancient-water-channels-olive-groves-morocco` | Rock-cut irrigation channels above olive groves | Not verifiable | Sep pack | no |
| `berber-guide-camel-sahara-desert-merzouga` | Guide leading one camel over a dune | Sahara dunes; Merzouga not verifiable | Sep pack | yes (3-day tour card) |
| `berber-guide-camels-sahara-desert-morocco` | Guide kneeling with two camels | Sahara dunes; region not verifiable | Aug pack | yes (gallery) |
| `blue-stairway-craft-shops-chefchaouen` | Blue stairway between craft shops | Chefchaouen | Sep pack | yes |
| `blue-streets-berber-carpets-chefchaouen-medina` | Carpets hung in a blue alley | Chefchaouen | Sep pack | yes |
| `cascading-waterfall-todra-gorge` | Cascade below orange cliffs | Gorge in the High Atlas; Todra plausible, not verifiable | Sep pack | yes (family tour card) |
| `couple-blue-steps-chefchaouen-medina` | Couple sitting on blue steps | Chefchaouen | Sep pack | yes (dest gallery) |
| `handmade-baskets-blue-city-chefchaouen` | Baskets outside a blue shopfront | Chefchaouen | Sep pack | yes |
| `hassan-ii-mosque-exterior-arches-golden-hour-casablanca` | Mosque arcade at golden hour | Hassan II Mosque, Casablanca | Sep pack | yes |
| `hassan-ii-mosque-interior-colonnades-casablanca` | Interior colonnade | Hassan II Mosque, Casablanca | Sep pack | yes |
| `hassan-ii-mosque-minaret-casablanca` | Minaret above the city | Hassan II Mosque, Casablanca | Sep pack (renamed 17 Sep) | yes |
| `hassan-ii-mosque-ornate-bronze-door-casablanca` | Visitor beside the great door | Hassan II Mosque, Casablanca | Aug pack | yes (tour card) |
| `hassan-tower-mohammed-v-mausoleum-rabat` | Hassan Tower and mausoleum | Rabat | Sep pack | yes (tour card) |
| `leather-tanning-vats-fes-medina` | Stone dye vats from above | Fes tannery | Sep pack | yes (tour card, dest gallery) |
| `marrakech-medina-motorbike-archway-local-life` | Rider under a stone archway | Marrakech medina | Aug pack | yes |
| `marrakech-medina-street-life-locals-morocco` | Street life in narrow alleys | Marrakech medina | Aug pack | yes |
| `menara-gardens-pavilion-marrakech` | Pavilion reflected in its basin | Menara, Marrakech | Sep pack (renamed 17 Sep) | yes (catalog entry) |
| `panoramic-view-chefchaouen-rif-mountains` | Town below the Rif slopes | Chefchaouen | Sep pack | yes |
| `rolling-green-hills-village-mosque-northern-morocco` | Village mosque among green hills | Northern Morocco; not verifiable | Sep pack | no |
| `tannery-workers-dyeing-pits-fes` | Workers among the dye pits | Fes tannery | Sep pack | yes (tour card, 25-things) |
| `tin-mal-mosque-pointed-arches-high-atlas` | Pointed arches of a ruined mosque | Tin Mal, High Atlas (name only) | Sep pack | no (removed from the 4-day Marrakech card: Tin Mal is not on that route) |
| `todra-gorge-river-canyon-high-atlas` | Canyon walls above the river | Todra Gorge | Sep pack | yes (tour card, dest source) |

**Safe for public use?** Undetermined. They are published today and have been
since August, and the owner supplied them as approved packs — but nothing in the
repository evidences who took them or under what licence. **Owner confirmation
needed** before this can be recorded as cleared. **Attribution required?**
Unknown for the same reason.

---

## 3. Withdrawn assets (do not restore without evidence)

Removed in `f4b4fe0` because they carried another party's mark: a Dreamstime
watermark, a `©THEHISTORIANTRAVELLER.COM` watermark, caption-overlay stock
photos, an Instagram location sticker, a "Medina d'Agadir" caption, a smeared
edit, and three video reels of unknown ownership — one of which is byte-identical
to a file saved as "Spirits of Morocco … #cinematic #travel #morocco". The three
videos stay out unless the owner confirms ownership or permission.

---

## 4. Open provenance questions for the owner

1. **`curated/` (24 files)** — who photographed them, under what licence, and is
   attribution required?
2. **`catalog/` (27 files)** — same question; the catalog PDF states no source.
3. **`stock/stargazing-merzouga`** — which stock library, and what licence?
4. **`pdf/img_*-optimized` (5)** — are these the company's own photographs?
5. **Student Tours hub hero** (`student-tours/student-tours-hero-poster.*`) —
   origin unknown. It is not a frame of the removed reel and carries no visible
   mark, but nothing evidences that it shows Morocco Grand Adventure travellers.
   Its alt text no longer calls the people students or names the location.
6. **`dest/ifrane`** — the photograph shows oak woodland above farmland; nothing
   in it identifies Ifrane, and no verified Ifrane photograph exists in any
   library. It is no longer presented as a verified photograph of Ifrane.
7. **Meknès** — no Meknès or Volubilis photograph exists in any library or pack.
   The destination keeps a decorative pattern until a real photograph is supplied.

---

## 5. `stock/draa-valley-oasis-kasbah-village.webp` — fully documented addition

Added because the Draa Valley destination page's only gallery photo was the
exact same file as its hero image — no official library or catalog photo is
tagged for the Draa Valley specifically (`MGA-036`/`MGA-040` are the nearby
but distinct Dades Valley, and using them here would mislabel the location).

---

## 6. `stock/ait-ben-haddou-ksar-palm-oasis-morocco.webp` and `stock/earthen-ksar-village-palm-oasis-morocco.webp` — fully documented additions

Added for the Amazigh Culture guide (`/travel-info/amazigh-berber-culture`),
which previously had no inline photographs illustrating its Architecture
section (the kasbah/ksar building tradition) or its "where you meet this
culture" section (lived-in Amazigh villages). The existing hero image for
this page (`library/dades-valley-village-atlas-morocco-mga-036.jpg`, an
owner-supplied library photo) was kept unchanged — it is already authentic
and relevant, and was not replaced.

Both files were sourced from Pexels, downloaded directly from
`images.pexels.com` (the official CDN), visually inspected before use (not
just metadata-checked), and converted to WebP at the same ~1920px-wide,
no-responsive-variant convention already used for `draa-valley-oasis-kasbah-village.webp`
above. Both are published under the Pexels licence (free for commercial use).
A third candidate (a Moroccan market pottery photo, Pexels photo ID 34529131)
was reviewed and **not used** — it is a real photo but shows no element that
specifically identifies it as Morocco or as Amazigh craftwork, and would have
been a weak, potentially misleading match for the guide's crafts section.

| File | Pexels photo page | Photographer | Photo ID | Subject verified |
|---|---|---|---|---|
| `ait-ben-haddou-ksar-palm-oasis-morocco.webp` | https://www.pexels.com/photo/the-ksar-ait-ben-haddou-in-ait-ben-haddou-morocco-6771187/ | Tom D'Arby | 6771187 | Yes — visually confirmed as the Aït Ben Haddou ksar (landscape view, palm oasis, riverbed, mountains behind), matching the guide's explicit mention of this UNESCO site |
| `earthen-ksar-village-palm-oasis-morocco.webp` | https://www.pexels.com/photo/ancient-desert-village-in-atlas-mountains-30405044/ | Othmane Ettalbi (Casablanca-based) | 30405044 | Yes — visually confirmed as a real earthen ksar-style village in a palm oasis against desert hills; the photographer's page names the country as Morocco but gives no more precise location, so the image is used as a general illustration of this building tradition (as the guide text itself describes it — Dades/Draa-valley-style scenery), not as a claim about one named place |

Used in `src/data/seoHub.ts`'s `amazigh-berber-culture` entry via
`inlineImages`; alt text is localized per language in each
`src/i18n/guides/generated/{lang}.json` overlay's `chrome.imageAlts`.

- **Source**: Pexels (`pexels.com`), a free-licence stock photography site.
- **Photo page**: `https://www.pexels.com/photo/scenic-view-of-draa-valley-in-morocco-29638614/`
- **Photographer**: Moussa Idrissi.
- **Pexels photo ID**: 29638614.
- **Downloaded from**: Pexels' own public image CDN
  (`https://images.pexels.com/photos/29638614/pexels-photo-29638614.jpeg`),
  not hotlinked — the file was downloaded and is served locally from this
  repository.
- **Verification**: the downloaded file is 3008×2000px, matching the
  dimensions shown on the photo page exactly — confirmed to be the same
  image, not a different crop or a mismatched file.
- **Subject match confirmed by viewing the photograph**: a dense date-palm
  oasis filling a valley floor, earthen/kasbah-style mud-brick buildings in
  the foreground, and a bare desert mountain range behind — consistent with
  the real, verified description of the Draa Valley already on the site
  (palm-grove corridor, kasbah villages, desert mountains). No specific
  village, kasbah name, or GPS location is claimed — only what the photograph
  itself shows.
- **Licence**: Pexels License — free for commercial use, no attribution
  required, editing permitted. The only restriction is not implying
  endorsement by identifiable people or brands; this photograph has no
  identifiable people in it, so that restriction does not apply.
- **Processing**: resized (width capped at 1920px, aspect ratio preserved
  exactly — no crop, no distortion) and re-encoded to WebP (quality 76,
  effort 6, matching this project's own `sharp` conversion settings in
  `scripts/build-tour-card-images.mjs`) using the project's existing `sharp`
  dependency. Final file: 1920×1277px, ~152KB.
- **Accessed**: 10 October 2026.

---

## 7. `stock/marrakech-souk-spice-stall-morocco.webp` and `stock/fes-medina-rug-display-morocco.webp` — fully documented additions

Added for the Moroccan Souks & Shopping guide (`/travel-info/moroccan-souks-shopping-guide`),
which previously had no inline photographs illustrating the Marrakech souks
section (which names Souk el-Attarine for spices) or the "what to actually
buy" section (which leads with hand-woven rugs). The existing hero image for
this page (`library/marrakech-souk-aerial-view-mga-009.jpg`, an owner-supplied
library photo) was kept unchanged — it is already authentic and relevant, and
was not replaced.

Both files were sourced from Pexels, downloaded directly from
`images.pexels.com` (the official CDN), visually inspected before use (not
just metadata-checked), and converted to WebP using the project's existing
`sharp` dependency, matching the established convention for this page's
other recent additions (§6).

| File | Pexels photo page | Photographer | Photo ID | Subject verified |
|---|---|---|---|---|
| `marrakech-souk-spice-stall-morocco.webp` | https://www.pexels.com/photo/stall-with-various-oriental-spices-in-local-bazaar-6441186/ | Piotr Arnoldes | 6441186 | Yes — visually confirmed as cone-shaped piles of colorful ground spices in metal buckets at an outdoor market stall, with a busy souk street blurred behind; the Pexels page's own location tag is "Marrakesh, Morocco," matching the guide's Marrakech souks section |
| `fes-medina-rug-display-morocco.webp` | https://www.pexels.com/photo/vibrant-moroccan-rug-display-in-fes-medina-28582588/ | Moussa Idrissi (also credited for the Draa Valley photo above) | 28582588 | Yes — visually confirmed as dozens of hand-woven Moroccan rugs hanging in a tiled, arched traditional interior; the Pexels page's own location data is "Fès, Fès-Meknès, Maroc," matching the guide's Fes section and its emphasis on rugs as the top item to buy |

Both are published under the Pexels licence (free for commercial use, no
attribution required). Downloaded-file dimensions were checked against each
photo page's listed dimensions before use to confirm the correct file, not a
mismatched crop.

Used in `src/data/seoHub.ts`'s `moroccan-souks-shopping-guide` entry via
`inlineImages`; alt text is localized per language in each
`src/i18n/guides/generated/{lang}.json` overlay's `chrome.imageAlts`.

**Accessed**: 2 November 2026.

---

## 8. `stock/casablanca-tram-city-street-morocco.webp` — fully documented addition, and a documented non-addition

Added for the Morocco Airports guide (`/travel-info/morocco-airports-guide`),
to illustrate arriving in Casablanca and getting around the city afterward —
previously the page had no inline photographs at all relating to the actual
arrival/transport experience the page is about, only destination-landscape
imagery (the Hassan II Mosque, Sahara dunes).

A real, deliberate search was made for genuinely Morocco-specific airport
**terminal** photography (arrivals halls, check-in areas, runway/exterior
shots) on Pexels, matching this stage's brief. None was found — Pexels has
no meaningful collection of Moroccan airport-interior photography at the
time of this search (only generic international airport stock, or Royal Air
Maroc aircraft photographed in Istanbul, which would have been geographically
misleading to use). A second candidate — a close-up of a car's steering
wheel/dashboard, metadata-tagged to the Marrakech-Safi region — was reviewed
and **not used**: despite the correct location tag, the photograph itself
shows nothing (no scenery, signage, or identifiable detail) that a viewer
could recognize as Morocco, the same standard applied to reject a candidate
for the Amazigh guide in §6. Rather than force a weak second image, only the
one image that passed this test was added.

| File | Pexels photo page | Photographer | Photo ID | Subject verified |
|---|---|---|---|---|
| `casablanca-tram-city-street-morocco.webp` | https://www.pexels.com/photo/tram-on-street-in-casablanca-morocco-29763195/ | Rahib Oussama | 29763195 | Yes — visually confirmed as Casablanca's tram passing French-colonial-era buildings with a palm tree visible; the Pexels page's own location data is "Casablanca, Casablanca-Settat, Morocco," and the architecture is itself recognizably central Casablanca |

Published under the Pexels licence (free for commercial use, no attribution
required). Downloaded from the official `images.pexels.com` CDN at full
resolution (1920×2926px), then cropped to trim excess empty sky at the top
(resulting in a more usable ~5:6 frame centered on the tram and street-level
architecture — the crop removes no subject matter, only blank sky) and
re-encoded to WebP (quality 80) using the project's existing `sharp`
dependency. Final file: 1400×1664px, ~430KB.

Used in `src/data/seoHub.ts`'s `morocco-airports-guide` entry via
`inlineImages`; alt text is localized per language in each
`src/i18n/guides/generated/{lang}.json` overlay's `chrome.imageAlts`.

**Accessed**: 2 November 2026.
