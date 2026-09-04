import { Icon, type IconName } from './Icon';

type FeatureCardProps = {
  icon: IconName;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="card h-full transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{description}</p>
    </article>
  );
}
