import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { selfService } from '../data/content';

/**
 * Autoatendimento e reconhecimento facial. É a única seção que explica a
 * facial por completo — nas demais, só chamadas curtas.
 */
export function SelfService() {
  return (
    <section id="autoatendimento" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Na cantina</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {selfService.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{selfService.intro}</p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {selfService.points.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 60} className="h-full">
                <article className="card flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                    <Icon name={point.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{point.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-muted">
                    {point.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-6 text-[15px] text-ink-muted">
            Ainda não cadastrou o aluno?{' '}
            <a
              href="#iuupi"
              className="font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue"
            >
              Comece pelo aplicativo Iuupi
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
