import Link from "next/link";
import { PUBLICATIONS } from "@/constants";
import PublicationCard from "./PublicationCard";

export default function PublicationsPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#0077FF]">Publications</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Research contributions to global development.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Working papers, policy notes, and public essays at the intersection of AI, climate change,
          and sustainable development. Several are open for collaboration, peer review, and
          institutional partnership.
        </p>

        {/* Image placeholder */}
        {/* IMAGE PLACEHOLDER — replace with:
            <div className="relative mt-10 h-56 overflow-hidden rounded-2xl">
              <Image src="/research/publications-hero.jpg" alt="Research publications" fill className="object-cover" />
            </div> */}
        <div
          aria-hidden="true"
          className="mt-10 h-56 rounded-2xl bg-gradient-to-r from-[#0077FF]/20 via-[#009EDB]/15 to-[#0077FF]/5"
        />

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
