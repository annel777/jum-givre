import type { Metadata } from 'next';

import { PageClassement } from '@/vues/PageClassement';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'fr',
  page: 'ranking',
  titre: 'Classement',
});

export default function Page() {
  return <PageClassement locale="fr" />;
}
