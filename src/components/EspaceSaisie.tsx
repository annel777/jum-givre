'use client';

import { useCallback, useState } from 'react';

import { BONUS_KEYS, type Glacier } from '@/lib/types';
import { t } from '@/lib/i18n';

const d = t('fr');

const VIDE: Glacier = {
  slug: '',
  name: '',
  status: 'a-tester',
  visitDate: null,
  area: { fr: '', en: '' },
  taste: null,
  size: null,
  price: null,
  priceUnit: null,
  welcome: null,
  bonus: [],
  flavours: { fr: [], en: [] },
  liked: { fr: [], en: [] },
  disliked: { fr: [], en: [] },
  topping: { fr: '', en: '' },
  twins: [
    { nick: 'Scoop’in n°1', fr: '', en: '' },
    { nick: 'Scoop’in n°2', fr: '', en: '' },
  ],
  address: '',
  coords: null,
  hours: { fr: '', en: '' },
  phone: null,
  website: null,
};

const lignes = (v: string[]) => v.join('\n');
const versListe = (v: string) => v.split('\n').map((s) => s.trim()).filter(Boolean);

export function EspaceSaisie() {
  const [connecte, setConnecte] = useState(false);
  const [motDePasse, setMotDePasse] = useState('');
  const [slugs, setSlugs] = useState<string[]>([]);
  const [fiche, setFiche] = useState<Glacier>(VIDE);
  const [message, setMessage] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<string[]>([]);
  const [occupe, setOccupe] = useState(false);

  const majliste = useCallback(async () => {
    const r = await fetch('/api/admin/glacier/');
    if (r.ok) setSlugs(((await r.json()) as { slugs: string[] }).slugs);
  }, []);

  async function connexion(e: React.FormEvent) {
    e.preventDefault();
    setOccupe(true);
    setErreurs([]);
    const r = await fetch('/api/admin/session/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motDePasse }),
    });
    setOccupe(false);
    if (r.ok) {
      setConnecte(true);
      setMotDePasse('');
      void majliste();
    } else {
      setErreurs([((await r.json()) as { erreur: string }).erreur]);
    }
  }

  async function charger(slug: string) {
    setMessage(null);
    setErreurs([]);
    if (!slug) return setFiche(VIDE);

    const r = await fetch(`/api/admin/glacier/?slug=${encodeURIComponent(slug)}`);
    if (r.ok) setFiche(((await r.json()) as { fiche: Glacier }).fiche);
    else setErreurs(['Fiche illisible']);
  }

  async function enregistrer(e: React.FormEvent) {
    e.preventDefault();
    setOccupe(true);
    setMessage(null);
    setErreurs([]);

    const r = await fetch('/api/admin/glacier/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fiche),
    });
    setOccupe(false);

    const corps = (await r.json()) as { erreurs?: string[]; erreur?: string; commit?: string };
    if (r.ok) {
      setMessage(`Enregistré. Le site se reconstruit, comptez une minute.`);
      void majliste();
    } else {
      setErreurs(corps.erreurs ?? [corps.erreur ?? 'Enregistrement refusé']);
    }
  }

  const maj = <C extends keyof Glacier>(cle: C, valeur: Glacier[C]) =>
    setFiche((f) => ({ ...f, [cle]: valeur }));

  if (!connecte) {
    return (
      <form className="prose saisie" onSubmit={connexion}>
        <h2>Espace de saisie</h2>
        <label htmlFor="mdp">Mot de passe</label>
        <input
          id="mdp"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          autoComplete="current-password"
          required
        />
        {erreurs.length > 0 && <p className="saisie-erreur">{erreurs[0]}</p>}
        <button className="filtre" type="submit" disabled={occupe}>
          {occupe ? 'Vérification…' : 'Entrer'}
        </button>
      </form>
    );
  }

  return (
    <form className="prose saisie" onSubmit={enregistrer}>
      <h2>Espace de saisie</h2>

      <label htmlFor="choix">Fiche à modifier</label>
      <select id="choix" defaultValue="" onChange={(e) => void charger(e.target.value)}>
        <option value="">Nouvelle fiche</option>
        {slugs.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <h3>Identité</h3>
      <label htmlFor="slug">Slug, dans l’adresse de la fiche</label>
      <input id="slug" value={fiche.slug} onChange={(e) => maj('slug', e.target.value)} required />

      <label htmlFor="name">Nom</label>
      <input id="name" value={fiche.name} onChange={(e) => maj('name', e.target.value)} required />

      <label htmlFor="status">Statut</label>
      <select
        id="status"
        value={fiche.status}
        onChange={(e) => maj('status', e.target.value as Glacier['status'])}
      >
        <option value="a-tester">À tester</option>
        <option value="teste">Testé</option>
      </select>

      <label htmlFor="visite">Mois de la visite</label>
      <input
        id="visite"
        type="month"
        value={fiche.visitDate ?? ''}
        onChange={(e) => maj('visitDate', e.target.value || null)}
      />

      <label htmlFor="area-fr">Quartier, en français</label>
      <input
        id="area-fr"
        value={fiche.area.fr}
        onChange={(e) => maj('area', { ...fiche.area, fr: e.target.value })}
      />
      <label htmlFor="area-en">Quartier, en anglais</label>
      <input
        id="area-en"
        value={fiche.area.en}
        onChange={(e) => maj('area', { ...fiche.area, en: e.target.value })}
      />

      <h3>La note</h3>
      <label htmlFor="taste">Goût, de 1 à 5 par demi-points</label>
      <input
        id="taste"
        type="number"
        min={1}
        max={5}
        step={0.5}
        value={fiche.taste ?? ''}
        onChange={(e) => maj('taste', e.target.value === '' ? null : Number(e.target.value))}
      />

      <label htmlFor="size">Taille</label>
      <select
        id="size"
        value={fiche.size ?? ''}
        onChange={(e) => maj('size', (e.target.value || null) as Glacier['size'])}
      >
        <option value="">—</option>
        <option value="mini">{d.echelles.size.mini}</option>
        <option value="normale">{d.echelles.size.normale}</option>
        <option value="geante">{d.echelles.size.geante}</option>
      </select>

      <label htmlFor="price">Prix, en euros</label>
      <input
        id="price"
        type="number"
        min={0}
        step={0.1}
        value={fiche.price ?? ''}
        onChange={(e) => maj('price', e.target.value === '' ? null : Number(e.target.value))}
      />

      <label htmlFor="unite">Ce que ce prix achète</label>
      <select
        id="unite"
        value={fiche.priceUnit ?? ''}
        onChange={(e) => maj('priceUnit', (e.target.value || null) as Glacier['priceUnit'])}
      >
        <option value="">—</option>
        <option value="boule">une boule</option>
        <option value="pot">un pot</option>
        <option value="cornet">un cornet</option>
      </select>

      <label htmlFor="welcome">Accueil</label>
      <select
        id="welcome"
        value={fiche.welcome ?? ''}
        onChange={(e) => maj('welcome', (e.target.value || null) as Glacier['welcome'])}
      >
        <option value="">—</option>
        <option value="bof">{d.echelles.welcome.bof}</option>
        <option value="sympa">{d.echelles.welcome.sympa}</option>
        <option value="super">{d.echelles.welcome.super}</option>
      </select>

      <h3>Points bonus</h3>
      <ul className="saisie-bonus">
        {BONUS_KEYS.map((cle) => (
          <li key={cle}>
            <label>
              <input
                type="checkbox"
                checked={fiche.bonus.includes(cle)}
                onChange={(e) =>
                  maj(
                    'bonus',
                    e.target.checked
                      ? [...fiche.bonus, cle]
                      : fiche.bonus.filter((b) => b !== cle),
                  )
                }
              />{' '}
              {d.echelles.bonus[cle]}
            </label>
          </li>
        ))}
      </ul>

      <h3>Ce qu’on en dit</h3>
      {(['flavours', 'liked', 'disliked'] as const).map((cle) => (
        <div key={cle}>
          <label htmlFor={`${cle}-fr`}>
            {cle === 'flavours' ? 'Parfums goûtés' : cle === 'liked' ? 'On a aimé' : 'On n’a pas aimé'}
            , en français, un par ligne
          </label>
          <textarea
            id={`${cle}-fr`}
            rows={3}
            value={lignes(fiche[cle].fr)}
            onChange={(e) => maj(cle, { ...fiche[cle], fr: versListe(e.target.value) })}
          />
          <label htmlFor={`${cle}-en`}>en anglais, un par ligne</label>
          <textarea
            id={`${cle}-en`}
            rows={3}
            value={lignes(fiche[cle].en)}
            onChange={(e) => maj(cle, { ...fiche[cle], en: versListe(e.target.value) })}
          />
        </div>
      ))}

      <label htmlFor="topping-fr">Le topping qu’on a adoré, en français</label>
      <textarea
        id="topping-fr"
        rows={2}
        value={fiche.topping.fr}
        onChange={(e) => maj('topping', { ...fiche.topping, fr: e.target.value })}
      />
      <label htmlFor="topping-en">en anglais</label>
      <textarea
        id="topping-en"
        rows={2}
        value={fiche.topping.en}
        onChange={(e) => maj('topping', { ...fiche.topping, en: e.target.value })}
      />

      <h3>L’avis des jumeaux</h3>
      {fiche.twins.map((jumeau, i) => (
        <div key={i}>
          <label htmlFor={`nick-${i}`}>Surnom</label>
          <input
            id={`nick-${i}`}
            value={jumeau.nick}
            onChange={(e) => {
              const twins = [...fiche.twins];
              twins[i] = { ...jumeau, nick: e.target.value };
              maj('twins', twins);
            }}
          />
          <label htmlFor={`avis-fr-${i}`}>Son avis, en français</label>
          <textarea
            id={`avis-fr-${i}`}
            rows={2}
            value={jumeau.fr}
            onChange={(e) => {
              const twins = [...fiche.twins];
              twins[i] = { ...jumeau, fr: e.target.value };
              maj('twins', twins);
            }}
          />
          <label htmlFor={`avis-en-${i}`}>en anglais</label>
          <textarea
            id={`avis-en-${i}`}
            rows={2}
            value={jumeau.en}
            onChange={(e) => {
              const twins = [...fiche.twins];
              twins[i] = { ...jumeau, en: e.target.value };
              maj('twins', twins);
            }}
          />
        </div>
      ))}

      <h3>Infos pratiques</h3>
      <label htmlFor="address">Adresse</label>
      <input
        id="address"
        value={fiche.address}
        onChange={(e) => maj('address', e.target.value)}
        required
      />

      <label htmlFor="lat">Latitude, par clic droit sur la devanture</label>
      <input
        id="lat"
        type="number"
        step="any"
        value={fiche.coords?.[0] ?? ''}
        onChange={(e) =>
          maj('coords', e.target.value === '' ? null : [Number(e.target.value), fiche.coords?.[1] ?? 0])
        }
      />
      <label htmlFor="lon">Longitude</label>
      <input
        id="lon"
        type="number"
        step="any"
        value={fiche.coords?.[1] ?? ''}
        onChange={(e) =>
          maj('coords', e.target.value === '' ? null : [fiche.coords?.[0] ?? 0, Number(e.target.value)])
        }
      />

      <label htmlFor="hours-fr">Horaires, en français</label>
      <input
        id="hours-fr"
        value={fiche.hours.fr}
        onChange={(e) => maj('hours', { ...fiche.hours, fr: e.target.value })}
      />
      <label htmlFor="hours-en">en anglais</label>
      <input
        id="hours-en"
        value={fiche.hours.en}
        onChange={(e) => maj('hours', { ...fiche.hours, en: e.target.value })}
      />

      <label htmlFor="phone">Téléphone, au format +33…</label>
      <input
        id="phone"
        value={fiche.phone ?? ''}
        onChange={(e) => maj('phone', e.target.value || null)}
      />

      <label htmlFor="website">Site</label>
      <input
        id="website"
        value={fiche.website ?? ''}
        onChange={(e) => maj('website', e.target.value || null)}
      />

      {erreurs.length > 0 && (
        <ul className="saisie-erreur">
          {erreurs.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {message && <p className="encart">{message}</p>}

      <button className="filtre" type="submit" disabled={occupe}>
        {occupe ? 'Enregistrement…' : 'Enregistrer la fiche'}
      </button>
    </form>
  );
}
