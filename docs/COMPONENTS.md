# Components Documentation

Comprehensive guide to the reusable components in the VITC Homepage project.

## 📋 Table of Contents

- [Overview](#overview)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Section Components](#section-components)
- [Shared Components](#shared-components)
- [Component Patterns](#component-patterns)

## 🎨 Overview

Components are organized by their purpose and reusability:

- **`components/ui/`** - Atomic UI primitives (shadcn/ui)
- **`components/layout/`** - Layout-level components (Header, Footer)
- **`components/sections/`** - Page section components
- **`app/[route]/components/`** - Route-specific components
- **`app/shared/components/`** - Shared across routes

## 🧩 UI Components

### Button

Versatile button component with multiple variants.

```typescript
import { Button } from '@/components/ui/button';

<Button variant="default" size="md">
  Click me
</Button>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- Standard button attributes

### Card

Container component for content grouping.

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

### Input

Form input component with consistent styling.

```typescript
import { Input } from '@/components/ui/input';

<Input 
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={handleChange}
/>
```

## 🏗️ Layout Components

### Header

Main navigation header with mega menu.

```typescript
import Header from '@/app/components/layout/Header';

<Header />
```

**Features:**
- Responsive navigation
- Mega menu for courses
- Mobile menu
- Sticky positioning

### Footer

Site footer with links and contact info.

```typescript
import Footer from '@/app/components/layout/Footer';

<Footer />
```

**Includes:**
- Quick links
- Social media links
- Contact information
- Copyright notice

### MegaMenu

Dropdown menu for course categories.

```typescript
import MegaMenu from '@/app/components/layout/MegaMenu';

<MegaMenu />
```

## 📄 Section Components

### HeroSection

Homepage hero section with slider.

```typescript
import HeroSection from '@/app/shared/sections/HeroSection';

<HeroSection />
```

**Features:**
- Auto-playing carousel
- Call-to-action buttons
- Responsive images
- Navigation controls

### FeaturedCoursesSection

Display featured courses in a grid.

```typescript
import FeaturedCoursesSection from '@/app/components/sections/FeaturedCoursesSection';

<FeaturedCoursesSection />
```

**Props:**
```typescript
interface FeaturedCoursesSectionProps {
  courses?: Program[];
  loading?: boolean;
}
```

### AboutSection

About section with timeline or content blocks.

```typescript
import AboutSection from '@/app/tin-hoc/sections/AboutSection';

<AboutSection />
```

## 🔄 Shared Components

### InstructorCard

Display instructor information.

```typescript
import { InstructorCard } from '@/app/shared/components/InstructorCard';

<InstructorCard 
  instructor={{
    id: 1,
    name: 'Nguyễn Văn A',
    image: '/instructors/nva.jpg',
    specialty: 'Web Development',
    title: 'Senior Developer',
    experience: '10+ years',
    students: '500+',
    courses: 15,
  }}
  onClick={() => console.log('Clicked')}
  size="md"
  showDegree={true}
/>
```

**Props:**
```typescript
interface InstructorCardProps {
  instructor: Instructor;
  onClick?: () => void;
  delay?: AnimationDelay;
  size?: 'sm' | 'md' | 'lg';
  showDegree?: boolean;
  className?: string;
}
```

### FilterButtons

Filter buttons with active state.

```typescript
import { FilterButtons } from '@/app/shared/components/FilterButtons';

<FilterButtons 
  filters={[
    { id: 'all', label: 'Tất cả', count: 10 },
    { id: 'web', label: 'Web Development', count: 5 },
  ]}
  activeFilter="all"
  onChange={setActiveFilter}
  variant="primary"
  size="md"
/>
```

**Props:**
```typescript
interface FilterButtonsProps<T extends string = string> {
  filters: FilterOption<T>[];
  activeFilter: T;
  onChange: (filter: T) => void;
  className?: string;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}
```

### TabButtons

Tab navigation component.

```typescript
import { TabButtons } from '@/app/shared/components/TabButtons';

<TabButtons 
  tabs={[
    { id: 'courses', label: 'Khóa học', icon: <BookIcon /> },
    { id: 'news', label: 'Tin tức', icon: <NewsIcon /> },
  ]}
  activeTab="courses"
  onTabChange={setActiveTab}
/>
```

### EmptyState

Display when no data is available.

```typescript
import { EmptyState } from '@/app/shared/components/EmptyState';

<EmptyState 
  variant="no-results"
  title="No results found"
  description="Try different search terms"
  action={{
    label: 'Clear filters',
    onClick: handleClear,
  }}
/>
```

**Variants:**
- `no-results` - No search results
- `no-data` - No data available
- `error` - Error state
- `coming-soon` - Coming soon

### ErrorToast

Toast notification for errors.

```typescript
import { ErrorToast } from '@/app/shared/components/ErrorToast';

<ErrorToast 
  message="An error occurred"
  isVisible={showError}
  onClose={() => setShowError(false)}
  autoHideDuration={5000}
/>
```

### Carousel

Generic carousel component.

```typescript
import { Carousel } from '@/app/shared/components/Carousel';

<Carousel
  items={items}
  renderItem={(item) => <div>{item.content}</div>}
  autoPlay={true}
  interval={5000}
/>
```

### CarouselNavigation

Navigation buttons for carousels.

```typescript
import { CarouselNavigation } from '@/app/shared/components/CarouselNavigation';

<CarouselNavigation 
  onPrevious={handlePrev}
  onNext={handleNext}
  canScrollLeft={true}
  canScrollRight={true}
  variant="default"
/>
```

### CarouselIndicators

Indicators/dots for carousels.

```typescript
import { CarouselIndicators } from '@/app/shared/components/CarouselIndicators';

<CarouselIndicators 
  total={5}
  current={2}
  onSelect={handleSelect}
  variant="dots"
/>
```

**Variants:**
- `dots` - Circular dots
- `lines` - Line indicators

## 🎯 Component Patterns

### Client vs Server Components

```typescript
// Server Component (Default)
// app/courses/CourseList.tsx
import { getCourses } from '@/lib/api/courses';

export default async function CourseList() {
  const courses = await getCourses();
  return <div>{/* Render courses */}</div>;
}

// Client Component (Interactive)
// app/courses/CourseFilter.tsx
'use client';

import { useState } from 'react';

export function CourseFilter() {
  const [category, setCategory] = useState('all');
  return <select onChange={(e) => setCategory(e.target.value)} />;
}
```

### Composition Pattern

```typescript
// Parent component
<Card>
  <CardHeader>
    <CardTitle>Course Title</CardTitle>
    <CardDescription>Course description</CardDescription>
  </CardHeader>
  <CardContent>
    <CourseDetails />
  </CardContent>
  <CardFooter>
    <Button>Enroll Now</Button>
  </CardFooter>
</Card>
```

### Render Props Pattern

```typescript
<DataFetcher
  endpoint="/api/courses"
  render={({ data, loading, error }) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    return <CoursesList courses={data} />;
  }}
/>
```

### Custom Hooks Pattern

```typescript
// lib/hooks/useCourses.ts
export function useCourses(category?: string) {
  const [courses, setCourses] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getPrograms().then(setCourses).finally(() => setLoading(false));
  }, [category]);
  
  return { courses, loading };
}

