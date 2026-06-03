import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import { getTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-950">Testimonials</h1>
          <AdminLogoutButton />
        </div>
        <TestimonialsManager initial={testimonials} />
      </main>
    </div>
  );
}
