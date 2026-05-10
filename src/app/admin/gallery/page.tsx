import Image from "next/image";
import Link from "next/link";
import { GALLERY } from "@/data/gallery";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminGalleryPage() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950">Gallery</h1>
            <p className="mt-1 text-sm text-slate-500">{GALLERY.length} photos in the gallery</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:border-slate-400"
              target="_blank"
            >
              View gallery →
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-sm text-blue-700">
          <strong>To add photos:</strong> copy image files to{" "}
          <code className="rounded bg-blue-100 px-1 font-mono">public/gallery/</code> and update{" "}
          <code className="rounded bg-blue-100 px-1 font-mono">src/data/gallery.ts</code> with the
          new entries.
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {GALLERY.map((photo) => (
            <div key={photo.src} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-square">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              {photo.caption && (
                <p className="truncate px-3 py-2 text-xs text-slate-500">{photo.caption}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
