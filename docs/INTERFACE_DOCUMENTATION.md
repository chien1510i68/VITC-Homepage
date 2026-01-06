# Interface Documentation

Tài liệu chi tiết về các TypeScript interfaces được sử dụng trong dự án VITC Homepage.

**Ngày cập nhật:** 2026-01-05

---

## 📋 Table of Contents

1. [Backend API Interfaces](#backend-api-interfaces)
2. [Frontend Display Interfaces](#frontend-display-interfaces)
3. [Shared Interfaces](#shared-interfaces)
4. [Type Mapping](#type-mapping)

---

## 🔌 Backend API Interfaces

### BackendApiResponse<T>

Response format chuẩn từ Java backend.

**Location:** `types/api.ts`, `lib/api/types.ts`

```typescript
interface BackendApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  timestamp?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

**Example:**
```json
{
  "status": "success",
  "data": { ... },
  "message": "Course created successfully"
}
```

**Error Example:**
```json
{
  "status": "error",
  "message": "Course not found",
  "timestamp": "2026-01-05T14:30:00+07:00"
}
```

---

### PaginatedResponse<T>

Response format cho các endpoint có pagination.

**Location:** `types/api.ts`, `lib/api/types.ts`

```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
}
```

**Example:**
```json
{
  "status": "success",
  "data": {
    "items": [
      { "id": "1", "title": "Course 1" },
      { "id": "2", "title": "Course 2" }
    ],
    "total": 50
  }
}
```

**Usage:**
```typescript
const response: BackendApiResponse<PaginatedResponse<BackendCourse>> = await fetch(...);
```

---

### BackendCourse

Course model từ backend Java.

**Location:** `types/api.ts`, `lib/api/types.ts`, `data/courses.ts` (as `Course`)

```typescript
interface BackendCourse {
  id: string;
  courseCode: string;
  title: string;
  slug: string;
  categoryCode?: string;
  thumbnailUrl?: string;
  price: number;
  duration?: number;
  level?: string;
  descriptionHtml?: string;
  subject?: string;
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  instructor?: BackendInstructor;
  benefitsHtml?: string;
  highlights?: string[];
  syllabus?: SyllabusModule[];
  requirements?: string[];
}
```

**Field Descriptions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier |
| `courseCode` | string | ✅ | Course code (e.g., "JAVA-2026") |
| `title` | string | ✅ | Course title |
| `slug` | string | ✅ | URL-friendly slug |
| `categoryCode` | string | ❌ | Category code (PROGRAMMING, OFFICE, etc.) |
| `thumbnailUrl` | string | ❌ | Course thumbnail image URL |
| `price` | number | ✅ | Price in VND |
| `duration` | number | ❌ | Duration in hours |
| `level` | string | ❌ | Difficulty level (BEGINNER, INTERMEDIATE, ADVANCED) |
| `descriptionHtml` | string | ❌ | HTML description |
| `subject` | string | ❌ | Subject tags (comma-separated) |
| `status` | string | ✅ | Course status |
| `createdAt` | string | ✅ | ISO 8601 timestamp |
| `updatedAt` | string | ✅ | ISO 8601 timestamp |
| `instructor` | object | ❌ | Instructor details |
| `benefitsHtml` | string | ❌ | Benefits HTML |
| `highlights` | string[] | ❌ | Key highlights |
| `syllabus` | array | ❌ | Course syllabus |
| `requirements` | string[] | ❌ | Prerequisites |

---

### BackendInstructor

Instructor model embedded trong Course.

**Location:** `types/api.ts`, `lib/api/types.ts`, `data/courses.ts` (as `Instructor`)

```typescript
interface BackendInstructor {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  description?: string;
}
```

---

### CourseFilterRequest

Request body cho POST `/api/courses/filter`.

**Location:** `types/api.ts`, `lib/api/types.ts`

```typescript
interface CourseFilterRequest {
  id?: string;
  courseCode?: string;
  slug?: string;
  categoryCode?: string;
  level?: string;
  subject?: string;
  status?: string;
  page?: number;
  size?: number;
}
```

**Example Usage:**
```typescript
const request: CourseFilterRequest = {
  categoryCode: 'PROGRAMMING',
  level: 'BEGINNER',
  status: 'ACTIVE',
  page: 0,
  size: 10
};
```

---

## 🎨 Frontend Display Interfaces

### Program

Frontend display model cho courses (được convert từ BackendCourse).

**Location:** `types/course.ts`, `lib/api/types.ts`

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

**Differences from BackendCourse:**
- `id`: string → number
- `category`: categoryCode → Vietnamese name
- `price`: number → formatted string with "đ"
- `duration`: number (hours) → formatted string
- Added: `students`, `sessions`, `rating`, `completionRate`, `isHot`

---

### InstructorDetail

Chi tiết giảng viên cho hiển thị.

**Location:** `types/course.ts`, `lib/api/types.ts`

```typescript
interface InstructorDetail {
  name: string;
  title: string;
  bio: string;
  experience: string;
  students: string;
  courses: number;
  rating: number;
  specialties: string[];
  education: string[];
  achievements: string[];
  image?: string;
}
```

---

### CourseCardData

Data cho course card component.

**Location:** `data/courses.ts`

```typescript
interface CourseCardData {
  id: string;
  title: string;
  thumbnail: string;
  badge: {
    text: string;
    type: 'hot' | 'upcoming' | 'new';
  };
  duration: string;
  price: string;
  originalPrice?: string;
  studentCount: number;
  description: string;
  category: string;
}
```

---

## 🔄 Shared Interfaces

### SyllabusModule

Syllabus module structure (dùng chung backend & frontend).

**Location:** `types/course.ts`, `lib/api/types.ts`

```typescript
interface SyllabusModule {
  module: string;
  title: string;
  hours: number;
}
```

**Example:**
```typescript
const syllabus: SyllabusModule[] = [
  { module: 'Module 1', title: 'Introduction', hours: 12 },
  { module: 'Module 2', title: 'Advanced Topics', hours: 20 }
];
```

---

### CourseSchedule

Course schedule information.

**Location:** `types/course.ts`, `lib/api/types.ts`

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

---

## 🔀 Type Mapping

### Backend → Frontend Conversion

```typescript
// lib/api/courses.ts
const convertCourseToProgram = (course: BackendCourse): Program => {
  // ID: string → number
  id: parseInt(course.id)
  
  // Category: code → Vietnamese name
  category: categoryMap[course.categoryCode] || 'Khác'
  
  // Price: number → formatted string
  price: `${course.price.toLocaleString('vi-VN')}đ`
  
  // Duration: number → formatted string
  duration: `${course.duration} giờ`
  
  // Instructor: BackendInstructor → InstructorDetail
  instructor: {
    name: course.instructor.username,
    bio: course.instructor.description,
    // ... additional fields
  }
}
```

### Category Code Mapping

```typescript
const categoryMap: Record<string, string> = {
  'OFFICE': 'Tin học văn phòng',
  'PROGRAMMING': 'Lập trình',
  'SOFTSKILLS': 'Kỹ năng mềm',
  'MARKETING': 'Digital Marketing',
  'ANALYSIS': 'Phân tích dữ liệu',
  'GIS': 'GIS',
  'CAD': 'Thiết kế kỹ thuật',
  'DESIGN': 'Thiết kế',
  'MANAGEMENT': 'Quản lý'
};
```

---

## 📊 Status Enums

### Course Status

```typescript
type CourseStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE';
```

**Descriptions:**
- `DRAFT`: Đang soạn thảo, chưa publish
- `ACTIVE`: Đang hoạt động, hiển thị public
- `INACTIVE`: Tạm ngưng, không hiển thị

### Course Level

```typescript
type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
```

**Vietnamese Mapping:**
- `BEGINNER` → "Cơ bản"
- `INTERMEDIATE` → "Trung cấp"
- `ADVANCED` → "Nâng cao"

### Class Status

```typescript
type ClassStatus = 'Sắp khai giảng' | 'Đang tuyển sinh' | 'Đã đầy';
```

---

## 🎯 Best Practices

### 1. Import from Centralized Location

✅ **Good:**
```typescript
import { Program, BackendCourse, PaginatedResponse } from '@/types';
```

❌ **Bad:**
```typescript
import { Program } from '@/types/course';
import { BackendCourse } from '@/types/api';
import { PaginatedResponse } from '@/lib/api/types';
```

### 2. Use Type Aliases for Complex Types

```typescript
// Define reusable types
type CourseResponse = BackendApiResponse<BackendCourse>;
type CourseListResponse = BackendApiResponse<PaginatedResponse<BackendCourse>>;

// Use in function signatures
async function getCourse(id: string): Promise<CourseResponse> {
  // ...
}
```

### 3. Type Guards for Runtime Checks

```typescript
function isBackendCourse(obj: any): obj is BackendCourse {
  return (
    typeof obj?.id === 'string' &&
    typeof obj?.courseCode === 'string' &&
    typeof obj?.title === 'string'
  );
}

// Usage
if (isBackendCourse(data)) {
  // TypeScript knows data is BackendCourse here
  console.log(data.courseCode);
}
```

### 4. Partial Updates

```typescript
// Use Partial<T> for update operations
type CourseUpdate = Partial<BackendCourse> & { id: string };

async function updateCourse(update: CourseUpdate): Promise<void> {
  // Only id is required, other fields are optional
}
```

---

## 🔍 Type Checking

### Validate Backend Response

```typescript
import { BackendApiResponse, BackendCourse } from '@/types';

async function fetchCourse(id: string): Promise<BackendCourse | null> {
  const response = await fetch(`/api/courses/${id}`);
  const json: BackendApiResponse<BackendCourse> = await response.json();
  
  if (json.status === 'success' && json.data) {
    return json.data;
  }
  
  return null;
}
```

### Type-Safe Filter Requests

```typescript
import { CourseFilterRequest } from '@/types';

const filterParams: CourseFilterRequest = {
  categoryCode: 'PROGRAMMING',
  level: 'BEGINNER',
  status: 'ACTIVE',
  page: 0,
  size: 10
};

// TypeScript will catch typos and wrong types
const response = await filterCourses(filterParams);
```

---

## 📚 Related Files

- `types/api.ts` - Backend API types
- `types/course.ts` - Course display types
- `lib/api/types.ts` - API library types (duplicate of types/*)
- `data/courses.ts` - Course data & mock data
- `lib/api/courses.ts` - Course API functions with type conversion

---

## ✅ Checklist for Adding New Interfaces

- [ ] Define interface in appropriate file (`types/api.ts` or `types/course.ts`)
- [ ] Add JSDoc comments with descriptions
- [ ] Export from `types/index.ts`
- [ ] Add to this documentation
- [ ] Create type guards if needed
- [ ] Add usage examples
- [ ] Update API functions to use new types
- [ ] Test with TypeScript strict mode

---

**Last Updated:** 2026-01-05  
**Maintained By:** Development Team
