# 📋 KẾ HOẠCH REFACTORING DỰ ÁN VITC HOMEPAGE

> **Mục tiêu**: Tối ưu hóa cấu trúc dự án theo chuẩn Next.js 14+, cải thiện performance, SEO, và khả năng mở rộng.

---

## 🎯 TỔNG QUAN

**Trạng thái hiện tại**: ⚠️ Cần cải thiện  
**Mục tiêu**: ✅ Production-ready, SEO-optimized, Scalable

---

## 📊 PHÂN LOẠI ƯU TIÊN

| Mức độ | Tiêu chí | Thời gian ước tính |
|--------|----------|-------------------|
| 🔴 **CRITICAL** | Ảnh hưởng SEO, Performance, UX | 2-3 ngày |
| 🟠 **HIGH** | Best practices, Maintainability | 3-4 ngày |
| 🟡 **MEDIUM** | Code quality, Organization | 2-3 ngày |
| 🟢 **LOW** | Nice to have, Future-proofing | 1-2 ngày |

---

## 🔴 CRITICAL PRIORITY (Ưu tiên cao nhất)

### 1. ❌ Thiếu Special Files của Next.js App Router

**Vấn đề**: Không có các file quan trọng cho UX và error handling

**Tác động**:
- ❌ Không có loading state → Bad UX
- ❌ Không có error boundary → Crash toàn trang
- ❌ Không có 404 page → Poor SEO
- ❌ Không có global error handler

**Cần tạo**:

```
app/
├── loading.tsx                 # ⚠️ THIẾU - Global loading
├── error.tsx                   # ⚠️ THIẾU - Global error boundary
├── not-found.tsx               # ⚠️ THIẾU - 404 page
└── template.tsx                # 🟡 Optional - Animation transitions
```

**Nested files cần thiết**:
```
app/khoa-hoc/
├── loading.tsx                 # ⚠️ THIẾU
├── error.tsx                   # ⚠️ THIẾU
└── [id]/
    ├── loading.tsx             # ⚠️ THIẾU
    └── error.tsx               # ⚠️ THIẾU

app/tin-tuc-thong-bao/
├── loading.tsx                 # ⚠️ THIẾU
└── [id]/
    └── loading.tsx             # ⚠️ THIẾU
```

**Action items**:
- [ ] Tạo `app/loading.tsx` với skeleton UI
- [ ] Tạo `app/error.tsx` với error boundary
- [ ] Tạo `app/not-found.tsx` với custom 404
- [ ] Tạo loading states cho các routes con
- [ ] Tạo error boundaries cho các routes con

---

### 2. 🔍 SEO Optimization

**Vấn đề hiện tại**:

```typescript
// ❌ BAD - Hardcoded metadata base
metadataBase: new URL('http://localhost:3000')

// ❌ BAD - Generic metadata
title: "VISC - Trung tâm Tin học"
description: "Trung tâm đào tạo..."

// ❌ BAD - Thiếu dynamic metadata cho pages
// app/khoa-hoc/[id]/page.tsx không có generateMetadata
```

**Cần cải thiện**:

**Action items**:
- [ ] **Fix metadata base URL**
  ```typescript
  // ✅ GOOD
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://vitc.edu.vn' 
      : 'http://localhost:3000')
  )
  ```

- [ ] **Implement dynamic metadata cho tất cả pages**
  ```typescript
  // app/khoa-hoc/[id]/page.tsx
  export async function generateMetadata({ params }): Promise<Metadata> {
    const course = await getCourseById(params.id);
    return {
      title: `${course.title} - VITC`,
      description: course.description,
      openGraph: {
        title: course.title,
        description: course.description,
        images: [course.image],
      },
    };
  }
  ```

- [ ] **Tạo SEO config centralized**
  ```typescript
  // config/seo.config.ts - CẦN REFACTOR
  export const siteConfig = {
    name: 'VITC',
    url: 'https://vitc.edu.vn',
    ogImage: '/og-image.jpg',
    description: '...',
    keywords: ['...'],
  };
  ```

