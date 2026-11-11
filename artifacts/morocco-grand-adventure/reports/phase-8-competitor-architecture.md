# Phase 8 — Competitor Architecture Analysis

**Scope:** Live-site architecture review of the five named competitors. Evidence = competitor URL + rendered page text. Where a metric (volume/authority/backlinks) could not be retrieved it is marked **NOT AVAILABLE**. No text was copied — only intent, architecture, terminology and gaps are analysed.

**GSC: NOT AVAILABLE in this session.** **Ahrefs: NOT AVAILABLE in this session.**

---

## Competitor A — Moroccan Tour (`https://moroccan-tour.com/`)

**Primary market:** International EN (US/UK/global); heavily private-tour positioning.
**Architecture:** Departure-city-first. Navigation is organised into **Tours From Casablanca / Marrakech / Fes / Tangier / Errachidia / Ouarzazate**, plus **Day Trips**, Reviews, Contact. Each departure hub lists tours as `City → Duration → Route` (e.g. "3 Days Tour from Marrakech to Merzouga Desert", "2 Days from Fes to Merzouga").

**Observed URL-intent coverage (live, from navigation):**
- Routes: Marrakech→Merzouga, Marrakech→Fes via desert, Marrakech→Zagora (2 days), Fes→Merzouga, Fes→Marrakech (2/3/4/5 days), Tangier→desert, Errachidia→Merzouga (3/4 days), Errachidia→Marrakech (3 days), Ouarzazate→Merzouga+Marrakech/Fes (2/3 days), Casablanca 4–14 days.
- Durations: 2–14 days.
- Day trips: Marrakech→Essaouira, Ouzoud Falls, Ourika, Ait Ben Haddou; Fes→Middle Atlas/Ifrane/Azrou, Meknes/Volubilis, Chefchaouen.

**Key traits:** (1) Very broad **city × duration** catalogue; (2) explicit **Errachidia** and **Ouarzazate** departure hubs — MGA does not have these; (3) **Tangier** hub — MGA does not; (4) deep Casablanca range (4–14 days). Private-tour and grand-tour ("Absolute Morocco", "Grand Morocco Tour") pages present. No strong multilingual catalogue beyond English on the fetched surface.

## Competitor B — Visit Morocco / ONMT (`https://www.visitmorocco.com/`)

**Primary market:** Official ONMT national tourism office; all inbound markets.
**Architecture:** **Destination-region** orientated (authority/semantic vocabulary source). Navigation groups places into:
- **Nature & rural heritage:** Chefchaouen, **Errachidia–Midelt–Merzouga**, Taroudant, Azilal, Ifrane, **Ouarzazate–Zagora–Tinghir**
- **Medinas & beaches,** **Beaches/sports,** **Medinas & cultural heritage**
- **See & do:** Desert, Nature, Culture, Shopping, Gastronomy, Wellness
- **Suggested tours:** Cruises, **Desert break**, Imperial cities, Road of 1000 Kasbahs, Honey tour, Great tour of Morocco, Golf
- **Travel info:** Getting to Morocco, Accommodation, Getting around, Food & drinks, Must-know (climate, currency, language).

**Official terminology / semantic vocabulary observed (authoritative, usable for MGA):**
- Uses "Desert break", "bivouac" ("Luxury bivouacs in the desert"), "cross the desert by camel", "desert expanses… dunes".
- Region naming places **Merzouga within Errachidia–Midelt** and **Zagora+Tinghir with Ouarzazate** — i.e. official cluster = `Errachidia/Midelt/Merzouga` and `Ouarzazate/Zagora/Tinghir`.
- Dades/Todra/Draa sit in the south/"Great South" semantic space.
- Languages observed on UI: EN FR ES IT DE PT NL RU SV PL AR.

**Use for MGA:** authoritative destination-relationship vocabulary, "bivouac / desert break / camel" official phrasing, and region bundles to mirror semantically. Not a direct tour commercial competitor.

## Competitor C — Moroccan Journeys Chinese section (`https://moroccanjourneys.com/chinese-home/`)

**Primary market:** UK-registered operator with a China-facing section; also Spain (WhatsApp +34).
**Architecture / evidence:** The `/chinese-home/` endpoint **serves English banner and tour names**; the nav is English ("Morocco Tours / Ultimate Morocco Tour / Sahara to the Sea…"). No native Chinese tour strings were observed on the fetched page. High-touch "Sahara / Erg Chigaga / Luxury" and bespoke/retreat pages present, but a genuine localized Chinese catalogue is **not evident** from the fetch.

