import Image from "next/image";
import Link from "next/link";

const HUB_CARDS = [
  {
    href: "/leadership/sefwi-bekwai",
    image: "/leadership/bym-media-engagement.jpg",
    tag: "The Origin Story",
    title: "Sefwi Bekwai Youth Movement",
    body: "How a grassroots youth platform in Ghana's Western North Region became the training ground for everything that followed, from church civic education to UNYA-Ghana Youth Parliament.",
    accent: "#4f8bff",
  },
  {
    href: "/leadership/ega",
    image: "/leadership/conference-sochi.jpg",
    tag: "International Organisation",
    title: "EGA Mentorship International",
    body: "Founded to remove friction between ambition and access, 120+ study abroad journeys, 35+ fully funded scholarships, and partners across Serbia, USA, Zambia, and Liberia.",
    accent: "#4f8bff",
  },
  {
    href: "/leadership/community",
    image: "/community/teaching-night.jpg",
    tag: "Grassroots Work",
    title: "Community Development",
    body: "Free teaching during COVID-19 lockdowns, community sanitation exercises, hospital STEM excursions, and visiting communities with no clean water, development as a daily practice.",
    accent: "#10B981",
  },
];

export default function LeadershipPageSections() {
  return (
    <section className="bg-navy-950 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-accent-soft">
            Leadership · Community · Institution-Building
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black font-display tracking-[-0.04em] text-white md:text-5xl">
            Three chapters. One continuous commitment.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-on-dark-muted">
            Richard&apos;s leadership is not a single thread, it is a braid. Grassroots community
            work, institutional youth advocacy, and international mentorship, built over a decade
            and still active today.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {HUB_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                <span
                  className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white"
                  style={{ backgroundColor: card.accent }}
                >
                  {card.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-black tracking-[-0.03em] text-white">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-on-dark-muted">{card.body}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em]" style={{ color: card.accent }}>
                  <span>Explore</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/leadership/journey"
            className="btn-ghost"
          >
            <span>Download Full Leadership Journey</span>
            <span>↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
