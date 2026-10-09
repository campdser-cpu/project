import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { contactInfo } from '@/data/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, Play, Instagram, Library } from 'lucide-react';
import LibraryPhotoGrid from '@/components/LibraryPhotoGrid';
import { publishableLibraryPhotos } from '@/data/photoLibrary';

type GalleryItem = {
  src: string;
  /** Real intrinsic pixel dimensions (read from the actual file via `sharp`,
   *  never guessed) — reserves the correct masonry-column space before the
   *  image loads, avoiding layout shift. */
  width: number;
  height: number;
  categories: string[];
  caption: string;
  captionKey: string;
};

type VideoItem = {
  src: string;
  poster: string;
  title: string;
  titleKey: string;
  category: string;
  portrait?: boolean;
};

// Every image is tagged with one or more categories. New photos added here are
// grouped automatically — a category filter only appears when at least one image
// (or video) belongs to it, so the gallery scales without any layout changes.
// width/height on every entry are real intrinsic dimensions read from the
// actual files via `sharp` (scripts already use it elsewhere in this repo,
// see build-experience-thumbs.mjs) — never guessed. They let the masonry
// grid reserve each image's real space before it loads, avoiding layout
// shift, while `columns-*` still lays the grid out from these same ratios.
const IMAGES: GalleryItem[] = [
  // --- Desert & Sahara ---
  { src: '/images/personal/sahara-dunes-golden.webp', width: 960, height: 1200, categories: ['Desert', 'Landscapes', 'Authenticity'], caption: 'Golden dunes at sunrise over Erg Chebbi', captionKey: 'gallery_cap1' },
  { src: '/images/dest/merzouga.webp', width: 1600, height: 1067, categories: ['Desert'], caption: 'Merzouga — Erg Chebbi Dunes', captionKey: 'gallery_cap2' },
  { src: '/images/dest/erg-chebbi.webp', width: 1024, height: 683, categories: ['Desert'], caption: 'The golden sands of Erg Chebbi', captionKey: 'gallery_cap3' },
  { src: '/images/dest/zagora.webp', width: 800, height: 500, categories: ['Desert'], caption: 'Zagora — gateway to the desert', captionKey: 'gallery_cap4' },
  { src: '/images/dest/draa-valley.webp', width: 612, height: 406, categories: ['Desert', 'Landscapes'], caption: 'The palm groves of the Draa Valley', captionKey: 'gallery_cap5' },
  { src: '/images/stock/stargazing-merzouga.webp', width: 801, height: 1200, categories: ['Desert', 'Luxury Camp'], caption: 'Stargazing beneath the Milky Way', captionKey: 'gallery_cap7' },
  { src: '/images/curated/berber-guide-camels-sahara-desert-morocco.webp', width: 900, height: 1200, categories: ['Desert'], caption: 'A desert guide resting with his camels on the dunes', captionKey: 'gallery_cap40' },
  // --- From the photo journal (authentic images from our Morocco journeys) ---
  { src: '/images/pdf/img_0-optimized.webp', width: 1200, height: 956, categories: ['Authenticity'], caption: 'Captured on the road with Morocco Grand Adventure', captionKey: 'gallery_cap41' },
  { src: '/images/pdf/img_1-optimized.webp', width: 800, height: 1200, categories: ['Authenticity'], caption: 'A moment from one of our private journeys in Morocco', captionKey: 'gallery_cap42' },
  { src: '/images/pdf/img_2-optimized.webp', width: 800, height: 1200, categories: ['Authenticity'], caption: 'From the Morocco Grand Adventure photo journal', captionKey: 'gallery_cap43' },
  { src: '/images/pdf/img_3-optimized.webp', width: 800, height: 1200, categories: ['Authenticity'], caption: 'Photographed while travelling with our local guides', captionKey: 'gallery_cap44' },
  { src: '/images/pdf/img_4-optimized.webp', width: 800, height: 1200, categories: ['Authenticity'], caption: 'Morocco, seen through the eyes of our travellers', captionKey: 'gallery_cap45' },
  // --- Luxury Camp & Stays ---
  { src: '/images/personal/luxury-camp-dusk.webp', width: 1200, height: 1200, categories: ['Luxury Camp', 'Desert', 'Authenticity'], caption: 'Our luxury desert camp at dusk', captionKey: 'gallery_cap8' },
  { src: '/images/riad/courtyard.webp', width: 800, height: 1198, categories: ['Luxury Camp', 'Culture'], caption: 'A traditional riad courtyard', captionKey: 'gallery_cap9' },
  { src: '/images/riad/bedroom.webp', width: 1200, height: 801, categories: ['Luxury Camp'], caption: 'A luxury riad suite', captionKey: 'gallery_cap10' },
  { src: '/images/riad/rooftop.webp', width: 1200, height: 801, categories: ['Luxury Camp'], caption: 'Rooftop views over the medina', captionKey: 'gallery_cap11' },
  // --- Happy Travelers ---
  { src: '/images/personal/guide-guest-tea.webp', width: 1200, height: 901, categories: ['Happy Travelers', 'Culture', 'My Journey as a Guide', 'Authenticity'], caption: 'Sharing sweet mint tea with a guest in the dunes', captionKey: 'gallery_cap12' },
  { src: '/images/personal/group-atlas.webp', width: 1200, height: 900, categories: ['Happy Travelers', 'Authenticity'], caption: 'Happy travelers in the Atlas', captionKey: 'gallery_cap13' },
  { src: '/images/personal/guests-sunset.webp', width: 675, height: 1200, categories: ['Happy Travelers', 'Desert', 'Authenticity'], caption: 'A Sahara sunset with our guests', captionKey: 'gallery_cap14' },
  { src: '/images/personal/guests-van.webp', width: 900, height: 1200, categories: ['Happy Travelers', 'Authenticity'], caption: 'On the road together', captionKey: 'gallery_cap15' },
  { src: '/images/personal/riad-tea.webp', width: 800, height: 1200, categories: ['Happy Travelers', 'Culture', 'Authenticity'], caption: 'Sharing tea on the terrace', captionKey: 'gallery_cap16' },
  // --- My Journey as a Guide ---
  { src: '/images/personal/guide-portrait.webp', width: 900, height: 1200, categories: ['My Journey as a Guide', 'Happy Travelers', 'Authenticity'], caption: 'Your local Berber guide', captionKey: 'gallery_cap17' },
  // --- Landscapes (cities, mountains, coast) ---
  { src: '/images/dest/marrakech.webp', width: 612, height: 406, categories: ['Landscapes'], caption: 'Marrakech — the Red City', captionKey: 'gallery_cap18' },
  { src: '/images/dest/fes.webp', width: 1600, height: 1067, categories: ['Landscapes', 'Culture'], caption: 'Fes — the leather souk in the old medina', captionKey: 'gallery_cap46' },
  { src: '/images/dest/chefchaouen.webp', width: 1050, height: 1400, categories: ['Landscapes'], caption: 'Chefchaouen — the Blue Pearl', captionKey: 'gallery_cap20' },
  { src: '/images/dest/rabat.webp', width: 1200, height: 932, categories: ['Landscapes'], caption: 'Rabat — Kasbah of the Udayas', captionKey: 'gallery_cap22' },
  { src: '/images/hero/medina-pano.webp', width: 900, height: 1350, categories: ['Landscapes', 'Culture'], caption: 'The Marrakech souks from above', captionKey: 'gallery_cap47' },
  { src: '/images/hero/atlas-pano.webp', width: 1400, height: 776, categories: ['Landscapes'], caption: 'A kasbah gateway on the road through the High Atlas', captionKey: 'gallery_cap48' },
  { src: '/images/dest/ait-ben-haddou.webp', width: 933, height: 1400, categories: ['Landscapes', 'Culture'], caption: 'Aït Benhaddou — the ancient ksar', captionKey: 'gallery_cap25' },
  { src: '/images/dest/dades-valley.webp', width: 612, height: 408, categories: ['Landscapes'], caption: 'The winding Dades Valley road', captionKey: 'gallery_cap26' },
  { src: '/images/dest/todra-gorge.webp', width: 931, height: 1400, categories: ['Landscapes'], caption: 'The towering Todra Gorge', captionKey: 'gallery_cap27' },
  { src: '/images/dest/imlil.webp', width: 1200, height: 641, categories: ['Landscapes'], caption: 'Imlil — heart of the High Atlas', captionKey: 'gallery_cap28' },
  { src: '/images/dest/ourika-valley.webp', width: 1200, height: 896, categories: ['Landscapes'], caption: 'The green Ourika Valley', captionKey: 'gallery_cap29' },
  { src: '/images/dest/essaouira.webp', width: 1200, height: 568, categories: ['Landscapes'], caption: 'Essaouira — the windy harbour', captionKey: 'gallery_cap30' },
  { src: '/images/dest/legzira.webp', width: 675, height: 900, categories: ['Landscapes'], caption: 'The red arches of Legzira', captionKey: 'gallery_cap31' },
  { src: '/images/dest/taghazout.webp', width: 940, height: 560, categories: ['Landscapes'], caption: 'Taghazout — the surf village', captionKey: 'gallery_cap32' },
  { src: '/images/dest/agadir.webp', width: 612, height: 408, categories: ['Landscapes'], caption: 'The sweeping bay of Agadir', captionKey: 'gallery_cap33' },
  { src: '/images/dest/mirleft.webp', width: 1200, height: 800, categories: ['Landscapes'], caption: 'The quiet cliffs of Mirleft', captionKey: 'gallery_cap34' },
  // --- Culture & Food ---
  { src: '/images/food/tea.webp', width: 1000, height: 1000, categories: ['Culture', 'Food'], caption: 'Sweet Moroccan mint tea', captionKey: 'gallery_cap35' },
  { src: '/images/food/tagine.webp', width: 675, height: 1200, categories: ['Food'], caption: 'A slow-cooked traditional tagine', captionKey: 'gallery_cap36' },
  { src: '/images/food/couscous.webp', width: 800, height: 449, categories: ['Food'], caption: 'Friday couscous', captionKey: 'gallery_cap37' },
  { src: '/images/food/pastries.webp', width: 794, height: 530, categories: ['Food'], caption: 'Fresh Moroccan pastries', captionKey: 'gallery_cap38' },
  { src: '/images/food/streetfood.webp', width: 1200, height: 753, categories: ['Food'], caption: 'Street food in the medina', captionKey: 'gallery_cap39' },
];

