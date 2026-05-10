"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEVELOPMENT_DATA as INITIAL_DEVELOPMENT_DATA, type DevelopmentDataRow } from "@/data/developmentData";

const IMPACT_STATS = [
  {
    value: "120+",
    label: "People assisted for study abroad",
    detail: "Guidance through applications, statements, documents and decisions across 35+ fully funded scholarship pathways.",
  },
  {
    value: "10+",
    label: "Years of volunteerism and youth leadership",
    detail: "A decade of consistent service through youth mobilisation, community programmes, mentoring and advocacy.",
  },
  {
    value: "2,500+",
    label: "Youth impacted",
    detail: "Through training, mentorship, digital literacy and leadership programmes across Ghana and beyond.",
  },
  {
    value: "180+",
    label: "Youth leaders empowered",
    detail: "Across Sekyere Bekwai, Ghana, and wider youth leadership communities.",
  },
  {
    value: "65+",
    label: "Global mentors networked",
    detail: "Mentors, professionals, researchers, founders and civic leaders connected across the globe.",
  },
  {
    value: "8",
    label: "Countries travelled",
    detail: "Personal growth, conference exposure and cross-cultural learning across multiple continents.",
  },
] as const;

const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

type Metric = "Total" | "In-person" | "Virtual";

const TESTIMONIALS = [
  {
    name: "Ama Osei",
    role: "Women in Data Ghana participant",
    quote: "I came in not knowing how to apply for a fellowship. Richard sat with me, went through every section of the application, and helped me write a personal statement I was actually proud of. I got in. I still cannot believe it.",
    initials: "AO",
  },
  {
    name: "Samuel Nkrumah",
    role: "Youth Network Lead",
    quote: "Our community climate programme was struggling. Richard helped us redesign the structure, train our volunteers and measure outcomes properly. Within four months we had reached 120 young people. The change was night and day.",
    initials: "SN",
  },
  {
    name: "Amina Yusuf",
    role: "AI and Climate Change fellow",
    quote: "I had heard a lot about AI but had no idea where to start. The sessions with Richard were practical from day one. By the end my team had built a weather dashboard that actual farmers in our district were using.",
    initials: "AY",
  },
  {
    name: "Grace Mensah",
    role: "Scholarship recipient",
    quote: "Richard reviewed my personal statement three times without being asked. He caught things no one else noticed and pushed me to be specific about my goals. I got a fully funded offer. I keep telling people: find a mentor like this.",
    initials: "GM",
  },
  {
    name: "David Kwame",
    role: "Conference delegate",
    quote: "I was terrified to present at an international summit. Richard ran a preparation session with me, helped me rehearse questions, and connected me with two researchers I am still collaborating with today. That one summit changed my trajectory.",
    initials: "DK",
  },
  {
    name: "Esi Baah",
    role: "Community development facilitator",
    quote: "We had the energy but not the structure. Richard helped us build a proper curriculum, track participation and show funders the real numbers. We went from 20 active participants to 80 in one cohort. The impact was measurable.",
    initials: "EB",
  },
] as const;

