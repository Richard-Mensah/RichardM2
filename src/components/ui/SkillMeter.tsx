"use client";

import { useEffect, useRef, useState } from "react";

/** Animated proficiency bar that fills when scrolled into view. */
export default function SkillMeter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setFilled(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        className="meter-track"
        role="progressbar"
        aria-label={`${label} proficiency`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`meter-fill${filled ? " is-filled" : ""}`}
          style={{ ["--meter-value" as string]: `${value}%` }}
        />
      </div>
    </div>
  );
}
