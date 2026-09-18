import type { Metadata } from 'next';

import { Accueil } from '@/vues/Accueil';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'fr',
  page: 'home',
  titre: 'Accueil',
});

export default function Page() {
  return <Accueil locale="fr" />;
}
