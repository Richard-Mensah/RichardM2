import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ClientWorkCard from "@/components/features/work/ClientWorkCard";
import type { ClientProject } from "@/types";

type Props = { projects: ClientProject[] };

const SYSTEMS_SUMMARY = [
  {
    title: "Predictive Intelligence System for Financial Behaviour",
    label: "AI + SDG 8",
    color: "#3a78e0",
    summary: "Classification, segmentation, and decision dashboards for ethical financial inclusion.",
    href: "/projects/ai",
  },
  {
    title: "Climate Signal Observatory for Community Resilience",
    label: "Climate + SDG 13",
    color: "#2f6bea",
    summary: "Satellite-derived climate intelligence translated into community-readable risk narratives.",
    href: "/projects/climate",
  },
  {
    title: "Youth Leadership Knowledge Engine",
    label: "Leadership + SDG 4/17",
    color: "#3a78e0",
    summary: "Programme analytics and knowledge systems making youth leadership measurable and repeatable.",
    href: "/projects/community",
  },
];

export default function PortfolioPageSection({ projects }: Props) {
  const CLIENT_WORK = projects;
  return (
    <div>
      {/* Client builds */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Client builds" title="Live products shipped for clients" />
            <Link
              href="/work"
              className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]"
            >
              All {CLIENT_WORK.length} builds →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_WORK.slice(0, 3).map((p, i) => (
              <ClientWorkCard key={p.slug} project={p} index={i} showPhone={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Systems */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship Systems" title="Three research systems that define the work" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SYSTEMS_SUMMARY.map((sys) => (
              <Link key={sys.title} href={sys.href} className="group">
                <Card className="h-full p-6 transition group-hover:-translate-y-0.5 group-hover:shadow-lg" style={{ borderTop: `3px solid ${sys.color}` }}>
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-[0.15em] text-white"
                    style={{ backgroundColor: sys.color }}
                  >
                    {sys.label}
                  </span>
                  <h3 className="mt-3 text-sm font-black leading-snug text-ink">{sys.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-body">{sys.summary}</p>
                  <p className="mt-4 text-xs font-black transition group-hover:gap-2" style={{ color: sys.color }}>
                    Explore →
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
