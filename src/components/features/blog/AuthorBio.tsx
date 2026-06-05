import Image from "next/image";
import type { Author } from "@/lib/author";

export default function AuthorBio({ author }: { author: Author }) {
  return (
    <aside className="mt-14 rounded-3xl border border-line bg-surface-card p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-strong">About the author</p>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
        {author.photo && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-muted">
            <Image src={author.photo} alt={author.name} fill className="object-cover" sizes="80px" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-lg font-black text-ink">{author.name}</p>
          {author.role && <p className="mt-0.5 text-sm font-semibold text-accent-strong">{author.role}</p>}
          {author.bio && <p className="mt-3 text-sm leading-7 text-body">{author.bio}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost rounded-full px-4 py-1.5 text-xs font-bold"
              >
                LinkedIn
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost rounded-full px-4 py-1.5 text-xs font-bold"
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
