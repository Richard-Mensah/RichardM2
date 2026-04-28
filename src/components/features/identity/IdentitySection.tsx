import Image from "next/image";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { IDENTITY_TIMELINE } from "@/constants";

export default function IdentitySection() {
  return (
    <section id="identity" className="scroll-mt-28 px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Identity system"
          title="A personal brand that feels like a living institution, not a normal portfolio."
        >
          <p>
            The website presents Richard as a thought leader in formation: technical enough for AI
            work, strategic enough for institutions, and human enough for leadership and youth
            transformation.
          </p>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {IDENTITY_TIMELINE.map((item, index) => (
            <Card key={item.place} className="relative min-h-72 overflow-hidden">
              <div className="sdg-band absolute inset-x-0 top-0 h-2" />
              <p className="text-sm font-black text-[#009EDB]">0{index + 1}</p>
              <h3 className="mt-8 text-2xl font-black text-slate-950">{item.place}</h3>
              <p className="mt-4 text-lg font-bold leading-snug text-slate-800">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>

              {index === 2 && (
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                    <Image
                      src="/my image.jpg"
                      alt="Richard Mensah — global impact"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <p className="text-xs font-bold leading-tight text-slate-500">
                    Cross-border<br />impact builder
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
