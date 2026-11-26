import type { Metadata } from "next";
import { BadgeCheck, GraduationCap, Briefcase, Globe2 } from "lucide-react";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import AboutNav from "@/components/features/about/AboutNav";
import { aboutNeighbours, aboutPage } from "@/data/aboutPages";
import CvRequestForm from "@/components/features/cv/CvRequestForm";
import SkillsMatrix from "@/components/features/home/SkillsMatrix";
import { getClientWork } from "@/lib/clientWork";

export const metadata: Metadata = {
  title: "CV / Resume | Richard Mensah",
  description:
    "Request Richard Mensah's full curriculum vitae covering academic qualifications, professional experience, research contributions, leadership roles, and programme outcomes.",
};

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Education",
    body: "MSc, Artificial Intelligence & Data Science (Bangor University). MA, Industrial & Organisational Psychology (IGNOU, India). Bachelor's degree (University of Education, Winneba). ALX Data Science; Azubi Africa Data Analytics (ML); RUDN Certificate in International & Intercultural Communication.",
  },
  {
    icon: Briefcase,
    title: "Experience",
    body: "Founder of the Center for Analytics Services. AI/ML and data science work, full-stack delivery, and a decade of programme design, mentorship, and monitoring & evaluation.",
  },
  {
    icon: Globe2,
    title: "Leadership",
    body: "Formal Country Representative for UNYA-Ghana, Youth MP, and Global Director of EGA Mentorship International.",
  },
  {
    icon: BadgeCheck,
    title: "Research",
    body: "Working papers on climate intelligence, responsible AI for the Global South, and multilingual LLMs for development.",
  },
];

export const revalidate = 3600;

const PAGE = aboutPage("/about/cv");

export default async function CvPage() {
  const clientWork = await getClientWork();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        crumbs={[{ label: "About", href: "/about" }, { label: PAGE.nav }]}
      />
      <AboutNav />

      {/* ── Highlights + request form ─────────────────────────────── */}
      <section className="flex-1 bg-surface px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">What&apos;s inside</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
              A snapshot before you ask
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="card-lift rounded-2xl border border-line bg-surface-card p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-tint text-accent-strong">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-black uppercase tracking-[0.1em] text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-body">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface-card p-6 shadow-xl shadow-navy-950/5 md:p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">
              Request the CV
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink">
              Ask for a copy
            </h2>
            <div className="mt-6">
              <CvRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities radar (moved from the homepage) ───────────── */}
      <SkillsMatrix clientCount={clientWork.length} />

      <SectionNav {...aboutNeighbours(PAGE.href)} />
    </div>
  );
}
