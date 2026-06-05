import Link from "next/link";

type NavItem = { label: string; href: string };
type Props = { prev?: NavItem; next?: NavItem };

export default function SectionNav({ prev, next }: Props) {
  return (
    <div className="border-t border-line bg-surface-card px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-black text-body transition hover:-translate-x-0.5 hover:border-accent hover:text-accent-strong"
          >
            ← {prev.label}
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-black text-body transition hover:border-accent hover:text-accent-strong"
          >
            ← Home
          </Link>
        )}
        {next ? (
          <Link
            href={next.href}
            className="btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition hover:translate-x-0.5"
          >
            {next.label} →
          </Link>
        ) : (
          <Link
            href="/"
            className="btn-accent flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition"
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
