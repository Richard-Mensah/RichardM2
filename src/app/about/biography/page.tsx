import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";
import PersonJsonLd from "@/components/seo/PersonJsonLd";
import JourneyQuest from "@/components/features/identity/JourneyQuest";

export const metadata: Metadata = {
  title: "Biography | Richard Mensah (Kofi Richard), Sefwi Bekwai, Ghana",
  description:
    "The biography of Richard Mensah, also known as Kofi Richard or Kofiever: from Paboase and Sefwi Bekwai, Ghana, to UEW, ALX, Azubi Africa, IGNOU, RUDN University and an MSc in AI & Data Science at Bangor University. Founder of the Center for Analytics Services, now based in the United Kingdom.",
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
    src: "/gallery/pulse-of-the-earth-1.jpg",
    caption: "At the Frame Rate: Pulse of the Earth exhibition, Wales, UK",
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
      <PersonJsonLd detail />

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
            From Paboase, Surano &lsquo;A&rsquo; and Sefwi Bekwai in the Western North Region of
            Ghana, to AI research at Bangor University, international conferences, and a
            mentorship programme that has changed hundreds of lives.
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
                  Richard Mensah, known to family and friends as <strong className="text-ink">Kofi
                  Richard</strong> or <strong className="text-ink">Kofiever</strong>, was born and
                  spent his early childhood in Paboase, in the Western North Region of Ghana. His
                  formative years continued in Surano &lsquo;A&rsquo; in the Bibiani-Anhwiaso-Bekwai
                  Municipality, where he completed Surano &lsquo;A&rsquo; Anglican Junior High School
                  (also known as St. Stephen&apos;s Anglican Basic School, Surano &lsquo;A&rsquo;),
                  before he settled permanently in Sefwi Bekwai Lowcost.
                </p>
                <p>
                  He continued to Bibiani Senior High Technical School. Those years in
                  communities where opportunity was unevenly distributed, but resilience and
                  community spirit were abundant, shaped the questions that would come to define
                  his work.
                </p>
                <p>
                  It was in Sefwi Bekwai that Richard began to challenge the status quo: why
                  opportunity reached some young people and bypassed others, and how it could be
                  deliberately created rather than left to chance. That question became the
                  conviction that has guided everything since: that data, technology, and
                  principled leadership, designed with care and purpose, can open doors at scale.
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
                  His path through higher education was shaped by clarity of purpose. When his first
                  undergraduate programme proved misaligned with his aspirations, he made the
                  decisive choice to start afresh and enrolled at the University of Education,
                  Winneba (UEW), where he earned his bachelor&apos;s degree. He arrived poised and
                  committed to raising the standard of education in rural communities, with bold
                  ambitions to bring innovation into every educational setting he entered.
                  Alongside his studies he led community development and volunteer initiatives, and
                  supported his academic supervisor in teaching and administration through Levels
                  300 and 400.
                </p>
                <p>
                  That experience sharpened a conviction: lasting change in education and
                  communities would demand better use of technology and evidence. Richard turned his
                  passion for technology into a career in data science and analytics, and into a
                  deliberate investment in knowledge. He completed the{" "}
                  <strong className="text-ink">ALX Data Science Programme</strong> and{" "}
                  <strong className="text-ink">Azubi Africa&apos;s Data Analytics programme</strong>{" "}
                  with a Machine Learning focus, and earned an{" "}
                  <strong className="text-ink">MA in Industrial &amp; Organisational Psychology</strong>{" "}
                  from Indira Gandhi National Open University (IGNOU), India, grounding his technical
                  work in an understanding of people, behaviour, and organisations. He also holds a
                  Certificate in International &amp; Intercultural Communication from the Peoples&apos;
                  Friendship University of Russia (RUDN University).
                </p>
                <p>
                  He put those skills straight to work, founding and leading the{" "}
                  <strong className="text-ink">Center for Analytics Services</strong>, a data and
                  analytics practice delivering insight and reporting for clients.
                </p>
                <p>
                  To deepen his expertise in machine learning and artificial intelligence, Richard
                  moved to the United Kingdom, where he now lives. There he completed an MSc in
                  Artificial Intelligence &amp; Data Science at Bangor University and expanded his
                  lens on research, policy, and how advanced analytics can serve both institutions
                  and people. Rather than leaving his roots behind, he
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

      <JourneyQuest />

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
