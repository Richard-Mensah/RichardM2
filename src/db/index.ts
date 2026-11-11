import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

type AnyRecord = Record<string, never>;

// Cached on globalThis in every environment. In production this gives one pool per
// serverless instance (the Proxies below call getDb() on every property access, so an
// uncached pool would open new connections on every query); in development it also
// survives hot reloads.
const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
  __db?: NodePgDatabase<AnyRecord>;
};

/**
 * pg-connection-string currently maps these legacy libpq modes to full
 * certificate/hostname verification and warns about that compatibility
 * behavior. Make the equivalent mode explicit so production logs stay clean.
 */
function normalizeSslMode(connectionString: string): string {
  try {
    const parsed = new URL(connectionString);
    const mode = parsed.searchParams.get("sslmode")?.toLowerCase();
    const useLibpqCompatibility = parsed.searchParams.get("uselibpqcompat")?.toLowerCase() === "true";
    if (!useLibpqCompatibility && (mode === "prefer" || mode === "require" || mode === "verify-ca")) {
      parsed.searchParams.set("sslmode", "verify-full");
    }
    return parsed.toString();
  } catch {
    // Preserve non-URL PostgreSQL connection strings supported by `pg`.
    return connectionString;
  }
}

function getPool(): Pool {
  if (globalForDb.__pool) return globalForDb.__pool;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  globalForDb.__pool = new Pool({
    connectionString: normalizeSslMode(url),
    max: 5,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
  });
  return globalForDb.__pool;
}

function getDb(): NodePgDatabase<AnyRecord> {
  if (globalForDb.__db) return globalForDb.__db;
  globalForDb.__db = drizzle(getPool());
  return globalForDb.__db;
}

export const pool = new Proxy({} as Pool, {
  get(_, prop) {
    const realPool = getPool();
    const value = Reflect.get(realPool, prop, realPool);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(realPool)
      : value;
  },
});

export const db = new Proxy({} as NodePgDatabase<AnyRecord>, {
  get(_, prop) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, realDb);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(realDb)
      : value;
  },
});
