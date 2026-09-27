import type { ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { BOOKING_URL } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode;
  /** Button styling from globals.css: btn-accent (teal), btn-primary (navy), btn-brand (red), btn-ghost (light surfaces), btn-white (dark surfaces). */
  variant?: "accent" | "primary" | "brand" | "ghost" | "white";
  className?: string;
  iconSize?: number;
  onClick?: () => void;
};

/** External link to the EGA Mentorship booking page; opens in a new tab. */
export default function BookingLink({
  children = "Book appointment",
  variant = "accent",
  className,
  iconSize = 16,
  onClick,
}: Props) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        `btn-${variant} inline-flex items-center justify-center gap-2 rounded-full font-black uppercase transition hover:-translate-y-0.5`,
        className,
      )}
    >
      <CalendarDays size={iconSize} aria-hidden="true" />
      {children}
      <span className="sr-only"> (opens EGA Mentorship in a new tab)</span>
    </a>
  );
}
