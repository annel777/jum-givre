import { NextResponse } from 'next/server';

import { sessionOuverte } from '@/lib/admin-auth';
import { enregistrerFiche, lireFiche, listerFiches } from '@/lib/depot';
import { validerFiche } from '@/lib/valider-fiche';

export const runtime = 'nodejs';

const refus = () => NextResponse.json({ erreur: 'Session expirée' }, { status: 401 });

export async function GET(requete: Request) {
  if (!(await sessionOuverte())) return refus();

  const slug = new URL(requete.url).searchParams.get('slug');

  try {
    if (!slug) return NextResponse.json({ slugs: await listerFiches() });

    const fiche = await lireFiche(slug);
    if (!fiche) return NextResponse.json({ erreur: 'Fiche introuvable' }, { status: 404 });
    return NextResponse.json({ fiche: fiche.contenu });
  } catch (e) {
    return NextResponse.json({ erreur: (e as Error).message }, { status: 502 });
  }
}

export async function PUT(requete: Request) {
  if (!(await sessionOuverte())) return refus();

  let brut: unknown;
  try {
    brut = await requete.json();
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible' }, { status: 400 });
  }

  const resultat = validerFiche(brut);
  if ('erreurs' in resultat) {
    return NextResponse.json({ erreurs: resultat.erreurs }, { status: 422 });
  }

  try {
    const { commit } = await enregistrerFiche(
      resultat.fiche.slug,
      resultat.fiche,
      resultat.fiche.name,
    );
    return NextResponse.json({ ok: true, commit });
  } catch (e) {
    return NextResponse.json({ erreur: (e as Error).message }, { status: 502 });
  }
}
