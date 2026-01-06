/**
 * Site Configuration
 * Centralized configuration for site metadata and SEO
 */

export const siteConfig = {
  name: 'VISC',
  fullName: 'VISC - Trung tâm Tin học và Kỹ năng mềm VNUA',
  description: 'Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp. Cung cấp các khóa học chất lượng cao với đội ngũ giảng viên giàu kinh nghiệm, chương trình đào tạo chuẩn quốc tế.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vitc.edu.vn',
  ogImage: '/images/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/vitc.edu.vn',
    email: 'info@vitc.edu.vn',
    phone: '024-1234-5678',
  },
} as const;

export const seoConfig = {
  keywords: [
    'đào tạo tin học',
    'kỹ năng mềm',
    'tin học văn phòng',
    'chứng chỉ tin học',
    'soft skills',
    'khóa học tin học',
    'ICDL',
    'Microsoft Office',
    'lập trình',
    'tin học văn phòng',
  ],
  authors: [{ name: 'VITC Team' }],
  creator: 'VITC',
  publisher: 'VITC',
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
    card: 'summary_large_image',
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
