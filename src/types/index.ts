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

export type DatabaseSignal = "online" | "degraded";

export type { CollaborationInquiry, NewCollaborationInquiry } from "@/db/schema";
