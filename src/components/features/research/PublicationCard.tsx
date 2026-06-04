import { TAG_COLOURS } from "@/constants";

type Publication = {
  type: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  abstract: string;
  tags: readonly string[];
  accent: string;
};

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="group relative overflow-hidden glass rounded-2xl p-6 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl" style={{ backgroundColor: pub.accent }} />
      <div className="pl-4">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white"
            style={{ backgroundColor: pub.accent }}
          >
            {pub.type}
          </span>
          <span className="text-xs font-bold text-[#7e92b6]">{pub.year}</span>
        </div>
        <h3 className="mt-3 text-lg font-black leading-snug text-white md:text-xl">
          {pub.title}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-[#8aa0c4]">
          {pub.authors} &mdash; <span className="italic">{pub.venue}</span>
        </p>
        <p className="mt-3 text-sm leading-7 text-[#a9bcdc]">{pub.abstract}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {pub.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${TAG_COLOURS[tag] ?? "#4f8bff"}44`,
                color: TAG_COLOURS[tag] ?? "#4f8bff",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
