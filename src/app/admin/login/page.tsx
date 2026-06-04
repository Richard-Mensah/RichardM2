"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch(`/api/admin/login?next=${encodeURIComponent(next)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = (await res.json()) as { ok: boolean; redirect?: string; message?: string };

    if (data.ok && data.redirect) {
      router.push(data.redirect);
    } else {
      setError(data.message ?? "Login failed.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#176E78] p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#176E78] text-sm font-black text-white">
            RM
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-950">
              Richard Mensah
            </p>
            <p className="text-xs text-slate-500">Admin panel</p>
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-950">Sign in</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter your admin password to access the CMS.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Admin password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-[#2BA8B4] focus:outline-none focus:ring-2 focus:ring-[#2BA8B4]/20"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#176E78] py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#2BA8B4] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
