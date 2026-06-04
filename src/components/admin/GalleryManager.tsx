"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import type { GalleryItem } from "@/lib/gallery";

export default function GalleryManager({ initial }: { initial: GalleryItem[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose an image to upload.");
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("alt", alt);
    fd.append("caption", caption);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        credentials: "same-origin",
        body: fd,
      });
      if (!res.ok) {
        let msg = `Upload failed (HTTP ${res.status}).`;
        try {
          const d = (await res.json()) as { message?: string };
          if (d?.message) msg = d.message;
        } catch {
          /* non-JSON */
        }
        if (res.status === 401) msg = "Your admin session expired. Please sign out and log in again.";
        setError(msg);
        return;
      }
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (data.ok) {
        setAlt("");
        setCaption("");
        if (fileRef.current) fileRef.current.value = "";
        router.refresh();
      } else {
        setError(data.message ?? "Upload failed.");
      }
    } catch (err) {
      console.error("Gallery upload failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        setError(
          res.status === 401
            ? "Your admin session expired. Please sign out and log in again."
            : `Delete failed (HTTP ${res.status}).`
        );
        return;
      }
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (data.ok) {
        router.refresh();
      } else {
        setError(data.message ?? "Delete failed.");
      }
    } catch (err) {
      console.error("Gallery delete failed", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <form onSubmit={handleUpload} className="glass rounded-2xl p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-[#7e92b6]">Upload a photo</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">Image file *</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-[#a9bcdc] file:mr-4 file:rounded-full file:border-0 file:bg-[#3a78e0] file:px-5 file:py-2.5 file:text-sm file:font-black file:text-white hover:file:bg-[#4f8bff]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">Alt text (accessibility)</label>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe the photo"
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm focus:border-[#4f8bff] focus:outline-none focus:ring-2 focus:ring-[#4f8bff]/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#cdd9ee]">Caption</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Shown under the photo"
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm focus:border-[#4f8bff] focus:outline-none focus:ring-2 focus:ring-[#4f8bff]/20"
            />
          </div>
        </div>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={uploading}
          className="mt-5 rounded-xl bg-[#3a78e0] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#4f8bff] disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload photo"}
        </button>
      </form>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {initial.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden glass rounded-2xl shadow-sm">
            <div className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
            </div>
            {photo.caption && <p className="truncate px-3 py-2 text-xs text-[#8aa0c4]">{photo.caption}</p>}
            {photo.id > 0 && (
              <button
                type="button"
                onClick={() => handleDelete(photo.id)}
                disabled={deletingId === photo.id}
                className="absolute right-2 top-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-60"
              >
                {deletingId === photo.id ? "…" : "Delete"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
