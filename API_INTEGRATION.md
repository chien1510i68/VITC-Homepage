# API Integration Documentation

## Overview
Hệ thống tích hợp với Java backend để quản lý dữ liệu khóa học với fallback mechanism sang mock data khi API không khả dụng.

**Backend Base URL:** `http://localhost:8080`

**API Format:** Response format theo chuẩn `{ status: "success", data: {...} }`

## Setup

### 1. Environment Variables
Tạo file `.env.local` từ template `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật URL API backend:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_API_TIMEOUT=10000
```

### 2. Backend Course Model
API backend cần trả về Course model với structure:

```java
public class Course {
    private String id;
    private String courseCode; 
    private String title;
    private String slug;
    private String categoryCode;
    private String thumbnailUrl;
    private Double price;
    private Integer duration;
    private String level;
    private String descriptionHtml;
    private String subject;
    private String status; // "ACTIVE", "INACTIVE", "DRAFT"
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Instructor instructor;
    private List<String> highlights;
    private List<SyllabusModule> syllabus;
    private List<String> requirements;
    private String benefitsHtml;
}
```

### 3. API Endpoints
Backend cần cung cấp các endpoints:

```
GET  /api/courses/{id}           - Lấy chi tiết khóa học theo ID
POST /api/courses/filter         - Lọc/tìm kiếm khóa học với pagination
PUT  /api/courses/               - Tạo mới hoặc cập nhật khóa học (Admin)
DELETE /api/courses/             - Xóa khóa học (Admin)
```

Response format:
```json
{
  "status": "success",
  "data": {
    "items": [Course...],
    "total": 100
  }
}
```

hoặc cho single item:
```json
{
  "status": "success",
  "data": Course
}
```

## Architecture

### Data Flow
1. **Component** (e.g., FeaturedCoursesSection) load
2. Gọi **API function** (e.g., `getFeaturedCourses()`)
3. Function gọi backend API với fetch
4. Kiểm tra response format: `{ status: "success", data: {...} }`
5. Nếu thành công: Transform backend Course → frontend Program
6. Nếu thất bại: Fallback sang mock data
7. Component render với loading/error states

### Files Structure
```
lib/api/
├── base.ts                      # Base utilities, API_BASE_URL, fetchWithTimeout
├── courses.ts                   # Course API functions
├── types.ts                     # TypeScript interfaces
└── index.ts                     # Export all APIs

data/
└── courses.ts                   # Mock data & Course interface

app/components/sections/
└── FeaturedCoursesSection.tsx   # UI component
```

### Course API Functions

#### `getCourses(page, size): Promise<Program[]>`
Lấy danh sách khóa học với pagination
- **Endpoint:** `POST /api/courses/filter`
- **Body:** `{ status: "ACTIVE", page, size }`

#### `getFeaturedCourses(limit): Promise<Program[]>`
Lấy khóa học nổi bật cho trang chủ
- **Endpoint:** `POST /api/courses/filter`
- **Body:** `{ status: "ACTIVE", page: 0, size: limit }`

#### `getCourseById(id): Promise<Program | null>`
Lấy chi tiết khóa học theo ID
- **Endpoint:** `GET /api/courses/{id}`

#### `getCoursesByCategory(categoryCode, page, size): Promise<Program[]>`
Lọc khóa học theo danh mục
- **Endpoint:** `POST /api/courses/filter`
- **Body:** `{ categoryCode, status: "ACTIVE", page, size }`

#### `searchCourses(params): Promise<Program[]>`
Tìm kiếm khóa học với nhiều filters
- **Endpoint:** `POST /api/courses/filter`
- **Params:** keyword, categoryCode, level, minPrice, maxPrice, page, size

#### `getCourseBySlug(slug): Promise<Program | null>`
Lấy khóa học theo slug (URL-friendly)
- **Endpoint:** `POST /api/courses/filter`
- **Body:** `{ slug, status: "ACTIVE" }`

#### `convertCourseToProgram(course): Program`
Transform backend Course model thành frontend Program model
- Badge logic dựa trên createdAt và category
- Price formatting theo VND
- Instructor details mapping
- Fallback values cho mock data

## Error Handling

### API Failures
- Network errors
- HTTP status errors
- Invalid response format
- Backend unavailable

### Fallback Strategy
1. Log error để debug
2. Show warning message cho user
3. Load mock data từ `mockFeaturedCourses`
4. Component hoạt động bình thường

### Loading States
- Spinner animation trong khi fetch data
- Skeleton loader (có thể mở rộng)
- Error boundary protection

## Usage Examples

### Basic Component Usage
```tsx
import FeaturedCoursesSection from '@/components/sections/FeaturedCoursesSection'

export default function HomePage() {
  return (
    <div>
      <FeaturedCoursesSection />
    </div>
  )
}
```

### Direct Service Usage
```tsx
import CourseService from '@/services/CourseService'

// Fetch courses
const courses = await CourseService.getFeaturedCourses(6)

// Transform for display
const displayCourses = courses.map(course => 
  CourseService.transformToCourseCard(course)
)
```

## Development

### Mock Data Testing
Để test với mock data, disconnect backend hoặc set invalid API URL:
```
NEXT_PUBLIC_API_BASE_URL=http://invalid-url
```

### Backend Development
Khi phát triển backend:
1. Ensure CORS headers cho Next.js domain
2. Implement proper error responses
3. Follow Course model structure chính xác
4. Test với Postman/curl trước khi integrate

## Production Considerations

### Performance
- API calls được cache tự động bởi browser
- Consider implementing React Query cho advanced caching
- Image optimization cho course thumbnails

### Security
- Validate API responses
- Sanitize HTML trong descriptionHtml
- Protect against XSS trong course content

### Monitoring
- Log API failures
- Track fallback usage rates
- Monitor course load performance

## Troubleshooting

### Common Issues

1. **Courses không load được**
   - Check network tab trong DevTools
   - Verify API URL trong .env.local
   - Test backend endpoint trực tiếp

2. **Infinite loading**
   - Backend response format không đúng
   - Missing success/data fields
   - CORS issues

3. **Mock data luôn được sử dụng**
   - API endpoint không available
   - Response format sai
   - Authentication issues (nếu có)