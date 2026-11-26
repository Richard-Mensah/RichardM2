import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RESEARCH_PAGES } from "@/data/researchPages";
import { cn } from "@/lib/utils";

/** Bento grid of the five research areas: two wide tiles, then three. */
export default function ResearchAreas() {
  const topics = RESEARCH_PAGES.filter((p) => p.isTopic);

  return (
    <section aria-labelledby="areas-heading" className="px-5 py-14 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Research areas</p>
        <h2 id="areas-heading" className="font-display mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl">
          Five connected questions, one system
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-body">
          AI, climate, development, youth and governance are treated as one interconnected system, not separate fields.
        </p>

        <ul className="mt-9 grid gap-4 md:grid-cols-6">
          {topics.map((t, i) => (
            <li key={t.href} className={cn(i < 2 ? "md:col-span-3" : "md:col-span-2")}>
              <Link
                href={t.href}
                className={cn(
                  "group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-navy-950 p-6 text-white shadow-[0_24px_50px_-30px_rgba(10,26,48,0.8)] transition duration-300 hover:-translate-y-1",
                  i < 2 ? "min-h-[20rem]" : "min-h-[17rem]",
                )}
              >
                <Image
                  src={t.image}
                  alt=""
                  fill
                  sizes={i < 2 ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 33vw, 92vw"}
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
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/75">{t.lede}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
                  Explore <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
