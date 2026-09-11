import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { travelerDecisionGuideEn, type TravelerDecisionSegment } from '@/data/travelerDecisionGuide';
import { travelerDecisionGuideFr } from '@/data/travelerDecisionGuide-i18n';

const content = {
  en: travelerDecisionGuideEn,

  ar: {
    eyebrow: 'قبل الحجز',
    title: 'أسئلة يطرحها المسافر لأول مرة',
    intro: 'إذا كان المغرب جديدًا عليك، فهذه من أهم الأسئلة العملية التي نريد أن تكون إجاباتها واضحة قبل أن تنفق مالك على الرحلة. نربط كل إجابة بالصفحة التي تساعدك على معرفة المزيد.',
    items: [
      { q: 'كم يومًا أحتاج فعلًا لزيارة المغرب؟', a: <>يعتمد ذلك على ما تريد رؤيته. الرحلة القصيرة يمكن أن تكون رائعة إذا ركزت على منطقة واحدة، بينما الرحلة الأطول تمنحك وقتًا للمدن والجبال والصحراء دون تحويل كل يوم إلى رحلة انتقال. إذا كانت لديك تواريخ محددة، استخدم <Link href="/trip-builder" className="text-primary font-semibold hover:underline">مصمم الرحلة</Link> وأخبرنا بما يهمك.</> },
      { q: 'هل الانتقال من مراكش إلى مرزوكة سريع؟', a: <>لا. إنها رحلة طويلة نسبيًا، ومن الأفضل ألا نتعامل معها كتنقل سريع فقط. يمكن أن تصبح الطريق جزءًا من التجربة عبر الأطلس وآيت بن حدو ومنطقة دادس وتودرا. يمكنك قراءة <Link href="/blog/marrakech-to-merzouga-roadtrip" className="text-primary font-semibold hover:underline">دليل مراكش إلى مرزوكة</Link> لمعرفة الصورة العملية.</> },
      { q: 'ما الفرق بين مرزوكة وعرق الشبي؟', a: <>مرزوكة هي البلدة والقاعدة السياحية، أما عرق الشبي فهو مجال الكثبان المرتبط بالمنطقة. عمليًا يصل المسافر إلى مرزوكة ثم يدخل منطقة الكثبان للأنشطة الصحراوية. ابدأ بـ<Link href="/merzouga-guide" className="text-primary font-semibold hover:underline">دليل مرزوكة</Link> ثم استكشف تجربة <Link href="/camel-trekking" className="text-primary font-semibold hover:underline">رحلة الجمال</Link>.</> },
      { q: 'هل أختار رحلة جاهزة أم أصمم رحلتي بنفسي؟', a: <>اختر الرحلة الجاهزة إذا كان مسارها ومدتها مناسبتين لك. أما إذا كانت لديك تواريخ أو اهتمامات أو نقطة انطلاق مختلفة، فاستخدم <Link href="/trip-builder" className="text-primary font-semibold hover:underline">مصمم الرحلات المتعددة الأيام</Link>. ولرحلة يوم واحد استخدم <Link href="/build-your-day-trip" className="text-primary font-semibold hover:underline">مصمم الرحلة اليومية</Link>.</> },
      { q: 'هل الصحراء مناسبة للعائلات؟', a: <>يمكن أن تكون مناسبة، لكن المسار والوتيرة مهمان. يجب على العائلة معرفة أيام القيادة، مقدار المشي، الأنشطة، الطعام ومكان المبيت. ابدأ باستكشاف <Link href="/tours" className="text-primary font-semibold hover:underline">رحلات المغرب</Link> واسألنا عن أي تفصيل قبل الحجز.</> },
      { q: 'ماذا أتوقع من ليلة في المخيم الصحراوي؟', a: <>ليلة الصحراء ليست مجرد فندق داخل الرمال. ستعيش بيئة مختلفة، ومساحة مفتوحة، وتغيرًا في الحرارة بعد الغروب وأمسية أكثر هدوءًا. راجع صفحة <Link href="/luxury-camp" className="text-primary font-semibold hover:underline">المخيم الصحراوي الفاخر</Link> واسألنا عن أي مرفق مهم بالنسبة لك.</> },
      { q: 'متى يكون الوقت مناسبًا لزيارة الصحراء؟', a: <>لا يوجد شهر مثالي للجميع، لكن الربيع والخريف يعدان عمومًا من الفترات المناسبة للصحراء الجنوبية. الاختيار يعتمد أيضًا على تفضيلك للحرارة والبرودة وبرنامجك، لذلك الأفضل مقارنة الموسم ببرنامجك وراحتك.</> },
      { q: 'هل أحتاج إلى النقود إذا كانت لدي بطاقة بنكية؟', a: <>اصطحب البطاقة، لكن لا تعتمد عليها في كل شيء. أجهزة الصراف منتشرة وتُقبل Visa وMastercard في العديد من الفنادق وبعض المطاعم والمتاجر ومحطات الوقود، بينما تحتاج بعض المواقف إلى الدرهم المغربي. من الأفضل الاحتفاظ بمبلغ نقدي احتياطي.</> },
    ],
    links: 'خطوات مفيدة',
    linksList: [
      ['/tours', 'قارن بين الرحلات'],
      ['/destinations', 'استكشف الوجهات'],
      ['/day-trips', 'تعرف على الرحلات اليومية'],
      ['/contact', 'تحدث معنا مباشرة'],
    ] as const,
  },
} as const;

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
  const data = (lang === 'ar' ? content.ar : lang === 'fr' ? travelerDecisionGuideFr : travelerDecisionGuideEn) as unknown as {
    eyebrow: string;
    title: string;
    intro: string;
    items: { q: string; a: ReactNode | TravelerDecisionSegment[] }[];
    links: string;
    linksList: readonly (readonly [string, string])[];
  };

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
