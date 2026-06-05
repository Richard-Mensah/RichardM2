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

export type { CollaborationInquiry, NewCollaborationInquiry } from "@/db/schema";
