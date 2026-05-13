import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Development | Richard Mensah",
  description: "Richard Mensah's complete community development record — free teaching during COVID-19, community sanitation exercises, STEM excursions, water access advocacy, and volunteering across Sefwi Bekwai and the Western North Region.",
};

const TEACHING_PHOTOS = [
  { src: "/community/teaching-night.jpg", alt: "Night community teaching session" },
  { src: "/community/teaching-class-1.jpg", alt: "Community teaching class" },
  { src: "/community/teaching-class-2.jpg", alt: "Evening class with students" },
  { src: "/community/teaching-class-3.jpg", alt: "Teaching session with children" },
  { src: "/community/teaching-kids.jpg", alt: "Children learning at night class" },
  { src: "/community/teaching-class-4.jpg", alt: "Community class session" },
  { src: "/community/teaching-class-5.jpg", alt: "Students learning together" },
  { src: "/community/teaching-class-6.jpg", alt: "Class of students, community teaching" },
  { src: "/community/teaching-morning.jpg", alt: "Morning classes during COVID-19 lockdown" },
  { src: "/community/teaching-different-morning.jpg", alt: "Morning classes in another community" },
  { src: "/community/teaching-other-morning.jpg", alt: "Free morning classes for community children" },
  { src: "/community/teaching-donsokrom.jpg", alt: "Donsokrom community teaching session" },
  { src: "/community/teaching-donkorkrom.jpg", alt: "Night teaching at Donkorkrom" },
  { src: "/community/teaching-main.jpg", alt: "Richard teaching the community" },
  { src: "/community/teaching-learning.jpg", alt: "Students making progress" },
  { src: "/community/teaching-happy.jpg", alt: "Making children happy through learning" },
  { src: "/community/teaching-kids-2020.jpg", alt: "Children in 2020 community classes" },
  { src: "/community/teaching-myself-kids.jpg", alt: "Richard with community children" },
];

const PARTY_PHOTOS = [
  { src: "/community/teaching-fun-moments.jpg", alt: "Fun moments with students" },
  { src: "/community/teaching-party-night.jpg", alt: "Night party to encourage students — uncle's support" },
  { src: "/community/teaching-party-donkorkrom.jpg", alt: "Party time with students in Bekwai Donkorkrom" },
  { src: "/community/teaching-empowered-dressing.jpg", alt: "Empowering students with good dressing" },
  { src: "/community/teaching-quiz.jpg", alt: "Night quiz and gift time" },
  { src: "/community/teaching-quiz-gifts.jpg", alt: "Quiz and gift distribution" },
];

const STEM_PHOTOS = [
  { src: "/community/stem-excursion-main.jpg", alt: "STEM excursion with community children" },
  { src: "/community/stem-grace-hospital.jpg", alt: "Grace Hospital Sefwi Bekwai — STEM visit" },
  { src: "/community/stem-science-learning.jpg", alt: "Learning science in real life — hospital visit" },
  { src: "/community/stem-hospital-outreach.jpg", alt: "Hospital STEM outreach session" },
  { src: "/community/stem-dr-chichire.jpg", alt: "With Dr. Chichire in Bekwai hospital" },
  { src: "/community/stem-excursion-1.jpg", alt: "STEM excursion — group photo" },
  { src: "/community/stem-excursion-2.jpg", alt: "Students exploring the hospital" },
  { src: "/community/stem-excursion-3.jpg", alt: "STEM learning — hospital environment" },
  { src: "/community/stem-community-excursion.jpg", alt: "Community STEM excursion" },
  { src: "/community/stem-excursion-7.jpg", alt: "Students discovering science" },
];

