/**
 * GLOBAL UI RULES
 * - Follow docs/ui-ux-pro-max.prompt.md

 * - TailwindCSS only
 * - No emoji icons
 * - Use SVG icons (Lucide / Heroicons)
 * - Accessibility is mandatory
 */

import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import FloatingRegisterButton from "./components/ui/FloatingRegisterButton";
import PopupManager from "./components/PopupManager";
import { siteConfig, seoConfig } from "@/config/site.config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: seoConfig.keywords,
  authors: seoConfig.authors,
  creator: seoConfig.creator,
  publisher: seoConfig.publisher,
  robots: seoConfig.robots,
  icons: seoConfig.icons,
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <FloatingRegisterButton />
        <PopupManager />
      </body>
    </html>
  );
}
