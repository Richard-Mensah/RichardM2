import { getSetting } from "@/lib/siteSettings";
import {
  classifyRepo,
  trackStats,
  type ClassifiedRepo,
  type RepoInfo,
  type TrackOverrides,
  type TrackStats,
} from "@/lib/githubTracks";

/*
 * Live GitHub activity for the homepage.
 * - With GITHUB_TOKEN: one GraphQL call (exact calendar, private repo counts).
 * - Without it (or on error): public REST repos + the public contributions page.
 * Data is cached for an hour. Never throws; returns null if nothing is reachable.
 */

export const GITHUB_LOGIN = "Richard-Mensah";
export const TRACK_OVERRIDES_KEY = "github_track_overrides";
const REVALIDATE = 3600;
const UA = { "User-Agent": "richmensah-site" };

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Badge = { id: string; label: string; detail: string; unlocked: boolean };

export type GitHubActivity = {
  source: "graphql" | "public";
  totalRepos: number;
  privateRepos: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  last30: number;
  busiest: ContributionDay | null;
  weeks: ContributionDay[][]; // columns of 7 (Sun→Sat)
  level: number;
  levelProgress: number;
  nextLevelAt: number;
  tracks: { ai: TrackStats; web: TrackStats };
  repos: ClassifiedRepo[]; // public, non-hidden, newest push first
  languages: { name: string; color: string; count: number }[];
  badges: Badge[];
  fetchedAt: string;
};

/* ── Fetching ─────────────────────────────────────────────────────────── */

type RawData = { repos: RepoInfo[]; days: ContributionDay[]; total: number; totalRepos: number; source: GitHubActivity["source"] };

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  R: "#198CE7",
  Java: "#b07219",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

function levelFor(count: number): ContributionDay["level"] {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

async function fetchGraphQL(token: string): Promise<RawData> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } }
      all: repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes { name description url isPrivate stargazerCount pushedAt
          primaryLanguage { name color }
          repositoryTopics(first: 10) { nodes { topic { name } } } }
      }
    }
  }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...UA, Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL HTTP ${res.status}`);
  const json = (await res.json()) as {
    errors?: unknown;
    data?: {
      user: {
        contributionsCollection: { contributionCalendar: { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number }[] }[] } };
        all: {
          totalCount: number;
          nodes: {
            name: string; description: string | null; url: string; isPrivate: boolean; stargazerCount: number; pushedAt: string;
            primaryLanguage: { name: string; color: string | null } | null;
            repositoryTopics: { nodes: { topic: { name: string } }[] };
          }[];
        };
      } | null;
    };
  };
  const user = json.data?.user;
  if (!user) throw new Error("GitHub GraphQL returned no user");
  const cal = user.contributionsCollection.contributionCalendar;
  return {
    source: "graphql",
    total: cal.totalContributions,
    totalRepos: user.all.totalCount,
    days: cal.weeks.flatMap((w) => w.contributionDays).map((d) => ({ date: d.date, count: d.contributionCount, level: levelFor(d.contributionCount) })),
    repos: user.all.nodes.map((n) => ({
      name: n.name,
      description: n.description,
      url: n.url,
      language: n.primaryLanguage?.name ?? null,
      languageColor: n.primaryLanguage?.color ?? null,
      topics: n.repositoryTopics.nodes.map((t) => t.topic.name),
      stars: n.stargazerCount,
      pushedAt: n.pushedAt,
      isPrivate: n.isPrivate,
    })),
  };
}

async function fetchPublic(): Promise<RawData> {
  const [reposRes, calRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_LOGIN}/repos?per_page=100&sort=pushed&type=owner`, {
      headers: { ...UA, Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE },
    }),
    fetch(`https://github.com/users/${GITHUB_LOGIN}/contributions`, { headers: UA, next: { revalidate: REVALIDATE } }),
  ]);
  if (!reposRes.ok) throw new Error(`GitHub REST HTTP ${reposRes.status}`);
  const raw = (await reposRes.json()) as {
    name: string; description: string | null; html_url: string; language: string | null; topics?: string[];
    stargazers_count: number; pushed_at: string; fork: boolean;
  }[];
  const repos: RepoInfo[] = raw
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      languageColor: r.language ? LANG_COLORS[r.language] ?? null : null,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      isPrivate: false,
    }));

  let days: ContributionDay[] = [];
  let total = 0;
  if (calRes.ok) ({ days, total } = parseContributionsHtml(await calRes.text()));
  return { source: "public", repos, days, total, totalRepos: repos.length };
}

/** Parses GitHub's public contributions fragment (cells + sr-only tooltips). */
export function parseContributionsHtml(html: string): { days: ContributionDay[]; total: number } {
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = /^(\d[\d,]*) contribution/.exec(m[2].trim());
    counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
  }
  const days: ContributionDay[] = [];
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)?.[1];
    if (!date) continue;
    const id = /\bid="([^"]+)"/.exec(tag)?.[1] ?? "";
    const lvl = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
    const count = counts.get(id) ?? (lvl > 0 ? lvl : 0);
    days.push({ date, count, level: (Math.min(4, Math.max(0, lvl)) as ContributionDay["level"]) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const totalMatch = /([\d,]+)\s+contributions?\s+in the last year/i.exec(html.replace(/\s+/g, " "));
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : days.reduce((n, d) => n + d.count, 0);
  return { days, total };
}

/* ── Derivations ──────────────────────────────────────────────────────── */

function toWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (!days.length) return [];
  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];
  const firstDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDow; i++) week.push({ date: "", count: -1, level: 0 }); // padding
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak: today may still be empty, so start from yesterday in that case.
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  return { current, longest };
}

