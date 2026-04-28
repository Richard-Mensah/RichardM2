import type { Metadata } from "next";
import IdentitySection from "@/components/features/identity/IdentitySection";

export const metadata: Metadata = {
  title: "Identity | Richard Mensah",
  description: "Richard Mensah's journey from Ghana to the UK and the Global South — rooted in development urgency, expanded through systems thinking, built for cross-border impact.",
};

export default function IdentityPage() {
  return <IdentitySection />;
}
