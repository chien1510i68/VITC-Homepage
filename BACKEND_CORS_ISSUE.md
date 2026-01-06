# Yêu Cầu Backend: Enable CORS

## 🚨 Vấn Đề

Frontend đang gặp lỗi **CORS (Cross-Origin Resource Sharing)** khi gọi API từ browser.

### Lỗi Cụ Thể
```
TypeError: Failed to fetch
at getNews (lib/api/news.ts:65:28)
```

## 📋 Thông Tin Kỹ Thuật

### Frontend
- **URL**: `http://localhost:3000`
- **Framework**: Next.js 16.0.7

### Backend
- **URL**: `http://localhost:8080`
- **Framework**: Java Spring Boot

### API Endpoint
- **URL**: `http://localhost:8080/api/v1/news/filter`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body
```json
{
  "page": 0,
  "size": 10
}
```

## ✅ Test Kết Quả

### Test từ PowerShell (Server-to-Server) - THÀNH CÔNG ✅
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/v1/news/filter" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"page":0,"size":10}'
```

**Response:**
```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "id": "39574e2d-d24c-4b2e-9abb-01e9639a9007",
      "title": "VITC Launches New AI Course",
      "summary": "Exciting new course on AI and DATA",
      "imageUrl": "https://example.com/news/ai-course.jpg",
      "categories": [],
      "status": "PUBLISHED",
      "createdAt": "2025-12-26T06:41:01.052052Z"
    },
    ...
  ]
}
```

### Test từ Browser (Cross-Origin) - THẤT BẠI ❌
```javascript
fetch('http://localhost:8080/api/v1/news/filter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: 0, size: 10 })
})
```

**Lỗi:**
```
Access to fetch at 'http://localhost:8080/api/v1/news/filter' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🔧 Yêu Cầu Backend Team

### Option 1: Enable CORS trong Spring Boot Application

**Thêm Configuration Class:**

```java
package vn.vitc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### Option 2: Thêm @CrossOrigin Annotation

**Trên Controller:**

```java
package vn.vitc.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/news")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class NewsController {
    
    @PostMapping("/filter")
    public ResponseEntity<?> filterNews(@RequestBody NewsFilterRequest request) {
        // ... existing code
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable String id) {
        // ... existing code
    }
}
```

### Option 3: WebFilter (Toàn Bộ Application)

**Tạo CORS Filter:**

```java
package vn.vitc.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
        
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }
}
```

## 📝 Headers Cần Thiết

Backend cần trả về các headers sau:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600
```

## 🧪 Cách Kiểm Tra

### 1. Test với Browser DevTools

Mở Console và chạy:

```javascript
fetch('http://localhost:8080/api/v1/news/filter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: 0, size: 10 })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

### 2. Kiểm Tra Response Headers

Trong Network tab, response phải có:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

### 3. Test OPTIONS Request (Preflight)

Browser sẽ gửi OPTIONS request trước POST:

```
OPTIONS /api/v1/news/filter HTTP/1.1
Host: localhost:8080
Origin: http://localhost:3000
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
```

Backend cần trả về:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: content-type
Access-Control-Max-Age: 3600
```

## 📚 Tài Liệu Tham Khảo

- [Spring Boot CORS Documentation](https://spring.io/guides/gs/rest-service-cors/)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 🎯 Production Notes

**Quan trọng:** Khi deploy production, cần update `allowedOrigins`:

```java
// Development
.allowedOrigins("http://localhost:3000")

// Production
.allowedOrigins("https://vitc.edu.vn")

// Multiple environments
.allowedOrigins(
    "http://localhost:3000",
    "https://vitc.edu.vn",
    "https://www.vitc.edu.vn"
)
```

## ⏰ Timeline

**Deadline:** Càng sớm càng tốt  
**Priority:** HIGH - Blocking frontend development

## 👥 Contact

Nếu có thắc mắc, vui lòng liên hệ Frontend Team.

---

**Created:** January 5, 2026  
**Status:** 🔴 PENDING BACKEND FIX
