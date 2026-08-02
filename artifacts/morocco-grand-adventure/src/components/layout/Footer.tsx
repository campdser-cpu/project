import { Link } from 'wouter';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

import { contactInfo } from '@/data/content';
import { getLocalizedDestinations } from '@/i18n/content';
import { SiWhatsapp } from 'react-icons/si';

import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, lang } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  
  return (
    <footer className="bg-[#102a1e] text-white pt-16 sm:pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          
          <div className="space-y-6">
            <img src="/logo.svg" alt="Morocco Grand Adventure logo" width={220} height={64} className="h-12 sm:h-14 md:h-16 brightness-0 invert" />
            <p className="text-white/70 text-sm leading-relaxed">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a href={contactInfo.instagram} target="_blank" rel="noreferrer" aria-label="Follow Morocco Grand Adventure on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" aria-label="Contact Morocco Grand Adventure on WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <SiWhatsapp className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_quick_links')}</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-primary transition-colors">{t('nav_home')}</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors">{t('nav_about')}</Link></li>
              <li><Link href="/destinations" className="text-white/70 hover:text-primary transition-colors">{t('nav_destinations')}</Link></li>
              <li><Link href="/tours" className="text-white/70 hover:text-primary transition-colors">{t('nav_tours')}</Link></li>
              <li><Link href="/trip-builder" className="text-white/70 hover:text-primary transition-colors">{t('nav_build_journey')}</Link></li>
              <li><Link href="/gallery" className="text-white/70 hover:text-primary transition-colors">{t('nav_gallery')}</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_top_destinations')}</h3>
            <ul className="space-y-3">
              {destinations.slice(0, 5).map(dest => (
                <li key={dest.id}>
                  <Link href={`/destinations/${dest.id}`} className="text-white/70 hover:text-primary transition-colors">
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Merzouga, Sahara Desert, Morocco</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors break-all">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <SiWhatsapp className="w-5 h-5 text-primary shrink-0" />
                <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{t('footer_whatsapp')}</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors break-all">{contactInfo.email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-sm text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Morocco Grand Adventure. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}