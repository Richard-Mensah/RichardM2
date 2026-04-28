import { db } from "@/db";
import { sql } from "drizzle-orm";
import HeroSection from "@/components/features/hero/HeroSection";
import type { DatabaseSignal } from "@/types";

export const dynamic = "force-dynamic";

async function getDatabaseSignal(): Promise<DatabaseSignal> {
  try {
    await db.execute(sql`select 1`);
    return "online";
  } catch {
    return "degraded";
  }
}

export default async function HomePage() {
  const databaseSignal = await getDatabaseSignal();
  return <HeroSection databaseSignal={databaseSignal} />;
}
