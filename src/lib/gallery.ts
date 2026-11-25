import { asc, eq } from "drizzle-orm";
import { del } from "@vercel/blob";
import { db, pool } from "@/db";
import { galleryPhotos } from "@/db/schema";
import { GALLERY as STATIC_GALLERY, GALLERY_ADDITIONS } from "@/data/gallery";
import { getSetting, setSetting } from "@/lib/siteSettings";

const ADDITIONS_KEY = "gallery_additions_applied";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
};

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_photos (
      id serial PRIMARY KEY,
      position integer NOT NULL DEFAULT 0,
      url text NOT NULL,
      alt varchar(300) NOT NULL DEFAULT '',
      caption varchar(300) NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

async function seedIfEmpty(): Promise<void> {
  const existing = await db.select({ id: galleryPhotos.id }).from(galleryPhotos).limit(1);
  if (existing.length > 0) return;
  await db.insert(galleryPhotos).values(
    STATIC_GALLERY.map((p, i) => ({
      position: i,
      url: p.src,
      alt: p.alt ?? "",
      caption: p.caption ?? "",
    }))
  );
}

/** Inserts each GALLERY_ADDITIONS photo once, at the top. Tracked so admin deletions stick. */
async function applyAdditions(): Promise<void> {
  const applied = await getSetting<string[]>(ADDITIONS_KEY, []);
  const pending = GALLERY_ADDITIONS.filter((p) => !applied.includes(p.src));
  if (!pending.length) return;
  const rows = await db.select({ url: galleryPhotos.url, position: galleryPhotos.position }).from(galleryPhotos);
  const present = new Set(rows.map((r) => r.url));
  const minPos = rows.length ? Math.min(...rows.map((r) => r.position)) : 0;
  const toInsert = pending.filter((p) => !present.has(p.src));
  if (toInsert.length) {
    await db.insert(galleryPhotos).values(
      toInsert.map((p, i) => ({
        position: minPos - toInsert.length + i,
        url: p.src,
        alt: p.alt ?? "",
        caption: p.caption ?? "",
      }))
    );
  }
  await setSetting(ADDITIONS_KEY, [...applied, ...pending.map((p) => p.src)]);
}

export async function getGalleryPhotos(): Promise<GalleryItem[]> {
  try {
    await ensureTable();
    await seedIfEmpty();
    await applyAdditions();
    const rows = await db
      .select()
      .from(galleryPhotos)
      .orderBy(asc(galleryPhotos.position), asc(galleryPhotos.id));
    return rows.map((r) => ({ id: r.id, src: r.url, alt: r.alt ?? "", caption: r.caption ?? "" }));
  } catch (error) {
    console.error("Failed to read gallery, using static list", error);
    return STATIC_GALLERY.map((p, i) => ({
      id: -(i + 1),
      src: p.src,
      alt: p.alt ?? "",
      caption: p.caption ?? "",
    }));
  }
}

export async function addGalleryPhoto(input: {
  url: string;
  alt: string;
  caption: string;
}): Promise<void> {
  await ensureTable();
  const max = await db
    .select({ position: galleryPhotos.position })
    .from(galleryPhotos)
    .orderBy(asc(galleryPhotos.position));
  const nextPos = max.length ? Math.max(...max.map((m) => m.position)) + 1 : 0;
  await db.insert(galleryPhotos).values({
    position: nextPos,
    url: input.url,
    alt: input.alt,
    caption: input.caption,
  });
}

export async function deleteGalleryPhoto(id: number): Promise<void> {
  await ensureTable();
  const rows = await db
    .select({ url: galleryPhotos.url })
    .from(galleryPhotos)
    .where(eq(galleryPhotos.id, id))
    .limit(1);
  await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));

  // Remove the underlying blob too (only for uploads we own).
  const url = rows[0]?.url ?? "";
  if (url.includes(".blob.vercel-storage.com")) {
    try {
      await del(url);
    } catch (error) {
      console.error("Failed to delete blob", error);
    }
  }
}
