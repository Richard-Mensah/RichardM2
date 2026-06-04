import Image from "next/image";
import Link from "next/link";
import { COLLABORATION_TYPES, FOCUS_AREAS } from "@/constants";

const COLLAB_DESCRIPTIONS: Record<string, string> = {
  "Research collaboration": "Joint research projects, co-authored papers, and shared data initiatives across AI, climate, and development.",
  "Speaking or media": "Keynotes, panel discussions, podcast appearances, and media commentary on AI and global development.",
  "Startup or product build": "Technical advisory and hands-on co-development for AI-powered products targeting underserved communities.",
  "Policy or institutional advisory": "Strategic counsel to governments, NGOs, and institutions building responsible AI governance frameworks.",
  "Mentorship or youth program": "Structured mentorship, programme design, and facilitator training for youth leadership and digital skills initiatives.",
};

const OPEN_FOR = [
  "Joint research & co-authorship",
  "Institutional advisory roles",
  "Training partnerships",
  "Peer review & feedback",
];

export default function CollaborationsPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#176E78]">Research Collaborations</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Building partnerships that multiply impact.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Open to research partnerships, institutional collaborations, and joint publications
          across AI, climate, and development. The best work happens across disciplines,
          borders, and sectors.
        </p>

        {/* Collaboration types */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#176E78]">Collaboration types</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...COLLABORATION_TYPES, "Joint Publication"].map((type) => (
              <div
                key={type}
                className="rounded-2xl border border-[#176E78]/15 bg-white p-6 shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#176E78] text-xs font-black text-white">
                  {type.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="mt-4 text-sm font-black text-slate-950">{type}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {COLLAB_DESCRIPTIONS[type] ?? "Formal or informal joint publication of research findings, policy briefs, or working papers."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Focus areas */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Focus areas</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {FOCUS_AREAS.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[#176E78]/30 px-4 py-2 text-sm font-bold text-[#176E78]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-2xl">
          <Image src="/research/collaborations-hero.jpg" alt="Cross-border research collaboration meeting" fill className="object-cover" />
          <div className="absolute inset-0 flex items-end justify-center bg-black/30 pb-5">
            <p className="text-center text-sm font-black text-white">
              Active across Ghana &middot; United Kingdom &middot; India &middot; Global South
            </p>
          </div>
        </div>

        {/* Open for block */}
        <div className="mt-10 rounded-2xl bg-[#0B1F3A] p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#176E78]">Currently open for</p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {OPEN_FOR.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#176E78]" />
                <span className="text-sm font-semibold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-[#E6F5F5] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#176E78]">Propose a collaboration</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Have a research idea, institutional need, or partnership proposal? Get in touch and let&apos;s explore what we can build together.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#176E78] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#881537]">
              Get in touch
            </Link>
            <Link href="/research" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400">
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
