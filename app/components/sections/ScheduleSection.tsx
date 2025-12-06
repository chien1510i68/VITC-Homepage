"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';

const schedules = [
  {
    id: 'UD2527',
    className: 'UD2527',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-29',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UDCB2526',
    className: 'UDCB2526',
    time: 'Sáng: 08h00 - 11h30 Chiều: 13h00 - 17h00',
    startDate: '2025-11-16',
    location: 'Ms.Teams',
    subject: 'Ứng dụng CNTT cơ bản & Nâng Cao',
    status: 'Sắp khai giảng',
  },
  {
    id: 'ICDL2513',
    className: 'ICDL2513',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-11',
    location: 'Ms.Teams',
    subject: 'Chứng chỉ Quốc tế ICDL',
    status: 'Đang học',
  },
  {
    id: 'ICDL2514',
    className: 'ICDL2514',
    time: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '2025-11-28',
    location: 'Ms.Teams',
    subject: 'Chứng chỉ Quốc tế ICDL',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UD2526',
    className: 'UD2526',
    time: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '2025-11-17',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UD2525',
    className: 'UD2525',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-06',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Đang học',
  },
];

export default function ScheduleSection() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="py-10 md:py-16 bg-white" id="lich-khai-giang">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Lịch khai giảng
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tra cứu lịch khai giảng và đăng ký lớp học phù hợp với thời gian của bạn
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className={`${TAILWIND_COLORS.bgPrimary} text-white`}>
                <th className="px-6 py-4 text-left font-semibold">Lớp</th>
                <th className="px-6 py-4 text-left font-semibold">Thời gian</th>
                <th className="px-6 py-4 text-left font-semibold">Ngày khai giảng</th>
                <th className="px-6 py-4 text-left font-semibold">Địa điểm học</th>
                <th className="px-6 py-4 text-left font-semibold">Môn học</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {schedule.className}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {schedule.time}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(schedule.startDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {schedule.location}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {schedule.subject}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className={`border-2 ${TAILWIND_COLORS.borderPrimary} ${TAILWIND_COLORS.textPrimary} hover:bg-green-50 font-semibold`}
          >
            <a href="/khoa-hoc">
              Xem tất cả lịch khai giảng →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
