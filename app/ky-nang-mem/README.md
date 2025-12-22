# Kỹ Năng Mềm Module - Architecture Documentation

## 📁 Cấu trúc thư mục

```
app/ky-nang-mem/
├── types/              # TypeScript type definitions
├── constants/          # Data constants và configuration
├── hooks/              # Custom React hooks
├── components/         # Reusable UI components
├── utils/              # Utility functions
├── sections/           # Page sections/containers
└── page.tsx           # Main page component
```

## 🎯 Kiến trúc

### 1. **Types** (`types/`)
Định nghĩa TypeScript cho toàn bộ module.

**Files:**
- `index.ts` - Central type definitions

**Key Types:**
- `Course` - Khóa học kỹ năng mềm
- `NewsItem` - Tin tức/thông báo
- `LibraryItem` - Tài liệu thư viện
- `Instructor` - Giảng viên
- `Leader` - Ban lãnh đạo
- `Feature` - Tính năng/đặc điểm
- `FilterType` - Filter types cho instructor

### 2. **Constants** (`constants/`)
Separation of data from components, enabling easy updates without code changes.

**Files:**
- `courses.ts` - Danh sách khóa học (bắt buộc, theo yêu cầu)
- `hero.ts` - Hero carousel images và stats
- `features.ts` - Features/benefits data
- `introduction.ts` - Giới thiệu cơ sở vật chất
- `instructors.ts` - Danh sách giảng viên, ban lãnh đạo
- `news.ts` - Tin tức mẫu
- `library.ts` - Thư viện tài liệu
- `styles.ts` - Design tokens (colors, spacing, shadows, etc.)
- `classNames.ts` - Common CSS class combinations
- `index.ts` - Centralized exports

**Design System:**
```typescript
// Colors
COLORS.primary[600] // Sky blue
COLORS.secondary[600] // Emerald green
COLORS.success[600] // Green
COLORS.warning[600] // Amber
COLORS.danger[600] // Red

// Spacing
SPACING.xs // 0.5rem
SPACING.sm // 1rem
SPACING.md // 1.5rem
SPACING.lg // 2rem
SPACING.xl // 3rem

// Common Patterns
SECTION_PADDING // py-16 lg:py-24
HEADING_1 // text-4xl lg:text-5xl font-black
CARD_BASE // bg-white rounded-3xl border shadow-md
GRADIENT_PRIMARY // from-sky-600 to-sky-400
```

### 3. **Hooks** (`hooks/`)
Reusable logic extracted into custom hooks.

**Files:**
- `useIntersectionObserver.ts` - Scroll visibility detection
- `useCarousel.ts` - Auto-play carousel with controls
- `useCountUp.ts` - Animated number counting
- `useScrollable.ts` - Horizontal scroll with navigation
- `index.ts` - Centralized exports

**Usage:**
```typescript
// Intersection Observer
const ref = useRef<HTMLElement>(null);
const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

// Carousel
const { currentIndex, next, prev, goTo } = useCarousel({ 
  itemsCount: 5, 
  autoPlay: true 
});

// Count Up Animation
const count = useCountUp(target, isVisible, { duration: 2000 });

// Scrollable
const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollable();
```

### 4. **Components** (`components/`)
Modular, reusable UI components with consistent API.

#### Layout Components
- `SectionHeader` - Section title với label, description
- `Container` - Responsive container với max-width options
- `AnimatedSection` - Intersection observer + fade-in animations

#### UI Components
- `Button` - CVA variants (primary, secondary, outline, ghost)
- `Card` - Card với Header, Body, Footer sub-components
- `Badge` - Colored badges/tags
- `EmptyState` - Empty state placeholder
- `ImageWithFallback` - Image với fallback gradient

#### Interactive Components
- `CarouselNavigation` - Previous/Next buttons
- `CarouselIndicators` - Dot indicators
- `FilterButtons` - Styled filter button group

#### Display Components
- `StatGrid` - Animated statistics grid
- `FeatureIcon` - Icon với target counting

#### Domain Components
- `InstructorCard` - Instructor profile card
- `LeaderCard` - Leadership profile card
- `InstructorCarousel` - Scrollable instructor carousel

#### Performance-Optimized
- `Memoized.tsx` - React.memo wrapped components

**Example:**
```typescript
<Card hover shadow="lg">
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

### 5. **Utils** (`utils/`)
Pure utility functions for common operations.

**Files:**
- `animations.ts` - Animation durations, transitions
- `formatters.ts` - String, number, date formatting
- `validators.ts` - Input validation
- `helpers.ts` - Array/object manipulation
- `index.ts` - Centralized exports

**Functions:**
```typescript
// Formatters
formatDate('15/01/2025') // '15/01/2025' hoặc formatted
formatNumber(1500000) // '1,500,000'
formatCurrency(99000) // '99,000 đ'
truncate(text, 50) // Text truncated to 50 chars
slugify('Kỹ Năng Mềm') // 'ky-nang-mem'

// Validators
isValidEmail('test@example.com') // true
isValidPhone('0123456789') // true
isEmpty(value) // true/false

