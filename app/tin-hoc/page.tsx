import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProgramsSection from "./sections/ProgramsSection";
import InstructorsSection from "./sections/InstructorsSection";
import ScheduleSection from "./sections/ScheduleSection";
import LookupSection from "./sections/LookupSection";
import ConsultationForm from "../components/sections/ConsultationForm";

export const metadata = {
  title: "Tin học - VITC",
  description: "Trung tâm đào tạo tin học VITC",
};

export default function TinHocPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LookupSection />
        <AboutSection />
        <ProgramsSection />
        <InstructorsSection />
        <ScheduleSection />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  );
}