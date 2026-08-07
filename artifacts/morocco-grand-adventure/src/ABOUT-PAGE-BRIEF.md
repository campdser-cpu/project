# About Us Page — Content & Implementation Brief
### moroccograndadventure.com

This package gives Cline everything needed to build the new About Us page:
real storytelling copy (translation-ready, no hardcoded text), an i18n JSON
content file, page structure, SEO metadata, and schema markup.

**⚠️ Before publishing:** the guide bios below are written in full narrative
form using the story arc you specified (childhood in Merzouga → first camel
→ guiding caravans → meeting travelers → learning languages → passion for
Berber culture → how tourism changed their life → their dream). Specific
personal details are marked `[like this]` — sit down with each guide (or
have them voice-record it in Darija/French) and swap in their real details.
Publishing invented specifics about a real named person is something you
want to avoid — the structure and emotional tone are ready, the facts should
come from them.

**⚠️ i18n implementation:** I don't have access to your codebase, so I can't
see which i18n library you use (react-i18next, next-intl, vue-i18n, etc.) or
your existing key structure/locale folder layout. The content below is
organized as nested JSON under an `about` namespace so Cline can drop it
into whatever `en.json` (and translated `fr.json` / `es.json` / `ar.json`)
files your project already uses. Cline should match the existing key-naming
convention in the repo rather than inventing a new one — search the repo
first for how other pages structure their translation keys, then mirror it.

---

## 1. Photos provided

| File | Use |
|---|---|
| `about-hero-team-chefchaouen-morocco.jpg` | Full-width cinematic hero image (team overlooking Chefchaouen) |
| `mohamed-boughrara-founder-desert-guide-merzouga.webp` | Mohamed Boughrara — Founder & Desert Guide |
| `mostapha-wargaga-senior-desert-guide-sahara-sunset.webp` | Mostapha Wargaga — Senior Desert Guide |
| `moha-amroui-desert-guide-camels-merzouga.jpg` | Moha Amroui — Desert Guide |

You'll want at least one additional close-up portrait per guide for the
profile cards (the current three are action/lifestyle shots, great for
hero/timeline use, but a warm direct-to-camera portrait converts better on
a bio card). Flag this to the guides if you have a shoot planned.

---

## 2. Page structure (for Cline to build)

1. **Hero** — full-bleed `about-hero-team-chefchaouen-morocco.jpg`, dark
   gradient overlay bottom third for text legibility, page title + one-line
   mission statement, subtle scroll-down indicator.
2. **Our Story** — 2–3 paragraph founding story of Morocco Grand Adventure
   (see §3).
3. **Timeline** — "Our Journey" (see §4), horizontal scroll on desktop /
   vertical stacked on mobile.
4. **Stats band** — 4 stat counters, animated count-up on scroll into view
   (see §5).
5. **Meet Your Guides** — 3 interactive profile cards (photo, name, role,
   short teaser) that expand/link to full story (see §6). Order: Mohamed →
   Mostapha → Moha (founder first, then seniority).
6. **Why Travelers Trust Us** — icon + short-copy trust grid (see §7).
7. **CTA band** — link to tours/booking page.

### Design notes
- Luxury palette: pull your existing brand colors (don't invent new ones —
  reuse whatever primary/accent tokens are already defined in the design
  system/Tailwind config). If none exist yet, warm desert tones (terracotta,
  sand, deep indigo-night, gold accent) fit the brand naturally.
- Typography: a serif or high-contrast display face for headings (evokes
  "premium travel editorial"), clean sans for body text.
- Animations: fade/slide-up on scroll for each section, count-up for stats,
  subtle hover-lift on guide cards. Keep them light — respect
  `prefers-reduced-motion`.
- Mobile-first: stack all grids to single column below `md`, hero text size
  scales down, timeline becomes a vertical line with alternating dots.

---

## 3. Our Story (page intro copy)

**Translation key:** `about.story.title` / `about.story.body`

> **Title:** A Berber Family, Not a Travel Agency
>
> **Body:** Morocco Grand Adventure didn't start in an office. It started in
> Merzouga, on the edge of the Sahara, where [Mohamed / the founder] grew up
> watching caravans leave for the dunes at sunset and return at sunrise.
> What we do today — guiding travelers into the desert — is the same thing
> our families have done for generations. The difference is that now we get
> to share it with people from every corner of the world. We're not a
> company that hired guides. We're guides who built a company.

---

## 4. Timeline — "Our Journey"

**Translation key:** `about.timeline.items[]`

Fill in real years/milestones — placeholders below follow a natural arc:

1. **[Year]** — Mohamed starts leading his first camel treks into Erg
   Chebbi as a teenager, following in the footsteps of his father and
   uncles.
2. **[Year]** — Mostapha and Moha join, having grown up in the same dunes,
   turning a one-man operation into a small team of local guides.
3. **[Year]** — Morocco Grand Adventure is founded to formalize what the
   family had already been doing for years — now bookable, but still
   personal.
4. **[Year]** — First international travelers begin arriving in numbers;
   the guides start picking up English, Spanish, French and Italian simply
   by talking around the campfire.
