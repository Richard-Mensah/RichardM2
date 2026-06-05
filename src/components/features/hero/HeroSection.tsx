import Image from "next/image";
import Link from "next/link";
import { Download, ArrowRight, MapPin, BadgeCheck } from "lucide-react";
import type { HomepageContent } from "@/lib/homepage";

const CREDENTIALS = [
  "MSc Artificial Intelligence & Data Science — Bangor University",
  "Country Representative for Ghana — UN Youth Association",
  "8 countries · 2,500+ youth impacted",
];

const OPEN_TO = ["AI / ML roles", "PhD opportunities", "Speaking & conferences", "Partnerships"];

export default function HeroSection({ content }: { content: HomepageContent }) {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative ground */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-accent-soft/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div className="stagger">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-strong shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </div>

          <p className="eyebrow mt-6">{content.heroEyebrow}</p>

          <h1 className="font-display mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.02em] text-ink md:text-5xl lg:text-[3.4rem]">
            {content.heroTitleLead}
            <span className="relative whitespace-nowrap text-accent-strong">
              {content.heroTitleHighlight}
              <svg
                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent-soft"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 5 Q 25 1 50 4 T 100 3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            {content.heroTitleTail}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-body md:text-lg">
            {content.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/richard-mensah-cv.pdf"
              download="Richard-Mensah-CV.pdf"
              className="btn-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] shadow-lg shadow-brand/20 transition hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download CV
            </a>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Open-to chips + location */}
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
              <MapPin size={14} className="text-accent" />
              Ghana · United Kingdom
            </span>
            <span className="text-line-strong">·</span>
            {OPEN_TO.map((item) => (
              <span
                key={item}
                className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-soft"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Portrait ─────────────────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-sm reveal-up lg:max-w-none">
          {/* Offset accent frame */}
          <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border border-accent/30 bg-accent-tint/40" />
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-surface-muted">
              <Image
                src="/Rich1.png"
                alt="Richard Mensah"
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Floating credential badge */}
          <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-line bg-surface-card/95 p-3.5 shadow-xl shadow-navy-950/10 backdrop-blur lg:-left-8 lg:translate-x-0">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent-strong">
                <BadgeCheck size={18} />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-ink">
                  Climate AI Scientist
                </p>
                <p className="text-[11px] leading-tight text-body">
                  Human-centred systems for the Global South
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credential ribbon */}
      <div className="border-y border-line bg-surface-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 md:px-8">
          {CREDENTIALS.map((credential) => (
            <p key={credential} className="flex items-center gap-2 text-xs font-medium text-body">
              <BadgeCheck size={14} className="shrink-0 text-accent" />
              {credential}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
