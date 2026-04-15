'use client';

import React from 'react';
import Link from 'next/link';

interface ResultModalProps {
  correctCount: number;
  totalCount: number;
  score: number;
  onClose: () => void;
}

export default function ResultModal({ correctCount, totalCount, score, onClose }: ResultModalProps) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="bg-white w-full max-w-[400px] p-8 md:p-10 shadow-2xl text-center relative overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-green-600"></div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Kết quả hoàn thành</h2>

        <div className="py-6 mb-8 border-y border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Số điểm đạt được</p>
          <div className="text-6xl font-black text-green-600 mb-2">{score.toFixed(1)}</div>
          <p className="text-gray-600 font-medium">
            Trả lời đúng <span className="text-gray-900 font-bold">{correctCount}/{totalCount}</span> câu hỏi
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/thi-thu"
            className="block w-full py-4 bg-[#07314e] text-white font-bold hover:bg-[#0a456e] transition-colors rounded-lg uppercase text-xs tracking-widest"
          >
            Quay lại danh sách đề
          </Link>

          <Link
            href="/"
            className="block w-full py-4 bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors rounded-lg uppercase text-xs tracking-widest"
          >
            Trở về trang chủ
          </Link>

        </div>
      </div>
    </div>
  </div>
);
}
