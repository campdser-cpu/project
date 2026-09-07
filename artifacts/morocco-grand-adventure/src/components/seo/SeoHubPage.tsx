// ─────────────────────────────────────────────────────────────────────────────
// SeoHubPage — runtime renderer for the Merzouga guide + comparison pages.
// Shared with scripts/prerender.ts so the static HTML matches the live page.
// ─────────────────────────────────────────────────────────────────────────────
import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { SiWhatsapp } from 'react-icons/si';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { getLocalizedTour, getLocalizedTours, getLocalizedDestination, getLocalizedDestinations } from '@/i18n/content';
import { StructuredData, buildBreadcrumb, buildFaqSchema } from '@/components/seo/StructuredData';
import { MERZOUGA_GUIDES, COMPARISONS, TRAVEL_INFO, ALL_HUB_PAGES, type HubPage } from '@/data/seoHub';
import { catalogImage } from '@/data/imageCatalog';
import { SOURCES } from '@/data/sources';
import NotFound from '@/pages/not-found';
import { ChevronRight } from 'lucide-react';

function pagePath(page: HubPage): string {
  if (page.kind === 'merzouga') return `/merzouga-guide/${page.slug}`;
  if (page.kind === 'comparison') return `/comparisons/${page.slug}`;
  return `/travel-info/${page.slug}`;
}

// ── Public thin route components ─────────────────────────────────────────────
export default function MerzougaGuideTopic() {
  const { slug } = useParams();
  const page = MERZOUGA_GUIDES.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
  return <SeoHubPage page={page} />;
}

export function ComparisonPage() {
  const { slug } = useParams();
  const page = COMPARISONS.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
  return <SeoHubPage page={page} />;
}

export function TravelInfoTopic() {
  const { slug } = useParams();
  const page = TRAVEL_INFO.find((p) => p.slug === slug);
  if (!page) return <NotFound />;
  return <SeoHubPage page={page} />;
}

