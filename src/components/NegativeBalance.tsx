import { Icon } from './Icon';

type AlertVariant = 'light' | 'onblue';

/**
 * Callout da regra de saldo negativo. Reaparece na promoção, nos passos e nos
 * exemplos — a regra não pode ficar escondida apenas no regulamento.
 */
export function NegativeBalanceAlert({ variant = 'light' }: { variant?: AlertVariant }) {
  const onBlue = variant === 'onblue';

  return (
    <aside
      aria-labelledby={`saldo-negativo-${variant}`}
      className={`rounded-3xl border p-6 sm:p-7 ${
        onBlue ? 'border-white/25 bg-white/10' : 'border-brand-red/30 bg-brand-red-soft'
      }`}
    >
      <p
        id={`saldo-negativo-${variant}`}
        className={`flex items-center gap-2.5 text-lg font-extrabold ${
          onBlue ? 'text-white' : 'text-[#a92e2e]'
        }`}
      >
        <Icon name="alert" className="h-6 w-6 shrink-0" />
        Atenção ao saldo negativo
      </p>

      <p className={`mt-3 text-base font-semibold leading-relaxed ${onBlue ? 'text-white' : 'text-ink'}`}>
        Recargas utilizadas para quitar saldo negativo não participam do cashback bônus promocional.
      </p>

      <p className={`mt-2.5 text-[15px] leading-relaxed ${onBlue ? 'text-white/80' : 'text-ink-muted'}`}>
        O valor integral da recarga informado no comprovante deve permanecer como saldo positivo na conta.
      </p>

      <p className={`mt-2.5 text-[13px] leading-relaxed ${onBlue ? 'text-white/70' : 'text-ink-light'}`}>
        Essa restrição vale para o bônus promocional de +10%. O cashback padrão das recargas continua seguindo
        a regra normal da plataforma.
      </p>
    </aside>
  );
}

const guidanceSteps = [
  {
    label: 'Saldo',
    value: '-R$ 40,00',
    description: 'A conta está com valor pendente.',
  },
  {
    label: 'Primeira operação',
    value: 'Regularizar R$ 40,00',
    description: 'Quite o valor pendente. Essa operação não é a recarga promocional.',
  },
  {
    label: 'Depois',
    value: 'Nova recarga > R$ 100',
    description:
      'Com a conta regularizada, realize uma nova recarga superior a R$ 100,00 para participar da promoção, observando também as demais condições.',
  },
];

/** Orientação prática para quem está com a conta negativa. */
export function NegativeBalanceGuidance() {
  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Orientação</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Está com saldo negativo?</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
        Primeiro regularize o saldo negativo. Depois que a conta estiver sem valores pendentes, faça uma nova
        recarga promocional elegível.
      </p>

      <ol className="mt-6 space-y-3">
        {guidanceSteps.map((step, index) => (
          <li key={step.label} className="flex gap-3 rounded-2xl bg-surface px-4 py-4">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue text-[13px] font-extrabold text-white">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-light">{step.label}</p>
              <p className="mt-0.5 text-base font-bold text-ink">{step.value}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
