import type { Locale } from '@/lib/types';
import { t } from '@/lib/i18n';

/** La note de goût, affichée en boules pleines, demi ou vides. */
export function Boules({ note, locale }: { note: number; locale: Locale }) {
  const boules = Array.from({ length: 5 }, (_, i) => {
    const rang = i + 1;
    if (note >= rang) return 'pleine';
    if (note >= rang - 0.5) return 'demi';
    return 'vide';
  });

  return (
    <span className="boules" role="img" aria-label={t(locale).fiche.sur5(note)}>
      {boules.map((etat, i) => (
        <i key={i} className={`boule ${etat === 'vide' ? '' : etat}`} />
      ))}
    </span>
  );
}
