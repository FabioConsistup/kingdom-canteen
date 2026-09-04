import { describe, expect, it } from 'vitest';
import { calculateCashback } from './cashback';

/** Atalho: reais -> centavos, para os casos ficarem legíveis. */
const brl = (value: number) => Math.round(value * 100);

const run = (recharge: number, negative = 0) =>
  calculateCashback({ rechargeCents: brl(recharge), negativeBalanceCents: brl(negative) });

/**
 * O Intl usa espaço não separável (U+00A0) entre "R$" e o número; normalizamos
 * para espaço comum só para as asserções ficarem legíveis.
 */
const format = (cents: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(cents / 100)
    .replace(/\u00A0/g, ' ');

describe('calculateCashback — sem saldo negativo', () => {
  it('caso A: saldo 0 + recarga 500 → bônus sobre os 500', () => {
    const r = run(500);
    expect(r.netCents).toBe(brl(500));
    expect(r.standardCents).toBe(brl(50));
    expect(r.bonusCents).toBe(brl(50));
    expect(r.totalCents).toBe(brl(100));
    expect(r.eligible).toBe(true);
  });

  it('recarga de exatamente R$ 100,00 é elegível', () => {
    const r = run(100);
    expect(r.eligible).toBe(true);
    expect(r.bonusCents).toBe(brl(10));
  });

  it('recarga de R$ 99,99 não é elegível', () => {
    const r = run(99.99);
    expect(r.eligible).toBe(false);
    expect(r.bonusCents).toBe(0);
    expect(r.standardCents).toBe(brl(10)); // 10% de 99,99 arredondado
  });
});

describe('calculateCashback — com saldo negativo', () => {
  it('caso B: -350 + recarga 500 → líquido 150, bônus 15', () => {
    const r = run(500, 350);
    expect(r.compensatedCents).toBe(brl(350));
    expect(r.netCents).toBe(brl(150));
    expect(r.standardCents).toBe(brl(50));
    expect(r.bonusCents).toBe(brl(15));
    expect(r.totalCents).toBe(brl(65));
    expect(r.eligible).toBe(true);
  });

  it('caso C: -350 + recarga 450 → líquido 100, bônus 10', () => {
    const r = run(450, 350);
    expect(r.netCents).toBe(brl(100));
    expect(r.standardCents).toBe(brl(45));
    expect(r.bonusCents).toBe(brl(10));
    expect(r.totalCents).toBe(brl(55));
    expect(r.eligible).toBe(true);
  });

  it('-350 + recarga 449,99 → líquido 99,99, sem bônus', () => {
    const r = run(449.99, 350);
    expect(r.netCents).toBe(brl(99.99));
    expect(r.bonusCents).toBe(0);
    expect(r.eligible).toBe(false);
  });

  it('caso D: -350 + recarga 400 → líquido 50, sem bônus', () => {
    const r = run(400, 350);
    expect(r.netCents).toBe(brl(50));
    expect(r.standardCents).toBe(brl(40));
    expect(r.bonusCents).toBe(0);
    expect(r.eligible).toBe(false);
  });

  it('caso E: -350 + recarga 350 → líquido 0, sem bônus', () => {
    const r = run(350, 350);
    expect(r.netCents).toBe(0);
    expect(r.standardCents).toBe(brl(35));
    expect(r.bonusCents).toBe(0);
    expect(r.remainingNegativeCents).toBe(0);
    expect(r.eligible).toBe(false);
  });

  it('caso F: -350 + recarga 300 → líquido 0 e conta segue negativa em 50', () => {
    const r = run(300, 350);
    expect(r.netCents).toBe(0);
    expect(r.compensatedCents).toBe(brl(300));
    expect(r.remainingNegativeCents).toBe(brl(50));
    expect(r.standardCents).toBe(brl(30));
    expect(r.bonusCents).toBe(0);
    expect(r.eligible).toBe(false);
  });
});

describe('precisão monetária e formatação pt-BR', () => {
  it('não acumula erro de ponto flutuante', () => {
    const r = run(0.7, 0.1); // líquido 0,60
    expect(r.netCents).toBe(60);
    expect(r.standardCents).toBe(7); // 10% de 70 centavos
  });

  it('formata os valores do caso B em pt-BR', () => {
    const r = run(500, 350);
    expect(format(r.standardCents)).toBe('R$ 50,00');
    expect(format(r.bonusCents)).toBe('R$ 15,00');
    expect(format(r.totalCents)).toBe('R$ 65,00');
    expect(format(r.netCents)).toBe('R$ 150,00');
  });

  it('ignora entradas negativas ou inválidas', () => {
    const r = calculateCashback({ rechargeCents: -100, negativeBalanceCents: -50 });
    expect(r.rechargeCents).toBe(0);
    expect(r.negativeBalanceCents).toBe(0);
    expect(r.totalCents).toBe(0);
    expect(r.eligible).toBe(false);
  });
});
