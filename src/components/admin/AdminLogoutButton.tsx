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
      className="rounded-full border border-line px-4 py-2 text-xs font-black text-body transition hover:border-red-300 hover:text-red-600"
    >
      Sign out
    </button>
  );
}
