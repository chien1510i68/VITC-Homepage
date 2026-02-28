"use client";

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { FileText, Users, Target, BookOpen } from 'lucide-react';

export default function GioiThieuPage() {
  const sections = [
    {
      title: 'Chức năng, nhiệm vụ',
      href: '/gioi-thieu/chuc-nang-nhiem-vu',
      icon: FileText,
      description: 'Tìm hiểu về chức năng và nhiệm vụ của Trung tâm Tin học và Kỹ năng mềm',
      color: 'bg-blue-500'
    },
    {
      title: 'Cơ cấu tổ chức',
      href: '/gioi-thieu/co-cau-to-chuc',
      icon: Users,
      description: 'Sơ đồ tổ chức và ban lãnh đạo Trung tâm',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Giới thiệu
              </h1>
              <p className="text-lg md:text-xl text-green-50 mb-8">
                Trung tâm Tin học và Kỹ năng mềm - VISC
              </p>
              <div className="w-24 h-1 bg-white/30 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Về VISC
                  </h2>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Trung tâm Tin học và Kỹ năng mềm (VISC) được thành lập trên cơ sở sáp nhập 
                  Trung tâm Tin học (VITC) và Trung tâm Đào tạo Kỹ năng mềm thuộc Học viện Nông nghiệp Việt Nam.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Đây là bước chuyển mình chiến lược nhằm tạo ra một hệ sinh thái đào tạo toàn diện, 
                  kết hợp nhuần nhuyễn giữa <strong className="text-green-600">Năng lực số (Digital Literacy)</strong> và{' '}
                  <strong className="text-blue-600">Kỹ năng thiết yếu (Soft Skills)</strong>.
                </p>

                <div className="bg-white rounded-xl p-6 border-l-4 border-green-600">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Phương châm hoạt động:
                  </p>
                  <p className="text-xl text-green-700 font-bold italic">
                    "Học viên là trọng tâm – Kỹ năng là nền tảng"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Tìm hiểu thêm về VISC
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {sections.map((section, index) => (
                  <Link
                    key={index}
                    href={section.href}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300"
                  >
                    <div className={`w-16 h-16 ${section.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                      {section.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {section.description}
                    </p>
                    
                    <div className="flex items-center text-green-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      Xem chi tiết
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Cam kết của chúng tôi
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-green-50">
                  VISC cam kết trang bị cho sinh viên và người lao động hành trang vững chắc 
                  để tự tin hội nhập, khẳng định giá trị bản thân trong kỷ nguyên số.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
