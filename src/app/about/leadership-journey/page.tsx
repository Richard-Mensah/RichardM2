import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionNav from "@/components/ui/SectionNav";

export const metadata: Metadata = {
  title: "Leadership Journey | Richard Mensah",
  description:
    "The personal origin story behind Richard Mensah's leadership: riding into communities without clean water, volunteer teaching during COVID-19, sanitation drives, and the journey that built EGA Mentorship International.",
};

const WATER_IMAGES = [
  { src: "/community/water-crisis-3.jpg",  caption: "Visiting a community with no clean water, Sefwi Bekwai area" },
  { src: "/community/water-crisis-5.jpg",  caption: "Communities sharing water with animals due to scarcity" },
  { src: "/community/water-crisis-6.jpg",  caption: "Documenting water access conditions" },
  { src: "/community/water-crisis-9.jpg",  caption: "The realities that rarely made it into any report" },
] as const;

const SANITATION_IMAGES = [
  { src: "/community/sanitation-dansokrom-3.jpg",  caption: "Community clean-up exercise, DansoKrom, Sefwi Bekwai" },
  { src: "/community/sanitation-dansokrom-5.jpg",  caption: "Motivating youth to take action on sanitation" },
  { src: "/community/sanitation-dansokrom-7.jpg",  caption: "Clearing drains and communal areas, DansoKrom" },
  { src: "/community/sanitation-surano-3.jpg",     caption: "Sanitation exercise, Sefwi Bekwai Surano B" },
] as const;

const TEACHING_IMAGES = [
  { src: "/community/teaching-night-class.jpg",  caption: "Night classes during COVID-19 lockdown" },
  { src: "/community/teaching-morning.jpg",      caption: "Free morning teaching, community classroom" },
  { src: "/community/teaching-class-1.jpg",      caption: "Teaching community youth, Sefwi Bekwai" },
  { src: "/community/teaching-class-3.jpg",      caption: "Students showing up even when schools were closed" },
] as const;

const MOVEMENT_IMAGES = [
  { src: "/leadership/bym-media-engagement.jpg",   caption: "Sefwi Bekwai Youth Movement, media engagement" },
  { src: "/leadership/unya-parliament-house.jpg",  caption: "UNYA-Ghana Youth Parliament, Parliament House, Accra" },
  { src: "/leadership/bibiani-parliament-1.jpg",   caption: "Bibiani Anhwiaso Municipal Youth Parliament" },
  { src: "/leadership/ubuntu-uew-chapter.jpg",     caption: "Ubuntu UEW Chapter founding" },
] as const;

