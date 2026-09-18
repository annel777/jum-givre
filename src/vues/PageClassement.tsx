import { Classement } from '@/components/Classement';
import { Entete, Pied } from '@/components/SiteChrome';
import { glaciersTestes } from '@/lib/glaciers';
import { chemin, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

export function PageClassement({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <>
      <Entete locale={locale} page="ranking" />
      <main>
        <h1 className="titre-section">{d.classement.titre}</h1>
        <p style={{ marginBottom: 18 }}>{d.classement.intro}</p>
        <Classement
          glaciers={glaciersTestes()}
          locale={locale}
          basePath={chemin('fiche', locale)}
        />
      </main>
      <Pied locale={locale} />
    </>
  );
}