const VIDEOS: VideoItem[] = [
  { src: '/videos/dunes-camels.mp4', poster: '/images/personal/dunes-camels-poster.webp', title: 'Lost in the Dunes', titleKey: 'gallery_vid1_title', category: 'Camel Trekking', portrait: true },
  { src: '/videos/sahara-experience.mp4', poster: '/images/personal/luxury-camp-dusk.webp', title: 'Experience the Sahara', titleKey: 'gallery_vid2_title', category: 'Desert' },
  { src: '/videos/merzouga-campfire.mp4', poster: '/images/dest/merzouga.webp', title: 'Campfire Nights in Merzouga', titleKey: 'gallery_vid3_title', category: 'Culture' },
  { src: '/videos/hero.mp4', poster: '/images/hero/sahara-camel-riders-poster.webp', title: 'Morocco — A Cinematic Journey', titleKey: 'gallery_vid4_title', category: 'Desert', portrait: true },
  { src: '/videos/ait-benhaddou-kasbah-unesco-morocco.mp4', poster: '/images/dest/ait-ben-haddou.webp', title: 'Aït Ben Haddou at Golden Hour', titleKey: 'gallery_vid5_title', category: 'Landscapes' },
  { src: '/videos/chefchaouen-blue-city-morocco.mp4', poster: '/images/dest/chefchaouen.webp', title: 'The Blue Pearl', titleKey: 'gallery_vid6_title', category: 'Landscapes' },
  { src: '/videos/sahara-desert-camel-trek-atlas-mountains-morocco.mp4', poster: '/images/personal/dunes-camels-poster.webp', title: 'Camel Trek Across the Dunes', titleKey: 'gallery_vid7_title', category: 'Camel Trekking' },
];

