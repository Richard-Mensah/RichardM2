import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70",
        className
      )}
    >
      {children}
    </div>
  );
}
