import { useId, useState } from 'react';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { formatBRL, site } from '../data/content';

const EXAMPLE_RECHARGE = 150;
const EXAMPLE_BONUS = EXAMPLE_RECHARGE * site.cashbackRate;

/** Máscara simples de centavos: "15000" -> 150,00 */
function parseCents(raw: string): number {
  const digits = raw.replace(/\D/g, '').slice(0, 9);
  return digits ? Number(digits) / 100 : 0;
}

export function CashbackExample() {
  const inputId = useId();
  const [raw, setRaw] = useState('');
  const amount = parseCents(raw);
  const eligibleValue = amount > site.minValue;
  const bonus = amount * site.cashbackRate;

  return (
    <section className="section bg-white pt-0 sm:pt-0 lg:pt-0">
      <div className="container-page grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal className="h-full">
          <article className="card h-full">
            <p className="eyebrow text-brand-blue">Veja como funciona</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Exemplo da promoção
            </h2>

            <dl className="mt-7 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface px-5 py-4">
                <dt className="text-[15px] font-medium text-ink-muted">Recarga</dt>
                <dd className="text-lg font-bold text-ink">{formatBRL(EXAMPLE_RECHARGE)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-orange-soft px-5 py-4">
                <dt className="text-[15px] font-medium text-[#8a5310]">Cashback bônus</dt>
                <dd className="text-lg font-bold text-[#8a5310]">+ {formatBRL(EXAMPLE_BONUS)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-blue px-5 py-5 text-white">
                <dt className="text-[15px] font-semibold">Saldo correspondente à recarga + bônus</dt>
                <dd className="text-xl font-extrabold">{formatBRL(EXAMPLE_RECHARGE + EXAMPLE_BONUS)}</dd>
              </div>
            </dl>

            <p className="mt-5 text-[13px] leading-relaxed text-ink-light">
              Exemplo considerando uma recarga elegível e o cumprimento das demais condições da promoção.
            </p>
          </article>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <article className="card h-full">
            <p className="eyebrow text-brand-blue">Simulação</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Simule uma recarga
            </h3>

            <label htmlFor={inputId} className="mt-6 block text-sm font-semibold text-ink">
              Valor da recarga
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/25">
              <span aria-hidden="true" className="text-base font-semibold text-ink-light">
                R$
              </span>
              <input
                id={inputId}
                inputMode="numeric"
                autoComplete="off"
                placeholder="0,00"
                value={raw ? formatBRL(amount).replace(/^R\$\s?/, '') : ''}
                onChange={(event) => setRaw(event.target.value)}
                aria-describedby={`${inputId}-resultado`}
                className="w-full min-w-0 bg-transparent text-lg font-bold text-ink outline-none placeholder:font-medium placeholder:text-ink-light"
              />
            </div>

            <div id={`${inputId}-resultado`} aria-live="polite" className="mt-5">
              {amount <= 0 ? (
                <p className="rounded-2xl bg-surface px-5 py-4 text-[15px] text-ink-muted">
                  Digite um valor para simular o cashback bônus.
                </p>
              ) : eligibleValue ? (
                <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange-soft px-5 py-4">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-[#8a5310]">
                    <Icon name="check" className="h-5 w-5 shrink-0" />
                    Cashback bônus de {formatBRL(bonus)}
                  </p>
                  <p className="mt-1.5 text-sm text-[#8a5310]/85">
                    Recarga + bônus: <strong>{formatBRL(amount + bonus)}</strong>
                  </p>
                </div>
              ) : (
                <p className="flex items-start gap-2 rounded-2xl border border-brand-red/25 bg-brand-red-soft px-5 py-4 text-[15px] font-semibold text-[#a92e2e]">
                  <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
                  Esta recarga não atende ao valor mínimo da promoção.
                </p>
              )}
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-ink-light">
              A simulação é apenas informativa e não garante a elegibilidade da recarga, que depende do
              cumprimento de todas as condições da promoção.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
