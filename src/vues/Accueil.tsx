import Link from 'next/link';

import { CarteGlaciers } from '@/components/CarteGlaciers';
import type { PointCarte } from '@/components/carte-types';
import { Entete, Pied } from '@/components/SiteChrome';
import { Boules } from '@/components/Boules';
import { chemin, t } from '@/lib/i18n';
import { glaciersTestes, tousLesGlaciers } from '@/lib/glaciers';
import type { Locale } from '@/lib/types';

export function Accueil({ locale }: { locale: Locale }) {
  const d = t(locale);
  const tous = tousLesGlaciers();
  const testes = glaciersTestes();
  const baseFiche = chemin('fiche', locale);

  const points: PointCarte[] = tous
    .filter((g) => g.coords !== null)
    .map((g) => ({
      slug: g.slug,
      name: g.name,
      teste: g.status === 'teste',
      coords: g.coords as [number, number],
      href: `${baseFiche}${g.slug}/`,
    }));

  const sansCoords = tous.length - points.length;

  return (
    <>
      <Entete locale={locale} page="home" />
      <main>
        <section className="bloc prose">
          <h1 className="titre-section">{d.accueil.titre}</h1>
          <p>{d.accueil.intro}</p>
        </section>

        <section className="bloc">
          <h2 className="titre-section">{d.accueil.carteTitre}</h2>
          <p style={{ marginBottom: 12 }}>{d.accueil.carteIntro}</p>
          <CarteGlaciers
            points={points}
            textes={{ vide: d.carte.vide, attribution: d.carte.attribution }}
            manquants={sansCoords > 0 ? d.carte.sansCoords(sansCoords) : null}
          />
        </section>

        <section className="bloc">
          <h2 className="titre-section">{d.accueil.dernieresFiches}</h2>
          <ul className="liste-glaciers">
            {testes.slice(0, 3).map((g) => (
              <li key={g.slug}>
                <Link className="vignette" href={`${baseFiche}${g.slug}/`}>
                  <span>
                    <h3>{g.name}</h3>
                    <span className="quartier">{g.area[locale]}</span>
                  </span>
                  <span className="vignette-fin">
                    {g.taste !== null && <Boules note={g.taste} locale={locale} />}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 16 }}>
            <Link href={chemin('ranking', locale)}>{d.accueil.voirClassement}</Link>
          </p>
        </section>
      </main>
      <Pied locale={locale} />
    </>
  );
}
