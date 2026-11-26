/*
 * The research family: one entry per page, used for the photo hero, the
 * sticky research menu, the hub's topic tiles and each page's related writing.
 */

export type ResearchPage = {
  href: string;
  /** Short label for the sticky menu. */
  nav: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the hero photo. */
  focus?: string;
  sdg?: string;
  /** Matches related articles and papers (title + topic). */
  topic?: RegExp;
  /** Shown as a topic tile on the research hub. */
  isTopic?: boolean;
};

export const RESEARCH_HUB: ResearchPage = {
  href: "/research",
  nav: "Overview",
  eyebrow: "Research & writing",
  title: "Investigating AI, climate and human systems for global development.",
  lede: "Climate intelligence, natural language processing, human-centred AI and the institutions needed to deploy AI responsibly, particularly in the Global South. Pick an area to explore.",
  image: "/leadership/cambridge-invite-1.jpg",
  imageAlt: "Richard Mensah at the University of Cambridge library",
  focus: "50% 30%",
};

export const RESEARCH_PAGES: ResearchPage[] = [
  {
    href: "/research/ai-data-science",
    nav: "AI & data",
    eyebrow: "AI & Data Science",
    title: "Applied intelligence for real-world decisions.",
    lede: "Machine learning, predictive modelling, NLP and decision intelligence, designed to serve organisations and communities with genuinely useful, explainable outputs.",
    image: "/research/ai-data-science-dashboard.jpg",
    imageAlt: "Richard Mensah with delegates at an international technology stand",
    focus: "50% 35%",
    sdg: "SDG 9",
    topic: /\bai\b|data|machine|model|nlp|language|analytics|system/i,
    isTopic: true,
  },
  {
    href: "/research/ai-climate-change",
    nav: "Climate",
    eyebrow: "AI & Climate Change",
    title: "Climate intelligence for communities on the frontlines.",
    lede: "Translating complex environmental signals into practical, community-readable adaptation intelligence, particularly for Sub-Saharan Africa, where climate risk is acute and data science capacity is limited.",
    image: "/research/ai-climate-change-satellite.jpg",
    imageAlt: "Satellite view of the Richat Structure in the Sahara",
    sdg: "SDG 13",
    topic: /climate|emission|co₂|co2|environment|resilien|adaptation|sdg 13/i,
    isTopic: true,
  },
  {
    href: "/research/global-development",
    nav: "Global development",
    eyebrow: "Global Development",
    title: "Cross-border work, organised around the SDGs.",
    lede: "Research and partnerships connecting Ghana, the UK and global networks around AI, climate intelligence, youth empowerment and sustainable development, with the UN Sustainable Development Goals as the organising framework.",
    image: "/research/global-development-map.jpg",
    imageAlt: "International delegates celebrating together at a global forum",
    focus: "50% 40%",
    sdg: "SDG 17",
    topic: /global|development|sdg|africa|south|institution/i,
    isTopic: true,
  },
  {
    href: "/research/youth-development",
    nav: "Youth",
    eyebrow: "Youth Development",
    title: "From potential to execution, at scale.",
    lede: "Mentorship, training and knowledge systems that help young people across Ghana and beyond move from aspiration to action, with measurable, lasting outcomes.",
    image: "/research/youth-development-group.jpg",
    imageAlt: "Young delegates celebrating at an international youth event",
    focus: "50% 40%",
    sdg: "SDG 4",
    topic: /youth|leader|mentor|education|community|sdg 4/i,
    isTopic: true,
  },
  {
    href: "/research/thought-leadership",
    nav: "Thought leadership",
    eyebrow: "Thought Leadership",
    title: "Ideas on AI and society, grounded in practice.",
    lede: "Frameworks, perspectives and provocations on the role of artificial intelligence in society, governance and the Global South, based on practice, not just theory.",
    image: "/research/thought-leadership-speaking.jpg",
    imageAlt: "Richard Mensah speaking on an international panel",
    focus: "60% 45%",
    sdg: "SDG 16",
    topic: /govern|policy|ethic|responsible|society|future|institution/i,
    isTopic: true,
  },
  {
    href: "/research/publications",
    nav: "Writing & papers",
    eyebrow: "Writing & working papers",
    title: "Independent writing on AI, climate and development.",
    lede: "Articles, essays, working papers and policy notes at the intersection of AI, climate change and sustainable development, shared openly for discussion, collaboration and review.",
    image: "/research/research-papers-hero.jpg",
    imageAlt: "Richard Mensah reviewing a paper with a fellow delegate",
    focus: "50% 30%",
  },
  {
    href: "/research/thesis",
    nav: "MSc thesis",
    eyebrow: "MSc thesis",
    title: "Predicting vehicle CO₂ emissions with machine learning.",
    lede: "",
    image: "/gallery/pulse-of-the-earth-2.jpg",
    imageAlt: "Richard Mensah at the Pulse of the Earth climate exhibition",
  },
  {
    href: "/research/conference-presentations",
    nav: "Talks",
    eyebrow: "Conference presentations",
    title: "Carrying the Global South's voice into global rooms.",
    lede: "Speaking at AI ethics forums, UN SDG convenings, youth leadership assemblies and climate intelligence summits, bringing practitioner insight from Ghana, the UK and the broader Global South.",
    image: "/research/conference-presentations-hero.jpg",
    imageAlt: "Richard Mensah presenting to a full conference hall",
    focus: "40% 45%",
    sdg: "SDG 17",
    topic: /./,
  },
  {
    href: "/research/collaborations",
    nav: "Collaborate",
    eyebrow: "Research collaborations",
    title: "Building partnerships that multiply impact.",
    lede: "Open to research partnerships, institutional collaborations and joint publications across AI, climate and development. The best work happens across disciplines, borders and sectors.",
    image: "/research/collaborations-hero.jpg",
    imageAlt: "Richard Mensah in conversation with a research partner",
    focus: "60% 35%",
    sdg: "SDG 17",
    topic: /./,
  },
];

export const RESEARCH_FAMILY: ResearchPage[] = [RESEARCH_HUB, ...RESEARCH_PAGES];

export function researchPage(href: string): ResearchPage {
  const page = RESEARCH_FAMILY.find((p) => p.href === href);
  if (!page) throw new Error(`Unknown research page: ${href}`);
  return page;
}

/** Previous and next pages in research order, for the footer navigation. */
export function researchNeighbours(href: string): { prev: { label: string; href: string }; next: { label: string; href: string } } {
  const i = RESEARCH_FAMILY.findIndex((p) => p.href === href);
  const before = RESEARCH_FAMILY[i - 1];
  const after = RESEARCH_FAMILY[i + 1];
  return {
    prev: before ? { label: before.eyebrow, href: before.href } : { label: "Home", href: "/" },
    next: after ? { label: after.eyebrow, href: after.href } : { label: "Get in touch", href: "/contact" },
  };
}
