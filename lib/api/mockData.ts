// Mock data for VITC Homepage - Used as fallback when API is unavailable

import { Program, Instructor, NewsArticle, LookupResult, CourseSchedule, AboutTimeline } from './types';

// Mock Course Schedules
export const mockCourseSchedules: CourseSchedule[] = [
  {
    id: 1,
    className: 'UD2525',
    courseName: 'Chuẩn đầu ra Tin học VNUA',
    subject: 'Tin học văn phòng',
    schedule: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '06-11-2025',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 2,
    className: 'UD2526',
    courseName: 'Chuẩn đầu ra Tin học VNUA',
    subject: 'Tin học văn phòng',
    schedule: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '17-11-2025',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 3,
    className: 'UD2527',
    courseName: 'Chuẩn đầu ra Tin học VNUA',
    subject: 'Tin học văn phòng',
    schedule: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '29-11-2025',
    location: 'Ms.Teams',
    status: 'Sắp khai giảng'
  },
  {
    id: 4,
    className: 'ICDL2501',
    courseName: 'Chứng chỉ Quốc tế ICDL',
    subject: 'Chứng chỉ Quốc tế',
    schedule: 'Thứ 2/4/6 (18:30 - 21:00)',
    startDate: '15-12-2025',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 5,
    className: 'WEB2501',
    courseName: 'Lập trình Web cơ bản',
    subject: 'Lập trình',
    schedule: 'Thứ 3/5/7 (19:00 - 21:30)',
    startDate: '20-12-2025',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 6,
    className: 'PS2501',
    courseName: 'Photoshop & Thiết kế đồ họa',
    subject: 'Thiết kế',
    schedule: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '22-12-2025',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 7,
    className: 'EXCEL2501',
    courseName: 'Tin học văn phòng nâng cao',
    subject: 'Tin học văn phòng',
    schedule: 'Thứ 3/5 (18:00 - 21:00)',
    startDate: '05-01-2026',
    location: 'Ms.Teams',
    status: 'Đang tuyển sinh'
  },
  {
    id: 8,
    className: 'CNTT2501',
    courseName: 'Ứng dụng CNTT cơ bản & Nâng cao',
    subject: 'Tin học văn phòng',
    schedule: 'Thứ 2/4/6 (18:00 - 20:00)',
    startDate: '10-01-2026',
    location: 'Ms.Teams',
    status: 'Sắp khai giảng'
  }
];

