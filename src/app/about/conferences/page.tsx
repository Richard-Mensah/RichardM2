import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import AboutNav from "@/components/features/about/AboutNav";
import { aboutNeighbours, aboutPage } from "@/data/aboutPages";

export const metadata: Metadata = {
  title: "Conferences & Summits | Richard Mensah",
  description:
    "Richard Mensah's international conference and summit engagements, from AI governance forums and UN SDG convenings to climate intelligence summits across multiple countries.",
};

const CONFERENCE_IMAGES = [
  { src: "/leadership/conference-sochi.jpg",     alt: "Richard Mensah at an international conference, Sochi Russia" },
  { src: "/leadership/conference-diplomatic.jpg", alt: "Diplomatic engagement, international programme" },
  { src: "/gallery/20240302_090453.jpg",          alt: "Richard Mensah at a leadership programme, 2024" },
  { src: "/gallery/20240229_120952.jpg",          alt: "Richard Mensah, international engagement 2024" },
  { src: "/gallery/FB_IMG_1746893909499.jpg",     alt: "Richard Mensah with an international youth delegation" },
  { src: "/gallery/FB_IMG_1746893921870.jpg",     alt: "Richard Mensah at a community initiative" },
] as const;

const CONFERENCE_AREAS = [
  "AI Ethics & Governance",
  "UN SDG Convenings",
  "Climate Intelligence Summits",
  "Youth Leadership Assemblies",
  "Data Science Forums",
  "Entrepreneurship Ecosystems",
] as const;

const PAGE = aboutPage("/about/conferences");

export default function ConferencesPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      <PageHero
        eyebrow={PAGE.eyebrow}
        title={PAGE.title}
        lede={PAGE.lede}
        image={PAGE.image}
        imageAlt={PAGE.imageAlt}
        focus={PAGE.focus}
        crumbs={[{ label: "About", href: "/about" }, { label: PAGE.nav }]}
      />
      <AboutNav />

      {/* ── Body ──────────────────────────────────────────────────── */}
      <section className="bg-surface px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <div className="space-y-5 text-base leading-8 text-body">
                <p>
                  Representation matters, and Richard has understood this from the very beginning.
                  His presence at international conferences and summits is not just personal
                  ambition. It is deliberate advocacy. Every time he joins a global conversation
                  on AI governance, climate intelligence, or youth empowerment, he carries the
                  perspectives of communities that are too often absent from those rooms.
                </p>
                <p>
                  He has participated in and spoken at events across multiple countries, contributing
                  to discussions on AI ethics, sustainable development, youth policy, and data
                  governance. He brings not just technical expertise, but lived experience, a
                  combination that makes his contributions particularly resonant in rooms that
                  often skew towards theory over practice.
                </p>
                <p>
                  His conference work spans AI and data science forums, UN SDG convenings, climate
                  intelligence summits, youth leadership assemblies, and entrepreneurship ecosystems.
                  Wherever the conversation that will shape the future is happening, Richard makes
                  sure a voice from the Global South is in it.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-surface-card p-6">
                {CONFERENCE_AREAS.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-strong" />
                    <p className="text-sm font-semibold text-ink-soft">{area}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary">
                  Back to About
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Invite Richard to Speak
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {CONFERENCE_IMAGES.map((img) => (
                <div key={img.src} className="group relative h-48 overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cambridge recognition ─────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">Recognition</p>
              <h2 className="font-display mt-4 text-balance text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
                Invited to Cambridge Climate Governance programme.
              </h2>
              <p className="mt-5 text-base leading-8 text-on-dark-muted">
                Richard received an invitation to the Cambridge Climate Governance programme,
                a recognition of his work at the intersection of climate intelligence, policy
                advocacy, and youth leadership. It is one marker of a broader trajectory: from
                community campaigns in Sefwi Bekwai, to rooms where global climate policy is
                shaped.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-44 overflow-hidden rounded-xl">
                <Image
                  src="/leadership/cambridge-invite-1.jpg"
                  alt="Cambridge Climate Governance invitation"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 16vw, 45vw"
                />
              </div>
              <div className="relative h-44 overflow-hidden rounded-xl">
                <Image
                  src="/leadership/cambridge-invite-2.jpg"
                  alt="Cambridge Climate Governance programme"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 16vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionNav {...aboutNeighbours(PAGE.href)} />
    </div>
  );
}
