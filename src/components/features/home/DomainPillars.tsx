import Link from "next/link";
import {
  BrainCircuit,
  BarChart3,
  CloudSun,
  Users,
  Globe2,
  Target,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { HOME_DOMAINS } from "@/constants";

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  BarChart3,
  CloudSun,
  Users,
  Globe2,
  Target,
};

export default function DomainPillars() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-3xl">
        <p className="eyebrow">What I do</p>
        <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl lg:text-[2.7rem]">
          Six domains, one mission: technology and leadership in service of people
        </h2>
        <p className="mt-5 text-base leading-8 text-body md:text-lg">
          From machine-learning systems to grassroots youth programmes, every strand of the work
          connects back to the Sustainable Development Goals and the communities they serve.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HOME_DOMAINS.map((domain, i) => {
          const Icon = ICONS[domain.icon] ?? Target;
          return (
            <Link
              key={domain.title}
              href={domain.href}
              className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-card p-7"
            >
              {/* index watermark */}
              <span className="font-display pointer-events-none absolute -right-2 -top-4 text-7xl font-semibold text-surface-muted transition group-hover:text-accent-tint">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-tint text-accent-strong transition group-hover:bg-navy-900 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                  {domain.tag}
                </span>
              </div>

              <h3 className="relative mt-6 text-xl font-bold tracking-[-0.01em] text-ink">
                {domain.title}
              </h3>
              <p className="relative mt-2.5 flex-1 text-sm leading-7 text-body">{domain.blurb}</p>

              <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-navy-900 transition group-hover:text-accent-strong">
                Explore
                <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
