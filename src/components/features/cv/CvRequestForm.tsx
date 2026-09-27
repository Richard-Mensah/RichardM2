"use client";

import { useState } from "react";
import { FileText, Check } from "lucide-react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type FormFields = {
  name: string;
  email: string;
  organization: string;
  reason: string;
  website: string; // honeypot
};

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  organization: "",
  reason: "",
  website: "",
};

const INPUT_CLASS =
  "w-full glass-input rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition focus:outline-none";
const LABEL_CLASS = "mb-2 block text-xs font-black uppercase tracking-[0.18em] text-ink-soft";

export default function CvRequestForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/cv-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ?? "Something went wrong. Please try again."
        );
      }

      setState("success");
      setFields(INITIAL_FIELDS);
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div role="status" aria-live="polite" className="py-8 text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg">
          <Check size={24} aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-ink">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-base leading-7 text-body">
          Thank you. Richard reviews CV requests personally and will email his CV to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 rounded-full border border-line px-6 py-2.5 text-sm font-black text-body transition hover:border-accent hover:text-accent-strong"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cv-website">Website</label>
        <input
          id="cv-website"
          name="website"
          value={fields.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cv-name" className={LABEL_CLASS}>
            Name *
          </label>
          <input
            id="cv-name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="cv-email" className={LABEL_CLASS}>
            Email *
          </label>
          <input
            id="cv-email"
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cv-organization" className={LABEL_CLASS}>
          Organisation
        </label>
        <input
          id="cv-organization"
          name="organization"
          autoComplete="organization"
          value={fields.organization}
          onChange={handleChange}
          placeholder="Company, institution, or university"
          className={INPUT_CLASS}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="cv-reason" className={LABEL_CLASS}>
          What is this for?
        </label>
        <textarea
          id="cv-reason"
          name="reason"
          value={fields.reason}
          onChange={handleChange}
          rows={4}
          placeholder="A role, PhD supervision, a speaking invitation, a partnership…"
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-black uppercase tracking-[0.18em] shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FileText size={16} aria-hidden="true" />
        {state === "submitting" ? "Sending…" : "Request CV"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Richard shares his CV on request so he can keep it current and know who&apos;s reading it.
      </p>
    </form>
  );
}
