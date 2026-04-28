import { db } from "@/db";
import CollaborationForm from "@/components/collaboration-form";
import { sql } from "drizzle-orm";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

const navigation = [
  { label: "Identity", href: "#identity" },
  { label: "SDGs", href: "#sdgs" },
  { label: "Research", href: "#research" },
  { label: "Systems", href: "#systems" },
  { label: "Leadership", href: "#leadership" },
  { label: "Collaborate", href: "#collaborate" },
] as const;

const sdgColours = [
  { number: "1", name: "No Poverty", color: "#E5243B" },
  { number: "2", name: "Zero Hunger", color: "#DDA63A" },
  { number: "3", name: "Good Health", color: "#4C9F38" },
  { number: "4", name: "Quality Education", color: "#C5192D" },
  { number: "5", name: "Gender Equality", color: "#FF3A21" },
  { number: "6", name: "Clean Water", color: "#26BDE2" },
  { number: "7", name: "Clean Energy", color: "#FCC30B" },
  { number: "8", name: "Decent Work", color: "#A21942" },
  { number: "9", name: "Innovation", color: "#FD6925" },
  { number: "10", name: "Reduced Inequalities", color: "#DD1367" },
  { number: "11", name: "Sustainable Cities", color: "#FD9D24" },
  { number: "12", name: "Responsible Consumption", color: "#BF8B2E" },
  { number: "13", name: "Climate Action", color: "#3F7E44" },
  { number: "14", name: "Life Below Water", color: "#0A97D9" },
  { number: "15", name: "Life on Land", color: "#56C02B" },
  { number: "16", name: "Strong Institutions", color: "#00689D" },
  { number: "17", name: "Partnerships", color: "#19486A" },
] as const;

const priorityGoals = [
  {
    code: "SDG 4",
    title: "Quality Education",
    color: "#C5192D",
    contribution:
      "Teaching AI literacy, analytics, leadership, and practical problem-solving so knowledge becomes opportunity.",
  },
  {
    code: "SDG 8",
    title: "Decent Work & Economic Growth",
    color: "#A21942",
    contribution:
      "Turning data skills into employability, entrepreneurship, productivity, and responsible digital transformation.",
  },
  {
    code: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    color: "#FD6925",
    contribution:
      "Building intelligent systems that help organizations modernize decisions, products, services, and institutional capacity.",
  },
  {
    code: "SDG 13",
    title: "Climate Action",
    color: "#3F7E44",
    contribution:
      "Developing climate intelligence ideas for resilience, risk communication, adaptation planning, and public awareness.",
  },
  {
    code: "SDG 16",
    title: "Peace, Justice & Strong Institutions",
    color: "#00689D",
    contribution:
      "Promoting ethical AI, transparent analytics, responsible governance, and evidence-based institutional leadership.",
  },
  {
    code: "SDG 17",
    title: "Partnerships for the Goals",
    color: "#19486A",
    contribution:
      "Connecting Ghana, the UK, India, and global partners around research, youth development, and impact execution.",
  },
] as const;

const identityTimeline = [
  {
    place: "Ghana",
    title: "Rooted in development urgency",
    body: "A foundation shaped by community, education, ambition, and the belief that technology should solve real problems.",
  },
  {
    place: "United Kingdom",
    title: "Expanded through global systems thinking",
    body: "A broader lens on research, policy, leadership, and how advanced analytics can serve institutions and people.",
  },
  {
    place: "Global South + global partners",
    title: "Built for cross-border impact",
    body: "A platform that connects AI, climate intelligence, youth empowerment, entrepreneurship, and sustainable development.",
  },
] as const;

const researchPillars = [
  {
    domain: "AI & Data Science",
    abstract:
      "Applied machine learning, predictive modeling, responsible analytics, and decision intelligence for organizations.",
    accent: "#009EDB",
  },
  {
    domain: "AI & Climate Change",
    abstract:
      "Climate intelligence systems that translate complex environmental signals into practical adaptation decisions.",
    accent: "#3F7E44",
  },
  {
    domain: "Youth Leadership Systems",
    abstract:
      "Mentorship, training, and knowledge systems that help young people move from potential to execution.",
    accent: "#FCC30B",
  },
  {
    domain: "Policy, Ethics & Institutions",
    abstract:
      "Responsible AI frameworks for trust, fairness, transparency, inclusion, and evidence-based leadership.",
    accent: "#00689D",
  },
] as const;

