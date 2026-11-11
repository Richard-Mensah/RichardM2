import { Building2, CodeXml, Rocket, UserRound, type LucideIcon } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import type { ClientWorkStats } from "@/data/clientWork";

/** Public analytics: how many builds have shipped, by type. Counts come from the admin-managed list. */
export default function ClientWorkStatsStrip({ stats }: { stats: ClientWorkStats }) {
  const tiles: { icon: LucideIcon; value: number; label: string; color: string }[] = [
    { icon: Rocket, value: stats.total, label: "Total builds shipped", color: "#c8912f" },
    { icon: Building2, value: stats.organisations, label: stats.organisations === 1 ? "Company / organisation website" : "Company & organisation websites", color: "#7c5cff" },
    { icon: UserRound, value: stats.personal, label: stats.personal === 1 ? "Personal brand website" : "Personal brand websites", color: "#1e8a95" },
    { icon: CodeXml, value: stats.software, label: stats.software === 1 ? "Software platform" : "Software platforms", color: "#0a1a30" },
  ];

  return (
    <div role="list" aria-label="Client build analytics" className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map(({ icon: Icon, value, label, color }) => (
        <div key={label} role="listitem" className="relative overflow-hidden rounded-2xl border border-line bg-surface-card p-4 shadow-sm sm:p-5">
          <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} aria-hidden="true" />
          <div className="flex items-start justify-between gap-2">
            <p className="font-display text-3xl font-black tabular-nums text-ink sm:text-4xl">
              <CountUp value={String(value)} />
            </p>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundColor: color }}>
              <Icon size={17} aria-hidden="true" />
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold leading-5 text-body">{label}</p>
        </div>
      ))}
    </div>
  );
}
