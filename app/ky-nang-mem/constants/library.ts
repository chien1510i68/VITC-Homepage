import type { LibraryItem } from '../types';

export const SAMPLE_LIBRARY: LibraryItem[] = [
  {
    id: '1',
    title: 'Giáo trình Kỹ năng giao tiếp',
    excerpt: 'Tài liệu hướng dẫn chi tiết về các kỹ năng giao tiếp hiệu quả trong công việc và cuộc sống',
    image: '/images/thu-vien/giao-tiep.jpg',
    date: '15/01/2025',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/giao-tinh-ky-nang-giao-tiep',
    fileUrl: '/files/giao-trinh-giao-tiep.pdf',
    type: 'document'
  },
  {
    id: '2',
    title: 'Slide bài giảng Làm việc nhóm',
    excerpt: 'Bộ slide chi tiết về kỹ năng làm việc nhóm hiệu quả, phân công công việc và giải quyết xung đột',
    image: '/images/thu-vien/lam-viec-nhom.jpg',
    date: '10/01/2025',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/slide-lam-viec-nhom',
    fileUrl: '/files/slide-lam-viec-nhom.pptx',
    type: 'slide'
  },
  {
    id: '3',
    title: 'Video hướng dẫn Kỹ năng thuyết trình',
    excerpt: 'Series video hướng dẫn chi tiết về cách chuẩn bị và thực hiện bài thuyết trình chuyên nghiệp',
    image: '/images/thu-vien/thuyet-trinh.jpg',
    date: '05/01/2025',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/video-thuyet-trinh',
    fileUrl: 'https://youtube.com/watch?v=example',
    type: 'video'
  },
  {
    id: '4',
    title: 'Tài liệu Quản lý thời gian',
    excerpt: 'Hướng dẫn các phương pháp quản lý thời gian hiệu quả cho sinh viên và người đi làm',
    image: '/images/thu-vien/quan-ly-thoi-gian.jpg',
    date: '28/12/2024',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/quan-ly-thoi-gian',
    fileUrl: '/files/quan-ly-thoi-gian.pdf',
    type: 'document'
  },
  {
    id: '5',
    title: 'Slide Tư duy phản biện',
    excerpt: 'Bộ slide về kỹ năng tư duy phản biện và giải quyết vấn đề một cách sáng tạo',
    image: '/images/thu-vien/tu-duy.jpg',
    date: '20/12/2024',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/slide-tu-duy',
    fileUrl: '/files/slide-tu-duy.pptx',
    type: 'slide'
  },
  {
    id: '6',
    title: 'Giáo trình Kỹ năng lãnh đạo',
    excerpt: 'Tài liệu đào tạo về kỹ năng lãnh đạo, quản lý nhóm và phát triển đội ngũ',
    image: '/images/thu-vien/lanh-dao.jpg',
    date: '15/12/2024',
    url: 'https://trungtamkynangmem.vnua.edu.vn/thu-vien/giao-trinh-lanh-dao',
    fileUrl: '/files/giao-trinh-lanh-dao.pdf',
    type: 'document'
  }
];

export const LIBRARY_TYPES = [
  { id: 'all', label: 'Tất cả', count: SAMPLE_LIBRARY.length },
  { id: 'document', label: 'Tài liệu', count: 3 },
  { id: 'slide', label: 'Slide bài giảng', count: 2 },
  { id: 'video', label: 'Video', count: 1 }
] as const;

export const LIBRARY_SORT_OPTIONS = [
  { id: 'newest', label: 'Mới nhất' },
  { id: 'oldest', label: 'Cũ nhất' },
  { id: 'title', label: 'Theo tên' }
] as const;
