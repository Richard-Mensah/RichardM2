import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import OpenSourcePageSection from "@/components/features/projects/OpenSourcePageSection";
import type { GitHubRepo } from "@/components/features/projects/GitHubRepoCard";

export const metadata: Metadata = {
  title: "Open Source Work | Richard Mensah",
  description:
    "Richard Mensah's open source contributions: publicly available tools, code, and frameworks for AI, data science, and community development applications.",
};

async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/Richard-Mensah/repos?sort=updated&per_page=12&type=public",
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function OpenSourcePage() {
  const repos = await getRepos();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <OpenSourcePageSection repos={repos} />
      </div>
      <SectionNav
        prev={{ label: "Community Initiatives", href: "/projects/community" }}
        next={{ label: "Portfolio", href: "/projects/portfolio" }}
      />
    </div>
  );
}
