/**
 * Accessibility Utilities
 * 
 * Utilities for improving accessibility throughout the application
 * 
 * @module lib/accessibility
 */

/**
 * Generate unique IDs for ARIA attributes
 */
let idCounter = 0;

export function generateId(prefix: string = 'a11y'): string {
  idCounter++;
  return `${prefix}-${idCounter}`;
}

/**
 * Announce message to screen readers
 * Uses ARIA live regions
 * 
 * @param message - Message to announce
 * @param priority - 'polite' (default) or 'assertive'
 * 
 * @example
 * ```typescript
 * announceToScreenReader('Form submitted successfully');
 * announceToScreenReader('Error: Please fill in all fields', 'assertive');
 * ```
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  if (typeof window === 'undefined') return;

  const announcer = document.getElementById('screen-reader-announcer');
  
  if (announcer) {
    announcer.textContent = message;
    announcer.setAttribute('aria-live', priority);
    
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

/**
 * Trap focus within a modal or dialog
 * 
 * @param element - Container element to trap focus within
 * @returns Cleanup function to remove trap
 * 
 * @example
 * ```typescript
 * const cleanup = trapFocus(modalRef.current);
 * // Later...
 * cleanup();
 * ```
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Handle keyboard navigation for lists/menus
 * 
 * @param event - Keyboard event
 * @param items - Array of focusable items
 * @param currentIndex - Current focused index
 * @returns New focused index
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number
): number {
  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = (currentIndex + 1) % items.length;
      break;
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
  }

  items[newIndex]?.focus();
  return newIndex;
}

/**
 * Get ARIA label for loading states
 */
export function getLoadingLabel(isLoading: boolean, label: string): string {
  return isLoading ? `Đang tải ${label.toLowerCase()}...` : label;
}

/**
 * Get ARIA label for error states
 */
export function getErrorLabel(error: string | null): string | undefined {
  return error ? `Lỗi: ${error}` : undefined;
}

/**
 * Create accessible button/link props
 */
export interface AccessibleClickableProps {
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/**
 * Make a div act like a button (only use when semantic button is not possible)
 */
export function makeAccessibleButton(
  onClick: () => void,
  label: string,
  isPressed?: boolean
): AccessibleClickableProps {
  return {
    role: 'button',
    tabIndex: 0,
    'aria-label': label,
    'aria-pressed': isPressed,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
  };
}

/**
 * Skip to main content link props
 */
export const skipToMainContentProps = {
  href: '#main-content',
  className: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-white',
  children: 'Bỏ qua đến nội dung chính',
};

/**
 * Screen reader only text styles
 */
export const srOnlyStyles = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  borderWidth: 0,
};

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return focusableSelectors.some(selector => element.matches(selector));
}

/**
 * Get first focusable element in container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  return container.querySelector<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
}

/**
 * Format ARIA live region announcement
 */
export function formatAnnouncement(
  action: string,
  result: 'success' | 'error',
  message: string
): string {
  const prefix = result === 'success' ? 'Thành công' : 'Lỗi';
  return `${prefix}: ${action}. ${message}`;
}

/**
 * ARIA props for form validation
 */
export interface AriaFormFieldProps {
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
}

export function getAriaFormFieldProps(
  fieldId: string,
  error?: string,
  required?: boolean
): AriaFormFieldProps {
  return {
    'aria-invalid': !!error,
    'aria-describedby': error ? `${fieldId}-error` : undefined,
    'aria-required': required,
  };
}

/**
 * Vietnamese month names for accessibility
 */
export const vietnameseMonths = [
  'Tháng Một',
  'Tháng Hai',
  'Tháng Ba',
  'Tháng Tư',
  'Tháng Năm',
  'Tháng Sáu',
  'Tháng Bảy',
  'Tháng Tám',
  'Tháng Chín',
  'Tháng Mười',
  'Tháng Mười Một',
  'Tháng Mười Hai',
] as const;

/**
 * Vietnamese day names for accessibility
 */
export const vietnameseDays = [
  'Chủ Nhật',
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
] as const;

/**
 * Format date for screen readers in Vietnamese
 */
export function formatDateForScreenReader(date: Date): string {
  const day = vietnameseDays[date.getDay()];
  const month = vietnameseMonths[date.getMonth()];
  const dateNum = date.getDate();
  const year = date.getFullYear();
  
  return `${day}, ngày ${dateNum} ${month} năm ${year}`;
}
