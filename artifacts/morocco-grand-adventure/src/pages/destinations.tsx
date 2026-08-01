import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDestinations, categoryLabel } from '@/i18n/content';
import { Link } from 'wouter';
import { MapPin } from 'lucide-react';

export default function Destinations() {
  const { t, lang } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/atlas-pano.jpg" 
            alt="Morocco Destinations" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('dest_discover')}</h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
              {t('dest_find')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {categoryLabel(dest.category, lang)}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-serif text-3xl text-foreground mb-3">{dest.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                    {dest.shortDesc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium mb-6">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t('dest_best_time')} <span className="text-muted-foreground">{dest.bestTime}</span>
                  </div>
                  
                  <Link 
                    href={`/destinations/${dest.id}`} 
                    className="mt-auto block text-center bg-muted text-foreground hover:bg-primary hover:text-primary-foreground py-3 rounded-xl font-bold transition-colors"
                  >
                    {t('dest_explore')} {dest.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
