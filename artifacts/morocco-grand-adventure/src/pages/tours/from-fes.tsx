import { getCityHub } from '@/data/tour-hierarchy';
import { TourCityHub } from '@/components/tours/TourCityHub';
import NotFound from '../not-found';

export default function FromFes() {
  const hub = getCityHub('fes');
  if (!hub) return <NotFound />;
  return <TourCityHub hub={hub} />;
}