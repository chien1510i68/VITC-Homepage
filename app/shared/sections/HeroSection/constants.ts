import { Slide, HeroSectionProps } from './types';

/**
 * Default slides for VISC hero section
 * Use placeholder images from Unsplash as fallback
 */
export const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&auto=format&fit=crop',
    title: 'Nâng cao năng lực, mở rộng tương lai',
    description: 'VISC cung cấp các chương trình đào tạo chất lượng cao với mục tiêu giúp bạn nâng cao kỹ năng nghề nghiệp',
    highlight: {
      title: 'Chính sách ưu đãi hội viên',
      content: 'Nhận nhiều ưu đãi đặc biệt khi trở thành thành viên của VISC'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&auto=format&fit=crop',
    title: 'Đào tạo chuyên nghiệp, thực chiến',
    description: 'Học với đội ngũ giảng viên giàu kinh nghiệm, chương trình cập nhật theo xu hướng công nghệ mới nhất',
    highlight: {
      title: 'Cam kết đầu ra',
      content: 'Hỗ trợ việc làm và kết nối doanh nghiệp sau khóa học'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&auto=format&fit=crop',
    title: 'Học tập hiện đại, tiện lợi',
    description: 'Môi trường học tập chuyên nghiệp với trang thiết bị hiện đại',
    highlight: {
      title: 'Lịch học linh hoạt',
      content: 'Thời gian học phù hợp cho người đi làm'
    }
  }
];

/**
 * Default props for HeroSection
 */
export const DEFAULT_PROPS: Required<HeroSectionProps> = {
  slides: DEFAULT_SLIDES,
  height: 'h-[220px] sm:h-[300px] md:h-[400px] lg:h-[65vh]',
  autoPlayInterval: 5000,
  showNavigation: true,
  showIndicators: true,
  className: '',
  imageQuality: 90,
  transitionDuration: 1000,
};
