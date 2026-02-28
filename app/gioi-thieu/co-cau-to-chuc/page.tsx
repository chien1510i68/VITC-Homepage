"use client";

import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Users, User, Mail } from 'lucide-react';

export default function CoCauToChucPage() {
  // Level 1: Giám đốc
  const giamDoc = {
    name: 'TS.GVCC Ngô Trí Dương',
    position: 'Giám đốc Trung tâm',
    email: 'duongnt@vnua.edu.vn',
    image: '/images/instructors/placeholder.jpg'
  };

  // Level 2: Phó Giám đốc
  const phoGiamDoc = [
    {
      name: 'TS. Phạm Quang Dũng',
      position: 'Phó Giám đốc',
      email: 'dungpq@vnua.edu.vn',
      image: '/images/instructors/placeholder.jpg'
    },
    {
      name: 'ThS. Nguyễn Thị Thu Huyền',
      position: 'Phó Giám đốc',
      email: 'huyenntt@vnua.edu.vn',
      image: '/images/instructors/placeholder.jpg'
    }
  ];

  // Level 3: Tổ/Phòng ban
  const toPhongBan = [
    {
      name: 'Tổ Tin học',
      icon: '',
      description: 'Đào tạo và phát triển kỹ năng tin học'
    },
    {
      name: 'Tổ Kỹ năng mềm',
      icon: '',
      description: 'Đào tạo và phát triển kỹ năng mềm'
    }
  ];

  // Level 4: Chuyên viên theo tổ
  const chuyenVien = {
    tinHoc: [
      {
        name: 'CN. Nguyễn Thị Huyền Trang',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'trangnth@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      },
      {
        name: 'CN. Nguyễn Thị Tuyết Lan',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'lanntt@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      },
      {
        name: 'CN. Nguyễn Thị Hoàn',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'hoantn@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      },
      {
        name: 'CN. Nguyễn Thị Quỳnh',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'quynhnt@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      }
    ],
    kyNangMem: [
      {
        name: 'ThS. Lê Thị Quỳnh Trang',
        degree: 'ThS',
        position: 'Chuyên viên',
        email: 'trangltq@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      },
      {
        name: 'CN. Hà Thủy Tiên',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'tienht@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      },
      {
        name: 'CN. Trần Thị Nhật Minh',
        degree: 'CN',
        position: 'Chuyên viên',
        email: 'minhttn@vnua.edu.vn',
        image: '/images/instructors/placeholder.jpg'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/gioi-thieu" className="text-gray-600 hover:text-green-600 transition-colors">
                Giới thiệu
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-green-600 font-medium">Cơ cấu tổ chức</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        {/* <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </Link>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Cơ cấu tổ chức
              </h1>
              <p className="text-lg md:text-xl text-green-50">
                Sơ đồ tổ chức và ban lãnh đạo Trung tâm Tin học và Kỹ năng mềm
              </p>
            </div>
          </div>
        </section> */}

        {/* Ban lãnh đạo */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Sơ đồ tổ chức
                </h2>
              </div>

              {/* Level 1: Giám đốc */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-2xl w-full max-w-[340px] border-2 border-yellow-400">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <User className="w-16 h-16 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-center">
                      {giamDoc.name}
                    </h3>
                    <p className="text-green-100 font-semibold mb-4 text-lg">
                      {giamDoc.position}
                    </p>
                    <div className="w-full bg-white/10 rounded-xl p-4">
                      <a href={`mailto:${giamDoc.email}`} className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="text-sm">{giamDoc.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection line Level 1 -> 2 */}
              <div className="flex justify-center mb-4">
                <div className="w-0.5 h-12 bg-gray-300"></div>
              </div>

              {/* Level 2: Phó Giám đốc */}
              <div className="relative mb-8">
                {/* Horizontal line */}
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gray-300"></div>

                <div className="grid md:grid-cols-2 gap-8 pt-8">
                  {phoGiamDoc.map((pgd, index) => (
                    <div key={index} className="relative">
                      {/* Vertical line to parent */}
                      <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>

                      <div className="bg-green-500 text-white rounded-2xl p-6 shadow-xl">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                            <User className="w-12 h-12 text-green-500" />
                          </div>
                          <h3 className="text-lg font-bold mb-1 text-center">
                            {pgd.name}
                          </h3>
                          <p className="text-green-100 font-semibold mb-3">
                            {pgd.position}
                          </p>
                          <div className="w-full bg-white/20 rounded-lg p-3">
                            <a href={`mailto:${pgd.email}`} className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm">{pgd.email}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection lines Level 2 -> 3 */}
              <div className="grid md:grid-cols-2 gap-8 mb-4">
                <div className="flex justify-center">
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                </div>
              </div>

              {/* Level 3: Banner Tổ/Phòng ban */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {toPhongBan.map((to, index) => (
                  <div key={index}>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-4xl mb-2">{to.icon}</div>
                      <h3 className="text-xl font-bold text-green-800 mb-1">
                        {to.name}
                      </h3>
                      <p className="text-sm text-green-600">{to.description}</p>
                    </div>

                    {/* Connection line to Level 4 */}
                    <div className="flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                    </div>

                    {/* Level 4: Chuyên viên */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(index === 0 ? chuyenVien.tinHoc : chuyenVien.kyNangMem).map((cv, cvIndex) => (
                        <div
                          key={cvIndex}
                          className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-xl hover:border-green-400 transition-all group"
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 shadow">
                              <User className="w-10 h-10 text-gray-600" />
                            </div>
                            <span className="text-xs text-green-600 font-semibold">{cv.degree}</span>
                            <h4 className="font-bold text-gray-900 text-center mb-1 text-sm">
                              {cv.name}
                            </h4>
                            <p className="text-xs text-gray-600 mb-3">{cv.position}</p>

                            <div className="w-full bg-gray-50 rounded-lg p-3 transition-all">
                              <a
                                href={`mailto:${cv.email}`}
                                className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                                title={cv.email}
                              >
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span className="text-xs truncate group-hover:whitespace-normal group-hover:break-all group-hover:text-center">
                                  {cv.email}
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tìm hiểu thêm về VISC
              </h2>
              <p className="text-lg md:text-xl text-green-50 mb-8">
                Khám phá chức năng và nhiệm vụ của Trung tâm
              </p>
              <Link
                href="/gioi-thieu/chuc-nang-nhiem-vu"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
              >
                Xem chức năng, nhiệm vụ
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
