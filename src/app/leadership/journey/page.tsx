"use client";

import Image from "next/image";
import Link from "next/link";

const TIMELINE = [
  {
    year: "2019",
    era: "Western North Region · Ghana",
    title: "Sefwi Bekwai Youth Movement (BYM)",
    body: "Co-founded the Sefwi Bekwai Youth Movement — a grassroots platform to organise, inform, and mobilise young people in the Sefwi Bekwai district of the Western North Region. BYM created space for youth voices through community events, structured advocacy, and media engagements. This was the beginning of Richard's conviction that structured youth platforms — not informal gatherings — are what produce lasting change.",
    image: "/leadership/bym-team-1.jpg",
    imageAlt: "Sefwi Bekwai Youth Movement founding team",
  },
  {
    year: "2020",
    era: "National · UNYA-Ghana",
    title: "UNYA-Ghana Youth Parliament",
    body: "Joined the United Nations Youth Association Ghana Youth Parliament, representing Sefwi Bekwai and the Western North Region at the national level. Engaged with Parliamentary processes at Parliament House in Accra, contributed to national youth policy discussions, and built cross-regional networks connecting local grassroots work to national governance structures.",
    image: "/leadership/unya-parliament-house.jpg",
    imageAlt: "UNYA-Ghana Youth Parliament — Parliament House, Accra",
  },
  {
    year: "2021",
    era: "District · Bibiani Anhwiaso",
    title: "Bibiani Anhwiaso Municipal Youth Parliament",
    body: "Elected to the Bibiani Anhwiaso Municipal Youth Parliament — deepening engagement with local government and district-level policy processes in the Western North Region. This institutional fluency informed Richard's later work on AI governance, SDG advocacy, and the design of accountability frameworks for community-led programmes.",
    image: "/leadership/bym-team-2.jpg",
    imageAlt: "Community youth parliamentary work",
  },
  {
    year: "2021–Present",
    era: "District · Sefwi Bekwai",
    title: "Sefwi Bekwai Youth Parliament",
    body: "The Sefwi Bekwai Youth Movement evolved into the Sefwi Bekwai Youth Parliament — a formally structured platform with democratic processes and a mandate to engage the district assembly on youth affairs, education, and community development. This evolution from movement to institution reflects Richard's core belief that aspiration must be organised to produce durable change.",
    image: "/leadership/bym-action-plan.jpg",
    imageAlt: "Sefwi Bekwai Youth Parliament action planning",
  },
  {
    year: "2019–2021",
    era: "Community · Western North Region",
    title: "Community Teaching & COVID-19 Response",
    body: "During the COVID-19 school lockdowns, Richard organised and delivered free volunteer teaching sessions across Sefwi Bekwai — at DonkorKrom, Barkokrom, Sukuuku, Lowcost, Bekwai Township, and Apemkrom. Night classes and morning sessions ensured children did not fall behind during one of the most disruptive periods in the region's educational history. This was leadership by presence — showing up when systems failed.",
    image: "/community/teaching-night.jpg",
    imageAlt: "Night community teaching during COVID-19 lockdown",
  },
  {
    year: "2020",
    era: "Community · Sefwi Bekwai Area",
    title: "Community Sanitation Exercises",
    body: "Organised and participated in community sanitation and cleaning exercises across Donkorkrom, Donsokrom, Surano B, and Chira — all in the Sefwi Bekwai area of the Western North Region. These hands-on environmental health initiatives aligned directly with SDG 6 (Clean Water and Sanitation) and SDG 11 (Sustainable Communities), demonstrating that development work begins with dignity — clean, safe environments where people can thrive.",
    image: "/community/sanitation-sweeping.jpg",
    imageAlt: "Community sanitation exercise — DansoKrom, Sefwi Bekwai",
  },
  {
    year: "2020–2021",
    era: "Regional · Western North",
    title: "Peace Campaigns & Civic Education",
    body: "Contributed to peace advocacy and civic education across the Western North Region — including national peace campaigns through NUSSA, radio peace talks with regional media, and civic education work with the Ghana National Commission for Civic Education (NCCE) in Bibiani Anhwiaso. This peacebuilding work aligned with SDG 16 and demonstrated Richard's commitment to the full spectrum of community development — not just education and technology, but safety and civic trust.",
    image: "/leadership/peace-campaign.jpg",
    imageAlt: "National peace campaign — youth advocates",
  },
  {
    year: "2021–Present",
    era: "International",
    title: "EGA Mentorship International",
    body: "Founded EGA Mentorship International — bringing together partners from Serbia, the USA, Zambia, and Liberia around a shared mission: building structured knowledge systems and scholarship pipelines for young Africans. The programme has helped 120+ people pursue study abroad opportunities, with 35+ securing fully funded pathways, and 2,500+ young people impacted across the network. EGA is the institutional embodiment of everything Richard learned in Sefwi Bekwai — that talent is everywhere, and the work is to remove the friction between aspiration and action.",
    image: "/leadership/school-campaign.jpg",
    imageAlt: "EGA Mentorship International — school outreach and empowerment",
  },
];

