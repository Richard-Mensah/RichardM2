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
      <section className="bg-[#0B1F3A] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#7fb0ff] transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7fb0ff]">CV / Resume</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
            The full record of a career built with purpose.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Richard&apos;s curriculum vitae covers his academic qualifications, professional
            experience, research contributions, publications, leadership roles, and programme
            outcomes. Read it below or download a copy to keep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/richard-mensah-cv.pdf"
              download="Richard-Mensah-CV.pdf"
              className="rounded-full bg-[#4f8bff] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#4f8bff]/30 transition hover:-translate-y-0.5 hover:bg-[#7fb0ff]"
            >
              Download CV
            </a>
            <a
              href="/richard-mensah-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Open in new tab
            </a>
            <a
              href="mailto:rmensahuk@gmail.com?subject=CV Request - Richard Mensah"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Request by email
            </a>
          </div>
        </div>
      </section>

      {/* ── CV viewer ─────────────────────────────────────────────── */}
      <section className="flex-1 bg-white/5 px-5 py-10 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden glass rounded-2xl shadow-xl shadow-black/10">
            <object
              data="/richard-mensah-cv.pdf"
              type="application/pdf"
              className="h-[860px] w-full"
              aria-label="Richard Mensah CV"
            >
              <div className="flex h-[860px] flex-col items-center justify-center gap-5 bg-transparent text-center">
                <p className="text-lg font-black text-white">Your browser does not support inline PDF viewing.</p>
                <p className="text-sm text-[#8aa0c4]">You can still download or open the CV using the buttons below.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="/richard-mensah-cv.pdf"
                    download="Richard-Mensah-CV.pdf"
                    className="rounded-full bg-[#4f8bff] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#7fb0ff]"
                  >
                    Download CV
                  </a>
                  <a
                    href="/richard-mensah-cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#cdd9ee] transition hover:border-[#4f8bff] hover:text-[#4f8bff]"
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
