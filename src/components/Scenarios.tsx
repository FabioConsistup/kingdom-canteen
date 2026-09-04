import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { scenarios } from '../data/content';

export function Scenarios() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Comparativo</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Entenda cada situação
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Quatro casos comuns e o que cada um recebe de cashback.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario, index) => (
            <li key={scenario.id}>
              <Reveal delay={index * 70} className="h-full">
                <article
                  className={`card flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0 ${
                    scenario.eligible ? 'border-brand-orange/40' : ''
                  }`}
                >
                  <p
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold ${
                      scenario.eligible
                        ? 'bg-brand-orange-soft text-[#8a5310]'
                        : 'bg-brand-blue-soft text-brand-blue'
                    }`}
                  >
                    <Icon name={scenario.eligible ? 'check' : 'close'} className="h-3.5 w-3.5" />
                    {scenario.eligible ? 'Recebe o bônus' : 'Sem bônus promocional'}
                  </p>

                  <dl className="mt-4 space-y-2">
                    {scenario.rows.map((row) => (
                      <div key={row.label} className="rounded-xl bg-surface px-4 py-3">
                        <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-light">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-base font-bold text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 text-[15px] font-bold leading-snug text-ink">{scenario.result}</p>

                  {scenario.total && (
                    <p className="mt-2 inline-flex w-fit rounded-full bg-brand-blue px-3.5 py-1.5 text-[13px] font-extrabold text-white">
                      {scenario.total}
                    </p>
                  )}

                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-muted">{scenario.note}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
