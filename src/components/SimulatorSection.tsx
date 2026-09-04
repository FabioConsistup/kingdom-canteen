import { Reveal } from './Reveal';
import { Simulator } from './Simulator';
import { quickExamples } from '../data/content';

/**
 * O simulador é o material didático principal da página — por isso os
 * exemplos ficam reduzidos a dois cartões curtos ao lado dele.
 */
export function SimulatorSection() {
  return (
    <section id="simulador" className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Na prática</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Simule o seu cashback
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Informe o valor da recarga — e o saldo negativo, se houver — para ver como o cashback padrão e o
              bônus se somam.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <Simulator />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {quickExamples.map((example, index) => (
              <Reveal key={example.id} delay={90 + index * 70} className="h-full">
                <article className="card h-full">
                  <h3 className="text-[15px] font-bold leading-snug text-ink">{example.title}</h3>

                  <dl className="mt-4 space-y-2">
                    {example.rows.map((row) => (
                      <div
                        key={row.label}
                        className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
                          row.highlight ? 'bg-brand-orange-soft text-[#8a5310]' : 'bg-surface text-ink-muted'
                        }`}
                      >
                        <dt className="text-[14px] font-medium">{row.label}</dt>
                        <dd className="shrink-0 text-[15px] font-bold">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 rounded-xl bg-brand-blue px-4 py-3 text-center text-[15px] font-extrabold text-white">
                    {example.total}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
