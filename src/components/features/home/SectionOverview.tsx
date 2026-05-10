import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const IMPACT_STATS = [
  {
    value: "120+",
    label: "people assisted for study abroad",
    detail:
      "Guidance across applications, statements, documents, decisions, and 35+ fully funded scholarship pathways.",
  },
  {
    value: "10+",
    label: "years of volunteerism, community development and youth leadership",
    detail:
      "Consistent service through youth mobilisation, community programmes, mentoring, advocacy, and leadership development.",
  },
  { value: "2,500+", label: "youth impacted", detail: "Through training, mentorship, digital literacy, and leadership programmes." },
  { value: "180+", label: "youth leaders empowered", detail: "Across S/Bekwai, Ghana, and wider youth leadership communities." },
  { value: "65+", label: "global mentors networked", detail: "Mentors, professionals, researchers, founders, and civic leaders." },
  { value: "8", label: "countries travelled", detail: "Personal growth, conference exposure, and cross-cultural learning." },
] as const;

const MONTHLY_DEVELOPMENT = [
  { month: "Jan", inPerson: 2, virtual: 5 },
  { month: "Feb", inPerson: 3, virtual: 4 },
  { month: "Mar", inPerson: 5, virtual: 6 },
  { month: "Apr", inPerson: 4, virtual: 7 },
  { month: "May", inPerson: 6, virtual: 5 },
  { month: "Jun", inPerson: 7, virtual: 8 },
  { month: "Jul", inPerson: 5, virtual: 9 },
  { month: "Aug", inPerson: 6, virtual: 7 },
  { month: "Sep", inPerson: 8, virtual: 10 },
  { month: "Oct", inPerson: 7, virtual: 8 },
  { month: "Nov", inPerson: 9, virtual: 11 },
  { month: "Dec", inPerson: 6, virtual: 9 },
] as const;

const TESTIMONIALS = [
  {
    name: "Scholarship Applicant",
    role: "Study abroad mentee",
    quote:
      "Richard helped me understand my story, refine my documents, and approach the scholarship process with confidence.",
  },
  {
    name: "Youth Leader",
    role: "S/Bekwai leadership programme",
    quote:
      "The mentorship gave me practical direction, stronger public speaking, and the courage to lead a community initiative.",
  },
  {
    name: "AI Training Participant",
    role: "Digital skills learner",
    quote:
      "The sessions made AI and data feel useful for real problems, not just theory. I left with skills I could practice immediately.",
  },
] as const;

const GALLERY_FEATURES = [
  { src: "/gallery/20240604_134602.jpg", alt: "Richard Mensah at a leadership event" },
  { src: "/gallery/20240305_142937.jpg", alt: "Richard Mensah at a youth development engagement" },
  { src: "/gallery/FB_IMG_1746893901373.jpg", alt: "Richard Mensah in an SDG advocacy moment" },
] as const;

function buildLinePoints(values: number[]) {
  const width = 640;
  const height = 230;
  const paddingX = 42;
  const paddingTop = 28;
  const paddingBottom = 44;
  const maxValue = 12;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  return values
    .map((value, index) => {
      const x = paddingX + (chartWidth / (values.length - 1)) * index;
      const y = paddingTop + chartHeight - (value / maxValue) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function SectionOverview() {
  const inPersonPoints = buildLinePoints(MONTHLY_DEVELOPMENT.map((item) => item.inPerson));
  const virtualPoints = buildLinePoints(MONTHLY_DEVELOPMENT.map((item) => item.virtual));

  return (
    <section className="bg-[#F8FBFF]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#005BDB]">Welcome</p>
          <div className="relative mt-4 min-h-[440px] overflow-hidden rounded-[1.5rem] bg-slate-100">
            <Image
              src="/Rich1.png"
              alt="Richard Mensah"
              fill
              className="object-contain object-center"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950 md:text-4xl">
            Building intelligence, leadership, and opportunity into one impact system.
          </h2>
        </div>

        <div>
          <SectionHeading eyebrow="Impact dashboard" title="Personal growth, youth empowerment, and global reach">
            <p>
              This home section now focuses on the measurable story: study abroad support,
              scholarships, youth leadership, global mentors, travel exposure, and monthly
              development through conferences, trainings, summits, and virtual programmes.
            </p>
          </SectionHeading>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
              >
                <p className="text-4xl font-black text-[#005BDB]">{stat.value}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-slate-950">
                  {stat.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-950 px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Monthly development"
              title="Conferences, trainings, summits, and virtual programmes"
              dark
            >
              <p>
                Placeholder metrics showing how personal development can be tracked month by month.
                Replace the numbers with your real attendance data when ready.
              </p>
            </SectionHeading>
            <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.18em]">
              <span className="rounded-full bg-[#00A6FF]/15 px-4 py-2 text-[#62E8FF]">
                In-person
              </span>
              <span className="rounded-full bg-[#FCC30B]/15 px-4 py-2 text-[#FCC30B]">
                Virtual
              </span>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 md:p-6">
            <svg viewBox="0 0 640 230" className="h-auto w-full" role="img" aria-label="Monthly personal development line chart">
              {[0, 1, 2, 3].map((line) => (
                <line
                  key={line}
                  x1="42"
                  x2="598"
                  y1={28 + line * 52}
                  y2={28 + line * 52}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
              ))}
              <polyline
                points={inPersonPoints}
                fill="none"
                stroke="#00A6FF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />
              <polyline
                points={virtualPoints}
                fill="none"
                stroke="#FCC30B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />
              {MONTHLY_DEVELOPMENT.map((item, index) => {
                const x = 42 + (556 / (MONTHLY_DEVELOPMENT.length - 1)) * index;
                return (
                  <text key={item.month} x={x} y="210" textAnchor="middle" fill="rgba(255,255,255,0.62)" fontSize="13" fontWeight="700">
                    {item.month}
                  </text>
                );
              })}
            </svg>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {MONTHLY_DEVELOPMENT.map((item) => (
                <div key={item.month} className="rounded-xl bg-white/[0.06] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{item.month}</p>
                  <p className="mt-2 text-sm text-white/75">
                    <span className="font-black text-[#62E8FF]">{item.inPerson}</span> in-person
                  </p>
                  <p className="text-sm text-white/75">
                    <span className="font-black text-[#FCC30B]">{item.virtual}</span> virtual
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="In the field" title="Images that show the work around the metrics">
              <p>
                The home page now uses gallery moments to support the story visually: leadership
                rooms, community engagements, SDG advocacy, and practical youth development.
              </p>
            </SectionHeading>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="rounded-full bg-[#0077FF] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-[#0077FF]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
                View gallery
              </Link>
              <Link
                href="/opportunities"
                className="rounded-full border border-slate-300 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:border-[#0077FF] hover:text-[#0077FF]"
              >
                Kofiever
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {GALLERY_FEATURES.map((image, index) => (
              <div
                key={image.src}
                className={index === 0 ? "relative col-span-2 h-72 overflow-hidden rounded-2xl" : "relative h-56 overflow-hidden rounded-2xl"}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Testimonials" title="Dummy stories from people assisted">
            <p>
              These are placeholder testimonials so the layout is ready. Replace the names, photos,
              and quotes with real people when you have permission to publish them.
            </p>
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#0077FF] to-[#62E8FF] text-sm font-black text-white">
                    RM
                  </div>
                  <div>
                    <p className="font-black text-slate-950">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">&quot;{testimonial.quote}&quot;</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
