'use client';

import type { EtatJeton } from '@/lib/depot';

const LIEN_JETON = 'https://github.com/settings/personal-access-tokens/new';

/** « 2027-01-10T13:22:07Z » devient « 10 janvier 2027 ». */
function dateLisible(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function Renouveler() {
  return (
    <>
      {' '}
      <a href={LIEN_JETON} target="_blank" rel="noopener">
        Créer un nouveau jeton
      </a>{' '}
      — accès au seul dépôt <code>annel777/jum-givre</code>, droit{' '}
      <strong>Contents : Read and write</strong> — puis le remplacer dans les variables
      d’environnement Vercel, en Production et en Preview.
    </>
  );
}

/**
 * L'état du jeton GitHub, en tête de l'espace de saisie.
 *
 * Sans jeton valide, enregistrer une fiche échoue. Le signaler avant la saisie
 * évite de perdre les notes d'une visite sur un message d'erreur.
 */
export function EtatJetonGitHub({ etat }: { etat: EtatJeton | { erreur: string } | null }) {
  if (etat === null) return null;

  if ('erreur' in etat) {
    return (
      <p className="bandeau bandeau-alerte">
        <strong>GitHub n’a pas répondu à la vérification du jeton.</strong> {etat.erreur}
      </p>
    );
  }

  if (etat.etat === 'absent') {
    return (
      <p className="bandeau bandeau-alerte">
        <strong>Aucun jeton GitHub n’est configuré.</strong> La variable{' '}
        <code>GITHUB_TOKEN</code> est absente, donc rien ne peut être enregistré.
        <Renouveler />
      </p>
    );
  }

  if (etat.etat === 'refuse') {
    return (
      <p className="bandeau bandeau-alerte">
        <strong>
          GitHub refuse le jeton ({etat.code === 403 ? 'droits retirés' : 'expiré ou révoqué'}).
        </strong>{' '}
        Rien ne peut être enregistré tant qu’il n’est pas remplacé.
        <Renouveler />
      </p>
    );
  }

  // Un jeton sans date : c'est le cas des anciens jetons classiques, sans expiration.
  if (etat.expiration === null || etat.joursRestants === null) {
    return (
      <p className="bandeau">
        Jeton GitHub actif. GitHub n’annonce pas de date d’expiration pour ce jeton.
      </p>
    );
  }

  const { joursRestants: jours, expiration } = etat;

  if (jours <= 0) {
    return (
      <p className="bandeau bandeau-alerte">
        <strong>Le jeton GitHub expire aujourd’hui</strong> ({dateLisible(expiration)}).
        <Renouveler />
      </p>
    );
  }

  if (jours <= 30) {
    return (
      <p className={`bandeau ${jours <= 7 ? 'bandeau-alerte' : 'bandeau-attention'}`}>
        <strong>
          Le jeton GitHub expire dans {jours} {jours > 1 ? 'jours' : 'jour'}
        </strong>{' '}
        — le {dateLisible(expiration)}. Passé cette date, l’espace de saisie ne pourra plus rien
        enregistrer.
        <Renouveler />
      </p>
    );
  }

  return (
    <p className="bandeau">
      Jeton GitHub valable jusqu’au {dateLisible(expiration)}, soit encore {jours} jours.
    </p>
  );
}
