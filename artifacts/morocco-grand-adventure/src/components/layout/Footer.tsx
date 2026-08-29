import { Link } from 'wouter';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '@/data/content';
import { getLocalizedDestinations, getLocalizedTours } from '@/i18n/content';
import { SiWhatsapp, SiYoutube, SiTiktok, SiFacebook } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';

const AUTHORITY_DESTINATION_IDS = ['marrakech', 'fes', 'ait-ben-haddou', 'dades-valley', 'merzouga', 'erg-chebbi'];
const AUTHORITY_TOUR_IDS = ['3-day-sahara-marrakech', '5-day-imperial-cities', '7-day-imperial-cities-sahara-escape'];

export function Footer() {
  const { t, lang } = useLanguage();
  const destinations = getLocalizedDestinations(lang);
  const authorityDestinations = AUTHORITY_DESTINATION_IDS.map(id => destinations.find(d => d.id === id)).filter(Boolean);
  const tours = getLocalizedTours(lang);
  const authorityTours = AUTHORITY_TOUR_IDS.map(id => tours.find(tour => tour.id === id)).filter(Boolean);

  return (
    <footer className="bg-[#102a1e] text-white pt-16 sm:pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="space-y-6">
            <img src="/logo-square-light.svg" alt="Morocco Grand Adventure" width={400} height={400} loading="lazy" decoding="async" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
            <p className="text-white/70 text-sm leading-relaxed">{t('footer_tagline')}</p>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/morocco_grand_adventure/" target="_blank" rel="noreferrer" aria-label="Follow Morocco Grand Adventure on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram className="w-5 h-5" aria-hidden="true" /></a>
              <a href="https://wa.me/message/QAFZ3RKJDNH4B1" target="_blank" rel="noreferrer" aria-label="Contact Morocco Grand Adventure on WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><SiWhatsapp className="w-5 h-5" aria-hidden="true" /></a>
              <a href="https://youtube.com/@moroccograndadventure" target="_blank" rel="noreferrer" aria-label="Subscribe to Morocco Grand Adventure on YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><SiYoutube className="w-5 h-5" aria-hidden="true" /></a>
              <a href="https://www.tiktok.com/@morocco.grand.adv" target="_blank" rel="noreferrer" aria-label="Follow Morocco Grand Adventure on TikTok" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><SiTiktok className="w-5 h-5" aria-hidden="true" /></a>
              <a href="https://www.facebook.com/share/1DFzDX72P3/" target="_blank" rel="noreferrer" aria-label="Like Morocco Grand Adventure on Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><SiFacebook className="w-5 h-5" aria-hidden="true" /></a>
            </div>
            <p className="text-xs text-white/50">{t('footer_tagline_alt') ?? 'Morocco travel experiences and desert adventures.'}</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_quick_links')}</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-primary transition-colors">{t('nav_home')}</Link></li>
              <li><Link href="/desert-tours" className="text-white/70 hover:text-primary transition-colors">{t('footer_sahara_desert_tours')}</Link></li>
              <li><Link href="/luxury-camp" className="text-white/70 hover:text-primary transition-colors">{t('footer_luxury_desert_camp')}</Link></li>
              <li><Link href="/camel-trekking" className="text-white/70 hover:text-primary transition-colors">{t('footer_camel_trekking')}</Link></li>
              <li><Link href="/merzouga-guide" className="text-white/70 hover:text-primary transition-colors">{t('footer_merzouga_guide')}</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors">{t('nav_about')}</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-primary transition-colors">{t('footer_travel_blog')}</Link></li>
              <li><Link href="/faq" className="text-white/70 hover:text-primary transition-colors">{t('footer_faq')}</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_top_destinations')}</h3>
            <ul className="space-y-3">
              {destinations.slice(0, 5).map(dest => <li key={dest.id}><Link href={`/destinations/${dest.id}`} className="text-white/70 hover:text-primary transition-colors">{dest.name}</Link></li>)}
            </ul>
            <h3 className="font-serif text-xl font-medium mt-8 mb-4 text-primary">Morocco route highlights</h3>
            <ul className="space-y-2">
              {authorityDestinations.map(dest => dest && <li key={dest.id}><Link href={`/destinations/${dest.id}`} className="text-white/70 hover:text-primary transition-colors text-sm">{dest.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">Private Morocco tours</h3>
            <ul className="space-y-3 mb-8">
              {authorityTours.map(tour => tour && <li key={tour.id}><Link href={`/tours/${tour.id}`} className="text-white/70 hover:text-primary transition-colors text-sm">{tour.name}</Link></li>)}
            </ul>
            <h3 className="font-serif text-xl font-medium mb-4 sm:mb-6 text-primary">{t('footer_contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70"><MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>{t('footer_address')}<br/><a href="https://maps.app.goo.gl/UK3MENd42bC16mME7" target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs mt-1 inline-block">View on Google Maps</a></span></li>
              <li className="flex items-center gap-3 text-white/70"><Phone className="w-5 h-5 text-primary shrink-0" /><a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors break-all">{contactInfo.phone}</a></li>
              <li className="flex items-center gap-3 text-white/70"><SiWhatsapp className="w-5 h-5 text-primary shrink-0" /><a href="https://wa.me/message/QAFZ3RKJDNH4B1" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{t('footer_whatsapp')}</a></li>
              <li className="flex items-center gap-3 text-white/70"><Mail className="w-5 h-5 text-primary shrink-0" /><a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors break-all">{contactInfo.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-sm text-center md:text-left"><p>&copy; {new Date().getFullYear()} Morocco Grand Adventure. {t('footer_rights')}</p></div>
      </div>
    </footer>
  );
}
