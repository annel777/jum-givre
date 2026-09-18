'use client';

import dynamic from 'next/dynamic';

import type { PointCarte } from './carte-types';

/** Leaflet a besoin de `window` : la carte ne se charge que dans le navigateur. */
const CarteLeaflet = dynamic(() => import('./CarteLeaflet'), {
  ssr: false,
  loading: () => <div className="carte-zone" aria-hidden="true" />,
});

export function CarteGlaciers({
  points,
  attribution,
  manquants,
}: {
  points: PointCarte[];
  attribution: string;
  manquants: string | null;
}) {
  return (
    <>
      <div className="carte-zone">
        <CarteLeaflet points={points} attribution={attribution} />
      </div>
      {manquants && <p className="encart">{manquants}</p>}
    </>
  );
}
