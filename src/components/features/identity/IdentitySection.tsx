import { IDENTITY_TIMELINE } from "@/constants";
import IdentityStepperClient from "./IdentityStepperClient";

export default function IdentitySection() {
  return (
    <section id="identity" className="identity-ground px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <IdentityStepperClient items={IDENTITY_TIMELINE} />
      </div>
    </section>
  );
}
