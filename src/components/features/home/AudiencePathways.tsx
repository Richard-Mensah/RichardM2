import Link from "next/link";
import { Briefcase, GraduationCap, Mic, Handshake, ArrowRight, type LucideIcon } from "lucide-react";
import { AUDIENCE_PATHWAYS } from "@/constants";

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Mic,
  Handshake,
};

export default function AudiencePathways() {
  return (
    <section className="relative border-y border-line bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-3 text-center">
          <p className="eyebrow">Find your next step</p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
            I welcome you here, let me point you to what matters most in my career and commitment to sustainable development
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE_PATHWAYS.map((pathway) => {
            const Icon = ICONS[pathway.icon] ?? Briefcase;
            return (
              <Link
                key={pathway.audience}
                href={pathway.href}
                className="card-lift group flex flex-col rounded-2xl border border-line bg-surface p-6"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-white transition group-hover:bg-accent">
                  <Icon size={22} />
                </span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-strong">
                  {pathway.audience}
                </p>
                <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">
                  {pathway.headline}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-body">{pathway.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-navy-900 transition group-hover:gap-2.5 group-hover:text-accent-strong">
                  {pathway.cta}
                  <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
