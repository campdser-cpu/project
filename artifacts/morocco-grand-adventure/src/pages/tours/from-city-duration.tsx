import { useRoute } from 'wouter';
import { getCityHub } from '@/data/tour-hierarchy';
import { TourDurationHub } from '@/components/tours/TourDurationHub';
import NotFound from '../not-found';

export default function FromCityDuration() {
  const [match, params] = useRoute('/tours/from-:city/:days');

  if (!match) return <NotFound />;
  const slug = params?.city;
  const days = params?.days ? parseInt(params.days, 10) : NaN;
  const hub = slug ? getCityHub(slug) : undefined;

  if (!hub || !Number.isFinite(days) || days <= 0) return <NotFound />;

  return <TourDurationHub key={`${slug}-${days}`} hub={hub} durationDays={days} />;
}