export type Locale = 'fr' | 'en';

export type Size = 'mini' | 'normale' | 'geante';
export type Welcome = 'bof' | 'sympa' | 'super';

/** Ce qu'on achète : tous les glaciers ne vendent pas à la boule. */
export type Unite = 'boule' | 'pot' | 'cornet';

/** Les 7 points bonus du brief, 1 point chacun. */
export const BONUS_KEYS = [
  'bien-place',
  'terrasse',
  'deco',
  'choix',
  'originaux',
  'gouter',
  'light',
] as const;

export type BonusKey = (typeof BONUS_KEYS)[number];

type Bilingue = { fr: string; en: string };
type BilingueListe = { fr: string[]; en: string[] };

export type AvisJumeau = { nick: string; fr: string; en: string };

export type Glacier = {
  slug: string;
  name: string;
  /** « teste » : la fiche est complète. « a-tester » : le glacier n'apparaît que sur la carte. */
  status: 'teste' | 'a-tester';
  /** Mois de la visite, au format AAAA-MM. */
  visitDate: string | null;
  area: Bilingue;
  /** La seule note chiffrée : le goût, de 1 à 5, demi-boules autorisées. */
  taste: number | null;
  size: Size | null;
  /** Le prix d'une unité, en euros. Un fait relevé sur place, jamais une appréciation. */
  price: number | null;
  /** L'unité vendue, qui change d'un glacier à l'autre : boule, pot ou cornet. */
  priceUnit: Unite | null;
  welcome: Welcome | null;
  bonus: BonusKey[];
  flavours: BilingueListe;
  liked: BilingueListe;
  disliked: BilingueListe;
  topping: Bilingue;
  twins: AvisJumeau[];
  address: string;
  /** [latitude, longitude]. null tant que les coordonnées ne sont pas relevées. */
  coords: [number, number] | null;
  hours: Bilingue;
  phone: string | null;
  website: string | null;
};
