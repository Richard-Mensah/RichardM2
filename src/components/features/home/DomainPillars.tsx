import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CloudSun,
  Globe2,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { HOME_DOMAINS, SDG_COLOURS } from "@/constants";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = { BrainCircuit, BarChart3, CloudSun, Users, Globe2, Target };

/** Visual identity per domain: SDG-derived accent colour, a real photo, and its bento span. */
/** dim: extra navy tint for bright, white-background images so overlaid text stays readable. */
const LOOK: Record<string, { color: string; image: string; alt: string; span: string; tall?: boolean; dim?: boolean }> = {
  "AI & Machine Learning": {
    color: "#FD6925", // SDG 9
    image: "/domains/ai-network.jpg", // Alina Grubnyak, Unsplash License (see public/domains/CREDITS.md)
    alt: "Abstract network graph of connected nodes, representing a neural network",
    dim: true,
    span: "lg:col-span-4",
    tall: true,
  },
  "Data Science": {
    color: "#2ba8b4",
    image: "/domains/data-dashboard.jpg", // Luke Chesser, Unsplash License
    alt: "Analytics dashboard with charts and metrics on a laptop screen",
    span: "lg:col-span-2",
    tall: true,
  },
  "Climate Change": {
    color: "#3F7E44", // SDG 13
    image: "/domains/climate-farmer.jpg", // Sadiq Hashim, Pexels License
    alt: "African farmer standing in a lush green field under a blue sky",
    span: "lg:col-span-2",
  },
  "Community Development": {
    color: "#C5192D", // SDG 4
    image: "/community/school-outreach-1.jpg",
    alt: "Richard Mensah speaking to a full hall of students during a school outreach session",
    span: "lg:col-span-2",
  },
  "Youth Conferences & Diplomacy": {
    color: "#00689D", // SDG 16/17 blues
    image: "/gallery/FB_IMG_1746893909499.jpg",
    alt: "International youth delegates gathered at a global summit",
    span: "lg:col-span-2",
  },
  "SDG Impact": {
    color: "#19486A", // SDG 17
    image: "/gallery/FB_IMG_1746893968844.jpg",
    alt: "Young leaders from many countries holding national flags",
    span: "lg:col-span-6",
  },
};

export default function DomainPillars() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        {/* Header */}
        <Reveal className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">What I do</p>
            <h2 className="font-display mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-ink md:text-4xl lg:text-[2.7rem] lg:leading-[1.08]">
              Six domains, one mission:{" "}
              <span className="bg-gradient-to-r from-accent-strong via-accent to-navy-700 bg-clip-text text-transparent">
                technology and leadership in service of people
              </span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-body">
              From machine-learning systems to grassroots youth programmes, every strand of the work connects back to
              the Sustainable Development Goals and the communities they serve.
            </p>
            {/* SDG spectrum */}
            <div className="mt-5 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
              {SDG_COLOURS.map((s) => (
                <span key={s.number} className="flex-1" style={{ backgroundColor: s.color }} />
              ))}
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              6 domains · 17 goals · 1 mission
            </p>
          </div>
        </Reveal>

        {/* Bento */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {HOME_DOMAINS.map((domain, i) => {
            const Icon = ICONS[domain.icon] ?? Target;
            const look = LOOK[domain.title] ?? {
              color: "#1e8a95",
              image: "/gallery/FB_IMG_1742347850249.jpg",
              alt: "",
              span: "lg:col-span-2",
            };
            const wide = look.span === "lg:col-span-6";
            return (
              <Reveal
                key={domain.title}
                delayMs={i * 70}
                className={cn(look.span, wide && "sm:col-span-2")}
              >
                <Link
                  href={domain.href}
                  className={cn(
                    "domain-tile group relative flex h-full flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy-950 p-6 text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50 sm:p-7",
                    look.tall ? "min-h-[19rem] sm:min-h-[24rem] lg:min-h-[26rem]" : wide ? "min-h-[19rem] sm:min-h-[20rem] lg:min-h-[17rem]" : "min-h-[18rem] sm:min-h-[22rem]",
                  )}
                  style={{ "--domain": look.color } as CSSProperties}
                >
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 1200px, 100vw" : look.span === "lg:col-span-4" ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                    className="domain-tile__img object-cover"
                  />
                  {/* Colour wash + legibility gradient */}
                  {"dim" in look && look.dim ? <div className="absolute inset-0 bg-navy-950/60" aria-hidden="true" /> : null}
                  <div className="domain-tile__wash absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/10" aria-hidden="true" />
                  {/* Accent edge */}
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.25] bg-[var(--domain)] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />

                  {/* Top row */}
                  <div className="absolute inset-x-6 top-6 flex items-start justify-between sm:inset-x-7">
                    <span className="font-display text-5xl font-black leading-none text-white/15 transition group-hover:text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-lg" style={{ backgroundColor: look.color }}>
                      {domain.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={cn("relative", wide && "lg:flex lg:items-end lg:justify-between lg:gap-10")}>
                    <div className={cn(wide && "lg:max-w-2xl")}>
                      <span
                        className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition duration-300 group-hover:bg-[var(--domain)] group-hover:border-transparent"
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <h3 className="font-display mt-4 text-2xl font-bold tracking-[-0.02em] md:text-[1.7rem]">{domain.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-white/75">{domain.blurb}</p>
                      {wide ? (
                        <div className="mt-4 hidden flex-wrap gap-1.5 lg:flex" aria-hidden="true">
                          {SDG_COLOURS.map((s) => (
                            <span key={s.number} className="grid h-7 w-7 place-items-center rounded-md text-[10px] font-black text-white" style={{ backgroundColor: s.color }}>
                              {s.number}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-xs font-black uppercase tracking-[0.14em] backdrop-blur-md transition duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-navy-950 lg:shrink-0">
                      Explore
                      <ArrowUpRight size={15} className="transition duration-300 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
