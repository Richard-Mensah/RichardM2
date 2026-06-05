// Client-safe constants and types for opportunities (NO database imports, so this
// can be imported by client components without pulling `pg` into the browser).

export type OpportunityCategory = {
  id: string;
  title: string;
  accent: string;
  description: string;
};

export const OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  {
    id: "scholarships",
    title: "Scholarships",
    accent: "#4f8bff",
    description:
      "Funding opportunities for students and researchers in AI, data science, climate change, and sustainable development, with a focus on the Global South.",
  },
  {
    id: "internships",
    title: "Internships",
    accent: "#2f6bea",
    description:
      "Practical placements and work experience opportunities in AI, analytics, and development organisations for emerging talent.",
  },
  {
    id: "fellowships",
    title: "Fellowships",
    accent: "#19486A",
    description:
      "Competitive fellowship programmes for emerging leaders, researchers, and innovators working at the intersection of technology and global development.",
  },
  {
    id: "conferences",
    title: "Conferences",
    accent: "#4f8bff",
    description:
      "Upcoming and notable conferences on AI, climate change, youth leadership, and the SDGs, with call-for-papers and registration information.",
  },
];

export function accentForType(type: string): string {
  return OPPORTUNITY_CATEGORIES.find((c) => c.id === type)?.accent ?? "#4f8bff";
}

// An individual listing within a category.
export type Opportunity = {
  type: string; // category id
  title: string;
  description: string;
  link: string;
  accent: string;
};
