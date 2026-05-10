"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:border-red-300 hover:text-red-500"
    >
      Sign out
    </button>
  );
}
