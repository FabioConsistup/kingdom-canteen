import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { site, steps } from '../data/content';

export function Steps() {
  return (
    <section id="como-participar" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Passo a passo</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Como participar</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Seis passos para solicitar o cashback bônus adicional de 10%.
            </p>
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 60} className="h-full">
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
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={120}>
          <aside
            aria-labelledby="aviso-canal"
            className="mt-8 flex flex-col gap-5 rounded-3xl border border-brand-orange/35 bg-brand-orange-soft p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p id="aviso-canal" className="flex items-center gap-2.5 text-lg font-extrabold text-[#8a5310]">
                <Icon name="info" className="h-6 w-6 shrink-0" />
                O envio é feito pelo formulário desta página
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink sm:text-base">
                Preencha os dados do responsável e do aluno e anexe o comprovante. A solicitação é encaminhada
                para {site.email} e uma confirmação é enviada para o e-mail do responsável informado.
              </p>
            </div>

            <a href="#solicitar" className="btn-primary shrink-0">
              <Icon name="form" className="h-5 w-5" />
              Ir para o formulário
            </a>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
