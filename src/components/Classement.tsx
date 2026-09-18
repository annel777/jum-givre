'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Boules } from './Boules';
import { t } from '@/lib/i18n';
import type { BonusKey, Glacier, Locale, Price, Size } from '@/lib/types';

const PRIX: Price[] = ['pas-cher', 'norme', 'cher'];
const TAILLES: Size[] = ['mini', 'normale', 'geante'];
const BONUS_FILTRES: BonusKey[] = ['terrasse', 'light'];

export function Classement({
  glaciers,
  locale,
  basePath,
}: {
  glaciers: Glacier[];
  locale: Locale;
  basePath: string;
}) {
  const d = t(locale);
  const e = d.echelles;

  const [prix, setPrix] = useState<Price | null>(null);
  const [taille, setTaille] = useState<Size | null>(null);
  const [bonus, setBonus] = useState<BonusKey[]>([]);

  const visibles = useMemo(
    () =>
      glaciers.filter(
        (g) =>
          (prix === null || g.price === prix) &&
          (taille === null || g.size === taille) &&
          bonus.every((b) => g.bonus.includes(b)),
      ),
    [glaciers, prix, taille, bonus],
  );

  function basculeBonus(key: BonusKey) {
    setBonus((actuels) =>
      actuels.includes(key) ? actuels.filter((b) => b !== key) : [...actuels, key],
    );
  }

  return (
    <>
      <div className="filtres" role="group" aria-label={`${d.classement.filtrer} — ${d.fiche.prix}`}>
        <button type="button" className="filtre" aria-pressed={prix === null} onClick={() => setPrix(null)}>
          {d.fiche.prix} : {d.classement.tous}
        </button>
        {PRIX.map((p) => (
          <button
            key={p}
            type="button"
            className="filtre"
            aria-pressed={prix === p}
            onClick={() => setPrix(prix === p ? null : p)}
          >
            {e.price[p]}
          </button>
        ))}
      </div>

      <div className="filtres" role="group" aria-label={`${d.classement.filtrer} — ${d.fiche.taille}`}>
        <button type="button" className="filtre" aria-pressed={taille === null} onClick={() => setTaille(null)}>
          {d.fiche.taille} : {d.classement.tous}
        </button>
        {TAILLES.map((s) => (
          <button
            key={s}
            type="button"
            className="filtre"
            aria-pressed={taille === s}
            onClick={() => setTaille(taille === s ? null : s)}
          >
            {e.size[s]}
          </button>
        ))}
      </div>

      <div className="filtres" role="group" aria-label={`${d.classement.filtrer} — ${d.fiche.bonusTitre}`}>
        {BONUS_FILTRES.map((b) => (
          <button
            key={b}
            type="button"
            className="filtre"
            aria-pressed={bonus.includes(b)}
            onClick={() => basculeBonus(b)}
          >
            {e.bonus[b]}
          </button>
        ))}
      </div>

      <p className="petit" aria-live="polite">
        {d.classement.resultats(visibles.length)}
      </p>

      {visibles.length === 0 ? (
        <p className="encart">{d.classement.aucun}</p>
      ) : (
        <ul className="liste-glaciers">
          {visibles.map((g, i) => (
            <li key={g.slug}>
              <Link className="vignette" href={`${basePath}${g.slug}/`}>
                <span className="rang" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <h3>{g.name}</h3>
                  <span className="quartier">{g.area[locale]}</span>
                </span>
                <span className="vignette-fin">
                  {g.taste !== null && <Boules note={g.taste} locale={locale} />}
                  <span className="petit">
                    {g.bonus.length} {d.fiche.bonusTitre.toLowerCase()}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
