import { SITE, t } from '@/lib/i18n';
import type { Glacier, Locale } from '@/lib/types';

/**
 * Les données structurées d'une fiche, en schema.org.
 *
 * On ne déclare que ce que la fiche dit vraiment : pas de note globale
 * inventée, pas d'avis agrégé. Le seul `Review` porte la note de goût,
 * sur la même échelle de 1 à 5 que celle affichée.
 */
export function DonneesStructurees({ glacier: g, locale }: { glacier: Glacier; locale: Locale }) {
  const d = t(locale);

  const donnees: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'IceCreamShop',
    name: g.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: g.address.split(',')[0]?.trim(),
      addressLocality: 'Cannes',
      postalCode: '06400',
      addressCountry: 'FR',
    },
  };

  if (g.coords) {
    donnees.geo = { '@type': 'GeoCoordinates', latitude: g.coords[0], longitude: g.coords[1] };
  }
  if (g.phone) donnees.telephone = g.phone;
  if (g.website) donnees.sameAs = [g.website];

  if (g.status === 'teste' && g.taste !== null) {
    donnees.review = {
      '@type': 'Review',
      name: d.fiche.gout,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: g.taste,
        bestRating: 5,
        worstRating: 1,
      },
      author: { '@type': 'Organization', name: d.marque, url: SITE.domaine },
      ...(g.visitDate ? { datePublished: g.visitDate } : {}),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
