'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  category: 'news' | 'announcement';
  content: string;
  author?: string;
  tags?: string[];
}

// Mock data - replace with API calls later
const mockNewsData: NewsItem[] = [
  {
    id: 1,
    title: 'Thông báo tuyển sinh khóa học lập trình Java Spring Boot 2024',
    date: '2024-12-05',
    description: 'Trung tâm VITC thông báo tuyển sinh khóa học lập trình Java Spring Boot dành cho người mới bắt đầu và có kinh nghiệm...',
    category: 'announcement',
    author: 'VITC Admin',
    tags: ['Tuyển sinh', 'Java', 'Spring Boot'],
    content: `
      <h2>Thông tin chi tiết về khóa học</h2>
      <p>Trung tâm VITC hân hạnh thông báo <strong>tuyển sinh khóa học lập trình Java Spring Boot 2024</strong>, một trong những khóa học được yêu thích nhất tại trung tâm.</p>
      
      <h3>Đối tượng học viên</h3>
      <ul>
        <li>Sinh viên đang học ngành CNTT muốn nâng cao kỹ năng</li>
        <li>Người mới bắt đầu muốn học lập trình từ cơ bản</li>
        <li>Lập trình viên muốn chuyển sang Java Spring Boot</li>
        <li>Người đi làm muốn học thêm kỹ năng mới</li>
      </ul>

      <h3>Nội dung khóa học</h3>
      <p>Khóa học bao gồm các module sau:</p>
      <ol>
        <li><strong>Java Core</strong>: Cú pháp, OOP, Collections, Exception Handling</li>
        <li><strong>Spring Framework</strong>: IoC, DI, AOP, Spring MVC</li>
        <li><strong>Spring Boot</strong>: Auto-configuration, REST API, Security</li>
        <li><strong>Database</strong>: MySQL, JPA, Hibernate</li>
        <li><strong>Project</strong>: Xây dựng ứng dụng thực tế</li>
      </ol>

      <h3>Thời gian và học phí</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Thông tin</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Chi tiết</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Thời gian học</td>
          <td style="border: 1px solid #ddd; padding: 12px;">3 tháng (48 buổi)</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="border: 1px solid #ddd; padding: 12px;">Lịch học</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Thứ 2, 4, 6 (19:00 - 21:00)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Học phí</td>
          <td style="border: 1px solid #ddd; padding: 12px;"><strong>8.000.000 VNĐ</strong></td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="border: 1px solid #ddd; padding: 12px;">Ưu đãi</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Giảm 15% cho đăng ký trước 31/12</td>
        </tr>
      </table>

      <h3>Ưu đãi đặc biệt</h3>
      <blockquote style="border-left: 4px solid #3b82f6; padding-left: 20px; margin: 20px 0; font-style: italic; color: #4b5563;">
        Đăng ký trước 31/12/2024 để nhận ưu đãi giảm 15% học phí và tặng kèm khóa học Git/GitHub miễn phí!
      </blockquote>

      <h3>Liên hệ đăng ký</h3>
      <p>Để đăng ký khóa học hoặc tư vấn thêm thông tin, vui lòng liên hệ:</p>
      <ul>
        <li>📞 Hotline: <strong>0123.456.789</strong></li>
        <li>📧 Email: <strong>info@vitc.edu.vn</strong></li>
        <li>🏢 Địa chỉ: <strong>123 Đường ABC, Quận 1, TP.HCM</strong></li>
      </ul>

      <p style="margin-top: 30px;"><em>Chúng tôi rất mong được đồng hành cùng bạn trên con đường chinh phục lập trình Java Spring Boot!</em></p>
    `
  },
  {
    id: 2,
    title: 'Thông báo lịch nghỉ lễ Quốc khánh 2/9',
    date: '2024-12-04',
    description: 'Trung tâm VITC thông báo lịch nghỉ lễ Quốc khánh 2/9/2024. Các lớp học sẽ được bù vào thời gian...',
    category: 'announcement',
    author: 'VITC Admin',
    tags: ['Thông báo', 'Lịch học'],
    content: `
      <h2>Thông báo lịch nghỉ lễ Quốc khánh 2/9</h2>
      <p>Kính gửi quý học viên và phụ huynh,</p>
      
      <p>Trung tâm VITC xin thông báo lịch nghỉ lễ Quốc khánh 2/9/2024 như sau:</p>

      <h3>Thời gian nghỉ</h3>
      <p><strong>Từ thứ Bảy ngày 31/8/2024 đến hết Chủ nhật ngày 03/9/2024</strong></p>

      <h3>Lịch học bù</h3>
      <p>Các lớp học trong thời gian nghỉ lễ sẽ được bù theo lịch sau:</p>
      <ul>
        <li>Lớp Java Spring Boot: Bù vào thứ 7 ngày 07/9/2024</li>
        <li>Lớp ReactJS: Bù vào Chủ nhật ngày 08/9/2024</li>
        <li>Lớp Python: Bù vào thứ 7 ngày 14/9/2024</li>
      </ul>

      <p><em>Trung tâm sẽ liên hệ trực tiếp với từng lớp để xác nhận lịch học cụ thể.</em></p>

      <p>Trân trọng!</p>
    `
  },
  {
    id: 3,
    title: 'Khai giảng lớp React Native - Lập trình ứng dụng di động',
    date: '2024-12-03',
    description: 'Lớp học React Native sẽ khai giảng vào ngày 15/12/2024. Đăng ký ngay để nhận ưu đãi học phí...',
    category: 'announcement',
    author: 'VITC Admin',
    tags: ['Khai giảng', 'React Native', 'Mobile'],
    content: `
      <h2>Khai giảng lớp React Native</h2>
      <p>Trung tâm VITC thông báo khai giảng lớp <strong>React Native - Lập trình ứng dụng di động</strong></p>
      
      <h3>Thông tin khóa học</h3>
      <ul>
        <li>Thời gian khai giảng: <strong>15/12/2024</strong></li>
        <li>Thời lượng: 3 tháng</li>
        <li>Học phí: 9.000.000 VNĐ</li>
        <li>Ưu đãi: Giảm 20% cho 10 học viên đăng ký đầu tiên</li>
      </ul>

      <p>Đăng ký ngay để nhận ưu đãi!</p>
    `
  },
  {
    id: 4,
    title: 'Sinh viên VITC đạt giải nhất cuộc thi lập trình toàn quốc',
    date: '2024-12-02',
    description: 'Chúc mừng sinh viên Nguyễn Văn A đã đạt giải nhất cuộc thi lập trình toàn quốc với dự án AI ứng dụng trong y tế...',
    category: 'news',
    author: 'VITC News',
    tags: ['Thành tích', 'Sinh viên', 'Cuộc thi'],
    content: `
      <h2>Sinh viên VITC đạt giải nhất cuộc thi lập trình toàn quốc</h2>
      
      <p>Ngày 01/12/2024, tại Hà Nội, <strong>sinh viên Nguyễn Văn A</strong> - học viên khóa AI & Machine Learning của trung tâm VITC đã xuất sắc đạt <strong>giải Nhất</strong> cuộc thi Lập trình toàn quốc 2024.</p>

      <h3>Về dự án đoạt giải</h3>
      <p>Dự án mang tên <strong>"AI Doctor - Trợ lý chẩn đoán bệnh thông minh"</strong> của bạn Nguyễn Văn A đã gây ấn tượng mạnh với ban giám khảo nhờ:</p>
      <ul>
        <li>Ứng dụng công nghệ AI tiên tiến trong chẩn đoán bệnh</li>
        <li>Độ chính xác cao lên đến 95%</li>
        <li>Giao diện thân thiện, dễ sử dụng</li>
        <li>Khả năng ứng dụng thực tế cao</li>
      </ul>

      <h3>Lời chia sẻ</h3>
      <blockquote style="border-left: 4px solid #10b981; padding-left: 20px; margin: 20px 0; font-style: italic; color: #4b5563;">
        "Tôi rất vui và tự hào khi dự án của mình được công nhận. Đây là kết quả của quá trình học tập và nghiên cứu chăm chỉ tại VITC. Các thầy cô đã hỗ trợ tôi rất nhiều trong suốt quá trình phát triển dự án." - Nguyễn Văn A
      </blockquote>

      <p>Chúc mừng bạn Nguyễn Văn A và chúc các bạn học viên khác sẽ tiếp tục đạt được nhiều thành tích cao hơn nữa!</p>

      <img src="/news/achievement-1.jpg" alt="Sinh viên nhận giải" style="width: 100%; max-width: 600px; margin: 20px auto; display: block; border-radius: 8px;" />
    `
  },
  {
    id: 5,
    title: 'VITC ký kết hợp tác với các doanh nghiệp IT hàng đầu',
    date: '2024-12-01',
    description: 'Trung tâm VITC đã ký kết hợp tác với 10 doanh nghiệp IT hàng đầu tại Việt Nam nhằm tạo cơ hội việc làm cho học viên...',
    category: 'news',
    author: 'VITC News',
    tags: ['Hợp tác', 'Doanh nghiệp', 'Việc làm'],
    content: `
      <h2>VITC ký kết hợp tác với các doanh nghiệp IT hàng đầu</h2>
      
      <p>Ngày 30/11/2024, Trung tâm VITC đã chính thức ký kết hợp tác với <strong>10 doanh nghiệp IT hàng đầu</strong> tại Việt Nam, mở ra nhiều cơ hội việc làm cho học viên sau khi tốt nghiệp.</p>

      <h3>Các doanh nghiệp tham gia</h3>
      <ul>
        <li>FPT Software</li>
        <li>VNG Corporation</li>
        <li>Tiki</li>
        <li>Shopee Vietnam</li>
        <li>Grab Vietnam</li>
        <li>Và 5 doanh nghiệp khác...</li>
      </ul>

      <h3>Quyền lợi cho học viên</h3>
      <ol>
        <li>Được giới thiệu việc làm trực tiếp sau tốt nghiệp</li>
        <li>Tham gia các buổi workshop do chuyên gia từ doanh nghiệp chia sẻ</li>
        <li>Cơ hội thực tập tại các công ty lớn</li>
        <li>Được mentor 1-1 từ senior developers</li>
      </ol>

      <p>Đây là một bước tiến lớn trong việc nâng cao chất lượng đào tạo và đảm bảo đầu ra cho học viên của VITC.</p>
    `
  },
];

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const newsId = parseInt(resolvedParams.id);
  const newsItem = mockNewsData.find(item => item.id === newsId);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
            <Link href="/tin-tuc-thong-bao" className="text-blue-600 hover:text-blue-700">
              ← Quay lại trang tin tức
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const relatedNews = mockNewsData
    .filter(item => item.id !== newsId && item.category === newsItem.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
              <span>/</span>
              <Link href="/tin-tuc-thong-bao" className="hover:text-blue-600">Tin tức - Thông báo</Link>
              <span>/</span>
              <span className="text-gray-900">{newsItem.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    newsItem.category === 'announcement' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {newsItem.category === 'announcement' ? 'Thông báo' : 'Tin tức'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {newsItem.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(newsItem.date)}
                  </div>
                  {newsItem.author && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {newsItem.author}
                    </div>
                  )}
                </div>

                {/* Content from CKEditor */}
                <div 
                  className="prose prose-sm sm:prose lg:prose-lg max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-gray-700 prose-li:mb-2
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-lg prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />

                {/* Tags */}
                {newsItem.tags && newsItem.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center flex-wrap gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {newsItem.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related News */}
              {relatedNews.length > 0 && (
                <Card className="p-5 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((item) => (
                      <Link 
                        key={item.id} 
                        href={`/tin-tuc-thong-bao/${item.id}`}
                        className="block group"
                      >
                        <div className="border-l-4 border-gray-300 hover:border-blue-500 pl-3 py-2 transition-colors">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(item.date)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link 
                      href="/tin-tuc-thong-bao"
                      className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link 
              href="/tin-tuc-thong-bao"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại trang tin tức
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
