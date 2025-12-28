import React from 'react';
import { useScrollable } from '../hooks';
import { CarouselNavigation, InstructorCard } from '@/app/shared/components';
import type { Instructor } from '../types';

interface InstructorCarouselProps {
  instructors: Instructor[];
}

export function InstructorCarousel({ instructors }: InstructorCarouselProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollable(400);

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex justify-end">
        <CarouselNavigation
          onPrevious={scrollLeft}
          onNext={scrollRight}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
        />
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {instructors.map((instructor) => (
          <div key={instructor.id} className="flex-shrink-0 w-64 snap-start">
            <InstructorCard instructor={instructor} />
          </div>
        ))}
      </div>
    </div>
  );
}
