import { Link } from 'wouter';
import { Car } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { verifiedGoogleReviews } from '@/data/verifiedReviews';
import LibraryPhotoGrid from '@/components/LibraryPhotoGrid';
import { publishablePhotosForContexts } from '@/data/photoLibrary';

/** Editorial About page — 10 sections, fully i18n via abt_* keys. */
const DUNE_PHOTO = {
  src: '/images/about/about-dune-1600.webp',
  srcSet: '/images/about/about-dune-640.webp 640w, /images/about/about-dune-960.webp 960w, /images/about/about-dune-1600.webp 1600w',
  width: 1600,
  height: 1067,
};

const GUIDES = [
  { name: 'Mohamed Boughrara', image: '/images/guide/mohamed-boughrara-founder-desert-guide-merzouga.webp', role: 'abt_people_guides_t', desc: 'abt_people_guides_d' },
  { name: 'Mostapha Wargaga', image: '/images/guide/mostapha-wargaga-senior-desert-guide-sahara-sunset.webp', role: 'abt_people_drivers_t', desc: 'abt_people_drivers_d' },
  { name: 'Moha Amroui', image: '/images/guide/moha-amroui-desert-guide-camels-merzouga.webp', role: 'abt_people_hosts_t', desc: 'abt_people_hosts_d' },
] as const;

const DESTINATIONS = [
  { slug: 'merzouga', key: 'Merzouga' },
  { slug: 'erg-chebbi', key: 'Erg Chebbi' },
  { slug: 'dades-valley', key: 'Dades' },
  { slug: 'todra-gorge', key: 'Todra' },
  { slug: 'ait-ben-haddou', key: 'Aït Ben Haddou' },
  { slug: 'ouarzazate', key: 'Ouarzazate' },
  { slug: 'marrakech', key: 'Marrakech' },
  { slug: 'fes', key: 'Fès' },
  { slug: 'essaouira', key: 'Essaouira' },
  { slug: 'agadir', key: 'Agadir' },
  { slug: 'chefchaouen', key: 'Chefchaouen' },
] as const;

