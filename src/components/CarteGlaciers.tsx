'use client';

import dynamic from 'next/dynamic';

import type { PointCarte } from './carte-types';
import { Cone, COULEUR_A_TESTER, COULEUR_TESTE } from './Cone';

/** Leaflet a besoin de `window` : la carte ne se charge que dans le navigateur. */
const CarteLeaflet = dynamic(() => import('./CarteLeaflet'), {
  ssr: false,
  loading: () => <div className="carte-chargement" aria-hidden="true" />,
});

export function CarteGlaciers({
  points,
  textes,
  manquants,
}: {
  points: PointCarte[];
  textes: {
    testes: string;
    bientot: string;
    vide: string;
    attribution: string;
    legende: string;
  };
  manquants: string | null;
}) {
  return (
    <>
      <div className="carte-zone">
        {points.length > 0 ? (
          <>
            <CarteLeaflet points={points} attribution={textes.attribution} />
            <ul className="carte-legende" aria-label={textes.legende}>
              <li>
                <Cone taille={18} couleur={COULEUR_TESTE} />
                {textes.testes}
              </li>
              <li>
                <Cone taille={18} couleur={COULEUR_A_TESTER} />
                {textes.bientot}
              </li>
            </ul>
          </>
        ) : (
          /* Pas de carte grise et muette tant qu'aucune adresse n'est relevée. */
          <div className="carte-vide">
            <Cone taille={46} couleur={COULEUR_A_TESTER} ombre />
            <p>{textes.vide}</p>
          </div>
        )}
      </div>
      {manquants && points.length > 0 && <p className="encart">{manquants}</p>}
    </>
  );
}
