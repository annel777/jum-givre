import { NextResponse } from 'next/server';

import { COOKIE, motDePasseValide, nouveauJeton } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(requete: Request) {
  let motDePasse = '';
  try {
    ({ motDePasse } = (await requete.json()) as { motDePasse: string });
  } catch {
    return NextResponse.json({ erreur: 'Requête illisible' }, { status: 400 });
  }

  // Une réponse lente uniformise le temps de réponse, bon ou mauvais mot de passe.
  await new Promise((r) => setTimeout(r, 400));

  if (!motDePasse || !motDePasseValide(motDePasse)) {
    return NextResponse.json({ erreur: 'Mot de passe incorrect' }, { status: 401 });
  }

  const { valeur, expireDans } = nouveauJeton();
  const reponse = NextResponse.json({ ok: true });

  reponse.cookies.set(COOKIE, valeur, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: expireDans,
  });

  return reponse;
}

export async function DELETE() {
  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set(COOKIE, '', { path: '/', maxAge: 0 });
  return reponse;
}
