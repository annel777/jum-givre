import type { Metadata } from 'next';

import { Accueil } from '@/vues/Accueil';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'en',
  page: 'home',
  titre: 'Home',
});

export default function Page() {
  return <Accueil locale="en" />;
}
