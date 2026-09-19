// ─────────────────────────────────────────────────────────────────────────────
// Included Experiences — what a traveller actually sees and does on a journey.
//
// The list is derived from the tour's own itinerary stops (see
// src/data/tour-experiences.ts); this component only renders it. It never
// decides what is included: the `status` on each experience comes from the
// itinerary text.
//
// Layout is a compact grid rather than a wall of hero cards, because the
// longest itinerary produces 32 entries. Each entry is a thumbnail (when a
// verified photograph exists), a bold label, one plain sentence, and — when
// MGA has a page for the place — a contextual link. Text is never carried by
// an icon alone, thumbnails are decorative (alt="") since the label beside
// them already names the subject, and every thumbnail is lazy-loaded with
// explicit dimensions so the grid does not shift as it loads.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from 'wouter';
import { ArrowRight, CircleDot } from 'lucide-react';
import type { Lang } from '@/i18n/index';
import type { DerivedExperience, ExperienceKind } from '@/data/tour-experiences';
import { localizeExperience } from '@/i18n/experiences';
import { MERZOUGA_GUIDES, COMPARISONS, TRAVEL_INFO } from '@/data/seoHub';

type Props = {
  included: DerivedExperience[];
  optional: DerivedExperience[];
  lang: Lang;
  t: (key: string) => string;
  /** Destination id → localized name, for the "Explore {n}" link label. */
  destinationNames: Record<string, string>;
};

/** Display order of the groups; any group with no entries is skipped. */
const GROUP_ORDER: ExperienceKind[] = ['desert', 'landscape', 'heritage', 'city', 'culture', 'activity'];
const GROUP_KEY: Record<ExperienceKind, string> = {
  desert: 'jx_grp_desert',
  landscape: 'jx_grp_landscape',
  heritage: 'jx_grp_heritage',
  city: 'jx_grp_city',
  culture: 'jx_grp_culture',
  activity: 'jx_grp_activity',
};

/**
 * Base-relative hub path.
 *
 * These paths are handed to wouter's <Link>, and the router is mounted with
 * base={`${RAW_BASE}/${lang}`} (see App.tsx). Wouter prepends that base, so a
 * path must NOT carry the locale itself: `/${lang}/merzouga-guide/x` would be
 * rendered as `/fr/fr/merzouga-guide/x`, which has no prerendered file and no
 * rewrite in vercel.json — a hard 404.
 */
function hubHref(slug: string): string | undefined {
  const page = [...MERZOUGA_GUIDES, ...COMPARISONS, ...TRAVEL_INFO].find((p) => p.slug === slug);
  if (!page) return undefined;
  if (page.kind === 'comparison') return `/comparisons/${page.slug}`;
  if (page.kind === 'travel-info') return `/travel-info/${page.slug}`;
  return `/merzouga-guide/${page.slug}`;
}

function ExperienceCard({
  exp,
  lang,
  t,
  destinationNames,
  showStatus,
}: {
  exp: DerivedExperience;
  lang: Lang;
  t: (key: string) => string;
  destinationNames: Record<string, string>;
  showStatus: boolean;
}) {
  const e = localizeExperience(exp, lang);
  const destName = e.destinationId ? destinationNames[e.destinationId] : undefined;
  const guide = e.hubSlug ? hubHref(e.hubSlug) : undefined;

  return (
    <li className="flex gap-4 rounded-2xl border border-border bg-background p-4">
      {e.image ? (
        <img
          src={`/images/experiences/${e.id}-160w.webp`}
          srcSet={`/images/experiences/${e.id}-160w.webp 160w, /images/experiences/${e.id}-320w.webp 320w`}
          sizes="80px"
          width={160}
          height={120}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-[60px] w-20 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-[60px] w-20 shrink-0 items-center justify-center rounded-xl bg-muted"
        >
          <CircleDot className="h-5 w-5 text-primary/50" />
        </span>
      )}
      <div className="min-w-0">
        <h4 className="font-semibold text-base leading-snug text-foreground">{e.label}</h4>
        {showStatus && exp.status === 'confirmed' && (
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {t('jx_exp_confirmed')}
          </span>
        )}
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.blurb}</p>
        {(destName || guide) && (
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {destName && (
              <Link
                href={`/destinations/${e.destinationId}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t('jx_exp_explore').split('{n}').join(destName)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
            {guide && (
              <Link
                href={guide}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t('jx_exp_guide')}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </p>
        )}
      </div>
    </li>
  );
}

export function IncludedExperiences({ included, optional, lang, t, destinationNames }: Props) {
  if (!included.length && !optional.length) return null;
  const hasConfirmed = included.some((e) => e.status === 'confirmed');
  const groups = GROUP_ORDER.map((kind) => ({
    kind,
    items: included.filter((e) => e.kind === kind),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="mb-16" aria-labelledby="journey-experiences">
      {included.length > 0 && (
        <>
          <h2 id="journey-experiences" className="font-serif text-4xl text-foreground mb-3">
            {t('jx_exp_title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">{t('jx_exp_lead')}</p>
          {hasConfirmed && (
            <p className="mb-8 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
              {t('jx_exp_confirmed_note')}
            </p>
          )}
          <div className="space-y-8">
            {groups.map((g) => (
              <div key={g.kind}>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {t(GROUP_KEY[g.kind])}
                </h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {g.items.map((e) => (
                    <ExperienceCard
                      key={e.id}
                      exp={e}
                      lang={lang}
                      t={t}
                      destinationNames={destinationNames}
                      showStatus
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {optional.length > 0 && (
        <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-6 md:p-8">
          <h3 className="font-serif text-2xl text-foreground mb-2">{t('jx_opt_title')}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6 max-w-3xl">{t('jx_opt_lead')}</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {optional.map((e) => (
              <ExperienceCard
                key={e.id}
                exp={e}
                lang={lang}
                t={t}
                destinationNames={destinationNames}
                showStatus={false}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
