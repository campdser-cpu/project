// ─────────────────────────────────────────────────────────────────────────────
// Merzouga Travel Guide — the hub of the Merzouga guide cluster.
//
// Editorial layout: each chapter is written copy with the photograph that
// shows it (camel trekking → the caravan at dusk, the camp night → our camp,
// 4x4 → a 4x4 in the dunes), then hands over to the detailed guide pages.
// Copy is authored natively per locale in src/data/merzouga-hub/; the static
// HTML for the same page is produced by buildMerzougaHubHtml() in
// scripts/prerender.ts from the same data.
//
// Internal links are written relative to the router base (which already
// carries the /{lang} prefix). Prefixing them with the language again produced
// /en/en/merzouga-guide/... and a 404 behind every "Read the guide" card.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from 'wouter';
import { SiWhatsapp } from 'react-icons/si';
import { Layout } from '../components/layout/Layout';
import { StructuredData, buildBreadcrumb } from '../components/seo/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { MERZOUGA_GUIDES, COMPARISONS } from '@/data/seoHub';
import { localizedComparisonMeta } from '@/data/comparison-meta-i18n';
import { getLocalizedGuide, guideOverlayExists } from '@/i18n/guides';
import { getLocalizedTours } from '@/i18n/content';
import { trackEvent } from '@/lib/analytics';
import {
  MG_BASICS,
  MG_CHOOSE,
  MG_COMPARISON,
  MG_FEATURED_GUIDES,
  MG_GUIDE_GROUPS,
  MG_IMAGES,
  MG_PACK_GUIDES,
  MG_SIZES,
  MG_STORY,
  MG_TOURS,
  MG_TOUR_IMAGE_SIZE,
  useMerzougaHubCopy,
  type MgImage,
  type MgStoryId,
} from '@/data/merzouga-hub';

const GOLD = '#C9A84C';
const SAND = '#F6F2EB';
const INK = '#101010';
const BODY = '#3A352E';
const RULE = '#D8CFC0';

/** Anchor ids for the in-page chapter links. */
const STORY_ANCHOR: Partial<Record<MgStoryId, string>> = {
  camel: 'camel-trekking',
  camp: 'desert-camps',
  fourByFour: 'desert-activities',
};
const NAV_TARGETS = ['camel-trekking', 'desert-camps', 'desert-activities', 'what-to-pack', 'plan', 'guides'] as const;

function Photo({ img, alt, sizes, className, eager = false }: { img: MgImage; alt: string; sizes: string; className?: string; eager?: boolean }) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      alt={alt}
      width={img.w}
      height={img.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      {...(eager ? { fetchPriority: 'high' as const } : {})}
      className={className}
      style={img.position ? { objectPosition: img.position } : undefined}
    />
  );
}

/** Wide tracking suits Latin capitals only: Arabic letters must stay joined,
 *  and Chinese, Japanese and Korean need far less. */
const tracking = (lang: string, em: number) =>
  lang === 'ar' ? 'normal' : ['zh', 'ja', 'ko'].includes(lang) ? `${Math.min(em, 0.04)}em` : `${em}em`;

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  const { lang } = useLanguage();
  return (
    <p
      className={`mb-4 text-[12px] font-semibold uppercase ${onDark ? '' : 'text-primary-text'}`}
      style={{ letterSpacing: tracking(lang, 0.2), color: onDark ? GOLD : undefined }}
    >
      {children}
    </p>
  );
}

// Areas put the photograph between a chapter's heading and its prose on a
// phone, and beside both on a wide screen. Grid order follows the writing
// direction, so the layout mirrors itself in Arabic.
const STORY_LAYOUT = {
  mediaEnd: 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:[grid-template-areas:"._media"_"head_media"_"body_media"_"._media"]',
  mediaStart: 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:[grid-template-areas:"media_."_"media_head"_"media_body"_"media_."]',
};

