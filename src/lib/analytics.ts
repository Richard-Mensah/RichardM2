import { pool } from "@/db";

export type AnalyticsSummary = {
  total: number;
  last7: number;
  last30: number;
  topPages: { path: string; views: number }[];
  topArticles: { path: string; views: number }[];
  perDay: { day: string; views: number }[];
};

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS page_views (
      id serial PRIMARY KEY,
      path varchar(512) NOT NULL,
      referrer varchar(512) NOT NULL DEFAULT '',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `);
  tableReady = true;
}

export async function recordView(path: string, referrer: string): Promise<void> {
  await ensureTable();
  await pool.query("INSERT INTO page_views (path, referrer) VALUES ($1, $2)", [
    path.slice(0, 512),
    referrer.slice(0, 512),
  ]);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    await ensureTable();
    const [total, last7, last30, topPages, topArticles, perDay] = await Promise.all([
      pool.query<{ n: string }>("SELECT count(*)::int AS n FROM page_views"),
      pool.query<{ n: string }>("SELECT count(*)::int AS n FROM page_views WHERE created_at > now() - interval '7 days'"),
      pool.query<{ n: string }>("SELECT count(*)::int AS n FROM page_views WHERE created_at > now() - interval '30 days'"),
      pool.query<{ path: string; views: string }>(
        "SELECT path, count(*)::int AS views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 12"
      ),
      pool.query<{ path: string; views: string }>(
        "SELECT path, count(*)::int AS views FROM page_views WHERE path LIKE '/blog/%' GROUP BY path ORDER BY views DESC LIMIT 10"
      ),
      pool.query<{ day: string; views: string }>(
        "SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, count(*)::int AS views FROM page_views WHERE created_at > now() - interval '14 days' GROUP BY day ORDER BY day ASC"
      ),
    ]);

    return {
      total: Number(total.rows[0]?.n ?? 0),
      last7: Number(last7.rows[0]?.n ?? 0),
      last30: Number(last30.rows[0]?.n ?? 0),
      topPages: topPages.rows.map((r) => ({ path: r.path, views: Number(r.views) })),
      topArticles: topArticles.rows.map((r) => ({ path: r.path, views: Number(r.views) })),
      perDay: perDay.rows.map((r) => ({ day: r.day, views: Number(r.views) })),
    };
  } catch (error) {
    console.error("Failed to load analytics", error);
    return { total: 0, last7: 0, last30: 0, topPages: [], topArticles: [], perDay: [] };
  }
}
