# VITC Homepage API Documentation

## Overview

This API layer provides a clean interface for fetching data with automatic fallback to mock data when the real API is unavailable. This ensures the application continues to function during development and handles API failures gracefully.

## Structure

```
lib/api/
├── index.ts        # Main exports
├── client.ts       # API client with fetch logic
├── types.ts        # TypeScript interfaces
├── mockData.ts     # Fake data for fallback
└── README.md       # This file
```

## Usage

### Import the API client

```typescript
import { api } from '@/lib/api';
// or
import { getPrograms, getProgramById } from '@/lib/api';
```

### Fetch Programs

```typescript
// Get all programs
const programs = await api.getPrograms();

// Get program by ID
const program = await api.getProgramById(1);

// Get programs by category
const categoryPrograms = await api.getProgramsByCategory('Chứng chỉ');
```

### Fetch Instructors

```typescript
// Get all instructors
const instructors = await api.getInstructors();

// Get instructor by ID
const instructor = await api.getInstructorById(1);
```

### Fetch News

```typescript
// Get all news articles
const news = await api.getNews();

// Get news by ID
const article = await api.getNewsById(1);
```

### Lookup Services

```typescript
// Lookup exam results by CCCD
const examResults = await api.lookupExamResults('001234567890');

// Lookup certificate by CCCD
const certificates = await api.lookupCertificate('001234567890');
```

### Form Submission

```typescript
// Submit consultation form
const result = await api.submitConsultationForm({
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  email: 'email@example.com',
  program: 'Chuẩn đầu ra Tin học VNUA'
});

if (result.success) {
  console.log(result.data?.message);
}
```

## API Configuration

Set the API base URL in your environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

If not set, it defaults to `http://localhost:3001/api`.

## Fallback Behavior

When API calls fail (timeout, network error, or server error), the system automatically:

1. **Logs a warning** with the error details
2. **Returns mock data** to keep the UI functional
3. **Continues operation** without breaking the user experience

Console messages:
- ✅ Success: Data loaded from API
- ⚠️ Warning: API failed, using mock data
- ❌ Error: Critical error occurred (still returns mock data)

## API Endpoints (Backend)

When implementing the backend API, use these endpoints:

### Programs
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program by ID
- `GET /api/programs?category=CategoryName` - Filter by category

### Instructors
- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get instructor by ID

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get news by ID

### Lookup
- `GET /api/lookup/exam?cccd=CCCD_NUMBER` - Lookup exam results
- `GET /api/lookup/certificate?cccd=CCCD_NUMBER` - Lookup certificates

### Forms
- `POST /api/consultation` - Submit consultation form
  ```json
  {
    "name": "string",
    "phone": "string",
    "email": "string",
    "program": "string"
  }
  ```

## Response Format

All API responses should follow this format:

```typescript
{
  "success": boolean,
  "data": any,          // Response data
  "error": string,      // Error message (if failed)
  "message": string     // Additional message (optional)
}
```

## TypeScript Types

All types are exported from `lib/api/types.ts`:

```typescript
import { 
  Program, 
  Instructor, 
  NewsArticle, 
  LookupResult,
  ApiResponse 
} from '@/lib/api/types';
```

## Mock Data

Mock data is available in `lib/api/mockData.ts` and includes:
- 6 complete programs with detailed information
- 5 instructors
- 8 news articles
- 3 lookup results

This data is used automatically when API calls fail.

## Error Handling

The API client handles:
- Network timeouts (5 seconds default)
- HTTP errors (4xx, 5xx)
- Network failures
- Invalid JSON responses

All errors result in graceful fallback to mock data.

## Best Practices

1. **Always use the API client** instead of direct fetch calls
2. **Don't worry about error handling** - it's built in
3. **Mock data is production-ready** - ensure it's always up to date
4. **Check console logs** for API status during development
5. **Update mock data** when adding new features

## Migration Guide

To update existing components:

### Before
```typescript
const programs = [/* hardcoded data */];
```

### After
```typescript
'use client';
import { useEffect, useState } from 'react';
import { api, Program } from '@/lib/api';

const [programs, setPrograms] = useState<Program[]>([]);

useEffect(() => {
  api.getPrograms().then(setPrograms);
}, []);
```

## Future Enhancements

- Add caching layer (React Query or SWR)
- Add optimistic updates for forms
- Add request retry logic
- Add request deduplication
- Add offline support with IndexedDB
