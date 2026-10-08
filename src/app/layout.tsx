import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BackToTop } from "@/components/site/BackToTop";
import { SiteFooter } from "@/components/site/SiteFooter";
import { portfolio } from "@/data/portfolio";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
});

const prose = Newsreader({
  subsets: ["latin"],
  variable: "--font-prose",
  style: ["normal", "italic"],
});

const { name, title, intro } = portfolio.profile;

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolion2026.vercel.app"),
  title: {
    default: `${name}, ${title}`,
    template: `%s | ${name}`,
  },
  description: intro,
  openGraph: {
    title: `${name}, ${title}`,
    description: intro,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${prose.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
