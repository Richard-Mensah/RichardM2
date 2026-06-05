import Image from "next/image";
import Link from "next/link";
import { WRITING_IDEAS } from "@/constants";

const THEMES = [
  {
    label: "AI & Climate",
    description: "How artificial intelligence is being applied to climate adaptation, resilience planning, and environmental monitoring in the Global South.",
    accent: "#2f6bea",
    icon: "AC",
    href: "/blog",
  },
  {
    label: "AI Ethics & Technology",
    description: "Responsible AI design, governance gaps, ethics frameworks, and what accountability looks like for communities on the margins of the digital economy.",
    accent: "#4f8bff",
    icon: "AE",
    href: "/blog",
  },
  {
    label: "Youth Leadership",
    description: "Mentorship models, scholarship pathways, capacity building programmes, and how young people in Africa can lead the AI transition.",
    accent: "#4f8bff",
    icon: "YL",
    href: "/blog",
  },
  {
    label: "Community & SDGs",
    description: "Ground-level stories and analytical pieces on how AI and data science connect to the Sustainable Development Goals in practice.",
    accent: "#00689D",
    icon: "CS",
    href: "/blog",
  },
];

export default function ArticlesPageSection() {
  return (
    <div className="research-ground relative px-5 py-20 md:px-8">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />
      <div className="relative mx-auto max-w-5xl">

        {/* Hero */}
        <p className="text-xs font-black uppercase tracking-[0.32em] text-accent-strong">Articles & Writing</p>
        <h1 className="mt-4 text-balance text-4xl font-black font-display tracking-[-0.04em] text-ink md:text-5xl">
          Public thinking at the intersection of AI, development, and leadership.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-body">
          Essays, blog posts, and public writing that translate complex research into ideas
          anyone can engage with, because good ideas deserve to reach beyond academic journals.
        </p>

        <div className="relative mt-10 h-56 overflow-hidden rounded-2xl">
          <Image src="/research/articles-writing.jpg" alt="Richard Mensah in thought" fill className="object-cover object-center" />
        </div>

        {/* Themes grid */}
        <div className="mt-12">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-muted">Writing themes</p>
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2">
            {THEMES.map((theme) => (
              <Link
                key={theme.label}
                href={theme.href}
                className="group glass rounded-2xl p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  {theme.icon}
                </div>
                <h3 className="mt-4 text-base font-black text-ink">{theme.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{theme.description}</p>
                <p className="mt-4 text-xs font-black transition group-hover:underline" style={{ color: theme.accent }}>
                  Read articles →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Writing ideas in progress */}
        <div className="mt-12 rounded-2xl border border-line bg-transparent p-8">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-accent-strong">In progress</p>
          <h2 className="mt-3 text-xl font-black text-ink">Essays currently being written</h2>
          <ol className="mt-5 space-y-3">
            {WRITING_IDEAS.map((idea, i) => (
              <li key={idea} className="flex items-start gap-4 text-sm leading-6 text-body">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[0.65rem] font-black text-white bg-accent-strong"
                >
                  {i + 1}
                </span>
                {idea}
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-transparent p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent-strong">Read more</p>
          <p className="mt-3 text-base leading-7 text-body">
            All articles, essays, and longer-form writing live on the main blog, updated regularly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/blog" className="btn-primary rounded-full px-6 py-2.5 text-sm font-black">
              Read all articles
            </Link>
            <Link href="/contact" className="btn-ghost rounded-full px-6 py-2.5 text-sm font-black">
              Contact Richard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
