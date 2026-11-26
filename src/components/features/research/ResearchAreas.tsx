import AreaTiles from "@/components/ui/page/AreaTiles";
import { RESEARCH_PAGES } from "@/data/researchPages";

/** The five research areas as a bento grid. */
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
        <div className="mt-9">
          <AreaTiles tiles={topics} />
        </div>
      </div>
    </section>
  );
}
