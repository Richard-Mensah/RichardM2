import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AuthorForm from "@/components/admin/AuthorForm";
import { getAuthor } from "@/lib/author";

export const dynamic = "force-dynamic";

export default async function AdminAuthorPage() {
  const author = await getAuthor();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-950">About the Author</h1>
          <AdminLogoutButton />
        </div>
        <AuthorForm initial={author} />
      </main>
    </div>
  );
}
