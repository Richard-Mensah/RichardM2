/*
 * Chapters for the full-screen cinematic hero reel on the homepage.
 * These are the defaults; Richard can edit them in Admin → Hero Reel.
 * Open with the sharpest, most striking photo: it is the first impression.
 */

export type ReelChapter = {
  /** Site path (/gallery/…) or https URL. */
  image: string;
  /** Optional muted, looping MP4/WebM; shown instead of the image when set. */
  video?: string;
  /** Short label, e.g. "Youth voice". "Chapter N" is added automatically from the position. */
  kicker: string;
  title: string;
  location: string;
  /** CSS object-position for the image, e.g. "top" or "50% 30%". */
  focus?: string;
  alt: string;
};

/**
 * Chapters added after a reel may already have been saved in admin. Each is
 * prepended once to a saved reel by lib/heroReel.ts (matched by image), so
 * removing it in Admin → Hero Reel keeps it removed. Newest first.
 */
export const REEL_ADDITIONS: ReelChapter[] = [
  {
    image: "/gallery/pulse-of-the-earth-1.jpg",
    kicker: "Climate × AI",
    title: "Reading the pulse of the Earth with data",
    location: "Pulse of the Earth exhibition · Wales, UK",
    focus: "62% 38%",
    alt: "Richard Mensah beside the Frame Rate: Pulse of the Earth exhibition sign",
  },
];

/** Strips a legacy "Chapter 3 ·" prefix from a saved label. */
export function chapterLabel(kicker: string): string {
  return kicker.replace(/^chapter\s*\d+\s*[·:\-–—]?\s*/i, "").trim();
}

export const DEFAULT_REEL: ReelChapter[] = [
  ...REEL_ADDITIONS,
  {
    image: "/leadership/unya-parliament-house.jpg",
    kicker: "Youth voice",
    title: "Youth parliament and diplomacy for the SDGs",
    location: "Parliament House, Accra, Ghana",
    alt: "Youth delegates gathered outside Ghana's Parliament House",
  },
  {
    image: "/hero-slides/slide-1.jpg",
    kicker: "Global stage",
    title: "Representing Ghana at international forums",
    location: "Roscongress · St Petersburg",
    focus: "50% 30%",
    alt: "Richard Mensah at the Roscongress international economic forum",
  },
  {
    image: "/gallery/FB_IMG_1746893921870.jpg",
    kicker: "Partnerships",
    title: "Building networks across continents",
    location: "Global youth summit",
    alt: "Hundreds of international delegates in a summit hall",
  },
  {
    image: "/leadership/cambridge-invite-1.jpg",
    kicker: "Research",
    title: "MSc AI & Data Science, research in the UK",
    location: "United Kingdom",
    focus: "50% 25%",
    alt: "Richard Mensah at the University of Cambridge library",
  },
  {
    image: "/community/school-outreach-1.jpg",
    kicker: "Roots",
    title: "Teaching, mentoring and community work",
    location: "Sefwi Bekwai, Ghana",
    alt: "Richard Mensah speaking to a full hall of students during a school outreach session",
  },
  {
    image: "/gallery/FB_IMG_1746893901373.jpg",
    kicker: "Builder",
    title: "Shipping real products: 11 and counting",
    location: "UK & Ghana",
    focus: "40% 40%",
    alt: "Richard Mensah at an international technology expo beside a robotics demo",
  },
];
