import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import HomepageForm from "@/components/admin/HomepageForm";
import { getHomepage } from "@/lib/homepage";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const homepage = await getHomepage();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black font-display text-ink">Homepage content</h1>
          <AdminLogoutButton />
        </div>
        <HomepageForm initial={homepage} />
      </main>
    </div>
  );
}
