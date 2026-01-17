/**
 * GLOBAL UI RULES
 * - Follow docs/ui-ux-pro-max.prompt.md

 * - TailwindCSS only
 * - No emoji icons
 * - Use SVG icons (Lucide / Heroicons)
 * - Accessibility is mandatory
 */

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import PopupManager from "./components/PopupManager";
import ScreenReaderAnnouncer from "./components/ScreenReaderAnnouncer";
import SkipToContent from "./components/SkipToContent";
import ChatWidget from "./components/ChatWidget";
import { siteConfig, seoConfig } from "@/config/site.config";
import { Toaster } from "sonner";

// Font chính của website - có thể thay đổi khi cần
const primaryFont = Quicksand({
  variable: "--font-primary",
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
  keywords: [...seoConfig.keywords],
  authors: [...seoConfig.authors],
  creator: seoConfig.creator,
  publisher: seoConfig.publisher,
  robots: seoConfig.robots,
  icons: seoConfig.icons,
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
        className={`${primaryFont.variable} font-sans antialiased`}
      >
        <SkipToContent />
        <ScreenReaderAnnouncer />
        {children}
        <PopupManager />
        <ChatWidget />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

