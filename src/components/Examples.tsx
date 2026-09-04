import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { NegativeBalanceExample, NegativeBalanceGuidance } from './NegativeBalance';
import { Simulator } from './Simulator';
import { formatBRL, site, totalRate } from '../data/content';

const EXAMPLE_RECHARGE = 150;
const STANDARD = EXAMPLE_RECHARGE * site.standardRate;
const BONUS = EXAMPLE_RECHARGE * site.bonusRate;

function Row({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'bonus';
}) {
  const toneClass = tone === 'bonus' ? 'bg-brand-orange-soft text-[#8a5310]' : 'bg-surface text-ink';

  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${toneClass}`}>
      <dt className="text-[15px] font-medium">{label}</dt>
      <dd className="shrink-0 text-lg font-bold">{value}</dd>
    </div>
  );
}

function PositiveExample() {
  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Recarga elegível</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Exemplo de uma recarga promocional
      </h3>

      <dl className="mt-6 space-y-3">
        <Row label="Recarga" value={formatBRL(EXAMPLE_RECHARGE)} />
        <Row label="Cashback padrão de 10%" value={formatBRL(STANDARD)} />
        <Row label="Cashback bônus de 10%" value={formatBRL(BONUS)} tone="bonus" />
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-blue px-5 py-5 text-white">
          <dt className="text-[15px] font-semibold">Cashback total</dt>
          <dd className="shrink-0 text-xl font-extrabold">{formatBRL(STANDARD + BONUS)}</dd>
        </div>
      </dl>

      <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-2 text-sm font-extrabold text-ink">
        <Icon name="sparkle" className="h-4 w-4" />
        {Math.round(totalRate * 100)}% de cashback total
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Em uma recarga promocional elegível de {formatBRL(EXAMPLE_RECHARGE)}, o total de cashback corresponde
        a {formatBRL(STANDARD + BONUS)}. Os primeiros 10% são o cashback padrão das recargas; os outros 10%
        são o bônus adicional da promoção.
      </p>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-light">
        O bônus promocional está sujeito ao cumprimento de todas as condições da campanha.
      </p>
    </article>
  );
}

export function Examples() {
  return (
    <section id="exemplos" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Na prática</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Exemplos do cashback
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Como o cashback padrão e o bônus da promoção se somam, e o que fazer quando a conta está
              negativa.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <PositiveExample />
          </Reveal>
          <Reveal delay={90} className="h-full">
            <Simulator />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <NegativeBalanceGuidance />
          </Reveal>
          <Reveal delay={90} className="h-full">
            <NegativeBalanceExample />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