// Mock About Timeline
export const mockAboutTimeline: AboutTimeline[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop",
    title: "Bước 1: Thành lập Trung tâm VITC",
    description: "Năm 2015 đánh dấu sự khởi đầu với tầm nhìn đào tạo nguồn nhân lực CNTT chất lượng cao, đáp ứng nhu cầu của thị trường công nghệ đang phát triển nhanh chóng.",
    year: "2015"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop",
    title: "Bước 2: Khai giảng khóa học đầu tiên",
    description: "Khóa học đầu tiên được triển khai với lộ trình học được thiết kế cá nhân hóa theo từng học viên, đặc biệt phù hợp với mục tiêu và kế hoạch của từng cá nhân.",
    year: "2016"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop",
    title: "Bước 3: Mở rộng cơ sở vật chất",
    description: "Đầu tư nâng cấp trang thiết bị hiện đại, mở rộng phòng học với công nghệ tiên tiến, tạo môi trường học tập chuyên nghiệp cho học viên.",
    year: "2017"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=1000&fit=crop",
    title: "Bước 4: Đạt mốc 1000 học viên",
    description: "Cột mốc quan trọng với 1000 học viên đã tin tưởng và lựa chọn VITC, khẳng định chất lượng đào tạo và uy tín của trung tâm trên thị trường.",
    year: "2018"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop",
    title: "Bước 5: Hợp tác doanh nghiệp quốc tế",
    description: "Ký kết hợp tác với các tập đoàn công nghệ hàng đầu thế giới, mở ra cơ hội việc làm và phát triển sự nghiệp cho học viên sau tốt nghiệp.",
    year: "2019"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=1000&fit=crop",
    title: "Bước 6: Ra mắt chương trình online",
    description: "Triển khai nền tảng học trực tuyến với công nghệ hiện đại, giúp học viên có thể học tập mọi lúc mọi nơi với chất lượng tương đương lớp offline.",
    year: "2020"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1000&fit=crop",
    title: "Bước 7: Nhận giải thưởng xuất sắc",
    description: "Vinh dự nhận giải thưởng 'Trung tâm đào tạo CNTT xuất sắc' từ Bộ Giáo dục và Đào tạo, ghi nhận những đóng góp cho ngành giáo dục Việt Nam.",
    year: "2021"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop",
    title: "Bước 8: Mở rộng chi nhánh mới",
    description: "Khai trương chi nhánh tại các thành phố lớn, mở rộng quy mô hoạt động và tiếp cận nhiều học viên hơn trên toàn quốc.",
    year: "2022"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=1000&fit=crop",
    title: "Bước 9: Đạt 5000 học viên tốt nghiệp",
    description: "Tự hào với hơn 5000 học viên đã hoàn thành chương trình đào tạo và đang làm việc tại các công ty công nghệ hàng đầu trong và ngoài nước.",
    year: "2023"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=1000&fit=crop",
    title: "Bước 10: Kỷ niệm 10 năm thành lập",
    description: "Đánh dấu 10 năm hành trình phát triển vững mạnh, VITC cam kết tiếp tục đổi mới và nâng cao chất lượng đào tạo, đồng hành cùng sự phát triển của ngành công nghệ Việt Nam.",
    year: "2025"
  }
];

