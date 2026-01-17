import { Search, Calculator, FileCheck } from 'lucide-react';
import type { UtilityItem } from '../types';

export const UTILITIES: UtilityItem[] = [
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
