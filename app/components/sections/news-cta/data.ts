import { NewsArticle } from './types';

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Khai giảng khóa Tin học văn phòng tháng 1/2025",
    date: "15/12/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eOffice Training%3c/text%3e%3c/svg%3e",
    excerpt: "Chương trình học cập nhật mới nhất với các ứng dụng Office 365 hiện đại...",
    slug: "khai-giang-tin-hoc-van-phong-thang-1-2025"
  },
  {
    id: 2,
    title: "Hội thảo: Xu hướng công nghệ thông tin 2025",
    date: "10/12/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eTech Conference%3c/text%3e%3c/svg%3e",
    excerpt: "Tham gia hội thảo để cập nhật những xu hướng mới nhất trong lĩnh vực CNTT...",
    slug: "hoi-thao-xu-huong-cong-nghe-thong-tin-2025"
  },
  {
    id: 3,
    title: "Chúc mừng 200 học viên nhận chứng chỉ",
    date: "05/12/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eCertification%3c/text%3e%3c/svg%3e",
    excerpt: "Lễ trao chứng chỉ cho học viên hoàn thành các khóa học tin học tại VITC...",
    slug: "chuc-mung-200-hoc-vien-nhan-chung-chi"
  },
  {
    id: 4,
    title: "Khai trương phòng lab mới với trang thiết bị hiện đại",
    date: "28/11/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eLab Setup%3c/text%3e%3c/svg%3e",
    excerpt: "VITC đầu tư phòng thực hành mới với máy móc, thiết bị học tập tiên tiến...",
    slug: "khai-truong-phong-lab-moi"
  },
  {
    id: 5,
    title: "Chương trình học bổng cho sinh viên xuất sắc",
    date: "20/11/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eScholarship%3c/text%3e%3c/svg%3e",
    excerpt: "Trao tặng học bổng 100% cho các bạn sinh viên có thành tích học tập xuất sắc...",
    slug: "chuong-trinh-hoc-bong-cho-sinh-vien"
  },
  {
    id: 6,
    title: "Đào tạo kỹ năng mềm cho doanh nghiệp",
    date: "15/11/2024",
    thumbnail: "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eSoft Skills%3c/text%3e%3c/svg%3e",
    excerpt: "Khóa đào tạo kỹ năng giao tiếp và làm việc nhóm dành cho nhân viên doanh nghiệp...",
    slug: "dao-tao-ky-nang-mem-cho-doanh-nghiep"
  }
];

export const courseOptions = [
  { value: '', label: 'Chọn khóa học quan tâm' },
  { value: 'tin-hoc-van-phong', label: 'Tin học văn phòng' },
  { value: 'ke-toan-may-tinh', label: 'Kế toán trên máy tính' },
  { value: 'thiet-ke-do-hoa', label: 'Thiết kế đồ họa' },
  { value: 'ung-dung-cntt', label: 'Ứng dụng CNTT' },
  { value: 'lap-trinh-web', label: 'Lập trình Web' },
  { value: 'khac', label: 'Khóa học khác' }
];