export const mockPrograms: Program[] = [
  {
    id: 1,
    title: 'Chuẩn đầu ra Tin học VNUA',
    category: 'Chứng chỉ',
    description: 'Chương trình đào tạo theo chuẩn đầu ra của Trường Đại học Nông nghiệp Hà Nội, bao gồm kiến thức tin học văn phòng và ứng dụng cơ bản',
    fullDescription: 'Khóa học Chuẩn đầu ra Tin học VNUA được thiết kế đặc biệt cho sinh viên Trường Đại học Nông nghiệp Hà Nội nhằm đáp ứng chuẩn đầu ra về tin học. Chương trình cung cấp kiến thức toàn diện về tin học văn phòng, giúp sinh viên nắm vững các kỹ năng cần thiết để làm việc hiệu quả với máy tính và các phần mềm ứng dụng phổ biến.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    duration: '60 giờ',
    students: '850+',
    sessions: '3 tháng',
    level: 'Cơ bản',
    rating: 4.8,
    price: '2.500.000đ',
    completionRate: '95%',
    highlights: [
      'Microsoft Word nâng cao',
      'Microsoft Excel cơ bản & nâng cao',
      'Microsoft PowerPoint',
      'Internet và Email',
      'Thi chuẩn đầu ra VNUA'
    ],
    instructor: {
      name: 'ThS. Nguyễn Văn An',
      title: 'Giảng viên chính - Trưởng bộ môn Tin học',
      bio: 'Thạc sĩ Công nghệ thông tin, Đại học Bách Khoa Hà Nội. Hơn 10 năm kinh nghiệm giảng dạy tin học văn phòng và đào tạo chuẩn đầu ra cho sinh viên.',
      experience: '10+ năm',
      students: '3000+',
      courses: 15,
      rating: 4.9,
      specialties: ['Microsoft Office', 'Tin học văn phòng', 'Chuẩn đầu ra VNUA'],
      education: ['Thạc sĩ CNTT - ĐH Bách Khoa HN', 'Cử nhân Sư phạm Tin học'],
      achievements: ['Giảng viên xuất sắc năm 2022', 'Giáo viên được yêu thích nhất', '3000+ sinh viên đã đào tạo']
    },
    isHot: true,
    syllabus: [
      { module: 'Module 1', title: 'Windows và quản lý file', hours: 12 },
      { module: 'Module 2', title: 'Microsoft Word', hours: 15 },
      { module: 'Module 3', title: 'Microsoft Excel', hours: 18 },
      { module: 'Module 4', title: 'Microsoft PowerPoint', hours: 10 },
      { module: 'Module 5', title: 'Internet, Email và Ôn thi', hours: 5 },
    ],
    requirements: [
      'Là sinh viên Đại học Nông nghiệp Hà Nội',
      'Có máy tính để thực hành',
      'Không yêu cầu kiến thức trước'
    ],
    benefits: [
      'Đáp ứng chuẩn đầu ra VNUA',
      'Chứng nhận hoàn thành',
      'Thi miễn phí 1 lần',
      'Tài liệu học tập đầy đủ',
      'Hỗ trợ ôn thi'
    ]
  },
  {
    id: 2,
    title: 'Chứng chỉ Quốc tế ICDL',
    category: 'Chứng chỉ Quốc tế',
    description: 'Chứng chỉ Tin học Quốc tế ICDL (International Computer Driving Licence) được công nhận toàn cầu',
    fullDescription: 'ICDL (International Computer Driving Licence) là chứng chỉ tin học quốc tế được công nhận tại hơn 150 quốc gia trên thế giới. Khóa học giúp bạn nắm vững các kỹ năng tin học cơ bản và nâng cao, đáp ứng tiêu chuẩn quốc tế về năng lực tin học.',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop',
    duration: '80 giờ',
    students: '620+',
    sessions: '4 tháng',
    level: 'Trung cấp',
    rating: 4.9,
    price: '4.500.000đ',
    completionRate: '92%',
    highlights: [
      'Computer Essentials',
      'Online Essentials',
      'Word Processing',
      'Spreadsheets',
      'Thi lấy chứng chỉ ICDL'
    ],
    instructor: {
      name: 'ThS. Trần Thị Bình',
      title: 'Giảng viên chính - Chuyên gia ICDL',
      bio: 'Thạc sĩ Công nghệ thông tin, chuyên gia đào tạo chứng chỉ ICDL được Quỹ ICDL Châu Á công nhận. Có 8 năm kinh nghiệm đào tạo và hướng dẫn học viên đạt chứng chỉ quốc tế.',
      experience: '8+ năm',
      students: '2500+',
      courses: 12,
      rating: 4.9,
      specialties: ['ICDL', 'Microsoft Office', 'Tin học quốc tế'],
      education: ['Thạc sĩ CNTT - ĐH Quốc gia HN', 'Chứng chỉ giảng viên ICDL'],
      achievements: ['ICDL Certified Trainer', 'Giảng viên xuất sắc 2021', '2500+ học viên đạt chứng chỉ']
    },
    isHot: true,
    syllabus: [
      { module: 'Module 1', title: 'Computer Essentials', hours: 16 },
      { module: 'Module 2', title: 'Online Essentials', hours: 16 },
      { module: 'Module 3', title: 'Word Processing', hours: 20 },
      { module: 'Module 4', title: 'Spreadsheets', hours: 20 },
      { module: 'Module 5', title: 'Ôn thi và thi chứng chỉ', hours: 8 },
    ],
    requirements: [
      'Có máy tính cá nhân',
      'Kiến thức tin học cơ bản',
      'Tiếng Anh đọc hiểu cơ bản'
    ],
    benefits: [
      'Chứng chỉ quốc tế ICDL',
      'Được công nhận toàn cầu',
      'Tăng cơ hội việc làm',
      'Học phí bao gồm phí thi',
      'Tài liệu chuẩn quốc tế'
    ]
  },
  {
    id: 3,
    title: 'Ứng dụng CNTT cơ bản & Nâng cao',
    category: 'Tin học văn phòng',
    description: 'Khóa học toàn diện về tin học văn phòng từ cơ bản đến nâng cao, phù hợp cho mọi đối tượng',
    fullDescription: 'Khóa học Ứng dụng CNTT cơ bản & Nâng cao được thiết kế để cung cấp kiến thức toàn diện về tin học văn phòng, từ những kỹ năng cơ bản nhất đến các tính năng nâng cao của Microsoft Office. Phù hợp cho mọi đối tượng từ người mới bắt đầu đến người đã có kiến thức muốn nâng cao kỹ năng.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    duration: '45 giờ',
    students: '1200+',
    sessions: '2 tháng',
    level: 'Cơ bản',
    rating: 4.7,
    price: '1.800.000đ',
    completionRate: '96%',
    highlights: [
      'Windows cơ bản',
      'Microsoft Office (Word, Excel, PowerPoint)',
      'Email và Internet',
      'Bảo mật thông tin',
      'Chứng nhận hoàn thành'
    ],
    instructor: {
      name: 'ThS. Lê Văn Cường',
      title: 'Giảng viên cao cấp - Chuyên gia Tin học Văn phòng',
      bio: 'Thạc sĩ Sư phạm Tin học, giảng viên cao cấp với 12 năm kinh nghiệm đào tạo tin học văn phòng. Chuyên sâu về Microsoft Office và các ứng dụng văn phòng hiện đại.',
      experience: '12+ năm',
      students: '4500+',
      courses: 18,
      rating: 4.7,
      specialties: ['Microsoft Office', 'Windows', 'Tin học cơ bản'],
      education: ['Thạc sĩ Sư phạm Tin học', 'Cử nhân Công nghệ thông tin'],
      achievements: ['Microsoft Office Specialist Master', 'Giáo viên được yêu thích 2020-2023', '4500+ học viên đã đào tạo']
    },
    syllabus: [
      { module: 'Module 1', title: 'Windows và quản lý file', hours: 8 },
      { module: 'Module 2', title: 'Microsoft Word', hours: 12 },
      { module: 'Module 3', title: 'Microsoft Excel', hours: 15 },
      { module: 'Module 4', title: 'Microsoft PowerPoint', hours: 8 },
      { module: 'Module 5', title: 'Internet, Email và Bảo mật', hours: 2 },
    ],
    requirements: [
      'Không yêu cầu kiến thức trước',
      'Có máy tính để thực hành',
      'Tinh thần học hỏi'
    ],
    benefits: [
      'Phù hợp người mới bắt đầu',
      'Học phí ưu đãi',
      'Lịch học linh hoạt',
      'Chứng nhận hoàn thành',
      'Tài liệu giáo trình đầy đủ'
    ]
  },
  {
    id: 4,
    title: 'Tin học văn phòng nâng cao',
    category: 'Tin học văn phòng',
    description: 'Nâng cao kỹ năng tin học văn phòng với các tính năng nâng cao của Microsoft Office và Google Workspace',
    fullDescription: 'Khóa học Tin học văn phòng nâng cao dành cho những người đã có kiến thức cơ bản và muốn nâng cao kỹ năng để làm việc hiệu quả hơn. Khóa học tập trung vào các tính năng nâng cao của Excel, Access và Google Workspace.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    duration: '50 giờ',
    students: '480+',
    sessions: '2.5 tháng',
    level: 'Nâng cao',
    rating: 4.8,
    price: '2.200.000đ',
    completionRate: '90%',
    highlights: [
      'Excel nâng cao (Pivot, Macro, VBA)',
      'Access Database',
      'Google Workspace',
      'Tự động hóa công việc',
      'Dự án thực tế'
    ],
    instructor: {
      name: 'ThS. Phạm Thị Dung',
      title: 'Giảng viên chính - Chuyên gia Excel & Database',
      bio: 'Thạc sĩ Hệ thống thông tin quản lý, chuyên gia Excel và Database với 9 năm kinh nghiệm. Từng làm việc tại các tập đoàn lớn và có kinh nghiệm thực tế về phân tích dữ liệu.',
      experience: '9+ năm',
      students: '1800+',
      courses: 10,
      rating: 4.8,
      specialties: ['Excel VBA', 'Microsoft Access', 'Data Analysis', 'Google Workspace'],
      education: ['Thạc sĩ Hệ thống thông tin', 'Microsoft Certified Professional'],
      achievements: ['Excel Expert Certified', 'Chuyên gia phân tích dữ liệu', 'Giảng viên nổi bật 2022']
    },
    syllabus: [
      { module: 'Module 1', title: 'Excel nâng cao - Pivot Table', hours: 12 },
      { module: 'Module 2', title: 'Excel Macro và VBA', hours: 15 },
      { module: 'Module 3', title: 'Microsoft Access', hours: 12 },
      { module: 'Module 4', title: 'Google Workspace', hours: 8 },
      { module: 'Module 5', title: 'Dự án thực tế', hours: 3 },
    ],
    requirements: [
      'Đã biết tin học văn phòng cơ bản',
      'Có máy tính cá nhân',
      'Cài đặt Microsoft Office'
    ],
    benefits: [
      'Nâng cao năng suất làm việc',
      'Tự động hóa công việc',
      'Quản lý dữ liệu chuyên nghiệp',
      'Dự án thực tế',
      'Tài liệu nâng cao'
    ]
  },
  {
    id: 5,
    title: 'Photoshop & Thiết kế đồ họa',
    category: 'Thiết kế',
    description: 'Học Photoshop từ cơ bản đến nâng cao, thiết kế banner, poster, và các sản phẩm đồ họa chuyên nghiệp',
    fullDescription: 'Khóa học Photoshop & Thiết kế đồ họa giúp bạn nắm vững các kỹ năng thiết kế đồ họa từ cơ bản đến nâng cao. Bạn sẽ học cách sử dụng Photoshop một cách chuyên nghiệp để tạo ra các sản phẩm đồ họa đẹp mắt và ấn tượng.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    duration: '70 giờ',
    students: '520+',
    sessions: '3 tháng',
    level: 'Trung cấp',
    rating: 4.9,
    price: '3.500.000đ',
    completionRate: '88%',
    highlights: [
      'Photoshop cơ bản đến nâng cao',
      'Xử lý ảnh chuyên nghiệp',
      'Thiết kế banner, poster',
      'Typography & Color Theory',
      'Portfolio cá nhân'
    ],
    instructor: {
      name: 'ThS. Hoàng Minh Tuấn',
      title: 'Giảng viên - Senior Graphic Designer',
      bio: 'Thạc sĩ Mỹ thuật Đa phương tiện, Designer chuyên nghiệp với 15 năm kinh nghiệm. Từng làm việc cho các agency lớn và có nhiều dự án thiết kế cho các thương hiệu nổi tiếng.',
      experience: '15+ năm',
      students: '2200+',
      courses: 8,
      rating: 4.9,
      specialties: ['Adobe Photoshop', 'Graphic Design', 'Typography', 'Brand Identity'],
      education: ['Thạc sĩ Mỹ thuật Đa phương tiện', 'Adobe Certified Professional'],
      achievements: ['Adobe Certified Expert', 'Giải thưởng Thiết kế 2019', 'Top Designer Vietnam']
    },
    isHot: true,
    syllabus: [
      { module: 'Module 1', title: 'Photoshop cơ bản', hours: 15 },
      { module: 'Module 2', title: 'Xử lý và chỉnh sửa ảnh', hours: 15 },
      { module: 'Module 3', title: 'Thiết kế đồ họa', hours: 20 },
      { module: 'Module 4', title: 'Typography và Color Theory', hours: 10 },
      { module: 'Module 5', title: 'Dự án thực tế', hours: 10 },
    ],
    requirements: [
      'Máy tính cấu hình đủ mạnh',
      'Cài đặt Adobe Photoshop',
      'Không yêu cầu kinh nghiệm'
    ],
    benefits: [
      'Thiết kế chuyên nghiệp',
      'Portfolio cá nhân',
      'Kỹ năng thực tế',
      'Hướng dẫn freelance',
      'Cộng đồng designer'
    ]
  },
  {
    id: 6,
    title: 'Lập trình Web cơ bản',
    category: 'Lập trình',
    description: 'Khóa học lập trình web với HTML, CSS, JavaScript cơ bản để xây dựng website đơn giản',
    fullDescription: 'Khóa học Lập trình Web cơ bản là bước đầu tiên để trở thành một Web Developer. Bạn sẽ học các ngôn ngữ lập trình web cơ bản như HTML, CSS, JavaScript và cách tạo ra các trang web responsive, hiện đại.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    duration: '90 giờ',
    students: '380+',
    sessions: '4 tháng',
    level: 'Cơ bản',
    rating: 4.7,
    price: '4.000.000đ',
    completionRate: '85%',
    highlights: [
      'HTML5 & CSS3',
      'JavaScript cơ bản',
      'Responsive Design',
      'Git & GitHub',
      'Dự án website cá nhân'
    ],
    instructor: {
      name: 'ThS. Đỗ Văn Nam',
      title: 'Giảng viên - Senior Web Developer',
      bio: 'Thạc sĩ Công nghệ phần mềm, Senior Web Developer với 10 năm kinh nghiệm phát triển web. Từng làm việc tại các công ty công nghệ hàng đầu và có nhiều dự án web quy mô lớn.',
      experience: '10+ năm',
      students: '1500+',
      courses: 6,
      rating: 4.7,
      specialties: ['HTML/CSS', 'JavaScript', 'React', 'Web Development'],
      education: ['Thạc sĩ Công nghệ phần mềm', 'Full Stack Developer Certified'],
      achievements: ['Senior Developer tại FPT Software', '50+ dự án web thành công', 'Mentor cho 100+ developers']
    },
    syllabus: [
      { module: 'Module 1', title: 'HTML5 cơ bản', hours: 18 },
      { module: 'Module 2', title: 'CSS3 và Responsive Design', hours: 22 },
      { module: 'Module 3', title: 'JavaScript cơ bản', hours: 25 },
      { module: 'Module 4', title: 'Git và GitHub', hours: 10 },
      { module: 'Module 5', title: 'Dự án thực tế', hours: 15 },
    ],
    requirements: [
      'Máy tính cá nhân',
      'Biết sử dụng máy tính cơ bản',
      'Tiếng Anh đọc hiểu cơ bản'
    ],
    benefits: [
      'Nền tảng lập trình web',
      'Dự án cá nhân',
      'Code trên GitHub',
      'Hỗ trợ tìm việc',
      'Cộng đồng developer'
    ]
  }
];

