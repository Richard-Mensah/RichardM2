"use client";

import { Printer } from "lucide-react";

/** Opens the browser's print dialog (also "Save as PDF"). Hidden when printing. */
export default function PrintButton({ label = "Save as PDF / Print" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="no-print btn-primary inline-flex items-center gap-2">
      <Printer size={16} aria-hidden="true" /> {label}
    </button>
  );
}
