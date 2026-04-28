import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
};

export default function SectionHeading({ eyebrow, title, children, center = false }: Props) {
  return (
    <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#00689D]">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{children}</div>
      ) : null}
    </div>
  );
}
