import type { NavItem, SdgColour, PriorityGoal, IdentityCard, ResearchPillar, ResearchCategory, SystemProject, ProjectCategory } from "@/types";

// Information architecture: a tight 6-section spine.
// Labels are self-evident; every route below already exists. The deeper pages
// (research sub-categories, individual project pages, Kofiever sections) remain
// reachable from their hub landing pages and the footer — they are simply no
// longer surfaced as top-level clutter.
export const NAVIGATION: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT",
    href: "/about",
    children: [
      { label: "Profile",            href: "/about/profile" },
      { label: "Biography",          href: "/about/biography" },
      { label: "Leadership Journey", href: "/about/leadership-journey" },
      { label: "Vision & Mission",   href: "/about/vision" },
      { label: "CV / Resume",        href: "/about/cv" },
    ],
  },
  {
    label: "WORK",
    href: "/research",
    children: [
      { label: "AI & Data Science",        href: "/research/ai-data-science" },
      { label: "Climate Intelligence",     href: "/research/ai-climate-change" },
      { label: "Youth & Community",        href: "/leadership" },
      { label: "Projects & Portfolio",     href: "/projects" },
      { label: "Writing & Working Papers", href: "/research/publications" },
    ],
  },
  { label: "SDG IMPACT", href: "/sdgs" },
  {
    label: "ENGAGEMENT",
    href: "/about/conferences",
    children: [
      { label: "Conferences & Summits",   href: "/about/conferences" },
      { label: "Media & Speaking",        href: "/about/media" },
      { label: "Research Collaborations", href: "/research/collaborations" },
      { label: "Opportunities (Kofiever)", href: "/opportunities" },
    ],
  },
  { label: "CONTACT", href: "/contact" },
];

export const SDG_COLOURS: SdgColour[] = [
  { number: "1", name: "No Poverty", color: "#E5243B" },
  { number: "2", name: "Zero Hunger", color: "#DDA63A" },
  { number: "3", name: "Good Health", color: "#4C9F38" },
  { number: "4", name: "Quality Education", color: "#C5192D" },
  { number: "5", name: "Gender Equality", color: "#FF3A21" },
  { number: "6", name: "Clean Water", color: "#26BDE2" },
  { number: "7", name: "Clean Energy", color: "#FCC30B" },
  { number: "8", name: "Decent Work", color: "#A21942" },
  { number: "9", name: "Innovation", color: "#FD6925" },
  { number: "10", name: "Reduced Inequalities", color: "#DD1367" },
  { number: "11", name: "Sustainable Cities", color: "#FD9D24" },
  { number: "12", name: "Responsible Consumption", color: "#BF8B2E" },
  { number: "13", name: "Climate Action", color: "#3F7E44" },
  { number: "14", name: "Life Below Water", color: "#0A97D9" },
  { number: "15", name: "Life on Land", color: "#56C02B" },
  { number: "16", name: "Strong Institutions", color: "#00689D" },
  { number: "17", name: "Partnerships", color: "#19486A" },
];

export const PRIORITY_GOALS: PriorityGoal[] = [
  {
    code: "SDG 4",
    title: "Quality Education",
    color: "#C5192D",
    contribution:
      "Teaching AI literacy, analytics, leadership, and practical problem-solving so knowledge becomes opportunity.",
  },
  {
    code: "SDG 8",
    title: "Decent Work & Economic Growth",
    color: "#A21942",
    contribution:
      "Turning data skills into employability, entrepreneurship, productivity, and responsible digital transformation.",
  },
  {
    code: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    color: "#FD6925",
    contribution:
      "Building intelligent systems that help organizations modernize decisions, products, services, and institutional capacity.",
  },
  {
    code: "SDG 13",
    title: "Climate Action",
    color: "#3F7E44",
    contribution:
      "Developing climate intelligence ideas for resilience, risk communication, adaptation planning, and public awareness.",
  },
  {
    code: "SDG 16",
    title: "Peace, Justice & Strong Institutions",
    color: "#00689D",
    contribution:
      "Promoting ethical AI, transparent analytics, responsible governance, and evidence-based institutional leadership.",
  },
  {
    code: "SDG 17",
    title: "Partnerships for the Goals",
    color: "#19486A",
    contribution:
      "Connecting Ghana, the UK, India, and global partners around research, youth development, and impact execution.",
  },
];

