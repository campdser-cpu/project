import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2, Star, MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import { defaultTrustBadges } from '../components/ExperiencePage';
import { getLocalizedTours } from '@/i18n/content';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '../components/layout/Layout';
import { SiWhatsapp } from 'react-icons/si';
import { contactInfo } from '@/data/content';

export default function DesertTours() {
  const { t, lang } = useLanguage();
  const tours = getLocalizedTours(lang);
  const desertTours = tours.filter(tour =>
    tour.name.toLowerCase().includes('sahara') ||
    tour.name.toLowerCase().includes('desert') ||
    tour.highlights.some(h => h.toLowerCase().includes('dune') || h.toLowerCase().includes('sahara') || h.toLowerCase().includes('desert'))
  );
  const trustBadges = defaultTrustBadges();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/images/dest/merzouga.jpg"
            alt={t('dt2_hero_alt')}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6 block drop-shadow-md">Morocco Grand Adventure</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-[1.1] drop-shadow-2xl">{t('dt2_title')}</h1>
            <p className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              {t('dt2_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <Link href="/tours" className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)]">
                {t('dt2_cta_explore')}
              </Link>
              <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <SiWhatsapp className="w-4 h-4" /> {t('dt2_whatsapp')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-background py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="text-primary">{badge.icon}</span><span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert prose-headings:font-serif mx-auto max-w-none">
            <h2 className="text-4xl mb-6">{t('dt2_intro_heading')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('dt2_intro_p1')}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('dt2_intro_p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Desert Tours */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('dt2_featured')}</span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">{t('dt2_featured_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {desertTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-background rounded-3xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img src={tour.image} alt={tour.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary mb-3">
                    <Clock className="w-4 h-4" /> {tour.duration}
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{tour.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {tour.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/tours/${tour.id}`} className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                    {t('dt2_view_details')} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/tours" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all">
              {t('dt2_view_all')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">{t('dt2_why_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: t('dt2_why1_title'), desc: t('dt2_why1_desc') },
              { icon: Star, title: t('dt2_why2_title'), desc: t('dt2_why2_desc') },
              { icon: Users, title: t('dt2_why3_title'), desc: t('dt2_why3_desc') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('dt2_ready')}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('dt2_ready_sub')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trip-builder" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg">
              {t('dt2_build')}
            </Link>
            <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-[#1fb959] transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2">
              <SiWhatsapp className="w-5 h-5" /> {t('dt2_chat')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}