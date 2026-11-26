import SectionHeading from "@/components/ui/SectionHeading";
import { SYSTEMS } from "@/constants";
import SystemProjectCard from "./SystemProjectCard";

export default function SystemsSection() {
  return (
    <section id="systems" className="relative scroll-mt-[calc(var(--header-h)+3.5rem)] bg-transparent px-5 py-16 md:px-8 md:py-20">
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
          <div className="rounded-[2rem] bg-navy-950 p-8 shadow-[0_24px_50px_-30px_rgba(10,26,48,0.8)]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
              Core thesis
            </p>
            <p className="font-display mt-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
              AI should make decisions clearer, institutions stronger, and communities more capable.
            </p>
          </div>
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
