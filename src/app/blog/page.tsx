import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import BlogListing from "@/components/features/blog/BlogListing";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Writing | Richard Mensah",
  description:
    "Articles on AI, Data & Climate · AI Ethics & Technologies · Youth Leadership · Community & SDGs.",
};

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <BlogListing articles={articles} />
      </div>
      <SectionNav />
    </div>
  );
}
