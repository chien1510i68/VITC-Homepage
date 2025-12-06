"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { api, Instructor } from '@/lib/api';

export default function InstructorsSection() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInstructors = async () => {
      setIsLoading(true);
      try {
        const data = await api.getInstructors();
        setInstructors(data);
      } catch (error) {
        console.error('Error loading instructors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructors();
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (instructors.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instructors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [instructors.length]);

  const getVisibleInstructors = () => {
    if (instructors.length === 0) return [];
    const total = instructors.length;
    return [
      instructors[(currentIndex - 2 + total) % total],
      instructors[(currentIndex - 1 + total) % total],
      instructors[currentIndex],
      instructors[(currentIndex + 1) % total],
      instructors[(currentIndex + 2) % total],
    ];
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + instructors.length) % instructors.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % instructors.length);
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Đang tải thông tin giảng viên...</p>
        </div>
      </section>
    );
  }

  if (instructors.length === 0) {
    return null;
  }

  const visibleInstructors = getVisibleInstructors();
  const centerInstructor = visibleInstructors[2];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-400 mb-2 tracking-wider">
            OUR TEAM
          </h2>
          <p className="text-sm text-gray-600">
            Đội ngũ giảng viên giàu kinh nghiệm
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-8">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="relative flex items-center justify-center h-[350px] md:h-[400px]">
            {visibleInstructors.map((instructor, index) => {
              const position = index - 2; // -2, -1, 0, 1, 2
              const isCenter = position === 0;
              
              // Calculate transform based on position with minimal spacing
              let translateX = position * 100; // reduced spacing
              let scale = 1;
              let zIndex = 1;
              let opacity = 0.4;
              
              if (isCenter) {
                scale = 1;
                zIndex = 10;
                opacity = 1;
                translateX = 0;
              } else if (Math.abs(position) === 1) {
                scale = 0.85;
                zIndex = 5;
                opacity = 0.5;
                translateX = position * 120;
              } else {
                scale = 0.75;
                zIndex = 1;
                opacity = 0.3;
                translateX = position * 140;
              }

              return (
                <div
                  key={instructor.id}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <div className={`relative rounded-xl overflow-hidden ${isCenter ? '' : 'grayscale'} transition-all duration-500`}>
                    <div className="relative w-[180px] h-[260px] md:w-[220px] md:h-[320px]">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Info Overlay - Only show on center card */}
                      {isCenter && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className={`${TAILWIND_COLORS.bgPrimary} text-white px-2 py-1 rounded-full text-xs font-semibold mb-2 w-fit`}>
                            {instructor.experience}
                          </div>
                          <h3 className="text-lg font-bold mb-1">{instructor.name}</h3>
                          <p className="text-white/90 text-xs mb-2">{instructor.title}</p>
                          <div className="flex items-center gap-3 text-xs mb-1">
                            <span>{instructor.students}</span>
                            <span>{instructor.courses} khóa</span>
                          </div>
                          <p className="text-white/70 text-xs line-clamp-1">{instructor.specialty}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    </section>
  );
}
