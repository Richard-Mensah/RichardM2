import { getSetting, setSetting } from "@/lib/siteSettings";
import { DEFAULT_REEL, type ReelChapter } from "@/data/heroReel";

const KEY = "hero_reel";
const MAX = 10;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Site-relative paths or https URLs only (no protocol-relative or other schemes). */
function safeUrl(v: unknown): string {
  const s = str(v, 1000);
  return (s.startsWith("/") && !s.startsWith("//")) || s.startsWith("https://") ? s : "";
}

export type ChapterValidation = { ok: true; chapter: ReelChapter } | { ok: false; message: string };

export function normaliseChapter(input: unknown, index: number): ChapterValidation {
  const c = (input ?? {}) as Record<string, unknown>;
  const image = safeUrl(c.image);
  const video = safeUrl(c.video);
  const title = str(c.title, 120);
  if (!image && !video) return { ok: false, message: `Chapter ${index + 1}: add an image (or video).` };
  if (!title) return { ok: false, message: `Chapter ${index + 1}: add a title.` };
  return {
    ok: true,
    chapter: {
      image: image || "",
      ...(video ? { video } : {}),
      kicker: str(c.kicker, 60) || `Chapter ${index + 1}`,
      title,
      location: str(c.location, 80),
      focus: str(c.focus, 30) || undefined,
      alt: str(c.alt, 200) || title,
    },
  };
}

export async function getHeroReel(): Promise<ReelChapter[]> {
  const saved = await getSetting<ReelChapter[] | null>(KEY, null);
  if (!Array.isArray(saved) || saved.length === 0) return DEFAULT_REEL;
  const clean = saved
    .map((c, i) => normaliseChapter(c, i))
    .filter((v): v is { ok: true; chapter: ReelChapter } => v.ok)
    .map((v) => v.chapter);
  return clean.length ? clean.slice(0, MAX) : DEFAULT_REEL;
}

export async function saveHeroReel(chapters: ReelChapter[]): Promise<void> {
  await setSetting(KEY, chapters.slice(0, MAX));
}

export const HERO_REEL_MAX = MAX;
