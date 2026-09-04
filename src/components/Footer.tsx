import { navLinks, site } from '../data/content';

const footerLinks = navLinks.filter((link) => link.href !== '#inicio');

export function Footer() {
  return (
    <footer className="border-t border-black/[0.07] bg-white">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <img
            src={site.logo}
            alt={`Brasão da ${site.brand}`}
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <div>
            <p className="text-lg font-extrabold text-brand-blue">{site.brand}</p>
            <p className="mt-1 text-sm text-ink-muted">Cantina escolar com conta digital IUUPI.</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-sm font-semibold text-brand-blue underline decoration-brand-blue/35 underline-offset-4 hover:decoration-brand-blue"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-col gap-2 sm:items-end">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-ink-muted transition-colors hover:text-brand-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-black/[0.06]">
        <div className="container-page py-5">
          <p className="text-[13px] text-ink-light">
            {site.brand} • Conta digital IUUPI
          </p>
        </div>
      </div>
    </footer>
  );
}