const DANSOKROM_SANITATION = [
  { src: "/community/sanitation-sweeping.jpg", alt: "Sweeping with community residents — DansoKrom" },
  { src: "/community/sanitation-dansokrom-3.jpg", alt: "Community sanitation exercise — DansoKrom" },
  { src: "/community/sanitation-dansokrom-4.jpg", alt: "Early morning cleanup, DansoKrom" },
  { src: "/community/sanitation-dansokrom-5.jpg", alt: "Group cleaning exercise" },
  { src: "/community/sanitation-dansokrom-6.jpg", alt: "Community sweeping together" },
  { src: "/community/sanitation-dansokrom-7.jpg", alt: "Residents engaged in sanitation drive" },
  { src: "/community/sanitation-dansokrom-8.jpg", alt: "Morning sanitation exercise" },
  { src: "/community/sanitation-dansokrom-9.jpg", alt: "Community cleanup — DansoKrom streets" },
  { src: "/community/sanitation-dansokrom-10.jpg", alt: "Group sanitation work" },
  { src: "/community/sanitation-after.jpg", alt: "After the cleaning exercise — DansoKrom" },
  { src: "/community/sanitation-dansokrom-after2.jpg", alt: "Post-sanitation — clean community" },
  { src: "/community/sanitation-planning.jpg", alt: "Planning the morning sanitation exercise" },
];

const SURANO_SANITATION = [
  { src: "/community/sanitation-surano-1.jpg", alt: "Surano B sanitation exercise" },
  { src: "/community/sanitation-surano-3.jpg", alt: "Cleaning exercise — Surano B" },
  { src: "/community/sanitation-surano-4.jpg", alt: "Community members cleaning together, Surano B" },
  { src: "/community/sanitation-surano-5.jpg", alt: "Surano B community cleanup" },
  { src: "/community/sanitation-surano-6.jpg", alt: "Sanitation team — Surano B" },
  { src: "/community/sanitation-surano-7.jpg", alt: "Early morning Surano B cleanup" },
  { src: "/community/sanitation-surano-8.jpg", alt: "Group sanitation work, Surano B" },
  { src: "/community/sanitation-surano-9.jpg", alt: "Community sanitation completion, Surano B" },
];

const WATER_PHOTOS = [
  { src: "/community/water-crisis-1.jpg", alt: "Community without clean water — Sefwi Bekwai area" },
  { src: "/community/water-crisis-3.jpg", alt: "Water access survey — remote community" },
  { src: "/community/water-crisis-4.jpg", alt: "Communities sharing streams with animals" },
  { src: "/community/water-crisis-5.jpg", alt: "Visiting communities without clean water" },
  { src: "/community/water-crisis-6.jpg", alt: "Water source conditions — Sefwi Bekwai surrounding area" },
  { src: "/community/water-crisis-7.jpg", alt: "Community water access reality" },
  { src: "/community/water-crisis-8.jpg", alt: "Documenting water access challenges" },
  { src: "/community/water-crisis-9.jpg", alt: "Remote community water source" },
  { src: "/community/water-crisis-10.jpg", alt: "Visiting communities around Sefwi Bekwai" },
];

const WINNEBA_PHOTOS = [
  { src: "/community/winneba-sanitation-1.jpg", alt: "Personal sanitation volunteering — Winneba" },
  { src: "/community/winneba-sanitation-2.jpg", alt: "Volunteering with Enock Asiako in Winneba" },
  { src: "/community/winneba-sanitation-3.jpg", alt: "Winneba sanitation exercise" },
  { src: "/community/winneba-sanitation-4.jpg", alt: "Student volunteering — Winneba community" },
  { src: "/community/winneba-sanitation-5.jpg", alt: "Community cleaning exercise in Winneba" },
  { src: "/community/winneba-sanitation-6.jpg", alt: "Personal volunteer sanitation, Winneba" },
  { src: "/community/winneba-sanitation-7.jpg", alt: "Volunteering together in Winneba" },
];

const SDG_TAGS = [
  { code: "SDG 4", label: "Quality Education", color: "#C5192D" },
  { code: "SDG 6", label: "Clean Water & Sanitation", color: "#26BDE2" },
  { code: "SDG 11", label: "Sustainable Communities", color: "#FD9D24" },
  { code: "SDG 3", label: "Good Health & Wellbeing", color: "#4C9F38" },
  { code: "SDG 17", label: "Partnerships for the Goals", color: "#19486A" },
];

