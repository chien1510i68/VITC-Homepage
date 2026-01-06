# API Documentation - VITC Backend

Tài liệu API cho hệ thống VITC Backend. Tài liệu này mô tả chi tiết các endpoint, request parameters, và response format.

**Base URL**: `http://localhost:8080`

**Date Format**: ISO 8601 (e.g., `2026-01-05T14:30:00+07:00`)

---

## Table of Contents
1. [Slide APIs](#slide-apis)
2. [Class APIs](#class-apis)
3. [Course APIs](#course-apis)
4. [User APIs](#user-apis)
5. [Category APIs](#category-apis)
6. [News APIs](#news-apis)
7. [Common Response Format](#common-response-format)
8. [Error Codes](#error-codes)

---

## Slide APIs

### 1. Get Slide by ID
Lấy thông tin chi tiết của một slide theo ID.

- **URL**: `/api/v1/slides/{id}`
- **Method**: `GET`
- **Path Parameters**:
  - `id` (String, **Required**): ID của slide cần lấy
  
- **Request Example**:
  ```
  GET /api/v1/slides/slide-001
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "slide-001",
      "imageUrl": "https://example.com/images/banner-main.jpg",
      "content": "Chào mừng đến với khóa học lập trình Web",
      "type": "BANNER",
      "orderIndex": 1
    }
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Slide not found with id: slide-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 2. Create/Update Slide (Upsert)
Tạo mới hoặc cập nhật slide. Nếu `id` được cung cấp thì sẽ update, nếu không có `id` thì tạo mới.

- **URL**: `/api/v1/slides/`
- **Method**: `PUT`
- **Request Body**: `UpsertSlideReq`
  - `id` (String, **Optional**): ID của slide (để update). Nếu null thì tạo mới
  - `imageUrl` (String, **Required**): URL của hình ảnh slide
  - `content` (String, **Optional**): Nội dung mô tả của slide
  - `type` (String, **Required**): Loại slide (BANNER, PROMOTION, ANNOUNCEMENT)
  - `orderIndex` (Integer, **Optional**): Thứ tự hiển thị của slide
  - `status` (String, **Optional**): Trạng thái (ACTIVE, INACTIVE). Mặc định: ACTIVE

- **Request Example (Create)**:
  ```json
  {
    "imageUrl": "https://example.com/images/banner-new-course.jpg",
    "content": "Khóa học Spring Boot 2026",
    "type": "BANNER",
    "orderIndex": 2,
    "status": "ACTIVE"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "slide-001",
    "imageUrl": "https://example.com/images/banner-updated.jpg",
    "content": "Khóa học Spring Boot 2026 - Đã cập nhật",
    "type": "BANNER",
    "orderIndex": 1,
    "status": "ACTIVE"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "slide-002",
      "imageUrl": "https://example.com/images/banner-new-course.jpg",
      "content": "Khóa học Spring Boot 2026",
      "type": "BANNER",
      "orderIndex": 2
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Validation failed",
    "errors": [
      {
        "field": "imageUrl",
        "message": "imageUrl is required"
      }
    ],
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 3. Delete Slide
Xóa một slide theo ID.

- **URL**: `/api/v1/slides/`
- **Method**: `DELETE`
- **Request Body**: `DeleteSlideReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các slide cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["slide-001", "slide-002"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": true
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Slide not found with id: slide-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 4. Filter Slides by Type
Lọc danh sách slides theo loại.

- **URL**: `/api/v1/slides/filter/{type}`
- **Method**: `POST`
- **Path Parameters**:
  - `type` (String, **Required**): Loại slide cần lọc (BANNER, PROMOTION, ANNOUNCEMENT)

- **Request Example**:
  ```
  POST /api/v1/slides/filter/BANNER
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "slide-001",
        "imageUrl": "https://example.com/images/banner-main.jpg",
        "content": "Chào mừng đến với khóa học lập trình Web",
        "type": "BANNER",
        "orderIndex": 1
      },
      {
        "id": "slide-002",
        "imageUrl": "https://example.com/images/banner-java.jpg",
        "content": "Khóa học Java Spring Boot từ cơ bản đến nâng cao",
        "type": "BANNER",
        "orderIndex": 2
      }
    ]
  }
  ```

---

## Class APIs

### 1. Create/Update Class (Upsert)
Tạo mới hoặc cập nhật thông tin lớp học.

- **URL**: `/api/classes/upsert`
- **Method**: `POST`
- **Request Body**: `UpsertClassReq`
  - `id` (String, **Optional**): ID của lớp học (để update). Nếu null thì tạo mới
  - `code` (String, **Required**): Mã lớp học (unique)
  - `name` (String, **Required**): Tên lớp học
  - `courseId` (String, **Required**): ID của khóa học
  - `instructorId` (String, **Required**): ID của giảng viên
  - `startDate` (LocalDate, **Required**): Ngày bắt đầu (format: YYYY-MM-DD)
  - `endDate` (LocalDate, **Required**): Ngày kết thúc (format: YYYY-MM-DD)
  - `schedule` (String, **Optional**): Lịch học (ví dụ: "Thứ 2, 4, 6 - 18:00-20:00")
  - `location` (String, **Optional**): Địa điểm học
  - `maxStudents` (Integer, **Required**): Số lượng học viên tối đa
  - `currentStudents` (Integer, **Optional**): Số lượng học viên hiện tại. Mặc định: 0
  - `status` (String, **Optional**): Trạng thái (PENDING, ACTIVE, COMPLETED, CANCELLED). Mặc định: PENDING

- **Request Example (Create)**:
  ```json
  {
    "code": "JAVA-2026-01",
    "name": "Java Spring Boot - Lớp 01",
    "courseId": "course-java-001",
    "instructorId": "instructor-001",
    "startDate": "2026-02-01",
    "endDate": "2026-04-30",
    "schedule": "Thứ 2, 4, 6 - 18:00-20:00",
    "location": "Phòng A101 - Tầng 1",
    "maxStudents": 30,
    "currentStudents": 0,
    "status": "PENDING"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "class-001",
    "code": "JAVA-2026-01",
    "name": "Java Spring Boot - Lớp 01 (Updated)",
    "courseId": "course-java-001",
    "instructorId": "instructor-002",
    "startDate": "2026-02-05",
    "endDate": "2026-05-05",
    "schedule": "Thứ 3, 5, 7 - 19:00-21:00",
    "location": "Phòng B201 - Tầng 2",
    "maxStudents": 35,
    "currentStudents": 15,
    "status": "ACTIVE"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "class-001",
      "code": "JAVA-2026-01"
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Class code already exists: JAVA-2026-01",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 2. Filter Classes
Lọc danh sách lớp học theo các tiêu chí.

- **URL**: `/api/classes/filter`
- **Method**: `POST`
- **Request Body**: `FilterClassReq`
  - `id` (String, **Optional**): Lọc theo ID
  - `code` (String, **Optional**): Lọc theo mã lớp (tìm kiếm gần đúng)
  - `name` (String, **Optional**): Lọc theo tên lớp (tìm kiếm gần đúng)
  - `courseId` (String, **Optional**): Lọc theo ID khóa học
  - `instructorId` (String, **Optional**): Lọc theo ID giảng viên
  - `startDateFrom` (LocalDate, **Optional**): Lọc ngày bắt đầu từ (format: YYYY-MM-DD)
  - `startDateTo` (LocalDate, **Optional**): Lọc ngày bắt đầu đến (format: YYYY-MM-DD)
  - `status` (String, **Optional**): Lọc theo trạng thái
  - `page` (Integer, **Optional**): Số trang (bắt đầu từ 0). Mặc định: 0
  - `size` (Integer, **Optional**): Số lượng items mỗi trang. Mặc định: 10

- **Request Example**:
  ```json
  {
    "courseId": "course-java-001",
    "status": "ACTIVE",
    "startDateFrom": "2026-02-01",
    "startDateTo": "2026-03-31",
    "page": 0,
    "size": 20
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "data": [
        {
          "id": "class-001",
          "code": "JAVA-2026-01",
          "name": "Java Spring Boot - Lớp 01",
          "courseId": "course-java-001",
          "courseName": "Lập trình Java Spring Boot",
          "instructorId": "instructor-001",
          "instructorName": "Nguyễn Văn An",
          "startDate": "2026-02-01",
          "endDate": "2026-04-30",
          "schedule": "Thứ 2, 4, 6 - 18:00-20:00",
          "location": "Phòng A101 - Tầng 1",
          "maxStudents": 30,
          "currentStudents": 25,
          "status": "ACTIVE",
          "createdAt": "2026-01-05T10:00:00+07:00",
          "updatedAt": "2026-01-05T14:30:00+07:00"
        },
        {
          "id": "class-002",
          "code": "JAVA-2026-02",
          "name": "Java Spring Boot - Lớp 02",
          "courseId": "course-java-001",
          "courseName": "Lập trình Java Spring Boot",
          "instructorId": "instructor-002",
          "instructorName": "Trần Thị Bình",
          "startDate": "2026-02-15",
          "endDate": "2026-05-15",
          "schedule": "Thứ 3, 5, 7 - 19:00-21:00",
          "location": "Phòng B201 - Tầng 2",
          "maxStudents": 35,
          "currentStudents": 18,
          "status": "ACTIVE",
          "createdAt": "2026-01-10T09:00:00+07:00",
          "updatedAt": "2026-01-10T09:00:00+07:00"
        }
      ],
      "total": 2,
      "page": 0,
      "size": 20
    }
  }
  ```

---

### 3. Get Class Detail
Lấy thông tin chi tiết của một lớp học.

- **URL**: `/api/classes/{id}`
- **Method**: `GET`
- **Path Parameters**:
  - `id` (String, **Required**): ID của lớp học

- **Request Example**:
  ```
  GET /api/classes/class-001
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "class-001",
      "code": "JAVA-2026-01",
      "name": "Java Spring Boot - Lớp 01",
      "courseId": "course-java-001",
      "courseName": "Lập trình Java Spring Boot",
      "instructorId": "instructor-001",
      "instructorName": "Nguyễn Văn An",
      "startDate": "2026-02-01",
      "endDate": "2026-04-30",
      "schedule": "Thứ 2, 4, 6 - 18:00-20:00",
      "location": "Phòng A101 - Tầng 1",
      "maxStudents": 30,
      "currentStudents": 25,
      "status": "ACTIVE",
      "createdAt": "2026-01-05T10:00:00+07:00",
      "updatedAt": "2026-01-05T14:30:00+07:00"
    }
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Class not found with id: class-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 4. Delete Classes
Xóa một hoặc nhiều lớp học.

- **URL**: `/api/classes/delete`
- **Method**: `DELETE`
- **Request Body**: `DeleteClassesReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các lớp học cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["class-001", "class-002"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": "Classes deleted successfully"
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Class not found with id: class-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

## Course APIs

### 1. Get Course Detail
Lấy thông tin chi tiết của một khóa học.

- **URL**: `/api/courses/{id}`
- **Method**: `GET`
- **Path Parameters**:
  - `id` (String, **Required**): ID của khóa học

- **Request Example**:
  ```
  GET /api/courses/course-java-001
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "course-java-001",
      "courseCode": "JAVA-SPRING-2026",
      "title": "Lập trình Java Spring Boot từ cơ bản đến nâng cao",
      "slug": "lap-trinh-java-spring-boot-tu-co-ban-den-nang-cao",
      "categoryCode": "PROGRAMMING",
      "thumbnailUrl": "https://example.com/images/java-course.jpg",
      "price": 5000000,
      "duration": 120,
      "level": "INTERMEDIATE",
      "descriptionHtml": "<h2>Mô tả khóa học</h2><p>Khóa học Java Spring Boot giúp bạn...</p>",
      "subject": "Java, Spring Boot, Microservices",
      "status": "ACTIVE",
      "createdAt": "2025-12-01T10:00:00+07:00",
      "updatedAt": "2026-01-05T14:30:00+07:00",
      "highlights": [
        "Học từ cơ bản đến nâng cao",
        "Dự án thực tế",
        "Hỗ trợ 24/7",
        "Cấp chứng chỉ"
      ],
      "syllabus": [
        {
          "module": "Module 1",
          "title": "Giới thiệu về Java và Spring Boot",
          "hours": 12
        },
        {
          "module": "Module 2",
          "title": "Spring MVC và RESTful API",
          "hours": 20
        },
        {
          "module": "Module 3",
          "title": "Spring Data JPA và Database",
          "hours": 16
        },
        {
          "module": "Module 4",
          "title": "Spring Security và Authentication",
          "hours": 18
        },
        {
          "module": "Module 5",
          "title": "Microservices và Docker",
          "hours": 24
        },
        {
          "module": "Module 6",
          "title": "Dự án thực tế",
          "hours": 30
        }
      ],
      "requirements": [
        "Kiến thức cơ bản về lập trình",
        "Hiểu biết về Java cơ bản",
        "Máy tính cài đặt Java 17+",
        "IDE IntelliJ IDEA hoặc Eclipse"
      ],
      "instructor": {
        "id": "instructor-001",
        "username": "nguyenvanan",
        "email": "nguyenvanan@example.com",
        "avatarUrl": "https://example.com/avatars/instructor-001.jpg",
        "description": "10 năm kinh nghiệm lập trình Java, chuyên gia Spring Boot"
      },
      "benefitsHtml": "<h3>Lợi ích</h3><ul><li>Thành thạo Spring Boot</li><li>Xây dựng ứng dụng thực tế</li></ul>"
    }
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Course not found with id: course-java-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 2. Create/Update Course (Upsert)
Tạo mới hoặc cập nhật thông tin khóa học.

- **URL**: `/api/courses/`
- **Method**: `PUT`
- **Request Body**: `UpsertCourseReq`
  - `id` (String, **Optional**): ID của khóa học (để update). Nếu null thì tạo mới
  - `courseCode` (String, **Required**): Mã khóa học (unique)
  - `title` (String, **Required**): Tiêu đề khóa học
  - `slug` (String, **Optional**): URL-friendly slug (auto-generate nếu không có)
  - `categoryCode` (String, **Required**): Mã danh mục
  - `thumbnailUrl` (String, **Optional**): URL hình đại diện
  - `price` (String, **Required**): Giá khóa học (số)
  - `duration` (String, **Required**): Thời lượng khóa học (giờ)
  - `level` (String, **Required**): Cấp độ (BEGINNER, INTERMEDIATE, ADVANCED)
  - `descriptionHtml` (String, **Optional**): Mô tả chi tiết (HTML)
  - `subject` (String, **Optional**): Chủ đề
  - `status` (String, **Optional**): Trạng thái (DRAFT, ACTIVE, INACTIVE). Mặc định: DRAFT
  - `instructorId` (String, **Required**): ID của giảng viên
  - `highlights` (List<String>, **Optional**): Điểm nổi bật
  - `syllabus` (List<SyllabusDto>, **Optional**): Nội dung giảng dạy
    - `module` (String): Tên module
    - `title` (String): Tiêu đề
    - `hours` (Integer): Số giờ học
  - `requirements` (List<String>, **Optional**): Yêu cầu đầu vào
  - `benefitsHtml` (String, **Optional**): Lợi ích khóa học (HTML)

- **Request Example (Create)**:
  ```json
  {
    "courseCode": "PYTHON-2026",
    "title": "Lập trình Python cho người mới bắt đầu",
    "slug": "lap-trinh-python-cho-nguoi-moi-bat-dau",
    "categoryCode": "PROGRAMMING",
    "thumbnailUrl": "https://example.com/images/python-course.jpg",
    "price": "3000000",
    "duration": "80",
    "level": "BEGINNER",
    "descriptionHtml": "<h2>Khóa học Python</h2><p>Học Python từ đầu...</p>",
    "subject": "Python, Programming Basics",
    "status": "ACTIVE",
    "instructorId": "instructor-003",
    "highlights": [
      "Dễ hiểu cho người mới",
      "Bài tập thực hành nhiều",
      "Hỗ trợ tận tình"
    ],
    "syllabus": [
      {
        "module": "Module 1",
        "title": "Cơ bản về Python",
        "hours": 15
      },
      {
        "module": "Module 2",
        "title": "Cấu trúc dữ liệu",
        "hours": 20
      },
      {
        "module": "Module 3",
        "title": "OOP với Python",
        "hours": 25
      },
      {
        "module": "Module 4",
        "title": "Dự án thực tế",
        "hours": 20
      }
    ],
    "requirements": [
      "Không cần kinh nghiệm lập trình",
      "Máy tính cài Python 3.x",
      "Tinh thần học hỏi"
    ],
    "benefitsHtml": "<h3>Bạn sẽ học được</h3><ul><li>Nắm vững Python cơ bản</li><li>Tự tin làm dự án</li></ul>"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "course-python-001",
    "courseCode": "PYTHON-2026",
    "title": "Lập trình Python cho người mới bắt đầu - Cập nhật 2026",
    "slug": "lap-trinh-python-cho-nguoi-moi-bat-dau-2026",
    "categoryCode": "PROGRAMMING",
    "thumbnailUrl": "https://example.com/images/python-course-new.jpg",
    "price": "3500000",
    "duration": "90",
    "level": "BEGINNER",
    "descriptionHtml": "<h2>Khóa học Python - Phiên bản mới</h2><p>Cập nhật nội dung...</p>",
    "subject": "Python, Programming Basics, Django",
    "status": "ACTIVE",
    "instructorId": "instructor-003",
    "highlights": [
      "Dễ hiểu cho người mới",
      "Bài tập thực hành nhiều",
      "Hỗ trợ tận tình",
      "Học thêm Django framework"
    ],
    "syllabus": [
      {
        "module": "Module 1",
        "title": "Cơ bản về Python",
        "hours": 15
      },
      {
        "module": "Module 2",
        "title": "Cấu trúc dữ liệu",
        "hours": 20
      },
      {
        "module": "Module 3",
        "title": "OOP với Python",
        "hours": 25
      },
      {
        "module": "Module 4",
        "title": "Django Framework",
        "hours": 15
      },
      {
        "module": "Module 5",
        "title": "Dự án thực tế",
        "hours": 15
      }
    ],
    "requirements": [
      "Không cần kinh nghiệm lập trình",
      "Máy tính cài Python 3.10+",
      "Tinh thần học hỏi"
    ],
    "benefitsHtml": "<h3>Bạn sẽ học được</h3><ul><li>Nắm vững Python cơ bản</li><li>Làm web với Django</li><li>Tự tin làm dự án</li></ul>"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "course-python-001",
      "courseCode": "PYTHON-2026",
      "message": "Course created successfully"
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Course code already exists: PYTHON-2026",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 3. Delete Courses
Xóa một hoặc nhiều khóa học.

- **URL**: `/api/courses/`
- **Method**: `DELETE`
- **Request Body**: `DeleteCoursesReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các khóa học cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["course-python-001", "course-java-002"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "message": "Courses deleted successfully"
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Course not found with id: course-python-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 4. Filter Courses
Lọc danh sách khóa học theo các tiêu chí.

- **URL**: `/api/courses/filter`
- **Method**: `POST`
- **Request Body**: `FilterCourseReq`
  - `id` (String, **Optional**): Lọc theo ID
  - `courseCode` (String, **Optional**): Lọc theo mã khóa học
  - `slug` (String, **Optional**): Lọc theo slug
  - `categoryCode` (String, **Optional**): Lọc theo mã danh mục
  - `level` (String, **Optional**): Lọc theo cấp độ (BEGINNER, INTERMEDIATE, ADVANCED)
  - `subject` (String, **Optional**): Lọc theo chủ đề
  - `status` (String, **Optional**): Lọc theo trạng thái
  - `page` (Integer, **Optional**): Số trang (bắt đầu từ 0). Mặc định: 0
  - `size` (Integer, **Optional**): Số lượng items mỗi trang (max: 100). Mặc định: 10

- **Request Example**:
  ```json
  {
    "categoryCode": "PROGRAMMING",
    "level": "BEGINNER",
    "status": "ACTIVE",
    "page": 0,
    "size": 10
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "items": [
        {
          "id": "course-python-001",
          "courseCode": "PYTHON-2026",
          "title": "Lập trình Python cho người mới bắt đầu",
          "slug": "lap-trinh-python-cho-nguoi-moi-bat-dau",
          "categoryCode": "PROGRAMMING",
          "thumbnailUrl": "https://example.com/images/python-course.jpg",
          "price": 3000000,
          "duration": 80,
          "level": "BEGINNER",
          "subject": "Python, Programming Basics",
          "status": "ACTIVE",
          "createdAt": "2025-12-15T10:00:00+07:00",
          "updatedAt": "2026-01-05T14:30:00+07:00",
          "highlights": [
            "Dễ hiểu cho người mới",
            "Bài tập thực hành nhiều",
            "Hỗ trợ tận tình"
          ],
          "instructor": {
            "id": "instructor-003",
            "username": "lethimai",
            "email": "lethimai@example.com",
            "avatarUrl": "https://example.com/avatars/instructor-003.jpg",
            "description": "5 năm kinh nghiệm dạy Python"
          }
        },
        {
          "id": "course-web-001",
          "courseCode": "WEB-2026",
          "title": "Lập trình Web cơ bản với HTML, CSS, JavaScript",
          "slug": "lap-trinh-web-co-ban",
          "categoryCode": "PROGRAMMING",
          "thumbnailUrl": "https://example.com/images/web-course.jpg",
          "price": 2500000,
          "duration": 60,
          "level": "BEGINNER",
          "subject": "HTML, CSS, JavaScript",
          "status": "ACTIVE",
          "createdAt": "2025-11-20T10:00:00+07:00",
          "updatedAt": "2025-12-10T14:30:00+07:00",
          "highlights": [
            "Học làm website từ đầu",
            "Dự án thực tế",
            "Tài liệu đầy đủ"
          ],
          "instructor": {
            "id": "instructor-004",
            "username": "phamvanbinh",
            "email": "phamvanbinh@example.com",
            "avatarUrl": "https://example.com/avatars/instructor-004.jpg",
            "description": "Web developer với 7 năm kinh nghiệm"
          }
        }
      ],
      "total": 2
    }
  }
  ```

---

## User APIs

### 1. Filter Users
Lọc danh sách người dùng theo các tiêu chí.

- **URL**: `/api/v1/users/filter`
- **Method**: `POST`
- **Request Body**: `FilterUserReq`
  - `id` (String, **Optional**): Lọc theo ID
  - `username` (String, **Optional**): Lọc theo username (tìm kiếm gần đúng)
  - `email` (String, **Optional**): Lọc theo email (tìm kiếm gần đúng)
  - `phoneNumber` (String, **Optional**): Lọc theo số điện thoại
  - `role` (String, **Optional**): Lọc theo vai trò (ADMIN, INSTRUCTOR, STUDENT)
  - `status` (String, **Optional**): Lọc theo trạng thái (ACTIVE, INACTIVE, SUSPENDED)
  - `page` (Integer, **Optional**): Số trang (bắt đầu từ 0). Mặc định: 0
  - `size` (Integer, **Optional**): Số lượng items mỗi trang (max: 100). Mặc định: 10

- **Request Example**:
  ```json
  {
    "role": "STUDENT",
    "status": "ACTIVE",
    "page": 0,
    "size": 20
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "items": [
        {
          "id": "user-001",
          "username": "nguyenvana",
          "email": "nguyenvana@example.com",
          "phoneNumber": "0901234567",
          "role": "STUDENT",
          "avatarUrl": "https://example.com/avatars/user-001.jpg",
          "description": "Sinh viên năm 3 ngành CNTT",
          "dob": "2003-05-15",
          "status": "ACTIVE"
        },
        {
          "id": "user-002",
          "username": "tranthib",
          "email": "tranthib@example.com",
          "phoneNumber": "0912345678",
          "role": "STUDENT",
          "avatarUrl": "https://example.com/avatars/user-002.jpg",
          "description": "Đang học lập trình web",
          "dob": "2002-08-20",
          "status": "ACTIVE"
        }
      ],
      "total": 2
    }
  }
  ```

---

### 2. Create/Update User (Upsert)
Tạo mới hoặc cập nhật thông tin người dùng.

- **URL**: `/api/v1/users/`
- **Method**: `PUT`
- **Request Body**: `UpsertUserReq`
  - `id` (String, **Optional**): ID của user (để update). Nếu null thì tạo mới
  - `username` (String, **Required**): Tên đăng nhập (unique)
  - `email` (String, **Required**): Email (unique)
  - `phoneNumber` (String, **Optional**): Số điện thoại
  - `role` (String, **Required**): Vai trò (ADMIN, INSTRUCTOR, STUDENT)
  - `avatarUrl` (String, **Optional**): URL ảnh đại diện
  - `description` (String, **Optional**): Mô tả người dùng
  - `dob` (LocalDate, **Optional**): Ngày sinh (format: YYYY-MM-DD)
  - `status` (String, **Optional**): Trạng thái (ACTIVE, INACTIVE, SUSPENDED). Mặc định: ACTIVE
  - `password` (String, **Required** for create, **Optional** for update): Mật khẩu

- **Request Example (Create)**:
  ```json
  {
    "username": "nguyenvanc",
    "email": "nguyenvanc@example.com",
    "phoneNumber": "0923456789",
    "role": "STUDENT",
    "avatarUrl": "https://example.com/avatars/default.jpg",
    "description": "Học viên mới",
    "dob": "2001-12-10",
    "status": "ACTIVE",
    "password": "SecurePass123!"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "user-003",
    "username": "nguyenvanc",
    "email": "nguyenvanc.updated@example.com",
    "phoneNumber": "0923456789",
    "role": "STUDENT",
    "avatarUrl": "https://example.com/avatars/user-003-new.jpg",
    "description": "Học viên xuất sắc",
    "dob": "2001-12-10",
    "status": "ACTIVE"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "user-003",
      "status": true
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Email already exists: nguyenvanc@example.com",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 3. Delete Users
Xóa một hoặc nhiều người dùng.

- **URL**: `/api/v1/users/`
- **Method**: `DELETE`
- **Request Body**: `DeleteUserReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các user cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["user-003", "user-004"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": true
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "User not found with id: user-003",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

## Category APIs

### 1. Get All Categories
Lấy danh sách tất cả danh mục với bộ lọc.

- **URL**: `/api/categories/`
- **Method**: `GET`
- **Request Body**: `FilterCategoryReq`
  - `type` (String, **Optional**): Lọc theo loại danh mục (COURSE, NEWS)
  - `status` (String, **Optional**): Lọc theo trạng thái (ACTIVE, INACTIVE)
  - `name` (String, **Optional**): Lọc theo tên (tìm kiếm gần đúng)
  - `code` (String, **Optional**): Lọc theo mã
  - `id` (String, **Optional**): Lọc theo ID

- **Request Example**:
  ```json
  {
    "type": "COURSE",
    "status": "ACTIVE"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "items": [
        {
          "id": "cat-001",
          "code": "PROGRAMMING",
          "name": "Lập trình",
          "type": "COURSE",
          "status": "ACTIVE",
          "createdAt": "2025-11-01T10:00:00+07:00",
          "updatedAt": "2025-11-01T10:00:00+07:00"
        },
        {
          "id": "cat-002",
          "code": "DATABASE",
          "name": "Cơ sở dữ liệu",
          "type": "COURSE",
          "status": "ACTIVE",
          "createdAt": "2025-11-01T10:00:00+07:00",
          "updatedAt": "2025-11-01T10:00:00+07:00"
        },
        {
          "id": "cat-003",
          "code": "DESIGN",
          "name": "Thiết kế",
          "type": "COURSE",
          "status": "ACTIVE",
          "createdAt": "2025-11-01T10:00:00+07:00",
          "updatedAt": "2025-11-01T10:00:00+07:00"
        }
      ],
      "total": 3
    }
  }
  ```

---

### 2. Create/Update Category (Upsert)
Tạo mới hoặc cập nhật danh mục.

- **URL**: `/api/categories/`
- **Method**: `PUT`
- **Request Body**: `UpsertCategoryReq`
  - `code` (String, **Required**): Mã danh mục (unique)
  - `name` (String, **Required**): Tên danh mục
  - `type` (String, **Required**): Loại danh mục (COURSE, NEWS)
  - `id` (String, **Optional**): ID của danh mục (để update). Nếu null thì tạo mới
  - `status` (String, **Optional**): Trạng thái (ACTIVE, INACTIVE). Mặc định: ACTIVE

- **Request Example (Create)**:
  ```json
  {
    "code": "MARKETING",
    "name": "Marketing",
    "type": "COURSE",
    "status": "ACTIVE"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "cat-004",
    "code": "MARKETING",
    "name": "Marketing & Sales",
    "type": "COURSE",
    "status": "ACTIVE"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "cat-004",
      "code": "MARKETING",
      "name": "Marketing",
      "type": "COURSE",
      "status": "ACTIVE",
      "createdAt": "2026-01-05T14:30:00+07:00",
      "updatedAt": "2026-01-05T14:30:00+07:00"
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Category code already exists: MARKETING",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 3. Delete Categories
Xóa một hoặc nhiều danh mục.

- **URL**: `/api/categories/`
- **Method**: `DELETE`
- **Request Body**: `DeleteCategoriesReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các danh mục cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["cat-004", "cat-005"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": "Xóa danh mục thành công"
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "Category not found with id: cat-004",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

## News APIs

### 1. Get News Detail
Lấy thông tin chi tiết của một tin tức.

- **URL**: `/api/v1/news/{id}`
- **Method**: `GET`
- **Path Parameters**:
  - `id` (String, **Required**): ID của tin tức

- **Request Example**:
  ```
  GET /api/v1/news/news-001
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "news-001",
      "title": "Khai giảng khóa học Java Spring Boot 2026",
      "summary": "Trung tâm VITC thông báo khai giảng khóa học Java Spring Boot dành cho người mới bắt đầu",
      "contentHtml": "<h2>Thông tin chi tiết</h2><p>Khóa học sẽ bắt đầu từ ngày 01/02/2026...</p>",
      "imageUrl": "https://example.com/news/java-course-opening.jpg",
      "categories": [
        {
          "id": "cat-news-001",
          "code": "EDUCATION",
          "name": "Giáo dục",
          "type": "NEWS",
          "status": "ACTIVE",
          "createdAt": "2025-11-01T10:00:00+07:00",
          "updatedAt": "2025-11-01T10:00:00+07:00"
        },
        {
          "id": "cat-news-002",
          "code": "ANNOUNCEMENT",
          "name": "Thông báo",
          "type": "NEWS",
          "status": "ACTIVE",
          "createdAt": "2025-11-01T10:00:00+07:00",
          "updatedAt": "2025-11-01T10:00:00+07:00"
        }
      ],
      "status": "PUBLISHED",
      "createdAt": "2026-01-03T10:00:00+07:00",
      "updatedAt": "2026-01-05T14:30:00+07:00",
      "createdBy": "admin-001",
      "updatedBy": "admin-001"
    }
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "News not found with id: news-001",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 2. Create/Update News (Upsert)
Tạo mới hoặc cập nhật tin tức.

- **URL**: `/api/v1/news/`
- **Method**: `PUT`
- **Request Body**: `UpsertNewsReq`
  - `id` (String, **Optional**): ID của tin tức (để update). Nếu null thì tạo mới
  - `title` (String, **Required**): Tiêu đề tin tức
  - `summary` (String, **Optional**): Tóm tắt nội dung
  - `contentHtml` (String, **Required**): Nội dung chi tiết (HTML)
  - `imageUrl` (String, **Optional**): URL hình ảnh đại diện
  - `categories` (List<String>, **Optional**): Danh sách ID các danh mục
  - `status` (String, **Optional**): Trạng thái (DRAFT, PUBLISHED, ARCHIVED). Mặc định: DRAFT
  - `slug` (String, **Optional**): URL-friendly slug (auto-generate nếu không có)

- **Request Example (Create)**:
  ```json
  {
    "title": "Học bổng 50% cho học viên đăng ký sớm",
    "summary": "Nhận học bổng 50% khi đăng ký trước ngày 15/01/2026",
    "contentHtml": "<h2>Chi tiết chương trình</h2><p>Chương trình học bổng dành cho...</p>",
    "imageUrl": "https://example.com/news/scholarship-2026.jpg",
    "categories": ["cat-news-001", "cat-news-003"],
    "status": "PUBLISHED",
    "slug": "hoc-bong-50-phan-tram-cho-hoc-vien-dang-ky-som"
  }
  ```

- **Request Example (Update)**:
  ```json
  {
    "id": "news-002",
    "title": "Học bổng 50% cho học viên đăng ký sớm - Gia hạn đến 20/01",
    "summary": "Nhận học bổng 50% khi đăng ký trước ngày 20/01/2026 (đã gia hạn)",
    "contentHtml": "<h2>Chi tiết chương trình</h2><p>Do nhiều yêu cầu, chương trình đã được gia hạn...</p>",
    "imageUrl": "https://example.com/news/scholarship-2026-extended.jpg",
    "categories": ["cat-news-001", "cat-news-003"],
    "status": "PUBLISHED",
    "slug": "hoc-bong-50-phan-tram-cho-hoc-vien-dang-ky-som-gia-han"
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": {
      "id": "news-002",
      "title": "Học bổng 50% cho học viên đăng ký sớm",
      "slug": "hoc-bong-50-phan-tram-cho-hoc-vien-dang-ky-som"
    }
  }
  ```

- **Response Error** (400 Bad Request):
  ```json
  {
    "status": "error",
    "message": "Validation failed",
    "errors": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ],
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 3. Delete News
Xóa một hoặc nhiều tin tức.

- **URL**: `/api/v1/news/`
- **Method**: `DELETE`
- **Request Body**: `DeleteNewsReq`
  - `ids` (List<String>, **Required**): Danh sách ID của các tin tức cần xóa

- **Request Example**:
  ```json
  {
    "ids": ["news-002", "news-003"]
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": true
  }
  ```

- **Response Error** (404 Not Found):
  ```json
  {
    "status": "error",
    "message": "News not found with id: news-002",
    "timestamp": "2026-01-05T14:30:00+07:00"
  }
  ```

---

### 4. Filter News
Lọc danh sách tin tức theo các tiêu chí.

- **URL**: `/api/v1/news/filter`
- **Method**: `POST`
- **Request Body**: `FilterNewsReq`
  - `id` (String, **Optional**): Lọc theo ID
  - `title` (String, **Optional**): Lọc theo tiêu đề (tìm kiếm gần đúng)
  - `categories` (List<String>, **Optional**): Lọc theo danh sách ID danh mục
  - `status` (String, **Optional**): Lọc theo trạng thái (DRAFT, PUBLISHED, ARCHIVED)
  - `page` (Integer, **Optional**): Số trang (bắt đầu từ 0). Mặc định: 0
  - `size` (Integer, **Optional**): Số lượng items mỗi trang (max: 100). Mặc định: 10

- **Request Example**:
  ```json
  {
    "categories": ["cat-news-001"],
    "status": "PUBLISHED",
    "page": 0,
    "size": 10
  }
  ```

- **Response Success** (200 OK):
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "news-001",
        "title": "Khai giảng khóa học Java Spring Boot 2026",
        "summary": "Trung tâm VITC thông báo khai giảng khóa học Java Spring Boot dành cho người mới bắt đầu",
        "imageUrl": "https://example.com/news/java-course-opening.jpg",
        "categories": [
          {
            "id": "cat-news-001",
            "code": "EDUCATION",
            "name": "Giáo dục"
          },
          {
            "id": "cat-news-002",
            "code": "ANNOUNCEMENT",
            "name": "Thông báo"
          }
        ],
        "status": "PUBLISHED",
        "createdAt": "2026-01-03T10:00:00+07:00"
      },
      {
        "id": "news-004",
        "title": "Chương trình đào tạo Python miễn phí cho sinh viên",
        "summary": "VITC tổ chức khóa học Python miễn phí dành cho sinh viên các trường đại học",
        "imageUrl": "https://example.com/news/python-free-course.jpg",
        "categories": [
          {
            "id": "cat-news-001",
            "code": "EDUCATION",
            "name": "Giáo dục"
          }
        ],
        "status": "PUBLISHED",
        "createdAt": "2026-01-04T15:00:00+07:00"
      }
    ]
  }
  ```

---

## Common Response Format

Tất cả các API đều trả về response theo format chuẩn:

### Success Response
```json
{
  "status": "success",
  "data": { /* dữ liệu response */ }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Thông báo lỗi",
  "timestamp": "2026-01-05T14:30:00+07:00"
}
```

### List Response (Pagination)
```json
{
  "status": "success",
  "data": {
    "items": [ /* danh sách items */ ],
    "total": 100
  }
}
```

hoặc

```json
{
  "status": "success",
  "data": {
    "data": [ /* danh sách items */ ],
    "total": 100,
    "page": 0,
    "size": 10
  }
}
```

---

## Error Codes

| HTTP Status | Message | Mô tả |
|-------------|---------|-------|
| 200 | OK | Request thành công |
| 400 | Bad Request | Dữ liệu đầu vào không hợp lệ |
| 401 | Unauthorized | Chưa xác thực |
| 403 | Forbidden | Không có quyền truy cập |
| 404 | Not Found | Không tìm thấy resource |
| 409 | Conflict | Xung đột dữ liệu (ví dụ: duplicate key) |
| 500 | Internal Server Error | Lỗi server |

---

## Notes for Frontend

### 1. Date Format
- **Input**: Sử dụng format `YYYY-MM-DD` cho LocalDate (ví dụ: "2026-01-05")
- **Output**: API trả về format ISO 8601 với timezone (ví dụ: "2026-01-05T14:30:00+07:00")

### 2. Pagination
- `page` bắt đầu từ 0 (không phải 1)
- `size` mặc định là 10, tối đa 100

### 3. Status Values
- **Class Status**: PENDING, ACTIVE, COMPLETED, CANCELLED
- **Course Status**: DRAFT, ACTIVE, INACTIVE
- **User Status**: ACTIVE, INACTIVE, SUSPENDED
- **News Status**: DRAFT, PUBLISHED, ARCHIVED
- **Category Status**: ACTIVE, INACTIVE
- **Slide Status**: ACTIVE, INACTIVE

### 4. Levels (Course)
- BEGINNER: Cơ bản
- INTERMEDIATE: Trung cấp
- ADVANCED: Nâng cao

### 5. Roles (User)
- ADMIN: Quản trị viên
- INSTRUCTOR: Giảng viên
- STUDENT: Học viên

### 6. Category Types
- COURSE: Danh mục khóa học
- NEWS: Danh mục tin tức

### 7. Slide Types
- BANNER: Banner chính
- PROMOTION: Quảng cáo khuyến mãi
- ANNOUNCEMENT: Thông báo

### 8. Required vs Optional Fields
- Các trường có đánh dấu **Required** là bắt buộc phải có
- Các trường **Optional** có thể bỏ qua hoặc gửi null
- Khi update (có `id`), thường các trường validation sẽ loose hơn khi create

### 9. ID Fields
- Khi tạo mới: Không cần gửi `id` hoặc gửi `id = null`
- Khi update: Bắt buộc phải có `id`

### 10. HTML Content
- Các trường có suffix `Html` (như `contentHtml`, `descriptionHtml`) chấp nhận HTML tags
- Frontend cần sanitize HTML trước khi hiển thị để tránh XSS

---

## Changelog

### Version 1.0 (2026-01-05)
- Initial API documentation
- Thêm chi tiết đầy đủ cho tất cả endpoints
- Thêm ví dụ request/response với dữ liệu thực tế
- Phân biệt rõ trường Required và Optional

