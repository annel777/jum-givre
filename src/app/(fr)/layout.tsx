import type { ReactNode } from 'react';

import { Racine } from '@/components/Racine';

export default function LayoutFr({ children }: { children: ReactNode }) {
  return <Racine locale="fr">{children}</Racine>;
}
