import Image from "next/image";
import Link from "next/link";
import { IDENTITY_TIMELINE, PRIORITY_GOALS } from "@/constants";

const GEO_PILLS = ["Ghana", "United Kingdom", "India", "& Global South"];

export default function GlobalDevelopmentPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">Global Development</p>
        <h1 className="mt-4 text-balance text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
          Intelligence that serves the many, not the few.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-body">
          Cross-border research and partnerships connecting Ghana, the UK, and global networks
          around AI, climate intelligence, youth empowerment, and sustainable development, with
          the UN Sustainable Development Goals as the organising framework.
        </p>

        {/* Identity timeline cards */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-strong">Geographic identity</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {IDENTITY_TIMELINE.map((card) => (
              <div
                key={card.place}
                className="rounded-2xl border border-line glass p-6 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-strong">{card.place}</p>
                <h3 className="mt-3 text-base font-black leading-snug text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Priority SDG goals */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">Priority SDG goals</p>
          <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-3">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="rounded-2xl border-2 glass p-5 shadow-sm"
                style={{ borderColor: `${goal.color}30` }}
              >
                <span
                  className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.code}
                </span>
                <h3 className="mt-3 text-sm font-black text-ink">{goal.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted">{goal.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-12 h-56 overflow-hidden rounded-2xl">
          <Image src="/research/global-development-map.jpg" alt="International team celebrating global collaboration" fill className="object-cover" />
        </div>

        {/* Cross-border network */}
        <div className="mt-10 rounded-2xl bg-navy-950 p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-soft">Global network</p>
          <h2 className="mt-3 text-2xl font-black text-white">65+ global mentors and partners</h2>
          <p className="mt-4 text-sm leading-7 text-on-dark-muted">
            The network spans universities, NGOs, government bodies, and private sector organisations
            across Ghana, the United Kingdom, India, and beyond, connected around a shared belief
            that talent is universal, but opportunity must be built.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {GEO_PILLS.map((geo) => (
              <span
                key={geo}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-accent-soft"
              >
                {geo}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-transparent p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-strong">Join the global network</p>
          <p className="mt-3 text-base leading-7 text-body">
            Connect as a partner, mentor, institutional collaborator, or SDG advocate working at the intersection of AI and development.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary rounded-full px-6 py-2.5 text-sm font-black">
              Join the network
            </Link>
            <Link href="/sdgs" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-black">
              Explore SDG work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