export const IDENTITY_TIMELINE: IdentityCard[] = [
  {
    place: "Ghana",
    title: "Rooted in development urgency",
    body: "A foundation shaped by community, education, ambition, and the belief that technology should solve real problems.",
  },
  {
    place: "United Kingdom",
    title: "Expanded through global systems thinking",
    body: "A broader lens on research, policy, leadership, and how advanced analytics can serve institutions and people.",
  },
  {
    place: "Global South + global partners",
    title: "Built for cross-border impact",
    body: "A platform that connects AI, climate intelligence, youth empowerment, entrepreneurship, and sustainable development.",
  },
];

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    domain: "AI & Data Science",
    abstract:
      "Applied machine learning, predictive modeling, responsible analytics, and decision intelligence for organizations.",
    accent: "#4f8bff",
    icon: "DS",
  },
  {
    domain: "AI & Climate Change",
    abstract:
      "Climate intelligence systems that translate complex environmental signals into practical adaptation decisions.",
    accent: "#2f6bea",
    icon: "CC",
  },
  {
    domain: "Youth Leadership Systems",
    abstract:
      "Mentorship, training, and knowledge systems that help young people move from potential to execution.",
    accent: "#3a78e0",
    icon: "YL",
  },
  {
    domain: "Policy, Ethics & Institutions",
    abstract:
      "Responsible AI frameworks for trust, fairness, transparency, inclusion, and evidence-based leadership.",
    accent: "#3a78e0",
    icon: "PE",
  },
];

export const SYSTEMS: SystemProject[] = [
  {
    title: "Predictive Intelligence System for Financial Behaviour",
    label: "AI + SDG 8",
    color: "#4f8bff",
    problem: "Organizations need better insight into behaviour without overwhelming people with irrelevant campaigns.",
    approach: "Classification models, segmentation, explainable scoring, and decision dashboards.",
    impact: "Improves targeting, reduces waste, and creates a pathway toward ethical financial inclusion.",
  },
  {
    title: "Climate Signal Observatory for Community Resilience",
    label: "Climate + SDG 13",
    color: "#2f6bea",
    problem: "Communities need localized climate intelligence that is understandable and actionable.",
    approach: "Open climate data, geospatial indicators, risk narratives, and youth-facing dashboards.",
    impact: "Supports resilience planning, public awareness, and adaptation conversations.",
  },
  {
    title: "Youth Leadership Knowledge Engine",
    label: "Leadership + SDG 4/17",
    color: "#3a78e0",
    problem: "Mentorship programs often inspire people but fail to scale learning, measure growth, or preserve knowledge.",
    approach: "Program analytics, knowledge bases, skill maps, mentoring records, and opportunity pathways.",
    impact: "Makes youth leadership measurable, repeatable, and globally collaborative.",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    slug: "/projects/ai",
    label: "AI Projects",
    tagline: "Applied intelligence for real-world decisions",
    description: "Machine learning systems, NLP tools, predictive models, and intelligent decision-support platforms built for real-world institutional use.",
    accent: "#4f8bff",
    icon: "AI",
    image: "/gallery/FB_IMG_1744840775657.jpg",
  },
  {
    slug: "/projects/data-science",
    label: "Data Science Projects",
    tagline: "Turning raw data into institutional intelligence",
    description: "Analytics pipelines, dashboards, data engineering, and visualisation systems that turn raw data into actionable institutional intelligence.",
    accent: "#2f6bea",
    icon: "DS",
    image: "/gallery/20240302_090453.jpg",
  },
  {
    slug: "/projects/climate",
    label: "Climate Innovation",
    tagline: "Climate signals as community tools",
    description: "Climate signal observatories, resilience dashboards, and community-facing tools that translate complex climate data into understandable, actionable insights.",
    accent: "#3a78e0",
    icon: "CL",
    image: "/research/ai-climate-change-satellite.jpg",
  },
  {
    slug: "/projects/sdg",
    label: "SDG Projects",
    tagline: "Aligning innovation with the global goals",
    description: "Systems and programmes directly aligned with specific Sustainable Development Goals, from SDG 4 (education) to SDG 13 (climate action).",
    accent: "#3a78e0",
    icon: "SDG",
    image: "/gallery/FB_IMG_1746893901373.jpg",
  },
  {
    slug: "/projects/community",
    label: "Community Initiatives",
    tagline: "Technology built by and for communities",
    description: "Youth-led and community-centred programmes combining skills training, mentorship, and local data to drive grassroots development.",
    accent: "#3a78e0",
    icon: "CM",
    image: "/community/teaching-class-1.jpg",
  },
  {
    slug: "/projects/open-source",
    label: "Open Source Work",
    tagline: "Sharing tools with the world",
    description: "Publicly available tools, code, and frameworks contributed to the open-source community for AI, data science, and development applications.",
    accent: "#4f8bff",
    icon: "OS",
    image: "/gallery/20240604_134602.jpg",
  },
  {
    slug: "/projects/portfolio",
    label: "Portfolio",
    tagline: "A career built with purpose, in code and community",
    description: "A complete showcase of Richard's built systems, published work, and deployed tools across AI, climate intelligence, and youth development.",
    accent: "#2f6bea",
    icon: "PF",
    image: "/gallery/FB_IMG_1742347850249.jpg",
  },
];

