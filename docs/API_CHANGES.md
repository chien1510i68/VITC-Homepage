# API Integration Changes Summary

Cập nhật code để phù hợp với format request/response của backend Java theo tài liệu API_DOCUMENTATION.md

## 📅 Ngày cập nhật: 2026-01-05

---

## 🔄 Các thay đổi chính

### 1. **Cập nhật Base API Configuration**

**File:** `lib/api/base.ts`

**Thay đổi:**
- ✅ `API_BASE_URL` từ `http://localhost:3001/api` → `http://localhost:8080/api`
- ✅ `API_TIMEOUT` từ `0` → `10000` (10 seconds)
- ✅ Cập nhật `fetchWithTimeout()` để xử lý response format: `{ status: "success", data: {...} }`

**Lý do:** Backend Java sử dụng port 8080 và response format khác với mock server

---

### 2. **Cập nhật Course API Functions**

**File:** `lib/api/courses.ts`

#### 2.1 `getCourses(page, size)`
```typescript
// Trước: GET /api/courses
// Sau:  POST /api/courses/filter

// Response format mới:
{
  "status": "success",
  "data": {
    "items": [...],
    "total": 100
  }
}
```

#### 2.2 `getCourseById(id)`
```typescript
// Endpoint: GET /api/courses/{id}
// Response: { status: "success", data: {...} }
// Support both number and string ID
```

#### 2.3 `getCoursesByCategory(categoryCode, page, size)`
```typescript
// Trước: GET /api/courses?category=...
// Sau:  POST /api/courses/filter với body { categoryCode, status, page, size }
```

#### 2.4 **Thêm mới:** `getFeaturedCourses(limit)`
```typescript
// Endpoint: POST /api/courses/filter
// Lấy khóa học nổi bật cho trang chủ
```

#### 2.5 **Thêm mới:** `searchCourses(params)`
```typescript
// Endpoint: POST /api/courses/filter
// Tìm kiếm với nhiều filters: keyword, categoryCode, level, price range
```

#### 2.6 **Thêm mới:** `getCourseBySlug(slug)`
```typescript
// Endpoint: POST /api/courses/filter với { slug }
// Lấy khóa học theo URL-friendly slug
```

---

### 3. **Cập nhật Exports**

**File:** `lib/api/index.ts`

**Thêm exports:**
- `getFeaturedCourses`
- `searchCourses`
- `getCourseBySlug`
- `CourseSearchParams` type

---

### 4. **Cập nhật Documentation**

**File:** `API_INTEGRATION.md`

**Cập nhật:**
- ✅ Base URL và response format
- ✅ Danh sách endpoints mới
- ✅ Data flow architecture
- ✅ Tất cả API functions với mô tả chi tiết

---

## 🎯 API Endpoints Mapping

### Course APIs (Backend Java)

| Method | Endpoint | Purpose | Frontend Function |
|--------|----------|---------|-------------------|
| GET | `/api/courses/{id}` | Chi tiết khóa học | `getCourseById(id)` |
| POST | `/api/courses/filter` | Lọc/tìm kiếm/phân trang | `getCourses()`, `getFeaturedCourses()`, `getCoursesByCategory()`, `searchCourses()`, `getCourseBySlug()` |
| PUT | `/api/courses/` | Tạo/cập nhật (Admin) | Chưa implement |
| DELETE | `/api/courses/` | Xóa khóa học (Admin) | Chưa implement |

---

## 📋 Request/Response Format Examples

### 1. Get All Courses (with pagination)

**Request:**
```typescript
POST /api/courses/filter
Content-Type: application/json

{
  "status": "ACTIVE",
  "page": 0,
  "size": 10
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "course-001",
        "courseCode": "JAVA-2026",
        "title": "Lập trình Java Spring Boot",
        "categoryCode": "PROGRAMMING",
        "price": 5000000,
        "duration": 120,
        "level": "INTERMEDIATE",
        "status": "ACTIVE",
        ...
      }
    ],
    "total": 50
  }
}
```

