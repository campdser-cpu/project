import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo, destinations } from '@/data/content';
import { categoryLabel } from '@/i18n/content';
import {
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Car,
  Info,
  Send
} from 'lucide-react';

type Budget = '<$300' | '$300-600' | '$600-1000' | '>$1000';

const CITIES = ['Casablanca', 'Marrakech', 'Tangier', 'Fes', 'Agadir'];

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

const getCityCoords = (city: string) => {
  const c = destinations.find(d => d.name === city);
  if (c) return c.coords;
  if (city === 'Casablanca') return { lat: 33.5731, lng: -7.5898 };
  if (city === 'Marrakech') return { lat: 31.6295, lng: -7.9811 };
  if (city === 'Tangier') return { lat: 35.7595, lng: -5.8340 };
  if (city === 'Fes') return { lat: 34.0181, lng: -5.0078 };
  if (city === 'Agadir') return { lat: 30.4278, lng: -9.5981 };
  return { lat: 33.5731, lng: -7.5898 };
};

const stepVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function TripBuilder() {
  const { t, lang } = useLanguage();
  
  const [step, setStep] = useState(1);
  const [arrival, setArrival] = useState(CITIES[0]);
  const [departure, setDeparture] = useState(CITIES[1]);
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState<Budget>('$300-600');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    
    const selectedList = destinations.filter(d => selectedDestinations.includes(d.id));
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
            description: `Travel to ${dest.name}. ${dest.shortDesc}`,
            distance: Math.round(dist),
            dest,
            stay: dest.name
          });
          lastCoords = dest.coords;
        } else {
          itinerary.push({
            day: currentDay,
            title: `${t('tb_itinerary_exploring')} ${dest.name}`,
            description: `Discover the highlights of ${dest.name}, including ${dest.highlights.join(', ')}.`,
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
    itinerary.push({
      day: currentDay,
      title: `${t('tb_itinerary_departure')} ${departure}`,
      description: `Travel to ${departure} for your onward journey.`,
      distance: Math.round(distToDep),
      dest: null,
      stay: null
    });
    
    return { itinerary, totalDistance, nights: [...new Set(nights)] };
  }, [arrival, departure, days, selectedDestinations]);

  const whatsappLink = useMemo(() => {
    const interestLabels = selectedInterests.map(id => INTERESTS_DATA.find(i=>i.id===id)?.id ?? id).filter(Boolean);
    const destNames = selectedDestinations.map(id => destinations.find(d=>d.id===id)?.name).filter(Boolean);
    
    const text = `*New Bespoke Journey Request*%0A%0A*Basics:*%0A- Route: ${arrival} to ${departure}%0A- Duration: ${days} days%0A- Travelers: ${travelers}%0A- Budget: ${budget}%0A%0A*Interests:*%0A${interestLabels.join(', ')}%0A%0A*Destinations:*%0A${destNames.join(', ')}`;
    return `${contactInfo.whatsapp}?text=${text}`;
  }, [arrival, departure, days, travelers, budget, selectedInterests, selectedDestinations]);

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
              style={{ width: `calc(${((step - 1) / 3) * 100}% - 48px)` }}
            ></div>
            
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                onClick={() => {
                  if (s < step || (s === 4 && selectedDestinations.length >= 2)) {
                    setStep(s);
                  }
                }}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 shadow-sm ${
                  step >= s 
                    ? 'bg-primary text-primary-foreground shadow-primary/20 scale-110 cursor-pointer' 
                    : 'bg-card border-2 border-border text-muted-foreground opacity-70'
                } ${s < step ? 'cursor-pointer hover:scale-110 hover:bg-primary/90' : ''}`}
              >
                {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
                <span className={`absolute -bottom-8 text-[10px] md:text-xs font-bold uppercase tracking-wider text-center leading-tight whitespace-nowrap transition-colors ${
                  step === s ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {s === 1 && t('tb_basics')}
                  {s === 2 && t('tb_interests')}
                  {s === 3 && t('tb_places')}
                  {s === 4 && t('tb_itinerary_label')}
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
                              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('tb_duration_label')}</label>
                            <span className="font-bold text-primary">{days} {t('days')}</span>
                          </div>
                          <div className="flex items-center gap-6 bg-background border border-border rounded-2xl p-5 shadow-sm">
                            <Calendar className="w-6 h-6 text-primary shrink-0" />
                            <input type="range" min="3" max="14" value={days} onChange={e => setDays(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-muted rounded-full appearance-none cursor-pointer" />
                          </div>
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
                    
                    {/* Budget */}
                    <div className="pt-8 border-t border-border">
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">{t('tb_budget')}</label>
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
                            <div className="text-sm text-muted-foreground">{t(b.descKey as Parameters<typeof t>[0])}</div>
                          </button>
                        ))}
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
                      {destinations.map(dest => {
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
                              <img src={dest.image} alt={dest.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">4. {t('tb_itinerary_heading')}</h2>
                    
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
              
              {step < 4 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl group"
                >
                  {t('next')} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,168,76,0.4)] group ${selectedDestinations.length < 2 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  {t('tb_request')} <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
