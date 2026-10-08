"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-cobalt px-6 py-3 font-medium text-white transition-colors hover:bg-ink"
    >
      Save as PDF
    </button>
  );
}
