export type Locale = 'fr' | 'en';

export type Size = 'mini' | 'normale' | 'geante';
export type Welcome = 'bof' | 'sympa' | 'super';

/** L'étiquette prix du brief : une appréciation à trois crans, comme la taille et l'accueil. */
export type Niveau = 'pas-cher' | 'norme' | 'cher';

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
  /** L'année d'ouverture, quand le glacier l'affiche. Un fait, pas un argument. */
  since: number | null;
  /** Ce qui ne rentre dans aucune case : une spécialité, un détail utile sur place. */
  note: Bilingue;
  /** « teste » : la fiche est complète. « a-tester » : le glacier n'apparaît que sur la carte. */
  status: 'teste' | 'a-tester';
  /** Mois de la visite, au format AAAA-MM. */
  visitDate: string | null;
  area: Bilingue;
  /** La seule note chiffrée : le goût, de 1 à 5, demi-boules autorisées. */
  taste: number | null;
  size: Size | null;
  /** L'étiquette prix : pas cher, dans la norme, cher. L'appréciation. */
  priceLevel: Niveau | null;
  /** Le prix d'une unité, en euros. Le fait relevé en vitrine, qui justifie l'étiquette. */
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
