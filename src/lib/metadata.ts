import type { Metadata } from 'next';

import { ROUTES, SITE, t, type RouteKey } from './i18n';
import type { Locale } from './types';

/**
 * Chaque page déclare son adresse canonique et ses équivalents fr / en,
 * plus x-default vers le français, et de quoi se partager correctement.
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
  const d = t(locale);
  const suffixe = slug ? `${slug}/` : '';
  const cheminFr = `${ROUTES[page].fr}${suffixe}`;
  const cheminEn = `${ROUTES[page].en}${suffixe}`;
  const canonique = locale === 'fr' ? cheminFr : cheminEn;
  const titreComplet = `${titre} — ${d.marque}`;
  const resume = description ?? d.descriptionSite;

  return {
    metadataBase: new URL(SITE.domaine),
    title: titreComplet,
    description: resume,
    alternates: {
      canonical: canonique,
      languages: {
        fr: cheminFr,
        en: cheminEn,
        'x-default': cheminFr,
      },
    },
    openGraph: {
      type: 'website',
      siteName: d.marque,
      title: titreComplet,
      description: resume,
      url: canonique,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: locale === 'fr' ? 'en_GB' : 'fr_FR',
    },
    twitter: {
      card: 'summary',
      title: titreComplet,
      description: resume,
    },
    icons: { icon: '/cone.svg' },
  };
}
