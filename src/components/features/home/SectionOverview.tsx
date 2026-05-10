import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const SECTIONS = [
  {
    label: "About Richard",
    href: "/about",
    tagline: "From Ghana to the UK — grounded in development urgency",
    accent: "#009EDB",
  },
  {
    label: "Impact",
    href: "/impact",
    tagline: "Six priority SDGs driving every project and decision",
    accent: "#19486A",
  },
  {
    label: "Research",
    href: "/research",
    tagline: "Four pillars across AI, climate, youth, and policy",
    accent: "#3F7E44",
  },
  {
    label: "Projects",
    href: "/projects",
    tagline: "AI systems and data builds turning research into infrastructure",
    accent: "#FD6925",
  },
  {
    label: "Leadership",
    href: "/leadership",
    tagline: "Youth empowerment, institutions, and public intellectual work",
    accent: "#FCC30B",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
    tagline: "Scholarships, fellowships, internships, and conferences",
    accent: "#A21942",
  },
  {
    label: "Publications",
    href: "/blog",
    tagline: "Articles on AI, climate intelligence, ethics, and youth leadership",
    accent: "#009EDB",
  },
  {
    label: "Gallery",
    href: "/gallery",
    tagline: "Personal and professional photos from the field",
    accent: "#FCC30B",
  },
] as const;

export default function SectionOverview() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Explore" title="Where to go from here" center />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((section) => (
            <Link key={section.href} href={section.href} className="group">
              <div
                className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition hover:-translate-y-0.5"
                style={{ borderTop: `3px solid ${section.accent}` }}
              >
                <p className="text-lg font-black text-slate-950">{section.label}</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{section.tagline}</p>
                <p
                  className="mt-4 text-sm font-black transition group-hover:translate-x-1"
                  style={{ color: section.accent }}
                >
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