const systems = [
  {
    title: "Predictive Intelligence System for Financial Behaviour",
    label: "AI + SDG 8",
    color: "#A21942",
    problem: "Organizations need better insight into behaviour without overwhelming people with irrelevant campaigns.",
    approach: "Classification models, segmentation, explainable scoring, and decision dashboards.",
    impact: "Improves targeting, reduces waste, and creates a pathway toward ethical financial inclusion.",
  },
  {
    title: "Climate Signal Observatory for Community Resilience",
    label: "Climate + SDG 13",
    color: "#3F7E44",
    problem: "Communities need localized climate intelligence that is understandable and actionable.",
    approach: "Open climate data, geospatial indicators, risk narratives, and youth-facing dashboards.",
    impact: "Supports resilience planning, public awareness, and adaptation conversations.",
  },
  {
    title: "Youth Leadership Knowledge Engine",
    label: "Leadership + SDG 4/17",
    color: "#C5192D",
    problem: "Mentorship programs often inspire people but fail to scale learning, measure growth, or preserve knowledge.",
    approach: "Program analytics, knowledge bases, skill maps, mentoring records, and opportunity pathways.",
    impact: "Makes youth leadership measurable, repeatable, and globally collaborative.",
  },
] as const;

const leadershipTracks = [
  "Alpha Society as a disciplined youth leadership and excellence community",
  "AI and analytics training through institutional and community learning spaces",
  "Partnerships across Ghana, the UK, India, and global innovation networks",
  "Public thinking on AI in Africa, climate intelligence, inequality, and leadership",
] as const;

const writingIdeas = [
  "The Future of AI in Africa Is Institutional, Not Just Technical",
  "Climate Intelligence Systems for the Global South",
  "Youth Leadership Models for the AI Generation",
  "Responsible AI and the Sustainable Development Goals",
] as const;

async function getDatabaseSignal() {
  try {
    await db.execute(sql`select 1`);
    return "online" as const;
  } catch {
    return "degraded" as const;
  }
}

