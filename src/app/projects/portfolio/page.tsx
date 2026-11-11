import type { Metadata } from "next";
import SectionNav from "@/components/ui/SectionNav";
import PortfolioPageSection from "@/components/features/projects/PortfolioPageSection";
import type { GitHubRepo } from "@/components/features/projects/GitHubRepoCard";
import { getClientWork } from "@/lib/clientWork";

export const metadata: Metadata = {
  title: "Portfolio | Richard Mensah",
  description:
    "Richard Mensah's complete portfolio: AI systems, data science projects, climate innovation, and community initiatives across Ghana, the UK, and global networks.",
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

export default async function PortfolioPage() {
  const [repos, projects] = await Promise.all([getRepos(), getClientWork()]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <PortfolioPageSection repos={repos} projects={projects} />
      </div>
      <SectionNav
        prev={{ label: "Client Work", href: "/work" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
