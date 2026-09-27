import Link from "next/link";

type NavItem = { label: string; href: string };
type Props = { prev?: NavItem; next?: NavItem };

export default function SectionNav({ prev, next }: Props) {
  const prevItem = prev ?? { label: "Home", href: "/" };
  return (
    <nav aria-label="Section" className="border-t border-line bg-surface-card px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          href={prevItem.href}
          className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-black text-body transition hover:-translate-x-0.5 hover:border-accent hover:text-accent-strong"
        >
          <span aria-hidden="true" className="transition group-hover:-translate-x-0.5">←</span>
          {prevItem.label}
        </Link>
        {next ? (
          <Link
            href={next.href}
            className="group btn-primary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition hover:translate-x-0.5"
          >
            {next.label}
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="btn-accent flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition hover:-translate-y-0.5"
          >
            Back to home
          </Link>
        )}
      </div>
    </nav>
  );
}
