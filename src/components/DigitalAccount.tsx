import { FeatureCard } from './FeatureCard';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { features, iuupiApp } from '../data/content';

/**
 * Apresentação do aplicativo Iuupi. Concentra tudo sobre o app — recursos,
 * cadastro e download. Cashback e regulamento ficam nas seções seguintes.
 */
export function DigitalAccount() {
  return (
    <section id="iuupi" className="section bg-white">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Aplicativo Iuupi</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {iuupiApp.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{iuupiApp.intro}</p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature.title}>
              <Reveal delay={index * 60} className="h-full">
                <FeatureCard {...feature} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-8 rounded-3xl border border-black/[0.07] bg-surface p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-xl">
              <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                {iuupiApp.ctaTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:text-base">
                {iuupiApp.ctaText}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              {iuupiApp.stores.map((store) => (
                <a
                  key={store.id}
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center sm:w-auto"
                >
                  <Icon name={store.icon} className="h-5 w-5" />
                  {store.label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-ink-light">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{iuupiApp.note}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
