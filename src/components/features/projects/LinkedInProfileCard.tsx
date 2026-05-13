export default function LinkedInProfileCard() {
  return (
    <a
      href="https://www.linkedin.com/in/richard-mensah-ab8564190/"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-[#0A66C2]/20 bg-[#0A66C2]/5 p-5 transition hover:bg-[#0A66C2]/10 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73A1.77 1.77 0 1 1 6.5 3.2a1.77 1.77 0 0 1 0 3.53zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-black text-slate-950">Richard Mensah</p>
        <p className="text-xs text-slate-500">AI Researcher · Youth Leadership · Global Development</p>
      </div>
      <span className="text-xs font-black text-[#0A66C2]">View Profile →</span>
    </a>
  );
}
