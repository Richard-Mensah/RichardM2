"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const MAX_TILT = 6; // degrees

/**
 * Subtle pointer-driven 3D tilt + spotlight. Disables itself for touch and for
 * users who prefer reduced motion. Purely decorative — children stay interactive.
 */
export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function prefersReducedMotion() {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * MAX_TILT * 2}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * MAX_TILT * 2}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--spot", "1");
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("tilt-card", className)}
    >
      <div className="tilt-card__inner">{children}</div>
      <div className="tilt-card__spot" aria-hidden="true" />
    </div>
  );
}
