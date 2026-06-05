import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, children, center = false, dark = false }: Props) {
  return (
    <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <p
        className={cn(
          "text-[11px] font-extrabold uppercase tracking-[0.24em]",
          dark ? "text-accent-soft" : "text-accent-strong"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-[2.7rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-5 text-base leading-8 md:text-lg",
            dark ? "text-on-dark-muted" : "text-body"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