// Usage in component
function CoursesPage() {
  const { courses, loading } = useCourses('web');
  
  if (loading) return <LoadingSkeleton />;
  return <CoursesList courses={courses} />;
}
```

## 🎨 Styling Guidelines

### Tailwind Classes

Use consistent spacing and sizing:

```typescript
// Spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
<div className="p-4 mb-6 space-y-8">
  
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Colors from design system
<div className="bg-emerald-700 text-white hover:bg-emerald-800">
```

### Component Class Names

Use `cn()` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  variant === 'primary' && 'primary-classes',
  isActive && 'active-classes',
  className // Allow custom className override
)}>
```

## 📚 Best Practices

### 1. Type Safety

Always define props interfaces:

```typescript
interface ComponentProps {
  title: string;
  description?: string;
  onAction: () => void;
}

export function Component({ title, description, onAction }: ComponentProps) {
  // Component logic
}
```

### 2. Documentation

Add JSDoc comments:

```typescript
/**
 * CourseCard component displays course information in a card layout
 * 
 * @param course - The course data to display
 * @param onClick - Optional click handler
 * @returns A card component with course details
 * 
 * @example
 * ```tsx
 * <CourseCard 
 *   course={courseData}
 *   onClick={() => navigate(`/courses/${courseData.id}`)}
 * />
 * ```
 */
export function CourseCard({ course, onClick }: CourseCardProps) {
  // ...
}
```

### 3. Accessibility

Include ARIA attributes:

```typescript
<button 
  aria-label="Close menu"
  aria-expanded={isOpen}
  aria-controls="menu-panel"
>
  <MenuIcon />
</button>
```

### 4. Performance

Memoize expensive computations:

```typescript
import { useMemo } from 'react';

const filteredCourses = useMemo(
  () => courses.filter(c => c.category === category),
  [courses, category]
);
```

---

For more information, see [DEVELOPMENT.md](./DEVELOPMENT.md) and [API.md](./API.md).
