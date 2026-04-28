import type { Metadata } from "next";
import ResearchSection from "@/components/features/research/ResearchSection";

export const metadata: Metadata = {
  title: "Research | Richard Mensah",
  description: "Richard Mensah's research pillars: AI & Data Science, AI & Climate Change, Youth Leadership Systems, and Policy, Ethics & Institutions.",
};

export default function ResearchPage() {
  return <ResearchSection />;
}
