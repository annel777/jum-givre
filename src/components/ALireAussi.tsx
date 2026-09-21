import Link from 'next/link';

import { articlesCitant } from '@/lib/articles';
import { chemin, t } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Le retour du maillage : depuis une fiche, les articles qui la citent.
 * Le bloc disparaît tant qu'aucun article ne parle de ce glacier.
 */
export function ALireAussi({ slug, locale }: { slug: string; locale: Locale }) {
  const articles = articlesCitant(slug, locale);
  if (articles.length === 0) return null;

  return (
    <section className="bloc prose">
      <h2>{t(locale).articles.aLire}</h2>
      <ul className="liste-glaciers">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link className="vignette vignette-article" href={chemin('articles', locale, a.slug)}>
              <div>
                <h3>{a.title}</h3>
                <p className="quartier">{a.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
