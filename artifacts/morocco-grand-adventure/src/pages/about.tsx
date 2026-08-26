import { Layout } from '../components/layout/Layout';
import PremiumAboutSection from '../components/sections/PremiumAboutSection';
import { buildAboutPageSchema } from '../components/seo/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';

const GUIDES = [
  { name: 'Mohamed Boughrara', role: 'Founder & Desert Guide', image: '/images/guide/mohamed-boughrara-founder-desert-guide-merzouga.webp' },
  { name: 'Mostapha Wargaga', role: 'Senior Desert Guide', image: '/images/guide/mostapha-wargaga-senior-desert-guide-sahara-sunset.webp' },
  { name: 'Moha Amroui', role: 'Desert Guide', image: '/images/guide/moha-amroui-desert-guide-camels-merzouga.jpg' },
];

export default function About() {
  const { lang } = useLanguage();
  return (
    <Layout>
      <PremiumAboutSection />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAboutPageSchema(GUIDES, lang) as any) }} />
    </Layout>
  );
}
