import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESEARCH_PILLARS } from "@/constants";

export default function ResearchSection() {
  return (
    <section id="research" className="scroll-mt-28 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {RESEARCH_PILLARS.map((pillar) => (
            <Card key={pillar.domain} className="relative overflow-hidden p-7">
              <div
                className="absolute inset-x-0 top-0 h-2"
                style={{ backgroundColor: pillar.accent }}
              />
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl text-lg font-black text-white"
                style={{ backgroundColor: pillar.accent }}
              >
                {pillar.icon}
              </div>
              <h3 className="mt-8 text-2xl font-black leading-tight text-slate-950">
                {pillar.domain}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.abstract}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
