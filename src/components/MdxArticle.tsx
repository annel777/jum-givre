import Link from 'next/link';

import { chemin, t } from '@/lib/i18n';
import { glacierParSlug } from '@/lib/glaciers';
import type { Locale } from '@/lib/types';

/**
 * Les composants utilisables dans les fichiers .mdx des articles.
 * Ils existent pour que l'écriture reste courte : dans l'article on écrit
 * <LienFiche slug="my-boule" /> et le nom, la langue et l'adresse suivent.
 */

/** Un lien vers une fiche, qui prend son libellé dans le JSON du glacier. */
export function LienFiche({ slug, locale }: { slug: string; locale: Locale }) {
  const glacier = glacierParSlug(slug);
  if (!glacier) return null;

  return <Link href={chemin('fiche', locale, slug)}>{glacier.name}</Link>;
}

/** L'encadré récurrent « Le conseil de glacier » du plan éditorial. */
export function ConseilGlacier({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <aside className="conseil">
      <h3>{t(locale).articles.conseil}</h3>
      {children}
    </aside>
  );
}

/** Les composants passés à MDXRemote, avec la langue déjà fixée. */
export function composantsMdx(locale: Locale) {
  return {
    LienFiche: (props: { slug: string }) => <LienFiche {...props} locale={locale} />,
    ConseilGlacier: (props: { children: React.ReactNode }) => (
      <ConseilGlacier {...props} locale={locale} />
    ),
  };
}
