import { Courriel } from '@/components/Courriel';
import { Entete, Pied } from '@/components/SiteChrome';
import { t, type RouteKey } from '@/lib/i18n';
import type { Locale } from '@/lib/types';

/**
 * Les pages éditoriales : méthode, qui sommes-nous, mentions légales,
 * confidentialité. Les blocs [à compléter] attendent une décision ou une
 * information que le brief laisse ouverte ; ils doivent tous être remplis
 * et le tout relu avant la mise en ligne.
 */

const ACOMPLETER = '[à compléter]';

function Methode({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return (
      <>
        <h2>Une seule note chiffrée</h2>
        <p>
          Les jumeaux ont 10 ans. Pour qu&apos;ils puissent noter seuls, une seule chose est notée
          sur 5 : le goût, en boules de glace, demi-boules autorisées. Tout le reste est un choix
          simple ou une case à cocher.
        </p>
        <h2>Les choix simples</h2>
        <ul>
          <li>Taille : Mini, Normale ou Géante</li>
          <li>Accueil : Bof, Sympa ou Super</li>
        </ul>
        <h2>Le prix</h2>
        <p>
          Le prix n&apos;est pas noté et n&apos;est pas jugé. On relève simplement ce que ça
          coûte, en euros, le jour de la visite. À toi de décider si c&apos;est cher.
        </p>
        <p>
          Tous les glaciers ne vendent pas la même chose : certains à la boule, d&apos;autres au
          pot ou au cornet. Chaque fiche dit donc à quoi correspond son prix, pour qu&apos;on ne
          compare pas un pot avec une boule.
        </p>
        <h2>Les 7 points bonus</h2>
        <p>Un point chacun, cochés ou non : </p>
        <ul>
          <li>Bien placé</li>
          <li>Terrasse</li>
          <li>Déco et univers</li>
          <li>Beaucoup de parfums</li>
          <li>Parfums originaux</li>
          <li>On peut goûter avant</li>
          <li>Options light, vegan, sans sucre</li>
        </ul>
        <h2>Le classement</h2>
        <p>
          Le classement additionne le goût, sur 5, et les points bonus, sur 7. Ce total sert
          uniquement à ranger les glaciers les uns par rapport aux autres : il n&apos;est jamais
          affiché comme une note.
        </p>
        <h2>Ce que valent ces notes</h2>
        <p>
          Ce sont les opinions personnelles de deux enfants, à une date donnée, sur une seule
          visite. Les glaces sont payées par la famille. Aucun partenariat, aucune publicité,
          aucun lien d&apos;affiliation. Si une glace était offerte, ce serait écrit sur la fiche
          concernée.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>One score, and one only</h2>
      <p>
        The twins are ten. So that they can rate a shop on their own, only one thing is scored out
        of 5: taste, in ice cream scoops, half scoops allowed. Everything else is a simple choice
        or a checkbox.
      </p>
      <h2>The simple choices</h2>
      <ul>
        <li>Size: Small, Regular or Giant</li>
        <li>Welcome: Meh, Nice or Great</li>
      </ul>
      <h2>The price</h2>
      <p>
        Price is neither scored nor judged. We simply record what it costs, in euros, on the day
        we visited. Whether that is expensive is for you to decide.
      </p>
      <p>
        Shops don&apos;t all sell the same thing: some by the scoop, others by the cup or the
        cone. Each review says what its price covers, so that a cup is never compared with a
        scoop.
      </p>
      <h2>The 7 bonus points</h2>
      <p>One point each, ticked or not:</p>
      <ul>
        <li>Good spot</li>
        <li>Terrace</li>
        <li>Decor and atmosphere</li>
        <li>Lots of flavours</li>
        <li>Unusual flavours</li>
        <li>You can taste first</li>
        <li>Light, vegan, sugar-free options</li>
      </ul>
      <h2>The ranking</h2>
      <p>
        The ranking adds taste, out of 5, and bonus points, out of 7. That total only orders the
        shops against each other; it is never shown as a score.
      </p>
      <h2>What these ratings are worth</h2>
      <p>
        They are the personal opinions of two children, on a given date, after a single visit. The
        family pays for every scoop. No partnerships, no advertising, no affiliate links. If a
        scoop were ever given to us, it would be stated on that shop&apos;s page.
      </p>
    </>
  );
}

function QuiSommesNous({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return (
      <>
        <h2>Les Scoop&apos;ins</h2>
        <p>
          Deux jumeaux de 10 ans qui goûtent les glaciers de Cannes. Ils signent par leur surnom
          seulement : pas de nom de famille, pas d&apos;école, pas de quartier, pas de photo de
          visage. Les photos du site montrent des mains, des glaces et des devantures.
        </p>
        <p>
          Chaque contenu qui les concerne est publié avec leur accord à tous les deux.
        </p>
        <h2>Un projet familial</h2>
        <p>
          Le site est tenu par leur famille. Il est sans but commercial, sans publicité et sans
          partenariat. Il n&apos;a aucun lien avec la Ville de Cannes ni avec l&apos;Office de
          tourisme, et ne reçoit aucun moyen public.
        </p>
        <h2>Nous écrire</h2>
        <p>
          Une erreur, une adresse qui a changé, un droit de réponse : <Courriel />.
        </p>
      </>
    );
  }

  return (
    <>
      <h2>The Scoop&apos;ins</h2>
      <p>
        Two ten-year-old twins tasting their way through the ice cream shops of Cannes. They sign
        with a nickname only: no surname, no school, no neighbourhood, no photo of their faces.
        The pictures on this site show hands, ice creams and shopfronts.
      </p>
      <p>Everything published about them is published with both of them agreeing to it.</p>
      <h2>A family project</h2>
      <p>
        The site is run by their family. It is non-commercial, carries no advertising and has no
        partnerships. It has no connection with the City of Cannes or the tourist office, and
        receives no public funding.
      </p>
      <h2>Contact</h2>
      <p>
        A mistake, an address that changed, a right of reply:{' '}
        <Courriel />.
      </p>
    </>
  );
}

function MentionsLegales({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';

  return (
    <>
      <h2>{fr ? 'Éditeur du site' : 'Site publisher'}</h2>
      <p>
        {fr ? 'LEROY SAS — marque Studio Leroy' : 'LEROY SAS — trading as Studio Leroy'}
        <br />
        {fr ? 'Société par actions simplifiée au capital de 1 000 €' : 'Simplified joint-stock company, share capital €1,000'}
        <br />
        {fr ? 'Siège social : ' : 'Registered office: '}210 boulevard Leader, 06400 Cannes
        {fr ? '' : ', France'}
        <br />
        SIRET : 987 771 276 00019
        <br />
        {fr ? 'TVA intracommunautaire : ' : 'VAT number: '}FR21987771276
        <br />
        <Courriel />
      </p>
      <h2>{fr ? 'Directeur de la publication' : 'Publication director'}</h2>
      <p>Anne Leroy</p>
      <h2>{fr ? 'Hébergeur' : 'Hosting provider'}</h2>
      <p>
        Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, {fr ? 'États-Unis' : 'United States'}
        .<br />
        {fr ? 'Téléphone : ' : 'Phone: '}
        {ACOMPLETER}
        {fr
          ? ' (à récupérer auprès de Vercel, la mention du téléphone de l’hébergeur est obligatoire).'
          : ' (to be obtained from Vercel; French law requires the host’s phone number).'}
      </p>
      <h2>{fr ? 'Propriété intellectuelle' : 'Intellectual property'}</h2>
      <p>
        {fr
          ? 'Les textes, photos et le logo appartiennent à l’éditeur. Le fond de carte provient d’OpenStreetMap, sous licence ODbL, et son attribution est affichée sur la carte.'
          : 'Text, photos and the logo belong to the publisher. Map data comes from OpenStreetMap under the ODbL licence, and the attribution is shown on the map.'}
      </p>
      <h2>{fr ? 'Indépendance' : 'Independence'}</h2>
      <p>
        {fr
          ? 'Aucun partenariat. Les glaces sont payées par la famille. Toute glace offerte ou invitation serait signalée sur la fiche concernée.'
          : 'No partnerships. The family pays for every scoop. Any free scoop or invitation would be stated on the page concerned.'}
      </p>
      <h2>{fr ? 'Nature des avis' : 'Nature of the reviews'}</h2>
      <p>
        {fr
          ? 'Les notes sont les opinions personnelles de deux enfants, datées, portant sur une seule visite.'
          : 'The ratings are the personal opinions of two children, dated, based on a single visit.'}
      </p>
      <h2>{fr ? 'Droit de réponse' : 'Right of reply'}</h2>
      <p>
        {fr
          ? 'Tout glacier cité peut demander une réponse ou une correction à l’adresse de contact. Nous nous engageons à traiter la demande sous 7 jours.'
          : 'Any shop mentioned here may ask for a reply or a correction at the contact address. We undertake to handle the request within 7 days.'}
      </p>
    </>
  );
}

function Confidentialite({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';

  return (
    <>
      <h2>{fr ? 'Aucun cookie' : 'No cookies'}</h2>
      <p>
        {fr
          ? 'Aucun cookie n’est déposé sur votre navigateur, il n’y a donc pas de bandeau à accepter. Le site a bien un espace de saisie réservé à son éditeur, protégé par mot de passe, qui pose un cookie de session — mais uniquement pour la personne qui s’y connecte, jamais pour les visiteurs. Tout ajout d’un outil tiers imposerait de revoir ce point.'
          : 'No cookie is set on your browser, so there is no banner to accept. The site does have a password-protected editing space for its publisher, which sets a session cookie — but only for whoever signs in there, never for visitors. Adding any third-party tool would mean revisiting this.'}
      </p>
      <h2>{fr ? 'Mesure d’audience' : 'Analytics'}</h2>
      <p>
        {fr
          ? 'Vercel Web Analytics, sans cookie, en données agrégées. Pas de Google Analytics, pas de pixel publicitaire.'
          : 'Vercel Web Analytics, cookie-free, aggregated data only. No Google Analytics, no advertising pixel.'}
      </p>
      <h2>{fr ? 'Données traitées' : 'Data processed'}</h2>
      <p>
        {fr
          ? 'Les journaux techniques de l’hébergeur, et les e-mails que vous nous envoyez à l’adresse de contact.'
          : 'The host’s technical logs, and the emails you send us at the contact address.'}
      </p>
      <h2>{fr ? 'Transfert hors Union européenne' : 'Transfers outside the EU'}</h2>
      <p>
        {fr
          ? 'Le site est hébergé par Vercel Inc., aux États-Unis. Les journaux techniques sont donc traités hors de l’Union européenne.'
          : 'The site is hosted by Vercel Inc. in the United States, so the technical logs are processed outside the European Union.'}
      </p>
      <h2>{fr ? 'Polices et carte' : 'Fonts and map'}</h2>
      <p>
        {fr
          ? 'Les polices sont servies depuis notre domaine, aucune requête n’est faite aux serveurs de Google. Le fond de carte est chargé depuis les serveurs d’OpenStreetMap, qui reçoivent alors votre adresse IP.'
          : 'Fonts are served from our own domain, with no request to Google servers. Map tiles are loaded from OpenStreetMap servers, which therefore receive your IP address.'}
      </p>
      <h2>{fr ? 'Vos droits' : 'Your rights'}</h2>
      <p>
        {fr
          ? 'Accès, rectification, effacement : écrivez à '
          : 'Access, correction, erasure: write to '}
        <Courriel />
        {fr
          ? '. Vous pouvez aussi saisir la CNIL.'
          : '. You may also lodge a complaint with the CNIL, the French data protection authority.'}
      </p>
    </>
  );
}

const CONTENUS = {
  method: Methode,
  about: QuiSommesNous,
  legal: MentionsLegales,
  privacy: Confidentialite,
} as const;

export type PageEditorialeKey = keyof typeof CONTENUS;

export function PageEditoriale({
  locale,
  page,
}: {
  locale: Locale;
  page: PageEditorialeKey;
}) {
  const Contenu = CONTENUS[page];
  const titre = t(locale).nav[page as RouteKey];

  return (
    <>
      <Entete locale={locale} page={page} />
      <main>
        <h1 className="titre-section">{titre}</h1>
        <div className="prose">
          <Contenu locale={locale} />
        </div>
      </main>
      <Pied locale={locale} />
    </>
  );
}
