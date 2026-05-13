import Image from "next/image";
import Link from "next/link";

const BYM_PHOTOS = [
  { src: "/leadership/bym-team-1.jpg", alt: "Sefwi Bekwai Youth Movement team gathering" },
  { src: "/leadership/bym-action-plan.jpg", alt: "BYM Action Plan — early planning session" },
  { src: "/leadership/bym-team-2.jpg", alt: "BYM founding team in Sefwi Bekwai" },
  { src: "/leadership/unya-parliament-house.jpg", alt: "UNYA-Ghana Youth Parliament at Parliament House, Accra" },
];

const PARLIAMENT_PHOTOS = [
  { src: "/leadership/unya-parliament-1.jpg", alt: "Youth Parliament engagement session" },
  { src: "/leadership/unya-parliament-2.jpg", alt: "UNYA-Ghana Youth Parliament first meeting" },
  { src: "/leadership/unya-parliament-3.jpg", alt: "Youth Parliament activities" },
];

const EGA_PARTNERS = [
  { country: "Serbia", flag: "🇷🇸", role: "Research & AI" },
  { country: "USA", flag: "🇺🇸", role: "Programme Design" },
  { country: "Zambia", flag: "🇿🇲", role: "Youth Outreach" },
  { country: "Liberia", flag: "🇱🇷", role: "Community Networks" },
  { country: "Ghana", flag: "🇬🇭", role: "HQ & Operations" },
];

const COMMUNITY_JOURNEY = [
  {
    year: "2019–2020",
    title: "Sefwi Bekwai Youth Movement (BYM)",
    body: "Richard co-founded the Sefwi Bekwai Youth Movement — a grassroots platform to organise, inform, and mobilise young people in his home district. Through community events, media engagements, and structured advocacy, BYM gave young people in the Western North Region a voice in their own development.",
  },
  {
    year: "2020–2021",
    title: "UNYA-Ghana Youth Parliament",
    body: "Richard joined the United Nations Youth Association Ghana Youth Parliament, representing Sefwi Bekwai and the Western North Region. He engaged with national governance processes, visited Parliament House in Accra, and contributed to youth policy discussions — bringing community perspectives into institutional spaces.",
  },
  {
    year: "2021",
    title: "Bibiani Anhwiaso Municipal Youth Parliament",
    body: "Elected to the Bibiani Anhwiaso Municipal Youth Parliament, Richard deepened his engagement with local government structures and community leadership — building the institutional fluency that would later inform his approach to AI governance and SDG advocacy.",
  },
  {
    year: "2021–Present",
    title: "Sefwi Bekwai Youth Parliament",
    body: "The Sefwi Bekwai Youth Movement evolved into the Sefwi Bekwai Youth Parliament — a more structured platform with formal parliamentary processes, democratic representation, and a mandate to engage with the district assembly on youth affairs, education, and local development.",
  },
];

