import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageArticle } from '@/vues/PageArticle';
import { articleParSlug, slugsArticles } from '@/lib/articles';
import { metadonnees } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return slugsArticles().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug, 'fr');
  if (!article) notFound();

  return metadonnees({
    locale: 'fr',
    page: 'articles',
    slug,
    titre: article.meta.title,
    description: article.meta.summary,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PageArticle locale="fr" slug={slug} />;
}
