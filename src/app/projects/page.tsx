import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SystemsSection from "@/components/features/systems/SystemsSection";
import SectionNav from "@/components/ui/SectionNav";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { PROJECT_CATEGORIES } from "@/constants";

export const metadata: Metadata = {
  title: "Projects | Richard Mensah",
  description:
    "AI systems, data science projects, climate innovation, and community initiatives by Richard Mensah, turning research into infrastructure and impact.",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <div className="flex-1">
        <SystemsSection />

        <div className="bg-slate-50 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Projects" title="Full project portfolio" center />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PROJECT_CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={cat.slug} className="group focus-visible:outline-none">
                  <Card className="relative flex h-52 flex-col overflow-hidden p-0 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-focus-visible:ring-2 group-focus-visible:ring-[#0077FF]">
                    <div className="absolute inset-0">
                      <Image
                        src={cat.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: cat.accent, opacity: 0.88 }}
                      />
                    </div>
                    <div className="relative z-10 flex flex-1 flex-col p-5">
                      <span
                        className="grid h-9 w-9 place-items-center rounded-lg bg-white/20 text-xs font-bold tracking-wide text-white ring-1 ring-white/30 backdrop-blur-sm"
                        aria-hidden="true"
                      >
                        {cat.icon}
                      </span>
                      <h2 className="mt-3 text-sm font-bold leading-snug text-white">{cat.label}</h2>
                      <p className="mt-1 flex-1 text-xs leading-5 text-white/75 line-clamp-3">
                        {cat.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-black text-white transition duration-300 group-hover:gap-2">
                        Explore <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionNav
        prev={{ label: "Research", href: "/research" }}
        next={{ label: "Leadership", href: "/leadership" }}
      />
    </div>
  );
}
