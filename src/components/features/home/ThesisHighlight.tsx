import Link from "next/link";
import { GraduationCap, ArrowUpRight, Download } from "lucide-react";

export default function ThesisHighlight() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-10 text-white md:px-12 md:py-14">
          {/* Atmosphere */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

          <div className="relative grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-soft ring-1 ring-accent/25">
                <GraduationCap size={22} />
              </span>
              <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
                MSc thesis
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-on-dark-muted">
                MSc, Artificial Intelligence &amp; Data Science · Bangor University · 2026
              </p>
            </div>

            <div>
              <h2 className="font-display text-balance text-2xl font-bold leading-snug md:text-[1.8rem]">
                &ldquo;Predicting Vehicle CO₂ Emissions Using Machine Learning: A Feature-Based
                Approach to Support Consumer and Environmental Decision-Making.&rdquo;
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-on-dark-muted">
                My thesis compares machine-learning methods to predict vehicle CO₂ emissions from
                their features, so consumers get clearer, evidence-based information for
                lower-emission choices. It is where my data science meets my climate work.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/research/thesis"
                  className="btn-accent inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
                >
                  Read the research
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="/richard-mensah-cv.pdf"
                  download="Richard-Mensah-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
