import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESEARCH_PILLARS } from "@/constants";

export default function ResearchSection() {
  return (
    <section id="research" className="research-ground relative scroll-mt-28 px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Research & publications"
          title="The website is structured as a publishing engine for ideas, not just a CV."
          center
        >
          <p>
            Research areas are presented as future papers, public essays, institutional notes, and
            technical case studies that strengthen Richard&apos;s authority over time.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {RESEARCH_PILLARS.map((pillar) => (
            <Card key={pillar.domain} className="group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/80">
              <div
                className="absolute inset-x-0 top-0 h-2"
                style={{ backgroundColor: pillar.accent }}
              />
              {/* Hover glow */}
              <div
                className="absolute bottom-0 right-0 h-36 w-36 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-20"
                style={{ backgroundColor: pillar.accent }}
              />

              <div className="relative">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em]"
                  style={{ borderColor: `${pillar.accent}55`, color: pillar.accent }}
                >
                  Active research
                </div>

                <div
                  className="mt-4 grid h-14 w-14 place-items-center rounded-2xl text-lg font-black text-white"
                  style={{ backgroundColor: pillar.accent }}
                >
                  {pillar.icon}
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight text-slate-950">
                  {pillar.domain}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.abstract}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
