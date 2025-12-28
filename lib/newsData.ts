export type NewsItem = {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  image?: string;
  contentHtml?: string;
  slug?: string;
};

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Hội thảo Kỹ năng mềm cho sinh viên mới',
    url: '#',
    excerpt: 'Hội thảo giới thiệu các kỹ năng cần thiết cho sinh viên trong môi trường đại học: giao tiếp, quản lý thời gian, và làm việc nhóm.',
    date: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80&auto=format&fit=crop',
    contentHtml: '<p>Chúng tôi chào mừng các sinh viên mới tham gia hội thảo <strong>Kỹ năng mềm</strong>. Buổi hội thảo bao gồm các phần: <ul><li>Giao tiếp hiệu quả</li><li>Quản lý thời gian</li><li>Làm việc nhóm</li></ul><p>Thời gian: 9:00 - 12:00. Đăng ký tại trung tâm.</p>',
    slug: 'hoi-thao-ky-nang-mem-sinh-vien-moi'
  },
  {
    id: '2',
    title: 'Khóa học Thuyết trình chuyên nghiệp',
    url: '#',
    excerpt: 'Tăng cường tự tin khi nói trước đám đông và kỹ thuật kể chuyện để thu hút khán giả.',
    date: '2025-04-22',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=efgh',
    contentHtml: '<p><strong>Khóa học Thuyết trình</strong> giúp bạn xây dựng câu chuyện, sử dụng ngôn ngữ cơ thể và xử lý lo lắng khi đứng trước công chúng. Nội dung gồm các bài tập thực hành và feedback cá nhân.</p>',
    slug: 'khoa-hoc-thuyet-trinh-chuyen-nghiep'
  },
  {
    id: '3',
    title: 'Workshop Quản lý stress cho sinh viên',
    url: '#',
    excerpt: 'Kỹ năng nhận diện stress và công cụ thực hành giảm stress hiệu quả trong học tập.',
    date: '2025-03-15',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=ijkl',
    contentHtml: '<p>Workshop này chia sẻ kỹ thuật thở, mindfulness và lối sống lành mạnh để xử lý áp lực học tập. Thực hành 30 phút mỗi buổi.</p>',
    slug: 'workshop-quan-ly-stress-sinh-vien'
  },
  {
    id: '4',
    title: 'Hội thảo Kỹ năng phỏng vấn',
    url: '#',
    excerpt: 'Chuẩn bị CV, trả lời câu hỏi phỏng vấn, và cách tạo ấn tượng trong vòng tuyển dụng.',
    date: '2025-02-05',
    image: 'https://images.unsplash.com/photo-1523293830430-5b9a0d5c6c1b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=mnop',
    contentHtml: '<p>Chuỗi buổi hướng dẫn cách viết CV chuẩn, luyện tập phỏng vấn tình huống và mô phỏng phỏng vấn với chuyên gia HR.</p>',
    slug: 'hoi-thao-ky-nang-phong-van'
  },
  {
    id: '5',
    title: 'Chuỗi bài học Kỹ năng lãnh đạo',
    url: '#',
    excerpt: 'Các hoạt động thực hành để phát triển tinh thần lãnh đạo và kỹ năng quản lý nhóm.',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=qrst',
    contentHtml: '<p>Bài học về lãnh đạo bao gồm case-study, role-play, và phản hồi nhóm. Thích hợp cho nhóm dự án và tổ chức sinh viên.</p>',
    slug: 'chuoi-bai-hoc-ky-nang-lanh-dao'
  },
  {
    id: '6',
    title: 'Khóa học Kỹ năng tư duy phản biện',
    url: '#',
    excerpt: 'Rèn luyện cách suy nghĩ logic, phân tích vấn đề và lập luận chặt chẽ.',
    date: '2024-12-10',
    image: 'https://images.unsplash.com/photo-1581093588401-7b49d3b8a3b3?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=uvwx',
    contentHtml: '<p>Khóa học cung cấp frameworks để phân tích vấn đề, phân biệt lập luận tốt và yếu, và phương pháp viết luận logic.</p>',
    slug: 'khoa-hoc-ky-nang-tu-duy-phan-bien'
  },
  {
    id: '7',
    title: 'Buổi chia sẻ Kỹ năng quản lý thời gian',
    url: '#',
    excerpt: 'Chiến lược đặt mục tiêu, ưu tiên công việc, và bí quyết tăng hiệu suất học tập.',
    date: '2024-11-05',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=yzab',
    contentHtml: '<p>Tổng hợp kỹ thuật Pomodoro, Eisenhower Matrix và mẹo để xây dựng thói quen học tập hiệu quả.</p>',
    slug: 'buoi-chia-se-ky-nang-quan-ly-thoi-gian'
  },
  {
    id: '8',
    title: 'Chương trình Mentorship dành cho sinh viên',
    url: '#',
    excerpt: 'Kết nối với mentor chuyên môn, hướng dẫn nghề nghiệp và phát triển kỹ năng.',
    date: '2024-10-01',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=cdef',
    contentHtml: '<p>Chương trình kết nối mentor-mentee: lịch trình mentoring, mục tiêu nghề nghiệp và định hướng thực hành.</p>',
    slug: 'chuong-trinh-mentorship-sinh-vien'
  }
];

export default SAMPLE_NEWS;
