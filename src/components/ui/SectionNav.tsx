import Link from "next/link";

type NavItem = { label: string; href: string };
type Props = { prev?: NavItem; next?: NavItem };

export default function SectionNav({ prev, next }: Props) {
  return (
    <div className="border-t border-white/10 bg-transparent px-5 py-6 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-black text-[#a9bcdc] transition hover:-translate-x-0.5 hover:border-brand-primary-accent hover:text-brand-primary-accent"
          >
            ← {prev.label}
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-black text-[#a9bcdc] transition hover:border-brand-primary-accent hover:text-brand-primary-accent"
          >
            ← Home
          </Link>
        )}
        {next ? (
          <Link
            href={next.href}
            className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition hover:translate-x-0.5 hover:bg-brand-primary-accent"
          >
            {next.label} →
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-brand-primary-accent px-5 py-2.5 text-sm font-black text-white transition hover:bg-slate-950"
          >
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
