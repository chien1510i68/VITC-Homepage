/**
 * Animation utility functions and constants
 */

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 700,
} as const;

export const EASING_FUNCTIONS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Get staggered delay for list animations
 */
export function getStaggerDelay(index: number, baseDelay: number = 0, increment: number = 100): number {
  return baseDelay + (index * increment);
}

/**
 * Generate fade-in animation CSS
 */
export function fadeInAnimation(delay: number = 0): React.CSSProperties {
  return {
    animation: `fadeIn ${ANIMATION_DURATIONS.normal}ms ${EASING_FUNCTIONS.easeOut} ${delay}ms forwards`,
  };
}

/**
 * Generate slide-in animation CSS
 */
export function slideInAnimation(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay: number = 0
): React.CSSProperties {
  const animations = {
    up: 'slideInUp',
    down: 'slideInDown',
    left: 'slideInLeft',
    right: 'slideInRight',
  };

  return {
    animation: `${animations[direction]} ${ANIMATION_DURATIONS.normal}ms ${EASING_FUNCTIONS.easeOut} ${delay}ms forwards`,
  };
}

/**
 * Generate scale animation CSS
 */
export function scaleAnimation(delay: number = 0): React.CSSProperties {
  return {
    animation: `scaleIn ${ANIMATION_DURATIONS.normal}ms ${EASING_FUNCTIONS.bounce} ${delay}ms forwards`,
  };
}

/**
 * CSS Keyframes (to be added to global CSS)
 */
export const CSS_KEYFRAMES = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;
