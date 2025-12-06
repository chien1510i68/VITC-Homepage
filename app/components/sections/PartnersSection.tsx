'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logo: string;
}

// Mock data - replace with real partner logos
const partners: Partner[] = [
  { id: 1, name: 'FPT Software', logo: '/partners/fpt.png' },
  { id: 6, name: 'Viettel', logo: '/partners/viettel.png' },
  { id: 7, name: 'VNPT', logo: '/partners/vnpt.png' },
  { id: 8, name: 'MB Bank', logo: '/partners/mbbank.png' },
  { id: 9, name: 'Techcombank', logo: '/partners/techcombank.png' },
  { id: 10, name: 'Vingroup', logo: '/partners/vingroup.png' },
];

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching the middle (since we duplicated items)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Đối tác của chúng tôi
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Đồng hành cùng các đối tác hàng đầu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            VITC tự hào được hợp tác với các doanh nghiệp và tổ chức uy tín trong và ngoài nước
          </p>
        </div>

        {/* Partners Slider */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="overflow-hidden whitespace-nowrap hide-scrollbar"
            style={{ scrollBehavior: 'auto' }}
          >
            <div className="inline-flex gap-8 py-8">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="inline-block"
                >
                  <div className="w-48 h-32 bg-white rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:scale-110 flex items-center justify-center p-6 group cursor-pointer">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Placeholder for logo - replace with actual Image component when logos are available */}
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </p>
                      </div>
                      {/* 
                      Uncomment when you have real logos:
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats or CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">
              Hợp tác với <strong className="text-gray-900">{partners.length}+ doanh nghiệp</strong> hàng đầu
            </span>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
