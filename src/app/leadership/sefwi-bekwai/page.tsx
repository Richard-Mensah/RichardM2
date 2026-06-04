import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sefwi Bekwai Youth Movement | Richard Mensah",
  description: "The story of how Richard Mensah co-founded the Sefwi Bekwai Youth Movement, joined UNYA-Ghana Youth Parliament, and built the civic foundation that led to EGA Mentorship International.",
};

const CHURCH_PHOTOS = [
  { src: "/leadership/church-congregation-1.jpg", alt: "Church community congregation — Sefwi Bekwai" },
  { src: "/leadership/church-congregation-2.jpg", alt: "Church education and civic sensitisation" },
  { src: "/leadership/church-congregation-3.jpg", alt: "Church campaign engagement session" },
  { src: "/leadership/church-camp.jpg", alt: "Church camp and community education" },
  { src: "/leadership/church-campaign.jpg", alt: "Church campaign activities, Western North Region" },
  { src: "/leadership/church-campaign-activities.jpg", alt: "Community church campaign activities" },
];

const CHURCH_DENOMINATIONS = [
  { src: "/leadership/church-cac-bekwai.jpg", alt: "CAC Bekwai — Christ Apostolic Church" },
  { src: "/leadership/church-cop.jpg", alt: "Church of Pentecost (COP)" },
  { src: "/leadership/church-methodist.jpg", alt: "Methodist Church community session" },
  { src: "/leadership/church-1.jpg", alt: "Community church civic education" },
];

const BYM_PHOTOS = [
  { src: "/leadership/bym-team-1.jpg", alt: "Sefwi Bekwai Youth Movement — founding team" },
  { src: "/leadership/bym-community-1.jpg", alt: "BYM team and community gathering" },
  { src: "/leadership/bym-action-plan.jpg", alt: "BYM action planning session" },
  { src: "/leadership/bym-media-engagement.jpg", alt: "BYM media engagement on community project" },
  { src: "/leadership/bym-media-engagement-2.jpg", alt: "BYM media outreach engagement" },
  { src: "/leadership/bym-team-2.jpg", alt: "BYM team in the field" },
];

const UNYA_PHOTOS = [
  { src: "/leadership/unya-parliament-house.jpg", alt: "UNYA-Ghana Youth Parliament — Parliament House, Accra" },
  { src: "/leadership/unya-parliament-1.jpg", alt: "UNYA-Ghana Parliamentary engagement session" },
  { src: "/leadership/unya-parliament-7.jpg", alt: "UNYA Youth Parliament national gathering" },
  { src: "/leadership/unya-parliament-8.jpg", alt: "UNYA-Ghana Parliament activities" },
  { src: "/leadership/unya-parliament-9.jpg", alt: "UNYA Parliamentary representatives" },
  { src: "/leadership/unya-parliament-10.jpg", alt: "UNYA-Ghana national youth parliament session" },
  { src: "/leadership/unya-parliament-11.jpg", alt: "UNYA Youth Parliament engagement" },
  { src: "/leadership/unya-chief-visit.jpg", alt: "Visit to Paramount Chief of Sefwi Anhwiawso-Bibiani" },
];

const PEACE_PHOTOS = [
  { src: "/leadership/nussa-peace-campaign.jpg", alt: "NUSSA national peace campaign" },
  { src: "/leadership/peace-campaign.jpg", alt: "Peace campaign — Western North Region" },
  { src: "/leadership/wiawso-peace.jpg", alt: "Sefwi Wiawso peace campaign" },
  { src: "/leadership/peace-radio.jpg", alt: "Radio peace talk with regional media" },
  { src: "/leadership/wiawso-radio-tour.jpg", alt: "Western North Sefwi Wiawso radio tour with colleagues" },
  { src: "/leadership/bibiani-ncce.jpg", alt: "Working with Bibiani NCCE — civic education" },
  { src: "/leadership/sensitization-1.jpg", alt: "Community sensitisation programme" },
];

