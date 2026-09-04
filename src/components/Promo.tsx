import { CashbackBreakdown } from './CashbackBreakdown';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { promoHighlights, site } from '../data/content';

const toneClasses: Record<'blue' | 'orange' | 'red' | 'white', string> = {
  blue: 'bg-white/10 text-white border border-white/15',
  orange: 'bg-brand-orange text-ink',
  red: 'bg-brand-red text-white',
  white: 'bg-white text-brand-blue',
};

export function Promo() {
  return (
    <section id="cashback" className="section bg-surface">
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

              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Ganhe <span className="text-brand-orange">+10% de cashback bônus</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Todas as recargas já recebem 10% de cashback. Durante a promoção, recargas elegíveis a partir
                de R$ 100,00 recebem mais 10% de bônus, totalizando 20% de cashback.
              </p>

              <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-extrabold text-brand-blue sm:text-lg">
                10% padrão <span className="text-brand-orange">+</span> 10% bônus{' '}
                <span className="text-brand-orange">=</span> 20%
              </p>

              <div className="mt-10">
                <CashbackBreakdown variant="onblue" />
              </div>

              <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {promoHighlights.map((highlight, index) => (
                  <Reveal key={highlight.label} delay={index * 70}>
                    <div className={`h-full rounded-2xl px-5 py-6 ${toneClasses[highlight.tone]}`}>
                      <dt className="text-[13px] font-semibold uppercase leading-snug tracking-[0.08em] opacity-80">
                        {highlight.label}
                      </dt>
                      <dd className="mt-2 text-2xl font-extrabold leading-tight">{highlight.value}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-white/80">
                <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Uma recarga de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(site.promoMin)}{' '}
                  já atende ao valor mínimo da promoção. Válida de {site.period}, mediante as demais condições
                  da campanha.
                </span>
              </p>

              <a href="#solicitar" className="btn-primary mt-8 w-full sm:w-auto">
                <Icon name="form" className="h-5 w-5" />
                Solicitar cashback bônus
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
