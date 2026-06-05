import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";
import { getImpactStats } from "@/lib/impactStats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Richard Mensah | AI Researcher, Youth Leader, SDG Advocate",
  description:
    "Learn about Richard Mensah, an AI and Data Scientist, youth leader, and SDG advocate whose work bridges data intelligence, climate action, and youth empowerment across the Global South and beyond.",
};

const HUB_CARDS = [
  {
    href: "/about/profile",
    image: "/Rich1.png",
    tag: "Profile",
    title: "Credentials, representation, and focus at a glance.",
    body: "MSc in AI & Data Science (Bangor); Country Representative for Ghana, UN Youth Association; former Youth MP.",
    accent: "#4f8bff",
  },
  {
    href: "/about/biography",
    image: "/community/teaching-class-1.jpg",
    tag: "Biography",
    title: "A story built on conviction, community, and code.",
    body: "From grassroots campaigns in Sefwi Bekwai to AI research and global advocacy.",
    accent: "#4f8bff",
  },
  {
    href: "/about/vision",
    image: "/gallery/20240302_090453.jpg",
    tag: "Vision & Mission",
    title: "Intelligence that serves the many, not the few.",
    body: "A commitment to equitable development, aligned with the United Nations SDGs.",
    accent: "#4f8bff",
  },
  {
    href: "/about/leadership-journey",
    image: "/community/water-crisis-3.jpg",
    tag: "Leadership Journey",
    title: "From village roads to global stages.",
    body: "The personal origin story: motorbike trips, waterless communities, COVID teaching.",
    accent: "#10B981",
  },
  {
    href: "/about/conferences",
    image: "/leadership/conference-sochi.jpg",
    tag: "Conferences & Summits",
    title: "Carrying the Global South's voice into global rooms.",
    body: "AI governance, UN SDG convenings, climate summits, and youth policy forums.",
    accent: "#8B5CF6",
  },
  {
    href: "/about/media",
    image: "/gallery/FB_IMG_1746893911660.jpg",
    tag: "Media & Speaking",
    title: "A voice that bridges data and lived development experience.",
    body: "Available for speaking engagements, panels, podcasts, and media features.",
    accent: "#EF4444",
  },
  {
    href: "/about/cv",
    image: "/gallery/20240604_134602.jpg",
    tag: "CV / Resume",
    title: "The full record of a career built with purpose.",
    body: "Qualifications, experience, research, leadership roles, and programme outcomes.",
    accent: "#6B7280",
  },
] as const;

export default async function AboutPage() {
  const QUICK_STATS = await getImpactStats();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 pt-10 pb-0 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div className="pb-12 md:pb-16">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">About Richard</p>
            <h1 className="font-display mt-4 text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
              From Ghana to the world, one impact system at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-on-dark-muted">
              Richard Mensah is an AI and Data Scientist, youth leader, and sustainable development
              advocate whose work bridges data intelligence, climate action, and youth empowerment
              across the Global South and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about/biography" className="btn-primary">
                Read Biography
              </Link>
              <a
                href="mailto:rmensahuk@gmail.com?subject=CV Request - Richard Mensah"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-sm overflow-hidden rounded-t-[2rem] shadow-2xl shadow-black/60 lg:mx-0">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah, AI and Data Scientist, Youth Leader"
              fill
              className="object-cover object-top"
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/60 to-transparent p-5">
              <p className="font-black text-white">Richard Mensah</p>
              <p className="text-sm text-on-dark-muted">AI &amp; Data Scientist · Youth Leader · SDG Advocate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick stats bar ───────────────────────────────────────── */}
      <section className="bg-navy-900 px-5 py-7 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hub cards ─────────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">Explore</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-black tracking-[-0.04em] text-ink md:text-4xl">
            Everything about Richard in one place.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Select a section to explore the full story, from personal biography and grassroots
            community work to international conferences, media, and the full CV.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HUB_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative z-10 p-6">
                  <span
                    className="mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: card.accent }}
                  >
                    {card.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-black leading-tight text-white">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/75">{card.body}</p>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-white/60 transition group-hover:text-white">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionNav prev={{ label: "Home", href: "/" }} next={{ label: "Research", href: "/research" }} />
    </div>
  );
}