export default function SefwiBekwaiPage() {
  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-white/90 px-5 py-3 backdrop-blur md:px-8">
        <Link href="/leadership" className="text-sm font-bold text-[#4f8bff] hover:underline">
          ← Back to Leadership
        </Link>
        <Link href="/leadership/ega" className="text-sm font-bold text-[#a9bcdc] hover:text-[#4f8bff]">
          Next: EGA Mentorship →
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="/leadership/bym-media-engagement.jpg"
          alt="Sefwi Bekwai Youth Movement — media engagement"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-12 md:px-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4f8bff]">
            Sefwi Bekwai · Western North Region · Ghana
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
            Finding courage and purpose to empower youth.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Before the international platforms and the AI research, Richard spent years building
            civic identity through churches, community halls, and district assemblies across
            Ghana&apos;s Western North Region — learning that lasting change requires organised
            structure, not good intentions alone.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">

        {/* Section 1: Church Civic Education */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">1</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4f8bff]">
              2018–2019 · Western North Region
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Self church education and civic identity.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#a9bcdc]">
            Richard&apos;s civic journey began in churches across Sefwi Bekwai and the Western North
            Region — not as a recipient but as an organiser. He led sensitisation sessions on youth
            development, education, and community responsibility inside congregations that trusted him
            with their platforms. The Church of Pentecost, Methodist Church, CAC Bekwai, and others
            became the first institutions that gave him a room full of people and a message to deliver.
            This is where he learned to speak, to listen, and to build trust before asking for anything.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CHURCH_PHOTOS.map((photo, i) => (
              <div key={i} className="relative h-44 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHURCH_DENOMINATIONS.map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Peace Campaigns */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00689D] text-xs font-black text-white">2</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#00689D]">
              2019–2021 · Western North Region
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Peace campaigns, radio, and the NCCE.
          </h2>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <p className="text-base leading-8 text-[#a9bcdc]">
              Richard joined national peace campaigns under NUSSA, participated in radio peace talks
              with regional media across the Western North Region, and collaborated with Ghana&apos;s
              National Commission for Civic Education (NCCE) in Bibiani Anhwiaso. In a region where
              electoral tension and civic mistrust can derail development, building peace infrastructure
              is not peripheral — it is foundational. These campaigns connected Richard to district
              governance structures, regional media houses, and civic leaders who later became
              partners in his youth work.
            </p>
            <div className="flex flex-wrap gap-3">
              {["NUSSA Peace Campaign", "Regional Radio Tours", "Bibiani NCCE", "SDG 16"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-[#cdd9ee]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {PEACE_PHOTOS.map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: BYM Founding */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">3</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4f8bff]">
              2019 · Sefwi Bekwai District
            </p>
          </div>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
                Co-founding the Sefwi Bekwai Youth Movement.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#a9bcdc]">
                In 2019, Richard co-founded the Sefwi Bekwai Youth Movement (BYM) — a grassroots
                platform designed to organise, inform, and mobilise young people across the Sefwi
                Bekwai district of Ghana&apos;s Western North Region. BYM was built on a core
                conviction: informal gatherings don&apos;t produce lasting change. Only structured
                youth platforms with clear mandates, media presence, and institutional linkages do.
                BYM held community events, engaged regional media, and created space for youth voices
                in local development conversations. It later evolved into the Sefwi Bekwai Youth
                Parliament — with democratic processes and a formal mandate to engage the district
                assembly.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Youth Organising", "Media Engagement", "District Assembly", "Community Events", "Structured Advocacy"].map((tag) => (
                  <span key={tag} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BYM_PHOTOS.map((photo, i) => (
                <div key={i} className="relative h-44 overflow-hidden rounded-2xl">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: UNYA-Ghana */}
        <div className="mt-20 rounded-[2rem] bg-[#0B1F3A] p-8 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">4</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#7fb0ff]">
              2020 · National · Accra, Ghana
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            UNYA-Ghana Youth Parliament — Parliament House, Accra.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            Richard joined the United Nations Youth Association Ghana (UNYA-Ghana) Youth Parliament,
            representing Sefwi Bekwai and the Western North Region at the national level. He engaged
            with parliamentary processes at Parliament House in Accra, contributed to national youth
            policy discussions, and built cross-regional networks that connected local grassroots
            work to national governance structures. He also visited the Paramount Chief of Sefwi
            Anhwiawso-Bibiani — recognising that community development requires traditional authority
            as much as institutional legitimacy.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {UNYA_PHOTOS.slice(0, 4).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {UNYA_PHOTOS.slice(4).map((photo, i) => (
              <div key={i} className="relative h-40 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Bibiani Anhwiaso Parliament */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">5</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4f8bff]">
              2021 · Bibiani Anhwiaso District
            </p>
          </div>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image src="/leadership/bibiani-parliament-1.jpg" alt="Bibiani Anhwiaso Municipal Youth Parliament" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
                Bibiani Anhwiaso Municipal Youth Parliament.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#a9bcdc]">
                Elected to the Bibiani Anhwiaso Municipal Youth Parliament, Richard deepened his
                engagement with local government and district-level policy processes. This institutional
                fluency — understanding how district assemblies function, how motions are debated,
                how decisions filter into budgets and services — directly informed his later work on
                AI governance frameworks and accountability systems for community-led programmes.
                Local governance is where the abstract becomes real.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Ubuntu UEW Chapter */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#10B981] text-xs font-black text-white">6</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#10B981]">
              2021 · University of Education, Winneba
            </p>
          </div>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
                Forming the Ubuntu UEW Chapter.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#a9bcdc]">
                While studying at the University of Education, Winneba, Richard founded the Ubuntu
                UEW Chapter — a peer network grounded in the African philosophy of Ubuntu: &ldquo;I
                am because we are.&rdquo; The chapter created space for students to support each
                other through shared knowledge, collaborative study, and mutual accountability. This
                experience in peer-led learning systems became one of the structural models that
                later informed EGA Mentorship International&apos;s cohort-based programme design.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image src="/leadership/ubuntu-uew-chapter.jpg" alt="Ubuntu UEW Chapter founding" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Section 7: Visiting UN Organisations */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f8bff] text-xs font-black text-white">7</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4f8bff]">
              2021 · Accra, Ghana
            </p>
          </div>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-56 overflow-hidden rounded-2xl">
                <Image src="/leadership/un-org-pitch-1.jpg" alt="Visiting UN organisations in Accra to pitch youth empowerment ideas" fill className="object-cover" />
              </div>
              <div className="relative h-56 overflow-hidden rounded-2xl">
                <Image src="/leadership/un-org-pitch-2.jpg" alt="Meeting with UN organisations, Accra" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
                Visiting UN organisations to pitch youth empowerment ideas.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#a9bcdc]">
                In 2021, Richard travelled to Accra to visit UN organisations and international
                institutions — not as a delegate but as a young person with ideas and the confidence
                to present them. These visits to international offices demonstrated something important:
                the ideas Richard had been developing in Sefwi Bekwai&apos;s churches, community
                halls, and youth parliaments were coherent enough to present on a global stage.
                This moment of being received seriously — of having a conversation with international
                institutions — became a turning point. The world was bigger than the Western North
                Region, and it was accessible.
              </p>
            </div>
          </div>
        </div>

        {/* Lead-in to EGA */}
        <div className="mt-20 rounded-[2rem] bg-[#4f8bff] px-8 py-12 text-white">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
            What all of this built
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Every step in Sefwi Bekwai was preparation for EGA.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
            The church sensitisations taught communication. BYM taught structure and accountability.
            UNYA-Ghana taught how institutions work from the inside. The Ubuntu chapter taught
            peer learning. The UN organisation visits proved the ideas were globally relevant.
            Together, they gave Richard the conviction to build EGA Mentorship International —
            a programme designed to remove the friction between ambition and access for young
            Africans everywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/leadership/ega"
              className="rounded-full bg-white px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#4f8bff] transition hover:bg-white/5"
            >
              Explore EGA Mentorship →
            </Link>
            <Link
              href="/leadership/journey"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:border-white/60"
            >
              Download Full Journey PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
