import { Code, Palette, Monitor } from 'lucide-react';
import type { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
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
