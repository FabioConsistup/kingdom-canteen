import { CashbackBreakdown } from './CashbackBreakdown';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { promoHighlights } from '../data/content';

const toneClasses: Record<'blue' | 'orange' | 'red', string> = {
  blue: 'bg-white/10 text-white border border-white/15',
  orange: 'bg-brand-orange text-ink',
  red: 'bg-brand-red text-white',
};

/**
 * Seção única da promoção: concentra a composição 10% + 10% = 20%, os dados
 * essenciais e os dois avisos curtos (taxa fixa e saldo negativo). O detalhe
 * de cada regra fica no regulamento; aqui só a versão resumida.
 */
export function Promo() {
  return (
    <section id="promocao" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-blue px-6 py-12 text-white shadow-card sm:px-10 sm:py-14 lg:px-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.06]" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-orange/15" />
            </div>

            <div className="relative">
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-white">
                <Icon name="sparkle" className="h-4 w-4" />
                Promoção de cadastramento facial
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                Cashback que rende mais durante a promoção
              </h2>

              <div className="mt-10">
                <CashbackBreakdown variant="onblue" />
              </div>

              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                {promoHighlights.map((highlight, index) => (
                  <Reveal key={highlight.label} delay={index * 70}>
                    <div className={`h-full rounded-2xl px-5 py-5 ${toneClasses[highlight.tone]}`}>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] opacity-80">
                        {highlight.label}
                      </dt>
                      <dd className="mt-1.5 text-2xl font-extrabold leading-tight">{highlight.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <a href="#solicitar" className="btn-primary mt-8 w-full sm:w-auto">
                <Icon name="form" className="h-5 w-5" />
                Solicitar cashback bônus
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <aside
              aria-labelledby="dica-recarga"
              className="h-full rounded-3xl border border-black/[0.07] bg-white p-6 shadow-card sm:p-7"
            >
              <p id="dica-recarga" className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
                <Icon name="info" className="h-5 w-5 shrink-0 text-brand-blue" />
                Dica sobre recargas
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                O sistema possui uma taxa fixa por operação. Por isso, recomendamos recargas a partir de R$
                50,00, pois o cashback ajuda a compensar essa taxa.
              </p>
              <p className="mt-3 text-[13px] font-semibold text-ink-light">
                R$ 50 é uma recomendação. A promoção começa em R$ 100.
              </p>
            </aside>
          </Reveal>

          <Reveal delay={90} className="h-full">
            <aside
              aria-labelledby="saldo-negativo"
              className="h-full rounded-3xl border border-black/[0.07] bg-white p-6 shadow-card sm:p-7"
            >
              <p id="saldo-negativo" className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
                <Icon name="balance" className="h-5 w-5 shrink-0 text-brand-blue" />
                Tem saldo negativo?
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                O bônus promocional é calculado sobre o valor líquido positivo que resta após a compensação do
                saldo negativo.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Recomendamos regularizar o saldo negativo antes da recarga promocional para aproveitar melhor
                o bônus.
              </p>
              <a
                href="#simulador"
                className="mt-4 inline-flex text-[15px] font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue"
              >
                Simular meu caso
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
