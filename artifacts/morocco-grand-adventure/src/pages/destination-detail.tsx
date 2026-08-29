import { useRoute, Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { getLocalizedDestination, getLocalizedDestinations, getLocalizedTours, categoryLabel } from '@/i18n/content';
import NotFound from './not-found';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Star, Sun, CloudSun, MapPin, UtensilsCrossed, BedDouble } from 'lucide-react';
import { StructuredData, buildDestinationSchema } from '../components/seo/StructuredData';
import { CinematicVideo } from '../components/ui/CinematicVideo';
import { MoroccoMap } from '../components/MoroccoMap';

const AUTHORITY_LINKS: Record<string, string[]> = {
  marrakech: ['ait-ben-haddou', 'dades-valley', 'merzouga'],
  fes: ['merzouga', 'marrakech', 'chefchaouen'],
  'ait-ben-haddou': ['marrakech', 'dades-valley', 'merzouga'],
  'dades-valley': ['ait-ben-haddou', 'todra-gorge', 'merzouga'],
  merzouga: ['erg-chebbi', 'dades-valley', 'ait-ben-haddou'],
  'erg-chebbi': ['merzouga', 'dades-valley', 'todra-gorge'],
};

export default function DestinationDetail() {
  const { t, lang } = useLanguage();
  const [match, params] = useRoute('/destinations/:id');
  if (!match || !params?.id) return <NotFound />;
  const destination = getLocalizedDestination(params.id, lang);
  if (!destination) return <NotFound />;

  const destinations = getLocalizedDestinations(lang);
  const linkedIds = AUTHORITY_LINKS[destination.id] ?? [];
  const contextualDestinations = linkedIds.map(id => destinations.find(d => d.id === id)).filter(Boolean).slice(0, 3);
  const relevantTours = getLocalizedTours(lang).filter(tour => tour.routeIds?.includes(destination.id)).slice(0, 3);
  const nearbyDestinations = contextualDestinations.length > 0
    ? contextualDestinations
    : destinations.filter(d => d.id !== destination.id).slice(0, 3);

  return (
    <Layout>
      <StructuredData id="destination" data={buildDestinationSchema(destination, lang)} />
      <section className="relative h-[70vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src={destination.image} alt={`${destination.name} in Morocco`} width={1600} height={900} fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">{categoryLabel(destination.category, lang)}</span>
            <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 drop-shadow-xl">{destination.name}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl text-foreground mb-6">{t('dest_about')} {destination.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{destination.description}<br /><br />{t('dest_about_text')}</p>

              {(destination.id === 'marrakech' || destination.id === 'fes' || destination.id === 'merzouga') && (
                <div className="mb-12 rounded-3xl border border-border bg-card p-7 md:p-8">
                  <h3 className="font-serif text-3xl text-foreground mb-4">
                    {destination.id === 'merzouga' ? 'Merzouga and the Erg Chebbi Sahara' : `${destination.name} travel at a glance`}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.id === 'merzouga'
                      ? 'Merzouga is the gateway to Erg Chebbi. Existing tours on this site combine the dunes with camel trekking, a luxury desert camp and onward routes through southern Morocco.'
                      : destination.id === 'marrakech'
                        ? 'Marrakech is a major starting point for the site’s private Morocco journeys. Existing itineraries cross the High Atlas and continue through Aït Ben Haddou, Ouarzazate, Dades Valley and Merzouga.'
                        : 'Fes is a northern anchor for the site’s longer private itineraries. The existing Imperial Cities & Desert tour combines Fes with Merzouga, Marrakech, Meknès and Chefchaouen.'}
                  </p>
                </div>
              )}

              <div className="mb-16">
                <h3 className="font-serif text-3xl text-foreground mb-6 flex items-center gap-3"><UtensilsCrossed className="w-8 h-8 text-primary" /> {t('dest_local_food')} {destination.name}</h3>
                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto"><img src={`/images/food/${['tagine','couscous','streetfood','pastries','tea'][destination.id.length % 5]}.jpg`} alt={`Traditional food in ${destination.name}`} width={800} height={500} loading="lazy" decoding="async" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/food/tagine.jpg'; }} /></div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center"><h4 className="font-bold text-xl mb-4">{t('dest_culinary')}</h4><ul className="space-y-4"><li className="flex gap-3"><span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" /><div><span className="font-bold text-foreground text-sm block">{t('dest_food_tagine')}</span><span className="text-sm text-muted-foreground">{t('dest_food_tagine_desc')}</span></div></li><li className="flex gap-3"><span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" /><div><span className="font-bold text-foreground text-sm block">{t('dest_food_mint_tea')}</span><span className="text-sm text-muted-foreground">{t('dest_food_mint_tea_desc')}</span></div></li></ul></div>
                </div>
              </div>

              {destination.id === 'merzouga' && <div className="mb-16"><h3 className="font-serif text-3xl text-foreground mb-3 flex items-center gap-3">🔥 {t('dest_campfire')}</h3><p className="text-muted-foreground mb-6 leading-relaxed">{t('dest_campfire_sub')}</p><CinematicVideo src="/videos/merzouga-campfire.mp4" poster="/images/dest/merzouga.jpg" alt="Evening campfire scene in the Sahara Desert near Merzouga, Morocco" title={t('dest_merzouga_caption')} aspectClass="aspect-video" /></div>}
              {destination.id === 'ait-ben-haddou' && <div className="mb-16"><h3 className="font-serif text-3xl text-foreground mb-3">🏰 Aït Ben Haddou in Motion</h3><p className="text-muted-foreground mb-6 leading-relaxed">Watch the UNESCO-listed ksar glow at golden hour — red-earth towers, Amazigh artisans, and centuries of history carved in clay.</p><CinematicVideo src="/videos/ait-benhaddou-kasbah-unesco-morocco.mp4" poster="/images/dest/ait-ben-haddou.jpg" alt="Aït Ben Haddou UNESCO kasbah at sunset with local Amazigh artisans, Morocco" title="Aït Ben Haddou" subtitle="A living UNESCO kasbah where Amazigh artisans still shape clay by hand." /></div>}
              {destination.id === 'chefchaouen' && <div className="mb-16"><h3 className="font-serif text-3xl text-foreground mb-3">💙 Chefchaouen — The Blue Pearl</h3><p className="text-muted-foreground mb-6 leading-relaxed">Wander the blue-painted streets and stairways of Morocco's most photogenic town, nestled in the Rif Mountains.</p><CinematicVideo src="/videos/chefchaouen-blue-city-morocco.mp4" poster="/images/dest/chefchaouen.jpg" alt="Blue-painted streets and stairways of Chefchaouen, Morocco's Blue Pearl" title="Chefchaouen" subtitle="The Blue Pearl — what are you waiting for to discover this dreamlike town?" /></div>}

              {destination.id === 'merzouga' && <div className="mb-16"><h3 className="font-serif text-3xl text-foreground mb-3">✨ The Dunes, Day &amp; Night</h3><p className="text-muted-foreground mb-6 leading-relaxed">From golden light rolling across Erg Chebbi at sunrise to a sky ablaze with stars after dark — this is why travelers never forget a night in Merzouga.</p><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><img src="/images/personal/sahara-dunes-golden.jpg" alt="Golden sand dunes of Erg Chebbi at sunrise near Merzouga" width={900} height={600} loading="lazy" decoding="async" className="w-full h-72 md:h-96 object-cover rounded-3xl" /><img src="/images/stock/stargazing-merzouga.jpg" alt="The Milky Way over the Sahara Desert at night near Merzouga" width={900} height={600} loading="lazy" decoding="async" className="w-full h-72 md:h-96 object-cover rounded-3xl" /></div></div>}

              <div className="mb-12"><h3 className="font-serif text-3xl text-foreground mb-6 flex items-center gap-3"><BedDouble className="w-8 h-8 text-primary" /> {t('dest_luxury_stays')}</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[1,2].map(num => <div key={num} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"><img src={`/images/riad/${num === 1 ? 'courtyard' : 'bedroom'}.jpg`} width={800} height={500} className="w-full h-48 object-cover" alt={t('dest_riad_alt')} loading="lazy" decoding="async" onError={(e) => { (e.target as HTMLImageElement).src='/images/riad/rooftop.jpg'; }} /><div className="p-5"><h4 className="font-serif text-xl mb-1 text-foreground">{t('dest_riad_name')}</h4><p className="text-sm text-muted-foreground mb-3">{t('dest_riad_sub')} {destination.name}.</p></div></div>)}</div></div>
            </div>

            <div className="lg:w-1/3 w-full space-y-8">
              <div className="bg-card border border-border p-8 rounded-3xl shadow-lg"><h3 className="font-serif text-2xl text-foreground mb-6">{t('dest_travel_info')}</h3><ul className="space-y-5"><li className="flex items-center gap-4 text-muted-foreground"><div className="bg-primary/10 p-3 rounded-full text-primary shrink-0"><Calendar className="w-5 h-5" /></div><div><span className="text-xs font-bold uppercase tracking-wider block mb-1">{t('dest_best_time')}</span><span className="text-foreground font-medium">{destination.bestTime}</span></div></li><li className="flex items-center gap-4 text-muted-foreground"><div className="bg-primary/10 p-3 rounded-full text-primary shrink-0"><Star className="w-5 h-5" /></div><div><span className="text-xs font-bold uppercase tracking-wider block mb-1">Style</span><span className="text-foreground font-medium">{categoryLabel(destination.category, lang)}</span></div></li></ul></div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 p-8 rounded-3xl shadow-lg"><h3 className="font-serif text-xl text-foreground mb-6 flex items-center gap-2">{t('dest_climate')} <Sun className="w-5 h-5 text-secondary" /></h3><div className="flex items-end gap-4 mb-8"><span className="font-sans text-6xl font-bold tracking-tighter text-foreground">24°</span><span className="text-xl text-muted-foreground font-medium mb-1">C</span><span className="text-sm text-muted-foreground ml-auto mb-2 text-right">Sunny & Clear</span></div><div className="grid grid-cols-4 gap-2 text-center border-t border-border/50 pt-4">{[{d:'Mon',t:'24°',i:Sun},{d:'Tue',t:'25°',i:Sun},{d:'Wed',t:'22°',i:CloudSun},{d:'Thu',t:'23°',i:Sun}].map(day=><div key={day.d} className="flex flex-col items-center"><span className="text-xs text-muted-foreground mb-2">{day.d}</span><day.i className="w-5 h-5 text-secondary mb-2" /><span className="text-sm font-bold">{day.t}</span></div>)}</div></div>
              <div className="bg-card border border-border p-2 rounded-3xl shadow-lg"><h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {t('dest_view_map')}</h3><div className="rounded-2xl overflow-hidden"><MoroccoMap height={320} /></div><p className="text-xs text-muted-foreground mt-3 text-center">Tap any marker to explore this destination. Drag to pan, scroll to zoom.</p></div>
              <div className="bg-muted p-8 rounded-3xl border border-border text-center"><h3 className="font-bold text-xl text-foreground mb-4">{t('dest_plan_visit')}</h3><p className="text-muted-foreground mb-6 text-sm">Let our local experts plan the perfect itinerary including {destination.name}.</p><Link href="/contact" className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl font-bold shadow-md">{t('dest_start_planning')}</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12"><div><span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('section_tours_sub')}</span><h2 className="font-serif text-4xl text-foreground">{t('dest_tours')} {destination.name}</h2></div><Link href="/tours" className="hidden md:flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors">{t('explore_tours')} <ChevronRight className="w-4 h-4" /></Link></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{relevantTours.map(tour => <Link key={tour.id} href={`/tours/${tour.id}`} className="group block bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all"><div className="h-56 relative overflow-hidden"><img src={tour.image} alt={tour.name} width={900} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" /></div><div className="p-6"><span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">{tour.duration}</span><h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors">{tour.name}</h3><div className="text-primary font-bold flex items-center gap-1">{t('tours_view')} <ChevronRight className="w-4 h-4" /></div></div></Link>)}</div>
          {relevantTours.length === 0 && <p className="text-muted-foreground">Explore our <Link href="/tours" className="text-primary font-semibold underline">Morocco private tours</Link> to build an itinerary for {destination.name}.</p>}
        </div>
      </section>

      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl"><div className="text-center mb-12"><h2 className="font-serif text-4xl text-foreground">Explore this Morocco route</h2><p className="text-muted-foreground max-w-2xl mx-auto mt-3">Connect {destination.name} with the places and experiences already covered by our itineraries.</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{nearbyDestinations.map(dest => dest && <Link key={dest.id} href={`/destinations/${dest.id}`} className="group relative h-64 rounded-2xl overflow-hidden border border-border"><img src={dest.image} alt={`${dest.name} — ${dest.shortDesc}`} width={900} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-6 left-6 text-white"><h3 className="font-serif text-2xl mb-1">{dest.name}</h3><span className="text-sm text-primary font-semibold">Explore {dest.name} <ChevronRight className="inline w-4 h-4" /></span></div></Link>)}</div></div>
      </section>
    </Layout>
  );
}
