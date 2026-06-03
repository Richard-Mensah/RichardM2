import { eq } from "drizzle-orm";
import { db, pool } from "@/db";
import { siteSettings } from "@/db/schema";

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key varchar(120) PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

/**
 * Read a singleton JSON setting by key, returning `fallback` when absent or on
 * any DB error (so public pages never break).
 */
export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    await ensureTable();
    const rows = await db
      .select({ value: siteSettings.value })
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);
    if (rows.length === 0) return fallback;
    return rows[0].value as T;
  } catch (error) {
    console.error(`Failed to read setting "${key}", using fallback`, error);
    return fallback;
  }
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  await ensureTable();
  await db
    .insert(siteSettings)
    .values({ key, value: value as unknown as object })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: value as unknown as object, updatedAt: new Date() },
    });
}