export default function MerzougaGuide() {
  const { t, lang } = useLanguage();
  const copy = useMerzougaHubCopy(lang);
  const wa = contactInfo.whatsapp;

  const guide = (slug: string) => getLocalizedGuide(slug, lang) ?? MERZOUGA_GUIDES.find((p) => p.slug === slug);
  const englishOnly = (slug: string) => lang !== 'en' && !guideOverlayExists(lang, slug);
  const track = (slug: string) => () => trackEvent('guide_card_click', { page: 'merzouga-guide', guide: slug });

  // Plain render helpers (not components) so React does not remount them.
  const englishTag = (slug: string, onDark = false) =>
    englishOnly(slug) ? (
      <span
        className={`ms-2 inline-block whitespace-nowrap border px-1.5 py-px align-middle text-[10px] font-semibold uppercase ${onDark ? 'border-white/30 text-white/70' : 'text-[#6E665C]'}`}
        style={{ letterSpacing: tracking(lang, 0.08), borderColor: onDark ? undefined : RULE }}
      >
        {copy.guides.inEnglish}
      </span>
    ) : null;

  const guideLinks = (slugs: string[], onDark = false) => (
    <ul aria-label={copy.moreLabel} className="mt-7 space-y-2.5">
      {slugs.map((slug) => (
        <li key={slug}>
          <Link
            href={`/merzouga-guide/${slug}`}
            onClick={track(slug)}
            className={`group inline text-[15px] font-semibold leading-snug ${onDark ? 'text-white' : 'text-foreground'}`}
          >
            <span className="border-b-2 pb-0.5 transition-colors group-hover:text-primary-text" style={{ borderColor: GOLD }}>
              {t('pwig_read')}: {guide(slug)?.title}
              {/* Non-breaking space keeps the arrow on the same line as the last word. */}
              {'\u00A0'}
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100">→</span>
            </span>
            {englishTag(slug, onDark)}
          </Link>
        </li>
      ))}
    </ul>
  );

  const tours = getLocalizedTours(lang);
  const relatedTours = MG_TOURS.map((id) => tours.find((x) => x.id === id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const comparisonTitle = localizedComparisonMeta(MG_COMPARISON, lang)?.title ?? COMPARISONS.find((c) => c.slug === MG_COMPARISON)?.title ?? '';

  let storyIndex = 0;

  return (
    <Layout>
      <StructuredData
        id="merzouga-guide-breadcrumb"
        data={buildBreadcrumb([
          { name: t('nav_home'), path: '/' },
          { name: t('mg_breadcrumb'), path: '/merzouga-guide' },
        ], lang)}
      />

      {/* HERO — a pure Erg Chebbi landscape, so the copy never covers a face */}
      <section className="relative isolate flex min-h-[max(560px,80svh)] items-end overflow-hidden text-white lg:min-h-[min(88vh,860px)]" style={{ background: INK }}>
        <Photo img={MG_IMAGES.hero} alt={copy.hero.alt} sizes={MG_SIZES.hero} eager className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.1) 28%, rgba(10,10,10,0.5) 52%, rgba(10,10,10,0.92) 100%)' }}
        />
        <div className="container mx-auto px-4 pb-12 pt-32 md:pb-16">
          <p className="text-[11px] font-semibold uppercase sm:text-[12px]" style={{ letterSpacing: tracking(lang, 0.22), color: GOLD }}>{copy.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.6rem] font-light leading-[1.04] text-balance sm:text-6xl lg:text-7xl">{copy.hero.title}</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">{copy.hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/trip-builder"
              onClick={() => trackEvent('experience_cta_click', { experience: 'merzouga-guide', cta: 'primary', destination: '/trip-builder' })}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold tracking-wide transition hover:opacity-90"
              style={{ background: GOLD, color: INK }}
            >
              {t('mg_cta')}
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source_page: 'merzouga-guide', placement: 'hero' })}
              className="inline-flex items-center justify-center gap-2 border border-white/45 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              <SiWhatsapp className="h-4 w-4" aria-hidden="true" /> {t('exp_whatsapp_us')}
            </a>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="text-white" style={{ background: INK }}>
        <div className="container mx-auto px-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 py-8 md:grid-cols-5 md:gap-x-8 md:py-10">
            {copy.facts.map((f, i) => (
              <div key={f.label} className={i === copy.facts.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
                <dt className="text-[10.5px] uppercase text-white/60" style={{ letterSpacing: tracking(lang, 0.18) }}>{f.label}</dt>
                <dd className="mt-1.5 text-[14px] leading-snug text-white/90">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* IN THIS GUIDE */}
      <nav aria-label={copy.nav.label} style={{ background: SAND }}>
        <div className="container mx-auto flex items-center gap-4 overflow-x-auto px-4 py-4">
          <span className="shrink-0 text-[11px] font-semibold uppercase text-primary-text" style={{ letterSpacing: tracking(lang, 0.18) }}>{copy.nav.label}</span>
          <ul className="flex shrink-0 gap-2">
            {copy.nav.items.map((label, i) => (
              <li key={label}>
                <a href={`#${NAV_TARGETS[i]}`} className="inline-block whitespace-nowrap border bg-white/60 px-3 py-1.5 text-[13px] transition-colors hover:bg-white" style={{ borderColor: RULE, color: BODY }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* STORY — text, then the photograph that shows it, then the guide */}
      {MG_STORY.map(({ id, guides, dark }) => {
        const s = copy.story[id];
        const layout = storyIndex++ % 2 === 0 ? STORY_LAYOUT.mediaEnd : STORY_LAYOUT.mediaStart;
        const square = MG_IMAGES[id].w === MG_IMAGES[id].h;
        return (
          <section
            key={id}
            id={STORY_ANCHOR[id]}
            className={`scroll-mt-24 py-16 md:py-24 ${dark ? 'text-white' : 'bg-background'}`}
            style={dark ? { background: INK } : undefined}
          >
            <div className={`container mx-auto grid gap-y-6 px-4 lg:grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] lg:gap-x-16 [grid-template-areas:"head"_"media"_"body"] ${layout}`}>
              <div className="[grid-area:head]">
                <Eyebrow onDark={dark}>{s.eyebrow}</Eyebrow>
                <h2 className={`font-serif text-[1.9rem] font-light leading-tight text-balance md:text-[2.6rem] ${dark ? 'text-white' : 'text-foreground'}`}>{s.heading}</h2>
              </div>
              <figure className="[grid-area:media] lg:self-center">
                <Photo
                  img={MG_IMAGES[id]}
                  alt={s.alt}
                  sizes={MG_SIZES.story}
                  className={`w-full object-cover ${square ? 'aspect-[4/3] lg:aspect-square' : 'aspect-[3/2] lg:aspect-[4/3]'}`}
                />
              </figure>
              <div className="max-w-[62ch] [grid-area:body]">
                <div className="space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className={`text-[16px] leading-[1.75] ${dark ? 'text-white/80' : ''}`} style={dark ? undefined : { color: BODY }}>{p}</p>
                  ))}
                </div>
                {guideLinks(guides, dark)}
              </div>
            </div>
          </section>
        );
      })}

      {/* WHAT TO PACK */}
      <section id="what-to-pack" className="scroll-mt-24 py-16 md:py-24" style={{ background: SAND }}>
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.pack.eyebrow}</Eyebrow>
            <h2 className="font-serif text-[1.9rem] font-light leading-tight text-foreground text-balance md:text-[2.6rem]">{copy.pack.heading}</h2>
            <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.75]" style={{ color: BODY }}>{copy.pack.intro}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {copy.pack.groups.map((g) => (
                <div key={g.title} className="border-t pt-4" style={{ borderColor: GOLD }}>
                  <h3 className="font-serif text-lg" style={{ color: INK }}>{g.title}</h3>
                  <ul className="mt-3 space-y-2.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14.5px] leading-snug" style={{ color: BODY }}>
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-primary-text" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8.5l3 3 7-7" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {guideLinks(MG_PACK_GUIDES)}
          </div>
          <figure className="lg:col-span-5 lg:self-center">
            <Photo img={MG_IMAGES.pack} alt={copy.pack.alt} sizes={MG_SIZES.side} className="aspect-[4/3] w-full object-cover sm:aspect-[3/2] lg:aspect-[4/5]" />
          </figure>
        </div>
      </section>

      {/* THE BASICS — deliberately text-led */}
      <section id="plan" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Eyebrow>{copy.basics.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-serif text-[1.9rem] font-light leading-tight text-foreground text-balance md:text-[2.6rem]">{copy.basics.heading}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {MG_BASICS.map(({ id, guides }) => (
              <div key={id} className="border-t pt-6" style={{ borderColor: RULE }}>
                <h3 className="font-serif text-xl" style={{ color: INK }}>{copy.basics.items[id].title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed" style={{ color: BODY }}>{copy.basics.items[id].body}</p>
                {guideLinks(guides)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="py-16 text-white md:py-24" style={{ background: INK }}>
        <div className="container mx-auto px-4">
          <Eyebrow onDark>{copy.mistakes.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-serif text-[1.9rem] font-light leading-tight text-balance md:text-[2.6rem]">{copy.mistakes.heading}</h2>
          <ol className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
            {copy.mistakes.items.map((m, i) => (
              <li key={m.title} className="flex gap-5 border-t border-white/10 pt-5">
                <span aria-hidden="true" className="w-7 shrink-0 font-serif text-lg" style={{ color: GOLD }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[16px] font-semibold text-white">{m.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">{m.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CHOOSE */}
      <section className="py-16 md:py-24" style={{ background: SAND }}>
        <div className="container mx-auto px-4">
          <Eyebrow>{copy.choose.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl font-serif text-[1.9rem] font-light leading-tight text-foreground text-balance md:text-[2.6rem]">{copy.choose.heading}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MG_CHOOSE.map(({ id, guide: slug }) => (
              <div key={id} className="flex flex-col bg-white p-7 md:p-8">
                <h3 className="font-serif text-xl" style={{ color: INK }}>{copy.choose.items[id].title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed" style={{ color: BODY }}>{copy.choose.items[id].body}</p>
                {guideLinks([slug])}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15px]">
            <Link href={`/comparisons/${MG_COMPARISON}`} title={comparisonTitle} className="font-semibold text-foreground underline decoration-2 underline-offset-4 hover:text-primary-text" style={{ textDecorationColor: GOLD }}>
              {copy.choose.compare}
            </Link>
          </p>
        </div>
      </section>

      {/* GUIDES — the four "Read the guide" cards, then every Merzouga guide */}
      <section id="guides" className="scroll-mt-24 bg-background py-16 md:py-24" aria-labelledby="mg-guides-heading">
        <div className="container mx-auto px-4">
          <h2 id="mg-guides-heading" className="font-serif text-[1.9rem] font-light leading-tight text-foreground md:text-[2.6rem]">{t('pwig_heading')}</h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed" style={{ color: BODY }}>{t('pwig_sub')}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MG_FEATURED_GUIDES.map((slug) => {
              const g = guide(slug);
              if (!g) return null;
              return (
                <Link
                  key={slug}
                  href={`/merzouga-guide/${slug}`}
                  onClick={track(slug)}
                  aria-label={`${g.title} — ${t('pwig_read')}`}
                  className="group flex flex-col border bg-white transition-colors hover:border-[#C9A84C]"
                  style={{ borderColor: RULE }}
                >
                  <div className="overflow-hidden">
                    <img
                      src={g.heroImage}
                      srcSet={g.heroSrcSet}
                      sizes={g.heroSrcSet ? MG_SIZES.card : undefined}
                      alt={g.heroAlt}
                      width={g.heroWidth}
                      height={g.heroHeight}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      style={g.heroPosition ? { objectPosition: g.heroPosition } : undefined}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl leading-snug" style={{ color: INK }}>{g.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>{g.intro}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <span className="border-b-2 pb-0.5" style={{ borderColor: GOLD }}>{t('pwig_read')}</span>
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <h3 className="mt-16 font-serif text-2xl" style={{ color: INK }}>{copy.guides.allHeading}</h3>
          <div className="mt-6 grid gap-10 md:grid-cols-3">
            {MG_GUIDE_GROUPS.map((group) => (
              <div key={group.id} className="border-t pt-5" style={{ borderColor: GOLD }}>
                <h4 className="text-[11px] font-semibold uppercase text-primary-text" style={{ letterSpacing: tracking(lang, 0.18) }}>{copy.guides.groups[group.id]}</h4>
                <ul className="mt-4 space-y-3">
                  {group.slugs.map((slug) => (
                    <li key={slug}>
                      <Link href={`/merzouga-guide/${slug}`} onClick={track(slug)} className="text-[15px] leading-snug text-foreground hover:text-primary-text hover:underline">
                        {guide(slug)?.title}
                      </Link>
                      {englishTag(slug)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURS — a direct path to booking */}
      {relatedTours.length > 0 && (
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-[1.9rem] font-light leading-tight text-foreground md:text-[2.6rem]">{copy.tours.heading}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {relatedTours.map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.id}`} className="group grid overflow-hidden bg-white sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  <img
                    src={tour.image}
                    srcSet={tour.image.includes('/curated/') ? `${tour.image.replace('.webp', '-480w.webp')} 480w, ${tour.image.replace('.webp', '-768w.webp')} 768w` : undefined}
                    sizes="(min-width: 768px) 280px, 100vw"
                    // Decorative: the tour name is the card title right beside it.
                    alt=""
                    width={MG_TOUR_IMAGE_SIZE[tour.image]?.[0]}
                    height={MG_TOUR_IMAGE_SIZE[tour.image]?.[1]}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] h-full w-full object-cover sm:aspect-auto"
                  />
                  <div className="flex flex-col p-6 md:p-7">
                    <span className="text-[11px] font-semibold uppercase text-primary-text" style={{ letterSpacing: tracking(lang, 0.16) }}>{tour.duration}</span>
                    <h3 className="mt-2 font-serif text-xl leading-snug" style={{ color: INK }}>{tour.name}</h3>
                    {tour.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed" style={{ color: BODY }}>{tour.description}</p>}
                    <span className="mt-5 text-sm font-semibold text-foreground">
                      <span className="border-b-2 pb-0.5" style={{ borderColor: GOLD }}>{t('tours_view')}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-[1.9rem] font-light leading-tight text-foreground md:text-[2.6rem]">{t('exp_faq_title')}</h2>
          </div>
          <div className="border-t lg:col-span-8" style={{ borderColor: RULE }}>
            {([1, 2, 3, 4] as const).map((n) => (
              <details key={n} className="group border-b" style={{ borderColor: RULE }}>
                <summary
                  onClick={() => trackEvent('faq_open', { page: 'merzouga-guide', question: t(`mg_faq${n}_q`) })}
                  className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden"
                >
                  <h3 className="font-serif text-lg leading-snug md:text-xl" style={{ color: INK }}>{t(`mg_faq${n}_q`)}</h3>
                  <span aria-hidden="true" className="mt-0.5 text-2xl font-light leading-none text-primary-text transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pe-10 text-[15px] leading-relaxed" style={{ color: BODY }}>{t(`mg_faq${n}_a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: INK }}>
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-light text-white md:text-5xl">{t('guide_cta_heading')}</h2>
          <p className="mt-6 leading-relaxed text-white/80">{t('guide_cta_sub')}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/trip-builder"
              onClick={() => trackEvent('experience_cta_click', { experience: 'merzouga-guide', cta: 'bottom', destination: '/trip-builder' })}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wide transition hover:opacity-90"
              style={{ background: GOLD, color: INK }}
            >
              {t('guide_cta_build')}
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source_page: 'merzouga-guide', placement: 'bottom' })}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-8 py-4 text-sm font-bold tracking-wide text-[#0d2b1d] transition hover:opacity-90"
            >
              <SiWhatsapp className="h-5 w-5" aria-hidden="true" /> {t('guide_cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
