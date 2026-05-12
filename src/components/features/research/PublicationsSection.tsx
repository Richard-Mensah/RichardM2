const PUBLICATIONS = [
  {
    type: "Working Paper",
    year: "2024",
    title: "Climate Intelligence for Community Resilience: An AI-Assisted Framework for Adaptation Planning in Sub-Saharan Africa",
    authors: "Mensah, R.",
    venue: "Working paper — open for collaboration",
    abstract:
      "This paper proposes a framework for translating satellite-derived climate signals into community-readable risk narratives using machine learning and geospatial analytics. The approach is designed for low-resource settings where data science capacity is limited but climate risk is acute.",
    tags: ["Climate AI", "SDG 13", "Global South", "NLP"],
    accent: "#3F7E44",
  },
  {
    type: "Essay",
    year: "2024",
    title: "Large Language Models and the Promise of Multilingual AI for Development",
    authors: "Mensah, R.",
    venue: "Thought leadership — Richard Mensah Blog",
    abstract:
      "Explores how LLMs can be adapted for multilingual African contexts, with a focus on low-resource languages and the design considerations needed to ensure these systems serve rather than exclude communities on the margins of the global digital economy.",
    tags: ["LLMs", "NLP", "SDG 4", "Multilingual AI"],
    accent: "#009EDB",
  },
  {
    type: "Policy Note",
    year: "2024",
    title: "Responsible AI for the Global South: Institutional Readiness, Ethics, and Governance Gaps",
    authors: "Mensah, R.",
    venue: "Policy brief — under review",
    abstract:
      "This policy note examines the structural gaps that make AI governance frameworks developed in the Global North unsuitable for direct application in Sub-Saharan Africa and South Asia. It proposes a locally-grounded ethics and accountability model aligned with the UN SDG agenda.",
    tags: ["AI Ethics", "Policy", "SDG 16", "Governance"],
    accent: "#00689D",
  },
  {
    type: "Research Note",
    year: "2023",
    title: "Predictive Analytics for Youth Programme Outcomes: A Data-Driven Approach to Measuring Social Impact",
    authors: "Mensah, R.",
    venue: "Internal research note — EGA Mentorship International",
    abstract:
      "Documents a methodology for tracking, measuring, and predicting youth programme outcomes using structured data from mentorship sessions, scholarship applications, and community engagement records. Demonstrates that data-driven programme management can double measurable impact within a single cohort cycle.",
    tags: ["Data Science", "SDG 4", "SDG 17", "Youth Development"],
    accent: "#FCC30B",
  },
  {
    type: "Working Paper",
    year: "2023",
    title: "Human-Centred AI Design Principles for Development Contexts",
    authors: "Mensah, R.",
    venue: "Working paper — open for review",
    abstract:
      "Proposes a set of design principles for AI systems intended for deployment in development contexts, drawing on human-computer interaction research, participatory design theory, and field experience building tools for communities with diverse literacy levels and device constraints.",
    tags: ["Human-Centred AI", "Full-Stack", "Design", "SDG 9"],
    accent: "#FD6925",
  },
  {
    type: "Essay",
    year: "2023",
    title: "The Future of AI in Africa Is Institutional, Not Just Technical",
    authors: "Mensah, R.",
    venue: "Public essay — Richard Mensah Blog",
    abstract:
      "Argues that AI adoption in Africa will be determined less by access to models and more by whether institutions — universities, ministries, NGOs — are structured to adopt, govern, and maintain intelligent systems. Outlines what institutional AI readiness looks like in practice.",
    tags: ["AI in Africa", "Institutions", "SDG 9", "SDG 16"],
    accent: "#A21942",
  },
] as const;

const TAG_COLOURS: Record<string, string> = {
  "Climate AI": "#3F7E44",
  "SDG 13": "#3F7E44",
  "Global South": "#009EDB",
  NLP: "#009EDB",
  LLMs: "#009EDB",
  "SDG 4": "#C5192D",
  "Multilingual AI": "#009EDB",
  "AI Ethics": "#00689D",
  Policy: "#00689D",
  "SDG 16": "#00689D",
  Governance: "#00689D",
  "Data Science": "#FCC30B",
  "SDG 17": "#19486A",
  "Youth Development": "#FCC30B",
  "Human-Centred AI": "#FD6925",
  "Full-Stack": "#FD6925",
  Design: "#FD6925",
  "SDG 9": "#FD6925",
  "AI in Africa": "#A21942",
  Institutions: "#A21942",
  "SDG 8": "#A21942",
};

export default function PublicationsSection() {
  return (
    <div id="publications" className="mt-24">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0077FF]">Publications</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
        Research contributions to global development.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
        These working papers, policy notes, and public essays represent Richard&apos;s ongoing
        intellectual contributions at the intersection of AI, climate change, and sustainable
        development. Several are open for collaboration, peer review, and institutional
        partnership.
      </p>

      <div className="mt-10 space-y-6">
        {PUBLICATIONS.map((pub) => (
          <article
            key={pub.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl" style={{ backgroundColor: pub.accent }} />
            <div className="pl-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: pub.accent }}
                >
                  {pub.type}
                </span>
                <span className="text-xs font-bold text-slate-400">{pub.year}</span>
              </div>

              <h3 className="mt-3 text-lg font-black leading-snug text-slate-950 md:text-xl">
                {pub.title}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-slate-500">
                {pub.authors} &mdash; <span className="italic">{pub.venue}</span>
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{pub.abstract}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `${TAG_COLOURS[tag] ?? "#0077FF"}44`,
                      color: TAG_COLOURS[tag] ?? "#0077FF",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm leading-7 text-slate-500">
        Interested in collaborating on research?{" "}
        <a href="/contact" className="font-black text-[#0077FF] underline decoration-[#0077FF]/30 underline-offset-4 transition hover:decoration-[#0077FF]">
          Get in touch
        </a>
        .
      </p>
    </div>
  );
}
