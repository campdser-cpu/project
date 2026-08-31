import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '../components/layout/Layout';
import { tours } from '@/data/content';
import { CITY_HUBS } from '@/data/tour-hierarchy';
import { getLocalizedTour } from '@/i18n/content';
import { Link, useSearch } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Filter } from 'lucide-react';
import { PromoBanner } from '../components/promo/PromoBanner';
import { PromoBadge } from '../components/promo/PromoBadge';
import { PriceTag } from '../components/promo/PriceTag';
import { CinematicVideo } from '../components/ui/CinematicVideo';

function parseDurationDays(duration: string): number {
  const match = duration.match(/^(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function durationInRange(duration: string, range: string): boolean {
  const days = parseDurationDays(duration);
  switch (range) {
    case '1-2': return days >= 1 && days <= 2;
    case '3-4': return days >= 3 && days <= 4;
    case '5-7': return days >= 5 && days <= 7;
    case '8-14': return days >= 8 && days <= 14;
    default: return true;
  }
}

function tourMatchesStyle(tour: typeof tours[0], style: string): boolean {
  const lower = (tour.name + ' ' + tour.category + ' ' + tour.highlights.join(' ')).toLowerCase();
  switch (style) {
    case 'desert': return lower.includes('desert') || lower.includes('sahara') || lower.includes('dune');
    case 'imperial': return lower.includes('imperial') || lower.includes('marrakech') || lower.includes('fes') || lower.includes('meknes') || lower.includes('rabat') || lower.includes('casablanca');
    case 'mountains': return lower.includes('mountain') || lower.includes('atlas') || lower.includes('valley') || lower.includes('gorge');
    case 'coastal': return lower.includes('beach') || lower.includes('coast') || lower.includes('ocean') || lower.includes('surf') || lower.includes('essaouira') || lower.includes('agadir');
    default: return true;
  }
}

function tourMatchesCity(tour: typeof tours[0], city: string): boolean {
  return tour.name.toLowerCase().includes(city.toLowerCase());
}

export default function Tours() {
  const { t, lang } = useLanguage();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const cityFilter = params.get('city') || '';
  const durationFilter = params.get('duration') || '';
  const styleFilter = params.get('style') || '';

  const filteredTours = useMemo(() => tours.filter(tour => {
    if (cityFilter && !tourMatchesCity(tour, cityFilter)) return false;
    if (durationFilter && !durationInRange(tour.duration, durationFilter)) return false;
    if (styleFilter && !tourMatchesStyle(tour, styleFilter)) return false;
    return true;
  }), [cityFilter, durationFilter, styleFilter]);

  const hasFilters = Boolean(cityFilter || durationFilter || styleFilter);

  return (
    <Layout>
      <section className="relative h-[50vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero/desert-pano.webp" width={601} height={900} alt={t('tours_heading')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('tours_heading')}</h1>
            <p className="text-white/80 text-lg md:text-xl font-light">{t('tours_sub')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('hub_by_departure_city')}</span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('hub_by_departure_city')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('hub_explore_region_sub').replace('{city}', t('nav_tours'))}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITY_HUBS.map((hub) => (
              <Link key={hub.id} href={`/tours/from-${hub.slug}`} className="group relative rounded-2xl overflow-hidden border border-border h-64 hover:shadow-xl transition-all duration-500">
                <img src={hub.heroImage} alt={t(`hub_${hub.id}_hero_alt`)} width={1600} height={900} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 p-5 w-full">
                  <h3 className="font-serif text-2xl text-white mb-1 drop-shadow">{t(`hub_${hub.id}_title`)}</h3>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-bold">{t('tours_view')} <ChevronRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CITY_HUBS.map((hub) => (
              <Link key={`three-${hub.id}`} href={`/tours/from-${hub.slug}/3-days`} className="rounded-xl border border-border px-4 py-3 text-center font-semibold hover:border-primary hover:text-primary transition-colors">
                {t('hub_dur_h1').replace('{days}', '3').replace('{city}', t(`hub_${hub.id}_name`))}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {hasFilters && <section className="bg-primary/5 border-b border-primary/20 py-4"><div className="container mx-auto px-4 max-w-6xl flex items-center justify-between"><div className="flex items-center gap-2 text-sm"><Filter className="w-4 h-4 text-primary" /><span className="font-medium">{filteredTours.length} {filteredTours.length === 1 ? t('tours_tour') : t('tours_tours')} {t('tours_matching')}</span></div><Link href="/tours" className="text-sm underline">{t('tours_clear')}</Link></div></section>}

      {!hasFilters && <section className="py-16 md:py-20 bg-card border-b border-border"><div className="container mx-auto px-4 max-w-5xl"><div className="text-center mb-8 md:mb-10"><span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('tours_experience')}</span><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('tours_experience')}</h2></div><CinematicVideo src="/videos/morocco-imperial-cities-desert-oasis-tour.mp4" poster="/images/hero/desert-pano.webp" alt={t('tours_heading')} title={t('tours_experience')} subtitle={t('tours_sub')} /></div></section>}

      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-6xl"><PromoBanner variant="compact" className="mb-12" />{filteredTours.length === 0 ? <div className="text-center py-24"><p className="text-muted-foreground text-xl mb-6">{t('tours_no_match')}</p><Link href="/tours" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold">{t('tours_view_all')}</Link></div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-10">{filteredTours.map((tourBase, index) => { const tour = getLocalizedTour(tourBase.id, lang) ?? tourBase; return <motion.div key={tour.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"><div className="h-64 relative overflow-hidden"><img src={tour.image} alt={tour.name} width={1200} height={675} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {tour.duration}</div><div className="absolute top-4 right-4"><PromoBadge /></div></div><div className="p-8 flex flex-col flex-grow"><h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">{tour.name}</h3><p className="text-muted-foreground mb-6 line-clamp-2">{t('tours_experience')} {tour.highlights.join(', ')} {t('tours_and_more')}</p><div className="flex items-center justify-between mt-auto pt-6 border-t border-border"><div><span className="text-xs text-muted-foreground uppercase tracking-wider block font-sans font-normal">{t('from')}</span><PriceTag price={tour.price} size="md" /></div><Link href={`/tours/${tour.id}`} className="bg-foreground text-background hover:bg-primary px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2">{t('tours_view')} <ChevronRight className="w-4 h-4" /></Link></div></div></motion.div>; })}</div>}</div></section>
    </Layout>
  );
}
