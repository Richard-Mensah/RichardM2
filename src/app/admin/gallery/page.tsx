import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import GalleryManager from "@/components/admin/GalleryManager";
import { getGalleryPhotos } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black font-display text-ink">Gallery</h1>
            <p className="mt-1 text-sm text-muted">{photos.length} photos · upload new images below</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="btn-ghost rounded-full px-4 py-2 text-xs font-black"
              target="_blank"
            >
              View gallery →
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <GalleryManager initial={photos} />
      </main>
    </div>
  );
}