- [ ] **Add structured data (JSON-LD)**
  ```typescript
  // app/khoa-hoc/[id]/page.tsx
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.description,
      "provider": {
        "@type": "Organization",
        "name": "VITC"
      }
    })}
  </script>
  ```

- [ ] **Add sitemap.xml**
  ```typescript
  // app/sitemap.ts - ⚠️ THIẾU
  export default async function sitemap() {
    const courses = await getCourses();
    // Generate sitemap
  }
  ```

- [ ] **Add robots.txt**
  ```typescript
  // app/robots.ts - ⚠️ THIẾU
  export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://vitc.edu.vn/sitemap.xml',
    };
  }
  ```

---

### 3. 📱 Performance Optimization

**Vấn đề**:
- ⚠️ Chưa tối ưu images
- ⚠️ Chưa sử dụng font optimization đúng cách
- ⚠️ Bundle size chưa được optimize

**Action items**:

- [ ] **Optimize Images**
  ```typescript
  // ✅ Đã có Next.js Image config nhưng cần kiểm tra usage
  // Đảm bảo mọi <img> đều dùng next/image
  
  // app/components/CourseCard.tsx
  import Image from 'next/image';
  
  // ❌ BAD
  <img src={course.image} alt={course.title} />
  
  // ✅ GOOD
  <Image 
    src={course.image} 
    alt={course.title}
    width={400}
    height={300}
    placeholder="blur"
    blurDataURL="data:image/..."
  />
  ```

- [ ] **Font Optimization** (Đã có nhưng cần verify)
  ```typescript
  // app/layout.tsx - ✅ ĐÃ CÓ Montserrat, Playfair, Inter
  // Kiểm tra xem có fonts nào không dùng để remove
  ```

- [ ] **Add route segments config**
  ```typescript
  // app/khoa-hoc/[id]/page.tsx
  export const dynamic = 'force-static'; // or 'force-dynamic'
  export const revalidate = 3600; // ISR - revalidate every hour
  ```

- [ ] **Implement Static Generation cho courses**
  ```typescript
  // app/khoa-hoc/[id]/page.tsx
  export async function generateStaticParams() {
    const courses = await getCourses();
    return courses.map((course) => ({
      id: course.id.toString(),
    }));
  }
  ```

---

## 🟠 HIGH PRIORITY

### 4. 📁 Cấu trúc thư mục cần reorganize

**Vấn đề**:
```
❌ app/components/          # Nên ở root level
❌ app/data/                # Nên ở root level hoặc lib/
❌ app/hooks/               # Nên ở root level hoặc lib/
❌ app/services/            # Nên ở lib/
❌ app/shared/              # Confusing - overlap với components/
```

**Đề xuất cấu trúc mới**:

```
vitc-homepage/
├── app/
│   ├── (routes)/                    # 🆕 Route groups
│   │   ├── (marketing)/             # Public pages
│   │   │   ├── khoa-hoc/
│   │   │   ├── tin-tuc-thong-bao/
│   │   │   └── lien-he/
│   │   └── (learning)/              # Learning pages
│   │       ├── tin-hoc/
│   │       └── ky-nang-mem/
│   │
│   ├── api/                         # 🔄 MIGRATE từ pages/api
│   │   └── thu-vien/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx                  # 🆕 THIẾU
│   ├── error.tsx                    # 🆕 THIẾU
│   ├── not-found.tsx                # 🆕 THIẾU
│   └── globals.css
│
├── components/                      # 🔄 MERGE app/components & components/
│   ├── ui/                          # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/                      # 🆕 Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MegaMenu.tsx
│   ├── sections/                    # 🔄 MOVE từ app/components/sections
│   │   ├── HeroSection.tsx
│   │   └── ...
│   └── shared/                      # 🔄 MERGE app/shared/components
│       └── ...
│
├── lib/                             # 🔄 REORGANIZE
│   ├── api/                         # ✅ ĐÃ REFACTOR
│   │   ├── courses.ts
│   │   ├── instructors.ts
│   │   └── ...
│   ├── hooks/                       # 🔄 MOVE từ app/hooks
│   │   └── useConsultationPopup.ts
│   ├── utils/                       # 🆕 Utilities
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── validators.ts
│   └── constants/                   # 🔄 MOVE từ app/ky-nang-mem/constants
│       └── ...
│
├── types/                           # 🆕 Global types
│   ├── index.ts
│   ├── course.ts
│   └── api.ts
│
├── data/                            # 🔄 MOVE từ app/data
│   ├── courses.ts
│   └── ...
│
└── config/                          # ✅ ĐÃ CÓ nhưng cần enhance
    ├── site.ts                      # 🆕 Site metadata
    ├── navigation.ts                # ✅ ĐÃ CÓ
    └── seo.ts                       # 🆕 SEO config
```