// Helpers
groupBy(array, 'category') // { category1: [...], category2: [...] }
unique(array) // Remove duplicates
chunk(array, 3) // [[1,2,3], [4,5,6]]
shuffle(array) // Randomize array
```

### 6. **Sections** (`sections/`)
Page-level sections that compose components and hooks.

**Files:**
- `HeroSoftSkills.tsx` - Hero carousel với stats
- `FeaturesSoftSkills.tsx` - Features grid với count-up animations
- `CoursesByTypeSection.tsx` - Course filtering và cards
- `CourseCard.tsx` - Individual course card
- `IntroductionSection.tsx` - Cơ sở vật chất introduction
- `InstructorsSection.tsx` - Giảng viên showcase với filter
- `NewsSection.tsx` - Tin tức grid (main + sidebar)
- `ThuVienSection.tsx` - Library items grid
- `PartnersSection.tsx` - Partners slider

## 🎨 Design System

### Colors
- **Primary:** Sky Blue (#0EA5E9)
- **Secondary:** Emerald Green (#10B981)
- **Accent:** Gradient (sky → emerald)

### Typography Scale
```
HEADING_1: text-4xl lg:text-5xl font-black
HEADING_2: text-3xl lg:text-4xl font-bold
HEADING_3: text-2xl lg:text-3xl font-bold
HEADING_4: text-xl lg:text-2xl font-semibold
TEXT_BODY: text-base text-slate-700
TEXT_SUBTITLE: text-lg text-slate-600
TEXT_MUTED: text-xs text-slate-500
```

### Spacing System
- `xs`: 0.5rem (8px)
- `sm`: 1rem (16px)
- `md`: 1.5rem (24px)
- `lg`: 2rem (32px)
- `xl`: 3rem (48px)
- `2xl`: 4rem (64px)
- `3xl`: 6rem (96px)

### Border Radius
- `sm`: 0.5rem
- `md`: 0.75rem
- `lg`: 1rem
- `xl`: 1.5rem
- `2xl`: 2rem
- `3xl`: 3rem
- `full`: 9999px

## 🚀 Performance Optimizations

### 1. **React.memo**
Components wrapped in memo to prevent unnecessary re-renders:
- `MemoizedInstructorCard`
- `MemoizedLeaderCard`
- `MemoizedButton`
- `MemoizedBadge`
- `MemoizedCard`

### 2. **useMemo**
Memoized computed values:
```typescript
const filteredInstructors = useMemo(() => {
  if (activeFilter === 'all') return allInstructors;
  return instructors.filter(i => i.type === activeFilter);
}, [activeFilter]);
```

### 3. **Lazy Loading**
- Images use `ImageWithFallback` with fallback gradients
- Intersection Observer for animations (only animate when visible)

### 4. **Code Splitting**
- Constants separated into individual files
- Tree-shaking enabled via ES6 exports

## 📝 Best Practices

### 1. **Import Pattern**
```typescript
// Good - Named imports from barrel files
import { Button, Card, Badge } from '../components';
import { SAMPLE_COURSES, FEATURES } from '../constants';
import { useCarousel, useIntersectionObserver } from '../hooks';

// Avoid - Deep imports
import Button from '../components/Button';
```

### 2. **Component Structure**
```typescript
'use client'; // If using hooks

import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks';
import { SectionHeader, Container } from '../components';
import { SECTION_PADDING } from '../constants/classNames';

export default function MySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className={SECTION_PADDING}>
      <Container>
        <SectionHeader title="Title" />
        {/* Content */}
      </Container>
    </section>
  );
}
```

### 3. **Type Safety**
```typescript
// Always define types for props
interface MyComponentProps {
  title: string;
  items: Course[];
  onSelect?: (id: number) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, items }) => {
  // Implementation
};
```

### 4. **Constant Usage**
```typescript
// Good - Use design tokens
<div className={`${HEADING_1} ${TEXT_GRADIENT} ${SECTION_PADDING}`}>

// Avoid - Magic strings
<div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-sky-600">
```

## 🔧 Adding New Features

### 1. Add New Section
```bash
# 1. Create section file
app/ky-nang-mem/sections/NewSection.tsx

# 2. Add constants (if needed)
app/ky-nang-mem/constants/newData.ts

# 3. Add types (if needed)
app/ky-nang-mem/types/index.ts

# 4. Import and use in page.tsx
```

### 2. Add New Component
```bash
# 1. Create component file
app/ky-nang-mem/components/NewComponent.tsx

# 2. Export from index.ts
export { NewComponent } from './NewComponent';

# 3. Use in sections
import { NewComponent } from '../components';
```

### 3. Add New Hook
```bash
# 1. Create hook file
app/ky-nang-mem/hooks/useNewHook.ts

# 2. Export from index.ts
export { useNewHook } from './useNewHook';

# 3. Use in components
import { useNewHook } from '../hooks';
```

## 🧪 Testing Recommendations

### Unit Tests
```typescript
// Test utilities
describe('formatters', () => {
  test('formatNumber adds thousand separators', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});

// Test hooks
describe('useCarousel', () => {
  test('advances to next item', () => {
    const { result } = renderHook(() => useCarousel({ itemsCount: 5 }));
    act(() => result.current.next());
    expect(result.current.currentIndex).toBe(1);
  });
});
```

### Integration Tests
```typescript
// Test sections
describe('HeroSoftSkills', () => {
  test('renders carousel with navigation', () => {
    render(<HeroSoftSkills />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
```

## 📊 Metrics & Analytics

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Code Quality
- TypeScript strict mode: ✅
- No `any` types: ✅
- ESLint passing: ✅
- Build succeeding: ✅

## 🔄 Maintenance

### Regular Tasks
1. **Update Constants:** Refresh course data, news, library items
2. **Image Optimization:** Compress and convert to WebP
3. **Dependency Updates:** Keep packages up-to-date
4. **Performance Monitoring:** Check Core Web Vitals
5. **Accessibility Audit:** WCAG 2.1 AA compliance

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Constants used instead of hardcoded values
- [ ] Components properly memoized (if expensive)
- [ ] Hooks follow naming convention (use*)
- [ ] Accessibility attributes present
- [ ] Responsive design tested
- [ ] No console errors/warnings
- [ ] Build passes successfully

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [class-variance-authority](https://cva.style/docs)

---

**Last Updated:** January 2025  
**Maintainer:** Development Team  
**Version:** 2.0.0 (Refactored Architecture)
