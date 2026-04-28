import Image from "next/image";
import Card from "@/components/ui/Card";
import SdgLogoMark from "@/components/ui/SdgLogoMark";
import type { DatabaseSignal } from "@/types";

type Props = {
  databaseSignal: DatabaseSignal;
};

const STAT_CARDS = [
  ["AI", "Decision intelligence"],
  ["SDGs", "Development contribution"],
  ["Leadership", "Youth empowerment"],
] as const;

export default function HeroSection({ databaseSignal }: Props) {
  return (
    <section className="sdg-hero-mesh relative px-5 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 data-grid-light opacity-55" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative reveal-up">
          <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-700 shadow-lg shadow-slate-200/60">
            <span className="sdg-conic h-3 w-3 rounded-full" />
            SDG-colour personal brand ecosystem
          </div>

          <h1 className="mt-8 max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-7xl lg:text-8xl">
            AI & Data Scientist building systems for{" "}
            <span className="sdg-text-gradient">global impact.</span>
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            Richard Mensah is positioned at the intersection of AI, leadership, entrepreneurship,
            and sustainable development: turning research, data, and youth empowerment into
            SDG-aligned action.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/sdgs"
              className="rounded-full bg-[#009EDB] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-xl shadow-[#009EDB]/25 transition hover:-translate-y-1 hover:bg-slate-950"
            >
              See SDG impact
            </a>
            <a
              href="/systems"
              className="rounded-full border border-slate-300 bg-white px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-950 shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:border-[#009EDB]"
            >
              Explore systems
            </a>
            <a
              href="/collaborate"
              className="rounded-full border border-slate-950 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-950 transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white"
            >
              Collaborate
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STAT_CARDS.map(([title, text]) => (
              <Card key={title} className="p-5">
                <p className="text-3xl font-black text-slate-950">{title}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">{text}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="sdg-conic absolute -inset-4 rounded-[3rem] opacity-25 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/70">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/Richard 1.jpg"
                alt="Richard Mensah professional portrait"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/40" />
            </div>

            <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-4">
              <SdgLogoMark className="h-20 w-20" />
              <div className="rounded-2xl bg-white/90 px-4 py-3 text-right shadow-lg backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00689D]">
                  AI Researcher
                </p>
                <p className="mt-1 text-sm font-bold text-slate-950">Richard Mensah</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-slate-950/86 p-5 text-white shadow-xl backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
                AI · Climate · Youth · Institutions
              </p>
              <p className="mt-2 text-lg font-black">Ghana → UK → Global impact</p>
              <p className="mt-2 text-xs text-slate-300">Database signal: {databaseSignal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
