export const COULEUR_TESTE = '#FF8AAE';
export const COULEUR_A_TESTER = '#9ADCFF';

const CONTOUR = '#063E6B';
const GAUFRE = '#FFF89A';
const GAUFRE_TRAIT = '#D9A441';

/**
 * Le cornet de glace : marqueur de carte, favicon, puce de lieu.
 * Sa pointe est en bas au centre du viewBox, pour se poser sur l'adresse exacte.
 */
function traces(couleurBoule: string, ombre: boolean): string {
  return `
    ${ombre ? '<ellipse cx="20" cy="49" rx="7" ry="2.4" fill="#063E6B" opacity="0.22"/>' : ''}
    <path d="M11 24h18l-9 25z" fill="${GAUFRE}" stroke="${CONTOUR}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M14.2 30h11.6M16.4 37h7.2" stroke="${GAUFRE_TRAIT}" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="20" cy="16.5" r="11" fill="${couleurBoule}" stroke="${CONTOUR}" stroke-width="2.5"/>
    <ellipse cx="16" cy="12.5" rx="3.6" ry="2.6" fill="#FFFFFF" opacity="0.55" transform="rotate(-25 16 12.5)"/>
  `;
}

/** Version chaîne, pour le divIcon de Leaflet, qui ne prend que du HTML. */
export function coneSvg(couleurBoule: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" width="40" height="52" aria-hidden="true">${traces(
    couleurBoule,
    true,
  )}</svg>`;
}

export const CONE_TAILLE: [number, number] = [40, 52];
/** La pointe du cornet, en bas au centre : c'est elle qui vise l'adresse. */
export const CONE_POINTE: [number, number] = [20, 49];

export function Cone({
  taille = 22,
  couleur = COULEUR_TESTE,
  ombre = false,
}: {
  taille?: number;
  couleur?: string;
  ombre?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 40 52"
      width={taille}
      height={(taille * 52) / 40}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: traces(couleur, ombre) }}
    />
  );
}
