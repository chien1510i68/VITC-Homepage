import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function CarouselNavigation({ onPrevious, onNext }: CarouselNavigationProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  );
}
