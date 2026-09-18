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
| `stock/` | 1 (`stargazing-merzouga`) | Folder name says stock | Licence **unknown** — flagged |
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
