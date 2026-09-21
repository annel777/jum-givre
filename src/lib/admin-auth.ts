import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Authentification de l'espace de saisie.
 *
 * Le mot de passe vit dans une variable d'environnement Vercel, jamais préfixée
 * NEXT_PUBLIC_ : il ne quitte donc jamais le serveur. Le navigateur ne reçoit
 * qu'un jeton signé, qui ne permet pas de le retrouver.
 */

export const COOKIE = 'jg_admin';
const DUREE_HEURES = 12;

function motDePasse(): string {
  const mdp = process.env.ADMIN_PASSWORD;
  if (!mdp) throw new Error('ADMIN_PASSWORD manquant dans les variables d’environnement');
  return mdp;
}

/** Comparaison à durée constante : une comparaison naïve fuit le mot de passe. */
export function motDePasseValide(propose: string): boolean {
  const attendu = Buffer.from(motDePasse(), 'utf8');
  const recu = Buffer.from(propose, 'utf8');
  // timingSafeEqual exige des longueurs égales : on compare des empreintes.
  const empreinte = (b: Buffer) => createHmac('sha256', 'longueur').update(b).digest();
  return timingSafeEqual(empreinte(attendu), empreinte(recu));
}

function signer(expiration: number): string {
  return createHmac('sha256', motDePasse()).update(String(expiration)).digest('hex');
}

export function nouveauJeton(): { valeur: string; expireDans: number } {
  const expiration = Date.now() + DUREE_HEURES * 3600 * 1000;
  return { valeur: `${expiration}.${signer(expiration)}`, expireDans: DUREE_HEURES * 3600 };
}

export function jetonValide(jeton: string | undefined): boolean {
  if (!jeton) return false;
  const [expiration, signature] = jeton.split('.');
  if (!expiration || !signature) return false;
  if (Number(expiration) < Date.now()) return false;

  const attendue = Buffer.from(signer(Number(expiration)), 'hex');
  const recue = Buffer.from(signature, 'hex');
  return attendue.length === recue.length && timingSafeEqual(attendue, recue);
}

/** À appeler en tête de chaque route qui écrit. */
export async function sessionOuverte(): Promise<boolean> {
  const jeton = (await cookies()).get(COOKIE)?.value;
  return jetonValide(jeton);
}
