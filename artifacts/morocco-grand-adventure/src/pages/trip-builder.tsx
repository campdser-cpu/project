import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo, destinations, destinationImageAlt } from '@/data/content';
import { trackEvent } from '@/lib/analytics';
import { buildMailtoHref } from '@/lib/inquiryChannels';
import { categoryLabel, getLocalizedDestinations } from '@/i18n/content';
import { fmtTemplate } from '@/components/tours/intl';
import { SiWhatsapp } from 'react-icons/si';
import { useNumberField } from '@/hooks/use-number-field';
import {
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Car,
  Info,
  Mail,
  Home,
  User,
  Phone,
  Globe
} from 'lucide-react';

type Budget = '<$300' | '$300-600' | '$600-1000' | '>$1000';
type Accommodation = 'standard' | 'comfort' | 'luxury';

// A short, fixed list rather than a full country picker: these are the
// business's named priority markets plus the next most common ones, kept as
// a native <select> (no new picker library). "Other" covers every market
// not listed rather than forcing a guess.
const COUNTRY_OPTIONS = [
  'United States', 'United Kingdom', 'Italy', 'Spain', 'Netherlands',
  'Germany', 'France', 'Canada', 'Australia',
] as const;

// Internal ids matching destinations[].id / CITY_HUBS — stable for coordinate
// lookups, analytics and routing regardless of locale. Display label comes
// from the existing hub_{id}_name translation via cityLabel() below.
const CITY_IDS = ['casablanca', 'marrakech', 'tangier', 'fes', 'agadir'];

const INTERESTS_DATA = [
  { id: 'sahara', key: 'tb_interest_sahara' as const, icon: '🏜️' },
  { id: 'camel', key: 'tb_interest_camel' as const, icon: '🐪' },
  { id: 'imperial', key: 'tb_interest_imperial' as const, icon: '🏰' },
  { id: 'atlas', key: 'tb_interest_atlas' as const, icon: '🏔️' },
  { id: 'surf', key: 'tb_interest_surf' as const, icon: '🌊' },
  { id: 'photo', key: 'tb_interest_photo' as const, icon: '📸' },
  { id: 'food', key: 'tb_interest_food' as const, icon: '🍽️' },
  { id: 'romance', key: 'tb_interest_romance' as const, icon: '💑' },
  { id: 'family', key: 'tb_interest_family' as const, icon: '👨‍👩‍👧' },
  { id: 'culture', key: 'tb_interest_culture' as const, icon: '🎭' },
  { id: 'yoga', key: 'tb_interest_yoga' as const, icon: '🧘' },
  { id: 'nature', key: 'tb_interest_nature' as const, icon: '🌿' },
  { id: 'music', key: 'tb_interest_music' as const, icon: '🎵' },
];

const BUDGET_KEYS: { value: Budget; labelKey: string; descKey: string }[] = [
  { value: '<$300', labelKey: 'tb_budget_budget', descKey: 'tb_budget_budget_desc' },
  { value: '$300-600', labelKey: 'tb_budget_comfort', descKey: 'tb_budget_comfort_desc' },
  { value: '$600-1000', labelKey: 'tb_budget_luxury', descKey: 'tb_budget_luxury_desc' },
  { value: '>$1000', labelKey: 'tb_budget_ultra', descKey: 'tb_budget_ultra_desc' },
];

// Section 10, Phase 2.1 — Trip Builder currency display.
//
// Reference rates used ONLY to pre-compute the rounded, approximate GBP/EUR
// range text below — never a live rate, never shown with false precision.
// Set 2026-11-10: 1 USD ≈ £0.80, 1 USD ≈ €0.95. These are deliberately
// round, conservative, manually-set figures, not a market quote; review
// periodically (e.g. every 6 months) since they will drift from real rates
// over time — an accepted tradeoff of not calling a live FX API.
//
// The underlying `Budget` identifiers above are NEVER changed by any of
// this: for USD the display text is simply `value` itself (already exactly
// today's text), and GBP/EUR only ever affect what is rendered/sent in the
// human-readable message, never the `budget` analytics parameter or the
// itinerary/estimate logic (neither of which reads currency at all).
type DisplayCurrency = 'USD' | 'GBP' | 'EUR';
const EUR_LOCALES = ['de', 'nl', 'it', 'es'] as const;
const GBP_RANGE_KEY: Record<Budget, string> = {
  '<$300': 'tb_budget_budget_range_gbp',
  '$300-600': 'tb_budget_comfort_range_gbp',
  '$600-1000': 'tb_budget_luxury_range_gbp',
  '>$1000': 'tb_budget_ultra_range_gbp',
};
const EUR_RANGE_KEY: Record<Budget, string> = {
  '<$300': 'tb_budget_budget_range_eur',
  '$300-600': 'tb_budget_comfort_range_eur',
  '$600-1000': 'tb_budget_luxury_range_eur',
  '>$1000': 'tb_budget_ultra_range_eur',
};
function budgetRangeText(value: Budget, currency: DisplayCurrency, t: (key: string) => string): string {
  if (currency === 'USD') return value;
  if (currency === 'GBP') return t(GBP_RANGE_KEY[value]);
  return t(EUR_RANGE_KEY[value]);
}

