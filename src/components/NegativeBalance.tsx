import { Icon } from './Icon';
import { negativeBalanceFlow } from '../data/content';

/**
 * Orientação para quem está com a conta negativa. O tom é de recomendação
 * prática, não de advertência.
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
        Se a conta do aluno estiver com saldo negativo, recomendamos primeiro regularizar o valor pendente e,
        somente depois, realizar a recarga que participará da promoção.
      </p>

      <p
        className={`mt-5 rounded-2xl px-5 py-4 text-[15px] font-bold leading-snug ${
          onBlue ? 'bg-brand-orange text-ink' : 'bg-brand-orange-soft text-[#8a5310]'
        }`}
      >
        Primeiro regularize o saldo negativo. Depois faça a recarga promocional.
      </p>

      <p className={`mt-4 text-[15px] leading-relaxed ${onBlue ? 'text-white/85' : 'text-ink-muted'}`}>
        Dessa forma, o valor da nova recarga fica integralmente disponível como saldo positivo na conta.
      </p>
    </aside>
  );
}

/** Exemplo numérico da regularização seguida da recarga promocional. */
export function NegativeBalanceExample() {
  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Passo a passo</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Exemplo com saldo negativo
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Primeiro regularize os R$ 40,00 pendentes. Depois que o saldo estiver regularizado, faça uma nova
        recarga de R$ 100,00 ou mais.
      </p>

      <ol className="mt-6 space-y-2.5">
        {negativeBalanceFlow.map((step, index) => (
          <li key={step.id} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue text-[13px] font-extrabold text-white">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 text-[14px] font-medium text-ink-muted">{step.label}</span>
            <span className="shrink-0 text-base font-bold text-ink">{step.value}</span>
          </li>
        ))}
      </ol>

      <p className="mt-5 rounded-2xl bg-brand-blue px-5 py-4 text-[15px] font-bold leading-snug text-white">
        Recomendamos separar a regularização do saldo negativo da recarga promocional.
      </p>
    </article>
  );
}
