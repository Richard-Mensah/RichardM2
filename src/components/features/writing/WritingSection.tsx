import { WRITING_IDEAS } from "@/constants";

export default function WritingSection() {
  return (
    <section className="bg-slate-950 px-5 py-24 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">
            Writing / thinking
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Publish ideas weekly. Build intellectual gravity.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            This section is designed to become Richard&apos;s online knowledge system: essays,
            research notes, frameworks, and public reflections on AI, SDGs, inequality, climate,
            and leadership.
          </p>
        </div>

        <div className="grid gap-4">
          {WRITING_IDEAS.map((idea, index) => (
            <div key={idea} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#26BDE2]">
                Essay {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-black text-white">{idea}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Draft, publish, repurpose into talks, and connect back to research or system case
                studies.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
