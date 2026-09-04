import { Icon } from './Icon';
import { NegativeBalanceAlert } from './NegativeBalance';
import { Reveal } from './Reveal';
import { mailtoHref, site, steps } from '../data/content';

export function Steps() {
  return (
    <section id="como-participar" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Passo a passo</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Como participar</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Cinco passos para solicitar o cashback bônus adicional de 10%.
            </p>
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 70} className="h-full">
                <article className="card flex h-full flex-col transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue text-base font-extrabold text-white">
                      {index + 1}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step.title}</h3>
                  <p className="mt-2 flex-1 break-words text-[15px] leading-relaxed text-ink-muted">
                    {step.description}
                  </p>

                  {step.icon === 'mail' && (
                    <a href={mailtoHref} className="btn-primary mt-5 w-full px-4 text-[15px]">
                      <Icon name="mail" className="h-5 w-5" />
                      Enviar comprovante por e-mail
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <NegativeBalanceAlert />
          </Reveal>

          <Reveal delay={90} className="h-full">
            <aside
              aria-labelledby="aviso-email"
              className="h-full rounded-3xl border border-brand-orange/35 bg-brand-orange-soft p-6 sm:p-7"
            >
              <p id="aviso-email" className="flex items-center gap-2.5 text-lg font-extrabold text-[#8a5310]">
                <Icon name="alert" className="h-6 w-6 shrink-0" />
                Importante
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink">
                O comprovante deve ser enviado exclusivamente para{' '}
                <a
                  href={mailtoHref}
                  className="font-bold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:decoration-brand-blue"
                >
                  {site.email}
                </a>
                .
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Comprovantes enviados por WhatsApp, redes sociais ou atendimento presencial não serão aceitos
                para fins desta promoção.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
