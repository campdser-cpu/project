import { useRoute } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { getLocalizedDestination, getLocalizedDestinations, getLocalizedTours, categoryLabel } from '@/i18n/content';
import NotFound from './not-found';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Star, Sun, CloudSun, MapPin, UtensilsCrossed, BedDouble } from 'lucide-react';
import { Link } from 'wouter';
import { StructuredData, buildDestinationSchema } from '../components/seo/StructuredData';
import { CinematicVideo } from '../components/ui/CinematicVideo';
import { MoroccoMap } from '../components/MoroccoMap';

export default function DestinationDetail() {
  const { t, lang } = useLanguage();
  const [match, params] = useRoute('/destinations/:id');
  
  if (!match || !params?.id) return <NotFound />;
  
  const destination = getLocalizedDestination(params.id, lang);
  
  if (!destination) return <NotFound />;

  const nearbyDestinations = getLocalizedDestinations(lang).filter(d => d.id !== destination.id).slice(0, 3);

  return (
    <Layout>
      {/* Schema.org structured data: TouristAttraction, Breadcrumb */}
      <StructuredData id="destination" data={buildDestinationSchema(destination, lang)} />

      {/* Hero */}
      <section className="relative h-[70vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={destination.image} 
            alt={`${destination.name}, Morocco — ${destination.shortDesc}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">
              {categoryLabel(destination.category, lang)}
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 drop-shadow-xl">
              {destination.name}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Main Content */}
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl text-foreground mb-6">{t('dest_about')} {destination.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                {destination.description}
                <br /><br />
                {t('dest_about_text')}
              </p>
              
              {/* Curated photo gallery (Image-SEO pack) — only rendered when
                  the destination has curated imagery in the canonical data. */}
              {destination.gallery && destination.gallery.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-serif text-3xl text-foreground mb-3">
                    {destination.name} {t('dest_pictures_title')}
                  </h3>
                  <div className={`grid gap-6 ${destination.gallery.length > 1 ? 'md:grid-cols-2' : ''}`}>
                    {destination.gallery.map(photo => (
                      <figure key={photo.src} className="rounded-3xl overflow-hidden shadow-lg border border-border bg-card">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-72 md:h-96 object-cover"
                        />
                        <figcaption className="px-5 py-4 text-sm text-muted-foreground">{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* NEW: Local Food Section */}
              <div className="mb-16">
                <h3 className="font-serif text-3xl text-foreground mb-6 flex items-center gap-3">
                  <UtensilsCrossed className="w-8 h-8 text-primary" /> {t('dest_local_food')} {destination.name}
                </h3>
                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto">
                    <img src={`/images/food/${['tagine','couscous','streetfood','pastries','tea'][destination.id.length % 5]}.webp`} alt={`Traditional food in ${destination.name}`} loading="lazy" decoding="async" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/food/tagine.webp'; }} />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h4 className="font-bold text-xl mb-4">{t('dest_culinary')}</h4>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <div>
                          <span className="font-bold text-foreground text-sm block">{t('dest_food_tagine')}</span>
                          <span className="text-sm text-muted-foreground">{t('dest_food_tagine_desc')}</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <div>
                          <span className="font-bold text-foreground text-sm block">{t('dest_food_mint_tea')}</span>
                          <span className="text-sm text-muted-foreground">{t('dest_food_mint_tea_desc')}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Merzouga: Campfire Video Section */}
              {destination.id === 'merzouga' && (
                <div className="mb-16">
                  <h3 className="font-serif text-3xl text-foreground mb-3 flex items-center gap-3">
                    🔥 {t('dest_campfire')}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t('dest_campfire_sub')}
                  </p>
                  <CinematicVideo
                    src="/videos/merzouga-campfire.mp4"
                    poster="/images/dest/merzouga.webp"
                    alt="Evening campfire scene in the Sahara Desert near Merzouga, Morocco"
                    title={t('dest_merzouga_caption')}
                    aspectClass="aspect-video"
                  />
                </div>
              )}

              {/* Aït Ben Haddou: Cinematic Video Section */}
              {destination.id === 'ait-ben-haddou' && (
                <div className="mb-16">
                  <h3 className="font-serif text-3xl text-foreground mb-3 flex items-center gap-3">
                    🏰 Aït Ben Haddou in Motion
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Watch the UNESCO-listed ksar glow at golden hour — red-earth towers, Amazigh artisans, and centuries of history carved in clay.
                  </p>
                  <CinematicVideo
                    src="/videos/ait-benhaddou-kasbah-unesco-morocco.mp4"
                    poster="/images/dest/ait-ben-haddou.webp"
                    alt="Aït Ben Haddou UNESCO kasbah at sunset with local Amazigh artisans, Morocco"
                    title="Aït Ben Haddou"
                    subtitle="A living UNESCO kasbah where Amazigh artisans still shape clay by hand."
                  />
                </div>
              )}

              {/* Chefchaouen: Cinematic Video Section */}
              {destination.id === 'chefchaouen' && (
                <div className="mb-16">
                  <h3 className="font-serif text-3xl text-foreground mb-3 flex items-center gap-3">
                    💙 Chefchaouen — The Blue Pearl
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Wander the blue-painted streets and stairways of Morocco's most photogenic town, nestled in the Rif Mountains.
                  </p>
                  <CinematicVideo
                    src="/videos/chefchaouen-blue-city-morocco.mp4"
                    poster="/images/dest/chefchaouen.webp"
                    alt="Blue-painted streets and stairways of Chefchaouen, Morocco's Blue Pearl"
                    title="Chefchaouen"
                    subtitle="The Blue Pearl — what are you waiting for to discover this dreamlike town?"
                  />
                </div>
              )}

              {/* Merzouga: The dunes by day & night — real desert imagery */}
              {destination.id === 'merzouga' && (
                <div className="mb-16">
                  <h3 className="font-serif text-3xl text-foreground mb-3 flex items-center gap-3">
                    ✨ The Dunes, Day &amp; Night
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    From golden light rolling across Erg Chebbi at sunrise to a sky ablaze with stars after dark — this is why travelers never forget a night in Merzouga.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border group">
                      <img
                        src="/images/personal/sahara-dunes-golden.webp"
  width={960}
  height={1200}
                        alt="Golden sand dunes of Erg Chebbi at sunrise near Merzouga"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-5 text-white font-serif text-lg drop-shadow">{t('dest_photo_sunrise')}</span>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border group">
                      <img
                        src="/images/stock/stargazing-merzouga.webp"
  width={801}
  height={1200}
                        alt="The Milky Way over the Sahara Desert at night near Merzouga"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-5 text-white font-serif text-lg drop-shadow">{t('dest_photo_stargazing')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW: Hotels & Riads Section */}
              <div className="mb-12">
                <h3 className="font-serif text-3xl text-foreground mb-6 flex items-center gap-3">
                  <BedDouble className="w-8 h-8 text-primary" /> {t('dest_luxury_stays')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((num) => (
                    <div key={num} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                      <div className="h-48 overflow-hidden relative">
                        <img src={`/images/riad/${num === 1 ? 'courtyard' : 'bedroom'}.webp`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={t('dest_riad_alt')} loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src = '/images/riad/rooftop.webp'; }} />
                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-foreground flex items-center gap-1">
                          <Star className="w-3 h-3 text-primary fill-current" /> 5.0
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-serif text-xl mb-1 text-foreground group-hover:text-primary transition-colors">{t('dest_riad_name')}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{t('dest_riad_sub')} {destination.name}.</p>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{t('dest_riad_price')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 w-full space-y-8">
              
              {/* Travel Info Card */}
              <div className="bg-card border border-border p-8 rounded-3xl shadow-lg">
                <h3 className="font-serif text-2xl text-foreground mb-6">{t('dest_travel_info')}</h3>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0"><Calendar className="w-5 h-5" /></div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block mb-1">{t('dest_best_time')}</span>
                      <span className="text-foreground font-medium">{destination.bestTime}</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground">
                    <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0"><Star className="w-5 h-5" /></div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block mb-1">{t('search_style')}</span>
                      <span className="text-foreground font-medium">{categoryLabel(destination.category, lang)}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* NEW: Weather Widget */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 p-8 rounded-3xl shadow-lg">
                <h3 className="font-serif text-xl text-foreground mb-6 flex items-center gap-2">
                  {t('dest_climate')} <Sun className="w-5 h-5 text-secondary" />
                </h3>
                <div className="flex items-end gap-4 mb-8">
                  <span className="font-sans text-6xl font-bold tracking-tighter text-foreground">24°</span>
                  <span className="text-xl text-muted-foreground font-medium mb-1">C</span>
                  <span className="text-sm text-muted-foreground ml-auto mb-2 text-right">{t('dest_weather_clear')}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center border-t border-border/50 pt-4">
                  {[
                    { d: 'Mon', t: '24°', i: Sun },
                    { d: 'Tue', t: '25°', i: Sun },
                    { d: 'Wed', t: '22°', i: CloudSun },
                    { d: 'Thu', t: '23°', i: Sun }
                  ].map(day => (
                    <div key={day.d} className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground mb-2">{day.d}</span>
                      <day.i className="w-5 h-5 text-secondary mb-2" />
                      <span className="text-sm font-bold">{day.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Map */}
              <div className="bg-card border border-border p-2 rounded-3xl shadow-lg">
                <h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {t('dest_view_map')}
                </h3>
                <div className="rounded-2xl overflow-hidden">
                  <MoroccoMap height={320} />
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">{t('dest_map_hint')}</p>
              </div>

              <div className="bg-muted p-8 rounded-3xl border border-border text-center">
                <h3 className="font-bold text-xl text-foreground mb-4">{t('dest_plan_visit')}</h3>
                <p className="text-muted-foreground mb-6 text-sm">Let our local experts plan the perfect itinerary including {destination.name}.</p>
                <Link href="/contact" className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md">
                  {t('dest_start_planning')}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Relevant Tours */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('section_tours_sub')}</span>
              <h2 className="font-serif text-4xl text-foreground">{t('dest_tours')} {destination.name}</h2>
            </div>
            <Link href="/tours" className="hidden md:flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors">
              {t('explore_tours')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getLocalizedTours(lang).slice(0, 3).map(tour => (
              <Link key={tour.id} href={`/tours/${tour.id}`} className="group block bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-500">
                <div className="h-56 relative overflow-hidden">
                  <img src={tour.image} srcSet={`${tour.image.replace(/\.webp$/, '-480w.webp')} 480w, ${tour.image.replace(/\.webp$/, '-768w.webp')} 768w, ${tour.image} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={tour.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 relative">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">{tour.duration}</span>
                  <h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors">{tour.name}</h3>
                  <div className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('tours_view')} <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Nearby Destinations */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-foreground">{t('dest_nearby')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyDestinations.map(dest => (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="group relative h-64 rounded-2xl overflow-hidden border border-transparent hover:border-primary/50 transition-all shadow-sm hover:shadow-xl">
                <img src={dest.image} srcSet={`${dest.image.replace(/\.webp$/, '-480w.webp')} 480w, ${dest.image.replace(/\.webp$/, '-768w.webp')} 768w, ${dest.image} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={dest.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-2xl mb-1">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    {t('explore')} <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}
