import { useRoute, Link } from 'wouter';
import { Layout } from '../components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactInfo } from '@/data/content';
import {
  getStudentTour,
  isLandscape,
  studentTours,
  studentTourSizes,
  type StudentTourDay,
  type StudentTourImage,
} from '@/data/student-tours';
import NotFound from './not-found';

const IMG = '/images';
const GOLD = '#C9A84C';
const SAND = '#F6F2EB';
const INK = '#101010';
const BODY = '#3A352E';
const MUTED = '#6E665C';
const RULE = '#D8CFC0';

/** Same responsive picture contract as the Student Tours hub: real intrinsic
 *  dimensions so nothing shifts, webp candidates that exist on disk, and eager
 *  loading only for the hero. `img.name` carries its folder, so photographs can
 *  come from the wider Morocco Grand Adventure library, not just student-tours. */
function Photo({
  img, className, sizes, eager = false,
}: { img: StudentTourImage; className?: string; sizes: string; eager?: boolean }) {
  // Much of the curated/ and catalog/ library is WebP-only, so the <img>
  // fallback follows what actually exists rather than assuming a .jpg sibling.
  const fallback = `${IMG}/${img.name}.${img.jpg ? 'jpg' : 'webp'}`;
  return (
    <picture>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={img.widths.map((x) => `${IMG}/${img.name}-${x}w.webp ${x}w`).join(', ')}
      />
      <img
        src={fallback}
        alt={img.alt}
        width={img.w}
        height={img.h}
        className={className}
        style={img.position ? { objectPosition: img.position } : undefined}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        {...(eager ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}

/** Crop boxes by orientation. Phones get shorter frames so a photograph never
 *  pushes the copy it illustrates a full screen away; wide screens get the
 *  taller editorial crop. The box is sized before the file loads, so no shift. */
const FRAME_PORTRAIT = 'aspect-square lg:aspect-[4/5]';
const FRAME_SQUARE = 'aspect-square';
const FRAME_LANDSCAPE = 'aspect-[3/2] lg:aspect-[4/3]';
const frame = (img: StudentTourImage) => {
  if (isLandscape(img)) return FRAME_LANDSCAPE;
  // Slightly-wide group shots lose the people at the edges in a 4:5 crop.
  return img.w / img.h >= 1.05 ? FRAME_SQUARE : FRAME_PORTRAIT;
};

function Eyebrow({
  children, onDark = false, as: Tag = 'p',
}: { children: React.ReactNode; onDark?: boolean; as?: 'p' | 'h2' }) {
  return (
    <Tag
      className={`mb-5 text-[12px] font-semibold uppercase ${onDark ? '' : 'text-primary-text'}`}
      style={{ letterSpacing: '0.2em', color: onDark ? GOLD : undefined }}
    >
      {children}
    </Tag>
  );
}

function Notes({ notes }: { notes: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {notes.map((n) => (
        <li
          key={n}
          className="inline-flex items-center gap-2 border px-3 py-1.5 text-[13px] leading-tight"
          style={{ borderColor: RULE, color: BODY }}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GOLD }} />
          {n}
        </li>
      ))}
    </ul>
  );
}

function DayHeader({ d }: { d: StudentTourDay }) {
  return (
    <header className="flex items-start gap-4 md:gap-5">
      <div aria-hidden="true" className="w-11 shrink-0 text-center text-primary-text md:w-14">
        <span className="block text-[10px] font-semibold uppercase" style={{ letterSpacing: '0.2em' }}>Day</span>
        <span className="mt-1 block font-serif text-[2.5rem] font-light leading-none md:text-5xl">
          {d.day.replace(/\D/g, '')}
        </span>
      </div>
      <h3 className="pt-1 font-serif text-[1.6rem] font-light leading-tight text-foreground text-balance md:pt-2 md:text-[2.1rem]">
        <span className="sr-only">{d.day}: </span>
        {d.title}
      </h3>
    </header>
  );
}

function DayBody({ d }: { d: StudentTourDay }) {
  return (
    <div className="max-w-[62ch]">
      <div className="space-y-4">
        {d.body.map((p, i) => (
          <p key={i} className="text-[16px] leading-[1.75]" style={{ color: BODY }}>{p}</p>
        ))}
      </div>
      {d.notes && d.notes.length > 0 && <Notes notes={d.notes} />}
    </div>
  );
}

// Every layout string is written out in full so Tailwind can see it. Areas put
// the photograph between the day's title and its prose on a phone, and beside
// both (vertically centred against them) on a wide screen.
const DAY_LAYOUT = {
  landscapeRight: 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:[grid-template-areas:"._media"_"head_media"_"body_media"_"._media"]',
  landscapeLeft: 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:[grid-template-areas:"media_."_"media_head"_"media_body"_"media_."]',
  portraitRight: 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:[grid-template-areas:"._media"_"head_media"_"body_media"_"._media"]',
  portraitLeft: 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:[grid-template-areas:"media_."_"media_head"_"media_body"_"media_."]',
};

function IllustratedDay({ d, images, flip }: { d: StudentTourDay; images: StudentTourImage[]; flip: boolean }) {
  // A pair always takes the wide column; a single frame's column follows its shape.
  const wide = images.length > 1 || isLandscape(images[0]);
  const layout = wide
    ? (flip ? DAY_LAYOUT.landscapeLeft : DAY_LAYOUT.landscapeRight)
    : (flip ? DAY_LAYOUT.portraitLeft : DAY_LAYOUT.portraitRight);
  const sizes = studentTourSizes.day(images);
  return (
    <article
      className={`grid gap-y-6 lg:gap-x-16 lg:grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] [grid-template-areas:"head"_"media"_"body"] ${layout}`}
    >
      <div className="[grid-area:head]"><DayHeader d={d} /></div>
      {images.length === 1 ? (
        <figure className="[grid-area:media] lg:self-center">
          <Photo img={images[0]} sizes={sizes} className={`w-full object-cover ${frame(images[0])}`} />
        </figure>
      ) : (
        <div className="[grid-area:media] grid grid-cols-2 items-start gap-3 lg:gap-5 lg:self-center">
          {images.map((img, i) => (
            // The second frame drops a little lower: two photographs of one day
            // read as a spread rather than a grid of thumbnails.
            <figure key={img.name} className={i === 1 ? 'mt-8 lg:mt-16' : ''}>
              <Photo img={img} sizes={sizes} className="w-full aspect-[4/5] object-cover" />
            </figure>
          ))}
        </div>
      )}
      <div className="[grid-area:body]"><DayBody d={d} /></div>
    </article>
  );
}

function PlainDay({ d }: { d: StudentTourDay }) {
  // Days without a photograph stay deliberately quiet: title beside prose on a
  // wide screen, which gives the itinerary a pause between the image spreads.
  return (
    <article className="grid gap-6 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5"><DayHeader d={d} /></div>
      <div className="lg:col-span-7 lg:pt-3"><DayBody d={d} /></div>
    </article>
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

  // Illustrated days alternate sides so the itinerary has a rhythm instead of a
  // column of pictures; text-only days do not advance the alternation.
  let illustrated = 0;
  const flips = tour.itinerary.map((d) => (d.images?.length ? illustrated++ % 2 === 1 : false));
  let chapterCount = 0;

  const facts: { label: string; value: string; span: string }[] = [
    { label: 'Duration', value: tour.duration, span: 'col-span-1' },
    { label: 'Starts', value: tour.overview.start, span: 'col-span-1' },
    { label: 'Ends', value: tour.overview.end, span: 'col-span-2 md:col-span-1' },
    { label: 'Groups', value: tour.overview.groups, span: 'col-span-2 md:col-span-1' },
    { label: 'Main regions', value: tour.overview.regions, span: 'col-span-2' },
    { label: 'Travel style', value: tour.overview.style, span: 'col-span-2' },
  ];

  const expImg = tour.experiencesImage;
  const dayImg = tour.dayInTheJourneyImage;
  const groupImg = tour.groupImage;

  return (
    <Layout>
      <div>
        {/* HERO ------------------------------------------------------------
            The photograph is never covered by copy. On a phone it sits on top
            (under the transparent navbar) with the title, route and booking
            action directly below it; on a wide screen it fills the right-hand
            side of a split. */}
        <section
          className="relative overflow-hidden text-white lg:grid lg:min-h-[min(86vh,820px)] lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)]"
          style={{ background: INK }}
        >
          <div className="relative h-[min(104vw,60svh)] min-h-[340px] sm:h-[58svh] lg:order-2 lg:h-auto lg:min-h-0">
            <Photo
              img={tour.hero}
              eager
              sizes={studentTourSizes.hero}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 lg:h-40" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.72), rgba(10,10,10,0))' }} />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 lg:hidden" style={{ background: `linear-gradient(to top, ${INK}, rgba(16,16,16,0))` }} />
            <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-24 lg:block" style={{ background: `linear-gradient(to right, ${INK}, rgba(16,16,16,0))` }} />
          </div>
          <div className="relative flex flex-col justify-end px-4 pb-11 pt-3 sm:px-8 lg:order-1 lg:pb-16 lg:pl-12 lg:pr-10 lg:pt-36 xl:pl-[max(3rem,calc((100vw-1280px)/2+1rem))] 2xl:pl-[max(3rem,calc((100vw-1536px)/2+1rem))]">
            <p className="text-[11px] font-semibold uppercase sm:text-[12px]" style={{ letterSpacing: '0.22em', color: GOLD }}>
              {t('st_tours_label') || 'Student Tours'} · {tour.duration}
            </p>
            <h1 className="mt-3 font-serif text-[2.3rem] font-light leading-[1.05] text-balance sm:text-5xl lg:text-[3.3rem] xl:text-6xl">
              {tour.title}
            </h1>
            <ol aria-label="Route" className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-white/85 sm:text-sm">
              {tour.keyPlaces.map((p, i) => (
                <li key={p} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="h-px w-3.5" style={{ background: GOLD }} />}
                  {p}
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base lg:text-[17px]">
              {tour.heroLead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] px-7 py-3.5 text-sm font-bold tracking-wide text-[#0d2b1d] transition hover:opacity-90"
              >
                Plan This Student Trip
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Talk to Morocco Grand Adventure
              </Link>
            </div>
          </div>
        </section>

        {/* AT A GLANCE ----------------------------------------------------- */}
        <section className="text-white" style={{ background: INK }}>
          <div className="container mx-auto px-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 py-8 md:grid-cols-4 md:gap-x-10 md:py-10">
              {facts.map((f) => (
                <div key={f.label} className={f.span}>
                  <dt className="text-[10.5px] uppercase text-white/60" style={{ letterSpacing: '0.18em' }}>{f.label}</dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-white/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WHY THIS WORKS FOR STUDENTS — text-led, intentionally clean ------ */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow as="h2">Why this works for students</Eyebrow>
            </div>
            <div className="lg:col-span-8">
              <p className="font-serif text-[1.4rem] font-light leading-[1.45] md:text-[1.85rem] md:leading-[1.4]" style={{ color: INK }}>
                {tour.whyStudents[0]}
              </p>
              {tour.whyStudents.length > 1 && (
                <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-10">
                  {tour.whyStudents.slice(1).map((p, i) => (
                    <p key={i} className="text-[15.5px] leading-relaxed" style={{ color: BODY }}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ITINERARY — image spreads alternate with quiet text days -------- */}
        <section className="bg-background py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Eyebrow>The itinerary</Eyebrow>
              <h2 className="font-serif text-3xl font-light text-foreground md:text-5xl">Day by day</h2>
            </div>
            <ol className="mt-12 space-y-16 md:mt-20 md:space-y-28">
              {tour.itinerary.map((d, i) => (
                <li key={d.day}>
                  {d.chapter && (
                    // Chapter breaks turn the long itinerary into movements.
                    <div className="mb-12 border-t pt-8 md:mb-20 md:pt-12" style={{ borderColor: GOLD }}>
                      <p className="text-[11px] font-semibold uppercase text-primary-text" style={{ letterSpacing: '0.2em' }}>
                        Part {++chapterCount}
                      </p>
                      <h3 className="mt-3 max-w-3xl font-serif text-[1.9rem] font-light leading-tight text-foreground text-balance md:text-5xl">
                        {d.chapter}
                      </h3>
                    </div>
                  )}
                  {d.images?.length
                    ? <IllustratedDay d={d} images={d.images} flip={flips[i]} />
                    : <PlainDay d={d} />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT STUDENTS WILL EXPERIENCE — the tour's signature activity --- */}
        <section className="py-16 md:py-28" style={{ background: SAND }}>
          <div className="container mx-auto px-4">
            <div className={expImg ? 'grid gap-10 lg:grid-cols-12 lg:gap-16' : ''}>
              {expImg && (
                <figure className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28">
                    <Photo img={expImg} sizes={studentTourSizes.feature} className={`w-full object-cover ${frame(expImg)}`} />
                  </div>
                </figure>
              )}
              <div className={expImg ? 'lg:col-span-7' : ''}>
                <Eyebrow as="h2">What students will experience</Eyebrow>
                <ol
                  className={`border-t ${expImg ? '' : 'md:grid md:grid-cols-2 md:gap-x-12 xl:grid-cols-3'}`}
                  style={{ borderColor: RULE }}
                >
                  {tour.experiences.map((e, i) => (
                    <li key={e.title} className="flex gap-5 border-b py-5 md:py-6" style={{ borderColor: RULE }}>
                      <span aria-hidden="true" className="w-7 shrink-0 pt-0.5 font-serif text-lg text-primary-text">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl" style={{ color: INK }}>{e.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed" style={{ color: BODY }}>{e.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* LEARNING THROUGH EXPERIENCE — text-led ------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow as="h2">Learning through experience</Eyebrow>
            </div>
            <div className="border-t lg:col-span-8" style={{ borderColor: RULE }}>
              {tour.learning.map((l) => (
                <div key={l.subject} className="grid gap-2 border-b py-5 md:grid-cols-[200px_1fr] md:gap-8 md:py-6" style={{ borderColor: RULE }}>
                  <h3 className="font-serif text-lg text-foreground">{l.subject}</h3>
                  <p className="text-[15.5px] leading-relaxed" style={{ color: BODY }}>{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A DAY IN THE JOURNEY ------------------------------------------- */}
        {tour.dayInTheJourney && (
          <section className="py-16 text-white md:py-28" style={{ background: INK }}>
            <div className="container mx-auto px-4">
              <div className={dayImg ? 'grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16' : ''}>
                {dayImg && (
                  <figure className="lg:col-span-5">
                    <Photo img={dayImg} sizes={studentTourSizes.feature} className={`w-full object-cover ${frame(dayImg)}`} />
                  </figure>
                )}
                <div className={dayImg ? 'lg:col-span-6 lg:col-start-7' : ''}>
                  <Eyebrow onDark as="h2">A day in the journey</Eyebrow>
                  <ol className={`mt-8 border-l border-white/15 pl-7 ${dayImg ? 'space-y-8' : 'space-y-8 md:grid md:grid-cols-4 md:gap-8 md:space-y-0'}`}>
                    {tour.dayInTheJourney.map((b) => (
                      <li key={b.label} className="relative">
                        <span aria-hidden="true" className="absolute -left-[33px] top-1 h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
                        <p className="text-[11px] uppercase" style={{ letterSpacing: '0.18em', color: GOLD }}>{b.label}</p>
                        <p className="mt-2 text-[15px] leading-relaxed text-white/80">{b.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* GROUP EXPERIENCE ------------------------------------------------ */}
        <section className="bg-background py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className={groupImg ? 'grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16' : 'max-w-4xl'}>
              <div className={groupImg ? 'lg:col-span-6' : ''}>
                <Eyebrow as="h2">Traveling as a group</Eyebrow>
                <p className="font-serif text-[1.35rem] font-light leading-[1.45] md:text-[1.7rem]" style={{ color: INK }}>
                  {tour.groupExperience[0]}
                </p>
                <div className="mt-6 space-y-4">
                  {tour.groupExperience.slice(1).map((p, i) => (
                    <p key={i} className="text-[15.5px] leading-relaxed" style={{ color: BODY }}>{p}</p>
                  ))}
                </div>
              </div>
              {groupImg && (
                <figure className={isLandscape(groupImg) ? 'lg:col-span-6' : 'lg:col-span-5 lg:col-start-8'}>
                  <Photo img={groupImg} sizes={studentTourSizes.feature} className={`w-full object-cover ${frame(groupImg)}`} />
                </figure>
              )}
            </div>
          </div>
        </section>

        {/* PRACTICAL ------------------------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto px-4">
            <Eyebrow as="h2">Practical information</Eyebrow>
            <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="bg-white p-7 md:p-9 lg:col-span-5 lg:self-start">
                <h3 className="font-serif text-xl" style={{ color: INK }}>What is included</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.included.map((x) => (
                    <li key={x} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: BODY }}>
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-primary-text" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8.5l3 3 7-7" /></svg>
                      {x}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 border-t pt-7 font-serif text-xl" style={{ color: INK, borderColor: RULE }}>Not included</h3>
                <ul className="mt-4 space-y-2">
                  {tour.notIncluded.map((x) => (
                    <li key={x} className="flex gap-3 text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0" style={{ background: MUTED }} />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-x-10 gap-y-7 md:grid-cols-2 lg:col-span-7">
                {tour.practical.map((p) => (
                  <div key={p.title} className="border-t pt-5" style={{ borderColor: RULE }}>
                    <h3 className="font-serif text-lg" style={{ color: INK }}>{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed" style={{ color: BODY }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT --------------------------------------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow as="h2">Group support and logistics</Eyebrow>
            </div>
            <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:col-span-8">
              {tour.support.map((s) => (
                <li key={s} className="border-l-2 pl-5 text-[15.5px] leading-relaxed" style={{ borderColor: GOLD, color: BODY }}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ — collapsed answers keep the page short on a phone ---------- */}
        <section className="py-16 md:py-24" style={{ background: SAND }}>
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow as="h2">Questions from group leaders</Eyebrow>
            </div>
            <div className="border-t lg:col-span-8" style={{ borderColor: RULE }}>
              {tour.faqs.map((f) => (
                <details key={f.q} className="group border-b" style={{ borderColor: RULE }}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-lg leading-snug md:text-xl" style={{ color: INK }}>{f.q}</h3>
                    <span aria-hidden="true" className="mt-0.5 text-2xl font-light leading-none text-primary-text transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed" style={{ color: BODY }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA ------------------------------------------------------------- */}
        <section className="py-16 md:py-24" style={{ background: INK }}>
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-serif text-3xl font-light text-white md:text-5xl">
              Planning Morocco for your students?
            </h2>
            <p className="mt-6 leading-relaxed text-white/80">
              Tell us where your group is traveling from, how many students are coming, and what you want them to
              take away. We will shape the journey around that rather than sending you a fixed package.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] px-8 py-4 text-sm font-bold tracking-wide text-[#0d2b1d] transition hover:opacity-90"
              >
                Plan a Student Trip
              </a>
              <Link
                href="/student-tours/university-groups"
                className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                University group logistics
              </Link>
            </div>
          </div>
        </section>

        {/* OTHER STUDENT PROGRAMS + BACKLINK ------------------------------- */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Eyebrow as="h2">Other student programs</Eyebrow>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/student-tours/${o.slug}`}
                  className="group block border border-border p-8 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light text-foreground">{o.duration.split(' ')[0]}</span>
                    <span className="text-[11px] uppercase" style={{ letterSpacing: '0.16em', color: MUTED }}>Days</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-foreground">{o.title}</h3>
                  <p className="mt-2 text-[13px]" style={{ color: MUTED }}>{o.keyPlaces.join(' · ')}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: BODY }}>{o.cardSummary}</p>
                  <span className="mt-5 inline-block border-b-2 pb-0.5 text-sm font-semibold text-foreground" style={{ borderColor: GOLD }}>
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
                <Link key={r.to} href={r.to} className="text-sm hover:underline" style={{ color: MUTED }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
