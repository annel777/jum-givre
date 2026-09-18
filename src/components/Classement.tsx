'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Boules } from './Boules';
import { prixLisible, t } from '@/lib/i18n';
import type { BonusKey, Glacier, Locale, Size } from '@/lib/types';

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

  const [prixMax, setPrixMax] = useState<number | null>(null);
  const [taille, setTaille] = useState<Size | null>(null);
  const [bonus, setBonus] = useState<BonusKey[]>([]);

  /* Les seuils de prix viennent des fiches elles-mêmes, pas de tranches inventées. */
  const prixReleves = useMemo(
    () =>
      [...new Set(glaciers.map((g) => g.price).filter((p): p is number => p !== null))].sort(
        (a, b) => a - b,
      ),
    [glaciers],
  );

  const visibles = useMemo(
    () =>
      glaciers.filter(
        (g) =>
          (prixMax === null || (g.price !== null && g.price <= prixMax)) &&
          (taille === null || g.size === taille) &&
          bonus.every((b) => g.bonus.includes(b)),
      ),
    [glaciers, prixMax, taille, bonus],
  );

  function basculeBonus(key: BonusKey) {
    setBonus((actuels) =>
      actuels.includes(key) ? actuels.filter((b) => b !== key) : [...actuels, key],
    );
  }

  return (
    <>
      {prixReleves.length > 1 && (
        <div className="filtres" role="group" aria-label={`${d.classement.filtrer} — ${d.classement.prixMax}`}>
          <button
            type="button"
            className="filtre"
            aria-pressed={prixMax === null}
            onClick={() => setPrixMax(null)}
          >
            {d.classement.prixMax} : {d.classement.tous}
          </button>
          {prixReleves.map((p) => (
            <button
              key={p}
              type="button"
              className="filtre"
              aria-pressed={prixMax === p}
              onClick={() => setPrixMax(prixMax === p ? null : p)}
            >
              {d.classement.jusqua(prixLisible(p, locale))}
            </button>
          ))}
        </div>
      )}

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
                    {g.price !== null && `${prixLisible(g.price, locale)} · `}
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
