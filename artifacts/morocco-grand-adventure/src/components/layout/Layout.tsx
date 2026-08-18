import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ScrollToTop } from '../ui/ScrollToTop';
import { AIAssistant } from '../ui/AIAssistant';
import { StickyBookingCTA } from '../ui/StickyBookingCTA';
import { StructuredData, buildOrganizationSchema } from '../seo/StructuredData';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Organization structured data — one stable entity @id across the
          entire site so Google sees Morocco Grand Adventure as one business. */}
      <StructuredData id="organization" data={buildOrganizationSchema()} />

      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-bold focus:shadow-lg"
      >
        {t('layout_skip_content')}
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
