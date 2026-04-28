import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

type AnyRecord = Record<string, never>;

const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
  __db?: NodePgDatabase<AnyRecord>;
};

function getPool(): Pool {
  if (globalForDb.__pool) return globalForDb.__pool;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  const pool = new Pool({ connectionString: url });
  if (process.env.NODE_ENV !== "production") globalForDb.__pool = pool;
  return pool;
}

function getDb(): NodePgDatabase<AnyRecord> {
  if (globalForDb.__db) return globalForDb.__db;
  const instance = drizzle(getPool());
  if (process.env.NODE_ENV !== "production") globalForDb.__db = instance;
  return instance;
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
