/**
 * Le cornet de glace : marqueur de carte, favicon et puce décorative.
 * La pointe du cornet est en bas au centre, pour se poser sur l'adresse exacte.
 */
export function coneSvg(couleurBoule: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 44" width="34" height="44" aria-hidden="true">
    <path d="M9 20h16l-8 22z" fill="#FFD23F" stroke="#063E6B" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="17" cy="14" r="9" fill="${couleurBoule}" stroke="#063E6B" stroke-width="2.5"/>
  </svg>`;
}

export const COULEUR_TESTE = '#FF5C8A';
export const COULEUR_A_TESTER = '#CDEBFA';

export function Cone({ taille = 22, couleur = COULEUR_TESTE }: { taille?: number; couleur?: string }) {
  return (
    <svg
      viewBox="0 0 34 44"
      width={taille}
      height={(taille * 44) / 34}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 20h16l-8 22z" fill="#FFD23F" stroke="#063E6B" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="17" cy="14" r="9" fill={couleur} stroke="#063E6B" strokeWidth="2.5" />
    </svg>
  );
}
