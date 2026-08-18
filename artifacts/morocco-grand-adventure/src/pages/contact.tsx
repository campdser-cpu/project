import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin } from 'lucide-react';
import { SiWhatsapp, SiInstagram, SiYoutube, SiTiktok, SiFacebook } from 'react-icons/si';
import { useState } from 'react';
import { contactInfo } from '@/data/content';

// The API endpoint for inquiry submissions — server-side, keeps the email
// address off the client.  In production set VITE_API_URL (or deploy the API
// server alongside the static site on the same origin).
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env.VITE_API_URL) || '/api';

export default function Contact() {
  const { t } = useLanguage();
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [waFallback, setWaFallback] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setServerError('');
    setWaFallback('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    // Client-side safety validation before hitting the API
    const email = String(values.email ?? '');
    const phone = String(values.phone ?? '');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[+()\-\s\d]{7,20}$/;

    if (!emailRe.test(email)) {
      setServerError('Please enter a valid email address.');
      setIsError(true);
      setIsSubmitting(false);
      return;
    }
    if (phone && !phoneRe.test(phone)) {
      setServerError('Please enter a valid phone number (digits, +, -, spaces).');
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    // Build a WhatsApp fallback message from the form so a traveler's
    // inquiry always reaches us even if the API server is not deployed.
    const firstName = String(values.firstName ?? '');
    const waMsg = [
      'Hello Morocco Grand Adventure,',
      `I'm ${firstName}${values.lastName ? ' ' + String(values.lastName) : ''}.`,
      values.travelDates ? `I'd like to travel around ${values.travelDates}.` : '',
      values.travelers ? `Party of ${values.travelers}.` : '',
      values.destinations ? `Interested in: ${values.destinations}.` : '',
      values.tourInterest ? `Tour/activity: ${values.tourInterest}.` : '',
      values.accommodation ? `Accommodation: ${values.accommodation}.` : '',
      values.message ? `Details: ${values.message}` : '',
    ].filter(Boolean).join(' ');

    try {
      const res = await fetch(`${API_BASE}/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setWaFallback(waMsg);
        const err = await res.json().catch(() => ({ error: 'Something went wrong. Please try WhatsApp instead.' }));
        setServerError(err.error || 'Something went wrong. Please try WhatsApp instead.');
        setIsError(true);
      } else {
        setIsSent(true);
      }
    } catch (err) {
      // API not reachable — fall back to the official WhatsApp channel.
      setWaFallback(waMsg);
      setServerError('We couldn’t reach our server just now. You can also send your inquiry directly on WhatsApp below.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">{t('contact_heading')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact_sub')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="bg-card border border-border p-10 rounded-3xl h-full">
                <h3 className="font-serif text-3xl text-foreground mb-8">{t('contact_sub')}</h3>
                
                <div className="space-y-8">
                  <a href="https://wa.me/message/QAFZ3RKJDNH4B1" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <SiWhatsapp className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t('contact_fastest')}</p>
                      <p className="text-xl text-foreground font-medium group-hover:text-primary transition-colors">WhatsApp: +212 699 846 818</p>
                    </div>
                  </a>

                  <a href="mailto:moroccograndadventure@gmail.com" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t('contact_email_label')}</p>
                      <p className="text-xl text-foreground font-medium group-hover:text-primary transition-colors">moroccograndadventure@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t('contact_office')}</p>
                      <p className="text-lg text-foreground font-medium">{t('contact_address')}</p>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-border">
                    <p className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Find Us on Google Maps</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      View our verified Morocco Grand Adventure location on Google Maps.
                    </p>
                    <div className="flex items-center gap-2 mb-6">
                      <a href="https://maps.app.goo.gl/UK3MENd42bC16mME7" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label="View Morocco Grand Adventure on Google Maps">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                        <span>View on Google Maps</span>
                      </a>
                    </div>
                    <div className="mb-6">
                      <p className="text-xs text-muted-foreground">
                        Morocco Grand Adventure • {contactInfo.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Official Social Profiles</p>
                      <div className="flex gap-3">
                        <a href="https://www.instagram.com/morocco_grand_adventure/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Follow Morocco Grand Adventure on Instagram">
                          <SiInstagram className="w-5 h-5" />
                        </a>
                        <a href="https://youtube.com/@moroccograndadventure" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Subscribe to Morocco Grand Adventure on YouTube">
                          <SiYoutube className="w-5 h-5" />
                        </a>
                        <a href="https://www.tiktok.com/@morocco.grand.adv" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Follow Morocco Grand Adventure on TikTok">
                          <SiTiktok className="w-5 h-5" />
                        </a>
                        <a href="https://www.facebook.com/share/1DFzDX72P3/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all" aria-label="Like Morocco Grand Adventure on Facebook">
                          <SiFacebook className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="bg-card border border-border p-10 rounded-3xl" onSubmit={handleSubmit}>
                <h3 className="font-serif text-3xl text-foreground mb-8">{t('contact_send')}</h3>
                
                {isSent && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl mb-6">
                    {t('contact_sent')}
                  </div>
                )}
                {isError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-700 p-4 rounded-xl mb-6 space-y-3">
                    <p>{serverError}</p>
                    {waFallback && (
                      <a
                        href={`https://wa.me/message/QAFZ3RKJDNH4B1?text=${encodeURIComponent(waFallback)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                      >
                        <SiWhatsapp className="w-4 h-4" /> Send inquiry on WhatsApp
                      </a>
                    )}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-bold text-foreground">{t('contact_first_name')}</label>
                      <input type="text" id="firstName" name="firstName" autoComplete="given-name" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_firstname')} required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-bold text-foreground">{t('contact_last_name')}</label>
                      <input type="text" id="lastName" name="lastName" autoComplete="family-name" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_lastname')} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-foreground">{t('contact_email')}</label>
                    <input type="email" id="email" name="email" autoComplete="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_email')} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-foreground">{t('contact_phone')}</label>
                    <input type="tel" id="phone" name="phone" autoComplete="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_phone')} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="travelDates" className="text-sm font-bold text-foreground">Travel Dates</label>
                      <input type="text" id="travelDates" name="travelDates" placeholder="e.g. March 15–25" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="travelers" className="text-sm font-bold text-foreground">Number of Travelers</label>
                      <input type="number" id="travelers" name="travelers" min="1" placeholder="e.g. 2" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="destinations" className="text-sm font-bold text-foreground">Preferred Destinations</label>
                    <input type="text" id="destinations" name="destinations" placeholder="e.g. Sahara, Merzouga, Marrakech" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tourInterest" className="text-sm font-bold text-foreground">Interested Tour / Activity</label>
                    <input type="text" id="tourInterest" name="tourInterest" placeholder="e.g. Camel trekking, 4x4 tour" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="accommodation" className="text-sm font-bold text-foreground">Accommodation Preference</label>
                    <select id="accommodation" name="accommodation" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option value="">No preference</option>
                      <option value="luxury">Luxury hotel / riad</option>
                      <option value="midrange">Mid-range hotel / riad</option>
                      <option value="desert-camp">Desert camp</option>
                      <option value="mixed">Mix of styles</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-foreground">{t('contact_message')}</label>
                    <textarea 
                      id="message"
                      name="message"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none h-32 resize-none" 
                      placeholder={t('contact_ph_message')}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-foreground text-background py-4 rounded-xl font-bold tracking-wide hover:bg-primary hover:text-primary-foreground transition-all text-lg mt-4 shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : t('contact_send_btn')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


