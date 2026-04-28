import type { Metadata } from "next";
import SdgsSection from "@/components/features/sdgs/SdgsSection";

export const metadata: Metadata = {
  title: "SDG Impact | Richard Mensah",
  description: "Richard Mensah's Sustainable Development Goal contributions — connecting AI, climate intelligence, youth leadership, and partnerships to the global 2030 agenda.",
};

export default function SdgsPage() {
  return <SdgsSection />;
}
