import fs from 'node:fs';
import path from 'node:path';

import type { Glacier } from './types';

const DOSSIER = path.join(process.cwd(), 'content', 'glaciers');

/**
 * Ajouter un glacier = déposer un fichier JSON dans content/glaciers/.
 * Rien d'autre à toucher : les pages, la carte et le classement le reprennent au build.
 */
export function tousLesGlaciers(): Glacier[] {
  const fichiers = fs.readdirSync(DOSSIER).filter((f) => f.endsWith('.json'));

  return fichiers
    .map((f) => JSON.parse(fs.readFileSync(path.join(DOSSIER, f), 'utf-8')) as Glacier)
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

/** Les glaciers dont la fiche est complète, les mieux notés d'abord. */
export function glaciersTestes(): Glacier[] {
  return tousLesGlaciers()
    .filter((g) => g.status === 'teste')
    .sort((a, b) => scoreTotal(b) - scoreTotal(a));
}

export function glacierParSlug(slug: string): Glacier | undefined {
  return tousLesGlaciers().find((g) => g.slug === slug);
}

/**
 * Le score sert uniquement à ordonner le classement : le goût sur 5,
 * plus les points bonus sur 7. Il n'est jamais affiché comme une note.
 */
export function scoreTotal(g: Glacier): number {
  return (g.taste ?? 0) + g.bonus.length;
}
