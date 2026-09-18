# Les Jumeaux Givrés / The Frozen Twins

Le guide des glaciers de Cannes, goûté et noté par deux jumeaux de 10 ans, les Scoop'ins.
Projet familial, non commercial, sans publicité ni lien d'affiliation.

Pas de base de données : les fiches vivent dans git. Les pages publiques sont
générées statiquement et ne posent aucun cookie ; seul l'espace de saisie,
réservé à l'éditeur, tourne côté serveur.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statique dans out/
npm run lint
npm run typecheck
```

## L'espace de saisie

`/admin` est un formulaire protégé par mot de passe qui écrit directement les
fiches dans ce dépôt. Chaque enregistrement produit un commit, donc un
déploiement, donc une version consultable et annulable.

Il lui faut deux variables d'environnement, à créer dans les réglages Vercel du
projet, onglet Environment Variables :

| Variable | Rôle |
| --- | --- |
| `ADMIN_PASSWORD` | le mot de passe du formulaire. **Sans préfixe `NEXT_PUBLIC_`** : ainsi il ne quitte jamais le serveur |
| `GITHUB_TOKEN` | un jeton GitHub à portée restreinte, avec le droit `Contents: write` sur ce seul dépôt |

Le mot de passe n'est jamais envoyé au navigateur : il est vérifié côté serveur,
par comparaison à durée constante, et le navigateur ne reçoit qu'un cookie de
session signé, `httpOnly`, valable douze heures.

En local :

```bash
ADMIN_PASSWORD=… GITHUB_TOKEN=… npm run build && npm start
```

## Ajouter un glacier

Déposer un fichier JSON dans `content/glaciers/`, nommé d'après le slug
(`content/glaciers/papilla.json` → `/glaciers/papilla/` et `/en/ice-cream/papilla/`).
Rien d'autre à toucher : l'accueil, la carte, le classement et les deux fiches
FR et EN se mettent à jour au build.

```json
{
  "slug": "papilla",
  "name": "Papilla",
  "status": "teste",
  "visitDate": "2026-09",
  "area": { "fr": "Rue Félix Faure", "en": "Rue Félix Faure" },
  "taste": 4.5,
  "size": "geante",
  "price": 3.5,
  "priceUnit": "boule",
  "welcome": "super",
  "bonus": ["terrasse", "choix"],
  "flavours": { "fr": ["Pistache"], "en": ["Pistachio"] },
  "liked": { "fr": [], "en": [] },
  "disliked": { "fr": [], "en": [] },
  "topping": { "fr": "", "en": "" },
  "twins": [{ "nick": "Scoop'in n°1", "fr": "…", "en": "…" }],
  "address": "81 rue Félix Faure, 06400 Cannes",
  "coords": [43.5512, 7.0159],
  "hours": { "fr": "12h à 23h", "en": "Midday to 11pm" },
  "phone": "+33400000000",
  "website": null
}
```

| Champ | Valeurs |
| --- | --- |
| `status` | `teste` (fiche complète) ou `a-tester` (seulement sur la carte) |
| `taste` | 1 à 5, demi-points autorisés (`4.5`), `null` si pas encore testé |
| `size` | `mini`, `normale`, `geante` |
| `price` | le prix en euros (`3.5`), ou `null` s'il n'est pas relevé |
| `priceUnit` | ce que ce prix achète : `boule`, `pot` ou `cornet`, ou `null` |
| `welcome` | `bof`, `sympa`, `super` |
| `bonus` | parmi `bien-place`, `terrasse`, `deco`, `choix`, `originaux`, `gouter`, `light` |
| `coords` | `[latitude, longitude]`, ou `null` tant que le point n'est pas relevé |
| `visitDate` | `AAAA-MM`, affiché comme « Infos vérifiées en septembre 2026 » |

Le classement additionne `taste` (sur 5) et le nombre de points bonus (sur 7).
Ce total ordonne les glaciers, il n'est jamais affiché comme une note.

Ou par le formulaire de `/admin`, qui écrit le même fichier.

### Relever les coordonnées

Les coordonnées ne sont jamais devinées : tant que `coords` vaut `null`, le glacier
n'apparaît pas sur la carte. Une commande les déduit des adresses déjà saisies :

```bash
npm run geo              # remplit les coords manquantes
npm run geo -- --force   # regéocode tout, même ce qui est déjà rempli
```

Le script interroge l'[API Adresse](https://adresse.data.gouv.fr) (Base Adresse
Nationale), service public gratuit et sans clé, et n'écrit une coordonnée que si
l'adresse trouvée est assez sûre. Les cas douteux sont listés à la fin et laissés
à `null`, pour qu'un point approximatif ne se glisse pas dans les données.

Pour un cas douteux, à la main : ouvrir [openstreetmap.org](https://www.openstreetmap.org),
clic droit sur la devanture, « Afficher l'adresse », recopier latitude puis longitude
dans `coords`.

## Ce qui reste à faire avant la mise en ligne

- [ ] Récupérer le téléphone de Vercel, obligatoire pour l'hébergeur
- [ ] Faire relire les mentions légales et la politique de confidentialité
- [ ] Placer les 8 glaciers « à tester » sur la carte (`npm run geo`, ou au fil
      des visites)
- [ ] Trancher l'adresse de contact : `contact@jumeauxgivres.fr` (à créer) ou
      une adresse `@leroy.cool`, comme sur les autres sites de la société
- [ ] Remplacer les avis d'exemple des jumeaux par leurs vrais mots

## Structure

```
content/glaciers/     un fichier JSON par glacier, la seule source de contenu
src/app/(fr)/         les pages françaises, servies à la racine
src/app/(en)/en/      les pages anglaises, servies sous /en/
src/vues/             une vue par type de page, partagée entre FR et EN
src/components/       fiche, carte, classement, en-tête, pied de page
src/lib/i18n.ts       toutes les chaînes FR et EN, et le plan des URL
src/styles/           l'univers graphique Pop Riviera
scripts/geocoder.mjs  remplit les coords des fiches depuis leurs adresses
```

Les deux langues ont chacune leur mise en page racine (`app/(fr)` et `app/(en)`),
pour que `<html lang>` soit juste sans middleware — que l'export statique n'a pas.

## Vie privée et conformité

- Aucun cookie sur les pages publiques, donc pas de bandeau. L'espace de saisie
  pose un cookie de session, pour son seul utilisateur
- Polices auto-hébergées par `next/font` : aucune requête vers les serveurs de Google
- Mesure d'audience : Vercel Web Analytics, sans cookie
- Seuls appels réseau externes : les tuiles OpenStreetMap et le script d'analytics Vercel
- Attribution OpenStreetMap affichée sur la carte (obligatoire)

Vérification après chaque changement : ouvrir l'onglet Réseau et confirmer qu'aucun
autre domaine n'est appelé.

## Déploiement

Hébergement sur Vercel. Les pages publiques sont générées statiquement au build ;
seules les routes `/api/admin/` tournent à la demande.

Les trois domaines se règlent dans les réglages du projet Vercel, pas dans le code :

| Domaine | Réglage |
| --- | --- |
| `jumeauxgivres.fr` | domaine principal |
| `scoop-ins.com` | redirection 301 vers `jumeauxgivres.fr` |
| `frozentwins.com` | redirection 301 vers `jumeauxgivres.fr/en` |

Vercel redirige `www` vers le domaine nu et sert tout en HTTPS.

## Univers graphique

Affiche de plage années 60 : couleurs franches, formes rondes, gros titres,
contours épais et ombres portées sans flou. Les tokens sont définis en haut de
`src/styles/globals.css`.

| Token | Couleur | Usage |
| --- | --- | --- |
| `--ciel` | `#9ADCFF` | fond de page |
| `--soleil` | `#FFF89A` | bandeaux, pastilles de choix |
| `--saumon` | `#FFB2A6` | bulles, accents |
| `--fraise` | `#FF8AAE` | boules de notation, store rayé |
| `--fraise-fonce` | `#B02350` | titres, ronds numérotés, bloc coup de cœur |
| `--mer` | `#0B5285` | liens, badges |
| `--mer-fonce` | `#063E6B` | texte, contours, ombres |
| `--ardoise` | `#345368` | texte secondaire |

Les quatre premiers tokens sont la palette voulue. Aucun ne porte du texte blanc,
entre 1,1:1 et 2,2:1 : ce sont des aplats, jamais des fonds de texte clair. Les
quatre suivants sont imposés par la lisibilité, et chacun est vérifié : l'encre
tient entre 4,98:1 et 10:1 sur les pastels, les liens 5,5:1 sur le fond bleu, le
texte secondaire 5,4:1. `--fraise-fonce` est la variante texte du rose, à 6,6:1
sur blanc et portant du blanc au même ratio.

La palette n'ayant pas de bleu moyen, le store rayé passe au rose et au blanc.

La maquette de référence d'origine est conservée dans `fiche-myboule-pop-riviera.html`.
