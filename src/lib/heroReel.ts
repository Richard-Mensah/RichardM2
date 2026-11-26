import { getSetting, getSettingStrict, setSetting } from "@/lib/siteSettings";
import { DEFAULT_REEL, REEL_ADDITIONS, chapterLabel, type ReelChapter } from "@/data/heroReel";

const KEY = "hero_reel";
const ADDITIONS_KEY = "hero_reel_additions_applied";
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
      kicker: chapterLabel(str(c.kicker, 60)),
      title,
      location: str(c.location, 80),
      focus: str(c.focus, 30) || undefined,
      alt: str(c.alt, 200) || title,
    },
  };
}

/**
 * Prepends each REEL_ADDITIONS chapter once to a reel saved in admin (the
 * defaults already include them). Tracked by image, so removing one in admin
 * keeps it removed. Returns the reel to use.
 */
async function applyReelAdditions(saved: ReelChapter[]): Promise<ReelChapter[]> {
  const applied = await getSettingStrict<string[]>(ADDITIONS_KEY, []);
  const pending = REEL_ADDITIONS.filter((c) => !applied.includes(c.image));
  if (!pending.length) return saved;
  const present = new Set(saved.map((c) => c.image));
  const fresh = pending.filter((c) => !present.has(c.image));
  const next = fresh.length ? [...fresh, ...saved].slice(0, MAX) : saved;
  if (fresh.length) await saveHeroReel(next);
  await setSetting(ADDITIONS_KEY, [...applied, ...pending.map((c) => c.image)]);
  return next;
}

export async function getHeroReel(): Promise<ReelChapter[]> {
  const stored = await getSetting<ReelChapter[] | null>(KEY, null);
  if (!Array.isArray(stored) || stored.length === 0) return DEFAULT_REEL;
  let saved = stored;
  try {
    saved = await applyReelAdditions(stored);
  } catch (error) {
    console.error("Failed to apply hero reel additions", error);
  }
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
