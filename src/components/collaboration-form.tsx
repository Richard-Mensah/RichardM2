"use client";

import { type FormEvent, useState } from "react";

const collaborationTypes = [
  "Research collaboration",
  "Speaking or media",
  "Startup or product build",
  "Policy or institutional advisory",
  "Mentorship or youth program",
];

const focusAreas = [
  "AI for sustainable development",
  "Climate intelligence",
  "Youth leadership",
  "Data science systems",
  "Ethics and policy",
  "Institutional training",
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function CollaborationForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Share the partnership, project, institution, or SDG challenge you want to build around.",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    setSubmissionState("submitting");
    setStatusMessage("Sending your collaboration request securely...");

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      collaborationType: String(formData.get("collaborationType") ?? ""),
      focusArea: String(formData.get("focusArea") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to submit your request.");
      }

      formElement.reset();
      setSubmissionState("success");
      setStatusMessage(
        result.message ?? "Your collaboration request has been received successfully.",
      );
    } catch (error) {
      setSubmissionState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again shortly.",
      );
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#009EDB] focus:ring-4 focus:ring-[#009EDB]/15";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/80 md:p-7"
    >
      <div className="sdg-band absolute inset-x-0 top-0 h-2" />
      <div className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-[#26BDE2]/20 blur-3xl" />
      <div className="absolute -bottom-28 left-6 h-56 w-56 rounded-full bg-[#FCC30B]/20 blur-3xl" />

      <div className="relative space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#00689D]">
            Collaboration desk
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            Build an AI + SDG impact system.
          </h3>
          <p
            className={`mt-3 text-sm leading-6 ${
              submissionState === "error" ? "text-[#E5243B]" : "text-slate-600"
            }`}
          >
            {statusMessage}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Name
            <input className={inputClass} name="name" placeholder="Your full name" required />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Email
            <input
              className={inputClass}
              name="email"
              placeholder="you@institution.org"
              required
              type="email"
            />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Organization / community
          <input
            className={inputClass}
            name="organization"
            placeholder="University, startup, NGO, government, or community"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Collaboration type
            <select className={inputClass} name="collaborationType" defaultValue={collaborationTypes[0]}>
              {collaborationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            SDG focus area
            <select className={inputClass} name="focusArea" defaultValue={focusAreas[0]}>
              {focusAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Message
          <textarea
            className={`${inputClass} min-h-36 resize-y leading-6`}
            name="message"
            placeholder="Describe the opportunity, target audience, SDG relevance, timeline, and desired impact."
            required
          />
        </label>

        <button
          type="submit"
          disabled={submissionState === "submitting"}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-[#009EDB]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="sdg-band absolute inset-0" />
          <span className="absolute inset-0 bg-slate-950/10 opacity-0 transition group-hover:opacity-100" />
          <span className="relative">
            {submissionState === "submitting" ? "Submitting" : "Send collaboration signal"}
          </span>
          <span className="relative transition group-hover:translate-x-1">→</span>
        </button>

        <p className="text-xs leading-5 text-slate-500">
          Your request is stored securely in the site database so Richard can follow up with the
          right research, speaking, training, or partnership context.
        </p>
      </div>
    </form>
  );
}
