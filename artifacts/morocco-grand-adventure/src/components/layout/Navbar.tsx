import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

import { Logo } from './Logo';
import { contactInfo } from '@/data/content';
import { CITY_HUBS } from '@/data/tour-hierarchy';
import { getLocalizedDestinations } from '@/i18n/content';
import { useLanguage, languages } from '@/contexts/LanguageContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const currentLang = languages.find(l => l.code === lang) ?? languages[0];
  const destinations = getLocalizedDestinations(lang);

  // Close lang dropdown on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Pages whose content starts with a light background at the top need the
  // navbar to stay in its solid/readable state even before scrolling.
  const isSolidPage = location === '/contact' || location === '/trip-builder';
  const effectiveScrolled = isScrolled || isSolidPage;

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    effectiveScrolled 
      ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' 
      : 'bg-transparent py-3 sm:py-4'
  }`;

  const linkClasses = `text-sm font-medium tracking-wide transition-colors ${
    effectiveScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-accent'
  }`;

  return (
    <nav className={navClasses} aria-label="Main navigation">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Morocco Grand Adventure — Home">
            <Logo variant={effectiveScrolled ? 'dark' : 'light'} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className={linkClasses}>{t('nav_home')}</Link>
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <Link href="/destinations" className={`${linkClasses} flex items-center gap-1`}>
                {t('nav_destinations')} <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </Link>
              
              <AnimatePresence>
                {isDestinationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 w-64 pt-4"
                  >
                    <div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                      {destinations.slice(0, 8).map((dest) => (
                        <Link 
                          key={dest.id} 
                          href={`/destinations/${dest.id}`}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {dest.name}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1">
                        <Link href="/destinations" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted transition-colors">
                          {t('nav_all_destinations')}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tours Dropdown — departure cities + duration shortcut */}
            <div
              className="relative group"
              onMouseEnter={() => setIsToursOpen(true)}
              onMouseLeave={() => setIsToursOpen(false)}
            >
              <Link href="/tours" className={`${linkClasses} flex items-center gap-1`}>
                {t('nav_tours')} <ChevronDown className={`w-4 h-4 transition-transform ${isToursOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </Link>
              <AnimatePresence>
                {isToursOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 w-72 pt-4"
                  >
                    <div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                      <Link href="/tours" className="block px-4 py-3 text-sm font-bold text-foreground hover:bg-muted hover:text-primary transition-colors">
                        {t('tours_heading')}
                      </Link>
                      {CITY_HUBS.map((hub) => (
                        <Link
                          key={hub.id}
                          href={`/tours/from-${hub.slug}`}
                          className="flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {hub.title}
                          {hub.hasDurationDrive && (
                            <span className="text-xs text-muted-foreground">3 days · 5+ days</span>
                          )}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1">
                        <Link href="/tours/from-marrakech/3-days" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted transition-colors">
                          3-Day Tours from Marrakech
                        </Link>
                        <Link href="/marrakech-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                          {t('mk_breadcrumb')}
                        </Link>
                        <Link href="/agadir-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                          {t('ag_breadcrumb')}
                        </Link>
                        <Link href="/casablanca-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                          {t('ca_breadcrumb')}
                        </Link>
                        <Link href="/fes-tours" className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                          {t('mt_breadcrumb')}
                        </Link>
                        <Link href="/desert-tours" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted transition-colors">
                          {t('nav_sahara_desert_tours')}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Experiences Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsExperiencesOpen(true)}
              onMouseLeave={() => setIsExperiencesOpen(false)}
            >
              <Link href="/desert-tours" className={`${linkClasses} flex items-center gap-1`}>
                {t('nav_experiences')} <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </Link>
              <AnimatePresence>
                {isExperiencesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 w-64 pt-4"
                  >
                    <div className="bg-background shadow-xl rounded-xl border border-border overflow-hidden">
                      {[
                        { href: "/desert-tours", label: t('nav_sahara_desert_tours') },
                        { href: "/luxury-camp", label: t('nav_luxury_desert_camp') },
                        { href: "/camel-trekking", label: t('nav_camel_trekking') },
                        { href: "/4x4-tours", label: t('nav_4x4_desert_tours') },
                        { href: "/day-trips", label: t('nav_day_trips') },
                      ].map((item) => (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-border mt-1">
                        <Link href="/blog" className="block px-4 py-3 text-sm font-medium text-primary hover:bg-muted transition-colors">
                          {t('nav_travel_blog')}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/gallery" className={linkClasses}>{t('nav_gallery')}</Link>
            <Link href="/trip-builder" className={linkClasses}>{t('nav_build_journey')}</Link>
            <Link href="/about" className={linkClasses}>{t('nav_about')}</Link>
            <Link href="/contact" className={linkClasses}>{t('nav_contact')}</Link>

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(v => !v)}
                aria-label={`Change language. Current: ${currentLang.nativeLabel}`}
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${effectiveScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-accent'}`}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-44 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    {languages.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-muted transition-colors ${lang === l.code ? 'text-primary font-bold' : 'text-foreground'}`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.nativeLabel}</span>
                        {lang === l.code && <span className="ml-auto text-primary">&#10003;</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a 
              href={contactInfo.whatsapp} 
              target="_blank" 
              rel="noreferrer"
              className="bg-primary text-primary-foreground px-5 xl:px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              {t('nav_book_whatsapp')}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 z-50"
            aria-label={isMobileMenuOpen ? t('nav_close_menu') : t('nav_open_menu')}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" aria-hidden="true" />
            ) : (
              <Menu className={`w-6 h-6 ${effectiveScrolled ? 'text-foreground' : 'text-white'}`} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <Link href="/" className="text-lg font-medium text-foreground">{t('nav_home')}</Link>
              <Link href="/destinations" className="text-lg font-medium text-foreground">{t('nav_destinations')}</Link>
              <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">
                {destinations.slice(0, 4).map(dest => (
                  <Link key={dest.id} href={`/destinations/${dest.id}`} className="block text-muted-foreground">{dest.name}</Link>
                ))}
              </div>
              <Link href="/tours" className="text-lg font-medium text-foreground">{t('nav_tours')}</Link>
              <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">
                {CITY_HUBS.map(hub => (
                  <Link key={hub.id} href={`/tours/from-${hub.slug}`} className="block text-muted-foreground">{hub.title}</Link>
                ))}
                <Link href="/tours/from-marrakech/3-days" className="block text-muted-foreground">3-Day Tours from Marrakech</Link>
              </div>
              <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">
                <Link href="/marrakech-tours" className="block text-muted-foreground">{t('mk_breadcrumb')}</Link>
                <Link href="/agadir-tours" className="block text-muted-foreground">{t('ag_breadcrumb')}</Link>
                <Link href="/casablanca-tours" className="block text-muted-foreground">{t('ca_breadcrumb')}</Link>
                <Link href="/fes-tours" className="block text-muted-foreground">{t('mt_breadcrumb')}</Link>
              </div>
              <div className="pl-4 border-l-2 border-primary/20 space-y-3 py-2">
                <Link href="/desert-tours" className="block text-muted-foreground">{t('nav_sahara_desert_tours')}</Link>
                <Link href="/luxury-camp" className="block text-muted-foreground">{t('nav_luxury_desert_camp')}</Link>
                <Link href="/camel-trekking" className="block text-muted-foreground">{t('nav_camel_trekking')}</Link>
                <Link href="/4x4-tours" className="block text-muted-foreground">{t('nav_4x4_desert_tours')}</Link>
                <Link href="/day-trips" className="block text-muted-foreground">{t('nav_day_trips')}</Link>
              </div>
              <Link href="/gallery" className="text-lg font-medium text-foreground">{t('nav_gallery')}</Link>
              <Link href="/blog" className="text-lg font-medium text-foreground">{t('nav_blog')}</Link>
              <Link href="/faq" className="text-lg font-medium text-foreground">{t('nav_faq')}</Link>
              <Link href="/trip-builder" className="text-lg font-medium text-foreground">{t('nav_build_journey')}</Link>
              <Link href="/about" className="text-lg font-medium text-foreground">{t('nav_about')}</Link>
              <Link href="/contact" className="text-lg font-medium text-foreground">{t('nav_contact')}</Link>
              
              <a 
                href={contactInfo.whatsapp} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold mt-4"
              >
                {t('nav_book_whatsapp')}
              </a>

              {/* Language Switcher (mobile) */}
              <div className="pt-5 mt-2 border-t border-border">
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.flag} {currentLang.nativeLabel}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsMobileMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                        lang === l.code
                          ? 'border-primary bg-primary/5 text-primary font-bold'
                          : 'border-border text-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span className="truncate">{l.nativeLabel}</span>
                      {lang === l.code && <span className="ms-auto text-primary">&#10003;</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}