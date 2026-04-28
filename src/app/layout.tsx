import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
    images: ["/sdg-impact-wheel.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">{children}</body>
    </html>
  );
}
