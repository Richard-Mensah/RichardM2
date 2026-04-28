import CollaborationForm from "./CollaborationForm";
import { PRIORITY_GOALS } from "@/constants";

export default function CollaborationSection() {
  return (
    <section id="collaborate" className="relative scroll-mt-28 overflow-hidden">
      <div className="sdg-band absolute inset-x-0 top-0 z-10 h-[3px]" />

      <div className="grid min-h-[680px] lg:grid-cols-[1fr_1fr]">
        {/* Left: dark context panel */}
        <div className="flex flex-col justify-center bg-slate-950 px-8 py-24 md:px-12">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">
            Contact + collaboration
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            I work with institutions, startups, and governments building the future with AI.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-400">
            Use the collaboration desk for research partnerships, AI systems, institutional
            training, youth programs, speaking, climate intelligence, and SDG-aligned innovation.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold text-white backdrop-blur"
                style={{ borderColor: `${goal.color}55` }}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: goal.color }}
                />
                {goal.code} — {goal.title}
              </div>
            ))}
          </div>
        </div>

        {/* Right: form panel */}
        <div className="flex items-center justify-center bg-white px-8 py-24 md:px-12">
          <div className="w-full max-w-lg">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00689D]">
              Collaboration desk
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">Start a conversation</h3>
            <div className="mt-7">
              <CollaborationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
