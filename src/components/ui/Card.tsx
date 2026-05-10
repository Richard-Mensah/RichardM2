import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Card({ children, className, style }: Props) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
