import { asc } from "drizzle-orm";
import { db, pool } from "@/db";
import { impactStats } from "@/db/schema";

export type ImpactStat = {
  value: string;
  label: string;
  detail: string;
};

// Seed used the first time the table is empty, and as a fallback if the
// database is briefly unavailable so the public site never renders blank.
export const DEFAULT_IMPACT_STATS: ImpactStat[] = [
  {
    value: "120+",
    label: "People assisted for study abroad",
    detail:
      "Guidance through applications, statements, documents and decisions across 35+ fully funded scholarship pathways.",
  },
  {
    value: "10+",
    label: "Years of volunteerism and youth leadership",
    detail:
      "A decade of consistent service through youth mobilisation, community programmes, mentoring and advocacy.",
  },
  {
    value: "2,500+",
    label: "Youth impacted",
    detail:
      "Through training, mentorship, digital literacy and leadership programmes across Ghana and beyond.",
  },
  {
    value: "180+",
    label: "Youth leaders empowered",
    detail: "Across Sefwi Bekwai, Ghana, and wider youth leadership communities.",
  },
  {
    value: "65+",
    label: "Global mentors networked",
    detail:
      "Mentors, professionals, researchers, founders and civic leaders connected across the globe.",
  },
  {
    value: "8",
    label: "Countries travelled",
    detail:
      "Personal growth, conference exposure and cross-cultural learning across multiple continents.",
  },
];

// Create the table on demand so the feature works on a fresh database without a
// separate migration step (idempotent; cached per server instance).
let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS impact_stats (
      id serial PRIMARY KEY,
      position integer NOT NULL DEFAULT 0,
      value varchar(64) NOT NULL,
      label varchar(255) NOT NULL,
      detail text NOT NULL DEFAULT ''
    );
  `);
  tableReady = true;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  try {
    await ensureTable();
    const rows = await db
      .select()
      .from(impactStats)
      .orderBy(asc(impactStats.position), asc(impactStats.id));

    if (rows.length === 0) {
      await saveImpactStats(DEFAULT_IMPACT_STATS);
      return DEFAULT_IMPACT_STATS;
    }

    return rows.map((r) => ({
      value: r.value,
      label: r.label,
      detail: r.detail ?? "",
    }));
  } catch (error) {
    console.error("Failed to read impact stats from database, using defaults", error);
    return DEFAULT_IMPACT_STATS;
  }
}

export async function saveImpactStats(stats: ImpactStat[]): Promise<void> {
  await ensureTable();
  await db.transaction(async (tx) => {
    await tx.delete(impactStats);
    if (stats.length > 0) {
      await tx.insert(impactStats).values(
        stats.map((s, i) => ({
          position: i,
          value: s.value,
          label: s.label,
          detail: s.detail ?? "",
        }))
      );
    }
  });
}
