# FilterButtons Component

A reusable filter button group component with active state management and visual variants.

## Features

- 🎨 Multiple visual variants (gradient, solid, outline)
- 📏 Three size options (sm, md, lg)
- 🔢 Optional count badges
- ♿ Full accessibility support
- 📱 Mobile-friendly with horizontal scroll
- 🎯 TypeScript generic support for type-safe filter IDs

## Usage

### Basic Usage

```tsx
import { FilterButtons } from '@/app/shared/components';

const filters = [
  { id: 'all', label: 'Tất cả' },
  { id: 'tech', label: 'Công nghệ' },
  { id: 'soft', label: 'Kỹ năng mềm' },
];

const [activeFilter, setActiveFilter] = useState('all');

<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
/>
```

### With Count Badges

```tsx
const filters = [
  { id: 'all', label: 'Tất cả', count: 25 },
  { id: 'internal', label: 'Nội bộ', count: 10 },
  { id: 'external', label: 'Bên ngoài', count: 15 },
];

<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
/>
```

### Different Variants

```tsx
// Gradient (default)
<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
  variant="gradient"
/>

// Solid
<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
  variant="solid"
/>

// Outline
<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
  variant="outline"
/>
```

### Size Variants

```tsx
// Small
<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
  size="sm"
/>

// Large
<FilterButtons
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
  size="lg"
/>
```

### Type-Safe with TypeScript

```tsx
type CourseFilter = 'all' | 'beginner' | 'advanced' | 'expert';

const filters: Filter<CourseFilter>[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'beginner', label: 'Cơ bản' },
  { id: 'advanced', label: 'Nâng cao' },
  { id: 'expert', label: 'Chuyên gia' },
];

const [activeFilter, setActiveFilter] = useState<CourseFilter>('all');

<FilterButtons<CourseFilter>
  filters={filters}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filters` | `Filter<T>[]` | Required | Array of filter options |
| `activeFilter` | `T` | Required | Currently active filter ID |
| `onChange` | `(filter: T) => void` | Required | Callback when filter changes |
| `className` | `string` | `""` | Additional CSS classes |
| `variant` | `'gradient' \| 'solid' \| 'outline'` | `'gradient'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |

## Filter Type

```typescript
interface Filter<T extends string = string> {
  id: T;              // Unique identifier
  label: string;      // Display text
  count?: number;     // Optional count badge
}
```

## Variants

### Gradient (Default)
- Active: Sky-to-emerald gradient with white text
- Inactive: White background with hover effects
- Best for modern, vibrant designs

### Solid
- Active: Solid green background
- Inactive: Gray background with hover
- Best for clean, professional designs

### Outline
- Active: Green border with light background
- Inactive: Gray border
- Best for minimal, outline-focused designs

## Accessibility

- Proper `aria-pressed` for active state
- Descriptive `aria-label` for screen readers
- Keyboard navigation support
- Focus-visible states

## Migration Guide

### Before (Local Component)

```tsx
// app/ky-nang-mem/components/FilterButtons.tsx
import { FilterButtons } from '../components/FilterButtons';
```

### After (Shared Component)

```tsx
// Use shared component
import { FilterButtons } from '@/app/shared/components';
```

## Related Components

- `SearchForm` - For search input with filters
- `DataTable` - For filterable data tables

## Notes

- Horizontal scrolling on mobile for many filters
- Smooth transitions for active state changes
- Count badges automatically styled with opacity
- Generic TypeScript support for compile-time safety
