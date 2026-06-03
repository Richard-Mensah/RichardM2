import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import OpportunitiesManager from "@/components/admin/OpportunitiesManager";
import { getOpportunities } from "@/lib/opportunities";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-950">Opportunities (Kofiever)</h1>
          <AdminLogoutButton />
        </div>
        <OpportunitiesManager initial={opportunities} />
      </main>
    </div>
  );
}
