import type { Metadata } from 'next';

import { PageArticles } from '@/vues/PageArticles';
import { metadonnees } from '@/lib/metadata';
import { t } from '@/lib/i18n';

export const metadata: Metadata = metadonnees({
  locale: 'fr',
  page: 'articles',
  titre: t('fr').articles.titre,
  description: t('fr').articles.intro,
});

export default function Page() {
  return <PageArticles locale="fr" />;
}
