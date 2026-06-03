import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ImpactStat } from "@/lib/impactStats";
import TestimonialsSection from "./TestimonialsSection";

const GALLERY_THEN = [
  { src: "/leadership/church-congregation-2.jpg", caption: "Speaking at a church campaign, Sefwi Bekwai" },
  { src: "/community/winneba-sanitation-1.jpg",   caption: "Community volunteering in Winneba, 2019" },
  { src: "/community/teaching-class-1.jpg",       caption: "Free teaching during COVID-19 lockdown" },
];

const GALLERY_NOW = [
  { src: "/gallery/20240302_090453.jpg",      caption: "Leadership programme, Ghana 2024" },
  { src: "/leadership/conference-sochi.jpg",  caption: "International conference, Sochi Russia" },
  { src: "/gallery/FB_IMG_1746893901373.jpg", caption: "SDG advocacy session" },
];

type Props = {
  impactStats: ImpactStat[];
};

export default function SectionOverview({ impactStats }: Props) {
  return (
    <section className="bg-[#F8FBFF]">

      {/* ── Welcome + Impact stats ───────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0077FF]">Welcome</p>
          <div className="relative mt-4 min-h-[440px] overflow-hidden rounded-[1.5rem] bg-slate-100">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah"
              fill
              className="object-contain object-center"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950 md:text-4xl">
            Richard Mensah - Climate AI Scientist, Developer &amp; Human-Centred Systems Builder.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Richard is a Climate AI scientist with a deep interest in artificial intelligence, data
            science, natural language processing (NLP), and large language models (LLMs). He
            specialises in designing and building human-centred AI systems - technology that is
            not only technically rigorous but genuinely useful to the people who depend on it.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            As a full-stack developer, Richard bridges research and product - moving from model
            to interface, from data pipeline to deployed application. His work sits at the
            intersection of climate intelligence, responsible AI, and sustainable development,
            with a focus on communities and institutions across the Global South.
          </p>
        </div>

        <div>
          <SectionHeading eyebrow="Impact dashboard" title="The scale of the work, in numbers">
            <p>
              These figures are drawn from programme records and are self-reported. They are
              indicative of the reach of a decade of mentorship, training, and community work
              across Ghana and beyond, and are being formalised into a fuller monitoring record.
            </p>
          </SectionHeading>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
              >
                <p className="text-4xl font-black text-[#0077FF]">{stat.value}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-slate-950">
                  {stat.label}
                </p>
                {stat.detail && (
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── In the field ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">In the field</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              This is what the numbers actually look like.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Before any conference stage, scholarship placement, or AI system, there were
                church campaigns in Sefwi Bekwai, volunteer teaching during COVID-19 lockdowns,
                and sanitation drives in communities nobody was watching. That is where the
                work began.
              </p>
              <p>
                These photos tell that story. From the villages that shaped the mission, to the
                global rooms that the mission eventually reached. Every number on this page has
                a face behind it and a community that made it possible.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="rounded-full bg-[#0077FF] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-[#0077FF]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
                View full gallery
              </Link>
              <Link
                href="/opportunities"
                className="rounded-full border border-slate-300 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:border-[#0077FF] hover:text-[#0077FF]"
              >
                Kofiever opportunities
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Where it started */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-600">
                  Where it started
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {GALLERY_THEN.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-32 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 22vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                    <p className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[11px] font-semibold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.caption}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Where it led */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0077FF]" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#0077FF]">
                  Where it led
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {GALLERY_NOW.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-32 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 22vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                    <p className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[11px] font-semibold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.caption}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TestimonialsSection />
    </section>
  );
}
