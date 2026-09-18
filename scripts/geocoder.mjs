#!/usr/bin/env node
/**
 * Remplit les `coords` manquantes des fiches de content/glaciers/.
 *
 *   npm run geo          # géocode ce qui manque
 *   npm run geo -- --force   # regéocode tout, même ce qui est déjà rempli
 *
 * Source : l'API Adresse (Base Adresse Nationale), service public français,
 * gratuite et sans clé. Les coordonnées ne sont écrites que si l'adresse
 * trouvée est jugée fiable ; sinon la fiche est laissée à null et signalée,
 * pour qu'un point approximatif ne se glisse pas dans les données.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DOSSIER = path.join(process.cwd(), 'content', 'glaciers');
const API = 'https://api-adresse.data.gouv.fr/search/';
const SCORE_MINIMUM = 0.6;
const force = process.argv.includes('--force');

/** L'API demande de rester raisonnable : une requête à la fois, espacée. */
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocoder(adresse) {
  const url = `${API}?q=${encodeURIComponent(adresse)}&limit=1`;
  const reponse = await fetch(url);

  if (!reponse.ok) {
    throw new Error(`API Adresse a répondu ${reponse.status}`);
  }

  const { features } = await reponse.json();
  if (!features?.length) return null;

  const [trouve] = features;
  const [lon, lat] = trouve.geometry.coordinates;

  return {
    coords: [Number(lat.toFixed(6)), Number(lon.toFixed(6))],
    label: trouve.properties.label,
    score: trouve.properties.score,
  };
}

const fichiers = (await readdir(DOSSIER)).filter((f) => f.endsWith('.json'));
let remplis = 0;
let ignores = 0;
const douteux = [];

for (const fichier of fichiers) {
  const chemin = path.join(DOSSIER, fichier);
  const glacier = JSON.parse(await readFile(chemin, 'utf-8'));

  if (glacier.coords && !force) {
    ignores += 1;
    continue;
  }

  let resultat;
  try {
    resultat = await geocoder(glacier.address);
  } catch (erreur) {
    console.error(`✗ ${glacier.name} : ${erreur.message}`);
    continue;
  }

  if (!resultat) {
    douteux.push(`${glacier.name} — aucune adresse trouvée pour « ${glacier.address} »`);
  } else if (resultat.score < SCORE_MINIMUM) {
    douteux.push(
      `${glacier.name} — trop incertain (${resultat.score.toFixed(2)}) : « ${resultat.label} »`,
    );
  } else {
    glacier.coords = resultat.coords;
    await writeFile(chemin, `${JSON.stringify(glacier, null, 2)}\n`, 'utf-8');
    remplis += 1;
    console.log(
      `✓ ${glacier.name.padEnd(22)} ${resultat.coords.join(', ')}   ${resultat.label}`,
    );
  }

  await pause(200);
}

console.log(`\n${remplis} fiche(s) remplie(s), ${ignores} déjà placée(s).`);

if (douteux.length > 0) {
  console.log(`\n${douteux.length} à relever à la main, laissée(s) à null :`);
  for (const ligne of douteux) console.log(`  · ${ligne}`);
  console.log(
    '\nSur openstreetmap.org : clic droit sur la devanture → « Afficher l’adresse »,' +
      '\npuis recopier latitude et longitude dans "coords" de la fiche.',
  );
}
