import type { Metadata } from "next";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Vision & Mission | Richard Mensah",
  description:
    "Richard Mensah's vision for equitable intelligence and his mission to build the systems, partnerships, and leaders that make sustainable development real.",
};

const SDG_CARDS = [
  { code: "SDG 4", label: "Quality Education", color: "#3a78e0" },
  { code: "SDG 9", label: "Industry & Innovation", color: "#4f8bff" },
  { code: "SDG 13", label: "Climate Action", color: "#2f6bea" },
  { code: "SDG 17", label: "Partnerships for the Goals", color: "#19486A" },
] as const;

const PILLARS = [
  {
    icon: "04",
    title: "Education as the foundation",
    body: "No sustainable progress is possible without access to quality knowledge. Richard's work in AI literacy, mentorship, and community teaching is rooted in the belief that learning changes trajectories.",
    color: "#3a78e0",
  },
  {
    icon: "09",
    title: "Innovation in service of people",
    body: "Technology should solve real problems, not create new hierarchies. Every system Richard builds is designed to be understandable, accessible, and beneficial to the communities it serves.",
    color: "#4f8bff",
  },
  {
    icon: "13",
    title: "Climate intelligence for resilience",
    body: "Communities in the Global South face disproportionate climate risk. Richard works to translate complex environmental data into locally actionable intelligence that communities can actually use.",
    color: "#2f6bea",
  },
  {
    icon: "17",
    title: "Partnerships that endure",
    body: "Lasting change requires networks of trust. Richard has spent over a decade building connections across Ghana, the UK, and globally, so that opportunities reach people who need them most.",
    color: "#19486A",
  },
] as const;

export default function VisionPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent-soft transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">Vision &amp; Mission</p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
            Intelligence that serves the many, not the few.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-dark-muted">
            A commitment to equitable development, aligned with the United Nations Sustainable
            Development Goals and grounded in the lived realities of communities that are too
            often left out of the conversations that shape their future.
          </p>
        </div>
      </section>

      {/* ── Vision and Mission text ───────────────────────────────── */}
      <section className="bg-surface px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">The Vision</p>
              <h2 className="font-display mt-4 text-balance text-2xl font-black tracking-[-0.03em] text-ink md:text-3xl">
                A world where intelligence serves people first.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-body">
                <p>
                  Richard&apos;s vision is a world where intelligence, both artificial and human,
                  serves people first. A world where communities in the Global South have access
                  to the same analytical power and opportunity networks as their counterparts in
                  London, New York, or Geneva. Not as charity. As equity.
                </p>
                <p>
                  He believes this is achievable. Not through grand gestures, but through
                  consistent, unglamorous work: building better systems, training the next
                  generation, forming the right partnerships, and showing up even when the cameras
                  are not there.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">The Mission</p>
              <h2 className="font-display mt-4 text-balance text-2xl font-black tracking-[-0.03em] text-ink md:text-3xl">
                Build the systems that make the vision real.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-body">
                <p>
                  His mission is to build the systems, the partnerships, and the next generation
                  of leaders that make that vision real. Whether through AI research, community
                  programmes, policy advocacy, or direct mentorship, every effort is calibrated
                  to the same north star: sustainable, equitable development aligned with the
                  United Nations Sustainable Development Goals.
                </p>
                <p>
                  He is particularly focused on SDGs 4, 8, 9, 13, 16, and 17: Quality Education,
                  Decent Work, Innovation, Climate Action, Strong Institutions, and Partnerships.
                  Not because these are the only goals that matter, but because they represent the
                  interlocking foundations on which everything else is built.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SDG focus cards ───────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">SDG Focus</p>
          <h2 className="font-display mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
            The interlocking goals that guide the work.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {SDG_CARDS.map((sdg) => (
              <div
                key={sdg.code}
                className="flex h-48 flex-col justify-between rounded-2xl p-6 text-white shadow-lg"
                style={{ backgroundColor: sdg.color }}
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-75">{sdg.code}</p>
                <p className="text-lg font-black leading-tight">{sdg.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four pillars ──────────────────────────────────────────── */}
      <section className="bg-surface px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">How it works</p>
          <h2 className="font-display mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-ink md:text-4xl">
            Four pillars, one coherent system.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.icon}
                className="rounded-2xl border border-line bg-surface-card p-6 shadow-sm"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white"
                  style={{ backgroundColor: pillar.color }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-base font-black leading-snug text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-body">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── North star strip ──────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-12 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">North Star</p>
          <p className="mt-4 text-balance text-2xl font-black leading-snug text-white md:text-3xl">
            Every effort is calibrated to one goal: sustainable, equitable development that puts
            communities at the centre of their own future.
          </p>
          <Link
            href="/sdgs"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-navy-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            Explore SDG Impact
          </Link>
        </div>
      </section>

      <SectionNav prev={{ label: "Biography", href: "/about/biography" }} next={{ label: "Leadership Journey", href: "/about/leadership-journey" }} />
    </div>
  );
}
