import Link from "next/link";
import { CodeXml, GitCommitHorizontal, GraduationCap, HeartHandshake, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import type { ImpactStat } from "@/lib/impactStats";

type Tile = { icon: LucideIcon; value: string; label: string; href: string };

const IMPACT_ICONS: LucideIcon[] = [GraduationCap, Sparkles, HeartHandshake];

/**
 * One row of proof for every audience: the first three admin impact stats,
 * client builds, GitHub projects and contributions. Tiles with no data are skipped.
 */
export default function ProofBar({
  impactStats,
  clientBuilds,
  githubProjects,
  contributions,
}: {
  impactStats: ImpactStat[];
  clientBuilds: number;
  githubProjects: number | null;
  contributions: number | null;
}) {
  const tiles: Tile[] = [
    ...impactStats.slice(0, 3).map((s, i) => ({ icon: IMPACT_ICONS[i] ?? Sparkles, value: s.value, label: s.label, href: "/impact" })),
    ...(clientBuilds ? [{ icon: Rocket, value: String(clientBuilds), label: "Client websites & software shipped", href: "/work" }] : []),
    ...(githubProjects ? [{ icon: CodeXml, value: String(githubProjects), label: "Projects on GitHub", href: "/projects/open-source" }] : []),
    ...(contributions ? [{ icon: GitCommitHorizontal, value: String(contributions), label: "Code contributions this year", href: "/projects/open-source" }] : []),
  ];

  return (
    <section aria-label="Proof in numbers" className="px-5 pt-10 md:px-8 md:pt-14">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map(({ icon: Icon, value, label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <Icon size={17} className="text-accent-strong" aria-hidden="true" />
              <span className="font-display mt-2 text-2xl font-black tabular-nums text-ink sm:text-3xl">
                <CountUp value={value} />
              </span>
              <span className="mt-0.5 text-xs font-semibold leading-5 text-body group-hover:text-ink">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
