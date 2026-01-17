/**
 * Site Configuration
 * Centralized configuration for site metadata, SEO, and contact information
 * All sensitive data is read from environment variables
 */

export const siteConfig = {
  // Basic Info
  name: 'VISC',
  fullName: process.env.NEXT_PUBLIC_CENTER_NAME || 'Trung tâm Tin học và Kỹ năng mềm VNUA',
  fullNameEn: process.env.NEXT_PUBLIC_CENTER_NAME_EN || 'VNUA Centre for Information Technology and Soft Skills - VISC',
  description: 'Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp thuộc Học viện Nông nghiệp Việt Nam. Cung cấp các khóa học chất lượng cao với đội ngũ giảng viên giàu kinh nghiệm, chương trình đào tạo chuẩn quốc tế và hiện đại.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  
  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_EMAIL || 'tttinhockynangmem@vnua.edu.vn',
    phoneIT: process.env.NEXT_PUBLIC_PHONE_IT || '0961.174.239',
    phoneSoftSkills: process.env.NEXT_PUBLIC_PHONE_SOFT_SKILLS || '0379.450.522',
    address: process.env.NEXT_PUBLIC_ADDRESS || 'Phòng 106, Nhà B1 - HVNNVN',
    fullAddress: process.env.NEXT_PUBLIC_ADDRESS_FULL || 'Trâu Quỳ - Gia Lâm - Hà Nội',
  },
  
  // Social Links
  links: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/visc.vnua',
    email: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'tttinhockynangmem@vnua.edu.vn'}`,
    phoneIT: `tel:${(process.env.NEXT_PUBLIC_PHONE_IT || '0961174239').replace(/\./g, '')}`,
    phoneSoftSkills: `tel:${(process.env.NEXT_PUBLIC_PHONE_SOFT_SKILLS || '0379450522').replace(/\./g, '')}`,
  },
  
  // Working Hours
  workingHours: {
    weekday: process.env.NEXT_PUBLIC_WORKING_HOURS_WEEKDAY || 'Thứ Hai - Thứ Sáu: 8:00 - 17:00',
    saturday: process.env.NEXT_PUBLIC_WORKING_HOURS_SATURDAY || 'Thứ Bảy: 8:00 - 12:00',
    note: process.env.NEXT_PUBLIC_WORKING_HOURS_NOTE || 'Nghỉ Chủ nhật và các ngày lễ, Tết theo quy định',
  },
  
  // Google Maps
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || '',
} as const;

export const seoConfig = {
  keywords: [
    // Vietnamese keywords
    'đào tạo tin học VNUA',
    'kỹ năng mềm VNUA',
    'trung tâm tin học học viện nông nghiệp',
    'tin học văn phòng',
    'chứng chỉ tin học quốc tế',
    'ICDL Việt Nam',
    'Microsoft Office',
    'chuẩn đầu ra tin học VNUA',
    'khóa học tin học',
    'khóa học kỹ năng mềm',
    'lập trình cơ bản',
    'ứng dụng CNTT',
    'VISC',
    'VITC',
    // English keywords
    'IT training Vietnam',
    'soft skills training',
    'computer courses Hanoi',
    'ICDL certification',
  ],
  authors: [
    { name: 'VISC - Trung tâm Tin học và Kỹ năng mềm VNUA' }
  ],
  creator: 'VISC',
  publisher: 'Học viện Nông nghiệp Việt Nam',
  category: 'Education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  verification: {
    google: '', // Add Google Search Console verification code here
    yandex: '',
    bing: '',
  },
} as const;

/**
 * Helper function to generate metadata for pages
 */
export function generatePageMetadata({
  title,
  description,
  image,
  path = '',
  noIndex = false,
}: {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const pageDescription = description || siteConfig.description;

  return {
    title,
    description: pageDescription,
    keywords: seoConfig.keywords,
    authors: seoConfig.authors,
    creator: seoConfig.creator,
    publisher: seoConfig.publisher,
    robots: noIndex ? { index: false, follow: false } : seoConfig.robots,
    icons: seoConfig.icons,
    openGraph: {
      ...seoConfig.openGraph,
      title,
      description: pageDescription,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...seoConfig.twitter,
      title,
      description: pageDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
