import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import ClientWorkManager from "@/components/admin/ClientWorkManager";
import { getClientWork } from "@/lib/clientWork";

export const dynamic = "force-dynamic";

export default async function AdminClientWorkPage() {
  const projects = await getClientWork();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black font-display text-ink">Client Work &amp; Software</h1>
          <AdminLogoutButton />
        </div>
        <ClientWorkManager initial={projects} />
      </main>
    </div>
  );
}
