import PillNav from "@/components/ui/page/PillNav";
import { PROJECT_FAMILY } from "@/data/projectPages";

const ITEMS = PROJECT_FAMILY.map((p) => ({ href: p.href, label: p.nav }));

/** Sticky menu linking every page in the projects family. */
export default function ProjectsNav() {
  return <PillNav items={ITEMS} label="Project pages" />;
}
