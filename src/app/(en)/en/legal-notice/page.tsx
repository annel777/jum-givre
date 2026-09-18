import type { Metadata } from 'next';

import { PageEditoriale } from '@/vues/Editorial';
import { metadonnees } from '@/lib/metadata';

export const metadata: Metadata = metadonnees({
  locale: 'en',
  page: 'legal',
  titre: 'Legal notice',
});

export default function Page() {
  return <PageEditoriale locale="en" page="legal" />;
}
