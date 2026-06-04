import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GitHubRepoCard, { type GitHubRepo } from "./GitHubRepoCard";

type Props = { repos: GitHubRepo[] };

export default function OpenSourcePageSection({ repos }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 data-grid-light opacity-10" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">
                Projects / Open Source
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                Sharing tools with the world
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-300">
                Richard believes good tools should be visible, forkable, and improvable. Open source work in AI, data science, and community development is a direct extension of the belief that knowledge should circulate freely.
              </p>
              <div className="mt-8">
                <a
                  href="https://github.com/Richard-Mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2BA8B4] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#2BA8B4]/90"
                >
                  github.com/Richard-Mensah →
                </a>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
              <Image
                src="/gallery/20240604_134602.jpg"
                alt="Richard Mensah at a leadership and innovation event"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* GitHub profile card */}
      <section className="bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="https://github.com/Richard-Mensah"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#2BA8B4]/40 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-slate-950">github.com/Richard-Mensah</p>
              <p className="text-xs text-slate-500">
                Public repositories, active projects, and open contributions
              </p>
            </div>
            <span className="text-xs font-black text-[#2BA8B4]">View Profile →</span>
          </a>
        </div>
      </section>

      {/* Repos */}
      <section className="bg-slate-50 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Repositories" title="Public repositories" />
          {repos.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-sm font-black text-slate-950">No public repositories found</p>
              <p className="mt-2 text-xs text-slate-500">
                Visit{" "}
                <a
                  href="https://github.com/Richard-Mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2BA8B4] hover:underline"
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
