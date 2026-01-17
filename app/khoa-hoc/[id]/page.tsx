"use client";

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, Program } from '@/lib/api';

// Import components following SRP
import CourseDetailHero from './components/CourseDetailHero';
import CourseContent from './components/CourseContent';
import CourseInstructor from './components/CourseInstructor';
import CourseSidebar from './components/CourseSidebar';
import CourseDetailLoading from './components/CourseDetailLoading';

export default function ChiTietKhoaHocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgram = async () => {
      setIsLoading(true);
      try {
        const data = await api.getCourseById(id);
        setProgram(data);
        if (!data) {
          notFound();
        }
      } catch (error) {
        console.error('Error loading program:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadProgram();
  }, [id]);

  if (isLoading) {
    return <CourseDetailLoading />;
  }

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <CourseDetailHero program={program} />

        {/* Content Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <CourseContent program={program} />

              {/* Sidebar */}
              <CourseSidebar program={program} />
            </div>

            {/* Instructor Section */}
            <div className="mt-12">
              <CourseInstructor program={program} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


