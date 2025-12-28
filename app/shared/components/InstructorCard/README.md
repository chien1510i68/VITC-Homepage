# InstructorCard Component

A reusable card component for displaying instructor profiles with avatar, name, degree, and specialty.

## Features

- 👤 Circular avatar with hover effects
- 📏 Three size variants (sm, md, lg)
- 🎯 Optional click handler
- 🎓 Optional degree display
- ♿ Full accessibility support
- 📱 Responsive design
- 🎨 Hover animations

## Usage

### Basic Usage

```tsx
import { InstructorCard } from '@/app/shared/components';

const instructor = {
  id: '1',
  name: 'Nguyễn Văn A',
  image: '/instructors/instructor-1.jpg',
  specialty: 'Chuyên gia lập trình web',
  degree: 'Thạc sĩ CNTT',
};

<InstructorCard instructor={instructor} />
```

### With Click Handler

```tsx
<InstructorCard
  instructor={instructor}
  onClick={() => navigate(`/instructors/${instructor.id}`)}
/>
```

### Size Variants

```tsx
// Small
<InstructorCard instructor={instructor} size="sm" />

// Medium (default)
<InstructorCard instructor={instructor} size="md" />

// Large
<InstructorCard instructor={instructor} size="lg" />
```

### Hide Degree

```tsx
<InstructorCard
  instructor={instructor}
  showDegree={false}
/>
```

### In a Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {instructors.map((instructor) => (
    <InstructorCard
      key={instructor.id}
      instructor={instructor}
      onClick={() => handleClick(instructor)}
    />
  ))}
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `instructor` | `Instructor` | Required | Instructor data object |
| `onClick` | `() => void` | `undefined` | Click handler (makes card clickable) |
| `delay` | `number` | `0` | Animation delay in ms |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size variant |
| `showDegree` | `boolean` | `true` | Show/hide degree |
| `className` | `string` | `""` | Additional CSS classes |

## Instructor Type

```typescript
interface Instructor {
  id: string | number;     // Unique identifier
  name: string;           // Full name
  image: string;          // Profile image URL
  specialty: string;      // Area of expertise
  degree?: string;        // Academic degree (optional)
  bio?: string;           // Additional bio (optional)
  experience?: number;    // Years of experience (optional)
}
```

## Size Variants

### Small (`sm`)
- Avatar: 80px (w-20 h-20)
- Compact padding and text sizes
- Best for dense grids

### Medium (`md`) - Default
- Avatar: 112px (w-28 h-28)
- Balanced sizing
- Best for most use cases

### Large (`lg`)
- Avatar: 144px (w-36 h-36)
- Larger text and padding
- Best for featured instructors

## Accessibility

- Proper ARIA labels when clickable
- Keyboard navigation (Enter key)
- Focus-visible ring for keyboard users
- Semantic role attributes
- Screen reader friendly

## Hover Effects

- Card lifts on hover (-translate-y-1)
- Shadow increases (shadow-md → shadow-2xl)
- Avatar ring color changes (slate → sky-600)
- Smooth transitions (300ms duration)
- Motion-reduce support for accessibility

## Migration Guide

### Before (Local Component)

```tsx
// app/ky-nang-mem/components/InstructorCard.tsx
import { InstructorCard } from '../components/InstructorCard';
```

### After (Shared Component)

```tsx
// Use shared component
import { InstructorCard } from '@/app/shared/components';
```

## Related Components

- `FilterButtons` - For filtering instructor lists
- `InstructorCarousel` - For carousel of instructors
- `LeaderCard` - Similar card for leadership team

## Notes

- Image optimization via Next.js `Image` component
- Circular avatar with ring effects
- Line-clamp-2 on specialty text
- Hover states only on clickable cards
- Height: h-full for consistent grid alignment
