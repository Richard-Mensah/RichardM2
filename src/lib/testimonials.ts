import { asc } from "drizzle-orm";
import { db, pool } from "@/db";
import { testimonials } from "@/db/schema";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
  /** Photo URL (uploaded in /admin/testimonials). Initials are shown when empty. */
  avatar: string;
  /** Short achievement unlocked, e.g. "Fellowship secured". */
  outcome: string;
  /** 1–5 stars. */
  rating: number;
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: "Ama Osei", role: "Women in Data Ghana participant", initials: "AO", accent: "#3a78e0", avatar: "", outcome: "Fellowship secured", rating: 5, quote: "I came in not knowing how to apply for a fellowship. Richard sat with me, went through every section of the application, and helped me write a personal statement I was actually proud of. I got in. I still cannot believe it." },
  { name: "Samuel Nkrumah", role: "Youth Network Lead", initials: "SN", accent: "#2f6bea", avatar: "", outcome: "120 young people reached", rating: 5, quote: "Our community climate programme was struggling. Richard helped us redesign the structure, train our volunteers and measure outcomes properly. Within four months we had reached 120 young people. The change was night and day." },
  { name: "Amina Yusuf", role: "AI and Climate Change fellow", initials: "AY", accent: "#4f8bff", avatar: "", outcome: "Dashboard used by farmers", rating: 5, quote: "I had heard a lot about AI but had no idea where to start. The sessions with Richard were practical from day one. By the end my team had built a weather dashboard that actual farmers in our district were using." },
  { name: "Kweku Asante", role: "Digital skills trainee", initials: "KA", accent: "#4f8bff", avatar: "", outcome: "Presented to department", rating: 5, quote: "Before the programme I could not confidently use a spreadsheet. Twelve weeks later I was presenting a data dashboard to my entire department. Richard made it feel achievable at every step." },
  { name: "Grace Mensah", role: "Scholarship recipient", initials: "GM", accent: "#4f8bff", avatar: "", outcome: "Fully funded offer", rating: 5, quote: "Richard reviewed my personal statement three times without being asked. He caught things no one else noticed and pushed me to be specific about my goals. I got a fully funded offer. I keep telling people: find a mentor like this." },
  { name: "David Kwame", role: "Conference delegate", initials: "DK", accent: "#00689D", avatar: "", outcome: "Spoke at a global summit", rating: 5, quote: "I was terrified to present at an international summit. Richard ran a preparation session with me, helped me rehearse questions, and connected me with two researchers I am still collaborating with today. That summit changed my trajectory." },
  { name: "Esi Baah", role: "Community development facilitator", initials: "EB", accent: "#0EA5A4", avatar: "", outcome: "Cohort grew 20 → 80", rating: 5, quote: "We had the energy but not the structure. Richard helped us build a proper curriculum, track participation and show funders the real numbers. We went from 20 active participants to 80 in one cohort. Measurable impact." },
  { name: "Nana Appiah", role: "Leadership programme graduate", initials: "NA", accent: "#19486A", avatar: "", outcome: "Roadmap & network built", rating: 5, quote: "The mentorship was not just career advice, it was a whole systems shift in how I thought about my potential. I left with a roadmap, a network, and the confidence to actually execute it." },
];

let tableReady = false;
async function ensureTable(): Promise<void> {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id serial PRIMARY KEY,
      position integer NOT NULL DEFAULT 0,
      name varchar(160) NOT NULL,
      role varchar(200) NOT NULL DEFAULT '',
      quote text NOT NULL,
      initials varchar(8) NOT NULL DEFAULT '',
      accent varchar(16) NOT NULL DEFAULT '#4f8bff'
    );
  `);
  // Columns added after the table first shipped; safe to run repeatedly.
  const { rows } = await pool.query<{ exists: boolean }>(
    `SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'outcome') AS exists`,
  );
  const hadOutcome = Boolean(rows[0]?.exists);
  await pool.query(`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS avatar text NOT NULL DEFAULT ''`);
  await pool.query(`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS outcome varchar(120) NOT NULL DEFAULT ''`);
  await pool.query(`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating integer NOT NULL DEFAULT 5`);
  if (!hadOutcome) {
    // One-time backfill so existing default testimonials get their achievement badge.
    for (const t of DEFAULT_TESTIMONIALS) {
      await pool.query(`UPDATE testimonials SET outcome = $1 WHERE name = $2 AND outcome = ''`, [t.outcome, t.name]);
    }
  }
  tableReady = true;
}

export function clampRating(v: unknown): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 1 && n <= 5 ? n : 5;
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    await ensureTable();
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.position), asc(testimonials.id));
    if (rows.length === 0) {
      await saveTestimonials(DEFAULT_TESTIMONIALS);
      return DEFAULT_TESTIMONIALS;
    }
    return rows.map((r) => ({
      name: r.name,
      role: r.role ?? "",
      quote: r.quote,
      initials: r.initials || initialsFor(r.name),
      accent: r.accent || "#4f8bff",
      avatar: r.avatar ?? "",
      outcome: r.outcome ?? "",
      rating: clampRating(r.rating),
    }));
  } catch (error) {
    console.error("Failed to read testimonials, using defaults", error);
    return DEFAULT_TESTIMONIALS;
  }
}

export async function saveTestimonials(items: Testimonial[]): Promise<void> {
  await ensureTable();
  await db.transaction(async (tx) => {
    await tx.delete(testimonials);
    if (items.length > 0) {
      await tx.insert(testimonials).values(
        items.map((t, i) => ({
          position: i,
          name: t.name,
          role: t.role ?? "",
          quote: t.quote,
          initials: t.initials || initialsFor(t.name),
          accent: t.accent || "#4f8bff",
          avatar: t.avatar ?? "",
          outcome: t.outcome ?? "",
          rating: clampRating(t.rating),
        }))
      );
    }
  });
}
