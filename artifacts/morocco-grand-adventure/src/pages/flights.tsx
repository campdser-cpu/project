import { useId, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmtTemplate } from '../components/tours/intl';
import { StructuredData, buildBreadcrumb, buildFaqSchema } from '../components/seo/StructuredData';
import { contactInfo } from '@/data/content';
import { CITY_HUBS } from '@/data/tour-hierarchy';
import { AIRPORTS, airportByIata, findRouteFact, resolveAirport, type Airport, type RouteStatus } from '@/data/airports';
import { googleFlightsUrl, googleFlightsToCityUrl, royalAirMarocRouteUrl, ROYAL_AIR_MAROC_HOME, type TripType } from '@/lib/flights/links';
import { ArrowLeftRight, ExternalLink, Minus, Plus, Plane, MapPin } from 'lucide-react';

function RouteStatusBadge({ status }: { status: RouteStatus }) {
  const { t } = useLanguage();
  const styles: Record<RouteStatus, string> = {
    'reported-scheduled': 'bg-green-500/10 text-green-700 border-green-500/30',
    'limited-or-seasonal': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30',
    'no-confirmed-service': 'bg-muted text-muted-foreground border-border',
  };
  const labels: Record<RouteStatus, string> = {
    'reported-scheduled': t('fl_route_status_scheduled'),
    'limited-or-seasonal': t('fl_route_status_limited'),
    'no-confirmed-service': t('fl_route_status_none'),
  };
  return (
    <span className={`inline-flex items-center text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

type SearchResult = {
  originAirport?: Airport;
  destinationAirport?: Airport;
  originText: string;
  destinationText: string;
  googleUrl: string;
  ramUrl?: string;
};

export default function Flights() {
  const { t, lang } = useLanguage();
  const formId = useId();

  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabin, setCabin] = useState<'economy' | 'premium' | 'business' | 'first'>('economy');
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<SearchResult | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function swap() {
    setOrigin(destination);
    setDestination(origin);
    setResult(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!origin.trim()) errs.push(t('fl_form_error_origin'));
    if (!destination.trim()) errs.push(t('fl_form_error_destination'));
    if (!departDate) errs.push(t('fl_form_error_dates'));
    if (tripType === 'round-trip' && returnDate && departDate && returnDate < departDate) {
      errs.push(t('fl_form_error_return_before_depart'));
    }
    setErrors(errs);
    if (errs.length > 0) {
      setResult(null);
      return;
    }
    const originAirport = resolveAirport(origin);
    const destinationAirport = resolveAirport(destination);
    const googleUrl = googleFlightsUrl({
      origin: origin.trim(),
      destination: destination.trim(),
      departDate,
      returnDate: tripType === 'round-trip' ? returnDate || undefined : undefined,
      tripType,
      adults,
      children,
      cabin,
    });
    // Royal Air Maroc's own URL format takes a plain city name — when the
    // typed value resolves to a verified airport (e.g. the datalist's own
    // "Marrakech (RAK)" suggestion), use its canonical city name rather than
    // the raw text, so the "(RAK)" suffix never reaches the slug builder.
    const ramUrl = royalAirMarocRouteUrl(originAirport?.city ?? origin.trim(), destinationAirport?.city ?? destination.trim());
    setResult({ originAirport, destinationAirport, originText: origin.trim(), destinationText: destination.trim(), googleUrl, ramUrl });
  }

  const routeFact = result?.originAirport && result?.destinationAirport
    ? findRouteFact(result.originAirport.iata, result.destinationAirport.iata)
    : undefined;

  const faqs = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    question: t(`fl_faq_q${n}`),
    answer: t(`fl_faq_a${n}`),
  }));

  return (
    <Layout>
      <StructuredData
        id="flights-breadcrumb"
        data={buildBreadcrumb([{ name: t('nav_home'), path: '/' }, { name: t('fl_hero_title'), path: '/flights' }], lang)}
      />
      <StructuredData id="flights-faq" data={buildFaqSchema(faqs)} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-xs mb-4">
            <Plane className="w-4 h-4" aria-hidden="true" /> {t('fl_hero_eyebrow')}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-background mb-6 leading-tight">{t('fl_hero_title')}</h1>
          <p className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">{t('fl_hero_sub')}</p>
        </div>
      </section>

      {/* Search form */}
      <section className="py-10 md:py-14 bg-card border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-background rounded-3xl border border-border shadow-xl p-5 md:p-8 -mt-20 md:-mt-24 relative z-10">
            <form onSubmit={onSubmit} aria-describedby={errors.length ? `${formId}-errors` : undefined}>
              <fieldset className="mb-5">
                <legend className="text-sm font-bold text-foreground mb-2">{t('fl_form_trip_type')}</legend>
                <div className="flex gap-3" role="radiogroup" aria-label={t('fl_form_trip_type')}>
                  {(['round-trip', 'one-way'] as TripType[]).map((tt) => (
                    <button
                      key={tt}
                      type="button"
                      role="radio"
                      aria-checked={tripType === tt}
                      onClick={() => setTripType(tt)}
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${tripType === tt ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:border-primary/50'}`}
                    >
                      {tt === 'round-trip' ? t('fl_form_round_trip') : t('fl_form_one_way')}
                    </button>
                  ))}
                </div>
              </fieldset>

              <datalist id={`${formId}-airports`}>
                {AIRPORTS.map((a) => (
                  <option key={a.iata} value={`${a.city} (${a.iata})`} />
                ))}
              </datalist>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end mb-4">
                <div>
                  <label htmlFor={`${formId}-origin`} className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_origin')}</label>
                  <input
                    id={`${formId}-origin`}
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    list={`${formId}-airports`}
                    placeholder={t('fl_form_origin_placeholder')}
                    autoComplete="off"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={swap}
                  aria-label={t('fl_form_swap_aria')}
                  className="h-12 w-12 mx-auto rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <ArrowLeftRight className="w-5 h-5" aria-hidden="true" />
                </button>
                <div>
                  <label htmlFor={`${formId}-destination`} className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_destination')}</label>
                  <input
                    id={`${formId}-destination`}
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    list={`${formId}-airports`}
                    placeholder={t('fl_form_destination_placeholder')}
                    autoComplete="off"
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <div>
                  <label htmlFor={`${formId}-depart`} className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_depart')}</label>
                  <input
                    id={`${formId}-depart`}
                    type="date"
                    min={today}
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  />
                </div>
                {tripType === 'round-trip' && (
                  <div>
                    <label htmlFor={`${formId}-return`} className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_return')}</label>
                    <input
                      id={`${formId}-return`}
                      type="date"
                      min={departDate || today}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    />
                  </div>
                )}
                <div>
                  <span className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_adults')}</span>
                  <div className="flex items-center h-12 rounded-xl border border-border px-2 justify-between">
                    <button type="button" aria-label={t('fl_form_decrease')} onClick={() => setAdults((n) => Math.max(1, n - 1))} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted"><Minus className="w-4 h-4" /></button>
                    <span aria-live="polite">{adults}</span>
                    <button type="button" aria-label={t('fl_form_increase')} onClick={() => setAdults((n) => Math.min(9, n + 1))} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_children')}</span>
                  <div className="flex items-center h-12 rounded-xl border border-border px-2 justify-between">
                    <button type="button" aria-label={t('fl_form_decrease')} onClick={() => setChildren((n) => Math.max(0, n - 1))} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted"><Minus className="w-4 h-4" /></button>
                    <span aria-live="polite">{children}</span>
                    <button type="button" aria-label={t('fl_form_increase')} onClick={() => setChildren((n) => Math.min(8, n + 1))} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="mb-6 max-w-xs">
                <label htmlFor={`${formId}-cabin`} className="block text-sm font-bold text-foreground mb-1.5">{t('fl_form_cabin')}</label>
                <select
                  id={`${formId}-cabin`}
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value as typeof cabin)}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background"
                >
                  <option value="economy">{t('fl_cabin_economy')}</option>
                  <option value="premium">{t('fl_cabin_premium')}</option>
                  <option value="business">{t('fl_cabin_business')}</option>
                  <option value="first">{t('fl_cabin_first')}</option>
                </select>
              </div>

              {errors.length > 0 && (
                <div id={`${formId}-errors`} role="alert" className="mb-5 bg-red-500/10 border border-red-500/30 text-red-700 rounded-xl p-4 text-sm">
                  <ul className="list-disc pl-5 space-y-1">{errors.map((er) => <li key={er}>{er}</li>)}</ul>
                </div>
              )}

              <button type="submit" className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all">
                {t('fl_form_submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Results / continue-your-search */}
      {result && (
        <section className="py-10 md:py-14 bg-background" aria-live="polite">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">{t('fl_results_heading')}</h2>
            <p className="text-muted-foreground mb-6">{fmtTemplate(t('fl_results_route'), { origin: result.originText, destination: result.destinationText })}</p>

            {routeFact && (
              <div className="mb-6 bg-card border border-border rounded-2xl p-5 flex flex-wrap items-center gap-3">
                <RouteStatusBadge status={routeFact.status} />
                <p className="text-sm text-muted-foreground flex-1">{routeFact.note}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 mb-3">
              <a
                href={result.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-foreground text-background px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity"
              >
                {t('fl_results_search_google')} <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={result.ramUrl ?? ROYAL_AIR_MAROC_HOME}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-card border border-border text-foreground px-6 py-4 rounded-2xl font-bold hover:border-primary/50 transition-colors"
              >
                {t('fl_results_search_ram')} <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mb-6">{t('fl_results_ram_note')}</p>

            {routeFact?.status === 'no-confirmed-service' && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-6">
                <p className="text-sm text-foreground mb-3">{t('fl_route_none_cta')}</p>
                <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  {t('fl_cta_whatsapp')}
                </a>
              </div>
            )}

            <p className="text-xs text-muted-foreground">{t('fl_results_disclaimer')}</p>
          </div>
        </section>
      )}

      {/* Trust message */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-sm md:text-base text-muted-foreground">{t('fl_trust_message')}</p>
        </div>
      </section>

      {/* Airport directory */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">{t('fl_directory_heading')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('fl_directory_sub')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AIRPORTS.map((a) => {
              const hub = a.cityHubId ? CITY_HUBS.find((h) => h.id === a.cityHubId) : undefined;
              return (
                <div key={a.iata} className="bg-card border border-border rounded-2xl p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-serif text-xl text-foreground">{a.city}</h3>
                      <p className="text-xs text-muted-foreground">{a.region}</p>
                    </div>
                    <span className="shrink-0 bg-primary/10 text-primary-text font-bold text-sm px-3 py-1 rounded-full">{a.iata}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground mb-2">{a.name}</p>
                  <p className="text-sm text-muted-foreground mb-3 flex-grow">{a.summary}</p>
                  <p className="text-xs text-muted-foreground mb-4 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    {a.reaches}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={googleFlightsToCityUrl(a.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-primary-text hover:underline inline-flex items-center gap-1"
                    >
                      {fmtTemplate(t('fl_directory_search_flights'), { city: a.city })} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    {hub && (
                      <Link href={`/tours/from-${hub.slug}`} className="text-sm font-bold text-foreground hover:text-primary">
                        {fmtTemplate(t('fl_directory_explore_tours'), { city: a.city })}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">{t('fl_directory_footnote')}</p>
        </div>
      </section>

      {/* Domestic routes honesty panel */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t('fl_domestic_heading')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('fl_domestic_sub')}</p>
          </div>
          <div className="space-y-3">
            {['CMN-RAK', 'CMN-AGA', 'RAK-EUN', 'RAK-VIL', 'CMN-TTU', 'CMN-OZZ', 'CMN-ERH', 'RAK-OZZ', 'RAK-ERH', 'RAK-FEZ'].map((pair) => {
              const [fromIata, toIata] = pair.split('-');
              const from = airportByIata(fromIata);
              const to = airportByIata(toIata);
              const fact = findRouteFact(fromIata, toIata);
              if (!from || !to || !fact) return null;
              return (
                <div key={pair} className="flex flex-wrap items-center gap-3 bg-background border border-border rounded-xl p-4">
                  <span className="font-bold text-foreground text-sm shrink-0">{from.city} ↔ {to.city}</span>
                  <RouteStatusBadge status={fact.status} />
                  <span className="text-sm text-muted-foreground flex-1">{fact.note}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">{t('fl_domestic_footnote')}</p>
        </div>
      </section>

      {/* Budget planner */}
      <BudgetPlanner />

      {/* Connect to tours / contact */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-background mb-4">{t('fl_cta_heading')}</h2>
          <p className="text-background/80 max-w-xl mx-auto mb-8">{t('fl_cta_sub')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
              {t('fl_cta_whatsapp')}
            </a>
            <Link href="/trip-builder" className="bg-background/10 border border-background/30 text-background px-6 py-3 rounded-full font-bold hover:bg-background/20 transition-all">
              {t('fl_cta_tripbuilder')}
            </Link>
            <Link href="/desert-tours" className="bg-background/10 border border-background/30 text-background px-6 py-3 rounded-full font-bold hover:bg-background/20 transition-all">
              {t('fl_cta_sahara')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FlightsFaq faqs={faqs} />
    </Layout>
  );
}

function BudgetPlanner() {
  const { t } = useLanguage();
  const [flightPerTraveler, setFlightPerTraveler] = useState(0);
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(7);
  const [transportPerDay, setTransportPerDay] = useState(0);
  const [activitiesTotal, setActivitiesTotal] = useState(0);
  const [accomFoodPerNight, setAccomFoodPerNight] = useState(0);

  const flightsTotal = flightPerTraveler * travelers;
  const transportTotal = transportPerDay * nights;
  const accomFoodTotal = accomFoodPerNight * nights;
  const total = flightsTotal + transportTotal + activitiesTotal + accomFoodTotal;

  const fields: { id: string; label: string; value: number; set: (n: number) => void }[] = [
    { id: 'flight', label: t('fl_budget_flight_pp'), value: flightPerTraveler, set: setFlightPerTraveler },
    { id: 'travelers', label: t('fl_budget_travelers'), value: travelers, set: setTravelers },
    { id: 'nights', label: t('fl_budget_nights'), value: nights, set: setNights },
    { id: 'transport', label: t('fl_budget_transport'), value: transportPerDay, set: setTransportPerDay },
    { id: 'activities', label: t('fl_budget_activities'), value: activitiesTotal, set: setActivitiesTotal },
    { id: 'accomfood', label: t('fl_budget_accom_food'), value: accomFoodPerNight, set: setAccomFoodPerNight },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t('fl_budget_heading')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('fl_budget_sub')}</p>
        </div>
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={`budget-${f.id}`} className="block text-sm font-bold text-foreground mb-1.5">{f.label}</label>
                <input
                  id={`budget-${f.id}`}
                  type="number"
                  min={0}
                  value={f.value}
                  onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                />
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-5 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('fl_budget_flight_pp')} × {travelers}</span><span className="font-medium text-foreground">${flightsTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('fl_budget_transport')} × {nights}</span><span className="font-medium text-foreground">${transportTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('fl_budget_activities')}</span><span className="font-medium text-foreground">${activitiesTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('fl_budget_accom_food')} × {nights}</span><span className="font-medium text-foreground">${accomFoodTotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border"><span>{t('fl_budget_total')}</span><span>${total.toLocaleString()}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-5">{t('fl_budget_estimate_note')}</p>
        </div>
      </div>
    </section>
  );
}

function FlightsFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-24 bg-card border-t border-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 text-center">{t('fl_faq_title')}</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.question} className="bg-background border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-bold text-foreground">{f.question}</span>
                <span className="shrink-0 text-primary">{open === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
              </button>
              {open === i && <div className="px-5 pb-5 -mt-1 text-muted-foreground text-sm leading-relaxed">{f.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
