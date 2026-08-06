import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { Star, Globe, Users, MapPin, Quote, Heart, CheckCircle2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function About() {
  const { t } = useLanguage();
  const guideStats = [
    { icon: MapPin, value: t('about_stat1_value'), label: t('about_stat1_label') },
    { icon: Star, value: t('about_stat2_value'), label: t('about_stat2_label') },
    { icon: Globe, value: t('about_stat3_value'), label: t('about_stat3_label') },
    { icon: Users, value: t('about_stat4_value'), label: t('about_stat4_label') },
  ];
  const guideLanguages = ['Amazigh (Berber)', 'Arabic', 'English', 'French', 'Spanish'];
  const travelerMoments = [
    { src: '/images/personal/guide-guest-tea-wide.jpg', caption: t('about_moment1') },
    { src: '/images/personal/group-atlas.jpg', caption: t('about_moment2') },
    { src: '/images/personal/guests-sunset.webp', caption: t('about_moment3') },
    { src: '/images/personal/guests-van.jpg', caption: t('about_moment4') },
    { src: '/images/personal/luxury-camp-dusk.jpg', caption: t('about_moment5') },
    { src: '/images/personal/riad-tea.jpg', caption: t('about_moment6') },
  ];
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/personal/group-atlas.jpg" alt={t('about_hero_alt')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('about_story')}</h1>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">{t('about_story_sub')}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-a:text-primary mx-auto">
            <h2 className="text-4xl mb-8">{t('about_sub')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t('about_story_p1')}</p>
            <p className="text-muted-foreground leading-relaxed mb-12">{t('about_story_p2')}</p>

            <div className="bg-card border border-border p-10 rounded-3xl my-16 text-center">
              <h3 className="text-3xl text-foreground font-serif mb-4">{t('about_philosophy')}</h3>
              <p className="text-xl text-muted-foreground italic">"{t('about_philosophy_quote')}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Local Guide */}
      <section className="py-24 bg-card border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border">
                <img src="/images/personal/guide-portrait.jpg" alt={t('about_guide_alt')} loading="lazy" decoding="async" className="w-full h-[520px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs block mb-1">{t('about_founder')}</span>
                  <span className="text-white font-serif text-3xl drop-shadow">{t('about_guide_name')}</span>
                </div>
              </div>
              {/* Floating rating badge */}
              <div className="absolute -top-5 -right-3 md:right-6 bg-background border border-border rounded-2xl px-5 py-3 shadow-xl flex items-center gap-2">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="font-bold text-foreground text-sm">5.0</span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('about_meet_guide')}</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">{t('about_guide_heading')}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  <span className="text-2xl text-primary font-serif mr-1">"</span>
                  {t('about_guide_p1')}
                </p>
                <p>
                  {t('about_guide_p2')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {guideStats.map((stat) => (
                  <div key={stat.label} className="bg-background border border-border rounded-2xl p-4 text-center">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-serif text-lg text-foreground leading-tight">{stat.value}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="mb-8">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-primary" /> {t('about_languages')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {guideLanguages.map((lang) => (
                    <span key={lang} className="bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">{lang}</span>
                  ))}
                </div>
              </div>

              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#128C7E] transition-all hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
              >
                <SiWhatsapp className="w-5 h-5" /> {t('about_chat')}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Traveler Experiences */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('about_experiences')}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{t('about_memories')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('about_memories_sub')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {travelerMoments.map((moment, i) => (
              <motion.div
                key={moment.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-3xl border border-border shadow-sm ${i === 0 ? 'col-span-2 lg:col-span-2 row-span-1' : ''}`}
              >
                <img
                  src={moment.src}
                  alt={moment.caption}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? 'h-64 md:h-full min-h-[16rem]' : 'h-56 md:h-72'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <p className="text-white text-sm font-medium leading-snug drop-shadow">{moment.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-4xl text-foreground">{t('section_why_us')}</h2>
          </div>
          <ul className="space-y-6 text-muted-foreground list-none pl-0">
            <li className="flex items-start gap-4">
              <span className="bg-primary/20 text-primary p-2 rounded-full shrink-0"><CheckCircle2 className="w-5 h-5" /></span>
              <div>
                <strong className="text-foreground block text-xl font-serif mb-2">{t('about_local')}</strong>
                {t('about_local_desc')}
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-primary/20 text-primary p-2 rounded-full shrink-0"><CheckCircle2 className="w-5 h-5" /></span>
              <div>
                <strong className="text-foreground block text-xl font-serif mb-2">{t('about_quality')}</strong>
                {t('about_quality_desc')}
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-primary/20 text-primary p-2 rounded-full shrink-0"><CheckCircle2 className="w-5 h-5" /></span>
              <div>
                <strong className="text-foreground block text-xl font-serif mb-2">{t('about_sustainable')}</strong>
                {t('about_sustainable_desc')}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
