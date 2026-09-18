import type { MetadataRoute } from 'next';

import { SITE } from '@/lib/i18n';

// L'export statique n'a pas de serveur : ce fichier est généré au build.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.domaine}/sitemap.xml`,
  };
}
