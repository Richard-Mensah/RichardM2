import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { LEADERSHIP_TRACKS } from "@/constants";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="scroll-mt-28 px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Leadership & influence"
          title="A platform for youth empowerment, institutions, and public thinking."
        >
          <p>
            Richard&apos;s leadership story is emotional and strategic: build young people, build
            knowledge, build systems, and build partnerships that last beyond a single project.
          </p>
        </SectionHeading>

        <div className="space-y-4">
          {LEADERSHIP_TRACKS.map((track, index) => (
            <Card key={track} className="flex items-start gap-5 p-5">
              <span className="sdg-conic grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-black text-white shadow-lg">
                {index + 1}
              </span>
              <p className="text-lg font-bold leading-8 text-slate-800">{track}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
