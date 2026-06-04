import Image from "next/image";
import Link from "next/link";
import { SYSTEMS } from "@/constants";
import AiDataScienceCapabilities from "./AiDataScienceCapabilities";

export default function AiDataSciencePageSection() {
  const featuredSystems = [SYSTEMS[0], SYSTEMS[2]];

  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#2BA8B4]">AI & Data Science</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
          Applied intelligence for real-world decisions.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          Machine learning, predictive modeling, NLP, and decision intelligence, designed
          to serve organisations and communities with genuinely useful, explainable outputs.
        </p>

        {/* 2-col research narrative */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">Core research focus</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-950">
              AI that works for people, not the other way around.
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                Richard&apos;s AI and data science research centres on building systems that are
                genuinely useful to real people in real contexts, from smallholder farmers
                in Ghana receiving localized climate risk signals to policymakers needing
                transparent, explainable analytics to make better decisions.
              </p>
              <p>
                His interest in NLP and large language models is grounded in a practical
                question: how can language-based AI be designed so that communities with
                low digital literacy, multilingual contexts, or limited connectivity can
                still access and benefit from intelligent systems?
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">Research to deployment</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-950">
              Closing the gap between insight and application.
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                As a full-stack developer, Richard closes the gap between research and
                deployment, building end-to-end systems that move from data pipeline to
                working application, ensuring that research insights are not lost in
                technical handoffs.
              </p>
              <p>
                This approach means research outputs are not just papers. They are
                functional tools, dashboards, and APIs that can be tested, iterated on,
                and deployed in the environments they are designed for.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-12 h-64 overflow-hidden rounded-2xl">
          <Image src="/gallery/FB_IMG_1744840775657.jpg" alt="Richard Mensah at the St. Petersburg International Economic Forum, 2024" fill className="object-cover object-top" />
        </div>

        {/* Capabilities */}
        <AiDataScienceCapabilities />

        {/* Systems teasers */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Featured systems</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {featuredSystems.map((sys) => (
              <div
                key={sys.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: sys.color }} />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: sys.color }}
                >
                  {sys.label}
                </span>
                <h3 className="mt-4 text-base font-black text-slate-950">{sys.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{sys.approach}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#F0FAFF] p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2BA8B4]">Work together</p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Explore the full systems portfolio or discuss a project, collaboration, or advisory engagement.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/systems" className="rounded-full bg-[#2BA8B4] px-6 py-2.5 text-sm font-black text-white transition hover:bg-[#007DB8]">
              Explore AI systems
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-slate-400">
              Discuss a project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
