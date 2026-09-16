// ─────────────────────────────────────────────────────────────────────────────
// Student Tours / University Travel — standalone experience page.
//
// NOT a 25th canonical tour: this is a dedicated landing experience that lives
// alongside the 24 tour products. Copy comes from src/i18n/gaps/student-tours.ts
// (en + pt authored; other locales fall through to English by design).
//
// Photography: real client photographs extracted from the supplied Student
// Tours image library. Alt text follows the confirmed truth rule — only the
// frames verified as student groups say "student group"; the Atlas flag frame
// says "group" (MGA flag proves an MGA group, not university status); the rest
// are described as locations/scenes.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { studentTours } from '@/data/student-tours';

const IMG = '/images/student-tours';

/** Responsive <picture> using the generated WebP derivatives. */
function Photo({
  name, alt, className, widths = [480, 768, 1280], sizes = '(max-width: 768px) 100vw, 50vw',
  w, h, eager = false,
}: {
  name: string; alt: string; className?: string; widths?: number[]; sizes?: string;
  w: number; h: number; eager?: boolean;
}) {
  return (
    <picture>
      <source type="image/webp" sizes={sizes} srcSet={widths.map((x) => `${IMG}/${name}-${x}w.webp ${x}w`).join(', ')} />
      <img
        src={`${IMG}/${name}.jpg`} alt={alt} width={w} height={h} className={className}
        loading={eager ? 'eager' : 'lazy'} decoding={eager ? 'sync' : 'async'}
        {...(eager ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}

const GOLD = '#C9A84C';

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className="text-[12px] font-semibold uppercase mb-5" style={{ letterSpacing: '0.22em', color: onDark ? GOLD : undefined }}>
      <span className={onDark ? '' : 'text-muted-foreground'}>{children}</span>
    </p>
  );
}

export default function StudentTours() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Hero video is deferred, NOT disabled on mobile. The poster and the real HTML
  // text paint first; the <video> is only mounted once the hero is actually in
  // view. The single 2.33 MB H.264 file is small enough to serve to phones too,
  // so there is no second mobile encode and no width gate.
  //
  // The only opt-out is prefers-reduced-motion, which keeps the poster.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShowVideo(true); return; }

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShowVideo(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // iOS/Android only honour autoplay once the element is muted + playsInline and
  // has a source attached. If the browser still refuses, the poster remains —
  // the hero never shows a black frame.
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    if (v.readyState >= 2) play();
    else v.addEventListener('loadeddata', play, { once: true });
    return () => v.removeEventListener('loadeddata', play);
  }, [showVideo]);

  const wa = `${contactInfo.whatsapp}?text=${encodeURIComponent(
    'Hello Morocco Grand Adventure — I would like to plan a Student Tour for a university group.',
  )}`;

  const subjects = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    n: String(n).padStart(2, '0'),
    label: t(`st_04_s${n}_label`),
    body: t(`st_04_s${n}_body`),
  }));
  const route = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    place: t(`st_05_n${n}`), theme: t(`st_05_t${n}`), detail: t(`st_05_x${n}`),
  }));
  const why = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ t: t(`st_08_i${n}_t`), d: t(`st_08_i${n}_d`) }));
  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({ n: String(n).padStart(2, '0'), t: t(`st_15_s${n}_t`), d: t(`st_15_s${n}_d`) }));
  const focus = [1, 2, 3, 4, 5, 6].map((n) => ({ t: t(`st_14_f${n}_t`), d: t(`st_14_f${n}_d`) }));
  const faqs = Array.from({ length: 16 }, (_, i) => ({ q: t(`st_15_q${i + 1}`), a: t(`st_15_a${i + 1}`) }));
  const pov = [1, 2, 3, 4, 5].map((n) => ({ l: t(`st_12_l${n}`), d: t(`st_12_d${n}`) }));

  const programmes = [
    { t: t('st_06_c1_t'), d: t('st_06_c1_d'), img: 'student-henna-local-hosts', alt: t('st_06_alt1'), w: 1280, h: 960 },
    { t: t('st_06_c2_t'), d: t('st_06_c2_d'), img: 'camel-trek-erg-chebbi', alt: t('st_06_alt2'), w: 1280, h: 853 },
    { t: t('st_06_c3_t'), d: t('st_06_c3_d'), img: 'fes-tanneries-craft', alt: t('st_06_alt3'), w: 853, h: 1280 },
    { t: t('st_06_c4_t'), d: t('st_06_c4_d'), img: 'students-buggy-erg-chebbi', alt: t('st_06_alt4'), w: 1345, h: 1169 },
    { t: t('st_06_c5_t'), d: t('st_06_c5_d'), img: 'chefchaouen-medina-street', alt: t('st_06_alt5'), w: 1086, h: 1444 },
    { t: t('st_06_c6_t'), d: t('st_06_c6_d'), img: null, alt: '', w: 0, h: 0 },
  ];

  // Where students travel — each place links to the canonical MGA page that
  // already owns that destination's authority.
  const places = [
    { i: 1, to: '/destinations/marrakech', linkLabel: t('hub_marrakech_name') || 'Marrakech' },
    { i: 2, to: '/fes-tours', linkLabel: t('hub_fes_name') || 'Fes' },
    { i: 3, to: '/destinations/ait-ben-haddou', linkLabel: 'Aït Ben Haddou' },
    { i: 4, to: '/destinations/dades-valley', linkLabel: t('st_wt_4_place') },
    { i: 5, to: '/merzouga-guide', linkLabel: 'Merzouga' },
    { i: 6, to: '/destinations/erg-chebbi', linkLabel: 'Erg Chebbi' },
  ].map((p) => ({
    ...p,
    place: t(`st_wt_${p.i}_place`), subject: t(`st_wt_${p.i}_subject`),
    exp: t(`st_wt_${p.i}_exp`), mean: t(`st_wt_${p.i}_mean`),
  }));

  // The three dedicated Student Tour products. These are their own product
  // family (src/data/student-tours.ts) and deliberately do NOT link into the
  // private /tours/* catalogue — a visitor who lands here stays inside the
  // Student Tours ecosystem. <Link> resolves against the wouter base, so each
  // locale gets its own route.
  const journeys = studentTours.map((s) => ({
    days: s.duration.split(' ')[0],
    unit: 'Days',
    title: s.title,
    route: s.keyPlaces.join(' · '),
    themes: s.overview.regions,
    desc: s.cardSummary,
    to: `/student-tours/${s.slug}`,
    // Each card previews its program with that page's hero photograph. The
    // heroes live in student-tours/ with a .jpg fallback, which is what this
    // page's <Photo> expects, so the bare filename is passed.
    img: { ...s.hero, name: s.hero.name.replace(/^student-tours\//, '') },
  }));

  const internalLinks: { to: string; label: string }[] = [
    { to: '/desert-tours', label: t('nav_sahara_desert_tours') || 'Sahara Desert Tours' },
    { to: '/merzouga-guide', label: t('footer_merzouga_guide') || 'Merzouga Guide' },
    { to: '/camel-trekking', label: t('nav_camel_trekking') || 'Camel Trekking' },
    { to: '/4x4-tours', label: t('nav_4x4_desert_tours') || '4x4 Desert Tours' },
    { to: '/marrakech-tours', label: t('hub_marrakech_title') || 'Marrakech Tours' },
    { to: '/fes-tours', label: t('hub_fes_title') || 'Fes Tours' },
    { to: '/casablanca-tours', label: t('hub_casablanca_title') || 'Casablanca Tours' },
    { to: '/agadir-tours', label: t('hub_agadir_title') || 'Agadir Tours' },
    { to: '/destinations', label: t('nav_destinations') || 'Destinations' },
    { to: '/trip-builder', label: t('nav_build_journey') || 'Build Your Journey' },
    { to: '/about', label: t('nav_about') || 'About' },
    { to: '/contact', label: t('nav_contact') || 'Contact' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 01 — HERO -------------------------------------------------------
          min-height, never a fixed height: on a phone the copy is taller than
          the viewport allows, and a fixed box pushed the eyebrow up under the
          navbar logo. The top padding keeps it clear of the fixed header. */}
      <section
        ref={heroRef}
        className="relative min-h-[max(600px,88svh)] pt-28 md:pt-32 md:min-h-[100vh] md:max-h-[900px] flex items-end overflow-hidden bg-black"
      >
        <picture>
          <source type="image/webp" media="(max-width: 767px)" srcSet={`${IMG}/student-tours-hero-poster-768w.webp`} />
          <source type="image/webp" srcSet={`${IMG}/student-tours-hero-poster.webp`} />
          <img
            src={`${IMG}/student-tours-hero-poster.jpg`} alt={t('st_hero_alt')} width={1600} height={900}
            className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="sync"
          />
        </picture>
        {showVideo && (
          <video
            ref={videoRef} poster={`${IMG}/student-tours-hero-poster.jpg`}
            muted loop playsInline autoPlay preload="metadata" aria-hidden="true" tabIndex={-1}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/student-tours-hero.mp4" type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,8,8,.42) 0%, rgba(8,8,8,0) 32%, rgba(8,8,8,0) 44%, rgba(8,8,8,.86) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 pb-16 md:pb-24">
          <div className="max-w-[640px]">
            <p className="text-[12px] font-semibold uppercase mb-5" style={{ letterSpacing: '0.22em', color: GOLD }}>{t('st_eyebrow')}</p>
            <h1 className="font-serif text-white font-light leading-[1.04] tracking-tight text-[clamp(2.5rem,6vw,4.6rem)]">{t('st_h1')}</h1>
            <div className="h-px w-14 my-7" style={{ background: GOLD }} aria-hidden="true" />
            <p className="text-white/90 text-[15px] md:text-lg leading-relaxed max-w-[34rem]">{t('st_sub')}</p>
            <div className="mt-7 pl-4 border-l" style={{ borderColor: GOLD }}>
              <p className="text-white text-sm md:text-base font-medium leading-snug">{t('st_groupsize')}</p>
              <p className="text-white/70 text-[13px] md:text-sm mt-1.5 leading-snug max-w-[30rem]">{t('st_groupsize_large')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-semibold tracking-wide hover:opacity-90 transition">
                {t('st_cta1')}
              </a>
              <a href="#programme-experiences"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/70 text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black transition">
                {t('st_cta2')}
              </a>
            </div>
            <p className="mt-10 text-[11px] tracking-[0.2em] text-white/70 uppercase">{t('st_cue')}</p>
          </div>
        </div>
      </section>

      {/* 02 — MORE THAN A TRIP -------------------------------------------- */}
      <section className="bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-[56%_44%] gap-10 md:gap-16 items-center py-16 md:py-28">
          <div className="max-w-[34rem]">
            <Eyebrow>{t('st_02_eyebrow')}</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground leading-tight">{t('st_02_h2')}</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t('st_02_p1')}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t('st_02_p2')}</p>
            <blockquote className="mt-8 pl-5 py-2 text-foreground text-lg font-serif" style={{ borderLeft: `2.4px solid ${GOLD}` }}>
              {t('st_02_quote')}
            </blockquote>
          </div>
          <Photo name="chefchaouen-medina-street" alt={t('st_02_alt')} w={1086} h={1444}
            widths={[480, 768]} sizes="(max-width: 768px) 100vw, 44vw" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* 03 — LIVING CLASSROOM BAND --------------------------------------- */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Photo name="fes-bab-boujloud" alt={t('st_04_alt_main')} w={1280} h={853}
          widths={[768, 1280]} sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative text-center px-4">
          <h2 className="font-serif text-white text-3xl md:text-5xl font-light">{t('st_03_h2')}</h2>
          <p className="mt-4 text-white/85">{t('st_03_line')}</p>
        </div>
      </section>

      {/* 04 — WHAT STUDENTS CAN LEARN ------------------------------------- */}
      <section className="bg-background py-16 md:py-28">
        <div className="container mx-auto px-4">
          <Eyebrow>{t('st_04_eyebrow')}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-3xl">{t('st_04_h2')}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">{t('st_04_intro')}</p>
          <div className="mt-12 grid lg:grid-cols-[2fr_1fr] gap-12">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {subjects.map((s) => (
                <div key={s.n}>
                  <span className="block text-4xl font-light" style={{ color: '#D9CFBD' }} aria-hidden="true">{s.n}</span>
                  <h3 className="mt-2 text-[13px] font-semibold uppercase text-foreground" style={{ letterSpacing: '0.16em' }}>{s.label}</h3>
                  <div className="h-px w-6 my-3" style={{ background: GOLD }} aria-hidden="true" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Photo name="student-group-ait-ben-haddou" alt={t('st_04_alt_stack1')} w={1536} h={982}
                widths={[480, 768]} sizes="(max-width: 1024px) 100vw, 30vw" className="w-full h-auto object-cover" />
              <Photo name="fes-tanneries-craft" alt={t('st_04_alt_stack2')} w={853} h={1280}
                widths={[480, 768]} sizes="(max-width: 1024px) 100vw, 30vw" className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="mt-14 p-8 md:p-10" style={{ background: '#E7DFD2' }}>
            <h3 className="font-serif text-xl md:text-2xl text-[#101010]">{t('st_04_places_h3')}</h3>
            <p className="mt-3 text-[#3A352E] leading-relaxed max-w-4xl">{t('st_04_places_p')}</p>
          </div>
        </div>
      </section>

      {/* 05 — THE JOURNEY IS THE CLASSROOM -------------------------------- */}
      <section className="py-16 md:py-24" style={{ background: '#F6F2EB' }}>
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#101010] text-center">{t('st_05_h2')}</h2>
          {/* Place → Subject → Experience. Vertical rail on mobile (no cramped
              7-across grid), horizontal rail from lg up. */}
          <ol className="mt-12 space-y-7 lg:space-y-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:relative">
            <li aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[10px] h-px" style={{ background: '#D8CFC0' }} />
            {route.map((r) => (
              <li key={r.place} className="relative grid grid-cols-[auto_1fr] gap-4 lg:block">
                <span className="block w-[9px] h-[9px] rounded-full mt-2 lg:mt-0 lg:mb-4" style={{ background: GOLD }} aria-hidden="true" />
                <div>
                  <span className="block text-[13px] font-semibold text-[#101010]" style={{ letterSpacing: '0.06em' }}>{r.place}</span>
                  <span className="block mt-1 text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: GOLD }}>{r.theme}</span>
                  <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#6E665C' }}>{r.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-sm lg:text-center" style={{ color: '#6E665C' }}>{t('st_05_caption')}</p>
          <div className="mt-8 lg:text-center">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#101010] border-b-2 pb-1 hover:opacity-70 transition"
              style={{ borderColor: GOLD }}>
              {t('st_cta_learn')} →
            </a>
          </div>
        </div>
      </section>

      {/* 05b — WHERE STUDENTS TRAVEL --------------------------------------
          PLACE → SUBJECT → EXPERIENCE → MEANING. Each entry carries the
          student-learning context and links to the canonical MGA page that
          already holds the destination authority — no duplication. */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground">{t('st_wt_h2')}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">{t('st_wt_intro')}</p>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {places.map((p) => (
              <article key={p.place} className="border-t pt-6" style={{ borderColor: '#D8CFC0' }}>
                <h3 className="font-serif text-xl md:text-2xl text-foreground">{p.place}</h3>
                <p className="mt-1 text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: GOLD }}>{p.subject}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.exp}</p>
                <p className="mt-3 text-sm text-foreground leading-relaxed">{p.mean}</p>
                <Link href={p.to}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-foreground border-b pb-0.5 hover:opacity-70 transition"
                  style={{ borderColor: GOLD }}>
                  {t('st_wt_link')} {p.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — PROGRAMME EXPERIENCES --------------------------------------- */}
      <section id="programme-experiences" className="bg-background py-16 md:py-28 scroll-mt-24">
        <div className="container mx-auto px-4">
          <Eyebrow>{t('st_06_eyebrow')}</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-3xl">{t('st_06_h2')}</h2>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p) => (
              <article key={p.t}>
                {p.img ? (
                  <div className="aspect-[16/10] overflow-hidden">
                    <Photo name={p.img} alt={p.alt} w={p.w} h={p.h} widths={[480, 768]}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/10] flex items-end p-6" style={{ background: '#E7DFD2' }}>
                    <span className="text-5xl font-light" style={{ color: '#D9CFBD' }} aria-hidden="true">06</span>
                  </div>
                )}
                <h3 className="mt-5 text-[13px] font-semibold uppercase text-foreground" style={{ letterSpacing: '0.16em' }}>{p.t}</h3>
                <div className="h-px w-6 my-3" style={{ background: GOLD }} aria-hidden="true" />
                <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — SAHARA FEATURE ---------------------------------------------- */}
      <section className="relative min-h-[560px] md:min-h-[760px] flex items-center overflow-hidden">
        <Photo name="camel-trek-erg-chebbi" alt={t('st_07_alt')} w={1280} h={853}
          widths={[768, 1280]} sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(8,8,8,.88) 0%, rgba(8,8,8,.4) 55%, rgba(8,8,8,0) 82%)' }} aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-[30rem]">
            <Eyebrow onDark>{t('st_07_eyebrow')}</Eyebrow>
            <h2 className="font-serif text-white text-3xl md:text-5xl font-light leading-tight">{t('st_07_h2')}</h2>
            <p className="mt-5 text-white/85 leading-relaxed">{t('st_07_body')}</p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <li key={n} className="flex items-start gap-3 text-white/90 text-sm">
                  <span className="mt-2 h-px w-[10px] shrink-0" style={{ background: GOLD }} aria-hidden="true" />
                  {t(`st_07_th${n}`)}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[11px] uppercase text-white/60" style={{ letterSpacing: '0.2em' }}>{t('st_07_footer')}</p>
          </div>
        </div>
      </section>

      {/* 08 — WHY MOROCCO -------------------------------------------------- */}
      <section style={{ background: '#F6F2EB' }}>
        <div className="relative h-[230px] overflow-hidden">
          <Photo name="students-quad-dunes" alt={t('st_08_alt')} w={1494} h={1052}
            widths={[768, 1280]} sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <h2 className="relative h-full flex items-center justify-center font-serif text-white text-2xl md:text-4xl font-light px-4 text-center">
            {t('st_08_h2')}
          </h2>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <div key={w.t}>
              <span className="block text-3xl font-light" style={{ color: '#D9CFBD' }} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-[13px] font-semibold uppercase text-[#101010]" style={{ letterSpacing: '0.16em' }}>{w.t}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#6E665C' }}>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 09 — UNIVERSITY GROUP SERVICES ----------------------------------- */}
      <section style={{ background: '#111110' }}>
        <div className="container mx-auto px-4 grid lg:grid-cols-[54%_46%] gap-10 lg:gap-16 items-center py-16 md:py-24">
          <div>
            <Eyebrow onDark>{t('st_09_eyebrow')}</Eyebrow>
            <h2 className="font-serif text-white text-3xl md:text-5xl font-light leading-tight">{t('st_09_h2')}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">{t('st_09_body')}</p>
            <h3 className="mt-10 text-[13px] font-semibold uppercase text-white" style={{ letterSpacing: '0.16em' }}>{t('st_09_h3')}</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <li key={n} className="flex items-start gap-3 text-white/85 text-sm">
                  <span className="mt-2 h-px w-[10px] shrink-0" style={{ background: GOLD }} aria-hidden="true" />
                  {t(`st_09_e${n}`)}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-white/60 text-sm italic">{t('st_09_note')}</p>

            <div className="mt-10 border p-6" style={{ borderColor: 'rgba(201,168,76,.45)' }}>
              <h3 className="text-[13px] font-semibold uppercase text-white" style={{ letterSpacing: '0.16em' }}>{t('st_09_groups_h3')}</h3>
              <p className="mt-3 text-white/80 text-sm leading-relaxed">{t('st_09_groups_p')}</p>
              <p className="mt-5 font-serif text-lg" style={{ color: GOLD }}>{t('st_coordinator')}</p>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="inline-flex mt-6 items-center justify-center px-7 py-3 text-sm font-semibold text-black bg-white hover:opacity-90 transition">
                {t('st_09_cta')}
              </a>
            </div>
          </div>
          <Photo name="students-amazigh-dress-oasis" alt={t('st_09_alt')} w={1280} h={890}
            widths={[480, 768, 1280]} sizes="(max-width: 1024px) 100vw, 46vw" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* 10 — LESS LOGISTICS + PROCESS RAIL -------------------------------- */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-3xl">{t('st_10_h2')}</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">{t('st_10_intro')}</p>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="block text-3xl font-light" style={{ color: GOLD }} aria-hidden="true">{s.n}</span>
                <div className="h-px w-full my-3" style={{ background: '#D8CFC0' }} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-2 pb-1 hover:opacity-70 transition"
              style={{ borderColor: GOLD }}>
              {t('st_cta_coord')} →
            </a>
          </div>
        </div>
      </section>

      {/* 11 — STUDENT JOURNEY IDEAS ---------------------------------------- */}
      <section style={{ background: '#F6F2EB' }} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#101010]">{t('st_11_h2')}</h2>
          <p className="mt-4 max-w-3xl" style={{ color: '#6E665C' }}>{t('st_11_intro')}</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {journeys.map((j) => (
              <article key={j.title} className="p-8" style={{ background: '#E7DFD2' }}>
                <div className="-mx-8 -mt-8 mb-7">
                  <Photo
                    name={j.img.name}
                    alt={j.img.alt}
                    w={j.img.w}
                    h={j.img.h}
                    widths={[480, 768, 1280]}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto aspect-[3/2] object-cover"
                  />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light text-[#101010]">{j.days}</span>
                  <span className="text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: '#8C857A' }}>{j.unit}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#101010]">{j.title}</h3>
                <p className="mt-3 text-[11px] uppercase" style={{ letterSpacing: '0.14em', color: GOLD }}>{j.themes}</p>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: '#3A352E' }}>{j.route}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#6E665C' }}>{j.desc}</p>
                <div className="h-px w-full my-5" style={{ background: '#D8CFC0' }} aria-hidden="true" />
                <p className="text-[11px]" style={{ color: '#8C857A' }}>{t('st_11_note')}</p>
                <Link
                  href={j.to}
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#101010] border-b-2 pb-0.5 hover:opacity-70 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ borderColor: GOLD }}
                >
                  {t('st_11_cta')}: {j.title} →
                </Link>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-14 py-10 px-4" style={{ background: '#111110' }}>
          <div className="container mx-auto text-center">
            <p className="text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.2em', color: GOLD }}>{t('st_11_band')}</p>
            <p className="mt-4 text-white/80 text-sm max-w-4xl mx-auto">{t('st_11_band_items')}</p>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex mt-7 items-center justify-center px-7 py-3 border border-white/50 text-white text-sm font-semibold hover:bg-white hover:text-black transition">
              {t('st_cta_group')}
            </a>
          </div>
        </div>
      </section>

      {/* 12 — STUDENT POV --------------------------------------------------- */}
      <section className="relative overflow-hidden" style={{ background: '#101010' }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-white text-3xl md:text-5xl font-light">{t('st_12_h2')}</h2>
          <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-12 items-start">
            <ol className="space-y-8">
              {pov.map((p) => (
                <li key={p.l} className="grid grid-cols-[110px_1fr] gap-5 items-baseline border-b border-white/10 pb-6">
                  <span className="text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: GOLD }}>{p.l}</span>
                  <span className="font-serif text-white text-xl md:text-2xl font-light leading-snug">{p.d}</span>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <Photo name="student-henna-desert-camp" alt={t('st_12_alt_evening')} w={1280} h={1011}
                widths={[480, 768]} sizes="(max-width: 1024px) 50vw, 360px" className="w-full h-auto object-cover" />
              <Photo name="sahara-moonrise-vertical" alt={t('st_12_alt_night')} w={730} h={1280}
                widths={[480]} sizes="(max-width: 1024px) 50vw, 360px" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 13 — REAL GROUP EXPERIENCE ---------------------------------------- */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground">{t('st_13_h2')}</h2>
          <p className="mt-4 text-muted-foreground">{t('st_13_line')}</p>
        </div>
        <div className="mt-10 grid gap-[2px] grid-cols-2 md:grid-cols-6">
          <div className="col-span-2 md:col-span-4 aspect-[16/10] overflow-hidden">
            <Photo name="students-erg-chebbi-dunes" alt={t('st_13_alt1')} w={1599} h={984}
              widths={[768, 1280]} sizes="(max-width: 768px) 100vw, 66vw" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 aspect-[16/10] md:aspect-auto overflow-hidden">
            <Photo name="student-group-atlas-flag" alt={t('st_13_alt2')} w={1600} h={863}
              widths={[480, 768]} sizes="(max-width: 768px) 100vw, 34vw" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 aspect-[4/3] overflow-hidden">
            <Photo name="student-group-ait-ben-haddou" alt={t('st_13_alt3')} w={1536} h={982}
              widths={[480, 768]} sizes="(max-width: 768px) 50vw, 33vw" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 aspect-[4/3] overflow-hidden">
            <Photo name="students-quad-dunes" alt={t('st_13_alt4')} w={1494} h={1052}
              widths={[480, 768]} sizes="(max-width: 768px) 50vw, 33vw" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-2 aspect-[4/3] overflow-hidden">
            <Photo name="student-henna-desert-camp" alt={t('st_13_alt5')} w={1280} h={1011}
              widths={[480, 768]} sizes="(max-width: 768px) 50vw, 33vw" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 14 — CHOOSE YOUR LEARNING FOCUS ----------------------------------- */}
      <section className="py-16 md:py-24" style={{ background: '#F6F2EB' }}>
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#101010]">{t('st_14_h2')}</h2>
          <p className="mt-4 max-w-2xl" style={{ color: '#6E665C' }}>{t('st_14_intro')}</p>
          <div className="mt-10 grid gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
            {focus.map((f) => (
              <div key={f.t} className="p-6" style={{ background: '#E7DFD2' }}>
                <h3 className="text-[13px] font-semibold uppercase text-[#101010]" style={{ letterSpacing: '0.16em' }}>{f.t}</h3>
                <div className="h-px w-6 my-3" style={{ background: GOLD }} aria-hidden="true" />
                <p className="text-sm leading-relaxed" style={{ color: '#3A352E' }}>{f.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 p-6 text-sm leading-relaxed text-white/85" style={{ background: '#111110' }}>{t('st_14_honesty')}</p>
        </div>
      </section>

      {/* 15 — HOW IT WORKS / FAQ ------------------------------------------- */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground">{t('st_15_faq_h2')}</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b py-5" style={{ borderColor: '#D8CFC0' }}>
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-foreground font-medium">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0" style={{ color: GOLD }}>+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 16 — FINAL CTA ---------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <Photo name="student-group-atlas-flag" alt={t('st_16_alt')} w={1600} h={863}
          widths={[768, 1280]} sizes="100vw" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,.85) 100%)' }} aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <p className="text-[12px] font-semibold uppercase mb-5" style={{ letterSpacing: '0.22em', color: GOLD }}>{t('st_16_eyebrow')}</p>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-light max-w-3xl leading-tight">{t('st_16_h2')}</h2>
          <p className="mt-5 text-white/85 max-w-2xl leading-relaxed">{t('st_16_body')}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-semibold tracking-wide hover:opacity-90 transition">
              {t('st_16_cta')}
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/70 text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-black transition">
              {t('st_16_contact')}
            </Link>
          </div>
          <p className="mt-8 text-white/70 text-sm">
            {contactInfo.whatsappNumber ? `WhatsApp +${contactInfo.whatsappNumber}` : ''} · {contactInfo.email}
          </p>
        </div>
      </section>

      {/* Internal links ---------------------------------------------------- */}
      <section className="bg-background py-12 border-t" style={{ borderColor: '#D8CFC0' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-[13px] font-semibold uppercase text-foreground" style={{ letterSpacing: '0.16em' }}>{t('st_links_h2')}</h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {internalLinks.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="sr-only">{lang}</p>
        </div>
      </section>
    </Layout>
  );
}
