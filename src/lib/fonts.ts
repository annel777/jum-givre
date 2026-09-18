import { Figtree, Shrikhand } from 'next/font/google';

/**
 * Polices auto-hébergées par next/font : elles sont téléchargées au build et
 * servies depuis notre domaine. Aucune requête des visiteurs vers Google,
 * donc aucune adresse IP transmise (voir les mentions de confidentialité).
 */
export const policeTitre = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--police-titre',
});

export const policeTexte = Figtree({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--police-texte',
});
