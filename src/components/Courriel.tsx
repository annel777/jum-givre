'use client';

import { useSyncExternalStore } from 'react';

import { SITE } from '@/lib/i18n';

const NE_CHANGE_JAMAIS = () => () => {};

/** Recollée par un join, que le minifieur n'évalue pas, et jamais au build. */
function adresse(): string {
  return [SITE.contactUtilisateur, SITE.contactDomaine].join('@');
}

/**
 * L'adresse de contact, jamais écrite en entier dans les fichiers servis.
 *
 * Le HTML statique — celui que lisent les robots collecteurs d'adresses —
 * ne contient que la forme épelée. Le lien cliquable n'apparaît qu'une fois
 * la page hydratée. Sans JavaScript, l'adresse reste lisible à l'écran.
 */
export function Courriel() {
  const hydrate = useSyncExternalStore(
    NE_CHANGE_JAMAIS,
    () => true,
    () => false,
  );

  if (!hydrate) {
    return (
      <span>
        {SITE.contactUtilisateur} [arobase] {SITE.contactDomaine.replace('.', ' [point] ')}
      </span>
    );
  }

  return <a href={`mailto:${adresse()}`}>{adresse()}</a>;
}
