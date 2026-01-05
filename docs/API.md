# API Documentation

Documentation for the VITC Homepage API client and endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [API Client](#api-client)
- [Endpoints](#endpoints)
- [Types](#types)
- [Error Handling](#error-handling)
- [Examples](#examples)

## 🌐 Overview

The VITC Homepage uses a centralized API client located in `lib/api/` that handles all backend communication. The API is organized by resource type with dedicated files for each endpoint group.

### Base Configuration

```typescript
// lib/api/base.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
const TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;
```

### Mock Data Fallback

When the backend API is unavailable, the client automatically falls back to mock data:

```typescript
// Configured in .env.local
NEXT_PUBLIC_USE_MOCK_FALLBACK=true
```

## 🔌 API Client

### Base API Function

```typescript
import { apiRequest } from '@/lib/api/base';

// Generic API request
const response = await apiRequest<DataType>('/endpoint', {
  method: 'GET',
  headers: { 'Custom-Header': 'value' },
});
```

### Available Methods

```typescript
// GET request
const data = await apiRequest<Program[]>('/programs');

// POST request
const result = await apiRequest<ApiResponse>('/contact', {
  method: 'POST',
  body: JSON.stringify({ name, email, message }),
});

// With query parameters
const filtered = await apiRequest<Program[]>('/programs?category=web');
```

## 📡 Endpoints

### Courses & Programs

#### Get All Programs

```typescript
import { getPrograms } from '@/lib/api/courses';

const programs = await getPrograms();
// Returns: Program[]
```

#### Get Program by ID

```typescript
import { getProgramById } from '@/lib/api/courses';

const program = await getProgramById(1);
// Returns: Program | null
```

#### Search Programs

```typescript
import { searchPrograms } from '@/lib/api/courses';

const results = await searchPrograms('web development');
// Returns: Program[]
```

### Schedules

#### Get Course Schedules

```typescript
import { getCourseSchedules } from '@/lib/api/schedules';

const schedules = await getCourseSchedules();
// Returns: CourseSchedule[]
```

#### Filter Schedules

```typescript
import { filterSchedules } from '@/lib/api/schedules';

const filtered = await filterSchedules({
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  searchQuery: 'web',
});
// Returns: CourseSchedule[]
```

### Instructors

#### Get All Instructors

```typescript
import { getInstructors } from '@/lib/api/instructors';

const instructors = await getInstructors();
// Returns: Instructor[]
```

#### Get Instructor by ID

```typescript
import { getInstructorById } from '@/lib/api/instructors';

const instructor = await getInstructorById(1);
// Returns: Instructor | null
```

### News & Announcements

#### Get News Articles

```typescript
import { getNews } from '@/lib/api/news';

const articles = await getNews();
// Returns: NewsArticle[]
```

#### Get News by ID

```typescript
import { getNewsById } from '@/lib/api/news';

const article = await getNewsById(1);
// Returns: NewsArticle | null
```

#### Filter News by Category

```typescript
import { getNewsByCategory } from '@/lib/api/news';

const articles = await getNewsByCategory('events');
// Returns: NewsArticle[]
```

### About & Timeline

#### Get About Timeline

```typescript
import { getAboutTimeline } from '@/lib/api/about';

const timeline = await getAboutTimeline();
// Returns: AboutTimeline[]
```

### Lookup Services

#### Search by Student ID

```typescript
import { searchByStudentId } from '@/lib/api/lookup';

const result = await searchByStudentId('12345678');
// Returns: LookupResult | null
```

#### Search by Certificate ID

```typescript
import { searchByCertificateId } from '@/lib/api/lookup';

const result = await searchByCertificateId('CERT-2024-001');
// Returns: LookupResult | null
```

### Forms

#### Submit Consultation Form

```typescript
import { submitConsultationForm } from '@/lib/api/forms';

const response = await submitConsultationForm({
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  email: 'email@example.com',
  courseName: 'Web Development',
  message: 'Tôi muốn tư vấn về khóa học',
});
// Returns: ApiResponse<{ success: boolean }>
```

## 📝 Types

All API types are defined in `types/` folder and re-exported from `lib/api/types.ts`.

### Program

```typescript
interface Program {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: string;
  duration: string;
  students: string;
  sessions: string;
  level: string;
  rating: number;
  price: string;
  completionRate: string;
  highlights: string[];
  instructor: string | InstructorDetail;
  isHot?: boolean;
  syllabus?: SyllabusModule[];
  requirements?: string[];
  benefits?: string[];
}
```

### CourseSchedule

```typescript
interface CourseSchedule {
  id: number;
  className: string;
  courseName: string;
  subject: string;
  schedule: string;
  startDate: string;
  location: string;
  status?: 'Sắp khai giảng' | 'Đang tuyển sinh' | 'Đã đầy';
}
```

### Instructor

```typescript
interface Instructor {
  id: number;
  name: string;
  title: string;
  experience: string;
  students: string;
  courses: number;
  image: string;
  specialty: string;
}
```

### ApiResponse

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## ⚠️ Error Handling

### API Errors

The API client automatically handles errors and falls back to mock data when configured:

```typescript
try {
  const programs = await getPrograms();
} catch (error) {
  // Error is already logged in the API client
  console.error('Failed to fetch programs:', error);
  // Fallback to empty array or show error UI
}
```

### Custom Error Handling

```typescript
import { apiRequest } from '@/lib/api/base';

try {
  const data = await apiRequest<Program>('/programs/999');
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('404')) {
      // Handle not found
    } else if (error.message.includes('timeout')) {
      // Handle timeout
    }
  }
}
```

## 💡 Examples

### Server Component (Recommended)

```typescript
// app/courses/page.tsx
import { getPrograms } from '@/lib/api/courses';

export default async function CoursesPage() {
  const programs = await getPrograms();
  
  return (
    <div>
      {programs.map(program => (
        <div key={program.id}>{program.title}</div>
      ))}
    </div>
  );
}
```

### Client Component with State

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getPrograms } from '@/lib/api/courses';
import type { Program } from '@/types';

export function ProgramsList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    getPrograms()
      .then(setPrograms)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {programs.map(program => (
        <div key={program.id}>{program.title}</div>
      ))}
    </div>
  );
}
```

### With Search and Filter

```typescript
'use client';

import { useState } from 'react';
import { searchPrograms } from '@/lib/api/courses';
import type { Program } from '@/types';

export function ProgramsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Program[]>([]);
  
  const handleSearch = async () => {
    if (query.trim()) {
      const programs = await searchPrograms(query);
      setResults(programs);
    }
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {results.map(program => (
          <div key={program.id}>{program.title}</div>
        ))}
      </div>
    </div>
  );
}
```

### Form Submission

```typescript
'use client';

import { useState } from 'react';
import { submitConsultationForm } from '@/lib/api/forms';

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseName: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await submitConsultationForm(formData);
      if (response.success) {
        alert('Form submitted successfully!');
        // Reset form
      }
    } catch (error) {
      alert('Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## 🔐 Authentication

Currently, the API does not require authentication. For future implementation:

```typescript
// lib/api/base.ts - Add auth headers
const headers = {
  'Authorization': `Bearer ${getAuthToken()}`,
  'Content-Type': 'application/json',
};
```

## 🚀 Performance

### Caching

Use Next.js built-in caching for Server Components:

```typescript
// Revalidate every hour
const programs = await fetch('api/programs', {
  next: { revalidate: 3600 }
});

// Cache forever (until revalidated)
const staticData = await fetch('api/static', {
  cache: 'force-cache'
});

// Never cache
const dynamicData = await fetch('api/dynamic', {
  cache: 'no-store'
});
```

### Request Deduplication

Next.js automatically deduplicates identical requests in Server Components during a single render pass.

---

For more information, see the [Development Guide](./DEVELOPMENT.md).
