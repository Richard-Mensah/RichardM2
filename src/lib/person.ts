import { SITE_URL } from "@/lib/siteUrl";

/*
 * Single source of truth for who Richard Mensah is. Feeds the schema.org
 * Person JSON-LD (so search engines can tell this Richard Mensah apart from
 * others with the same name) and the profile / biography pages.
 */

export const PERSON = {
  name: "Richard Mensah",
  alternateNames: ["Rich Mensah", "Kofi Richard", "Kofiever"],
  headline: "AI & Data Scientist · Youth Leader · SDG Advocate",
  orcid: "https://orcid.org/0009-0000-2854-2440",
  orcidId: "0009-0000-2854-2440",
  linkedin: "https://www.linkedin.com/in/richard-mensah-ab8564190/",
  github: "https://github.com/Richard-Mensah",
  facebook: "https://www.facebook.com/profile.php?id=100017450235773",
  birthPlace: "Paboase, Western North Region, Ghana",
  hometown: "Sefwi Bekwai (Lowcost), Western North Region, Ghana",
  residence: "United Kingdom",
  municipality: "Bibiani-Anhwiaso-Bekwai Municipality",
  region: "Western North Region, Ghana",
} as const;

/** Degrees and schooling, highest first. Dates intentionally omitted. */
export const EDUCATION = [
  {
    level: "Postgraduate",
    award: "MSc, Artificial Intelligence & Data Science",
    school: "Bangor University, United Kingdom",
    note: "",
  },
  {
    level: "Postgraduate",
    award: "MA, Industrial & Organisational Psychology",
    school: "Indira Gandhi National Open University (IGNOU), India",
    note: "Grounds the technical work in people, behaviour and organisations.",
  },
  {
    level: "Undergraduate",
    award: "Bachelor's degree",
    school: "University of Education, Winneba (UEW), Ghana",
    note: "Assisted his supervisor in teaching and administration through Levels 300 and 400.",
  },
  {
    level: "Secondary",
    award: "Senior High School education",
    school: "Bibiani Senior High Technical School, Western North Region, Ghana",
    note: "",
  },
  {
    level: "Basic",
    award: "Junior High School education",
    school: "Surano 'A' Anglican JHS, Bibiani-Anhwiaso-Bekwai Municipality, Ghana",
    note: "Also known as St. Stephen's Anglican Basic School, Surano 'A'.",
  },
] as const;

/** Professional programmes and certificates. */
export const CERTIFICATIONS = [
  {
    award: "Data Science Programme",
    provider: "ALX Africa",
    note: "Python, statistics, machine learning and applied data science.",
  },
  {
    award: "Data Analytics, Machine Learning focus",
    provider: "Azubi Africa",
    note: "End-to-end analytics with a machine-learning specialisation.",
  },
  {
    award: "Certificate in International & Intercultural Communication",
    provider: "Peoples' Friendship University of Russia (RUDN University)",
    note: "Communication across cultures and international settings.",
  },
] as const;

export const VENTURE = {
  name: "Center for Analytics Services",
  role: "Founder & Lead",
  summary: "Founded and led a data and analytics practice delivering insight and reporting for clients.",
} as const;

/** Lightweight identity for every page (no personal background). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    alternateName: [...PERSON.alternateNames],
    url: SITE_URL,
    image: `${SITE_URL}/Rich1.png`,
    jobTitle: "AI & Data Scientist",
    nationality: { "@type": "Country", name: "Ghana" },
    identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: PERSON.orcidId, url: PERSON.orcid },
    alumniOf: [{ "@type": "CollegeOrUniversity", name: "Bangor University" }],
    affiliation: { "@type": "Organization", name: "United Nations Youth Association (UNYA), Ghana" },
    sameAs: [PERSON.orcid, PERSON.linkedin, PERSON.github, PERSON.facebook],
  };
}

/** Full identity with background, used only on the Biography and Profile pages. */
export function personDetailJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    alternateName: [...PERSON.alternateNames],
    url: SITE_URL,
    image: `${SITE_URL}/Rich1.png`,
    jobTitle: "AI & Data Scientist",
    description:
      "Richard Mensah (also known as Rich Mensah, Kofi Richard and Kofiever) is a Ghanaian AI and Data Scientist from Sefwi Bekwai in the Western North Region, now based in the United Kingdom. He is a graduate of the University of Education, Winneba, holds an MA in Industrial & Organisational Psychology from IGNOU and an MSc in Artificial Intelligence & Data Science from Bangor University, and founded the Center for Analytics Services. He is Country Representative for Ghana at the United Nations Youth Association and a former Youth Member of Parliament.",
    nationality: { "@type": "Country", name: "Ghana" },
    birthPlace: { "@type": "Place", name: PERSON.birthPlace },
    homeLocation: { "@type": "Place", name: PERSON.residence },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: PERSON.orcidId,
      url: PERSON.orcid,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Bangor University", address: "Bangor, Wales, United Kingdom" },
      { "@type": "CollegeOrUniversity", name: "Indira Gandhi National Open University (IGNOU)", address: "New Delhi, India" },
      { "@type": "CollegeOrUniversity", name: "University of Education, Winneba", address: "Winneba, Central Region, Ghana" },
      { "@type": "HighSchool", name: "Bibiani Senior High Technical School", address: "Bibiani, Western North Region, Ghana" },
      { "@type": "School", name: "Surano 'A' Anglican JHS (St. Stephen's Anglican Basic School)", address: "Surano 'A', Bibiani-Anhwiaso-Bekwai Municipality, Ghana" },
    ],
    affiliation: { "@type": "Organization", name: "United Nations Youth Association (UNYA), Ghana" },
    hasCredential: CERTIFICATIONS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.award,
      recognizedBy: { "@type": "Organization", name: c.provider },
    })),
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Climate Intelligence",
      "Sustainable Development Goals",
      "Youth Leadership",
      "Web and Software Development",
    ],
    sameAs: [PERSON.orcid, PERSON.linkedin, PERSON.github, PERSON.facebook],
  };
}
