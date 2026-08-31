import { Link } from 'wouter';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export type Crumb = {
  label: string;
  href?: string;
};

type TourBreadcrumbsProps = {
  items: Crumb[];
};

const LINK_CLASS = 'inline-flex items-center gap-1.5 hover:text-white transition-colors';

/**
 * Visual breadcrumbs that mirror the site hierarchy (Home → Tours → City → Tour).
 * Uses wouter <Link> so navigation stays client-side. The last item is always the
 * current (non-link) page.
 */
export function TourBreadcrumbs({ items }: TourBreadcrumbsProps) {
  const { t } = useLanguage();
  const all: Crumb[] = [{ label: t('nav_home'), href: '/' }, ...items];

  return (
    <Breadcrumb className="relative z-10 container mx-auto px-4 py-4">
      <BreadcrumbList className="[&>li]:text-white/85">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <BreadcrumbItem key={`${crumb.label}-${i}`}>
              {isLast || !crumb.href ? (
                isLast ? (
                  <BreadcrumbPage className="text-white/95 font-semibold">{crumb.label}</BreadcrumbPage>
                ) : (
                  <span className={LINK_CLASS}>
                    {i === 0 ? <Home className="w-3.5 h-3.5" aria-hidden="true" /> : null}
                    {crumb.label}
                  </span>
                )
              ) : (
                <Link href={crumb.href} className={LINK_CLASS}>
                  {i === 0 ? <Home className="w-3.5 h-3.5" aria-hidden="true" /> : null}
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}