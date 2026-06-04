import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Media & Speaking | Richard Mensah",
  description:
    "Richard Mensah is available for speaking engagements, podcast interviews, panel discussions, and media features on AI in Africa, climate intelligence, youth empowerment, and sustainable development.",
};

const SPEAKING_TOPICS = [
  { topic: "AI in Africa", description: "How AI adoption will be shaped by institutional readiness, not just technical access." },
  { topic: "Climate Intelligence", description: "Translating complex environmental data into actionable community resilience." },
  { topic: "Youth Empowerment", description: "Building the next generation of leaders through structured mentorship and knowledge systems." },
  { topic: "Education Policy", description: "What quality education really looks like in low-resource and high-potential contexts." },
  { topic: "Sustainable Development", description: "The interconnection between AI, climate, and the SDGs in practice." },
  { topic: "Data Science & Ethics", description: "Responsible AI design for development contexts where the stakes are highest." },
] as const;

export default function MediaPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-[#F8FBFF] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#2BA8B4] transition hover:text-slate-950"
          >
            ← About Richard
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#2BA8B4]">Media &amp; Speaking</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 md:text-6xl">
            A voice that bridges data and lived development experience.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Richard is a confident, compelling communicator who can hold his own in a highly
            technical discussion and also tell a story that moves a general audience.
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────── */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="space-y-5 text-base leading-8 text-slate-600">
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
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#2BA8B4]">Speaking Topics</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SPEAKING_TOPICS.map((item) => (
                    <div
                      key={item.topic}
                      className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-4"
                    >
                      <p className="text-sm font-black text-slate-950">{item.topic}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-[#2BA8B4] px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#2BA8B4]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
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

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] px-5 py-12 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-black text-white">Ready to start a conversation?</p>
            <p className="mt-1 text-sm text-slate-400">
              Reach out directly to discuss speaking at your event, appearing on your podcast,
              or contributing to your publication.
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-[#2BA8B4] px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-[#2BA8B4]/30 transition hover:-translate-y-0.5 hover:bg-[#7FD6D2]"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <SectionNav prev={{ label: "Conferences", href: "/about/conferences" }} next={{ label: "CV / Resume", href: "/about/cv" }} />
    </div>
  );
}