const LEVELS = [0, 50, 150, 300, 500, 800, 1200, 1800, 2600, 3600, 5000];

function profileLevel(total: number) {
  let level = 1;
  for (let i = 1; i < LEVELS.length; i++) if (total >= LEVELS[i]) level = i + 1;
  const cur = LEVELS[level - 1] ?? 0;
  const next = LEVELS[level] ?? cur + 1500;
  return { level, progress: Math.min(1, (total - cur) / (next - cur)), nextAt: next };
}

function buildActivity(raw: RawData, overrides: TrackOverrides): GitHubActivity {
  const classified: (ClassifiedRepo & { hidden: boolean })[] = raw.repos.map((r) => {
    const c = classifyRepo(r, overrides);
    return { ...r, track: c.track === "hidden" ? "other" : c.track, reason: c.reason, hidden: c.track === "hidden" };
  });
  const visible = classified.filter((r) => !r.hidden);
  const now = Date.now();
  const ai = trackStats(visible, "ai", now);
  const web = trackStats(visible, "web", now);

  const hiddenCount = classified.length - visible.length;
  const totalRepos = Math.max(visible.length, raw.totalRepos - hiddenCount);
  const privateRepos = raw.source === "graphql" ? visible.filter((r) => r.isPrivate).length + Math.max(0, raw.totalRepos - raw.repos.length) : 0;

  const langMap = new Map<string, { name: string; color: string; count: number }>();
  for (const r of visible) {
    if (!r.language) continue;
    const e = langMap.get(r.language) ?? { name: r.language, color: r.languageColor ?? LANG_COLORS[r.language] ?? "#8595a6", count: 0 };
    e.count++;
    langMap.set(r.language, e);
  }
  const languages = [...langMap.values()].sort((a, b) => b.count - a.count);

  const days = raw.days;
  const { current, longest } = streaks(days);
  const activeDays = days.filter((d) => d.count > 0).length;
  const last30 = days.slice(-30).reduce((n, d) => n + d.count, 0);
  const busiest = days.reduce<ContributionDay | null>((b, d) => (!b || d.count > b.count ? d : b), null);
  const lvl = profileLevel(raw.total);
  const jupyter = visible.filter((r) => r.language === "Jupyter Notebook").length;

  const badges: Badge[] = [
    { id: "streak7", label: "On fire", detail: "7-day streak", unlocked: longest >= 7 },
    { id: "streak30", label: "Unstoppable", detail: "30-day streak", unlocked: longest >= 30 },
    { id: "c100", label: "Centurion", detail: "100+ contributions in a year", unlocked: raw.total >= 100 },
    { id: "c1000", label: "Thousand club", detail: "1,000+ contributions in a year", unlocked: raw.total >= 1000 },
    { id: "polyglot", label: "Polyglot", detail: "4+ languages", unlocked: languages.length >= 4 },
    { id: "collector", label: "Repo collector", detail: "50+ projects", unlocked: totalRepos >= 50 },
    { id: "notebook", label: "Notebook scientist", detail: "10+ Jupyter projects", unlocked: jupyter >= 10 },
    { id: "hybrid", label: "Full-stack data scientist", detail: "10+ projects in both tracks", unlocked: ai.count >= 10 && web.count >= 10 },
  ];

  return {
    source: raw.source,
    totalRepos,
    privateRepos,
    totalContributions: raw.total,
    currentStreak: current,
    longestStreak: longest,
    activeDays,
    last30,
    busiest: busiest && busiest.count > 0 ? busiest : null,
    weeks: toWeeks(days),
    level: lvl.level,
    levelProgress: lvl.progress,
    nextLevelAt: lvl.nextAt,
    tracks: { ai, web },
    // Only public repos ever reach the browser; private ones are counted above.
    repos: visible.filter((r) => !r.isPrivate).sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt)),
    languages,
    badges,
    fetchedAt: new Date().toISOString(),
  };
}

/** Raw repo list with classifications, for the admin GitHub Tracks page. */
export async function getClassifiedRepos(): Promise<{ repos: (ClassifiedRepo & { hidden: boolean; override?: string })[]; overrides: TrackOverrides }> {
  const overrides = await getSetting<TrackOverrides>(TRACK_OVERRIDES_KEY, {});
  const raw = await loadRaw();
  if (!raw) return { repos: [], overrides };
  return {
    overrides,
    repos: raw.repos.map((r) => {
      const auto = classifyRepo(r, {});
      const c = classifyRepo(r, overrides);
      return { ...r, track: auto.track === "hidden" ? "other" : auto.track, reason: auto.reason, hidden: c.track === "hidden", override: overrides[r.name] };
    }),
  };
}

async function loadRaw(): Promise<RawData | null> {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    try {
      return await fetchGraphQL(token);
    } catch (error) {
      console.error("GitHub GraphQL failed, falling back to public data", error);
    }
  }
  try {
    return await fetchPublic();
  } catch (error) {
    console.error("GitHub public fetch failed", error);
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    const [raw, overrides] = await Promise.all([loadRaw(), getSetting<TrackOverrides>(TRACK_OVERRIDES_KEY, {})]);
    if (!raw || raw.repos.length === 0) return null;
    return buildActivity(raw, overrides);
  } catch (error) {
    console.error("Failed to build GitHub activity", error);
    return null;
  }
}
