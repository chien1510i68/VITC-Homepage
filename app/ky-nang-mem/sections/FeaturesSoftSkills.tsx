"use client";

import { useRef } from 'react';
import { useIntersectionObserver, useCountUp } from '../hooks';
import { FeatureIcon } from '../components';
import { FEATURES } from '../constants/features';

export default function FeaturesSoftSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  const { counts } = useCountUp({
    targets: FEATURES.map((f) => f.target),
    duration: 1500,
    startOnMount: isVisible,
  });

  const formatNumber = (num: number, index: number): string => {
    if (index === 1) {
      return num.toLocaleString('en-US') + '+';
    } else if (index === 2) {
      return num + '%';
    } else {
      return num + '+';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white"
      aria-label="Key statistics"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        
        {/* Section header - minimal */}
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">
            Con số ấn tượng
          </span>
        </div>

        {/* Stats grid - clean and spacious */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon - minimal outline */}
              <div className="mb-8 flex justify-center">
                <FeatureIcon type={feature.icon} />
              </div>

              {/* Number - large and light */}
              <div className="mb-4">
                <span className="text-6xl lg:text-7xl font-light text-gray-900 tabular-nums tracking-tight">
                  {formatNumber(counts[index] || 0, index)}
                </span>
              </div>

              {/* Divider line */}
              <div className="w-12 h-px bg-gray-300 mx-auto mb-4"></div>

              {/* Title - minimal */}
              <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">
                {feature.title}
              </h3>

              {/* Description - light gray */}
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