5. **[Year – present]** — Hundreds of desert expeditions later, still family
   run, still guided by people who were born in the sand they walk on.

---

## 5. Stats band

**Translation key:** `about.stats.items[]`

| Stat | Label |
|---|---|
| `[X]+` | Years of Experience |
| `[X]+` | Happy Travelers |
| `5+` | Languages Spoken |
| `[X]+` | Desert Expeditions Guided |

(Replace `[X]` with real numbers — even modest honest numbers read as more
premium than vague ones.)

---

## 6. Guide profiles

Each bio follows the same authentic arc you asked for, in each guide's own
voice. Translation keys: `about.team.mohamed`, `about.team.mostapha`,
`about.team.moha` (each with `.name`, `.role`, `.teaser`, `.story`).

### Mohamed Boughrara — Founder & Desert Guide
*(photo: `mohamed-boughrara-founder-desert-guide-merzouga.webp`)*

**Teaser (for the card):** "I didn't choose the desert. I was born in it."

**Full story:**
> I grew up in Merzouga, where the last houses of the village touch the
> first dunes of the Sahara. As a boy of about [age], I used to watch the
> older men in my family load up the camels before sunset and disappear
> toward Erg Chebbi, and I couldn't wait to be old enough to go with them.
> My first camel was called [name] — patient, stubborn, and somehow always
> knew the way back even in the dark.
>
> I started guiding small groups myself when I was still a teenager, mostly
> local families at first, then a few curious travelers who'd found their
> way to Merzouga by word of mouth. I remember my first foreign guests —
> [nationality] — and how strange it felt that people would fly across the
> world just to see the place I'd grown up in without a second thought.
>
> Nobody taught me English or French in a classroom. I learned them the way
> my father learned to read the dunes — by doing it, night after night,
> around the fire, asking travelers to correct me, laughing at my mistakes,
> trying again the next night with the next group. Now I get by in [list
> languages], and every one of them I owe to a stranger who became a friend
> for one night under the stars.
>
> What tourism gave me wasn't just work. It gave me a reason to be proud of
> where I'm from. I used to think Merzouga was just home. Now I understand
> it's one of the most beautiful places on earth, and I get to be the one
> who shows it to people. That's why I started Morocco Grand Adventure —
> not to build a big company, but so that every traveler who comes here
> gets the Sahara the way my family has always known it: honest,
> unhurried, and real.

---

### Mostapha Wargaga — Senior Desert Guide
*(photo: `mostapha-wargaga-senior-desert-guide-sahara-sunset.webp`)*

**Teaser:** "Every sunset in the dunes still stops me, even after [X] years."

**Full story:**
> I was born and raised near Merzouga, and like most kids here, the desert
> wasn't a destination — it was just outside the door. I remember the first
> time I was allowed to lead a camel on my own, without an adult walking
> next to me. I was so nervous I barely looked up from the sand the whole
> way, worried I'd lose the trail. Now I could walk that route with my eyes
> closed.
>
> Guiding caravans out to the desert camps became my life almost without me
> deciding it. You start by helping load the bags, then leading one camel,
> then a small line of them, and one day you realize you're the one
> travelers are looking to when the sun goes down and the dunes all start
> to look the same.
>
> The travelers are the part I never expected to love as much as I do.
> Sitting around a fire with people from [countries — e.g. Spain, Italy,
> the US], hearing about their lives, trying out the few words of Spanish
> or Italian I'd picked up the night before with the last group — that's
> where most of my language came from. Not a classroom. A circle of
> strangers and a pot of mint tea.
>
> Tourism changed my life in a simple way: it let me stay. A lot of young
> people from villages like mine leave to find work in the cities. I got to
> stay in the place I love, doing the thing I'm proud of, and still meet the
> whole world without ever really leaving home.

---

### Moha Amroui — Desert Guide
*(photo: `moha-amroui-desert-guide-camels-merzouga.jpg`)*

**Teaser:** "The camels taught me patience before any person did."

**Full story:**
> I grew up in a family connected to the desert for as long as anyone can
> remember — uncles, cousins, neighbors, all guides at some point. So my
> first real memory of camels isn't really a "first" — they were just
> always there, part of the background of being a kid in Merzouga.
>
> What I do remember clearly is the first time I was trusted to lead a
> caravan on my own toward the camps, no one else with me but the camels.
> It's a strange kind of quiet out there — just footsteps in the sand and
> the sound of the wind moving the dunes. I think that walk is where I
> really fell in love with this work, not the version I'd grown up watching,
> but the one I was finally living myself.
>
> Meeting travelers changed the way I see my own home. People come from
> [countries] and ask questions about things I'd never thought to explain —
> why we build camps where we do, how we read the weather, what the stars
> mean out here. Answering them made me appreciate what I already knew.
> Along the way I picked up bits of [languages] — not from books, just from
> wanting to actually talk to the people sitting next to me at the fire.
>
> I don't have one big dream about tourism — just a simple one. I want every
> traveler who comes with us to leave the desert the way I feel every time
> I'm out there: a little quieter, a little more grateful, and glad they saw
> the real thing instead of a postcard version of it.

---

## 7. Why Travelers Trust Us (trust section)