function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#00689D]">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
        {title}
      </h2>
      {children ? <div className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{children}</div> : null}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 ${className}`}>
      {children}
    </div>
  );
}

function SdgLogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="sdg-conic absolute inset-0 rounded-full opacity-30 blur-md" />
      <img
        src="/sdg-impact-wheel.svg"
        alt="SDG impact wheel inspired by the Sustainable Development Goals colour palette"
        className="logo-wheel-shadow relative h-full w-full rounded-[2rem] object-contain"
      />
    </div>
  );
}

export default async function HomePage() {
  const databaseSignal = await getDatabaseSignal();

  return (
    <>
      <div className="sdg-band fixed inset-x-0 top-0 z-[60] h-1.5" />
      <header className="fixed inset-x-0 top-1.5 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Richard Mensah home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#009EDB] text-sm font-black text-white shadow-lg shadow-[#009EDB]/25">
              RM
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-black uppercase tracking-[0.22em] text-slate-950">
                Richard Mensah
              </span>
              <span className="block text-xs font-semibold text-slate-500">AI • Leadership • SDGs</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 transition hover:text-[#009EDB]">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#collaborate"
            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-[#009EDB]"
          >
            Connect
          </a>
        </nav>
      </header>

      <main id="home" className="overflow-hidden pt-20">
        <section className="sdg-hero-mesh relative px-5 py-16 md:px-8 md:py-24">
          <div className="absolute inset-0 data-grid-light opacity-55" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative reveal-up">
              <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-700 shadow-lg shadow-slate-200/60">
                <span className="sdg-conic h-3 w-3 rounded-full" />
                SDG-colour personal brand ecosystem
              </div>

              <h1 className="mt-8 max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 md:text-7xl lg:text-8xl">
                AI & Data Scientist building systems for <span className="sdg-text-gradient">global impact.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
                Richard Mensah is positioned at the intersection of AI, leadership,
                entrepreneurship, and sustainable development: turning research, data, and youth
                empowerment into SDG-aligned action.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#sdgs" className="rounded-full bg-[#009EDB] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-white shadow-xl shadow-[#009EDB]/25 transition hover:-translate-y-1 hover:bg-slate-950">
                  See SDG impact
                </a>
                <a href="#systems" className="rounded-full border border-slate-300 bg-white px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-950 shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:border-[#009EDB]">
                  Explore systems
                </a>
                <a href="#collaborate" className="rounded-full border border-slate-950 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.22em] text-slate-950 transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white">
                  Collaborate
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["AI", "Decision intelligence"],
                  ["SDGs", "Development contribution"],
                  ["Leadership", "Youth empowerment"],
                ].map(([title, text]) => (
                  <Card key={title} className="p-5">
                    <p className="text-3xl font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{text}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="sdg-conic absolute -inset-4 rounded-[3rem] opacity-25 blur-xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/70">
                <div className="photo-frame aspect-[4/5] rounded-[2rem] bg-slate-100" aria-label="Richard Mensah professional portrait" />
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-4">
                  <SdgLogoMark className="h-20 w-20" />
                  <div className="rounded-2xl bg-white/90 px-4 py-3 text-right shadow-lg backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00689D]">Photo-ready</p>
                    <p className="mt-1 text-sm font-bold text-slate-950">Richard Mensah</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-slate-950/86 p-5 text-white shadow-xl backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
                    AI • Climate • Youth • Institutions
                  </p>
                  <p className="mt-2 text-lg font-black">Ghana → UK → Global impact</p>
                  <p className="mt-2 text-xs text-slate-300">Database signal: {databaseSignal}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="identity" className="scroll-mt-28 px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading eyebrow="Identity system" title="A personal brand that feels like a living institution, not a normal portfolio.">
              <p>
                The website now presents Richard as a thought leader in formation: technical enough
                for AI work, strategic enough for institutions, and human enough for leadership and
                youth transformation.
              </p>
            </SectionHeading>

            <div className="grid gap-5 md:grid-cols-3">
              {identityTimeline.map((item, index) => (
                <Card key={item.place} className="relative min-h-72 overflow-hidden">
                  <div className="sdg-band absolute inset-x-0 top-0 h-2" />
                  <p className="text-sm font-black text-[#009EDB]">0{index + 1}</p>
                  <h3 className="mt-8 text-2xl font-black text-slate-950">{item.place}</h3>
                  <p className="mt-4 text-lg font-bold leading-snug text-slate-800">{item.title}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="sdgs" className="scroll-mt-28 bg-slate-950 px-5 py-24 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">SDG logo + colour blend</p>
                <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  Sustainable Development Goals as the visual and strategic language.
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  The design blends SDG colours with the official SDG-blue feeling, then connects
                  each colour to Richard’s practical contribution through AI, training, climate
                  intelligence, institutional trust, and partnerships.
                </p>
                <SdgLogoMark className="mt-10 h-64 w-64 float-soft" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {priorityGoals.map((goal) => (
                  <div key={goal.code} className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur" style={{ borderColor: `${goal.color}66` }}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-black text-white" style={{ backgroundColor: goal.color }}>
                        {goal.code.replace("SDG ", "")}
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">{goal.code}</p>
                        <h3 className="text-lg font-black text-white">{goal.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{goal.contribution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">Full SDG spectrum</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
                {sdgColours.map((goal) => (
                  <div key={goal.number} className="rounded-2xl p-3 text-white shadow-lg" style={{ backgroundColor: goal.color }}>
                    <p className="text-xl font-black">{goal.number}</p>
                    <p className="mt-1 text-[0.68rem] font-bold leading-tight">{goal.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="scroll-mt-28 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Research & publications" title="The website is structured as a publishing engine for ideas, not just a CV." center>
              <p>
                Research areas are presented as future papers, public essays, institutional notes,
                and technical case studies that strengthen Richard’s authority over time.
              </p>
            </SectionHeading>

            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {researchPillars.map((pillar) => (
                <Card key={pillar.domain} className="relative overflow-hidden p-7">
                  <div className="absolute inset-x-0 top-0 h-2" style={{ backgroundColor: pillar.accent }} />
                  <div className="grid h-14 w-14 place-items-center rounded-2xl text-lg font-black text-white" style={{ backgroundColor: pillar.accent }}>
                    AI
                  </div>
                  <h3 className="mt-8 text-2xl font-black leading-tight text-slate-950">{pillar.domain}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.abstract}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="systems" className="scroll-mt-28 bg-white px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionHeading eyebrow="Projects as systems" title="Every project becomes a serious system narrative.">
                <p>
                  The framing is no longer “I built a model.” It is problem, approach, and impact:
                  the language institutions understand when they evaluate research, partnerships,
                  and innovation potential.
                </p>
              </SectionHeading>
              <Card className="data-grid-light p-8">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-[#00689D]">Core thesis</p>
                <p className="mt-4 text-3xl font-black leading-tight text-slate-950">
                  AI should make decisions clearer, institutions stronger, and communities more capable.
                </p>
              </Card>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {systems.map((system) => (
                <Card key={system.title} className="flex min-h-[34rem] flex-col overflow-hidden p-7">
                  <div className="mb-6 inline-flex w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white" style={{ backgroundColor: system.color }}>
                    {system.label}
                  </div>
                  <h3 className="text-2xl font-black leading-tight text-slate-950">{system.title}</h3>
                  <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
                    <p><span className="font-black text-slate-950">Problem: </span>{system.problem}</p>
                    <p><span className="font-black text-slate-950">Approach: </span>{system.approach}</p>
                    <p><span className="font-black text-slate-950">Impact: </span>{system.impact}</p>
                  </div>
                  <a href="#collaborate" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-[#00689D] transition hover:gap-3">
                    Discuss the system <span>→</span>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership" className="scroll-mt-28 px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading eyebrow="Leadership & influence" title="A platform for youth empowerment, institutions, and public thinking.">
              <p>
                Richard’s leadership story is emotional and strategic: build young people, build
                knowledge, build systems, and build partnerships that last beyond a single project.
              </p>
            </SectionHeading>

            <div className="space-y-4">
              {leadershipTracks.map((track, index) => (
                <Card key={track} className="flex items-start gap-5 p-5">
                  <span className="sdg-conic grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-black text-white shadow-lg">
                    {index + 1}
                  </span>
                  <p className="text-lg font-bold leading-8 text-slate-800">{track}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-5 py-24 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">Writing / thinking</p>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Publish ideas weekly. Build intellectual gravity.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                This section is designed to become Richard’s online knowledge system: essays,
                research notes, frameworks, and public reflections on AI, SDGs, inequality, climate,
                and leadership.
              </p>
            </div>
            <div className="grid gap-4">
              {writingIdeas.map((idea, index) => (
                <div key={idea} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#26BDE2]">Essay {index + 1}</p>
                  <h3 className="mt-3 text-xl font-black text-white">{idea}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Draft, publish, repurpose into talks, and connect back to research or system case studies.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="collaborate" className="scroll-mt-28 px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Contact + collaboration" title="I work with institutions, startups, and governments building the future with AI.">
                <p>
                  Use the collaboration desk for research partnerships, AI systems, institutional
                  training, youth programs, speaking, climate intelligence, and SDG-aligned
                  innovation.
                </p>
              </SectionHeading>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {priorityGoals.map((goal) => (
                  <div key={goal.code} className="rounded-2xl border bg-white p-4 text-sm font-bold text-slate-700 shadow-lg shadow-slate-200/70" style={{ borderColor: `${goal.color}44` }}>
                    <span className="font-black" style={{ color: goal.color }}>{goal.code}</span> — {goal.title}
                  </div>
                ))}
              </div>
            </div>

            <CollaborationForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Richard Mensah. AI, leadership, and SDG impact.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#sdgs" className="font-semibold transition hover:text-[#009EDB]">SDGs</a>
            <a href="#research" className="font-semibold transition hover:text-[#009EDB]">Research</a>
            <a href="#collaborate" className="font-semibold transition hover:text-[#009EDB]">Collaborate</a>
          </div>
        </div>
      </footer>
    </>
  );
}
