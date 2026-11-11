import { BadgeCheck, Plane, type LucideIcon } from "lucide-react";
import type { HomepageContent } from "@/lib/homepage";
import type { ReelChapter } from "@/data/heroReel";
import BookingLink from "@/components/ui/BookingLink";
import HeroReel, { type PlayerStats } from "./HeroReel";

const CREDENTIALS: { label: string; icon: LucideIcon }[] = [
  { label: "MSc Artificial Intelligence & Data Science, Bangor University", icon: BadgeCheck },
  { label: "Formal Country Representative for UNYA-Ghana, Youth MP", icon: BadgeCheck },
  { label: "11 countries", icon: Plane },
  { label: "2,500+ youth impacted", icon: BadgeCheck },
];

/** Full-screen cinematic reel (admin-editable chapters + headline) and the credential ribbon. */
export default function HeroSection({
  content,
  chapters,
  player,
}: {
  content: HomepageContent;
  chapters: ReelChapter[];
  player: PlayerStats;
}) {
  return (
    <section className="relative">
      <HeroReel
        chapters={chapters}
        eyebrow={content.heroEyebrow}
        titleLead={content.heroTitleLead}
        titleHighlight={content.heroTitleHighlight}
        titleTail={content.heroTitleTail}
        subtitle={content.heroSubtitle}
        player={player}
        primaryCta={<BookingLink variant="accent" className="min-h-11 px-6 text-xs tracking-[0.14em] shadow-lg shadow-black/30" />}
      />

      {/* Credential ribbon */}
      <div className="border-b border-line bg-surface-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 md:px-8">
          {CREDENTIALS.map(({ label, icon: Icon }) => (
            <p key={label} className="flex items-center gap-2 text-xs font-medium text-body">
              <Icon size={14} className="shrink-0 text-accent" />
              {label}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
