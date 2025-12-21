"use client";

import { useState, useEffect, useRef } from 'react';
import { MapPin, Award, Star } from 'lucide-react';

interface Feature {
  icon: 'location' | 'certificate' | 'rating';
  number: string;
  target: number;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: 'location',
    number: '50+',
    target: 50,
    title: 'Địa điểm đào tạo',
    description: 'Hệ thống phòng học hiện đại trên toàn quốc',
  },
  {
    icon: 'certificate',
    number: '10,000+',
    target: 10000,
    title: 'Học viên đã đào tạo',
    description: 'Tin tưởng và lựa chọn các khóa học của chúng tôi',
  },
  {
    icon: 'rating',
    number: '95%',
    target: 95,
    title: 'Hài lòng với khóa học',
    description: 'Đánh giá tích cực từ học viên sau khóa học',
  },
];

const IconComponent = ({ type }: { type: 'location' | 'certificate' | 'rating' }) => {
  const className = "w-12 h-12 text-gray-900";
  
  switch (type) {
    case 'location':
      return <MapPin className={className} strokeWidth={1} />;
    case 'certificate':
      return <Award className={className} strokeWidth={1} />;
    case 'rating':
      return <Star className={className} strokeWidth={1} />;
    default:
      return null;
  }
};

export default function FeaturesSoftSkills() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Counter animation with easing
  const animateCounters = () => {
    const duration = 1500;
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;
    let frame = 0;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animate = () => {
      frame++;
      const progress = easeOutQuart(frame / totalFrames);

      setAnimatedNumbers(
        FEATURES.map((feature) => Math.floor(feature.target * progress))
      );

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedNumbers(FEATURES.map((f) => f.target));
      }
    };

    requestAnimationFrame(animate);
  };

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
                <IconComponent type={feature.icon} />
              </div>

              {/* Number - large and light */}
              <div className="mb-4">
                <span className="text-6xl lg:text-7xl font-light text-gray-900 tabular-nums tracking-tight">
                  {formatNumber(animatedNumbers[index], index)}
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
