import type { Metadata } from 'next';

import { ROUTES, SITE, t, type RouteKey } from './i18n';
import type { Locale } from './types';

/**
 * Chaque page déclare son adresse canonique et ses équivalents fr / en,
 * plus x-default vers le français.
 */
export function metadonnees({
  locale,
  page,
  slug,
  titre,
  description,
}: {
  locale: Locale;
  page: RouteKey;
  slug?: string;
  titre: string;
  description?: string;
}): Metadata {
  const suffixe = slug ? `${slug}/` : '';
  const cheminFr = `${ROUTES[page].fr}${suffixe}`;
  const cheminEn = `${ROUTES[page].en}${suffixe}`;
  const canonique = locale === 'fr' ? cheminFr : cheminEn;

  return {
    metadataBase: new URL(SITE.domaine),
    title: `${titre} — ${t(locale).marque}`,
    description: description ?? t(locale).descriptionSite,
    alternates: {
      canonical: canonique,
      languages: {
        fr: cheminFr,
        en: cheminEn,
        'x-default': cheminFr,
      },
    },
    icons: { icon: '/cone.svg' },
  };
}
