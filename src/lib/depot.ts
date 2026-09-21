/**
 * Écriture des fiches dans le dépôt GitHub.
 *
 * Le contenu reste dans git : pas de base de données, pas de sauvegarde à
 * gérer, et chaque enregistrement laisse un commit qu'on peut relire ou
 * annuler. Le jeton vit dans une variable d'environnement Vercel.
 */

const DEPOT = 'annel777/jum-givre';
const BRANCHE = 'main';
const API = 'https://api.github.com';

function entetes() {
  const jeton = process.env.GITHUB_TOKEN;
  if (!jeton) throw new Error('GITHUB_TOKEN manquant dans les variables d’environnement');

  return {
    Authorization: `Bearer ${jeton}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

const chemin = (slug: string) => `content/glaciers/${slug}.json`;

/** Le contenu actuel d'une fiche, et son sha, nécessaire pour la remplacer. */
export async function lireFiche(
  slug: string,
): Promise<{ contenu: unknown; sha: string } | null> {
  const r = await fetch(`${API}/repos/${DEPOT}/contents/${chemin(slug)}?ref=${BRANCHE}`, {
    headers: entetes(),
    cache: 'no-store',
  });

  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub a répondu ${r.status} à la lecture de ${slug}`);

  const { content, sha } = (await r.json()) as { content: string; sha: string };
  return { contenu: JSON.parse(Buffer.from(content, 'base64').toString('utf8')), sha };
}

export async function listerFiches(): Promise<string[]> {
  const r = await fetch(`${API}/repos/${DEPOT}/contents/content/glaciers?ref=${BRANCHE}`, {
    headers: entetes(),
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`GitHub a répondu ${r.status} à la liste des fiches`);

  const fichiers = (await r.json()) as { name: string }[];
  return fichiers
    .filter((f) => f.name.endsWith('.json'))
    .map((f) => f.name.replace(/\.json$/, ''))
    .sort();
}

/** Crée ou remplace une fiche. Un commit par enregistrement. */
export async function enregistrerFiche(
  slug: string,
  fiche: unknown,
  nom: string,
): Promise<{ commit: string }> {
  const existante = await lireFiche(slug);

  const r = await fetch(`${API}/repos/${DEPOT}/contents/${chemin(slug)}`, {
    method: 'PUT',
    headers: entetes(),
    body: JSON.stringify({
      branch: BRANCHE,
      message: existante
        ? `Met à jour la fiche ${nom}\n\nSaisi depuis l'espace de saisie du site.`
        : `Ajoute la fiche ${nom}\n\nSaisi depuis l'espace de saisie du site.`,
      content: Buffer.from(`${JSON.stringify(fiche, null, 2)}\n`, 'utf8').toString('base64'),
      ...(existante ? { sha: existante.sha } : {}),
    }),
  });

  if (!r.ok) {
    throw new Error(`GitHub a refusé l’enregistrement (${r.status}) : ${await r.text()}`);
  }

  const { commit } = (await r.json()) as { commit: { sha: string } };
  return { commit: commit.sha };
}
