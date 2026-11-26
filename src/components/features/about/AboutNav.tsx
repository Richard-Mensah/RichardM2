import PillNav from "@/components/ui/page/PillNav";
import { ABOUT_FAMILY } from "@/data/aboutPages";

const ITEMS = ABOUT_FAMILY.map((p) => ({ href: p.href, label: p.nav }));

/** Sticky menu linking every page in the About family. */
export default function AboutNav() {
  return <PillNav items={ITEMS} label="About pages" />;
}
