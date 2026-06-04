import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EGA Mentorship International | Richard Mensah",
  description: "EGA Mentorship International — removing friction between ambition and access for young Africans. 120+ study abroad journeys, 35+ funded scholarships, 2500+ youth impacted across Ghana, Serbia, USA, Zambia, and Liberia.",
};

const IMPACT_STATS = [
  { value: "120+", label: "Study Abroad Journeys Facilitated" },
  { value: "35+", label: "Fully Funded Scholarships Secured" },
  { value: "2,500+", label: "Young People Impacted" },
  { value: "180+", label: "Youth Leaders Empowered" },
  { value: "65+", label: "Global Mentors Networked" },
  { value: "8", label: "Countries Travelled" },
];

const PARTNERS = [
  { flag: "🇬🇭", country: "Ghana", role: "HQ & Operations", color: "#006B3F" },
  { flag: "🇷🇸", country: "Serbia", role: "Research & AI Partnerships", color: "#003DA5" },
  { flag: "🇺🇸", country: "USA", role: "Programme Design & Mentors", color: "#BF0A30" },
  { flag: "🇿🇲", country: "Zambia", role: "Youth Outreach Networks", color: "#007A00" },
  { flag: "🇱🇷", country: "Liberia", role: "Community Partnerships", color: "#BF0A30" },
];

const SCHOOL_CAMPAIGN_PHOTOS = [
  { src: "/leadership/school-friend-campaign-1.jpg", alt: "School campaign led by a friend in Richard's absence" },
  { src: "/leadership/school-friend-campaign-2.jpg", alt: "Students benefiting from the campaign" },
  { src: "/leadership/school-friend-campaign-3.jpg", alt: "Community school campaign activity" },
  { src: "/leadership/school-friend-campaign-4.jpg", alt: "Students engaged in learning" },
  { src: "/leadership/school-friend-campaign-5.jpg", alt: "Community education initiative" },
  { src: "/leadership/school-friend-campaign-6.jpg", alt: "Youth empowerment school visit" },
];

const CONFERENCE_PHOTOS = [
  { src: "/leadership/conference-sochi.jpg", alt: "International conference — Sochi, Russia" },
  { src: "/leadership/conference-diplomatic.jpg", alt: "Diplomatic engagement — international convening" },
  { src: "/leadership/conference-royce.jpg", alt: "International leadership engagement" },
];

const PROGRAMME_TRACKS = [
  {
    title: "Scholarship Pipeline",
    body: "A structured system for identifying, preparing, and supporting young Africans to apply for fully funded study opportunities — turning aspiration into completed applications.",
    icon: "🎓",
  },
  {
    title: "Mentorship Networks",
    body: "Connecting students with experienced mentors across five countries who have navigated the pathways from Africa to global institutions. 65+ active mentors.",
    icon: "🤝",
  },
  {
    title: "Statement of Purpose Coaching",
    body: "Intensive coaching on the most critical — and most neglected — part of international applications: telling your story in a way that institutions understand and respect.",
    icon: "✍️",
  },
  {
    title: "Knowledge Systems",
    body: "Building structured repositories of information so the knowledge gained by one cohort is not lost — it becomes the foundation for the next generation of applicants.",
    icon: "📚",
  },
];

