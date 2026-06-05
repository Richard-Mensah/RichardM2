import Image from "next/image";
import { Users, Globe, ArrowRight, ArrowDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Phase = "community" | "global";
type Photo = { src: string; alt: string; caption: string };

const COMMUNITY: Photo[] = [
  { src: "/community/teaching-myself-kids.jpg", alt: "Richard with community school children", caption: "With the kids · 2020" },
  { src: "/community/teaching-kids.jpg", alt: "Richard surrounded by community children", caption: "Children's class · 2020" },
  { src: "/community/school-outreach-2.jpg", alt: "Richard teaching and empowering school youth", caption: "Teaching youth · Sefwi Bekwai" },
  { src: "/community/teaching-happy.jpg", alt: "Richard with a group of students on the field", caption: "With students · Sefwi Bekwai" },
];

const GLOBAL: Photo[] = [
  { src: "/leadership/cambridge-invite-1.jpg", alt: "Richard at the University of Cambridge", caption: "University of Cambridge" },
  { src: "/leadership/conference-sochi.jpg", alt: "Richard at an international conference in Sochi, Russia", caption: "Conference · Sochi, Russia" },
  { src: "/leadership/un-org-pitch-1.jpg", alt: "Richard at the United Nations Population Fund", caption: "UN Population Fund (UNFPA)" },
  { src: "/research/thought-leadership-speaking.jpg", alt: "Richard in dialogue with delegates at an international expo", caption: "Global expo · in dialogue" },
];

function Tile({ photo, phase }: { photo: Photo; phase: Phase }) {
  const isGlobal = phase === "global";
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md shadow-navy-950/10 ring-1 ring-line">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={72}
        sizes="(min-width: 1024px) 220px, 45vw"
        className="object-cover object-center transition duration-500 group-hover:scale-[1.05]"
      />
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[3px]",
          isGlobal ? "bg-[color:var(--color-gold)]" : "bg-accent"
        )}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-transparent px-2.5 pb-2 pt-6 text-[11px] font-semibold leading-tight text-white">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

function Cluster({
  photos,
  phase,
  label,
  align,
}: {
  photos: Photo[];
  phase: Phase;
  label: string;
  align: "left" | "right";
}) {
  const isGlobal = phase === "global";
  const Icon = isGlobal ? Globe : Users;
  return (
    <div className="w-full">
      <div
        className={cn(
          "mb-4 flex items-center gap-1.5",
          align === "right" ? "justify-start lg:justify-end" : "justify-start",
          isGlobal ? "text-[color:var(--color-gold)]" : "text-accent-strong"
        )}
      >
        <Icon size={15} className="shrink-0" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em]">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {photos.map((photo) => (
          <Tile key={photo.src} photo={photo} phase={phase} />
        ))}
      </div>
    </div>
  );
}

export default function JourneyShowcase() {
  return (
    <section className="border-b border-line bg-surface px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          center
          eyebrow="The journey"
          title="From the community to the global stage"
        >
          <p>
            The same mission in a wider room, from grassroots classrooms in Sefwi Bekwai to
            international stages, conferences and the United Nations.
          </p>
        </SectionHeading>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-7">
          <Cluster photos={COMMUNITY} phase="community" label="Rooted in communities" align="left" />

          {/* Journey connector */}
          <div className="flex items-center justify-center lg:h-full lg:pt-9">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent to-[color:var(--color-gold)] text-white shadow-lg shadow-navy-950/15">
              <ArrowDown size={20} className="lg:hidden" />
              <ArrowRight size={20} className="hidden lg:block" />
            </span>
          </div>

          <Cluster photos={GLOBAL} phase="global" label="On global stages" align="right" />
        </div>
      </div>
    </section>
  );
}
