"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEVELOPMENT_DATA as INITIAL_DEVELOPMENT_DATA, type DevelopmentDataRow } from "@/data/developmentData";

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

const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

type Metric = "Total" | "In-person" | "Virtual";

const TESTIMONIALS = [
  {
    name: "Ama Osei",
    role: "Women in Data Ghana participant",
    quote:
      "Richard's mentorship helped me land my first data science fellowship. His guidance made the application process clear and gave me the confidence to speak about my impact.",
  },
  {
    name: "Samuel Nkrumah",
    role: "Youth Network Lead",
    quote:
      "The leadership training accelerated our community programme. We reached 120 young people with climate workshops and digital skills in just four months.",
  },
  {
    name: "Amina Yusuf",
    role: "AI & Climate Change fellow",
    quote:
      "Learning applied AI with Richard changed how I design projects. My team built a local weather-mapping dashboard for smallholder farmers.",
  },
  {
    name: "Grace Mensah",
    role: "Scholarship recipient",
    quote:
      "The study abroad coaching helped me refine my statement, secure an offer, and prepare for an interview from day one.",
  },
  {
    name: "David Kwame",
    role: "Conference delegate",
    quote:
      "The summit preparation meant I could present with confidence, connect with international mentors, and join a research collaboration.",
  },
  {
    name: "Esi Baah",
    role: "Community development facilitator",
    quote:
      "Our youth empowerment programme grew from 20 to 80 active participants after Richard helped us shape the curriculum and measure impact.",
  },
] as const;

const GALLERY_FEATURES = [
  { src: "/gallery/20240604_134602.jpg", alt: "Richard Mensah at a leadership event" },
  { src: "/gallery/20240305_142937.jpg", alt: "Richard Mensah at a youth development engagement" },
  { src: "/gallery/FB_IMG_1746893901373.jpg", alt: "Richard Mensah in an SDG advocacy moment" },
] as const;

