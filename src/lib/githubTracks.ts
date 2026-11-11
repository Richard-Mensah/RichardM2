/*
 * GitHub "tracks": every repository is sorted into Data Science/AI/ML or
 * Web & Software Engineering. Pure and client-safe (no I/O) so it can be
 * tested directly and shared by the homepage and the admin page.
 */

export type Track = "ai" | "web" | "other";
export type TrackOverride = "ai" | "web" | "hidden";
export type TrackOverrides = Record<string, TrackOverride>;

export type RepoInfo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  languageColor: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
  isPrivate: boolean;
};

export type ClassifiedRepo = RepoInfo & { track: Track; reason: string };

export const TRACK_META: Record<Exclude<Track, "other">, { label: string; short: string; role: string; color: string; emoji: string }> = {
  ai: { label: "Data Science, AI & ML", short: "AI & Data", role: "Data Scientist", color: "#2ba8b4", emoji: "🧠" },
  web: { label: "Web & Software Engineering", short: "Web & Software", role: "Software Engineer", color: "#7c5cff", emoji: "⚙️" },
};

/** The profile README repo (same name as the account) is never a project. */
const EXCLUDED = new Set(["richard-mensah"]);

const AI_TOPICS = ["data-science", "machine-learning", "deep-learning", "ai", "artificial-intelligence", "nlp", "ml", "computer-vision", "data-analysis", "llm", "analytics"];
const WEB_TOPICS = ["web", "website", "nextjs", "react", "frontend", "backend", "fullstack", "full-stack", "software", "typescript", "webapp", "web-app"];

const AI_WORDS =
  /\b(ml|ai|machine|learning|deep|neural|nlp|nltk|llm|gpt|hugging|model|models|predict|prediction|forecast|classif\w*|regression|cluster\w*|data|analy\w*|dataset|pandas|numpy|notebook|kaggle|zindi|vision|cnn|lstm|sentiment|recommend\w*|climate|carbon|emission\w*|science|statistic\w*|eda|churn|fraud|segmentation|power ?bi|tableau|sql|neuroscience|supervised|translation|gradio)\b/i;
const WEB_WORDS =
  /\b(web|site|website|portfolio|next|nextjs|react|vue|angular|frontend|backend|fullstack|node|express|django|landing|shop|ecommerce|blog|cms|saas|mobile|clone|brand|school|schools|mentorship|movement|images)\b/i;

const AI_LANGS = new Set(["Jupyter Notebook", "R", "Julia", "MATLAB"]);
const WEB_LANGS = new Set(["TypeScript", "JavaScript", "HTML", "CSS", "SCSS", "Vue", "Svelte", "PHP", "Astro", "Dart", "Kotlin", "Swift"]);

function words(repo: RepoInfo): string {
  return `${repo.name.replace(/[-_.]+/g, " ")} ${repo.description ?? ""} ${repo.topics.join(" ")}`;
}

/** Classify one repo. Returns the track plus a short human-readable reason (shown in admin). */
export function classifyRepo(repo: RepoInfo, overrides: TrackOverrides = {}): { track: Track | "hidden"; reason: string } {
  const key = repo.name.toLowerCase();
  const override = overrides[repo.name];
  if (override) return { track: override, reason: "set in admin" };
  if (EXCLUDED.has(key)) return { track: "hidden", reason: "profile README repo" };

  const topics = repo.topics.map((t) => t.toLowerCase());
  const aiTopic = topics.find((t) => AI_TOPICS.includes(t));
  const webTopic = topics.find((t) => WEB_TOPICS.includes(t));
  if (aiTopic && !webTopic) return { track: "ai", reason: `topic: ${aiTopic}` };
  if (webTopic && !aiTopic) return { track: "web", reason: `topic: ${webTopic}` };

  const text = words(repo);
  const ai = AI_WORDS.test(text);
  const web = WEB_WORDS.test(text);
  const lang = repo.language;

  if (lang && AI_LANGS.has(lang)) return { track: "ai", reason: `language: ${lang}` };
  if (lang && WEB_LANGS.has(lang)) {
    return ai && !web ? { track: "ai", reason: `${lang}, ML keywords` } : { track: "web", reason: `language: ${lang}` };
  }
  if (lang === "Python") {
    return web && !ai ? { track: "web", reason: "Python web keywords" } : { track: "ai", reason: "language: Python" };
  }
  if (ai) return { track: "ai", reason: "keywords" };
  if (web) return { track: "web", reason: "keywords" };
  return { track: "other", reason: "no clear signal" };
}

export type TrackStats = {
  track: Exclude<Track, "other">;
  count: number;
  privateCount: number;
  stars: number;
  activeLast90: number;
  lastPushedAt: string | null;
  languages: { name: string; color: string; count: number }[];
  latest: ClassifiedRepo[];
  level: number;
  progress: number; // 0–1 towards next level
};

const LEVEL_STEPS = [0, 3, 6, 10, 15, 21, 28, 36, 45, 55, 70];

/** Level from project count, nudged up by recent activity. */
export function trackLevel(count: number, activeLast90: number): { level: number; progress: number } {
  const score = count + Math.min(activeLast90, 10) * 0.5;
  let level = 1;
  for (let i = 1; i < LEVEL_STEPS.length; i++) if (score >= LEVEL_STEPS[i]) level = i + 1;
  const cur = LEVEL_STEPS[level - 1] ?? 0;
  const next = LEVEL_STEPS[level] ?? cur + 15;
  return { level, progress: Math.max(0, Math.min(1, (score - cur) / (next - cur))) };
}

export function trackStats(repos: ClassifiedRepo[], track: Exclude<Track, "other">, now = Date.now()): TrackStats {
  const mine = repos.filter((r) => r.track === track);
  const ninety = now - 90 * 864e5;
  const langMap = new Map<string, { name: string; color: string; count: number }>();
  for (const r of mine) {
    if (!r.language) continue;
    const e = langMap.get(r.language) ?? { name: r.language, color: r.languageColor ?? "#8595a6", count: 0 };
    e.count++;
    langMap.set(r.language, e);
  }
  const activeLast90 = mine.filter((r) => Date.parse(r.pushedAt) >= ninety).length;
  const { level, progress } = trackLevel(mine.length, activeLast90);
  const sorted = [...mine].sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt));
  return {
    track,
    count: mine.length,
    privateCount: mine.filter((r) => r.isPrivate).length,
    stars: mine.reduce((n, r) => n + r.stars, 0),
    activeLast90,
    lastPushedAt: sorted[0]?.pushedAt ?? null,
    languages: [...langMap.values()].sort((a, b) => b.count - a.count),
    latest: sorted.filter((r) => !r.isPrivate).slice(0, 3),
    level,
    progress,
  };
}
