import type { MetadataRoute } from 'next';

import { slugsArticles } from '@/lib/articles';
import { tousLesGlaciers } from '@/lib/glaciers';
import { ROUTES, SITE, type RouteKey } from '@/lib/i18n';

// L'export statique n'a pas de serveur : ce fichier est généré au build.
export const dynamic = 'force-static';

/** Toutes les pages du site, chacune déclarée avec son équivalent dans l'autre langue. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (chemin: string) => `${SITE.domaine}${chemin}`;

  const pages = (Object.keys(ROUTES) as RouteKey[])
    .filter((key) => key !== 'fiche')
    .map((key) => ({ fr: ROUTES[key].fr, en: ROUTES[key].en }));

  const articles = slugsArticles().map((slug) => ({
    fr: `${ROUTES.articles.fr}${slug}/`,
    en: `${ROUTES.articles.en}${slug}/`,
  }));

  const fiches = tousLesGlaciers().map((g) => ({
    fr: `${ROUTES.fiche.fr}${g.slug}/`,
    en: `${ROUTES.fiche.en}${g.slug}/`,
  }));

  return [...pages, ...fiches, ...articles].flatMap(({ fr, en }) => [
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
