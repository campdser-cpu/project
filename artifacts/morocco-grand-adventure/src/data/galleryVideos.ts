export type GalleryVideoItem = {
  src: string;
  poster: string;
  title: string;
  titleKey: string;
  category: string;
  portrait?: boolean;
};

/**
 * The real video library shown on /gallery. Single source of truth — imported
 * by both the live gallery page (src/pages/gallery.tsx) and the build-time
 * prerenderer (scripts/prerender.ts), so the crawlable static HTML can never
 * drift from what a visitor actually sees.
 */
export const GALLERY_VIDEOS: GalleryVideoItem[] = [
  { src: '/videos/dunes-camels.mp4', poster: '/images/personal/dunes-camels-poster.webp', title: 'Lost in the Dunes', titleKey: 'gallery_vid1_title', category: 'Camel Trekking', portrait: true },
  { src: '/videos/sahara-experience.mp4', poster: '/images/personal/luxury-camp-dusk.webp', title: 'Experience the Sahara', titleKey: 'gallery_vid2_title', category: 'Desert' },
  { src: '/videos/merzouga-campfire.mp4', poster: '/images/dest/merzouga.webp', title: 'Campfire Nights in Merzouga', titleKey: 'gallery_vid3_title', category: 'Culture' },
  { src: '/videos/hero.mp4', poster: '/images/hero/sahara-camel-riders-poster.webp', title: 'Morocco — A Cinematic Journey', titleKey: 'gallery_vid4_title', category: 'Desert', portrait: true },
  { src: '/videos/ait-benhaddou-kasbah-unesco-morocco.mp4', poster: '/images/dest/ait-ben-haddou.webp', title: 'Aït Ben Haddou at Golden Hour', titleKey: 'gallery_vid5_title', category: 'Landscapes' },
  { src: '/videos/chefchaouen-blue-city-morocco.mp4', poster: '/images/dest/chefchaouen.webp', title: 'The Blue Pearl', titleKey: 'gallery_vid6_title', category: 'Landscapes' },
  { src: '/videos/sahara-desert-camel-trek-atlas-mountains-morocco.mp4', poster: '/images/personal/dunes-camels-poster.webp', title: 'Camel Trek Across the Dunes', titleKey: 'gallery_vid7_title', category: 'Camel Trekking' },
];
