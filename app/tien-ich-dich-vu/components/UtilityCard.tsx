"use client";

import type { UtilityItem } from '../types';

interface UtilityCardProps {
  utility: UtilityItem;
  isCenter: boolean;
  position: number;
}

export function UtilityCard({ utility, isCenter, position }: UtilityCardProps) {
  let translateX = position * 160;
  let scale = 1;
  let zIndex = 1;
  let opacity = 0.4;
  let grayscale = true;
  
  if (isCenter) {
    scale = 1;
    zIndex = 10;
    opacity = 1;
    grayscale = false;
    translateX = 0;
  } else if (Math.abs(position) === 1) {
    scale = 0.85;
    zIndex = 5;
    opacity = 0.5;
    grayscale = true;
    translateX = position * 200;
  }

  return (
    <a
      href={utility.link}
      className="group flex-shrink-0 absolute transition-all duration-500 ease-out"
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        zIndex,
        opacity,
      }}
    >
      <div className={`relative w-[280px] md:w-[340px] bg-white rounded-3xl border-2 border-gray-200 hover:border-green-500 transition-all duration-500 ${!grayscale && 'hover:translate-y-[-8px]'} cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl ${grayscale ? 'grayscale' : ''}`}>
        {/* Image section with icon */}
        <div className="relative h-64 overflow-hidden">
          {/* Gradient background */}
          <div className={`absolute inset-0 ${utility.color} opacity-90`}></div>
          
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full"></div>
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`bg-white/20 backdrop-blur-sm w-32 h-32 rounded-3xl flex items-center justify-center text-white ${!grayscale && 'group-hover:scale-110 group-hover:rotate-6'} transition-all duration-500 shadow-2xl border-2 border-white/30`}>
              {utility.icon}
            </div>
          </div>

          {/* Badge overlay */}
          {isCenter && (
            <div className="absolute top-6 left-6">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Tiện ích nổi bật
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="relative p-6 bg-gradient-to-b from-white to-gray-50">
          <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${!grayscale ? 'text-gray-900 group-hover:text-green-600' : 'text-gray-700'}`}>
            {utility.title}
          </h3>
          
          {isCenter && (
            <>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {utility.description}
              </p>
              
              {/* CTA Button */}
              <div className={`inline-flex items-center ${utility.color.replace('bg-gradient-to-br', 'bg-gradient-to-r')} text-white px-5 py-2.5 rounded-full font-semibold text-sm group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                <span>Truy cập ngay</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </>
          )}
          
          {!isCenter && (
            <p className="text-gray-500 text-xs">
              Nhấn để xem chi tiết
            </p>
          )}
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 ${utility.color} opacity-10 transform rotate-45 translate-x-10 -translate-y-10`}></div>
        
        {/* Bottom accent bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${utility.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
      </div>
    </a>
  );
}
