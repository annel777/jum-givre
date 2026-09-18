import type { MetadataRoute } from 'next';

import { tousLesGlaciers } from '@/lib/glaciers';
import { ROUTES, SITE, type RouteKey } from '@/lib/i18n';

// L'export statique n'a pas de serveur : ce fichier est généré au build.
export const dynamic = 'force-static';

/** Les 14 pages du site, chacune déclarée avec son équivalent dans l'autre langue. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (chemin: string) => `${SITE.domaine}${chemin}`;

  const pages = (Object.keys(ROUTES) as RouteKey[])
    .filter((key) => key !== 'fiche')
    .map((key) => ({ fr: ROUTES[key].fr, en: ROUTES[key].en }));

  const fiches = tousLesGlaciers().map((g) => ({
    fr: `${ROUTES.fiche.fr}${g.slug}/`,
    en: `${ROUTES.fiche.en}${g.slug}/`,
  }));

  return [...pages, ...fiches].flatMap(({ fr, en }) => [
    {
      url: url(fr),
      alternates: { languages: { fr: url(fr), en: url(en) } },
      changeFrequency: 'monthly' as const,
    },
    {
      url: url(en),
      alternates: { languages: { fr: url(fr), en: url(en) } },
      changeFrequency: 'monthly' as const,
    },
  ]);
}
