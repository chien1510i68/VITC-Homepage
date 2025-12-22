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
  title: "VISC - Trung tâm Tin học và Kỹ năng mềm",
  description: "VISC - Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp. Cung cấp các khóa học chất lượng cao với đội ngũ giảng viên giàu kinh nghiệm, chương trình đào tạo chuẩn quốc tế.",
  keywords: ["đào tạo tin học", "kỹ năng mềm", "tin học văn phòng", "chứng chỉ tin học", "soft skills", "khóa học tin học"],
  authors: [{ name: "VISC Team" }],
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: "VISC - Trung tâm Tin học và Kỹ năng mềm",
    description: "Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp với các khóa học chất lượng cao",
    type: "website",
    locale: "vi_VN",
    siteName: "VISC",
    images: ['/images/logo.jpg'],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISC - Trung tâm Tin học và Kỹ năng mềm",
    description: "Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp với các khóa học chất lượng cao",
    images: ['/images/logo.jpg'],
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
      </body>
    </html>
  );
}
