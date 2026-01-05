# API Architecture Overview

## Modular Structure

The API layer has been refactored into a modular architecture where each domain has its own file:

### Files by Domain

| File | Purpose | Functions |
|------|---------|-----------|
| **base.ts** | Base utilities and config | `fetchWithTimeout()`, `API_BASE_URL`, `API_TIMEOUT` |
| **courses.ts** | Courses management | `getCourses()`, `getCourseById()`, `getCoursesByCategory()` |
| **instructors.ts** | Instructors management | `getInstructors()`, `getInstructorById()` |
| **news.ts** | News articles | `getNews()`, `getNewsById()` |
| **schedules.ts** | Course schedules | `getCourseSchedules()` |
| **about.ts** | About/Timeline | `getAboutTimeline()` |
| **lookup.ts** | Lookup services | `lookupExamResults()`, `lookupCertificate()` |
| **forms.ts** | Form submissions | `submitConsultationForm()` |

### Shared Files

| File | Purpose |
|------|---------|
| **types.ts** | TypeScript type definitions |
| **mockData.ts** | Mock data for fallback |
| **index.ts** | Main exports and unified API object |
| **client.ts** | Backward compatibility wrapper |

## Benefits

### 1. Better Organization
- Each domain is isolated in its own file
- Easier to find and modify specific functionality
- Clear separation of concerns

### 2. Better Maintainability
- Changes to one domain don't affect others
- Easier to test individual modules
- Simpler code reviews

### 3. Better Performance
- Tree-shaking can remove unused modules
- Smaller bundle sizes for specific imports
- Faster development builds

### 4. Backward Compatibility
- Existing code continues to work
- `client.ts` re-exports everything
- Unified `api` object still available

## Migration Guide

### Before (Old Way)
```typescript
import { api } from '@/lib/api/client';
const courses = await api.getCourses();
```

### After (Recommended)
```typescript
// Option 1: Still works - no changes needed
import { api } from '@/lib/api';
const courses = await api.getCourses();

// Option 2: Direct import (better tree-shaking)
import { getCourses } from '@/lib/api/courses';
const courses = await getCourses();

// Option 3: Named imports from main index
import { getCourses, getInstructors } from '@/lib/api';
const courses = await getCourses();
```

## No Breaking Changes

All existing code will continue to work without any modifications. The refactoring is purely internal and maintains full backward compatibility.
