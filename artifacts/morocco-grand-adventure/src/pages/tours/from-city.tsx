import { useRoute } from 'wouter';
import { getCityHub } from '@/data/tour-hierarchy';
import { TourCityHub } from '@/components/tours/TourCityHub';
import NotFound from '../not-found';

export default function FromCity() {
  const [match, params] = useRoute('/tours/from-:city');
  if (!match) return <NotFound />;
  const hub = params?.city ? getCityHub(params.city) : undefined;
  if (!hub) return <NotFound />;
  return <TourCityHub hub={hub} />;
}