import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const SDG_FOCUS = [
  {
    code: "SDG 4",
    title: "Quality Education",
    description: "AI literacy tools, community teaching initiatives, and knowledge systems that make learning accessible regardless of resource levels.",
    color: "#3a78e0",
    icon: "📚",
    href: "/sdgs",
  },
  {
    code: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    description: "Intelligent systems that help institutions modernize their decisions, products, and services with responsible AI and data science.",
    color: "#4f8bff",
    icon: "⚙️",
    href: "/sdgs",
  },
  {
    code: "SDG 13",
    title: "Climate Action",
    description: "Climate intelligence tools for resilience planning, risk communication, and adaptation conversations at community level.",
    color: "#2f6bea",
    icon: "🌍",
    href: "/projects/climate",
  },
  {
    code: "SDG 17",
    title: "Partnerships for the Goals",
    description: "Cross-border research partnerships and collaborative programmes connecting Ghana, the UK, and global development networks.",
    color: "#19486A",
    icon: "🤝",
    href: "/research/global-development",
  },
];

export default function SdgPageSection() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1829] px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#4f8bff]">
                Projects / SDGs
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                Aligning innovation with the global goals
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-300">
                Every project Richard builds traces back to at least one Sustainable Development Goal. The SDGs are not marketing tags here. They are the criteria by which work is designed, measured, and evaluated.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sdgs"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-black text-white transition hover:bg-white/20"
                >
                  SDG Commitment →
                </Link>
                <Link
                  href="/research/global-development"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-black text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Global Development
                </Link>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/gallery/FB_IMG_1746893901373.jpg"
                alt="Richard Mensah at an SDG advocacy session"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1829]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured System */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship System" title="Youth Leadership Knowledge Engine" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                tab: "Problem",
                content: "Mentorship programmes often inspire young people but fail to scale learning, measure growth, or preserve institutional knowledge across cohorts.",
                accent: "#3a78e0",
              },
              {
                tab: "Approach",
                content: "Programme analytics, structured knowledge bases, skill progression maps, mentoring records, and curated opportunity pathways designed for young leaders.",
                accent: "#4f8bff",
              },
              {
                tab: "Impact",
                content: "Makes youth leadership measurable, repeatable, and globally collaborative, supporting SDG 4 (education) and SDG 17 (partnerships) at institutional scale.",
                accent: "#19486A",
              },
            ].map((item) => (
              <Card key={item.tab} className="p-6" style={{ borderTop: `3px solid ${item.accent}` }}>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: item.accent }}>
                  {item.tab}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#a9bcdc]">{item.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Focus Cards */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Priority Goals" title="Four SDGs driving the work" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {SDG_FOCUS.map((sdg) => (
              <Link key={sdg.code} href={sdg.href} className="group">
                <Card className="h-full p-6 transition group-hover:-translate-y-0.5 group-hover:shadow-lg" style={{ borderTop: `3px solid ${sdg.color}` }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.code}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-black text-white">{sdg.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#a9bcdc]">{sdg.description}</p>
                  <p className="mt-4 text-xs font-black transition group-hover:gap-2" style={{ color: sdg.color }}>
                    Explore →
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-black leading-tight text-white">
            The SDGs are not aspirations. They are the specification.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#a9bcdc]">
            When Richard designs a project, the SDG alignment is not added at the end. It is built into the problem definition, the system architecture, and the way impact is measured. The goals are operational, not decorative.
          </p>
        </div>
      </section>
    </div>
  );
}
