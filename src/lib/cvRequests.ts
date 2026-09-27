import { desc } from "drizzle-orm";
import { db, pool } from "@/db";
import { cvRequests, type CvRequest, type NewCvRequest } from "@/db/schema";

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cv_requests (
      id serial PRIMARY KEY,
      name varchar(160) NOT NULL,
      email varchar(255) NOT NULL,
      organization varchar(180),
      reason text NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

export async function createCvRequest(input: NewCvRequest): Promise<number | undefined> {
  await ensureTable();
  const [row] = await db.insert(cvRequests).values(input).returning({ id: cvRequests.id });
  return row?.id;
}

export async function getCvRequests(): Promise<CvRequest[]> {
  try {
    await ensureTable();
    return await db.select().from(cvRequests).orderBy(desc(cvRequests.createdAt));
  } catch (error) {
    console.error("Failed to read CV requests", error);
    return [];
  }
}
