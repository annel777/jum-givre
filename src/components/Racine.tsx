import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/next';

import { policeTexte, policeTitre } from '@/lib/fonts';
import type { Locale } from '@/lib/types';
import '@/styles/globals.css';

/** Le squelette HTML, partagé par les deux mises en page racines FR et EN. */
export function Racine({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${policeTitre.variable} ${policeTexte.variable}`}>
      <body>
        {children}
        {/* Mesure d'audience sans cookie ni donnée personnelle. */}
        <Analytics />
      </body>
    </html>
  );
}
