import Link from 'next/link';

import { ROUTES, autreLangue, chemin, t, type RouteKey } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/** Le store de plage rayé à bord festonné, en haut de chaque page. */
export function Store() {
  return <div className="store" aria-hidden="true" />;
}

/**
 * Le sélecteur de langue renvoie vers la même page dans l'autre langue,
 * pas vers l'accueil : `page` et `slug` disent où l'on se trouve.
 */
export function SelecteurLangue({
  locale,
  page,
  slug,
}: {
  locale: Locale;
  page: RouteKey;
  slug?: string;
}) {
  return (
    <nav className="langues" aria-label={t(locale).langue}>
      <Link href={chemin(page, 'fr', slug)} hrefLang="fr" aria-current={locale === 'fr'}>
        FR
      </Link>
      <Link href={chemin(page, 'en', slug)} hrefLang="en" aria-current={locale === 'en'}>
        EN
      </Link>
    </nav>
  );
}

const PAGES_NAV: RouteKey[] = ['home', 'ranking', 'articles', 'method', 'about'];

export function Entete({ locale, page, slug }: { locale: Locale; page: RouteKey; slug?: string }) {
  const d = t(locale);

  return (
    <>
      <Store />
      <SelecteurLangue locale={locale} page={page} slug={slug} />
      <header className="entete">
        <Link className="marque" href={chemin('home', locale)}>
          {d.marque}
        </Link>
        <p className="baseline">{d.baseline}</p>
      </header>
      <ul className="nav">
        {PAGES_NAV.map((key) => (
          <li key={key}>
            <Link href={chemin(key, locale)} aria-current={key === page ? 'page' : undefined}>
              {d.nav[key]}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Pied({ locale }: { locale: Locale }) {
  const d = t(locale);
  const autre = autreLangue(locale);

  return (
    <footer className="pied">
      <ul className="liens-pied">
        <li>
          <Link href={chemin('legal', locale)}>{d.nav.legal}</Link>
        </li>
        <li>
          <Link href={chemin('privacy', locale)}>{d.nav.privacy}</Link>
        </li>
        <li>
          {/* L'adresse vit sur la page des mentions légales, épelée. */}
          <Link href={chemin('legal', locale)}>Contact</Link>
        </li>
        <li>
          <Link href={ROUTES.home[autre]} hrefLang={autre}>
            {d.versLautreLangue}
          </Link>
        </li>
      </ul>
      <p className="pied-note">{d.pied.independance}</p>
    </footer>
  );
}
