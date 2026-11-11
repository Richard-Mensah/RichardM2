import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CodeXml, Rocket, UserRound } from "lucide-react";
import SectionNav from "@/components/ui/SectionNav";
import CountUp from "@/components/ui/CountUp";
import BookingLink from "@/components/ui/BookingLink";
import AnimatedScreenshot from "@/components/features/work/AnimatedScreenshot";
import WorkQuestBoard from "@/components/features/work/WorkQuestBoard";
import { clientWorkStats } from "@/data/clientWork";
import { getClientWork } from "@/lib/clientWork";

export const metadata: Metadata = {
  title: "Client Work & Software | Richard Mensah",
  description:
    "Websites and software Richard Mensah has designed and built for people and organisations in the UK and Ghana, including MonCare OS, MonCare Healthcare Agency, EGA Mentorship International and the Bekwai Youth Movement.",
  alternates: { canonical: "/work" },
};

// Rebuilt when projects are saved in /admin/client-work; hourly as a safety net.
export const revalidate = 3600;

export default async function WorkPage() {
  const projects = await getClientWork();
  const CLIENT_WORK_STATS = clientWorkStats(projects);
  const hero = projects.find((p) => p.slug === "moncare-uk") ?? projects[0];
  const heroPhone = projects.find((p) => p.slug === "ega-mentorship" && p.mobile) ?? projects.find((p) => p.mobile);
  const stats = [
    { icon: Rocket, value: String(CLIENT_WORK_STATS.total), label: "Total builds shipped" },
    { icon: Building2, value: String(CLIENT_WORK_STATS.organisations), label: "Company & organisation sites" },
    { icon: UserRound, value: String(CLIENT_WORK_STATS.personal), label: "Personal brand sites" },
    { icon: CodeXml, value: String(CLIENT_WORK_STATS.software), label: CLIENT_WORK_STATS.software === 1 ? "Software platform" : "Software platforms" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-950 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
          <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="stagger">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-soft">Client work &amp; software</p>
              <h1 className="font-display mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Real products, shipped for real people.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-on-dark-muted">
                From a workforce operating system for a UK care agency to platforms for youth institutions and
                portfolios that open international doors: {CLIENT_WORK_STATS.total} builds designed, engineered and
                launched end to end.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#builds" className="btn-accent inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em]">
                  Start the tour <ArrowRight size={16} aria-hidden="true" />
                </a>
                <Link
                  href="/collaborate"
                  className="btn-white inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em]"
                >
                  Commission a build
                </Link>
              </div>
            </div>

            <div className="relative pb-6 pr-4 sm:pr-10">
              {hero ? (
                <AnimatedScreenshot
                  shot={hero.desktop}
                  url={hero.url}
                  alt={`${hero.name} website, full-page screenshot`}
                  sizes="(min-width: 1024px) 600px, 92vw"
                  priority
                />
              ) : null}
              {heroPhone?.mobile ? (
                <AnimatedScreenshot
                  shot={heroPhone.mobile}
                  frame="phone"
                  alt={`${heroPhone.name} mobile website`}
                  sizes="140px"
                  priority
                  className="float-soft absolute -bottom-2 right-0 w-[26%] max-w-[140px]"
                />
              ) : null}
            </div>
          </div>

          {/* Stat tiles */}
          <div className="relative mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
                <Icon size={18} className="text-accent-soft" aria-hidden="true" />
                <p className="font-display mt-3 text-3xl font-black text-white">
                  <CountUp value={value} />
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quest board */}
        <section id="builds" className="scroll-mt-24 px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Builds unlocked</p>
              <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
                Collect all {CLIENT_WORK_STATS.total}. Every card is a live product.
              </h2>
              <p className="mt-4 text-base leading-7 text-body">
                Each screenshot is a real capture of the live site, playing as it scrolls. Hover to pause on desktop, open a case
                file for the story, or jump straight to the live build.
              </p>
            </div>
            <WorkQuestBoard projects={projects} />
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20 md:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-12 text-center sm:px-12 md:py-16">
            <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" aria-hidden="true" />
            <p className="relative text-[11px] font-black uppercase tracking-[0.24em] text-accent-soft">Next level: your build</p>
            <h2 className="font-display relative mx-auto mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              Need a website, portfolio or operations platform?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-7 text-on-dark-muted">
              I design and build fast, accessible products for organisations, agencies and professionals, from first
              idea to launch.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookingLink className="min-h-12 w-full px-6 text-xs tracking-[0.14em] sm:w-auto">Book a call</BookingLink>
              <Link
                href="/collaborate"
                className="btn-white inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-[0.14em] sm:w-auto"
              >
                Send a brief <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SectionNav
        prev={{ label: "Projects", href: "/projects" }}
        next={{ label: "Portfolio", href: "/projects/portfolio" }}
      />
    </div>
  );
}
