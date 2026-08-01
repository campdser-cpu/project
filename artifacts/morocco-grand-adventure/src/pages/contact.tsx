import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SiWhatsapp, SiInstagram } from 'react-icons/si';
import { useState } from 'react';

export default function Contact() {
  const { t } = useLanguage();
  const [isSent, setIsSent] = useState(false);

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
                  <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <SiWhatsapp className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t('contact_fastest')}</p>
                      <p className="text-xl text-foreground font-medium group-hover:text-primary transition-colors">{t('contact_whatsapp_label')}</p>
                    </div>
                  </a>

                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{t('contact_email_label')}</p>
                      <p className="text-xl text-foreground font-medium group-hover:text-primary transition-colors">{contactInfo.email}</p>
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

                  <div className="pt-8 mt-8 border-t border-border flex gap-4">
                    <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                      <SiInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="bg-card border border-border p-10 rounded-3xl" onSubmit={(e) => { e.preventDefault(); setIsSent(true); setTimeout(() => setIsSent(false), 5000); }}>
                <h3 className="font-serif text-3xl text-foreground mb-8">{t('contact_send')}</h3>
                
                {isSent && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl mb-6">
                    {t('contact_sent')}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">{t('contact_first_name')}</label>
                      <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_firstname')} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">{t('contact_last_name')}</label>
                      <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_lastname')} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">{t('contact_email')}</label>
                    <input type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_email')} required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">{t('contact_phone')}</label>
                    <input type="tel" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder={t('contact_ph_phone')} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">{t('contact_message')}</label>
                    <textarea 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none h-32 resize-none" 
                      placeholder={t('contact_ph_message')}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-foreground text-background py-4 rounded-xl font-bold tracking-wide hover:bg-primary hover:text-primary-foreground transition-all text-lg mt-4 shadow-lg hover:shadow-primary/20">
                    {t('contact_send_btn')}
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
