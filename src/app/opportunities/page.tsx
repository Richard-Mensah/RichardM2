import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import SectionNav from "@/components/ui/SectionNav";
import { OPPORTUNITY_CATEGORIES, getOpportunities } from "@/lib/opportunities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Opportunities | Richard Mensah",
  description:
    "Scholarships, internships, fellowships, and conferences in AI, data science, youth leadership, and sustainable development.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <div className="bg-gradient-to-br from-[#021B4D] via-[#005BDB] to-[#0077FF] px-5 py-20 text-white md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#BFEFFF]">
              Opportunities
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl">
              Pathways for growth and impact
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-white">
              Curated opportunities in AI, data science, climate, leadership, and sustainable
              development - for students, researchers, and emerging professionals.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Browse" title="Opportunity categories" center />
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {OPPORTUNITY_CATEGORIES.map((cat) => {
                const entries = opportunities.filter((o) => o.type === cat.id);
                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-24">
                    <Card className="h-full p-8" style={{ borderTop: `3px solid ${cat.accent}` }}>
                      <span
                        className="inline-block h-2.5 w-12 rounded-full"
                        style={{ backgroundColor: cat.accent }}
                        aria-hidden="true"
                      />
                      <h2 className="mt-4 text-2xl font-bold text-slate-950">{cat.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{cat.description}</p>

                      {entries.length === 0 ? (
                        <p className="mt-6 text-xs font-semibold text-slate-400">
                          Opportunities listed soon — check back regularly.
                        </p>
                      ) : (
                        <ul className="mt-6 space-y-4">
                          {entries.map((o, i) => (
                            <li
                              key={`${cat.id}-${i}`}
                              className="rounded-xl border border-slate-200 bg-white p-4"
                            >
                              <p className="text-sm font-black text-slate-950">{o.title}</p>
                              {o.description && (
                                <p className="mt-1 text-sm leading-6 text-slate-600">{o.description}</p>
                              )}
                              {o.link && (
                                <a
                                  href={o.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 inline-block text-xs font-bold uppercase tracking-[0.12em] text-[#0077FF] hover:underline"
                                >
                                  Learn more →
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <SectionNav
        prev={{ label: "Projects", href: "/projects" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
