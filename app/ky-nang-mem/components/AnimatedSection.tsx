import React from 'react';
import { fadeInAnimation } from '../utils';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  isVisible, 
  delay = 0,
  className = '' 
}) => {
  const animation = fadeInAnimation(isVisible, delay);
  
  return (
    <div className={`${animation.className} ${className}`} style={animation.style}>
      {children}
    </div>
  );
};
