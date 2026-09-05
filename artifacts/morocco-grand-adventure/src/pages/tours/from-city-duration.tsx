import { useRoute } from 'wouter';
import { TOUR_DURATION_ROUTE, getCityHub } from '@/data/tour-hierarchy';
import { TourDurationHub } from '@/components/tours/TourDurationHub';
import NotFound from '../not-found';

export default function FromCityDuration() {
  // RegExp matcher: captures 0 = city slug, 1 = days (see tour-hierarchy.ts —
  // string patterns like "/tours/from-:city/:days" never matched client-side).
  const [match, params] = useRoute(TOUR_DURATION_ROUTE);

  if (!match) return <NotFound />;
  const slug = params?.[0];
  const days = params?.[1] ? parseInt(params[1], 10) : NaN;
  const hub = slug ? getCityHub(slug) : undefined;

  if (!hub || !Number.isFinite(days) || days <= 0) return <NotFound />;

  return <TourDurationHub key={`${slug}-${days}`} hub={hub} durationDays={days} />;
}