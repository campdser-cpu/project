/**
 * StructuredData — injects Schema.org JSON-LD into <head> at runtime.
 *
 * Used by tour-detail, destination-detail, and about pages to emit rich,
 * page-specific structured data (Tour/TouristAttraction, FAQ, Reviews,
 * BreadcrumbList, AboutPage, Person) that Google can parse for rich results.
 *
 * The component cleans up its own script tags on unmount so navigating
 * between detail pages never leaves stale JSON-LD behind.
 */
import { useEffect } from 'react';
import { contactInfo } from '@/data/content';
import { t as translate, type Lang } from '@/i18n';
import { getLocalizedRouteMeta } from '@/components/seo/route-metadata';

const SCRIPT_ID_PREFIX = 'structured-data-';
const DATA_ATTR = 'data-structured-data';

const SITE_URL = 'https://www.moroccograndadventure.com';
const BRAND = 'Morocco Grand Adventure';
// Must match the @id of the static TravelAgency block in index.html exactly
// (note the slash before the fragment) so that isPartOf / worksFor / publisher
// / author references resolve to that single, spec-valid brand entity instead
// of creating a second, conflicting Organization node.
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Official social profile URLs used in sameAs across all Organization schemas. */
export const ORGANIZATION_SAME_AS: string[] = [
  'https://www.instagram.com/morocco_grand_adventure/',
  'https://youtube.com/@moroccograndadventure',
  'https://www.tiktok.com/@morocco.grand.adv',
  'https://www.facebook.com/share/1DFzDX72P3/',
  contactInfo.whatsapp,
];

type JsonLd = Record<string, unknown>;

function upsertJsonLd(id: string, data: JsonLd | JsonLd[]) {
  const fullId = `${SCRIPT_ID_PREFIX}${id}`;
  // Remove any previous instance of this block.
  document.head.querySelectorAll(`script[${DATA_ATTR}="${fullId}"]`).forEach((n) => n.remove());

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = fullId;
  script.setAttribute(DATA_ATTR, fullId);
  // JSON.stringify with 0 indentation keeps the payload compact.
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeJsonLd(id: string) {
  const fullId = `${SCRIPT_ID_PREFIX}${id}`;
  document.head.querySelectorAll(`script[${DATA_ATTR}="${fullId}"]`).forEach((n) => n.remove());
}

// ─────────────────────────────────────────────────────────────────────────────
// Builders
// ─────────────────────────────────────────────────────────────────────────────

/** Build AboutPage + Person + Breadcrumb schemas for the About page.
 *  The Organization entity is emitted globally once (see Layout) and referenced
 *  here by @id to avoid duplicate/conflicting Organization entities. */
export function buildAboutPageSchema(guides: { name: string; role: string; image: string }[], lang?: string): JsonLd[] {
  const l = normalizeLang(lang);
  const aboutUrl = `${SITE_URL}/${l}/about`;
  const schemas: JsonLd[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${aboutUrl}#webpage`,
    url: aboutUrl,
    inLanguage: l,
    name: getLocalizedRouteMeta('/about', l as Lang).title,
    isPartOf: { '@id': ORGANIZATION_ID },
    mainEntity: { '@id': ORGANIZATION_ID },
  });

  for (const guide of guides) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${aboutUrl}#${guide.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: guide.name,
      jobTitle: guide.role,
      worksFor: { '@id': ORGANIZATION_ID },
      image: `${SITE_URL}${guide.image}`,
    });
  }

  schemas.push(
    buildBreadcrumb(
      [
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'nav_about'), path: '/about' },
      ],
      lang,
    ),
  );

  return schemas;
}

// NOTE: the brand Organization/TravelAgency entity is NOT re-emitted here at
// runtime. The static head in index.html already carries the full TravelAgency
// + WebSite JSON-LD on every page (and persists across SPA navigation), so a
// runtime duplicate would create conflicting second brand entities — which is
// exactly the duplicate-entity problem we removed.

/** True only when the price string is a plain number (e.g. "450", not "Request a quote"). */
function isNumericPrice(price: string | undefined): boolean {
  return typeof price === 'string' && /^\d+(\.\d+)?$/.test(price.trim());
}

/** Map the supported language codes to the BCP-47 value used in HTML lang + schema inLanguage. */
function normalizeLang(lang?: string): string {
  const BCP47: Record<string, string> = {
    en: 'en', fr: 'fr', es: 'es', it: 'it', de: 'de', nl: 'nl', pt: 'pt',
    zh: 'zh', ja: 'ja', ko: 'ko', ar: 'ar',
  };
  return (lang && BCP47[lang]) || lang || 'en';
}

