export type ThuVienItem = {
  id: string;
  title: string;
  slug?: string;
  url: string; // link to the original page or file
  image?: string;
  excerpt?: string;
  fileUrl?: string; // direct download link (PDF, DOCX)
  date?: string;
};

export const SAMPLE_THU_VIEN: ThuVienItem[] = [
  {
    id: 'tv-1',
    title: 'Hướng dẫn kỹ năng mềm cơ bản - Tài liệu PDF',
    slug: 'huong-dan-ky-nang-mem-co-ban',
    url: 'https://trungtamkynangmem.vnua.edu.vn/huong-dan-ky-nang-mem-co-ban/',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80&auto=format&fit=crop',
    excerpt: 'Tổng hợp các kỹ năng giao tiếp, thuyết trình và làm việc nhóm dành cho sinh viên.',
    fileUrl: 'https://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2024/01/guide-basic.pdf',
    date: '2024-05-10',
  },
  {
    id: 'tv-2',
    title: 'Bộ slide: Kỹ năng thuyết trình hiệu quả',
    slug: 'slide-thuyet-trinh-hieu-qua',
    url: 'https://trungtamkynangmem.vnua.edu.vn/slide-thuyet-trinh-hieu-qua/',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80&auto=format&fit=crop',
    excerpt: 'Slide và notes giúp bạn chuẩn bị bài thuyết trình tự tin.',
    fileUrl: 'https://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2024/03/presentation-slides.pdf',
    date: '2024-07-02',
  },
  {
    id: 'tv-3',
    title: 'Danh sách đầu sách tham khảo về kỹ năng mềm',
    slug: 'danh-sach-dau-sach-ky-nang-mem',
    url: 'https://trungtamkynangmem.vnua.edu.vn/danh-sach-dau-sach-ky-nang-mem/',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop',
    excerpt: 'Sách hay về leadership, time-management và growth mindset.',
    date: '2023-11-15',
  },
  {
    id: 'tv-4',
    title: 'Video hướng dẫn: Kỹ năng phỏng vấn',
    slug: 'video-ky-nang-phong-van',
    url: 'https://trungtamkynangmem.vnua.edu.vn/video-ky-nang-phong-van/',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
    excerpt: 'Bộ video ngắn hướng dẫn chuẩn bị phỏng vấn xin việc.',
    date: '2024-01-20',
  },
  {
    id: 'tv-5',
    title: 'Checklist kỹ năng làm việc nhóm',
    slug: 'checklist-lam-viec-nhom',
    url: 'https://trungtamkynangmem.vnua.edu.vn/checklist-lam-viec-nhom/',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop',
    excerpt: 'Checklist đơn giản giúp nhóm làm việc hiệu quả hơn.',
    fileUrl: 'https://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2024/02/teamwork-checklist.pdf',
    date: '2024-02-14',
  },
];

export default SAMPLE_THU_VIEN;
