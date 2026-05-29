/**
 * GLOBAL UI RULES
 * - Follow docs/ui-ux-pro-max.prompt.md

 * - TailwindCSS only
 * - No emoji icons
 * - Use SVG icons (Lucide / Heroicons)
 * - Accessibility is mandatory
 */

import type { Metadata } from "next";
import { Quicksand, Roboto } from "next/font/google";
import "./globals.css";
import ScreenReaderAnnouncer from "./components/ScreenReaderAnnouncer";
import SkipToContent from "./components/SkipToContent";
import ChatWidget from "./components/ChatWidget";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { siteConfig, seoConfig } from "@/config/site.config";
import { Toaster } from "sonner";

// Font chính của website
const primaryFont = Quicksand({
  variable: "--font-primary",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

// Font Roboto dùng riêng cho Header
const headerFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...seoConfig.keywords],
  authors: [...seoConfig.authors],
  creator: seoConfig.creator,
  publisher: seoConfig.publisher,
  robots: seoConfig.robots,
  icons: seoConfig.icons,
  manifest: '/manifest.json',
  openGraph: {
    ...seoConfig.openGraph,
    images: seoConfig.openGraph.images ? [...seoConfig.openGraph.images] : undefined,
  },
  twitter: {
    ...seoConfig.twitter,
    images: seoConfig.twitter.images ? [...seoConfig.twitter.images] : undefined,
  },
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
        className={`${primaryFont.variable} ${headerFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <SkipToContent />
        <ScreenReaderAnnouncer />
        {children}
        <ChatWidget />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

