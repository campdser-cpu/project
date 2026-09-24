import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { getLocalizedTour, getLocalizedTours, getLocalizedFaq, getLocalizedDestinations, getLocalizedTourDepth } from '@/i18n/content';
import { lazy, Suspense } from 'react';
import { LazyMount } from '../components/perf/LazyMount';

/** Map is below the fold — mount (and download its ~150 kB vendor chunk) only when scrolled near. */
const MoroccoMap = lazy(() =>
  import('../components/MoroccoMap').then((m) => ({ default: m.MoroccoMap })),
);
import NotFound from './not-found';
import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle2, Check, X, Star, CalendarDays, ChevronRight, MapPin, Plus, Minus, Route } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { PromoBadge } from '../components/promo/PromoBadge';
import { PriceTag } from '../components/promo/PriceTag';
import { PromoBanner } from '../components/promo/PromoBanner';
import { waPromoLink } from '@/lib/promo';
import { usePromoActive } from '../components/promo/PromoProvider';
import { StructuredData, buildTourSchema, buildReviewSchema, buildFaqSchema } from '../components/seo/StructuredData';
import { TOUR_DEPARTURE_CITY, getCityHub } from '@/data/tour-hierarchy';
import { TourBreadcrumbs } from '../components/tours/TourBreadcrumbs';
import { MERZOUGA_GUIDES, COMPARISONS, TRAVEL_INFO } from '@/data/seoHub';
import { getLocalizedGuide } from '@/i18n/guides';
import { tours as canonicalTours } from '@/data/content';
import { deriveTourExperiences } from '@/data/tour-experiences';
import { IncludedExperiences } from '../components/tours/IncludedExperiences';
import { TourInclusions } from '../components/tours/TourInclusions';
import { TourInquiryForm } from '../components/tours/TourInquiryForm';
import { deriveTourInclusions } from '@/data/tour-inclusions';
import { HowBookingWorks } from '../components/tours/HowBookingWorks';
import { TailorJourney } from '../components/tours/TailorJourney';

