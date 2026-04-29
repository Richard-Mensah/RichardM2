import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle } from "@/lib/articles";
import SectionNav from "@/components/ui/SectionNav";

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_COLOURS: Record<string, string> = {
  "AI, Data & Climate": "#009EDB",
  "AI Ethics & Technologies": "#FD6925",
  "Youth Leadership": "#FCC30B",
  "Community & SDGs": "#19486A",
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.meta.title} | Richard Mensah`,
    description: article.meta.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, content } = article;
  const accent = CATEGORY_COLOURS[meta.category] ?? "#009EDB";
  const formattedDate = new Date(meta.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <article className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-white"
            style={{ backgroundColor: accent }}
          >
            {meta.category}
          </span>
          <span className="text-xs text-slate-400">{formattedDate}</span>
        </div>

        <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
          {meta.title}
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-500">{meta.excerpt}</p>

        {meta.coverImage && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
            <Image src={meta.coverImage} alt={meta.title} fill className="object-cover" />
          </div>
        )}

        <div className="article-body mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>

      <SectionNav prev={{ label: "All Writing", href: "/blog" }} />
    </div>
  );
}
