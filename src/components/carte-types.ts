export type PointCarte = {
  slug: string;
  name: string;
  teste: boolean;
  coords: [number, number];
  href: string;
};

/** Centre de Cannes, vue par défaut quand aucun point n'est encore placé. */
export const CANNES: [number, number] = [43.5528, 7.0174];
