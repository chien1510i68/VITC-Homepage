# SimpleFeaturedCoursesSection Refactoring - Single Responsibility Principle

## Overview
The SimpleFeaturedCoursesSection component has been refactored to follow the Single Responsibility Principle (SRP). Each component now has a single, well-defined responsibility.

## Component Structure

### 1. **SimpleFeaturedCoursesSection** (Main Component)
- **Responsibility**: Layout orchestration and composition
- **Purpose**: Combines all sub-components into the final section layout
- **Dependencies**: SectionHeader, CourseRow, CTAButton, Styles

### 2. **SectionHeader**
- **Responsibility**: Section title and description display
- **Features**: 
  - Animated entrance with framer-motion
  - Configurable title and description
  - Responsive typography

### 3. **CourseRow**
- **Responsibility**: Course carousel management with auto-scrolling
- **Features**:
  - Auto-scrolling in left/right directions
  - Manual navigation with pause/resume functionality
  - Scroll position tracking for button states
  - Mobile scroll indicators
  - Responsive design

### 4. **CourseCard**
- **Responsibility**: Individual course display
- **Features**:
  - Course image with error handling
  - Price badge display
  - Hover animations
  - Responsive layout
  - Call-to-action button

### 5. **NavigationButtons**
- **Responsibility**: Manual navigation controls
- **Features**:
  - Left/right navigation buttons
  - Disabled state management
  - Hover animations
  - Mobile-only visibility

### 6. **CTAButton**
- **Responsibility**: Main call-to-action functionality
- **Features**:
  - Configurable onClick handler
  - Responsive text display
  - Hover and tap animations

### 7. **Styles**
- **Responsibility**: CSS styles management
- **Features**:
  - Text clamping utilities
  - Scrollbar hiding styles
  - Centralized styling

## Benefits of Refactoring

1. **Maintainability**: Each component has a clear, single purpose
2. **Reusability**: Components can be used independently in other sections
3. **Testability**: Easier to unit test individual responsibilities
4. **Readability**: Clear separation of concerns makes code easier to understand
5. **Flexibility**: Components can be easily modified or replaced without affecting others
6. **Type Safety**: Proper TypeScript interfaces for all components

## File Structure
```
simple-featured-courses/
├── index.ts                  # Barrel exports
├── data.ts                   # Course data and types
├── SectionHeader.tsx         # Header component
├── CourseRow.tsx             # Course carousel component
├── CourseCard.tsx            # Individual course card
├── NavigationButtons.tsx     # Navigation controls
├── CTAButton.tsx             # Call-to-action button
└── Styles.tsx                # CSS styles component
```

## Usage Example
```tsx
// Use the complete section
<SimpleFeaturedCoursesSection />

// Or use individual components
<SectionHeader 
  title="Custom Title" 
  description="Custom description" 
/>

<CourseRow 
  title="Custom Course Category"
  courses={customCourses}
  direction="left"
/>

<CTAButton onClick={handleCustomClick} />
```

## Data Structure
```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
}
```

## Auto-Scroll Logic
- Each CourseRow has independent auto-scrolling
- Direction can be set to 'left' or 'right'
- Auto-scroll pauses when user manually navigates
- Resumes after 5 seconds of inactivity
- Scroll position tracking for navigation button states