/** Localized schema-text lookup — the breadcrumb/entity names below are read
 *  by search engines per-locale, so they use the same t() registry as the
 *  visible page rather than a hardcoded English string. */
function tr(lang: string | undefined, key: string): string {
  return translate(normalizeLang(lang) as Lang, key);
}

/** Build a BreadcrumbList from an ordered list of {name, path} entries (language-aware URLs). */
export function buildBreadcrumb(crumbs: { name: string; path: string }[], lang?: string): JsonLd {
  const l = normalizeLang(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}/${l}${c.path === '/' ? '' : c.path}`.replace(/\/$/, '') || `${SITE_URL}/${l}`,
    })),
  };
}

/** Build a Tour (TouristTrip) schema from tour data (language-aware URLs + inLanguage). */
export function buildTourSchema(
  tour: {
    id: string;
    name: string;
    description?: string;
    image: string;
    price: string;
    duration: string;
    highlights?: string[];
    faq?: { question: string; answer: string }[];
    itineraryDays?: { day: number; title: string; desc: string }[];
  },
  urlSlug?: string,
  lang?: string,
): JsonLd[] {
  const l = normalizeLang(lang);
  const canonicalSlug = urlSlug ?? tour.id;
  const url = `${SITE_URL}/${l}/tours/${canonicalSlug}`;
  const schemas: JsonLd[] = [];

  // Main Tour schema (modeled as a TouristTrip).
  // TouristTrip is a Thing/Intangible — NOT a CreativeWork or Place — so
  // `inLanguage`, `isAccessibleForFree` and `touristDestination` are not valid
  // properties here and triggered schema.org validation errors on every tour
  // page. They have been removed; the visible page still carries the same
  // information for users.
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#tour`,
    name: tour.name,
    description: tour.description ?? tour.name,
    image: `${SITE_URL}${tour.image}`,
    url,
    provider: {
      '@type': 'TravelAgency',
      '@id': ORGANIZATION_ID,
      name: BRAND,
      url: SITE_URL,
    },
    // Offer.price must be a number. Tours whose pricing is not a fixed number
    // ("Request a quote") must not emit an Offer with a non-numeric price.
    ...(isNumericPrice(tour.price)
      ? {
          offers: {
            '@type': 'Offer',
            '@id': `${url}#offer`,
            price: Number(tour.price),
            priceCurrency: 'EUR',
            url,
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: Number(tour.price),
              priceCurrency: 'EUR',
              eligibleQuantity: {
                '@type': 'QuantitativeValue',
                minValue: 1,
              },
            },
          },
        }
      : {}),
    itinerary: (tour.itineraryDays ?? []).map((d) => ({
      '@type': 'ItemList',
      name: `Day ${d.day}: ${d.title}`,
      description: d.desc,
    })),
    touristType: [
      tr(lang, 'schema_tourist_luxury'),
      tr(lang, 'schema_tourist_adventure'),
      tr(lang, 'schema_tourist_culture'),
      tr(lang, 'schema_tourist_couples'),
      tr(lang, 'schema_tourist_families'),
    ],
  });

  // FAQ schema if FAQs are available.
  if (tour.faq && tour.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tour.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  // Breadcrumb
  schemas.push(
    buildBreadcrumb(
      [
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'nav_tours'), path: '/tours' },
        { name: tour.name, path: `/tours/${tour.id}` },
      ],
      lang,
    ),
  );

  return schemas;
}

