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

const SCRIPT_ID_PREFIX = 'structured-data-';
const DATA_ATTR = 'data-structured-data';

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

/** Build AboutPage + Organization + Person schemas for the About page. */
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
    name: 'About Us — Meet Your Local Berber Guides',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-official.png`,
    founder: { '@id': `${aboutUrl}#${guides[0]?.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
    areaServed: 'Morocco',
    employee: guides.map((g) => ({
      '@id': `${aboutUrl}#${g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    })),
  });

  for (const guide of guides) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${aboutUrl}#${guide.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: guide.name,
      jobTitle: guide.role,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      image: `${SITE_URL}${guide.image}`,
    });
  }

  schemas.push(
    buildBreadcrumb(
      [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
      lang,
    ),
  );

  return schemas;
}

const SITE_URL = 'https://www.moroccograndadventure.com';
const BRAND = 'Morocco Grand Adventure';

/** Map the supported language codes to the BCP-47 value used in HTML lang + schema inLanguage. */
function normalizeLang(lang?: string): string {
  const BCP47: Record<string, string> = {
    en: 'en', fr: 'fr', es: 'es', it: 'it', de: 'de', nl: 'nl', pt: 'pt',
    zh: 'zh', ja: 'ja', ko: 'ko', ar: 'ar',
  };
  return (lang && BCP47[lang]) || lang || 'en';
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
      '@id': `${SITE_URL}/#organization`,
      name: BRAND,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      '@id': `${url}#offer`,
      price: tour.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: tour.price,
        priceCurrency: 'EUR',
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          minValue: 1,
        },
      },
    },
    itinerary: (tour.itineraryDays ?? []).map((d) => ({
      '@type': 'ItemList',
      name: `Day ${d.day}: ${d.title}`,
      description: d.desc,
    })),
    touristDestination: (tour.highlights ?? []).map((h) => ({
      '@type': 'TouristDestination',
      name: h,
    })),
    inLanguage: l,
    isAccessibleForFree: false,
    touristType: ['Luxury Travelers', 'Adventure Seekers', 'Culture Enthusiasts', 'Couples', 'Families'],
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
        { name: 'Home', path: '/' },
        { name: 'Tours', path: '/tours' },
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
    name: dest.name,
    description: dest.description,
    image: `${SITE_URL}${dest.image}`,
    url,
    inLanguage: l,
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
    bestTimeToVisit: dest.bestTime,
    containedInPlace: {
      '@type': 'Country',
      name: 'Morocco',
    },
  });

  schemas.push(
    buildBreadcrumb(
      [
        { name: 'Home', path: '/' },
        { name: 'Destinations', path: '/destinations' },
        { name: dest.name, path: `/destinations/${dest.id}` },
      ],
      lang,
    ),
  );

  return schemas;
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
        name: BRAND,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-official.png`,
        },
      },
      inLanguage: l,
    },
    buildBreadcrumb(
      [
        { name: BRAND, path: '/' },
        { name: 'Blog', path: '/blog' },
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