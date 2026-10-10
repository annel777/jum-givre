'use client';

import { useState } from 'react';

import { t } from '@/lib/i18n';
import { BONUS_KEYS, type BonusKey, type Glacier } from '@/lib/types';

const d = t('fr');

/** Les en-têtes des 7 colonnes bonus : court dans le tableau, entier pour l'oreille. */
const BONUS_COURT: Record<BonusKey, string> = {
  'bien-place': 'Placé',
  terrasse: 'Terrasse',
  deco: 'Déco',
  choix: 'Choix',
  originaux: 'Origin.',
  gouter: 'Goûter',
  light: 'Light',
};

const NOTES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

/**
 * La grille de qualification, éditable.
 *
 * Le formulaire complet reste nécessaire pour les textes — parfums, avis des
 * jumeaux, adresse. Mais la notation, elle, se fait d'un glacier à l'autre :
 * une ligne par glacier, une colonne par critère du brief, et on compare en
 * saisissant. Chaque ligne s'enregistre seule, donc un commit par glacier.
 *
 * Les fiches viennent du parent, qui les lit une fois à la connexion : ici on
 * ne garde que le tampon des modifications en attente, qui est bien de l'état
 * d'interface.
 */
export function GrilleAdmin({
  fiches,
  onEditer,
  onEnregistree,
}: {
  fiches: Glacier[];
  onEditer: (fiche: Glacier) => void;
  onEnregistree: (fiche: Glacier) => void;
}) {
  const [modifiees, setModifiees] = useState<Record<string, Glacier>>({});
  const [occupe, setOccupe] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<string[]>([]);

  /** L'état affiché d'une ligne : la version modifiée si elle existe, sinon celle du dépôt. */
  const etat = (f: Glacier) => modifiees[f.slug] ?? f;

  function maj<C extends keyof Glacier>(f: Glacier, cle: C, valeur: Glacier[C]) {
    setMessage(null);
    setModifiees((m) => ({ ...m, [f.slug]: { ...etat(f), [cle]: valeur } }));
  }

  function basculeBonus(f: Glacier, key: BonusKey) {
    const actuels = etat(f).bonus;
    maj(f, 'bonus', actuels.includes(key) ? actuels.filter((b) => b !== key) : [...actuels, key]);
  }

  function oublier(slug: string) {
    setModifiees((m) => {
      const reste = { ...m };
      delete reste[slug];
      return reste;
    });
  }

  async function enregistrer(slug: string) {
    const fiche = modifiees[slug];
    if (!fiche) return;

    setOccupe(slug);
    setMessage(null);
    setErreurs([]);

    const r = await fetch('/api/admin/glacier/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fiche),
    });
    setOccupe(null);

    const corps = (await r.json()) as { erreurs?: string[]; erreur?: string };
    if (!r.ok) {
      setErreurs(corps.erreurs ?? [corps.erreur ?? 'Enregistrement refusé']);
      return;
    }

    // Le dépôt porte maintenant cette version : la ligne n'est plus en attente.
    onEnregistree(fiche);
    oublier(slug);
    setMessage(`${fiche.name} enregistré. Le site se reconstruit, comptez une minute.`);
  }

  const enAttente = Object.keys(modifiees).length;

  return (
    <>
      <p className="petit">
        Une ligne par glacier, une colonne par critère. Les textes — parfums, avis des jumeaux,
        adresse — se saisissent dans le formulaire plus bas, en cliquant sur un nom.
      </p>

      {message && <p className="saisie-ok">{message}</p>}
      {erreurs.length > 0 && (
        <ul className="saisie-erreur">
          {erreurs.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <div
        className="grille-boite grille-admin-boite"
        role="region"
        aria-label="Grille de qualification"
        tabIndex={0}
      >
        <table className="grille grille-admin">
          <thead>
            <tr>
              <th scope="col">Glacier</th>
              <th scope="col">Statut</th>
              <th scope="col">{d.fiche.gout}</th>
              <th scope="col">{d.fiche.taille}</th>
              <th scope="col">{d.fiche.prix}</th>
              <th scope="col">Euros</th>
              <th scope="col">Unité</th>
              <th scope="col">{d.fiche.accueil}</th>
              {BONUS_KEYS.map((b) => (
                <th scope="col" key={b} className="col-bonus">
                  <abbr title={d.echelles.bonus[b]}>{BONUS_COURT[b]}</abbr>
                </th>
              ))}
              <th scope="col">
                <span className="sr-only">Enregistrer</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {fiches.map((f) => {
              const g = etat(f);
              const sale = modifiees[f.slug] !== undefined;

              return (
                <tr key={f.slug} className={sale ? 'ligne-sale' : undefined}>
                  <th scope="row">
                    <button
                      type="button"
                      className="lien-fiche"
                      onClick={() => onEditer(g)}
                      title="Ouvrir cette fiche dans le formulaire"
                    >
                      {f.name}
                    </button>
                    {sale && <span className="petit">Non enregistré</span>}
                  </th>

                  <td>
                    <label className="sr-only" htmlFor={`statut-${f.slug}`}>
                      Statut de {f.name}
                    </label>
                    <select
                      id={`statut-${f.slug}`}
                      value={g.status}
                      onChange={(e) => maj(f, 'status', e.target.value as Glacier['status'])}
                    >
                      <option value="a-tester">À tester</option>
                      <option value="teste">Testé</option>
                    </select>
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`gout-${f.slug}`}>
                      Goût de {f.name}
                    </label>
                    <select
                      id={`gout-${f.slug}`}
                      value={g.taste ?? ''}
                      onChange={(e) =>
                        maj(f, 'taste', e.target.value === '' ? null : Number(e.target.value))
                      }
                    >
                      <option value="">—</option>
                      {NOTES.map((n) => (
                        <option key={n} value={n}>
                          {n.toString().replace('.', ',')}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`taille-${f.slug}`}>
                      Taille chez {f.name}
                    </label>
                    <select
                      id={`taille-${f.slug}`}
                      value={g.size ?? ''}
                      onChange={(e) => maj(f, 'size', (e.target.value || null) as Glacier['size'])}
                    >
                      <option value="">—</option>
                      <option value="mini">{d.echelles.size.mini}</option>
                      <option value="normale">{d.echelles.size.normale}</option>
                      <option value="geante">{d.echelles.size.geante}</option>
                    </select>
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`niveau-${f.slug}`}>
                      Étiquette prix de {f.name}
                    </label>
                    <select
                      id={`niveau-${f.slug}`}
                      value={g.priceLevel ?? ''}
                      onChange={(e) =>
                        maj(f, 'priceLevel', (e.target.value || null) as Glacier['priceLevel'])
                      }
                    >
                      <option value="">—</option>
                      <option value="pas-cher">{d.echelles.niveau['pas-cher']}</option>
                      <option value="norme">{d.echelles.niveau.norme}</option>
                      <option value="cher">{d.echelles.niveau.cher}</option>
                    </select>
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`prix-${f.slug}`}>
                      Prix en euros chez {f.name}
                    </label>
                    <input
                      id={`prix-${f.slug}`}
                      className="champ-prix"
                      type="number"
                      min={0}
                      step={0.1}
                      inputMode="decimal"
                      value={g.price ?? ''}
                      onChange={(e) =>
                        maj(f, 'price', e.target.value === '' ? null : Number(e.target.value))
                      }
                    />
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`unite-${f.slug}`}>
                      Ce que ce prix achète chez {f.name}
                    </label>
                    <select
                      id={`unite-${f.slug}`}
                      value={g.priceUnit ?? ''}
                      onChange={(e) =>
                        maj(f, 'priceUnit', (e.target.value || null) as Glacier['priceUnit'])
                      }
                    >
                      <option value="">—</option>
                      <option value="boule">boule</option>
                      <option value="pot">pot</option>
                      <option value="cornet">cornet</option>
                    </select>
                  </td>

                  <td>
                    <label className="sr-only" htmlFor={`accueil-${f.slug}`}>
                      Accueil chez {f.name}
                    </label>
                    <select
                      id={`accueil-${f.slug}`}
                      value={g.welcome ?? ''}
                      onChange={(e) =>
                        maj(f, 'welcome', (e.target.value || null) as Glacier['welcome'])
                      }
                    >
                      <option value="">—</option>
                      <option value="bof">{d.echelles.welcome.bof}</option>
                      <option value="sympa">{d.echelles.welcome.sympa}</option>
                      <option value="super">{d.echelles.welcome.super}</option>
                    </select>
                  </td>

                  {BONUS_KEYS.map((b) => (
                    <td key={b} className="col-bonus">
                      <label className="sr-only" htmlFor={`${b}-${f.slug}`}>
                        {d.echelles.bonus[b]} chez {f.name}
                      </label>
                      <input
                        id={`${b}-${f.slug}`}
                        type="checkbox"
                        checked={g.bonus.includes(b)}
                        onChange={() => basculeBonus(f, b)}
                      />
                    </td>
                  ))}

                  <td>
                    <button
                      type="button"
                      className="filtre"
                      disabled={!sale || occupe !== null}
                      onClick={() => void enregistrer(f.slug)}
                    >
                      {occupe === f.slug ? 'Envoi…' : 'Enregistrer'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="petit" aria-live="polite">
        {enAttente === 0
          ? 'Tout est enregistré.'
          : `${enAttente} ${enAttente > 1 ? 'lignes' : 'ligne'} à enregistrer.`}
      </p>
    </>
  );
}
