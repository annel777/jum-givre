import type { ReactNode } from 'react';

import { Racine } from '@/components/Racine';

export default function LayoutEn({ children }: { children: ReactNode }) {
  return <Racine locale="en">{children}</Racine>;
}
