import { ArrowUpRight, Star } from "lucide-react";
import { TRACK_META, type ClassifiedRepo } from "@/lib/githubTracks";

/** "my-repo_name" → "My repo name" */
export function prettyRepoName(name: string): string {
  const spaced = name.replace(/[-_.]+/g, " ").replace(/\s+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function timeAgo(iso: string): string {
  const days = Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / 86_400_000));
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/** A public GitHub repository as a card: track, name, summary, language, stars and last push. */
export default function RepoCard({ repo }: { repo: ClassifiedRepo }) {
  const track = repo.track === "ai" || repo.track === "web" ? TRACK_META[repo.track] : null;

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: track?.color ?? "#9fb0c2" }} aria-hidden="true" />
      <span className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: track?.color ?? "#5b6b7f" }}>
          {track?.short ?? "Project"}
        </span>
        <ArrowUpRight size={15} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong" aria-hidden="true" />
      </span>
      <span className="font-display mt-2 text-base font-bold leading-snug text-ink group-hover:text-accent-strong">{prettyRepoName(repo.name)}</span>
      <span className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-body">
        {repo.description || (track ? `${track.label} project` : "Public project on GitHub")}
      </span>
      {repo.topics.length ? (
        <span className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-navy-950/5 px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
              {t}
            </span>
          ))}
        </span>
      ) : null}
      <span className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-xs font-semibold text-muted">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: repo.languageColor ?? "#9fb0c2" }} aria-hidden="true" />
            {repo.language}
          </span>
        ) : null}
        {repo.stars > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Star size={12} aria-hidden="true" /> {repo.stars}
          </span>
        ) : null}
        <span className="ml-auto">Updated {timeAgo(repo.pushedAt)}</span>
      </span>
    </a>
  );
}
