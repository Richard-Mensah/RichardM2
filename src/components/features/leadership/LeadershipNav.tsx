import PillNav from "@/components/ui/page/PillNav";
import { LEADERSHIP_FAMILY } from "@/data/leadershipPages";

const ITEMS = LEADERSHIP_FAMILY.map((p) => ({ href: p.href, label: p.nav }));

/** Sticky menu linking every leadership & impact page. Hidden when printing. */
export default function LeadershipNav() {
  return (
    <div className="no-print contents">
      <PillNav items={ITEMS} label="Leadership pages" />
    </div>
  );
}
