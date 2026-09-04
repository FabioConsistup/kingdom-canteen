import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { promoHighlights } from '../data/content';

const toneClasses: Record<'blue' | 'orange' | 'red', string> = {
  blue: 'bg-white/10 text-white',
  orange: 'bg-brand-orange text-ink',
  red: 'bg-brand-red text-white',
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
                Durante o cadastramento facial
              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Ganhe <span className="text-brand-orange">10% de cashback bônus</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Durante o período de cadastramento facial, recargas elegíveis acima de R$ 100,00 poderão
                receber um cashback bônus adicional de 10%.
              </p>

              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {promoHighlights.map((highlight, index) => (
                  <Reveal key={highlight.label} delay={index * 80}>
                    <div
                      className={`h-full rounded-2xl px-5 py-6 ${toneClasses[highlight.tone]} ${
                        highlight.tone === 'blue' ? 'border border-white/15' : ''
                      }`}
                    >
                      <dt className="text-[13px] font-semibold uppercase tracking-[0.1em] opacity-80">
                        {highlight.label}
                      </dt>
                      <dd className="mt-2 text-2xl font-extrabold leading-tight sm:text-[1.75rem]">
                        {highlight.value}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-white/75">
                <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  A recarga precisa ter valor <strong className="font-bold text-white">superior</strong> a R$
                  100,00. Uma recarga de exatamente R$ 100,00 não é elegível.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
