import { CashbackBreakdown } from './CashbackBreakdown';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

export function StandardCashback() {
  return (
    <section id="cashback-padrao" className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-blue">Cashback da conta</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Todas as recargas já têm 10% de cashback
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Independentemente da promoção, as recargas realizadas na conta da cantina já recebem 10% de
              cashback.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
              Durante a campanha de cadastramento facial, recargas que atendam às condições da promoção
              recebem mais 10% de cashback bônus.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10">
            <CashbackBreakdown />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <aside
            aria-labelledby="dica-recarga"
            className="mt-8 flex flex-col gap-5 rounded-3xl border border-black/[0.07] bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p id="dica-recarga" className="flex items-center gap-2.5 text-lg font-extrabold text-ink">
                <Icon name="info" className="h-6 w-6 shrink-0 text-brand-blue" />
                Uma dica para aproveitar melhor sua recarga
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:text-base">
                O sistema possui uma taxa fixa por operação de recarga. Por isso, a orientação é realizar
                recargas de pelo menos R$ 50,00. Dessa forma, o cashback recebido ajuda a compensar o custo da
                taxa.
              </p>
            </div>

            <p className="shrink-0 rounded-2xl border border-brand-blue/20 bg-white px-5 py-4 text-center">
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-light">
                Recarga recomendada
              </span>
              <span className="mt-1 block text-2xl font-extrabold text-brand-blue">R$ 50 ou mais</span>
            </p>
          </aside>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-ink-light">
            <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Os R$ 50,00 são apenas uma recomendação relacionada à taxa fixa — não são o valor da promoção. O
              cashback bônus da campanha exige recarga de valor{' '}
              <strong className="font-bold text-ink-muted">superior a R$ 100,00</strong>.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
