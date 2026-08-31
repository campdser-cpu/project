import { getCityHub } from '@/data/tour-hierarchy';
import { TourCityHub } from '@/components/tours/TourCityHub';
import NotFound from '../not-found';

export default function FromCasablanca() {
  const hub = getCityHub('casablanca');
  if (!hub) return <NotFound />;
  return <TourCityHub hub={hub} />;
}