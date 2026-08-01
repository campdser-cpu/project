import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { usePathname, navigate } from 'wouter/use-browser-location';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { PromoProvider } from './components/promo/PromoProvider';
import { LocalizedHead } from './components/seo/LocalizedHead';
import { RAW_BASE, parseLangPath, preferredLang, langHref } from './lib/i18n-routing';

import Home from './pages/home';
import Destinations from './pages/destinations';
import DestinationDetail from './pages/destination-detail';
import Tours from './pages/tours';
import TourDetail from './pages/tour-detail';
import About from './pages/about';
import Gallery from './pages/gallery';
import Contact from './pages/contact';
import TripBuilder from './pages/trip-builder';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

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
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  // The language prefix in the URL drives everything. Subscribe to the raw
  // browser path so switches (which push a new /xx/… URL) re-render here.
  const pathname = usePathname();
  const { lang, rest } = parseLangPath(pathname);

  // No language prefix in the URL → redirect to the preferred language.
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
