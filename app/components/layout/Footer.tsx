import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Youtube, Clock, GraduationCap } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';

export default function Footer() {
  const quickLinks = [
    { title: 'Trang chủ', href: '#' },
    { title: 'Giới thiệu', href: '#about' },
    { title: 'Khóa học', href: '#programs' },
    { title: 'Lịch khai giảng', href: '#schedule' },
    { title: 'Tin tức', href: '#news' },
    { title: 'Liên hệ', href: '#contact' },
  ];

  const courses = [
    { title: 'Chuẩn đầu ra Tin học VNUA', href: '#' },
    { title: 'Chứng chỉ Quốc tế ICDL', href: '#' },
    { title: 'Ứng dụng CNTT cơ bản', href: '#' },
    { title: 'Tin học văn phòng', href: '#' },
  ];

  const utilities = [
    { title: 'Tra cứu điểm thi', href: '#tra-cuu' },
    { title: 'Tra cứu chứng chỉ', href: '#tra-cuu' },
    { title: 'Đăng ký học', href: '#consultation' },
    { title: 'Hỗ trợ trực tuyến', href: '#' },
  ];

  return (
    <footer className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <Image 
                src="/images/logo.jpg"
                alt="VISC Logo"
                width={150}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp, cung cấp các khóa học chất lượng cao với đội ngũ giảng viên giàu kinh nghiệm.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 group">
                <MapPin className={`w-5 h-5 mt-0.5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0`} />
                <p className="text-sm group-hover:text-white transition-colors">
                  Trường Đại học Nông nghiệp Hà Nội, Trâu Quỳ, Gia Lâm, Hà Nội
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0`} />
                <a href="tel:0123456789" className="text-sm group-hover:text-white transition-colors">
                  0123 456 789
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0`} />
                <a href="mailto:contact@visc.edu.vn" className="text-sm group-hover:text-white transition-colors">
                  contact@visc.edu.vn
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Clock className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0`} />
                <p className="text-sm group-hover:text-white transition-colors">
                  Thứ 2 - Thứ 7: 8:00 - 17:00
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Liên kết nhanh
              <span className={`absolute bottom-0 left-0 w-12 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}></span>
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`text-sm hover:${TAILWIND_COLORS.textPrimary} hover:translate-x-1 transition-all inline-flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:${TAILWIND_COLORS.bgPrimary} transition-colors`}></span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Khóa học
              <span className={`absolute bottom-0 left-0 w-12 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}></span>
            </h4>
            <ul className="space-y-2.5">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link 
                    href={course.href}
                    className={`text-sm hover:${TAILWIND_COLORS.textPrimary} hover:translate-x-1 transition-all inline-flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:${TAILWIND_COLORS.bgPrimary} transition-colors`}></span>
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Tiện ích
              <span className={`absolute bottom-0 left-0 w-12 h-0.5 ${TAILWIND_COLORS.bgPrimary}`}></span>
            </h4>
            <ul className="space-y-2.5 mb-6">
              {utilities.map((utility, index) => (
                <li key={index}>
                  <Link 
                    href={utility.href}
                    className={`text-sm hover:${TAILWIND_COLORS.textPrimary} hover:translate-x-1 transition-all inline-flex items-center gap-2 group`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:${TAILWIND_COLORS.bgPrimary} transition-colors`}></span>
                    {utility.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-white font-semibold text-sm mb-3">Kết nối với chúng tôi</h5>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className={`w-10 h-10 border-2 border-gray-600 rounded-lg flex items-center justify-center hover:${TAILWIND_COLORS.borderPrimary} hover:${TAILWIND_COLORS.textPrimary} transition-all hover:scale-110`}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className={`w-10 h-10 border-2 border-gray-600 rounded-lg flex items-center justify-center hover:${TAILWIND_COLORS.borderPrimary} hover:${TAILWIND_COLORS.textPrimary} transition-all hover:scale-110`}
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className={`w-10 h-10 border-2 border-gray-600 rounded-lg flex items-center justify-center hover:${TAILWIND_COLORS.borderPrimary} hover:${TAILWIND_COLORS.textPrimary} transition-all hover:scale-110`}
                  aria-label="Zalo"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.5c-.405.488-1.26 1.03-2.483 1.03-1.511 0-2.647-.736-2.647-1.865 0-.736.488-1.26 1.236-1.26.713 0 1.236.488 1.236 1.236 0 .372-.186.713-.511.93.326.093.713.14 1.116.14.791 0 1.329-.302 1.609-.651.326-.419.488-.977.488-1.609 0-1.329-.837-2.18-2.18-2.18h-.14c-.744 0-1.329.279-1.748.837l-.372.511c-.279.419-.744.651-1.236.651-.791 0-1.423-.651-1.423-1.423 0-.372.14-.744.419-1.023l.884-1.023c.837-.977 2.087-1.539 3.416-1.539 2.273 0 3.881 1.609 3.881 3.881 0 1.023-.326 1.934-.93 2.623z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 <span className="text-white font-semibold">VISC</span>. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className={`hover:${TAILWIND_COLORS.textPrimary} transition-colors`}>
                Chính sách bảo mật
              </Link>
              <Link href="#" className={`hover:${TAILWIND_COLORS.textPrimary} transition-colors`}>
                Điều khoản sử dụng
              </Link>
              <Link href="#" className={`hover:${TAILWIND_COLORS.textPrimary} transition-colors`}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
