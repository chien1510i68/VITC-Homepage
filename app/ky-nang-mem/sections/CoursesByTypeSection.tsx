"use client";

import { useMemo, useState } from 'react';
import CourseCard from './CourseCard';

type Course = {
  id: number;
  title: string;
  category: string;
  excerpt?: string;
  image?: string;
  duration?: string;
  level?: string;
  audience?: string[];
};

// Accurate data derived from the VNUA pages
// Two logical groups used on the site: 'Bắt buộc' (core modules for students) and 'Theo nhu cầu' (on-demand modules)
const ALL_COURSES: Course[] = [
  // Bắt buộc (1-6 as listed on the site)
  { id: 1, title: 'Kỹ năng giao tiếp', category: 'Bắt buộc', excerpt: 'Các phương thức giao tiếp và thực hành lắng nghe', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynanggiaotiep.png' },
  { id: 2, title: 'Kỹ năng làm việc nhóm', category: 'Bắt buộc', excerpt: 'Kỹ năng hợp tác, phân công và giải quyết xung đột', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynanglamviecnhom.png' },
  { id: 3, title: 'Kỹ năng quản lý bản thân', category: 'Bắt buộc', excerpt: 'Quản lý thời gian, tự học và phát triển năng lực cá nhân', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynangquanlybanthan.png' },
  { id: 4, title: 'Kỹ năng tìm kiếm việc làm', category: 'Bắt buộc', excerpt: 'Chuẩn hóa CV, hồ sơ và kỹ năng phỏng vấn', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynangtimkiemvieclam.png' },
  { id: 5, title: 'Kỹ năng hội nhập quốc tế', category: 'Bắt buộc', excerpt: 'Chuẩn bị hành trang hội nhập và giao tiếp văn hóa', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynanghoinhap.png' },
  { id: 6, title: 'Kỹ năng giải quyết vấn đề', category: 'Bắt buộc', excerpt: 'Phân tích và giải quyết vấn đề thực tế', duration: '2 tín chỉ', audience: ['Sinh viên chính quy'], image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2016/09/kynanggiaiquyetvande.png' },

  // Theo nhu cầu (examples from the list)
  { id: 7, title: 'Tư duy sáng tạo', category: 'Theo nhu cầu', excerpt: 'Kỹ thuật tư duy sáng tạo và brainstorming', duration: '1 buổi' },
  { id: 8, title: 'Kỹ năng thuyết trình', category: 'Theo nhu cầu', excerpt: 'Kỹ năng kể chuyện và trình bày trước đám đông', duration: '1 buổi', image: 'https://images.unsplash.com/photo-1529336953121-4b2d7a1e0d1d?w=1200&q=80&auto=format&fit=crop' },
  { id: 9, title: 'Kỹ năng quản lý dự án', category: 'Theo nhu cầu', excerpt: 'Quy trình và công cụ quản lý dự án cơ bản', duration: '2 buổi', image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop' },
  { id: 10, title: 'Kỹ năng quản lý thời gian', category: 'Theo nhu cầu', excerpt: 'Kỹ năng lập kế hoạch thời gian hiệu quả', duration: '1 buổi', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80&auto=format&fit=crop' },
  { id: 11, title: 'Kỹ năng bán hàng online', category: 'Theo nhu cầu', excerpt: 'Kỹ năng tiếp thị và bán hàng trên nền tảng số', duration: '1 buổi', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop' },
  { id: 12, title: 'Kỹ năng tổ chức công việc hiệu quả', category: 'Theo nhu cầu', excerpt: 'Kỹ thuật sắp xếp và tối ưu công việc', duration: '1 buổi', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop' },
];

const CATEGORIES = ['Tất cả', 'Bắt buộc', 'Theo nhu cầu'];

export default function CoursesByTypeSection() {
  const [active, setActive] = useState<string>('Tất cả');

  const grouped = useMemo(() => {
    if (active === 'Tất cả') return ALL_COURSES;
    return ALL_COURSES.filter((c) => c.category === active);
  }, [active]);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-extrabold text-slate-900">Danh sách khóa học</h3>
          {/* <p className="mt-2 text-slate-600">Thiết kế độc đáo phù hợp Gen Z — ngắn gọn, trực quan và dễ đăng ký.</p> */}
        </div>

        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat ? 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Conditional banners instead of a persistent note */}
          {active !== 'Tất cả' && (
            <div className="mt-4 p-3 rounded-lg text-sm">
              {active === 'Bắt buộc' ? (
                <div className="bg-amber-50 border border-amber-100 text-amber-800 px-4 py-3 rounded-lg">
                  <strong>Bắt buộc:</strong> Những học phần này là yêu cầu bắt buộc cho sinh viên chính quy của Học viện.
                </div>
              ) : (
                <div className="bg-sky-50 border border-sky-100 text-sky-800 px-4 py-3 rounded-lg">
                  <strong>Theo nhu cầu:</strong> Những khóa học này mở theo nhu cầu — phù hợp cho cán bộ, doanh nghiệp và cộng đồng. Liên hệ để mở lớp theo yêu cầu.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.map((course) => (
            <div key={course.id} className="transition-all duration-300">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
