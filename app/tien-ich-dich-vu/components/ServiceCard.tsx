"use client";

import { CheckCircle } from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div 
      className="group relative"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Card */}
      <div className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:border-green-500 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`}></div>
        </div>
        
        {/* Icon section with image placeholder */}
        <div className="relative h-48 overflow-hidden">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`}></div>
          
          {/* Animated circles decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full transform -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          </div>
          
          {/* Icon with backdrop effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/30">
                {service.icon}
              </div>
            </div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-12 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-24 right-16 w-1 h-1 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content section */}
        <div className="relative p-6">
          {/* Title with hover effect */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {service.description}
          </p>
          
          {/* Features list with staggered animation */}
          <div className="space-y-2.5 mb-6">
            {service.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  transitionDelay: `${featureIndex * 0.1}s`
                }}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mt-0.5`}>
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Button with gradient */}
          <button className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn`}>
            <span>Liên hệ tư vấn</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Bottom accent bar with wave animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${service.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
        </div>
        
        {/* Corner badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Phổ biến
          </div>
        </div>
      </div>
    </div>
  );
}