export const LEADERSHIP_TRACKS: string[] = [
  "Alpha Society as a disciplined youth leadership and excellence community",
  "AI and analytics training through institutional and community learning spaces",
  "Partnerships across Ghana, the UK, India, and global innovation networks",
  "Public thinking on AI in Africa, climate intelligence, inequality, and leadership",
];

export const WRITING_IDEAS: string[] = [
  "The Future of AI in Africa Is Institutional, Not Just Technical",
  "Climate Intelligence Systems for the Global South",
  "Youth Leadership Models for the AI Generation",
  "Responsible AI and the Sustainable Development Goals",
];

export const COLLABORATION_TYPES: string[] = [
  "Research collaboration",
  "Speaking or media",
  "Startup or product build",
  "Policy or institutional advisory",
  "Mentorship or youth program",
];

export const FOCUS_AREAS: string[] = [
  "AI for sustainable development",
  "Climate intelligence",
  "Youth leadership",
  "Data science systems",
  "Ethics and policy",
  "Institutional training",
];

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  {
    slug: "/research/publications",
    label: "Writing & Working Papers",
    description: "Independent essays, working papers, and policy notes on AI, climate, and global development.",
    accent: "#4f8bff",
    icon: "PB",
    image: "/research/publications-hero.jpg",
  },
  {
    slug: "/research/conference-presentations",
    label: "Conference Presentations",
    description: "Presentations and talks on AI ethics, climate intelligence, and youth policy at academic and youth forums.",
    accent: "#2f6bea",
    icon: "CP",
    sdgTag: "SDG 17",
    image: "/research/conference-presentations-hero.jpg",
  },
  {
    slug: "/research/collaborations",
    label: "Research Collaborations",
    description: "Open research partnerships, co-authorship, and institutional advisory engagements.",
    accent: "#3a78e0",
    icon: "RC",
    sdgTag: "SDG 17",
    image: "/research/collaborations-hero.jpg",
  },
  {
    slug: "/research/articles",
    label: "Articles",
    description: "Public writing that translates research into ideas anyone can engage with.",
    accent: "#3a78e0",
    icon: "AR",
    image: "/research/articles-writing.jpg",
  },
  {
    slug: "/research/thought-leadership",
    label: "Thought Leadership",
    description: "Frameworks and perspectives on AI in society, governance, and the Global South.",
    accent: "#3a78e0",
    icon: "TL",
    sdgTag: "SDG 16",
    image: "/research/thought-leadership-speaking.jpg",
  },
  {
    slug: "/research/ai-data-science",
    label: "AI & Data Science",
    description: "Applied ML, predictive modeling, NLP, and decision intelligence for real-world problems.",
    accent: "#4f8bff",
    icon: "DS",
    sdgTag: "SDG 9",
    image: "/gallery/FB_IMG_1744840775657.jpg",
  },
  {
    slug: "/research/youth-development",
    label: "Youth Development",
    description: "Mentorship, training, and knowledge systems helping young people move from potential to execution.",
    accent: "#2f6bea",
    icon: "YD",
    sdgTag: "SDG 4",
    image: "/research/youth-development-group.jpg",
  },
  {
    slug: "/research/ai-climate-change",
    label: "AI & Climate Change",
    description: "Climate intelligence systems translating environmental signals into community-readable decisions.",
    accent: "#3a78e0",
    icon: "CC",
    sdgTag: "SDG 13",
    image: "/research/ai-climate-change-satellite.jpg",
  },
  {
    slug: "/research/global-development",
    label: "Global Development",
    description: "Cross-border research and partnerships connecting Ghana, the UK, and global networks.",
    accent: "#3a78e0",
    icon: "GD",
    sdgTag: "SDG 17",
    image: "/research/global-development-map.jpg",
  },
];

