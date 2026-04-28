import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { SYSTEMS } from "@/constants";

export default function SystemsSection() {
  return (
    <section id="systems" className="scroll-mt-28 bg-white px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Projects as systems"
            title="Every project becomes a serious system narrative."
          >
            <p>
              The framing is no longer &ldquo;I built a model.&rdquo; It is problem, approach, and
              impact: the language institutions understand when they evaluate research, partnerships,
              and innovation potential.
            </p>
          </SectionHeading>
          <Card className="data-grid-light p-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00689D]">
              Core thesis
            </p>
            <p className="mt-4 text-3xl font-black leading-tight text-slate-950">
              AI should make decisions clearer, institutions stronger, and communities more capable.
            </p>
          </Card>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SYSTEMS.map((system) => (
            <Card key={system.title} className="flex min-h-[34rem] flex-col overflow-hidden p-7">
              <div
                className="mb-6 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white"
                style={{ backgroundColor: system.color }}
              >
                {system.label}
              </div>
              <h3 className="text-2xl font-black leading-tight text-slate-950">{system.title}</h3>
              <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  <span className="font-black text-slate-950">Problem: </span>
                  {system.problem}
                </p>
                <p>
                  <span className="font-black text-slate-950">Approach: </span>
                  {system.approach}
                </p>
                <p>
                  <span className="font-black text-slate-950">Impact: </span>
                  {system.impact}
                </p>
              </div>
              <a
                href="#collaborate"
                className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-[#00689D] transition hover:gap-3"
              >
                Discuss the system <span>→</span>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
