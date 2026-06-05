import Image from "next/image";
import Link from "next/link";
import { RESEARCH_PILLARS, WRITING_IDEAS } from "@/constants";

const THESES = [
  {
    accent: "#4f8bff",
    thesis: "AI adoption in Africa will be determined by institutional readiness, not just model access.",
    elaboration: "The bottleneck is not the technology. It is whether universities, ministries, and NGOs are structured to adopt, govern, and maintain intelligent systems. Building AI capacity means building institutions first.",
  },
  {
    accent: "#2f6bea",
    thesis: "Climate intelligence must be community-readable before it can be community-actionable.",
    elaboration: "The most sophisticated climate model is useless if communities cannot understand, trust, or act on its outputs. Translating complexity into practical intelligence is not a communications problem. It is a design problem.",
  },
  {
    accent: "#4f8bff",
    thesis: "The next generation of AI leaders will come from the Global South, if we build the pathways now.",
    elaboration: "Talent is evenly distributed. Opportunity is not. Every scholarship facilitated, every fellowship programme designed, and every training cohort delivered is infrastructure for a future that looks different from the present.",
  },
];

const PILLAR_ELABORATIONS: Record<string, string> = {
  "AI & Data Science": "Richard&apos;s research insists that applied machine learning must be grounded in the realities of the communities it serves. Predictive models that work only in high-resource environments are not universal. They are exclusive. The research agenda focuses on building intelligence that is genuinely portable across contexts.",
  "AI & Climate Change": "Climate risk is not abstract for the communities Richard works with. It is a daily reality. His climate AI work focuses on translating complex signals into actionable intelligence, without requiring a data science team to interpret the outputs. The goal is community-readable risk.",
  "Youth Leadership Systems": "Mentorship that inspires without equipping is insufficient. Richard&apos;s approach to youth leadership centres on building structured knowledge systems, measurable outcomes, and global pathways, not just inspiration. The aim is to make leadership development scalable and evidence-based.",
  "Policy, Ethics & Institutions": "AI governance frameworks designed in the Global North often fail when applied elsewhere. Richard&apos;s policy work proposes locally-grounded accountability models that reflect the governance realities, institutional capacities, and community values of Sub-Saharan Africa and South Asia.",
};

export default function ThoughtLeadershipPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">Thought Leadership</p>
        <h1 className="mt-4 text-balance text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
          AI that works for people, not the other way around.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-body">
          Frameworks, perspectives, and provocations on the role of artificial intelligence
          in society, governance, and the Global South, based on practice, not just theory.
        </p>

        {/* Thesis cards */}
        <div className="mt-12 space-y-5">
          {THESES.map((t) => (
            <div
              key={t.thesis}
              className="rounded-2xl bg-navy-950 p-8"
              style={{ borderLeft: `4px solid ${t.accent}` }}
            >
              <p className="text-lg font-black leading-snug text-white md:text-xl">&ldquo;{t.thesis}&rdquo;</p>
              <p className="mt-4 text-sm leading-7 text-on-dark-muted">{t.elaboration}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-12 h-56 overflow-hidden rounded-2xl">
          <Image src="/research/thought-leadership-speaking.jpg" alt="International roundtable discussion" fill className="object-cover" />
        </div>

        {/* Pillar elaborations */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {RESEARCH_PILLARS.map((pillar) => (
            <div
              key={pillar.domain}
              className="glass rounded-2xl p-6 shadow-sm"
            >
              <div
                className="h-1 rounded-full"
                style={{ backgroundColor: pillar.accent }}
              />
              <h3 className="mt-5 text-base font-black text-ink">{pillar.domain}</h3>
              <p className="mt-3 text-sm leading-7 text-body">
                {PILLAR_ELABORATIONS[pillar.domain] ?? pillar.abstract}
              </p>
            </div>
          ))}
        </div>

        {/* Essays in progress */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-navy-900 p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-accent-soft">Public essays in progress</p>
          <ul className="mt-5 space-y-3">
            {WRITING_IDEAS.map((idea) => (
              <li key={idea} className="flex items-start gap-3 text-sm leading-6 text-on-dark-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-soft" />
                {idea}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-navy-900 p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-soft">Engage with the ideas</p>
          <p className="mt-3 text-base leading-7 text-on-dark-muted">
            Read the full essays on the blog, or reach out to discuss frameworks, collaborations, or speaking engagements.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/blog" className="btn-accent rounded-full px-6 py-2.5 text-sm font-black">
              Read essays
            </Link>
            <Link href="/contact" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-black">
              Discuss ideas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
