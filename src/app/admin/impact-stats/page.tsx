import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import ImpactStatsForm from "@/components/admin/ImpactStatsForm";
import { getImpactStats } from "@/lib/impactStats";

export const dynamic = "force-dynamic";

export default async function AdminImpactStatsPage() {
  const stats = await getImpactStats();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">Impact Stats</h1>
          <AdminLogoutButton />
        </div>
        <ImpactStatsForm initialStats={stats} />
      </main>
    </div>
  );
}
