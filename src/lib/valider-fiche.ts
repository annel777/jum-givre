import { BONUS_KEYS, type Glacier } from './types';

const TAILLES = ['mini', 'normale', 'geante'];
const ACCUEILS = ['bof', 'sympa', 'super'];
const UNITES = ['boule', 'pot', 'cornet'];
const STATUTS = ['teste', 'a-tester'];

/**
 * Le formulaire est la seule porte d'entrée, mais une fiche mal formée
 * casserait le build du site entier. On revalide donc côté serveur.
 */
export function validerFiche(brut: unknown): { fiche: Glacier } | { erreurs: string[] } {
  const erreurs: string[] = [];
  const d = brut as Record<string, unknown>;

  const texte = (cle: string, obligatoire = true) => {
    const v = d[cle];
    if (typeof v !== 'string' || (obligatoire && !v.trim())) {
      erreurs.push(`${cle} : texte attendu`);
      return '';
    }
    return v.trim();
  };

  const choix = (cle: string, parmi: string[]) => {
    const v = d[cle];
    if (v === null || v === undefined || v === '') return null;
    if (typeof v !== 'string' || !parmi.includes(v)) {
      erreurs.push(`${cle} : attendu ${parmi.join(', ')} ou vide`);
      return null;
    }
    return v;
  };

  const bilingue = (cle: string) => {
    const v = d[cle] as Record<string, unknown> | undefined;
    if (!v || typeof v !== 'object') {
      erreurs.push(`${cle} : objet fr et en attendu`);
      return { fr: '', en: '' };
    }
    return { fr: String(v.fr ?? ''), en: String(v.en ?? '') };
  };

  const listeBilingue = (cle: string) => {
    const v = d[cle] as Record<string, unknown> | undefined;
    const liste = (x: unknown) =>
      Array.isArray(x) ? x.map(String).map((s) => s.trim()).filter(Boolean) : [];
    if (!v || typeof v !== 'object') {
      erreurs.push(`${cle} : objet fr et en attendu`);
      return { fr: [], en: [] };
    }
    return { fr: liste(v.fr), en: liste(v.en) };
  };

  const slug = texte('slug');
  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    erreurs.push('slug : minuscules, chiffres et tirets seulement');
  }

  const note = d.taste;
  let taste: number | null = null;
  if (note !== null && note !== undefined && note !== '') {
    const n = Number(note);
    if (!Number.isFinite(n) || n < 1 || n > 5 || (n * 2) % 1 !== 0) {
      erreurs.push('taste : de 1 à 5, par demi-points');
    } else {
      taste = n;
    }
  }

  const prix = d.price;
  let price: number | null = null;
  if (prix !== null && prix !== undefined && prix !== '') {
    const n = Number(prix);
    if (!Number.isFinite(n) || n <= 0 || n > 100) {
      erreurs.push('price : un prix en euros, supérieur à 0');
    } else {
      price = Math.round(n * 100) / 100;
    }
  }

  const bonusBrut = Array.isArray(d.bonus) ? d.bonus.map(String) : [];
  const inconnus = bonusBrut.filter((b) => !BONUS_KEYS.includes(b as never));
  if (inconnus.length) erreurs.push(`bonus inconnus : ${inconnus.join(', ')}`);

  const coordsBrut = d.coords;
  let coords: [number, number] | null = null;
  if (Array.isArray(coordsBrut) && coordsBrut.length === 2) {
    const [lat, lon] = coordsBrut.map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      erreurs.push('coords : deux nombres attendus');
    } else if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      erreurs.push('coords : latitude et longitude hors limites');
    } else {
      coords = [lat, lon];
    }
  } else if (coordsBrut !== null && coordsBrut !== undefined) {
    erreurs.push('coords : [latitude, longitude] ou null');
  }

  const visite = d.visitDate;
  if (visite && !/^\d{4}-\d{2}$/.test(String(visite))) {
    erreurs.push('visitDate : format AAAA-MM');
  }

  const jumeaux = Array.isArray(d.twins) ? d.twins : [];
  const twins = jumeaux.map((j) => {
    const t = j as Record<string, unknown>;
    return { nick: String(t.nick ?? ''), fr: String(t.fr ?? ''), en: String(t.en ?? '') };
  });

  if (erreurs.length) return { erreurs };

  return {
    fiche: {
      slug,
      name: texte('name'),
      status: (choix('status', STATUTS) ?? 'a-tester') as Glacier['status'],
      visitDate: visite ? String(visite) : null,
      area: bilingue('area'),
      taste,
      size: choix('size', TAILLES) as Glacier['size'],
      price,
      priceUnit: choix('priceUnit', UNITES) as Glacier['priceUnit'],
      welcome: choix('welcome', ACCUEILS) as Glacier['welcome'],
      bonus: bonusBrut as Glacier['bonus'],
      flavours: listeBilingue('flavours'),
      liked: listeBilingue('liked'),
      disliked: listeBilingue('disliked'),
      topping: bilingue('topping'),
      twins,
      address: texte('address'),
      coords,
      hours: bilingue('hours'),
      phone: (d.phone ? String(d.phone).trim() : null) || null,
      website: (d.website ? String(d.website).trim() : null) || null,
    },
  };
}