**Action items**:
- [ ] Di chuyển `app/components/` → `components/`
- [ ] Di chuyển `app/hooks/` → `lib/hooks/`
- [ ] Di chuyển `app/services/` → `lib/services/`
- [ ] Di chuyển `app/data/` → `data/`
- [ ] Merge `app/shared/` vào `components/shared/`
- [ ] Tạo `types/` folder cho global types
- [ ] Tạo `lib/utils/` cho utility functions
- [ ] Implement route groups `(marketing)` và `(learning)`

---

### 5. 🔄 API Routes Migration

**Vấn đề**:
```
❌ pages/api/thu-vien/index.ts          # Pages Router API
❌ pages/api/tin-tuc-thong-bao/[id].ts # Pages Router API
```

**Cần migrate sang**:
```
✅ app/api/thu-vien/route.ts
✅ app/api/tin-tuc-thong-bao/[id]/route.ts
```

**Action items**:
- [ ] Migrate `pages/api/thu-vien/index.ts` → `app/api/thu-vien/route.ts`
  ```typescript
  // app/api/thu-vien/route.ts
  import { NextResponse } from 'next/server';
  
  export async function GET() {
    // Logic here
    return NextResponse.json({ items: data });
  }
  ```

- [ ] Migrate `pages/api/tin-tuc-thong-bao/[id].ts` → `app/api/tin-tuc-thong-bao/[id]/route.ts`
- [ ] Xóa `pages/` folder sau khi migrate xong
- [ ] Update tất cả API calls để dùng đúng endpoints mới

---

### 6. 🎨 Component Organization

**Vấn đề**: Components bị scatter ở nhiều nơi

**Hiện tại**:
```
app/components/layout/Header.tsx
app/components/sections/HeroSection.tsx
app/shared/components/...
components/ui/button.tsx
```

**Đề xuất**:
```
components/
├── ui/                    # Atomic components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MegaMenu.tsx
│   └── Sidebar.tsx
│
├── sections/              # Page sections
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── HeroSlider.tsx
│   │   └── index.ts
│   ├── courses/
│   │   ├── FeaturedCoursesSection.tsx
│   │   ├── CourseCard.tsx
│   │   └── index.ts
│   └── ...
│
└── features/              # Feature-specific components
    ├── course-detail/
    │   ├── CourseInfo.tsx
    │   ├── CourseSyllabus.tsx
    │   └── index.ts
    └── ...
```

**Action items**:
- [ ] Tạo cấu trúc mới `components/layout/`
- [ ] Tạo cấu trúc mới `components/sections/`
- [ ] Tạo cấu trúc mới `components/features/`
- [ ] Di chuyển các components
- [ ] Tạo index.ts cho mỗi folder để export
- [ ] Update tất cả imports

---

## 🟡 MEDIUM PRIORITY

### 7. 📝 TypeScript Improvements

**Vấn đề**:
- Types bị scattered
- Nhiều `any` types
- Thiếu strict type checking

**Action items**:
- [ ] Tạo `types/` folder ở root
  ```
  types/
  ├── index.ts              # Re-export all
  ├── course.ts             # Course related types
  ├── instructor.ts         # Instructor types
  ├── news.ts               # News types
  ├── api.ts                # API response types
  └── components.ts         # Component props types
  ```

