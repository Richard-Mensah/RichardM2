const ROW_A = [
  {
    name: "Ama Osei",
    role: "Women in Data Ghana participant",
    quote:
      "I came in not knowing how to apply for a fellowship. Richard sat with me, went through every section of the application, and helped me write a personal statement I was actually proud of. I got in. I still cannot believe it.",
    initials: "AO",
    accent: "#62E8FF",
  },
  {
    name: "Samuel Nkrumah",
    role: "Youth Network Lead",
    quote:
      "Our community climate programme was struggling. Richard helped us redesign the structure, train our volunteers and measure outcomes properly. Within four months we had reached 120 young people. The change was night and day.",
    initials: "SN",
    accent: "#7AF8B7",
  },
  {
    name: "Amina Yusuf",
    role: "AI and Climate Change fellow",
    quote:
      "I had heard a lot about AI but had no idea where to start. The sessions with Richard were practical from day one. By the end my team had built a weather dashboard that actual farmers in our district were using.",
    initials: "AY",
    accent: "#0077FF",
  },
  {
    name: "Kweku Asante",
    role: "Digital skills trainee",
    quote:
      "Before the programme I could not confidently use a spreadsheet. Twelve weeks later I was presenting a data dashboard to my entire department. Richard made it feel achievable at every step.",
    initials: "KA",
    accent: "#FCC30B",
  },
] as const;

const ROW_B = [
  {
    name: "Grace Mensah",
    role: "Scholarship recipient",
    quote:
      "Richard reviewed my personal statement three times without being asked. He caught things no one else noticed and pushed me to be specific about my goals. I got a fully funded offer. I keep telling people: find a mentor like this.",
    initials: "GM",
    accent: "#FCC30B",
  },
  {
    name: "David Kwame",
    role: "Conference delegate",
    quote:
      "I was terrified to present at an international summit. Richard ran a preparation session with me, helped me rehearse questions, and connected me with two researchers I am still collaborating with today. That summit changed my trajectory.",
    initials: "DK",
    accent: "#62E8FF",
  },
  {
    name: "Esi Baah",
    role: "Community development facilitator",
    quote:
      "We had the energy but not the structure. Richard helped us build a proper curriculum, track participation and show funders the real numbers. We went from 20 active participants to 80 in one cohort. Measurable impact.",
    initials: "EB",
    accent: "#7AF8B7",
  },
  {
    name: "Nana Appiah",
    role: "Leadership programme graduate",
    quote:
      "The mentorship was not just career advice — it was a whole systems shift in how I thought about my potential. I left with a roadmap, a network, and the confidence to actually execute it.",
    initials: "NA",
    accent: "#0077FF",
  },
] as const;

type CardProps = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
};

function TestimonialCard({ name, role, quote, initials, accent }: CardProps) {
  return (
    <article className="relative mx-3 flex w-[340px] flex-shrink-0 flex-col rounded-2xl border border-white/[0.07] bg-[#0D1B2E] p-6 shadow-2xl shadow-black/40">
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${accent}80, transparent 90%)` }}
      />
      <div
        className="select-none text-5xl font-black leading-none"
        style={{ color: accent, opacity: 0.22 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p className="mt-2 flex-1 text-sm leading-[1.8] text-slate-300">{quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <div
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-xs font-black text-white"
          style={{ background: `linear-gradient(135deg, ${accent}50, ${accent}18)`, border: `1px solid ${accent}40` }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-black text-white">{name}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{role}</p>
        </div>
        <div className="ml-auto flex gap-0.5 text-[#FCC30B]" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-xs">★</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const rowA = [...ROW_A, ...ROW_A];
  const rowB = [...ROW_B, ...ROW_B];

  return (
    <div className="relative overflow-hidden bg-[#060D1A] px-0 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, rgba(0,119,255,0.09) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(98,232,255,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto mb-12 max-w-7xl px-5 md:px-8">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#62E8FF]">
          Testimonials
        </p>
        <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
          In their own words.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          Real accounts from people who went through the programmes, applied for scholarships,
          built projects, and came out the other side with something tangible to show for it.
        </p>
      </div>

      <div className="marquee-fade overflow-hidden">
        <div className="marquee-left flex py-2">
          {rowA.map((t, i) => (
            <TestimonialCard key={`a-${i}`} {...t} />
          ))}
        </div>
      </div>

      <div className="marquee-fade mt-4 overflow-hidden">
        <div className="marquee-right flex py-2">
          {rowB.map((t, i) => (
            <TestimonialCard key={`b-${i}`} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}
