import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { contactInfo } from '@/data/content';
import { CITY_HUBS, CITY_HUB_DURATIONS } from '@/data/tour-hierarchy';
import { getLocalizedDestinations } from '@/i18n/content';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { fmtTemplate } from '../tours/intl';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const currentLang = languages.find((l) => l.code === lang) ?? languages[0];
  const destinations = getLocalizedDestinations(lang);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const solid = isScrolled || location === '/contact' || location === '/trip-builder';
  const navClass = `fixed w-full z-50 transition-all duration-300 ${solid ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-3 sm:py-4'}`;
  const linkClass = `text-sm font-medium tracking-wide transition-colors ${solid ? 'text-foreground hover:text-primary' : 'text-white hover:text-accent'}`;
  const cityLabel = (id: string) => t(`hub_${id}_name`);
  const cityTitle = (id: string) => t(`hub_${id}_title`);
  const threeDayLabel = (id: string) => fmtTemplate(t('hub_dur_h1'), { days: 3, city: cityLabel(id) });

  return (
    <nav className={navClass} aria-label={t('nav_tours')}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Morocco Grand Adventure — Home"><Logo variant={solid ? 'dark' : 'light'} /></Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className={linkClass}>{t('nav_home')}</Link>
            <div className="relative" onMouseEnter={() => setDestOpen(true)} onMouseLeave={() => setDestOpen(false)}>
              <Link href="/destinations" className={`${linkClass} flex items-center gap-1`}>{t('nav_destinations')} <ChevronDown className="w-4 h-4" aria-hidden="true" /></Link>
              <AnimatePresence>{destOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full -left-4 w-64 pt-4"><div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                {destinations.slice(0, 8).map((dest) => <Link key={dest.id} href={`/destinations/${dest.id}`} className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{dest.name}</Link>)}
                <Link href="/destinations" className="block border-t border-border px-4 py-3 text-sm font-medium text-primary hover:bg-muted">{t('nav_all_destinations')}</Link>
              </div></motion.div>}</AnimatePresence>
            </div>

            <div className="relative" onMouseEnter={() => setToursOpen(true)} onMouseLeave={() => setToursOpen(false)}>
              <Link href="/tours" className={`${linkClass} flex items-center gap-1`}>{t('nav_tours')} <ChevronDown className="w-4 h-4" aria-hidden="true" /></Link>
              <AnimatePresence>{toursOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full -left-4 w-[22rem] pt-4">
                <div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                  <Link href="/tours" className="block px-4 py-3 text-sm font-bold text-foreground hover:bg-muted hover:text-primary">{t('tours_heading')}</Link>
                  {CITY_HUBS.map((hub) => {
                    const durations = CITY_HUB_DURATIONS[hub.id] ?? [];
                    return <div key={hub.id} className="border-t border-border/60">
                      <Link href={`/tours/from-${hub.slug}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">
                        <span>{cityTitle(hub.id)}</span>
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{durations.length ? `${fmtTemplate(t('hub_group_days_badge'), { days: durations[0] })} · ${fmtTemplate(t('hub_group_days_badge'), { days: durations[durations.length - 1] })}` : ''}</span>
                      </Link>
                      <div className="px-4 pb-3 flex flex-wrap gap-x-3 gap-y-1">{durations.slice(0, 3).map(days => <Link key={days} href={`/tours/from-${hub.slug}/${days}-days`} className="text-[11px] text-muted-foreground hover:text-primary">{fmtTemplate(t('hub_group_days_badge'), { days })}</Link>)}</div>
                    </div>;
                  })}
                  <div className="border-t border-border">
                    <Link href="/tours/from-marrakech/3-days" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted">{threeDayLabel('marrakech')}</Link>
                    <Link href="/marrakech-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{t('mk_breadcrumb')}</Link>
                    <Link href="/fes-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{t('mt_breadcrumb')}</Link>
                    <Link href="/agadir-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{t('ag_breadcrumb')}</Link>
                    <Link href="/casablanca-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{t('ca_breadcrumb')}</Link>
                    <Link href="/desert-tours" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted">{t('nav_sahara_desert_tours')}</Link>
                  </div>
                </div>
              </motion.div>}</AnimatePresence>
            </div>

            <div className="relative" onMouseEnter={() => setExpOpen(true)} onMouseLeave={() => setExpOpen(false)}>
              <Link href="/desert-tours" className={`${linkClass} flex items-center gap-1`}>{t('nav_experiences')} <ChevronDown className="w-4 h-4" aria-hidden="true" /></Link>
              <AnimatePresence>{expOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full -left-4 w-64 pt-4"><div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                {[['/desert-tours','nav_sahara_desert_tours'],['/luxury-camp','nav_luxury_desert_camp'],['/camel-trekking','nav_camel_trekking'],['/4x4-tours','nav_4x4_desert_tours'],['/day-trips','nav_day_trips']].map(([href,key]) => <Link key={href} href={href} className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary">{t(key)}</Link>)}
                <Link href="/blog" className="block border-t border-border px-4 py-3 text-sm font-medium text-primary hover:bg-muted">{t('nav_travel_blog')}</Link>
              </div></motion.div>}</AnimatePresence>
            </div>

            <Link href="/gallery" className={linkClass}>{t('nav_gallery')}</Link>
            <Link href="/trip-builder" className={linkClass}>{t('nav_build_journey')}</Link>
            <Link href="/about" className={linkClass}>{t('nav_about')}</Link>
            <Link href="/contact" className={linkClass}>{t('nav_contact')}</Link>

            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen(v => !v)} aria-label={`Change language. Current: ${currentLang.nativeLabel}`} aria-expanded={langOpen} aria-haspopup="listbox" className={`flex items-center gap-1.5 text-sm font-medium ${solid ? 'text-foreground hover:text-primary' : 'text-white hover:text-accent'}`}>
                <Globe className="w-4 h-4" aria-hidden="true" /> {currentLang.flag} {currentLang.code.toUpperCase()} <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <AnimatePresence>{langOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-3 w-44 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50">
                {languages.map(l => <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }} className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-muted ${lang === l.code ? 'text-primary font-bold' : 'text-foreground'}`}><span>{l.flag}</span><span>{l.nativeLabel}</span>{lang === l.code && <span className="ml-auto">✓</span>}</button>)}
              </motion.div>}</AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-1">
            <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-5 xl:px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-all whitespace-nowrap">{t('nav_book_whatsapp')}</a>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{t('book_now_pay_later')}</span>
          </div>
          </div>

          <button className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2" aria-label={mobileOpen ? t('nav_close_menu') : t('nav_open_menu')} aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X className="w-6 h-6 text-foreground" aria-hidden="true" /> : <Menu className={`w-6 h-6 ${solid ? 'text-foreground' : 'text-white'}`} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>{mobileOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-background border-t border-border overflow-hidden"><div className="flex flex-col px-4 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
        <Link href="/" className="text-lg font-medium text-foreground">{t('nav_home')}</Link>
        <Link href="/destinations" className="text-lg font-medium text-foreground">{t('nav_destinations')}</Link>
        <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">{destinations.slice(0, 6).map(dest => <Link key={dest.id} href={`/destinations/${dest.id}`} className="block text-muted-foreground">{dest.name}</Link>)}</div>
        <Link href="/tours" className="text-lg font-medium text-foreground">{t('nav_tours')}</Link>
        <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">
          <Link href="/tours" className="block font-semibold text-foreground">{t('tours_heading')}</Link>
          {CITY_HUBS.map(hub => <div key={hub.id} className="space-y-1"><Link href={`/tours/from-${hub.slug}`} className="block text-foreground font-medium">{cityTitle(hub.id)}</Link><div className="pl-3 flex flex-wrap gap-x-3 gap-y-1">{(CITY_HUB_DURATIONS[hub.id] ?? []).slice(0, 4).map(days => <Link key={days} href={`/tours/from-${hub.slug}/${days}-days`} className="text-sm text-muted-foreground hover:text-primary">{fmtTemplate(t('hub_group_days_badge'), { days })}</Link>)}</div></div>)}
          <Link href="/tours/from-marrakech/3-days" className="block text-primary font-semibold">{threeDayLabel('marrakech')}</Link>
          <Link href="/marrakech-tours" className="block text-muted-foreground">{t('mk_breadcrumb')}</Link>
          <Link href="/fes-tours" className="block text-muted-foreground">{t('mt_breadcrumb')}</Link>
          <Link href="/agadir-tours" className="block text-muted-foreground">{t('ag_breadcrumb')}</Link>
          <Link href="/casablanca-tours" className="block text-muted-foreground">{t('ca_breadcrumb')}</Link>
          <Link href="/desert-tours" className="block text-primary font-semibold">{t('nav_sahara_desert_tours')}</Link>
        </div>
        <Link href="/gallery" className="text-lg font-medium text-foreground">{t('nav_gallery')}</Link>
        <Link href="/blog" className="text-lg font-medium text-foreground">{t('nav_blog')}</Link>
        <Link href="/faq" className="text-lg font-medium text-foreground">{t('nav_faq')}</Link>
        <Link href="/trip-builder" className="text-lg font-medium text-foreground">{t('nav_build_journey')}</Link>
        <Link href="/about" className="text-lg font-medium text-foreground">{t('nav_about')}</Link>
        <Link href="/contact" className="text-lg font-medium text-foreground">{t('nav_contact')}</Link>
        <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold mt-4">{t('nav_book_whatsapp')}</a>
        <p className="text-center text-xs font-semibold text-primary -mt-1">{t('book_now_pay_later')} — {t('pay_later')}</p>
        <div className="pt-5 mt-2 border-t border-border"><div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground"><Globe className="w-4 h-4" /><span>{currentLang.flag} {currentLang.nativeLabel}</span></div><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{languages.map(l => <button key={l.code} onClick={() => { setLang(l.code); setMobileOpen(false); }} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm ${lang === l.code ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border text-foreground hover:bg-muted'}`}><span>{l.flag}</span><span className="truncate">{l.nativeLabel}</span>{lang === l.code && <span className="ml-auto">✓</span>}</button>)}</div></div>
      </div></motion.div>}</AnimatePresence>
    </nav>
  );
}
