import { ArrowUpRight } from "lucide-react";
import RepoCard from "@/components/ui/RepoCard";
import { GITHUB_LOGIN } from "@/lib/github";
import type { ClassifiedRepo } from "@/lib/githubTracks";

type Props = {
  repos: ClassifiedRepo[];
  title?: string;
  subtitle?: string;
  /** Keep repos whose name, description or topics match. */
  match?: RegExp;
  /** Drop repos that match. */
  exclude?: RegExp;
  track?: "ai" | "web";
  limit?: number;
};

/** Live public repos from GitHub, filtered for the page. Renders nothing when none match. */
export default function RepoGrid({ repos, title = "Built on GitHub", subtitle, match, exclude, track, limit = 6 }: Props) {
  const text = (r: ClassifiedRepo) => `${r.name.replace(/[-_.]+/g, " ")} ${r.description ?? ""} ${r.topics.join(" ")}`;
  const shown = repos
    .filter((r) => (track ? r.track === track : true))
    .filter((r) => (match ? match.test(text(r)) : true))
    .filter((r) => (exclude ? !exclude.test(text(r)) : true))
    .slice(0, limit);
  if (!shown.length) return null;

  return (
    <section aria-label={title} className="px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Live from GitHub</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">{title}</h2>
            {subtitle ? <p className="mt-1.5 text-sm text-body md:text-base">{subtitle}</p> : null}
          </div>
          <a
            href={`https://github.com/${GITHUB_LOGIN}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]"
          >
            All repositories <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <li key={r.name}>
              <RepoCard repo={r} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
