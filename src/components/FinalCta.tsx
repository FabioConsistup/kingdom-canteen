import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { mailtoHref } from '../data/content';

export function FinalCta() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-brand-blue-soft px-6 py-12 text-center sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/60"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Já fez sua recarga elegível?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                Envie o comprovante pelo canal oficial para solicitar o cashback bônus.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={mailtoHref} className="btn-primary w-full sm:w-auto">
                  <Icon name="mail" className="h-5 w-5" />
                  Enviar comprovante
                </a>
                <a href="#regulamento" className="btn-secondary w-full sm:w-auto">
                  Ler regulamento
                </a>
              </div>

              <p className="mt-6 text-[13px] text-ink-light">Cashback sujeito às condições da promoção.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
