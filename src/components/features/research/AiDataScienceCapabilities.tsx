const CAPABILITIES = [
  { icon: "ML", label: "Machine Learning", accent: "#4f8bff" },
  { icon: "NLP", label: "Natural Language Processing", accent: "#4f8bff" },
  { icon: "PM", label: "Predictive Modeling", accent: "#4f8bff" },
  { icon: "XAI", label: "Explainable AI", accent: "#4f8bff" },
  { icon: "DD", label: "Decision Dashboards", accent: "#4f8bff" },
  { icon: "FS", label: "Full-Stack AI Systems", accent: "#4f8bff" },
  { icon: "GS", label: "Geospatial Analytics", accent: "#2f6bea" },
  { icon: "LLM", label: "Large Language Models", accent: "#4f8bff" },
];

export default function AiDataScienceCapabilities() {
  return (
    <div className="mt-12">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8aa0c4]">Technical capabilities</p>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.label}
            className="flex flex-col items-center glass rounded-2xl p-5 text-center shadow-sm"
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black text-white"
              style={{ backgroundColor: cap.accent }}
            >
              {cap.icon}
            </div>
            <p className="mt-3 text-xs font-bold leading-4 text-[#cdd9ee]">{cap.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
