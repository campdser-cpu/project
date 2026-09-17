// ─────────────────────────────────────────────────────────────────────────────
// /things-to-do-in-morocco — an editorial list of twenty-five things, each one
// a real photograph, a real place and a way further into the site.
//
// The list is deliberately plain HTML: a section per theme, an <article> per
// entry with its own heading, image, two sentences and a practical line. Every
// entry ends with two links (its destination and a guide, experience or tours
// hub), which is what keeps the destination tree connected.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDestination } from '@/i18n/content';
import { THINGS, useThingsCopy, type GroupKey } from '@/data/things-to-do';
import { StructuredData, buildBreadcrumb } from '../components/seo/StructuredData';
import { MapPin, ArrowRight, Lightbulb } from 'lucide-react';

// Where a reader goes when the list is finished.
const KEEP_READING = [
  { href: '/merzouga-guide', label: 'footer_merzouga_guide' },
  { href: '/travel-info', label: 'dest_travel_info' },
  { href: '/blog', label: 'footer_travel_blog' },
  { href: '/faq', label: 'footer_faq' },
] as const;

const HERO = {
  src: '/images/library/jemaa-el-fna-day-marrakech-mga-018.jpg',
  srcSet:
    '/images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-480w.webp 480w, /images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-768w.webp 768w, /images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-1280w.webp 1280w, /images/library/srcset/jemaa-el-fna-day-marrakech-mga-018-1920w.webp 1920w',
  alt: 'Daytime view of Jemaa el-Fna with vendors and terracotta buildings',
};

const GROUP_ORDER: GroupKey[] = ['sahara', 'marrakech', 'fes', 'south', 'coast', 'culture'];

export default function ThingsToDo() {
  const { t, lang } = useLanguage();
  const copy = useThingsCopy(lang);

  // The running number is the reader's promise: twenty-five, in order.
  let counter = 0;

  return (
    <Layout>
      <StructuredData
        id="things-to-do-breadcrumb"
        data={buildBreadcrumb(
          [
            { name: t('nav_home'), path: '/' },
            { name: copy.heading, path: '/things-to-do-in-morocco' },
          ],
          lang,
        )}
      />

      {/* Hero */}
      <section className="relative min-h-[58vh] md:min-h-[66vh] flex items-end pt-28 pb-12 overflow-hidden bg-black">
        <img
          src={HERO.src}
          srcSet={HERO.srcSet}
          sizes="100vw"
          alt={HERO.alt}
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/40" />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <span className="block text-xs md:text-sm uppercase tracking-[0.3em] text-primary mb-5">{copy.kicker}</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">{copy.heading}</h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-3xl">{copy.intro}</p>
        </div>
      </section>

      {/* The list */}
      <div className="bg-background">
        {GROUP_ORDER.map((group) => {
          const entries = THINGS.filter((thing) => thing.group === group);
          if (entries.length === 0) return null;
          return (
            <section key={group} className="py-14 md:py-20 border-b border-border last:border-b-0">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 md:mb-14">{copy.groups[group]}</h2>

                <div className="space-y-14 md:space-y-20">
                  {entries.map((thing) => {
                    counter += 1;
                    const item = copy.items[thing.id];
                    if (!item) return null;
                    const place = getLocalizedDestination(thing.destination, lang);
                    const flip = counter % 2 === 0;
                    return (
                      <article key={thing.id} className="grid gap-6 md:gap-10 md:grid-cols-2 md:items-center">
                        <div className={`overflow-hidden rounded-3xl border border-border bg-card ${flip ? 'md:order-2' : ''}`}>
                          <img
                            src={thing.image.src}
                            srcSet={thing.image.srcSet}
                            sizes="(min-width: 768px) 46vw, 100vw"
                            alt={thing.image.alt}
                            width={thing.image.width}
                            height={thing.image.height}
                            loading={counter <= 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="w-full h-64 md:h-80 object-cover"
                          />
                        </div>

                        <div className={flip ? 'md:order-1' : ''}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-serif text-3xl text-primary-text leading-none">{counter}</span>
                            {place && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" /> {place.name}
                              </span>
                            )}
                          </div>
                          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-snug">{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">{item.body}</p>
                          <p className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed mb-5">
                            <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item.tip}</span>
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {place && (
                              <Link
                                href={`/destinations/${thing.destination}`}
                                className="inline-flex items-center gap-1 text-primary-text font-bold text-sm hover:gap-2 transition-all"
                              >
                                {place.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                              </Link>
                            )}
                            <Link
                              href={thing.link}
                              className="inline-flex items-center gap-1 text-primary-text font-bold text-sm hover:gap-2 transition-all"
                            >
                              {copy.links[thing.linkKey]} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Closing invitation */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-5">{copy.ctaTitle}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{copy.ctaText}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {KEEP_READING.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex items-center gap-1 text-primary-text font-bold text-sm hover:gap-2 transition-all">
                  {t(r.label)} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/trip-builder"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors"
            >
              {copy.ctaButton}
            </Link>
            <Link
              href="/tours"
              className="border border-foreground/30 text-foreground px-8 py-4 rounded-full font-bold hover:bg-foreground hover:text-background transition-colors"
            >
              {t('nav_tours')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
