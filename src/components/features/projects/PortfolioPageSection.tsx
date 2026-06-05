import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import GitHubRepoCard, { type GitHubRepo } from "./GitHubRepoCard";
import LinkedInProfileCard from "./LinkedInProfileCard";

type Props = { repos: GitHubRepo[] };

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

export default function PortfolioPageSection({ repos }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-soft">
                Projects / Portfolio
              </p>
              <h1 className="mt-4 text-4xl font-black font-display leading-tight text-white md:text-5xl">
                A career built with purpose, in code and community
              </h1>
              <p className="mt-6 text-base leading-8 text-on-dark-muted">
                From community teaching in Sefwi Bekwai to AI systems for institutional decision-making. This is the full record of a career that has always been about both the technical and the human.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-black text-on-dark-muted">
                <span>3 flagship systems</span>
                <span>·</span>
                <span>7 project categories</span>
                <span>·</span>
                <span>Ghana · UK · Global</span>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/gallery/FB_IMG_1742347850249.jpg"
                alt="Richard Mensah at an international leadership event"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="bg-transparent px-5 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Connect" title="Find me on" center />
          <div className="mt-8 flex flex-col gap-4">
            <LinkedInProfileCard />
            <a
              href="https://github.com/Richard-Mensah"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-line bg-transparent p-5 transition hover:border-accent-strong/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-ink">github.com/Richard-Mensah</p>
                <p className="text-xs text-muted">Browse public repositories and active projects</p>
              </div>
              <span className="text-xs font-black text-accent-strong">View →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Flagship Systems */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Flagship Systems" title="Three systems that define the work" />
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

      {/* GitHub Repos */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="GitHub" title="Latest public repositories" />
          {repos.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-line bg-transparent p-10 text-center">
              <p className="text-sm font-black text-ink">No public repositories found</p>
              <p className="mt-2 text-xs text-muted">
                Visit{" "}
                <a
                  href="https://github.com/Richard-Mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-strong hover:underline"
                >
                  github.com/Richard-Mensah
                </a>{" "}
                to browse the full profile.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