/** Extract the leading number of days from a duration string like "3 Days / 2 Nights". */
function parseDurationDays(duration: string): number {
  const match = duration.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function TourDetail() {
  const { t, lang } = useLanguage();
  const [match, params] = useRoute('/tours/:id');
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!match || !params?.id) return <NotFound />;

  const tour = getLocalizedTour(params.id, lang);

  if (!tour) return <NotFound />;

  // Parent hub (departure city) used for breadcrumb + "other tours from" onward links.
  const departCity = TOUR_DEPARTURE_CITY[tour.id];
  const departHub = departCity ? getCityHub(departCity) : undefined;

  // Every private journey is quoted on the dates and the group, so this page
  // never computes a total: the panel collects dates and party size and the
  // team replies with the real figure.
  const promoOn = usePromoActive();

  // Day-by-day itinerary — rendered only when the tour defines one matching its
  // real duration, so a tour can never display an itinerary for a different length.
  const isQuoteOnly = tour.quoteOnly === true;
  const itinerary = tour.itineraryDays ?? [];

  const galleryImages = tour.gallery ?? [
    { src: '/images/dest/merzouga.webp', caption: 'Sahara dunes at Merzouga' },
    { src: '/images/dest/erg-chebbi.webp', caption: 'Golden sands of Erg Chebbi' },
    { src: '/images/dest/ait-ben-haddou.webp', caption: 'Aït Benhaddou ksar' },
  ];

  const included = tour.included ?? [
    t('tour_inc_vehicle'), t('tour_inc_guide'), t('tour_inc_riads'),
    t('tour_inc_desert_camp'), t('tour_inc_camel'), t('tour_inc_meals'),
  ];
  const excluded = tour.excluded ?? [
    t('tour_exc_flights'), t('tour_exc_lunches'), t('tour_exc_entrance'),
    t('tour_exc_tips'), t('tour_exc_insurance'),
  ];

  const faqs = tour.faq ?? getLocalizedFaq(lang).slice(0, 6);

  const allTours = getLocalizedTours(lang);
  // Relevant "recommendation" logic for related tours — never random.
  // 1) Same departure city  2) Route overlap  3) Same duration  4) Similar category/intent.
  const routeIdSet = new Set(tour.routeIds ?? []);
  const relatedTours = allTours
    .filter(x => x.id !== tour.id)
    .map(candidate => {
      const sameCity = TOUR_DEPARTURE_CITY[candidate.id] === TOUR_DEPARTURE_CITY[tour.id];
      const overlap = (candidate.routeIds ?? []).filter(id => routeIdSet.has(id)).length;
      const sameDuration = parseDurationDays(candidate.duration) === parseDurationDays(tour.duration);
      const score = (sameCity ? 100 : 0) + overlap * 20 + (sameDuration ? 30 : 0);
      return { tour: candidate, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.tour);

  // Destinations that appear along this tour's route, resolved to their
  // localized name for the "stops on this route" quick links below.
  const routeStops = getLocalizedDestinations(lang)
    .filter(d => tour.routeIds?.includes(d.id))
    .sort((a, b) => (tour.routeIds ? tour.routeIds.indexOf(a.id) - tour.routeIds.indexOf(b.id) : 0));

  // Included experiences are derived from the CANONICAL English itinerary:
  // the stop → experience map in tour-experiences.ts is keyed on the English
  // stop text, and the overlays translate the resulting labels afterwards.
  // Deriving from the localized tour would silently match nothing outside /en.
  const canonicalTour = canonicalTours.find(x => x.id === tour.id);
  const experiences = deriveTourExperiences(canonicalTour ?? {});
  const destinationNames = Object.fromEntries(
    getLocalizedDestinations(lang).map(d => [d.id, d.name]),
  );
  // Comprehensive inclusions & meal breakdown: canonical itinerary + localized copy.
  const inclusions = deriveTourInclusions(canonicalTour ?? tour, tour);

  return (
    <Layout>
      {/* Schema.org structured data: Tour, FAQ, Breadcrumb */}
      <StructuredData id="tour" data={buildTourSchema(tour, params.id, lang)} />
      {/* MGA_QUOTE_ONLY_THREE_DAY_UI_V1 */}
      {tour.faq && tour.faq.length > 0 && (
        <StructuredData id="tour-faq" data={buildFaqSchema(tour.faq)} />
      )}

      {/* Cinematic Hero */}
      <section className="relative h-[80vh] w-full flex items-end pb-16 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={tour.image}
            alt={tour.name}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/dest/merzouga.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="bg-primary/20 backdrop-blur-md border border-primary/30 text-white inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider shadow-lg">
                {(tour.category ?? t('tour_private')).toUpperCase()}
              </div>
              <PromoBadge />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-xl">
              {tour.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 font-medium bg-black/25 backdrop-blur-sm w-max max-w-full px-6 py-3 rounded-full border border-white/10">
              <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {tour.duration}</span>
              <span className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> {t('tour_private')}</span>
              <span className="flex items-baseline gap-2 md:pl-6 md:border-l border-white/20">
                {isQuoteOnly ? (
                  <span className="text-sm font-semibold text-white">{t('price_tailored')}</span>
                ) : (
                  <>
                    <span className="text-sm font-sans font-normal text-white/80">{t('from')}</span>
                    <PriceTag price={tour.price} size="md" tone="onDark" />
                    <span className="text-sm font-sans font-normal text-white/70">{t('book_per_person')}</span>
                  </>
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back-up-the-tree breadcrumbs: Home → Tours → City → Tour */}
      <div className="bg-black/50 backdrop-blur border-b border-white/10">
        <TourBreadcrumbs
          items={[
            { label: t('nav_tours'), href: '/tours' },
            // The hub's canonical title is English; the crumb uses the localized label.
            ...(departHub ? [{ label: t(`hub_${departHub.id}_title`), href: `/tours/from-${departHub.slug}` }] : []),
            { label: tour.name },
          ]}
        />
      </div>

      {/* Limited-time promotion */}
      {promoOn && (
        <section className="bg-background pt-10 md:pt-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <PromoBanner variant="compact" />
          </div>
        </section>
      )}

      {/* Cinematic Video */}
      {tour.videoUrl && (
        <section className="bg-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">Watch the Journey</span>
            <h2 className="font-serif text-3xl md:text-5xl text-background mb-8">A Cinematic Preview</h2>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src={tour.videoUrl}
                poster={tour.videoPoster}
                controls
                playsInline
                preload="none"
                className="w-full aspect-video object-cover bg-black"
                aria-label={`${tour.name} preview video`}
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 relative max-w-7xl">

          {/* Main Content */}
          <div className="lg:w-2/3">

            {/* Overview */}
            {tour.description && (
              <div className="mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">Tour Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{tour.description}</p>
              </div>
            )}

            {/* Quick highlights */}
            <div className="bg-card border border-border p-8 rounded-3xl mb-12 shadow-sm">
              <h3 className="font-serif text-3xl text-foreground mb-6">{t('tour_why_love')}</h3>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Route Map */}
            {tour.routeIds && tour.routeIds.length > 1 && (
              <div className="mb-16">
                <h2 className="font-serif text-4xl text-foreground mb-3 flex items-center gap-3">
                  <Route className="w-8 h-8 text-primary" aria-hidden="true" /> {t('td_your_route')}
                </h2>
                <p className="text-muted-foreground mb-6">{tour.routeCaption ?? t('td_route_caption')}</p>
                <LazyMount minHeight={460}>
                      <Suspense fallback={<div style={{ height: 460 }} className="bg-muted" />}>
                        <MoroccoMap routeIds={tour.routeIds} routeCaption={tour.routeCaption} height={460} routeStops={routeStops} />
                      </Suspense>
                    </LazyMount>
              </div>
            )}

            {/* A quick, scannable and linkable list of the places on this route */}
            {routeStops.length > 0 && (
              <div className="mb-16" aria-label={t('td_your_route')}>
                <h3 className="font-serif text-2xl text-foreground mb-4">{t('td_your_route')}</h3>
                <ul className="flex flex-wrap gap-2">
                  {routeStops.map((d) => (
                    <li key={d.id}>
                      <Link
                        href={`/destinations/${d.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Daily Itinerary Timeline */}
            {itinerary.length > 0 && (
            <div className="mb-16">
              <h2 className="font-serif text-4xl text-foreground mb-10">{t('tour_itinerary')}</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
                {itinerary.map((day, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 ml-0 md:ml-auto">
                      {day.day}
                    </div>

                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-bold text-primary text-xs mb-2 uppercase tracking-widest bg-primary/10 inline-block px-3 py-1 rounded-full">{t('tour_day')} {day.day}</div>
                      <h4 className="font-serif text-2xl text-foreground mb-4">{day.title}</h4>
                      <p className="text-muted-foreground text-base leading-relaxed">{day.desc}</p>
                      {day.stops && day.stops.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {day.stops.map((s, si) => (
                            <span key={si} className="inline-flex items-center gap-1.5 bg-muted border border-border text-foreground/80 text-xs font-medium px-3 py-1.5 rounded-full">
                              <MapPin className="w-3 h-3 text-primary shrink-0" /> {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
            )}

            {/* What you will experience — derived from this tour's own stops. */}
            <IncludedExperiences
              included={experiences.included}
              optional={experiences.optional}
              lang={lang}
              t={t}
              destinationNames={destinationNames}
            />

            {/* What's Included / Not Included & Meals night by night */}
            <TourInclusions
              inclusions={inclusions}
              destinationNames={destinationNames}
              t={t}
              className="mb-16"
            />

            <HowBookingWorks t={t} className="mb-10" />

            <TailorJourney
              t={t}
              tripName={tour.name}
              tourId={tour.id}
              lang={lang}
              bookHref={`/${lang}/book`}
              defaultDays={parseDurationDays(tour.duration)}
              className="mb-16"
            />

            {/* Tour depth: why choose / best for / plan with our guides.
                English-authored copy (English-first phase) — same source the
                prerendered HTML uses, so crawler and client content match. */}
            {(() => {
              const depth = getLocalizedTourDepth(tour.id, lang);
              if (!depth.whyChoose.length && !depth.bestFor && !depth.guideLinks.length) return null;
              const allHubs = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO];
              const guidePages = depth.guideLinks
                .map((slug) => allHubs.find((q) => q.slug === slug))
                .filter((p): p is NonNullable<typeof p> => Boolean(p));
              // Base-relative: these go to wouter's <Link>, and the router is
              // mounted with base={`${RAW_BASE}/${lang}`} (App.tsx). Including
              // the locale here made wouter emit /fr/fr/merzouga-guide/… — a
              // path with no prerendered file and no rewrite, i.e. a 404.
              const hubHref = (slug: string) => {
                const p = guidePages.find((q) => q.slug === slug);
                if (!p) return '#';
                if (p.kind === 'comparison') return `/comparisons/${p.slug}`;
                if (p.kind === 'travel-info') return `/travel-info/${p.slug}`;
                return `/merzouga-guide/${p.slug}`;
              };
              return (
                <div className="mb-16 space-y-8">
                  {depth.whyChoose.length > 0 && (
                    <div>
                      <h2 className="font-serif text-4xl text-foreground mb-6">{t('jx_why_choose')}</h2>
                      <ul className="space-y-3">
                        {depth.whyChoose.map((w, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" /> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {depth.bestFor && (
                    <div>
                      <h2 className="font-serif text-4xl text-foreground mb-6">{t('jx_best_for')}</h2>
                      <p className="text-muted-foreground leading-relaxed">{depth.bestFor}</p>
                    </div>
                  )}
                  {guidePages.length > 0 && (
                    <div className="bg-muted/50 border border-border rounded-3xl p-8">
                      <h2 className="font-serif text-3xl text-foreground mb-3">{t('pwig_heading')}</h2>
                      <p className="text-muted-foreground text-sm mb-6">{t('pwig_sub')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {guidePages.map((p) => (
                          <Link key={p.slug} href={hubHref(p.slug)} className="group block bg-background rounded-2xl border border-border p-5 hover:border-primary/50 hover:shadow transition-all">
                            {/* Localized guide title, matching the prerendered
                                markup; falls back to the canonical English title
                                for a locale with no overlay for that guide. */}
                            <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{getLocalizedGuide(p.slug, lang)?.title ?? p.title}</h3>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Luxury Gallery */}
            <div className="mb-16">
              <h2 className="font-serif text-4xl text-foreground mb-8">{t('tour_gallery')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((g, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl border border-border">
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 md:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">{g.caption}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="font-serif text-4xl text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-bold text-foreground">{f.question}</span>
                      <span className="shrink-0 text-primary">{openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 -mt-1 text-muted-foreground text-sm leading-relaxed">{f.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-card border border-border rounded-3xl p-8 shadow-2xl">

              <h3 className="font-serif text-2xl text-foreground mb-2">{t('book_quote_title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t('book_quote_lead')}</p>
              {/* MGA_THREE_DAY_ENRICHED_V1 */}

              {promoOn && (
                <div className="mb-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <PromoBadge />
                    <span className="text-xs font-semibold text-primary">{t('promo_book_before')}</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{t('promo_fineprint')}</p>
                </div>
              )}

              <p className="font-serif text-2xl text-foreground font-bold mb-5">{t('price_tailored')}</p>

              {/* The three steps that actually happen — no payment is taken here. */}
              <ol className="mb-6 space-y-3">
                {[t('book_step1'), t('book_step2'), t('book_step3')].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary-text">{i + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Booking Controls */}
              <div className="space-y-5 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="tour-date">{t('book_select_date')}</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                    <input
                      id="tour-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t('book_travelers')}</span>
                  <div className="flex items-center justify-between bg-background border border-border rounded-xl p-2">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="Decrease travelers"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 rounded-lg bg-muted text-foreground flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label="Increase travelers"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href={promoOn
                    ? waPromoLink(`${t('promo_wa_message')}\n\n${tour.name} · ${travelers}p${date ? ` · ${date}` : ''}`)
                    : waPromoLink(`New Tour Booking Request\n\nTour: ${tour.name}\nTravelers: ${travelers}${date ? `\nTravel dates: ${date}` : ''}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] text-[#0d2b1d] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all hover:-translate-y-1 shadow-lg shadow-[#25D366]/30 text-lg"
                >
                  <SiWhatsapp className="w-6 h-6" aria-hidden="true" /> {promoOn ? t('promo_cta') : t('price_quote_cta')}
                </a>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-widest">or</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>

                <TourInquiryForm
                  tourName={tour.name}
                  lang={lang}
                  travelDate={date}
                  travelers={travelers}
                  t={t}
                />

                <Link href={`/book?tour=${encodeURIComponent(tour.name)}`} className="block w-full bg-foreground text-background text-center py-4 rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-colors text-lg">
                  {t('book_form_cta')}
                </Link>

                <Link href="/contact" className="block w-full bg-background border-2 border-foreground text-foreground text-center py-4 rounded-xl font-bold hover:bg-foreground hover:text-background transition-colors text-lg">
                  {t('book_customize')}
                </Link>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground mb-6">{t('book_quote_note')}</p>

              <ul className="text-sm text-muted-foreground space-y-3 pt-6 border-t border-border">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_fact_private')}</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_fact_quote')}</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {t('book_fact_terms')}</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Related Tours */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-foreground">{t('tour_related')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map(t_ => (
              <Link key={t_.id} href={`/tours/${t_.id}`} className="group block bg-background rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-500">
                <div className="h-56 relative overflow-hidden">
                  <img src={t_.image} alt={t_.name} width={1200} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = '/images/dest/merzouga.webp'; }} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-3 right-3">
                    <PromoBadge compact />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase mb-2 block">{t_.duration}</span>
                  <h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors">{t_.name}</h3>
                  <div className="flex items-center justify-between">
                    <PriceTag price={t_.price} size="sm" />
                    <div className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-sm">
                      {t('tours_view')} <ChevronRight className="w-4 h-4" />
                    </div>
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
