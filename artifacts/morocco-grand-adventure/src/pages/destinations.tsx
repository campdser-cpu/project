import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDestinations, getLocalizedTours, categoryLabel } from '@/i18n/content';
import { Link } from 'wouter';
import { MapPin, ChevronRight } from 'lucide-react';
import { PriceTag } from '../components/promo/PriceTag';

const PRIORITY_TOUR_IDS = [
  '3-day-sahara-marrakech',
  '5-day-imperial-cities',
  '7-day-imperial-cities-sahara-escape',
];

export default function Destinations() {
  const { t, lang } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const tours = getLocalizedTours(lang);
  const priorityTours = PRIORITY_TOUR_IDS
    .map(id => tours.find(tour => tour.id === id))
    .filter(Boolean);

  return (
    <Layout>
      <section className="relative h-[60vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/atlas-pano.jpg"
            alt="Morocco Destinations"
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('dest_discover')}</h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light">{t('dest_find')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    width={900}
                    height={600}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {categoryLabel(dest.category, lang)}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="font-serif text-3xl text-foreground mb-3">{dest.name}</h2>
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{dest.shortDesc}</p>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-6">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t('dest_best_time')} <span className="text-muted-foreground">{dest.bestTime}</span>
                  </div>
                  <Link href={`/destinations/${dest.id}`} className="mt-auto block text-center bg-muted text-foreground hover:bg-primary hover:text-primary-foreground py-3 rounded-xl font-bold transition-colors">
                    {t('dest_explore')} {dest.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {priorityTours.length > 0 && (
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('section_tours_sub')}</span>
              <h2 className="font-serif text-4xl text-foreground mb-3">{t('section_tours')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {priorityTours.map(tour => tour && (
                <Link key={tour.id} href={`/tours/${tour.id}`} className="group block bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all">
                  <img src={tour.image} alt={tour.name} width={900} height={600} loading="lazy" decoding="async" className="w-full h-52 object-cover" />
                  <div className="p-6">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-2">{tour.duration}</span>
                    <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">{tour.name}</h3>
                    <div className="flex items-center justify-between gap-3">
                      <PriceTag price={tour.price} size="sm" />
                      <span className="text-primary font-bold text-sm">{t('explore_tours')} <ChevronRight className="inline w-4 h-4" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
