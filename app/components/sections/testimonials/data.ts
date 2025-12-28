export interface Testimonial {
  id: number;
  name: string;
  course: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    course: "Tin học văn phòng",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3eNA%3c/text%3e%3c/svg%3e",
    quote: "Sau khi học tại VITC, tôi đã có thể sử dụng thành thạo Excel và Word. Giảng viên rất tận tình hướng dẫn.",
    rating: 5
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    course: "Kế toán trên máy tính",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3eTB%3c/text%3e%3c/svg%3e",
    quote: "Kiến thức thực tế, áp dụng ngay được vào công việc. Phòng máy hiện đại, môi trường học tập tuyệt vời.",
    rating: 5
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    course: "Thiết kế đồ họa",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3eLM%3c/text%3e%3c/svg%3e",
    quote: "Khóa học thiết kế tại VITC giúp tôi nắm vững Photoshop và Illustrator. Hiện tại tôi đã có công việc ổn định.",
    rating: 4
  },
  {
    id: 4,
    name: "Phạm Thu Hương",
    course: "Lập trình Web",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3ePH%3c/text%3e%3c/svg%3e",
    quote: "Chương trình học bám sát thực tế, giảng viên nhiều kinh nghiệm. Sau khóa học tôi đã tự tin làm việc với HTML, CSS, JavaScript.",
    rating: 5
  },
  {
    id: 5,
    name: "Đỗ Công Thành",
    course: "Ứng dụng CNTT",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3eDT%3c/text%3e%3c/svg%3e",
    quote: "VITC cung cấp kiến thức toàn diện về công nghệ thông tin. Tôi đã học được rất nhiều điều bổ ích cho công việc.",
    rating: 4
  },
  {
    id: 6,
    name: "Vũ Thị Mai",
    course: "Tin học văn phòng",
    avatar: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3e%3ctext x='40' y='45' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='14'%3eVM%3c/text%3e%3c/svg%3e",
    quote: "Học phí hợp lý, chất lượng đào tạo cao. Tôi rất hài lòng với khóa học tại VITC và sẽ giới thiệu bạn bè đến học.",
    rating: 5
  }
];