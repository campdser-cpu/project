import { Layout } from '../components/layout/Layout';
import PremiumAboutSection from '../components/sections/PremiumAboutSection';
import { StructuredData, buildAboutPageSchema } from '../components/seo/StructuredData';
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
      <StructuredData id="about" data={buildAboutPageSchema(GUIDES, lang)} />
    </Layout>
  );
}
