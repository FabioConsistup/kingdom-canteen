import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { site } from '../data/content';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      {/* Formas decorativas inspiradas no brasão da marca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-brand-blue-soft/70 blur-[2px]" />
        <div className="absolute -left-28 top-40 h-64 w-64 rounded-full bg-brand-orange-soft/70" />
      </div>

      <div className="container-page relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Mais praticidade para a{' '}
              <span className="relative whitespace-nowrap text-brand-blue">rotina escolar.</span>
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Com a Kingdom Canteen e a conta digital IUUPI, pais e responsáveis podem acompanhar o consumo,
              fazer recargas e organizar a rotina da cantina pelo celular.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-7 inline-flex flex-col gap-1 rounded-2xl border border-brand-orange/30 bg-brand-orange-soft/60 px-5 py-4">
              <p className="flex items-center gap-2.5 text-[15px] font-bold text-ink sm:text-base">
                <Icon name="sparkle" className="h-4 w-4 shrink-0 text-[#a4620f]" />
                Na promoção: 10% padrão + 10% de bônus em recargas elegíveis.
              </p>
              <p className="pl-[26px] text-[13px] font-medium text-ink-muted">
                {site.period} • Consulte as condições.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#promocao" className="btn-primary w-full sm:w-auto">
                Ver promoção
              </a>
              <a href="#conta-digital" className="btn-secondary w-full sm:w-auto">
                Conhecer a conta digital
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-[2.25rem] border border-black/[0.06] bg-gradient-to-b from-brand-blue-soft/80 to-white p-8 shadow-card sm:p-10">
              <img
                src={site.logo}
                alt="Logotipo da Kingdom Canteen: brasão com coroa, talheres, livro e castelo"
                width={320}
                height={320}
                className="mx-auto h-auto w-52 object-contain drop-shadow-[0_12px_28px_rgba(23,32,51,0.18)] sm:w-64"
              />

              <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">
                Cantina escolar digital
              </p>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-3 hidden rotate-[-4deg] rounded-2xl bg-brand-blue px-5 py-3 text-white shadow-card-hover sm:block"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Conta digital
              </span>
              <span className="text-lg font-extrabold">IUUPI</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
