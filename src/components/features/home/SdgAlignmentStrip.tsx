import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRIORITY_GOALS } from "@/constants";

export default function SdgAlignmentStrip() {
  return (
    <section className="border-y border-line bg-surface-card">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">SDG alignment</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
              The global goals my work moves
            </h2>
            <p className="mt-5 text-base leading-8 text-body">
              I map my work to the Sustainable Development Goals it genuinely touches, not all
              seventeen, but the few where AI, education and climate action can make a measurable
              difference. It keeps me honest about whether what I build actually moves the needle.
            </p>
            <Link
              href="/sdgs"
              className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            >
              Full SDG impact
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="flex gap-3 rounded-xl border border-line bg-surface p-4"
              >
                <span
                  className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[11px] font-black text-white"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.code.replace("SDG ", "")}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{goal.title}</p>
                  <p className="mt-1 text-xs leading-5 text-body">{goal.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