// The curated order the owner requested. A category is only shown when it
// actually contains photos or films, so empty groups never appear.
const CATEGORY_ORDER = [
  'Desert',
  'Luxury Camp',
  'Camel Trekking',
  'Quad Adventure',
  'Happy Travelers',
  'Landscapes',
  'Culture',
  'Food',
  'My Journey as a Guide',
  'Authenticity',
];

// Category strings double as internal filter identifiers (matched against
// IMAGES/VIDEOS data above), so they stay in English — this maps each one to
// its translated display label instead.
const CATEGORY_LABEL_KEYS: Record<string, string> = {
  All: 'gallery_cat_all',
  Desert: 'gallery_cat_desert',
  'Luxury Camp': 'gallery_cat_luxury_camp',
  'Camel Trekking': 'gallery_cat_camel_trekking',
  'Quad Adventure': 'gallery_cat_quad',
  'Happy Travelers': 'gallery_cat_happy_travelers',
  Landscapes: 'gallery_cat_landscapes',
  Culture: 'gallery_cat_culture',
  Food: 'gallery_cat_food',
  'My Journey as a Guide': 'gallery_cat_guide_journey',
  Authenticity: 'gallery_cat_authenticity',
};

const usedCategories = new Set<string>();
IMAGES.forEach((i) => i.categories.forEach((c) => usedCategories.add(c)));
VIDEOS.forEach((v) => usedCategories.add(v.category));
const CATEGORIES = ['All', ...CATEGORY_ORDER.filter((c) => usedCategories.has(c))];

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? IMAGES : IMAGES.filter((i) => i.categories.includes(activeCategory))),
    [activeCategory]
  );

  const filteredVideos = useMemo(
    () => (activeCategory === 'All' ? VIDEOS : VIDEOS.filter((v) => v.category === activeCategory)),
    [activeCategory]
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  // Reset the lightbox when the filter changes so the index stays valid.
  useEffect(() => setLightboxIndex(null), [activeCategory]);

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
      else if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filtered.length]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[55vh] w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero/atlas-pano.webp" width={1400} height={776} alt="Moroccan kasbah gateway on a desert road with the snow-capped High Atlas behind" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-5 block">{t('gallery_eyebrow')}</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-xl">{t('gallery_title')}</h1>
            <p className="text-white/85 text-lg md:text-xl font-light leading-relaxed">
              {t('gallery_hero_sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters — sticky below the fixed navbar */}
      <section className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 md:gap-3 overflow-x-auto py-4 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {t(CATEGORY_LABEL_KEYS[cat] ?? cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      {filtered.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
              <AnimatePresence>
                {filtered.map((item, index) => (
                  <motion.button
                    layout
                    key={item.src}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => openLightbox(index)}
                    className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img
                      src={item.src}
                      alt={t(item.captionKey)}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">{t(CATEGORY_LABEL_KEYS[item.categories[0]] ?? item.categories[0])}</span>
                      <span className="text-white font-serif text-lg leading-tight drop-shadow">{t(item.captionKey)}</span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* Official photo library — the ACTUAL photographs from the official PDF */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Library className="w-9 h-9 text-primary mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">{t('lib_h2')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">{t('lib_sub')}</p>
          </div>
          <LibraryPhotoGrid photos={publishableLibraryPhotos()} aspect="h-60 md:h-72" />
        </div>
      </section>

      {/* Videos */}
      {filteredVideos.length > 0 && (
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('gallery_in_motion')}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">{t('gallery_films_heading')}</h2>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] max-w-5xl mx-auto">
              {filteredVideos.map((video) => (
                <div key={video.src} className="group relative mb-6 break-inside-avoid rounded-3xl overflow-hidden border border-border shadow-lg bg-black">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    muted
                    playsInline
                    preload="none"
                    className={`w-full ${video.portrait ? 'aspect-[9/16]' : 'aspect-video'} object-cover`}
                    aria-label={t(video.titleKey)}
                  />
                  <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2 items-start">
                    <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <Play className="w-3 h-3 fill-current" /> {t(video.titleKey)}
                    </span>
                    <span className="inline-flex bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {t(CATEGORY_LABEL_KEYS[video.category] ?? video.category)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <Instagram className="w-10 h-10 text-primary mx-auto mb-5" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t('gallery_follow')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('gallery_insta_sub')}
          </p>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg"
          >
            <Instagram className="w-5 h-5" /> @morocco_grand_adventure
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(activeItem.captionKey)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label={t('gallery_lightbox_close')}
              className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label={t('gallery_lightbox_prev')}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label={t('gallery_lightbox_next')}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            <motion.div
              key={activeItem.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeItem.src} alt={t(activeItem.captionKey)} className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl" />
              <div className="text-center mt-4">
                <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">{t(CATEGORY_LABEL_KEYS[activeItem.categories[0]] ?? activeItem.categories[0])}</span>
                <span className="text-white font-serif text-xl">{t(activeItem.captionKey)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
