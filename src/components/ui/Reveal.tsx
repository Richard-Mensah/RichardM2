"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals children on scroll using the `.reveal-section` / `.is-visible` classes
 * in globals.css (which already handle prefers-reduced-motion). Above-the-fold
 * content reveals immediately because it intersects on mount.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal-section", visible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
