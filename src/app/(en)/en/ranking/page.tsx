import type { Metadata } from 'next';

import { PageClassement } from '@/vues/PageClassement';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'en',
  page: 'ranking',
  titre: 'Ranking',
});

export default function Page() {
  return <PageClassement locale="en" />;
}
