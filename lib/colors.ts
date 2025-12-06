/**
 * VITC Brand Colors
 * Centralized color configuration for the entire application
 * Change colors here to apply throughout the entire website
 */

export const COLORS = {
  // Primary Brand Color - VITC Green
  primary: {
    DEFAULT: 'green-600',
    light: 'green-500',
    dark: 'green-700',
    lighter: 'green-100',
    lightest: 'green-50',
  },
  
  // Secondary/Accent Color
  secondary: {
    DEFAULT: 'emerald-600',
    light: 'emerald-500',
    dark: 'emerald-700',
    lighter: 'emerald-100',
    lightest: 'emerald-50',
  },
  
  // Neutral Colors
  neutral: {
  white: {
    DEFAULT: 'white'
  },
  black: {
    DEFAULT: 'black'
  },
  gray: {
    DEFAULT: 'gray-500',
    50: 'gray-50',
    100: 'gray-100',
    200: 'gray-200',
    300: 'gray-300',
    400: 'gray-400',
    500: 'gray-500',
    600: 'gray-600',
    700: 'gray-700',
    800: 'gray-800',
    900: 'gray-900',
  }
},
  
  // Status Colors
  status: {
    success: 'green-600',
    warning: 'yellow-500',
    error: 'red-600',
    info: 'blue-500',
  }
} as const;

/**
 * Helper function to get Tailwind class names for colors
 * Usage: cn(getColor('bg', 'primary')) // returns 'bg-green-600'
 */
export const getColor = (
  type: 'bg' | 'text' | 'border' | 'hover:bg' | 'hover:text' | 'hover:border',
  color: keyof typeof COLORS | string
): string => {
  let colorValue: string;
  
  if (typeof color === 'string' && color in COLORS) {
    const colorObj = COLORS[color as keyof typeof COLORS];
    // Check if colorObj has DEFAULT property
    if (typeof colorObj === 'object' && 'DEFAULT' in colorObj) {
      colorValue = colorObj.DEFAULT;
    } else {
      // Fallback to the color string itself if no DEFAULT
      colorValue = color;
    }
  } else {
    colorValue = color as string;
  }
  
  return `${type}-${colorValue}`;
};

/**
 * Common color combinations used throughout the app
 */
export const COLOR_COMBINATIONS = {
  // Primary Button
  primaryButton: {
    bg: `bg-${COLORS.primary.DEFAULT}`,
    hover: `hover:bg-${COLORS.primary.dark}`,
    text: 'text-white',
  },
  
  // Outline Button
  outlineButton: {
    border: `border-2 border-${COLORS.primary.DEFAULT}`,
    text: `text-${COLORS.primary.DEFAULT}`,
    hover: `hover:bg-${COLORS.primary.lightest}`,
  },
  
  // Badge
  badge: {
    bg: `bg-${COLORS.primary.DEFAULT}`,
    text: 'text-white',
  },
  
  // Light Badge
  lightBadge: {
    bg: `bg-${COLORS.primary.lighter}`,
    text: `text-${COLORS.primary.dark}`,
  },
  
  // Link
  link: {
    text: `text-${COLORS.primary.DEFAULT}`,
    hover: `hover:text-${COLORS.primary.dark}`,
  },
  
  // Gradient
  gradient: {
    from: `from-${COLORS.primary.DEFAULT}`,
    to: `to-${COLORS.secondary.DEFAULT}`,
  },
  
  // Selected/Active State
  selected: {
    bg: `bg-${COLORS.primary.lightest}`,
    border: `border-l-4 border-l-${COLORS.primary.DEFAULT}`,
  },
  
  // Hover Card
  hoverCard: {
    border: `hover:border-${COLORS.primary.light}`,
  }
} as const;

/**
 * Direct class name strings for easy use in components
 * These are the actual Tailwind classes that can be used directly
 */
export const TAILWIND_COLORS = {
  // Backgrounds
  bgPrimary: 'bg-green-600',
  bgPrimaryHover: 'hover:bg-green-700',
  bgPrimaryLight: 'bg-green-100',
  bgPrimaryLightest: 'bg-green-50',
  
  // Text
  textPrimary: 'text-green-600',
  textPrimaryDark: 'text-green-700',
  textPrimaryHover: 'hover:text-green-600',
  
  // Borders
  borderPrimary: 'border-green-600',
  borderPrimaryHover: 'hover:border-green-300',
  
  // Gradients
  gradientPrimary: 'from-green-600 to-emerald-500',
  gradientLight: 'from-green-50 to-emerald-50',
} as const;
