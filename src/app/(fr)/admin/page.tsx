import type { Metadata } from 'next';

import { EspaceSaisie } from '@/components/EspaceSaisie';
import { Store } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Espace de saisie — Les Jumeaux Givrés',
  // Page de travail : elle n'a rien à faire dans un moteur de recherche.
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Store />
      <main>
        <EspaceSaisie />
      </main>
    </>
  );
}
