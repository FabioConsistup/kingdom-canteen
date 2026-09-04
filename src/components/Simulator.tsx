import { useId, useState } from 'react';
import { Icon } from './Icon';
import { formatBRL, site } from '../data/content';

/** Máscara de centavos: "15000" -> 15000 centavos (R$ 150,00). */
function parseCents(raw: string): number {
  const digits = raw.replace(/\D/g, '').slice(0, 9);
  return digits ? Number(digits) : 0;
}

const toBRL = (cents: number) => formatBRL(cents / 100);
/** 10% com arredondamento em centavos — evita erro de ponto flutuante. */
const tenPercent = (cents: number) => Math.round(cents / 10);

const THRESHOLD_CENTS = site.promoThreshold * 100;

type Status =
  | { kind: 'empty' }
  | { kind: 'eligible'; bonus: number }
  | { kind: 'blocked'; reason: 'valor' | 'saldo'; remaining?: number };

function MoneyField({
  id,
  label,
  raw,
  onChange,
  prefix = 'R$',
  describedBy,
}: {
  id: string;
  label: string;
  raw: string;
  onChange: (value: string) => void;
  prefix?: string;
  describedBy?: string;
}) {
  const cents = parseCents(raw);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/25">
        <span aria-hidden="true" className="shrink-0 text-base font-semibold text-ink-light">
          {prefix}
        </span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          placeholder="0,00"
          value={raw ? toBRL(cents).replace(/^R\$\s?/, '') : ''}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={describedBy}
          className="w-full min-w-0 bg-transparent text-lg font-bold text-ink outline-none placeholder:font-medium placeholder:text-ink-light"
        />
      </div>
    </div>
  );
}

export function Simulator() {
  const baseId = useId();
  const [hasNegative, setHasNegative] = useState(false);
  const [negativeRaw, setNegativeRaw] = useState('');
  const [rechargeRaw, setRechargeRaw] = useState('');

  const negativeCents = hasNegative ? parseCents(negativeRaw) : 0;
  const rechargeCents = parseCents(rechargeRaw);

  const standard = tenPercent(rechargeCents);

  const status: Status =
    rechargeCents === 0
      ? { kind: 'empty' }
      : negativeCents > 0
        ? { kind: 'blocked', reason: 'saldo', remaining: rechargeCents - negativeCents }
        : rechargeCents <= THRESHOLD_CENTS
          ? { kind: 'blocked', reason: 'valor' }
          : { kind: 'eligible', bonus: tenPercent(rechargeCents) };

  const bonus = status.kind === 'eligible' ? status.bonus : 0;

  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Simulação</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Simule sua recarga</h3>

      <div className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Saldo atual da conta</legend>
          <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3.5">
            <input
              type="checkbox"
              checked={hasNegative}
              onChange={(event) => setHasNegative(event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-blue"
            />
            <span className="text-[15px] font-medium leading-snug text-ink">
              A conta está com saldo negativo
            </span>
          </label>

          {hasNegative && (
            <div className="mt-3">
              <MoneyField
                id={`${baseId}-saldo`}
                label="Valor do saldo negativo"
                raw={negativeRaw}
                onChange={setNegativeRaw}
                prefix="-R$"
              />
            </div>
          )}
        </fieldset>

        <MoneyField
          id={`${baseId}-recarga`}
          label="Valor da recarga"
          raw={rechargeRaw}
          onChange={setRechargeRaw}
          describedBy={`${baseId}-resultado`}
        />
      </div>

      <div id={`${baseId}-resultado`} aria-live="polite" className="mt-6">
        {status.kind === 'empty' ? (
          <p className="rounded-2xl bg-surface px-5 py-4 text-[15px] text-ink-muted">
            Informe o valor da recarga para simular o cashback.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4">
              <span className="text-[15px] font-medium text-ink-muted">Cashback padrão (10%)</span>
              <span className="shrink-0 text-lg font-bold text-ink">{toBRL(standard)}</span>
            </div>

            <div
              className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${
                status.kind === 'eligible' ? 'bg-brand-orange-soft text-[#8a5310]' : 'bg-surface text-ink-light'
              }`}
            >
              <span className="text-[15px] font-medium">Cashback bônus (+10%)</span>
              <span className="shrink-0 text-lg font-bold">
                {status.kind === 'eligible' ? toBRL(bonus) : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-blue px-5 py-5 text-white">
              <span className="text-[15px] font-semibold">Total de cashback</span>
              <span className="shrink-0 text-xl font-extrabold">{toBRL(standard + bonus)}</span>
            </div>

            {status.kind === 'eligible' ? (
              <p className="flex items-start gap-2 rounded-2xl border border-brand-orange/35 bg-brand-orange-soft px-5 py-4 text-[15px] font-bold text-[#8a5310]">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                Potencialmente elegível à promoção
              </p>
            ) : (
              <div className="rounded-2xl border border-brand-red/30 bg-brand-red-soft px-5 py-4">
                <p className="flex items-start gap-2 text-[15px] font-bold text-[#a92e2e]">
                  <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
                  {status.reason === 'saldo'
                    ? 'Não elegível ao cashback bônus'
                    : 'Esta recarga não atende ao valor mínimo da promoção'}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {status.reason === 'saldo' ? (
                    <>
                      Parte da recarga será utilizada para quitar o saldo negativo, portanto o valor integral
                      do comprovante não ficará positivo na conta.
                      {typeof status.remaining === 'number' && (
                        <>
                          {' '}
                          Saldo após compensação:{' '}
                          <strong className="font-bold text-ink">{toBRL(status.remaining)}</strong>.
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      O bônus promocional exige recarga de valor superior a {formatBRL(site.promoThreshold)}. O
                      cashback padrão de 10% continua valendo normalmente.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-ink-light">
        A elegibilidade final também depende do período, do cadastro ativo e do envio correto do comprovante. A
        simulação é informativa e não garante o bônus.
      </p>
    </article>
  );
}
