/*
 * The projects family: one entry per page, used for the photo hero, the sticky
 * projects menu, the hub's area tiles, related GitHub repos and prev/next links.
 */

export type ProjectPage = {
  href: string;
  nav: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  focus?: string;
  sdg?: string;
  /** Matches public GitHub repos (name, description, topics). */
  repos?: RegExp;
  /** Leave out repos that match (they belong on a sibling page). */
  reposExclude?: RegExp;
  /** Only repos on this track. */
  track?: "ai" | "web";
  /** Shown as an area tile on the projects hub. */
  isArea?: boolean;
};

export const PROJECTS_HUB: ProjectPage = {
  href: "/projects",
  nav: "Overview",
  eyebrow: "Projects & systems",
  title: "Research turned into working systems.",
  lede: "Client software, machine-learning projects, climate tools and community platforms. Every project is framed as problem, approach and impact, the language institutions use to judge work.",
  image: "/gallery/FB_IMG_1746893901373.jpg",
  imageAlt: "Richard Mensah at an international technology expo beside a robotics demo",
  focus: "40% 35%",
};

export const PROJECT_PAGES: ProjectPage[] = [
  {
    href: "/work",
    nav: "Client work",
    eyebrow: "Client work & software",
    title: "Live products shipped for people and organisations.",
    lede: "",
    image: "/work/moncare-uk-desktop.jpg",
    imageAlt: "MonCare Healthcare Agency website",
    focus: "50% 0%",
    isArea: true,
  },
  {
    href: "/projects/ai",
    nav: "AI",
    eyebrow: "AI projects",
    title: "AI systems that start with a real problem.",
    lede: "Every AI project starts with a real institutional problem and ends with a working system: machine learning, NLP and decision intelligence designed for the contexts where they matter most.",
    image: "/gallery/FB_IMG_1744840775657.jpg",
    imageAlt: "Richard Mensah at the St Petersburg International Economic Forum, 2024",
    focus: "50% 25%",
    sdg: "SDG 9",
    track: "ai",
    repos: /\b(ml|ai|machine|learning|nlp|predict\w*|classif\w*|model\w*|gradio|fastapi|deep|neural|llm|sentiment|churn|sepsis|recommend\w*|vision)\b/i,
    isArea: true,
  },
  {
    href: "/projects/data-science",
    nav: "Data science",
    eyebrow: "Data science projects",
    title: "Turning raw data into institutional intelligence.",
    lede: "Data science that goes beyond notebooks and dashboards: systems that clean, interpret and surface data as decisions, giving institutions the clarity they need to act.",
    image: "/domains/data-dashboard.jpg",
    imageAlt: "Analytics dashboard on a laptop screen",
    sdg: "SDG 9",
    track: "ai",
    repos: /\b(data|analy\w*|dashboard|sql|power ?bi|tableau|eda|visuali[sz]\w*|sales|forecast\w*|statistic\w*|pandas|regression|cluster\w*)\b/i,
    reposExclude: /\b(nlp|nltk|sentiment|named entity|machine learning)\b/i,
    isArea: true,
  },
  {
    href: "/projects/climate",
    nav: "Climate",
    eyebrow: "Climate innovation",
    title: "Climate signals as community tools.",
    lede: "Communities facing climate risk need more than data. They need understanding. These systems turn complex environmental signals into tools communities can act on.",
    image: "/domains/climate-farmer.jpg",
    imageAlt: "A farmer standing in a green maize field",
    focus: "50% 40%",
    sdg: "SDG 13",
    repos: /\b(climate|carbon|emission\w*|co2|weather|environment\w*|energy|agri\w*)\b/i,
    isArea: true,
  },
  {
    href: "/projects/sdg",
    nav: "SDGs",
    eyebrow: "SDG projects",
    title: "Aligning innovation with the global goals.",
    lede: "Every project traces back to at least one Sustainable Development Goal. Here the SDGs are not marketing tags: they are the criteria by which work is designed, measured and evaluated.",
    image: "/gallery/FB_IMG_1746893968844.jpg",
    imageAlt: "International delegates holding the flags of Ghana and Bangladesh",
    focus: "50% 45%",
    sdg: "SDG 17",
    isArea: true,
  },
  {
    href: "/projects/community",
    nav: "Community",
    eyebrow: "Community initiatives",
    title: "Technology built by and for communities.",
    lede: "Community work has always been about showing up. The technology side of it, from simple data collection to mentorship platforms, is built in the same spirit: practical tools for people doing real things.",
    image: "/community/school-outreach-1.jpg",
    imageAlt: "Richard Mensah speaking to a full hall of students",
    focus: "50% 40%",
    sdg: "SDG 4",
    isArea: true,
  },
  {
    href: "/projects/open-source",
    nav: "Open source",
    eyebrow: "Open source work",
    title: "Sharing tools with the world.",
    lede: "Good tools should be visible, forkable and improvable. Open work in AI, data science and community development extends a simple belief: knowledge should circulate freely.",
    image: "/gallery/20240604_134602.jpg",
    imageAlt: "Richard Mensah at an international exhibition hall",
    focus: "20% 40%",
    isArea: true,
  },
  {
    href: "/projects/portfolio",
    nav: "Portfolio",
    eyebrow: "Portfolio",
    title: "A career built with purpose, in code and community.",
    lede: "From community teaching in Sefwi Bekwai to AI systems for institutional decision-making: the full record of work that has always been both technical and human.",
    image: "/gallery/20240302_090453.jpg",
    imageAlt: "Richard Mensah at an international youth forum",
    focus: "50% 45%",
  },
];

export const PROJECT_FAMILY: ProjectPage[] = [PROJECTS_HUB, ...PROJECT_PAGES];

export function projectPage(href: string): ProjectPage {
  const page = PROJECT_FAMILY.find((p) => p.href === href);
  if (!page) throw new Error(`Unknown project page: ${href}`);
  return page;
}

/** Previous and next pages in projects order, for the footer navigation. */
export function projectNeighbours(href: string): { prev: { label: string; href: string }; next: { label: string; href: string } } {
  const i = PROJECT_FAMILY.findIndex((p) => p.href === href);
  const before = PROJECT_FAMILY[i - 1];
  const after = PROJECT_FAMILY[i + 1];
  return {
    prev: before ? { label: before.eyebrow, href: before.href } : { label: "Home", href: "/" },
    next: after ? { label: after.eyebrow, href: after.href } : { label: "Leadership", href: "/leadership" },
  };
}
