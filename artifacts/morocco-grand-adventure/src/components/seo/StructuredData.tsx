/**
 * StructuredData — injects Schema.org JSON-LD into <head> at runtime.
 *
 * Used by tour-detail and destination-detail pages to emit rich,
 * page-specific structured data (Tour/TouristAttraction, FAQ, Reviews,
 * BreadcrumbList) that Google can parse for rich results.
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
export function buildTourSchema(tour: {
  id: string;
  name: string;
  description?: string;
  image: string;
  price: string;
  duration: string;
  highlights?: string[];
  faq?: { question: string; answer: string }[];
  itineraryDays?: { day: number; title: string; desc: string }[];
}): JsonLd[] {
  const url = `${SITE_URL}/tours/${tour.id}`;
  const schemas: JsonLd[] = [];

  // Main Tour schema (modeled as a TouristTrip).
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description ?? tour.name,
    image: `${SITE_URL}${tour.image}`,
    url,
    provider: {
      '@type': 'TravelAgency',
      name: BRAND,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '15000',
      bestRating: '5',
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