import Image from "next/image";
import Link from "next/link";
import { PUBLICATIONS } from "@/constants";
import PublicationCard from "./PublicationCard";

export default function PublicationsPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#0077FF]">
          Writing &amp; Working Papers
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.02em] text-slate-950 md:text-5xl">
          Independent writing on AI, climate, and development.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          A collection of independent essays, working papers, and policy notes at the intersection
          of AI, climate change, and sustainable development. They reflect ongoing thinking and are
          shared openly for discussion, collaboration, and review.
        </p>

        {/* Honest provenance note */}
        <div className="mt-6 max-w-3xl rounded-xl border border-amber-300/60 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-900">
            <span className="font-bold">A note on status:</span> these are independent,
            self-published works and working drafts — not peer-reviewed journal publications.
            They are listed transparently as essays, working papers, and policy notes, and several
            are open for collaboration and review.
          </p>
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-2xl">
          <Image src="/research/publications-hero.jpg" alt="Independent writing and working papers" fill className="object-cover" />
        </div>

        {/* Publications list */}
        <div className="mt-12 space-y-6">
          {PUBLICATIONS.map((pub) => (
            <PublicationCard key={pub.title} pub={pub} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#F0F7FF] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0077FF]">Open for collaboration</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Interested in collaborating on research, providing peer review, or forming an institutional partnership?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[#0077FF] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#005FCC]"
            >
              Get in touch
            </Link>
            <Link
              href="/research"
              className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400"
            >
              Back to Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
