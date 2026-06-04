export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
};

export default function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  const updated = new Date(repo.updated_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col glass rounded-xl p-5 transition hover:border-[#4f8bff]/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-black text-white transition group-hover:text-[#4f8bff]">
          {repo.name}
        </h3>
        <span className="shrink-0 text-[#7e92b6] transition group-hover:text-[#4f8bff]" aria-hidden="true">
          ↗
        </span>
      </div>
      {repo.description && (
        <p className="mt-2 flex-1 text-xs leading-5 text-[#8aa0c4] line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {repo.language && (
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#a9bcdc]">
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="text-[0.65rem] text-[#7e92b6]">★ {repo.stargazers_count}</span>
        )}
        <span className="ml-auto text-[0.65rem] text-[#7e92b6]">Updated {updated}</span>
      </div>
    </a>
  );
}
