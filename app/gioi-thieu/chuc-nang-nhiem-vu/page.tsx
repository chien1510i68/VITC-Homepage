"use client";

import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Target, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Lightbulb 
} from 'lucide-react';

export default function ChucNangNhiemVuPage() {
  const nhiemVu = [
    {
      icon: GraduationCap,
      title: 'Đào tạo & Chuẩn hóa Kỹ năng CNTT',
      description: 'Tổ chức giảng dạy, ôn tập và thi cấp chứng chỉ Tin học văn phòng quốc tế (MOS, IC3, ICDL); các khóa học chuyên sâu về lập trình, thiết kế đồ họa, phân tích dữ liệu chuyên nghiệp (Excel/SPSS/R) và ứng dụng CNTT trong quản trị.',
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: 'Đào tạo Kỹ năng mềm theo chuẩn đầu ra',
      description: 'Xây dựng lộ trình và triển khai các học phần kỹ năng cốt lõi bao gồm: Kỹ năng giao tiếp, làm việc nhóm, tư duy sáng tạo, kỹ năng lãnh đạo, quản lý bản thân và kỹ năng hội nhập quốc tế.',
      color: 'bg-green-600'
    },
    {
      icon: Briefcase,
      title: 'Tư vấn & Hỗ trợ việc làm',
      description: 'Tổ chức các khóa đào tạo chuyên sâu về kỹ năng viết CV, nghệ thuật phỏng vấn; kết nối sinh viên với mạng lưới doanh nghiệp đối tác thông qua các chương trình thực tập và ngày hội việc làm.',
      color: 'bg-green-700'
    },
    {
      icon: Globe,
      title: 'Hợp tác & Liên kết quốc tế',
      description: 'Mở rộng quan hệ hợp tác với các tổ chức giáo dục, tập đoàn công nghệ (như IIG Việt Nam, ICDL Foundation...) và các đối tác quốc tế để cập nhật chương trình giảng dạy tiên tiến, tổ chức các sự kiện trải nghiệm kỹ năng quy mô lớn.',
      color: 'bg-green-500'
    },
    {
      icon: Lightbulb,
      title: 'Nghiên cứu & Ứng dụng',
      description: 'Tiên phong trong việc ứng dụng công nghệ số và phương pháp giáo dục hiện đại vào đổi mới quy trình đào tạo, góp phần nâng cao chất lượng nguồn nhân lực chất lượng cao của Học viện Nông nghiệp Việt Nam.',
      color: 'bg-green-600'
    }
  ];

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
              <span className="text-green-600 font-medium">Chức năng, nhiệm vụ</span>
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
                Chức năng & Nhiệm vụ
              </h1>
              <p className="text-lg md:text-xl text-green-50">
                Trung tâm Tin học và Kỹ năng mềm (VISC)
              </p>
            </div>
          </div>
        </section> */}

        {/* Tổng quan */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Tổng quan VISC
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-center">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Trung tâm Tin học và Kỹ năng mềm được thành lập trên cơ sở sáp nhập 
                  Trung tâm Tin học (VITC) và Trung tâm Đào tạo Kỹ năng mềm thuộc 
                  Học viện Nông nghiệp Việt Nam. Đây là bước chuyển mình chiến lược 
                  nhằm tạo ra một hệ sinh thái đào tạo toàn diện, kết hợp nhuần nhuyễn 
                  giữa <strong className="text-green-600">Năng lực số (Digital Literacy)</strong> và{' '}
                  <strong className="text-green-600">Kỹ năng thiết yếu (Soft Skills)</strong>.
                </p>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600 my-8">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Phương châm hoạt động:
                  </p>
                  <p className="text-xl text-green-700 font-bold italic mb-0">
                    "Học viên là trọng tâm – Kỹ năng là nền tảng"
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  VISC cam kết trang bị cho sinh viên và người lao động hành trang vững chắc 
                  để tự tin hội nhập, khẳng định giá trị bản thân trong kỷ nguyên số.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chức năng */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Chức năng
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                  VISC có chức năng <strong className="text-green-600">tham mưu cho Giám đốc Học viện</strong> về 
                  công tác đào tạo, bồi dưỡng và phát triển kỹ năng cho người học.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                  Trung tâm là đơn vị đầu mối thực hiện các dịch vụ đào tạo, tổ chức thi và 
                  cấp chứng chỉ chuẩn đầu ra về <strong className="text-green-600">Tin học</strong> cũng 
                  như <strong className="text-green-600">Kỹ năng mềm</strong> theo quy định của 
                  Học viện và Bộ Giáo dục & Đào tạo.
                </p>

                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <p className="text-gray-700 text-lg leading-relaxed mb-0 text-center">
                    VISC đóng vai trò là <strong className="text-green-700">cầu nối thực tiễn</strong>, 
                    giúp chuẩn hóa năng lực đội ngũ cán bộ, sinh viên đáp ứng khắt khe các tiêu chuẩn 
                    tuyển dụng của cơ quan nhà nước và các doanh nghiệp đa quốc gia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nhiệm vụ trọng tâm */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                Nhiệm vụ trọng tâm
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                VISC tập trung vào 5 nhiệm vụ chính nhằm phát triển toàn diện kỹ năng cho người học
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nhiemVu.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 group"
                  >
                    <div className={`w-14 h-14 ${item.color} m-auto rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-center leading-relaxed">
                      {item.description}
                    </p>
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
                Khám phá cơ cấu tổ chức của VISC
              </h2>
              <p className="text-lg md:text-xl text-green-50 mb-8">
                Tìm hiểu về ban lãnh đạo và sơ đồ tổ chức của Trung tâm
              </p>
              <Link
                href="/gioi-thieu/co-cau-to-chuc"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
              >
                Xem cơ cấu tổ chức
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