const GALLERY_FEATURES = [
  { src: "/gallery/20240604_134602.jpg", alt: "Richard Mensah at a leadership event, June 2024" },
  { src: "/gallery/20240305_142937.jpg", alt: "Richard Mensah at a youth development engagement" },
  { src: "/gallery/FB_IMG_1746893901373.jpg", alt: "Richard Mensah at an SDG advocacy session" },
] as const;

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
    () => new Set(selectedMonth === "All" ? MONTH_ORDER : [selectedMonth]),
    [selectedMonth]
  );

  const filteredData = useMemo(
    () =>
      developmentData.filter(
        (row) => selectedYearsSet.has(row.year) && (selectedMonth === "All" || selectedMonthsSet.has(row.month))
      ),
    [developmentData, selectedMonthsSet, selectedMonth, selectedYearsSet]
  );

  const totalInPerson = useMemo(() => filteredData.reduce((sum, row) => sum + row.inPerson, 0), [filteredData]);
  const totalVirtual = useMemo(() => filteredData.reduce((sum, row) => sum + row.virtual, 0), [filteredData]);
  const totalProgrammes = useMemo(() => totalInPerson + totalVirtual, [totalInPerson, totalVirtual]);

  const summary = useMemo(
    () => ({ inPerson: totalInPerson, virtual: totalVirtual, total: totalProgrammes }),
    [totalInPerson, totalVirtual, totalProgrammes]
  );

  const chartData = filteredData;

  const POINTS = useMemo(() => {
    const width = 640;
    const height = 220;
    const paddingX = 44;
    const paddingTop = 24;
    const paddingBottom = 40;
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
      const selectedValue =
        selectedMetric === "In-person" ? row.inPerson : selectedMetric === "Virtual" ? row.virtual : row.inPerson + row.virtual;
      const y = paddingTop + chartHeight - (selectedValue / maxValue) * chartHeight;
      return { ...row, x, yTrend: y, total: row.inPerson + row.virtual, selectedValue };
    });
  }, [chartData, selectedMetric]);

  const yearSeries = useMemo(() => {
    const years = Array.from(selectedYearsSet).sort();
    const width = 640;
    const height = 220;
    const paddingX = 44;
    const paddingTop = 24;
    const paddingBottom = 40;
    const chartWidth = width - paddingX * 2;
    const chartHeight = height - paddingTop - paddingBottom;
    const maxValue = 14;

    return years.map((year, seriesIndex) => {
      const rows = (developmentData.length ? developmentData : INITIAL_DEVELOPMENT_DATA)
        .filter((row) => row.year === year && (selectedMonth === "All" || selectedMonthsSet.has(row.month)))
        .sort((a, b) => MONTH_ORDER.indexOf(a.month as (typeof MONTH_ORDER)[number]) - MONTH_ORDER.indexOf(b.month as (typeof MONTH_ORDER)[number]));

      const points = rows.map((row) => {
        const x = paddingX + (chartWidth / (MONTH_ORDER.length - 1)) * MONTH_ORDER.indexOf(row.month as (typeof MONTH_ORDER)[number]);
        const val = selectedMetric === "In-person" ? row.inPerson : selectedMetric === "Virtual" ? row.virtual : row.inPerson + row.virtual;
        const y = paddingTop + chartHeight - (val / maxValue) * chartHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });

      return { year, points, seriesIndex };
    });
  }, [selectedYearsSet, selectedMonthsSet, selectedMonth, selectedMetric, developmentData]);

  const highlightPoints = useMemo(() => {
    const categories = [
      { key: "aiData" as const, label: "AI and Data Science" },
      { key: "leadership" as const, label: "Leadership" },
      { key: "community" as const, label: "Community" },
      { key: "climate" as const, label: "Climate" },
    ];
    return categories.map((cat) => {
      const best = filteredData.reduce(
        (w, row) => (row[cat.key] > w.value ? { month: `${row.month} ${row.year}`, value: row[cat.key] } : w),
        { month: "N/A", value: -1 }
      );
      return { label: cat.label, month: best.month, value: best.value };
    });
  }, [filteredData]);

  const trendColor = selectedMetric === "In-person" ? "#62E8FF" : selectedMetric === "Virtual" ? "#FCC30B" : "#7AF8B7";

  const downloadCsv = () => {
    const rows = filteredData.length ? filteredData : developmentData.filter((row) => selectedYearsSet.has(row.year));
    const csv = [
      ["Year", "Month", "In person", "Online", "AI & Data", "Leadership", "Community", "Climate"],
      ...rows.map((row) => [row.year, row.month, String(row.inPerson), String(row.virtual), String(row.aiData), String(row.leadership), String(row.community), String(row.climate)]),
    ]
      .map((vals) => vals.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "development-data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/development-data");
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = (await response.json()) as DevelopmentDataRow[];
        setDevelopmentData(data);
      } catch {
        setDataError("Using local data.");
        setDevelopmentData(INITIAL_DEVELOPMENT_DATA);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const el = testimonialRef.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      if (!el) return;
      el.scrollLeft += 0.45;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="bg-[#F8FBFF]">

      {/* ── Welcome + Impact stats ───────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0077FF]">Welcome</p>
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
          <SectionHeading eyebrow="Impact dashboard" title="Real numbers behind the work">
            <p>
              Every figure here represents a real person, a real programme, or a real outcome.
              This is not a summary of ambition. It is a record of what has actually been done.
            </p>
          </SectionHeading>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
              >
                <p className="text-4xl font-black text-[#0077FF]">{stat.value}</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-slate-950">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Monthly development ───────────────────────────────────── */}
      <div className="bg-slate-950 px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">Monthly development</p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                How the work shows up month by month.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Each bar and data point here is attendance. Real conferences, real trainings, real summits
                attended in person and online. Filter by year, month, or metric to see the full picture.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 text-xs font-black uppercase tracking-[0.18em]">
              <span className="rounded-full bg-[#62E8FF]/15 px-4 py-2 text-[#62E8FF]">In-person</span>
              <span className="rounded-full bg-[#FCC30B]/15 px-4 py-2 text-[#FCC30B]">Virtual</span>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 md:p-6">

            {/* Controls row */}
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Year</p>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-[#62E8FF]"
                >
                  <option value="All">All years</option>
                  {availableYears.map((y) => (
                    <option key={y} value={y} className="bg-slate-950">{y}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Month</p>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-[#FCC30B]"
                >
                  <option value="All">All months</option>
                  {MONTH_ORDER.map((m) => (
                    <option key={m} value={m} className="bg-slate-950">{m}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">View</p>
                <div className="flex gap-1.5">
                  {(["Total", "In-person", "Virtual"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMetric(m)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
                        selectedMetric === m
                          ? "border-white bg-white text-slate-950"
                          : "border-slate-600 bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={downloadCsv}
                className="ml-auto rounded-xl border border-[#62E8FF]/40 bg-[#62E8FF]/10 px-5 py-2.5 text-sm font-bold text-[#62E8FF] transition hover:bg-[#62E8FF]/20"
              >
                Export CSV
              </button>
            </div>

            {/* Summary + chart */}
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 p-4">
                <svg viewBox="0 0 640 220" className="h-auto w-full" role="img" aria-label="Monthly attendance chart">
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="44" x2="596" y1={24 + i * 48} y2={24 + i * 48} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  ))}
                  {yearSeries.map((series) => (
                    <polyline
                      key={series.year}
                      points={series.points.join(" ")}
                      fill="none"
                      stroke={trendColor}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      strokeOpacity={series.seriesIndex === 0 ? 1 : 0.45}
                      strokeDasharray={series.seriesIndex === 0 ? undefined : "8 5"}
                    />
                  ))}
                  {POINTS.map((pt, i) => (
                    <g key={`pt-${pt.year}-${pt.month}`}>
                      <circle cx={pt.x} cy={pt.yTrend} r={hoveredIndex === i ? 8 : 5} fill={trendColor} opacity={hoveredIndex === i ? 1 : 0.85} />
                      <rect x={pt.x - 20} y="0" width="40" height="220" fill="transparent"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseMove={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    </g>
                  ))}
                  {POINTS.map((pt) => (
                    <text key={`lbl-${pt.year}-${pt.month}`} x={pt.x} y="208" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="600">
                      {pt.month}
                    </text>
                  ))}
                </svg>

                {hoveredIndex !== null && POINTS[hoveredIndex] && (
                  <div
                    className="pointer-events-none absolute z-10 rounded-xl border border-white/15 bg-slate-950/95 px-4 py-3 text-sm text-white shadow-xl"
                    style={{
                      left: Math.min(Math.max(POINTS[hoveredIndex].x - 80, 10), 500),
                      top: Math.min(Math.max(POINTS[hoveredIndex].yTrend - 80, 10), 130),
                      width: 170,
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      {POINTS[hoveredIndex].month} {POINTS[hoveredIndex].year}
                    </p>
                    <p className="mt-2 text-lg font-black text-white">
                      {POINTS[hoveredIndex].selectedValue} {selectedMetric === "Total" ? "total" : selectedMetric.toLowerCase()}
                    </p>
                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>{POINTS[hoveredIndex].inPerson} in-person</span>
                      <span>{POINTS[hoveredIndex].virtual} online</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-3 lg:flex-col lg:justify-center">
                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Total</p>
                  <p className="mt-2 text-3xl font-black text-white">{summary.total}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#62E8FF]">In-person</p>
                  <p className="mt-2 text-2xl font-black text-[#62E8FF]">{summary.inPerson}</p>
                </div>
                <div className="rounded-xl bg-slate-900 p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FCC30B]">Virtual</p>
                  <p className="mt-2 text-2xl font-black text-[#FCC30B]">{summary.virtual}</p>
                </div>
              </div>
            </div>

            {/* Peak month cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlightPoints.map((h) => (
                <div key={h.label} className="rounded-xl bg-slate-900 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#62E8FF]">{h.label}</p>
                  <p className="mt-3 text-xl font-black text-white">{h.month}</p>
                  <p className="mt-1 text-xs text-slate-500">Peak month recorded</p>
                </div>
              ))}
            </div>

            {!loadingData && !dataError && (
              <p className="mt-4 text-xs text-slate-600">{developmentData.length} records loaded</p>
            )}
            {dataError && <p className="mt-4 text-xs text-amber-400">{dataError}</p>}
          </div>
        </div>
      </div>

      {/* ── In the field ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">In the field</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              This is what the numbers actually look like.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Every statistic on this page has a face behind it. A young person who got into
                a university they never thought would accept them. A community group that finally
                had the tools to measure their own impact. A first-generation student who sat
                down in a workshop and left with a skill that changed what was possible for them.
              </p>
              <p>
                These photos are from that work. Leadership sessions in Ghana, community
                engagements, SDG advocacy moments, and the kind of in-between time that does not
                make headlines but is where the real work happens.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="rounded-full bg-[#0077FF] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-[#0077FF]/25 transition hover:-translate-y-0.5 hover:bg-slate-950"
              >
                View full gallery
              </Link>
              <Link
                href="/opportunities"
                className="rounded-full border border-slate-300 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:border-[#0077FF] hover:text-[#0077FF]"
              >
                Kofiever opportunities
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {GALLERY_FEATURES.map((image, index) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 h-72" : "h-52"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Testimonials ───────────────────────────────────────── */}
        <div className="mt-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">Testimonials</p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
            In their own words.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            These are not edited summaries. They are real accounts from people who went through
            the programmes, applied for the scholarships, built the projects, and came out the
            other side with something tangible to show for it.
          </p>

          <div
            ref={testimonialRef}
            className="mt-8 flex gap-5 overflow-hidden pb-4"
            style={{ scrollBehavior: "auto" }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
              <article
                key={`${t.name}-${index}`}
                className="inline-block min-w-[340px] max-w-[340px] rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 whitespace-normal"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0077FF] to-[#62E8FF] text-sm font-black text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-slate-950">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">{t.quote}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
