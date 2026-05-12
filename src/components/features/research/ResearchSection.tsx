import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { RESEARCH_CATEGORIES } from "@/constants";

export default function ResearchSection() {
  return (
    <section id="research" className="research-ground relative px-5 py-28 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-40" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Research & Publications"
          title="Investigating AI, climate, and human systems at the frontier of global development."
          center
        >
          <p>
            Richard&apos;s research spans climate intelligence, natural language processing,
            human-centred AI design, and the institutional frameworks needed to govern and
            deploy AI responsibly — particularly in the Global South. Select a category to
            explore each area in depth.
          </p>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {RESEARCH_CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={cat.slug} className="group outline-none">
              <Card className="relative flex h-full flex-col overflow-hidden p-5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-slate-300/80 group-focus-visible:ring-2 group-focus-visible:ring-[#0077FF]">
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ backgroundColor: cat.accent }} />
                <div
                  className="absolute bottom-0 right-0 h-28 w-28 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-20"
                  style={{ backgroundColor: cat.accent }}
                />
                <div className="relative flex flex-1 flex-col">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl text-sm font-black text-white"
                    style={{ backgroundColor: cat.accent }}
                  >
                    {cat.icon}
                  </div>
                  {cat.sdgTag && (
                    <span
                      className="mt-3 w-fit rounded-full px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em]"
                      style={{ backgroundColor: `${cat.accent}18`, color: cat.accent }}
                    >
                      {cat.sdgTag}
                    </span>
                  )}
                  <h3 className="mt-3 text-sm font-black leading-snug text-slate-950">
                    {cat.label}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-5 text-slate-500">{cat.description}</p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-black transition duration-300 group-hover:gap-2"
                    style={{ color: cat.accent }}
                  >
                    Explore <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
