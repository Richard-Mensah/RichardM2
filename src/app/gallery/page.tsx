import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/gallery";
import GalleryLightbox from "@/components/features/gallery/GalleryLightbox";
import PageHero from "@/components/ui/page/PageHero";
import SectionNav from "@/components/ui/SectionNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Richard Mensah",
  description:
    "Personal and professional photos from events, speaking engagements, and community work.",
};

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <PageHero
        eyebrow="Gallery"
        title="From the field."
        lede={`${photos.length} photos from conferences, community work, teaching and leadership programmes across Ghana, the UK and beyond. Tap any photo to view it full screen.`}
        image="/hero-slides/slide-1.jpg"
        imageAlt="Richard Mensah at the Roscongress international forum"
        focus="50% 30%"
      />
      <div className="flex-1 px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <GalleryLightbox photos={photos} initial={24} />
        </div>
      </div>
      <SectionNav prev={{ label: "Writing", href: "/blog" }} />
    </div>
  );
}
