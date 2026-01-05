# Accessibility Guidelines

## Overview

This document outlines accessibility standards and best practices for the VITC Homepage project to ensure compliance with WCAG 2.1 Level AA standards.

## Accessibility Features

### 1. Skip to Content Link

A "Skip to Content" link is provided at the beginning of each page to allow keyboard users to bypass navigation:

```tsx
<SkipToContent />
```

**Location:** [app/components/SkipToContent.tsx](../app/components/SkipToContent.tsx)

**How it works:**
- Hidden by default (using `sr-only` class)
- Becomes visible when focused with keyboard (Tab key)
- Jumps directly to `#main-content` anchor

**Usage in pages:**
```tsx
<main id="main-content">
  {/* Page content */}
</main>
```

### 2. Screen Reader Announcements

Dynamic content changes are announced to screen readers using ARIA live regions:

```tsx
<ScreenReaderAnnouncer />
```

**Location:** [app/components/ScreenReaderAnnouncer.tsx](../app/components/ScreenReaderAnnouncer.tsx)

**Usage:**
```tsx
import { announceToScreenReader } from '@/lib/accessibility';

// Success message
announceToScreenReader('Đăng ký thành công');

// Error message (assertive priority)
announceToScreenReader('Vui lòng điền đầy đủ thông tin', 'assertive');
```

### 3. Keyboard Navigation

All interactive elements support keyboard navigation:

#### Focus Management

```tsx
import { trapFocus, handleKeyboardNavigation } from '@/lib/accessibility';

// Trap focus in modal
useEffect(() => {
  if (isOpen && modalRef.current) {
    const cleanup = trapFocus(modalRef.current);
    return cleanup;
  }
}, [isOpen]);

// Keyboard navigation in lists
const handleKeyDown = (e: React.KeyboardEvent) => {
  const newIndex = handleKeyboardNavigation(e, items, currentIndex);
  setCurrentIndex(newIndex);
};
```

#### Keyboard Shortcuts

- `Tab` - Move to next focusable element
- `Shift + Tab` - Move to previous focusable element
- `Enter` / `Space` - Activate buttons and links
- `Arrow Keys` - Navigate through menus and lists
- `Escape` - Close modals and dropdowns
- `Home` - Jump to first item in list
- `End` - Jump to last item in list

### 4. ARIA Labels and Attributes

#### Form Fields

```tsx
import { getAriaFormFieldProps } from '@/lib/accessibility';

<input
  id="email"
  type="email"
  {...getAriaFormFieldProps('email', error, true)}
/>
{error && (
  <span id="email-error" className="text-red-500">
    {error}
  </span>
)}
```

#### Buttons

```tsx
// Interactive button
<button
  aria-label="Đóng cửa sổ"
  aria-pressed={isPressed}
>
  <X className="w-5 h-5" aria-hidden="true" />
</button>

// Loading state
<button aria-label={getLoadingLabel(isLoading, 'Gửi form')}>
  {isLoading ? 'Đang gửi...' : 'Gửi'}
</button>
```

#### Links

```tsx
// External link
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Xem thêm (mở tab mới)"
>
  Xem thêm
</a>

// Descriptive link text (preferred)
<a href="/courses/web-development">
  Khóa học Lập trình Web - Tìm hiểu thêm
</a>
```

### 5. Semantic HTML

Use proper HTML elements for their intended purpose:

```tsx
// ✅ Good
<nav aria-label="Điều hướng chính">
  <ul>
    <li><a href="/">Trang chủ</a></li>
    <li><a href="/courses">Khóa học</a></li>
  </ul>
</nav>

// ❌ Bad
<div onClick={navigate}>
  <span>Trang chủ</span>
</div>
```

#### Headings Hierarchy

```tsx
<h1>Trang chủ VITC</h1>
  <h2>Khóa học nổi bật</h2>
    <h3>Lập trình Web</h3>
    <h3>Thiết kế đồ họa</h3>
  <h2>Tin tức</h2>
    <h3>Khai giảng khóa mới</h3>
```

