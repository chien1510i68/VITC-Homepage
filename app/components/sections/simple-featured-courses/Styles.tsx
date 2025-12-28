'use client';

import React from 'react';

/**
 * Styles Component
 * 
 * Responsibility: Provide CSS styles for text clamping and scrollbar hiding.
 * Contains all CSS-in-JS styles used across the featured courses components.
 */
export const Styles: React.FC = () => {
  return (
    <style jsx>{`
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
};
