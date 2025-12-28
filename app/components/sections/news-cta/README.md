# NewsCTASection Refactoring - Single Responsibility Principle

## Overview
The NewsCTASection component has been refactored to follow the Single Responsibility Principle (SRP). Each component now has a single, well-defined responsibility.

## Component Structure

### 1. **NewsCTASection** (Main Component)
- **Responsibility**: Layout orchestration and composition
- **Purpose**: Combines all sub-components into the final section layout
- **Dependencies**: SectionHeader, NewsGrid, CTAPanel

### 2. **SectionHeader**
- **Responsibility**: Section title and description display
- **Features**: 
  - Animated entrance
  - Configurable title and description
  - Responsive typography

### 3. **NewsGrid**
- **Responsibility**: News articles display and navigation
- **Features**:
  - Grid layout for compact news cards
  - "View all" navigation link
  - Configurable number of displayed articles
  - Animated elements

### 4. **CTAPanel**
- **Responsibility**: Call-to-action functionality management
- **Features**:
  - Mode switching (consultation vs hotline)
  - State management for active mode
  - Conditional rendering of form/hotline content

## Benefits of Refactoring

1. **Maintainability**: Each component has a clear, single purpose
2. **Reusability**: Components can be used independently in other sections
3. **Testability**: Easier to unit test individual responsibilities
4. **Readability**: Clear separation of concerns makes code easier to understand
5. **Flexibility**: Components can be easily modified or replaced without affecting others

## File Structure
```
news-cta/
├── index.ts              # Barrel exports
├── types.ts              # Shared types
├── data.ts               # News data
├── SectionHeader.tsx     # Header component
├── NewsGrid.tsx          # News display component
├── CTAPanel.tsx          # CTA functionality component
├── CompactNewsCard.tsx   # Individual news card
├── ConsultationForm.tsx  # Form component
└── HotlineBox.tsx        # Hotline display component
```

## Usage Example
```tsx
<NewsCTASection />
// or individual components
<SectionHeader title="Custom Title" description="Custom description" />
<NewsGrid articles={articles} maxItems={4} />
<CTAPanel defaultMode="hotline" />
```