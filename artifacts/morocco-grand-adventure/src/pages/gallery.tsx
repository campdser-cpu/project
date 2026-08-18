import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { contactInfo } from '@/data/content';
import { X, ChevronLeft, ChevronRight, Play, Instagram } from 'lucide-react';

type GalleryItem = {
  src: string;
  categories: string[];
  caption: string;
};

type VideoItem = {
  src: string;
  poster: string;
  title: string;
  category: string;
  portrait?: boolean;
};

// Every image is tagged with one or more categories. New photos added here are
// grouped automatically — a category filter only appears when at least one image
// (or video) belongs to it, so the gallery scales without any layout changes.
const IMAGES: GalleryItem[] = [
  // --- Desert & Sahara ---
  { src: '/images/personal/sahara-dunes-golden.jpg', categories: ['Desert', 'Landscapes', 'Authenticity'], caption: 'Golden dunes at sunrise over Erg Chebbi' },
  { src: '/images/dest/merzouga.jpg', categories: ['Desert'], caption: 'Merzouga — Erg Chebbi Dunes' },
  { src: '/images/dest/erg-chebbi.jpg', categories: ['Desert'], caption: 'The golden sands of Erg Chebbi' },
  { src: '/images/dest/zagora.jpg', categories: ['Desert'], caption: 'Zagora — gateway to the desert' },
  { src: '/images/dest/draa-valley.jpg', categories: ['Desert', 'Landscapes'], caption: 'The palm groves of the Draa Valley' },
  { src: '/images/hero/desert-pano.jpg', categories: ['Desert', 'Landscapes'], caption: 'The Sahara at sunset' },
  { src: '/images/stock/stargazing-merzouga.jpg', categories: ['Desert', 'Luxury Camp'], caption: 'Stargazing beneath the Milky Way' },
  // --- Luxury Camp & Stays ---
  { src: '/images/personal/luxury-camp-dusk.jpg', categories: ['Luxury Camp', 'Desert', 'Authenticity'], caption: 'Our luxury desert camp at dusk' },
  { src: '/images/riad/courtyard.jpg', categories: ['Luxury Camp', 'Culture'], caption: 'A traditional riad courtyard' },
  { src: '/images/riad/bedroom.jpg', categories: ['Luxury Camp'], caption: 'A luxury riad suite' },
  { src: '/images/riad/rooftop.jpg', categories: ['Luxury Camp'], caption: 'Rooftop views over the medina' },
  // --- Happy Travelers ---
  { src: '/images/personal/guide-guest-tea.jpg', categories: ['Happy Travelers', 'Culture', 'My Journey as a Guide', 'Authenticity'], caption: 'Sharing sweet mint tea with a guest in the dunes' },
  { src: '/images/personal/group-atlas.jpg', categories: ['Happy Travelers', 'Authenticity'], caption: 'Happy travelers in the Atlas' },
  { src: '/images/personal/guests-sunset.webp', categories: ['Happy Travelers', 'Desert', 'Authenticity'], caption: 'A Sahara sunset with our guests' },
  { src: '/images/personal/guests-van.jpg', categories: ['Happy Travelers', 'Authenticity'], caption: 'On the road together' },
  { src: '/images/personal/riad-tea.jpg', categories: ['Happy Travelers', 'Culture', 'Authenticity'], caption: 'Sharing tea on the terrace' },
  // --- My Journey as a Guide ---
  { src: '/images/personal/guide-portrait.jpg', categories: ['My Journey as a Guide', 'Happy Travelers', 'Authenticity'], caption: 'Your local Berber guide' },
  // --- Landscapes (cities, mountains, coast) ---
  { src: '/images/dest/marrakech.jpg', categories: ['Landscapes'], caption: 'Marrakech — the Red City' },
  { src: '/images/dest/fes.jpg', categories: ['Landscapes', 'Culture'], caption: 'Fes — the ancient tanneries' },
  { src: '/images/dest/chefchaouen.jpg', categories: ['Landscapes'], caption: 'Chefchaouen — the Blue Pearl' },
  { src: '/images/dest/meknes.jpg', categories: ['Landscapes'], caption: 'Meknes — Bab Mansour Gate' },
  { src: '/images/dest/rabat.jpg', categories: ['Landscapes'], caption: 'Rabat — Kasbah of the Udayas' },
  { src: '/images/hero/medina-pano.jpg', categories: ['Landscapes', 'Culture'], caption: 'Lanterns of the medina' },
  { src: '/images/hero/atlas-pano.jpg', categories: ['Landscapes'], caption: 'The High Atlas mountains' },
  { src: '/images/dest/ait-ben-haddou.jpg', categories: ['Landscapes', 'Culture'], caption: 'Aït Benhaddou — the ancient ksar' },
  { src: '/images/dest/dades-valley.jpg', categories: ['Landscapes'], caption: 'The winding Dades Valley road' },
  { src: '/images/dest/todra-gorge.jpg', categories: ['Landscapes'], caption: 'The towering Todra Gorge' },
  { src: '/images/dest/imlil.jpg', categories: ['Landscapes'], caption: 'Imlil — heart of the High Atlas' },
  { src: '/images/dest/ourika-valley.jpg', categories: ['Landscapes'], caption: 'The green Ourika Valley' },
  { src: '/images/dest/essaouira.jpg', categories: ['Landscapes'], caption: 'Essaouira — the windy harbour' },
  { src: '/images/dest/legzira.jpg', categories: ['Landscapes'], caption: 'The red arches of Legzira' },
  { src: '/images/dest/taghazout.jpg', categories: ['Landscapes'], caption: 'Taghazout — the surf village' },
  { src: '/images/dest/agadir.jpg', categories: ['Landscapes'], caption: 'The sweeping bay of Agadir' },
  { src: '/images/dest/mirleft.jpg', categories: ['Landscapes'], caption: 'The quiet cliffs of Mirleft' },
  // --- Culture & Food ---
  { src: '/images/food/tea.jpg', categories: ['Culture', 'Food'], caption: 'Sweet Moroccan mint tea' },
  { src: '/images/food/tagine.jpg', categories: ['Food'], caption: 'A slow-cooked traditional tagine' },
  { src: '/images/food/couscous.jpg', categories: ['Food'], caption: 'Friday couscous' },
  { src: '/images/food/pastries.jpg', categories: ['Food'], caption: 'Fresh Moroccan pastries' },
  { src: '/images/food/streetfood.jpg', categories: ['Food'], caption: 'Street food in the medina' },
];

