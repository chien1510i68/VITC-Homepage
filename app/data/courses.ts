export interface Instructor {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  description: string;
}

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  slug: string;
  categoryCode?: string;
  thumbnailUrl?: string;
  price: number;
  duration?: number;
  level?: string;
  descriptionHtml?: string;
  subject?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  instructor?: Instructor;
  benefitsHtml?: string;
  highlights?: string[];
  syllabus?: Array<{ module: string; title: string; hours: number }>;
  requirements?: string[];
}

export interface CourseCardData {
  id: string;
  title: string;
  thumbnail: string;
  badge: {
    text: string;
    type: 'hot' | 'upcoming' | 'new';
  };
  duration: string;
  price: string;
  originalPrice?: string;
  studentCount: number;
  description: string;
  category: string;
}

// Mock data for fallback - Backend Course model structure
// Dữ liệu khóa học thực tế từ Trung tâm Tin học VNUA (https://vitc.edu.vn/)
export const mockFeaturedCourses: Course[] = [
  // ===== KHÓA HỌC CHỨNG CHỈ QUỐC TẾ =====
  {
    id: '1',
    courseCode: 'ICDL-2025',
    title: 'Chứng chỉ Quốc tế ICDL',
    slug: 'chung-chi-quoc-te-icdl',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop',
    price: 1850000,
    duration: 12.5,
    level: 'Cơ bản',
    descriptionHtml: '<p><strong>ICDL</strong> (International Computer Driving Licence) là bộ chứng chỉ kỹ năng sử dụng máy tính chuẩn quốc tế do Tổ chức ICDL Foundation cấp. Hiện nay ICDL được công nhận và phổ biến rộng rãi tại hơn 100 quốc gia, 24.000 trung tâm khảo thí (ATC), được dịch ra 41 ngôn ngữ và trên 15 triệu thí sinh dự thi trên toàn cầu.</p><p>Ngày nay có chứng chỉ Tin học là một lợi thế lớn trong công việc và cuộc sống. ICDL chính là một hệ thống đánh giá trình độ công nghệ của bạn, giúp bạn trở thành một công dân số toàn cầu.</p><h4>Chứng chỉ ICDL đối với sinh viên HVNN</h4><p>Theo thông báo số 0519/TB-TTTH của Học viện Nông nghiệp Việt Nam, ICDL chính thức trở thành chuẩn đầu ra Tin học mức cơ bản tại trường cho sinh viên từ K62. Sở hữu chứng chỉ ICDL giúp sinh viên đạt chuẩn đầu ra Tin học mức cơ bản, miễn học, miễn thi và đổi điểm 10 học phần Tin học cơ bản.</p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Chứng chỉ có giá trị vĩnh viễn',
      'Công nhận tại 100+ quốc gia',
      'Đạt chuẩn đầu ra HVNN (K62+)',
      'Miễn học, miễn thi, đổi điểm 10',
      'Hệ thống thi song ngữ Anh-Việt'
    ],
    syllabus: [
      { module: 'Mô-đun 1', title: 'Cơ bản về CNTT và Truyền thông', hours: 2.5 },
      { module: 'Mô-đun 2', title: 'Cơ bản về mạng trực tuyến', hours: 2.5 },
      { module: 'Mô-đun 3', title: 'Xử lý văn bản cơ bản (Word)', hours: 2.5 },
      { module: 'Mô-đun 4', title: 'Sử dụng bảng tính cơ bản (Excel)', hours: 2.5 },
      { module: 'Mô-đun 5', title: 'Sử dụng trình chiếu cơ bản (PowerPoint)', hours: 2.5 }
    ],
    requirements: [
      'Sinh viên từ K62 trở đi cần đạt chuẩn đầu ra',
      'Người học có nhu cầu nâng cao kỹ năng tin học',
      'Kiến thức tin học cơ bản'
    ],
    instructor: {
      id: "inst-001",
      username: "Đỗ Thị Nhâm",
      email: "dtnham@vitc.edu.vn",
      avatarUrl: "/instructors/do-thi-nham.jpg",
      description: `<p>Thạc sĩ ngành Công nghệ thông tin Đại học Bách khoa Hà Nội. Kỹ sư Tin học Đại học Nông nghiệp. Giảng viên giảng dạy các lớp ôn thi Chứng chỉ Quốc gia như Ứng dụng Công nghệ thông tin cơ bản tại Trung tâm Tin học Học viện Nông nghiệp Việt Nam.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ quốc tế ICDL có giá trị vĩnh viễn</li>
      <li>Được công nhận tại hơn 100 quốc gia</li>
      <li>Đạt chuẩn đầu ra Tin học HVNN (K62+)</li>
      <li>Miễn học, miễn thi và đổi điểm 10</li>
      <li>Học phí bao gồm lệ phí thi</li>
    </ul>`
  },
  {
    id: '2',
    courseCode: 'UDCNTT-COBAN-2025',
    title: 'Ứng dụng CNTT Cơ bản (Thông tư 03)',
    slug: 'ung-dung-cntt-co-ban',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop&crop=center',
    price: 700000,
    duration: 7,
    level: 'Cơ bản',
    descriptionHtml: '<p>Ngày 21/06/2016, Bộ Giáo dục và Đào tạo cùng với Bộ Thông tin và Truyền thông đã ban hành Thông tư liên tịch xác định rõ <strong>Chứng chỉ Ứng Dụng CNTT</strong> sẽ là chuẩn kỹ năng sử dụng CNTT mới trong hệ thống giáo dục quốc dân, thay thế cho Chứng chỉ A/B/C trước đây.</p><h4>Đối tượng</h4><ul><li>Sinh viên ra trường cần hoàn thiện các văn bằng, chứng chỉ để tốt nghiệp hay xin việc</li><li>Cán bộ, viên chức đang công tác tại các cơ quan Nhà nước hoàn thiện hồ sơ kỹ năng sử dụng CNTT theo đúng tiêu chuẩn do Nhà nước ban hành</li></ul><h4>Cấu trúc bài thi</h4><p><strong>Trắc nghiệm:</strong> Người dự thi phải làm bài thi trực tiếp trên máy tính, câu hỏi do phần mềm tạo ra từ ngân hàng câu hỏi và được chấm tự động.</p><p><strong>Thực hành:</strong> Gồm kiến thức, kỹ năng cơ bản về máy tính, Word, Excel, PowerPoint, Internet. Làm bài thi và lưu trên máy tính.</p><p><em>Điểm trắc nghiệm và điểm thực hành được chấm riêng biệt, mỗi phần thi đều phải đạt từ 5 điểm trở lên thì mới đạt chứng chỉ.</em></p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Thay thế chứng chỉ A/B/C',
      'Chuẩn Nhà nước theo TT03',
      'Thi trắc nghiệm trên máy',
      'Chấm điểm tự động',
      'Học phí bao gồm lệ phí thi'
    ],
    syllabus: [
      { module: 'Buổi 1', title: 'Kiến thức cơ bản máy tính & Word', hours: 3.5 },
      { module: 'Buổi 2', title: 'Excel, PowerPoint & Internet', hours: 3.5 }
    ],
    requirements: [
      'Sinh viên cần hoàn thiện chứng chỉ tốt nghiệp',
      'Cán bộ viên chức cơ quan Nhà nước',
      'Có kiến thức tin học cơ bản'
    ],
    instructor: {
      id: "inst-002",
      username: "tran_thi_lan",
      email: "ttlan@vitc.edu.vn",
      avatarUrl: "/instructors/tran-thi-lan.jpg",
      description: `<div style="line-height: 1.8;">
        <p style="margin-bottom: 12px;"><strong style="color: #1976d2;">Kỹ sư Công nghệ Thông tin</strong> - Đại học Quốc gia Hà Nội</p>
        <p style="margin-bottom: 12px;">Chuyên gia <strong>Ứng dụng CNTT theo Thông tư 03</strong> với kinh nghiệm lâu năm trong đào tạo và thi chứng chỉ.</p>
        <div style="background: linear-gradient(to right, #00b09b, #96c93d); color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Chuyên môn:</strong> UDCNTT Cơ bản & Nâng cao, IC3</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Tỷ lệ đậu:</strong> 98% học viên đạt chứng chỉ ngay lần đầu</p>
        </div>
        <p style="color: #666; font-style: italic;">"Học tin học không khó, quan trọng là phương pháp và sự kiên trì."</p>
      </div>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ Nhà nước theo TT03/2014/TT-BTTTT</li>
      <li>Thay thế chứng chỉ A/B/C trước đây</li>
      <li>Học phí bao gồm lệ phí thi</li>
      <li>Thi trắc nghiệm tự động, chấm nhanh</li>
      <li>Giáo trình đầy đủ miễn phí</li>
    </ul>`
  },
  {
    id: '3',
    courseCode: 'UDCNTT-NANGCAO-2025',
    title: 'Ứng dụng CNTT Nâng cao (Thông tư 03)',
    slug: 'ung-dung-cntt-nang-cao',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
    price: 1000000,
    duration: 7,
    level: 'Nâng cao',
    descriptionHtml: '<p>Chứng chỉ <strong>Ứng dụng CNTT Nâng cao</strong> theo Thông tư 03/2014/TT-BTTTT của Bộ Thông tin và Truyền thông là chuẩn kỹ năng sử dụng CNTT nâng cao trong hệ thống giáo dục quốc dân.</p><h4>Nội dung khóa học</h4><p>Bài thi gồm 2 phần:</p><p><strong>Trắc nghiệm:</strong> Kiểm tra kiến thức lý thuyết nâng cao về máy tính, Word, Excel, PowerPoint, Internet.</p><p><strong>Thực hành:</strong> Các kỹ năng nâng cao như Mail Merge, Macro, hàm Excel phức tạp, Pivot Table, VBA, Access Database.</p><p><em>Điểm trắc nghiệm và điểm thực hành được chấm riêng biệt, mỗi phần thi đều phải đạt từ 5 điểm trở lên.</em></p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    highlights: [
      'Kỹ năng CNTT nâng cao',
      'Excel VBA & Pivot Table',
      'Access Database',
      'Mail Merge & Macro',
      'Chứng chỉ Nhà nước'
    ],
    syllabus: [
      { module: 'Buổi 1', title: 'Word & Excel nâng cao', hours: 3.5 },
      { module: 'Buổi 2', title: 'PowerPoint, Access & Internet', hours: 3.5 }
    ],
    requirements: [
      'Đã có chứng chỉ UDCNTT Cơ bản hoặc tương đương',
      'Nhu cầu nâng cao kỹ năng tin học chuyên môn',
      'Thành thạo tin học văn phòng cơ bản'
    ],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    instructor: {
      id: "inst-002",
      username: "tran_thi_lan",
      email: "ttlan@vitc.edu.vn",
      avatarUrl: "/instructors/tran-thi-lan.jpg",
      description: `<div style="line-height: 1.8;">
        <p style="margin-bottom: 12px;"><strong style="color: #1976d2;">Kỹ sư Công nghệ Thông tin</strong> - Đại học Quốc gia Hà Nội</p>
        <p style="margin-bottom: 12px;">Chuyên gia <strong>Ứng dụng CNTT theo Thông tư 03</strong> với kinh nghiệm lâu năm trong đào tạo và thi chứng chỉ.</p>
        <div style="background: linear-gradient(to right, #00b09b, #96c93d); color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Chuyên môn:</strong> UDCNTT Cơ bản & Nâng cao, IC3</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Tỷ lệ đậu:</strong> 98% học viên đạt chứng chỉ ngay lần đầu</p>
        </div>
        <p style="color: #666; font-style: italic;">"Học tin học không khó, quan trọng là phương pháp và sự kiên trì."</p>
      </div>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ Nhà nước chuẩn nâng cao</li>
      <li>Học Excel VBA, Access Database</li>
      <li>Nâng cao năng suất làm việc</li>
      <li>Học phí bao gồm lệ phí thi</li>
      <li>Bài tập thực hành nâng cao</li>
    </ul>`
  },
  {
    id: '4',
    courseCode: 'LAPTRINH-WEB-2025',
    title: 'Lập trình Web cơ bản',
    slug: 'lap-trinh-web-co-ban',
    categoryCode: 'PROGRAMMING',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center',
    price: 4000000,
    duration: 90,
    level: 'Cơ bản',
    descriptionHtml: '<h3>Lập trình Web cơ bản</h3><p>Khóa học dành cho người mới bắt đầu muốn trở thành Web Developer. Học các công nghệ web hiện đại như HTML5, CSS3, JavaScript.</p><div style="background: #e3f2fd; padding: 15px; border-radius: 8px;"><h4>Nội dung khóa học:</h4><ul><li>HTML5 & Semantic HTML</li><li>CSS3, Flexbox, Grid Layout</li><li>JavaScript ES6+</li><li>Responsive Web Design</li><li>Git & GitHub</li></ul></div><p><strong>Dự án thực tế:</strong> Xây dựng website cá nhân hoàn chỉnh</p><p><em>Thời lượng: 4 tháng | 90 giờ học</em></p>',
    subject: 'Lập trình',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    instructor: {
      id: "inst-003",
      username: "le_hoang_nam",
      email: "lhnam@vitc.edu.vn",
      avatarUrl: "/instructors/le-hoang-nam.jpg",
      description: `<div style="line-height: 1.8;">
        <p style="margin-bottom: 12px;"><strong style="color: #1976d2;">Senior Web Developer</strong> - 8 năm kinh nghiệm</p>
        <p style="margin-bottom: 12px;">Chuyên gia phát triển web với kinh nghiệm làm việc tại các công ty công nghệ hàng đầu.</p>
        <div style="background: linear-gradient(to right, #FF512F, #DD2476); color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Chuyên môn:</strong> HTML/CSS, JavaScript, React, Node.js</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Dự án:</strong> Hơn 50+ website thương mại điện tử</p>
        </div>
        <p style="color: #666; font-style: italic;">"Code không chỉ là công việc, đó là nghệ thuật sáng tạo."</p>
      </div>`
    },
    benefitsHtml: `<div style="line-height: 1.6;">
      <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e;"><strong>Chứng nhận:</strong> Chứng chỉ hoàn thành từ VITC</p>
      </div>
      <div style="background: linear-gradient(to right, #f0fdf4, #dcfce7); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <p style="margin: 0; font-size: 13px; color: #14532d;"><strong>Dự án thực tế:</strong> Portfolio website cá nhân</p>
      </div>
      <div style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ca8a04;">
        <p style="margin: 0; font-size: 13px; color: #713f12;"><strong>Source code:</strong> Tất cả code trên GitHub</p>
      </div>
      <div style="background: linear-gradient(to right, #fce7f3, #fbcfe8); padding: 12px; border-radius: 8px; border-left: 3px solid #be185d;">
        <p style="margin: 0; font-size: 13px; color: #831843;"><strong>Hỗ trợ:</strong> Mentor 1-1 & cộng đồng dev</p>
      </div>
    </div>`
  },
  {
    id: '5',
    courseCode: 'KNM-GIAOTIEP-2025',
    title: 'Kỹ năng giao tiếp và thuyết trình',
    slug: 'ky-nang-giao-tiep-thuyet-trinh',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center',
    price: 1500000,
    duration: 24,
    level: 'Cơ bản',
    descriptionHtml: '<h3>Kỹ năng giao tiếp và thuyết trình</h3><p>Khóa học giúp bạn phát triển kỹ năng giao tiếp hiệu quả và tự tin thuyết trình trước đám đông.</p><div style="background: #fce4ec; padding: 15px; border-radius: 8px;"><h4>Nội dung khóa học:</h4><ul><li>Nghệ thuật giao tiếp hiệu quả</li><li>Kỹ năng lắng nghe tích cực</li><li>Thuyết trình trước đám đông</li><li>Ngôn ngữ cơ thể và giọng nói</li><li>Xử lý tình huống khó</li></ul></div><p><strong>Phương pháp:</strong> 70% thực hành, 30% lý thuyết</p><p><em>Thời lượng: 1 tháng | 24 giờ học</em></p>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    instructor: {
      id: "inst-004",
      username: "pham_thu_ha",
      email: "ptha@vitc.edu.vn",
      avatarUrl: "/instructors/pham-thu-ha.jpg",
      description: `<div style="line-height: 1.8;">
        <p style="margin-bottom: 12px;"><strong style="color: #1976d2;">Chuyên gia Đào tạo Kỹ năng mềm</strong></p>
        <p style="margin-bottom: 12px;">Master Trainer với hơn 12 năm kinh nghiệm đào tạo kỹ năng giao tiếp cho doanh nghiệp.</p>
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 0; font-size: 14px;"><strong>Chuyên môn:</strong> Giao tiếp, Thuyết trình, Leadership</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Thành tích:</strong> Đào tạo 5000+ học viên thành công</p>
        </div>
        <p style="color: #666; font-style: italic;">"Giao tiếp tốt là chìa khóa mở cửa mọi cơ hội."</p>
      </div>`
    },
    benefitsHtml: `<div style="line-height: 1.6;">
      <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e;"><strong>Chứng nhận:</strong> Chứng chỉ hoàn thành khóa học</p>
      </div>
      <div style="background: linear-gradient(to right, #f0fdf4, #dcfce7); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <p style="margin: 0; font-size: 13px; color: #14532d;"><strong>Thực hành:</strong> 70% thời lượng thực hành</p>
      </div>
      <div style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ca8a04;">
        <p style="margin: 0; font-size: 13px; color: #713f12;"><strong>Tài liệu:</strong> Sách & video bài giảng đầy đủ</p>
      </div>
      <div style="background: linear-gradient(to right, #fce7f3, #fbcfe8); padding: 12px; border-radius: 8px; border-left: 3px solid #be185d;">
        <p style="margin: 0; font-size: 13px; color: #831843;"><strong>Cộng đồng:</strong> Tham gia nhóm thực hành</p>
      </div>
    </div>`
  },
  {
    id: '6',
    courseCode: 'TIN-HOC-VAN-PHONG-MOS-2025',
    title: 'Tin Học Văn Phòng MOS',
    slug: 'tin-hoc-van-phong-mos',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    price: 1200000,
    duration: 40,
    level: 'Cơ bản',
    descriptionHtml: '<p>Trong thời đại công nghệ 4.0, tin học văn phòng ngày càng quan trọng, góp phần giúp người dùng làm việc và học tập hiệu quả.</p><p><strong>Đối với sinh viên:</strong> Tin học văn phòng được sử dụng liên tục trong quá trình học tập. Đây là công cụ hữu dụng để hỗ trợ sinh viên thuyết trình hay làm bài tập lớn, báo cáo thực tập, tiểu luận và khóa luận tốt nghiệp. Khi thực hiện một bài thuyết trình, nếu sở hữu một slide đẹp, đúng quy cách, bạn có thể tạo ấn tượng với giáo viên và bạn bè.</p><p><strong>Đối với người đi làm:</strong> Tin học văn phòng là kỹ năng cần thiết, đặc biệt là trong quá trình các công ty hội nhập toàn cầu và phát triển. Hầu hết doanh nghiệp hiện nay đều yêu cầu nhân viên thành thạo kỹ năng này. Khi thành thạo tin học văn phòng, bạn sẽ tối ưu được quá trình làm việc, hoàn thành trôi chảy các công việc, từ hoạt động giao dịch giấy tờ, văn bản, kế toán - kiểm toán đến quản lý hành chính - nhân sự, báo cáo thường kỳ, thuyết trình dự án.</p><h4>Chương trình MOS (chuẩn Quốc gia)</h4><p>Trung tâm tin học Học viện Nông nghiệp Việt Nam đã đưa Tin học văn phòng MOS (chuẩn Quốc gia) vào chương trình giảng dạy nhằm giúp học viên có nhu cầu trau dồi và phát triển kỹ năng sử dụng tin học trong học tập và công việc.</p><h4>Nội dung khóa học</h4><ul><li><strong>MS Word:</strong> 6 buổi (2.5 giờ/buổi) - Soạn thảo văn bản chuyên nghiệp</li><li><strong>MS Excel:</strong> 8 buổi (2.5 giờ/buổi) - Xử lý số liệu và phân tích dữ liệu</li><li><strong>MS PowerPoint:</strong> 2 buổi (2.5 giờ/buổi) - Thiết kế trình chiếu ấn tượng</li></ul><p><strong>Học phí:</strong> 1.200.000 VNĐ | <strong>Lệ phí thi MOS:</strong> 300.000 VNĐ</p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Chứng chỉ MOS chuẩn quốc gia',
      'Thành thạo Word, Excel, PowerPoint',
      'Nâng cao năng suất công việc',
      'Giảng viên giàu kinh nghiệm',
      'Thi lấy chứng chỉ MOS'
    ],
    syllabus: [
      { module: 'MS Word', title: 'Soạn thảo văn bản chuyên nghiệp', hours: 15 },
      { module: 'MS Excel', title: 'Xử lý số liệu và phân tích dữ liệu', hours: 20 },
      { module: 'MS PowerPoint', title: 'Thiết kế trình chiếu ấn tượng', hours: 5 }
    ],
    requirements: [
      'Có kiến thức tin học cơ bản',
      'Cần nâng cao kỹ năng văn phòng',
      'Muốn thi chứng chỉ MOS'
    ],
    instructor: {
      id: "inst-005",
      username: "Vũ Thị Lưu",
      email: "vtluu@vitc.edu.vn",
      avatarUrl: "/instructors/vu-thi-luu.jpg",
      description: `<p>Thạc sĩ Công nghệ thông tin Đại học Bách khoa Hà Nội. Kỹ sư Tin học Đại học Nông nghiệp Hà Nội. Giảng viên giảng dạy các chứng chỉ Tin học văn phòng MOS tại Trung tâm Tin học Học viện Nông nghiệp Việt Nam.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ MOS chuẩn quốc gia</li>
      <li>Nâng cao năng suất làm việc</li>
      <li>Tài liệu học tập đầy đủ</li>
      <li>Lệ phí thi riêng biệt</li>
      <li>Hỗ trợ thi lại nếu cần</li>
    </ul>`
  },
  {
    id: '7',
    courseCode: 'IC3-2025',
    title: 'Chứng chỉ IC3 Quốc Tế',
    slug: 'chung-chi-ic3-quoc-te',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    price: 1200000,
    duration: 30,
    level: 'Cơ bản',
    descriptionHtml: '<h4>IC3 là gì?</h4><p><strong>IC3</strong> (The Internet and Computing Core Certification) là bài thi quốc tế đánh giá về kiến thức và khả năng sử dụng máy tính, phần mềm và Internet do Tổ chức Khảo thí Tin học hàng đầu Thế giới Certiport (Hoa Kỳ) cung cấp. Bài thi IC3 phản ánh đầy đủ kỹ năng nền tảng cần thiết giúp thành công trong hầu hết các lĩnh vực học tập, nghề nghiệp và xã hội đòi hỏi về kỹ năng sử dụng máy tính và các ứng dụng Internet.</p><p>Hiện nay, bài thi IC3 được phổ biến rộng rãi tại <strong>150 quốc gia và vùng lãnh thổ</strong> trên thế giới, với trung bình <strong>2 triệu lượt người thi mỗi năm</strong> được tổ chức thông qua hơn 12.000 trung tâm được ủy quyền chính thức của Certiport. Chứng chỉ IC3 có <strong>giá trị vô thời hạn</strong> và được công nhận toàn cầu.</p><p><strong>Tại Việt Nam:</strong> Chứng chỉ IC3 đã được Bộ Thông tin và Truyền thông công nhận <strong>tương đương chuẩn kỹ năng CNTT cơ bản</strong> quy định trong thông tư 03/BTTTT-CNTT.</p><h4>Lợi ích cho sinh viên HVNN</h4><ul><li>Chứng thực kỹ năng tin học của bản thân bằng Chứng chỉ quốc tế</li><li>Trang bị công cụ hỗ trợ hiệu quả trong quá trình học tập</li><li>Làm chủ những kỹ năng cần thiết để thực hiện những ứng dụng cơ bản và phát triển tốt hơn trong thời đại công nghệ số</li><li><strong>Sinh viên HVNN được quy đổi điểm 10 cho 3 môn Tin chuẩn đầu ra mức cơ bản</strong></li></ul><h4>Cấu trúc IC3 GS6</h4><p>Nội dung IC3 GS6 được chia thành 3 cấp độ:</p><ul><li><strong>LEVEL 1:</strong> Các khái niệm cơ bản và các thành phần thiết yếu</li><li><strong>LEVEL 2:</strong> Kiến thức thực hành về các kỹ năng cốt lõi</li><li><strong>LEVEL 3:</strong> Hiểu biết nâng cao về năng lực kỹ thuật số</li></ul><p>Trong mỗi cấp độ gồm 7 chuyên đề: Công nghệ thông tin cơ bản, Công dân kỷ nguyên số, Quản lý thông tin, Sáng tạo nội dung, Giao tiếp/Truyền thông, Cộng tác, An toàn bảo mật.</p><h4>Thông tin khóa học</h4><p><strong>Số buổi:</strong> 12 buổi (2.5 giờ/buổi) | <strong>Học phí:</strong> 1.200.000 VNĐ</p><p><strong>Lệ phí thi:</strong> 700.000 VNĐ/module | <strong>Điểm đạt:</strong> 70% tổng số điểm</p><p><strong>Thời hạn chứng chỉ:</strong> Vĩnh viễn, công nhận toàn cầu</p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Chứng chỉ quốc tế Certiport',
      'Công nhận tại 150 quốc gia',
      'Giá trị vô thời hạn',
      'Quy đổi điểm 10 tại HVNN',
      'Tương đương TT03 BTTTT'
    ],
    syllabus: [
      { module: 'Level 1', title: 'Khái niệm cơ bản và thành phần thiết yếu', hours: 10 },
      { module: 'Level 2', title: 'Kỹ năng thực hành cốt lõi', hours: 10 },
      { module: 'Level 3', title: 'Năng lực kỹ thuật số nâng cao', hours: 10 }
    ],
    requirements: [
      'Kiến thức tin học cơ bản',
      'Sinh viên HVNN từ K62+',
      'Muốn có chứng chỉ quốc tế'
    ],
    instructor: {
      id: "inst-002",
      username: "tran_thi_lan",
      email: "ttlan@vitc.edu.vn",
      avatarUrl: "/instructors/tran-thi-lan.jpg",
      description: `<p>Kỹ sư Công nghệ Thông tin - Đại học Quốc gia Hà Nội. Chuyên gia Ứng dụng CNTT, IC3 với kinh nghiệm lâu năm trong đào tạo và thi chứng chỉ quốc tế.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ IC3 quốc tế vô thời hạn</li>
      <li>Công nhận tại 150 quốc gia</li>
      <li>Quy đổi điểm 10 HVNN (K62+)</li>
      <li>Học phí: 1.200.000đ</li>
      <li>Lệ phí thi: 700.000đ/module</li>
    </ul>`
  },
  {
    id: '8',
    courseCode: 'LUYEN-THI-DAU-RA-2025',
    title: 'Luyện Thi Đầu Ra CNTT VNUA',
    slug: 'luyen-thi-dau-ra-cntt-vnua',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
    price: 500000,
    duration: 10,
    level: 'Cơ bản',
    descriptionHtml: '<p>Với mục tiêu đẩy mạnh chất lượng đào tạo và nâng cao kỹ năng Tin học cho sinh viên để đáp ứng nhu cầu tuyển dụng của các doanh nghiệp, Chuẩn đầu ra Tin học đã và đang được các Trường đại học chú trọng và áp dụng rộng rãi.</p><p>Ban Giám đốc Học viện Nông nghiệp Việt Nam đã quyết định áp dụng Chuẩn đầu ra Tin học cho các bạn sinh viên từ K62.</p><h4>Lớp ôn Ứng dụng CNTT mức cơ bản</h4><ul><li>Số buổi: 04 buổi (2.5 giờ/buổi)</li><li>Học phí: 500.000 VNĐ</li><li>Lệ phí thi: 200.000 VNĐ</li></ul><h4>Lớp ôn Ứng dụng CNTT mức chuyên ngành</h4><ul><li>Số buổi: 10 buổi (2.5 giờ/buổi)</li><li>Học phí: 800.000 VNĐ</li><li>Lệ phí thi: 200.000 VNĐ</li></ul>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Chuẩn đầu ra HVNN từ K62',
      'Ôn thi cơ bản & chuyên ngành',
      'Giảng viên giàu kinh nghiệm',
      'Học phí ưu đãi',
      'Đảm bảo đạt chuẩn đầu ra'
    ],
    syllabus: [
      { module: 'Buổi 1-2', title: 'Kiến thức cơ bản máy tính', hours: 5 },
      { module: 'Buổi 3-4', title: 'Word & Excel cơ bản', hours: 5 }
    ],
    requirements: [
      'Sinh viên HVNN từ K62+',
      'Cần đạt chuẩn đầu ra Tin học',
      'Kiến thức tin học cơ bản'
    ],
    instructor: {
      id: "inst-001",
      username: "Đỗ Thị Nhâm",
      email: "dtnham@vitc.edu.vn",
      avatarUrl: "/instructors/do-thi-nham.jpg",
      description: `<p>Thạc sĩ ngành Công nghệ thông tin Đại học Bách khoa Hà Nội. Giảng viên giảng dạy các lớp ôn thi Chuẩn đầu ra Tin học tại HVNN.</p>`
    },
    benefitsHtml: `<ul>
      <li>Đạt chuẩn đầu ra Tin học HVNN</li>
      <li>Học phí ưu đãi cho sinh viên</li>
      <li>Ôn tập có trọng tâm</li>
      <li>Tài liệu ôn thi đầy đủ</li>
      <li>Lệ phí thi riêng: 200.000đ</li>
    </ul>`
  },
  {
    id: '9',
    courseCode: 'SEO-DIGITAL-MARKETING-2025',
    title: 'SEO Digital & Marketing',
    slug: 'seo-digital-marketing',
    categoryCode: 'MARKETING',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    price: 3500000,
    duration: 60,
    level: 'Trung cấp',
    descriptionHtml: '<p>Khóa học SEO & Digital Marketing giúp bạn nắm vững các chiến lược Marketing Online hiện đại, từ SEO, Google Ads, Facebook Ads đến Content Marketing và Email Marketing.</p><h4>Nội dung khóa học</h4><ul><li>SEO On-page & Off-page</li><li>Google Ads & Google Analytics</li><li>Facebook Ads & Social Media Marketing</li><li>Content Marketing & Email Marketing</li><li>Marketing Automation</li></ul><p>Khóa học phù hợp với người muốn trở thành Digital Marketer chuyên nghiệp hoặc kinh doanh online hiệu quả.</p>',
    subject: 'Marketing',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'SEO & Google Ads chuyên sâu',
      'Facebook Ads thực chiến',
      'Content Marketing hiệu quả',
      'Dự án thực tế',
      'Chứng chỉ hoàn thành'
    ],
    syllabus: [
      { module: 'Module 1', title: 'SEO On-page & Off-page', hours: 20 },
      { module: 'Module 2', title: 'Google Ads & Analytics', hours: 15 },
      { module: 'Module 3', title: 'Facebook & Social Media Ads', hours: 15 },
      { module: 'Module 4', title: 'Content & Email Marketing', hours: 10 }
    ],
    requirements: [
      'Kiến thức Marketing cơ bản',
      'Biết sử dụng máy tính thành thạo',
      'Đam mê Marketing Online'
    ],
    instructor: {
      id: "inst-006",
      username: "Nguyễn Văn Toàn",
      email: "nvtoan@vitc.edu.vn",
      avatarUrl: "/instructors/nguyen-van-toan.jpg",
      description: `<p>Digital Marketing Expert với 10+ năm kinh nghiệm. Chuyên gia SEO, Google Ads, Facebook Ads đã triển khai thành công hàng trăm chiến dịch Marketing cho doanh nghiệp.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ Digital Marketing</li>
      <li>Dự án thực tế từ doanh nghiệp</li>
      <li>Hỗ trợ tìm việc sau khóa học</li>
      <li>Tài liệu & tools chuyên nghiệp</li>
      <li>Cộng đồng Marketer</li>
    </ul>`
  },
  {
    id: '10',
    courseCode: 'EXCEL-SPSS-R-2025',
    title: 'Phân Tích Excel/SPSS/R',
    slug: 'phan-tich-excel-spss-r',
    categoryCode: 'DATA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    price: 2500000,
    duration: 50,
    level: 'Nâng cao',
    descriptionHtml: '<p>Khóa học Phân tích dữ liệu với Excel, SPSS và R giúp bạn thành thạo các công cụ phân tích dữ liệu phổ biến nhất hiện nay. Đây là kỹ năng cần thiết cho nghiên cứu sinh, giảng viên và nhân viên phân tích dữ liệu.</p><h4>Nội dung khóa học</h4><ul><li>Excel: Pivot Table, Power Query, Power Pivot</li><li>SPSS: Thống kê mô tả, kiểm định giả thuyết, hồi quy</li><li>R Programming: Xử lý dữ liệu, trực quan hóa, machine learning cơ bản</li></ul>',
    subject: 'Phân tích dữ liệu',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Excel nâng cao: Power BI',
      'SPSS: Thống kê chuyên sâu',
      'R Programming cơ bản',
      'Phân tích dữ liệu thực tế',
      'Chứng chỉ hoàn thành'
    ],
    syllabus: [
      { module: 'Excel', title: 'Pivot Table, Power Query, Power Pivot', hours: 15 },
      { module: 'SPSS', title: 'Thống kê mô tả & kiểm định', hours: 20 },
      { module: 'R', title: 'R Programming & Visualization', hours: 15 }
    ],
    requirements: [
      'Biết Excel cơ bản',
      'Kiến thức thống kê cơ bản',
      'Nhu cầu phân tích dữ liệu'
    ],
    instructor: {
      id: "inst-007",
      username: "Phạm Minh Tuấn",
      email: "pmtuan@vitc.edu.vn",
      avatarUrl: "/instructors/pham-minh-tuan.jpg",
      description: `<p>Tiến sĩ Thống kê, chuyên gia phân tích dữ liệu với hơn 15 năm kinh nghiệm giảng dạy và nghiên cứu. Thành thạo Excel, SPSS, R, Python.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ Phân tích dữ liệu</li>
      <li>Thành thạo 3 công cụ phổ biến</li>
      <li>Dữ liệu mẫu thực tế</li>
      <li>Tài liệu & script đầy đủ</li>
      <li>Hỗ trợ nghiên cứu khoa học</li>
    </ul>`
  },
  {
    id: '11',
    courseCode: 'EXCEL-KE-TOAN-2025',
    title: 'UD Excel Trong Kế Toán',
    slug: 'excel-trong-ke-toan',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    price: 1800000,
    duration: 30,
    level: 'Trung cấp',
    descriptionHtml: '<p>Khóa học Excel trong Kế toán giúp kế toán viên nâng cao năng suất làm việc, tự động hóa các báo cáo kế toán, quản lý tài chính hiệu quả.</p><h4>Nội dung khóa học</h4><ul><li>Hàm kế toán nâng cao</li><li>Pivot Table cho báo cáo tài chính</li><li>VBA tự động hóa báo cáo</li><li>Quản lý công nợ, tồn kho</li><li>Lập báo cáo tài chính</li></ul>',
    subject: 'Kế toán',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Excel chuyên ngành kế toán',
      'Tự động hóa báo cáo',
      'Hàm kế toán nâng cao',
      'VBA cho kế toán',
      'Mẫu báo cáo có sẵn'
    ],
    syllabus: [
      { module: 'Module 1', title: 'Hàm kế toán & Pivot Table', hours: 10 },
      { module: 'Module 2', title: 'VBA tự động hóa', hours: 10 },
      { module: 'Module 3', title: 'Báo cáo tài chính', hours: 10 }
    ],
    requirements: [
      'Kiến thức kế toán cơ bản',
      'Biết Excel cơ bản',
      'Đang làm kế toán'
    ],
    instructor: {
      id: "inst-008",
      username: "Lê Thị Hương",
      email: "lthuong@vitc.edu.vn",
      avatarUrl: "/instructors/le-thi-huong.jpg",
      description: `<p>Cử nhân Kế toán, chuyên gia Excel trong Kế toán với 12 năm kinh nghiệm. Đã đào tạo hàng ngàn kế toán viên sử dụng Excel hiệu quả.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ hoàn thành khóa học</li>
      <li>Mẫu báo cáo kế toán Excel</li>
      <li>VBA scripts tự động hóa</li>
      <li>Tài liệu hướng dẫn chi tiết</li>
      <li>Hỗ trợ sau khóa học</li>
    </ul>`
  },
  {
    id: '12',
    courseCode: 'ARCGIS-WEBGIS-2025',
    title: 'ArcGIS - WebGIS',
    slug: 'arcgis-webgis',
    categoryCode: 'GIS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop',
    price: 3000000,
    duration: 45,
    level: 'Trung cấp',
    descriptionHtml: '<p>Khóa học ArcGIS & WebGIS giúp bạn thành thạo công cụ GIS hàng đầu thế giới, ứng dụng trong quy hoạch, quản lý tài nguyên, môi trường.</p><h4>Nội dung khóa học</h4><ul><li>ArcGIS Desktop: Xử lý dữ liệu không gian</li><li>ArcGIS Pro: Phân tích không gian nâng cao</li><li>WebGIS: Xây dựng ứng dụng bản đồ web</li><li>Python for GIS: Tự động hóa</li></ul>',
    subject: 'GIS',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'ArcGIS Desktop & Pro',
      'WebGIS Development',
      'Python for GIS',
      'Dự án thực tế',
      'Chứng chỉ Esri'
    ],
    syllabus: [
      { module: 'Module 1', title: 'ArcGIS Desktop cơ bản', hours: 15 },
      { module: 'Module 2', title: 'ArcGIS Pro nâng cao', hours: 15 },
      { module: 'Module 3', title: 'WebGIS & Python', hours: 15 }
    ],
    requirements: [
      'Kiến thức GIS cơ bản',
      'Biết sử dụng máy tính',
      'Quan tâm đến bản đồ số'
    ],
    instructor: {
      id: "inst-009",
      username: "Trần Văn Hùng",
      email: "tvhung@vitc.edu.vn",
      avatarUrl: "/instructors/tran-van-hung.jpg",
      description: `<p>Thạc sĩ GIS, chuyên gia ArcGIS với 10 năm kinh nghiệm. Esri Certified Professional trong ArcGIS Desktop và ArcGIS Pro.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ ArcGIS</li>
      <li>Dự án GIS thực tế</li>
      <li>Dữ liệu GIS mẫu</li>
      <li>Python scripts GIS</li>
      <li>Hỗ trợ cài đặt phần mềm</li>
    </ul>`
  },
  {
    id: '13',
    courseCode: 'MICROSTATION-2025',
    title: 'MicroStation',
    slug: 'microstation',
    categoryCode: 'CAD',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    price: 2800000,
    duration: 40,
    level: 'Trung cấp',
    descriptionHtml: '<p>MicroStation là phần mềm CAD chuyên nghiệp được sử dụng rộng rãi trong thiết kế hạ tầng, xây dựng, giao thông. Khóa học giúp bạn thành thạo MicroStation cho công việc thiết kế kỹ thuật.</p><h4>Nội dung khóa học</h4><ul><li>Vẽ 2D cơ bản và nâng cao</li><li>Thiết kế 3D</li><li>Quản lý dữ liệu thiết kế</li><li>In ấn và xuất bản</li></ul>',
    subject: 'CAD',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'MicroStation 2D & 3D',
      'Thiết kế hạ tầng',
      'Dự án thực tế',
      'Quản lý dữ liệu CAD',
      'Chứng chỉ Bentley'
    ],
    syllabus: [
      { module: 'Module 1', title: 'MicroStation 2D cơ bản', hours: 15 },
      { module: 'Module 2', title: 'MicroStation 3D', hours: 15 },
      { module: 'Module 3', title: 'Quản lý & Xuất bản', hours: 10 }
    ],
    requirements: [
      'Kiến thức CAD cơ bản',
      'Kỹ năng vẽ kỹ thuật',
      'Làm trong ngành xây dựng/hạ tầng'
    ],
    instructor: {
      id: "inst-010",
      username: "Nguyễn Đức Anh",
      email: "ndanh@vitc.edu.vn",
      avatarUrl: "/instructors/nguyen-duc-anh.jpg",
      description: `<p>Kỹ sư Xây dựng, chuyên gia MicroStation với 8 năm kinh nghiệm thiết kế hạ tầng. Bentley Certified Professional.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ MicroStation</li>
      <li>Dự án thiết kế thực tế</li>
      <li>Template & thư viện CAD</li>
      <li>Tài liệu hướng dẫn</li>
      <li>Hỗ trợ cài đặt phần mềm</li>
    </ul>`
  },
  {
    id: '14',
    courseCode: 'LUYEN-THI-MOS-2025',
    title: 'Luyện Thi MOS Quốc Tế',
    slug: 'luyen-thi-mos-quoc-te',
    categoryCode: 'OFFICE',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    price: 1500000,
    duration: 35,
    level: 'Trung cấp',
    descriptionHtml: '<h4>MOS là gì?</h4><p><strong>MOS</strong> (Microsoft Office Specialist) là bài thi về kỹ năng Tin học Văn phòng được triển khai bởi Tập đoàn khảo thí Tin học hàng đầu thế giới – Certiport (Hoa Kỳ) và đang được áp dụng trên 150 quốc gia và vùng lãnh thổ trên thế giới. Bài thi MOS được thực hiện trực tuyến trên 27 ngôn ngữ và đã được Việt hóa, với trung bình 280.000 bài thi mỗi tháng được tổ chức thông qua hơn 12.000 trung tâm được ủy quyền chính thức của Certiport.</p><p>Chứng chỉ MOS do chính <strong>Tổng Giám đốc Microsoft ký tên</strong> và có giá trị vô thời hạn trên toàn cầu. Tại Việt Nam, Chứng chỉ MOS đã được Bộ Thông tin và Truyền thông công nhận tương đương <strong>chuẩn kỹ năng CNTT nâng cao</strong> quy định trong thông tư 03/BTTTT-CNTT.</p><h4>Cấp độ của chứng chỉ MOS</h4><ul><li><strong>Cấp độ Specialist:</strong> Chứng nhận các kỹ năng cơ bản trong Microsoft Office: Word, Excel, PowerPoint, Access, Outlook</li><li><strong>Cấp độ Expert:</strong> Chứng nhận các kỹ năng nâng cao trong Word Expert và Excel Expert</li><li><strong>Cấp độ Master:</strong> Chứng nhận kỹ năng toàn diện, chuyên sâu nhất về Microsoft Office; yêu cầu 4 bài thi: Word Expert, Excel Expert, PowerPoint và 1 trong 2 bài thi Outlook hoặc Access</li></ul><h4>Lợi ích cho sinh viên HVNN</h4><ul><li>MOS chứng nhận rõ ràng nhất về kỹ năng thành thạo tin học văn phòng</li><li>Trang bị những kỹ năng tin học văn phòng cần thiết trong quá trình học tập</li><li>Nổi bật hồ sơ xin việc tương lai với chứng chỉ duy nhất về Tin học Văn phòng do Microsoft thế giới công nhận</li><li><strong>Sinh viên HVNN được quy đổi điểm 10 cho 2 môn Tin cơ bản</strong></li></ul><h4>Thông tin khóa học</h4><p><strong>Số buổi:</strong> 2 buổi (2.5 giờ/buổi) / module</p><p><strong>Học phí:</strong> 400.000 VNĐ/module | <strong>Lệ phí thi:</strong> 842.000 VNĐ/module</p><p><strong>Điểm đạt:</strong> 70% tổng số điểm | <strong>Thời hạn chứng chỉ:</strong> Vô thời hạn, công nhận toàn cầu</p>',
    subject: 'Tin học văn phòng',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-27T00:00:00Z',
    highlights: [
      'Chứng chỉ MOS quốc tế',
      'Ôn thi có trọng tâm',
      'Đề thi thử MOS',
      'Giảng viên chứng chỉ MOS',
      'Tỷ lệ đậu cao'
    ],
    syllabus: [
      { module: 'Word', title: 'Ôn thi MOS Word', hours: 12 },
      { module: 'Excel', title: 'Ôn thi MOS Excel', hours: 15 },
      { module: 'PowerPoint', title: 'Ôn thi MOS PowerPoint', hours: 8 }
    ],
    requirements: [
      'Biết Word, Excel, PowerPoint',
      'Muốn thi chứng chỉ MOS',
      'Cần chứng chỉ quốc tế'
    ],
    instructor: {
      id: "inst-005",
      username: "Vũ Thị Lưu",
      email: "vtluu@vitc.edu.vn",
      avatarUrl: "/instructors/vu-thi-luu.jpg",
      description: `<p>Thạc sĩ Công nghệ thông tin, MOS Master Instructor. Đã đào tạo hàng ngàn học viên đạt chứng chỉ MOS.</p>`
    },
    benefitsHtml: `<ul>
      <li>Chứng chỉ MOS quốc tế</li>
      <li>Đề thi thử MOS đầy đủ</li>
      <li>Tài liệu ôn thi chuẩn</li>
      <li>Hỗ trợ đăng ký thi</li>
      <li>Lệ phí thi riêng: 300.000đ</li>
    </ul>`
  },
  // ===== KHÓA HỌC KỸ NĂNG MỀM (SOFT SKILLS) =====
  {
    id: '101',
    courseCode: 'KNM-GIAOTIEP-2025',
    title: 'Kỹ năng giao tiếp',
    slug: 'ky-nang-giao-tiep',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng giao tiếp là môn học bắt buộc cho sinh viên HVNN từ khóa 61. Khóa học trang bị cho học viên các kỹ năng giao tiếp hiệu quả trong học tập và công việc.</p><h4>Nội dung khóa học</h4><ul><li>Các nguyên tắc giao tiếp hiệu quả</li><li>Giao tiếp bằng lời và phi ngôn từ</li><li>Kỹ năng lắng nghe tích cực</li><li>Xử lý xung đột và phản hồi</li><li>Giao tiếp trong môi trường đa văn hóa</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-01",
      username: "Nguyễn Văn A",
      email: "nva@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-01.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia đào tạo kỹ năng giao tiếp với 10 năm kinh nghiệm.</p>`
    },
    benefitsHtml: `<ul><li>Môn học bắt buộc sinh viên K61+</li><li>Chứng nhận hoàn thành khóa học</li><li>Tài liệu học tập đầy đủ</li><li>Thực hành nhóm</li></ul>`
  },
  {
    id: '102',
    courseCode: 'KNM-NHOM-2025',
    title: 'Kỹ năng làm việc nhóm',
    slug: 'ky-nang-lam-viec-nhom',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng làm việc nhóm giúp sinh viên phát triển khả năng hợp tác, phối hợp làm việc hiệu quả trong team.</p><h4>Nội dung khóa học</h4><ul><li>Xây dựng và phát triển nhóm</li><li>Vai trò và trách nhiệm trong nhóm</li><li>Kỹ năng lãnh đạo nhóm</li><li>Giải quyết mâu thuẫn trong nhóm</li><li>Đánh giá hiệu quả làm việc nhóm</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-02",
      username: "Trần Thị B",
      email: "ttb@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-02.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên về đào tạo teamwork và leadership.</p>`
    },
    benefitsHtml: `<ul><li>Môn học bắt buộc sinh viên K61+</li><li>Học qua dự án nhóm thực tế</li><li>Phát triển kỹ năng leadership</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '103',
    courseCode: 'KNM-BANTHAN-2025',
    title: 'Kỹ năng quản lý bản thân',
    slug: 'ky-nang-quan-ly-ban-than',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng quản lý bản thân giúp sinh viên tự chủ, tự quản lý thời gian, công việc và phát triển bản thân hiệu quả.</p><h4>Nội dung khóa học</h4><ul><li>Nhận thức về bản thân</li><li>Đặt mục tiêu cá nhân</li><li>Quản lý thời gian hiệu quả</li><li>Quản lý cảm xúc và stress</li><li>Xây dựng thói quen tích cực</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-03",
      username: "Lê Văn C",
      email: "lvc@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-03.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về quản lý bản thân và phát triển cá nhân.</p>`
    },
    benefitsHtml: `<ul><li>Môn học bắt buộc sinh viên K61+</li><li>Công cụ quản lý thời gian</li><li>Kỹ thuật giảm stress</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '104',
    courseCode: 'KNM-TIMVIEC-2025',
    title: 'Kỹ năng tìm kiếm việc làm',
    slug: 'ky-nang-tim-kiem-viec-lam',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng tìm kiếm việc làm trang bị cho sinh viên các kiến thức và kỹ năng cần thiết để tìm kiếm và ứng tuyển công việc thành công.</p><h4>Nội dung khóa học</h4><ul><li>Xác định mục tiêu nghề nghiệp</li><li>Viết CV và thư xin việc hiệu quả</li><li>Kỹ năng phỏng vấn xin việc</li><li>Tìm kiếm thông tin việc làm</li><li>Xây dựng thương hiệu cá nhân</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-04",
      username: "Phạm Thị D",
      email: "ptd@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-04.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia tư vấn nghề nghiệp với 8 năm kinh nghiệm.</p>`
    },
    benefitsHtml: `<ul><li>Môn học bắt buộc sinh viên K61+</li><li>Mẫu CV chuyên nghiệp</li><li>Mock interview thực tế</li><li>Kết nối doanh nghiệp</li></ul>`
  },
  {
    id: '105',
    courseCode: 'KNM-HOINHAP-2025',
    title: 'Kỹ năng hội nhập quốc tế',
    slug: 'ky-nang-hoi-nhap-quoc-te',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng hội nhập quốc tế giúp sinh viên chuẩn bị sẵn sàng làm việc trong môi trường đa văn hóa và hội nhập toàn cầu.</p><h4>Nội dung khóa học</h4><ul><li>Hiểu biết về văn hóa quốc tế</li><li>Giao tiếp đa văn hóa</li><li>Kỹ năng ngôn ngữ quốc tế</li><li>Làm việc với đối tác nước ngoài</li><li>Tư duy toàn cầu</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-05",
      username: "Hoàng Văn E",
      email: "hve@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-05.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Có kinh nghiệm làm việc quốc tế tại nhiều quốc gia.</p>`
    },
    benefitsHtml: `<ul><li>Môn học bắt buộc sinh viên K61+</li><li>Hiểu văn hóa đa quốc gia</li><li>Kỹ năng giao tiếp quốc tế</li><li>Cơ hội học bổng nước ngoài</li></ul>`
  },
  {
    id: '106',
    courseCode: 'KNM-GIAIQUYET-2025',
    title: 'Kỹ năng giải quyết vấn đề',
    slug: 'ky-nang-giai-quyet-van-de',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng giải quyết vấn đề giúp sinh viên phát triển tư duy phản biện, sáng tạo và khả năng xử lý các tình huống phức tạp.</p><h4>Nội dung khóa học</h4><ul><li>Nhận diện và phân tích vấn đề</li><li>Các phương pháp giải quyết vấn đề</li><li>Tư duy sáng tạo</li><li>Ra quyết định hiệu quả</li><li>Đánh giá kết quả</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-06",
      username: "Vũ Thị F",
      email: "vtf@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-06.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về tư duy phản biện và giải quyết vấn đề.</p>`
    },
    benefitsHtml: `<ul><li>Phát triển tư duy logic</li><li>Case study thực tế</li><li>Kỹ thuật sáng tạo</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '107',
    courseCode: 'KNM-QUYETDINH-2025',
    title: 'Kỹ năng ra quyết định',
    slug: 'ky-nang-ra-quyet-dinh',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng ra quyết định giúp sinh viên tự tin đưa ra các quyết định đúng đắn trong học tập và cuộc sống.</p><h4>Nội dung khóa học</h4><ul><li>Quy trình ra quyết định</li><li>Phân tích rủi ro và lợi ích</li><li>Các công cụ hỗ trợ quyết định</li><li>Quyết định trong tình huống khó khăn</li><li>Đánh giá và điều chỉnh quyết định</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-07",
      username: "Đỗ Văn G",
      email: "dvg@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-07.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về ra quyết định và quản lý rủi ro.</p>`
    },
    benefitsHtml: `<ul><li>Tư duy chiến lược</li><li>Công cụ phân tích</li><li>Simulation games</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '108',
    courseCode: 'KNM-THOIGIAN-2025',
    title: 'Kỹ năng quản lý thời gian',
    slug: 'ky-nang-quan-ly-thoi-gian',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng quản lý thời gian giúp sinh viên sử dụng thời gian hiệu quả, cân bằng giữa học tập, công việc và cuộc sống.</p><h4>Nội dung khóa học</h4><ul><li>Nguyên tắc quản lý thời gian</li><li>Ma trận Eisenhower</li><li>Kỹ thuật Pomodoro</li><li>Lập kế hoạch hiệu quả</li><li>Xử lý công việc ưu tiên</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-08",
      username: "Bùi Thị H",
      email: "bth@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-08.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về quản lý thời gian và năng suất.</p>`
    },
    benefitsHtml: `<ul><li>Công cụ lập kế hoạch</li><li>App quản lý thời gian</li><li>Tăng năng suất 50%</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '109',
    courseCode: 'KNM-DUAN-2025',
    title: 'Kỹ năng quản lý dự án',
    slug: 'ky-nang-quan-ly-du-an',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng quản lý dự án trang bị cho sinh viên các kiến thức cơ bản về lập kế hoạch, triển khai và quản lý dự án.</p><h4>Nội dung khóa học</h4><ul><li>Khái niệm và chu trình dự án</li><li>Lập kế hoạch dự án</li><li>Quản lý nguồn lực</li><li>Theo dõi và kiểm soát dự án</li><li>Đánh giá kết quả dự án</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-09",
      username: "Ngô Văn I",
      email: "nvi@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-09.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. PMP certified, chuyên gia quản lý dự án.</p>`
    },
    benefitsHtml: `<ul><li>Công cụ PM hiện đại</li><li>Dự án thực tế</li><li>Gantt Chart</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '110',
    courseCode: 'KNM-HOCTAP-2025',
    title: 'Kỹ năng học tập',
    slug: 'ky-nang-hoc-tap',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng học tập giúp sinh viên học hiệu quả hơn, nắm vững kiến thức và phát triển tư duy học tập suốt đời.</p><h4>Nội dung khóa học</h4><ul><li>Phương pháp học tập hiệu quả</li><li>Kỹ thuật ghi nhớ</li><li>Đọc hiểu và tư duy phản biện</li><li>Làm việc với thông tin</li><li>Tự học và học nhóm</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-10",
      username: "Lý Thị K",
      email: "ltk@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-10.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về phương pháp học tập hiệu quả.</p>`
    },
    benefitsHtml: `<ul><li>Kỹ thuật ghi nhớ siêu tốc</li><li>Mind mapping</li><li>Tăng hiệu quả học 80%</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '111',
    courseCode: 'KNM-SANGTAO-2025',
    title: 'Tư duy sáng tạo',
    slug: 'tu-duy-sang-tao',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Tư duy sáng tạo giúp sinh viên phát triển khả năng tư duy đột phá, sáng tạo giải pháp mới và khác biệt.</p><h4>Nội dung khóa học</h4><ul><li>Bản chất của sáng tạo</li><li>Các kỹ thuật tư duy sáng tạo</li><li>Brainstorming hiệu quả</li><li>Design Thinking</li><li>Innovation và đổi mới</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-11",
      username: "Mai Văn L",
      email: "mvl@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-11.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về sáng tạo và đổi mới.</p>`
    },
    benefitsHtml: `<ul><li>Design Thinking workshop</li><li>Brainstorming sessions</li><li>Innovation projects</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '112',
    courseCode: 'KNM-MUCTIEU-2025',
    title: 'Kỹ năng đặt mục tiêu',
    slug: 'ky-nang-dat-muc-tieu',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng đặt mục tiêu giúp sinh viên xác định và theo đuổi mục tiêu cá nhân, học tập và nghề nghiệp một cách hiệu quả.</p><h4>Nội dung khóa học</h4><ul><li>Tầm quan trọng của mục tiêu</li><li>Phương pháp SMART Goals</li><li>Lập kế hoạch hành động</li><li>Theo dõi và đánh giá tiến độ</li><li>Duy trì động lực</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-12",
      username: "Chu Thị M",
      email: "ctm@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-12.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia về personal development.</p>`
    },
    benefitsHtml: `<ul><li>SMART Goals framework</li><li>Vision board</li><li>Action plan template</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '113',
    courseCode: 'KNM-THUYETTRINH-2025',
    title: 'Kỹ năng thuyết trình',
    slug: 'ky-nang-thuyet-trinh',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng thuyết trình giúp sinh viên tự tin trình bày ý tưởng, thuyết phục khán giả một cách chuyên nghiệp.</p><h4>Nội dung khóa học</h4><ul><li>Cấu trúc bài thuyết trình</li><li>Kỹ thuật diễn thuyết</li><li>Thiết kế slide hiệu quả</li><li>Xử lý câu hỏi khó</li><li>Ngôn ngữ cơ thể</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-13",
      username: "Đinh Văn N",
      email: "dvn@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-13.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia thuyết trình và MC chuyên nghiệp.</p>`
    },
    benefitsHtml: `<ul><li>Thực hành thuyết trình</li><li>Video feedback</li><li>Slide template</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '114',
    courseCode: 'KNM-BANHANG-2025',
    title: 'Kỹ năng bán hàng online',
    slug: 'ky-nang-ban-hang-online',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng bán hàng online trang bị cho sinh viên các kiến thức và kỹ năng kinh doanh trên nền tảng digital.</p><h4>Nội dung khóa học</h4><ul><li>Xu hướng bán hàng online</li><li>Xây dựng thương hiệu cá nhân</li><li>Marketing trên mạng xã hội</li><li>Kỹ năng chăm sóc khách hàng</li><li>Công cụ bán hàng online</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-14",
      username: "Hà Thị O",
      email: "hto@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-14.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia bán hàng online và digital marketing.</p>`
    },
    benefitsHtml: `<ul><li>Setup shop online</li><li>Facebook ads cơ bản</li><li>Content marketing</li><li>Chứng nhận hoàn thành</li></ul>`
  },
  {
    id: '115',
    courseCode: 'KNM-VUOTKHUNGHOANG-2025',
    title: 'Kỹ năng vượt qua khủng hoảng',
    slug: 'ky-nang-vuot-qua-khung-hoang',
    categoryCode: 'SOFTSKILLS',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop',
    price: 600000,
    duration: 15,
    level: 'Cơ bản',
    descriptionHtml: '<p>Kỹ năng vượt qua khủng hoảng giúp sinh viên xây dựng khả năng phục hồi, vượt qua khó khăn và thách thức trong cuộc sống.</p><h4>Nội dung khóa học</h4><ul><li>Nhận diện khủng hoảng</li><li>Quản lý stress và áp lực</li><li>Tư duy tích cực</li><li>Resilience - Khả năng phục hồi</li><li>Tìm kiếm hỗ trợ</li></ul>',
    subject: 'Kỹ năng mềm',
    status: 'ACTIVE',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-12-28T00:00:00Z',
    instructor: {
      id: "inst-soft-15",
      username: "Trương Văn P",
      email: "tvp@csst.vnua.edu.vn",
      avatarUrl: "/instructors/soft-skills-15.jpg",
      description: `<p>Giảng viên Trung tâm Kỹ năng mềm - HVNN. Chuyên gia tâm lý và resilience coaching.</p>`
    },
    benefitsHtml: `<ul><li>Kỹ thuật giảm stress</li><li>Mindfulness training</li><li>Support network</li><li>Chứng nhận hoàn thành</li></ul>`
  }
];