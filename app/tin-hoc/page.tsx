import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutSection from "./sections/AboutSection";
import ProgramsSection from "./sections/ProgramsSection";
import InstructorsSection from "./sections/InstructorsSection";
import NewsSection from "./sections/NewsSection";
import { HeroSection, LookupSection, ScheduleSection, TIN_HOC_LOOKUP_CONFIG } from "../shared/sections";
import ConsultationForm from "../components/sections/ConsultationForm";

export const metadata = {
  title: "Tin học - VISC",
  description: "Trung tâm đào tạo tin học VISC",
};

export default function TinHocPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LookupSection {...TIN_HOC_LOOKUP_CONFIG} />
         <ScheduleSection
          title="Lịch khai giảng Tin học"
          ctaLink="/khoa-hoc"
        />
        <ProgramsSection />
        <NewsSection />
        <ConsultationForm />
        <InstructorsSection />
        <AboutSection />
       
      </main>
      <Footer />
    </div>
  );
}