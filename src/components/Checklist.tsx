import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { checklist } from '../data/content';

export function Checklist() {
  return (
    <section className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-brand-blue">Confira antes de enviar</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Minha recarga participa da promoção?
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mx-auto mt-9 max-w-3xl space-y-2.5">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-blue-soft text-brand-blue"
                >
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-8 max-w-3xl rounded-3xl bg-brand-blue px-6 py-6 text-center text-lg font-bold leading-snug text-white sm:text-xl">
            Cumpriu todos os requisitos? Sua recarga poderá receber{' '}
            <span className="text-brand-orange">+10% de cashback bônus</span>.
          </p>
        </Reveal>

        <p className="mx-auto mt-4 max-w-3xl text-center text-[13px] text-ink-light">
          A análise é feita pela equipe da Kingdom Canteen. O bônus não é creditado automaticamente.
        </p>
      </div>
    </section>
  );
}
