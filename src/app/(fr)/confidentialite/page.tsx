import type { Metadata } from 'next';

import { PageEditoriale } from '@/vues/Editorial';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'fr',
  page: 'privacy',
  titre: 'Confidentialité',
});

export default function Page() {
  return <PageEditoriale locale="fr" page="privacy" />;
}