function SectionHeading({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-14 md:mb-20">
      {kicker && <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{kicker}</span>}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">{title}</h2>
      {sub && <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">{sub}</p>}
    </div>
  );
}

export default function PremiumAboutSection() {
  const { t } = useLanguage();
  const fleetPhotos = publishablePhotosForContexts(['fleet']);
  const grew = [1, 2, 3, 4, 5, 6].map((n) => ({ title: t(`abt_grown_${n}_t` as any), text: t(`abt_grown_${n}_d` as any) }));
  const travel = [1, 2, 3, 4, 5].map((n) => ({ title: t(`abt_travel_${n}_t` as any), text: t(`abt_travel_${n}_d` as any) }));
  const roles = [
    { title: t('abt_people_guides_t'), text: t('abt_people_guides_d') },
    { title: t('abt_people_drivers_t'), text: t('abt_people_drivers_d') },
    { title: t('abt_people_hosts_t'), text: t('abt_people_hosts_d') },
    { title: t('abt_people_partners_t'), text: t('abt_people_partners_d') },
  ];
  const exps = [1, 2, 3, 4, 5, 6].map((n) => ({ title: t(`abt_exp_${n}_t` as any), text: t(`abt_exp_${n}_d` as any) }));
  const resp = [1, 2, 3, 4].map((n) => ({ title: t(`abt_resp_${n}_t` as any), text: t(`abt_resp_${n}_d` as any) }));
  const why = [1, 2, 3, 4, 5, 6].map((n) => ({ title: t(`abt_why_${n}_t` as any), text: t(`abt_why_${n}_d` as any) }));
  const trust = [
    { title: t('abt_trust_reviews_t'), text: t('abt_trust_reviews_d') },
    { title: t('abt_trust_local_t'), text: t('abt_trust_local_d') },
    { title: t('abt_trust_contact_t'), text: t('abt_trust_contact_d') },
  ];
  const trustReviews = verifiedGoogleReviews.filter((r) => ['google-nina-branderhorst', 'google-natalia-cuadrado', 'google-kresimir-mikic'].includes(r.id));

  return (
    <div className="premium-about-section">
      {/* 1 — Hero */}
      <section className="relative h-[68vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <img src="/images/hero/medina-pano.webp" alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <span className="text-sm uppercase tracking-[0.3em] text-primary block mb-6">{t('abt_hero_kicker')}</span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{t('abt_hero_h1')}</h1>
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">{t('abt_hero_sub')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/tours" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all">{t('abt_hero_cta_tours')}</Link>
            <Link to="/trip-builder" className="border border-white/60 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">{t('abt_hero_cta_private')}</Link>
          </div>
        </div>
      </section>

      {/* 2 — Our story */}
      <section className="py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">{t('abt_story_kicker')}</span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8 leading-tight">{t('abt_story_h2')}</h2>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>{t('abt_story_p1')}</p>
              <p>{t('abt_story_p2')}</p>
              <p className="text-foreground font-serif text-xl md:text-2xl leading-snug border-l-2 border-primary pl-6">{t('abt_story_p3')}</p>
            </div>
          </div>
          <figure className="rounded-3xl overflow-hidden border border-border">
            <img src={DUNE_PHOTO.src} srcSet={DUNE_PHOTO.srcSet} sizes="(max-width: 1024px) 100vw, 50vw" width={DUNE_PHOTO.width} height={DUNE_PHOTO.height} alt={t('home_about_photo_alt')} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
            <figcaption className="flex items-center gap-2.5 px-5 py-4 bg-card border-t border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span className="font-serif text-foreground">Mohamed Boughrara</span>
              <span aria-hidden="true" className="text-primary">·</span>
              <span className="text-muted-foreground text-sm">{t('home_about_caption_role')}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 3 — How we grew */}
      <section className="py-20 md:py-32 bg-card border-y border-border [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_grown_h2')} sub={t('abt_grown_sub')} />
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {grew.map((step, i) => (
              <li key={i} className="bg-background rounded-3xl border border-border p-8">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary/10 text-primary font-serif text-lg font-bold mb-5">{i + 1}</span>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — How we travel */}
      <section className="py-20 md:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_travel_h2')} sub={t('abt_travel_p')} />
          <div className="divide-y divide-border max-w-4xl mx-auto border-y border-border">
            {travel.map((p, i) => (
              <article key={i} className="py-8 md:py-10 grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 items-start">
                <span className="font-serif text-3xl md:text-4xl text-primary/70">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{t('abt_cars_h3')}</h3>
            <p className="text-muted-foreground max-w-2xl mb-8">{t('abt_cars_p')}</p>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
              <figure className="rounded-3xl overflow-hidden border border-border">
                <img src="/images/personal/guests-van.webp" srcSet="/images/personal/guests-van-480w.webp 480w, /images/personal/guests-van-768w.webp 768w, /images/personal/guests-van.webp 1024w" sizes="(max-width: 640px) 100vw, 33vw" alt="Guests loading luggage into a Morocco Grand Adventure private minivan before a desert tour" loading="lazy" decoding="async" width={1024} height={683} className="w-full h-48 md:h-56 object-cover" />
                <figcaption className="p-4 text-sm text-muted-foreground">{t('abt_cars_van')}</figcaption>
              </figure>
              <figure className="rounded-3xl overflow-hidden border border-border">
                <img src="/images/personal/group-atlas.webp" srcSet="/images/personal/group-atlas-480w.webp 480w, /images/personal/group-atlas-768w.webp 768w, /images/personal/group-atlas.webp 1024w" sizes="(max-width: 640px) 100vw, 33vw" alt="Travel group posing together on a private Morocco Grand Adventure trip in the Atlas Mountains" loading="lazy" decoding="async" width={1024} height={683} className="w-full h-48 md:h-56 object-cover" />
                <figcaption className="p-4 text-sm text-muted-foreground">{t('abt_cars_group')}</figcaption>
              </figure>
              <figure className="rounded-3xl overflow-hidden border border-border">
                <img src="/images/personal/guests-sunset.webp" srcSet="/images/personal/guests-sunset-480w.webp 480w, /images/personal/guests-sunset-768w.webp 768w, /images/personal/guests-sunset.webp 1024w" sizes="(max-width: 640px) 100vw, 33vw" alt="Guests enjoying sunset in the Sahara dunes during a private Morocco Grand Adventure tour" loading="lazy" decoding="async" width={1024} height={683} className="w-full h-48 md:h-56 object-cover" />
                <figcaption className="p-4 text-sm text-muted-foreground">{t('abt_cars_sunset')}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>



      {/* 5 — The people */}
      <section className="py-20 md:py-32 bg-card border-y border-border [content-visibility:auto] [contain-intrinsic-size:auto_1200px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_people_h2')} sub={t('abt_people_p')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
            {roles.map((r, i) => (
              <div key={i} className="bg-background rounded-3xl border border-border p-8">
                <div className="w-1 h-10 bg-primary rounded-full mb-5" aria-hidden="true" />
                <h3 className="font-serif text-xl text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
          <div className="space-y-16 max-w-6xl mx-auto">
            {GUIDES.map((g, i) => (
              <div key={g.name} className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
                <div className={`w-56 md:w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border ${i % 2 ? 'md:order-2' : ''}`}>
                  <img src={g.image} alt={g.name} loading="lazy" decoding="async" width={640} height={800} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground">{g.name}</h3>
                  <p className="text-primary font-semibold mb-3">{t(g.role as any)}</p>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">{t(g.desc as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — From the Sahara to the Atlantic */}
      <section className="py-20 md:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading title={t('abt_geo_h2')} />
          <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p>{t('abt_geo_p')}</p>
            <p>{t('abt_geo_p2')}</p>
          </div>
          <h3 className="font-serif text-2xl text-foreground mt-12 mb-6">{t('abt_geo_title')}</h3>
          <ul className="flex flex-wrap gap-3">
            {DESTINATIONS.map((d) => (
              <li key={d.slug}>
                <Link to={`/destinations/${d.slug}`} className="inline-block px-5 py-2.5 rounded-full border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary transition-colors">{d.key}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Experiences */}
      <section className="py-20 md:py-32 bg-card border-y border-border [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_exp_h2')} sub={t('abt_exp_p')} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {exps.map((e, i) => (
              <article key={i} className="bg-background rounded-3xl border border-border p-8">
                <h3 className="font-serif text-xl text-foreground mb-3">{e.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{e.text}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/tours" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all">{t('abt_hero_cta_tours')}</Link>
          </div>
        </div>
      </section>

      {/* 8 — Travel responsibly */}
      <section className="py-20 md:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading title={t('abt_resp_h2')} sub={t('abt_resp_p')} />
          <div className="grid sm:grid-cols-2 gap-6">
            {resp.map((r, i) => (
              <article key={i} className="p-8 rounded-3xl border border-border bg-card">
                <h3 className="font-serif text-xl text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Our Private Fleet (official photo library MGA-041…045) */}
      <section className="py-20 md:py-32 bg-card border-y border-border [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_fleet_h2')} sub={t('abt_fleet_p')} />
          <LibraryPhotoGrid photos={fleetPhotos} aspect="h-56 md:h-72" />
          <p className="text-center text-xs text-muted-foreground mt-6">{t('abt_fleet_cap')}</p>
          <div className="text-center mt-10">
            <Link
              to="/trip-builder"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] hover:-translate-y-1"
            >
              <Car className="w-5 h-5" aria-hidden="true" /> {t('abt_fleet_cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Why travel with us */}
      <section className="py-20 md:py-32 bg-card border-y border-border [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <div className="container mx-auto px-4">
          <SectionHeading title={t('abt_why_h2')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {why.map((w, i) => (
              <div key={i} className="bg-background rounded-3xl border border-border p-8">
                <h3 className="font-serif text-xl text-foreground mb-3">{w.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 10 — Trust, promise & CTAs */}
      <section className="py-20 md:py-32 [content-visibility:auto] [contain-intrinsic-size:auto_1000px]">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading title={t('abt_trust_h2')} sub={t('abt_trust_p')} />
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {trust.map((c, i) => (
              <div key={i} className="p-6 rounded-3xl border border-border bg-card">
                <h3 className="font-serif text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          {trustReviews.length > 0 && (
            <aside className="mb-16 rounded-3xl border border-border bg-card p-6 md:p-10" aria-label={t('abt_trust_reviews_t')}>
              <div className="space-y-6">
                {trustReviews.map((r) => (
                  <figure key={r.id} className="border-l-2 border-primary/60 pl-5">
                    <blockquote className="text-foreground/90 leading-relaxed">“{r.text}”</blockquote>
                    <figcaption className="mt-2 text-sm font-semibold text-muted-foreground">{r.name} · {r.rating}/5 · Google</figcaption>
                  </figure>
                ))}
              </div>
            </aside>
          )}
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">{t('abt_promise_h2')}</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">{t('abt_promise_p')}</p>
            <p className="font-serif text-xl md:text-2xl text-foreground mb-10">{t('abt_promise_line')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all">{t('abt_promise_cta')}</Link>
              <Link to="/trip-builder" className="border border-border text-foreground px-8 py-4 rounded-full font-bold hover:border-primary/50 hover:text-primary transition-all">{t('abt_promise_cta2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