### 6. Color Contrast

All text meets WCAG AA contrast requirements:

- **Normal text (< 18pt):** Minimum 4.5:1 contrast ratio
- **Large text (≥ 18pt or 14pt bold):** Minimum 3:1 contrast ratio
- **UI components and graphics:** Minimum 3:1 contrast ratio

**Tools for testing:**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

### 7. Images and Icons

#### Decorative Images

```tsx
<img src="/decorative.jpg" alt="" role="presentation" />
```

#### Informative Images

```tsx
<img
  src="/instructor.jpg"
  alt="Giảng viên Nguyễn Văn A đang giảng dạy lập trình"
/>
```

#### Icons

```tsx
// Decorative icon (has adjacent text)
<Button>
  <Check className="w-4 h-4" aria-hidden="true" />
  <span>Hoàn thành</span>
</Button>

// Icon-only button (needs label)
<button aria-label="Đóng">
  <X className="w-5 h-5" aria-hidden="true" />
</button>
```

### 8. Forms Accessibility

#### Required Fields

```tsx
<label htmlFor="name">
  Họ và tên <span aria-label="bắt buộc">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>
```

#### Error Messages

```tsx
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && (
  <span id="email-error" role="alert" className="text-red-500">
    {error}
  </span>
)}
```

#### Form Groups

```tsx
<fieldset>
  <legend>Chọn khóa học quan tâm</legend>
  <div>
    <input type="checkbox" id="web" name="course" value="web" />
    <label htmlFor="web">Lập trình Web</label>
  </div>
  <div>
    <input type="checkbox" id="design" name="course" value="design" />
    <label htmlFor="design">Thiết kế đồ họa</label>
  </div>
</fieldset>
```

### 9. Focus Indicators

All focusable elements have visible focus indicators:

```css
/* Global focus styles in globals.css */
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary;
}

/* Custom focus for buttons */
.button:focus-visible {
  @apply ring-2 ring-primary ring-offset-2;
}
```

### 10. Motion and Animation

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// JavaScript/React
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Apply animations
}
```

## Testing Checklist

### Automated Testing

- [ ] Run Lighthouse accessibility audit (Score ≥ 90)
- [ ] Use axe DevTools for automated checks
- [ ] Validate HTML with W3C Validator
- [ ] Check color contrast with WebAIM tool

### Manual Testing

#### Keyboard Navigation
- [ ] All interactive elements reachable with Tab
- [ ] Focus indicators visible and clear
- [ ] No keyboard traps
- [ ] Skip to content link works
- [ ] Modals trap focus correctly
- [ ] Escape key closes modals/dropdowns

#### Screen Reader Testing
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] All images have appropriate alt text
- [ ] Form labels are associated correctly
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Page title is descriptive

#### Visual Testing
- [ ] Text can be zoomed to 200% without loss of content
- [ ] Color is not the only means of conveying information
- [ ] Sufficient color contrast
- [ ] Content reflows properly at different zoom levels

#### Content Testing
- [ ] Headings follow logical hierarchy
- [ ] Links have descriptive text
- [ ] Button labels are clear
- [ ] Language is set correctly (`lang="vi"`)

## Common Patterns

### Modal Dialog

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { trapFocus } from '@/lib/accessibility';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const cleanup = trapFocus(modalRef.current);
      return cleanup;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {title}
        </h2>
        
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        
        {children}
      </div>
    </div>
  );
}
```

### Accordion

```tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className="w-full flex items-center justify-between p-4"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      <div
        id={`panel-${id}`}
        hidden={!isOpen}
        className="p-4 border-t"
      >
        {children}
      </div>
    </div>
  );
}
```

### Tabs

```tsx
'use client';

import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Danh mục khóa học">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Support

For accessibility questions or to report issues:
- Email: accessibility@vitc.edu.vn
- Create an issue with `[A11y]` prefix

Last updated: 2024-01-01
