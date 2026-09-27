import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Subtle hover lift; on by default for a consistent, lively feel. */
  hover?: boolean;
};

export default function Card({ children, className, style, hover = true }: Props) {
  return (
    <div
      className={cn(
        "glass rounded-[2rem] p-6",
        hover && "card-lift",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