export const mockInstructors: Instructor[] = [
  {
    id: 1,
    name: 'TS. Nguyễn Văn Minh',
    title: 'Chuyên gia AI & Machine Learning',
    experience: '15 năm',
    students: '2000+',
    courses: 12,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop',
    specialty: 'Python, TensorFlow, Deep Learning',
  },
  {
    id: 2,
    name: 'ThS. Trần Thị Hương',
    title: 'Chuyên gia UI/UX Design',
    experience: '10 năm',
    students: '1500+',
    courses: 8,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop',
    specialty: 'Figma, Adobe XD, Design Thinking',
  },
  {
    id: 3,
    name: 'Lê Hoàng Anh',
    title: 'Full Stack Developer',
    experience: '12 năm',
    students: '1800+',
    courses: 10,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop',
    specialty: 'React, Node.js, MongoDB',
  },
  {
    id: 4,
    name: 'Phạm Minh Tuấn',
    title: 'DevOps Engineer',
    experience: '11 năm',
    students: '1200+',
    courses: 7,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop',
    specialty: 'Docker, Kubernetes, AWS',
  },
  {
    id: 5,
    name: 'Hoàng Thu Trang',
    title: 'Data Scientist',
    experience: '9 năm',
    students: '1600+',
    courses: 9,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop',
    specialty: 'Python, R, Statistics',
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: 1,
    title: 'AI và Machine Learning: Xu hướng công nghệ 2025',
    description: 'Tìm hiểu về các xu hướng công nghệ AI và Machine Learning nổi bật trong năm 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    date: '15/11/2024',
    category: 'Công nghệ',
  },
  {
    id: 2,
    title: 'Kỹ năng mềm quan trọng cho lập trình viên',
    description: 'Những kỹ năng mềm cần thiết để phát triển sự nghiệp trong lĩnh vực công nghệ',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    date: '10/11/2024',
    category: 'Kỹ năng',
  },
  {
    id: 3,
    title: 'Cách học lập trình hiệu quả từ đầu',
    description: 'Chia sẻ những phương pháp học lập trình hiệu quả và đạt kết quả cao',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    date: '05/11/2024',
    category: 'Học tập',
  },
  {
    id: 4,
    title: 'DevOps: Triển khai ứng dụng hiện đại',
    description: 'Hướng dẫn về DevOps và cách triển khai ứng dụng với Docker, Kubernetes',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    date: '01/11/2024',
    category: 'DevOps',
  },
  {
    id: 5,
    title: 'UI/UX Design Trends 2025',
    description: 'Khám phá các xu hướng thiết kế giao diện người dùng mới nhất',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    date: '28/10/2024',
    category: 'Design',
  },
  {
    id: 6,
    title: 'Cloud Computing: Tương lai của công nghệ',
    description: 'Tìm hiểu về điện toán đám mây và các dịch vụ AWS, Azure, Google Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    date: '25/10/2024',
    category: 'Cloud',
  },
  {
    id: 7,
    title: 'Data Science: Phân tích dữ liệu thông minh',
    description: 'Khóa học về Data Science, phân tích dữ liệu và Machine Learning',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    date: '20/10/2024',
    category: 'Data',
  },
  {
    id: 8,
    title: 'Mobile App Development với React Native',
    description: 'Xây dựng ứng dụng di động đa nền tảng với React Native',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    date: '15/10/2024',
    category: 'Mobile',
  },
];