**Chinese-market implication for MGA:** Visible competitors do **not** appear to operate a fully localized Chinese tour catalogue, so MGA's opportunity is real but must validate actual CN demand. MGA has genuine `zh` localization (tours 6/24) — a structural advantage over a competitor largely serving English.
## Competitor D — Dein-Marokko (`https://dein-marokko.de/`)

**Primary market:** Germany (DACH); strong local operator, Germany-run.
**Architecture:** Group travel / individual / activity / city trips / modular "Reisebausteine" (flight, guide, hire car, car+driver, accommodation, activities). Native German throughout. Strong trust (Trustpilot), small-group positioning (2–12), sustainability.
**Categories:** Gruppenreisen, Erlebnisrundreisen, Aktivreisen, Städtereisen, Individualreisen.
**Key traits:** German-first, no departure-city-by-duration matrix on the fetched pages; sells tours + modular components. Strong on DE market trust and "Reise planen" CTA.

## Competitor E — Saha Tours (`https://sahatours.net/es`, base local Moroccan; Erfoud/Errachidia company)

**Primary market:** Spanish (Spain) primary; also EN, PT. Local Moroccan operator in Erfoud/Errachidia.
**Architecture:** Categories = Rutas de aventura, Circuitos culturales, Rutas personalizadas (custom), Excursiones de 1 día, Blog. Language switch ES/EN/PT.
**Observed adventure-tour catalogue (`/rutas-de-aventura/`):**
- Desde Marrakech: 2D Zagora; 3D "Una vuelta a las dunas"; 3D/4D Kasbahs y magia desierto; 4D Ruta de las Mil Kasbahs; 5D/6D/8D/9D El Gran Sur (+Essaouira 9D); 10D Gran Aventura.
- Desde Fez: 3D Sólo desierto; 4D; 8D Ruta fotográfica.
- Desde Ouarzazate: 4D Escapada de aventura.
**Day-trip structure:** Essaouira page shows Programa, Galería, Incluye/No incluye, Descripción — component structure similar to MGA tour pages.
**Key traits:** native Spanish, strong ES focus, "El Gran Sur / Ruta de las Mil Kasbahs / Magia desierto" vocabulary, Marrakech-dominant with Fes + Ouarzazate departures. Local (Errachidia/Erfoud) credibility.

---

## Cross-competitor architecture comparison

| Dimension | Moroccan Tour | Visit Mor. | Mor. Journeys | Dein-Marokko | Saha Tours |
|---|---|---|---|---|---|
| Primary market | EN global | Official/all | EN/CN-facing | DE | ES (+PT/EN) |
| Organises by departure city | Yes (6 hubs incl. Errachidia, Ouarzazate, Tangier) | Regions | Tour themes | Trip type | City + duration |
| City × duration matrix | Strong | No | No | No | Moderate (MR strong) |
| Destination guides | Partial | Strong (official) | Moderate | Light | Light |
| Comparison pages | No | No | No | No | No |
| Localized multilingual | Partial (mostly EN) | 10+ langs | Chinese-English hybrid | German only | ES/PT/EN |
| Native vs machine | EN native | Native per lang | English | German native | Spanish native |
| Links tours↔guides | Weak | n/a (info) | Moderate | Moderate | Weak |

**Cross-competitor patterns (repeated = stronger evidence):**
1. **Errachidia and Ouarzazate as Sahara departure hubs** appear at both Moroccan Tour **and** Saha Tours (and ONMT regions bundle them with Merzouga/Zagora). MGA has **neither**.
2. **Marrakech→Merzouga and Fes→Merzouga are the two dominant route intents** across A and E.
3. **Zagora 2-day** is a distinct, repeatedly offered package (Moroccan Tour 2D, Saha 2D) — MGA has a 2-day Zagora tour and a Marrakech hub page.
4. **Original 4 departure hubs (Marrakech/Fes/Casablanca/Agadir)** match Moroccan Tour's A-class catalogue and MGA's own hubs.
5. **Malformed/absent real multilingual catalogues** are common among DMOs/small operators; MGA's 11-locale architecture is genuinely differentiated.

*No files modified in this phase (research/report only).*