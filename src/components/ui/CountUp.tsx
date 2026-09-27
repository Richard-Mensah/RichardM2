"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1] ?? "",
    target: Number(match[2].replace(/,/g, "")),
    suffix: match[3] ?? "",
  };
}

/**
 * Animates a numeric value from 0 to its target when scrolled into view.
 * Accepts strings like "2,500+", "120+", "8" and preserves any non-numeric
 * prefix/suffix. Respects prefers-reduced-motion (shows the final value, no motion).
 */
export default function CountUp({
  value,
  durationMs = 1600,
  className,
}: {
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parse(value);
  const format = (n: number) =>
    parsed ? `${parsed.prefix}${Math.round(n).toLocaleString("en-US")}${parsed.suffix}` : value;

  // Initial (and SSR / no-JS / off-screen) state shows the final value.
  const [display, setDisplay] = useState(() => (parsed ? format(parsed.target) : value));
  const started = useRef(false);

  useEffect(() => {
    if (!parsed || Number.isNaN(parsed.target)) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;
          if (reduce) return; // already showing final value
          setDisplay(format(0));
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(format(parsed.target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
