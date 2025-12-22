# Migration Guide - Kỹ Năng Mềm Module Refactoring

## 📋 Tổng quan

Document này hướng dẫn cách sử dụng architecture mới sau khi refactor module Kỹ Năng Mềm.

## 🔄 Những thay đổi chính

### 1. Cấu trúc thư mục mới

**Trước:**
```
app/ky-nang-mem/
├── sections/
│   ├── HeroSoftSkills.tsx (hardcoded data, 200+ lines)
│   ├── FeaturesSoftSkills.tsx (duplicate logic)
│   └── ...
└── page.tsx
```

**Sau:**
```
app/ky-nang-mem/
├── types/          # Type definitions
├── constants/      # Separated data
├── hooks/          # Reusable logic
├── components/     # UI components
├── utils/          # Utility functions
├── sections/       # Clean sections
└── page.tsx
```

### 2. Data Separation

**Trước:**
```typescript
// Hardcoded trong component
const courses = [
  { id: 1, title: 'Kỹ năng giao tiếp', ... },
  { id: 2, title: 'Làm việc nhóm', ... },
];
```

**Sau:**
```typescript
// constants/courses.ts
export const REQUIRED_COURSES: Course[] = [
  { id: 1, title: 'Kỹ năng giao tiếp', category: 'required', ... },
  { id: 2, title: 'Làm việc nhóm', category: 'required', ... },
];

// sections/CoursesByTypeSection.tsx
import { REQUIRED_COURSES, ON_DEMAND_COURSES } from '../constants';
```

### 3. Custom Hooks

**Trước:**
```typescript
// Duplicate Intersection Observer logic in multiple components
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    setIsVisible(entry.isIntersecting);
  }, { threshold: 0.1 });
  
  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

**Sau:**
```typescript
// Reusable hook
import { useIntersectionObserver } from '../hooks';

const sectionRef = useRef<HTMLElement>(null);
const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
```

### 4. Reusable Components

**Trước:**
```typescript
<div className="mb-12">
  <span className="text-sm font-medium text-sky-600">Label</span>
  <h2 className="text-3xl lg:text-4xl font-bold">Title</h2>
  <p className="text-slate-600">Description</p>
</div>
```

**Sau:**
```typescript
import { SectionHeader } from '../components';

<SectionHeader
  label="Label"
  title="Title"
  description="Description"
  align="center"
/>
```

### 5. Design System

**Trước:**
```typescript
// Magic strings everywhere
<div className="py-16 lg:py-24">
  <h1 className="text-4xl lg:text-5xl font-black text-slate-900">
```

**Sau:**
```typescript
import { SECTION_PADDING_LG, HEADING_1 } from '../constants/classNames';

<div className={SECTION_PADDING_LG}>
  <h1 className={HEADING_1}>
```

## 🎯 Migration Patterns

### Pattern 1: Component với Hardcoded Data

**Trước:**
```typescript
export default function MySection() {
  const items = [
    { id: 1, title: 'Item 1', ... },
    { id: 2, title: 'Item 2', ... },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {items.map(item => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </section>
  );
}
```

**Sau:**
```typescript
import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks';
import { Container, AnimatedSection } from '../components';
import { MY_ITEMS } from '../constants/myData';
import { SECTION_PADDING } from '../constants/classNames';
import type { MyItem } from '../types';

export default function MySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className={SECTION_PADDING}>
      <Container>
        {MY_ITEMS.map((item, idx) => (
          <AnimatedSection key={item.id} isVisible={isVisible} delay={idx * 100}>
            <div>{item.title}</div>
          </AnimatedSection>
        ))}
      </Container>
    </section>
  );
}
```

### Pattern 2: Carousel Implementation

**Trước:**
```typescript
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, 3000);
  return () => clearInterval(timer);
}, [items.length]);

const next = () => setCurrentIndex(prev => (prev + 1) % items.length);
const prev = () => setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
```

**Sau:**
```typescript
import { useCarousel } from '../hooks';
import { CarouselNavigation, CarouselIndicators } from '../components';

const { currentIndex, next, prev, goTo } = useCarousel({
  itemsCount: items.length,
  autoPlay: true,
  interval: 3000
});

// Use CarouselNavigation and CarouselIndicators components
<CarouselNavigation onPrev={prev} onNext={next} />
<CarouselIndicators 
  count={items.length} 
  activeIndex={currentIndex} 
  onSelect={goTo} 
/>
```

### Pattern 3: Animated Counter

**Trước:**
```typescript
const [count, setCount] = useState(0);

useEffect(() => {
  if (!isVisible) return;
  
  let start = 0;
  const end = targetValue;
  const duration = 2000;
  const increment = end / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= end) {
      setCount(end);
      clearInterval(timer);
    } else {
      setCount(Math.floor(start));
    }
  }, 16);
  
  return () => clearInterval(timer);
}, [isVisible, targetValue]);
```

**Sau:**
```typescript
import { useCountUp } from '../hooks';

const count = useCountUp(targetValue, isVisible, { 
  duration: 2000,
  easing: 'easeOutQuad' 
});
```

### Pattern 4: Filter Logic

**Trước:**
```typescript
const [activeFilter, setActiveFilter] = useState('all');

