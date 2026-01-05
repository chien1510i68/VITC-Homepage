# Development Guide

Complete guide for developers working on the VITC Homepage project.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Development Tools](#development-tools)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/vitc-homepage.git
cd vitc-homepage

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Future scripts (when testing is set up)
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📁 Project Structure

```
vitc-homepage/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   │   ├── khoa-hoc/     # Courses page
│   │   ├── tin-tuc-thong-bao/  # News page
│   │   ├── lien-he/      # Contact page
│   │   └── ...
│   ├── api/              # API routes
│   ├── components/       # Page-specific components
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── loading.tsx       # Loading UI
│   ├── error.tsx         # Error boundary
│   ├── not-found.tsx     # 404 page
│   └── globals.css       # Global styles
│
├── components/            # Reusable components
│   ├── ui/               # UI primitives (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── sections/         # Page sections
│       └── ...
│
├── lib/                  # Utilities and helpers
│   ├── api/             # API client and endpoints
│   │   ├── client.ts    # Base API client
│   │   ├── courses.ts   # Course endpoints
│   │   ├── types.ts     # API types
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── env.ts           # Environment validation
│   └── utils.ts         # General utilities
│
├── types/               # TypeScript type definitions
│   ├── course.ts       # Course types
│   ├── instructor.ts   # Instructor types
│   ├── api.ts          # API types
│   ├── components.ts   # Component prop types
│   └── index.ts        # Re-exports
│
├── config/             # Configuration files
│   ├── site.config.ts  # Site metadata
│   ├── navigation.config.ts  # Navigation config
│   └── seo.config.ts   # SEO configuration
│
├── data/               # Static data
│   └── courses.ts
│
├── public/             # Static assets
│   ├── images/
│   └── ...
│
└── docs/              # Documentation
    ├── CONTRIBUTING.md
    ├── DEVELOPMENT.md
    ├── API.md
    ├── COMPONENTS.md
    └── DEPLOYMENT.md
```

## 🏗️ Architecture

### Next.js App Router

This project uses Next.js 14+ with the App Router:

- **Server Components by default** - Better performance and SEO
- **Client Components** - Add `'use client'` for interactivity
- **File-based routing** - File structure defines routes
- **Layouts** - Shared UI between routes
- **Loading & Error states** - Built-in UI states

### Component Patterns

#### Server Component (Default)

```typescript
// app/courses/page.tsx
import { getCourses } from '@/lib/api/courses';

export default async function CoursesPage() {
  const courses = await getCourses();
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

#### Client Component (Interactive)

```typescript
// components/CourseFilter.tsx
'use client';

import { useState } from 'react';

export function CourseFilter() {
  const [category, setCategory] = useState('all');
  
  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {/* Options */}
    </select>
  );
}
```

### Data Fetching

#### Server-side (Recommended)

```typescript
// In Server Component
const data = await fetch('https://api.vitc.edu.vn/courses', {
  next: { revalidate: 3600 } // ISR - revalidate every hour
});
```

#### Client-side (When needed)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getCourses } from '@/lib/api/courses';

export function ClientCourses() {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    getCourses().then(setCourses);
  }, []);
  
  // Render courses
}
```

### Type Safety

All types are centralized in the `types/` folder:

```typescript
import type { Program, Instructor, NewsArticle } from '@/types';

// Type-safe component props
interface CourseCardProps {
  course: Program;
  onClick?: () => void;
}
```

### Environment Variables

Validated using Zod schema in `lib/env.ts`:

```typescript
import { env } from '@/lib/env';

// Type-safe, validated environment variables
const apiUrl = env.NEXT_PUBLIC_API_BASE_URL;
const isProduction = env.NODE_ENV === 'production';
```

## 🛠️ Development Tools

### VS Code Extensions (Recommended)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Translator
- Error Lens

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## 🔧 Common Tasks

### Adding a New Page

1. Create route folder in `app/`
2. Add `page.tsx`, `loading.tsx`, `error.tsx`
3. Update navigation in `config/navigation.config.ts`

```typescript
// app/new-page/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Page - VITC',
  description: 'Page description',
};

export default function NewPage() {
  return <div>New Page Content</div>;
}
```

### Creating a Component

1. Create file in appropriate folder (`components/ui/`, `components/sections/`, etc.)
2. Add types in `types/components.ts` if needed
3. Export from index file

```typescript
// components/ui/NewComponent.tsx
import type { BaseComponentProps } from '@/types';

interface NewComponentProps extends BaseComponentProps {
  title: string;
}

export function NewComponent({ title, className }: NewComponentProps) {
  return <div className={className}>{title}</div>;
}
```

### Adding an API Endpoint

1. Create route in `app/api/`
2. Use Route Handlers

```typescript
// app/api/courses/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const courses = await fetchCourses();
  return NextResponse.json({ data: courses });
}
```

### Working with Environment Variables

1. Add to `.env.example` with documentation
2. Add to Zod schema in `lib/env.ts`
3. Use via `env` object

```typescript
import { env } from '@/lib/env';

const apiTimeout = env.NEXT_PUBLIC_API_TIMEOUT;
```

## 🐛 Troubleshooting

### Common Issues

#### Port already in use

```bash
# Find and kill process on port 3000
npx kill-port 3000
```

#### TypeScript errors after pulling

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Module not found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Environment variables not working

```bash
# Restart dev server after changing .env.local
# CTRL+C to stop
npm run dev
```

### Getting Help

1. Check existing issues on GitHub
2. Search in documentation
3. Ask in team chat
4. Create new issue with reproduction steps

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Patterns](https://reactpatterns.com/)

---

Happy coding! 🚀
