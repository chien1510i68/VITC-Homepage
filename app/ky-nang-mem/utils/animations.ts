// Animation and transition utilities
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 700,
} as const;

export const TRANSITIONS = {
  fade: 'opacity transition-opacity duration-300',
  fadeUp: 'opacity-0 translate-y-4 transition-all duration-700',
  fadeIn: 'opacity-100 translate-y-0',
  scale: 'transition-transform duration-300 hover:scale-105',
} as const;

export const getTransitionDelay = (index: number, baseDelay = 0, increment = 100): string => {
  return `${baseDelay + index * increment}ms`;
};

export const fadeInAnimation = (isVisible: boolean, delay = 0) => ({
  className: `transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
  }`,
  style: delay > 0 ? { transitionDelay: `${delay}ms` } : undefined,
});
