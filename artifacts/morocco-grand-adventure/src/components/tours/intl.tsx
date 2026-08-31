import { Link } from 'wouter';
import type { ReactNode } from 'react';

/**
 * Small i18n helpers for the Tours hub components.
 *
 * The site's `t()` returns a plain string, so templates that need values
 * (e.g. "{days}") or inline links (e.g. "{erg}") are resolved here rather than
 * introducing a second translation system.
 */

/** Replace `{var}` placeholders in a translated template string. */
export function fmtTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

export type LinkToken = { token: string; href: string; label: string };

/**
 * Render a translated string that contains link tokens (e.g. "{erg}") as
 * inline <Link> elements. Each token is replaced by its translated link label
 * so word order stays natural in any language.
 */
export function renderWithLinks(template: string, links: LinkToken[]): ReactNode[] {
  let parts: ReactNode[] = [template];
  for (const link of links) {
    const next: ReactNode[] = [];
    parts.forEach((part, index) => {
      if (typeof part !== 'string') {
        next.push(part);
        return;
      }
      const at = part.indexOf(link.token);
      if (at === -1) {
        next.push(part);
        return;
      }
      if (at > 0) next.push(part.slice(0, at));
      next.push(
        <Link
          key={`${link.token}-${index}`}
          href={link.href}
          className="text-primary underline-offset-4 hover:underline"
        >
          {link.label}
        </Link>,
      );
      if (at + link.token.length < part.length) next.push(part.slice(at + link.token.length));
    });
    parts = next;
  }
  return parts;
}