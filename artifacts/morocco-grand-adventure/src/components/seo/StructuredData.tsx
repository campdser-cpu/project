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
export function buildAboutPageSchema(guides: { name: string; role: string; image: string }[]): JsonLd[] {
  const aboutUrl = `${SITE_URL}/about`;
  const schemas: JsonLd[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${aboutUrl}#webpage`,
    url: aboutUrl,
    name: 'About Us — Meet Your Local Berber Guides',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
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
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  );

  return schemas;
}

const SITE_URL = 'https://www.moroccograndadventure.com';
const BRAND = 'Morocco Grand Adventure';

/** Build a BreadcrumbList from an ordered list of {name, path} entries. */
export function buildBreadcrumb(crumbs: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Build a Tour (TouristTrip) schema from tour data. */
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
): JsonLd[] {
  const canonicalSlug = urlSlug ?? tour.id;
  const url = `${SITE_URL}/tours/${canonicalSlug}`;
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
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: tour.price,
        priceCurrency: 'USD',
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
    inLanguage: 'en',
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
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Tours', path: '/tours' },
      { name: tour.name, path: `/tours/${tour.id}` },
    ]),
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
}): JsonLd[] {
  const url = `${SITE_URL}/destinations/${dest.id}`;
  const schemas: JsonLd[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: dest.name,
    description: dest.description,
    image: `${SITE_URL}${dest.image}`,
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
    bestTimeToVisit: dest.bestTime,
    containedInPlace: {
      '@type': 'Country',
      name: 'Morocco',
    },
  });

  schemas.push(
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: dest.name, path: `/destinations/${dest.id}` },
    ]),
  );

  return schemas;
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