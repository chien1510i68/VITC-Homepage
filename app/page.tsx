'use client';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import SimpleFeaturedCoursesSection from './components/sections/SimpleFeaturedCoursesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import NewsCTASection from './components/sections/NewsCTASection';
import BannerCarouselSection from './components/sections/BannerCarouselSection';
import { ScheduleSection } from './shared/sections';
import { useSchedules } from './hooks/useSchedules';

/**
 * Home Page Component
 * Responsibility: Compose and render all homepage sections
 */
export default function Home() {
  const { schedules, isLoading: schedulesLoading } = useSchedules({ 
    page: 0, 
    size: 10 
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content">
        <BannerCarouselSection />
        <HeroSection />
        {/* <StatsSection /> */}
        <SimpleFeaturedCoursesSection />
        
        {/* {!schedulesLoading && (
          <ScheduleSection
            title="Lịch khai giảng"
            ctaLink="/khoa-hoc"
            schedules={schedules}
          />
        )} */}
        
        <NewsCTASection />
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
}
