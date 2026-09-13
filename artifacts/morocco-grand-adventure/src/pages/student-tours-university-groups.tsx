// ─────────────────────────────────────────────────────────────────────────────
// Student Tours → University Groups.
//
// The one justified child page. Its intent is coordinator LOGISTICS — what
// genuinely changes at 15 / 50 / 150 / ~300 participants — which is distinct
// from the hub's "what is this and why Morocco" intent, and is not covered by
// any existing MGA destination or experience page.
//
// Capacity language is deliberately non-committal: "can be considered with
// advance planning", never a guarantee of availability.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';

const GOLD = '#C9A84C';
const IMG = '/images/student-tours';

export default function StudentToursUniversityGroups() {
  const { t } = useLanguage();

  const wa = `${contactInfo.whatsapp}?text=${encodeURIComponent(
    'Hello Morocco Grand Adventure — I am coordinating a university group trip to Morocco.',
  )}`;

  const bands = [1, 2, 3, 4, 5].map((n) => ({ t: t(`ug_s${n}_t`), d: t(`ug_s${n}_d`) }));
  const factors = [1, 2, 3, 4, 5, 6].map((n) => ({ t: t(`ug_f${n}_t`), d: t(`ug_f${n}_d`) }));
  const process = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ n: String(n).padStart(2, '0'), t: t(`ug_p${n}_t`), d: t(`ug_p${n}_d`) }));
  const faqs = [1, 2, 3, 4, 5, 6, 7].map((n) => ({ q: t(`ug_q${n}`), a: t(`ug_a${n}`) }));

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header ---------------------------------------------------------- */}
      <section className="bg-background border-b" style={{ borderColor: '#D8CFC0' }}>
        <div className="container mx-auto px-4 max-w-5xl py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link href="/student-tours" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
              ← {t('ug_back')}
            </Link>
          </nav>
          <p className="text-[12px] font-semibold uppercase mb-5" style={{ letterSpacing: '0.22em', color: GOLD }}>{t('ug_eyebrow')}</p>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground leading-tight max-w-3xl">{t('ug_h1')}</h1>
          <div className="h-px w-14 my-7" style={{ background: GOLD }} aria-hidden="true" />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">{t('ug_sub')}</p>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">{t('ug_intro')}</p>
        </div>
      </section>

      {/* Group-size bands ------------------------------------------------- */}
      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-foreground">{t('ug_sizes_h2')}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t('ug_sizes_intro')}</p>
          <dl className="mt-10">
            {bands.map((b) => (
              <div key={b.t} className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8 py-6 border-t" style={{ borderColor: '#D8CFC0' }}>
                <dt className="text-[13px] font-semibold uppercase text-foreground" style={{ letterSpacing: '0.12em' }}>{b.t}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{b.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What size affects ------------------------------------------------ */}
      <section className="py-14 md:py-20" style={{ background: '#F6F2EB' }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-[#101010]">{t('ug_factors_h2')}</h2>
          <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {factors.map((f) => (
              <div key={f.t}>
                <h3 className="text-[13px] font-semibold uppercase text-[#101010]" style={{ letterSpacing: '0.14em' }}>{f.t}</h3>
                <div className="h-px w-6 my-3" style={{ background: GOLD }} aria-hidden="true" />
                <p className="text-sm leading-relaxed" style={{ color: '#6E665C' }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One coordinator --------------------------------------------------- */}
      <section style={{ background: '#111110' }}>
        <div className="container mx-auto px-4 max-w-5xl py-14 md:py-20 grid md:grid-cols-[1fr_320px] gap-10 items-center">
          <div>
            <h2 className="font-serif text-2xl md:text-4xl font-light text-white">{t('ug_coord_h2')}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">{t('ug_coord_p')}</p>
          </div>
          <picture>
            <source type="image/webp" sizes="(max-width: 768px) 100vw, 320px"
              srcSet={`${IMG}/student-group-ait-ben-haddou-480w.webp 480w, ${IMG}/student-group-ait-ben-haddou-768w.webp 768w`} />
            <img src={`${IMG}/student-group-ait-ben-haddou.jpg`} alt={t('st_04_alt_stack1')}
              width={1536} height={982} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
          </picture>
        </div>
      </section>

      {/* Process ----------------------------------------------------------- */}
      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-foreground">{t('ug_process_h2')}</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <li key={s.n}>
                <span className="block text-3xl font-light" style={{ color: GOLD }} aria-hidden="true">{s.n}</span>
                <div className="h-px w-full my-3" style={{ background: '#D8CFC0' }} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ --------------------------------------------------------------- */}
      <section className="py-14 md:py-20" style={{ background: '#F6F2EB' }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-[#101010]">{t('ug_faq_h2')}</h2>
          <div className="mt-8">
            {faqs.map((f) => (
              <details key={f.q} className="border-b py-5" style={{ borderColor: '#D8CFC0' }}>
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-[#101010] font-medium">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="shrink-0" style={{ color: GOLD }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3A352E' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA --------------------------------------------------------------- */}
      <section className="bg-background py-14 md:py-20 border-t" style={{ borderColor: '#D8CFC0' }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-2xl md:text-4xl font-light text-foreground">{t('ug_cta_h2')}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{t('ug_cta_p')}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-sm font-semibold tracking-wide hover:bg-primary transition">
              {t('ug_cta')}
            </a>
            <Link href="/student-tours"
              className="inline-flex items-center justify-center px-8 py-4 border text-foreground text-sm font-semibold tracking-wide hover:bg-muted transition"
              style={{ borderColor: '#D8CFC0' }}>
              {t('ug_back')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