export default function CommunityDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3 backdrop-blur md:px-8">
        <Link href="/leadership" className="text-sm font-bold text-[#0077FF] hover:underline">
          ← Back to Leadership
        </Link>
        <Link href="/sdgs" className="text-sm font-bold text-slate-600 hover:text-[#0077FF]">
          SDGs Alignment →
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="/community/teaching-night.jpg"
          alt="Night community teaching — Sefwi Bekwai area"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-12 md:px-16">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#10B981]">
            Sefwi Bekwai Area · Western North Region · Ghana · 2019–2021
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">
            Development begins with showing up.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Before the research papers and the international platforms, Richard spent years doing
            the unglamorous, indispensable work: teaching children in the dark, sweeping streets
            with community members, and walking to villages that had no clean water. This is the
            foundation everything else was built on.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">

        {/* Teaching — COVID-19 */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#C5192D] text-xs font-black text-white">4</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C5192D]">
              SDG 4 · Quality Education · 2019–2021
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Free teaching during COVID-19 lockdowns.
          </h2>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <p className="text-base leading-8 text-slate-600">
              When schools closed across Ghana during the COVID-19 pandemic, Richard organised and
              delivered free volunteer teaching sessions across the Sefwi Bekwai area — at
              DonkorKrom, Barkokrom, Sukuuku, Lowcost, Bekwai Township, and Apemkrom. He held
              night classes to accommodate children whose days were occupied with household
              responsibilities, and morning sessions for younger learners. He organised quizzes,
              gift distributions, and community parties to sustain motivation and attendance. When
              the systems failed, he showed up. That is what leadership looks like in communities
              that cannot wait for policy decisions.
            </p>
            <div className="flex flex-wrap gap-2">
              {["DonkorKrom", "Barkokrom", "Sukuuku", "Lowcost", "Bekwai Township", "Apemkrom"].map((loc) => (
                <span key={loc} className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-800">
                  {loc}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TEACHING_PHOTOS.slice(0, 12).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {TEACHING_PHOTOS.slice(12).map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Motivation & Celebration */}
        <div className="mt-16 rounded-[2rem] bg-amber-50 p-8">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-800">
            Beyond the classroom
          </p>
          <h3 className="mt-3 text-2xl font-black text-amber-950">
            Quizzes, gifts, and parties to keep children coming back.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-amber-900">
            Attendance is a solved problem when children feel celebrated. Richard organised quiz
            nights with prizes, held parties with the support of community elders, and brought
            in resources to reward consistency. These were not extras — they were essential tools
            for building trust and sustaining engagement in communities where education had been
            interrupted.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PARTY_PHOTOS.map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* STEM Excursion */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4C9F38] text-xs font-black text-white">3</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#4C9F38]">
              SDG 3 & 4 · Health & Education · Sefwi Bekwai
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            STEM excursion — learning science in real life.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Richard organised STEM excursions with community children to Grace Hospital in Sefwi
            Bekwai and surrounding health facilities — giving children a chance to see science,
            medicine, and technology in practice. Working with Dr. Chichire and hospital staff,
            the excursions made abstract concepts tangible and introduced children to professional
            paths they had never been shown. Science is not a subject if you can see it working
            in your own community.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {STEM_PHOTOS.slice(0, 5).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {STEM_PHOTOS.slice(5).map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Community Radio */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <Image src="/community/teaching-radio-skills.jpg" alt="Community Radio Communication Skills Programme" fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#0077FF]">
              Community Radio Communication Project
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-950">
              Teaching communication skills through community radio.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Richard organised a community radio communication skills programme — teaching young
              people how to articulate ideas, participate in public discourse, and use media as a
              tool for community development. In communities where radio is the primary information
              medium, this was not a soft skill. It was access to a platform.
            </p>
          </div>
        </div>

        {/* Dansokrom Sanitation */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#26BDE2] text-xs font-black text-white">6</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FD9D24] text-xs font-black text-white">11</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
              SDG 6 & 11 · Sanitation & Communities · January 2020
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Community sanitation exercise — DansoKrom, Sefwi Bekwai.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Richard organised and participated in a community town sanitation exercise at DansoKrom
            in the Sefwi Bekwai area — mobilising residents to clean public spaces, streets, and
            community areas. This was early January 2020, before COVID-19 made hygiene an
            emergency. Richard was already treating it as a community priority. Development begins
            with the dignity of a clean environment.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {DANSOKROM_SANITATION.slice(0, 8).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {DANSOKROM_SANITATION.slice(8).map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Surano B Sanitation */}
        <div className="mt-20">
          <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-950">
            Surano B sanitation and cleaning exercise.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            The Sefwi Bekwai Surano B sanitation exercise followed the DansoKrom drive —
            demonstrating that this was not a one-time initiative but a deliberate pattern. Richard
            was systematically working through the communities surrounding Sefwi Bekwai,
            mobilising residents, setting an example, and building the expectation that
            communities can and should take collective responsibility for their environments.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {SURANO_SANITATION.map((photo, i) => (
              <div key={i} className="relative h-44 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Water Access */}
        <div className="mt-20 rounded-[2rem] bg-slate-950 p-8 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#26BDE2] text-xs font-black text-white">6</span>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#26BDE2]">
              SDG 6 · Clean Water · Sefwi Bekwai Surrounding Communities
            </p>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white md:text-4xl">
            Visiting communities with no clean water.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            Richard visited remote communities in the Sefwi Bekwai area and the 31 surrounding
            communities where residents shared streams and water sources with animals — places that
            had never received adequate attention from district authorities. These visits were acts
            of documentation and advocacy: seeing and recording the reality of water access in
            communities that statistics miss. When Richard talks about AI for development, clean
            water access in the Western North Region is part of what he means.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {WATER_PHOTOS.slice(0, 8).map((photo, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 h-52" : "h-44"}`}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WATER_PHOTOS.slice(8).map((photo, i) => (
              <div key={i} className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Winneba Volunteering */}
        <div className="mt-20">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#10B981]">
            2019 · Winneba · University Level 200
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Personal sanitation volunteering in Winneba.
          </h2>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <p className="text-base leading-8 text-slate-600">
              Even while studying at the University of Education, Winneba, Richard continued
              volunteering in community development — joining a sanitation exercise with his friend
              Enock Asiako in Winneba as a Level 200 student. This was not organised under any
              formal platform: it was a personal choice, made before BYM existed and before the
              work had a name. The pattern of showing up and doing the work preceded all
              the institutions Richard later built or joined.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {WINNEBA_PHOTOS.map((photo, i) => (
                <div key={i} className="relative h-40 overflow-hidden rounded-2xl">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* School Outreach */}
        <div className="mt-20">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C5192D]">
            2020 · Sefwi Bekwai · Roman Catholic Church
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            School outreach at Roman Church.
          </h2>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-52 overflow-hidden rounded-2xl">
                <Image src="/community/school-outreach-1.jpg" alt="School outreach at Roman Catholic Church, Sefwi Bekwai" fill className="object-cover" />
              </div>
              <div className="relative h-52 overflow-hidden rounded-2xl">
                <Image src="/community/school-outreach-2.jpg" alt="Empowering Sefwi Bekwai school children" fill className="object-cover" />
              </div>
            </div>
            <p className="text-base leading-8 text-slate-600">
              Richard volunteered at a school outreach initiative at the Roman Catholic Church in
              Sefwi Bekwai — empowering school children through sessions on education, aspiration,
              and community responsibility. Using church premises as a community learning space
              reflects Richard&apos;s early insight: you use the infrastructure that exists, not
              the infrastructure you wish you had. Every space is a classroom when the work is real.
            </p>
          </div>
        </div>

        {/* SDG Summary */}
        <div className="mt-20 rounded-[2rem] border border-slate-200 p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">
            SDG Alignment
          </p>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
            Every initiative on this page maps directly to the UN Sustainable Development Goals —
            not as a retroactive label, but as a description of what the work was always about.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {SDG_TAGS.map((sdg) => (
              <div
                key={sdg.code}
                className="rounded-xl p-4 text-white"
                style={{ backgroundColor: sdg.color }}
              >
                <p className="text-xs font-black uppercase tracking-[0.15em] text-white/70">{sdg.code}</p>
                <p className="mt-1 text-sm font-black">{sdg.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-wrap gap-5">
          <Link
            href="/leadership/sefwi-bekwai"
            className="rounded-full bg-[#0077FF] px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-blue-600"
          >
            ← Sefwi Bekwai Youth Movement
          </Link>
          <Link
            href="/sdgs"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-800 transition hover:border-slate-500"
          >
            SDGs Page →
          </Link>
          <Link
            href="/leadership/journey"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-800 transition hover:border-slate-500"
          >
            Download PDF Journey ↓
          </Link>
        </div>
      </div>
    </div>
  );
}