const filteredItems = items.filter(item => {
  if (activeFilter === 'all') return true;
  return item.category === activeFilter;
});

// Custom filter buttons
{filters.map(filter => (
  <button
    key={filter.id}
    onClick={() => setActiveFilter(filter.id)}
    className={activeFilter === filter.id ? 'active' : ''}
  >
    {filter.label}
  </button>
))}
```

**Sau:**
```typescript
import { useState, useMemo } from 'react';
import { FilterButtons } from '../components';
import { FILTER_OPTIONS } from '../constants';
import type { FilterType } from '../types';

const [activeFilter, setActiveFilter] = useState<FilterType>('all');

const filteredItems = useMemo(() => {
  if (activeFilter === 'all') return items;
  return items.filter(item => item.category === activeFilter);
}, [activeFilter, items]);

<FilterButtons
  filters={FILTER_OPTIONS}
  activeFilter={activeFilter}
  onChange={setActiveFilter}
/>
```

## 📚 Cheat Sheet

### Import Patterns

```typescript
// Types
import type { Course, Instructor, NewsItem, LibraryItem } from '../types';

// Constants
import { 
  REQUIRED_COURSES, 
  ON_DEMAND_COURSES,
  SAMPLE_NEWS,
  FEATURES,
  SECTION_PADDING,
  HEADING_1,
  CARD_BASE
} from '../constants';

// Hooks
import { 
  useIntersectionObserver,
  useCarousel,
  useCountUp,
  useScrollable
} from '../hooks';

// Components
import {
  SectionHeader,
  Container,
  AnimatedSection,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  ImageWithFallback,
  CarouselNavigation,
  CarouselIndicators,
  FilterButtons,
  EmptyState
} from '../components';

// Utils
import { 
  formatDate,
  formatNumber,
  truncate,
  slugify,
  isValidEmail,
  groupBy
} from '../utils';
```

### Common Component Patterns

#### Section Layout
```typescript
<section ref={sectionRef} className={SECTION_PADDING_LG}>
  <Container maxWidth="7xl">
    <SectionHeader
      label="Label"
      title="Main Title"
      description="Description text"
      align="center"
    />
    
    <AnimatedSection isVisible={isVisible}>
      {/* Content */}
    </AnimatedSection>
  </Container>
</section>
```

#### Card with Content
```typescript
<Card hover shadow="lg">
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>
    <p className={TEXT_BODY}>Content here</p>
  </CardBody>
  <CardFooter className="flex justify-between">
    <span className={TEXT_MUTED}>{formatDate(date)}</span>
    <Button variant="primary" size="sm">Action</Button>
  </CardFooter>
</Card>
```

#### Button Variants
```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## ⚠️ Breaking Changes

### 1. Card Component API Changed
```typescript
// ❌ Old - Using Card.Header
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
</Card>

// ✅ New - Import separately
import { Card, CardHeader, CardBody, CardFooter } from '../components';

<Card>
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

### 2. Type Definitions Updated
```typescript
// ❌ Old
interface LibraryItem {
  id: number; // Only number
  // ... missing type property
}

// ✅ New
interface LibraryItem {
  id: number | string; // Flexible
  type?: 'document' | 'slide' | 'video'; // New property
  // ...
}
```

### 3. Utility Functions Renamed
```typescript
// ❌ Old
import { format } from '../utils';

// ✅ New
import { formatDate, formatNumber, formatCurrency } from '../utils';
```

## 🚀 Quick Start Examples

### Example 1: Simple Section
```typescript
'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks';
import { SectionHeader, Container, AnimatedSection } from '../components';
import { SECTION_PADDING } from '../constants/classNames';

export default function SimpleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className={SECTION_PADDING}>
      <Container>
        <AnimatedSection isVisible={isVisible}>
          <SectionHeader title="Simple Section" />
          <p>Content goes here</p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
```

### Example 2: Section with Data
```typescript
'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks';
import { Card, CardHeader, CardBody, Container } from '../components';
import { MY_DATA } from '../constants/myData';
import { GRID_3 } from '../constants/classNames';
import type { MyDataItem } from '../types';

export default function DataSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef}>
      <Container>
        <div className={GRID_3}>
          {MY_DATA.map(item => (
            <Card key={item.id} hover>
              <CardHeader title={item.title} />
              <CardBody>{item.description}</CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

## ✅ Checklist Migration

- [ ] Move hardcoded data to `constants/`
- [ ] Define TypeScript types in `types/`
- [ ] Extract reusable logic to `hooks/`
- [ ] Replace inline styles with `classNames` constants
- [ ] Use shared components from `components/`
- [ ] Add intersection observer for animations
- [ ] Memoize expensive computations with `useMemo`
- [ ] Use utility functions from `utils/`
- [ ] Add proper TypeScript types to all props
- [ ] Test build successfully

## 📞 Support

Nếu gặp vấn đề trong quá trình migration:
1. Check [README.md](./README.md) for architecture overview
2. Review examples in existing refactored sections
3. Check TypeScript errors for type mismatches
4. Ensure all imports use barrel files (index.ts)

---

**Version:** 2.0.0  
**Last Updated:** January 2025