**Translation key:** `about.trust.items[]`

| Icon idea | Heading | Copy |
|---|---|---|
| Family/home | Local Berber Family | We're not a booking platform — we're a family from Merzouga who happens to run tours. |
| Compass | Native Sahara Guides | Every guide grew up on the dunes we walk — this isn't a job they trained for, it's home. |
| Handshake | Authentic Experiences | No staged photo-ops. Real camps, real routes, real Berber hospitality. |
| Person/map-pin | Personalized Tours | Small groups, flexible pace, tailored to who you are and what you want to see. |
| Shield-check | Honest Advice | We'll tell you what's worth doing and what isn't — even if it means a shorter itinerary. |
| Life-ring | Safe Adventures | Experienced guides who know the desert's moods and how to travel it responsibly. |
| Leaf | Sustainable Tourism | Supporting local families and respecting the land that's supported us for generations. |

---

## 8. SEO metadata

**Title tag:** About Us — Meet Your Local Berber Guides | Morocco Grand Adventure
**Meta description (155 chars):** Meet the Berber family behind Morocco Grand Adventure — native Sahara guides from Merzouga offering authentic camel treks and real Morocco travel experiences.
**Focus keyword:** local berber guides morocco
**Secondary keywords:** sahara desert experts, morocco travel specialists, camel trekking merzouga, authentic morocco tours, native desert guides

**Internal links to include:**
- Link guide names → their tours/itineraries if you have guide-specific tour pages
- Link "Merzouga" → your Merzouga/Erg Chebbi desert tour page
- Link "camel trekking" → your camel trek booking page
- Link CTA band → main tours/booking page

**H1:** should contain the focus keyword naturally, e.g. "Meet the Local Berber Guides Behind Morocco Grand Adventure"

---

## 9. Schema markup

Add both an `AboutPage` + `Organization` graph, and a `Person` entry per
guide (helps guides show up as knowledge-panel-eligible entities and
reinforces E-E-A-T for the whole site).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.moroccograndadventure.com/about#webpage",
      "url": "https://www.moroccograndadventure.com/about",
      "name": "About Us — Meet Your Local Berber Guides",
      "isPartOf": { "@id": "https://www.moroccograndadventure.com/#website" }
    },
    {
      "@type": "TravelAgency",
      "@id": "https://www.moroccograndadventure.com/#organization",
      "name": "Morocco Grand Adventure",
      "url": "https://www.moroccograndadventure.com",
      "founder": { "@id": "https://www.moroccograndadventure.com/about#mohamed-boughrara" },
      "areaServed": "Morocco",
      "employee": [
        { "@id": "https://www.moroccograndadventure.com/about#mohamed-boughrara" },
        { "@id": "https://www.moroccograndadventure.com/about#mostapha-wargaga" },
        { "@id": "https://www.moroccograndadventure.com/about#moha-amroui" }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.moroccograndadventure.com/about#mohamed-boughrara",
      "name": "Mohamed Boughrara",
      "jobTitle": "Founder & Desert Guide",
      "worksFor": { "@id": "https://www.moroccograndadventure.com/#organization" },
      "image": "https://www.moroccograndadventure.com/images/mohamed-boughrara-founder-desert-guide-merzouga.webp"
    },
    {
      "@type": "Person",
      "@id": "https://www.moroccograndadventure.com/about#mostapha-wargaga",
      "name": "Mostapha Wargaga",
      "jobTitle": "Senior Desert Guide",
      "worksFor": { "@id": "https://www.moroccograndadventure.com/#organization" },
      "image": "https://www.moroccograndadventure.com/images/mostapha-wargaga-senior-desert-guide-sahara-sunset.webp"
    },
    {
      "@type": "Person",
      "@id": "https://www.moroccograndadventure.com/about#moha-amroui",
      "name": "Moha Amroui",
      "jobTitle": "Desert Guide",
      "worksFor": { "@id": "https://www.moroccograndadventure.com/#organization" },
      "image": "https://www.moroccograndadventure.com/images/moha-amroui-desert-guide-camels-merzouga.jpg"
    }
  ]
}
```

---

## 10. i18n usage note for Cline

All copy above lives in `about-page-content.json` (next to this file) under
an `about` namespace, ready to merge into your existing `en.json`. Example
of how a component should consume it (adjust to your actual i18n hook —
this is illustrative only, not tied to a specific library):

```jsx
// Illustrative only — match your project's real i18n hook/import
const { t } = useTranslation();

<h1>{t('about.hero.title')}</h1>
<p>{t('about.hero.subtitle')}</p>

{guides.map(guide => (
  <GuideCard
    key={guide.id}
    name={t(`about.team.${guide.id}.name`)}
    role={t(`about.team.${guide.id}.role`)}
    teaser={t(`about.team.${guide.id}.teaser`)}
    story={t(`about.team.${guide.id}.story`)}
  />
))}
```

No English strings should be hardcoded in JSX/templates — every visible
string routes through the translation function and a key in this file.
Once `en.json` is merged, send the same JSON structure to your translator
(or an LLM translation pass) for `fr`, `es`, and `ar` locale files, keeping
keys identical across all locale files.
