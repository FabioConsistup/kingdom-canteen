import { Icon } from './Icon';
import { announcement } from '../data/content';

/**
 * Comunicado operacional sobre o fim da venda fiado.
 * Fica logo abaixo do header e não pode ser fechado — é informação
 * que todo responsável precisa ver.
 */
export function Announcement() {
  return (
    <aside
      aria-labelledby="comunicado-fiado"
      className="border-b border-brand-orange/30 bg-brand-orange-soft"
    >
      <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-5 sm:py-6">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-red shadow-soft"
        >
          <Icon name="calendar" className="h-6 w-6" />
        </span>

        <div className="min-w-0">
          <p id="comunicado-fiado" className="eyebrow text-brand-red">
            {announcement.eyebrow}
          </p>
          <p className="mt-1.5 text-base font-extrabold leading-snug text-ink sm:text-lg">
            {announcement.headline}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
            {announcement.body}{' '}
            <span className="text-brand-blue">{announcement.note}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