function buildLinePoints(values: number[], maxValue = 14) {
  const width = 640;
  const height = 230;
  const paddingX = 42;
  const paddingTop = 28;
  const paddingBottom = 44;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  return values.map((value, index) => {
    const x = paddingX + (chartWidth / (values.length - 1)) * index;
    const y = paddingTop + chartHeight - (value / maxValue) * chartHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
}

export default function SectionOverview() {
  const [developmentData, setDevelopmentData] = useState<DevelopmentDataRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedMetric, setSelectedMetric] = useState<Metric>("Total");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);

  const availableYears = useMemo(
    () =>
      Array.from(
        new Set(
          (developmentData.length ? developmentData : INITIAL_DEVELOPMENT_DATA).map((row) => row.year)
        )
      ).sort(),
    [developmentData]
  );

  const selectedYearsSet = useMemo(
    () => new Set(selectedYear === "All" ? availableYears : [selectedYear]),
    [availableYears, selectedYear]
  );
  const selectedMonthsSet = useMemo(
    () => new Set(selectedMonth === "All" ? MONTH_ORDER : [selectedMonth]), [selectedMonth]);

  const filteredData = useMemo(
    () =>
      developmentData.filter(
        (row) => selectedYearsSet.has(row.year) && (selectedMonth === "All" || selectedMonthsSet.has(row.month))
      ),
    [developmentData, selectedMonthsSet, selectedMonth, selectedYearsSet]
  );

  const totalInPerson = useMemo(
    () => filteredData.reduce((sum, row) => sum + row.inPerson, 0),
    [filteredData]
  );
  const totalVirtual = useMemo(
    () => filteredData.reduce((sum, row) => sum + row.virtual, 0),
    [filteredData]
  );
  const totalProgrammes = useMemo(() => totalInPerson + totalVirtual, [totalInPerson, totalVirtual]);

  const chartData = filteredData;

  const summary = useMemo(
    () => ({
      inPerson: totalInPerson,
      virtual: totalVirtual,
      total: totalProgrammes,
    }),
    [totalInPerson, totalVirtual, totalProgrammes]
  );

  const highlightPoints = useMemo(() => {
    const categories = [
      { key: "aiData", category: "AI & Data Science" },
      { key: "leadership", category: "Leadership & Conferences" },
      { key: "community", category: "Community Development" },
      { key: "climate", category: "AI & Climate Change" },
    ] as const;

    return categories.map((category) => {
      const best = filteredData.reduce(
        (winner, row) => {
          if (row[category.key] > winner.value) {
            return { month: `${row.month} ${row.year}`, value: row[category.key] };
          }
          return winner;
        },
        { month: "N/A", value: -1 }
      );
      return { category: category.category, month: best.month, value: best.value };
    });
  }, [filteredData]);

  const POINTS = useMemo(() => {
    const width = 640;
    const height = 230;
    const paddingX = 42;
    const paddingTop = 28;
    const paddingBottom = 44;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingTop - paddingBottom;
    const selectedValues = chartData.map((row) => {
      if (selectedMetric === "In-person") return row.inPerson;
      if (selectedMetric === "Virtual") return row.virtual;
      return row.inPerson + row.virtual;
    });
    const maxValue = Math.max(14, ...selectedValues, 0);

    return chartData.map((row, index) => {
      const month = row.month as (typeof MONTH_ORDER)[number];
      const monthIndex = MONTH_ORDER.indexOf(month);
      const x = paddingX + (chartWidth / (MONTH_ORDER.length - 1)) * monthIndex;
      const selectedValue = selectedMetric === "In-person" ? row.inPerson : selectedMetric === "Virtual" ? row.virtual : row.inPerson + row.virtual;
      const yTrend = paddingTop + chartHeight - (selectedValue / maxValue) * chartHeight;
      return { ...row, x, yTrend, total: row.inPerson + row.virtual, selectedValue };
    });
  }, [chartData, selectedMetric]);

  const yearSeries = useMemo(() => {
    const years = Array.from(selectedYearsSet).sort();
    const width = 640;
    const height = 230;
    const paddingX = 42;
    const paddingTop = 28;
    const paddingBottom = 44;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingTop - paddingBottom;
    const maxValue = 14;

    return years.map((year) => {
      const rows = (developmentData.length ? developmentData : INITIAL_DEVELOPMENT_DATA)
        .filter(
          (row) =>
            row.year === year &&
            (selectedMonth === "All" || selectedMonthsSet.has(row.month))
        )
        .sort(
          (a, b) =>
            MONTH_ORDER.indexOf(a.month as (typeof MONTH_ORDER)[number]) -
            MONTH_ORDER.indexOf(b.month as (typeof MONTH_ORDER)[number])
        );

      const selectedPoints = rows.map((row) => {
        const x = paddingX + (chartWidth / (MONTH_ORDER.length - 1)) * MONTH_ORDER.indexOf(row.month as (typeof MONTH_ORDER)[number]);
        const selectedValue =
          selectedMetric === "In-person"
            ? row.inPerson
            : selectedMetric === "Virtual"
            ? row.virtual
            : row.inPerson + row.virtual;
        const y = paddingTop + chartHeight - (selectedValue / maxValue) * chartHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });

      return { year, selectedPoints };
    });
  }, [selectedYearsSet, selectedMonthsSet, selectedMonth, selectedMetric]);

  const trendColor = selectedMetric === "In-person" ? "#62E8FF" : selectedMetric === "Virtual" ? "#FCC30B" : "#7AF8B7";
  const trendLabel = selectedMetric === "Total" ? "Total programmes" : selectedMetric;

  const downloadCsv = () => {
    const rows = filteredData.length ? filteredData : developmentData.filter((row) => selectedYearsSet.has(row.year));
    const csv = [
      ["Year", "Month", "In person", "Online", "AI & Data Science", "Leadership & Conferences", "Community Development", "AI & Climate Change"],
      ...rows.map((row) => [
        row.year,
        row.month,
        String(row.inPerson),
        String(row.virtual),
        String(row.aiData),
        String(row.leadership),
        String(row.community),
        String(row.climate),
      ]),
    ]
      .map((values) => values.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "development-data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/development-data");
        if (!response.ok) {
          throw new Error(`Failed to load development data: ${response.status}`);
        }

        const data = (await response.json()) as DevelopmentDataRow[];
        setDevelopmentData(data);
      } catch (error) {
        console.error(error);
        setDataError("Unable to load development data from the backend.");
        setDevelopmentData(INITIAL_DEVELOPMENT_DATA);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const element = testimonialRef.current;
    if (!element) return;
    let animationFrame = 0;
    const step = () => {
      if (!element) return;
      element.scrollLeft += 0.4;
      if (element.scrollLeft >= element.scrollWidth / 2) {
        element.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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
          <SectionHeading eyebrow="Impact dashboard" title="A senior-engineered impact pulse for programmes and partnerships">
            <p>
              Built to show the real story behind every cohort, this dashboard combines attendance,
              mentorship, leadership development, and climate-focused learning into a single insight layer.
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
            <SectionHeading eyebrow="Monthly development" title="Programme attendance, in-person vs virtual, and outcome momentum" dark>
              <p>
                This executive view surfaces trend lines for total programmes, in-person operations,
                and virtual engagement — with CSV export for reporting and investment discussions.
              </p>
            </SectionHeading>
            <div>
              {dataError ? (
                <p className="text-sm text-amber-300">{dataError}</p>
              ) : (
                <p className="text-sm text-slate-300">
                  {loadingData ? "Loading development data from backend…" : `${developmentData.length} records loaded`}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.18em]">
              <span className="rounded-full bg-[#00A6FF]/15 px-4 py-2 text-[#62E8FF]">In-person</span>
              <span className="rounded-full bg-[#FCC30B]/15 px-4 py-2 text-[#FCC30B]">Virtual</span>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 md:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Year</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                        className="w-full rounded-3xl border border-slate-600 bg-slate-950/90 px-4 py-3 text-sm font-black text-white outline-none transition focus:border-[#62E8FF] focus:ring-2 focus:ring-[#62E8FF]/20"
                      >
                        <option value="All">All years</option>
                        {availableYears.map((year) => (
                          <option key={year} value={year} className="bg-slate-950 text-white">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Months</p>
                  <div className="mt-3 relative">
                    <select
                      value={selectedMonth}
                      onChange={(event) => setSelectedMonth(event.target.value)}
                      className="w-full rounded-3xl border border-slate-600 bg-slate-950/90 px-4 py-3 text-sm font-black text-white outline-none transition focus:border-[#FCC30B] focus:ring-2 focus:ring-[#FCC30B]/20"
                    >
                      <option value="All">All months</option>
                      {MONTH_ORDER.map((month) => (
                        <option key={month} value={month} className="bg-slate-950 text-white">
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Metric</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {( ["Total", "In-person", "Virtual"] as const ).map((metric) => (
                      <button
                        key={metric}
                        type="button"
                        onClick={() => setSelectedMetric(metric)}
                        className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                          selectedMetric === metric
                            ? "border-white bg-white text-slate-950"
                            : "border-slate-600 bg-slate-900/40 text-slate-300"
                        }`}
                      >
                        {metric}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{trendLabel} trend over selected months and years.</p>
                </div>
                <button
                  type="button"
                  onClick={downloadCsv}
                  className="rounded-3xl border border-[#62E8FF] bg-[#62E8FF] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#62E8FF]/90"
                >
                  Download CSV
                </button>
              </div>

              <div className="rounded-3xl bg-slate-900/90 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Summary</p>
                <p className="mt-4 text-3xl font-black text-white">{summary.total}</p>
                <p className="mt-2 text-slate-300">Total programmes attended</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">In-person attended</p>
                    <p className="mt-2 text-2xl font-black text-[#62E8FF]">{summary.inPerson}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Virtual attended</p>
                    <p className="mt-2 text-2xl font-black text-[#FCC30B]">{summary.virtual}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-4">
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
                {yearSeries.map((series, index) => (
                  <polyline
                    key={`series-${series.year}`}
                    points={series.selectedPoints.join(" ")}
                    fill="none"
                    stroke={trendColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="5"
                    strokeOpacity={index === 0 ? 1 : 0.5}
                    strokeDasharray={index === 0 ? "0" : "8 6"}
                  />
                ))}
                {POINTS.map((point, index) => (
                  <g key={`${point.year}-${point.month}`}> 
                    <circle cx={point.x} cy={point.yTrend} r="6" fill={trendColor} />
                    <rect
                      x={point.x - 22}
                      y="0"
                      width="44"
                      height="230"
                      fill="transparent"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseMove={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                  </g>
                ))}
                {POINTS.map((point) => (
                  <text
                    key={`label-${point.year}-${point.month}`}
                    x={point.x}
                    y="212"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.62)"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {point.month}
                  </text>
                ))}
              </svg>

              {hoveredIndex !== null && POINTS[hoveredIndex] && (
                <div
                  className="pointer-events-none absolute z-10 rounded-3xl border border-white/15 bg-slate-950/95 px-4 py-3 text-sm text-white shadow-xl shadow-black/50"
                  style={{
                    left: `${Math.min(Math.max(POINTS[hoveredIndex].x - 90, 20), 520)}px`,
                    top: `${Math.min(Math.max(POINTS[hoveredIndex].yTrend - 90, 20), 140)}px`,
                    width: 190,
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    {POINTS[hoveredIndex].month} {POINTS[hoveredIndex].year}
                  </p>
                  <p className="mt-2 text-lg font-black text-white">In-person {POINTS[hoveredIndex].inPerson}</p>
                  <p className="text-sm text-slate-400">Online {POINTS[hoveredIndex].virtual}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Live and virtual programme totals for this month.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highlightPoints.map((highlight) => (
                <div key={highlight.category} className="rounded-3xl bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#62E8FF]">{highlight.category}</p>
                  <p className="mt-4 text-2xl font-black text-white">{highlight.month}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Month with the highest recorded development in this area.
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
          <SectionHeading eyebrow="Testimonials" title="Real impact stories from people supported">
            <p>
              These stories reflect real experiences from learners, leaders, and emerging professionals
              whose study support, AI training, and community development programmes were guided by Richard Mensah.
            </p>
          </SectionHeading>

          <div
            ref={testimonialRef}
            className="mt-8 flex gap-5 overflow-hidden whitespace-nowrap pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="inline-block min-w-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#0077FF] to-[#62E8FF] text-sm font-black text-white">
                    {testimonial.name.split(" ").map((part) => part[0]).join("")}
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
