'use client';

import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import StatsSection from './components/sections/StatsSection';
import SimpleFeaturedCoursesSection from './components/sections/SimpleFeaturedCoursesSection';
import WhyChooseUsSection from './components/sections/WhyChooseUsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import NewsCTASection from './components/sections/NewsCTASection';
import { ScheduleSection } from './shared/sections';
import { Schedule } from './shared/sections/ScheduleSection/types';
import * as api from '@/lib/api';

export default function Home() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(true);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setSchedulesLoading(true);
        const result = await api.getCourseSchedules({
          page: 0,
          size: 10
        });
        
        // Convert API CourseSchedule to ScheduleSection Schedule format
        const convertedSchedules: Schedule[] = result.data.map(schedule => ({
          id: schedule.id,
          className: schedule.className || schedule.courseName,
          time: schedule.schedule,
          startDate: schedule.startDate,
          location: schedule.location || 'Chưa xác định',
          subject: schedule.courseName,
          status: schedule.status || 'Sắp khai giảng'
        }));
        
        setSchedules(convertedSchedules);
      } catch (error) {
        console.error('❌ Failed to load schedules:', error);
        setSchedules([]);
      } finally {
        setSchedulesLoading(false);
      }
    };

    loadSchedules();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <SimpleFeaturedCoursesSection />
        {!schedulesLoading && (
          <ScheduleSection
            title="Lịch khai giảng "
            ctaLink="/khoa-hoc"
            schedules={schedules}
          />
        )}
        <NewsCTASection />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
}
