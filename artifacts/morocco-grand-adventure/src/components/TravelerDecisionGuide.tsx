import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { travelerDecisionGuideEn, type TravelerDecisionContent, type TravelerDecisionSegment } from '@/data/travelerDecisionGuide';
import {
  travelerDecisionGuideFr,
  travelerDecisionGuideEs,
  travelerDecisionGuideIt,
  travelerDecisionGuideDe,
  travelerDecisionGuideNl,
  travelerDecisionGuidePt,
  travelerDecisionGuideZh,
  travelerDecisionGuideJa,
  travelerDecisionGuideKo,
  travelerDecisionGuideAr,
} from '@/data/travelerDecisionGuide-i18n';
import type { Lang } from '@/i18n';

const content: Record<Lang, TravelerDecisionContent> = {
  en: travelerDecisionGuideEn,
  fr: travelerDecisionGuideFr,
  es: travelerDecisionGuideEs,
  it: travelerDecisionGuideIt,
  de: travelerDecisionGuideDe,
  nl: travelerDecisionGuideNl,
  pt: travelerDecisionGuidePt,
  zh: travelerDecisionGuideZh,
  ja: travelerDecisionGuideJa,
  ko: travelerDecisionGuideKo,
  ar: travelerDecisionGuideAr,
};

function renderSegments(segments: TravelerDecisionSegment[]) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.type === 'link' ? (
          <Link key={i} href={seg.to} className="text-primary font-semibold hover:underline">
            {seg.text}
          </Link>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}

function renderAnswer(answer: ReactNode | TravelerDecisionSegment[]) {
  return Array.isArray(answer) ? renderSegments(answer) : answer;
}

export function TravelerDecisionGuide() {
  const { lang } = useLanguage();
  const data = content[lang] ?? travelerDecisionGuideEn;

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-bold tracking-[0.18em] uppercase text-xs md:text-sm mb-3 block">{data.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">{data.title}</h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">{data.intro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {data.items.map((item) => (
            <article key={item.q} className="bg-background border border-border rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-xl text-foreground mb-3 leading-snug">{item.q}</h3>
              <div className="text-muted-foreground leading-relaxed text-sm md:text-base">{renderAnswer(item.a)}</div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="font-serif text-2xl text-foreground mb-5">{data.links}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {data.linksList.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