const VIDEOS: VideoItem[] = [
  { src: '/videos/dunes-camels.mp4', poster: '/images/personal/dunes-camels-poster.jpg', title: 'Lost in the Dunes', category: 'Camel Trekking', portrait: true },
  { src: '/videos/sahara-experience.mp4', poster: '/images/personal/luxury-camp-dusk.jpg', title: 'Experience the Sahara', category: 'Desert' },
  { src: '/videos/merzouga-campfire.mp4', poster: '/images/dest/merzouga.jpg', title: 'Campfire Nights in Merzouga', category: 'Culture' },
  { src: '/videos/hero.mp4', poster: '/images/hero/desert-pano.jpg', title: 'Morocco — A Cinematic Journey', category: 'Desert' },
  { src: '/videos/ait-benhaddou-kasbah-unesco-morocco.mp4', poster: '/images/dest/ait-ben-haddou.jpg', title: 'Aït Ben Haddou at Golden Hour', category: 'Landscapes' },
  { src: '/videos/chefchaouen-blue-city-morocco.mp4', poster: '/images/dest/chefchaouen.jpg', title: 'The Blue Pearl', category: 'Landscapes' },
  { src: '/videos/morocco-imperial-cities-desert-oasis-tour.mp4', poster: '/images/hero/desert-pano.jpg', title: 'Morocco — A Journey of Contrasts', category: 'Landscapes' },
  { src: '/videos/sahara-desert-camel-trek-atlas-mountains-morocco.mp4', poster: '/images/personal/dunes-camels-poster.jpg', title: 'Camel Trek Across the Dunes', category: 'Camel Trekking' },
  { src: '/videos/sahara-desert-dunes-quad-biking-morocco.mp4', poster: '/images/dest/erg-chebbi.jpg', title: 'Quad Biking the Dunes', category: 'Quad Adventure' },
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

const usedCategories = new Set<string>();
IMAGES.forEach((i) => i.categories.forEach((c) => usedCategories.add(c)));
VIDEOS.forEach((v) => usedCategories.add(v.category));
const CATEGORIES = ['All', ...CATEGORY_ORDER.filter((c) => usedCategories.has(c))];

export default function Gallery() {
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
          <img src="/images/hero/desert-pano.jpg" alt="Morocco Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-5 block">Moments in Morocco</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-xl">The Gallery</h1>
            <p className="text-white/85 text-lg md:text-xl font-light leading-relaxed">
              Real photographs and films from our journeys — the desert, the camps, the people, and the moments that make Morocco unforgettable.
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
                {cat}
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
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">{item.categories[0]}</span>
                      <span className="text-white font-serif text-lg leading-tight drop-shadow">{item.caption}</span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* Videos */}
      {filteredVideos.length > 0 && (
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">In Motion</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Films from the Field</h2>
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
                    aria-label={video.title}
                  />
                  <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2 items-start">
                    <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <Play className="w-3 h-3 fill-current" /> {video.title}
                    </span>
                    <span className="inline-flex bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {video.category}
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
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Follow the Adventure</h2>
          <p className="text-muted-foreground mb-8">
            See the latest photos and stories from the road on Instagram — new memories added after every journey.
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
            aria-label={activeItem.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next"
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
              <img src={activeItem.src} alt={activeItem.caption} className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl" />
              <div className="text-center mt-4">
                <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">{activeItem.categories[0]}</span>
                <span className="text-white font-serif text-xl">{activeItem.caption}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
