import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "About Richard Mensah | AI Researcher, Youth Leader, SDG Advocate",
  description:
    "Learn about Richard Mensah — AI & Data Scientist, youth leader, and SDG advocate whose work bridges data intelligence, climate action, and youth empowerment across the Global South and beyond.",
};

function PhotoLink({
  src,
  alt,
  className = "",
  height = "h-64",
}: {
  src: string;
  alt: string;
  className?: string;
  height?: string;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl ${height} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
      <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 opacity-0 shadow transition group-hover:opacity-100">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0077FF" strokeWidth="2.5">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] pt-10 pb-0 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div className="pb-12 md:pb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">About Richard</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
              From Ghana to the world — one impact system at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Richard Mensah is an AI &amp; Data Scientist, youth leader, and sustainable development
              advocate whose work bridges data intelligence, climate action, and youth empowerment
              across the Global South and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#biography"
                className="rounded-full bg-[#0077FF] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#0077FF]/30 transition hover:-translate-y-0.5 hover:bg-[#62E8FF]"
              >
                Read Biography
              </Link>
              <a
                href="mailto:rmensahuk@gmail.com?subject=CV Request — Richard Mensah"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-sm overflow-hidden rounded-t-[2rem] shadow-2xl shadow-black/60 lg:mx-0">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah — AI & Data Scientist, Youth Leader"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A] to-transparent p-5">
              <p className="font-black text-white">Richard Mensah</p>
              <p className="text-sm text-slate-300">AI &amp; Data Scientist · Youth Leader · SDG Advocate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick stats bar ───────────────────────────────────────── */}
      <section className="bg-[#0077FF] px-5 py-7 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { value: "120+", label: "People helped study abroad" },
            { value: "35+", label: "Fully funded scholarships" },
            { value: "2,500+", label: "Youth impacted" },
            { value: "180+", label: "Youth leaders empowered" },
            { value: "65+", label: "Global mentors networked" },
            { value: "8", label: "Countries travelled" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Biography ─────────────────────────────────────────────── */}
      <section id="biography" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">Biography</p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
                A story built on conviction, community, and code.
              </h2>

              <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard Mensah&apos;s story begins in the Ashanti Region of Ghana — a place where
                  educational resources were scarce, but where ambition, community spirit, and a
                  stubborn belief that things could be better were anything but. Growing up in
                  Sekyere Bekwai, Richard developed an early conviction that has guided everything
                  since: technology, when designed with care and purpose, can transform lives at scale.
                </p>
                <p>
                  That conviction did not stay theoretical for long. As a teenager, Richard was
                  already organising community youth events, rallying his peers around educational
                  goals, and helping neighbours navigate systems that often felt designed to exclude
                  them. Leadership, he discovered early, is not a title — it is a choice made
                  daily, often without applause.
                </p>
                <p>
                  His academic and professional journey took him from Ghana to the United Kingdom,
                  where he expanded his lens on research, policy, and how advanced analytics can
                  serve both institutions and people. Rather than leaving his roots behind, he
                  brought them with him — and built a career that is deliberately rooted in the
                  places and communities that shaped him.
                </p>
                <p>
                  Today, Richard operates as a practitioner, researcher, and educator. He builds
                  AI and data systems for organisations that want to make smarter, fairer
                  decisions. He trains and mentors young people across Ghana and beyond, connecting
                  them to scholarships, fellowships, and leadership networks that change
                  trajectories. And at every platform available, he advocates for a future where
                  the Global South is not just a recipient of technology — but a builder, shaper,
                  and beneficiary of it.
                </p>
                <p>
                  He does not treat AI, climate action, and youth empowerment as separate
                  disciplines. He treats them as a single, interconnected system — because that
                  is what they are.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "AI & Data Science",
                  "Climate Intelligence",
                  "Youth Leadership",
                  "SDGs",
                  "Ghana · UK · Global",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#0077FF]/30 bg-[#0077FF]/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#0077FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <PhotoLink
                src="/gallery/FB_IMG_1746893901373.jpg"
                alt="Richard Mensah — SDG advocacy"
                height="h-80"
              />
              <PhotoLink
                src="/gallery/20240604_134602.jpg"
                alt="Richard Mensah at a leadership event, June 2024"
                height="h-56"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────────── */}
      <section id="vision" className="scroll-mt-24 bg-[#F0F7FF] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">
                Vision &amp; Mission
              </p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
                Intelligence that serves the many, not the few.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard&apos;s vision is a world where intelligence — artificial and human —
                  serves people first. A world where communities in the Global South have access
                  to the same analytical power and opportunity networks as their counterparts in
                  London, New York, or Geneva. Not as charity. As equity.
                </p>
                <p>
                  His mission is to build the systems, the partnerships, and the next generation
                  of leaders that make that vision real. Whether through AI research, community
                  programmes, policy advocacy, or direct mentorship, every effort is calibrated
                  to the same north star: sustainable, equitable development — aligned with the
                  United Nations Sustainable Development Goals.
                </p>
                <p>
                  He is particularly focused on SDGs 4, 8, 9, 13, 16, and 17 — Quality Education,
                  Decent Work, Innovation, Climate Action, Strong Institutions, and Partnerships.
                  Not because these are the only goals that matter, but because they represent the
                  interlocking foundations on which everything else is built.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { code: "SDG 4", label: "Quality Education", color: "#C5192D" },
                { code: "SDG 9", label: "Industry & Innovation", color: "#FD6925" },
                { code: "SDG 13", label: "Climate Action", color: "#3F7E44" },
                { code: "SDG 17", label: "Partnerships for the Goals", color: "#19486A" },
              ].map((sdg) => (
                <div
                  key={sdg.code}
                  className="flex h-44 flex-col justify-between rounded-2xl p-6 text-white shadow-lg"
                  style={{ backgroundColor: sdg.color }}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-75">{sdg.code}</p>
                  <p className="text-lg font-black leading-tight">{sdg.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Journey ────────────────────────────────────── */}
      <section id="journey" className="scroll-mt-24 bg-[#0B1F3A] px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">
            Leadership Journey
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            From the streets of Sekyere Bekwai to global stages.
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-start">
            <div>
              {[
                {
                  era: "Early Beginnings · Ghana",
                  title: "Community roots and the leadership instinct",
                  body: "Richard's leadership story began in the Western North Region of Ghana. He co-founded the Sefwi Bekwai Youth Movement — a grassroots platform to organise and empower youth in his district. This evolved into the Sefwi Bekwai Youth Parliament, and he also represented the region in the UNYA-Ghana Youth Parliament at Parliament House in Accra, contributing to national youth policy and local governance.",
                },
                {
                  era: "Academic & Professional · UK",
                  title: "Expanding the lens through global institutions",
                  body: "Moving to the United Kingdom opened Richard to new intellectual environments, policy frameworks, and research methodologies. He engaged with institutions that helped him see his community's challenges not as local aberrations, but as global patterns requiring systemic responses — and brought that rigour back home.",
                },
                {
                  era: "EGA Mentorship International",
                  title: "Building the programme that changes trajectories",
                  body: "One of Richard's most sustained contributions has been helping establish and grow EGA Mentorship International — a programme now supporting hundreds of young people seeking academic and professional advancement. He has helped more than 120 people navigate study abroad applications, with 35+ securing fully funded pathways.",
                },
                {
                  era: "Cross-Border & Ongoing",
                  title: "Connecting Ghana, the UK, and global partners",
                  body: "Richard has built a network of 65+ mentors, professionals, researchers, founders, and civic leaders across the globe. He has travelled to 8 countries for conferences, engagements, and field programmes — always with the same goal: to bring what he learns back to the communities that need it most.",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-[#0077FF] text-sm font-black text-white">
                      {index + 1}
                    </div>
                    {index < 3 && <div className="mt-2 w-px flex-1 bg-white/10" />}
                  </div>
                  <div className="pb-10">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#62E8FF]">
                      {step.era}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white">{step.title}</h3>
                    <p className="mt-3 text-base leading-8 text-slate-400">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PhotoLink
                src="/leadership/bym-media-engagement.jpg"
                alt="Sefwi Bekwai Youth Movement — community media engagement"
                height="h-64 col-span-2"
                className="col-span-2"
              />
              <PhotoLink
                src="/leadership/unya-parliament-house.jpg"
                alt="UNYA-Ghana Youth Parliament at Parliament House, Accra"
                height="h-52"
              />
              <PhotoLink
                src="/gallery/FB_IMG_1742347850249.jpg"
                alt="Richard Mensah presenting at an international conference"
                height="h-52"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Conferences & Summits ─────────────────────────────────── */}
      <section id="conferences" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">
            Conferences &amp; Summits
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            Carrying the Global South&apos;s voice into global rooms.
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div className="space-y-5 text-base leading-8 text-slate-600">
              <p>
                Representation matters — and Richard has understood this from the very beginning.
                His presence at international conferences and summits is not just personal
                ambition. It is deliberate advocacy. Every time he joins a global conversation
                on AI governance, climate intelligence, or youth empowerment, he carries the
                perspectives of communities that are too often absent from those rooms.
              </p>
              <p>
                He has participated in and spoken at events across multiple countries —
                contributing to discussions on AI ethics, sustainable development, youth policy,
                and data governance. He brings not just technical expertise, but lived
                experience — a combination that makes his contributions particularly resonant
                in rooms that often skew towards theory over practice.
              </p>
              <p>
                His conference work spans AI and data science forums, UN SDG convenings,
                climate intelligence summits, youth leadership assemblies, and entrepreneurship
                ecosystems. Wherever the conversation that will shape the future is happening,
                Richard makes sure a voice from the Global South is in it.
              </p>

              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-[#F0F7FF] p-6">
                {[
                  "AI Ethics & Governance",
                  "UN SDG Convenings",
                  "Climate Intelligence Summits",
                  "Youth Leadership Assemblies",
                  "Data Science Forums",
                  "Entrepreneurship Ecosystems",
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0077FF]" />
                    <p className="text-sm font-semibold text-slate-700">{area}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/gallery/20240604_151805.jpg", alt: "Richard Mensah at a programme, June 2024" },
                { src: "/gallery/20240604_151806.jpg", alt: "Richard Mensah, June 2024 community gathering" },
                { src: "/gallery/FB_IMG_1746893931548.jpg", alt: "Richard Mensah — impact programme" },
                { src: "/gallery/FB_IMG_1746893921870.jpg", alt: "Richard Mensah — community initiative" },
              ].map((img) => (
                <PhotoLink
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  height="h-48"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Media & Speaking ──────────────────────────────────────── */}
      <section id="media" className="scroll-mt-24 bg-[#F8FBFF] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">
                Media &amp; Speaking
              </p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
                A voice that bridges data and lived development experience.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard is available for speaking engagements, podcast interviews, panel
                  discussions, and media features. He is a confident, compelling communicator —
                  someone who can hold his own in a highly technical discussion but also tell a
                  story that moves a general audience. He brings a rare combination: the
                  analytical rigour of a data scientist and the human warmth of someone who has
                  spent years on the ground.
                </p>
                <p>
                  If you are convening a conversation that would benefit from a voice rooted in
                  both data science and development work — from both Ghana and global institutions
                  — Richard would be glad to join it.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "AI in Africa",
                  "Climate Intelligence",
                  "Youth Empowerment",
                  "Education Policy",
                  "Sustainable Development",
                  "Data Science & Ethics",
                ].map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0077FF]" />
                    <p className="text-sm font-semibold text-slate-700">{topic}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-[#0077FF] px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#0077FF]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
                Book a speaking engagement →
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <PhotoLink
                src="/gallery/FB_IMG_1746893911660.jpg"
                alt="Richard Mensah — mentorship engagement"
                height="h-72"
              />
              <PhotoLink
                src="/gallery/FB_IMG_1740547522676.jpg"
                alt="Richard Mensah — programme highlight"
                height="h-52"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CV / Resume ───────────────────────────────────────────── */}
      <section id="cv" className="scroll-mt-24 bg-[#0B1F3A] px-5 py-20 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">CV / Resume</p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
                The full record of a career built with purpose.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                Richard&apos;s curriculum vitae covers his academic qualifications, professional
                experience, research contributions, publications, leadership roles, and programme
                outcomes. You can read it inline below or download a copy to keep.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="/richard-mensah-cv.pdf"
                download="Richard-Mensah-CV.pdf"
                className="rounded-full bg-[#0077FF] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#0077FF]/30 transition hover:-translate-y-0.5 hover:bg-[#62E8FF]"
              >
                Download CV
              </a>
              <a
                href="/richard-mensah-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Open in new tab
              </a>
            </div>
          </div>

          {/* Embedded PDF viewer */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40">
            <object
              data="/richard-mensah-cv.pdf"
              type="application/pdf"
              className="h-[820px] w-full"
              aria-label="Richard Mensah CV"
            >
              {/* Fallback for browsers that cannot render PDF inline */}
              <div className="flex h-[820px] flex-col items-center justify-center gap-4 bg-slate-950 text-center">
                <p className="text-lg font-black text-white">Your browser does not support inline PDFs.</p>
                <a
                  href="/richard-mensah-cv.pdf"
                  download="Richard-Mensah-CV.pdf"
                  className="rounded-full bg-[#0077FF] px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#62E8FF]"
                >
                  Download CV instead
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>

      <SectionNav prev={{ label: "Home", href: "/" }} next={{ label: "Research", href: "/research" }} />
    </div>
  );
}
