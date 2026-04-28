import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { SYSTEMS } from "@/constants";
import SystemProjectCard from "./SystemProjectCard";

export default function SystemsSection() {
  return (
    <section id="systems" className="relative scroll-mt-28 bg-white px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />

      <div className="relative mx-auto max-w-7xl">
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
          <Card className="data-grid-light border-[#00689D]/20 p-8">
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
            <SystemProjectCard key={system.title} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
