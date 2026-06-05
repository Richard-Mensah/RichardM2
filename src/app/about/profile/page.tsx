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
      <section className="relative overflow-hidden bg-navy-950 px-5 py-16 md:px-8 md:py-20">
        <div className="data-grid-light pointer-events-none absolute inset-0 opacity-[0.4]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.6fr]">
          <div>
            <Link
              href="/about"
              className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-soft transition hover:text-white"
            >
              ← About Richard
            </Link>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-soft">Profile</p>
            <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Richard Mensah
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-on-dark-muted">
              MSc in Artificial Intelligence &amp; Data Science (Bangor University); Country
              Representative for Ghana at the <span className="text-white">United Nations Youth
              Association</span>; former Youth Member of Parliament for the Western North Region.
              His work sits at the intersection of <span className="text-white">artificial
              intelligence, climate intelligence, and youth opportunity in the Global South.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about/cv"
                className="btn-accent rounded-full px-6 py-3 text-sm font-bold tracking-[0.02em] shadow-lg transition hover:-translate-y-0.5"
              >
                View full CV
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold tracking-[0.02em] text-white transition hover:-translate-y-0.5 hover:border-accent-soft hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-xs overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl shadow-navy-950/60 lg:mx-0">
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
      <section className="bg-accent px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AT_A_GLANCE.map((item) => (
            <div key={item.label} className="border-l-2 border-white/30 pl-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
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
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Education</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            A research foundation in AI for environmental decision-making.
          </h2>

          <div className="mt-8 rounded-2xl border border-line bg-surface-card p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-bold text-ink">
                MSc, Artificial Intelligence &amp; Data Science
              </h3>
              <span className="text-sm font-bold text-accent-strong">2026</span>
            </div>
            <p className="mt-1 text-base font-semibold text-ink-soft">
              Bangor University, United Kingdom
            </p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                Master&apos;s thesis
              </p>
              <p className="font-display mt-2 text-lg italic leading-7 text-ink-soft">
                &ldquo;Predicting Vehicle CO&#8322; Emissions Using Machine Learning: A Feature-Based
                Approach to Support Consumer and Environmental Decision-Making.&rdquo;
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-body">
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
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">
            Representation &amp; governance
          </p>
          <h2 className="font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            A record of elected and UN-affiliated youth representation.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Beyond the technical work, Richard has held formal representative roles connecting
            young people in Ghana&apos;s Western North Region to national and United Nations–affiliated
            youth structures.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.role}
                className="card-lift flex flex-col glass rounded-2xl p-6"
              >
                <span
                  className="inline-block h-1.5 w-12 rounded-full"
                  style={{ backgroundColor: r.accent }}
                />
                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{r.role}</h3>
                <p className="mt-1 text-sm font-semibold text-ink-soft">{r.org}</p>
                {r.period && (
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-accent-strong">
                    {r.period}
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-body">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Focus areas ───────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Focus areas</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            Three pillars, aligned with the Sustainable Development Goals.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="card-lift rounded-2xl border border-line bg-surface-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-strong">
                  {p.sdg}
                </p>
                <h3 className="mt-3 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-body">{p.body}</p>
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
