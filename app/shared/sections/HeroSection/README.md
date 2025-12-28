# HeroSection Component

A reusable full-width hero carousel/slider component with auto-play, navigation arrows, and dot indicators.

## Features

- 🎬 Auto-play with configurable interval
- ⬅️➡️ Navigation arrows
- 🔘 Dot indicators
- 🎨 Customizable slides with images, titles, descriptions
- 📱 Fully responsive
- ⚡ Optimized with Next.js Image component
- 🎯 TypeScript support
- ⏯️ Auto-pause on manual navigation

## Usage

### Basic Usage

```tsx
import { HeroSection } from '@/app/shared/sections';

export default function Page() {
  return <HeroSection />;
}
```

### Custom Slides

```tsx
import { HeroSection, type Slide } from '@/app/shared/sections';

const customSlides: Slide[] = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    title: 'Khóa học mới 2025',
    description: 'Đăng ký ngay để nhận ưu đãi',
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    title: 'Chứng chỉ quốc tế',
    description: 'Nâng cao tay nghề với các chứng chỉ uy tín',
  },
];

export default function Page() {
  return (
    <HeroSection
      slides={customSlides}
      height="h-screen"
      autoPlayInterval={3000}
    />
  );
}
```

### Without Navigation

```tsx
<HeroSection
  showNavigation={false}
  showIndicators={false}
  autoPlayInterval={0}
/>
```

### Full Customization

```tsx
<HeroSection
  slides={mySlides}
  height="h-[80vh]"
  autoPlayInterval={4000}
  showNavigation={true}
  showIndicators={true}
  className="border-b-4 border-green-600"
  imageQuality={95}
  transitionDuration={800}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `Slide[]` | Default VISC slides | Array of slide objects |
| `height` | `string` | `"h-[65vh]"` | Tailwind height class |
| `autoPlayInterval` | `number` | `5000` | Auto-play interval in ms (0 to disable) |
| `showNavigation` | `boolean` | `true` | Show/hide arrow buttons |
| `showIndicators` | `boolean` | `true` | Show/hide dot indicators |
| `className` | `string` | `""` | Additional CSS classes |
| `imageQuality` | `number` | `90` | Next.js image quality (1-100) |
| `transitionDuration` | `number` | `1000` | Transition duration in ms |

## Slide Type

```typescript
interface Slide {
  id: number | string;      // Unique identifier
  image: string;           // Image URL or path
  title?: string;          // Optional title
  description?: string;    // Optional description
  highlight?: {            // Optional highlight badge
    title: string;
    content: string;
  };
}
```

## Behavior

- **Auto-play**: Slides automatically advance every `autoPlayInterval` milliseconds
- **Manual Navigation**: Clicking arrows or dots pauses auto-play
- **Keyboard**: Users can navigate with arrow keys (browser default)
- **Touch**: Swipe gestures work on mobile devices (browser default)

## Accessibility

- Navigation buttons have proper `aria-label` attributes
- First slide image is prioritized for faster loading
- Alt text automatically generated from slide title

## Migration Guide

### Before (Duplicate Code)

```tsx
// app/tin-hoc/sections/HeroSection.tsx
import HeroSection from "./sections/HeroSection";

<HeroSection />
```

### After (Shared Component)

```tsx
// Use shared component
import { HeroSection } from '@/app/shared/sections';

// With custom props if needed
<HeroSection
  height="h-screen"
  autoPlayInterval={3000}
/>
```

## Default Data

The component comes with default VISC hero slides. See [constants.ts](./constants.ts) for the complete default dataset.

## Performance

- Uses Next.js `Image` component for automatic optimization
- First slide is prioritized (`priority={true}`)
- Lazy loading for subsequent slides
- Configurable image quality

## Related Components

- `LookupSection` - For exam score/certificate lookup
- `ScheduleSection` - For class schedule tables

## Notes

- Auto-play pauses when user interacts with navigation
- Supports both remote URLs and local image paths
- Single slide will hide navigation/indicators automatically
- Text overlay renders only if slide has title/description
