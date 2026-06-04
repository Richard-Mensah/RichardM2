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
      <p className={cn("text-xs font-black uppercase tracking-[0.3em]", dark ? "text-[#7FD6D2]" : "text-[#0F2438]")}>
        {eyebrow}
      </p>
      <h2 className={cn("mt-4 text-balance text-3xl font-black tracking-[-0.04em] md:text-5xl", dark ? "text-white" : "text-slate-950")}>
        {title}
      </h2>
      {children ? (
        <div className={cn("mt-5 text-base leading-8 md:text-lg", dark ? "text-slate-200" : "text-slate-700")}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
