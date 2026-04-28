import type { Metadata } from "next";
import LeadershipSection from "@/components/features/leadership/LeadershipSection";

export const metadata: Metadata = {
  title: "Leadership | Richard Mensah",
  description: "Richard Mensah's leadership platform — Alpha Society, AI training, cross-border partnerships, and public thinking on AI in Africa, climate, and youth empowerment.",
};

export default function LeadershipPage() {
  return <LeadershipSection />;
}