export default function EgaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3 backdrop-blur md:px-8">
        <Link href="/leadership" className="text-sm font-bold text-[#2BA8B4] hover:underline">
          ← Back to Leadership
        </Link>
        <Link href="/leadership/community" className="text-sm font-bold text-slate-600 hover:text-[#2BA8B4]">
          Next: Community Development →
        </Link>
      </div>

      {/* Hero */}
      <div className="bg-[#0B1F3A] px-5 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#7FD6D2]">
                EGA Mentorship International · Founded 2021
              </p>
              <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
                Talent is everywhere. The work is removing the friction.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                EGA Mentorship International was founded on a single observation made in Sefwi
                Bekwai: brilliant young people are everywhere, but the systems that unlock global
                opportunities were not designed for them. EGA was built to change that — one
                application, one scholarship, one conversation at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/leadership/journey"
                  className="rounded-full bg-[#2BA8B4] px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-blue-600"
                >
                  Download Full Story
                </Link>
                <Link
                  href="/collaborate"
                  className="rounded-full border border-white/30 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:border-white/60"
                >
                  Partner with EGA
                </Link>
              </div>
            </div>

            {/* Impact stats */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                Programme Impact
              </p>
              <div className="mt-5 grid grid-cols-2 gap-5">
                {IMPACT_STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">

        {/* The Inspiration */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">
            The Moment That Made It Inevitable
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            A school campaign that ran without him.
          </h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <p className="text-base leading-8 text-slate-600">
              When Richard returned to the University of Education, Winneba, he left behind an
              unfinished school campaign project in Sefwi Bekwai. A friend led it in his absence.
              The project ran. The children were reached. The work continued without him.
              <br /><br />
              That moment crystallised something: if the work is structured well enough, it does
              not need you to be present. It becomes a system. It becomes something that can scale.
              EGA Mentorship International was built to be exactly that — a programme that does not
              depend on Richard being in every room, but that gives every young person in every
              room the same quality of access and support.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {SCHOOL_CAMPAIGN_PHOTOS.map((photo, i) => (
                <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* International Stage */}
        <div className="mt-20">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">
            Reaching the Global Stage
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            From Sefwi Bekwai to Sochi and beyond.
          </h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div className="grid gap-3">
              {CONFERENCE_PHOTOS.map((photo, i) => (
                <div key={i} className="relative h-44 overflow-hidden rounded-2xl">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-base leading-8 text-slate-600">
                International conferences gave Richard more than recognition — they gave him evidence
                that the ideas developed in rural Ghana were globally relevant. Attending high-level
                convenings in Sochi, Russia alongside diplomats, researchers, and international
                officials confirmed that the questions Richard was asking — about youth empowerment,
                AI governance, and sustainable development — were the same questions that mattered
                at the highest levels of global decision-making.
                <br /><br />
                EGA was founded on this belief: that geography should not determine destiny. The
                young person in Sefwi Bekwai who wants to attend a programme in Europe or North
                America deserves the same quality of guidance as someone who grew up 20 minutes
                from the institution they are applying to.
              </p>
            </div>
          </div>
        </div>

        {/* Cambridge Recognition */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">
              Academic Recognition
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              Invited to Cambridge on Climate Governance.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Richard was invited to the University of Cambridge for a climate governance programme
              — recognition of the intersection between his AI research, SDG advocacy, and
              understanding of how climate change disproportionately affects communities like those
              in the Western North Region of Ghana. This invitation validated not just Richard&apos;s
              technical credentials but his community-grounded perspective on global challenges.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image src="/leadership/cambridge-invite-1.jpg" alt="Invited to Cambridge University — climate governance programme" fill className="object-cover" />
            </div>
            <div className="relative h-52 overflow-hidden rounded-2xl">
              <Image src="/leadership/cambridge-invite-2.jpg" alt="Cambridge University climate governance programme" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* International Team */}
        <div className="mt-20 rounded-[2rem] bg-[#0B1F3A] p-8 text-white">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#7FD6D2]">
            EGA Mentorship International · Founding Partners
          </p>
          <h2 className="mt-4 text-2xl font-black text-white">
            Built with partners across five countries.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            EGA Mentorship International was not built alone. It was assembled across five
            countries by people who shared a belief that access to global education and leadership
            networks should not be determined by where you were born.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {PARTNERS.map((p) => (
              <div
                key={p.country}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              >
                <span className="text-3xl">{p.flag}</span>
                <p className="mt-3 text-sm font-black text-white">{p.country}</p>
                <p className="mt-1 text-center text-xs leading-5 text-slate-400">{p.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programme Tracks */}
        <div className="mt-20">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2BA8B4]">
            Programme Architecture
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            What EGA actually does.
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PROGRAMME_TRACKS.map((track) => (
              <div
                key={track.title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <span className="inline-block h-2.5 w-10 rounded-full bg-[#2BA8B4]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-slate-950">{track.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{track.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-[2rem] bg-[#2BA8B4] px-8 py-12 text-white">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
            Share the story
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black text-white">
            Download the full leadership and EGA journey document.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/80">
            A complete, printable record of everything from Sefwi Bekwai to international platforms
            — available to anyone who finds this journey inspiring and wants to share it.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/leadership/journey"
              className="rounded-full bg-white px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#2BA8B4] transition hover:bg-slate-100"
            >
              Download PDF Journey ↓
            </Link>
            <Link
              href="/leadership/sefwi-bekwai"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:border-white/60"
            >
              ← The Sefwi Bekwai Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
