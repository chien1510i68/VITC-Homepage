import React from 'react';

export interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  variant?: 'dots' | 'lines';
}

export function CarouselIndicators({
  total,
  current,
  onSelect,
  variant = 'dots',
}: CarouselIndicatorsProps) {
  if (variant === 'lines') {
    return (
      <div className="flex gap-2">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            aria-label={`Chuyển đến slide ${index + 1}`}
            className="group p-1"
          >
            <div
              className={`h-0.5 transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-white'
                  : 'w-4 bg-white/50 group-hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          aria-label={`Chuyển đến slide ${index + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === current
              ? 'bg-white w-6'
              : 'bg-white/50 hover:bg-white/80'
          }`}
        />
      ))}
    </div>
  );
}
