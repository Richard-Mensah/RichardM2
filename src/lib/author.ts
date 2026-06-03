import { getSetting, setSetting } from "@/lib/siteSettings";

export type Author = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  github: string;
};

const KEY = "author";

export const DEFAULT_AUTHOR: Author = {
  name: "Richard Mensah",
  role: "AI & Data Scientist · UNYA Ghana Country Representative",
  bio: "Richard Mensah holds an MSc in Artificial Intelligence & Data Science from Bangor University and serves as Country Representative for Ghana at the United Nations Youth Association. He works at the intersection of AI, climate intelligence, and youth opportunity across the Global South.",
  photo: "/Rich1.png",
  linkedin: "https://www.linkedin.com/in/richard-mensah-ab8564190/",
  github: "https://github.com/Richard-Mensah",
};

export async function getAuthor(): Promise<Author> {
  const stored = await getSetting<Partial<Author>>(KEY, {});
  return { ...DEFAULT_AUTHOR, ...stored };
}

export async function saveAuthor(author: Author): Promise<void> {
  await setSetting<Author>(KEY, author);
}