export const PUBLICATIONS = [
  {
    type: "Working Paper",
    year: "2024",
    title: "Climate Intelligence for Community Resilience: An AI-Assisted Framework for Adaptation Planning in Sub-Saharan Africa",
    authors: "Mensah, R.",
    venue: "Working paper — open for collaboration",
    abstract:
      "This paper proposes a framework for translating satellite-derived climate signals into community-readable risk narratives using machine learning and geospatial analytics. The approach is designed for low-resource settings where data science capacity is limited but climate risk is acute.",
    tags: ["Climate AI", "SDG 13", "Global South", "NLP"],
    accent: "#3F7E44",
  },
  {
    type: "Essay",
    year: "2024",
    title: "Large Language Models and the Promise of Multilingual AI for Development",
    authors: "Mensah, R.",
    venue: "Independent essay — self-published",
    abstract:
      "Explores how LLMs can be adapted for multilingual African contexts, with a focus on low-resource languages and the design considerations needed to ensure these systems serve rather than exclude communities on the margins of the global digital economy.",
    tags: ["LLMs", "NLP", "SDG 4", "Multilingual AI"],
    accent: "#4f8bff",
  },
  {
    type: "Policy Note",
    year: "2024",
    title: "Responsible AI for the Global South: Institutional Readiness, Ethics, and Governance Gaps",
    authors: "Mensah, R.",
    venue: "Policy note — working draft",
    abstract:
      "This policy note examines the structural gaps that make AI governance frameworks developed in the Global North unsuitable for direct application in Sub-Saharan Africa and South Asia. It proposes a locally-grounded ethics and accountability model aligned with the UN SDG agenda.",
    tags: ["AI Ethics", "Policy", "SDG 16", "Governance"],
    accent: "#00689D",
  },
  {
    type: "Research Note",
    year: "2023",
    title: "Predictive Analytics for Youth Programme Outcomes: A Data-Driven Approach to Measuring Social Impact",
    authors: "Mensah, R.",
    venue: "Internal research note — EGA Mentorship International",
    abstract:
      "Documents a methodology for tracking, measuring, and predicting youth programme outcomes using structured data from mentorship sessions, scholarship applications, and community engagement records. Demonstrates that data-driven programme management can double measurable impact within a single cohort cycle.",
    tags: ["Data Science", "SDG 4", "SDG 17", "Youth Development"],
    accent: "#FCC30B",
  },
  {
    type: "Working Paper",
    year: "2023",
    title: "Human-Centred AI Design Principles for Development Contexts",
    authors: "Mensah, R.",
    venue: "Working paper — open for review",
    abstract:
      "Proposes a set of design principles for AI systems intended for deployment in development contexts, drawing on human-computer interaction research, participatory design theory, and field experience building tools for communities with diverse literacy levels and device constraints.",
    tags: ["Human-Centred AI", "Full-Stack", "Design", "SDG 9"],
    accent: "#FD6925",
  },
  {
    type: "Essay",
    year: "2023",
    title: "The Future of AI in Africa Is Institutional, Not Just Technical",
    authors: "Mensah, R.",
    venue: "Independent essay — self-published",
    abstract:
      "Argues that AI adoption in Africa will be determined less by access to models and more by whether institutions — universities, ministries, NGOs — are structured to adopt, govern, and maintain intelligent systems. Outlines what institutional AI readiness looks like in practice.",
    tags: ["AI in Africa", "Institutions", "SDG 9", "SDG 16"],
    accent: "#A21942",
  },
] as const;

export const TAG_COLOURS: Record<string, string> = {
  "Climate AI": "#3F7E44",
  "SDG 13": "#3F7E44",
  "Global South": "#4f8bff",
  NLP: "#4f8bff",
  LLMs: "#4f8bff",
  "SDG 4": "#C5192D",
  "Multilingual AI": "#4f8bff",
  "AI Ethics": "#00689D",
  Policy: "#00689D",
  "SDG 16": "#00689D",
  Governance: "#00689D",
  "Data Science": "#FCC30B",
  "SDG 17": "#19486A",
  "Youth Development": "#FCC30B",
  "Human-Centred AI": "#FD6925",
  "Full-Stack": "#FD6925",
  Design: "#FD6925",
  "SDG 9": "#FD6925",
  "AI in Africa": "#A21942",
  Institutions: "#A21942",
  "SDG 8": "#A21942",
};
