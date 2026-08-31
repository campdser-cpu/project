import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

const content = {
  en: {
    eyebrow: 'Before You Book',
    title: 'Questions a first-time visitor usually has',
    intro: 'If Morocco is new to you, these are the practical questions we would want answered before spending money on a trip. We keep the answers honest and connect each answer to the page where you can go deeper.',
    items: [
      {
        q: 'How many days do I really need for Morocco?',
        a: <>For a first visit, there is a big difference between seeing highlights and trying to see everything. A shorter trip can work well if you focus on one region; a longer trip gives you time for cities, mountains and the Sahara without turning every day into a transfer. If you already know your dates, use our <Link href="/trip-builder" className="text-primary font-semibold hover:underline">trip builder</Link> and tell us what matters most.</>,
      },
      {
        q: 'Is Marrakech to Merzouga a quick transfer?',
        a: <>No. It is a substantial journey, and treating it as a simple point-to-point transfer can make a holiday feel rushed. The better question is how to use the route: the Atlas, Aït Ben Haddou, the Dades area and Todra can turn the drive into part of the experience. Our <Link href="/blog/marrakech-to-merzouga-roadtrip" className="text-primary font-semibold hover:underline">Marrakech–Merzouga guide</Link> explains the practical reality.</>,
      },
      {
        q: 'What is the difference between Merzouga and Erg Chebbi?',
        a: <>Merzouga is the settlement and tourism base; Erg Chebbi is the dune field around it. In practical terms, travelers usually stay or arrive around Merzouga and then enter the dunes for desert activities. Start with the <Link href="/merzouga-guide" className="text-primary font-semibold hover:underline">Merzouga Guide</Link> and then explore our <Link href="/camel-trekking" className="text-primary font-semibold hover:underline">camel trekking</Link> experience.</>,
      },
      {
        q: 'Should I choose a ready-made tour or build my own?',
        a: <>Choose a ready-made tour when the route and pace already suit you. Choose <Link href="/trip-builder" className="text-primary font-semibold hover:underline">Design Your Tour</Link> when your dates, interests or starting point need a different combination. We should never pretend a generic itinerary is personal when it is not. The builder is for multi-day journeys; <Link href="/build-your-day-trip" className="text-primary font-semibold hover:underline">Build Your Day Trip</Link> is specifically for one-day requests.</>,
      },
      {
        q: 'Is the Sahara comfortable for families?',
        a: <>It can be, but the right route matters more than a generic “family friendly” label. Parents should look at driving days, walking, activity intensity, meal arrangements and where the overnight stay happens. Start with our <Link href="/tours" className="text-primary font-semibold hover:underline">Morocco tours</Link> and ask us to clarify the route before booking.</>,
      },
      {
        q: 'What should I expect from a night in the desert?',
        a: <>A desert night is not simply a hotel moved into the dunes. Expect a change of environment: open space, a different temperature after sunset, limited surroundings and a much slower evening. Read the <Link href="/luxury-camp" className="text-primary font-semibold hover:underline">Luxury Desert Camp</Link> page so you know what the experience is intended to be, and ask us about any facility that matters to you before you book.</>,
      },
      {
        q: 'When is a good time to visit the Sahara?',
        a: <>There is no single perfect month for every traveler, but spring and autumn are generally favorable seasons for the southern Sahara. The right choice also depends on whether you prefer warmer days, cooler nights or a particular travel schedule. We recommend comparing the season with your own comfort and itinerary rather than relying on a single “best month”.</>,
      },
      {
        q: 'Do I need cash in Morocco if I have a bank card?',
        a: <>Bring a card, but do not plan your entire trip around card payments. ATMs are widespread and Visa/Mastercard are accepted by many hotels and some restaurants, shops and fuel stations, while some situations still require Moroccan dirhams. Keep a practical cash reserve and confirm important payment details before leaving the city.</>,
      },
    ],
    links: 'Useful next steps',
    linksList: [
      ['/tours', 'Compare Morocco tours'],
      ['/destinations', 'Explore destinations'],
      ['/day-trips', 'Understand day trips'],
      ['/contact', 'Ask a real person'],
    ] as const,
  },
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

export function TravelerDecisionGuide() {
  const { lang } = useLanguage();
  const data = lang === 'ar' ? content.ar : content.en;

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
              <div className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.a}</div>
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
