import SectionHeading from "@/components/ui/SectionHeading";
import CollaborationForm from "./CollaborationForm";
import { PRIORITY_GOALS } from "@/constants";

export default function CollaborationSection() {
  return (
    <section id="collaborate" className="scroll-mt-28 px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Contact + collaboration"
            title="I work with institutions, startups, and governments building the future with AI."
          >
            <p>
              Use the collaboration desk for research partnerships, AI systems, institutional
              training, youth programs, speaking, climate intelligence, and SDG-aligned innovation.
            </p>
          </SectionHeading>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRIORITY_GOALS.map((goal) => (
              <div
                key={goal.code}
                className="rounded-2xl border bg-white p-4 text-sm font-bold text-slate-700 shadow-lg shadow-slate-200/70"
                style={{ borderColor: `${goal.color}44` }}
              >
                <span className="font-black" style={{ color: goal.color }}>
                  {goal.code}
                </span>{" "}
                — {goal.title}
              </div>
            ))}
          </div>
        </div>

        <CollaborationForm />
      </div>
    </section>
  );
}
