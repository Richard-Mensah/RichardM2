import Image from "next/image";
import Link from "next/link";
import {
  Database,
  GitBranch,
  Cpu,
  LineChart,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Leaf,
  Quote,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   Thesis data (encoded from the paper's actual figures and tables)
   ──────────────────────────────────────────────────────────────── */

const KEY_STATS = [
  { value: "6,282", label: "vehicle records" },
  { value: "12", label: "input variables" },
  { value: "0.9943", label: "best R² (Random Forest)" },
  { value: "2.35", label: "MAE (g/km)" },
];

const OBJECTIVES = [
  "Predict vehicle CO₂ emissions from engine size, cylinder count and fuel efficiency.",
  "Compare four ML algorithms: Linear Regression, Random Forest, KNN and SVR.",
  "Interpret model behaviour and identify the key features using SHAP values.",
  "Test whether extended attributes (fuel type, vehicle class, transmission) improve accuracy.",
];

const RESEARCH_QUESTIONS = [
  "How accurately can CO₂ emissions be predicted from engine size, cylinder count and fuel consumption?",
  "Which model gives the best balance of accuracy and interpretability?",
  "What is the relative influence of each vehicle feature on emissions?",
  "Do extra features such as fuel type and vehicle class meaningfully improve performance?",
];

const METHOD_STEPS = [
  { icon: Database, title: "Collect", text: "7,385 records from Natural Resources Canada, reduced to 6,282 after removing 1,103 duplicates." },
  { icon: GitBranch, title: "Preprocess", text: "One-hot encoding, feature selection, scaling, and an 80/20 split (5,025 train / 1,257 test)." },
  { icon: Cpu, title: "Train", text: "Linear Regression, Random Forest, KNN and SVR, plus Decision Tree, Gradient Boosting and XGBoost." },
  { icon: LineChart, title: "Evaluate", text: "Compared on MAE, RMSE, MAPE and R², with GridSearchCV tuning for Random Forest." },
  { icon: Sparkles, title: "Explain", text: "SHAP values for global and per-vehicle interpretability, so the predictions are readable." },
];

// Extended-feature models (Table 7). MAE in g/km (lower is better), R² shown as a chip.
const MODELS = [
  { name: "Random Forest", mae: 2.35, r2: 0.9943, best: true },
  { name: "Linear Regression", mae: 3.32, r2: 0.9882, best: false },
  { name: "KNN", mae: 5.1, r2: 0.9831, best: false },
  { name: "SVR", mae: 8.04, r2: 0.8952, best: false },
];

// Grouped SHAP importance (mean absolute SHAP value).
const SHAP_GROUPS = [
  { label: "Usage pattern", value: 49.7 },
  { label: "Fuel type", value: 6.8 },
  { label: "Vehicle class", value: 1.5 },
  { label: "Engine specs", value: 1.2 },
  { label: "Transmission", value: 0.9 },
];

// Individual feature direction (global SHAP, g/km). Positive raises CO₂, negative lowers it.
const SHAP_FEATURES = [
  { label: "Combined fuel consumption", value: 47.9, dir: "up" as const },
  { label: "Ethanol fuel (E85)", value: -5.4, dir: "down" as const },
  { label: "City fuel consumption", value: 1.35, dir: "up" as const },
  { label: "Highway fuel consumption", value: 0.5, dir: "up" as const },
  { label: "Engine size", value: 0.46, dir: "up" as const },
  { label: "Cylinder count", value: 0.24, dir: "up" as const },
];

const FUEL_TYPES = [
  { label: "Ethanol (E85)", value: 276 },
  { label: "Regular gasoline", value: 266 },
  { label: "Diesel", value: 235 },
  { label: "Premium gasoline", value: 235 },
  { label: "Natural gas", value: 213 },
];

const VEHICLE_CLASSES = [
  { label: "Luxury cars", value: 298.4 },
  { label: "Sports cars", value: 285.0 },
  { label: "Executive cars", value: 257.5 },
  { label: "Family cars", value: 234.3 },
];

const DATASET_MEAN = 251.16;

/* ────────────────────────────────────────────────────────────────
   Small chart primitives (pure CSS, no client JS)
   ──────────────────────────────────────────────────────────────── */

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-card px-4 py-3 text-center shadow-sm">
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  );
}

