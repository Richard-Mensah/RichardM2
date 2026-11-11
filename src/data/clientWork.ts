import type { ClientCategory, ClientProject, ClientRarity } from "@/types";

const D = (slug: string, height = 5200) => ({ src: `/work/${slug}-desktop.jpg`, width: 1440, height });
const M = (slug: string, height = 6800) => ({ src: `/work/${slug}-mobile.jpg`, width: 780, height });

export const CLIENT_CATEGORY_LABEL: Record<ClientCategory, string> = {
  software: "Software / SaaS",
  organisation: "Company / organisation",
  personal: "Personal brand",
};

export const RARITY: Record<ClientRarity, { label: string; color: string; glow: string }> = {
  legendary: { label: "Legendary", color: "#c8912f", glow: "rgba(200,145,47,0.45)" },
  epic: { label: "Epic", color: "#7c5cff", glow: "rgba(124,92,255,0.40)" },
  rare: { label: "Rare", color: "#1e8a95", glow: "rgba(30,138,149,0.40)" },
};

/** Seed list: used when the database is empty or unavailable. Manage live data in /admin/client-work. */
export const DEFAULT_CLIENT_WORK: ClientProject[] = [
  {
    slug: "moncare-os",
    name: "MonCare OS",
    client: "MonCare Healthcare Agency",
    category: "software",
    rarity: "legendary",
    url: "https://m-c-app.vercel.app/sign-in",
    location: "Wales, UK",
    tagline: "The workforce operating system for a care agency.",
    summary:
      "A private operations platform that runs MonCare's rota, paperwork and pay in one record, so who is covering tomorrow and who is cleared to cover it are answered in the same place.",
    highlights: [
      "Recruitment, compliance, scheduling and pay in one system",
      "Built to the standards Care Inspectorate Wales inspects against",
      "Multi-agency isolation: no agency can see another's records",
      "Hours worked out and sent for payment on the 12th and 27th",
    ],
    badges: ["SaaS Platform", "Healthcare", "UK Client"],
    tags: ["Next.js", "Role-based access", "Compliance", "Payroll workflow"],
    desktop: D("moncare-os", 900),
    mobile: M("moncare-os", 1688),
    featured: true,
  },
  {
    slug: "moncare-uk",
    name: "MonCare Healthcare Agency",
    client: "MonCare Healthcare Agency",
    category: "organisation",
    rarity: "epic",
    url: "https://www.moncare.co.uk/",
    location: "North Wales, UK",
    tagline: "Professional care. Exceptional people.",
    summary:
      "The public website for a domiciliary care and healthcare staffing agency supplying nurses, healthcare assistants and support workers to homes, care homes and hospitals across Wales.",
    highlights: [
      "Interactive 'day of care' timeline from 07:30 to 19:00",
      "Service explorer for families, care providers and organisations",
      "Careers, training academy and staff sign-in journeys",
      "Trust strip: CIW registered, DBS checked, UK GDPR compliant",
    ],
    badges: ["Healthcare", "UK Client", "Gamified UX"],
    tags: ["Next.js", "Interactive storytelling", "Recruitment funnel", "SEO"],
    desktop: D("moncare-uk"),
    mobile: M("moncare-uk"),
    featured: true,
  },
  {
    slug: "ega-mentorship",
    name: "EGA Mentorship International",
    client: "EGA Mentorship International",
    category: "organisation",
    rarity: "epic",
    url: "https://www.egamentorship.org/",
    location: "Ghana · Global",
    tagline: "Building the next generation of global changemakers.",
    summary:
      "A global youth opportunity platform connecting young people to mentorship, leadership training, AI and digital skills, real-world projects, credentials and pathways to opportunity.",
    highlights: [
      "Enrolment for the Global Leaders Fellowship and AI Skills programme",
      "Live impact figures from the database: members, countries, mentors",
      "Member sign-in, opportunities board and partner pages",
      "Mentee personal-site network on egamentorship.org subdomains",
    ],
    badges: ["Youth Impact", "Mentorship Network", "Live Data"],
    tags: ["Next.js", "Database-driven", "Member accounts", "SDG aligned"],
    desktop: D("ega-mentorship"),
    mobile: M("ega-mentorship"),
    featured: true,
  },
  {
    slug: "bekwai-youth-movement",
    name: "Bekwai Youth Movement",
    client: "Bekwai Youth Movement (BYM)",
    category: "organisation",
    rarity: "epic",
    url: "https://bekwaiyouthmovement.org/",
    location: "Sefwi Bekwai, Ghana",
    tagline: "Harnessing the potential of every young person in Sefwi Bekwai.",
    summary:
      "The home of a non-political youth governance institution (Youth General Assembly, Youth Parliament and Community Intelligence Network), aligned with 12 UN Sustainable Development Goals.",
    highlights: [
      "Leadership applications and 'Join BYM' membership flow",
      "Transparent finances section: every cedi accounted for",
      "Seven programme units and youth governance pillars",
      "Event countdown and member sign-in",
    ],
    badges: ["Youth Impact", "Community", "SDG Aligned"],
    tags: ["Next.js", "Membership", "Transparency", "Governance"],
    desktop: D("bekwai-youth-movement"),
    mobile: M("bekwai-youth-movement"),
    featured: true,
  },
  {
    slug: "kwabena-acheampong",
    name: "Kwabena Acheampong",
    client: "Kwabena Acheampong",
    category: "personal",
    rarity: "rare",
    url: "https://kwabena-portfolio-iota.vercel.app/",
    location: "Ghana",
    tagline: "A graphic designer's portfolio built for international opportunities.",
    summary:
      "A bold portfolio for a Ghana-based graphic designer and brand strategy creative trained in advertising and packaging design, showcasing identity, advertising and campaign work.",
    highlights: [
      "Case-study work gallery with real client brands",
      "Interactive 'Palette Match' colour experience",
      "Services and enquiry journey for new clients",
    ],
    badges: ["Global Opportunities", "Creative"],
    tags: ["Next.js", "Portfolio", "Motion design"],
    desktop: D("kwabena-acheampong"),
    mobile: M("kwabena-acheampong"),
    featured: true,
  },
  {
    slug: "robert-kampi-laari",
    name: "Robert Kampi Laari",
    client: "Mr. Robert Kampi Laari",
    category: "personal",
    rarity: "rare",
    url: "https://mr-robert-inky.vercel.app/",
    location: "North East Region, Ghana",
    tagline: "Empowering young people to lead, build and transform.",
    summary:
      "The personal platform of a youth development advocate, author and speaker who serves as Regional Director of the National Youth Authority and convenes the Tamale Youth Summit.",
    highlights: [
      "Leadership record and portfolio-at-a-glance stats",
      "Tamale Youth Summit, author and speaker sections",
      "Insights, gallery and speaking-enquiry journey",
    ],
    badges: ["Public Leader", "Youth Impact"],
    tags: ["Next.js", "Personal brand", "Events"],
    desktop: D("robert-kampi-laari"),
    mobile: M("robert-kampi-laari"),
    featured: true,
  },
  {
    slug: "theodore-aware",
    name: "Theodore Aware",
    client: "Theodore Aware",
    category: "personal",
    rarity: "rare",
    url: "https://www.theodoreaware.egamentorship.org/",
    location: "EGA mentee network",
    tagline: "AI researcher and data scientist building reliable systems.",
    summary:
      "A research portfolio for an AI researcher and applied statistician working on navigation, public planning, finance and community-centred decision making.",
    highlights: [
      "Feature on KALMNav AI: emergency navigation when GPS goes down",
      "Research, expertise, experience and impact pages",
      "Community data work and public engagement gallery",
    ],
    badges: ["EGA Network", "AI Research"],
    tags: ["Next.js", "Research portfolio", "Multi-page"],
    desktop: D("theodore-aware"),
    mobile: M("theodore-aware"),
  },
  {
    slug: "kenneth-adu-akwabeng",
    name: "Kenneth Adu-Akwabeng",
    client: "Kenneth Adu-Akwabeng",
    category: "personal",
    rarity: "rare",
    url: "https://adukenneth.egamentorship.org/",
    location: "Ghana",
    tagline: "A builder of institutions, opportunities and community trust.",
    summary:
      "A personal site for a civil engineering graduate, youth leader, emerging legal professional and founder of Ken Inspired Network.",
    highlights: [
      "Impact measured through people reached",
      "10 roles across 6 sectors, presented as a leadership record",
      "Featured projects and partnership enquiries",
    ],
    badges: ["EGA Network", "Youth Impact"],
    tags: ["Next.js", "Personal brand", "Impact stats"],
    desktop: D("kenneth-adu-akwabeng", 5163),
    mobile: M("kenneth-adu-akwabeng"),
  },
  {
    slug: "rachael-otuah",
    name: "Rachael Otuah",
    client: "Rachael Otuah",
    category: "personal",
    rarity: "rare",
    url: "https://rachaelotuah.egamentorship.org/",
    location: "EGA mentee network",
    tagline: "Where finance meets sustainability.",
    summary:
      "A portfolio for an MSc Accounting & Finance graduate, ESG researcher and finance educator, led by her research on ESG ratings and FTSE 100 performance.",
    highlights: [
      "Featured dissertation research on ESG ratings and market valuations",
      "Blog, research insights and finance-education content",
      "Community, lifestyle and gallery sections",
    ],
    badges: ["EGA Network", "Finance & ESG"],
    tags: ["Next.js", "Research", "Blog"],
    desktop: D("rachael-otuah", 4618),
    mobile: M("rachael-otuah"),
  },
  {
    slug: "maxwell-baidoo",
    name: "Maxwell Kwadwo Baidoo",
    client: "Maxwell Kwadwo Baidoo",
    category: "personal",
    rarity: "rare",
    url: "https://maxbaidoo.egamentorship.org/",
    location: "Western North Region, Ghana",
    tagline: "Leadership rooted in service, education and regional transformation.",
    summary:
      "A professional profile for a development leader, giving a credible voice for youth, education, resources and regional transformation.",
    highlights: [
      "Record of service with headline impact numbers",
      "Agenda page setting out regional priorities",
      "Community, school and institutional gallery",
    ],
    badges: ["EGA Network", "Public Leader"],
    tags: ["Personal brand", "Impact stats", "Responsive"],
    desktop: D("maxwell-baidoo"),
    mobile: M("maxwell-baidoo"),
  },
  {
    slug: "christable-owusu",
    name: "Christabel F. Owusu",
    client: "Ing. Christabel Fremah Owusu, P.E.-GhIE",
    category: "personal",
    rarity: "rare",
    url: "https://chris-ta.vercel.app/",
    location: "Ghana",
    tagline: "Engineering reliable power. Developing future leaders.",
    summary:
      "A site for an electrical and electronics engineer in power systems, solar plant operations and commissioning, and a mentor with EGA Mentorship International. The site itself is designed as a power network.",
    highlights: [
      "'Power network' concept: a career shown as feeders into one line",
      "Projects across the lifecycle, credentials and mentorship",
      "Engineering enquiries for power and renewable energy projects",
    ],
    badges: ["EGA Network", "Engineering"],
    tags: ["Next.js", "Concept design", "Multi-page"],
    desktop: D("christable-owusu"),
    mobile: M("christable-owusu"),
  },
];

export const RARITY_FOR_CATEGORY: Record<ClientCategory, ClientRarity> = {
  software: "legendary",
  organisation: "epic",
  personal: "rare",
};

export type ClientWorkStats = {
  total: number;
  software: number;
  organisations: number;
  personal: number;
  countries: number;
};

/** Counts shown in the public analytics strips. Countries reflects the UK + Ghana footprint. */
export function clientWorkStats(projects: ClientProject[]): ClientWorkStats {
  return {
    total: projects.length,
    software: projects.filter((p) => p.category === "software").length,
    organisations: projects.filter((p) => p.category === "organisation").length,
    personal: projects.filter((p) => p.category === "personal").length,
    countries: 2,
  };
}