/** Build a TouristAttraction schema from destination data. */
export function buildDestinationSchema(dest: {
  id: string;
  name: string;
  description: string;
  image: string;
  imageDecorative?: boolean;
  imageUnverified?: boolean;
  region: string;
  coords: { lat: number; lng: number };
  highlights: string[];
  bestTime: string;
}, lang?: string): JsonLd[] {
  const l = normalizeLang(lang);
  const url = `${SITE_URL}/${l}/destinations/${dest.id}`;
  const schemas: JsonLd[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${url}#attraction`,
    name: dest.name,
    description: dest.description,
    // Only a photograph we can stand behind is offered as this place's image —
    // as a real ImageObject (not a bare URL) so Google Images gets a real
    // caption. No width/height here: destination photos have real, varied
    // native dimensions (measured examples range from 612x448 to 933x1400
    // portrait) and the page's <img width=1200 height=675> is a fixed layout
    // box, not each photo's true size — asserting a single fixed dimension
    // for every destination would be inaccurate for most of them. width/height
    // are optional on schema.org's ImageObject, so they're simply omitted
    // rather than guessed.
    ...(dest.imageDecorative || dest.imageUnverified
      ? {}
      : {
          image: {
            '@type': 'ImageObject',
            url: `${SITE_URL}${dest.image}`,
            contentUrl: `${SITE_URL}${dest.image}`,
            caption: dest.name,
          },
        }),
    url,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: dest.coords.lat,
      longitude: dest.coords.lng,
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: dest.region,
      addressCountry: 'MA',
    },
    touristType: dest.highlights,
    // `bestTimeToVisit` is NOT a schema.org property (404 on schema.org) and
    // `inLanguage` is not valid on Place types — both caused schema.org
    // validation errors on every destination page. The best-time data is
    // preserved truthfully via the Place-valid `additionalProperty` instead.
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Best time to visit',
        value: dest.bestTime,
      },
    ],
    containedInPlace: {
      '@type': 'Country',
      name: 'Morocco',
    },
  });

  schemas.push(
    buildBreadcrumb(
      [
        { name: tr(lang, 'nav_home'), path: '/' },
        { name: tr(lang, 'nav_destinations'), path: '/destinations' },
        { name: dest.name, path: `/destinations/${dest.id}` },
      ],
      lang,
    ),
  );

  return schemas;
}

/**
 * Build a standalone ImageObject schema for a page's real hero photograph.
 * Only call this with a genuine, already-published site photo. `caption`
 * should be the same real alt/description text already used on the visible
 * page, not new copy written just for schema. `width`/`height` are optional
 * on schema.org's ImageObject and are included here ONLY when the caller has
 * the image's real, verified pixel dimensions (e.g. measured directly from
 * the file) — pass neither rather than a guessed or generic fallback value;
 * omitting them is correct, a wrong number is not.
 */
export function buildImageObjectSchema(image: {
  url: string;
  width?: number;
  height?: number;
  caption: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${SITE_URL}${image.url}`,
    contentUrl: `${SITE_URL}${image.url}`,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    caption: image.caption,
  };
}

/** Build a FAQPage schema from an array of {question, answer}. */
export function buildFaqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/** Build a Review schema array from review objects. */
export function buildReviewSchema(
  reviews: { name: string; text: string; rating: number }[],
  itemName: string,
  itemUrl: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: reviews.map((r, i) => ({
      '@type': 'Review',
      position: i + 1,
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      itemReviewed: {
        '@type': 'TouristTrip',
        name: itemName,
        url: itemUrl,
      },
    })),
  };
}

/** Build a BlogPosting schema array from blog post data. */
export function buildBlogPostSchema(
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    author?: string;
  },
  lang: string,
): JsonLd[] {
  const l = normalizeLang(lang);
  const url = `${SITE_URL}/${l}/blog/${post.slug}`;
  const author = post.author ?? BRAND;
  const pubDate = post.date;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#blog-post`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      headline: post.title,
      description: post.description,
      image: `${SITE_URL}${post.image}`,
      datePublished: pubDate,
      dateModified: pubDate,
      author: {
        '@type': 'Organization',
        name: author,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: BRAND,
        // Same logo node as the Organization/TravelAgency entity in the static
        // head (index.html): identical @id, URL and dimensions, so the brand
        // logo resolves to one consistent ImageObject across the whole graph.
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo-official.png`,
          contentUrl: `${SITE_URL}/logo-official.png`,
          width: 1230,
          height: 957,
          caption: BRAND,
        },
      },
      inLanguage: l,
    },
    buildBreadcrumb(
      [
        { name: BRAND, path: '/' },
        { name: tr(lang, 'nav_blog'), path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ],
      lang,
    ),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// React component
// ─────────────────────────────────────────────────────────────────────────────

type StructuredDataProps = {
  /** Unique key for this block (used to clean up on unmount). */
  id: string;
  /** One or more JSON-LD objects to inject. */
  data: JsonLd | JsonLd[];
};

/**
 * Inject JSON-LD structured data into <head>.
 * Cleans up on unmount so SPA navigation doesn't leave stale blocks.
 */
export function StructuredData({ id, data }: StructuredDataProps) {
  useEffect(() => {
    const blocks = Array.isArray(data) ? data : [data];
    blocks.forEach((block, i) => {
      upsertJsonLd(blocks.length > 1 ? `${id}-${i}` : id, block);
    });
    return () => {
      if (blocks.length > 1) {
        blocks.forEach((_, i) => removeJsonLd(`${id}-${i}`));
      } else {
        removeJsonLd(id);
      }
    };
  }, [id, data]);

  return null;
}
