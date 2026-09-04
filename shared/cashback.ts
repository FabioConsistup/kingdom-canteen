/**
 * Cálculo do cashback da Kingdom Canteen.
 *
 * Todos os valores circulam em CENTAVOS (inteiros) para não acumular erro de
 * ponto flutuante. A conversão para reais acontece só na formatação.
 *
 * Duas bases diferentes convivem aqui:
 *  - cashback padrão: 10% sobre o valor cheio da recarga, sempre;
 *  - cashback bônus promocional: 10% sobre o valor LÍQUIDO POSITIVO, ou seja,
 *    o que sobra da recarga depois de compensar eventual saldo negativo.
 */

/** Valor mínimo da promoção, em centavos — aplicado sobre o valor líquido. */
export const PROMO_MIN_CENTS = 100_00;

export const STANDARD_RATE = 0.1;
export const BONUS_RATE = 0.1;

/** 10% arredondado ao centavo. */
const tenPercent = (cents: number) => Math.round(cents / 10);

export type CashbackInput = {
  /** Valor da recarga, em centavos (>= 0). */
  rechargeCents: number;
  /** Saldo negativo da conta em módulo, em centavos (>= 0). Zero se não houver. */
  negativeBalanceCents?: number;
};

export type CashbackResult = {
  rechargeCents: number;
  /** Saldo negativo informado, em módulo. */
  negativeBalanceCents: number;
  /** Quanto da recarga foi efetivamente usado para compensar o negativo. */
  compensatedCents: number;
  /** O que sobra positivo na conta — base do bônus promocional. */
  netCents: number;
  /** Saldo que continua negativo quando a recarga não cobre a dívida. */
  remainingNegativeCents: number;
  /** 10% sobre o valor cheio da recarga. */
  standardCents: number;
  /** 10% sobre o valor líquido, apenas quando elegível. */
  bonusCents: number;
  totalCents: number;
  /** Verdadeiro quando o valor líquido atinge o mínimo da promoção. */
  eligible: boolean;
  /** Houve saldo negativo a compensar. */
  hasNegativeBalance: boolean;
};

/**
 * Regra vigente: o valor usado para quitar saldo negativo não entra na base do
 * cashback bônus, e o mínimo de R$ 100,00 é conferido sobre o valor líquido.
 */
export function calculateCashback({
  rechargeCents,
  negativeBalanceCents = 0,
}: CashbackInput): CashbackResult {
  const recharge = Math.max(Math.trunc(rechargeCents), 0);
  const negative = Math.max(Math.trunc(negativeBalanceCents), 0);

  const compensated = Math.min(negative, recharge);
  const net = Math.max(recharge - negative, 0);
  const remainingNegative = Math.max(negative - recharge, 0);

  const standard = tenPercent(recharge);
  const eligible = net >= PROMO_MIN_CENTS;
  const bonus = eligible ? tenPercent(net) : 0;

  return {
    rechargeCents: recharge,
    negativeBalanceCents: negative,
    compensatedCents: compensated,
    netCents: net,
    remainingNegativeCents: remainingNegative,
    standardCents: standard,
    bonusCents: bonus,
    totalCents: standard + bonus,
    eligible,
    hasNegativeBalance: negative > 0,
  };
}
