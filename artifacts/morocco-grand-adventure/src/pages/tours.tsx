import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '../components/layout/Layout';
import { tours } from '@/data/content';
import { CITY_HUBS, DURATION_BUCKETS, INTEREST_TAGS, durationInBucket, tourMatchesInterest, tourMatchesCity } from '@/data/tour-hierarchy';
import { getLocalizedTour } from '@/i18n/content';
import { Link, useSearch } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Filter, Plus, Minus } from 'lucide-react';
import { PromoBanner } from '../components/promo/PromoBanner';
import { PromoBadge } from '../components/promo/PromoBadge';
import { PriceTag } from '../components/promo/PriceTag';
import { CinematicVideo } from '../components/ui/CinematicVideo';
import { StructuredData, buildFaqSchema } from '../components/seo/StructuredData';
import { trackEvent } from '@/lib/analytics';

export default function Tours() {
  const { t, lang } = useLanguage();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const cityFilter = params.get('city') || '';
  const durationFilter = params.get('duration') || '';
  const styleFilter = params.get('style') || '';

  // Toggle one filter dimension while preserving the others, and let clicking
  // an already-active pill clear just that dimension. Builds on the existing
  // ?city=/?duration=/?style= contract already read above and already
  // excluded from indexing in robots.txt — this only adds a real UI on top
  // of filtering logic that previously had no on-page control anywhere in
  // the app (grep confirmed no link in the codebase ever set these params).
  function filterHref(key: 'city' | 'duration' | 'style', value: string): string {
    const next = new URLSearchParams(search);
    const active = next.get(key) === value;
    if (active) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    return qs ? `/tours?${qs}` : '/tours';
  }

  // Counts respect the OTHER active filters (so picking a city then scanning
  // duration counts shows what's really available from that city), but never
  // the pill's own dimension — each pill shows "how many if I add/switch to
  // this", a standard faceted-search convention, always a real tally over
  // the canonical `tours` array, never invented.
  const countFor = (dimension: 'city' | 'duration' | 'style', value: string): number =>
    tours.filter((tour) => {
      if (dimension !== 'city' && cityFilter && !tourMatchesCity(tour.id, cityFilter)) return false;
      if (dimension !== 'duration' && durationFilter && !durationInBucket(tour.duration, durationFilter)) return false;
      if (dimension !== 'style' && styleFilter && !tourMatchesInterest(tour, styleFilter)) return false;
      if (dimension === 'city') return tourMatchesCity(tour.id, value);
      if (dimension === 'duration') return durationInBucket(tour.duration, value);
      return tourMatchesInterest(tour, value);
    }).length;

  const durationOptions: Array<{ value: string; label: string }> = DURATION_BUCKETS.map((b) => ({
    value: b.value,
    label: t(`tours_dur_${b.value.replace('-', '_')}` as Parameters<typeof t>[0]),
  }));
  const styleOptions: Array<{ value: string; label: string }> = INTEREST_TAGS.map((tag) => ({
    value: tag,
    label: t(`tours_style_${tag}` as Parameters<typeof t>[0]),
  }));
  const pillClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary hover:text-primary'}`;

  const filteredTours = useMemo(() => tours.filter(tour => {
    if (cityFilter && !tourMatchesCity(tour.id, cityFilter)) return false;
    if (durationFilter && !durationInBucket(tour.duration, durationFilter)) return false;
    if (styleFilter && !tourMatchesInterest(tour, styleFilter)) return false;
    return true;
  }), [cityFilter, durationFilter, styleFilter]);

  const hasFilters = Boolean(cityFilter || durationFilter || styleFilter);

  // Real, factually-supported booking questions — private format, the actual
  // 2-14 day range (content.ts), the actual CITY_HUBS departure cities, and
  // the site's established WhatsApp-confirm-then-pay booking flow. Distinct
  // from the desert-tours FAQ below to avoid two near-duplicate FAQ blocks.
  const faqs = [1, 2, 3, 4].map((n) => ({ question: t(`tours_faq_q${n}`), answer: t(`tours_faq_a${n}`) }));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <StructuredData id="tours-faq" data={buildFaqSchema(faqs)} />
      <section className="relative h-[50vh] w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-1280w.webp" srcSet="/images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-768w.webp 768w, /images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-1280w.webp 1280w, /images/library/srcset/camel-caravan-erg-chebbi-day-morocco-mga-024-1920w.webp 1920w" sizes="100vw" width={1920} height={1187} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: 'center 78%' }} />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">{t('tours_heading')}</h1>
            <p className="text-white/80 text-lg md:text-xl font-light">{t('tours_sub')}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link href="/desert-tours" className="inline-flex items-center gap-1.5 text-white/90 text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:text-primary hover:decoration-primary transition-colors">
                {t('nav_sahara_desert_tours')} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link href="/trip-builder" className="inline-flex items-center gap-1.5 text-white/90 text-sm font-semibold underline decoration-white/40 underline-offset-4 hover:text-primary hover:decoration-primary transition-colors">
                {t('guide_cta_build')} <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Tours — featured first in the Tours ecosystem. A standalone
          university-travel experience, not one of the 24 canonical tour IDs. */}
      <section className="bg-[#111110]">
        <div className="container mx-auto px-4 max-w-6xl py-10 md:py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase block mb-3" style={{ letterSpacing: '0.2em', color: '#C9A84C' }}>
              {t('st_home_eyebrow')}
            </span>
            <h2 className="font-serif text-white text-2xl md:text-4xl font-light leading-tight">{t('st_tours_label')}</h2>
            <p className="mt-3 text-white/75 max-w-2xl text-sm md:text-base">{t('st_tours_desc')}</p>
          </div>
          <Link
            href="/student-tours"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-black text-sm font-semibold tracking-wide hover:opacity-90 transition whitespace-nowrap"
          >
            {t('st_home_cta')} <ChevronRight className="w-4 h-4" />
          </Link>
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

      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2">
            <p className="text-sm text-muted-foreground">{t('tf_sub')}</p>
            <Link
              href="/trip-finder"
              className="inline-flex items-center gap-2 shrink-0 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
            >
              {t('tf_badge')} <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Filter className="w-4 h-4" aria-hidden="true" />
            <span>{t('hub_by_departure_city')}</span>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('hub_by_departure_city')}>
            {CITY_HUBS.map((hub) => (
              <Link
                key={hub.id}
                href={filterHref('city', hub.id)}
                onClick={() => trackEvent('destination_filter_click', { filter: 'city', value: hub.id })}
                className={pillClass(cityFilter === hub.id)}
              >
                {t(`hub_${hub.id}_name`)} <span className="opacity-60">({countFor('city', hub.id)})</span>
              </Link>
            ))}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground pt-2">{t('tours_filter_duration')}</div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('tours_filter_duration')}>
            {durationOptions.map((opt) => (
              <Link
                key={opt.value}
                href={filterHref('duration', opt.value)}
                onClick={() => trackEvent('duration_filter_click', { filter: 'duration', value: opt.value })}
                className={pillClass(durationFilter === opt.value)}
              >
                {opt.label} <span className="opacity-60">({countFor('duration', opt.value)})</span>
              </Link>
            ))}
          </div>
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground pt-2">{t('tours_filter_style')}</div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('tours_filter_style')}>
            {styleOptions.map((opt) => (
              <Link
                key={opt.value}
                href={filterHref('style', opt.value)}
                onClick={() => trackEvent('trip_finder_filter', { filter: 'interest', value: opt.value })}
                className={pillClass(styleFilter === opt.value)}
              >
                {opt.label} <span className="opacity-60">({countFor('style', opt.value)})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {hasFilters && <section className="bg-primary/5 border-b border-primary/20 py-4"><div className="container mx-auto px-4 max-w-6xl flex items-center justify-between"><div className="flex items-center gap-2 text-sm"><Filter className="w-4 h-4 text-primary" /><span className="font-medium">{filteredTours.length} {filteredTours.length === 1 ? t('tours_tour') : t('tours_tours')} {t('tours_matching')}</span></div><Link href="/tours" className="text-sm underline">{t('tours_clear')}</Link></div></section>}

      {!hasFilters && <section className="py-16 md:py-20 bg-card border-b border-border"><div className="container mx-auto px-4 max-w-5xl"><div className="text-center mb-8 md:mb-10"><span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('tours_experience')}</span><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('tours_experience')}</h2></div><CinematicVideo src="/videos/sahara-experience.mp4" poster="/images/personal/luxury-camp-dusk.webp" alt={t('tours_heading')} title={t('tours_experience')} subtitle={t('tours_sub')} /></div></section>}

      <section className="py-24 bg-background"><div className="container mx-auto px-4 max-w-6xl"><PromoBanner variant="compact" className="mb-12" />{filteredTours.length === 0 ? <div className="text-center py-24"><p className="text-muted-foreground text-xl mb-6">{t('tours_no_match')}</p><Link href="/tours" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold">{t('tours_view_all')}</Link></div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-10">{filteredTours.map((tourBase, index) => { const tour = getLocalizedTour(tourBase.id, lang) ?? tourBase; return <motion.div key={tour.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"><div className="h-64 relative overflow-hidden"><img src={tour.image} srcSet={`${tour.image.replace(/\.webp$/, '-480w.webp')} 480w, ${tour.image.replace(/\.webp$/, '-768w.webp')} 768w, ${tour.image} 1200w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw" alt={tour.name} width={1200} height={675} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {tour.duration}</div><div className="absolute top-4 right-4"><PromoBadge /></div></div><div className="p-8 flex flex-col flex-grow"><h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">{tour.name}</h3><p className="text-muted-foreground mb-6 line-clamp-2">{t('tours_experience')} {tour.highlights.join(', ')} {t('tours_and_more')}</p><div className="flex items-center justify-between mt-auto pt-6 border-t border-border"><div><PriceTag price={tour.price} size="md" /></div><Link href={`/tours/${tour.id}`} onClick={() => trackEvent('trip_finder_result_click', { tour_id: tour.id, has_filters: hasFilters })} className="bg-foreground text-background hover:bg-primary px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2">{t('tours_view')} <ChevronRight className="w-4 h-4" /></Link></div></div></motion.div>; })}</div>}</div></section>

      {/* FAQ — same accordion pattern as tour-detail.tsx */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 text-center">{t('td_faq_title')}</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-background border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-bold text-foreground">{f.question}</span>
                  <span className="shrink-0 text-primary">{openFaq === i ? <Minus className="w-5 h-5" aria-hidden="true" /> : <Plus className="w-5 h-5" aria-hidden="true" />}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1 text-muted-foreground text-sm leading-relaxed">{f.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
