interface CarouselNavigationProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo: (index: number) => void;
}

export function CarouselNavigation({ 
  currentIndex, 
  totalItems, 
  onNext, 
  onPrevious, 
  onGoTo 
}: CarouselNavigationProps) {
  return (
    <>
      {/* Navigation Arrows */}
      <div className="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
        <button
          onClick={onPrevious}
          className="bg-white hover:bg-green-50 border border-green-200 text-green-600 p-2 sm:p-3 rounded-full transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="bg-white hover:bg-green-50 border border-green-200 text-green-600 p-2 sm:p-3 rounded-full transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicators */}
      <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-4 sm:mt-6">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              index === currentIndex
                ? 'bg-green-600 w-6 sm:w-8'
                : 'bg-gray-300 hover:bg-green-400 w-2 sm:w-3'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}