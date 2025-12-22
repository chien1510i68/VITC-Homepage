"use client";

import React from 'react';
import Link from 'next/link';
import SAMPLE_NEWS from '../../../lib/newsData';
import SAMPLE_THU_VIEN from '../../../lib/thuVienData';
import type { CourseSchedule } from '@/lib/api/types';

interface Props {
  courses?: CourseSchedule[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isOpen?: boolean;
}

export default function SoftSkillsMenu({ courses = [], onMouseEnter, onMouseLeave, isOpen = true }: Props) {
  const propsOnMouseEnter = onMouseEnter;
  const propsOnMouseLeave = onMouseLeave;
  const latestNews = SAMPLE_NEWS.slice(0, 3);
  const resources = SAMPLE_THU_VIEN.slice(0, 4);

  const sampleCourses = courses.length
    ? courses.slice(0, 6).map((c: any) => ({ id: c.id || c.className || c.title, title: c.title || c.className }))
    : [
        { id: 'c1', title: 'Kỹ năng giao tiếp' },
        { id: 'c2', title: 'Kỹ năng làm việc nhóm' },
        { id: 'c3', title: 'Kỹ năng quản lý thời gian' },
        { id: 'c4', title: 'Kỹ năng thuyết trình' },
        { id: 'c5', title: 'Tư duy sáng tạo' },
        { id: 'c6', title: 'Quản lý dự án cơ bản' },
      ];

  return (
    <div onMouseEnter={propsOnMouseEnter} onMouseLeave={propsOnMouseLeave} className="pointer-events-auto">
      <div className="w-80 md:w-96">
        <div className={`rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transform transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className={`bg-white text-gray-900 p-4 ${isOpen ? 'animate-in fade-in slide-in-from-top-4 duration-300' : ''}`}> 
            <div className="flex flex-col gap-2">
              <nav aria-label="Kỹ năng mềm menu" className="py-2">
                <ul className="space-y-2">
                  <li>
                    <Link href="/ky-nang-mem#courses" className="block px-6 py-4 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">Danh sách khóa học</Link>
                  </li>
                  <li>
                    <Link href="/ky-nang-mem#news" className="block px-6 py-4 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">Tin tức</Link>
                  </li>
                  <li>
                    <Link href="/ky-nang-mem#resources" className="block px-6 py-4 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">Tài liệu</Link>
                  </li>
                  <li>
                    <Link href="/ky-nang-mem#contact" className="block px-6 py-4 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">Liên hệ</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
