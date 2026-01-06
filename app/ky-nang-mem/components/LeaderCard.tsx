import React from 'react';
import type { Leader } from '../types';
import { getSafeImageUrl, getFallbackImage } from '../utils/imageUtils';
import { ImageWithFallback } from './ImageWithFallback';

interface LeaderCardProps {
  leader: Leader;
  delay?: number;
}

export function LeaderCard({ leader, delay = 0 }: LeaderCardProps) {
  return (
    <div
      className="transition-transform duration-700 opacity-0 translate-y-12 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 overflow-hidden border border-slate-100 cursor-pointer text-center p-4 sm:p-5 md:p-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-slate-100">
            <ImageWithFallback
              src={getSafeImageUrl(leader.image, 'leader')}
              alt={leader.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              fallbackSrc={getFallbackImage('leader')}
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <h4 className="font-semibold text-base sm:text-lg text-slate-900">
            {leader.name}
          </h4>
          <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            {leader.title}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {leader.specialty}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}
