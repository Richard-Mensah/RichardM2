import { getSetting, setSetting } from "@/lib/siteSettings";

export type HomepageContent = {
  heroEyebrow: string;
  heroTitleLead: string;
  heroTitleHighlight: string; // rendered with the SDG gradient
  heroTitleTail: string;
  heroSubtitle: string;
  welcomeTitle: string;
  welcomeBody: string; // paragraphs separated by a blank line
};

const KEY = "homepage";

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: "Richard Mensah",
  heroTitleLead: "AI & data scientist building ",
  heroTitleHighlight: "climate and youth solutions",
  heroTitleTail: " for the Global South.",
  heroSubtitle:
    "MSc, Artificial Intelligence & Data Science (Bangor University) · Formal Country Representative for Ghana, United Nations Youth Association 2020 - 2024. Global Director of EGA Mentorship International, 2024 - present.",
  welcomeTitle:
    "Richard Mensah - Climate AI Scientist, Developer & Human-Centred Systems Builder.",
  welcomeBody:
    "Richard is a Climate AI scientist with a deep interest in artificial intelligence, data science, natural language processing (NLP), and large language models (LLMs). He specialises in designing and building human-centred AI systems - technology that is not only technically rigorous but genuinely useful to the people who depend on it.\n\nAs a full-stack developer, Richard bridges research and product - moving from model to interface, from data pipeline to deployed application. His work sits at the intersection of climate intelligence, responsible AI, and sustainable development, with a focus on communities and institutions across the Global South.",
};

export async function getHomepage(): Promise<HomepageContent> {
  const stored = await getSetting<Partial<HomepageContent>>(KEY, {});
  return { ...DEFAULT_HOMEPAGE, ...stored };
}

export async function saveHomepage(content: HomepageContent): Promise<void> {
  await setSetting<HomepageContent>(KEY, content);
}

/** Split a stored multi-paragraph body into paragraphs for rendering. */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
