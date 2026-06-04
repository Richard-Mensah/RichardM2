import Image from "next/image";
import type { Author } from "@/lib/author";

export default function AuthorBio({ author }: { author: Author }) {
  return (
    <aside className="mt-14 rounded-3xl border border-white/10 bg-transparent p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4f8bff]">About the author</p>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
        {author.photo && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-200">
            <Image src={author.photo} alt={author.name} fill className="object-cover" sizes="80px" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-lg font-black text-white">{author.name}</p>
          {author.role && <p className="mt-0.5 text-sm font-semibold text-[#4f8bff]">{author.role}</p>}
          {author.bio && <p className="mt-3 text-sm leading-7 text-[#a9bcdc]">{author.bio}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold text-[#cdd9ee] transition hover:border-[#4f8bff] hover:text-[#4f8bff]"
              >
                LinkedIn
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold text-[#cdd9ee] transition hover:border-[#4f8bff] hover:text-[#4f8bff]"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
