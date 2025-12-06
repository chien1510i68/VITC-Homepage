import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import FloatingRegisterButton from "./components/ui/FloatingRegisterButton";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VITC - Giải pháp công nghệ cho doanh nghiệp",
  description: "VITC cung cấp dịch vụ phát triển phần mềm, thiết kế website và giải pháp chuyển đổi số toàn diện cho doanh nghiệp. Chúng tôi chuyên về phát triển web, mobile app, UI/UX design và cloud solutions.",
  keywords: ["phát triển phần mềm", "thiết kế website", "ứng dụng mobile", "chuyển đổi số", "cloud solutions", "UI/UX design"],
  authors: [{ name: "VITC Team" }],
  openGraph: {
    title: "VITC - Giải pháp công nghệ cho doanh nghiệp",
    description: "Cung cấp dịch vụ phát triển phần mềm, thiết kế website và giải pháp chuyển đổi số toàn diện",
    type: "website",
    locale: "vi_VN",
    siteName: "VITC",
  },
  twitter: {
    card: "summary_large_image",
    title: "VITC - Giải pháp công nghệ cho doanh nghiệp",
    description: "Cung cấp dịch vụ phát triển phần mềm, thiết kế website và giải pháp chuyển đổi số toàn diện",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        {children}
        <FloatingRegisterButton />
      </body>
    </html>
  );
}
