# Design System Documentation

Complete design system guide for the VITC Homepage project.

## 📋 Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Patterns](#patterns)
- [Usage Guidelines](#usage-guidelines)

## 🎨 Overview

The VITC Design System provides a consistent visual language and component library for building the website. All design tokens are centralized in `lib/design-tokens.ts`.

### Quick Start

```typescript
import { designTokens } from '@/lib/design-tokens';

// Use design tokens
const { colors, typography, spacing } = designTokens;
```

## 🌟 Design Principles

### 1. **Consistency**
- Use defined tokens for all design decisions
- Maintain visual hierarchy
- Follow established patterns

### 2. **Accessibility**
- WCAG 2.1 AA compliant
- Minimum contrast ratio 4.5:1
- Keyboard navigable
- Screen reader friendly

### 3. **Responsiveness**
- Mobile-first approach
- Fluid typography and spacing
- Adaptive layouts

### 4. **Performance**
- Optimized images
- Minimal CSS
- Efficient animations

## 🎨 Colors

### Brand Colors

#### Primary Green
The main brand color representing growth, education, and trust.

```typescript
colors.primary = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',  // Main
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
}
```

**Usage:**
- Primary buttons
- Links
- Key highlights
- Success states

**Tailwind:**
```html
<div className="bg-primary-500 text-white">Primary</div>
<button className="bg-primary-600 hover:bg-primary-700">Button</button>
```

#### Accent Orange
Secondary color for emphasis and calls-to-action.

```typescript
colors.accent = {
  500: '#f97316',  // Main
  600: '#ea580c',
  700: '#c2410c',
}
```

**Usage:**
- Secondary buttons
- Highlights
- Hot tags
- Important badges

### Neutral Colors

#### Gray Scale
For text, backgrounds, and UI elements.

```typescript
colors.gray = {
  50: '#f8fafc',   // Lightest background
  100: '#f1f5f9',  // Light background
  200: '#e2e8f0',  // Borders
  300: '#cbd5e1',  // Disabled
  400: '#94a3b8',  // Muted text
  500: '#64748b',  // Secondary text
  600: '#475569',  // Primary text
  700: '#334155',  // Headings
  800: '#1e293b',  // Dark background
  900: '#0f172a',  // Darkest
}
```

### Semantic Colors

```typescript
// Success
colors.success.DEFAULT = '#10b981';

// Warning
colors.warning.DEFAULT = '#f59e0b';

// Error
colors.error.DEFAULT = '#ef4444';

// Info
colors.info.DEFAULT = '#3b82f6';
```

### Color Accessibility

**Contrast Requirements:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Approved Combinations:**
✅ White text on Primary 600+ (7.2:1)
✅ Primary 700 text on white (4.6:1)
✅ Gray 600 text on white (7.1:1)

## ✍️ Typography

### Font Families

```typescript
typography.fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],       // Body text
  serif: ['Playfair Display', 'Georgia', 'serif'],   // Headings
  display: ['Montserrat', 'Inter', 'sans-serif'],   // Hero text
  mono: ['Fira Code', 'Courier New', 'monospace'],  // Code
}
```

### Font Sizes

```typescript
typography.fontSize = {
  xs: '0.75rem',      // 12px - Fine print
  sm: '0.875rem',     // 14px - Small text
  base: '1rem',       // 16px - Body text
  lg: '1.125rem',     // 18px - Lead text
  xl: '1.25rem',      // 20px - Small headings
  '2xl': '1.5rem',    // 24px - H4
  '3xl': '1.875rem',  // 30px - H3
  '4xl': '2.25rem',   // 36px - H2
  '5xl': '3rem',      // 48px - H1
  '6xl': '3.75rem',   // 60px - Display
  '7xl': '4.5rem',    // 72px - Hero
}
```

### Font Weights

```typescript
fontWeight = {
  light: 300,      // Subtle text
  normal: 400,     // Body text
  medium: 500,     // Emphasis
  semibold: 600,   // Subheadings
  bold: 700,       // Headings
  extrabold: 800,  // Strong emphasis
}
```

### Typography Scale

#### Headings

```html
<!-- H1 - Page title -->
<h1 className="font-display text-5xl font-bold text-gray-900">
  Main Heading
</h1>

<!-- H2 - Section title -->
<h2 className="font-serif text-4xl font-bold text-gray-800">
  Section Heading
</h2>

<!-- H3 - Subsection -->
<h3 className="font-sans text-3xl font-semibold text-gray-700">
  Subsection
</h3>

<!-- H4 - Card title -->
<h4 className="font-sans text-2xl font-semibold text-gray-700">
  Card Title
</h4>
```

#### Body Text

```html
<!-- Lead paragraph -->
<p className="text-lg text-gray-600 leading-relaxed">
  Lead paragraph with larger text
</p>

<!-- Normal paragraph -->
<p className="text-base text-gray-600 leading-normal">
  Regular body text
</p>

<!-- Small text -->
<p className="text-sm text-gray-500">
  Supporting information
</p>
```

## 📏 Spacing

### Spacing Scale

Based on 4px base unit:

```typescript
spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',    // Base unit
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
}
```

### Usage Guidelines

**Micro spacing (4-8px):**
- Icon to text
- List item spacing

**Small spacing (12-16px):**
- Component internal padding
- Form field spacing

**Medium spacing (24-32px):**
- Card padding
- Section gaps

**Large spacing (48-96px):**
- Section padding
- Page margins

### Examples

```html
<!-- Card with consistent spacing -->
<div className="p-6 space-y-4">
  <h3 className="mb-2">Title</h3>
  <p className="mb-4">Content</p>
  <button className="mt-6">Action</button>
</div>

<!-- Section spacing -->
<section className="py-16 md:py-24">
  <div className="container px-4">
    <h2 className="mb-12">Section Title</h2>
  </div>
</section>
```

## 🧩 Components

### Buttons

#### Sizes

```html
<!-- Small -->
<button className="h-8 px-4 text-sm">Small</button>

<!-- Medium (Default) -->
<button className="h-10 px-5 text-base">Medium</button>

<!-- Large -->
<button className="h-12 px-6 text-lg">Large</button>
```

#### Variants

```html
<!-- Primary -->
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Primary
</button>

<!-- Secondary -->
<button className="bg-gray-200 hover:bg-gray-300 text-gray-900">
  Secondary
</button>

<!-- Outline -->
<button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50">
  Outline
</button>

<!-- Ghost -->
<button className="text-primary-600 hover:bg-primary-50">
  Ghost
</button>
```

### Cards

```html
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600 mb-4">Card description</p>
  <button>Action</button>
</div>
```

### Inputs

```html
<input 
  type="text"
  className="w-full h-10 px-4 border-2 border-gray-200 rounded-lg
             focus:border-primary-500 focus:ring-2 focus:ring-primary-200
             transition-all"
  placeholder="Enter text"
/>
```

## 🎭 Patterns

### Grid Layouts

```html
<!-- 3-column grid -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Hero Section

```html
<section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-24">
  <div className="container mx-auto px-4">
    <h1 className="text-6xl font-bold mb-6">Hero Title</h1>
    <p className="text-xl mb-8">Hero description</p>
    <button>Call to Action</button>
  </div>
</section>
```

### Card Grid

```html
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Section Title</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

## 📐 Responsive Design

### Breakpoints

```typescript
breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Usage

```html
<!-- Responsive text -->
<h1 className="text-3xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>

<!-- Responsive layout -->
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Responsive spacing -->
<section className="py-12 md:py-16 lg:py-24">
  Content
</section>
```

## ✨ Animations

### Duration

```typescript
duration = {
  75: '75ms',    // Instant
  150: '150ms',  // Quick
  300: '300ms',  // Normal
  500: '500ms',  // Slow
}
```

### Examples

```html
<!-- Hover effect -->
<button className="transition-all duration-300 hover:scale-105">
  Hover Me
</button>

<!-- Fade in -->
<div className="animate-fadeIn opacity-0">
  Fades in
</div>

<!-- Slide up -->
<div className="transition-transform duration-300 hover:-translate-y-1">
  Slides up on hover
</div>
```

## 📚 Usage Guidelines

### Do's ✅

- Use design tokens from `lib/design-tokens.ts`
- Follow the spacing scale
- Maintain color contrast ratios
- Use semantic color names
- Test on mobile devices
- Follow responsive patterns

### Don'ts ❌

- Don't use arbitrary values
- Don't mix inconsistent spacing
- Don't ignore accessibility
- Don't create new color shades
- Don't skip mobile testing
- Don't inline styles without tokens

## 🔧 Implementation

### Import Tokens

```typescript
import { designTokens } from '@/lib/design-tokens';

const { colors, typography, spacing } = designTokens;
```

### Use in Components

```typescript
import { designTokens } from '@/lib/design-tokens';

export function MyButton() {
  return (
    <button 
      className="h-10 px-5"
      style={{
        backgroundColor: designTokens.colors.primary.DEFAULT,
        borderRadius: designTokens.borderRadius.lg,
      }}
    >
      Click me
    </button>
  );
}
```

---

For more information, see [COMPONENTS.md](./COMPONENTS.md) and [DEVELOPMENT.md](./DEVELOPMENT.md).