export const mockLookupResults: LookupResult[] = [
  {
    id: 'UD2527001',
    studentName: 'Vỹ Thị Hồng Nhung',
    cccd: '025187011260',
    entryNumber: 'BO/CB/QĐ.6806/0016',
    birthDate: '28/08/1987',
    birthPlace: 'Phú Thọ',
    courseName: 'Thi Chứng chỉ Ứng dụng CNTT Cơ bản',
    certificateType: 'Chứng chỉ UDCNTT cơ bản TT 03 của Bộ TT&TT',
    theoryScore: 7.8,
    practiceScore: 8.2,
    finalScore: 8.0,
    result: 'Đạt',
    examDate: '03/12/2023',
    issueDate: '12/12/2023',
    certificateId: 'CERT-2023-001',
  },
  {
    id: 'UD2527002',
    studentName: 'Nguyễn Văn An',
    cccd: '001234567890',
    entryNumber: 'BO/CB/QĐ.6807/0017',
    birthDate: '15/05/1995',
    birthPlace: 'Hà Nội',
    courseName: 'Chuẩn đầu ra Tin học VNUA',
    certificateType: 'Chuẩn đầu ra tin học',
    theoryScore: 8.5,
    practiceScore: 8.8,
    finalScore: 8.6,
    result: 'Đạt',
    examDate: '15/11/2024',
    issueDate: '01/12/2024',
    certificateId: 'CERT-2024-001',
  },
  {
    id: 'ICDL2513001',
    studentName: 'Trần Thị Bình',
    cccd: '001234567891',
    entryNumber: 'BO/CB/QĐ.6808/0018',
    birthDate: '22/08/1998',
    birthPlace: 'Hải Phòng',
    courseName: 'Chứng chỉ Quốc tế ICDL',
    certificateType: 'ICDL Base',
    theoryScore: 9.0,
    practiceScore: 9.4,
    finalScore: 9.2,
    result: 'Đạt',
    examDate: '20/11/2024',
    issueDate: '05/12/2024',
    certificateId: 'ICDL-2024-001',
  },
  {
    id: 'UD2526001',
    studentName: 'Lê Văn Cường',
    cccd: '001234567892',
    entryNumber: 'BO/CB/QĐ.6809/0019',
    birthDate: '10/03/2000',
    birthPlace: 'Đà Nẵng',
    courseName: 'Ứng dụng CNTT cơ bản & Nâng cao',
    certificateType: 'Chứng chỉ UDCNTT Nâng cao',
    theoryScore: 7.8,
    practiceScore: 8.2,
    finalScore: 8.0,
    result: 'Đạt',
    examDate: '10/11/2024',
    issueDate: '28/11/2024',
    certificateId: 'CERT-2024-003',
  },
  {
    id: 'WEB2501001',
    studentName: 'Phạm Thị Dung',
    cccd: '001234567893',
    entryNumber: 'BO/CB/QĐ.6810/0020',
    birthDate: '18/12/1997',
    birthPlace: 'TP. Hồ Chí Minh',
    courseName: 'Lập trình Web cơ bản',
    certificateType: 'Chứng chỉ Lập trình Web',
    theoryScore: 8.5,
    practiceScore: 9.0,
    finalScore: 8.7,
    result: 'Đạt',
    examDate: '25/11/2024',
    issueDate: '10/12/2024',
    certificateId: 'WEB-2024-001',
  },
  {
    id: 'PS2501001',
    studentName: 'Hoàng Minh Tuấn',
    cccd: '001234567894',
    entryNumber: 'BO/CB/QĐ.6811/0021',
    birthDate: '05/07/1996',
    birthPlace: 'Nghệ An',
    courseName: 'Photoshop & Thiết kế đồ họa',
    certificateType: 'Chứng chỉ Thiết kế Đồ họa',
    theoryScore: 8.2,
    practiceScore: 8.8,
    finalScore: 8.5,
    result: 'Đạt',
    examDate: '01/12/2024',
    issueDate: '15/12/2024',
    certificateId: 'PS-2024-001',
  },
  {
    id: 'UD2525001',
    studentName: 'Đỗ Văn Nam',
    cccd: '001234567895',
    entryNumber: 'BO/CB/QĐ.6812/0022',
    birthDate: '20/09/1999',
    birthPlace: 'Thanh Hóa',
    courseName: 'Tin học văn phòng nâng cao',
    certificateType: 'Chứng chỉ THVP Nâng cao',
    theoryScore: 7.5,
    practiceScore: 8.0,
    finalScore: 7.7,
    result: 'Đạt',
    examDate: '05/12/2024',
    issueDate: '20/12/2024',
    certificateId: 'THVP-2024-001',
  },
  {
    id: 'EXCEL2501001',
    studentName: 'Nguyễn Thị Lan',
    cccd: '001234567896',
    entryNumber: 'BO/CB/QĐ.6813/0023',
    birthDate: '14/02/1998',
    birthPlace: 'Hải Dương',
    courseName: 'Excel nâng cao & VBA',
    certificateType: 'Chứng chỉ Excel Expert',
    theoryScore: 9.0,
    practiceScore: 9.2,
    finalScore: 9.1,
    result: 'Đạt',
    examDate: '08/12/2024',
    issueDate: '22/12/2024',
    certificateId: 'EXCEL-2024-001',
  },
];
