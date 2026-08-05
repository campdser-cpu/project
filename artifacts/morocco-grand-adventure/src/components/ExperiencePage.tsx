import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CheckCircle2, ChevronRight, Star, ShieldCheck, Clock, Users, MapPin } from 'lucide-react';
import { Layout } from './layout/Layout';
import { contactInfo } from '@/data/content';
import { SiWhatsapp } from 'react-icons/si';
import { StructuredData, buildBreadcrumb } from './seo/StructuredData';

export type ExperiencePageProps = {
  /** Unique id for structured data */
  id: string;
  /** Hero image */
  heroImage: string;
  /** Hero alt text */
  heroAlt: string;
  /** Breadcrumb name */
  breadcrumbName: string;
  /** Page title (H1) */
  title: string;
  /** Page subtitle */
  subtitle: string;
  /** Main content sections */
  children?: ReactNode;
  /** Key highlights/features */
  highlights?: { title: string; description: string; image?: string }[];
  /** FAQ items */
  faqs?: { question: string; answer: string }[];
  /** CTA text */
  ctaText?: string;
  /** CTA link */
  ctaLink?: string;
  /** Trust badges */
  trustBadges?: { icon: ReactNode; label: string }[];
};

export function ExperiencePage({
  id,
  heroImage,
  heroAlt,
  breadcrumbName,
  title,
  subtitle,
  children,
  highlights = [],
  faqs = [],
  ctaText = "Book This Experience",
  ctaLink = "/contact",
  trustBadges = [],
}: ExperiencePageProps) {
  const breadcrumb = buildBreadcrumb([
    { name: 'Home', path: '/' },
    { name: breadcrumbName, path: `/${id}` },
  ]);

  return (
    <Layout>
      <StructuredData id={`${id}-breadcrumb`} data={breadcrumb} />

      {/* Hero */}
      <section className="relative h-[70vh] w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={heroImage}
            alt={heroAlt}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-6 block drop-shadow-md">
              Morocco Grand Adventure
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-[1.1] drop-shadow-2xl">
              {title}
            </h1>
            <p className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <Link
                href={ctaLink}
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,168,76,0.5)]"
              >
                {ctaText}
              </Link>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/40 px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white/20 hover:border-white/70 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <SiWhatsapp className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges strip */}
      {trustBadges.length > 0 && (
        <section className="bg-background py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="text-primary">{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      {children}

      {/* Highlights grid */}
      {highlights.length > 0 && (
        <section className="py-16 md:py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Highlights</span>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground">What Makes This Experience Special</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-3xl p-6 md:p-8 border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  {h.image && (
                    <img
                      src={h.image}
                      alt={h.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 object-cover rounded-2xl mb-4"
                    />
                  )}
                  <h3 className="font-serif text-xl text-foreground mb-2">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">FAQ</span>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-card border border-border rounded-2xl p-6 open:shadow-lg transition-all"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground text-lg">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 text-primary group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Ready to Experience This?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our local experts are ready to craft your perfect Morocco journey. Message us today for a personalised quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trip-builder"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg"
            >
              Build Your Journey
            </Link>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-[#1fb959] transition-all hover:-translate-y-1 shadow-lg flex items-center gap-2"
            >
              <SiWhatsapp className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Default trust badges used across experience pages
export const defaultTrustBadges = [
  { icon: <Star className="w-5 h-5" />, label: "4.9/5 Rating" },
  { icon: <Users className="w-5 h-5" />, label: "15,000+ Travelers" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Licensed & Insured" },
  { icon: <Clock className="w-5 h-5" />, label: "24/7 Support" },
  { icon: <MapPin className="w-5 h-5" />, label: "Local Experts" },
];