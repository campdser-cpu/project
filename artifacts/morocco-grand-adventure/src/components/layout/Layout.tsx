import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ScrollToTop } from '../ui/ScrollToTop';
import { AIAssistant } from '../ui/AIAssistant';
import { StickyBookingCTA } from '../ui/StickyBookingCTA';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-bold focus:shadow-lg"
      >
        {t('nav_home') === 'Home' ? 'Skip to content' : t('nav_home')}
      </a>
      <header>
        <Navbar />
      </header>
      <main id="main-content" className="flex-grow flex flex-col relative" tabIndex={-1}>{children}</main>
      <Footer />
      <WhatsAppButton />
      <AIAssistant />
      <ScrollToTop />
      <StickyBookingCTA />
    </div>
  );
}
