import Image from "next/image";
import Link from "next/link";
import { FileText, PenLine } from "lucide-react";
import { isOptimisable, type WritingItem } from "@/lib/writingItems";
import { cn } from "@/lib/utils";

type Props = {
  item: WritingItem;
  /** Show the excerpt under the title (library and blog). */
  withExcerpt?: boolean;
  sizes?: string;
  className?: string;
};

/** White image card for an article or paper: photo on top, bold headline, type and date. */
export default function MediaCard({ item, withExcerpt = false, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw", className }: Props) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_18px_40px_-26px_rgba(10,26,48,0.6)] ring-1 ring-navy-950/5 outline-offset-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(10,26,48,0.75)]",
        className,
      )}
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-navy-900">
        <Image
          src={item.image}
          alt=""
          fill
          sizes={sizes}
          unoptimized={!isOptimisable(item.image)}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </span>
      <span className="flex flex-1 flex-col p-4">
        {item.topic ? (
          <span className="mb-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-accent-strong">{item.topic}</span>
        ) : null}
        <span className="font-display line-clamp-4 text-[1.05rem] font-bold leading-snug text-ink group-hover:text-accent-strong">
          {item.title}
        </span>
        {withExcerpt && item.excerpt ? (
          <span className="mt-2 line-clamp-3 text-sm leading-6 text-body">{item.excerpt}</span>
        ) : null}
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold text-muted">
          {item.isArticle ? (
            <PenLine size={13} className="text-accent-strong" aria-hidden="true" />
          ) : (
            <FileText size={13} className="text-accent-strong" aria-hidden="true" />
          )}
          <span className="text-ink-soft">{item.kind}</span>
          {item.meta ? <span aria-hidden="true">·</span> : null}
          {item.meta ? <span>{item.meta}</span> : null}
        </span>
      </span>
    </Link>
  );
}
