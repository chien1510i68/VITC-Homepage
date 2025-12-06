import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import LookupSection from './components/sections/LookupSection';
import AboutSection from './components/sections/AboutSection';
import ProgramsSection from './components/sections/ProgramsSection';
import ScheduleSection from './components/sections/ScheduleSection';
import ConsultationForm from './components/sections/ConsultationForm';
import InstructorsSection from './components/sections/InstructorsSection';
import NewsSection from './components/sections/NewsSection';
import ProductsSection from './components/sections/ProductsSection';
import PartnersSection from './components/sections/PartnersSection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <LookupSection />
        <ProgramsSection />
        <ScheduleSection />
        <ConsultationForm />
        <AboutSection />
        <PartnersSection />
        <InstructorsSection />
        <NewsSection />
        <ProductsSection />
      </main>
      
      <Footer />
    </div>
  );
}
