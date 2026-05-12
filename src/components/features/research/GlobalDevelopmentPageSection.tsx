import Link from "next/link";
import { IDENTITY_TIMELINE, PRIORITY_GOALS } from "@/constants";

const GEO_PILLS = ["Ghana", "United Kingdom", "India", "& Global South"];

export default function GlobalDevelopmentPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#00689D]">Global Development</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Intelligence that serves the many, not the few.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Cross-border research and partnerships connecting Ghana, the UK, and global networks
          around AI, climate intelligence, youth empowerment, and sustainable development — with
          the UN Sustainable Development Goals as the organising framework.
        </p>

        {/* Identity timeline cards */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00689D]">Geographic identity</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {IDENTITY_TIMELINE.map((card) => (
              <div
                key={card.place}
                className="rounded-2xl border border-[#00689D]/15 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00689D]">{card.place}</p>
                <h3 className="mt-3 text-base font-black leading-snug text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Priority SDG goals */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Priority SDG goals</p>
          <div className="mt-5 grid gap-4 grid-cols-2 md:grid-cols-3">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="rounded-2xl border-2 bg-white p-5 shadow-sm"
                style={{ borderColor: `${goal.color}30` }}
              >
                <span
                  className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: goal.color }}
                >
                  {goal.code}
                </span>
                <h3 className="mt-3 text-sm font-black text-slate-950">{goal.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{goal.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image placeholder */}
        {/* IMAGE PLACEHOLDER — replace with:
            <div className="relative mt-12 h-56 overflow-hidden rounded-2xl">
              <Image src="/research/global-development-map.jpg" alt="Global development map" fill className="object-cover" />
            </div> */}
        <div
          aria-hidden="true"
          className="mt-12 h-56 rounded-2xl bg-gradient-to-r from-[#00689D]/20 via-[#19486A]/15 to-[#00689D]/5"
        />

        {/* Cross-border network */}
        <div className="mt-10 rounded-2xl bg-[#0B1F3A] p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#62E8FF]">Global network</p>
          <h2 className="mt-3 text-2xl font-black text-white">65+ global mentors and partners</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            The network spans universities, NGOs, government bodies, and private sector organisations
            across Ghana, the United Kingdom, India, and beyond — connected around a shared belief
            that talent is universal, but opportunity must be built.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {GEO_PILLS.map((geo) => (
              <span
                key={geo}
                className="rounded-full border border-[#00689D]/50 px-4 py-2 text-sm font-bold text-[#62E8FF]"
              >
                {geo}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-[#F0F6FB] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#00689D]">Join the global network</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Connect as a partner, mentor, institutional collaborator, or SDG advocate working at the intersection of AI and development.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#00689D] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#005580]">
              Join the network
            </Link>
            <Link href="/sdgs" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400">
              Explore SDG work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
