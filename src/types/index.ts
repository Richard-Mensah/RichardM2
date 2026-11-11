export type NavSubItem = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavSubItem[];
};

export type SdgColour = {
  number: string;
  name: string;
  color: string;
};

export type PriorityGoal = {
  code: string;
  title: string;
  color: string;
  contribution: string;
};

export type IdentityCard = {
  place: string;
  title: string;
  body: string;
};

export type ResearchPillar = {
  domain: string;
  abstract: string;
  accent: string;
  icon: string;
};

export type ResearchCategory = {
  slug: string;
  label: string;
  description: string;
  accent: string;
  icon: string;
  sdgTag?: string;
  image?: string;
};

export type SystemProject = {
  title: string;
  label: string;
  color: string;
  problem: string;
  approach: string;
  impact: string;
};

export type ProjectCategory = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
  image: string;
};

export type HomeDomain = {
  title: string;
  blurb: string;
  href: string;
  icon: string; // lucide-react icon name
  tag: string; // short focus / SDG tag
};

export type SkillGroup = {
  area: string;
  icon: string; // lucide-react icon name
  skills: string[];
  level: number; // proficiency 0–100, drives the animated meter
};

export type AudiencePathway = {
  audience: string; // e.g. "Recruiters & employers"
  headline: string; // what they get
  blurb: string;
  cta: string;
  href: string;
  icon: string; // lucide-react icon name
};

export type DatabaseSignal = "online" | "degraded";

export type ClientCategory = "software" | "organisation" | "personal";
export type ClientRarity = "legendary" | "epic" | "rare";

export type ClientShot = { src: string; width: number; height: number };

export type ClientProject = {
  slug: string;
  name: string;
  client: string;
  category: ClientCategory;
  rarity: ClientRarity;
  url: string;
  location: string;
  /** One-line hook shown on cards. */
  tagline: string;
  /** Short paragraph: who the client is and what the build does. */
  summary: string;
  /** Concrete things the build delivers, taken from the live site. */
  highlights: string[];
  /** Achievement badges shown on the card. */
  badges: string[];
  tags: string[];
  desktop: ClientShot;
  /** Optional phone-size capture; the phone frame is hidden when missing. */
  mobile?: ClientShot;
  featured?: boolean;
};

export type { CollaborationInquiry, NewCollaborationInquiry } from "@/db/schema";
