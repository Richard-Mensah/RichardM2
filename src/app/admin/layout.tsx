import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex overflow-auto bg-transparent">
      {children}
    </div>
  );
}
