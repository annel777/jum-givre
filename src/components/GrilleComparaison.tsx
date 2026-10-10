import Link from 'next/link';

import { Boules } from './Boules';
import { prixLisible, t } from '@/lib/i18n';
import type { Glacier, Locale } from '@/lib/types';

const VISAGES = { bof: '😐', sympa: '🙂', super: '🤩' } as const;

/** Une case vide se dit, elle ne se devine pas. */
function Vide({ locale }: { locale: Locale }) {
  return (
    <>
      <span aria-hidden="true">—</span>
      <span className="sr-only">{t(locale).classement.nonRenseigne}</span>
    </>
  );
}

/**
 * La grille du brief, en tableau : un glacier par ligne, un critère par colonne.
 * C'est le repère qui manquait — les vignettes montrent un glacier à la fois,
 * la grille les met côte à côte.
 *
 * Le total du classement n'a volontairement pas de colonne : /notre-methode
 * promet qu'il n'est jamais affiché comme une note. Le rang suffit à dire l'ordre.
 */
export function GrilleComparaison({
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

  return (
    <div
      className="grille-boite"
      role="region"
      aria-label={d.classement.grille}
      tabIndex={0}
    >
      <table className="grille">
        <caption>
          {d.classement.grille}
          <span className="petit grille-glisse">{d.classement.defile}</span>
        </caption>
        <thead>
          <tr>
            <th scope="col">{d.classement.glacierCol}</th>
            <th scope="col">{d.fiche.gout}</th>
            <th scope="col">{d.fiche.taille}</th>
            <th scope="col">{d.fiche.prix}</th>
            <th scope="col">{d.fiche.accueil}</th>
            <th scope="col">{d.fiche.bonusTitre}</th>
          </tr>
        </thead>
        <tbody>
          {glaciers.map((g, i) => (
            <tr key={g.slug}>
              <th scope="row">
                <span className="grille-nom">
                  <span className="rang rang-mini" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <span className="sr-only">{d.classement.rangOrdre(i + 1)} — </span>
                    <Link href={`${basePath}${g.slug}/`}>{g.name}</Link>
                    <span className="petit grille-quartier">{g.area[locale]}</span>
                  </span>
                </span>
              </th>

              <td>
                {g.taste !== null ? (
                  <span className="grille-gout">
                    <Boules note={g.taste} locale={locale} />
                    <span aria-hidden="true">
                      {g.taste.toString().replace('.', locale === 'fr' ? ',' : '.')} / 5
                    </span>
                  </span>
                ) : (
                  <Vide locale={locale} />
                )}
              </td>

              <td>
                {g.size ? (
                  <span className="choix choix-mini">
                    <span aria-hidden="true">🍦 </span>
                    {e.size[g.size]}
                  </span>
                ) : (
                  <Vide locale={locale} />
                )}
              </td>

              {/* L'étiquette d'abord, les euros en dessous : l'avis, puis le fait. */}
              <td>
                {g.priceLevel ? (
                  <>
                    <span className="choix choix-mini">{e.niveau[g.priceLevel]}</span>
                    {g.price !== null && (
                      <span className="petit grille-euros">
                        {prixLisible(g.price, locale)}
                        {g.priceUnit ? ` / ${e.uniteCourte[g.priceUnit]}` : ''}
                      </span>
                    )}
                  </>
                ) : g.price !== null ? (
                  <span className="choix choix-mini">
                    {prixLisible(g.price, locale)}
                    {g.priceUnit ? ` / ${e.uniteCourte[g.priceUnit]}` : ''}
                  </span>
                ) : (
                  <Vide locale={locale} />
                )}
              </td>

              <td>
                {g.welcome ? (
                  <span className="choix choix-mini">
                    <span aria-hidden="true">{VISAGES[g.welcome]} </span>
                    {e.welcome[g.welcome]}
                  </span>
                ) : (
                  <Vide locale={locale} />
                )}
              </td>

              <td>
                <span className="grille-bonus">
                  {g.bonus.length} <span aria-hidden="true">/ 7</span>
                  <span className="sr-only">{d.classement.surSept}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
