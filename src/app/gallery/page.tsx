import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/gallery";
import GalleryLightbox from "@/components/features/gallery/GalleryLightbox";
import SectionHeading from "@/components/ui/SectionHeading";
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
      <div className="flex-1 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="From the field" />
          <div className="mt-14">
            <GalleryLightbox photos={photos} />
          </div>
        </div>
      </div>
      <SectionNav prev={{ label: "Writing", href: "/blog" }} />
    </div>
  );
}
