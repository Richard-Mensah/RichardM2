import SdgLogoMark from "@/components/ui/SdgLogoMark";
import { PRIORITY_GOALS, SDG_COLOURS } from "@/constants";

export default function SdgsSection() {
  return (
    <section id="sdgs" className="scroll-mt-28 bg-slate-950 px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#26BDE2]">
              SDG logo + colour blend
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Sustainable Development Goals as the visual and strategic language.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              The design blends SDG colours with the official SDG-blue feeling, then connects each
              colour to Richard&apos;s practical contribution through AI, training, climate
              intelligence, institutional trust, and partnerships.
            </p>
            <SdgLogoMark className="mt-10 h-64 w-64 float-soft" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
                style={{ borderColor: `${goal.color}66` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-black text-white"
                    style={{ backgroundColor: goal.color }}
                  >
                    {goal.code.replace("SDG ", "")}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">
                      {goal.code}
                    </p>
                    <h3 className="text-lg font-black text-white">{goal.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{goal.contribution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
            Full SDG spectrum
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
            {SDG_COLOURS.map((goal) => (
              <div
                key={goal.number}
                className="rounded-2xl p-3 text-white shadow-lg"
                style={{ backgroundColor: goal.color }}
              >
                <p className="text-xl font-black">{goal.number}</p>
                <p className="mt-1 text-[0.68rem] font-bold leading-tight">{goal.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
