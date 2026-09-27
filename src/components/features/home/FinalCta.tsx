import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import BookingLink from "@/components/ui/BookingLink";

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
          <BookingLink
            variant="white"
            className="px-7 py-3.5 text-xs tracking-[0.14em] shadow-lg shadow-black/20"
          />
          <Link
            href="/contact"
            className="btn-accent inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about/cv"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <FileText size={16} />
            Request CV
          </Link>
        </div>
        <p className="mt-5 text-xs text-on-dark-muted">
          1:1 mentorship sessions are booked through EGA Mentorship.
        </p>
      </div>
    </section>
  );
}
