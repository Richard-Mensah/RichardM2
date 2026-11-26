import PillNav from "@/components/ui/page/PillNav";
import { RESEARCH_FAMILY } from "@/data/researchPages";

const ITEMS = [...RESEARCH_FAMILY.map((p) => ({ href: p.href, label: p.nav })), { href: "/blog", label: "Blog", accent: true }];

/** Sticky menu linking every page in the research family. */
export default function ResearchNav() {
  return <PillNav items={ITEMS} label="Research pages" />;
}
