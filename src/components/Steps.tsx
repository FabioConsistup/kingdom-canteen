import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { steps } from '../data/content';

export function Steps() {
  return (
    <section id="como-participar" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Passo a passo</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Como participar
            </h2>
          </div>
        </Reveal>

        <ol className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 60} className="h-full">
                <article className="card flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue text-base font-extrabold text-white">
                      {index + 1}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