export default function LeadershipJourneyPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B1F3A] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/about"
            className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#62E8FF] transition hover:text-white"
          >
            ← About Richard
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#62E8FF]">Leadership Journey</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-6xl">
            From village roads to global stages.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The leadership journey did not begin in a boardroom or a lecture hall. It began on
            a family motorbike, riding into communities that had no clean water, no functioning
            schools, and no one coming to help. What Richard found there shaped everything that
            came after.
          </p>

          <blockquote className="mt-10 border-l-4 border-[#62E8FF] pl-6">
            <p className="text-xl font-black italic leading-relaxed text-white md:text-2xl">
              &ldquo;The work that no one sees is the work that builds the character behind the
              work that everyone eventually notices.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Early roots ───────────────────────────────────────────── */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#0077FF] text-sm font-black text-white">1</div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#0077FF]">Early Beginnings · Ghana</p>
              </div>
              <h2 className="mt-5 text-balance text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
                Community roots and the leadership instinct.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard&apos;s leadership story began in the Western North Region of Ghana. Before
                  any formal title or programme, he was already making choices that leaders make:
                  showing up, organising, and asking what could be done differently. He joined
                  church campaigns, partnered with the NCCE on peace advocacy, and participated in
                  radio education tours across Sefwi Bekwai and the wider region.
                </p>
                <p>
                  These early experiences gave him something that no academic programme can teach:
                  the knowledge of what it actually means to live in a community where systems
                  have failed, and the unshakeable conviction that this does not have to be
                  permanent.
                </p>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-2xl lg:h-auto lg:min-h-[320px]">
              <Image
                src="/leadership/church-congregation-1.jpg"
                alt="Richard Mensah at church campaign activities in Sefwi Bekwai"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Communities with no water ─────────────────────────────── */}
      <section className="bg-[#0B1F3A] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#62E8FF] text-sm font-black text-[#0B1F3A]">2</div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#62E8FF]">Into the Communities</p>
          </div>
          <h2 className="mt-5 max-w-2xl text-balance text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Riding into villages with no clean water, on a family motorbike.
          </h2>
          <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-slate-300">
            <p>
              During his time in Sefwi Bekwai, Richard visited many surrounding communities
              that had no access to safe drinking water. Riding on a family motorbike, he
              documented the conditions firsthand: families sharing water sources with animals,
              borehole covers broken and contaminated, children walking long distances for water
              that still was not clean.
            </p>
            <p>
              He did not just observe. He motivated community youth to organise around their
              borehole maintenance, connected with local leaders, and made the case that sanitation
              and water access are not abstract development goals but daily survival.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {WATER_IMAGES.map((img) => (
              <div key={img.src} className="group relative h-48 overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 22vw, 45vw"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-[10px] leading-tight text-white opacity-0 transition group-hover:opacity-100">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sanitation drives ─────────────────────────────────────── */}
      <section className="bg-[#F0F7FF] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#10B981] text-sm font-black text-white">3</div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#10B981]">Community Action</p>
              </div>
              <h2 className="mt-5 text-balance text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
                Motivating communities for sanitation, one exercise at a time.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard organised and participated in sanitation exercises across DansoKrom and
                  Surano B in the Sefwi Bekwai area. These were not symbolic events. They were
                  early morning clean-ups, gutter clearances, and communal area maintenance drives
                  that he personally led alongside community members.
                </p>
                <p>
                  The work was unglamorous and unphotographed by anyone but him. But it taught
                  him something essential: sustainable development starts with people believing
                  their environment is worth protecting. Empowerment is not about giving people
                  things. It is about giving them back a sense of ownership.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SANITATION_IMAGES.map((img) => (
                <div key={img.src} className="group relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 18vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[9px] leading-tight text-white opacity-0 transition group-hover:opacity-100">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COVID teaching ────────────────────────────────────────── */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#F59E0B] text-sm font-black text-white">4</div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F59E0B]">Volunteer Teaching</p>
          </div>
          <h2 className="mt-5 max-w-2xl text-balance text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
            When schools closed during COVID-19, Richard opened his own.
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div className="space-y-5 text-base leading-8 text-slate-600">
              <p>
                When COVID-19 forced schools to close across Ghana in 2020, Richard did not
                wait. He organised free morning and night teaching sessions in multiple
                communities around Sefwi Bekwai, using whatever classrooms he could access and
                motivating children to keep learning when the world had given them every excuse
                to stop.
              </p>
              <p>
                He funded small celebrations with his uncle&apos;s support, giving out gifts and
                running quiz competitions to keep morale high. He taught literacy and numeracy,
                but more importantly, he showed young people that someone cared enough to show
                up for them, even during the hard times.
              </p>
              <p>
                This period, more than any other, crystallised what would become EGA Mentorship
                International: the conviction that structured, sustained support transforms
                outcomes in ways that sporadic goodwill never can.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEACHING_IMAGES.map((img) => (
                <div key={img.src} className="group relative h-44 overflow-hidden rounded-xl">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 text-[9px] leading-tight text-white opacity-0 transition group-hover:opacity-100">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Youth movements ───────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#0077FF] text-sm font-black text-white">5</div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#62E8FF]">Youth Movements</p>
          </div>
          <h2 className="mt-5 max-w-2xl text-balance text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Co-founding the Sefwi Bekwai Youth Movement and reaching Parliament House.
          </h2>
          <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-slate-300">
            <p>
              Richard co-founded the Sefwi Bekwai Youth Movement, a grassroots platform to
              organise and empower youth in his district. This evolved into the Sefwi Bekwai
              Youth Parliament. He also represented the region in the UNYA-Ghana Youth Parliament
              at Parliament House in Accra, contributing to national youth policy discussions and
              local governance conversations.
            </p>
            <p>
              He went on to engage with the Bibiani Anhwiaso Municipal Youth Parliament and
              founded the Ubuntu UEW Chapter during his university years, taking the spirit of
              community leadership into institutional settings.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MOVEMENT_IMAGES.map((img) => (
              <div key={img.src} className="group relative h-48 overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 22vw, 45vw"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-[10px] leading-tight text-white opacity-0 transition group-hover:opacity-100">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Academic and UK ───────────────────────────────────────── */}
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#8B5CF6] text-sm font-black text-white">6</div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8B5CF6]">Academic and Professional · UK</p>
              </div>
              <h2 className="mt-5 text-balance text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
                Expanding the lens through global institutions.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Moving to the United Kingdom opened Richard to new intellectual environments,
                  policy frameworks, and research methodologies. He engaged with institutions
                  that helped him see his community&apos;s challenges not as local aberrations, but
                  as global patterns requiring systemic responses, and brought that rigour back home.
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#EF4444] text-sm font-black text-white">7</div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#EF4444]">Cross-Border and Ongoing</p>
              </div>
              <h2 className="mt-5 text-balance text-2xl font-black tracking-[-0.03em] text-slate-950 md:text-3xl">
                Connecting Ghana, the UK, and global partners.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Richard has built a network of 65+ mentors, professionals, researchers, founders,
                  and civic leaders across the globe. He has travelled to 8 countries for
                  conferences, engagements, and field programmes, always with the same goal: to
                  bring what he learns back to the communities that need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EGA lead-in ───────────────────────────────────────────── */}
      <section className="bg-[#0077FF] px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">What it built</p>
            <h2 className="mt-3 text-balance text-2xl font-black leading-tight text-white md:text-3xl">
              Everything above was the foundation for EGA Mentorship International.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/85">
              One of Richard&apos;s most sustained contributions has been helping establish and
              grow EGA Mentorship International, a programme now supporting hundreds of young
              people seeking academic and professional advancement. He has helped more than
              120 people navigate study abroad applications, with 35+ securing fully funded
              pathways.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/leadership/ega"
              className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-[#0077FF] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Explore EGA
            </Link>
            <Link
              href="/leadership/journey"
              className="whitespace-nowrap rounded-full border border-white/40 px-6 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Download Journey PDF
            </Link>
          </div>
        </div>
      </section>

      <SectionNav prev={{ label: "Vision & Mission", href: "/about/vision" }} next={{ label: "Conferences", href: "/about/conferences" }} />
    </div>
  );
}
