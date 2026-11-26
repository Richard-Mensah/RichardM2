/*
 * The leadership & impact family: one entry per page, used for photo heroes,
 * the sticky menu, the hub's tiles and prev/next links.
 */

export type LeadershipPage = {
  href: string;
  nav: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  focus?: string;
  /** Shown as a tile on the leadership hub and impact page. */
  isProgramme?: boolean;
};

export const LEADERSHIP_HUB: LeadershipPage = {
  href: "/leadership",
  nav: "Overview",
  eyebrow: "Leadership · community · institution-building",
  title: "Three chapters, one continuous commitment.",
  lede: "Leadership here is not a single thread but a braid: grassroots community work, institutional youth advocacy and international mentorship, built over a decade and still active today.",
  image: "/leadership/unya-parliament-house.jpg",
  imageAlt: "Youth delegates gathered outside Ghana's Parliament House",
  focus: "50% 40%",
};

export const LEADERSHIP_PAGES: LeadershipPage[] = [
  {
    href: "/leadership/sefwi-bekwai",
    nav: "Youth movement",
    eyebrow: "The origin story",
    title: "Sefwi Bekwai Youth Movement",
    lede: "How a grassroots youth platform in Ghana's Western North Region became the training ground for everything that followed, from church civic education to the UNYA-Ghana Youth Parliament.",
    image: "/leadership/bym-media-engagement.jpg",
    imageAlt: "Sefwi Bekwai Youth Movement media engagement",
    isProgramme: true,
  },
  {
    href: "/leadership/ega",
    nav: "EGA Mentorship",
    eyebrow: "International organisation",
    title: "EGA Mentorship International",
    lede: "Founded to remove the friction between ambition and access: 120+ study-abroad journeys, 35+ fully funded scholarships and partners across Serbia, the USA, Zambia and Liberia.",
    image: "/gallery/FB_IMG_1746893909499.jpg",
    imageAlt: "Richard Mensah with an international youth delegation",
    focus: "50% 40%",
    isProgramme: true,
  },
  {
    href: "/leadership/community",
    nav: "Community",
    eyebrow: "Grassroots work",
    title: "Community development",
    lede: "Free teaching during COVID-19 lockdowns, sanitation drives, hospital STEM excursions and visits to communities with no clean water: development as a daily practice.",
    image: "/community/teaching-night.jpg",
    imageAlt: "Night community teaching session during COVID-19",
    isProgramme: true,
  },
  {
    href: "/impact",
    nav: "Impact",
    eyebrow: "Impact in numbers",
    title: "Ten years of mentorship, training and community work.",
    lede: "The reach behind the work: people guided to study abroad, youth leaders trained and communities served, and the programmes that produced each number.",
    image: "/community/school-outreach-2.jpg",
    imageAlt: "Students listening during a school outreach session",
    focus: "50% 40%",
    isProgramme: true,
  },
  {
    href: "/sdgs",
    nav: "SDGs",
    eyebrow: "SDG impact",
    title: "Every project maps to the global goals.",
    lede: "How AI, climate intelligence, youth leadership and partnerships connect to the 2030 Agenda, goal by goal, with the work behind each one.",
    image: "/gallery/FB_IMG_1746893968844.jpg",
    imageAlt: "International delegates holding national flags at a global forum",
    focus: "50% 45%",
  },
  {
    href: "/leadership/journey",
    nav: "Leadership record",
    eyebrow: "Leadership record",
    title: "From Sefwi Bekwai to the world.",
    lede: "",
    image: "/leadership/unya-parliament-house.jpg",
    imageAlt: "Youth delegates at Parliament House",
  },
];

export const LEADERSHIP_FAMILY: LeadershipPage[] = [LEADERSHIP_HUB, ...LEADERSHIP_PAGES];

export function leadershipPage(href: string): LeadershipPage {
  const page = LEADERSHIP_FAMILY.find((p) => p.href === href);
  if (!page) throw new Error(`Unknown leadership page: ${href}`);
  return page;
}

/** Previous and next pages in leadership order, for the footer navigation. */
export function leadershipNeighbours(href: string): { prev: { label: string; href: string }; next: { label: string; href: string } } {
  const i = LEADERSHIP_FAMILY.findIndex((p) => p.href === href);
  const before = LEADERSHIP_FAMILY[i - 1];
  const after = LEADERSHIP_FAMILY[i + 1];
  return {
    prev: before ? { label: before.nav === "Overview" ? "Leadership" : before.nav, href: before.href } : { label: "Home", href: "/" },
    next: after ? { label: after.nav, href: after.href } : { label: "Get in touch", href: "/contact" },
  };
}
