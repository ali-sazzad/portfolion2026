import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolion2026.vercel.app"),
  title: {
    default: "Portfolion2026 — Product-style Portfolio",
    template: "%s • Portfolion2026",
  },
  description:
    "A colorful, product-style portfolio built with Next.js App Router, TypeScript, Tailwind, and shadcn/ui — demoable without a backend, backend-ready by design.",
  openGraph: {
    title: "Portfolion2026 — Product-style Portfolio",
    description:
      "Colorful, modern, and structured like a real product — ready for backend injection later.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {/* Sticky nav will move into a reusable <Navbar /> component in Sprint 2 */}
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
