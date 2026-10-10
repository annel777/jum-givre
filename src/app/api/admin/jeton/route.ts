import { NextResponse } from 'next/server';

import { sessionOuverte } from '@/lib/admin-auth';
import { etatJeton } from '@/lib/depot';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await sessionOuverte())) {
    return NextResponse.json({ erreur: 'Session expirée' }, { status: 401 });
  }

  try {
    return NextResponse.json(await etatJeton());
  } catch (e) {
    return NextResponse.json({ erreur: (e as Error).message }, { status: 502 });
  }
}
