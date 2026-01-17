// Common CSS class combinations for consistency
export const SECTION_PADDING = 'py-12 sm:py-16 md:py-20 lg:py-24';
export const SECTION_PADDING_LG = 'py-12 sm:py-16 md:py-20 lg:py-32';

export const CONTAINER_BASE = 'container mx-auto px-4 sm:px-6 md:px-8 lg:px-12';
export const CONTAINER_NARROW = `${CONTAINER_BASE} max-w-4xl`;
export const CONTAINER_NORMAL = `${CONTAINER_BASE} max-w-6xl`;
export const CONTAINER_WIDE = `${CONTAINER_BASE} max-w-7xl`;

export const HEADING_1 = 'text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900';
export const HEADING_2 = 'text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900';
export const HEADING_3 = 'text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-slate-900';
export const HEADING_4 = 'text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold text-slate-900';

export const TEXT_BODY = 'text-sm sm:text-base text-slate-700 leading-relaxed';
export const TEXT_SUBTITLE = 'text-base sm:text-lg text-slate-600 leading-relaxed';
export const TEXT_MUTED = 'text-xs sm:text-sm text-slate-500';
export const TEXT_LABEL = 'text-xs tracking-[0.25em] uppercase text-slate-500 font-medium';

export const CARD_BASE = 'bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-100';
export const CARD_HOVER = 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300';
export const CARD_INTERACTIVE = `${CARD_BASE} ${CARD_HOVER} cursor-pointer`;

export const GRADIENT_PRIMARY = 'bg-green-600';
export const GRADIENT_SECONDARY = 'bg-green-50';
export const TEXT_GRADIENT = 'text-green-600';

export const GRID_2 = 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6';
export const GRID_3 = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6';
export const GRID_4 = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6';

export const FOCUS_RING = 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2';
export const TRANSITION_DEFAULT = 'transition-all duration-200';
export const TRANSITION_SLOW = 'transition-all duration-300';
