import type { MetadataRoute } from "next";
import { NAVIGATION } from "@/constants";
import { SITE_URL } from "@/lib/siteUrl";

// Derive the public route list from the site navigation so the sitemap
// stays in sync with the real pages (top-level links + their children).
// Sub-pages worth indexing that are not surfaced as top-level nav links.
const EXTRA_PATHS = ["/research/thesis"];

function navPaths(): string[] {
  const paths = new Set<string>(["/", ...EXTRA_PATHS]);
  for (const item of NAVIGATION) {
    if (item.href) paths.add(item.href);
    for (const child of item.children ?? []) {
      if (child.href) paths.add(child.href);
    }
  }
  return [...paths];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navPaths().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
