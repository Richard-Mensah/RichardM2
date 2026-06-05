import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-navy-700/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-28">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">
          Let&apos;s work together
        </p>
        <h2 className="font-display mx-auto mt-4 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-white md:text-5xl">
          Hiring, supervising, inviting, or partnering, I&apos;d love to hear from you
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-on-dark-muted">
          Whether it&apos;s an AI/ML role, a PhD opportunity, a conference invitation, or a community
          partnership, the door is open.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/richard-mensah-cv.pdf"
            download="Richard-Mensah-CV.pdf"
            className="btn-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] shadow-lg shadow-brand/25 transition hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download CV
          </a>
          <Link
            href="/contact"
            className="btn-accent inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
