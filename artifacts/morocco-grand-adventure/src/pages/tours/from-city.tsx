import { useRoute } from 'wouter';
import { TOUR_CITY_ROUTE, getCityHub } from '@/data/tour-hierarchy';
import { TourCityHub } from '@/components/tours/TourCityHub';
import NotFound from '../not-found';

export default function FromCity() {
  // RegExp matcher: capture 0 = city slug (wouter only supports :param at the
  // start of a segment, so the string pattern "/tours/from-:city" never matched).
  const [match, params] = useRoute(TOUR_CITY_ROUTE);
  if (!match) return <NotFound />;
  const hub = params?.[0] ? getCityHub(params[0]) : undefined;
  if (!hub) return <NotFound />;
  return <TourCityHub hub={hub} />;
}