import { getCityHub } from '@/data/tour-hierarchy';
import { TourCityHub } from '@/components/tours/TourCityHub';
import NotFound from '../not-found';

export default function FromMarrakech() {
  const hub = getCityHub('marrakech');
  if (!hub) return <NotFound />;
  return <TourCityHub hub={hub} />;
}