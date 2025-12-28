# API Integration Documentation

## Overview
Hệ thống tích hợp với Java backend để quản lý dữ liệu khóa học với fallback mechanism sang mock data khi API không khả dụng.

## Setup

### 1. Environment Variables
Tạo file `.env.local` từ template `.env.example`:

```bash
cp .env.example .env.local
```

Cập nhật URL API backend:
```
NEXT_PUBLIC_API_BASE_URL=http://your-backend-url/api
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
    private String status; // "ACTIVE", "INACTIVE"
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### 3. API Endpoints
Backend cần cung cấp các endpoints:

```
GET /api/courses - Lấy tất cả khóa học
GET /api/courses/featured?limit=6 - Lấy khóa học nổi bật
```

Response format:
```json
{
  "success": true,
  "data": [Course...],
  "message": "Success"
}
```

## Architecture

### Data Flow
1. **FeaturedCoursesSection** component load
2. Gọi **CourseService.getFeaturedCourses()**
3. Service thử fetch từ backend API
4. Nếu thành công: Transform backend Course → frontend CourseCardData
5. Nếu thất bại: Fallback sang mockFeaturedCourses
6. Component render với loading/error states

### Files Structure
```
app/
├── data/
│   └── courses.ts              # Interface definitions & mock data
├── services/
│   └── CourseService.ts        # API service layer
└── components/sections/
    └── FeaturedCoursesSection.tsx # UI component
```

### CourseService Methods

#### `getAllCourses(): Promise<Course[]>`
Fetch tất cả khóa học từ `/api/courses`

#### `getFeaturedCourses(limit): Promise<Course[]>`
Fetch khóa học nổi bật từ `/api/courses/featured`

#### `transformToCourseCard(course): CourseCardData`
Transform backend model thành frontend display model với:
- Badge logic dựa trên createdAt và category
- Price formatting theo VND
- Mock rating và studentCount nếu không có
- Fallback instructor name

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