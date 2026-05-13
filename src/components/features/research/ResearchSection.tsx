import Image from "next/image";
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
            deploy AI responsibly, particularly in the Global South. Select a category to
            explore each area in depth.
          </p>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {RESEARCH_CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={cat.slug} className="group outline-none">
              <Card className="relative flex h-full flex-col overflow-hidden p-0 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-slate-300/80 group-focus-visible:ring-2 group-focus-visible:ring-[#0077FF]">
                {cat.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: cat.accent, opacity: 0.88 }} />
                  </div>
                )}
                <div className="relative flex flex-1 flex-col p-5">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl text-sm font-black text-white/90 ring-1 ring-white/20"
                    style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                  >
                    {cat.icon}
                  </div>
                  {cat.sdgTag && (
                    <span className="mt-3 w-fit rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.18em] text-white">
                      {cat.sdgTag}
                    </span>
                  )}
                  <h3 className="mt-3 text-sm font-black leading-snug text-white">
                    {cat.label}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-5 text-white/75">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-black text-white transition duration-300 group-hover:gap-2">
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
