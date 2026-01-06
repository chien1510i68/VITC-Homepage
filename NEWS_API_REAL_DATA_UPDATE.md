# News API - Real Data Update

## Tổng Quan
Đã loại bỏ hoàn toàn mock data fallback cho News API, chuyển sang sử dụng 100% dữ liệu thực từ backend API.

## Thay Đổi Chi Tiết

### File: `lib/api/news.ts`

#### 1. Loại Bỏ Mock Data Import
```typescript
// ❌ TRƯỚC: Import mock data
import { mockNews } from './mockData';

// ✅ SAU: Không còn import mock data
// (đã xóa)
```

#### 2. Cập Nhật Tất Cả Functions

##### `getNews(page, size)`
- **Trước**: Fallback về mockNews khi API fails
- **Sau**: Throw error khi API fails
- **Behavior**: 
  - ✅ Success: Return news array from API
  - ❌ Failure: Throw error (caller phải handle)

##### `getNewsById(id)`
- **Trước**: Return mock news khi API fails
- **Sau**: Throw error khi API fails, return null khi 404
- **Behavior**:
  - ✅ Success: Return news article
  - 🔍 404: Return null (news not found)
  - ❌ Other errors: Throw error

##### `getNewsByCategory(categoryId, page, size)`
- **Trước**: Return mockNews khi API fails
- **Sau**: Throw error khi API fails
- **Behavior**:
  - ✅ Success: Return filtered news array
  - ❌ Failure: Throw error

##### `searchNews(keyword, page, size)`
- **Trước**: Filter mockNews khi API fails
- **Sau**: Throw error khi API fails
- **Behavior**:
  - ✅ Success: Return search results
  - ❌ Failure: Throw error

##### `getNewsBySlug(slug)`
- **Trước**: Return first mockNews khi API fails
- **Sau**: Throw error khi API fails, return null khi 404
- **Behavior**:
  - ✅ Success: Return news article
  - 🔍 404/Not found: Return null
  - ❌ Other errors: Throw error

## Error Handling Strategy

### Trong API Layer (news.ts)
```typescript
// Các functions sẽ throw error khi:
// 1. Network failure
// 2. API returns non-OK status (except 404 for specific cases)
// 3. Invalid response format

try {
  const response = await fetch(...);
  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  // ... process response
} catch (error) {
  console.error('Error:', error);
  throw error; // Re-throw để caller handle
}
```

### Trong Component Layer
```typescript
// Components phải có try-catch để handle errors
useEffect(() => {
  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await api.getNews();
      setNews(data);
    } catch (error) {
      console.error('Error loading news:', error);
      setNews([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };
  loadNews();
}, []);
```

## Components Đã Được Kiểm Tra

### ✅ `app/components/sections/NewsSection.tsx`
- Có try-catch xử lý lỗi
- Set empty array khi error
- Show loading state

### ✅ `app/sitemap.ts`
- Có try-catch cho cả courses và news
- Continue với empty array khi error
- Console log errors

## Yêu Cầu Backend API

⚠️ **QUAN TRỌNG**: Backend API phải running để ứng dụng hoạt động bình thường!

### Endpoints Cần Thiết
1. `POST /api/v1/news/filter` - List & filter news
2. `GET /api/v1/news/{id}` - Get news by ID

### Response Format
```json
{
  "status": "success",
  "data": {
    "items": [...],
    "total": 100
  }
}
```

## Lợi Ích

### ✅ Advantages
1. **Production-ready**: Không còn dữ liệu giả
2. **Real-time data**: Luôn hiển thị dữ liệu thực từ database
3. **Better error visibility**: Errors được expose rõ ràng
4. **Cleaner code**: Ít logic hơn, dễ maintain

### ⚠️ Considerations
1. **API dependency**: Ứng dụng phụ thuộc vào backend API
2. **Error handling**: Components phải handle errors properly
3. **Loading states**: Cần UI cho loading & error states
4. **Development**: Backend phải chạy khi develop

## Migration Checklist

- [x] Remove mockNews import from news.ts
- [x] Update all 5 news functions to throw errors
- [x] Update JSDoc comments
- [x] Verify existing components have error handling
- [x] Document changes
- [ ] Test with real backend API
- [ ] Add error boundary for better UX
- [ ] Add retry logic if needed

## Testing

### Manual Testing Steps
1. Ensure backend is running on `http://localhost:8080`
2. Navigate to news section
3. Verify news loads from API
4. Test error cases:
   - Stop backend → should show error/empty state
   - Invalid ID → should return null
   - Network timeout → should throw error

### Expected Behavior
- **API Available**: News displays correctly
- **API Unavailable**: Error logged, empty array shown
- **404 Not Found**: Gracefully return null

## Next Steps

1. **Add Error Boundary**: Implement React Error Boundary cho better UX
2. **Add Retry Logic**: Automatic retry on network failures
3. **Add Loading Skeleton**: Better loading states
4. **Add Offline Support**: Cache API responses
5. **Add Error Toast**: User-friendly error messages

## Related Files
- `lib/api/news.ts` - News API functions
- `lib/api/mockData.ts` - Mock data (still exists for other features)
- `app/components/sections/NewsSection.tsx` - News display component
- `app/sitemap.ts` - Sitemap generation
- `types/news.ts` - News type definitions

---
**Date**: 2024
**Author**: VITC Development Team
**Status**: ✅ Completed
