import { pool } from "@/db";
import { DEFAULT_CLIENT_WORK, RARITY_FOR_CATEGORY } from "@/data/clientWork";
import type { ClientCategory, ClientProject, ClientShot } from "@/types";

/*
 * Client projects ("Builds") shown on the homepage, /work and the portfolio page.
 * Stored as an ordered list of JSON documents so new fields need no migration.
 * Falls back to the seed list in src/data/clientWork.ts when the database is
 * empty or unreachable, so the public site never renders an empty section.
 */

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS client_projects (
      id serial PRIMARY KEY,
      position integer NOT NULL DEFAULT 0,
      data jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

const CATEGORIES: ClientCategory[] = ["software", "organisation", "personal"];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, maxItems = 12) =>
  (Array.isArray(v) ? v : typeof v === "string" ? v.split(/\r?\n|,/) : [])
    .map((x) => str(x, 200))
    .filter(Boolean)
    .slice(0, maxItems);

function shot(v: unknown, fallbackW: number): ClientShot | undefined {
  if (!v || typeof v !== "object") return undefined;
  const s = v as Partial<ClientShot>;
  const src = str(s.src, 1000);
  if (!src || !((src.startsWith("/") && !src.startsWith("//")) || src.startsWith("https://"))) return undefined;
  const width = Number(s.width) > 0 ? Math.round(Number(s.width)) : fallbackW;
  const height = Number(s.height) > 0 ? Math.round(Number(s.height)) : Math.round(width * 0.625);
  return { src, width, height };
}

export type ProjectValidation = { ok: true; project: ClientProject } | { ok: false; message: string };

/** Validates and cleans one project coming from the admin form or the database. */
export function normaliseProject(input: unknown): ProjectValidation {
  const p = (input ?? {}) as Record<string, unknown>;
  const name = str(p.name, 160);
  if (!name) return { ok: false, message: "Every project needs a name." };
  const url = str(p.url, 500);
  if (!/^https?:\/\//i.test(url)) return { ok: false, message: `"${name}": the live URL must start with http:// or https://.` };
  const desktop = shot(p.desktop, 1440);
  if (!desktop) return { ok: false, message: `"${name}": upload a desktop screenshot (or give an image path).` };
  const category = CATEGORIES.includes(p.category as ClientCategory) ? (p.category as ClientCategory) : "organisation";

  return {
    ok: true,
    project: {
      slug: slugify(str(p.slug, 80) || name),
      name,
      client: str(p.client, 200) || name,
      category,
      rarity: RARITY_FOR_CATEGORY[category],
      url,
      location: str(p.location, 120),
      tagline: str(p.tagline, 240),
      summary: str(p.summary, 1200),
      highlights: list(p.highlights, 8),
      badges: list(p.badges, 4),
      tags: list(p.tags, 8),
      desktop,
      mobile: shot(p.mobile, 780),
      featured: Boolean(p.featured),
    },
  };
}

/** Ensures slugs are unique (they are used as anchors and React keys). */
function dedupeSlugs(items: ClientProject[]): ClientProject[] {
  const seen = new Map<string, number>();
  return items.map((p) => {
    const n = seen.get(p.slug) ?? 0;
    seen.set(p.slug, n + 1);
    return n === 0 ? p : { ...p, slug: `${p.slug}-${n + 1}` };
  });
}

export async function getClientWork(): Promise<ClientProject[]> {
  try {
    await ensureTable();
    const { rows } = await pool.query<{ data: unknown }>(
      "SELECT data FROM client_projects ORDER BY position ASC, id ASC",
    );
    if (rows.length === 0) {
      await saveClientWork(DEFAULT_CLIENT_WORK);
      return DEFAULT_CLIENT_WORK;
    }
    const projects = rows
      .map((r) => normaliseProject(r.data))
      .filter((v): v is { ok: true; project: ClientProject } => v.ok)
      .map((v) => v.project);
    return projects.length ? dedupeSlugs(projects) : DEFAULT_CLIENT_WORK;
  } catch (error) {
    console.error("Failed to read client projects, using defaults", error);
    return DEFAULT_CLIENT_WORK;
  }
}

export async function saveClientWork(items: ClientProject[]): Promise<ClientProject[]> {
  await ensureTable();
  const clean = dedupeSlugs(items);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM client_projects");
    for (let i = 0; i < clean.length; i++) {
      await client.query("INSERT INTO client_projects (position, data) VALUES ($1, $2::jsonb)", [
        i,
        JSON.stringify(clean[i]),
      ]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  return clean;
}
