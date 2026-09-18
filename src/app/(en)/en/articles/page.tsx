import type { Metadata } from 'next';

import { PageArticles } from '@/vues/PageArticles';
import { metadonnees } from '@/lib/metadata';
import { t } from '@/lib/i18n';

export const metadata: Metadata = metadonnees({
  locale: 'en',
  page: 'articles',
  titre: t('en').articles.titre,
  description: t('en').articles.intro,
});

export default function Page() {
  return <PageArticles locale="en" />;
}
