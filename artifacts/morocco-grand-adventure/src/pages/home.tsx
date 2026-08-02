import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Star, MapPin, CheckCircle2, ChevronRight, Calendar, Users, Globe, Instagram, Phone, Search, Award, ShieldCheck, Leaf } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { getLocalizedTours, getLocalizedDestinations, categoryLabel } from '@/i18n/content';
import { SiWhatsapp } from 'react-icons/si';
import { PromoBanner } from '../components/promo/PromoBanner';
import { PromoBadge } from '../components/promo/PromoBadge';
import { PriceTag } from '../components/promo/PriceTag';

/** Lazy-load the Leaflet map so its ~150 kB chunk (+ OpenStreetMap tiles) is
 *  only fetched once the map approaches the viewport — the homepage stays
 *  light for the all-important first paint. */
const MoroccoMap = lazy(() =>
  import('../components/MoroccoMap').then((m) => ({ default: m.MoroccoMap })),
);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

/** Mounts the interactive map only when it nears the viewport, with a
 *  themed skeleton placeholder before that. */
function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const fallback = (
    <div
      className="h-[520px] md:h-[560px] rounded-3xl border border-border bg-muted animate-pulse"
      aria-hidden="true"
    />
  );

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={fallback}>
          <MoroccoMap height={560} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

