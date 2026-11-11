import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import GitHubTracksManager from "@/components/admin/GitHubTracksManager";
import { getClassifiedRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function AdminGitHubPage() {
  const { repos, overrides } = await getClassifiedRepos();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black font-display text-ink">GitHub Tracks</h1>
          <AdminLogoutButton />
        </div>
        <GitHubTracksManager
          repos={repos.map((r) => ({
            name: r.name,
            url: r.url,
            language: r.language,
            isPrivate: r.isPrivate,
            auto: r.track,
            reason: r.reason,
          }))}
          initial={overrides}
          tokenConfigured={Boolean(process.env.GITHUB_TOKEN?.trim())}
        />
      </main>
    </div>
  );
}
