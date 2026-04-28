import SectionHeading from "@/components/ui/SectionHeading";
import { LEADERSHIP_TRACKS } from "@/constants";
import LeadershipAccordionClient from "./LeadershipAccordionClient";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="leadership-ground scroll-mt-28 px-5 py-28 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="Leadership & influence"
          title="A platform for youth empowerment, institutions, and public thinking."
          dark
        >
          <p>
            Richard&apos;s leadership story is emotional and strategic: build young people, build
            knowledge, build systems, and build partnerships that last beyond a single project.
          </p>
        </SectionHeading>

        <LeadershipAccordionClient tracks={LEADERSHIP_TRACKS} />
      </div>
    </section>
  );
}
