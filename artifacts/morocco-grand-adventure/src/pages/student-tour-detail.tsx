import { useRoute, Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import { getStudentTour, studentTours, type StudentTourImage } from '@/data/student-tours';
import NotFound from './not-found';

const IMG = '/images/student-tours';
const GOLD = '#C9A84C';
const SAND = '#F6F2EB';
const INK = '#101010';

/** Same responsive picture contract as the Student Tours hub: real intrinsic
 *  dimensions so nothing shifts, webp candidates that exist on disk, and eager
 *  loading only for the hero. */
function Photo({
  img, className, sizes = '(max-width: 768px) 100vw, 50vw', eager = false,
}: { img: StudentTourImage; className?: string; sizes?: string; eager?: boolean }) {
  return (
    <picture>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={img.widths.map((x) => `${IMG}/${img.name}-${x}w.webp ${x}w`).join(', ')}
      />
      <img
        src={`${IMG}/${img.name}.jpg`}
        alt={img.alt}
        width={img.w}
        height={img.h}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        {...(eager ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p
      className="text-[12px] font-semibold uppercase mb-4"
      style={{ letterSpacing: '0.2em', color: onDark ? GOLD : undefined }}
    >
      {onDark ? children : <span className="text-primary-text">{children}</span>}
    </p>
  );
}

export default function StudentTourDetail() {
  const [, params] = useRoute('/student-tours/:slug');
  const { t } = useLanguage();
  const tour = params?.slug ? getStudentTour(params.slug) : undefined;

  // Unknown slug under /student-tours/ falls through to the standard 404 rather
  // than rendering an empty product page.
  if (!tour) return <NotFound />;

  const wa = `${contactInfo.whatsapp}?text=${encodeURIComponent(
    `Hello Morocco Grand Adventure, I'm a group leader interested in the ${tour.title}. I'd like to discuss dates, group size and how the itinerary could be adapted for our students.`,
  )}`;

  const others = studentTours.filter((s) => s.slug !== tour.slug);

  return (
    <Layout>
      <main>
        {/* HERO ------------------------------------------------------------ */}
        <section className="relative min-h-[520px] md:min-h-[680px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ background: INK }}>
            <Photo
              img={tour.hero}
              eager
              sizes="100vw"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.5) 100%)' }} />
          </div>
          <div className="relative z-10 container mx-auto px-4 pb-14 md:pb-20">
            <p className="text-[12px] font-semibold uppercase mb-4" style={{ letterSpacing: '0.2em', color: GOLD }}>
              {t('st_tours_label') || 'Student Tours'}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white max-w-4xl leading-[1.05]">
              {tour.title}
            </h1>
            <p className="mt-6 text-white/85 text-base md:text-lg max-w-3xl leading-relaxed">
              {tour.heroLead}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-[#0d2b1d] text-sm font-bold tracking-wide hover:opacity-90 transition"
              >
                Plan This Student Trip
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white text-sm font-semibold hover:bg-white hover:text-black transition"
              >
                Talk to Morocco Grand Adventure
              </Link>
            </div>
          </div>
        </section>

        {/* OVERVIEW -------------------------------------------------------- */}
        <section className="bg-background py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-5 border-t border-border pt-10">
              {([
                ['Duration', tour.duration],
                ['Starts', tour.overview.start],
                ['Ends', tour.overview.end],
                ['Main regions', tour.overview.regions],
                ['Travel style', tour.overview.style],
              ] as const).map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: '#8C857A' }}>{label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm" style={{ color: '#6E665C' }}>{tour.overview.groups}</p>
          </div>
        </section>

        {/* WHY THIS WORKS FOR STUDENTS ------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <Eyebrow>Why this works for students</Eyebrow>
            <div className="space-y-5">
              {tour.whyStudents.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: '#3A352E' }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ITINERARY ------------------------------------------------------- */}
        <section className="bg-background py-16 md:py-28">
          <div className="container mx-auto px-4">
            <Eyebrow>The itinerary</Eyebrow>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-foreground max-w-3xl">
              Day by day
            </h2>
            <div className="mt-12 md:mt-16 space-y-14 md:space-y-20 max-w-4xl">
              {tour.itinerary.map((d) => (
                <article key={d.day} className="border-t border-border pt-8">
                  <p className="text-[11px] uppercase" style={{ letterSpacing: '0.18em', color: GOLD }}>{d.day}</p>
                  <h3 className="mt-3 font-serif text-2xl md:text-3xl font-light text-foreground">{d.title}</h3>
                  <div className="mt-5 space-y-4">
                    {d.body.map((p, i) => (
                      <p key={i} className="text-base leading-relaxed" style={{ color: '#3A352E' }}>{p}</p>
                    ))}
                  </div>
                  {d.notes && d.notes.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {d.notes.map((n) => (
                        <li key={n} className="text-[13px]" style={{ color: '#6E665C' }}>· {n}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT STUDENTS WILL EXPERIENCE ----------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4">
            <Eyebrow>What students will experience</Eyebrow>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tour.experiences.map((e) => (
                <div key={e.title} className="p-7" style={{ background: '#E7DFD2' }}>
                  <h3 className="font-serif text-lg" style={{ color: INK }}>{e.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3A352E' }}>{e.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEARNING THROUGH EXPERIENCE ------------------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Eyebrow>Learning through experience</Eyebrow>
            <div className="mt-8 space-y-8">
              {tour.learning.map((l) => (
                <div key={l.subject} className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-8">
                  <h3 className="font-serif text-lg text-foreground">{l.subject}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#3A352E' }}>{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A DAY IN THE JOURNEY -------------------------------------------- */}
        {tour.dayInTheJourney && (
          <section className="py-16 md:py-24" style={{ background: INK }}>
            <div className="container mx-auto px-4">
              <Eyebrow onDark>A day in the journey</Eyebrow>
              <div className="mt-8 grid gap-8 md:grid-cols-4">
                {tour.dayInTheJourney.map((d) => (
                  <div key={d.label}>
                    <p className="text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: GOLD }}>{d.label}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GROUP EXPERIENCE ------------------------------------------------ */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Eyebrow>Traveling as a group</Eyebrow>
            <div className="space-y-5">
              {tour.groupExperience.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: '#3A352E' }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTICAL ------------------------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4">
            <Eyebrow>Practical information</Eyebrow>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-xl" style={{ color: INK }}>What is included</h3>
                <ul className="mt-4 space-y-2">
                  {tour.included.map((x) => (
                    <li key={x} className="text-sm leading-relaxed" style={{ color: '#3A352E' }}>· {x}</li>
                  ))}
                </ul>
                <h3 className="mt-10 font-serif text-xl" style={{ color: INK }}>Not included</h3>
                <ul className="mt-4 space-y-2">
                  {tour.notIncluded.map((x) => (
                    <li key={x} className="text-sm leading-relaxed" style={{ color: '#6E665C' }}>· {x}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-7">
                {tour.practical.map((p) => (
                  <div key={p.title}>
                    <h3 className="font-serif text-lg" style={{ color: INK }}>{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#3A352E' }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT --------------------------------------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Eyebrow>Group support and logistics</Eyebrow>
            <ul className="space-y-4">
              {tour.support.map((s) => (
                <li key={s} className="text-base leading-relaxed" style={{ color: '#3A352E' }}>· {s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ ------------------------------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <Eyebrow>Questions from group leaders</Eyebrow>
            <div className="mt-8 divide-y" style={{ borderColor: '#D8CFC0' }}>
              {tour.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-serif text-lg" style={{ color: INK }}>{f.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#3A352E' }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA ------------------------------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: INK }}>
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
              Planning Morocco for your students?
            </h2>
            <p className="mt-6 text-white/80 leading-relaxed">
              Tell us where your group is traveling from, how many students are coming, and what you want them to
              take away. We will shape the journey around that rather than sending you a fixed package.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-[#0d2b1d] text-sm font-bold tracking-wide hover:opacity-90 transition"
              >
                Plan a Student Trip
              </a>
              <Link
                href="/student-tours/university-groups"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white text-sm font-semibold hover:bg-white hover:text-black transition"
              >
                University group logistics
              </Link>
            </div>
          </div>
        </section>

        {/* OTHER STUDENT PROGRAMS + BACKLINK ------------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Eyebrow>Other student programs</Eyebrow>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/student-tours/${o.slug}`}
                  className="group block p-8 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light text-foreground">{o.duration.split(' ')[0]}</span>
                    <span className="text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: '#8C857A' }}>Days</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-foreground">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#6E665C' }}>{o.cardSummary}</p>
                  <span className="inline-block mt-5 text-sm font-semibold text-foreground border-b-2 pb-0.5" style={{ borderColor: GOLD }}>
                    Explore Student Tour →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8">
              <Link href="/student-tours" className="text-sm font-semibold text-primary-text hover:underline">
                ← All Student Tours
              </Link>
              {tour.related.map((r) => (
                <Link key={r.to} href={r.to} className="text-sm hover:underline" style={{ color: '#6E665C' }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
