import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { usePathname, navigate } from 'wouter/use-browser-location';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { PromoProvider } from './components/promo/PromoProvider';
import { LocalizedHead } from './components/seo/LocalizedHead';
import { RAW_BASE, parseLangPath, preferredLang, langHref } from './lib/i18n-routing';

// Lazy-load pages for code splitting - only the homepage loads eagerly
import Home from './pages/home';
const Destinations = lazy(() => import('./pages/destinations'));
const DestinationDetail = lazy(() => import('./pages/destination-detail'));
const Tours = lazy(() => import('./pages/tours'));
const TourDetail = lazy(() => import('./pages/tour-detail'));
const ToursFromCity = lazy(() => import('./pages/tours/from-city'));
const ToursFromCityDuration = lazy(() => import('./pages/tours/from-city-duration'));
const About = lazy(() => import('./pages/about'));
const Gallery = lazy(() => import('./pages/gallery'));
const Contact = lazy(() => import('./pages/contact'));
const TripBuilder = lazy(() => import('./pages/trip-builder'));
const DesertTours = lazy(() => import('./pages/desert-tours'));
const LuxuryCamp = lazy(() => import('./pages/luxury-camp'));
const CamelTrekking = lazy(() => import('./pages/camel-trekking'));
const FourByFourTours = lazy(() => import('./pages/4x4-tours'));
const MarrakechTours = lazy(() => import('./pages/marrakech-tours'));
const FesTours = lazy(() => import('./pages/fes-tours'));
const AgadirTours = lazy(() => import('./pages/agadir-tours'));
const CasablancaTours = lazy(() => import('./pages/casablanca-tours'));
const DayTrips = lazy(() => import('./pages/day-trips'));
const MerzougaGuide = lazy(() => import('./pages/merzouga-guide'));
const Faq = lazy(() => import('./pages/faq'));
const Blog = lazy(() => import('./pages/blog'));
const BlogPost = lazy(() => import('@/pages/blog/[slug]'));
const NotFound = lazy(() => import('@/pages/not-found'));

// Loading fallback for lazy-loaded routes
function PageLoader() {
  let loadingText = "Loading...";
  try {
    const { t } = useLanguage();
    loadingText = t('app_loading');
  } catch {
    // LanguageProvider not available yet (initial redirect)
  }
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden="true" />
        <span className="text-muted-foreground text-sm font-medium tracking-wide">{loadingText}</span>
      </div>
    </div>
  );
}

function AnimatedRouter() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" as const }}
        className="contents"
      >
        <Suspense fallback={<PageLoader />}>
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/destinations" component={Destinations} />
            <Route path="/destinations/:id" component={DestinationDetail} />
            <Route path="/tours" component={Tours} />
            <Route path="/tours/from-:city/:days" component={ToursFromCityDuration} />
            <Route path="/tours/from-:city" component={ToursFromCity} />
            <Route path="/tours/:id" component={TourDetail} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/trip-builder" component={TripBuilder} />
            <Route path="/desert-tours" component={DesertTours} />
            <Route path="/luxury-camp" component={LuxuryCamp} />
            <Route path="/camel-trekking" component={CamelTrekking} />
            <Route path="/4x4-tours" component={FourByFourTours} />
            <Route path="/marrakech-tours" component={MarrakechTours} />
            <Route path="/fes-tours" component={FesTours} />
            <Route path="/agadir-tours" component={AgadirTours} />
            <Route path="/casablanca-tours" component={CasablancaTours} />
            <Route path="/day-trips" component={DayTrips} />
            <Route path="/merzouga-guide" component={MerzougaGuide} />
            <Route path="/faq" component={Faq} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  // The language prefix in the URL drives everything. Subscribe to the raw
  // browser path so switches (which push a new /xx/... URL) re-render here.
  const pathname = usePathname();
  const { lang, rest } = parseLangPath(pathname);

  // No language prefix in the URL -> redirect to the preferred language.
  useEffect(() => {
    if (!lang) {
      navigate(
        langHref(preferredLang(), rest, window.location.search, window.location.hash),
        { replace: true },
      );
    }
  }, [lang, rest]);

  if (!lang) return <PageLoader />;

  return (
    <LanguageProvider lang={lang}>
        <LocalizedHead />
        <PromoProvider>
          <TooltipProvider>
            <WouterRouter base={`${RAW_BASE}/${lang}`}>
              <AnimatedRouter />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </PromoProvider>
    </LanguageProvider>
  );
}

export default App;
