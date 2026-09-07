# VISUAL IMAGE AUDIT — Semantic Correctness Review

**Scope:** all production-facing pages (destination pages, tour pages, tour cards, destination cards, homepage, "through our lens" galleries, related destinations/tours, all 12 language prerenders, legacy images, shared components).

**Method:** every `public/images/**` file was inventoried; every rendered page in `dist/` was scanned for which images it actually displays (via `scripts/imgmap.cjs`); each image's subject was matched against the page, section, card, caption and ALT that present it. File existence was NOT treated as correctness — the image subject vs. presenting context is the test.

---

## 1. MISMATCHES FOUND & FIXED (confirmed errors)

| # | Context | Was showing | Fix |
|---|---------|-------------|-----|
| 1 | Casablanca → Fes 4-day tour (Imperial Cities context) | `blue-streets-berber-carpets-chefchaouen-medina.webp` — Chefchaouen photo presented as Casablanca | `/images/curated/hassan-ii-mosque-ornate-bronze-door-casablanca.webp` |
| 2 | Casablanca → Merzouga 5-day tour | Generic `dest/merzouga.webp` reused by many tours | `/images/curated/camel-caravan-sunset-silhouette-sahara-desert.webp` (the actual Casablanca→Erg Chebbi desert experience) |
| 3 | Agadir → Marrakech 5-day tour | Generic `dest/merzouga.webp` | `/images/catalog/berber-camel-guide-sahara-merzouga.webp` (Berber cameleer on the Erg Chebbi route) |
| 4 | Marrakech → Merzouga 4-day tour | Generic `dest/merzouga.webp` | `/images/curated/sahara-desert-sunset-silhouette-dune-morocco.webp` |
| 5 | Fes → Merzouga 3-day tour (quote-only) | Generic `dest/merzouga.webp` | `/images/catalog/sahara-bivouac-stars-merzouga.webp` (desert-camp night identity) |
| 6 | Fes "Private Sahara Route from Fes" 3-day | Generic `dest/merzouga.webp` | `/images/dest/erg-chebbi.webp` (Erg Chebbi dune identity, distinct from #5) |

## 2. VERIFIED CORRECT (no change needed)

- **Destination pages** — Marrakech, Fes, Casablanca, Chefchaouen, Aït Ben Haddou, Todra Gorge, Merzouga/Erg Chebbi and all others display only imagery whose subject matches the destination (verified in rendered `dist/en/destinations/*.html` across all 12 locales).
- **"Through our lens" galleries** — driven by `imageCatalog.ts` destination tags: Jemaa el-Fna night/food-stalls photo → Jemaa context; Menara pavilion + reflecting pool + Atlas photo → Menara context; Tbourida → culture card; no Casablanca/Chefchaouen/Ifrane imagery leaks into Marrakech.
- **Morocco-wide cultural/food images** (mint tea, pastries, tagines, Tbourida, Amazigh musicians) are used only as culture/cuisine imagery with honest "Moroccan …" ALT text — never falsely labelled as a specific city except via the explicit `DEST_FOOD_IMAGE` section, which is intentional.
- **Destination-specific landmarks** (Hassan II Mosque = Casablanca, tanneries = Fes, blue medina = Chefchaouen, ksar = Aït Ben Haddou) remain attached to their true locations.

## 3. VISUAL-USE MATRIX (after fixes — key images)

| Image | Subject | Used by (tours/cards) | Count |
|---|---|---|---|
| hassan-ii-mosque-ornate-bronze-door-casablanca | Hassan II Mosque door, Casablanca | casablanca-4-day | 1 tour |
| hassan-tower-mohammed-v-mausoleum-rabat | Hassan Tower, Rabat | casablanca-3-day | 1 tour |
| hassan-ii-mosque-exterior-arches-golden-hour | Hassan II Mosque exterior | casablanca-8-day | 1 tour |
| camel-caravan-sunset-silhouette-sahara-desert | Camel caravan at sunset | casablanca-5-day | 1 tour |
| sahara-bivouac-stars-merzouga | Lantern-lit desert bivouac | 3-day-fes-merzouga | 1 tour |
| berber-camel-guide-sahara-merzouga | Cameleer near Merzouga | 3-day-sahara-marrakech, agadir-5-day | 2 (route-appropriate) |
| sahara-desert-sunset-silhouette-dune-morocco | Dune sunset silhouette | 4-day-marrakech-merzouga | 1 tour |
| erg-chebbi (dest) | Erg Chebbi dunes | 3-day-sahara-fes | 1 tour |
| ait-ben-haddou-kasbah-sunrise / bridge-town | Aït Ben Haddou ksar | 5-day & 7-day Imperial Cities | 1 each |
| tannery-workers / chouara-overhead | Fes tanneries | fes-4-day, fes-8-day | 1 each |

No single photograph is now the hero of more than two tours, and every hero communicates the route actually being sold.

## 4. ALT / CAPTION / SEO

- All catalog ALT text is natural, describes the actual photograph, and names the true location (e.g. "Jemaa el-Fna square at night in Marrakech, the Koutoubia minaret beyond"). No keyword stuffing introduced.
- Tour card ALTs use the tour name; tour heroes use the landmark's real name.

## 5. GSC

Live Google Search Console access was **not available** in this environment; no GSC data was fabricated. No keyword-targeted ALT changes were made without verified data.

## 6. REGRESSION GUARD

`verify-image-semantics.mjs` now enforces a **tour image semantic contract**: each tour page's og:image/hero must match its route identity, and hard bans fail the build if e.g. Chefchaouen imagery appears on a Casablanca tour page. Run `node verify-image-semantics.mjs` after any build.
