"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Cookieless page-view beacon. Fires once per client-side navigation, skipping
 * the admin area. No cookies, no personal data — just the path.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer || "" }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
