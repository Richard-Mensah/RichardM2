"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { ClientShot } from "@/types";

type Props = {
  shot: ClientShot;
  /** "browser" = 16:10 desktop frame with chrome; "phone" = 390×844 device frame. */
  frame?: "browser" | "phone";
  /** Domain shown in the browser URL pill. */
  url?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

const FRAME_RATIO = { browser: 10 / 16, phone: 844 / 390 } as const;

/**
 * A full-page capture of a live site that slowly pans top → bottom → top inside
 * a device frame. It only animates while on screen, pauses on hover/focus, and
 * stays still for visitors who prefer reduced motion (handled in globals.css).
 */
export default function AnimatedScreenshot({
  shot,
  frame = "browser",
  url,
  alt,
  sizes,
  priority,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // How much of the image's own height is visible in the frame.
  const visible = Math.min(1, (FRAME_RATIO[frame] * shot.width) / shot.height);
  const end = -(1 - visible) * 100;
  const dur = Math.max(8, Math.round((shot.height / shot.width) * (frame === "phone" ? 2.4 : 4.2)));
  const style = { "--shot-end": `${end.toFixed(2)}%`, "--shot-dur": `${dur}s` } as CSSProperties;

  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  if (frame === "phone") {
    return (
      <div
        ref={ref}
        className={cn(
          "shot-frame relative rounded-[1.6rem] border-[5px] border-navy-950 bg-navy-950 shadow-2xl",
          live && "shot-live",
          className,
        )}
      >
        <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-navy-800" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[1.25rem] bg-white" style={{ aspectRatio: "390 / 844" }}>
          <div className="shot-scroll" style={style}>
            <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} sizes={sizes} className="block h-auto w-full" priority={priority} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "shot-frame relative overflow-hidden rounded-xl border border-white/10 bg-navy-950 shadow-[0_24px_60px_-24px_rgba(10,26,48,0.55)]",
        live && "shot-live",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-navy-900 px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        {host ? (
          <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white/10 px-2.5 py-1 text-center text-[10px] font-semibold text-on-dark-muted">
            {host}
          </span>
        ) : null}
      </div>
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: "16 / 10" }}>
        <div className="shot-scroll" style={style}>
          <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} sizes={sizes} className="block h-auto w-full" priority={priority} />
        </div>
      </div>
    </div>
  );
}
