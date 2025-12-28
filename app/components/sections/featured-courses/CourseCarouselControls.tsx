import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CourseCarouselControlsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export function CourseCarouselControls({ 
  canScrollLeft, 
  canScrollRight, 
  onScrollLeft, 
  onScrollRight 
}: CourseCarouselControlsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}