### 2. Get Course by ID

**Request:**
```typescript
GET /api/courses/course-001
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "course-001",
    "courseCode": "JAVA-2026",
    "title": "Lập trình Java Spring Boot",
    "highlights": [...],
    "syllabus": [...],
    "instructor": {...},
    ...
  }
}
```

### 3. Search Courses

**Request:**
```typescript
POST /api/courses/filter
Content-Type: application/json

{
  "categoryCode": "PROGRAMMING",
  "level": "BEGINNER",
  "status": "ACTIVE",
  "page": 0,
  "size": 10
}
```

---

## 🔧 Environment Variables

**File cần tạo:** `.env.local`

```bash
# Copy from .env.example
cp .env.example .env.local
```

**Cấu hình:**
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# API timeout (ms)
NEXT_PUBLIC_API_TIMEOUT=10000
```

---

## 🚀 Migration Guide

### Cho Developer Frontend

#### Trước đây:
```typescript
import { api } from '@/lib/api';

// Lấy khóa học
const courses = await api.getCourses();

// Lấy theo category
const filtered = await api.getCoursesByCategory('Lập trình');
```

#### Bây giờ:
```typescript
import { api } from '@/lib/api';

// Lấy khóa học (với pagination)
const courses = await api.getCourses(0, 10);

// Lấy theo category (dùng categoryCode)
const filtered = await api.getCoursesByCategory('PROGRAMMING', 0, 20);

// Lấy featured courses
const featured = await api.getFeaturedCourses(6);

// Tìm kiếm
const results = await api.searchCourses({
  keyword: 'java',
  categoryCode: 'PROGRAMMING',
  level: 'BEGINNER',
  page: 0,
  size: 10
});

// Lấy theo slug
const course = await api.getCourseBySlug('lap-trinh-java-spring-boot');
```

---

## ✅ Testing Checklist

- [ ] Backend API running on `http://localhost:8080`
- [ ] `.env.local` đã được tạo với `NEXT_PUBLIC_API_URL`
- [ ] Test endpoint `/api/courses/{id}` trả về đúng format
- [ ] Test endpoint `/api/courses/filter` với pagination
- [ ] Test filter by categoryCode
- [ ] Verify response format: `{ status: "success", data: {...} }`
- [ ] Test fallback to mock data khi API fail
- [ ] Check console logs cho API success/failure

---

## 🐛 Troubleshooting

### 1. Courses không load được
- ✅ Kiểm tra backend đang chạy: `http://localhost:8080/api/courses/filter`
- ✅ Kiểm tra CORS settings trên backend
- ✅ Xem console logs để debug

### 2. Response format sai
- ✅ Backend phải trả về `{ status: "success", data: {...} }`
- ✅ Không phải `{ success: true, data: {...} }`

### 3. Mock data vẫn được dùng
- ✅ Check `NEXT_PUBLIC_API_URL` trong `.env.local`
- ✅ Restart Next.js dev server sau khi đổi env
- ✅ Test backend API trực tiếp bằng Postman/curl

---

## 📚 Related Files

- `lib/api/base.ts` - Base API configuration
- `lib/api/courses.ts` - Course API functions
- `lib/api/index.ts` - API exports
- `data/courses.ts` - Mock data & Course interface
- `API_INTEGRATION.md` - Integration guide
- `docs/API_DOCUMENTATION.md` - Full API specs

---

## 🎓 Backend Requirements

Backend Java cần implement:

1. ✅ Endpoint `GET /api/courses/{id}`
2. ✅ Endpoint `POST /api/courses/filter` với pagination
3. ✅ Response format: `{ status: "success", data: {...} }`
4. ✅ Support filter by: categoryCode, level, status, slug
5. ✅ CORS enabled cho frontend URL
6. ✅ Course model với đầy đủ fields theo document

---

**Người thực hiện:** GitHub Copilot  
**Ngày hoàn thành:** 2026-01-05