export default function LeadershipPageSections() {
  return (
    <>
      {/* ── Origin Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, #0077FF 0%, transparent 60%)"
        }} />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#62E8FF]">
            The beginning
          </p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
            From Sefwi Bekwai to the world — a youth movement story.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Long before the conferences and the global networks, Richard&apos;s leadership began
            where it mattered most — in the streets, classrooms, and community halls of the Western
            North Region of Ghana. This is that story.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/leadership/journey"
              className="rounded-full bg-[#0077FF] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#0077FF]/30 transition hover:-translate-y-0.5 hover:bg-[#62E8FF]"
            >
              Download full story (PDF)
            </Link>
            <a
              href="#movement"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Read the story ↓
            </a>
          </div>
        </div>

        {/* Full-width founding image */}
        <div className="relative mx-auto mt-14 max-w-7xl">
          <div className="relative h-72 overflow-hidden rounded-2xl md:h-96">
            <Image
              src="/leadership/bym-media-engagement.jpg"
              alt="Sefwi Bekwai Youth Movement — community media engagement"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 to-transparent" />
            <div className="absolute bottom-5 left-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#62E8FF]">
                Sefwi Bekwai · Western North Region · Ghana
              </p>
              <p className="mt-1 text-lg font-black text-white">
                Sefwi Bekwai Youth Movement — Media Engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BYM & Youth Parliament Story ─────────────────────────── */}
      <section id="movement" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">
            Youth Movement
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            Building institutions where none existed.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
            Richard did not wait for someone else to build the structures that his community needed.
            He built them. From a grassroots youth movement to formal parliamentary representation
            at district and national level — every step was driven by a conviction that young
            people deserve organised, accountable platforms for their voice.
          </p>

          {/* Timeline */}
          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="space-y-0">
              {COMMUNITY_JOURNEY.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0077FF] text-xs font-black text-white">
                      {i + 1}
                    </div>
                    {i < COMMUNITY_JOURNEY.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-[#0077FF]/20" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0077FF]">
                      {step.year}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-slate-950">{step.title}</h3>
                    <p className="mt-3 text-base leading-8 text-slate-600">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {BYM_PHOTOS.map((photo, i) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-56" : "h-40"}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Parliament photos strip ───────────────────────────────── */}
      <section className="bg-[#F0F7FF] px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            Youth Parliament — in the field
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {PARLIAMENT_PHOTOS.map((photo) => (
              <div key={photo.src} className="relative h-48 overflow-hidden rounded-2xl md:h-56">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EGA Mentorship Founding Story ─────────────────────────── */}
      <section id="ega" className="scroll-mt-24 bg-[#0B1F3A] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.88fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">
                Why EGA Mentorship International
              </p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                The inspiration — and the people who made it real.
              </h2>

              <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
                <p>
                  Years of organising young people in the Western North Region revealed a painful
                  pattern: talent was everywhere, but the pathways to act on it were not. Young
                  people who deserved scholarships did not know they existed. Young leaders who
                  should have been at international conferences were never told they could apply.
                </p>
                <p>
                  Richard had seen this gap from the inside — as a grassroots organiser, as a
                  Youth Parliament member, as someone who had personally navigated the scholarship
                  system and built the networks that others did not have access to. EGA Mentorship
                  International was born from a simple belief: if one person can find the pathway,
                  we can build a system that helps many.
                </p>
                <p>
                  The programme began in Ghana — but quickly became international. Partners from
                  Serbia, the United States, Zambia, and Liberia joined the mission, bringing
                  their networks, their expertise, and their shared conviction that opportunity
                  should not be determined by geography.
                </p>
                <p>
                  Today, EGA Mentorship International has helped over 120 people pursue study
                  abroad opportunities, with 35+ securing fully funded pathways — and more than
                  2,500 young people impacted across the network.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <div className="rounded-2xl bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-3xl font-black text-white">120+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Study Abroad</p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-3xl font-black text-white">35+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Full Scholarships</p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-3xl font-black text-white">2,500+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Youth Impacted</p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-5 backdrop-blur">
                  <p className="text-3xl font-black text-white">65+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Global Mentors</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* International team */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#62E8FF]">
                  International founding team
                </p>
                <div className="mt-5 space-y-3">
                  {EGA_PARTNERS.map((p) => (
                    <div
                      key={p.country}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span className="text-2xl">{p.flag}</span>
                      <div>
                        <p className="text-sm font-black text-white">{p.country}</p>
                        <p className="text-xs text-slate-400">{p.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* School campaign photo */}
              <div className="relative h-52 overflow-hidden rounded-2xl">
                <Image
                  src="/leadership/school-campaign.jpg"
                  alt="School outreach campaign — early youth empowerment work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 to-transparent" />
                <p className="absolute bottom-4 left-5 text-xs font-black uppercase tracking-[0.18em] text-[#62E8FF]">
                  School Outreach · Sefwi Bekwai Area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Peace Campaign Strip ──────────────────────────────────── */}
      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0077FF]">
                Community leadership · beyond youth
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
                Peace campaigns, radio, and community dialogue.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Richard&apos;s community leadership extended into peace advocacy and civic education
                across the Western North Region. He participated in national peace campaigns through
                NUSSA, led radio peace talks with regional media, and worked with the Ghana
                National Commission for Civic Education (NCCE) in Bibiani — helping communities
                navigate elections, conflicts, and civic responsibilities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src="/leadership/peace-campaign.jpg"
                  alt="National peace campaign — youth advocacy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src="/leadership/peace-radio.jpg"
                  alt="Radio peace talk — Western North Region"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA to PDF ───────────────────────────────────────────── */}
      <section className="bg-[#F0F7FF] px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[#0077FF] px-8 py-10 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
                Download
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Get the full leadership journey as a PDF.
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/80">
                A complete, beautifully formatted document of Richard&apos;s leadership story —
                from Sefwi Bekwai to global stages.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/leadership/journey"
                className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#0077FF] transition hover:bg-slate-100"
              >
                View &amp; Download PDF →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
