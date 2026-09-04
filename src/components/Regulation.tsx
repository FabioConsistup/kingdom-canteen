import { useState } from 'react';
import { Accordion, type AccordionEntry } from './Accordion';
import { Reveal } from './Reveal';
import { regulation, site } from '../data/content';

/** Realça o e-mail oficial dentro dos parágrafos do regulamento. */
function withEmailLink(text: string) {
  if (!text.includes(site.email)) return text;
  const [before, after] = text.split(site.email);
  return (
    <>
      {before}
      <a
        href={`mailto:${site.email}`}
        className="font-semibold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue"
      >
        {site.email}
      </a>
      {after}
    </>
  );
}

export function Regulation() {
  const allIds = regulation.map((item) => item.number);
  const [openIds, setOpenIds] = useState<string[]>([allIds[0]]);
  const allOpen = openIds.length === allIds.length;

  const items: AccordionEntry[] = regulation.map((item) => ({
    id: item.number,
    marker: item.number,
    title: item.title,
    content: (
      <div className="space-y-3">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-relaxed text-ink-muted">
            {withEmailLink(paragraph)}
          </p>
        ))}
      </div>
    ),
  }));

  return (
    <section id="regulamento" className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-blue">Transparência</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Regulamento da promoção
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                Todas as condições da promoção de cashback bônus, na íntegra.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpenIds(allOpen ? [] : allIds)}
              className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
            >
              {allOpen ? 'Recolher tudo' : 'Expandir tudo'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8">
            <Accordion items={items} openIds={openIds} onOpenIdsChange={setOpenIds} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
