import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESEARCH_PILLARS } from "@/constants";
import PublicationsSection from "./PublicationsSection";

export default function ResearchSection() {
  return (
    <section id="research" className="research-ground relative px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Research & publications"
          title="Investigating AI, climate, and human systems at the frontier of global development."
          center
        >
          <p>
            Richard&apos;s research is driven by a core belief: that artificial intelligence,
            when designed with people in mind, can meaningfully accelerate progress on the world&apos;s
            hardest problems. His work spans climate intelligence, natural language processing,
            large language models, human-centred AI design, and the institutional frameworks
            needed to govern and deploy AI responsibly — particularly in the Global South.
          </p>
        </SectionHeading>

        {/* Research pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {RESEARCH_PILLARS.map((pillar) => (
            <Card
              key={pillar.domain}
              className="group relative overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/80"
            >
              <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: pillar.accent }} />
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

        {/* Detailed research narrative */}
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#009EDB]">
              Core research focus
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              AI that works for people, not the other way around.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Richard&apos;s research centres on building AI systems that are genuinely useful to
                real people in real contexts — from smallholder farmers in Ghana receiving
                localized climate risk signals to policymakers needing transparent, explainable
                analytics to make better decisions.
              </p>
              <p>
                His interest in NLP and large language models is grounded in a practical question:
                how can language-based AI be designed so that communities with low digital
                literacy, multilingual contexts, or limited connectivity can still access and
                benefit from intelligent systems?
              </p>
              <p>
                As a full-stack developer, Richard closes the gap between research and deployment
                — building end-to-end systems that move from data pipeline to working application,
                ensuring that research insights are not lost in technical handoffs.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3F7E44]">
              Climate AI
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              Climate intelligence for communities on the frontlines.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Climate change is not an abstract threat for the communities Richard works with
                and researches. It is a lived, daily reality. His climate AI research focuses on
                translating complex climate signals — precipitation patterns, temperature
                anomalies, drought indices — into practical, community-readable intelligence.
              </p>
              <p>
                Working with open geospatial datasets and satellite imagery, Richard develops
                models and dashboards that help local governments, NGOs, and communities
                understand what is happening in their environment and plan adaptive responses —
                without needing a data science team to interpret the outputs.
              </p>
              <p>
                This research area directly informs his work on SDG 13 (Climate Action) and
                contributes to a broader evidence base on AI-assisted adaptation in Sub-Saharan
                Africa.
              </p>
            </div>
          </div>
        </div>

        {/* Publications */}
        <PublicationsSection />
      </div>
    </section>
  );
}
