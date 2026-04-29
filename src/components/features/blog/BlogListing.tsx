"use client";

import { useState } from "react";
import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";

const CATEGORIES = [
  "All",
  "AI, Data & Climate",
  "AI Ethics & Technologies",
  "Youth Leadership",
  "Community & SDGs",
] as const;

type Props = { articles: ArticleMeta[] };

export default function BlogListing({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Writing"
          title="Ideas, research, and perspectives"
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-black transition ${
                activeCategory === cat
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950 hover:text-slate-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-slate-400">
            No articles in this category yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