- [ ] Enable strict mode trong tsconfig.json
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitAny": true
    }
  }
  ```

- [ ] Refactor để remove `any` types
- [ ] Add JSDoc comments cho complex types

---

### 8. 🧪 Testing Setup

**Vấn đề**: Không có tests

**Action items**:
- [ ] Setup Jest + React Testing Library
  ```bash
  npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
  ```

- [ ] Tạo test structure
  ```
  __tests__/
  ├── components/
  ├── lib/
  └── pages/
  ```

- [ ] Viết tests cho critical components
- [ ] Setup CI/CD để run tests

---

### 9. 🔐 Environment Variables Organization

**Hiện tại**:
```
.env.local (scattered variables)
```

**Đề xuất**:
- [ ] Tạo `.env.example` với tất cả variables
- [ ] Document mỗi variable
  ```env
  # API Configuration
  NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
  
  # Site Configuration
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  NEXT_PUBLIC_SITE_NAME=VITC
  
  # Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS=false
  ```

- [ ] Tạo `lib/env.ts` để validate env vars
  ```typescript
  import { z } from 'zod';
  
  const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  });
  
  export const env = envSchema.parse(process.env);
  ```

---

### 10. 📚 Documentation

**Thiếu**:
- Component documentation
- API documentation
- Development guide

**Action items**:
- [ ] Tạo `docs/` folder
  ```
  docs/
  ├── CONTRIBUTING.md
  ├── DEVELOPMENT.md
  ├── API.md
  ├── COMPONENTS.md
  └── DEPLOYMENT.md
  ```

- [ ] Add JSDoc comments cho components
- [ ] Add Storybook (optional)

---

## 🟢 LOW PRIORITY

### 11. ⚡ Performance Monitoring

**Action items**:
- [ ] Setup analytics (Google Analytics, Vercel Analytics)
- [ ] Add Web Vitals reporting
- [ ] Setup error tracking (Sentry)

---

### 12. 🎨 Design System

**Action items**:
- [ ] Document color system
- [ ] Document typography system
- [ ] Create design tokens
- [ ] Tạo style guide

---

### 13. 🔒 Security Improvements

**Action items**:
- [ ] Add CSP headers
- [ ] Setup rate limiting cho API
- [ ] Add input validation
- [ ] Security audit

---

## 📅 TIMELINE ĐỀ XUẤT

### Week 1: Critical Priority
- [ ] Day 1-2: Special Files (loading, error, not-found)
- [ ] Day 3-4: SEO Optimization (metadata, sitemap, robots)
- [ ] Day 5: Performance Optimization

### Week 2: High Priority
- [ ] Day 1-2: Folder Structure Reorganization
- [ ] Day 3: API Routes Migration
- [ ] Day 4-5: Component Organization

### Week 3: Medium Priority
- [ ] Day 1-2: TypeScript Improvements
- [ ] Day 3: Environment Variables
- [ ] Day 4-5: Documentation

### Week 4: Testing & Polish
- [ ] Day 1-3: Testing Setup
- [ ] Day 4-5: Final Review & Deploy

---

## 📊 METRICS TO TRACK

**Before Refactoring**:
- [ ] Lighthouse Score: ___
- [ ] Bundle Size: ___
- [ ] Time to Interactive: ___
- [ ] SEO Score: ___

**After Refactoring**:
- [ ] Lighthouse Score: Target 95+
- [ ] Bundle Size: Reduce 20%
- [ ] Time to Interactive: < 3s
- [ ] SEO Score: 100

---

## 🎯 SUCCESS CRITERIA

- ✅ Lighthouse Score > 95 (Performance, SEO, Accessibility, Best Practices)
- ✅ Zero TypeScript errors with strict mode
- ✅ All pages có proper metadata
- ✅ Có loading states cho mọi async operations
- ✅ Có error boundaries ở mọi routes
- ✅ Bundle size giảm ít nhất 20%
- ✅ Code coverage > 70%

---

## 📝 NOTES

- Backup code trước khi refactor
- Test thoroughly sau mỗi change
- Deploy incrementally, không refactor all at once
- Monitor metrics continuously
- Document mọi thay đổi

---

**Generated**: January 5, 2026  
**Status**: 📋 Planning Phase  
**Next Action**: Review và approve plan
