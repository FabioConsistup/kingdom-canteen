import { FeatureCard } from './FeatureCard';
import { Reveal } from './Reveal';
import { features } from '../data/content';

export function DigitalAccount() {
  return (
    <section id="conta-digital" className="section bg-surface">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-blue">Conta digital IUUPI</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              A cantina na palma da mão
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              A IUUPI é a conta digital utilizada pela cantina. Por meio dela, alunos e responsáveis conseguem
              acompanhar e administrar diferentes aspectos do consumo escolar pelo celular.
            </p>
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
      </div>
    </section>
  );
}
