import type { Metadata } from "next";
import IdentitySection from "@/components/features/identity/IdentitySection";
import SectionNav from "@/components/ui/SectionNav";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Richard Mensah | AI Researcher, Youth Leader, SDG Advocate",
  description:
    "Learn about Richard Mensah — AI & Data Scientist, youth leader, and SDG advocate working across Ghana, the UK, and global innovation networks.",
};

const ABOUT_SECTIONS = [
  { id: "biography", title: "Biography", description: "Richard Mensah is an AI & Data Scientist, youth leader, and sustainable development advocate. Rooted in Ghana and expanded through UK-based academic and professional experience, his work bridges data intelligence, climate action, and youth empowerment across the Global South and beyond." },
  { id: "vision", title: "Vision & Mission", description: "To build AI and data systems that make institutions more responsive, equitable, and effective — serving communities from the Global South to global innovation networks, aligned with the United Nations Sustainable Development Goals." },
  { id: "journey", title: "Leadership Journey", description: "From community youth organizing in Ghana to leading AI-driven programmes in the UK and internationally, Richard's leadership journey spans local governance, academic research, and cross-border development partnerships." },
  { id: "conferences", title: "Conferences & Summits", description: "Richard has participated in and spoken at conferences and summits on AI, climate change, youth leadership, and the SDGs — contributing perspectives from the Global South to global policy conversations." },
  { id: "media", title: "Media & Speaking", description: "Available for speaking engagements, podcast interviews, panel discussions, and media features on AI in Africa, climate intelligence, youth empowerment, and sustainable development." },
  { id: "cv", title: "CV / Resume", description: "Download or view Richard Mensah's full curriculum vitae covering academic qualifications, professional experience, research, publications, and leadership roles." },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <IdentitySection />

        <div className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="About" title="Know Richard better" center />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {ABOUT_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <Card className="h-full p-8">
                    <h2 className="text-xl font-black text-slate-950">{s.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{s.description}</p>
                  </Card>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionNav
        prev={{ label: "Home", href: "/" }}
        next={{ label: "Research", href: "/research" }}
      />
    </div>
  );
}
