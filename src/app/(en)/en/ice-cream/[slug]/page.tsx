import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Fiche } from '@/vues/Fiche';
import { glacierParSlug, tousLesGlaciers } from '@/lib/glaciers';
import { metadonnees } from '@/lib/metadata';
import { t } from '@/lib/i18n';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tousLesGlaciers().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const glacier = glacierParSlug(slug);
  if (!glacier) notFound();

  return metadonnees({
    locale: 'en',
    page: 'fiche',
    slug,
    titre: glacier.name,
    description: t('en').fiche.description(
      glacier.name,
      glacier.area['en'],
      glacier.status === 'teste',
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <Fiche locale="en" slug={slug} />;
}
