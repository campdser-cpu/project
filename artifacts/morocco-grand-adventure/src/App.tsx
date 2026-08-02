import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { usePathname, navigate } from 'wouter/use-browser-location';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { PromoProvider } from './components/promo/PromoProvider';
import { LocalizedHead } from './components/seo/LocalizedHead';
import { RAW_BASE, parseLangPath, preferredLang, langHref } from './lib/i18n-routing';

// Lazy-load pages for code splitting - only the homepage loads eagerly
import Home from './pages/home';
const Destinations = lazy(() => import('./pages/destinations'));
const DestinationDetail = lazy(() => import('./pages/destination-detail'));
const Tours = lazy(() => import('./pages/tours'));
const TourDetail = lazy(() => import('./pages/tour-detail'));
const About = lazy(() => import('./pages/about'));
const Gallery = lazy(() => import('./pages/gallery'));
const Contact = lazy(() => import('./pages/contact'));
const TripBuilder = lazy(() => import('./pages/trip-builder'));
const NotFound = lazy(() => import('@/pages/not-found'));

const queryClient = new QueryClient();

// Loading fallback for lazy-loaded routes
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden="true" />
        <span className="text-muted-foreground text-sm font-medium tracking-wide">Loading...</span>
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
            <Route path="/tours/:id" component={TourDetail} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/trip-builder" component={TripBuilder} />
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

  if (!lang) return null;

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;