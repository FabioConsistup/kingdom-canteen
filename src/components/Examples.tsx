import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { NegativeBalanceGuidance } from './NegativeBalance';
import { Simulator } from './Simulator';
import { formatBRL, site, totalRate } from '../data/content';

const EXAMPLE_RECHARGE = 150;
const STANDARD = EXAMPLE_RECHARGE * site.standardRate;
const BONUS = EXAMPLE_RECHARGE * site.bonusRate;

const NEGATIVE_BALANCE = -40;
const NEGATIVE_RECHARGE = 120;
const REMAINING = NEGATIVE_RECHARGE + NEGATIVE_BALANCE;

function Row({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'bonus' | 'muted';
}) {
  const toneClass =
    tone === 'bonus'
      ? 'bg-brand-orange-soft text-[#8a5310]'
      : tone === 'muted'
        ? 'bg-brand-red-soft text-[#a92e2e]'
        : 'bg-surface text-ink';

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
      <p className="eyebrow text-brand-blue">Elegível</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Exemplo de uma recarga promocional elegível
      </h3>

      <dl className="mt-6 space-y-3">
        <Row label="Saldo anterior" value="Conta sem saldo negativo" />
        <Row label="Recarga" value={formatBRL(EXAMPLE_RECHARGE)} />
        <Row label="Cashback padrão de 10%" value={formatBRL(STANDARD)} />
        <Row label="Cashback bônus promocional de +10%" value={formatBRL(BONUS)} tone="bonus" />
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
        Os primeiros 10% correspondem ao cashback padrão das recargas. Os outros 10% correspondem ao bônus
        adicional da promoção.
      </p>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-light">
        O bônus promocional está sujeito ao cumprimento de todas as condições da campanha.
      </p>
    </article>
  );
}

function NegativeExample() {
  return (
    <article className="card h-full border-brand-red/25">
      <p className="eyebrow text-[#a92e2e]">Não elegível ao bônus</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Exemplo com saldo negativo na conta
      </h3>

      <dl className="mt-6 space-y-3">
        <Row label="Saldo antes da recarga" value={`-${formatBRL(Math.abs(NEGATIVE_BALANCE))}`} tone="muted" />
        <Row label="Recarga realizada" value={formatBRL(NEGATIVE_RECHARGE)} />
        <Row label="Saldo após compensar o negativo" value={formatBRL(REMAINING)} />
      </dl>

      <p className="mt-5 flex items-start gap-2 rounded-2xl border border-brand-red/30 bg-brand-red-soft px-5 py-4 text-[15px] font-bold text-[#a92e2e]">
        <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
        NÃO elegível ao cashback bônus promocional
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Apesar de a recarga ser superior a R$ 100,00, R$ 40,00 foram utilizados para quitar o saldo negativo
        anterior. Portanto, os R$ 120,00 do comprovante não ficaram integralmente disponíveis como saldo
        positivo e essa recarga não participa da promoção.
      </p>

      <p className="mt-5 rounded-2xl bg-brand-blue px-5 py-4 text-[15px] font-bold leading-snug text-white">
        Para participar da promoção, o valor integral informado no comprovante deve ficar positivo na conta.
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
              Duas situações reais: uma recarga que recebe o bônus e outra que não recebe.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <PositiveExample />
          </Reveal>
          <Reveal delay={90} className="h-full">
            <NegativeExample />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <NegativeBalanceGuidance />
          </Reveal>
          <Reveal delay={90} className="h-full">
            <Simulator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
