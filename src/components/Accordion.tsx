import { useId, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

export type AccordionEntry = {
  id: string;
  title: string;
  /** Rótulo curto exibido à esquerda do título (ex.: número do item do regulamento). */
  marker?: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionEntry[];
  /** Ids abertos no primeiro render. */
  defaultOpen?: string[];
  /** Controle externo opcional (usado pelo botão "expandir tudo"). */
  openIds?: string[];
  onOpenIdsChange?: (ids: string[]) => void;
  markerTone?: 'blue' | 'orange';
};

export function Accordion({
  items,
  defaultOpen = [],
  openIds,
  onOpenIdsChange,
  markerTone = 'blue',
}: AccordionProps) {
  const baseId = useId();
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpen);
  const open = openIds ?? internalOpen;

  const toggle = (id: string) => {
    const next = open.includes(id) ? open.filter((item) => item !== id) : [...open, id];
    if (onOpenIdsChange) onOpenIdsChange(next);
    else setInternalOpen(next);
  };

  return (
    <div className="divide-y divide-black/[0.07] overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-card">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-brand-blue-soft/50 sm:px-6"
              >
                {item.marker && (
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                      markerTone === 'orange'
                        ? 'bg-brand-orange-soft text-[#a4620f]'
                        : 'bg-brand-blue-soft text-brand-blue'
                    }`}
                  >
                    {item.marker}
                  </span>
                )}
                <span className="flex-1 text-base font-semibold text-ink sm:text-lg">{item.title}</span>
                <Icon
                  name="chevron"
                  className={`h-5 w-5 shrink-0 text-brand-blue transition-transform duration-300 ${
                    isOpen ? '-rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            {/* grid 0fr -> 1fr permite animar a altura; visibility:hidden retira o
                conteúdo fechado da navegação por teclado e da árvore de acessibilidade */}
            <div
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${
                isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`px-5 pb-6 sm:px-6 ${item.marker ? 'sm:pl-[4.5rem]' : ''}`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
