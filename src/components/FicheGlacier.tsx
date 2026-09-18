import { Boules } from './Boules';
import { Cone } from './Cone';
import { moisLisible, prixLisible, t, telephoneLisible } from '@/lib/i18n';
import { BONUS_KEYS, type Glacier, type Locale } from '@/lib/types';

const VISAGES = { bof: '😐', sympa: '🙂', super: '🤩' } as const;

function Echelle({ valeurs }: { valeurs: string[] }) {
  return <span className="echelle">{valeurs.join(' · ')}</span>;
}

export function FicheGlacier({
  glacier: g,
  locale,
  rang,
}: {
  glacier: Glacier;
  locale: Locale;
  rang?: number;
}) {
  const d = t(locale);
  const e = d.echelles;
  const teste = g.status === 'teste';

  return (
    <article className="carte-pop">
      <div className="fiche-haut">
        {rang !== undefined && (
          <p className="numero" aria-hidden="true">
            {rang}
          </p>
        )}
        <div>
          <h1>{g.name}</h1>
          <p className="quartier">{g.area[locale]}</p>
        </div>
        {teste && g.taste !== null && (
          <p className="note-gout">
            <strong>
              {g.taste.toString().replace('.', locale === 'fr' ? ',' : '.')}
              <span className="sr-only"> {d.fiche.sur5(g.taste)}</span>
            </strong>
            <span aria-hidden="true">
              {d.fiche.gout} / 5
            </span>
          </p>
        )}
      </div>

      {!teste && (
        <section className="fiche-section">
          <p>{d.fiche.pasEncoreTeste}</p>
        </section>
      )}

      {teste && g.taste !== null && (
        <section className="fiche-section">
          <h3>{d.fiche.notreNote}</h3>
          <div className="ligne">
            <span className="ligne-nom">{d.fiche.gout}</span>
            <Boules note={g.taste} locale={locale} />
            <span className="valeur" aria-hidden="true">
              {g.taste.toString().replace('.', locale === 'fr' ? ',' : '.')} / 5
            </span>
          </div>
        </section>
      )}

      {teste && (
        <section className="fiche-section">
          <h3>{d.fiche.coupDoeil}</h3>
          {g.size && (
            <div className="ligne">
              <span className="ligne-nom">
                {d.fiche.taille}
                <Echelle valeurs={[e.size.mini, e.size.normale, e.size.geante]} />
              </span>
              <span className="choix">🍦 {e.size[g.size]}</span>
            </div>
          )}
          {/* Le prix est un fait relevé sur place, pas une appréciation. */}
          <div className="ligne">
            <span className="ligne-nom">
              {d.fiche.prix}
              <span className="echelle">{d.fiche.laBoule}</span>
            </span>
            {g.price !== null ? (
              <span className="choix">{prixLisible(g.price, locale)}</span>
            ) : (
              <span className="petit">{d.fiche.prixInconnu}</span>
            )}
          </div>
          {g.welcome && (
            <div className="ligne">
              <span className="ligne-nom">
                {d.fiche.accueil}
                <Echelle valeurs={[e.welcome.bof, e.welcome.sympa, e.welcome.super]} />
              </span>
              <span className="choix">
                <span aria-hidden="true">{VISAGES[g.welcome]} </span>
                {e.welcome[g.welcome]}
              </span>
            </div>
          )}
        </section>
      )}

      {teste && (
        <section className="fiche-section">
          <h3>
            {d.fiche.bonusTitre}{' '}
            <span className="compteur">
              {g.bonus.length} / {BONUS_KEYS.length}
            </span>
          </h3>
          <ul className="bonus">
            {BONUS_KEYS.map((key) => {
              const gagne = g.bonus.includes(key);
              return (
                <li key={key} className={gagne ? 'gagne' : 'perdu'}>
                  <span className="marque-bonus" aria-hidden="true">
                    {gagne ? '✅' : '⬜'}
                  </span>
                  <span className="sr-only">{gagne ? d.fiche.obtenu : d.fiche.nonObtenu}</span>
                  {e.bonus[key]}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {g.flavours[locale].length > 0 && (
        <section className="fiche-section">
          <h3>{d.fiche.parfums}</h3>
          <ul className="pastilles">
            {g.flavours[locale].map((parfum) => (
              <li key={parfum} className="pastille">
                {parfum}
              </li>
            ))}
          </ul>
        </section>
      )}

      {g.liked[locale].length > 0 && (
        <section className="fiche-section">
          <h3>{d.fiche.aime}</h3>
          <ul className="liste-avis">
            {g.liked[locale].map((item) => (
              <li key={item}>
                <span className="puce" aria-hidden="true">
                  👍
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {g.disliked[locale].length > 0 && (
        <section className="fiche-section">
          <h3>{d.fiche.pasAime}</h3>
          <ul className="liste-avis">
            {g.disliked[locale].map((item) => (
              <li key={item}>
                <span className="puce" aria-hidden="true">
                  👎
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {g.topping[locale] && (
        <section className="fiche-section">
          <div className="coup-de-coeur">
            <h3>{d.fiche.topping}</h3>
            <p>{g.topping[locale]}</p>
          </div>
        </section>
      )}

      {g.twins.length > 0 && (
        <section className="fiche-section">
          <h3>{d.fiche.avisJumeaux}</h3>
          <div className="avis">
            {g.twins.map((jumeau) => (
              <div className="bulle" key={jumeau.nick}>
                <strong>{jumeau.nick}</strong>
                <p>{jumeau[locale]}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="fiche-section">
        <h3>{d.fiche.infos}</h3>
        <ul className="infos">
          <li>
            <span className="ico">
              <Cone taille={17} />
            </span>
            <span>
              {g.address}
              {!g.coords && (
                <>
                  <br />
                  <span className="petit">{d.fiche.gpsManquant}</span>
                </>
              )}
            </span>
          </li>
          {g.hours[locale] && (
            <li>
              <span className="ico" aria-hidden="true">
                🕘
              </span>
              <span>
                <span className="sr-only">{d.fiche.horaires} : </span>
                {g.hours[locale]}
              </span>
            </li>
          )}
          {g.phone && (
            <li>
              <span className="ico" aria-hidden="true">
                📞
              </span>
              <a href={`tel:${g.phone}`}>
                <span className="sr-only">{d.fiche.telephone} : </span>
                {telephoneLisible(g.phone)}
              </a>
            </li>
          )}
          {g.website && (
            <li>
              <span className="ico" aria-hidden="true">
                🌐
              </span>
              <a href={g.website} target="_blank" rel="noopener">
                <span className="sr-only">{d.fiche.siteWeb} : </span>
                {g.website.replace(/^https?:\/\//, '')}
              </a>
            </li>
          )}
        </ul>
        <p className="encart">
          <span aria-hidden="true">🔎 </span>
          {g.visitDate ? d.fiche.verifie(moisLisible(g.visitDate, locale)) : d.fiche.dateInconnue}
        </p>
      </section>
    </article>
  );
}
