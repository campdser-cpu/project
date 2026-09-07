// Travel Information hub index — lists all travel-info pages.
// Shared data source: src/data/seoHub.ts (TRAVEL_INFO), mirrored in prerender.
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { StructuredData, buildBreadcrumb } from '@/components/seo/StructuredData';
import { TRAVEL_INFO } from '@/data/seoHub';

export default function TravelInfo() {
  const { t, lang } = useLanguage();
  const crumbs = [
    { name: t('nav_home'), path: '/' },
    { name: 'Travel information', path: '' },
  ];
  return (
    <Layout>
      <StructuredData id="breadcrumb" data={buildBreadcrumb(crumbs, lang)} />
      <article className="pt-20">
        <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src="/images/catalog/draa-valley-oasis-palm-grove.webp"
            alt="Dense palm grove of the Draa Valley oasis stretching toward the mountains"
            width={1280}
            height={853}
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
              Morocco Travel Information
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Practical guides from a local team — when to go, what to pack and how to
              get around, written from real experience on the road.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl grid gap-6 md:grid-cols-2">
            {TRAVEL_INFO.map((p) => (
              <Link
                key={p.slug}
                href={`/travel-info/${p.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={p.heroImage}
                    alt={p.heroAlt}
                    width={1280}
                    height={853}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{p.description}</p>
                  <span className="inline-flex items-center text-primary text-sm font-semibold mt-3">
                    Read the guide
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}