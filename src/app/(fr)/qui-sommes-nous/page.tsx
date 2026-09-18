import type { Metadata } from 'next';

import { PageEditoriale } from '@/vues/Editorial';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'fr',
  page: 'about',
  titre: 'Qui sommes-nous',
});

export default function Page() {
  return <PageEditoriale locale="fr" page="about" />;
}
