/*
 * The About family: one entry per page, used for the photo hero, the sticky
 * About menu, the hub's tiles and prev/next links.
 */

export type AboutPage = {
  href: string;
  nav: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  focus?: string;
};

export const ABOUT_HUB: AboutPage = {
  href: "/about",
  nav: "Overview",
  eyebrow: "About Richard",
  title: "From Ghana to the world, one impact system at a time.",
  lede: "",
  image: "/Rich1.png",
  imageAlt: "Richard Mensah",
};

export const ABOUT_PAGES: AboutPage[] = [
  {
    href: "/about/profile",
    nav: "Profile",
    eyebrow: "Profile",
    title: "Credentials, representation and focus at a glance.",
    lede: "MSc in AI & Data Science (Bangor); Country Representative for Ghana, UN Youth Association; former Youth MP.",
    image: "/Rich1.png",
    imageAlt: "Richard Mensah",
    focus: "50% 20%",
  },
  {
    href: "/about/biography",
    nav: "Biography",
    eyebrow: "Biography",
    title: "A story built on conviction, community and code.",
    lede: "From Paboase, Surano ‘A’ and Sefwi Bekwai in the Western North Region of Ghana, to AI research at Bangor University, international conferences and a mentorship programme that has changed hundreds of lives.",
    image: "/leadership/peace-regional.jpg",
    imageAlt: "Richard Mensah leading a youth peace campaign in the Western North Region",
    focus: "50% 30%",
  },
  {
    href: "/about/leadership-journey",
    nav: "Leadership journey",
    eyebrow: "Leadership journey",
    title: "From village roads to global stages.",
    lede: "It did not begin in a boardroom or a lecture hall. It began on a family motorbike, riding into communities with no clean water, no functioning schools and no one coming to help. What Richard found there shaped everything that came after.",
    image: "/community/water-crisis-3.jpg",
    imageAlt: "A rural community water point in the Sefwi Bekwai area",
    focus: "50% 60%",
  },
  {
    href: "/about/vision",
    nav: "Vision",
    eyebrow: "Vision & mission",
    title: "Intelligence that serves the many, not the few.",
    lede: "A commitment to equitable development, aligned with the UN Sustainable Development Goals and grounded in the lived realities of communities too often left out of the conversations that shape their future.",
    image: "/leadership/sensitization-1.jpg",
    imageAlt: "Richard Mensah speaking to young people at a sensitisation event",
    focus: "60% 35%",
  },
  {
    href: "/about/conferences",
    nav: "Conferences",
    eyebrow: "Conferences & summits",
    title: "Representing the Global South at international forums.",
    lede: "AI governance forums, UN SDG convenings, climate summits and youth assemblies across several countries, with practitioner insight from Ghana and the UK.",
    image: "/gallery/FB_IMG_1746893931548.jpg",
    imageAlt: "Richard Mensah in conversation with delegates at an international forum",
    focus: "60% 30%",
  },
  {
    href: "/about/media",
    nav: "Media & speaking",
    eyebrow: "Media & speaking",
    title: "A voice that bridges data and lived development experience.",
    lede: "Equally at home in a highly technical discussion and in a story that moves a general audience. Available for keynotes, panels, podcasts and media features.",
    image: "/leadership/bym-team-1.jpg",
    imageAlt: "Richard Mensah and youth leaders in a radio studio",
    focus: "50% 40%",
  },
  {
    href: "/about/cv",
    nav: "CV",
    eyebrow: "CV / resume",
    title: "The full record of a career built with purpose.",
    lede: "Qualifications, experience, research, publications, leadership roles and programme outcomes. Shared on request so it stays current: ask below and it arrives by email.",
    image: "/gallery/20240229_120952.jpg",
    imageAlt: "Richard Mensah reviewing a document with fellow delegates",
    focus: "50% 35%",
  },
];

export const ABOUT_FAMILY: AboutPage[] = [ABOUT_HUB, ...ABOUT_PAGES];

export function aboutPage(href: string): AboutPage {
  const page = ABOUT_FAMILY.find((p) => p.href === href);
  if (!page) throw new Error(`Unknown about page: ${href}`);
  return page;
}

/** Previous and next pages in About order, for the footer navigation. */
export function aboutNeighbours(href: string): { prev: { label: string; href: string }; next: { label: string; href: string } } {
  const i = ABOUT_FAMILY.findIndex((p) => p.href === href);
  const before = ABOUT_FAMILY[i - 1];
  const after = ABOUT_FAMILY[i + 1];
  return {
    prev: before ? { label: before.eyebrow, href: before.href } : { label: "Home", href: "/" },
    next: after ? { label: after.eyebrow, href: after.href } : { label: "Research", href: "/research" },
  };
}
