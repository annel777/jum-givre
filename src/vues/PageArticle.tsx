import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { composantsMdx } from '@/components/MdxArticle';
import { Entete, Pied } from '@/components/SiteChrome';
import { articleParSlug } from '@/lib/articles';
import { glacierParSlug } from '@/lib/glaciers';
import { chemin, moisLisible, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Un article. Le bloc du bas liste les fiches citées dans l'en-tête du .mdx :
 * c'est la moitié aller du maillage, le retour est sur la fiche elle-même.
 */
export function PageArticle({ locale, slug }: { locale: Locale; slug: string }) {
  const article = articleParSlug(slug, locale);
  if (!article) notFound();

  const d = t(locale);
  const { meta, corps } = article;
  const cites = meta.glaciers
    .map((s) => glacierParSlug(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <Entete locale={locale} page="articles" slug={slug} />
      <main>
        <article className="prose">
          <h1 className="titre-section">{meta.title}</h1>
          <p className="petit">{d.articles.misAJour(moisLisible(meta.updated.slice(0, 7), locale))}</p>
          <MDXRemote source={corps} components={composantsMdx(locale)} />
        </article>

        {cites.length > 0 && (
          <section className="bloc prose">
            <h2>{d.articles.fichesCitees}</h2>
            <ul className="liste-glaciers">
              {cites.map((g) => (
                <li key={g.slug}>
                  <Link className="vignette" href={chemin('fiche', locale, g.slug)}>
                    <div>
                      <h3>{g.name}</h3>
                      <p className="quartier">{g.area[locale]}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Pied locale={locale} />
    </>
  );
}
