"use client";

import { useRouter } from "next/navigation";

type Props = { slug: string };

export default function AdminDeleteButton({ slug }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete article "${slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete article.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs font-semibold text-red-400 transition hover:text-red-600"
    >
      Delete
    </button>
  );
}
