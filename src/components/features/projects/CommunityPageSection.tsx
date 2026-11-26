import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const INITIATIVES = [
  {
    title: "EGA Mentorship Platform",
    description: "A structured mentorship and opportunity management platform for the EGA Mentorship International programme, tracking cohort progress, skill development, and scholarship outcomes.",
    accent: "#3a78e0",
    icon: "🎓",
    link: "/leadership/ega",
    linkLabel: "About EGA",
  },
  {
    title: "BYM Digital Tools",
    description: "Data collection, member management, and communication tools built to support the Bekwai Youth Movement's community mobilisation, sanitation drives, and education campaigns.",
    accent: "#4f8bff",
    icon: "📱",
    link: "/leadership/sefwi-bekwai",
    linkLabel: "About BYM",
  },
  {
    title: "Community Data for Sefwi Bekwai",
    description: "Grassroots data collection and analysis work documenting water access, sanitation conditions, and educational barriers in Sefwi Bekwai to inform local advocacy and resource allocation.",
    accent: "#2f6bea",
    icon: "📊",
    link: "/leadership/community",
    linkLabel: "Community Work",
  },
];

export default function CommunityPageSection() {
  return (
    <div>

      {/* Initiatives */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Initiatives" title="Three areas of community technology" />
          <div className="mt-10 flex flex-col gap-6">
            {INITIATIVES.map((init) => (
              <Card key={init.title} className="p-6 md:p-8" style={{ borderLeft: `4px solid ${init.accent}` }}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                  <span className="mt-1.5 inline-block h-2.5 w-10 shrink-0 rounded-full" style={{ backgroundColor: init.accent }} aria-hidden="true" />
                  <div className="flex-1">
                    <h3 className="text-base font-black text-ink">{init.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-body">{init.description}</p>
                  </div>
                  <Link
                    href={init.link}
                    className="shrink-0 text-xs font-black transition hover:gap-2"
                    style={{ color: init.accent }}
                  >
                    {init.linkLabel} →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image strip */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="From the field" title="Community work in pictures" center />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { src: "/community/teaching-class-1.jpg", caption: "Free community classes, COVID-19 lockdown" },
              { src: "/community/winneba-sanitation-1.jpg", caption: "Sanitation volunteering, Winneba" },
              { src: "/leadership/bym-team-1.jpg", caption: "BYM team, Sefwi Bekwai" },
            ].map((img) => (
              <div key={img.src} className="relative overflow-hidden rounded-xl">
                <div className="relative h-52">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <p className="mt-2 text-xs text-muted">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-transparent px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-black leading-tight text-ink">
            Community work taught Richard what technology can and cannot do.
          </p>
          <p className="mt-4 text-sm leading-7 text-body">
            Before data science, there were sanitation drives, late-night teaching sessions, and motorbike rides into communities without clean water. The technical tools built since then are shaped by that experience of what communities actually need, not what technology wants to offer them.
          </p>
          <Link
            href="/about/leadership-journey"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-accent-strong transition hover:gap-3"
          >
            Read the journey →
          </Link>
        </div>
      </section>
    </div>
  );
}
