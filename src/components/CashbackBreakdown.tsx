import { Fragment } from 'react';
import { Icon } from './Icon';
import { cashbackBreakdown, type BreakdownItem } from '../data/content';

type Variant = 'light' | 'onblue';

const cardTone: Record<Variant, Record<BreakdownItem['tone'], string>> = {
  light: {
    neutral: 'border-black/[0.07] bg-white text-ink',
    bonus: 'border-brand-orange/40 bg-brand-orange-soft text-ink',
    total: 'border-transparent bg-brand-blue text-white',
  },
  onblue: {
    neutral: 'border-white/20 bg-white/10 text-white',
    bonus: 'border-brand-orange/60 bg-brand-orange text-ink',
    total: 'border-transparent bg-white text-brand-blue',
  },
};

const labelTone: Record<Variant, Record<BreakdownItem['tone'], string>> = {
  light: {
    neutral: 'text-ink-light',
    bonus: 'text-[#8a5310]',
    total: 'text-white/75',
  },
  onblue: {
    neutral: 'text-white/70',
    bonus: 'text-[#7a4a0d]',
    total: 'text-brand-blue/70',
  },
};

/**
 * Composição "10% + 10% = 20%".
 * Empilha no celular (com os operadores entre os cards) e vira linha no desktop.
 */
export function CashbackBreakdown({ variant = 'light' }: { variant?: Variant }) {
  const separatorColor = variant === 'onblue' ? 'text-white/60' : 'text-ink-light';

  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
      {cashbackBreakdown.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && (
            <div className={`flex justify-center lg:shrink-0 ${separatorColor}`} aria-hidden="true">
              <Icon name={index === 1 ? 'plus' : 'equals'} className="h-6 w-6" />
            </div>
          )}

          <div
            className={`flex-1 rounded-2xl border px-5 py-5 ${cardTone[variant][item.tone]} ${
              item.tone === 'total' ? 'lg:flex-[1.15]' : ''
            }`}
          >
            <p
              className={`text-[11px] font-bold uppercase tracking-[0.12em] ${labelTone[variant][item.tone]}`}
            >
              {item.label}
            </p>
            <p className="mt-1.5 text-3xl font-extrabold leading-none sm:text-[2rem]">{item.value}</p>
            <p className={`mt-2 text-[13px] leading-snug ${labelTone[variant][item.tone]}`}>{item.note}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
