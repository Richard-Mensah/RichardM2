import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Richard Mensah | AI, Leadership & SDG Impact",
  description:
    "Richard Mensah's personal website: AI and Data Science, leadership, entrepreneurship, climate intelligence, youth empowerment, and SDG-aligned impact systems.",
  keywords: [
    "Richard Mensah",
    "AI and Data Science",
    "Sustainable Development Goals",
    "SDG impact",
    "Climate Intelligence",
    "Youth Leadership",
    "AI in Africa",
    "Social Impact Innovation",
  ],
  openGraph: {
    title: "Richard Mensah | AI, Leadership & SDG Impact",
    description:
      "A living intellectual ecosystem blending AI, leadership, entrepreneurship, and Sustainable Development Goal contribution.",
    type: "website",
    images: ["/Richard 1.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <div className="sdg-band fixed inset-x-0 top-0 z-[60] h-1.5" />
        <SiteHeader />
        <main className="overflow-hidden pt-28">{children}</main>
        <SiteFooter />
        <PageViewTracker />
      </body>
    </html>
  );
}
