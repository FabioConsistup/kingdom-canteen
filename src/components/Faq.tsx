import { Accordion, type AccordionEntry } from './Accordion';
import { Reveal } from './Reveal';
import { faq } from '../data/content';

export function Faq() {
  const items: AccordionEntry[] = faq.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: <p className="text-[15px] leading-relaxed text-ink-muted">{item.answer}</p>,
  }));

  return (
    <section id="faq" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Dúvidas frequentes</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Perguntas e respostas
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8">
            <Accordion items={items} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
