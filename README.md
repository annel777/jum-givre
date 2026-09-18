# Les Jumeaux Givrés / The Frozen Twins

Le guide des glaciers de Cannes, goûté et noté par deux jumeaux de 10 ans, les Scoop'ins.
Projet familial, non commercial, sans publicité ni lien d'affiliation.

Site statique : pas de base de données, pas de compte, pas de cookie.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # export statique dans out/
npm run lint
npm run typecheck
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
  "price": "norme",
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
| `price` | `pas-cher`, `norme`, `cher` |
| `welcome` | `bof`, `sympa`, `super` |
| `bonus` | parmi `bien-place`, `terrasse`, `deco`, `choix`, `originaux`, `gouter`, `light` |
| `coords` | `[latitude, longitude]`, ou `null` tant que le point n'est pas relevé |
| `visitDate` | `AAAA-MM`, affiché comme « Infos vérifiées en septembre 2026 » |

Le classement additionne `taste` (sur 5) et le nombre de points bonus (sur 7).
Ce total ordonne les glaciers, il n'est jamais affiché comme une note.

### Relever les coordonnées

Les coordonnées ne sont pas devinées : tant que `coords` vaut `null`, le glacier
n'apparaît pas sur la carte et l'accueil affiche combien il en manque. Pour en
relever une : ouvrir [openstreetmap.org](https://www.openstreetmap.org), clic droit
sur la devanture, « Afficher l'adresse », et recopier latitude puis longitude.

## Ce qui reste à faire avant la mise en ligne

- [ ] Récupérer le téléphone de Vercel, obligatoire pour l'hébergeur
- [ ] Faire relire les mentions légales et la politique de confidentialité
- [ ] Relever les coordonnées GPS des 10 glaciers
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
```

Les deux langues ont chacune leur mise en page racine (`app/(fr)` et `app/(en)`),
pour que `<html lang>` soit juste sans middleware — que l'export statique n'a pas.

## Vie privée et conformité

- Aucun cookie déposé, donc pas de bandeau
- Polices auto-hébergées par `next/font` : aucune requête vers les serveurs de Google
- Mesure d'audience : Vercel Web Analytics, sans cookie
- Seuls appels réseau externes : les tuiles OpenStreetMap et le script d'analytics Vercel
- Attribution OpenStreetMap affichée sur la carte (obligatoire)

Vérification après chaque changement : ouvrir l'onglet Réseau et confirmer qu'aucun
autre domaine n'est appelé.

## Déploiement

Hébergement sur Vercel, en export statique (`output: 'export'`, dossier `out/`).

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
| `--soleil` | `#FFD23F` | bandeaux, pastilles |
| `--mer` | `#0A6EBD` | store rayé, liens, badges |
| `--mer-fonce` | `#063E6B` | texte, contours, ombres |
| `--fraise` | `#FF5C8A` | boules de notation |
| `--fraise-fonce` | `#C2255C` | titres et aplats à texte blanc |
| `--ciel` | `#CDEBFA` | fond de page |

`--fraise-fonce` est la variante texte du rose : `#FF5C8A` est à 2,9:1 sur blanc,
sous le AA demandé, quand `#C2255C` est à 5,6:1. Le rose d'origine reste sur les
boules, qui sont décoratives.

La maquette de référence d'origine est conservée dans `fiche-myboule-pop-riviera.html`.
