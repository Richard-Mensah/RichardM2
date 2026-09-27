// Canonical site URL shared by metadata, robots, and sitemap.
// Override per-environment with NEXT_PUBLIC_SITE_URL; falls back to production.
// `||` (not `??`) so an empty value, e.g. a blank line copied from .env.example,
// also falls back instead of crashing `new URL("")` at build time.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.richmensah.com";
