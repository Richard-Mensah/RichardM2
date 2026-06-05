import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "8+", label: "Countries" },
  { value: "10+", label: "Conferences" },
  { value: "3", label: "Focus Areas" },
  { value: "2", label: "Continents" },
];

const PRESENTATIONS = [
  {
    era: "2024",
    title: "AI Ethics & Governance Forum",
    location: "United Kingdom",
    contribution: "Presented on structural gaps in AI governance frameworks when applied to Sub-Saharan Africa and South Asia, proposing a locally-grounded accountability model.",
  },
  {
    era: "2024",
    title: "UN SDG Youth Convening",
    location: "International (Virtual + In-Person)",
    contribution: "Panellist on the role of technology in accelerating SDG 4 and SDG 9 outcomes for young people in the Global South.",
  },
  {
    era: "2023",
    title: "Climate Intelligence Summit",
    location: "Ghana",
    contribution: "Delivered a session on translating satellite-derived climate signals into community-readable risk narratives for adaptation planning in sub-Saharan communities.",
  },
  {
    era: "2023",
    title: "Youth Leadership Assembly",
    location: "Ghana & United Kingdom",
    contribution: "Keynoted on next-generation AI leadership pathways, mentorship systems, and the institutional conditions needed to build African AI talent pipelines.",
  },
];

const TOPICS = [
  "AI Ethics & Governance",
  "UN SDG Convenings",
  "Climate Intelligence",
  "Youth Leadership",
  "Data Science Forums",
  "Entrepreneurship & Innovation",
];

export default function ConferencePresentationsPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">Conference Presentations</p>
        <h1 className="mt-4 text-balance text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
          Carrying the Global South&apos;s voice into global rooms.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-body">
          Speaking at AI ethics forums, UN SDG convenings, youth leadership assemblies, and
          climate intelligence summits, bringing practitioner insight from Ghana, the UK, and
          the broader Global South.
        </p>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line glass p-5 text-center shadow-sm">
              <p className="text-3xl font-black tracking-[-0.04em] text-accent-strong">{s.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 h-64 overflow-hidden rounded-2xl">
          <Image src="/research/conference-presentations-hero.jpg" alt="Richard Mensah presenting at a conference" fill className="object-cover" />
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-strong">Selected presentations</p>
          <div className="mt-6 space-y-0">
            {PRESENTATIONS.map((p, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-accent-strong bg-white" />
                  {i < PRESENTATIONS.length - 1 && (
                    <div className="w-px flex-1 bg-accent-strong/20" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-black text-accent-strong">{p.era}</span>
                  <h3 className="mt-1 text-lg font-black text-ink">{p.title}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-muted">{p.location}</p>
                  <p className="mt-2 text-sm leading-7 text-body">{p.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics grid */}
        <div className="mt-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">Speaking topics</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {TOPICS.map((topic) => (
              <div key={topic} className="rounded-xl border border-line bg-navy-900 px-4 py-3 text-sm font-bold text-accent-soft">
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-navy-900 p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-soft">Speaking invitations</p>
          <p className="mt-3 text-base leading-7 text-on-dark-muted">
            Available for keynotes, panel discussions, and workshops on AI, climate, youth leadership, and global development.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-accent rounded-full px-6 py-2.5 text-sm font-black">
              Invite Richard to speak
            </Link>
            <Link href="/research" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-black">
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
