import Image from "next/image";
import SdgLogoMark from "@/components/ui/SdgLogoMark";
import { PRIORITY_GOALS, SDG_COLOURS } from "@/constants";

export default function SdgsSection() {
  return (
    <section id="sdgs" className="relative bg-slate-950 px-5 py-28 text-white md:px-8">
      <div className="sdg-band absolute inset-x-0 top-0 h-[3px]" />

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
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] hover:shadow-xl"
                style={{ borderLeftColor: goal.color, borderLeftWidth: "4px" }}
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

        {/* Field stories */}
        <div className="mt-20">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
            Where the SDGs live — in the field
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Before the research and the international conferences, Richard&apos;s SDG work was
            hands-on and local — teaching children during lockdowns, cleaning communities, advocating
            for peace. This is where it began.
          </p>

          {/* Story 1: SDG 4 — Teaching */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: "#C5192D" }}>4</span>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">SDG 4 · Quality Education</p>
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">
                Free teaching during COVID-19 lockdowns.
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                When schools closed across Ghana during the COVID-19 pandemic, Richard organised
                free volunteer teaching sessions in communities across the Sefwi Bekwai area —
                holding night classes and morning sessions to ensure children kept learning.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["DonkorKrom", "Barkokrom", "Sukuuku", "Lowcost", "Bekwai Township", "Apemkrom"].map((loc) => (
                  <span
                    key={loc}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/teaching-night.jpg" alt="Night community teaching session during COVID-19" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/teaching-morning.jpg" alt="Morning classes during COVID-19 school lockdown" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/teaching-donsokrom.jpg" alt="Donsokrom community teaching session" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/teaching-donkorkrom.jpg" alt="Night teaching at Donkorkrom" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Story 2: SDG 6 & 11 — Sanitation */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3 lg:order-first">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/sanitation-sweeping.jpg" alt="Sweeping with community residents — DansoKrom" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/sanitation-after.jpg" alt="After the cleaning exercise — DansoKrom community" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/sanitation-dansokrom-1.jpg" alt="Community sanitation exercise — DansoKrom, Sefwi Bekwai" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/community/sanitation-surano-1.jpg" alt="Sefwi Bekwai Surano B sanitation exercise" fill className="object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: "#26BDE2" }}>6</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: "#FD9D24" }}>11</span>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">SDG 6 & 11 · Sanitation & Communities</p>
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">
                Community sanitation and cleaning exercises.
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Richard organised and participated in community sanitation exercises across the
                Sefwi Bekwai area — mobilising residents to clean public spaces, streets, and
                community areas that had been neglected. These hands-on drives demonstrated
                that development begins with the dignity of clean, healthy environments.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Donkorkrom", "Donsokrom", "Surano B", "Chira", "Western North Region"].map((loc) => (
                  <span
                    key={loc}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-slate-300"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Story 3: SDG 16 — Peace */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: "#00689D" }}>16</span>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">SDG 16 · Peace & Strong Institutions</p>
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">
                Peace campaigns and civic education.
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Richard contributed to peace advocacy and civic education across the Western North
                Region — national peace campaigns with NUSSA, radio peace talks with regional
                media, and civic education with Ghana&apos;s National Commission for Civic Education
                (NCCE) in Bibiani Anhwiaso. In communities where electoral tension and civic
                mistrust can derail development, building peace infrastructure is foundational.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 h-52 overflow-hidden rounded-2xl">
                <Image src="/leadership/peace-campaign.jpg" alt="National peace campaign — youth advocates, Western North Region" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <p className="absolute bottom-4 left-5 text-xs font-black uppercase tracking-[0.18em] text-[#26BDE2]">
                  National Peace Campaign · Western North Region
                </p>
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/leadership/peace-radio.jpg" alt="Radio peace talk — community dialogue" fill className="object-cover" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <Image src="/leadership/peace-regional.jpg" alt="Regional peace campaign activities" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#26BDE2]">
            Full SDG spectrum
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
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