const ACCOMMODATION_KEYS: { value: Accommodation; labelKey: string; descKey: string }[] = [
  { value: 'standard', labelKey: 'tb_accommodation_standard', descKey: 'tb_accommodation_standard_desc' },
  { value: 'comfort', labelKey: 'tb_accommodation_comfort', descKey: 'tb_accommodation_comfort_desc' },
  { value: 'luxury', labelKey: 'tb_accommodation_luxury', descKey: 'tb_accommodation_luxury_desc' },
];

/** Localized month names generated from the runtime's own Intl data rather
 * than 12 new translation keys per language — always correct, zero
 * translation-maintenance burden. */
function monthOptions(lang: string): { value: string; label: string }[] {
  const fmt = new Intl.DateTimeFormat(lang, { month: 'long' });
  return Array.from({ length: 12 }, (_, i) => {
    const label = fmt.format(new Date(2000, i, 1));
    return { value: String(i + 1).padStart(2, '0'), label: label.charAt(0).toUpperCase() + label.slice(1) };
  });
}

/** Trip length the request flow supports: one day to a full month. */
const clampDays = (raw: string): number => {
  const n = parseInt(raw, 10);
  return Number.isNaN(n) ? 1 : Math.max(1, Math.min(30, n));
};

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1.3; // roughly 1.3x for driving via roads
};

const getCityCoords = (cityId: string) => {
  const c = destinations.find(d => d.id === cityId);
  return c ? c.coords : { lat: 33.5731, lng: -7.5898 };
};

const stepVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function TripBuilder() {
  const { t, lang } = useLanguage();
  
  const cityLabel = (id: string) => t(`hub_${id}_name` as Parameters<typeof t>[0]);
  const localizedDestinations = useMemo(() => getLocalizedDestinations(lang), [lang]);

  const [step, setStep] = useState(1);
  const [arrival, setArrival] = useState(CITY_IDS[0]);
  const [departure, setDeparture] = useState(CITY_IDS[1]);
  const [days, setDays] = useState(7);
  const daysField = useNumberField(days, setDays, 1, 30);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<Budget>('$300-600');
  // EN visitors can toggle USD/GBP; the choice only matters while lang==='en'.
  // DE/NL/IT/ES always resolve to EUR below, with no selector; every other
  // locale always resolves to USD, i.e. exactly today's behavior, unchanged.
  const [currencyChoice, setCurrencyChoice] = useState<'USD' | 'GBP'>('USD');
  const currency: DisplayCurrency = lang === 'en'
    ? currencyChoice
    : (EUR_LOCALES as readonly string[]).includes(lang) ? 'EUR' : 'USD';
  const [accommodation, setAccommodation] = useState<Accommodation>('comfort');
  const [exactDate, setExactDate] = useState('');
  const [approxMonth, setApproxMonth] = useState('');
  const months = useMemo(() => monthOptions(lang), [lang]);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCountry, setContactCountry] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  // Section 10, Phase 2.2.4: tracks which external app (WhatsApp/email) the
  // visitor opened from step 6 — never set to mean "sent", since a wa.me/
  // mailto link hands off to an external app this site has no way to confirm
  // was actually used to send anything. Purely for the "opened, now go send
  // it" acknowledgment; does not gate or alter the links/validation below.
  const [openedInquiryVia, setOpenedInquiryVia] = useState<'whatsapp' | 'email' | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Fires exactly once per mount — captures a genuine start regardless of
  // entry path (an internal link, a bookmark, or an organic landing directly
  // on /trip-builder), unlike the existing `start_booking` event in
  // Layout.tsx, which only fires when a visitor clicks an internal link
  // *to* this page and therefore misses direct/organic arrivals.
  useEffect(() => {
    trackEvent('trip_builder_start', { language: lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Per-step funnel, so step-level drop-off is visible. Step number only —
  // never any of the trip/contact details collected on later steps.
  useEffect(() => {
    trackEvent('trip_builder_step', { step, language: lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 10) return prev; // max 10
      return [...prev, id];
    });
  };

  const itineraryData = useMemo(() => {
    if (selectedDestinations.length === 0) return { itinerary: [], totalDistance: 0, nights: [] };
    
    const selectedList = localizedDestinations.filter(d => selectedDestinations.includes(d.id));
    let currentLoc = getCityCoords(arrival);
    let remaining = [...selectedList];
    const route = [];
    
    while (remaining.length > 0) {
      let closestIdx = 0;
      let minD = Infinity;
      remaining.forEach((r, idx) => {
        const d = getDistance(currentLoc.lat, currentLoc.lng, r.coords.lat, r.coords.lng);
        if (d < minD) {
          minD = d;
          closestIdx = idx;
        }
      });
      const next = remaining[closestIdx];
      route.push(next);
      currentLoc = next.coords;
      remaining.splice(closestIdx, 1);
    }
    
    const routeLengthToDistribute = Math.max(1, days - 1);
    const routeDays = Array(route.length).fill(0);
    for(let i=0; i<route.length && i<routeLengthToDistribute; i++) {
      routeDays[i] = 1;
    }
    let daysLeft = routeLengthToDistribute - routeDays.reduce((a,b)=>a+b,0);
    let i = 0;
    while(daysLeft > 0) {
      routeDays[i % route.length]++;
      daysLeft--;
      i++;
    }
    
    const itinerary = [];
    let currentDay = 1;
    let lastCoords = getCityCoords(arrival);
    let totalDistance = 0;
    const nights: string[] = [];
    
    route.forEach((dest, idx) => {
      const daysHere = routeDays[idx];
      for (let d = 0; d < daysHere; d++) {
        if (d === 0) {
          const dist = getDistance(lastCoords.lat, lastCoords.lng, dest.coords.lat, dest.coords.lng);
          totalDistance += dist;
          itinerary.push({
            day: currentDay,
            title: currentDay === 1 ? `${t('tb_itinerary_arrival')} ${dest.name}` : `${t('tb_itinerary_journey')} ${dest.name}`,
            description: fmtTemplate(t('tb_desc_travel_to'), { name: dest.name, desc: dest.shortDesc }),
            distance: Math.round(dist),
            dest,
            stay: dest.name
          });
          lastCoords = dest.coords;
        } else {
          itinerary.push({
            day: currentDay,
            title: `${t('tb_itinerary_exploring')} ${dest.name}`,
            description: fmtTemplate(t('tb_desc_discover'), { name: dest.name, highlights: dest.highlights.join(', ') }),
            distance: 0,
            dest,
            stay: dest.name
          });
        }
        nights.push(dest.name);
        currentDay++;
      }
    });
    
    const distToDep = getDistance(lastCoords.lat, lastCoords.lng, getCityCoords(departure).lat, getCityCoords(departure).lng);
    totalDistance += distToDep;
    // A one-day trip has no separate departure day: the arrival day is the
    // whole trip. Only add the onward-travel day when the trip is longer,
    // otherwise asking for 1 day would show a two-day itinerary.
    if (days > 1) {
      itinerary.push({
        day: currentDay,
        title: `${t('tb_itinerary_departure')} ${cityLabel(departure)}`,
        description: fmtTemplate(t('tb_desc_onward'), { city: cityLabel(departure) }),
        distance: Math.round(distToDep),
        dest: null,
        stay: null
      });
    }

    return { itinerary, totalDistance, nights: [...new Set(nights)] };
  }, [arrival, departure, days, selectedDestinations, localizedDestinations, t]);

  // Shared content for both channels — WhatsApp wraps section headers in
  // *bold* (its own markdown); email uses the same lines without it, since
  // plain-text email clients render literal asterisks rather than bold.
  const summaryLines = useMemo((): { whatsapp: string[]; plain: string[] } => {
    const interestLabels = selectedInterests
      .map(id => {
        const item = INTERESTS_DATA.find(i => i.id === id);
        return item ? t(item.key) : id;
      })
      .filter(Boolean);
    const destNames = selectedDestinations.map(id => localizedDestinations.find(d=>d.id===id)?.name).filter(Boolean);
    const accommodationLabel = ACCOMMODATION_KEYS.find(a => a.value === accommodation)?.labelKey;
    const monthLabel = approxMonth ? months.find(m => m.value === approxMonth)?.label : '';
    const dateLine = exactDate ? exactDate : (monthLabel ? monthLabel : t('tb_dates_month_flexible'));
    // When a non-USD display currency is active, the message states the
    // internal tier name AND the approximate converted range AND the
    // currency, explicitly marked indicative — never silently swapping the
    // internal `budget` identifier (used for analytics below) for a
    // converted figure. When currency is USD (the default everywhere except
    // an EN visitor who toggled to GBP, or a DE/NL/IT/ES visitor), this is
    // byte-for-byte the same line the message has always sent.
    const budgetTierLabel = BUDGET_KEYS.find(b => b.value === budget)?.labelKey;
    const budgetLine = currency === 'USD'
      ? `- Budget: ${budget}`
      : `- Budget: ${fmtTemplate(t('tb_budget_message_converted'), {
          tier: budgetTierLabel ? t(budgetTierLabel) : budget,
          range: budgetRangeText(budget, currency, t),
          currency,
        })}`;

    const build = (bold: (s: string) => string) => {
      const lines = [
        bold('New Bespoke Journey Request'),
        '',
        bold('Basics:'),
        `- Route: ${cityLabel(arrival)} to ${cityLabel(departure)}`,
        `- Duration: ${days} days`,
        `- Travelers: ${travelers}`,
        budgetLine,
        `- Accommodation: ${accommodationLabel ? t(accommodationLabel as Parameters<typeof t>[0]) : accommodation}`,
        `- Travel dates: ${dateLine}`,
        `- Interests: ${interestLabels.length ? interestLabels.join(', ') : '—'}`,
        '',
        bold('Destinations:'),
        destNames.length ? destNames.join(', ') : '—',
      ];
      if (itineraryData.itinerary.length > 0) {
        lines.push('', bold('Day-by-day itinerary:'));
        for (const d of itineraryData.itinerary) {
          lines.push(`Day ${d.day}: ${d.title}${d.distance > 0 ? ` — ${d.distance} km drive` : ''}`);
        }
        lines.push('', `Total driving distance: ~${Math.round(itineraryData.totalDistance)} km`);
      }
      if (contactName || contactEmail || contactCountry || contactPhone) {
        lines.push('', bold('Contact details:'));
        if (contactName) lines.push(`- Name: ${contactName}`);
        if (contactEmail) lines.push(`- Email: ${contactEmail}`);
        if (contactCountry) lines.push(`- Country: ${contactCountry}`);
        if (contactPhone) lines.push(`- Phone/WhatsApp: ${contactPhone}`);
      }
      return lines;
    };
    return { whatsapp: build((s) => `*${s}*`), plain: build((s) => s) };
  }, [t, arrival, departure, days, travelers, budget, currency, accommodation, exactDate, approxMonth, months, selectedInterests, selectedDestinations, itineraryData, localizedDestinations, contactName, contactEmail, contactCountry, contactPhone]);

  const whatsappLink = useMemo(() => {
    // Multi-line message built with real newlines, then URL-encoded as a
    // whole (manual %0A + raw interpolation breaks on values containing & or #).
    return `${contactInfo.whatsapp}?text=${encodeURIComponent(summaryLines.whatsapp.join('\n'))}`;
  }, [summaryLines]);

  const emailLink = useMemo(
    () => buildMailtoHref(
      `New Bespoke Journey Request — Morocco Grand Adventure`,
      summaryLines.plain.join('\n'),
    ),
    [summaryLines],
  );

  // Section 10, Phase 2.2.4 (correction): the "opened WhatsApp/email" notice
  // must only ever describe the most recent click against the CURRENT trip
  // details — never linger after the visitor has left step 6 or changed
  // anything the outgoing message is built from. `summaryLines` is already
  // the single memo the message itself is derived from (recomputes whenever
  // any of arrival/departure/days/travelers/budget/currency/accommodation/
  // dates/interests/destinations/contact fields change), so depending on it
  // here — rather than re-listing those fields a second time — keeps this
  // effect correct by construction instead of by a second, driftable list.
  useEffect(() => {
    setOpenedInquiryVia(null);
  }, [step, summaryLines]);

  return (
    <Layout>
      <div className="bg-background pt-32 pb-24 min-h-screen relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('tb_badge')}</span>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">{t('tb_heading')}</h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t('tb_sub')}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-16 relative flex items-center justify-between w-full max-w-3xl mx-auto px-2">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-border z-0 mx-6"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0 transition-all duration-700 ease-in-out mx-6"
              style={{ width: `calc(${((step - 1) / 5) * 100}% - 48px)` }}
            ></div>

            {[1, 2, 3, 4, 5, 6].map(s => (
              <div
                key={s}
                onClick={() => {
                  if (s < step || (s === 5 && selectedDestinations.length >= 2)) {
                    setStep(s);
                  }
                }}
                className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-sm ${
                  step >= s
                    ? 'bg-primary text-primary-foreground shadow-primary/20 scale-110 cursor-pointer'
                    : 'bg-card border-2 border-border text-muted-foreground opacity-70'
                } ${s < step ? 'cursor-pointer hover:scale-110 hover:bg-primary/90' : ''}`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : s}
                <span className={`absolute -bottom-8 text-[9px] md:text-xs font-bold uppercase tracking-wider text-center leading-tight whitespace-nowrap transition-colors ${
                  step === s ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {s === 1 && t('tb_basics')}
                  {s === 2 && t('tb_interests')}
                  {s === 3 && t('tb_places')}
                  {s === 4 && t('tb_trip_style')}
                  {s === 5 && t('tb_itinerary_label')}
                  {s === 6 && t('tb_your_details')}
                </span>
              </div>
            ))}
          </div>
          
          {/* Main Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-[2rem] shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative z-20">
            <div className="p-8 md:p-12 lg:p-16 flex-grow relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">1. {t('tb_basics_heading')}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                      {/* Arrival & Departure */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{t('tb_arrival')}</label>
                          <div className="relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            <select value={arrival} onChange={e => setArrival(e.target.value)} className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer shadow-sm">
                              {CITY_IDS.map(id => <option key={id} value={id}>{cityLabel(id)}</option>)}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                              <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{t('tb_departure')}</label>
                          <div className="relative group">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            <select value={departure} onChange={e => setDeparture(e.target.value)} className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer shadow-sm">
                              {CITY_IDS.map(id => <option key={id} value={id}>{cityLabel(id)}</option>)}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                              <ChevronRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Duration & Travelers */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-3">
                            <label htmlFor="tb-days" className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('tb_duration_label')}</label>
                            <span className="font-bold text-primary">{days} {t('days')}</span>
                          </div>
                          {/* 1–30 days: a month in Morocco is a request we support,
                              so the control must be able to express it. The number
                              box beside the slider makes an exact value reachable
                              without dragging — easier on a phone and with a
                              keyboard. */}
                          <div className="flex items-center gap-4 bg-background border border-border rounded-2xl p-5 shadow-sm">
                            <Calendar className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
                            <input
                              id="tb-days"
                              type="range"
                              min={1}
                              max={30}
                              value={days}
                              aria-describedby="tb-days-hint"
                              onChange={e => setDays(clampDays(e.target.value))}
                              className="w-full accent-primary h-2 bg-muted rounded-full appearance-none cursor-pointer"
                            />
                            <input
                              type="number"
                              inputMode="numeric"
                              min={1}
                              max={30}
                              value={daysField.value}
                              aria-label={t('tb_duration_label')}
                              onChange={e => daysField.onChange(e.target.value)}
                              onBlur={daysField.onBlur}
                              className="w-20 shrink-0 rounded-xl border border-border bg-background px-3 py-2 text-center text-base font-bold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <p id="tb-days-hint" className="mt-2 text-sm text-muted-foreground">{t('jx_f_days_hint')}</p>
                        </div>
                        <div>
                          <div className="flex justify-between mb-3">
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('tb_travelers')}</label>
                            <span className="font-bold text-primary">{travelers} {travelers === 1 ? t('person') : t('persons')}</span>
                          </div>
                          <div className="flex items-center gap-6 bg-background border border-border rounded-2xl p-5 shadow-sm">
                            <Users className="w-6 h-6 text-primary shrink-0" />
                            <input type="range" min="1" max="10" value={travelers} onChange={e => setTravelers(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-muted rounded-full appearance-none cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">2. {t('tb_interests_heading')}</h2>
                        <p className="text-muted-foreground text-lg">{t('tb_interests_sub')}</p>
                      </div>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                        {selectedInterests.length} {t('tb_selected')}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {INTERESTS_DATA.map(interest => {
                        const isSelected = selectedInterests.includes(interest.id);
                        return (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border text-base font-medium transition-all duration-300 ${
                              isSelected 
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg transform -translate-y-1' 
                                : 'bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-sm'
                            }`}
                          >
                            <span className="text-2xl">{interest.icon}</span>
                            <span>{t(interest.key)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">3. {t('tb_places_heading')}</h2>
                        <p className="text-muted-foreground text-lg">{t('tb_places_sub')}</p>
                      </div>
                      <span className={`text-sm font-bold px-5 py-2.5 rounded-full border shadow-sm ${
                        selectedDestinations.length >= 2 && selectedDestinations.length <= 10
                          ? 'bg-green-500/10 text-green-600 border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                      }`}>
                        {selectedDestinations.length} / 10 {t('tb_selected')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                      {localizedDestinations.map(dest => {
                        const isSelected = selectedDestinations.includes(dest.id);
                        return (
                          <button
                            key={dest.id}
                            onClick={() => toggleDestination(dest.id)}
                            className={`group relative text-left rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                              isSelected 
                                ? 'border-primary shadow-xl ring-4 ring-primary/20 ring-offset-2 ring-offset-background scale-[1.02]' 
                                : 'border-transparent shadow-sm hover:shadow-md hover:border-primary/40'
                            }`}
                          >
                            <div className="h-48 md:h-56 relative">
                              <img
                                src={dest.image}
                                srcSet={`${dest.image.replace(/\.webp$/, '-480w.webp')} 480w, ${dest.image.replace(/\.webp$/, '-768w.webp')} 768w, ${dest.image} 1200w`}
                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                alt={destinationImageAlt(dest, dest.name, t('dest_alt_unverified'))}
                                width={800}
                                height={600}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                              
                              {isSelected && (
                                <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg scale-in">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                              )}
                              
                              <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-wider block mb-1.5 drop-shadow-md">{categoryLabel(dest.category, lang)}</span>
                                <h3 className="font-serif text-2xl text-white leading-tight drop-shadow-md">{dest.name}</h3>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">4. {t('tb_trip_style_heading')}</h2>
                    <p className="text-muted-foreground text-lg mb-2">{t('tb_trip_style_sub')}</p>

                    {/* Budget — moved here from Step 1 so travel style (budget +
                        accommodation) is decided together, and Step 1 stays
                        purely about logistics. */}
                    <div className="pt-6 border-t border-border">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('tb_budget')}</label>
                        {/* Currency selector — English only (USD default, explicit
                            GBP option). DE/NL/IT/ES show EUR with no selector;
                            every other locale is untouched, since `currency`
                            resolves to 'USD' for them exactly as it always has. */}
                        {lang === 'en' && (
                          <div role="group" aria-label={t('tb_currency_group_label')} className="inline-flex rounded-full border border-border p-1 gap-1">
                            <button
                              type="button"
                              aria-pressed={currencyChoice === 'USD'}
                              onClick={() => setCurrencyChoice('USD')}
                              className={`min-w-[44px] min-h-[44px] px-4 rounded-full text-sm font-bold transition-colors ${
                                currencyChoice === 'USD' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                              }`}
                            >
                              {t('tb_currency_usd')}
                            </button>
                            <button
                              type="button"
                              aria-pressed={currencyChoice === 'GBP'}
                              onClick={() => setCurrencyChoice('GBP')}
                              className={`min-w-[44px] min-h-[44px] px-4 rounded-full text-sm font-bold transition-colors ${
                                currencyChoice === 'GBP' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                              }`}
                            >
                              {t('tb_currency_gbp')}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {BUDGET_KEYS.map(b => (
                          <button
                            key={b.value}
                            onClick={() => setBudget(b.value)}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
                              budget === b.value
                                ? 'bg-primary/5 border-primary shadow-md transform -translate-y-1'
                                : 'bg-background border-border hover:border-primary/50 hover:shadow-sm'
                            }`}
                          >
                            <div className={`font-bold mb-2 text-lg ${budget === b.value ? 'text-primary' : 'text-foreground'}`}>
                              {t(b.labelKey as Parameters<typeof t>[0])}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {fmtTemplate(t(b.descKey as Parameters<typeof t>[0]), { range: budgetRangeText(b.value, currency, t) })}
                            </div>
                          </button>
                        ))}
                      </div>
                      {/* Indicative-only disclaimer — shown whenever a converted
                          (non-USD) figure is on screen: GBP for an EN visitor who
                          toggled it, or EUR for DE/NL/IT/ES by default. */}
                      {currency !== 'USD' && (
                        <p className="text-xs text-muted-foreground mt-4">{t('tb_currency_note')}</p>
                      )}
                    </div>

                    {/* Accommodation preference — separate from budget tier:
                        budget is a daily spend range, this is the style of
                        stay, so a traveler can be e.g. "Comfort" budget but
                        still want to know we understand "Luxury" nights are
                        possible for part of the trip. */}
                    <div className="pt-8 border-t border-border">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">{t('tb_accommodation_label')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {ACCOMMODATION_KEYS.map(a => (
                          <button
                            key={a.value}
                            onClick={() => setAccommodation(a.value)}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 ${
                              accommodation === a.value
                                ? 'bg-primary/5 border-primary shadow-md transform -translate-y-1'
                                : 'bg-background border-border hover:border-primary/50 hover:shadow-sm'
                            }`}
                          >
                            <Home className={`w-5 h-5 shrink-0 mt-1 ${accommodation === a.value ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                            <div>
                              <div className={`font-bold mb-1 text-lg ${accommodation === a.value ? 'text-primary' : 'text-foreground'}`}>
                                {t(a.labelKey as Parameters<typeof t>[0])}
                              </div>
                              <div className="text-sm text-muted-foreground">{t(a.descKey as Parameters<typeof t>[0])}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travel dates — an optional exact date plus an
                        approximate-month fallback, rather than a full
                        calendar widget (keeps this lightweight, no new
                        date-picker dependency). Either is enough to proceed;
                        neither is required. */}
                    <div className="pt-8 border-t border-border">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">{t('tb_dates_label')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="tb-exact-date" className="block text-sm font-medium text-foreground mb-2">{t('tb_dates_exact_label')}</label>
                          <div className="relative">
                            <Calendar className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                            <input
                              id="tb-exact-date"
                              type="date"
                              min={new Date().toISOString().slice(0, 10)}
                              value={exactDate}
                              onChange={e => { setExactDate(e.target.value); if (e.target.value) setApproxMonth(''); }}
                              className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="tb-approx-month" className="block text-sm font-medium text-foreground mb-2">{t('tb_dates_month_label')}</label>
                          <select
                            id="tb-approx-month"
                            value={approxMonth}
                            onChange={e => { setApproxMonth(e.target.value); if (e.target.value) setExactDate(''); }}
                            className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 px-6 text-foreground font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
                          >
                            <option value="">{t('tb_dates_month_flexible')}</option>
                            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                          </select>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{t('tb_dates_hint')}</p>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">5. {t('tb_itinerary_heading')}</h2>

                    {selectedDestinations.length < 2 ? (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 p-8 rounded-3xl flex items-start gap-5 shadow-sm">
                        <Info className="w-8 h-8 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-xl mb-2">{t('tb_error_min_dest')}</h4>
                          <p className="text-lg">{t('tb_error_min_dest_sub')}</p>
                          <button 
                            onClick={() => setStep(3)}
                            className="mt-6 bg-yellow-500 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-yellow-600 transition-colors"
                          >
                            {t('back')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                          <div className="bg-background p-6 rounded-3xl border border-border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider mb-2 font-bold">{t('tb_summary_days')}</span>
                            <span className="font-serif text-2xl md:text-3xl text-primary">{days}</span>
                          </div>
                          <div className="bg-background p-6 rounded-3xl border border-border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider mb-2 font-bold">{t('tb_summary_travelers')}</span>
                            <span className="font-serif text-2xl md:text-3xl text-primary">{travelers}</span>
                          </div>
                          <div className="bg-background p-6 rounded-3xl border border-border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider mb-2 font-bold">{t('tb_summary_driving')}</span>
                            <span className="font-serif text-2xl md:text-3xl text-primary">{Math.round(itineraryData.totalDistance)} km</span>
                          </div>
                          <div className="bg-background p-6 rounded-3xl border border-border flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider mb-2 font-bold">{t('tb_summary_destinations')}</span>
                            <span className="font-serif text-2xl md:text-3xl text-primary">{itineraryData.nights.length}</span>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 md:pl-14 space-y-10 before:absolute before:left-[15px] md:before:left-[27px] before:top-6 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/50 before:to-primary/20">
                          {itineraryData.itinerary.map((day, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-8 md:-left-14 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold ring-4 ring-card z-10 transform -translate-x-1/2 mt-2 shadow-md group-hover:scale-110 transition-transform">
                                {day.day}
                              </div>
                              <div className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                                <h4 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{day.title}</h4>
                                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">{day.description}</p>
                                
                                {day.distance > 0 && (
                                  <div className="flex items-center gap-3 text-sm font-bold text-foreground bg-muted w-fit px-4 py-2.5 rounded-xl border border-border">
                                    <Car className="w-5 h-5 text-primary" />
                                    <span>{t('km_drive')}: {day.distance} km</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">6. {t('tb_contact_heading')}</h2>
                    <p className="text-muted-foreground text-lg mb-2">{t('tb_contact_sub')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="tb-contact-name" className="block text-sm font-medium text-foreground mb-2">{t('tb_contact_name')}</label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                          <input
                            id="tb-contact-name"
                            type="text"
                            autoComplete="name"
                            value={contactName}
                            onChange={e => setContactName(e.target.value)}
                            placeholder={t('tb_contact_name_ph')}
                            className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="tb-contact-country" className="block text-sm font-medium text-foreground mb-2">{t('tb_contact_country')}</label>
                        <div className="relative">
                          <Globe className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                          <select
                            id="tb-contact-country"
                            value={contactCountry}
                            onChange={e => setContactCountry(e.target.value)}
                            className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
                          >
                            <option value="">{t('tb_contact_country_ph')}</option>
                            {COUNTRY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            <option value="Other">{t('tb_contact_country_other')}</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="tb-contact-email" className="block text-sm font-medium text-foreground mb-2">{t('tb_contact_email')}</label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                          <input
                            id="tb-contact-email"
                            type="email"
                            autoComplete="email"
                            value={contactEmail}
                            onChange={e => setContactEmail(e.target.value)}
                            placeholder={t('tb_contact_email_ph')}
                            className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                          />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{t('tb_contact_email_hint')}</p>
                      </div>
                      <div>
                        <label htmlFor="tb-contact-phone" className="block text-sm font-medium text-foreground mb-2">{t('tb_contact_phone')}</label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-hidden="true" />
                          <input
                            id="tb-contact-phone"
                            type="tel"
                            autoComplete="tel"
                            value={contactPhone}
                            onChange={e => setContactPhone(e.target.value)}
                            placeholder={t('tb_contact_phone_ph')}
                            className="w-full bg-background border border-border hover:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-foreground font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{t('tb_contact_privacy')}</p>

                    <div className="rounded-2xl bg-muted/50 border border-border p-5 text-sm text-muted-foreground text-center">
                      {t('tb_quote_note')}
                    </div>

                    {/* Section 10, Phase 2.2.2: the WhatsApp/Email submit buttons in the
                        footer below are disabled under this same condition (selectedDestinations.length < 2)
                        — step 5 already explains this, but a visitor who skipped step 3 and
                        moved straight through to step 6 would otherwise see the buttons
                        silently disabled with no explanation on this step itself. */}
                    {selectedDestinations.length < 2 && (
                      <div id="tb-min-dest-notice" className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 p-5 rounded-2xl flex items-start gap-4">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm">{t('tb_error_min_dest_contact')}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="bg-background/50 p-6 md:p-8 border-t border-border flex items-center justify-between">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors px-4 py-3 rounded-xl hover:bg-muted"
                >
                  <ChevronLeft className="w-5 h-5" /> {t('back')}
                </button>
              ) : (
                <div />
              )}
              
              {step < 6 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl group"
                >
                  {t('next')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-describedby={selectedDestinations.length < 2 ? 'tb-min-dest-notice' : undefined}
                    onClick={() => {
                      trackEvent('submit_inquiry', {
                        form_id: 'trip-builder',
                        source_page: 'trip-builder',
                        journey_route: `${arrival} to ${departure}`,
                        duration_days: days,
                        travelers,
                        budget,
                        accommodation,
                        travel_date: exactDate || approxMonth || 'flexible',
                        destinations: selectedDestinations.join(', '),
                        interests: selectedInterests.join(', '),
                        has_contact_email: !!contactEmail,
                        contact_country: contactCountry || undefined,
                        language: lang,
                        method: 'whatsapp',
                      });
                      setOpenedInquiryVia('whatsapp');
                    }}
                    className={`flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,168,76,0.4)] group ${selectedDestinations.length < 2 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    <SiWhatsapp className="w-5 h-5" aria-hidden="true" /> {t('cc_whatsapp_btn')}
                  </a>
                  <a
                    href={emailLink}
                    aria-describedby={selectedDestinations.length < 2 ? 'tb-min-dest-notice' : undefined}
                    onClick={() => {
                      trackEvent('submit_inquiry', {
                        form_id: 'trip-builder',
                        source_page: 'trip-builder',
                        journey_route: `${arrival} to ${departure}`,
                        duration_days: days,
                        travelers,
                        budget,
                        accommodation,
                        travel_date: exactDate || approxMonth || 'flexible',
                        destinations: selectedDestinations.join(', '),
                        interests: selectedInterests.join(', '),
                        has_contact_email: !!contactEmail,
                        contact_country: contactCountry || undefined,
                        language: lang,
                        method: 'email_mailto',
                      });
                      setOpenedInquiryVia('email');
                    }}
                    className={`flex items-center justify-center gap-3 border-2 border-foreground text-foreground px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-foreground hover:text-background group ${selectedDestinations.length < 2 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" /> {t('cc_email_btn')}
                  </a>
                </div>
              )}
            </div>
            {/* Section 10, Phase 2.2.4: honest acknowledgment that the external
                app was opened — never claims the inquiry was actually sent or
                received, since a wa.me/mailto hand-off gives this site no way
                to confirm that. Reuses the exact, already-published 24-hour
                response-time line from TailorJourney.tsx (jx_response_time),
                not a new promise. */}
            {step === 6 && openedInquiryVia && (
              <div className="px-6 pb-6 md:px-8 md:pb-8 -mt-2">
                <div role="status" className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                  <p>
                    {openedInquiryVia === 'whatsapp' ? t('tb_opened_whatsapp') : t('tb_opened_email')}{' '}
                    {t('jx_response_time')}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
