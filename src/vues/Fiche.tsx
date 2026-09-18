import { notFound } from 'next/navigation';

import { DonneesStructurees } from '@/components/DonneesStructurees';
import { FicheGlacier } from '@/components/FicheGlacier';
import { Entete, Pied } from '@/components/SiteChrome';
import { glacierParSlug, glaciersTestes } from '@/lib/glaciers';
import type { Locale } from '@/lib/types';

export function Fiche({ locale, slug }: { locale: Locale; slug: string }) {
  const glacier = glacierParSlug(slug);
  if (!glacier) notFound();

  // Le numéro affiché est le rang du glacier au classement.
  const rang = glaciersTestes().findIndex((g) => g.slug === slug);

  return (
    <>
      <Entete locale={locale} page="fiche" slug={slug} />
      <main>
        <DonneesStructurees glacier={glacier} locale={locale} />
        <FicheGlacier glacier={glacier} locale={locale} rang={rang >= 0 ? rang + 1 : undefined} />
      </main>
      <Pied locale={locale} />
    </>
  );
}