/** Horizontal bar. Colour follows the dataset mean: warm above, teal below. */
function EmissionBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  const above = value > DATASET_MEAN;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-right text-xs font-semibold text-body sm:w-32">{label}</span>
      <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-surface-muted">
        <div
          className="h-full rounded-md transition-all"
          style={{ width: `${pct}%`, backgroundColor: above ? "var(--color-gold)" : "var(--color-accent)" }}
        />
        {/* dataset mean marker */}
        <div
          className="absolute inset-y-0 w-px bg-ink/40"
          style={{ left: `${(DATASET_MEAN / max) * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="w-14 shrink-0 text-xs font-bold tabular-nums text-ink">{value}</span>
    </div>
  );
}

function GroupBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(3, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-right text-xs font-semibold text-body sm:w-32">{label}</span>
      <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-navy-900/40">
        <div
          className="h-full rounded-md bg-gradient-to-r from-accent to-accent-bright"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-12 shrink-0 text-xs font-bold tabular-nums text-on-dark">{value}</span>
    </div>
  );
}

function MaeBar({ name, mae, r2, best, max }: { name: string; mae: number; r2: number; best: boolean; max: number }) {
  const pct = Math.max(5, Math.min(100, (mae / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="flex w-32 shrink-0 items-center justify-end gap-1.5 text-right text-xs font-semibold text-body sm:w-36">
        {name}
        {best && <span className="rounded-full bg-accent-tint px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-accent-strong">best</span>}
      </span>
      <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-surface-muted">
        <div
          className="h-full rounded-md"
          style={{ width: `${pct}%`, backgroundColor: best ? "var(--color-accent)" : "var(--color-navy-700)" }}
        />
      </div>
      <span className="w-24 shrink-0 text-[11px] font-semibold tabular-nums text-muted">
        <span className="font-bold text-ink">{mae}</span> g/km · R² {r2}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────────── */

export default function ThesisPageSection() {
  const maeMax = Math.max(...MODELS.map((m) => m.mae));
  const groupMax = Math.max(...SHAP_GROUPS.map((g) => g.value));
  const fuelMax = 320;

  return (
    <div className="research-ground relative">
      <div className="pointer-events-none absolute inset-0 data-grid-light opacity-30" />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative px-5 pt-16 md:px-8 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-accent-strong">
            MSc thesis · Bangor University · 2026
          </p>
          <h1 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-ink md:text-[2.7rem]">
            Predicting vehicle CO₂ emissions with machine learning, and making the result something a buyer can actually use.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-body">
            For my MSc in Artificial Intelligence &amp; Data Science at Bangor University, I built and compared
            machine-learning models that predict a car&apos;s CO₂ emissions from its features, then used SHAP to make
            every prediction explainable. The goal was simple: turn a technical model into clear, evidence-based
            guidance for people choosing a lower-emission vehicle.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
            <span className="rounded-full bg-surface-muted px-3 py-1 text-ink-soft">Richard Mensah</span>
            <span className="text-line-strong">·</span>
            <span>School of Computer Science, Bangor University</span>
            <span className="text-line-strong">·</span>
            <span>Supervisor: Dr. Roggers Giddings</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {KEY_STATS.map((s) => (
              <StatChip key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          <div className="relative mt-10 h-52 overflow-hidden rounded-[1.75rem] ring-1 ring-line md:h-64">
            <Image
              src="/research/ai-climate-change-satellite.jpg"
              alt="Climate and emissions data visualised from above"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-5 py-4 text-white">
              <Leaf size={16} className="text-accent-soft" />
              <p className="text-xs font-semibold tracking-wide">
                Aligned with SDG 13, Climate Action, through consumer-level transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ───────────────────────────────────────────── */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">In short</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            What the study set out to do
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <p className="text-base leading-8 text-body">
              Road transport is responsible for roughly 16% of global CO₂ emissions, and light-duty vehicles make up a
              large share of that. Emissions data is increasingly published, but it is usually too technical for an
              ordinary buyer to act on. I set out to close that gap: build models accurate enough to be trusted, then
              make them transparent enough that a non-expert can see why a given car emits what it does. I used a
              public dataset of 6,282 Canadian vehicles, trained several models, and explained the best one with SHAP so
              the reasoning is visible, not hidden inside a black box.
            </p>
            <div className="rounded-[1.5rem] border border-line bg-surface-card p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">The gap I addressed</p>
              <p className="mt-3 text-sm leading-7 text-body">
                Most emissions tools are accurate but opaque, or simple but inaccurate. I aimed for both: high accuracy
                <span className="font-semibold text-ink"> and</span> interpretability that supports a real purchasing
                decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectives & research questions ────────────────────── */}
      <section className="px-5 pb-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.7rem] bg-navy-950 p-7 text-white">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-soft">Objectives</p>
              <ol className="mt-5 space-y-4">
                {OBJECTIVES.map((o, i) => (
                  <li key={o} className="flex gap-3 text-sm leading-7 text-on-dark-muted">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/10 text-[11px] font-black text-accent-soft">
                      {i + 1}
                    </span>
                    {o}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[1.7rem] border border-line bg-surface-card p-7 shadow-sm">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-strong">
                Research questions
              </p>
              <ol className="mt-5 space-y-4">
                {RESEARCH_QUESTIONS.map((q, i) => (
                  <li key={q} className="flex gap-3 text-sm leading-7 text-body">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent-tint text-[11px] font-black text-accent-strong">
                      {i + 1}
                    </span>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Data & methodology ─────────────────────────────────── */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">How I built it</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            Data and methodology
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-body">
            I worked with a public dataset from Natural Resources Canada, cleaned it, engineered features, and trained a
            spread of models before interpreting the strongest one. The pipeline moves from raw data to a prediction a
            person can understand.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {METHOD_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative rounded-2xl border border-line bg-surface-card p-5 shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-tint text-accent-strong">
                    <Icon size={18} />
                  </span>
                  <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-muted">
                    Step {i + 1}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ink">{step.title}</p>
                  <p className="mt-2 text-xs leading-6 text-body">{step.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Python 3.10", "pandas", "scikit-learn", "SHAP", "Jupyter", "Random Forest", "GridSearchCV"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Model performance ──────────────────────────────────── */}
      <section className="border-y border-line bg-surface-card px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Results</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            Which model predicted best
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-body">
            Random Forest came out on top, with an average error of just 2.35 g/km and an R² of 0.9943, near-perfect
            agreement between predicted and actual emissions. Lower bars are better.
          </p>
          <div className="mt-8 space-y-3">
            {MODELS.map((m) => (
              <MaeBar key={m.name} {...m} max={maeMax} />
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted">
            Mean absolute error on the extended feature set. XGBoost led the tree-only models at R² 0.9747; SVR was the
            weakest overall.
          </p>
        </div>
      </section>

      {/* ── SHAP: what drives emissions ────────────────────────── */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">Explainability</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            What actually drives a car&apos;s emissions
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-body">
            Using SHAP, I could measure how much each feature pushed a prediction up or down. One story dominates: how
            much fuel a car burns matters far more than its badge or its gearbox.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="rounded-[1.7rem] bg-navy-950 p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-accent-soft">
                Importance by feature group
              </p>
              <p className="mt-1 text-xs text-on-dark-muted">Mean absolute SHAP value</p>
              <div className="mt-6 space-y-3">
                {SHAP_GROUPS.map((g) => (
                  <GroupBar key={g.label} label={g.label} value={g.value} max={groupMax} />
                ))}
              </div>
              <p className="mt-5 text-xs leading-6 text-on-dark-muted">
                Usage pattern, how efficiently a car burns fuel, accounts for roughly 80 to 85% of the model&apos;s
                decision.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted">
                How individual features move a prediction
              </p>
              <div className="mt-5 space-y-2.5">
                {SHAP_FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface-card px-4 py-3 shadow-sm"
                  >
                    <span className="text-sm font-semibold text-ink">{f.label}</span>
                    <span
                      className={`flex items-center gap-1.5 text-sm font-bold tabular-nums ${
                        f.dir === "up" ? "text-gold" : "text-accent-strong"
                      }`}
                      style={f.dir === "up" ? { color: "var(--color-gold)" } : undefined}
                    >
                      {f.dir === "up" ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                      {f.value > 0 ? "+" : ""}
                      {f.value} g/km
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-muted">
                Ethanol (E85) is the one major feature that lowers predicted emissions. Everything else above pushes them
                up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Emissions patterns ─────────────────────────────────── */}
      <section className="border-y border-line bg-surface-card px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent-strong">The patterns</p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            Where the emissions concentrate
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "var(--color-gold)" }} /> above average
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: "var(--color-accent)" }} /> below average
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-px bg-ink/50" /> dataset mean ({DATASET_MEAN} g/km)
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-ink">Average CO₂ by fuel type (g/km)</p>
              <div className="mt-5 space-y-3">
                {FUEL_TYPES.map((f) => (
                  <EmissionBar key={f.label} label={f.label} value={f.value} max={fuelMax} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Average CO₂ by vehicle class (g/km)</p>
              <div className="mt-5 space-y-3">
                {VEHICLE_CLASSES.map((c) => (
                  <EmissionBar key={c.label} label={c.label} value={c.value} max={fuelMax} />
                ))}
              </div>
            </div>
          </div>

          {/* Extremes + cylinders */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">Highest emitters</p>
              <p className="mt-3 text-sm leading-7 text-body">
                Bugatti <span className="font-bold text-ink">522 g/km</span>, Lamborghini 402, SRT 389. Supercars emit
                nearly twice the dataset average.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">Lowest emitters</p>
              <p className="mt-3 text-sm leading-7 text-body">
                Hyundai Ioniq Electric and Kia Soul EV came in under{" "}
                <span className="font-bold text-accent-strong">100 g/km</span>.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">Cylinders</p>
              <p className="mt-3 text-sm leading-7 text-body">
                4-cylinder cars sit at 100 to 250 g/km; 8+ cylinders routinely pass 350; a 16-cylinder engine topped 500.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What it means for a buyer ──────────────────────────── */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[1.9rem] bg-navy-950 p-8 text-white md:p-12">
            <Quote size={28} className="text-accent-soft" />
            <h2 className="font-display mt-5 text-2xl font-bold leading-snug md:text-[1.9rem]">
              What this means if you are choosing a car
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-on-dark-muted">
              Instead of trusting a sticker or a marketing claim, you can see what really moves a car&apos;s emissions.
              Combined fuel consumption is by far the strongest signal, followed by fuel type. A smaller, more
              fuel-efficient engine, or an alternative fuel like ethanol, lowers the footprint far more than brand or
              transmission ever will. My contribution was not only an accurate model, but a transparent one a non-expert
              can actually read and act on.
            </p>
          </div>
        </div>
      </section>

      {/* ── SDG + ethics ───────────────────────────────────────── */}
      <section className="border-y border-line bg-surface-card px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-accent-strong">
              <Leaf size={16} />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em]">Sustainability &amp; ethics</p>
            </div>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
              Built for SDG 13, Climate Action
            </h2>
            <p className="mt-4 text-base leading-8 text-body">
              The work supports SDG 13 by making vehicle emissions transparent at the point of choice. I used only
              public, anonymised data, and analysed SHAP values across drivetrain and fuel categories to check for and
              reduce bias, so the guidance stays fair as well as accurate.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Public data", v: "Anonymised, openly published Canadian records." },
              { k: "Fairness", v: "SHAP checked across fuel and drivetrain groups." },
              { k: "Transparency", v: "Every prediction is explainable, not a black box." },
              { k: "Impact", v: "Lower-emission choices made easier for buyers." },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border border-line bg-surface p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-accent-strong">{c.k}</p>
                <p className="mt-2 text-sm leading-6 text-body">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Limitations & future work ──────────────────────────── */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.7rem] border border-line bg-surface-card p-7 shadow-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-muted">Limitations</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-body">
              {[
                "The data is Canadian only, so it may not generalise to other fuel mixes or regulations.",
                "Interaction effects beyond tree ensembles were not modelled explicitly.",
                "Real-world factors like vehicle age, maintenance and driving behaviour were not captured.",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.7rem] bg-navy-900 p-7 text-white">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-soft">Future work</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-on-dark-muted">
              {[
                "Add real-time telemetry or IoT sensor data for greater realism.",
                "Expand the dataset across regions and climates for broader generalisation.",
                "Combine deep learning with interpretable models to balance power and transparency.",
                "Extend to lifecycle CO₂, including manufacturing and disposal.",
              ].map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Supervision + CTA ──────────────────────────────────── */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.9rem] border border-line bg-surface-card shadow-sm">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[220px]">
              <Image
                src="/research/thought-leadership-speaking.jpg"
                alt="Richard Mensah in research and academic settings"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-7 md:p-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-strong">
                Supervision &amp; acknowledgement
              </p>
              <p className="mt-4 text-base leading-8 text-body">
                This research was completed under the supervision of Dr. Roggers Giddings at the School of Computer
                Science, Bangor University, whose guidance shaped the work throughout.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                The full paper is available on request. A downloadable copy will be added here soon.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-accent inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
                >
                  Request the paper
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/research/ai-data-science"
                  className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
                >
                  More research
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
