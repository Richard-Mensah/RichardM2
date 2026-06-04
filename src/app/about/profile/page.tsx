import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Profile | Richard Mensah",
  description:
    "Professional profile of Richard Mensah: MSc in Artificial Intelligence & Data Science (Bangor University), Country Representative for Ghana at the United Nations Youth Association, and former Youth Member of Parliament for the Western North Region.",
};

const AT_A_GLANCE = [
  { label: "Qualification", value: "MSc, Artificial Intelligence & Data Science" },
  { label: "Institution", value: "Bangor University, United Kingdom (2026)" },
  { label: "UN affiliation", value: "Country Representative for Ghana, UNYA" },
  { label: "Public office", value: "Youth MP, Western North (2020–2024)" },
  { label: "Languages", value: "English" },
  { label: "Bases", value: "Ghana · United Kingdom" },
] as const;

const ROLES = [
  {
    role: "Country Representative for Ghana",
    org: "United Nations Youth Association (UNYA), Ghana",
    period: "",
    detail:
      "Represents Ghanaian youth within a United Nations–affiliated association, contributing to youth policy dialogue, advocacy, and international engagement.",
    accent: "#4f8bff",
  },
  {
    role: "Youth Member of Parliament",
    org: "Bibiani-Anhwiaso-Bekwai Constituency, Western North Region",
    period: "2020–2024",
    detail:
      "Elected youth representative for the constituency, voicing youth priorities on education, employment, and community development through the national youth parliamentary process.",
    accent: "#00689D",
  },
  {
    role: "Regional Youth Representative",
    org: "UNYA-Ghana Youth Parliament, Western North",
    period: "",
    detail:
      "Coordinated youth representation across the Western North Region within the UNYA-Ghana Youth Parliament structure.",
    accent: "#19486A",
  },
] as const;

const PILLARS = [
  {
    title: "AI & data for development",
    sdg: "SDG 9 · SDG 16",
    body: "Applied machine learning, analytics, and responsible-AI practice for decisions in the public and development sector.",
    accent: "#4f8bff",
  },
  {
    title: "Climate intelligence",
    sdg: "SDG 13",
    body: "Translating environmental and emissions data into evidence for adaptation, resilience, and consumer and policy decision-making — the focus of the MSc thesis.",
    accent: "#2f6bea",
  },
  {
    title: "Youth opportunity at scale",
    sdg: "SDG 4 · SDG 17",
    body: "Mentorship, scholarships, and leadership pathways that move young people from potential to opportunity across Ghana and beyond.",
    accent: "#4f8bff",
  },
] as const;

export default function ProfilePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.6fr]">
          <div>
            <Link
              href="/about"
              className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7fb0ff] transition hover:text-white"
            >
              ← About Richard
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7fb0ff]">Profile</p>
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Richard Mensah
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              MSc in Artificial Intelligence &amp; Data Science (Bangor University); Country
              Representative for Ghana at the <span className="text-white">United Nations Youth
              Association</span>; former Youth Member of Parliament for the Western North Region.
              His work sits at the intersection of <span className="text-white">artificial
              intelligence, climate intelligence, and youth opportunity in the Global South.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about/cv"
                className="rounded-full bg-[#4f8bff] px-6 py-3 text-sm font-bold tracking-[0.02em] text-white shadow-lg shadow-[#4f8bff]/30 transition hover:-translate-y-0.5 hover:bg-[#7fb0ff] hover:text-[#0B1F3A]"
              >
                View full CV
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold tracking-[0.02em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl shadow-black/50 lg:mx-0">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 28vw, 80vw"
            />
          </div>
        </div>
      </section>

      {/* ── At a glance ───────────────────────────────────────────── */}
      <section className="bg-[#4f8bff] px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AT_A_GLANCE.map((item) => (
            <div key={item.label} className="border-l-2 border-white/30 pl-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                {item.label}
              </p>
              <p className="mt-1 text-base font-semibold leading-6 text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4f8bff]">Education</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
            A research foundation in AI for environmental decision-making.
          </h2>

          <div className="mt-8 rounded-2xl border border-white/10 bg-transparent p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold text-white">
                MSc, Artificial Intelligence &amp; Data Science
              </h3>
              <span className="text-sm font-bold text-[#4f8bff]">2026</span>
            </div>
            <p className="mt-1 text-base font-semibold text-[#cdd9ee]">
              Bangor University, United Kingdom
            </p>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8aa0c4]">
                Master&apos;s thesis
              </p>
              <p className="mt-2 text-lg italic leading-7 text-[#e6eefb]">
                &ldquo;Predicting Vehicle CO&#8322; Emissions Using Machine Learning: A Feature-Based
                Approach to Support Consumer and Environmental Decision-Making.&rdquo;
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#a9bcdc]">
                The thesis applies and compares machine-learning methods to predict vehicle CO&#8322;
                emissions from vehicle features, with the goal of giving consumers and policymakers
                clearer, evidence-based information for lower-emission choices — a direct bridge
                between data science and climate action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Representation & governance ───────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4f8bff]">
            Representation &amp; governance
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
            A record of elected and UN-affiliated youth representation.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#a9bcdc]">
            Beyond the technical work, Richard has held formal representative roles connecting
            young people in Ghana&apos;s Western North Region to national and United Nations–affiliated
            youth structures.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.role}
                className="flex flex-col glass rounded-2xl p-6 shadow-sm"
              >
                <span
                  className="inline-block h-1.5 w-12 rounded-full"
                  style={{ backgroundColor: r.accent }}
                />
                <h3 className="mt-4 text-lg font-bold leading-snug text-white">{r.role}</h3>
                <p className="mt-1 text-sm font-semibold text-[#cdd9ee]">{r.org}</p>
                {r.period && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-[#4f8bff]">
                    {r.period}
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-[#a9bcdc]">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Focus areas ───────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4f8bff]">Focus areas</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
            Three pillars, aligned with the Sustainable Development Goals.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 p-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: p.accent }}
                >
                  {p.sdg}
                </p>
                <h3 className="mt-3 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#a9bcdc]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionNav
        prev={{ label: "About", href: "/about" }}
        next={{ label: "Biography", href: "/about/biography" }}
      />
    </div>
  );
}
