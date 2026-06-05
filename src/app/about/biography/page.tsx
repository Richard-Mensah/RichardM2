import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Biography | Richard Mensah",
  description:
    "The full biography of Richard Mensah, tracing his journey from community campaigns in Sefwi Bekwai to AI research, youth leadership, and global advocacy.",
};

const STORY_PHOTOS = [
  {
    src: "/leadership/church-congregation-2.jpg",
    caption: "Speaking at church campaigns in Sefwi Bekwai",
    label: "Where it began",
  },
  {
    src: "/community/winneba-sanitation-1.jpg",
    caption: "Community volunteering in Winneba with Enock Asiako, 2019",
    label: "Showing up",
  },
  {
    src: "/community/teaching-class-1.jpg",
    caption: "Free community teaching during COVID-19 lockdown, Sefwi Bekwai",
    label: "Giving back",
  },
  {
    src: "/gallery/20240302_090453.jpg",
    caption: "Richard Mensah at a leadership programme, 2024",
    label: "Today",
  },
] as const;

const FOCUS_TAGS = [
  "AI & Data Science",
  "Climate Intelligence",
  "Youth Leadership",
  "SDGs",
  "Ghana · UK · Global",
] as const;

export default function BiographyPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-accent-soft transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">Biography</p>
          <h1 className="font-display mt-4 max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
            A story built on conviction, community, and code.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-dark-muted">
            From church campaigns and volunteer teaching in the Western North Region of Ghana,
            to AI research, international conferences, and building a mentorship programme that
            has changed hundreds of lives.
          </p>
        </div>
      </section>

      {/* ── Photo story strip ─────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STORY_PHOTOS.map((photo) => (
              <div key={photo.src} className="group relative">
                <div className="relative h-44 overflow-hidden rounded-2xl sm:h-52">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 640px) 22vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                </div>
                <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-accent-strong">
                  {photo.label}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-muted">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full biography ────────────────────────────────────────── */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">Full Biography</p>
              <h2 className="font-display mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-ink md:text-4xl">
                Shaped by the communities that needed him most.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-body">
                <p>
                  Richard Mensah&apos;s story begins in the Ashanti Region of Ghana, a place where
                  educational resources were scarce but where ambition, community spirit, and a
                  stubborn belief that things could be better were anything but. Growing up in
                  Sefwi Bekwai, Richard developed an early conviction that has guided everything
                  since: technology, when designed with care and purpose, can transform lives at scale.
                </p>
                <p>
                  That conviction did not stay theoretical for long. As a teenager, Richard was
                  already organising community youth events, rallying his peers around educational
                  goals, and helping neighbours navigate systems that often felt designed to exclude
                  them. He spoke at church campaigns, joined peace advocacy programmes with the NCCE,
                  and took part in radio education tours across the Western North Region. Leadership,
                  he discovered early, is not a title. It is a choice made daily, often without
                  applause.
                </p>
                <p>
                  When COVID-19 brought lockdowns and closed schools, Richard took his classroom
                  into the community. He organised free morning and night teaching sessions in
                  multiple villages, motivated young people to show up even when the world had
                  stopped, and used the hard times as an opportunity to give back. He also led
                  sanitation drives in DansoKrom and Surano B, visited communities with no clean
                  water, and documented the realities that rarely made it into any report.
                </p>
                <p>
                  His academic and professional journey took him from Ghana to the United Kingdom,
                  where he expanded his lens on research, policy, and how advanced analytics can
                  serve both institutions and people. Rather than leaving his roots behind, he
                  brought them with him and built a career that is deliberately rooted in the
                  places and communities that shaped him.
                </p>
                <p>
                  Today, Richard operates as a practitioner, researcher, and educator. He builds
                  AI and data systems for organisations that want to make smarter, fairer
                  decisions. He trains and mentors young people across Ghana and beyond, connecting
                  them to scholarships, fellowships, and leadership networks that change
                  trajectories. And at every platform available, he advocates for a future where
                  the Global South is not just a recipient of technology but a builder, shaper,
                  and beneficiary of it.
                </p>
                <p>
                  He does not treat AI, climate action, and youth empowerment as separate
                  disciplines. He treats them as a single, interconnected system, because that
                  is what they are.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {FOCUS_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent-strong/30 bg-accent-strong/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-accent-strong"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative h-80 overflow-hidden rounded-2xl">
                <Image
                  src="/community/teaching-night-class.jpg"
                  alt="Richard Mensah teaching community youth at night during COVID-19 lockdown"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 90vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl">
                <Image
                  src="/leadership/church-campaign-activities.jpg"
                  alt="Church campaign activities in Sefwi Bekwai"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 90vw"
                />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl">
                <Image
                  src="/community/winneba-sanitation-3.jpg"
                  alt="Community sanitation volunteering in Winneba"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, 90vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-black text-white">Want to know more?</p>
            <p className="mt-1 text-sm text-on-dark-muted">
              Explore the leadership journey, international conferences, or download the full CV.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/leadership-journey"
              className="whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-navy-950 transition hover:bg-white/90"
            >
              Leadership Journey
            </Link>
            <Link
              href="/about/cv"
              className="whitespace-nowrap rounded-full border border-white/40 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:bg-white/10"
            >
              View CV
            </Link>
          </div>
        </div>
      </section>

      <SectionNav prev={{ label: "About", href: "/about" }} next={{ label: "Vision & Mission", href: "/about/vision" }} />
    </div>
  );
}
