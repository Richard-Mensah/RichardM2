import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AreaTile = {
  href: string;
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
  focus?: string;
  sdg?: string;
};

/** Column spans on a 12-column grid: wide tiles first, so rows always fill. */
function spans(n: number): number[] {
  if (n === 5) return [6, 6, 4, 4, 4];
  if (n === 7) return [4, 4, 4, 3, 3, 3, 3];
  if (n === 4) return [6, 6, 6, 6];
  return Array.from({ length: n }, () => 4);
}

const SPAN_CLASS: Record<number, string> = { 3: "md:col-span-3", 4: "md:col-span-4", 6: "md:col-span-6" };

/** Bento grid of photo tiles linking to sub-pages. */
export default function AreaTiles({ tiles }: { tiles: AreaTile[] }) {
  const layout = spans(tiles.length);

  return (
    <ul className="grid gap-4 md:grid-cols-12">
      {tiles.map((t, i) => {
        const wide = layout[i] >= 6;
        return (
          <li key={t.href} className={SPAN_CLASS[layout[i]] ?? "md:col-span-4"}>
            <Link
              href={t.href}
              className={cn(
                "group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-navy-950 p-6 text-white shadow-[0_24px_50px_-30px_rgba(10,26,48,0.8)] transition duration-300 hover:-translate-y-1",
                wide ? "min-h-[20rem]" : "min-h-[17rem]",
              )}
            >
              <Image
                src={t.image}
                alt=""
                fill
                sizes={wide ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 33vw, 92vw"}
                className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                style={{ objectPosition: t.focus ?? "center" }}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/65 to-navy-950/10" aria-hidden="true" />
              {t.sdg ? (
                <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-navy-950/50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur">
                  {t.sdg}
                </span>
              ) : null}
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-accent-soft">{t.eyebrow}</p>
              <h3 className="font-display mt-2 text-balance text-xl font-bold leading-snug md:text-2xl">{t.title}</h3>
              {t.lede ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">{t.lede}</p> : null}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
                Explore <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