// ── Shared renderer ──────────────────────────────────────────────────────────
export function SeoHubPage({ page }: { page: HubPage }) {
    const { lang, t } = useLanguage();
  const tours = getLocalizedTours(lang);
  const destinations = getLocalizedDestinations(lang);
  const bySlug = (s: string) => ALL_HUB_PAGES.find((p) => p.slug === s);

  const crumbs = [
    { name: t('nav_home'), path: '/' },
    page.kind === 'merzouga'
      ? { name: 'Merzouga Travel Guide', path: '/merzouga-guide' }
      : page.kind === 'comparison'
        ? { name: 'Tour comparisons', path: '/' }
        : { name: 'Travel information', path: '/travel-info' },
    { name: page.title, path: '' },
  ];

  // Inline catalog photographs keyed by section index
  const figureAfter = new Map<number, string>();
  (page.inlineImages ?? []).forEach((ii) => figureAfter.set(ii.after, ii.imageId));
  const renderCatalogFigure = (imageId: string) => {
    const img = catalogImage(imageId);
    if (!img) return null;
    return (
      <figure key={imageId} className="my-10">
        <img
          src={img.src}
          srcSet={`${img.src.replace('.webp', '-480w.webp')} 480w, ${img.src.replace('.webp', '-768w.webp')} 768w, ${img.src} ${img.width}w`}
          sizes="(max-width: 768px) 100vw, 768px"
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
          className="rounded-2xl w-full h-auto border border-border"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">{img.caption}</figcaption>
      </figure>
    );
  };

  return (
    <Layout>
      <StructuredData id="breadcrumb" data={buildBreadcrumb(crumbs, lang)} />
      {page.faqs.length > 0 && (
        <StructuredData
          id="faq"
          data={buildFaqSchema(page.faqs) as unknown as Record<string, unknown>}
        />
      )}
      <article className="pt-20">
        {/* Hero */}
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            src={page.heroImage}
            alt={page.heroAlt}
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl text-white">
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6 block drop-shadow-md">
              Morocco Grand Adventure
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-2xl">
              {page.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
              {page.intro}
            </p>
          </div>
        </section>

        {/* Body sections */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            {page.sections.map((sec, i) => (
              <div key={sec.heading + i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="mb-14"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="text-muted-foreground leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-1 mt-3">
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
              {figureAfter.has(i) && renderCatalogFigure(figureAfter.get(i)!)}
              </div>
            ))}
          </div>
        </section>
                {/* Comparison table for comparison pages */}
        {page.comparisonRows && page.comparisonRows.length > 0 && (
          <section className="py-16 md:py-24 bg-muted border-t border-border">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8 text-center">
                At a glance
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border bg-background">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-left p-4 font-semibold">Option A</th>
                      <th className="text-left p-4 font-semibold">Option B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.comparisonRows.map(([label, a, b, note], i) => (
                      <tr key={label + i} className={i % 2 ? 'bg-muted/30' : ''}>
                        <td className="p-4 font-medium align-top">{label}</td>
                        <td className="p-4 align-top">{a}</td>
                        <td className="p-4 align-top">{b}</td>
                        {note && <td className="p-4 align-top text-xs text-muted-foreground">{note}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Related tours */}
        {page.tours.length > 0 && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                Related tours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {page.tours
                  .map((id) => tours.find((t) => t.id === id))
                  .filter((t): t is (typeof tours)[number] => Boolean(t))
                  .map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.id}`}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all"
                    >
                      <img
                        src={tour.image}
                        alt={tour.name}
                        width={900}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-5">
                        <span className="text-xs font-bold text-primary tracking-widest uppercase block mb-2">
                          {tour.duration}
                        </span>
                        <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                          {tour.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}
                {/* Related destinations */}
        {page.destinations.length > 0 && (
          <section className="py-16 md:py-24 bg-muted border-t border-border">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                Related destinations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {page.destinations
                  .map((id) => destinations.find((d) => d.id === id))
                  .filter((d): d is (typeof destinations)[number] => Boolean(d))
                  .map((d) => (
                    <Link
                      key={d.id}
                      href={`/destinations/${d.id}`}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
                    >
                      <div className="h-36 overflow-hidden">
                        <img
                          src={d.image}
                          alt={d.name}
                          width={900}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl text-foreground">{d.name}</h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                          {d.shortDesc}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
                )}

        {/* Related guide pages */}
        {page.relatedGuides.length > 0 && (
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                Keep planning
              </h2>
              <ul className="space-y-3">
                                {page.relatedGuides
                  .map(bySlug)
                  .filter((p): p is HubPage => Boolean(p))
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={pagePath(p)}
                        className="group flex items-center text-foreground hover:text-primary transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-primary mr-2 group-hover:translate-x-1 transition-transform" />
                        {p.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ accordion */}
        {page.faqs.length > 0 && (
          <section className="py-16 md:py-24 bg-muted border-t border-border">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {page.faqs.map((f, i) => (
                  <details
                    key={f.question + i}
                    className="group bg-card border border-border rounded-2xl p-5 open:shadow-lg transition-all"
                  >
                    <summary className="flex items-center justify-between cursor-pointer font-semibold text-foreground text-lg">
                      {f.question}
                      <ChevronRight className="w-5 h-5 text-primary group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Authoritative sources — descriptive links, plain HTML, no widgets */}
        {page.sources && page.sources.length > 0 && (
          <section className="py-12 bg-background border-t border-border">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-serif text-xl text-foreground mb-3">Sources & further information</h2>
              <ul className="space-y-2">
                {page.sources.map((sid) => {
                  const s = SOURCES[sid];
                  if (!s) return null;
                  return (
                    <li key={sid} className="text-sm text-muted-foreground">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {s.title}
                      </a>{' '}
                      — {s.publisher}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* Conversion CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent border-t border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Ready for the real Sahara?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Talk to a local Merzouga guide and shape the desert night that suits your
              group, pace and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/trip-builder"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all"
              >
                Build my Morocco journey
              </Link>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#1fb959] transition-all"
              >
                <SiWhatsapp className="w-5 h-5" /> WhatsApp a local expert
              </a>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
