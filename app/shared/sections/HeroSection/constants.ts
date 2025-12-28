import { Slide, HeroSectionProps } from './types';

/**
 * Default slides for VISC hero section
 */
export const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://vitc.edu.vn/image_slide/30c93369-fff9-4932-9b62-f72820d7a598',
    title: 'Nâng cao năng lực, mở rộng tương lai',
    description: 'VISC cung cấp các chương trình đào tạo chất lượng cao với mục tiêu giúp bạn nâng cao kỹ năng nghề nghiệp',
    highlight: {
      title: 'Chính sách ưu đãi hội viên',
      content: 'Nhận nhiều ưu đãi đặc biệt khi trở thành thành viên của VISC'
    }
  },
  {
    id: 2,
    image: 'https://vitc.edu.vn/image_slide/17549ace-62bb-4015-a1c0-30d4b10f375e',
    title: 'Đào tạo chuyên nghiệp, thực chiến',
    description: 'Học với đội ngũ giảng viên giàu kinh nghiệm, chương trình cập nhật theo xu hướng công nghệ mới nhất',
    highlight: {
      title: 'Cam kết đầu ra',
      content: 'Hỗ trợ việc làm và kết nối doanh nghiệp sau khóa học'
    }
  },
  {
    id: 3,
    image: 'https://vitc.edu.vn/image_slide/14b0a5de-3c48-4be0-afd3-bebd91a2e180',
    title: '',
    description: '',
    highlight: {
      title: '',
      content: ''
    }
  }
];

/**
 * Default props for HeroSection
 */
export const DEFAULT_PROPS: Required<HeroSectionProps> = {
  slides: DEFAULT_SLIDES,
  height: 'h-[65vh]',
  autoPlayInterval: 5000,
  showNavigation: true,
  showIndicators: true,
  className: '',
  imageQuality: 90,
  transitionDuration: 1000,
};
