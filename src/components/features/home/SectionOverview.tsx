"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEVELOPMENT_DATA as INITIAL_DEVELOPMENT_DATA, type DevelopmentDataRow } from "@/data/developmentData";
import TestimonialsSection from "./TestimonialsSection";

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
    detail: "Across Sefwi Bekwai, Ghana, and wider youth leadership communities.",
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


const GALLERY_THEN = [
  { src: "/leadership/church-congregation-2.jpg", caption: "Speaking at a church campaign, Sefwi Bekwai" },
  { src: "/community/winneba-sanitation-1.jpg",   caption: "Community volunteering in Winneba, 2019" },
  { src: "/community/teaching-class-1.jpg",       caption: "Free teaching during COVID-19 lockdown" },
];

const GALLERY_NOW = [
  { src: "/gallery/20240302_090453.jpg",      caption: "Leadership programme, Ghana 2024" },
  { src: "/leadership/conference-sochi.jpg",  caption: "International conference, Sochi Russia" },
  { src: "/gallery/FB_IMG_1746893901373.jpg", caption: "SDG advocacy session" },
];

export default function SectionOverview() {
  const [developmentData, setDevelopmentData] = useState<DevelopmentDataRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedMetric, setSelectedMetric] = useState<Metric>("Total");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
            Richard Mensah - Climate AI Scientist, Developer &amp; Human-Centred Systems Builder.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Richard is a Climate AI scientist with a deep interest in artificial intelligence, data
            science, natural language processing (NLP), and large language models (LLMs). He
            specialises in designing and building human-centred AI systems - technology that is
            not only technically rigorous but genuinely useful to the people who depend on it.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            As a full-stack developer, Richard bridges research and product - moving from model
            to interface, from data pipeline to deployed application. His work sits at the
            intersection of climate intelligence, responsible AI, and sustainable development,
            with a focus on communities and institutions across the Global South.
          </p>
        </div>

        <div>
          <SectionHeading eyebrow="Impact dashboard" title="The scale of the work, in numbers">
            <p>
              These figures are drawn from programme records and are self-reported. They are
              indicative of the reach of a decade of mentorship, training, and community work
              across Ghana and beyond, and are being formalised into a fuller monitoring record.
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">In the field</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
              This is what the numbers actually look like.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                Before any conference stage, scholarship placement, or AI system, there were
                church campaigns in Sefwi Bekwai, volunteer teaching during COVID-19 lockdowns,
                and sanitation drives in communities nobody was watching. That is where the
                work began.
              </p>
              <p>
                These photos tell that story. From the villages that shaped the mission, to the
                global rooms that the mission eventually reached. Every number on this page has
                a face behind it and a community that made it possible.
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

          <div className="grid grid-cols-2 gap-5">
            {/* Where it started */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-600">
                  Where it started
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {GALLERY_THEN.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-32 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 22vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                    <p className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[11px] font-semibold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.caption}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Where it led */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#0077FF]" />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#0077FF]">
                  Where it led
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {GALLERY_NOW.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-32 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 22vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                    <p className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[11px] font-semibold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.caption}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TestimonialsSection />
    </section>
  );
}
