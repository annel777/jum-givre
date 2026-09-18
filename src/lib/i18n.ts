import type { BonusKey, Locale, Size, Unite, Welcome } from './types';

export const LOCALES: Locale[] = ['fr', 'en'];

/** Les pages du site, avec leur adresse dans chaque langue. */
export const ROUTES = {
  home: { fr: '/', en: '/en/' },
  fiche: { fr: '/glaciers/', en: '/en/ice-cream/' },
  ranking: { fr: '/classement/', en: '/en/ranking/' },
  method: { fr: '/notre-methode/', en: '/en/our-method/' },
  about: { fr: '/qui-sommes-nous/', en: '/en/about/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function chemin(key: RouteKey, locale: Locale, slug?: string): string {
  return slug ? `${ROUTES[key][locale]}${slug}/` : ROUTES[key][locale];
}

export function autreLangue(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr';
}

export const SITE = {
  domaine: 'https://jumeauxgivres.fr',
  // L'adresse de contact est gardée en deux morceaux : recollée en clair ici,
  // le minifieur l'écrirait entière dans le bundle, où un robot la lirait.
  // Le composant Courriel les rassemble, à l'exécution seulement.
  contactUtilisateur: 'studio',
  contactDomaine: 'leroy.cool',
} as const;

type Dict = {
  marque: string;
  baseline: string;
  descriptionSite: string;
  langue: string;
  versLautreLangue: string;
  nav: Record<RouteKey, string>;
  accueil: {
    titre: string;
    intro: string;
    carteTitre: string;
    carteIntro: string;
    dernieresFiches: string;
    voirClassement: string;
  };
  carte: {
    sansCoords: (n: number) => string;
    vide: string;
    attribution: string;
  };
  fiche: {
    notreNote: string;
    coupDoeil: string;
    gout: string;
    taille: string;
    prix: string;
    prixInconnu: string;
    accueil: string;
    bonusTitre: string;
    parfums: string;
    aime: string;
    pasAime: string;
    topping: string;
    avisJumeaux: string;
    infos: string;
    horaires: string;
    telephone: string;
    siteWeb: string;
    gpsManquant: string;
    verifie: (date: string) => string;
    dateInconnue: string;
    pasEncoreTeste: string;
    sur5: (n: number) => string;
    description: (nom: string, quartier: string, teste: boolean) => string;
    obtenu: string;
    nonObtenu: string;
  };
  classement: {
    titre: string;
    intro: string;
    filtrer: string;
    tous: string;
    prixMax: string;
    jusqua: (prix: string) => string;
    resultats: (n: number) => string;
    aucun: string;
  };
  echelles: {
    size: Record<Size, string>;
    welcome: Record<Welcome, string>;
    unite: Record<Unite, string>;
    uniteCourte: Record<Unite, string>;
    bonus: Record<BonusKey, string>;
  };
  pied: {
    independance: string;
  };
};

const fr: Dict = {
  marque: 'Les Jumeaux Givrés',
  baseline: 'Les glaciers de Cannes, goûtés et notés par les Scoop’ins',
  descriptionSite:
    'Le guide des glaciers de Cannes : boules, cornets, parfums et toppings goûtés et notés par deux jumeaux de 10 ans. Carte, classement et fiches, sans publicité ni partenariat.',
  langue: 'Langue',
  versLautreLangue: 'English',
  nav: {
    home: 'Accueil',
    fiche: 'Glaciers',
    ranking: 'Classement',
    method: 'Notre méthode',
    about: 'Qui sommes-nous',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
  accueil: {
    titre: 'Le guide des glaciers de Cannes',
    intro:
      'Deux jumeaux de 10 ans goûtent les glaciers de Cannes et les notent avec leur propre grille. Les glaces sont payées par la famille, il n’y a aucun partenariat.',
    carteTitre: 'La carte des glaciers',
    carteIntro: 'Les cornets roses sont déjà testés, les bleus attendent leur tour.',
    dernieresFiches: 'Les dernières fiches',
    voirClassement: 'Voir le classement complet',
  },
  carte: {
    sansCoords: (n) =>
      `${n} ${n > 1 ? 'glaciers ne sont pas encore placés' : 'glacier n’est pas encore placé'} sur la carte : coordonnées à relever.`,
    vide: 'Aucun glacier n’est encore placé sur la carte. Les cornets apparaîtront dès que les adresses seront relevées.',
    attribution:
      'Fond de carte &copy; <a href="https://www.openstreetmap.org/copyright">contributeurs OpenStreetMap</a>',
  },
  fiche: {
    notreNote: 'Notre note',
    coupDoeil: 'En un coup d’œil',
    gout: 'Goût',
    taille: 'Taille',
    prix: 'Prix',
    prixInconnu: 'Prix à relever',
    accueil: 'Accueil',
    bonusTitre: 'Points bonus',
    parfums: 'Parfums goûtés',
    aime: 'On a aimé',
    pasAime: 'On n’a pas aimé',
    topping: 'Le topping qu’on a adoré',
    avisJumeaux: 'L’avis des jumeaux',
    infos: 'Infos pratiques',
    horaires: 'Horaires',
    telephone: 'Téléphone',
    siteWeb: 'Site',
    gpsManquant: 'GPS : à renseigner pour le marqueur de la carte',
    verifie: (date) => `Infos vérifiées en ${date}, à confirmer sur place.`,
    dateInconnue: 'Date de visite à renseigner. Les infos sont à confirmer sur place.',
    pasEncoreTeste: 'Ce glacier n’est pas encore testé. Les Scoop’ins y passeront bientôt.',
    sur5: (n) => `${n.toString().replace('.', ',')} boules sur 5`,
    description: (nom, quartier, teste) =>
      teste
        ? `${nom}, glacier à Cannes (${quartier}) : notre note sur le goût, la taille des boules, le prix d’une boule, les parfums goûtés et le topping qu’on a adoré.`
        : `${nom}, glacier à Cannes (${quartier}) : pas encore goûté par les Scoop’ins. Adresse, horaires et place sur la carte des glaciers de Cannes.`,
    obtenu: 'Obtenu : ',
    nonObtenu: 'Non obtenu : ',
  },
  classement: {
    titre: 'Le classement',
    intro:
      'Tous les glaciers testés, du plus au moins aimé. Le classement additionne le goût, sur 5, et les points bonus, sur 7.',
    filtrer: 'Filtrer',
    tous: 'Tous',
    prixMax: 'Prix maximum',
    jusqua: (prix) => `Jusqu'à ${prix}`,
    resultats: (n) => `${n} ${n > 1 ? 'glaciers' : 'glacier'}`,
    aucun: 'Aucun glacier ne correspond à ce filtre.',
  },
  echelles: {
    size: { mini: 'Mini', normale: 'Normale', geante: 'Géante' },
    welcome: { bof: 'Bof', sympa: 'Sympa', super: 'Super' },
    unite: { boule: 'la boule', pot: 'le pot', cornet: 'le cornet' },
    uniteCourte: { boule: 'boule', pot: 'pot', cornet: 'cornet' },
    bonus: {
      'bien-place': 'Bien placé',
      terrasse: 'Terrasse',
      deco: 'Déco et univers',
      choix: 'Beaucoup de parfums',
      originaux: 'Parfums originaux',
      gouter: 'On peut goûter avant',
      light: 'Options light, vegan, sans sucre',
    },
  },
  pied: {
    independance: 'Glaces payées par la famille, aucun partenariat.',
  },
};

const en: Dict = {
  marque: 'The Frozen Twins',
  baseline: 'The ice cream shops of Cannes, tasted and rated by the Scoop’ins',
  descriptionSite:
    'A guide to the ice cream shops of Cannes: scoops, cones, flavours and toppings tasted and rated by two ten-year-old twins. Map, ranking and reviews, with no ads and no partnerships.',
  langue: 'Language',
  versLautreLangue: 'Français',
  nav: {
    home: 'Home',
    fiche: 'Ice cream shops',
    ranking: 'Ranking',
    method: 'Our method',
    about: 'About',
    legal: 'Legal notice',
    privacy: 'Privacy',
  },
  accueil: {
    titre: 'A guide to the ice cream shops of Cannes',
    intro:
      'Two ten-year-old twins taste the ice cream shops of Cannes and rate them with their own scale. The family pays for every scoop, and there are no partnerships.',
    carteTitre: 'The map',
    carteIntro: 'Pink cones are already tasted, blue ones are still waiting.',
    dernieresFiches: 'Latest reviews',
    voirClassement: 'See the full ranking',
  },
  carte: {
    sansCoords: (n) =>
      `${n} ${n > 1 ? 'shops are' : 'shop is'} not on the map yet: coordinates still to be recorded.`,
    vide: 'No shop is on the map yet. The cones will appear as soon as the addresses are recorded.',
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  },
  fiche: {
    notreNote: 'Our rating',
    coupDoeil: 'At a glance',
    gout: 'Taste',
    taille: 'Size',
    prix: 'Price',
    prixInconnu: 'Price still to be recorded',
    accueil: 'Welcome',
    bonusTitre: 'Bonus points',
    parfums: 'Flavours tasted',
    aime: 'What we liked',
    pasAime: 'What we did not like',
    topping: 'The topping we loved',
    avisJumeaux: 'What the twins say',
    infos: 'Practical information',
    horaires: 'Opening hours',
    telephone: 'Phone',
    siteWeb: 'Website',
    gpsManquant: 'GPS: still to be recorded for the map marker',
    verifie: (date) => `Checked in ${date}, please confirm on site.`,
    dateInconnue: 'Visit date still to be recorded. Please confirm the details on site.',
    pasEncoreTeste: 'This shop has not been tasted yet. The Scoop’ins will drop by soon.',
    sur5: (n) => `${n} scoops out of 5`,
    description: (nom, quartier, teste) =>
      teste
        ? `${nom}, ice cream shop in Cannes (${quartier}): our taste rating, scoop size, price per scoop, the flavours we tried and the topping we loved.`
        : `${nom}, ice cream shop in Cannes (${quartier}): not tasted yet by the Scoop’ins. Address, opening hours and its place on the Cannes ice cream map.`,
    obtenu: 'Earned: ',
    nonObtenu: 'Not earned: ',
  },
  classement: {
    titre: 'The ranking',
    intro:
      'Every shop we tasted, from most to least loved. The ranking adds taste, out of 5, and bonus points, out of 7.',
    filtrer: 'Filter',
    tous: 'All',
    prixMax: 'Maximum price',
    jusqua: (prix) => `Up to ${prix}`,
    resultats: (n) => `${n} ${n > 1 ? 'shops' : 'shop'}`,
    aucun: 'No shop matches this filter.',
  },
  echelles: {
    size: { mini: 'Small', normale: 'Regular', geante: 'Giant' },
    welcome: { bof: 'Meh', sympa: 'Nice', super: 'Great' },
    unite: { boule: 'one scoop', pot: 'one cup', cornet: 'one cone' },
    uniteCourte: { boule: 'scoop', pot: 'cup', cornet: 'cone' },
    bonus: {
      'bien-place': 'Good spot',
      terrasse: 'Terrace',
      deco: 'Decor and atmosphere',
      choix: 'Lots of flavours',
      originaux: 'Unusual flavours',
      gouter: 'You can taste first',
      light: 'Light, vegan, sugar-free options',
    },
  },
  pied: {
    independance: 'Every scoop paid for by the family, no partnerships.',
  },
};

const DICTS: Record<Locale, Dict> = { fr, en };

export function t(locale: Locale): Dict {
  return DICTS[locale];
}

/** Affiche 3.5 comme « 3,50 € » ou « €3.50 ». */
export function prixLisible(euros: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros);
}

/** Affiche « +33497067261 » comme « 04 97 06 72 61 ». Le lien tel: garde le format international. */
export function telephoneLisible(e164: string): string {
  const fr = e164.match(/^\+33(\d{9})$/);
  if (!fr) return e164;
  return `0${fr[1]}`.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

/** Affiche « 2026-09 » comme « septembre 2026 » ou « September 2026 ». */
export function moisLisible(iso: string, locale: Locale): string {
  const [annee, mois] = iso.split('-');
  const d = new Date(Number(annee), Number(mois) - 1, 1);
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(d);
}
