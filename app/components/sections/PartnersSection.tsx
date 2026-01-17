'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import PARTNERS from '../../../lib/partnersData';

const partners = PARTNERS;

export default function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    // If the user prefers reduced motion, don't start the automatic scrolling
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.6; // pixels per frame - tweak for comfortable speed

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) scrollPosition = 0;
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const pause = () => cancelAnimationFrame(animationFrameId);
    const resume = () => { animationFrameId = requestAnimationFrame(scroll); };

    scrollContainer.addEventListener('mouseenter', pause);
    scrollContainer.addEventListener('mouseleave', resume);
    scrollContainer.addEventListener('pointerdown', pause);
    scrollContainer.addEventListener('pointerup', resume);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', pause);
      scrollContainer.removeEventListener('mouseleave', resume);
      scrollContainer.removeEventListener('pointerdown', pause);
      scrollContainer.removeEventListener('pointerup', resume);
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
            Chúng tôi tự hào được hợp tác với các doanh nghiệp và tổ chức uy tín trong và ngoài nước
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
                <div key={`${partner.id}-${index}`} className="inline-block">
                  <div className="w-44 h-24 bg-white rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:scale-105 flex items-center justify-center p-4 group cursor-pointer">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-full h-14 mx-auto mb-1 flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={160}
                            height={56}
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </p>
                      </div>
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
