// Canonical site URL shared by metadata, robots, and sitemap.
// Override per-environment with NEXT_PUBLIC_SITE_URL; falls back to production.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.richmensah.com";
