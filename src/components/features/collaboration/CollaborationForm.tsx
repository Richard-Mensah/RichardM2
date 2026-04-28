"use client";

import { useState } from "react";
import { COLLABORATION_TYPES, FOCUS_AREAS } from "@/constants";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type FormFields = {
  name: string;
  email: string;
  organization: string;
  collaborationType: string;
  focusArea: string;
  message: string;
};

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  organization: "",
  collaborationType: COLLABORATION_TYPES[0],
  focusArea: FOCUS_AREAS[0],
  message: "",
};

const INPUT_CLASS =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-[#009EDB] focus:outline-none focus:ring-2 focus:ring-[#009EDB]/20";

export default function CollaborationForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Submission failed");
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
      <div className="py-10 text-center">
        <div className="sdg-conic mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full text-2xl text-white shadow-lg">
          ✓
        </div>
        <h3 className="text-2xl font-black text-slate-950">Message received</h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Thank you for reaching out. I&apos;ll review your collaboration request and be in touch
          shortly.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-black text-slate-700 transition hover:border-[#009EDB] hover:text-[#009EDB]"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
            Name *
          </label>
          <input
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
          Organisation
        </label>
        <input
          name="organization"
          value={fields.organization}
          onChange={handleChange}
          placeholder="Company, institution, or university"
          className={INPUT_CLASS}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
            Collaboration type *
          </label>
          <select
            name="collaborationType"
            value={fields.collaborationType}
            onChange={handleChange}
            required
            className={INPUT_CLASS}
          >
            {COLLABORATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
            Focus area *
          </label>
          <select
            name="focusArea"
            value={fields.focusArea}
            onChange={handleChange}
            required
            className={INPUT_CLASS}
          >
            {FOCUS_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-600">
          Message *
        </label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Describe your collaboration idea, project, or inquiry…"
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full rounded-full bg-slate-950 py-4 text-sm font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-[#009EDB] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Send collaboration request"}
      </button>
    </form>
  );
}
