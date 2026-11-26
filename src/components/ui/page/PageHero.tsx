import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the photo. */
  focus?: string;
  crumbs?: Crumb[];
  /** Small badge next to the eyebrow, e.g. "SDG 13". */
  tag?: string;
  /** Buttons or chips under the lede. */
  children?: ReactNode;
};

/**
 * Full-bleed photo hero shared by inner pages: a slow-zooming photo under a
 * navy grade, breadcrumbs, eyebrow, headline and intro. Server component.
 */
export default function PageHero({ eyebrow, title, lede, image, imageAlt, focus, crumbs, tag, children }: Props) {
  return (
    <section className="page-hero relative isolate flex min-h-[26rem] items-end overflow-hidden bg-navy-950 text-white md:min-h-[30rem] lg:min-h-[34rem]">
      <div className="page-hero__media absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: focus ?? "center" }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/15" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-16 md:px-8 md:pb-16">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs font-semibold text-white/70">
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1">
                  {i > 0 ? <ChevronRight size={12} aria-hidden="true" /> : null}
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-accent-soft">{eyebrow}</p>
          {tag ? (
            <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              {tag}
            </span>
          ) : null}
        </div>
        <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lede ? <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">{lede}</p> : null}
        {children ? <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
