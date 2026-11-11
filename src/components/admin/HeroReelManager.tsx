"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from "lucide-react";
import type { ReelChapter } from "@/data/heroReel";

const MAX_CHAPTERS = 10;
const FIELD = "glass-input";
const LABEL = "mb-1.5 block text-sm font-semibold text-accent-strong";

function blankChapter(index: number): ReelChapter {
  return {
    image: "",
    kicker: `Chapter ${index + 1}`,
    title: "",
    location: "",
    alt: "",
  };
}

export default function HeroReelManager({ initial }: { initial: ReelChapter[] }) {
  const router = useRouter();
  const uploadRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [chapters, setChapters] = useState<ReelChapter[]>(() => initial.map((chapter) => ({ ...chapter })));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateChapter(index: number, field: keyof ReelChapter, value: string) {
    setChapters((current) => current.map((chapter, i) => i === index ? { ...chapter, [field]: value } : chapter));
    setSaved(false);
  }

  function moveChapter(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= chapters.length) return;
    setChapters((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSaved(false);
  }

  async function uploadImage(index: number, event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setUploading(index);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "hero-reel");

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        body: formData,
      });
      const data = await response.json() as { ok?: boolean; url?: string; message?: string };
      if (!response.ok || !data.ok || !data.url) {
        setError(response.status === 401
          ? "Your admin session expired. Please sign out and log in again."
          : data.message ?? `Image upload failed (HTTP ${response.status}).`);
        return;
      }
      updateChapter(index, "image", data.url);
    } catch (uploadError) {
      console.error("Hero reel image upload failed", uploadError);
      setError("Could not upload the image. Check your connection and try again.");
    } finally {
      setUploading(null);
      input.value = "";
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const response = await fetch("/api/admin/hero-reel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ chapters }),
      });
      const data = await response.json() as { ok?: boolean; message?: string; chapters?: ReelChapter[] };
      if (!response.ok || !data.ok) {
        setError(response.status === 401
          ? "Your admin session expired. Please sign out and log in again."
          : data.message ?? `Save failed (HTTP ${response.status}).`);
        return;
      }
      if (data.chapters) setChapters(data.chapters);
      setSaved(true);
      router.refresh();
    } catch (saveError) {
      console.error("Hero reel save failed", saveError);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Edit the story and use the chapter arrows to set its order. The first chapter opens on the homepage.</p>
        <button
          type="button"
          onClick={() => {
            setChapters((current) => [...current, blankChapter(current.length)]);
            setSaved(false);
          }}
          disabled={chapters.length >= MAX_CHAPTERS}
          className="btn-ghost inline-flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={16} aria-hidden="true" /> Add chapter ({chapters.length}/{MAX_CHAPTERS})
        </button>
      </div>

      {chapters.map((chapter, index) => (
        <section key={index} className="glass overflow-hidden rounded-2xl shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-ink">Chapter {index + 1}</h2>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => moveChapter(index, -1)} disabled={index === 0} aria-label={`Move chapter ${index + 1} up`} className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-white/70 disabled:opacity-30">
                <ArrowUp size={17} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => moveChapter(index, 1)} disabled={index === chapters.length - 1} aria-label={`Move chapter ${index + 1} down`} className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-white/70 disabled:opacity-30">
                <ArrowDown size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setChapters((current) => current.filter((_, i) => i !== index));
                  setSaved(false);
                }}
                disabled={chapters.length <= 1}
                aria-label={`Remove chapter ${index + 1}`}
                className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-30"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="grid content-start gap-4 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor={`reel-kicker-${index}`}>Chapter label</label>
                <input id={`reel-kicker-${index}`} className={FIELD} maxLength={60} value={chapter.kicker} onChange={(event) => updateChapter(index, "kicker", event.target.value)} placeholder="Chapter 1 · Youth voice" />
              </div>
              <div>
                <label className={LABEL} htmlFor={`reel-location-${index}`}>Location</label>
                <input id={`reel-location-${index}`} className={FIELD} maxLength={80} value={chapter.location} onChange={(event) => updateChapter(index, "location", event.target.value)} placeholder="Parliament House, Accra" />
              </div>
              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor={`reel-title-${index}`}>Story title *</label>
                <input id={`reel-title-${index}`} required className={FIELD} maxLength={120} value={chapter.title} onChange={(event) => updateChapter(index, "title", event.target.value)} placeholder="What is happening in this chapter?" />
              </div>
              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor={`reel-image-${index}`}>
                  Image URL or site path {chapter.video ? "(optional when video is set)" : "*"}
                </label>
                <div className="flex flex-wrap gap-2">
                  <input id={`reel-image-${index}`} required={!chapter.video} className={`${FIELD} min-w-0 flex-1`} value={chapter.image} onChange={(event) => updateChapter(index, "image", event.target.value)} placeholder="/leadership/unya-parliament-house.jpg" />
                  <input
                    ref={(element) => { uploadRefs.current[index] = element; }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="sr-only"
                    onChange={(event) => void uploadImage(index, event)}
                  />
                  <button type="button" onClick={() => uploadRefs.current[index]?.click()} disabled={uploading === index} className="btn-ghost inline-flex shrink-0 items-center gap-2 disabled:opacity-50">
                    <Upload size={15} aria-hidden="true" /> {uploading === index ? "Uploading…" : "Upload image"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted">Use a path from the public folder or upload an image to Vercel Blob (8 MB max).</p>
              </div>
              <div>
                <label className={LABEL} htmlFor={`reel-focus-${index}`}>Image focus</label>
                <input id={`reel-focus-${index}`} className={FIELD} maxLength={30} value={chapter.focus ?? ""} onChange={(event) => updateChapter(index, "focus", event.target.value)} placeholder="center or 50% 30%" />
              </div>
              <div>
                <label className={LABEL} htmlFor={`reel-video-${index}`}>Optional video URL</label>
                <input id={`reel-video-${index}`} className={FIELD} value={chapter.video ?? ""} onChange={(event) => updateChapter(index, "video", event.target.value)} placeholder="https://…/clip.mp4" />
              </div>
              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor={`reel-alt-${index}`}>Image description (accessibility)</label>
                <input id={`reel-alt-${index}`} className={FIELD} maxLength={200} value={chapter.alt} onChange={(event) => updateChapter(index, "alt", event.target.value)} placeholder="Describe the image" />
              </div>
            </div>

            <div>
              <p className={LABEL}>Preview</p>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-950">
                {chapter.video ? (
                  <video src={chapter.video} poster={chapter.image || undefined} controls muted playsInline className="h-full w-full object-cover" />
                ) : chapter.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={chapter.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: chapter.focus || "center" }} />
                ) : (
                  <div className="grid h-full place-items-center px-4 text-center text-xs text-white/60">Add an image path or upload a photo to preview this chapter.</div>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 text-sm font-bold text-white">{chapter.title || `Chapter ${index + 1}`}</span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-1 flex flex-wrap items-center gap-4 border-t border-line bg-white/95 px-1 py-4 backdrop-blur">
        <button type="submit" disabled={saving || uploading !== null} className="btn-primary disabled:opacity-60">{saving ? "Saving…" : "Save reel"}</button>
        {saved && <span role="status" className="text-sm font-semibold text-green-700">Saved ✓ The homepage reel is up to date.</span>}
        <span className="text-xs text-muted">Changes appear on the homepage after saving.</span>
      </div>
    </form>
  );
}
