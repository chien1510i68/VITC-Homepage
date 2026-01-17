# 📚 API Documentation - VITC Homepage

> Tài liệu thống kê toàn bộ API endpoints trong dự án VITC Homepage
> 
> **Last Updated**: January 16, 2026

---

## 📑 Mục lục

- [1. Next.js API Routes](#1-nextjs-api-routes)
- [2. Backend API Endpoints](#2-backend-api-endpoints)
- [3. API Summary](#3-api-summary)
- [4. Response Formats](#4-response-formats)

---

## 1. Next.js API Routes

> **Vị trí**: `/app/api/`
> 
> **Mục đích**: Proxy layer để xử lý CORS và server-side rendering

### 1.1. POST `/api/registrations`

**File**: `app/api/registrations/route.ts`

**Mục đích**: Đăng ký khóa học

**Request Body**:
```typescript
{
  username: string;       // Tên học viên
  email: string;          // Email
  phoneNumber: string;    // Số điện thoại
  course: string;         // Mã khóa học
  type: string;           // Loại khóa học (IT, SOFT_SKILLS)
  dob: string;            // Ngày sinh
  address: string;        // Địa chỉ
  note?: string;          // Ghi chú (optional)
  action: 'DANG_KY';      // Action type (auto-added)
}
```

**Response**:
```typescript
// Success
{ isRegistered: true }

// Duplicate phone
{ 
  isRegistered: false;
  error: string;
  message: string;
}

// Error
{ 
  error: string;
  message: string;
  code?: string;
  details?: any;
}
```

**Status Codes**:
- `200` - Success
- `409` - Duplicate phone number
- `500` - Internal server error

**Backend Proxy**: `POST ${NEXT_PUBLIC_API_URL}/register/`

---

### 1.2. POST `/api/consultation`

**File**: `app/api/consultation/route.ts`

**Mục đích**: Gửi yêu cầu tư vấn

**Request Body**:
```typescript
{
  username: string;       // Tên người yêu cầu
  email: string;          // Email
  phoneNumber: string;    // Số điện thoại
  course: string;         // Khóa học quan tâm
  type: string;           // Loại khóa học
  note?: string;          // Ghi chú (optional)
  action: 'TU_VAN';       // Action type (auto-added)
}
```

**Response**:
```typescript
// Success
{ success: boolean; message?: string }

// Error
{ 
  error: string;
  details?: string;
}
```

**Status Codes**:
- `200` - Success
- `500` - Internal server error

**Backend Proxy**: `POST ${NEXT_PUBLIC_API_URL}/register/`

**Note**: ⚠️ Không cần xử lý response phức tạp, chỉ cần check `success`

---

### 1.3. GET `/api/courses/basic-info`

**File**: `app/api/courses/basic-info/route.ts`

**Mục đích**: Lấy danh sách khóa học cơ bản (cho dropdown, select)

**Response**:
```typescript
{
  success: boolean;
  message: string | null;
  data: CourseBasicInfo[];
}

// CourseBasicInfo
{
  id: string;           // UUID
  title: string;        // Tên khóa học
  type: string;         // IT, SOFT_SKILLS, etc.
  thumbnailUrl?: string;
}
```

**Status Codes**:
- `200` - Success
- `500` - Internal server error

**Backend Proxy**: `GET ${NEXT_PUBLIC_API_URL}/courses/basic-info`

**Cache**: ✅ Session Storage (client-side)

---

### 1.4. GET `/api/thu-vien`

**File**: `app/api/thu-vien/route.ts`

**Mục đích**: Lấy danh sách tài liệu thư viện

**Response**:
```typescript
{
  items: ThuVienItem[];
}

// ThuVienItem
{
  id: string;
  title: string;
  description: string;
  image: string;
  fileUrl: string;
  category: string;
  createdAt: string;
}
```

**Status Codes**:
- `200` - Success
- `500` - Internal server error

**Data Source**: 📦 Mock data (`lib/thuVienData.ts`)

**Cache**: ✅ `public, s-maxage=3600, stale-while-revalidate=86400` (1 giờ)

---

### 1.5. GET `/api/tin-tuc-thong-bao/[id]`

**File**: `app/api/tin-tuc-thong-bao/[id]/route.ts`

**Mục đích**: Lấy chi tiết tin tức theo ID

**Parameters**:
- `id` (path) - ID của tin tức

**Response**:
```typescript
// Success
{
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  category: 'NEWS' | 'ANNOUNCEMENT' | 'EVENT';
  type: 'IT' | 'SOFT_SKILLS';
  slug: string;
}

// Not Found
{ error: 'Not found' }

// Error
{ error: 'Internal server error' }
```

**Status Codes**:
- `200` - Success
- `404` - Not found
- `500` - Internal server error

**Backend Proxy**: Calls `getNewsById()` from `lib/api/news.ts`

**Cache**: ✅ `public, s-maxage=3600, stale-while-revalidate=86400` (1 giờ)

---

## 2. Backend API Endpoints

> **Base URL**: `/backend-api` (proxied via Next.js rewrites)
> 
> **Real Backend**: `${NEXT_PUBLIC_API_URL}` (http://localhost:8080/api/v1)

### 2.1. Courses API

#### POST `/backend-api/courses/filter`

**File**: `lib/api/courses.ts` → `getCourses()`

**Mục đích**: Lấy danh sách khóa học với phân trang

**Request Body**:
```typescript
{
  page: number;      // Trang (0-indexed)
  size: number;      // Số items/trang
  // status?: 'ACTIVE' | 'INACTIVE'
}
```

**Response**:
```typescript
{
  status: "success";
  data: {
    items: Program[];
    total: number;
  }
}

// Program (converted from Course)
{
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  fullDescription: string;
  image: string;
  duration: string;
  students: string;
  sessions: string;
  level: string;
  rating: number;
  price: string;
  completionRate: string;
  highlights: string[];
  instructor: Instructor;
  isHot: boolean;
  syllabus: any[];
  requirements: any[];
  benefits: string[];
}
```

**Fallback**: ✅ Mock data nếu API fail

---

#### GET `/backend-api/courses/basic-info`

**File**: `lib/api/registration.ts` → `fetchCoursesBasicInfo()`

**Mục đích**: Lấy thông tin cơ bản các khóa học

**Response**:
```typescript
{
  success: boolean;
  message: string | null;
  data: CourseBasicInfo[];
}
```

**Cache**: ✅ Session Storage

---

### 2.2. News API

#### POST `/backend-api/news/filter`

**File**: `lib/api/news.ts` → `getNews()`

**Mục đích**: Lấy danh sách tin tức với phân trang

**Request Body**:
```typescript
{
  page: number;      // 0-indexed
  size: number;      // Items per page
}
```

**Response**:
```typescript
{
  success: boolean;
  data: BackendNews[];
}

// BackendNews
{
  id: number;
  title: string;
  summary?: string;
  contentHtml: string;
  imageUrl: string;
  slug: string;
  category: 'NEWS' | 'ANNOUNCEMENT' | 'EVENT';
  type: 'IT' | 'SOFT_SKILLS';
  createdAt: string;
  status: 'ACTIVE' | 'INACTIVE';
}
```

---

#### GET `/backend-api/news/{id}`

**File**: `lib/api/news.ts` → `getNewsById()`

**Mục đích**: Lấy chi tiết tin tức theo ID

**Parameters**:
- `id` - ID của tin tức (number hoặc string)

**Response**:
```typescript
{
  success: boolean;
  data: BackendNews;
}
```

**Status Codes**:
- `200` - Success
- `404` - Not found

---

### 2.3. Documents API

#### POST `/backend-api/documents/filter`

**File**: `lib/api/documents.ts` → `fetchDocuments()`

**Mục đích**: Lấy danh sách tài liệu với filter

**Request Body**:
```typescript
{
  page?: number;        // Default: 0
  size?: number;        // Default: 6
  status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  type?: 'SOFT_SKILLS' | 'IT_SKILLS' | 'OTHER';
}
```

**Response**:
```typescript
{
  success: boolean;
  data: {
    total: number;
    items: Document[];
  }
}

// Document
{
  id: string;
  title: string;
  slug: string;
  url: string;
  image: string;
  excerpt: string;
  fileUrl: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  createdAt: string;
  createdBy: string;
}
```

---

### 2.4. Schedules API

#### POST `/backend-api/classes/filter`

**File**: `lib/api/schedules.ts` → `getCourseSchedules()`

**Mục đích**: Lấy lịch khai giảng các lớp học

**Request Body**:
```typescript
{
  page?: number;     // Default: 0
  size?: number;     // Default: 100
  // status?: 'OPEN' | 'CLOSED'
}
```

**Response**:
```typescript
{
  success: boolean;
  data: Class[] | { data: Class[], total: number };
}

// Class (backend) -> CourseSchedule (frontend)
{
  id: string;
  code: string;              // Mã lớp
  name: string;              // Tên lớp
  courseName: string;        // Tên khóa học
  startDate: string;         // Ngày khai giảng
  schedule: string;          // Lịch học
  instructorName: string;    // Giảng viên
  status: 'OPEN' | 'CLOSED';
  maxStudents: number;       // Tổng số chỗ
  currentStudents: number;   // Số học viên hiện tại
  location: string;          // Địa điểm
}
```

---

### 2.5. Instructors API

#### GET `/backend-api/users/type/{type}`

**File**: `lib/api/instructors.ts` → `getInstructors()`

**Mục đích**: Lấy danh sách giảng viên theo loại

**Parameters**:
- `type` - 'IT' | 'SOFT_SKILLS' (default: 'IT')

**Response**:
```typescript
{
  success: boolean;
  data: BackendUser[];
}

// BackendUser
{
  username: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  description: string | null;
  address: string | null;
  gender: 'MALE' | 'FEMALE' | null;
}
```

**Conversion**: BackendUser → Instructor (frontend format)

---

### 2.6. Lookup API

#### GET `/backend-api/results/cccd/{cccd}`

**File**: `lib/api/lookup.ts` → `lookupExamResultsByCCCD()`

**Mục đích**: Tra cứu kết quả thi theo CCCD

**Parameters**:
- `cccd` - Số CCCD/CMND

**Response**:
```typescript
{
  success: boolean;
  message: string | null;
  data: ExamResult[];
}

// ExamResult
{
  id: string;
  username: string;
  identifyNumber: string;
  dob: string;
  address: string;
  kyThi: string;         // Kỳ thi
  diemLt: number;        // Điểm lý thuyết
  diemTh: number;        // Điểm thực hành
  diemTong: string;      // Điểm tổng
  ketQua: string;        // Kết quả (ĐẠT/CHƯA ĐẠT)
  ngayThi: string;       // Ngày thi
}
```

---

#### GET `/backend-api/certificates/cccd/{cccd}`

**File**: `lib/api/lookup.ts` → `lookupCertificate()`

**Mục đích**: Tra cứu chứng chỉ theo CCCD

**Parameters**:
- `cccd` - Số CCCD/CMND

**Response**:
```typescript
{
  success: boolean;
  data: CertificateResponse[];
}

// CertificateResponse
{
  id: string;
  username: string;
  identifyNumber: string;
  vaoSo: string;         // Số vào sổ
  dob: string;
  birthPlace: string;
  courseName: string;
  certificateType: string;
  theoryScore: number;
  practiceScore: number;
  finalScore: number;
  result: string;
  examDate: string;
  issueDate: string;
  certificateId: string;
}
```

---

### 2.7. Slides API

#### POST `/backend-api/slides/filter`

**File**: `lib/api/slides.ts` → `fetchSlides()`

**Mục đích**: Lấy danh sách slides/banners

**Request Body**:
```typescript
{
  type?: 'IT' | 'SOFT_SKILLS' | 'HOME';
  status?: 'ACTIVE' | 'INACTIVE';
}
```

**Response**:
```typescript
{
  success: boolean;
  data: BackendSlide[];
}

// BackendSlide
{
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  type: 'IT' | 'SOFT_SKILLS' | 'HOME';
  status: 'ACTIVE' | 'INACTIVE';
  orderIndex: number;    // Thứ tự hiển thị
  createdAt: string;
}
```

**Note**: ✅ Auto-sort by `orderIndex` ascending

**Cache**: `cache: 'no-store'` - Always fresh data

---

### 2.8. About API

#### GET `/backend-api/v1/about/timeline`

**File**: `lib/api/about.ts` → `getAboutTimeline()`

**Mục đích**: Lấy timeline lịch sử phát triển

**Response**:
```typescript
{
  success: boolean;
  data: AboutTimeline[];
}

// AboutTimeline
{
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}
```

---

## 3. API Summary

### 3.1. Tổng quan

| Category | Số lượng | Mục đích |
|----------|----------|----------|
| **Next.js API Routes** | 5 | Proxy, CORS handling, SSR |
| **Backend APIs** | 10+ | Data fetching từ Spring Boot backend |
| **Fire-and-forget APIs** | 2 | Registration & Consultation (không cần response phức tạp) |

**Tổng cộng**: ~15 endpoints chính

---

### 3.2. Phân loại theo chức năng

#### 📝 Form Submission (Write Operations)
- `POST /api/registrations` - Đăng ký khóa học ⚠️
- `POST /api/consultation` - Yêu cầu tư vấn ⚠️

#### 📚 Content Management (Read Operations)
- `GET /api/courses/basic-info` - Danh sách khóa học cơ bản
- `POST /backend-api/courses/filter` - Danh sách khóa học đầy đủ
- `POST /backend-api/news/filter` - Danh sách tin tức
- `GET /backend-api/news/{id}` - Chi tiết tin tức
- `POST /backend-api/documents/filter` - Danh sách tài liệu
- `GET /api/thu-vien` - Tài liệu thư viện (mock)

#### 📅 Schedules & Classes
- `POST /backend-api/classes/filter` - Lịch khai giảng

#### 👨‍🏫 Instructors
- `GET /backend-api/users/type/{type}` - Danh sách giảng viên

#### 🔍 Lookup Services
- `GET /backend-api/results/cccd/{cccd}` - Tra cứu kết quả thi
- `GET /backend-api/certificates/cccd/{cccd}` - Tra cứu chứng chỉ

#### 🎨 UI Components
- `POST /backend-api/slides/filter` - Slides/Banners

#### ℹ️ About
- `GET /backend-api/v1/about/timeline` - Lịch sử phát triển

---

### 3.3. APIs có Cache

| API | Cache Strategy | Duration |
|-----|---------------|----------|
| `/api/thu-vien` | HTTP Cache-Control | 1 giờ |
| `/api/tin-tuc-thong-bao/[id]` | HTTP Cache-Control | 1 giờ |
| `/api/courses/basic-info` | Session Storage (client) | Session |
| `/backend-api/slides/filter` | `cache: 'no-store'` | ❌ No cache |

---

### 3.4. APIs không cần Response phức tạp

**⚠️ Fire-and-forget APIs** - Chỉ cần check success/error:

1. **POST /api/registrations**
   - ✅ Check: `isRegistered: boolean`
   - ❌ Không cần: Parse chi tiết error objects

2. **POST /api/consultation**
   - ✅ Check: `success: boolean`
   - ❌ Không cần: Parse chi tiết response data

---

## 4. Response Formats

### 4.1. Standard Success Response

```typescript
{
  success: boolean;
  message?: string | null;
  data: T; // Generic type
}
```

### 4.2. Standard Error Response

```typescript
{
  error: string;
  message?: string;
  code?: string;
  details?: any;
  timestamp?: string;
}
```

### 4.3. Paginated Response

```typescript
{
  success: boolean;
  data: {
    items: T[];      // or just T[]
    total: number;
  } | T[];  // Depends on backend version
}
```

---

## 5. Environment Variables

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

**Next.js Rewrites**: `/backend-api/*` → `${NEXT_PUBLIC_API_URL}/*`

---

## 6. Best Practices

### 6.1. Error Handling

```typescript
try {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const result = await response.json();
  
  if (result.success && result.data) {
    return result.data;
  }
  
  throw new Error(result.message || 'Invalid response');
} catch (error) {
  console.error('❌ Error:', error);
  throw error; // or return fallback data
}
```

### 6.2. Logging

- ✅ `console.log('✅ Success message')`
- ❌ `console.error('❌ Error message')`
- 📤 `console.log('📤 Request sent')`
- 📡 `console.log('📡 Response received')`
- 📦 `console.log('📦 Data payload')`

### 6.3. Mock Data Fallback

```typescript
try {
  // Try API first
  const data = await fetchFromAPI();
  return data;
} catch (error) {
  console.error('❌ API failed, using mock data');
  return mockData;
}
```

---

## 7. Testing Checklist

- [ ] Test success response
- [ ] Test error response (400, 404, 500)
- [ ] Test network timeout
- [ ] Test CORS issues (should be handled by Next.js proxy)
- [ ] Test pagination (page, size)
- [ ] Test filters (type, status, category)
- [ ] Test cache behavior
- [ ] Test mock data fallback

---

## 8. API Call Examples

### Example 1: Get Courses with Pagination

```typescript
import { getCourses } from '@/lib/api/courses';

const programs = await getCourses(0, 10); // page 0, 10 items
```

### Example 2: Submit Registration

```typescript
import { submitCourseRegistration } from '@/lib/api/registration';

const result = await submitCourseRegistration({
  username: "Nguyễn Văn A",
  email: "a@example.com",
  phoneNumber: "0123456789",
  course: "course-id-123",
  type: "IT",
  dob: "1990-01-01",
  address: "Hà Nội",
  note: "Muốn học buổi tối"
});

if (result.success && result.data.isRegistered) {
  console.log('✅ Registered successfully');
}
```

### Example 3: Lookup Certificate

```typescript
import { lookupCertificate } from '@/lib/api/lookup';

const certificates = await lookupCertificate("001234567890");
console.log(certificates);
```

---

## 9. Migration Notes

### Deprecated APIs

❌ **GET /backend-api/certificates/cccd/?cccd={cccd}** (old endpoint)
- **Replaced by**: `GET /backend-api/certificates/cccd/{cccd}`
- **Reason**: Path parameter is cleaner than query string

---

## 10. Contact & Support

- **Backend API**: Spring Boot (Java)
- **Frontend**: Next.js 14+ (App Router)
- **API Documentation**: This file
- **Last Update**: January 16, 2026

---

**📝 Notes**:
- All APIs use JSON format
- All dates in ISO 8601 format
- All text in Vietnamese (UTF-8)
- Pagination is 0-indexed
- Status codes follow HTTP standards
