import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import StatsSection from './components/sections/StatsSection';
import SimpleFeaturedCoursesSection from './components/sections/SimpleFeaturedCoursesSection';
import WhyChooseUsSection from './components/sections/WhyChooseUsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import NewsCTASection from './components/sections/NewsCTASection';
import { ScheduleSection } from './shared/sections';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <SimpleFeaturedCoursesSection />
         <ScheduleSection
                  title="Lịch khai giảng "
                  ctaLink="/khoa-hoc"
                />
        <NewsCTASection />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
}
