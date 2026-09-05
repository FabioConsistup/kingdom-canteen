import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { navLinks, site } from '../data/content';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'border-black/[0.07] shadow-soft' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
          aria-label={`${site.brand} — ir para o início`}
        >
          <img
            src={site.logo}
            alt={`Brasão da ${site.brand}`}
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
          />
          <span className="text-[15px] font-extrabold leading-tight tracking-tight text-brand-blue sm:text-base">
            Kingdom
            <span className="block font-bold text-ink-muted">Canteen</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-muted transition-colors hover:bg-brand-blue-soft hover:text-brand-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#cashback" className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
            Ver promoção
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/[0.08] text-brand-blue transition-colors hover:bg-brand-blue-soft lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`grid overflow-hidden border-t border-black/[0.06] bg-white transition-[grid-template-rows,visibility] duration-300 ease-out lg:hidden ${
          menuOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr] border-transparent'
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Navegação principal (mobile)" className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-brand-blue-soft hover:text-brand-blue"
              >
                {link.label}
              </a>
            ))}
            <a href="#cashback" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 w-full sm:hidden">
              Ver promoção
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
