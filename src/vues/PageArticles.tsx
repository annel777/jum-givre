import Link from 'next/link';

import { Entete, Pied } from '@/components/SiteChrome';
import { tousLesArticles } from '@/lib/articles';
import { chemin, moisLisible, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/** L'index des articles, du plus récent au plus ancien. */
export function PageArticles({ locale }: { locale: Locale }) {
  const d = t(locale);
  const articles = tousLesArticles(locale);

  return (
    <>
      <Entete locale={locale} page="articles" />
      <main>
        <h1 className="titre-section">{d.articles.titre}</h1>
        <p style={{ marginBottom: 18 }}>{d.articles.intro}</p>

        {articles.length === 0 ? (
          <p className="encart">{d.articles.aucun}</p>
        ) : (
          <ul className="liste-glaciers">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link className="vignette vignette-article" href={chemin('articles', locale, a.slug)}>
                  <div>
                    <h3>{a.title}</h3>
                    <p className="quartier">{a.summary}</p>
                    <p className="petit">{moisLisible(a.published.slice(0, 7), locale)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Pied locale={locale} />
    </>
  );
}
