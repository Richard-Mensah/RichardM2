import type { NavItem, SdgColour, PriorityGoal, IdentityCard, ResearchPillar, SystemProject } from "@/types";

export const NAVIGATION: NavItem[] = [
  { label: "Identity", href: "/identity" },
  { label: "SDGs", href: "/sdgs" },
  { label: "Research", href: "/research" },
  { label: "Systems", href: "/systems" },
  { label: "Leadership", href: "/leadership" },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Writing", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
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
    accent: "#009EDB",
    icon: "DS",
  },
  {
    domain: "AI & Climate Change",
    abstract:
      "Climate intelligence systems that translate complex environmental signals into practical adaptation decisions.",
    accent: "#3F7E44",
    icon: "CC",
  },
  {
    domain: "Youth Leadership Systems",
    abstract:
      "Mentorship, training, and knowledge systems that help young people move from potential to execution.",
    accent: "#FCC30B",
    icon: "YL",
  },
  {
    domain: "Policy, Ethics & Institutions",
    abstract:
      "Responsible AI frameworks for trust, fairness, transparency, inclusion, and evidence-based leadership.",
    accent: "#00689D",
    icon: "PE",
  },
];

export const SYSTEMS: SystemProject[] = [
  {
    title: "Predictive Intelligence System for Financial Behaviour",
    label: "AI + SDG 8",
    color: "#A21942",
    problem: "Organizations need better insight into behaviour without overwhelming people with irrelevant campaigns.",
    approach: "Classification models, segmentation, explainable scoring, and decision dashboards.",
    impact: "Improves targeting, reduces waste, and creates a pathway toward ethical financial inclusion.",
  },
  {
    title: "Climate Signal Observatory for Community Resilience",
    label: "Climate + SDG 13",
    color: "#3F7E44",
    problem: "Communities need localized climate intelligence that is understandable and actionable.",
    approach: "Open climate data, geospatial indicators, risk narratives, and youth-facing dashboards.",
    impact: "Supports resilience planning, public awareness, and adaptation conversations.",
  },
  {
    title: "Youth Leadership Knowledge Engine",
    label: "Leadership + SDG 4/17",
    color: "#C5192D",
    problem: "Mentorship programs often inspire people but fail to scale learning, measure growth, or preserve knowledge.",
    approach: "Program analytics, knowledge bases, skill maps, mentoring records, and opportunity pathways.",
    impact: "Makes youth leadership measurable, repeatable, and globally collaborative.",
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