const IMPACT_STATS = [
  { value: "120+", label: "Study Abroad Journeys Facilitated" },
  { value: "35+", label: "Fully Funded Scholarships Secured" },
  { value: "2,500+", label: "Young People Impacted" },
  { value: "180+", label: "Youth Leaders Empowered" },
  { value: "65+", label: "Global Mentors Networked" },
  { value: "8", label: "Countries Travelled" },
];

export default function LeadershipJourneyPage() {
  return (
    <div className="min-h-screen">
      {/* Print button — hidden when printing */}
      <div className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-line bg-white/90 px-5 py-3 backdrop-blur md:px-8">
        <Link href="/leadership" className="text-sm font-bold text-accent-strong hover:underline">
          ← Back to Leadership
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-primary"
        >
          Save as PDF / Print
        </button>
      </div>

      {/* Document content */}
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-12 md:px-8">

        {/* Header */}
        <div className="border-b border-line pb-10">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">
            Richard Mensah · Leadership Journey
          </p>
          <h1 className="mt-4 text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
            From Sefwi Bekwai to the World.
          </h1>
          <p className="mt-4 text-lg leading-8 text-body">
            A complete record of Richard Mensah&apos;s community leadership, youth empowerment,
            and institution-building work — from the grassroots in Ghana&apos;s Western North
            Region to international platforms across five continents.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
            <span>rmensahuk@gmail.com</span>
            <span>·</span>
            <span>Ghana · United Kingdom · Global</span>
          </div>
        </div>

        {/* Impact stats */}
        <div className="mt-10 rounded-2xl bg-[#4f8bff] p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">Impact Summary</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {IMPACT_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold text-white/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">
            Full Leadership Timeline
          </p>

          <div className="mt-8 space-y-14">
            {TIMELINE.map((entry, i) => (
              <div key={i} className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">
                      {i + 1}
                    </span>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-strong">
                      {entry.year} · {entry.era}
                    </p>
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-ink">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-body">{entry.body}</p>
                </div>
                <div className="relative h-48 overflow-hidden rounded-2xl md:h-52">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EGA International Team */}
        <div className="mt-14 rounded-2xl bg-navy-950 p-8 text-white">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-soft">
            EGA Mentorship International · Founding Partners
          </p>
          <p className="mt-4 text-base leading-8 text-on-dark-muted">
            EGA Mentorship International was built with partners across five countries, united by
            a shared belief that access to global education and leadership networks should not be
            determined by where you were born.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { flag: "🇬🇭", country: "Ghana" },
              { flag: "🇷🇸", country: "Serbia" },
              { flag: "🇺🇸", country: "USA" },
              { flag: "🇿🇲", country: "Zambia" },
              { flag: "🇱🇷", country: "Liberia" },
            ].map((p) => (
              <div
                key={p.country}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.06] py-4"
              >
                <span className="text-2xl">{p.flag}</span>
                <p className="mt-2 text-xs font-black text-white">{p.country}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SDG alignment */}
        <div className="mt-10 rounded-2xl border border-line p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">
            SDG Alignment
          </p>
          <p className="mt-3 text-base leading-8 text-body">
            Richard&apos;s community leadership work directly advances six UN Sustainable
            Development Goals:
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { code: "SDG 4", label: "Quality Education", color: "#3a78e0" },
              { code: "SDG 6", label: "Clean Water & Sanitation", color: "#26BDE2" },
              { code: "SDG 8", label: "Decent Work & Growth", color: "#3a78e0" },
              { code: "SDG 11", label: "Sustainable Communities", color: "#4f8bff" },
              { code: "SDG 16", label: "Peace & Strong Institutions", color: "#00689D" },
              { code: "SDG 17", label: "Partnerships for the Goals", color: "#19486A" },
            ].map((sdg) => (
              <div
                key={sdg.code}
                className="rounded-xl p-4 text-white"
                style={{ backgroundColor: sdg.color }}
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                  {sdg.code}
                </p>
                <p className="mt-1 text-sm font-black">{sdg.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 border-t border-line pt-8 text-center text-sm text-muted">
          <p className="font-black text-ink">Richard Mensah</p>
          <p className="mt-1">AI &amp; Data Scientist · Youth Leader · SDG Advocate</p>
          <p className="mt-2">rmensahuk@gmail.com</p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
