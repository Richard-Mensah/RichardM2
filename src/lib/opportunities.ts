import { asc } from "drizzle-orm";
import { db, pool } from "@/db";
import { opportunities } from "@/db/schema";
import { accentForType, type Opportunity } from "@/lib/opportunities-shared";

// Re-export the client-safe pieces for server-side convenience.
export {
  OPPORTUNITY_CATEGORIES,
  accentForType,
  type OpportunityCategory,
  type Opportunity,
} from "@/lib/opportunities-shared";

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id serial PRIMARY KEY,
      position integer NOT NULL DEFAULT 0,
      slug varchar(80) NOT NULL DEFAULT '',
      title varchar(200) NOT NULL,
      type varchar(80) NOT NULL DEFAULT '',
      description text NOT NULL DEFAULT '',
      link text NOT NULL DEFAULT '',
      accent varchar(16) NOT NULL DEFAULT '#2BA8B4'
    );
  `);
  tableReady = true;
}

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    await ensureTable();
    const rows = await db
      .select()
      .from(opportunities)
      .orderBy(asc(opportunities.position), asc(opportunities.id));
    return rows.map((r) => ({
      type: r.type,
      title: r.title,
      description: r.description ?? "",
      link: r.link ?? "",
      accent: r.accent || accentForType(r.type),
    }));
  } catch (error) {
    console.error("Failed to read opportunities", error);
    return [];
  }
}

export async function saveOpportunities(items: Opportunity[]): Promise<void> {
  await ensureTable();
  await db.transaction(async (tx) => {
    await tx.delete(opportunities);
    if (items.length > 0) {
      await tx.insert(opportunities).values(
        items.map((o, i) => ({
          position: i,
          slug: "",
          title: o.title,
          type: o.type,
          description: o.description ?? "",
          link: o.link ?? "",
          accent: accentForType(o.type),
        }))
      );
    }
  });
}
