import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, PenLine } from "lucide-react";
import BlogListing from "@/components/features/blog/BlogListing";
import ResearchNav from "@/components/features/research/ResearchNav";
import SectionNav from "@/components/ui/SectionNav";
import { getAllArticles } from "@/lib/articles";
import { buildWritingItems, isOptimisable } from "@/lib/writingItems";

// Articles are published from the admin at any time, so read them per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Richard Mensah",
  description:
    "Articles by Richard Mensah on AI, data and climate, AI ethics, youth leadership, and community development and the SDGs.",
};

export default async function BlogPage() {
  const items = buildWritingItems(await getAllArticles(), { includePapers: false });
  const [featured, ...rest] = items;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      {/* Featured: the newest article */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div className="data-grid-light pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-accent-soft">
            <PenLine size={14} aria-hidden="true" /> The blog
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.035em] md:text-5xl">Ideas, research and perspectives</h1>

          {featured ? (
            <Link
              href={featured.href}
              className="group mt-9 grid overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition hover:ring-accent-soft/50 md:grid-cols-[1.1fr_1fr]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[22rem]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  unoptimized={!isOptimisable(featured.image)}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col justify-center p-6 md:p-10">
                <span className="w-fit rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">Latest · {featured.topic}</span>
                <span className="font-display mt-4 text-balance text-2xl font-bold leading-snug md:text-3xl">{featured.title}</span>
                <span className="mt-3 line-clamp-4 text-sm leading-7 text-white/75 md:text-base">{featured.excerpt}</span>
                <span className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
                    Read article <ArrowRight size={15} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-white/60">{featured.meta}</span>
                </span>
              </span>
            </Link>
          ) : (
            <p className="mt-8 text-white/70">The first article is on its way.</p>
          )}
        </div>
      </section>
      <ResearchNav />

      <section className="flex-1 px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {rest.length ? (
            <>
              <h2 className="font-display mb-6 text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">More articles</h2>
              <BlogListing items={rest} />
            </>
          ) : null}

          <Link
            href="/research/publications"
            className="group mt-12 flex flex-col gap-3 rounded-2xl border border-line bg-surface-card p-6 transition hover:border-accent/50 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex items-start gap-3">
              <FileText size={20} className="mt-0.5 text-accent-strong" aria-hidden="true" />
              <span>
                <span className="block font-bold text-ink">Looking for working papers and policy notes?</span>
                <span className="text-sm text-body">They live in the writing library, with abstracts and topics.</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-accent-strong group-hover:gap-2.5">
              Open the library <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <SectionNav prev={{ label: "Research", href: "/research" }} next={{ label: "Writing & papers", href: "/research/publications" }} />
    </div>
  );
}
