import {
  BrainCircuit,
  BarChart3,
  CloudSun,
  Code2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "@/constants";

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  BarChart3,
  CloudSun,
  Code2,
  Users,
};

export default function SkillsMatrix() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-on-dark">
      <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.4]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
              Capabilities
            </p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-white md:text-4xl lg:text-[2.7rem]">
              A technical toolkit built for real-world impact
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-on-dark-muted">
              Equally at home in a research notebook and a production codebase â€” from model design
              to deployed application, and from data pipeline to programme delivery.
            </p>
            <a
              href="/richard-mensah-cv.pdf"
              download="Richard-Mensah-CV.pdf"
              className="btn-accent mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            >
              Full skills in CV
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => {
              const Icon = ICONS[group.icon] ?? Code2;
              return (
                <div
                  key={group.area}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-accent-soft/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/20 text-accent-soft">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
                      {group.area}
                    </h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-on-dark-muted"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
