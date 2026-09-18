import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import type { Locale } from './types';

const DOSSIER = path.join(process.cwd(), 'content', 'articles');

export type MetaArticle = {
  slug: string;
  /** Un titre sous forme de question, comme le veut le plan éditorial. */
  title: string;
  summary: string;
  published: string;
  /** Visible sur l'article : un contenu daté vieillit honnêtement. */
  updated: string;
  /** Les fiches citées, au moins deux : c'est la règle de maillage. */
  glaciers: string[];
};

const fichier = (slug: string, locale: Locale) =>
  path.join(DOSSIER, slug, `${locale}.mdx`);

function lire(slug: string, locale: Locale): { meta: MetaArticle; corps: string } | null {
  const chemin = fichier(slug, locale);
  if (!fs.existsSync(chemin)) return null;

  const { data, content } = matter(fs.readFileSync(chemin, 'utf-8'));
  const dates = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''));

  return {
    meta: {
      slug,
      title: String(data.title ?? ''),
      summary: String(data.summary ?? ''),
      published: dates(data.published),
      updated: dates(data.updated ?? data.published),
      glaciers: Array.isArray(data.glaciers) ? data.glaciers.map(String) : [],
    },
    corps: content,
  };
}

/** Ajouter un article = déposer un dossier avec fr.mdx et en.mdx. */
export function slugsArticles(): string[] {
  if (!fs.existsSync(DOSSIER)) return [];
  return fs
    .readdirSync(DOSSIER, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

/** Les articles publiés dans cette langue, le plus récent d'abord. */
export function tousLesArticles(locale: Locale): MetaArticle[] {
  return slugsArticles()
    .map((slug) => lire(slug, locale)?.meta)
    .filter((m): m is MetaArticle => Boolean(m))
    .sort((a, b) => b.published.localeCompare(a.published));
}

export function articleParSlug(
  slug: string,
  locale: Locale,
): { meta: MetaArticle; corps: string } | null {
  return lire(slug, locale);
}

/**
 * L'index inverse du maillage : les articles qui citent ce glacier.
 * C'est lui qui garantit « chaque fiche vers au moins un article ».
 */
export function articlesCitant(slugGlacier: string, locale: Locale): MetaArticle[] {
  return tousLesArticles(locale).filter((a) => a.glaciers.includes(slugGlacier));
}
