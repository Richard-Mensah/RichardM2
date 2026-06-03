import { asc } from "drizzle-orm";
import { db, pool } from "@/db";
import { testimonials } from "@/db/schema";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: "Ama Osei", role: "Women in Data Ghana participant", initials: "AO", accent: "#A21942", quote: "I came in not knowing how to apply for a fellowship. Richard sat with me, went through every section of the application, and helped me write a personal statement I was actually proud of. I got in. I still cannot believe it." },
  { name: "Samuel Nkrumah", role: "Youth Network Lead", initials: "SN", accent: "#3F7E44", quote: "Our community climate programme was struggling. Richard helped us redesign the structure, train our volunteers and measure outcomes properly. Within four months we had reached 120 young people. The change was night and day." },
  { name: "Amina Yusuf", role: "AI and Climate Change fellow", initials: "AY", accent: "#0077FF", quote: "I had heard a lot about AI but had no idea where to start. The sessions with Richard were practical from day one. By the end my team had built a weather dashboard that actual farmers in our district were using." },
  { name: "Kweku Asante", role: "Digital skills trainee", initials: "KA", accent: "#FD6925", quote: "Before the programme I could not confidently use a spreadsheet. Twelve weeks later I was presenting a data dashboard to my entire department. Richard made it feel achievable at every step." },
  { name: "Grace Mensah", role: "Scholarship recipient", initials: "GM", accent: "#009EDB", quote: "Richard reviewed my personal statement three times without being asked. He caught things no one else noticed and pushed me to be specific about my goals. I got a fully funded offer. I keep telling people: find a mentor like this." },
  { name: "David Kwame", role: "Conference delegate", initials: "DK", accent: "#00689D", quote: "I was terrified to present at an international summit. Richard ran a preparation session with me, helped me rehearse questions, and connected me with two researchers I am still collaborating with today. That summit changed my trajectory." },
  { name: "Esi Baah", role: "Community development facilitator", initials: "EB", accent: "#0EA5A4", quote: "We had the energy but not the structure. Richard helped us build a proper curriculum, track participation and show funders the real numbers. We went from 20 active participants to 80 in one cohort. Measurable impact." },
  { name: "Nana Appiah", role: "Leadership programme graduate", initials: "NA", accent: "#19486A", quote: "The mentorship was not just career advice — it was a whole systems shift in how I thought about my potential. I left with a roadmap, a network, and the confidence to actually execute it." },
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
      accent varchar(16) NOT NULL DEFAULT '#0077FF'
    );
  `);
  tableReady = true;
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
      accent: r.accent || "#0077FF",
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
          accent: t.accent || "#0077FF",
        }))
      );
    }
  });
}
