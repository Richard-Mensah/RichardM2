import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";
import PageHero from "@/components/ui/page/PageHero";
import AboutNav from "@/components/features/about/AboutNav";
import { aboutNeighbours, aboutPage } from "@/data/aboutPages";
import CopyButton from "@/components/ui/CopyButton";
import { Download, Mic, Radio, Users, Presentation } from "lucide-react";

export const metadata: Metadata = {
  title: "Media & Speaking | Richard Mensah",
  description:
    "Richard Mensah is available for speaking engagements, podcast interviews, panel discussions, and media features on AI in Africa, climate intelligence, youth empowerment, and sustainable development.",
};

/** Ready-to-paste bio for event programmes and articles. */
const SHORT_BIO =
  "Richard Mensah is a Ghanaian AI and Data Scientist based in the United Kingdom. He holds an MSc in Artificial Intelligence & Data Science from Bangor University and serves as Country Representative for Ghana at the United Nations Youth Association. A former Youth Member of Parliament, he works at the intersection of AI, climate intelligence and youth opportunity across the Global South.";

const FORMATS = [
  { icon: Presentation, label: "Keynotes" },
  { icon: Users, label: "Panels & roundtables" },
  { icon: Mic, label: "Podcasts & interviews" },
  { icon: Radio, label: "Radio & media features" },
] as const;

const SPEAKING_TOPICS = [
  { topic: "AI in Africa", description: "How AI adoption will be shaped by institutional readiness, not just technical access." },
  { topic: "Climate Intelligence", description: "Translating complex environmental data into actionable community resilience." },
  { topic: "Youth Empowerment", description: "Building the next generation of leaders through structured mentorship and knowledge systems." },
  { topic: "Education Policy", description: "What quality education really looks like in low-resource and high-potential contexts." },
  { topic: "Sustainable Development", description: "The interconnection between AI, climate, and the SDGs in practice." },
  { topic: "Data Science & Ethics", description: "Responsible AI design for development contexts where the stakes are highest." },
] as const;

const PAGE = aboutPage("/about/media");

export default function MediaPage() {
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
      >
        <Link href="/contact" className="btn-accent inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]">
          Book Richard to speak
        </Link>
        <a
          href="#speaker-kit"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white/10"
        >
          Speaker kit
        </a>
      </PageHero>
      <AboutNav />

      {/* ── Main content ──────────────────────────────────────────── */}
      <section className="bg-surface px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="space-y-5 text-base leading-8 text-body">
                <p>
                  Richard is available for speaking engagements, podcast interviews, panel
                  discussions, and media features. He brings a rare combination: the analytical
                  rigour of a data scientist and the human warmth of someone who has spent years
                  on the ground in communities that needed real change.
                </p>
                <p>
                  His work spans Ghana and the United Kingdom, connecting the lived experience of
                  grassroots community development with the global conversations about AI, climate
                  action, and sustainable development. That combination makes him a distinctive
                  voice in rooms that often hear from one or the other, but rarely both.
                </p>
                <p>
                  If you are convening a conversation that would benefit from a voice rooted in
                  both data science and development work, from both Ghana and global institutions,
                  Richard would be glad to join it.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-strong">Speaking Topics</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SPEAKING_TOPICS.map((item) => (
                    <div
                      key={item.topic}
                      className="rounded-xl border border-line bg-surface-card p-4"
                    >
                      <p className="text-sm font-black text-ink">{item.topic}</p>
                      <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="btn-primary mt-8 inline-flex">
                Book a speaking engagement
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative h-72 overflow-hidden rounded-2xl">
                <Image
                  src="/gallery/FB_IMG_1746893911660.jpg"
                  alt="Richard Mensah at a speaking engagement"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-52 overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/FB_IMG_1740547522676.jpg"
                    alt="Richard Mensah at a programme"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
                <div className="relative h-52 overflow-hidden rounded-2xl">
                  <Image
                    src="/gallery/20240604_151805.jpg"
                    alt="Richard Mensah, community engagement 2024"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Speaker kit ───────────────────────────────────────────── */}
      <section id="speaker-kit" className="scroll-mt-[calc(var(--header-h)+3.5rem)] bg-surface px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 overflow-hidden rounded-[2rem] border border-line bg-surface-card p-6 shadow-xl shadow-navy-950/5 md:p-10 lg:grid-cols-[0.42fr_1fr]">
            <div className="flex flex-col items-start gap-4">
              <div className="relative aspect-square w-full max-w-[16rem] overflow-hidden rounded-2xl bg-navy-950">
                <Image src="/Rich1.png" alt="Richard Mensah profile image" fill sizes="16rem" className="object-cover object-top" />
              </div>
              <a
                href="/Rich1.png"
                download="Richard-Mensah-profile.png"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-navy-950 px-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-navy-900"
              >
                <Download size={14} aria-hidden="true" /> Profile image
              </a>
            </div>
            <div>
              <p className="eyebrow">Speaker kit</p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">Everything an organiser needs</h2>
              <div className="mt-5 rounded-2xl bg-navy-950/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-accent-strong">Short bio</p>
                  <CopyButton text={SHORT_BIO} label="Copy bio" />
                </div>
                <p className="mt-3 text-sm leading-7 text-body">{SHORT_BIO}</p>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Formats">
                {FORMATS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 rounded-xl border border-line p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-tint text-accent-strong">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold text-ink">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-body">
                Based in the United Kingdom and available in person across the UK and internationally, or online anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-navy-950 px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-black text-white">Ready to start a conversation?</p>
            <p className="mt-1 text-sm text-on-dark-muted">
              Reach out directly to discuss speaking at your event, appearing on your podcast,
              or contributing to your publication.
            </p>
          </div>
          <Link href="/contact" className="btn-accent whitespace-nowrap">
            Get in touch
          </Link>
        </div>
      </section>

      <SectionNav {...aboutNeighbours(PAGE.href)} />
    </div>
  );
}
