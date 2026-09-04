import { useId, useState } from 'react';
import { Icon } from './Icon';
import { formatBRL, site } from '../data/content';
import { calculateCashback } from '../../shared/cashback';

/** Máscara de centavos: "15000" -> 15000 centavos (R$ 150,00). */
function parseCents(raw: string): number {
  const digits = raw.replace(/\D/g, '').slice(0, 9);
  return digits ? Number(digits) : 0;
}

const toBRL = (cents: number) => formatBRL(cents / 100);

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

function Line({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'bonus' | 'negative' | 'net' | 'total';
}) {
  const styles = {
    default: 'bg-surface text-ink',
    bonus: 'bg-brand-orange-soft text-[#8a5310]',
    negative: 'bg-brand-red-soft text-[#a92e2e]',
    net: 'bg-brand-blue-soft text-brand-blue',
    total: 'bg-brand-blue text-white',
  }[tone];

  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${styles}`}>
      <span className={`text-[15px] ${tone === 'total' ? 'font-semibold' : 'font-medium'}`}>{label}</span>
      <span className={`shrink-0 font-bold ${tone === 'total' ? 'text-xl' : 'text-lg'}`}>{value}</span>
    </div>
  );
}

export function Simulator() {
  const baseId = useId();
  const [hasNegative, setHasNegative] = useState(false);
  const [negativeRaw, setNegativeRaw] = useState('');
  const [rechargeRaw, setRechargeRaw] = useState('');

  const rechargeCents = parseCents(rechargeRaw);
  const negativeBalanceCents = hasNegative ? parseCents(negativeRaw) : 0;

  const result = calculateCashback({ rechargeCents, negativeBalanceCents });
  const showNegative = result.hasNegativeBalance;

  return (
    <article className="card h-full">
      <p className="eyebrow text-brand-blue">Simulação</p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Simule sua recarga</h3>

      <div className="mt-6 space-y-4">
        <MoneyField
          id={`${baseId}-recarga`}
          label="Valor da recarga"
          raw={rechargeRaw}
          onChange={setRechargeRaw}
          describedBy={`${baseId}-resultado`}
        />

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
      </div>

      <div id={`${baseId}-resultado`} aria-live="polite" className="mt-6">
        {rechargeCents === 0 ? (
          <p className="rounded-2xl bg-surface px-5 py-4 text-[15px] text-ink-muted">
            Informe o valor da recarga para simular o cashback.
          </p>
        ) : (
          <div className="space-y-3">
            {showNegative && (
              <>
                <Line label="Recarga" value={toBRL(result.rechargeCents)} />
                <Line
                  label="Saldo negativo compensado"
                  value={`- ${toBRL(result.compensatedCents)}`}
                  tone="negative"
                />
                <Line label="Valor líquido positivo" value={toBRL(result.netCents)} tone="net" />
              </>
            )}

            <Line label="Cashback padrão (10%)" value={toBRL(result.standardCents)} />

            <div
              className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 ${
                result.eligible ? 'bg-brand-orange-soft text-[#8a5310]' : 'bg-surface text-ink-light'
              }`}
            >
              <span className="text-[15px] font-medium">
                {showNegative ? 'Cashback bônus (+10% sobre o valor líquido)' : 'Cashback bônus (+10%)'}
              </span>
              <span className="shrink-0 text-lg font-bold">
                {result.eligible ? toBRL(result.bonusCents) : '—'}
              </span>
            </div>

            <Line label="Total de cashback" value={toBRL(result.totalCents)} tone="total" />

            {result.eligible ? (
              <div className="rounded-2xl border border-brand-orange/35 bg-brand-orange-soft px-5 py-4">
                <p className="flex items-start gap-2 text-[15px] font-bold text-[#8a5310]">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                  Potencialmente elegível à promoção
                </p>
                {showNegative && (
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    O valor líquido positivo após a compensação do saldo negativo é de{' '}
                    <strong className="text-ink">{toBRL(result.netCents)}</strong> e atende ao mínimo de{' '}
                    {formatBRL(site.promoMin)}.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-black/10 bg-surface px-5 py-4">
                <p className="flex items-start gap-2 text-[15px] font-bold text-ink">
                  <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  {showNegative
                    ? 'Não elegível ao cashback bônus'
                    : 'Esta recarga não atende ao valor mínimo da promoção'}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {showNegative ? (
                    <>
                      O valor líquido positivo após a compensação do saldo negativo é de{' '}
                      <strong className="text-ink">{toBRL(result.netCents)}</strong>. A promoção exige pelo
                      menos {formatBRL(site.promoMin)} líquidos.
                      {result.remainingNegativeCents > 0 && (
                        <>
                          {' '}
                          A conta ainda permanecerá negativa em{' '}
                          <strong className="text-ink">-{toBRL(result.remainingNegativeCents)}</strong>.
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      O bônus promocional vale para recargas a partir de {formatBRL(site.promoMin)}. O
                      cashback padrão de 10% continua valendo normalmente.
                    </>
                  )}
                </p>
              </div>
            )}

            {showNegative && (
              <p className="flex items-start gap-2 rounded-2xl border border-brand-blue/25 bg-brand-blue-soft px-5 py-4 text-[14px] leading-relaxed text-ink">
                <Icon name="balance" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                <span>
                  Para aproveitar melhor a promoção, recomendamos regularizar o saldo negativo antes e só
                  depois fazer a recarga promocional — assim o valor cheio da nova recarga entra na base do
                  bônus.
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-[13px] leading-relaxed text-ink-light">
        O cashback bônus promocional é calculado sobre o valor que permanece positivo após a compensação de
        eventual saldo negativo. A elegibilidade final também depende do período, do cadastro ativo e do envio
        correto da solicitação; a simulação é informativa e não garante o bônus.
      </p>
    </article>
  );
}
