const CAPABILITIES = [
  { icon: "ML", label: "Machine Learning", accent: "#009EDB" },
  { icon: "NLP", label: "Natural Language Processing", accent: "#0077FF" },
  { icon: "PM", label: "Predictive Modeling", accent: "#009EDB" },
  { icon: "XAI", label: "Explainable AI", accent: "#0077FF" },
  { icon: "DD", label: "Decision Dashboards", accent: "#009EDB" },
  { icon: "FS", label: "Full-Stack AI Systems", accent: "#0077FF" },
  { icon: "GS", label: "Geospatial Analytics", accent: "#3F7E44" },
  { icon: "LLM", label: "Large Language Models", accent: "#009EDB" },
];

export default function AiDataScienceCapabilities() {
  return (
    <div className="mt-12">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">Technical capabilities</p>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.label}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
              style={{ backgroundColor: cap.accent }}
            >
              {cap.icon}
            </div>
            <p className="mt-3 text-xs font-bold leading-4 text-slate-700">{cap.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
