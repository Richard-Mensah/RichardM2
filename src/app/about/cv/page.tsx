import type { Metadata } from "next";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "CV / Resume | Richard Mensah",
  description:
    "Richard Mensah's full curriculum vitae covering academic qualifications, professional experience, research contributions, leadership roles, and programme outcomes.",
};

export default function CvPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-5 py-16 md:px-8 md:py-24">
        <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.4]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent-soft transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">CV / Resume</p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-white md:text-5xl">
            The full record of a career built with purpose.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-dark-muted">
            Richard&apos;s curriculum vitae covers his academic qualifications, professional
            experience, research contributions, publications, leadership roles, and programme
            outcomes. Read it below or download a copy to keep.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/richard-mensah-cv.pdf"
              download="Richard-Mensah-CV.pdf"
              className="btn-brand rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-brand/25 transition hover:-translate-y-0.5"
            >
              Download CV
            </a>
            <a
              href="/richard-mensah-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:border-accent-soft hover:bg-white/10"
            >
              Open in new tab
            </a>
            <a
              href="mailto:rmensahuk@gmail.com?subject=CV Request - Richard Mensah"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:border-accent-soft hover:bg-white/10"
            >
              Request by email
            </a>
          </div>
        </div>
      </section>

      {/* ── CV viewer ─────────────────────────────────────────────── */}
      <section className="flex-1 bg-surface px-5 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden glass rounded-2xl">
            <object
              data="/richard-mensah-cv.pdf"
              type="application/pdf"
              className="h-[860px] w-full"
              aria-label="Richard Mensah CV"
            >
              <div className="flex h-[860px] flex-col items-center justify-center gap-5 bg-transparent text-center">
                <p className="text-lg font-black text-ink">Your browser does not support inline PDF viewing.</p>
                <p className="text-sm text-body">You can still download or open the CV using the buttons below.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="/richard-mensah-cv.pdf"
                    download="Richard-Mensah-CV.pdf"
                    className="btn-primary rounded-full px-6 py-3 text-sm font-black uppercase tracking-[0.15em] transition hover:-translate-y-0.5"
                  >
                    Download CV
                  </a>
                  <a
                    href="/richard-mensah-cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-body transition hover:border-accent hover:text-accent-strong"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            </object>
          </div>
        </div>
      </section>

      <SectionNav prev={{ label: "Media & Speaking", href: "/about/media" }} next={{ label: "Research", href: "/research" }} />
    </div>
  );
}
