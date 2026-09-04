import { Link } from 'wouter';
import { MapPin, Sparkles, Route, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '../layout/Layout';
import { contactInfo } from '@/data/content';
import { getLocalizedTours, getLocalizedDestinations } from '@/i18n/content';
import { StructuredData, buildBreadcrumb } from '../seo/StructuredData';
import { TourCard } from './TourCard';
import { TourBreadcrumbs } from './TourBreadcrumbs';
import {
  type CityHub,
  TOUR_DEPARTURE_CITY,
  type DepartureCity,
  tourDurationDays,
  durationLabel,
  CITY_HUB_DURATIONS,
  durationHubPath,
} from '@/data/tour-hierarchy';
import { SiWhatsapp } from 'react-icons/si';
import { fmtTemplate } from './intl';

const SITE_URL = 'https://www.moroccograndadventure.com';
const FALLBACK_IMG = '/images/dest/merzouga.webp';

/** Localized group label key for a duration bucket (mirrors durationLabel()). */
function durationLabelKey(days: number): string {
  if (days <= 2) return 'hub_dur_daytrips';
  if (days === 3) return 'hub_dur_3';
  if (days === 4) return 'hub_dur_4';
  if (days <= 6) return 'hub_dur_5_6';
  if (days <= 8) return 'hub_dur_7_8';
  return 'hub_dur_9';
}

export function TourCityHub({ hub }: { hub: CityHub }) {
  const { t, lang } = useLanguage();
  const tours = getLocalizedTours(lang)
    .filter((tour) => TOUR_DEPARTURE_CITY[tour.id] === hub.id)
    .sort((a, b) => tourDurationDays(a.duration) - tourDurationDays(b.duration));

  // Group existing tours by their real duration bucket, preserving order.
  const groups = tours.reduce<{ label: string; days: number; tours: typeof tours }[]>((acc, tour) => {
    const days = tourDurationDays(tour.duration);
    const label = durationLabel(days);
    const existing = acc.find((g) => g.label === label);
    if (existing) existing.tours.push(tour);
    else acc.push({ label, days, tours: [tour] });
    return acc;
  }, []);

  const destinations = getLocalizedDestinations(lang).filter((d) => hub.destinationIds.includes(d.id));

  const cityName = t(`hub_${hub.id}_name`);
  const hubTitle = t(`hub_${hub.id}_title`);

  const crumbs = [
    { label: t('nav_tours'), href: '/tours' },
    { label: hubTitle },
  ];

  const schemaCrumbs = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_tours'), path: '/tours' },
    { name: hubTitle, path: `/tours/from-${hub.slug}` },
  ];

  return (
    <Layout>
      <StructuredData id={`hub-${hub.id}`} data={buildBreadcrumb(schemaCrumbs, lang)} />

      {/* Hero */}
      <section className="relative h-[60vh] w-full flex flex-col justify-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hub.heroImage}
            alt={hub.heroAlt || t(`hub_${hub.id}_hero_alt`)}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-14">
          <span className="inline-block bg-primary/20 backdrop-blur border border-primary/30 text-white text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4">
            {t('nav_tours')}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-5 drop-shadow-xl">
            {hubTitle}
          </h1>
          <p className="text-white/85 text-base md:text-xl font-light max-w-3xl leading-relaxed">
            {t(`hub_${hub.id}_intro`)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/trip-builder"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" /> {t('nav_build_journey')}
            </Link>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1fb959] transition-colors"
            >
              <SiWhatsapp className="w-4 h-4" aria-hidden="true" /> {t('exp_chat_whatsapp')}
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs overlay strip */}
      <div className="bg-black/40 backdrop-blur border-b border-white/10">
        <TourBreadcrumbs items={crumbs} />
      </div>

      {/* Body + duration shortcut */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-muted-foreground">
            <p className="text-lg leading-relaxed">{t(`hub_${hub.id}_body`)}</p>
          </div>

          {hub.hasDurationDrive && (
            <div className="mt-8 bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="bg-primary/15 p-3 rounded-full text-primary shrink-0">
                  <Route className="w-6 h-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-foreground mb-1">{t('hub_short_on_time')}</h2>
                  <p className="text-muted-foreground">
                    {fmtTemplate(t('hub_short_on_time_sub'), { city: cityName })}
                  </p>
                </div>
              </div>
              <Link
                href={`/tours/from-${hub.slug}/3-days`}
                className="shrink-0 text-center bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {fmtTemplate(t('hub_browse_3day'), { city: cityName })}
              </Link>
            </div>
          )}
        </div>
      </section>
{/* Available durations — every /tours/from-<city>/<N>-days route shown here
          is a real, intentional page (real canned tour or custom planning flow). */}
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            {t('hub_short_on_time')}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            {fmtTemplate(t('hub_short_on_time_sub'), { city: cityName })}
          </p>
          <div className="flex flex-wrap gap-3">
            {(CITY_HUB_DURATIONS[hub.id] ?? []).map((days) => (
              <Link
                key={days}
                href={durationHubPath(hub.id as DepartureCity, days)}
                className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2.5 font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <Clock className="w-4 h-4" aria-hidden="true" />
                {fmtTemplate(t('hub_group_days_badge'), { days })}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Available tours grouped by duration */}
      {groups.length > 0 && (
        <section className="py-16 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {fmtTemplate(t('hub_private_title'), { city: cityName })}
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              {fmtTemplate(t('hub_private_sub'), { city: cityName })}
            </p>
            <div className="space-y-14">
              {groups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                    <span className="bg-primary/15 text-primary font-bold text-sm px-3 py-1 rounded-full">
                      {fmtTemplate(t('hub_group_days_badge'), { days: group.days })}
                    </span>
                    {t(durationLabelKey(group.days))}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.tours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
{/* Explore the region */}
      {destinations.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {fmtTemplate(t('hub_explore_region'), { city: cityName })}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {fmtTemplate(t('hub_explore_region_sub'), { city: cityName })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <span className="bg-primary/15 p-2.5 rounded-full text-primary shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{dest.shortDesc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Design your own / CTA */}
      <section className="py-16 md:py-24 bg-[#102a1e] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
            {fmtTemplate(t('hub_custom_title'), { city: cityName })}
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            {fmtTemplate(t('hub_custom_sub'), { city: cityName })}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trip-builder"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg"
            >
              {t('nav_build_journey')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 rounded-full font-bold tracking-wide hover:bg-white/10 transition-colors"
            >
              {t('book_customize')}
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/50">
            {contactInfo.website.replace('https://www.', '')} · {contactInfo.whatsappNumber}
          </p>
        </div>
      </section>
    </Layout>
  );
}