const signaturePlaces = [
  {
    name: "Merzouga Desert",
    description: "Golden dunes, camel rides, and unforgettable sunsets.",
    image: "/images/dest/merzouga.jpg",
  },
  {
    name: "Luxury Desert Camp",
    description: "Private tents, fine dining, and luxury under the stars.",
    image: "/images/personal/luxury-camp-dusk.jpg",
  },
  {
    name: "Atlas Mountains",
    description: "Scenic drives, valleys, and authentic Berber villages.",
    image: "/images/dest/dades-valley.jpg",
  },
  {
    name: "Draa Valley",
    description: "Palm groves, kasbahs, and dramatic desert landscapes.",
    image: "/images/dest/draa-valley.jpg",
  },
  {
    name: "Marrakech",
    description: "Jemaa el-Fnaa, souks, colors, and vibrant city energy.",
    image: "/images/dest/marrakech.jpg",
  },
  {
    name: "Todra Gorge",
    description: "Towering cliffs and one of Morocco's most iconic canyons.",
    image: "/images/dest/todra-gorge.jpg",
  },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const [, setLocation] = useLocation();
  const tours = getLocalizedTours(lang);
  const destinations = getLocalizedDestinations(lang);

  // Search State
  const [searchCity, setSearchCity] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [searchStyle, setSearchStyle] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchDuration) params.set('duration', searchDuration);
    if (searchStyle) params.set('style', searchStyle);
    const query = params.toString();
    setLocation(query ? `/tours?${query}` : '/tours');
  };

  return (
    <Layout>
      {/* Hero Section — Cinematic Video */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeIn" as const }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero/desert-pano.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Cinematic video of the Morocco Sahara Desert with golden dunes at sunset"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <img src="/images/hero/desert-pano.jpg" alt="Morocco Sahara Desert golden dunes at sunset" className="w-full h-full object-cover" />
          </video>
          {/* Layered cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" as const }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="text-primary font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-8 block drop-shadow-md"
            >
              {t('hero_tagline')}
            </motion.span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] text-white mb-5 md:mb-6 leading-[1.05] drop-shadow-2xl">
              {t('hero_heading1')}<br />{t('hero_heading2')}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="text-white/80 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-8 md:mb-12 font-light tracking-wide px-4"
            >
              {t('hero_subtext')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            >
              <Link
                href="/tours"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-widest uppercase hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)]"
              >
                {t('hero_cta_tours')}
              </Link>
              <Link
                href="/trip-builder"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/40 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-widest uppercase hover:bg-white/20 hover:border-white/70 transition-all hover:-translate-y-1 flex items-center justify-center text-center"
              >
                {t('hero_cta_plan')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs tracking-[0.3em] uppercase font-medium">{t('hero_scroll')}</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* Tour Search Bar */}
      <section className="relative z-20 -mt-16 container mx-auto px-4 max-w-6xl hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-background/80 backdrop-blur-xl border border-border shadow-2xl p-6 rounded-2xl"
        >
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="flex-1 border-r border-border pr-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">{t('search_starting_point')}</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <select 
                  value={searchCity} 
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-transparent text-foreground font-medium focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">{t('search_any_city')}</option>
                  <option value="marrakech">Marrakech</option>
                  <option value="casablanca">Casablanca</option>
                  <option value="tangier">Tangier</option>
                  <option value="fes">Fes</option>
                </select>
              </div>
            </div>
            
            <div className="flex-1 border-r border-border px-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">{t('search_duration')}</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <select 
                  value={searchDuration} 
                  onChange={(e) => setSearchDuration(e.target.value)}
                  className="w-full bg-transparent text-foreground font-medium focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">{t('search_any_duration')}</option>
                  <option value="1-2">1-2 {t('days')}</option>
                  <option value="3-4">3-4 {t('days')}</option>
                  <option value="5-7">5-7 {t('days')}</option>
                  <option value="8-14">8-14 {t('days')}</option>
                </select>
              </div>
            </div>

            <div className="flex-1 px-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">{t('search_style')}</label>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <select 
                  value={searchStyle} 
                  onChange={(e) => setSearchStyle(e.target.value)}
                  className="w-full bg-transparent text-foreground font-medium focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">{t('search_any_style')}</option>
                  <option value="desert">{t('search_style_desert')}</option>
                  <option value="imperial">{t('search_style_imperial')}</option>
                  <option value="mountains">{t('search_style_mountains')}</option>
                  <option value="coastal">{t('search_style_coastal')}</option>
                </select>
              </div>
            </div>

            <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-primary/90 transition-colors flex items-center gap-2 shrink-0 h-full">
              <Search className="w-5 h-5" /> {t('search_find_tour')}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Trust Indicators — Subtle Strip */}
      <section className="bg-background py-8 md:py-10 border-b border-border z-10 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center items-center gap-6 md:gap-16 opacity-60">
            <div className="flex flex-col items-center gap-1.5 group">
              <Award className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-bold text-foreground tracking-wide text-center" dangerouslySetInnerHTML={{__html: t('award_best_operator').replace(' ', '<br/>')}}></span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group">
              <Star className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-bold text-foreground tracking-wide text-center" dangerouslySetInnerHTML={{__html: t('award_tripadvisor').replace(' ', '<br/>')}}></span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-bold text-foreground tracking-wide text-center" dangerouslySetInnerHTML={{__html: t('award_trusted').replace(' ', '<br/>')}}></span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group">
              <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-bold text-foreground tracking-wide text-center" dangerouslySetInnerHTML={{__html: t('award_licensed').replace(' ', '<br/>')}}></span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group col-span-3 md:col-span-1">
              <Leaf className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] md:text-xs font-bold text-foreground tracking-wide text-center" dangerouslySetInnerHTML={{__html: t('award_eco').replace(' ', '<br/>')}}></span>
            </div>
          </div>
        </div>
      </section>

      {/* Limited-time 2026 promotion */}
      <PromoBanner />

      {/* Signature Morocco — Cinematic Destinations */}
      <section className="py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">
              Signature Morocco
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Real places, cinematic presentation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              A premium visual journey through Morocco's most iconic destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {signaturePlaces.map((place, index) => (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative h-72 md:h-[420px] overflow-hidden rounded-3xl shadow-xl border border-white/10"
              >
                <img
                  src={place.image}
                  alt={`${place.name} — ${place.description}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                  <div className="mb-2 md:mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
                    Morocco
                  </div>
                  <h3 className="font-serif text-xl md:text-3xl mb-2 md:mb-3 drop-shadow-lg">
                    {place.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12 md:mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('section_destinations_sub')}</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground">{t('section_destinations')}</h2>
            </motion.div>
            <Link href="/destinations" className="hidden md:flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors">
              {t('view_all')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          >
            {destinations.slice(0, 6).map((dest) => (
              <motion.div key={dest.id} variants={fadeInUp} className="group relative h-72 md:h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-transparent hover:border-primary/50">
                <Link href={`/destinations/${dest.id}`} className="absolute inset-0 z-10" aria-label={`Explore ${dest.name}`} />
                <img src={dest.image} alt={`${dest.name} — ${dest.shortDesc}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-5 md:p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-primary text-xs font-bold tracking-wider uppercase mb-2 block drop-shadow-md">{categoryLabel(dest.category, lang)}</span>
                  <h3 className="font-serif text-xl md:text-2xl mb-1 drop-shadow-md">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-primary">
                    {t('explore')} <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Morocco Map — real Leaflet + OpenStreetMap */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('section_destinations_sub')}</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('section_map')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">{t('section_map_sub')}</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <MapSection />
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('section_tours_sub')}</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground">{t('section_tours')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {tours.map((tour, index) => (
              <motion.div 
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-border hover:border-primary/50"
              >
                <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                  <img src={tour.image} alt={`${tour.name} — ${tour.duration} private Morocco tour`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-border">
                    {tour.duration}
                  </div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <PromoBadge />
                  </div>
                </div>
                <div className="md:w-3/5 p-5 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors">{tour.name}</h3>
                    <ul className="space-y-2 mb-4 md:mb-6">
                      {tour.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">{t('from')}</span>
                      <PriceTag price={tour.price} size="md" />
                    </div>
                    <Link href={`/tours/${tour.id}`} className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-5 md:px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md group-hover:shadow-lg">
                      {t('tours_view')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <Link href="/tours" className="inline-flex items-center gap-2 border-b-2 border-primary text-foreground font-bold pb-1 hover:text-primary transition-colors">
              {t('explore_tours')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience the Sahara — Cinematic Video */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-card border-y border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Experience the Sahara</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">Where the desert comes alive</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Press play and step into the golden dunes of Merzouga — the silence, the light, and the magic of a night beneath a sky full of stars.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border bg-black"
          >
            <video
              src="/videos/sahara-experience.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/images/personal/luxury-camp-dusk.jpg"
              aria-label="Cinematic film of the Sahara desert experience near Merzouga"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
          <div className="text-center mt-8 md:mt-10">
            <Link href="/tours" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg">
              {t('hero_cta_tours')} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Desert Experience full width */}
      <section className="relative py-24 md:py-40 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/personal/luxury-camp-dusk.jpg" alt="Luxury Desert Camp" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex justify-center md:justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-background/95 backdrop-blur-md p-6 md:p-14 rounded-3xl max-w-xl shadow-2xl border border-white/10"
          >
            <Star className="w-8 h-8 text-primary mb-4 md:mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6">{t('section_luxury_camp')}</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              {t('section_luxury_camp_sub')}
            </p>
            <Link href="/contact" className="inline-block bg-primary text-primary-foreground px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              {t('book_experience')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 lg:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('section_why_us')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">{t('section_why_sub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { t: t('why_local_experts'), i: MapPin },
              { t: t('why_private_tours'), i: Star },
              { t: t('why_multilingual'), i: Users },
              { t: t('why_luxury_riads'), i: CheckCircle2 },
              { t: t('why_pricing'), i: ShieldCheck },
              { t: t('why_support'), i: Phone }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 md:p-8 bg-card rounded-3xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                  <feature.i className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base md:text-lg mb-2">{feature.t}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('section_reviews_sub')}</span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('section_reviews')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { img: "1", name: "Sarah Jenkins", country: "🇬🇧", quote: "The 7-day desert tour exceeded all expectations. Our guide Hassan was incredibly knowledgeable. Sleeping under the stars in Merzouga is an experience I will never forget.", tour: "7-Day Imperial Cities & Sahara Escape" },
              { img: "2", name: "David Chen", country: "🇺🇸", quote: "Flawless organization from start to finish. The luxury riads chosen for us in Fes and Marrakech were stunning. The attention to detail made this trip truly special.", tour: "5-Day Imperial Cities & Desert" },
              { img: "3", name: "Amara & James", country: "🇨🇦", quote: "We booked the honeymoon package and it was pure magic. A private dinner in the desert, a hot air balloon over Marrakech... every day brought a new beautiful surprise.", tour: "Honeymoon Morocco Package" },
              { img: "4", name: "Robert Müller", country: "🇩🇪", quote: "As a photography enthusiast, this trip was paradise. The pacing was perfect, allowing time to truly appreciate the landscapes. Highly recommend their bespoke services.", tour: "3-Day Luxury Sahara Tour" },
              { img: "5", name: "Priya Patel", country: "🇦🇺", quote: "Traveling as a solo woman, safety was my priority. I felt completely cared for the entire time. The hospitality of the Berber people is something extraordinary.", tour: "5-Day Imperial Cities & Desert" },
              { img: "6", name: "Carlos Rivera", country: "🇪🇸", quote: "From the bustling medina of Fes to the quiet of the Atlas mountains, the contrasts of Morocco were presented beautifully by our expert driver.", tour: "7-Day Imperial Cities & Sahara Escape" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-primary/20">
                  <Star className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                </div>
                <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/15 text-primary font-serif text-lg md:text-xl font-bold flex items-center justify-center border-2 border-primary/20 shrink-0" aria-hidden="true">
                    {review.name.split(' ').filter(w => /[A-Za-z]/.test(w[0])).map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base md:text-lg">{review.name} <span className="text-sm md:text-base">{review.country}</span></h4>
                    <div className="flex text-primary gap-0.5 mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-5 md:mb-6 relative z-10 text-sm leading-relaxed">
                  "{review.quote}"
                </p>
                <div className="text-xs font-bold text-primary tracking-wide uppercase border-t border-border pt-4 relative z-10">
                  {review.tour}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Journey — Elegant CTA */}
      <section id="planner" className="py-20 md:py-32 lg:py-40 bg-muted border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-background rounded-3xl p-6 md:p-16 shadow-xl border border-border relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('section_planner')}</h2>
              <p className="text-muted-foreground mb-8 md:mb-10 max-w-xl mx-auto text-base md:text-lg">{t('section_planner_sub')}</p>
              <Link href="/trip-builder" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 md:px-10 py-3.5 md:py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] hover:-translate-y-1">
                {t('section_planner_cta')} <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IG Gallery */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('section_instagram')}</h2>
          <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline mb-8 md:mb-12 inline-block">@medmorocco_tours</a>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/personal/guests-sunset.webp", alt: "Morocco Grand Adventure guests watching a Sahara sunset" },
              { src: "/images/personal/group-atlas.jpg", alt: "Tour group in the Atlas Mountains, Morocco" },
              { src: "/images/personal/luxury-camp-dusk.jpg", alt: "Luxury desert camp at dusk near Merzouga" },
              { src: "/images/personal/guests-van.jpg", alt: "Morocco Grand Adventure guests with tour van" },
            ].map((item, num) => (
              <div key={num} className="aspect-square relative group overflow-hidden rounded-xl border border-border">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
