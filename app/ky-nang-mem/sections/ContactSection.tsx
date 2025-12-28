"use client";

import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Liên hệ tư vấn</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Bạn cần tư vấn về chương trình kỹ năng mềm, lịch khai giảng hoặc mở lớp theo yêu cầu?
            Hãy gửi thông tin, đội ngũ của VISC sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
        </div>

        <form className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="email@domain.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="098x xxx xxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nhu cầu</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ví dụ: Tư vấn khóa học, mở lớp cho doanh nghiệp..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú thêm</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Chia sẻ thêm về nhu cầu của bạn..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p className="text-xs text-slate-500 max-w-md">
              Bằng cách gửi form, bạn đồng ý cho VISC liên hệ qua email hoặc điện thoại để tư vấn chi tiết hơn.
            </p>
            <Button type="submit" className="min-w-[160px] bg-sky-600 hover:bg-sky-700 text-white">
              Gửi yêu cầu
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
