import fs from "fs";
import path from "path";

export type ImpactStat = {
  value: string;
  label: string;
  detail: string;
};

const STATS_FILE = path.join(process.cwd(), "content", "impact-stats.json");

// Used when no CMS file exists yet, and as the seed for the editor.
export const DEFAULT_IMPACT_STATS: ImpactStat[] = [
  {
    value: "120+",
    label: "People assisted for study abroad",
    detail:
      "Guidance through applications, statements, documents and decisions across 35+ fully funded scholarship pathways.",
  },
  {
    value: "10+",
    label: "Years of volunteerism and youth leadership",
    detail:
      "A decade of consistent service through youth mobilisation, community programmes, mentoring and advocacy.",
  },
  {
    value: "2,500+",
    label: "Youth impacted",
    detail:
      "Through training, mentorship, digital literacy and leadership programmes across Ghana and beyond.",
  },
  {
    value: "180+",
    label: "Youth leaders empowered",
    detail: "Across Sefwi Bekwai, Ghana, and wider youth leadership communities.",
  },
  {
    value: "65+",
    label: "Global mentors networked",
    detail:
      "Mentors, professionals, researchers, founders and civic leaders connected across the globe.",
  },
  {
    value: "8",
    label: "Countries travelled",
    detail:
      "Personal growth, conference exposure and cross-cultural learning across multiple continents.",
  },
];

export function getImpactStats(): ImpactStat[] {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, "utf-8");
      const parsed = JSON.parse(raw) as ImpactStat[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .filter((s) => s && typeof s.value === "string" && typeof s.label === "string")
          .map((s) => ({
            value: s.value,
            label: s.label,
            detail: typeof s.detail === "string" ? s.detail : "",
          }));
      }
    }
  } catch (error) {
    console.error("Failed to read impact stats, using defaults", error);
  }
  return DEFAULT_IMPACT_STATS;
}

export function saveImpactStats(stats: ImpactStat[]): void {
  const dir = path.dirname(STATS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), "utf-8");
}
