"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  FileText, 
  Award, 
  Calculator, 
  BookOpen, 
  FileCheck,
  ArrowLeft,
  CheckCircle,
  Clock,
  GraduationCap,
  Trophy,
  Code,
  Palette,
  Monitor,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { api, LookupResult } from '@/lib/api';

interface UtilityItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  color: string;
}

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export default function TienIchDichVuPage() {
  const [cccd, setCccd] = useState('');
  const [searchType, setSearchType] = useState<'exam' | 'certificate'>('exam');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LookupResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUtilityIndex, setCurrentUtilityIndex] = useState(0);

  const utilities: UtilityItem[] = [
    {
      id: 1,
      icon: <Search className="w-10 h-10" />,
      title: "Tra cứu thông tin",
      description: "Tra cứu điểm thi và chứng chỉ theo số CCCD/CMND. Hệ thống cập nhật liên tục và chính xác",
      link: "#tra-cuu-thong-tin",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <FileCheck className="w-10 h-10" />,
      title: "Tài liệu học tập",
      description: "Tải về tài liệu học tập, giáo trình và bài tập thực hành cho tất cả các khóa học",
      link: "#tai-lieu",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      id: 3,
      icon: <Calculator className="w-10 h-10" />,
      title: "Thi thử",
      description: "Làm bài thi thử online để đánh giá năng lực trước kỳ thi chính thức. Miễn phí cho học viên",
      link: "#thi-thu",
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  const services: ServiceItem[] = [
    {
      id: 1,
      icon: <Monitor className="w-10 h-10" />,
      title: "Phần cứng",
      description: "Dịch vụ bảo trì, sửa chữa và nâng cấp máy tính, laptop",
      features: [
        "Sửa chữa máy tính, laptop",
        "Nâng cấp phần cứng",
        "Vệ sinh máy tính",
        "Cài đặt driver"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Code className="w-10 h-10" />,
      title: "Phần mềm",
      description: "Cài đặt, bảo trì hệ điều hành và phần mềm ứng dụng",
      features: [
        "Cài đặt Windows, Office",
        "Cài đặt phần mềm chuyên dụng",
        "Diệt virus, bảo mật",
        "Sao lưu dữ liệu"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: <Palette className="w-10 h-10" />,
      title: "Thiết kế đồ họa",
      description: "Thiết kế logo, banner, poster và các sản phẩm đồ họa",
      features: [
        "Thiết kế logo, nhận diện thương hiệu",
        "Thiết kế banner, poster quảng cáo",
        "Chỉnh sửa ảnh chuyên nghiệp",
        "Thiết kế catalogue, brochure"
      ],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleSearch = async () => {
    if (!cccd.trim()) {
      setErrorMessage('Vui lòng nhập số CCCD/CMND');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsSearching(true);
    setSearchResults([]);
    setShowResults(false);
    setErrorMessage('');
    
    try {
      if (searchType === 'exam') {
        const results = await api.lookupExamResults(cccd);
        if (results && results.length > 0) {
          setSearchResults(results);
          setShowResults(true);
        } else {
          setErrorMessage('Không tìm thấy thông tin điểm thi với số CCCD/CMND này');
          setTimeout(() => setErrorMessage(''), 5000);
        }
      } else {
        const results = await api.lookupCertificate(cccd);
        if (results && results.length > 0) {
          setSearchResults(results);
          setShowResults(true);
        } else {
          setErrorMessage('Không tìm thấy thông tin chứng chỉ với số CCCD/CMND này');
          setTimeout(() => setErrorMessage(''), 5000);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsSearching(false);
    }
  };

  const clearResults = () => {
    setShowResults(false);
    setSearchResults([]);
    setCccd('');
    setErrorMessage('');
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    if (utilities.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentUtilityIndex((prev) => (prev + 1) % utilities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [utilities.length]);

  const handlePrevUtility = () => {
    setCurrentUtilityIndex((prev) => (prev - 1 + utilities.length) % utilities.length);
  };

  const handleNextUtility = () => {
    setCurrentUtilityIndex((prev) => (prev + 1) % utilities.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}></div>
            <div className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl`}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/"
              className={`inline-flex items-center gap-2 mb-8 ${TAILWIND_COLORS.textPrimary} hover:${TAILWIND_COLORS.textPrimaryDark} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại trang chủ</span>
            </Link>

            <div className="max-w-3xl">
              <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                Tiện ích & Dịch vụ
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Tiện ích và Dịch vụ VITC
              </h1>
              <p className="text-xl text-gray-300">
                Hỗ trợ toàn diện cho học viên với các tiện ích tra cứu và dịch vụ chất lượng
              </p>
            </div>
          </div>
        </section>

        {/* Quick Search Section */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Tra cứu nhanh
              </h2>
              
              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-in slide-in-from-top duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {errorMessage}
                      </p>
                    </div>
                    <button
                      onClick={() => setErrorMessage('')}
                      className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-200">
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={() => setSearchType('exam')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      searchType === 'exam'
                        ? `${TAILWIND_COLORS.bgPrimary} text-white`
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FileText className="w-5 h-5 inline-block mr-2" />
                    Tra cứu điểm thi
                  </button>
                  <button
                    onClick={() => setSearchType('certificate')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      searchType === 'certificate'
                        ? `${TAILWIND_COLORS.bgPrimary} text-white`
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Award className="w-5 h-5 inline-block mr-2" />
                    Tra cứu chứng chỉ
                  </button>
                </div>

                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Nhập số CCCD/CMND..."
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 h-12 text-lg"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} h-12 px-8 text-lg`}
                  >
                    {isSearching ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Đang tìm...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Tra cứu
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  {searchType === 'exam' 
                    ? ' Nhập số CCCD/CMND để xem kết quả điểm thi của bạn'
                    : ' Nhập số CCCD/CMND để tra cứu thông tin chứng chỉ đã cấp'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results Section */}
        {showResults && searchResults.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                {/* Results Header */}
                <div className={`${TAILWIND_COLORS.bgPrimary} px-6 py-4 flex items-center justify-between`}>
                  <h3 className="text-xl font-bold text-white">
                    {searchType === 'exam' ? 'DANH SÁCH TRA CỨU ĐIỂM THI' : 'DANH SÁCH TRA CỨU CHỨNG CHỈ'}
                  </h3>
                  <button
                    onClick={clearResults}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Results Table */}
                <div className="overflow-x-auto">
                  {searchType === 'exam' ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-50 border-b-2 border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">#</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Họ tên</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">CMND/MSV</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày sinh</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Nơi sinh</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm lý thuyết</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm thực hành</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm TB</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Kết quả</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày thi</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Kỳ thi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {searchResults.map((result, index) => (
                          <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{result.studentName}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.cccd}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.birthDate}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.birthPlace}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-900 whitespace-nowrap">{result.theoryScore}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-900 whitespace-nowrap">{result.practiceScore}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-900 whitespace-nowrap">{result.finalScore}</td>
                            <td className="px-4 py-4 text-center whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                result.result === 'Đạt' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {result.result}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.examDate}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.courseName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-50 border-b-2 border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">#</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Họ tên</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày sinh</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Nơi sinh</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Số vào sổ</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm lý thuyết</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm thực hành</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày cấp</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Loại chứng chỉ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {searchResults.map((result, index) => (
                          <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{result.studentName}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.birthDate}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.birthPlace}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.entryNumber}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-900 whitespace-nowrap">{result.theoryScore}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-900 whitespace-nowrap">{result.practiceScore}</td>
                            <td className="px-4 py-4 text-sm text-center text-gray-700 whitespace-nowrap">{result.issueDate}</td>
                            <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.certificateType}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Results Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Tìm thấy <strong className={TAILWIND_COLORS.textPrimary}>{searchResults.length}</strong> kết quả cho số CCCD/CMND: <strong>{cccd}</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Utilities Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                Tiện ích
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Các tiện ích hỗ trợ học viên
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tra cứu thông tin, tải tài liệu và sử dụng các công cụ hỗ trợ học tập
              </p>
            </div>

            {/* Carousel Container - Similar to Instructors */}
            <div className="relative mb-8">
              {/* Navigation Buttons */}
              <button
                onClick={handlePrevUtility}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNextUtility}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-green-600 text-gray-800 hover:text-white p-2 rounded-full transition-all duration-300 border border-gray-200"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Cards Container - Stacked carousel effect */}
              <div className="relative flex items-center justify-center h-[450px] md:h-[500px] overflow-hidden">
                {utilities.map((utility, relativeIndex) => {
                  // Calculate actual index based on currentUtilityIndex for 3 items
                  const actualIndex = (relativeIndex - currentUtilityIndex + utilities.length) % utilities.length;
                  const position = actualIndex - 1; // -1, 0, 1 for 3 visible cards
                  const isCenter = position === 0;
                  
                  let translateX = position * 160;
                  let scale = 1;
                  let zIndex = 1;
                  let opacity = 0.4;
                  let grayscale = true;
                  
                  if (isCenter) {
                    // Center card - fully visible
                    scale = 1;
                    zIndex = 10;
                    opacity = 1;
                    grayscale = false;
                    translateX = 0;
                  } else if (Math.abs(position) === 1) {
                    // Side cards - semi-visible
                    scale = 0.85;
                    zIndex = 5;
                    opacity = 0.5;
                    grayscale = true;
                    translateX = position * 200;
                  }

                  return (
                    <a
                      key={utility.id}
                      href={utility.link}
                      className="group flex-shrink-0 absolute transition-all duration-500 ease-out"
                      style={{
                        transform: `translateX(${translateX}px) scale(${scale})`,
                        zIndex,
                        opacity,
                      }}
                    >
                      <div className={`relative w-[280px] md:w-[340px] bg-white rounded-3xl border-2 border-gray-200 hover:border-green-500 transition-all duration-500 ${!grayscale && 'hover:translate-y-[-8px]'} cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl ${grayscale ? 'grayscale' : ''}`}>
                        {/* Image section with icon */}
                        <div className="relative h-64 overflow-hidden">
                          {/* Gradient background */}
                          <div className={`absolute inset-0 ${utility.color} opacity-90`}></div>
                          
                          {/* Decorative circles */}
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full"></div>
                          
                          {/* Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`bg-white/20 backdrop-blur-sm w-32 h-32 rounded-3xl flex items-center justify-center text-white ${!grayscale && 'group-hover:scale-110 group-hover:rotate-6'} transition-all duration-500 shadow-2xl border-2 border-white/30`}>
                              {utility.icon}
                            </div>
                          </div>

                          {/* Badge overlay */}
                          {isCenter && (
                            <div className="absolute top-6 left-6">
                              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Tiện ích nổi bật
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content section */}
                        <div className="relative p-6 bg-gradient-to-b from-white to-gray-50">
                          <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${!grayscale ? 'text-gray-900 group-hover:text-green-600' : 'text-gray-700'}`}>
                            {utility.title}
                          </h3>
                          
                          {isCenter && (
                            <>
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {utility.description}
                              </p>
                              
                              {/* CTA Button */}
                              <div className={`inline-flex items-center ${utility.color.replace('bg-gradient-to-br', 'bg-gradient-to-r')} text-white px-5 py-2.5 rounded-full font-semibold text-sm group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                                <span>Truy cập ngay</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </>
                          )}
                          
                          {!isCenter && (
                            <p className="text-gray-500 text-xs">
                              Nhấn để xem chi tiết
                            </p>
                          )}
                        </div>

                        {/* Decorative corner accent */}
                        <div className={`absolute top-0 right-0 w-20 h-20 ${utility.color} opacity-10 transform rotate-45 translate-x-10 -translate-y-10`}></div>
                        
                        {/* Bottom accent bar */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${utility.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                Dịch vụ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Dịch vụ hỗ trợ kỹ thuật
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Đội ngũ kỹ thuật viên chuyên nghiệp, tận tâm hỗ trợ mọi nhu cầu của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className="group relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:border-green-500 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`}></div>
                    </div>
                    
                    {/* Icon section with image placeholder */}
                    <div className="relative h-48 overflow-hidden">
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`}></div>
                      
                      {/* Animated circles decoration */}
                      <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full transform -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                      </div>
                      
                      {/* Icon with backdrop effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/30">
                            {service.icon}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
                      <div className="absolute bottom-20 right-12 w-1.5 h-1.5 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-24 right-16 w-1 h-1 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Content section */}
                    <div className="relative p-6">
                      {/* Title with hover effect */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      
                      {/* Features list with staggered animation */}
                      <div className="space-y-2.5 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className="flex items-start gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            style={{
                              transitionDelay: `${featureIndex * 0.1}s`
                            }}
                          >
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mt-0.5`}>
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA Button with gradient */}
                      <button className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group/btn`}>
                        <span>Liên hệ tư vấn</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom accent bar with wave animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${service.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
                    </div>
                    
                    {/* Corner badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Phổ biến
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
            
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}</style>
        </section>

        {/* CTA Section */}
        <section className={`py-16 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} text-white`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cần hỗ trợ thêm?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Đội ngũ nhân viên của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8"
              >
                Liên hệ ngay
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                Hotline: 0123.456.789
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
