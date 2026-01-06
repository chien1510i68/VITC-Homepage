# News API Updates Summary

Cập nhật News API để phù hợp với backend Java format theo tài liệu API_DOCUMENTATION.md

**Ngày cập nhật:** 2026-01-05

---

## 📋 Tổng quan thay đổi

### Backend Endpoints (Java)

| Method | Endpoint | Purpose | Frontend Function |
|--------|----------|---------|-------------------|
| GET | `/api/v1/news/{id}` | Chi tiết tin tức | `getNewsById(id)` |
| POST | `/api/v1/news/filter` | Lọc/tìm kiếm tin tức | `getNews()`, `getNewsByCategory()`, `searchNews()`, `getNewsBySlug()` |
| PUT | `/api/v1/news/` | Tạo/cập nhật (Admin) | Chưa implement |
| DELETE | `/api/v1/news/` | Xóa tin tức (Admin) | Chưa implement |

---

## 🔄 Thay đổi Interfaces

### 1. **BackendNews** (NEW)

Backend News model từ Java API.

**File:** `types/news.ts`, `types/api.ts`, `lib/api/types.ts`

```typescript
interface BackendNews {
  id: string;
  title: string;
  summary?: string;
  contentHtml: string;
  imageUrl?: string;
  categories?: NewsCategory[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  slug?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}
```

### 2. **NewsCategory** (NEW)

Category model cho tin tức.

```typescript
interface NewsCategory {
  id: string;
  code: string;
  name: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### 3. **NewsArticle** (UPDATED)

Frontend display model - đã thêm fields mới.

```typescript
interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  slug?: string;        // NEW
  content?: string;     // NEW
}
```

---

## 🎯 API Functions Updates

### 1. `getNews(page, size)`

**Trước:**
```typescript
GET /api/news
```

**Sau:**
```typescript
POST /api/v1/news/filter
Body: { status: "PUBLISHED", page, size }
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "news-001",
      "title": "...",
      "summary": "...",
      "contentHtml": "...",
      "imageUrl": "...",
      "categories": [...],
      "status": "PUBLISHED",
      "createdAt": "2026-01-05T10:00:00+07:00"
    }
  ]
}
```

### 2. `getNewsById(id)`

**Endpoint:** `GET /api/v1/news/{id}`

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "news-001",
    "title": "...",
    "contentHtml": "...",
    "categories": [...],
    ...
  }
}
```

### 3. `getNewsByCategory(categoryId, page, size)` (NEW)

Lọc tin tức theo category.

**Endpoint:** `POST /api/v1/news/filter`

**Body:**
```json
{
  "categories": ["cat-news-001"],
  "status": "PUBLISHED",
  "page": 0,
  "size": 10
}
```

### 4. `searchNews(keyword, page, size)` (NEW)

Tìm kiếm tin tức theo title.

**Endpoint:** `POST /api/v1/news/filter`

**Body:**
```json
{
  "title": "java",
  "status": "PUBLISHED",
  "page": 0,
  "size": 10
}
```

### 5. `getNewsBySlug(slug)` (NEW)

Lấy tin tức theo URL-friendly slug.

**Endpoint:** `POST /api/v1/news/filter`

**Body:**
```json
{
  "slug": "khai-giang-khoa-hoc-java-spring-boot",
  "status": "PUBLISHED",
  "page": 0,
  "size": 1
}
```

---

## 🔀 Data Conversion

### Backend → Frontend

```typescript
const convertBackendNewsToArticle = (news: BackendNews): NewsArticle => {
  return {
    // ID: string → number
    id: parseInt(news.id),
    
    title: news.title,
    
    // Description: from summary or strip HTML from contentHtml
    description: news.summary || 
      news.contentHtml?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    
    // Image: use imageUrl or default
    image: news.imageUrl || 'default-image.jpg',
    
    // Date: use createdAt
    date: news.createdAt,
    
    // Category: get first category name
    category: news.categories?.[0]?.name || 'Tin tức',
    
    // NEW fields
    slug: news.slug,
    content: news.contentHtml
  };
};
```

---

## 📝 Usage Examples

### Basic Usage

```typescript
import { api } from '@/lib/api';

// Lấy tất cả tin tức (có pagination)
const news = await api.getNews(0, 10);

// Lấy tin tức theo ID
const article = await api.getNewsById('news-001');

// Lọc theo category
const eduNews = await api.getNewsByCategory('cat-news-001', 0, 20);

// Tìm kiếm
const results = await api.searchNews('java', 0, 10);

// Lấy theo slug
const newsDetail = await api.getNewsBySlug('khai-giang-khoa-hoc-java');
```

### In React Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { NewsArticle } from '@/types';

export function NewsList() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews(0, 10)
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {news.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <span>{article.category}</span>
        </article>
      ))}
    </div>
  );
}
```

---

## 🎨 Category Codes

Common category codes trong backend:

```typescript
const newsCategoryCodes = {
  EDUCATION: 'Giáo dục',
  ANNOUNCEMENT: 'Thông báo',
  EVENT: 'Sự kiện',
  SCHOLARSHIP: 'Học bổng',
  RECRUITMENT: 'Tuyển dụng',
  NEWS: 'Tin tức chung'
};
```

---

## 📊 Status Values

```typescript
type NewsStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
```

**Descriptions:**
- `DRAFT`: Đang soạn thảo, chưa publish
- `PUBLISHED`: Đã publish, hiển thị public
- `ARCHIVED`: Đã lưu trữ, không hiển thị

---

## 🔧 Files Changed

1. ✅ `types/news.ts` - Thêm BackendNews, NewsCategory
2. ✅ `types/api.ts` - Export BackendNews, NewsCategory
3. ✅ `lib/api/types.ts` - Duplicate types cho lib/api
4. ✅ `lib/api/news.ts` - Cập nhật tất cả functions
5. ✅ `lib/api/index.ts` - Export functions mới
6. ✅ `types/index.ts` - Export types mới

---

## ✅ Testing Checklist

Backend Requirements:

- [ ] Endpoint `GET /api/v1/news/{id}` hoạt động
- [ ] Endpoint `POST /api/v1/news/filter` với pagination
- [ ] Response format: `{ status: "success", data: {...} }`
- [ ] Support filter by: categories, title, status, slug
- [ ] CORS enabled cho frontend

Frontend Testing:

- [ ] `getNews()` load được tin tức
- [ ] `getNewsById()` load được chi tiết
- [ ] `getNewsByCategory()` filter đúng
- [ ] `searchNews()` tìm kiếm được
- [ ] `getNewsBySlug()` load được
- [ ] Fallback to mock data khi API fail
- [ ] Check console logs

---

## 🚀 Migration Guide

### Code cũ:

```typescript
// Chỉ có 2 functions
const news = await api.getNews();
const article = await api.getNewsById(1);
```

### Code mới:

```typescript
// Thêm pagination và nhiều options hơn
const news = await api.getNews(0, 10);
const article = await api.getNewsById('news-001');

// NEW: Filter by category
const categoryNews = await api.getNewsByCategory('cat-news-001');

// NEW: Search
const searchResults = await api.searchNews('java');

// NEW: Get by slug
const newsDetail = await api.getNewsBySlug('my-news-slug');
```

---

## 📚 Related Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Full API specs
- [INTERFACE_DOCUMENTATION.md](./INTERFACE_DOCUMENTATION.md) - All interfaces
- [API_CHANGES.md](./API_CHANGES.md) - Course API changes

---

**Completed:** 2026-01-05  
**Status:** ✅ Ready for integration
