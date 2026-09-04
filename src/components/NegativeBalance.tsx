import { Icon } from './Icon';
import { negativeBalanceFlow } from '../data/content';

/**
 * Explica a base de cálculo do bônus quando há saldo negativo. O tom é de
 * orientação: a recarga continua participando, sobre o valor líquido positivo.
 */
export function NegativeBalanceGuidance({ variant = 'light' }: { variant?: 'light' | 'onblue' }) {
  const onBlue = variant === 'onblue';

  return (
    <aside
      aria-labelledby={`saldo-negativo-${variant}`}
      className={`h-full rounded-3xl border p-6 sm:p-7 ${
        onBlue ? 'border-white/25 bg-white/10' : 'border-black/[0.07] bg-white shadow-card'
      }`}
    >
      <p
        id={`saldo-negativo-${variant}`}
        className={`flex items-center gap-2.5 text-xl font-extrabold ${onBlue ? 'text-white' : 'text-ink'}`}
      >
        <Icon name="balance" className={`h-6 w-6 shrink-0 ${onBlue ? 'text-white' : 'text-brand-blue'}`} />
        Está com saldo negativo?
      </p>

      <p className={`mt-4 text-[15px] leading-relaxed ${onBlue ? 'text-white/85' : 'text-ink-muted'}`}>
        Se houver saldo negativo, ele será descontado do valor da recarga para fins de cálculo do cashback
        bônus. O bônus adicional de 10% será calculado apenas sobre o valor líquido positivo restante.
      </p>

      <p
        className={`mt-5 rounded-2xl px-5 py-4 text-[15px] font-bold leading-snug ${
          onBlue ? 'bg-brand-orange text-ink' : 'bg-brand-orange-soft text-[#8a5310]'
        }`}
      >
        O valor líquido positivo precisa ser de R$ 100,00 ou mais para receber o bônus.
      </p>

      <p className={`mt-4 text-[15px] leading-relaxed ${onBlue ? 'text-white/85' : 'text-ink-muted'}`}>
        Para melhor aproveitamento da promoção, recomendamos regularizar eventuais saldos negativos antes de
        realizar a recarga promocional — assim o valor cheio da recarga entra na base do bônus.
      </p>
    </aside>
  );
}

/** Exemplo numérico da compensação do saldo negativo. */
export function NegativeBalanceExample() {
  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Exemplo com saldo negativo</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Como o bônus é calculado
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Os R$ 350,00 usados para compensar o saldo negativo saem da base da promoção. O bônus de 10% incide
        somente sobre os R$ 150,00 que permanecem positivos.
      </p>

      <ol className="mt-6 space-y-2.5">
        {negativeBalanceFlow.map((step) => {
          const isBonus = step.id === 'bonus';
          const isNet = step.id === 'liquido';

          return (
            <li
              key={step.id}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 ${
                isBonus
                  ? 'bg-brand-orange-soft text-[#8a5310]'
                  : isNet
                    ? 'bg-brand-blue-soft text-brand-blue'
                    : 'bg-surface text-ink-muted'
              }`}
            >
              <span className="min-w-0 flex-1 text-[14px] font-medium">{step.label}</span>
              <span
                className={`shrink-0 text-base font-bold ${
                  isBonus || isNet ? '' : 'text-ink'
                }`}
              >
                {step.value}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 rounded-2xl bg-brand-blue px-5 py-4 text-[15px] font-bold leading-snug text-white">
        O cashback padrão de 10% continua sendo calculado sobre o valor cheio da recarga: R$ 50,00.
      </p>
    </article>
  );
}
